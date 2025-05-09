import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../../data-source";
import { RequestAgent } from "../../database/entities/RequestAgent";
import { InternalError } from "../../error/InternalError";
import { getErrorMessage } from "../../error/utils";
import { User } from "../../database/entities/User";

const createRquestAgent = async (requestBody: any) => {
  try {
    const newUser = new RequestAgent();
    Object.assign(newUser, requestBody);
    const user =
      await AppDataSource.getRepository(RequestAgent).create(newUser);
    const dbResponse =
      await AppDataSource.getRepository(RequestAgent).save(user);
    return dbResponse;
  } catch (error) {
    throw new InternalError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error: userService.createUser - ${getErrorMessage(error)}`
    );
  }
};

const changeRequestAgentStatus = async (requestBody: any): Promise<any> => {
  try {
    let requestAgent = await AppDataSource.getRepository(
      RequestAgent
    ).findOneBy({
      id: requestBody.requestagentid,
    });
    if (!requestAgent) {
      throw new InternalError(
        StatusCodes.NOT_FOUND,
        `request agent ${requestBody.requestagentid} not found`
      );
    }
    requestAgent = {
      ...requestAgent,
      status: requestBody.status,
      updatedDate: new Date(),
    };
    const dbResponse =
      await AppDataSource.getRepository(RequestAgent).save(requestAgent);
    const user = await AppDataSource.getRepository(User).findOne({
      where: {
        id: requestAgent.userid,
      },
    });
    if (user) {
      const existingAgentIds = user.agentids || [];
      const updatedAgents = [...existingAgentIds, requestAgent.agentid];
      user.agentids = updatedAgents;
      AppDataSource.getRepository(User).save(user);
    }
    return dbResponse;
  } catch (error) {
    throw new InternalError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error: requestAgentService.changeRequestAgentStatus - ${getErrorMessage(error)}`
    );
  }
};

const getRequestAgents = async (): Promise<any> => {
  try {
    console.log("Requestagent###");
    const dbResponse = await AppDataSource.getRepository(RequestAgent).find();
    return dbResponse;
  } catch (error) {
    throw new InternalError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error: requestAgentService.getRequestAgents - ${getErrorMessage(error)}`
    );
  }
};

export default {
  createRquestAgent,
  changeRequestAgentStatus,
  getRequestAgents,
};
