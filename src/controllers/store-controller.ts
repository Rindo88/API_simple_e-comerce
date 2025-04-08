import { NextFunction, Request, Response } from "express";
import { StoreService } from "../services/store-service";
import { SendResponse } from "../utils/response-handler";

export class StoreController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await StoreService.get(req.params.storeName);
      SendResponse.successResponse(200, res, 'Success Get Store', response);
    } catch (error) {
      next(error);
    }
  }
}