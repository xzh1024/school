export interface BaseInfoModel {
  companyId: number; // 公司ID
  companyName: string; // 公司名称
  areaId: number; // 区域ID
  areaName: string; // 区域名称
  guided: boolean; // 是否引导过
  erpType: number; // erp类型 1：思锐客户端版ERP 2：思锐Web版ERP
}