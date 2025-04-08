import { User } from "@prisma/client";
import { UserPayloadResponse } from "../types/user-payload";

export interface UserResponse {
  username: string;
  email?: string;
  name?: string;
  role?: string;
  token?: UserPayloadResponse
}

export interface UserCreateRequest {
  username: string;
  email?: string;
  password: string;
  name?: string;
}

export interface UserLoginRequest {
  identifier: string,
  password: string
}

export interface UserUpdateRequest  {
  email?: string;
  password?: string;
  name?: string;
}


export const toUserResponse = (user: User, token?: UserPayloadResponse): UserResponse => {
  return {
    username: user.username,
    email: user.email || undefined,
    name: user.name || undefined,
    token: {
      acccessToken: token?.acccessToken!,
      refreshToken: token?.refreshToken!
    }
  }
}

