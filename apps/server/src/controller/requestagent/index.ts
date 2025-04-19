import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RequestAgent } from "../../database/entities/RequestAgent";
import { InternalError } from "../../error/InternalError";
import requestAgentService from "../../service/requestagent";

const getRequestAgents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const apiResponse = await requestAgentService.getRequestAgents();
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

const saveRequestAgent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.body) {
      throw new InternalError(
        StatusCodes.PRECONDITION_FAILED,
        `Error: requestAgentController.saveRequestAgent - body not provided!`
      );
    }
    const body = req.body;
    let requestAgent = new RequestAgent();
    Object.assign(requestAgent, body);
    const apiResponse =
      await requestAgentService.createRquestAgent(requestAgent);
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

const changeRequestAgentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.body) {
      throw new InternalError(
        StatusCodes.PRECONDITION_FAILED,
        `Error: requestAgentController.changeRequestAgenttatus - body not provided!`
      );
    }
    const body = req.body;
    const apiResponse = await requestAgentService.changeRequestAgentStatus({
      requestagentid: body.requestagentid,
      status: body.status,
    });
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export default {
  getRequestAgents,
  saveRequestAgent,
  changeRequestAgentStatus,
};
