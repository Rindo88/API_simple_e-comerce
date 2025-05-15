import { StorePayloadRequest } from "../models/store-model";
import { RequestUser } from "./request-user";

export interface RequestStore extends RequestUser {
  store?: StorePayloadRequest;
}