import { z, ZodType } from "zod";

export class StoreValidation{
  static CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.string().optional(),
    logoUrl: z.string().optional(),
    bannerUrl: z.string().optional(),
    contact: z.string().min(1)
  });

  static UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().optional(),
    logoUrl: z.string().optional(),
    bannerUrl: z.string().optional(),
    contact: z.string().min(1).optional()
  });
}