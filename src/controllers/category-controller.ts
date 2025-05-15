import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category-service";
import { SendResponse } from "../utils/response-handler";
import { MetaPageRequest } from "../types/meta-page";

export class CategoryController{
  static async get(req: Request, res: Response, next: NextFunction){
    try {
      const response = await CategoryService.get(Number(req.params.id));
      SendResponse.successResponse(200, res, 'Successfuly get category')
    } catch (error) {
      next(error);
    }
  }

  static async getCategories(req: Request, res: Response, next: NextFunction){
    try {
      const request: MetaPageRequest = {
        page: Number(req.query.page) || 1,
        take: Number(req.query.take) || 10
      }
      
      const response = await CategoryService.getCategories(request);
      SendResponse.successResponse(200, res, 'Successfuly get category')
    } catch (error) {
      next(error);
    }
  }
}