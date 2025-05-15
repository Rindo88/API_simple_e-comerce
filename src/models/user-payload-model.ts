import { Role } from "@prisma/client";

export interface UserPayloadRequest  {
  username: string;
  email?: string;
  name?: string;
  role: Role
}

export interface UserPayloadResponse  {
  acccessToken: string;
  refreshToken: string;
}

