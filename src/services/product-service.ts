import { prisma } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { ProductCreateRequest, ProductResponse, ProductUpdateRequest, toProductResponse } from "../models/product-model";
import { StorePayloadRequest } from "../models/store-model";
import { MetaPageResponse } from "../types/meta-page";
import { RequestStore } from "../types/request-store";
import { Validation } from "../validations/validation";
import { ProductValidation } from "../validations/product-validation";

export class ProductService {
  public static async checkProductStoreOwnerShip(id: number, storeId: number): Promise<void> {
    const countExistingProduct = await prisma.product.count({
      where: {
        id,
        storeId
      }
    });

    if (countExistingProduct < 1) throw new ResponseError(404, 'Product doesnt exists');
  }

  static async create(store: StorePayloadRequest, req: ProductCreateRequest): Promise<ProductResponse> {
    Validation.validate(ProductValidation.CREATE, req);
    const product = await prisma.product.create({
      data: {
        ...req,
        storeId: store.id,
        ...(req.categoryId ? { categoryId: req.categoryId } : {})
      }
    });

    return toProductResponse(product);
  }

  static async get(id: number): Promise<ProductResponse> {
    const product = await prisma.product.findFirst({
      where: { id }
    });

    if (!product) throw new ResponseError(404, 'Product not found');

    return toProductResponse(product);
  }

  static async getSeller(store: StorePayloadRequest, take: number, page: number): Promise<MetaPageResponse<ProductResponse>> {
    const products = await prisma.product.findMany({
      where: { storeId: store.id },
      take,
      skip: ((page - 1) * take)
    });

    if (!products) throw new ResponseError(404, 'Product doesnt exists');

    const totalPages = Math.ceil((await prisma.product.count()) / take);
    return {
      data: products.map(product => toProductResponse(product)),
      meta: {
        page,
        take,
        totalPages
      }
    }
  }

  static async getAll(take: number, page: number): Promise<MetaPageResponse<ProductResponse>> {
    const products = await prisma.product.findMany({
      take,
      skip: ((page - 1) * take)
    });

    const totalPages = Math.ceil((await prisma.product.count()) / take);

    if (!products) throw new ResponseError(404, 'Product not found');

    return {
      data: products.map(product => toProductResponse(product)),
      meta: {
        take,
        page,
        totalPages
      }
    }
  }

  static async update(store: StorePayloadRequest, req: ProductUpdateRequest, id: number): Promise<ProductResponse> {
    Validation.validate(ProductValidation.UPDATE, req);
    await this.checkProductStoreOwnerShip(id, store.id)

    const update = await prisma.product.update({
      where: {
        id,
        storeId: store.id
      },
      data: { ...req }
    });

    return toProductResponse(update)
  }

  static async delete(store: StorePayloadRequest, id: number): Promise<ProductResponse> {
    await this.checkProductStoreOwnerShip(id, store.id);

    const product = await prisma.product.delete({
      where: {
        id,
        storeId: store.id
      }
    });

    return toProductResponse(product);
  }
}