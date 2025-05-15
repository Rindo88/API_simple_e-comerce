import { Address, User } from "@prisma/client";
import { prisma } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { AddressCreateRequest, AddressResponse, AddressUpdateRequest, toAddressResponse } from "../models/address-model";
import { StorePayloadRequest } from "../models/store-model";
import { UserPayloadRequest } from "../models/user-payload-model";
import { AddressValidation } from "../validations/address-validation";
import { StoreValidation } from "../validations/store-validation";
import { Validation } from "../validations/validation";

export class AddressService {
  public static async findMultiAddress(username: string, store?: StorePayloadRequest): Promise<Address> {
    const address = await prisma.address.findFirst({
      where: {
        AND: [
          { username },
          ...(store ? [{ id: store.id }] : [])
        ]
      }
    });
    if (!address) throw new ResponseError(404, 'not found');

    return address;
  }

  static async create(user: UserPayloadRequest, req: AddressCreateRequest): Promise<AddressResponse> {
    Validation.validate(AddressValidation.CREATE, req);
    const address = await prisma.address.create({
      data: {
        username: user.username,
        ...req
      }
    });
    return toAddressResponse(address)
  }

  static async get(user: UserPayloadRequest, store?: StorePayloadRequest): Promise<AddressResponse[]> {
    const stores = await prisma.store.findFirst({
      where: { id: store?.id }
    });
    if (!stores) throw new ResponseError(404, 'Address not found');

    const addresses = await prisma.address.findMany({
      where: {
        AND: [
          { username: user.username },
          ...(store ? [{ id: store.id }] : [])
        ]
      }
    });

    if (!addresses) throw new ResponseError(404, 'Address not found')
    return addresses.map(address => toAddressResponse(address));
  }

  static async update(user: UserPayloadRequest, req: AddressUpdateRequest, store?: StorePayloadRequest): Promise<AddressResponse> {
    Validation.validate(AddressValidation.UPDATE, req);
    const address = await this.findMultiAddress(user.username, store);

    const updateAddress = await prisma.address.update({
      where: { id: address.id },
      data: req
    });

    return toAddressResponse(updateAddress);
  }

  static async delete(user: UserPayloadRequest, store?: StorePayloadRequest): Promise<AddressResponse> {
    const address = await this.findMultiAddress(user.username, store);
    const deleteAddress = await prisma.address.delete({
      where: {
        id: address.id,
        username: user.username
      }
    });

    return toAddressResponse(deleteAddress);
  }
}