import { StatusCodes } from "http-status-codes";
import { User } from "../../database/entities/User";
import { getErrorMessage } from "../../error/utils";
import { InternalError } from "../../error/InternalError";
import { AppDataSource } from "../../data-source";
const userRepository = AppDataSource.getRepository(User);
import * as argon2 from "argon2";
import { Agent } from "../../database/entities/Agent";
import { In } from "typeorm";

const createUser = async (requestBody: any) => {
  try {
    const newUser = new User();
    Object.assign(newUser, requestBody);
    const user = await userRepository.create(newUser);
    const dbResponse = await userRepository.save(user);
    return dbResponse;
  } catch (error) {
    throw new InternalError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error: userService.createUser - ${getErrorMessage(error)}`
    );
  }
};

// Delete user from database
const deleteUser = async (userId: string): Promise<any> => {
  try {
    const dbResponse = await userRepository.delete({ id: userId });
    if (!dbResponse) {
      throw new InternalError(
        StatusCodes.NOT_FOUND,
        `User ${userId} not found`
      );
    }
    return dbResponse;
  } catch (error) {
    throw new InternalError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error: userService.deleteUser - ${getErrorMessage(error)}`
    );
  }
};

const getAllUsers = async () => {
  try {
    return await userRepository.find();
  } catch (error) {
    throw new InternalError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error: userService.getAllUsers - ${getErrorMessage(error)}`
    );
  }
};

const getUserById = async (userId: string): Promise<any> => {
  try {
    const user = await userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new InternalError(
        StatusCodes.NOT_FOUND,
        `User ${userId} not found`
      );
    }
    return user;
  } catch (error) {
    throw new InternalError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error: userService.createUser - ${getErrorMessage(error)}`
    );
  }
};

const checkUserEmail = async (email: string): Promise<any> => {
  try {
    const user = await userRepository.findOneBy({
      email: email,
    });
    const result = user ? true : false;
    return result;
  } catch (error) {
    throw new InternalError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error: userService.createUser - ${getErrorMessage(error)}`
    );
  }
};

const updateUser = async (userId: string, requestBody: any): Promise<any> => {
  try {
    const user = await userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new InternalError(
        StatusCodes.NOT_FOUND,
        `User ${userId} not found`
      );
    }
    if (user.email !== requestBody.email) {
      const emailExists = await checkUserEmail(requestBody.email);
      if (emailExists) {
        throw new InternalError(
          StatusCodes.BAD_GATEWAY,
          `Error: userController.createUser - email already exists!`
        );
      }
    }
    Object.assign(user, requestBody);
    const dbResponse = await userRepository.save(requestBody);
    return dbResponse;
  } catch (error) {
    throw new InternalError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error: userService.updateUser - ${getErrorMessage(error)}`
    );
  }
};

const validateUser = async (email: string, password: string): Promise<any> => {
  try {
    const user = await userRepository.findOneBy({
      email,
    });
    console.log(user);
    if (!user) {
      throw new InternalError(
        StatusCodes.UNAUTHORIZED,
        `Error: userService.valdiateUser - Unauthorized access`
      );
    }
    if (!(await argon2.verify(user.password, password))) {
      throw new InternalError(
        StatusCodes.UNAUTHORIZED,
        `Error: userService.valdiateUser - Unauthorized access`
      );
    }
    // omit password
    const { password: _, ...safeUser } = user;
    return safeUser;
  } catch (error) {
    throw new InternalError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error: userService.createUser - ${getErrorMessage(error)}`
    );
  }
};

const getAllAgentsByUserId = async (userId: string): Promise<any> => {
  try {
    const user = await userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new InternalError(
        StatusCodes.NOT_FOUND,
        `User ${userId} not found`
      );
    }
    if (user.agentids && user.agentids.length <= 0) return [];
    const agents = AppDataSource.getRepository(Agent).find({
      where: {
        id: In(user.agentids || []),
      },
    });
    return agents;
  } catch (error) {
    throw new InternalError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error: userService.getAllAgentsByUserId - ${getErrorMessage(error)}`
    );
  }
};

const changePassword = async (
  userid: string,
  oldpassword: string,
  newpassword: string
): Promise<any> => {
  try {
    const user = await userRepository.findOneBy({
      id: userid,
    });
    if (!user) {
      throw new InternalError(
        StatusCodes.NOT_FOUND,
        `User ${userid} not found`
      );
    }
    const isPasswordMatch = await argon2.verify(user.password, oldpassword);
    if (!isPasswordMatch) {
      throw new InternalError(
        StatusCodes.BAD_GATEWAY,
        "Incorrect old password"
      );
    }
    const hashedPassword = await argon2.hash(newpassword);
    user.password = hashedPassword;
    return await userRepository.save(user);
  } catch (error) {
    throw new InternalError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error: userService.changePassword - ${getErrorMessage(error)}`
    );
  }
};

export default {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  checkUserEmail,
  validateUser,
  getAllAgentsByUserId,
  changePassword,
};
