import { PrismaClient, User } from "@prisma/client";
import { IUserWithPassword, IUser } from "../interfaces";
import { isPrismaError } from "../utility";
import { CustomError } from "../custom";
import { hashPassword } from "./auth";

const prisma = new PrismaClient();

export const userProfile: { [key: string]: any } = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  roles: true,
  password: false,
};

export const shapeUserProfile = (user: User): IUser => {
  const userObj: { [key: string]: any } = { ...user };
  Object.keys(user).forEach((key) => {
    if (!userProfile[key]) {
      delete userObj[key];
    }
  });

  return userObj as IUser;
};

export async function createUserWithEmailAndPassword(
  user: IUserWithPassword,
  needCredentials = false
) {
  try {
    if (needCredentials) userProfile.password = true;
    const hashedPassword = await hashPassword(user.password);
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      select: userProfile,
    });

    return newUser;
  } catch (error) {
    const prismaError = isPrismaError(error);
    if (prismaError) {
      throw prismaError;
    }
    throw new CustomError(
      "something went wrong while createing user with email and password",
      500
    );
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    const prismaError = isPrismaError(error);
    if (prismaError) {
      throw prismaError;
    }
    throw new CustomError("something went wrong while fetching user", 500);
  }
}

export async function getUserById(id: string, needCredentials = false) {
  try {
    if (needCredentials) userProfile.password = true;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: userProfile,
    });

    return user;
  } catch (error) {
    const prismaError = isPrismaError(error);
    if (prismaError) {
      throw prismaError;
    }
    throw new CustomError("something went wrong while fetching user", 500);
  }
}
