import { NextFunction, Response } from "express";
import { RequestUser } from "../types/request-user";
import jwt from 'jsonwebtoken';
import { ResponseError } from "../errors/response-error";
import { UserPayloadRequest } from "../models/user-payload-model";

export const decodeMiddleware = (req: RequestUser, res: Response, next: NextFunction) => {
  let token = req.headers['authorization'];
  try {
    if (!token) {
      token = req.cookies.access_token;
    }

    jwt.verify(token!,
      process.env.ACCESS_TOKEN_SECRET!,
      (error, decode) => {
        if (error) throw new ResponseError(401, 'Unauthorize');
        req.user = decode as UserPayloadRequest;
      }
    );
    return next();
  } catch (error) {
    return next(error);
  }
}