import { WrappedFormUtils } from "antd/lib/form/Form";
import { Component } from "react";
import { Moment } from "moment";

export interface PartnerModel {
  partnerKey?: string;
  partnerName?: string;
  priceType?: string;
  status?: number;
  properties?: string[];
  store?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface UnOpenPartnerModel {
  key?: string;
  name?: string;
  verifyMode?: string;
  tips?: string;
}

export interface PartModel {
  partId?: number;
  partNo?: string;
  partName?: string;
  brand?: string;
  factory?: string;
  insureCertType?: string;
}

export interface PartsStoreModel {
  depotNo: string;
  depotName: string;
}

export interface PriceTypeModel {
  code: string;
  name: string;
}

export interface PaginationData {
  current: number;
  pageSize: number | undefined;
}

export interface FormCreateProps {
  form: WrappedFormUtils;
}

export interface FormCreateRef<T> extends Component<T> {
  getForm: () => WrappedFormUtils;
}

export interface UnPlatFormListModel {
  key?: string;
  name?: string;
  verifyMode?: string;
  tips?: string;
  isTL?:boolean;
  logo?:string;
  domain?:string;
}
export interface PlatFormListModel {
  partnerKey?: string;
  partnerName?: string;
  status?: number;
  priceType?: string;
  properties?: Array<string>;
  store?: Array<string>;
  isTL?:boolean;
  logo?:string;
  domain?:string;
  verifyMode?:string;
}

// 企鹅汽配-授权管理
export interface StaffBaseModel {
  name?: string; // 员工姓名
  code?: string; // 员工编号
  department?: string; // 所属部门
  bindStatus?: number; // 绑定状态（0: 全部, 1: 已绑定, 2: 未绑定）
}
export interface StaffParamsModel extends StaffBaseModel {
  page?: number; // 页码
  pageSize?: number; // 页宽
}
export interface StaffAuthParamsModel extends StaffBaseModel {
  ids?: number[]; // 员工IDs，选择员工传Ids，否则传条件，优先判断Ids
}
export interface StaffModel {
  id?: number;
  authed?: boolean; // 绑定状态（true: 已绑定, false: 未绑定）
  code?: string; // 员工编号
  name?: string; // 员工姓名
  department?: string; // 所属部门
  phone?: string; // 联系电话
  hiredate?: string; // 入职日期
}
export interface StaffAuthCodeModel {
  staffId: number; // 员工ID
  staffName: string; // 员工名称
  companyId: number; // 分公司ID
  authCode: string; // 授权码
}

// 企鹅汽配-客户关系管理
export interface ErpCustomerModel {
  id?: string; // 关联ERP客户ID
  code?: string; // 关联ERP客户编码
  name?: string; //关联ERP客户名称
}
export interface ErpCustomerBaseModel {
  erpId?: string; // 关联ERP客户ID
  erpCode?: string; // 关联ERP客户编码
  erpName?: string; //关联ERP客户名称
}
export interface CustomerModel {
  id: string; // 平台客户ID
  name: string; // 平台客户名称
  province: string; // 平台客户省
  city: string; // 平台客户市
  district: string; // 平台客户区
  address: string; // 平台客户地址
  contacts: string; // 平台客户联系人
  phone: string; // 平台客户联系电话
  dbAccount: string; // 账套
  erpId: string; // 关联ERP客户ID
  erpCode: string; // 关联ERP客户编码
  erpName: string; //关联ERP客户名称
  bindData: string; // 绑定日期
}

// 企鹅汽配-客户关系管理
export interface CustomerBaseModel {
  erpName?: string; // 往来单位
  name?: string; // 企鹅汽配用户名
  bindStatus?: number; // 绑定状态（0: 全部, 1: 已绑定, 2: 未绑定）
  bindDateStart?: string; // 绑定开始日期，格式2006-01-02
  bindDateEnd?: string; // 绑定结束日期，格式2006-01-02
}

export interface CustomerParamModel extends CustomerBaseModel {
  page?: number;
  pageSize?: number;
  bindDateList?: Moment[];
}
export interface ErpCustomerParamModel {
  page?: number;
  pageSize?: number;
  id?: string; // 关联ERP客户ID
  code?: string; // 关联ERP客户编码
  name?: string; //关联ERP客户名称
}
export interface CustomerBindParamModel {
  partnerKey?: string,
  customers?: CustomerModel[]; // 平台客户信息
  customersCond?: CustomerBaseModel; // 平台客户查询条件
  erpCustomer?: ErpCustomerModel; // 绑定ERP客户
}
export interface WarehouseModel {
  facilityId: string;
  facilityName: string;
}
