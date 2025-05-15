import { NextFunction, Response } from "express";
import { RequestUser } from "../types/request-user";
import { AddressCreateRequest, AddressUpdateRequest } from "../models/address-model";
import { AddressService } from "../services/address-service";
import { SendResponse } from "../utils/response-handler";
import { RequestStore } from "../types/request-store";
import { StoreController } from "./store-controller";

export class AddressController {
  static async create(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const request: AddressCreateRequest = req.body; 
      const response = await AddressService.create(req.user!, request);
      SendResponse.successResponse(201, res, 'Address successfuly created', response);
    } catch (error) {
      next(error);
    }
  }

  static async getBySeller(req: RequestStore, res: Response, next: NextFunction) {
    try {
      const response = await AddressService.get(req.user!, req.store!);
      SendResponse.successResponse(201, res, 'Address successfuly Get', response);
    } catch (error) {
      next(error);
    }
  }

  static async getByUser(req: RequestStore, res: Response, next: NextFunction) {
    try {
      const response = await AddressService.get(req.user!);
      SendResponse.successResponse(201, res, 'Address successfuly Get', response);
    } catch (error) {
      next(error);
    }
  }

  static async updateBySeller(req: RequestStore, res: Response, next: NextFunction){
    try {
      const request: AddressUpdateRequest = req.body;
      const response = await AddressService.update(req.user!, request, req.store!)
      SendResponse.successResponse(200, res, 'Successfuly update address', response);
    } catch (error) {
      next(error);
    }
  }

  static async updateByUser(req: RequestStore, res: Response, next: NextFunction){
    try {
      const request: AddressUpdateRequest = req.body;
      const response = await AddressService.update(req.user!, request)
      SendResponse.successResponse(200, res, 'Successfuly update address', response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteByUser(req: RequestUser, res: Response, next: NextFunction){
    try {
      const response = await AddressService.delete(req.user!);
      SendResponse.successResponse(200, res, 'Successfuly deleted address', response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBySeller(req: RequestStore, res: Response, next: NextFunction){
    try {
      const response = await AddressService.delete(req.user!, req.store!);
      SendResponse.successResponse(200, res, 'Successfuly deleted address', response);
    } catch (error) {
      next(error);
    }
  }
}