import request from "@/utils/request";

export function stockmovingList(data) {
  // 移仓单列表
  return request({
    module: "erp",
    url: "/storage/stockmoving/stockmoving/list",
    method: "post",
    data
  });
}
export function stocksListOfMoving(data) {
  // 移仓单开单查询列表
  return request({
    module: "erp",
    url: "/storage/stocks/stocks/list_of_moving",
    method: "post",
    data
  });
}
export function stockmovingCreate(data) {
  // 移仓单开单创建
  return request({
    module: "erp",
    url: "/storage/stockmoving/stockmoving/create",
    method: "post",
    data
  });
}
export function stockmovingUpdate(data) {
  // 移仓单开单修改
  return request({
    module: "erp",
    url: "/storage/stockmoving/stockmoving/update",
    method: "post",
    data
  });
}
export function stockmovingDetailCreate(data) {
  // 移仓单开单明细创建
  return request({
    module: "erp",
    url: "/storage/stockmoving/stockmoving_details/create",
    method: "post",
    data
  });
}
export function stockmovingDetailUpdate(data) {
  // 移仓单开单明细修改
  return request({
    module: "erp",
    url: "/storage/stockmoving/stockmoving_details/update",
    method: "post",
    data
  });
}
export function stockmovingAvailableqty(data) {
  // 获取可用库存
  return request({
    module: "erp",
    url: "/storage/stockmoving/stockmoving_details/available_qty",
    method: "post",
    data
  });
}
export function stockmovingDetailsList(data) {
  // 移仓单开单列表
  return request({
    module: "erp",
    url: "/storage/stockmoving/stockmoving_details/list",
    method: "post",
    data
  });
}
export function stockmovingCommit(data) {
  // 移仓单提交
  return request({
    module: "erp",
    url: "/storage/stockmoving/stockmoving/commit",
    method: "post",
    data
  });
}
export function stockmovingRevoke(data) {
  // 移仓单撤回
  return request({
    module: "erp",
    url: "/storage/stockmoving/stockmoving/revoke",
    method: "post",
    data
  });
}
export function stockmovingAudit(data) {
  // 移仓单审核
  return request({
    module: "erp",
    url: "/storage/stockmoving/stockmoving/audit",
    method: "post",
    data
  });
}
export function stockmovingDelete(data) {
  // 移仓单删除
  return request({
    module: "erp",
    url: "/storage/stockmoving/stockmoving/delete",
    method: "post",
    data
  });
}
export function stockmovingDetailsDelete(data) {
  // 移仓单明细列表删除
  return request({
    module: "erp",
    url: "/storage/stockmoving/stockmoving_details/delete",
    method: "post",
    data
  });
}
