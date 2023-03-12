import request from "@/utils/request";

export function storePositions(params) {
  // 仓储模块仓库货位列表
  return request({
    module: "erp",
    url: "/storehouses/positions/option",
    method: "get",
    params: {
      warehouseId: params,
      pageSize: 50
    }
  });
}
// 仓储模块所属仓库下拉列表
export function storeOwnList(params) {
  // 收货开单表单嵌套表单删除详情
  return request({
    module: "erp",
    url: "/storehouses/warehouses",
    method: "get",
    params
  });
}
// 销售模块所属仓库下拉列表
export function saleStoreOwnList() {
  // 收货开单表单嵌套表单删除详情
  return request({
    module: "erp",
    url: "/storehouses/assignments/my/by-type",
    method: "get",
    params: {
      type: 0
    }
  });
}
export function saleStorePositions(params) {
  // 销售/采购标准模式模块仓库货位列表
  return request({
    module: "erp",
    url: "/storehouses/positions/option",
    method: "get",
    params: {
      warehouseId: params,
      pageSize: 50
    }
  });
}

export function saleCleanStorePositions(params) {
  // 销售/采购简易模式模块仓库货位列表
  return request({
    module: "erp",
    url: "/storehouses/positions/option",
    method: "get",
    params: {
      warehouseId: params,
      pageSize: 10000
    }
  });
}
