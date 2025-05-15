import { Request } from "express";
import { UserPayloadRequest } from "../models/user-payload-model";

export interface RequestUser extends Request {
  user?: UserPayloadRequest;
}