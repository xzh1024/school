export interface SetupFormParams<T> {
  skuSetting: T[];
  priceSetting: string;
}

export interface SkuSettingModel {
  startQty: string;
  endQty: string;
  type: number;
  upperLimitQty: string;
}
