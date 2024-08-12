import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Config from "../config";
import { IJWTTokens } from "../interfaces";

import { IUser } from "../interfaces";

export const comparePassword = (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const generateTokens = (user: IUser): IJWTTokens => {
  console.log("Config.APP_SECRET", Config.APP_SECRET);
  const accessToken = generateToken(user, "1d");
  const refreshToken = generateToken(user, "7d");

  return {
    accessToken,
    refreshToken,
  };
};

export const generateToken = (user: IUser, expiresIn: string): string => {
  return jwt.sign(user, Config.APP_SECRET, { expiresIn });
};
