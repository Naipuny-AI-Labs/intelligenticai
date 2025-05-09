import { StatusCodes } from 'http-status-codes'
import { InternalError } from '../../error/InternalError'
import { getErrorMessage } from '../../error/utils'
import { OnBoardUser } from '../../database/entities/OnBoardUser'
import { AppDataSource } from '../../data-source'
const onBoardUserRepository = AppDataSource.getRepository(OnBoardUser)

const getOnBoardUsers = async (userId?: string): Promise<any> => {
    try {
        if (userId) {
            const dbResponse = await onBoardUserRepository.findOneBy({ id: userId })
            if (!dbResponse) {
                throw new InternalError(StatusCodes.NOT_FOUND, `User ${userId} not found`)
            }
            return dbResponse
        }
        const dbResponse = await onBoardUserRepository.find()
        return dbResponse
    } catch (error) {
        throw new InternalError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: onboardUserService.getOnBoardUsers - ${getErrorMessage(error)}`)
    }
}

const getOnBoardUserById = async (userId: string): Promise<any> => {
    try {
        const dbResponse = await onBoardUserRepository.findOneBy({ id: userId })
        if (!dbResponse) {
            throw new InternalError(StatusCodes.NOT_FOUND, `User ${userId} not found`)
        }
        return dbResponse
    } catch (error) {
        throw new InternalError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: onboardUserService.getOnBoardUserById - ${getErrorMessage(error)}`)
    }
}

const saveOnBoardUser = async (onBoardUser: OnBoardUser): Promise<any> => {
    try {
        let dbResponse: OnBoardUser
        const user = onBoardUserRepository.create(onBoardUser)
        dbResponse = await onBoardUserRepository.save(user)
        return dbResponse
    } catch (error) {
        throw new InternalError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: onboardUserService.saveOnBoardUser - ${getErrorMessage(error)}`)
    }
}

const changeOnBoardUserStatus = async (requestBody: any): Promise<any> => {
    try {
        let onBoardUser = await onBoardUserRepository.findOneBy({
            id: requestBody.userId
        })
        if (!onBoardUser) {
            throw new InternalError(StatusCodes.NOT_FOUND, `User ${requestBody.userId} not found`)
        }
        onBoardUser = {
            ...onBoardUser,
            status: requestBody.status,
            updatedDate: new Date()
        }
        const dbResponse = await onBoardUserRepository.save(onBoardUser)
        return dbResponse
    } catch (error) {
        throw new InternalError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: onBoardUserService.changeOnBoardUserStatus - ${getErrorMessage(error)}`
        )
    }
}

const deleteOnBoardUser = async (userId: string): Promise<any> => {
    try {
        const onBoardUser = await onBoardUserRepository.findOneBy({ id: userId })
        if (!onBoardUser) {
            throw new InternalError(StatusCodes.NOT_FOUND, `User ${userId} not found`)
        }
        await onBoardUserRepository.remove(onBoardUser)
        return { message: `User ${userId} deleted successfully` }
    } catch (error) {
        throw new InternalError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: onBoardUserService.deleteOnBoardUser - ${getErrorMessage(error)}`
        )
    }
}

export default {
    getOnBoardUsers,
    getOnBoardUserById,
    saveOnBoardUser,
    changeOnBoardUserStatus,
    deleteOnBoardUser
}
