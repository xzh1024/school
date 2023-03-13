import request from "@/utils/request";

export function resetStoreHouses(data) {
  // 设置公司仓储分配
  return request({
    module: "erp",
    url: "/storehouses/assignments",
    method: "post",
    data
  });
}
export function resetStoreOutOrder(data) {
  // 设置公司仓储出库顺序分配
  return request({
    module: "erp",
    url: "/storehouses/assignments/stockout-orders",
    method: "post",
    data
  });
}
export function getStoreTree(params) {
  //通过层级获取仓库，货区，货架，货层，货位
  return request({
    module: "erp",
    url: "/storehouses/by-hierarchy",
    method: "get",
    params
  });
}
export function reqStoreHousesDispatch(params) {
  // 仓库分配公司列表
  return request({
    module: "erp",
    url: "/storehouses/assignments/companies",
    method: "get",
    params
  });
}
export function deleteHousesDispatch(params) {
  // 删除仓库分配公司
  return request({
    module: "erp",
    url: "/storehouses/assignments/" + params,
    method: "delete"
  });
}
export function reqStoreHouses(params) {
  // 获取仓库公司的仓库分配
  return request({
    module: "erp",
    url: "/storehouses/assignments/tree",
    method: "get",
    params
  });
}
export function reqStoreHousesOrders(params) {
  // 获取仓库公司的出库顺序
  return request({
    module: "erp",
    url: "/storehouses/assignments/" + params + "/stockout-orders",
    method: "get"
  });
}
