import { Product, Store } from "@prisma/client";

export interface StorePayloadRequest {
  id: number;
  name: string;
  isVerified: boolean;
}

export interface StoreResponse {
  name: string;
  description?: string;
  isVerified?: boolean;
  logoUrl?: string;
  bannerUrl?: string;
  contact: string;
  totalSales?: number;
  totalProducts?: number;
  product?: Product[];
}

export interface StoreCreateRequest {
  name: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  contact: string;
}

export interface StoreUpdateRequest {
  name?: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  contact?: string;
}


export const toStoreResponse = (store: Store, product?: Product[]): StoreResponse => {
  return {
    name: store.name,
    description: store.description || undefined,
    contact: store.contact,
    isVerified: store.isVerified || undefined,
    logoUrl: store.logoUrl || undefined,
    bannerUrl: store.bannerUrl || undefined,
    totalSales: store.totalSales || undefined,
    totalProducts: product?.length || undefined,
    product: product
  }
}