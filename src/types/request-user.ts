import { Request } from "express";
import { UserPayloadRequest } from "./user-payload";

export interface RequestUser extends Request {
  user?: UserPayloadRequest;
}