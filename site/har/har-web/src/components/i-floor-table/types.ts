import type { CbdApiProjectEstateReviewBoardGetResponse } from '@/api';
export interface ConfigItemType {
  symbol: number;
  label: string;
  value: string | number;
  color: string;
}

export type TableItemType = CbdApiProjectEstateReviewBoardGetResponse['floors'];

export type Estates = Required<
  Required<CbdApiProjectEstateReviewBoardGetResponse>['floors'][number]
>['estates'][number];

export interface IMergeFormData {
  estateId?: number;
  name: string;
  acreage: number;
  useAcreage: number;
  date: string;
  code?: string;
  estateIds: number[];
  assetsStatus?: number;
  changeApplyStatus?: number;
  editStatus?: boolean;
}
export interface ISplitFormData {
  estateId?: number;
  code?: string;
  name: string;
  acreage: number;
  doorPlate: string;
  splitNumber: number;
  date: string;
  assetsStatus?: number;
  changeApplyStatus?: number;
  splitList: {
    acreage: number;
    name: string;
  }[];
  isEdit?: boolean;
  editStatus?: boolean;
}
