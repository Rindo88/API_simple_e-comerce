import { Product, Store } from "@prisma/client";

export interface StoreResponse {
  name: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  contact: string;
  totalSales?: number;
  totalProducts?: number;
  product?: Product[];
}

export const toStoreResponse = (store: Store, product: Product[]): StoreResponse => {
  return {
    name: store.name,
    description: store.description || undefined,
    contact: store.contact,
    logoUrl: store.logoUrl || undefined,
    bannerUrl: store.bannerUrl || undefined,
    totalSales: store.totalSales || undefined,
    totalProducts: product.length,
    product: product
  }
}