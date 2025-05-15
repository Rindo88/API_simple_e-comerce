export interface MetaPageResponse<T> {
  data: T[]
  meta: {
    take: number;
    page: number;
    totalPages: number;
  }
}

export interface MetaPageRequest {
  take: number;
  page: number;
}