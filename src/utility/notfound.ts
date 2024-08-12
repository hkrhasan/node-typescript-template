import { Request, Response } from "express";
import { createErrorResponse } from "./response-wrapper";

export const notFound = (_: Request, res: Response) => {
  res
    .status(404)
    .json(
      createErrorResponse(
        "Not Found",
        404,
        "The requested resource was not found."
      )
    );
};
