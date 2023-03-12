export interface FormType {
  faultTypeId: string;
  location: string;
  reporter: string;
  reportTime: string;
  remark: string;
  handleInfo: Array<handlerInfoType>;
  checkInfo: Array<checkInfoType>;
}

type handlerInfoType = {
  id?: number;
  handler: string;
  handleTime: string;
  status: string;
  chargeType: string;
  expense?: number;
  remark?: string;
  pics?: PicType[];
};

type PicType = {
  key: string;
  id: string;
};

type checkInfoType = {
  id?: number;
  checker: string;
  checkTime: string;
  status: string;
  remark: string;
};
