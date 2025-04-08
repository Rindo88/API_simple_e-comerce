import { User } from "@prisma/client";
import { prisma } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { toUserResponse, UserCreateRequest, UserLoginRequest, UserResponse, UserUpdateRequest } from "../models/user-model";
import { Validation } from "../validations/validation";
import { UserValidation } from "../validations/user-validation";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserPayloadRequest } from "../types/user-payload";

export class UserService {
  public static async checkUserToken(token: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: { token }
    });

    if (!user) {
      throw new ResponseError(404, 'Token invalid');
    }

    return user;
  }

  public static createPayloadToken(user: User, expire: number, secret: any): string {
    return jwt.sign(
      {
        username: user.username,
        email: user.email,
        name: user.name,
        roles: user.role
      },
      secret,
      { expiresIn: `${expire}d` }
    );
  }

  static async create(req: UserCreateRequest): Promise<UserResponse> {
    Validation.validate(UserValidation.CREATE, req);
    const countUser = await prisma.user.count({
      where: {
        OR: [
          { username: req.username },
          { email: req.email }
        ]
      }
    });
    if (countUser > 0) throw new ResponseError(409, 'Username Or Email Allready Used');

    req.password = await bcrypt.hash(req.password, 10);
    const user = await prisma.user.create({
      data: req
    });

    return toUserResponse(user);
  }

  static async login(req: UserLoginRequest): Promise<UserResponse> {
    Validation.validate(UserValidation.LOGIN, req)
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: req.identifier },
          { email: req.identifier }
        ]
      }
    });

    if (!user) throw new ResponseError(401, 'Invalid Credential');

    const isMatchPassword = await bcrypt.compare(req.password, user.password);
    if (!isMatchPassword) throw new ResponseError(401, 'Invalid Credential');

    const accessToken = this.createPayloadToken(user, 1, process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = this.createPayloadToken(user, 7, process.env.REFRESH_TOKEN_SECRET);

    await prisma.user.update({
      where: { username: user.username },
      data: { token: refreshToken }
    });

    return toUserResponse(user, {
      acccessToken: accessToken,
      refreshToken: refreshToken
    });
  }

  static async update(user: UserPayloadRequest, req: UserUpdateRequest): Promise<UserResponse> {
    const request = Validation.validate(UserValidation.UPDATE, req);

    if (request.password) {
      request.password = await bcrypt.hash(request.password, 10);
    }

    const updateUser = await prisma.user.update({
      where: {
        username: user.username,
        email: user.email
      },
      data: request
    });

    if (request.name || request.email) {

      const accessToken = this.createPayloadToken(updateUser, 1, process.env.ACCESS_TOKEN_SECRET);
      const refreshToken = this.createPayloadToken(updateUser, 7, process.env.REFRESH_TOKEN_SECRET);

      prisma.user.update({
        where: { username: user.username },
        data: { token: refreshToken }
      });

      return toUserResponse(updateUser, {
        acccessToken: accessToken,
        refreshToken: refreshToken
      });
    }
    return toUserResponse(updateUser);
  }

  static async get(user: UserPayloadRequest): Promise<UserResponse> {
    const countUser = await prisma.user.count({
      where: {
        username: user.username,
        email: user.email
      }
    });
    if (countUser < 1) throw new ResponseError(404, 'User Not Found');
    
    const dataUser = await prisma.user.findUnique({
      where: {
        username: user.username,
        email: user.email
      }
    });
    return toUserResponse(dataUser!);
  }

  static async delete(user: UserPayloadRequest): Promise<UserResponse> {
    const countUser = await prisma.user.count({
      where: {
        username: user.username,
        email: user.email
      }
    });
    if (countUser < 1) throw new ResponseError(404, 'User Not Found');
    const updateUser = await prisma.user.delete({
      where: { username: user.username }
    });

    return toUserResponse(updateUser);
  }
}