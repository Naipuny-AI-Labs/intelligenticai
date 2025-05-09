import { Request, Response, NextFunction } from 'express'
import chatflowService from '../../service/chatflow'
import { InternalError } from '../../error/InternalError'
import { StatusCodes } from 'http-status-codes'

const createChatflow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.body) {
            throw new InternalError(StatusCodes.PRECONDITION_FAILED, `Error: chatflowController.createChatflow - body not provided!`)
        }
        console.log(req.body)
        const apiResponse = await chatflowService.createChatflow(req.body)
        res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const deleteChatflow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalError(StatusCodes.PRECONDITION_FAILED, `Error: chatflowController.deleteChatflow - id not provided!`)
        }
        const apiResponse = await chatflowService.deleteChatflow(req.params.id)
        res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const getAllChatflows = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const apiResponse = await chatflowService.getAllChatflows()
        res.json(apiResponse)
    } catch (error) {
        next(error)
        
    }
}

const getChatflowById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalError(StatusCodes.PRECONDITION_FAILED, `Error: chatflowController.getChatflowById - id not provided!`)
        }
        const apiResponse = await chatflowService.getChatflowById(req.params.id)
        res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const updateChatflow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalError(StatusCodes.PRECONDITION_FAILED, `Error: chatflowController.updateChatflow - id not provided!`)
        }
        if (!req.body) {
            throw new InternalError(StatusCodes.PRECONDITION_FAILED, `Error: chatflowController.updateChatflow - body not provided!`)
        }
        const apiResponse = await chatflowService.updateChatflow(req.params.id, req.body)
        res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

export default {
    createChatflow,
    deleteChatflow,
    getAllChatflows,
    getChatflowById,
    updateChatflow
}
