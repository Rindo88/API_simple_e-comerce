import { prisma } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { CategoryResponse, toCategoryResponse } from "../models/category-model";
import { MetaPageRequest, MetaPageResponse } from "../types/meta-page";

export class CategoryService {
  static async get(id: number): Promise<CategoryResponse> {
    const category = await prisma.category.findFirst({
      where: { id }
    });
    if (!category) throw new ResponseError(404, 'Category doesnt exists')

    return toCategoryResponse(category);
  }

  static async getCategories(req: MetaPageRequest): Promise<MetaPageResponse<CategoryResponse>> {
    const categories = await prisma.category.findMany({
      take: req.take,
      skip: (req.page - 1) * 10
    });
    if (!categories) throw new ResponseError(404, 'Category doesnt exists');

    const totalPages = Math.floor((await prisma.category.count()) / req.take)

    return {
      data: categories.map(category => toCategoryResponse(category)),
      meta: {
        page: req.page,
        take: req.take,
        totalPages
      }
    }
  }
}