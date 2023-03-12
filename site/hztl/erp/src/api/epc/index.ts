/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "@/utils/request";
import { SysAvaVehModelMingJueRes } from "../parts/partsModels";

export function getVinModelData(params: any): Promise<any> {
  return request({
    module: "erp",
    url: "/basic/vins",
    method: "get",
    params
  });
}

export function getVinPartsList(params: any): Promise<any> {
  return request({
    module: "erp",
    url: "/basic/vins/key",
    method: "get",
    params
  });
}

export function getEpcVehBrands(): Promise<any> {
  return request({
    module: "erp",
    url: "/basic/vins/brands",
    method: "get"
  });
}

export function getEpcVehBrandAttributes(params: any): Promise<any> {
  return request({
    module: "erp",
    url: "/basic/vins/brand-attributes",
    method: "get",
    params
  });
}

export function getEpcVehBrandConfig(params: any): Promise<any> {
  return request({
    module: "erp",
    url: "/basic/vins/config",
    method: "get",
    params
  });
}

export function getEpcParts(params: any): Promise<any> {
  return request({
    module: "erp",
    url: "/basic/vins/image-part",
    method: "get",
    params
  });
}

export function getStdPartsTree(params: any): Promise<any> {
  return request({
    module: "erp",
    url: "/basic/vins/directory-tree",
    method: "get",
    params
  });
}

export function getEpcPartsTree(params: any): Promise<any> {
  return request({
    module: "erp",
    url: "/basic/vins/factory-tree",
    method: "get",
    params
  });
}

export interface PartVehModel {
  vehBrand: string;
  facBrand: string;
  vehSeries: string;
  vehGroup: string;
  modeYear: string;
  displacement: string;
  transmission: string;
  engine: string;
  image: string;
  imageUrl: string;
}

export interface BasicPartByCode {
  matchWay: string;
  code: string;
  name: string;
  stdName: string;
  brand: string;
  price: string;
  state: string;
  comment: string;
  vehModels: PartVehModel[];
  avaVehModels: SysAvaVehModelMingJueRes[];
}

export function getBasicPartByCodes(params: {
  code: string;
  type: 0 | 1;
}): Promise<BasicPartByCode[]> {
  return request({
    module: "erp",
    url: "/basic/part-codes/search-parts",
    method: "get",
    params
  });
}

export function getAuaVehModelsPartByCodes(params: {
  oeCode: string;
  type: 0 | 1;
  signCheckedByPartId: number;
}): Promise<BasicPartByCode[]> {
  return request({
    module: "erp",
    url: "/goods/parts/ava-veh-models/epc/part",
    method: "get",
    params
  });
}
