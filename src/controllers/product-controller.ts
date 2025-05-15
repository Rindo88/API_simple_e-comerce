import { NextFunction, Request, Response } from "express";
import { RequestStore } from "../types/request-store";
import { ProductService } from "../services/product-service";
import { ProductCreateRequest, ProductUpdateRequest } from "../models/product-model";
import { SendResponse } from "../utils/response-handler";
import { MetaPageRequest } from "../types/meta-page";

export class ProductController {
  static async create(req: RequestStore, res: Response, next: NextFunction) {
    try {
      const request: ProductCreateRequest = req.body;
      const response = await ProductService.create(req.store!, request);
      SendResponse.successResponse(201, res, 'Product successfuly created', response);
    } catch (error) {
      next(error);
    }
  }
  
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await ProductService.get(id);
      SendResponse.successResponse(200, res, 'Product successfuly get', response);
    } catch (error) {
      next(error);
    }
  }

  static async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const request: MetaPageRequest = {
        take: Number(req.query.take) || 10,
        page: Number(req.query.page) || 1
      }
      const response = await ProductService.getAll(request.take, request.page);
      SendResponse.successResponse(200, res, 'Product successfuly get', response);
    } catch (error) {
      next(error);
    }
  }

  static async getSellerProducts(req: RequestStore, res: Response, next: NextFunction) {
    try {
      const request: MetaPageRequest = {
        take: Number(req.query.take) || 10,
        page: Number(req.query.page) || 1
      }
      const response = await ProductService.getSeller(req.store!, request.take, request.page);
      SendResponse.successResponse(200, res, 'Product successfuly get', response);
    } catch (error) {
      next(error);
    }
  }

  static async updateProductSeller(req: RequestStore, res: Response, next: NextFunction) {
    try {
      const request: ProductUpdateRequest = req.body;
      const response = await ProductService.update(req.store!, request, Number(req.params.id));
      SendResponse.successResponse(200, res, 'Successfuly updated product', response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductSeller(req: RequestStore, res: Response, next: NextFunction) {
    try {
      const response = await ProductService.delete(req.store!, Number(req.params.id));
      SendResponse.successResponse(200, res, 'Successfuly deleted product', response);
    } catch (error) {
      next(error);
    }
  }
}