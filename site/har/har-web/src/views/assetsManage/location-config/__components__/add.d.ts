export type EditForm = {
  id?: number;
  projectId?: number;
  buildingId?: number;
  floorId?: number;
  categoryId?: number;
  doorPlate: string;
  acreage?: number;
  useAcreage?: number;
  bottomDayRent?: number;
  bottomMonthRent?: number;
  datumDayRent?: number;
  datumMonthRent?: number;
  remark: string;
  attachmentList: Array<string>;
};
