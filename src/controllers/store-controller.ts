import { NextFunction, Request, Response } from "express";
import { StoreService } from "../services/store-service";
import { SendResponse } from "../utils/response-handler";
import { RequestStore } from "../types/request-store";
import { StoreCreateRequest, StoreUpdateRequest } from "../models/store-model";
import { RequestUser } from "../types/request-user";

export class StoreController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await StoreService.get(req.params.storeName);
      SendResponse.successResponse(200, res, 'Success Get Store', response);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const request: StoreCreateRequest = req.body;
      const response = await StoreService.create(req.user!, request);
      SendResponse.successResponse(201, res, 'Store successfuly created', response);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: RequestStore, res: Response, next: NextFunction) {
    try {
      const request: StoreUpdateRequest = req.body;
      const response = await StoreService.update(req.store!, req.user!,request);
      SendResponse.successResponse(200, res, 'Update store successfuly', response);
    } catch (error) {
      next(error);
    }
  }
  
  static async delete(req: RequestStore, res: Response, next: NextFunction) {
    try {
      const response = await StoreService.delete(req.store!, req.user!);
      SendResponse.successResponse(200, res, 'Update store successfuly', response);
    } catch (error) {
      next(error);
    }
  }
}