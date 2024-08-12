import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { IUser } from "../interfaces";
import { getUserById } from "../services";
import { CustomError } from "../custom";
import Config from "../config";
import { logger } from "../utility";

// Options for extracting and verifying JWT
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Config.APP_SECRET,
};

// Wraps the passport JWT strategy
export const initializePassport = (passport: passport.PassportStatic) => {
  passport.use(
    new JWTStrategy(
      options,
      async (
        jwtPayload: IUser,
        done: (error: any, user?: any, info?: any) => void
      ) => {
        try {
          const user = await getUserById(jwtPayload.id);

          if (!user) {
            logger.error("User not found");
            return done(
              null,
              false,
              new CustomError("Suspicious activity detected", 401)
            );
          }

          return done(null, user);
        } catch (error) {
          logger.error("Error in passport strategy", error);
          return done(error, false);
        }
      }
    )
  );
};

// Initialize the passport strategy
initializePassport(passport);

export { passport };
