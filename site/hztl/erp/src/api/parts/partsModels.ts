import request from "@/utils/request";
import { PageData } from "@/constants/interface";

export interface PartModel {
  avaVehModel: string;
  barCode: string;
  brand: string;
  category: number;
  categoryName: string;
  code: string;
  customCodes: string[];
  currency: string;
  dosagePerCar: number;
  enName: string;
  engineNo: string;
  groupId: number;
  groupName: string;
  height: string;
  id: number;
  isCollection: boolean;
  isPurchase: boolean;
  isSale: boolean;
  isSeqNum: boolean;
  length: string;
  minOrderQty: number;
  mnemonic: string;
  model: string;
  name: string;
  oeBrand: string;
  posCode: string;
  price4s: string;
  priceFactory: string;
  priceRmb: string;
  productionCode: string;
  productionPlace: string;
  remark: string;
  stdName: string;
  stdOeCode: string;
  stockLowerLimit: string;
  stockTopLimit: string;
  unit: string;
  vehModel: string;
  volume: string;
  weight: string;
  width: string;
}

export type DataSource = "mj" | "bmy"; // 数据来源类型（mj：明觉、bmy：北迈云）
export interface SearchAvaVehModelsParmas {
  partId: number;
  vehBrand?: string;
  facBrand?: string;
  vehicleGroup?: string;
  year?: string;
  displacement?: string;
  engine?: string;
  displacementEngine?: string;
  transmission?: string;
  salesModel?: string;
  types?: number[];
  page: number;
  pageSize: number;
}

export interface AvaVehOptionsParams {
  dataSource: DataSource;
  fieldType: string;
  vehBrand?: string;
  facBrand?: string;
  vehicleGroup?: string;
  year?: string;
  displacement?: string;
  engine?: string;
  displacementEngine?: string;
  transmission?: string;
  driverType?: string;
  chassisNo?: string;
  salesModel?: string;
  types?: number[];
}

export interface SearchAvaVehModelsOptionsParams extends AvaVehOptionsParams {
  partId: number;
}

export interface AvaVehModelMingjueRes {
  id: number;
  type: number;
  typeCN: string;
  vehBrand: string;
  facBrand: string;
  vehicleGroup: string;
  year: string;
  displacement: string;
  engine: string;
  displacementEngine: string;
  transmission: string;
  salesModel: string;
}
export interface AvaVehModelBeiMaiRes {
  id: number;
  type: number;
  typeCN: string;
  vehBrand: string;
  facBrand: string;
  vehicleGroup: string;
  year: string;
  displacement: string;
  engine: string;
  displacementEngine: string;
  transmission: string;
  driverType: string;
  chassisNo: string;
  salesModel: string;
}

export function searchAvaVehModels(
  params: SearchAvaVehModelsParmas
): Promise<PageData<AvaVehModelMingjueRes | AvaVehModelBeiMaiRes>> {
  return request({
    module: "erp",
    url: "/goods/parts/ava-veh-models",
    method: "get",
    params
  });
}

export function getIsSettedAvaveh(params: {
  partId: number;
}): Promise<boolean> {
  return request({
    module: "erp",
    url: "/goods/parts/ava-veh-models/setted",
    method: "get",
    params
  });
}

export function getSearchAvaVehOptions(
  params: SearchAvaVehModelsOptionsParams
): Promise<string[]> {
  return request({
    module: "erp",
    url: "/goods/parts/ava-veh-models/option",
    method: "get",
    params
  });
}

export function removeAvaVehModels(data: {
  partId: number;
  query?: any;
  partAvaVehModelIds?: number[];
}): Promise<AvaVehModelMingjueRes[]> {
  return request({
    module: "erp",
    url: "/goods/parts/ava-veh-models",
    method: "delete",
    data
  });
}

export interface AutoAvaVehModelsParmas {
  signCheckedByPartId: number;
  vehBrand?: string;
  facBrand?: string;
  vehicleGroup?: string;
  year?: string;
  displacement?: string;
  engine?: string;
  displacementEngine?: string;
  transmission?: string;
  salesModel?: string;
  page: number;
  pageSize: number;
}

export interface AutoAvaVehModelRes {
  vehBrand: string;
  facBrand: string;
  vehicleGroup: string;
  year: string;
  displacement: string;
  engine: string;
  displacementEngine: string;
  transmission: string;
  salesModel: string;
  checked: boolean;
}

export function getSearchAutoAvaVehModelsOptions(
  params: AvaVehOptionsParams
): Promise<string[]> {
  return request({
    module: "erp",
    url: "/goods/parts/ava-veh-models/custom/option",
    method: "get",
    params
  });
}

export function searchAutoAvaVehModels(
  params: AutoAvaVehModelsParmas
): Promise<PageData<AutoAvaVehModelRes>> {
  return request({
    module: "erp",
    url: "/goods/parts/ava-veh-models/custom/veh-model",
    method: "get",
    params
  });
}

export interface BaseModelData {
  vehBrand: string;
  facBrand: string;
  vehicleGroup?: string;
  year: string;
  displacement: string;
  engine: string;
  transmission: string;
  salesModel: string;
}
export interface AvaVehModelData {
  type: number;
  vehBrand: string;
  facBrand: string;
  vehicleGroup?: string;
  year: string;
  displacement: string;
  engine: string;
  transmission: string;
  salesModel: string;
}

interface AddAvaVehModelsToPartParams {
  dataSource: DataSource;
  partId: number;
  items: AvaVehModelData[];
}

export function addAvaVehModelsToPart(data: AddAvaVehModelsToPartParams) {
  return request({
    module: "erp",
    url: "/goods/parts/ava-veh-models",
    method: "post",
    data
  });
}

export function getSearchSysAvaVehModelsOptions(
  params: AvaVehOptionsParams
): Promise<string[]> {
  return request({
    module: "erp",
    url: "/goods/parts/ava-veh-models/std/option",
    method: "get",
    params
  });
}

export interface SysAvaVehModelsParmas {
  dataSource: DataSource;
  signCheckedByPartId: number;
  vehBrand?: string;
  facBrand?: string;
  vehicleGroup?: string;
  year?: string;
  displacement?: string;
  engine?: string;
  displacementEngine?: string;
  transmission?: string;
  driverType?: string;
  chassisNo?: string;
  salesModel?: string;
  page: number;
  pageSize: number;
}

export interface SysAvaVehModelMingJueRes {
  vehBrand: string;
  facBrand: string;
  vehicleGroup: string;
  year: string;
  displacement: string;
  engine: string;
  displacementEngine: string;
  transmission: string;
  salesModel: string;
  checked: boolean;
  vehGroup: string;
  modeYear: string;
}
export interface SysAvaVehModelBeiMaiRes {
  vehBrand: string;
  facBrand: string;
  vehicleGroup: string;
  year: string;
  displacement: string;
  engine: string;
  displacementEngine: string;
  transmission: string;
  driverType: string;
  chassisNo: string;
  salesModel: string;
  checked: boolean;
  vehGroup: string;
  modeYear: string;
}

export function searchSysAvaVehModels(
  params: SysAvaVehModelsParmas
): Promise<PageData<SysAvaVehModelMingJueRes | SysAvaVehModelBeiMaiRes>> {
  return request({
    module: "erp",
    url: "/goods/parts/ava-veh-models/std/veh-model",
    method: "get",
    params
  });
}

// export function addAllSysAvaVehModelsToPart(params: SysAvaVehModelsParmas) {
//   return request({
//     module: "erp",
//     url: "/goods/parts/ava-veh-models/std/veh-model",
//     method: "get",
//     params
//   });
// }
