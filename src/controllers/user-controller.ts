import { NextFunction, Request, Response } from "express";
import { UserCreateRequest, UserLoginRequest, UserUpdateRequest } from "../models/user-model";
import { UserService } from "../services/user-services";
import { SendResponse } from "../utils/response-handler";
import { RequestUser } from "../types/request-user";

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UserCreateRequest = req.body;
      const response = await UserService.create(request);
      SendResponse.successResponse(201, res, 'Successfuly Created user', {
        username: response.username,
        name: response.name,
        email: response.email
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UserLoginRequest = req.body;
      const response = await UserService.login(request);

      res.cookie('access_token', response.token?.acccessToken, { httpOnly: true, maxAge: 1000 * 60 });
      res.cookie('refresh_token', response.token?.refreshToken, { httpOnly: true, maxAge: 1000 * 60 });

      SendResponse.successResponse(200, res, 'Login Successfuly', {
        username: response.username,
        name: response.name,
        email: response.email
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const request: UserUpdateRequest = req.body;
      const response = await UserService.update(req.user!, request);

      if (response.token) {
        SendResponse.successResponse(200, res, 'Update Successfuly', response);


        res.cookie('access_token', response.token?.acccessToken, { httpOnly: true, maxAge: 1000 * 60 });
        res.cookie('refresh_token', response.token?.refreshToken, { httpOnly: true, maxAge: 1000 * 60 });
      } else {
        SendResponse.successResponse(200, res, 'Update Successfuly', {
          username: response.username,
          name: response.name,
          email: response.email
        });
      }
    } catch (error) {
      next(error);
    }
  }
  
  static async get(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const response = await UserService.delete(req.user!);

      SendResponse.successResponse(200, res, 'Get Successfuly', {
        username: response.username,
        name: response.name,
        email: response.email
      })
    } catch (error) {
      next(error);
    }
  }
  
  static async delete(req: RequestUser, res: Response, next: NextFunction) {
    try {
      const response = await UserService.delete(req.user!);

      SendResponse.successResponse(200, res, 'Delete Successfuly', {
        username: response.username,
        name: response.name,
        email: response.email
      })
    } catch (error) {
      next(error);
    }
  }

}