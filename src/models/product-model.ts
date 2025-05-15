import { Product } from "@prisma/client";

export interface ProductResponse { 
  id: number;
  imageUrl?: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  brand?: string;
  storeId: number;
  categoryId?: number;
}

export interface ProductCreateRequest{
  imageUrl?: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  brand?: string;
  categoryId?: number;
}

export interface ProductUpdateRequest{
  imageUrl?: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  brand?: string;
  categoryId?: number;
}

export const toProductResponse = (product: Product): ProductResponse => {
  return{
    id: product.id,
    imageUrl: product.imageUrl || undefined,
    name: product.name,
    description: product.description || undefined,
    price: product.price,
    stock: product.stock,
    brand: product.brand || undefined,
    storeId: product.storeId,
    categoryId: product.categoryId || undefined,
  }
}