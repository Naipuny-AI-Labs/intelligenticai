import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { OnBoardUser } from '../../database/entities/OnBoardUser'
import { InternalError } from '../../error/InternalError'
import onboarduserService from '../../service/onboarduser'
import userService from '../../service/user'
import { User } from '../../database/entities/User'
import * as argon2 from "argon2";
import nodemailer from 'nodemailer';
const getOnBoardUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const apiResponse = await onboarduserService.getOnBoardUsers()
        res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const getOnBoardUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        if (!userId) {
            throw new InternalError(StatusCodes.PRECONDITION_FAILED, `Error: onboardUserRouter.getOnBoardUserById - userId not provided!`)
        }
        const apiResponse = await onboarduserService.getOnBoardUserById(userId)
        res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const saveOnBoardUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.body) {
            throw new InternalError(StatusCodes.PRECONDITION_FAILED, `Error: onboardUserRouter.saveOnboardUser - body not provided!`)
        }
        const body = req.body
        let onboardUser = new OnBoardUser()
        Object.assign(onboardUser, body)
        const apiResponse = await onboarduserService.saveOnBoardUser(onboardUser)
        res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}
const changeOnBoardUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.body) {
            throw new InternalError(StatusCodes.PRECONDITION_FAILED, `Error: onboardUserRouter.chageOnboardUserStatus - body not provided!`)
        }
        const body = req.body
        const apiResponse = await onboarduserService.changeOnBoardUserStatus({
            userId: body.userId,
            status: body.status
        })
        // If status is approved, create a new user
        if (body.status === 'approved') {
            const user = await onboarduserService.getOnBoardUserById(body.userId)
            const newUser = new User()
            newUser.usecase = user.usecase
            newUser.companysize = user.companysize
            newUser.industry = user.industry
            newUser.companyname = user.companyname
            newUser.name = user.name
            newUser.email = user.email
            newUser.designation = user.designation
            newUser.phone = user.phone
            newUser.requirements = user.requirements
            newUser.dataprivacy = user.dataprivacy
            newUser.marketingconsent = user.marketingconsent
            newUser.username = user.email // Use email as username
            // Generate random password
            const randomPassword = Math.random().toString(36).slice(-8)
            // Hash the password
            const hashedPassword = await argon2.hash(randomPassword)
            newUser.password = hashedPassword
            newUser.apikey = user.apikey
            newUser.flowids = user.flowids
            newUser.agentids = user.agentids
            const createdUser = await userService.createUser(newUser)

            // Send email with Outlook
            const transporter = nodemailer.createTransport({
                host: 'smtp.office365.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.OUTLOOK_EMAIL,
                    pass: process.env.OUTLOOK_PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.OUTLOOK_EMAIL,
                to: user.email,
                subject: 'Your Account Has Been Approved',
                text: `Your account has been approved. Here are your login credentials:\n\nEmail: ${user.email}\nPassword: ${randomPassword}\n\nPlease change your password after logging in.`
            };

            try {
                const info = await transporter.sendMail(mailOptions);
                console.log('Email sent successfully:', info.messageId);
            } catch (error) {
                console.error('Failed to send email:', error);
            }

            res.json({...createdUser, randomPassword})
        }
    } catch (error) {
        next(error)
    }
}

const deleteOnBoardUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        if (!userId) {
            throw new InternalError(StatusCodes.PRECONDITION_FAILED, `Error: onboardUserRouter.deleteOnBoardUser - userId not provided!`)
        }
        const apiResponse = await onboarduserService.deleteOnBoardUser(userId)
        res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

export default {
    getOnBoardUsers,
    getOnBoardUserById,
    saveOnBoardUser,
    changeOnBoardUserStatus,
    deleteOnBoardUser
}
