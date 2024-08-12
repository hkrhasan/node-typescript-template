import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import {
  logger,
  createJoiErrorResponse,
  creatCatchErrorResponse,
} from "../utility";

export const validate =
  (Validator: Joi.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Validator.validateAsync(req.body);
      next();
    } catch (error) {
      logger.error("Validation Error: ", error);

      if (error instanceof Joi.ValidationError) {
        return res
          .status(400)
          .json(createJoiErrorResponse(error, 400, "invalid input"));
      }

      return res
        .status(500)
        .json(creatCatchErrorResponse(error, "internal server error"));
    }
  };
