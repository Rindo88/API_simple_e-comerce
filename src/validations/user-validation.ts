import { z, ZodType } from "zod";

export class UserValidation {
  static readonly CREATE: ZodType = z.object({
    username: z.string().min(1).max(100),
    name: z.string().min(1).max(255).optional(),
    email: z.string().email().max(255).optional(),
    password: z.string().min(1)
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(255).optional(),
    email: z.string().email().max(255).optional(),
    password: z.string().min(1).optional()
  });

  static readonly LOGIN: ZodType = z.object({
    identifier: z.string().min(1),
    password: z.string().min(1)
  })
}