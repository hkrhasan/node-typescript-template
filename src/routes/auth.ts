import express from "express";

import { validate } from "../middlewares";
import { AuthValidator } from "../validators";
import {
  registerWithEmailAndPassword,
  loginWithEmailAndPassword,
} from "../controllers";

const authRouter = express.Router();

// registerWithEmailAndPassword
authRouter.post(
  "/register-with-email-password",
  validate(AuthValidator.registerWithEmailAndPassword),
  registerWithEmailAndPassword
);

authRouter.post(
  "/login-with-email-password",
  validate(AuthValidator.loginWithEmailAndPassword),
  loginWithEmailAndPassword
);

export default authRouter;
