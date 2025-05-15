import { Category } from "@prisma/client";

export interface CategoryResponse {
  id: number;
  name: string;
  description?: string
}

export function toCategoryResponse (category: Category): CategoryResponse{
  return {
    id: category.id,
    name: category.name,
    description: category.description || undefined
  }
}