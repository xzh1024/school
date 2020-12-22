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

export interface BannerModel {
  pic: string;
  name: string;
  url: string;
}
export interface FloorModel {
  name: string;
  value: string;
}
