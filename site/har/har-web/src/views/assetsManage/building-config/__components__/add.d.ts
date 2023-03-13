export type EditForm = {
  projectId?: number;
  name: string;
  type?: number;
  code: string;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
  provinceName: string;
  cityName: string;
  districtName: string;
  groundFloorCount: number;
  undergroundFloorCount: number;
  areaCode: Array<number>;
  areaName: {
    cityName: string;
    districtName: string;
    provinceName: string;
  };
  address: string;
  attachmentList: Array<string>;
  id?: number;
};
