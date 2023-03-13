export interface PageResponseResult<T> {
  rows: T;
  totalSize: number;
  totalPage: number;
}

export interface PageParams {
  page?: number;
  pageSize?: number;
  totalSize?: number;
  totalPage?: number;
}

export interface TabModel {
  id: string;
  name: string;
}