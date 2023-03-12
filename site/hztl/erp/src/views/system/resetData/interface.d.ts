export interface Options {
  id?: number;
  name?: string;
}

export interface ResetParam {
  isSeleted: boolean;
  resetType: number;
  title: string;
  tips?: string;

  companyIds?: number[];
  options?: Options[];
  width?: string;
  prop?: string;
  label?: string;
  labelWidth?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: any;
}
