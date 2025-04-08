import { NextFunction, Request, Response } from "express";
import { SendResponse } from "../utils/response-handler";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user-services";


export const authenticateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.refresh_token;
    const accessToken = req.cookies?.access_token;

    console.log(refreshToken)
    console.log(accessToken)

    if (!refreshToken && !accessToken) {
      return SendResponse.errorResponse(401, res, 'Unauthorize, Please login again');
    }

    if (!accessToken && refreshToken) {
      const CheckedUserToken = await UserService.checkUserToken(refreshToken);
      const createdAccessToken = UserService.createPayloadToken(CheckedUserToken, 1, process.env.ACCESS_TOKEN_SECRET);

      res.set('authorization', createdAccessToken);
      res.cookie('access_token', createdAccessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
      return next();
    }

    if (accessToken) {
      try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
        return next();
      } catch (error) {
        return next(error);
      }
    }
    next();
  } catch (error) {
    return next(error);
  }
}