import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../errors/response-error";
import { ZodError } from "zod";
import { SendResponse } from "../utils/response-handler";

export const errorMiddleware = (error: ResponseError, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    return SendResponse.errorResponse(400, res, 'Validation Error', error);
  } else if (error instanceof ResponseError) {
    return SendResponse.errorResponse(error.statusCode, res, error.message, error);
  } else {
    return SendResponse.errorResponse(500, res, 'Internal Server Error', 'An unexpected error occurred');
  }
}