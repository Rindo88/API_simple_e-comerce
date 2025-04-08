import { Response } from "express";

export class SendResponse {
  static successResponse(statusCode: number, res: Response, message: string, data?: any) {
    res.status(statusCode).send({
      status: 'success',
      message,
      data
    });
  }

  static errorResponse(statusCode: number, res: Response, message: string, data?: any) {
    res.status(statusCode).send({
      status: 'failed',
      message,
      data
    });
  }
}