import { NextFunction, Request, Response } from "express";
import { InternalError } from "../../error/InternalError";
import { StatusCodes } from "http-status-codes";
import userService from "../../service/user";
import { generateAPIKey } from "../../utils";
import * as argon2 from "argon2";
import { generateToken } from "../../utils/jwt";

const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const apiResponse = await userService.getAllUsers();
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (typeof req.params === "undefined" || !req.params.id) {
      throw new InternalError(
        StatusCodes.PRECONDITION_FAILED,
        `Error: userController.getUserById - id not provided!`
      );
    }
    const user = await userService.getUserById(req.params.id);
    
    // Verify password if provided in request
    if (req.body?.password) {
      const isPasswordValid = await argon2.verify(user.password, req.body.password);
      if (!isPasswordValid) {
        throw new InternalError(
          StatusCodes.UNAUTHORIZED,
          `Error: userController.getUserById - Invalid password`
        );
      }
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.body) {
      throw new InternalError(
        StatusCodes.PRECONDITION_FAILED,
        `Error: userController.createUser - body not provided!`
      );
    }
    const emailExists = await userService.checkUserEmail(req.body.email);
    if (emailExists) {
      throw new InternalError(
        StatusCodes.BAD_GATEWAY,
        `Error: userController.createUser - email already exists!`
      );
    }
    const originalPassword = req.body.password;
    const password = await argon2.hash(originalPassword);
    req.body.password = password;
    req.body.apikey = generateAPIKey();
    const apiResponse = await userService.createUser(req.body);
    // Include original password in response
    res.json({ ...apiResponse, originalPassword });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (typeof req.params === "undefined" || !req.params.id) {
      throw new InternalError(
        StatusCodes.PRECONDITION_FAILED,
        `Error: userController.updateUser - id not provided!`
      );
    }
    if (!req.body) {
      throw new InternalError(
        StatusCodes.PRECONDITION_FAILED,
        `Error: userController.updateUser - body not provided!`
      );
    }
    const apiResponse = await userService.updateUser(req.params.id, req.body);
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (typeof req.params === "undefined" || !req.params.id) {
      throw new InternalError(
        StatusCodes.PRECONDITION_FAILED,
        `Error: userController.deleteUser - id not provided!`
      );
    }
    const apiResponse = await userService.deleteUser(req.params.id);
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.body) {
      throw new InternalError(
        StatusCodes.PRECONDITION_FAILED,
        `Error: userController.loginUser - username and password are not provided!`
      );
    }
    console.log(req.body);
    const user = await userService.validateUser(
      req.body.email,
      req.body.password
    );
    const token = generateToken({
      id: user.id,
      email: user.email,
    });
    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const getAllAgentsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (typeof req.params === "undefined" || !req.params.userid) {
      throw new InternalError(
        StatusCodes.PRECONDITION_FAILED,
        `Error: userController.getAllAgentsByUserId - userid not provided!`
      );
    }
    const apiResponse = await userService.getAllAgentsByUserId(
      req.params.userid
    );
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Assuming you have middleware that adds the user ID to the request (e.g., req.userId)
    const { userid, oldpassword, newpassword } = req.body;

    if (!oldpassword || !newpassword) {
      throw new InternalError(
        StatusCodes.BAD_GATEWAY,
        "Please provide both old and new passwords."
      );
    }
    await userService.changePassword(userid, oldpassword, newpassword);
    res.json({ message: "Password updated successfully." });
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
  getAllAgentsByUserId,
  changePassword,
};
