/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Person {
  id: number;
  name: string;
}

export interface SelectOptions {
  id: number | string;
  name: string;
}

export interface IndexStatusEmun {
  [index: number]: string;
}

export interface IndexMapStatusEmun {
  [index: number]: number[];
}

export interface KeyStatusEmun {
  [key: string]: string;
}
export interface TypeMapStatusEmun {
  [key: string]: IndexStatusEmun;
}

export interface LiteCompany {
  id: number;
  name: string;
  ident: string;
}

type classNamesFunc<T> = (value: any, row: T, index: number) => string;

type ColumnProp = string | number | (string | number)[];

export interface TableColumn<T extends {}> {
  prop?: ColumnProp;
  key?: string;
  label?: string;
  width?: number | string;
  type?: string;

  cantHide?: boolean;
  cantExport?: boolean;
  defaultShow?: boolean;
  isHide?: boolean;

  classNames?: classNamesFunc<T> | string;
  attrs?: {
    [key: string]: string;
  };

  //单据查看详情功能配置
  billTypeData?:
    | "CD"
    | "CG"
    | "CT"
    | "JJ"
    | "XD"
    | "XS"
    | "XT"
    | "QD"
    | "KD"
    | "RD"
    | "KT"
    | "RT";
  billTypeField?: string | string[];
  billIdField?: string | string[];
  information?: {
    billDetailKey?: string;
  };

  formatter?: (value: any, row: T, index: number) => string | number | null;
  render?: (
    value: any,
    row: T,
    index: number
  ) => string | number | JSX.Element | null;
  renderHeader?: (
    value: any,
    row: T,
    index: number
  ) => string | JSX.Element | null;
}

export interface TableSettingConfig<T> {
  name: string;
  columns: TableColumn<T>[];
}
export interface BaseItem {
  id?: number;
  key?: string;
  [key: string]: any;
}

// 精度类型
export type PrecisionTypes =
  | "money"
  | "price"
  | "qty"
  | "untaxedPrice"
  | "percentage";

// 前端合计
export interface TotalFiles {
  file: string; // 统计字段
  type: PrecisionTypes | number; // 精度
}
// 后端合计
export interface TotalInfo {
  [key: string]: string | number;
}
export interface TableData<T> {
  rows?: T[];
  details?: T[];
  totalPage?: number;
  totalSize?: number;
  totalInfo?: TotalInfo;
  [key: string]: any;
}
export interface PageData<T> {
  rows: T[];
  totalPage: number;
  totalSize: number;
  totalInfo?: any;
}

export interface BackEndPageParams {
  page: number;
  pageSize: number;
}

export interface BackEndExportColumn {
  label: string;
  prop: string;
  width: string;
}

export interface TotalPageData<T> extends PageData<T> {
  totalInfo: any;
}
