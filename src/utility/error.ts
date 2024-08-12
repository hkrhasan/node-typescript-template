import { Prisma } from "@prisma/client";
import { CustomError } from "../custom";

export function getErrorFields(
  error: Prisma.PrismaClientKnownRequestError
): string {
  if (!error.meta) {
    return "";
  }
  const fields = error.meta.target as string[];
  return fields.join(", ");
}

export function isPrismaError(error: any): CustomError | undefined {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return new CustomError(
          `${getErrorFields(error)} is already taken`,
          400
        );
      default:
        return new CustomError(
          "An error occurred while processing your request with Database",
          400
        );
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return new CustomError("Validation error: " + error.message, 400);
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    return new CustomError("Database connection error: " + error.message, 500);
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    return new CustomError("Database error: " + error.message, 500);
  } else {
    return undefined;
  }
}
