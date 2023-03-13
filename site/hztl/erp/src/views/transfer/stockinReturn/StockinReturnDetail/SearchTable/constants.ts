export interface SearchPartData {
  billDateStart?: string;
  billDateEnd?: string;
  billNo?: string;
  relatedCompanyId?: number;
  codePattern?: number;
  code?: string;
  customCodePattern?: number;
  customCode?: string;
  name?: string;
  brand?: string;
  productionPlace?: string;
  vehModel?: string;
  property?: string;
  model?: string;
  warehouseId?: number;
  warehouseIds?: number[];
  sort?: string;
}

export interface SearchStockData {
  detailId?: number;
}
