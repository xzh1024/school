export interface FormType {
  name: string;
  linkman: string;
  linkTel: string;
  purposeId: string | number;
  sceneId: string | number;
  remark?: string;
  shopPhotoAttachments: string[];
  businessLicenseAttachment: any;
  idCardAttachments: string[];
  realName: string;
  idCardNum: string;
  registerAddress: string;
  companyName: string;
  legalPerson: string;
  uscCode: string;
  otherCertificateAttachments?: string[];
  estateIds?: Array<number | string>;
  estateInfos?: object[];
  storeStatus?: number | undefined;
  idCardEnd?: any;
  idCardFront?: any;
  merchantId?: number;
}
export interface RecordType {
  [key: string]: string;
}
