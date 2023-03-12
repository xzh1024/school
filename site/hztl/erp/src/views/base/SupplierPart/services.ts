import { BackEndPageParams, PageData } from "@/constants/interface";
import request from "@/utils/request";
import {
  EditPartData,
  SearchPartItem,
  SupplierItem,
  SupplierPartItem
} from "./interface";
import { SupplierPartFilter } from "./SearchFrom";

export function searchSuppliers(keyword: string) {
  return request({
    url: "goods/supplier-parts/suppliers/options",
    method: "get",
    params: {
      keyword
    }
  }).then(
    (
      res: {
        id: number;
        name: string;
      }[]
    ) => {
      return res || [];
    }
  );
}

export function addPartToSupplier(cooperatorIds: number[], partIds: number[]) {
  return request({
    url: "/goods/supplier-parts/suppliers/parts",
    method: "post",
    data: {
      cooperatorIds,
      partIds
    }
  });
}

export function changeSupplierType(id: number, type: number) {
  return request({
    url: `/cooperators/${id}/sign-supplier`,
    method: "put",
    data: {
      sign: type === 0
    }
  });
}

export function removeSupplierParts(ids: number[]) {
  return request({
    url: "/goods/supplier-parts/suppliers/parts",
    method: "delete",
    data: {
      ids
    }
  });
}
export function editSupplierParts(ids: number[], params: EditPartData) {
  return request({
    url: "/goods/supplier-parts/suppliers/parts",
    method: "put",
    data: {
      ids,
      ...params
    }
  });
}

interface SearchPartsParams extends SupplierPartFilter, BackEndPageParams {}
export function searchPart(
  params: SearchPartsParams
): Promise<PageData<SearchPartItem>> {
  return request({
    url: "/goods/supplier-parts/parts",
    method: "get",
    params
  });
}

interface LoadSupplierPartParams
  extends SupplierPartFilter,
    BackEndPageParams {}

export function loadSupplierList(
  params: LoadSupplierPartParams
): Promise<PageData<SupplierItem>> {
  return request({
    url: "/goods/supplier-parts/suppliers",
    method: "get",
    params
  });
}

export function loadSupplierPartList(
  params: LoadSupplierPartParams
): Promise<PageData<SupplierPartItem>> {
  return request({
    url: "/goods/supplier-parts/suppliers/parts",
    method: "get",
    params
  });
}
