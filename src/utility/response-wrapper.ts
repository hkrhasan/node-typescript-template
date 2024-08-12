import { SuccessResponse, ErrorResponse } from "../types";
import { CustomError } from "../custom";
export function createSuccessResponse<T>(
  data: T,
  message?: string
): SuccessResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function createErrorResponse(
  error: string,
  statusCode: number,
  message?: string
): ErrorResponse {
  return {
    success: false,
    message,
    error,
    statusCode,
  };
}

export function creatCatchErrorResponse(
  error: Error | unknown,
  message?: string
): ErrorResponse {
  const typeCastError = error as CustomError;

  return {
    success: false,
    message: message || typeCastError.message,
    error: typeCastError.message,
    statusCode: parseInt(typeCastError.code + "") || 500,
  };
}

export function createJoiErrorResponse(
  error: any,
  statusCode: number,
  message?: string
): ErrorResponse {
  return {
    success: false,
    message,
    error: error.details.map((detail: any) => detail.message).join(", "),
    statusCode,
  };
}
