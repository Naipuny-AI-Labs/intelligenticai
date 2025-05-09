import { StatusCodes } from 'http-status-codes'
import { Chatflow } from '../../database/entities/Chatflow'
import { InternalError } from '../../error/InternalError'
import { getErrorMessage } from '../../error/utils'
import { AppDataSource } from '../../data-source'
const ChatflowRepository = AppDataSource.getRepository(Chatflow)

const createChatflow = async (requestBody: any) => {
    try {
        console.log(requestBody)
        const newUser = new Chatflow()
        Object.assign(newUser, requestBody)
        const user =  ChatflowRepository.create(newUser)
        const dbResponse = await ChatflowRepository.save(user)
        console.log(dbResponse)
        return dbResponse
    } catch (error) {
        throw new InternalError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: ChatflowService.createChatflow - ${getErrorMessage(error)}`)
    }
}

// Delete Chatflow from database
const deleteChatflow = async (ChatflowId: string): Promise<any> => {
    try {
        const dbResponse = await ChatflowRepository.delete({ id: ChatflowId })
        if (!dbResponse) {
            throw new InternalError(StatusCodes.NOT_FOUND, `Chatflow ${ChatflowId} not found`)
        }
        return dbResponse
    } catch (error) {
        throw new InternalError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: ChatflowService.deleteChatflow - ${getErrorMessage(error)}`)
    }
}

const getAllChatflows = async () => {
    try {
        return await ChatflowRepository.find()
    } catch (error) {
        throw new InternalError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: ChatflowService.getAllChatflows - ${getErrorMessage(error)}`)
    }
}

const getChatflowById = async (ChatflowId: string): Promise<any> => {
    try {
        const Chatflow = await ChatflowRepository.findOneBy({
            slug: ChatflowId
        })
        if (!Chatflow) {
            throw new InternalError(StatusCodes.NOT_FOUND, `Chatflow ${ChatflowId} not found`)
        }
        return Chatflow
    } catch (error) {
        throw new InternalError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: ChatflowService.getChatflowById - ${getErrorMessage(error)}`)
    }
}

const updateChatflow = async (ChatflowId: string, requestBody: any): Promise<any> => {
    try {
        const Chatflow = await ChatflowRepository.findOneBy({
            id: ChatflowId
        })
        if (!Chatflow) {
            throw new InternalError(StatusCodes.NOT_FOUND, `Chatflow ${ChatflowId} not found`)
        }
        Object.assign(Chatflow, requestBody)
        const dbResponse = await ChatflowRepository.save(Chatflow)
        return dbResponse
    } catch (error) {
        throw new InternalError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: ChatflowService.updateChatflow - ${getErrorMessage(error)}`)
    }
}

export default {
    createChatflow,
    deleteChatflow,
    getAllChatflows,
    getChatflowById,
    updateChatflow
}
