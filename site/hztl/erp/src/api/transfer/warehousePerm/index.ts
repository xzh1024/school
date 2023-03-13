/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "@/utils/request";

export function getTansferWarehouse() {
  // 列出调拨仓库
  return request({
    module: "erp",
    url: "/storehouses/assignments/allocs/by-hierarchy",
    params: {
      type: 0
    }
  });
}
export function getCompanyList() {
  // 列出调拨仓库公司
  return request({
    module: "erp",
    url: "/storehouses/assignments/allocs/companies"
  });
}
export function getCompanyStore(data: any) {
  // 列出调拨仓库分配树
  return request({
    module: "erp",
    url: "/storehouses/assignments/allocs/tree",
    params: data
  });
}
export function changeCompanyTransferPerm(data: any) {
  // 创建、更新调拨权限分配
  return request({
    module: "erp",
    url: "/storehouses/assignments/allocs",
    method: "post",
    data
  });
}
export function changeCompanyPriority(data: any) {
  // 创建、更新仓库优先级
  return request({
    module: "erp",
    url: "/storehouses/assignments/allocs/priority",
    method: "put",
    data
  });
}
