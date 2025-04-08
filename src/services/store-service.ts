import { prisma } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { StoreResponse, toStoreResponse } from "../models/store-model";

export class StoreService {
  static async get (name: string): Promise<StoreResponse> {
    const store =  await prisma.store.findFirst({
      where: {name: name}
    });

    if(!store) throw new ResponseError(404, 'Store Not Found');
    const StoreProducts = await prisma.product.findMany({
      where: {storeId: store?.id}
    });
    return toStoreResponse(store!, StoreProducts);
  }
}