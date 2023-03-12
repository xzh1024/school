/* eslint-disable @typescript-eslint/no-explicit-any */
import { Person } from "../interface";

export enum PlatformEnum {
  own,
  hztl,
  othter,
  service
}

export enum PlatformAuthEnum {
  unauth,
  auth
}
export interface Platform {
  key: string;
  name: string;
  logo: string;
  //4企鹅汽配
  type?: 0 | 1 | 2 | 3 | 5;
  isHztl?: boolean;
  url: string;
  urlAuth: string;
  isAutoLogin: boolean;
  isAvaliable: boolean;
  flags: number;
  createdBy: Person;
  createdAt: string;
  updatedBy: Person;
  updatedAt: string;
  status: 0 | 1;
  used: boolean;
  needParams: boolean;
  needPartsOn: boolean;
  manual: string;
}

export interface FormatePlatformParam {
  name: string;
  value: any;
  key: string;
  companies: {
    [index: number]: {
      value: any;
      enabled: boolean;
    };
  };
}

export interface PlatformParams {
  [key: string]: {
    companies: {
      [index: number]: {
        value: any;
        enabled: boolean;
      };
    };
    value: any;
  };
}

// vin查询数据来源平台
export const MINGJUE = "mj"; // 明觉
export const BEIMAI = "bmy"; // 北迈云
export const DEFAULT_VIN_TYPE = MINGJUE; // 默认
