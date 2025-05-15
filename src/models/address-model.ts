import { Address } from "@prisma/client";

export interface AddressResponse {
  street?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface AddressCreateRequest{
  street?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface AddressUpdateRequest{
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export const toAddressResponse = (address: Address): AddressResponse => {
  return {
    street: address.street || undefined,
    state: address.state,
    city: address.city,
    postalCode: address.postalCode,
    country: address.country
  }
}