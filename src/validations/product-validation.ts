import { z, ZodType } from "zod";

export class ProductValidation {
  static readonly CREATE: ZodType = z.object({
    imageUrl: z.string().optional(),
    name: z.string().min(1).max(255),
    description: z.string().min(1).optional(),
    price: z.number().min(1),
    stock: z.number(),
    brand: z.string().min(1).optional(),
    categoryId: z.number().optional()
  });

  static readonly UPDATE: ZodType = z.object({
    imageUrl: z.string().optional(),
    name: z.string().min(1).max(255),
    description: z.string().min(1).optional(),
    price: z.number().min(1),
    stock: z.number(),
    brand: z.string().min(1).optional(),
    categoryId: z.number().optional()
  });
}