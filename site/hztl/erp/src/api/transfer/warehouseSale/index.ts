import request from "@/utils/request";
interface Result {
  message: string;
  code: "ok" | string;
}
interface GetSaleListResult extends Result {
  allowBranchSale: {
    value: boolean;
    canEdit: boolean;
  };
  companies: {
    id: number;
    name: string;
    ident: string;
    priorityWarehouses: {
      id: number;
      //仓库名称
      name: string;
    }[];
    //享受价格类型
    priceType: string;
  }[];
}
export function getTansferWarehouse() {
  // 列出调拨仓库
  return request({
    module: "erp",
    url: "/storehouses/assignments/sales/by-hierarchy",
    params: {
      type: 0
    }
  });
}
/**
 * @description: 获取待售仓库公司列表
 * @return {Promise<GetSaleListResult>}
 */
export function getCompanyList(): Promise<GetSaleListResult> {
  //列出待售仓库公司列表
  return request({
    module: "erp",
    url: "/storehouses/assignments/sales/companies"
  });
}
export function getCompanyStore(data: any) {
  // 列出调拨仓库分配树
  return request({
    module: "erp",
    url: "/storehouses/assignments/sales/tree",
    params: data
  });
}
export function changeCompanyTransferPerm(data: any) {
  // 创建、更新调拨权限分配
  return request({
    module: "erp",
    url: "/storehouses/assignments/sales",
    method: "post",
    data
  });
}
export function changeCompanyPriority(data: any) {
  // 创建、更新仓库优先级
  return request({
    module: "erp",
    url: "/storehouses/assignments/sales/priority",
    method: "put",
    data
  });
}
