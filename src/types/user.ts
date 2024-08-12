import { IJWTTokens, IUser } from "../interfaces";

export type UserWithTokens = IUser & {
  tokens: IJWTTokens;
};
