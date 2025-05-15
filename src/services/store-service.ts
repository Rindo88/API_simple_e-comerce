import { prisma } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { StoreCreateRequest, StorePayloadRequest, StoreResponse, StoreUpdateRequest, toStoreResponse } from "../models/store-model";
import { UserPayloadRequest } from "../models/user-payload-model";
import { StoreValidation } from "../validations/store-validation";
import { Validation } from "../validations/validation";

export class StoreService {
  public static async checkExistingStore(name: string, isFind: boolean): Promise<void> {
    const store = await prisma.store.count({
      where: { name }
    });

    switch (isFind) {
      case true:
        if (store < 1) throw new ResponseError(404, 'Store Not Found');
        break;
      case false:
        if (store > 0) throw new ResponseError(409, 'Store Already Exists');
        break;
    }
  }

  static async get(name: string): Promise<StoreResponse> {
    const store = await prisma.store.findFirst({
      where: { name: name }
    });

    if (!store) throw new ResponseError(404, 'Store Not Found');
    const StoreProducts = await prisma.product.findMany({
      where: { storeId: store?.id }
    });
    return toStoreResponse(store!, StoreProducts);
  }

  static async create(user: UserPayloadRequest, req: StoreCreateRequest): Promise<StoreResponse> {
    await this.checkExistingStore(req.name, false)
    Validation.validate(StoreValidation.CREATE, req);
    const store = await prisma.$transaction(async (tx) => {
      const newStore = await tx.store.create({
        data: {
          ...req,
          sellerUsername: user.username
        }
      });

      await tx.user.update({
        where: { username: user.username },
        data: { role: "SELLER" }
      });

      return newStore;
    });

    return toStoreResponse(store);
  }

  static async update(store: StorePayloadRequest, user: UserPayloadRequest, req: StoreUpdateRequest): Promise<StoreResponse> {
    await this.checkExistingStore(store.name, true);
    Validation.validate(StoreValidation.UPDATE, req);

    const updateStore = await prisma.store.update({
      where: {
        id: store.id,
        sellerUsername: user.username
      },
      data: req
    });

    return toStoreResponse(updateStore)
  }

  static async delete(store: StorePayloadRequest, user: UserPayloadRequest): Promise<StoreResponse> {
    const deletedStore = await prisma.$transaction(async (tx) => {
      const deleteStore = await prisma.store.delete({
        where: {
          id: store.id,
          sellerUsername: user.username
        }
      });

      await prisma.user.update({
        where: { username: user.username },
        data: { role: 'CUSTOMER' }
      });
      return deleteStore;
    });
    return toStoreResponse(deletedStore);
  }
}