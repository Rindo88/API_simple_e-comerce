import { NextFunction, Response } from "express";
import { RequestUser } from "../types/request-user";
import { ResponseError } from "../errors/response-error";
import { RequestStore } from "../types/request-store";
import { prisma } from "../application/database";

export const sellerAuthMiddleware = async (req: RequestStore, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'SELLER') {
    const selectedStore = await prisma.store.findUnique({
      where: { sellerUsername: req.user?.name },
      select: {
        id: true,
        name: true,
        isVerified: true
      }
    });

    if (!selectedStore) throw new ResponseError(404, 'Store not found')
    req.store = selectedStore;
    next();
  } else {
    throw new ResponseError(403, 'Seller access only')
  }
}