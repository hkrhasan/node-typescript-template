import { Response, Request } from "express";
import { User } from "@prisma/client";
import {
  createUserWithEmailAndPassword,
  getUserByEmail,
  shapeUserProfile,
  comparePassword,
  generateTokens,
} from "../services";
import {
  createSuccessResponse,
  creatCatchErrorResponse,
  logger,
} from "../utility";
import { CustomError } from "../custom";
import { IUserWithPassword, IUser } from "../interfaces";

export const loginWithEmailAndPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    let user: User | IUser | null = await getUserByEmail(email);

    if (!user) {
      throw new CustomError("User not exists with this email ${email}", 404);
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      throw new CustomError("Invalid password", 400);
    }

    user = shapeUserProfile(user);

    const tokens = generateTokens(user);

    res.status(200).json(
      createSuccessResponse(
        {
          ...user,
          tokens,
        },
        "Login Success"
      )
    );
  } catch (error) {
    const errorCode = error.code || 500;
    logger.error("Error:", error);

    if (errorCode === 500) {
      error.message = "Internal Server Error";
    }
    res.status(errorCode).json(creatCatchErrorResponse(error));
  }
};

export const registerWithEmailAndPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const userObj = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    } as IUserWithPassword;

    const user = await createUserWithEmailAndPassword(userObj);

    res
      .status(201)
      .json(createSuccessResponse(user, "User created successfully"));
  } catch (error) {
    const errorCode = error.code || 500;
    logger.error("Error:", error);

    if (errorCode === 500) {
      error.message = "Internal Server Error";
    }

    res.status(errorCode).json(creatCatchErrorResponse(error));
  }
};
