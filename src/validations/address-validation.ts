import { z, ZodType } from "zod";

export class AddressValidation {
  static readonly CREATE: ZodType = z.object({
    street: z.string().min(1).optional(),
    city: z.string().min(1),
    state:  z.string().min(1),
    postalCode: z.string().min(1).max(8),
    country: z.string().min(1)
  });

  static readonly UPDATE: ZodType = z.object({
    street: z.string().min(1).optional(),
    city: z.string().min(1).optional(),
    state:  z.string().min(1).optional(),
    postalCode: z.string().min(1).max(8).optional(),
    country: z.string().min(1).optional()
  })
}