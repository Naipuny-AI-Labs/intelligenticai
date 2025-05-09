import { StatusCodes } from 'http-status-codes'
import { Agent } from '../../database/entities/Agent'
import { InternalError } from '../../error/InternalError'
import { getErrorMessage } from '../../error/utils'
import { AppDataSource } from '../../data-source'
const agentRepository = AppDataSource.getRepository(Agent)

const createAgent = async (requestBody: any) => {
    try {
        console.log(requestBody)
        const newUser = new Agent()
        Object.assign(newUser, requestBody)
        const user = await agentRepository.create(newUser)
        const dbResponse = await agentRepository.save(user)
        console.log(dbResponse)
        return dbResponse
    } catch (error) {
        throw new InternalError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: agentService.createAgent - ${getErrorMessage(error)}`)
    }
}

// Delete agent from database
const deleteAgent = async (agentId: string): Promise<any> => {
    try {
        const dbResponse = await agentRepository.delete({ id: agentId })
        if (!dbResponse) {
            throw new InternalError(StatusCodes.NOT_FOUND, `Agent ${agentId} not found`)
        }
        return dbResponse
    } catch (error) {
        throw new InternalError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: agentService.deleteAgent - ${getErrorMessage(error)}`)
    }
}

const getAllAgents = async () => {
    try {
        return await agentRepository.find()
    } catch (error) {
        throw new InternalError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: agentService.getAllAgents - ${getErrorMessage(error)}`)
    }
}

const getAgentById = async (agentId: string): Promise<any> => {
    try {
        const agent = await agentRepository.findOneBy({
            slug: agentId
        })
        if (!agent) {
            throw new InternalError(StatusCodes.NOT_FOUND, `Agent ${agentId} not found`)
        }
        return agent
    } catch (error) {
        throw new InternalError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: agentService.getAgentById - ${getErrorMessage(error)}`)
    }
}

const updateAgent = async (agentId: string, requestBody: any): Promise<any> => {
    try {
        const agent = await agentRepository.findOneBy({
            id: agentId
        })
        if (!agent) {
            throw new InternalError(StatusCodes.NOT_FOUND, `Agent ${agentId} not found`)
        }
        Object.assign(agent, requestBody)
        const dbResponse = await agentRepository.save(agent)
        return dbResponse
    } catch (error) {
        throw new InternalError(StatusCodes.INTERNAL_SERVER_ERROR, `Error: agentService.updateAgent - ${getErrorMessage(error)}`)
    }
}

export default {
    createAgent,
    deleteAgent,
    getAllAgents,
    getAgentById,
    updateAgent
}
