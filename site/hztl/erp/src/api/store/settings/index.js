import request from "@/utils/request";

export function reqStoreBaseInfo(id) {
  return request({
    module: "erp",
    url: "/storehouses/warehouses/" + id
  });
}
//新增仓库
export function reqStoreAdd(data) {
  return request({
    module: "erp",
    url: "/storehouses/warehouses",
    method: "post",
    data
  });
}
//修改仓库
export function reqStoreUpdate(data) {
  return request({
    module: "erp",
    url: "/storehouses/warehouses",
    method: "put",
    data
  });
}
//批量给仓库添加货区、货架、货层、货位
export function reqStoreAddBatch(data) {
  return request({
    module: "erp",
    url: "/storehouses/warehouses/inner/batch",
    method: "post",
    data
  });
}
//获取货区列表
export function reqStoreAreasList(data) {
  return request({
    module: "erp",
    url: "/storehouses/wareareas",
    params: data
  });
}
//获取货区详情
export function reqGetStoreArea(id) {
  return request({
    module: "erp",
    url: "/storehouses/wareareas/" + id
  });
}
//添加货区
export function reqStoreAreasAdd(data) {
  return request({
    module: "erp",
    url: "/storehouses/wareareas",
    method: "post",
    data
  });
}
//批量添加
export function reqStoreAreasBatch(data) {
  return request({
    module: "erp",
    url: "/storehouses/wareareas/batch",
    method: "post",
    data
  });
}
//修改货区
export function reqStoreAreasUpdate(data) {
  return request({
    module: "erp",
    url: "/storehouses/wareareas",
    method: "put",
    data
  });
}
//删除货区
export function reqStoreAreasDelete(id) {
  return request({
    module: "erp",
    url: "/storehouses/wareareas",
    method: "delete",
    data: {
      id: id
    }
  });
}

//列出货架
export function reqStoreShelvesList(data) {
  return request({
    module: "erp",
    url: "/storehouses/shelves",
    params: data
  });
}
//货架详情
export function reqGetStoreShelves(id) {
  return request({
    module: "erp",
    url: "/storehouses/shelves/" + id
  });
}
//货架修改
export function reqStoreShelvesUpdate(data) {
  return request({
    module: "erp",
    url: "/storehouses/shelves",
    method: "put",
    data
  });
}
//新增货架
export function reqStoreShelvesAdd(data) {
  return request({
    module: "erp",
    url: "/storehouses/shelves",
    method: "post",
    data
  });
}
//批量新增
export function reqStoreShelvesBatch(data) {
  return request({
    module: "erp",
    url: "/storehouses/shelves/batch",
    method: "post",
    data
  });
}
//删除
export function reqStoreShelvesDelete(id) {
  return request({
    module: "erp",
    url: "/storehouses/shelves",
    method: "delete",
    data: {
      id: id
    }
  });
}
//列出货层
export function reqStoreLayerList(data) {
  return request({
    module: "erp",
    url: "/storehouses/layers",
    params: data
  });
}
//货层详情
export function reqGetStoreLayer(id) {
  return request({
    module: "erp",
    url: "/storehouses/layers/" + id
  });
}
//货层修改
export function reqStoreLayerUpdate(data) {
  return request({
    module: "erp",
    url: "/storehouses/layers",
    method: "put",
    data
  });
}
//新增货层
export function reqStoreLayerAdd(data) {
  return request({
    module: "erp",
    url: "/storehouses/layers",
    method: "post",
    data
  });
}
//批量新增货层
export function reqStoreLayerBatch(data) {
  return request({
    module: "erp",
    url: "/storehouses/layers/batch",
    method: "post",
    data
  });
}
//删除货层
export function reqStoreLayerDelete(id) {
  return request({
    module: "erp",
    url: "/storehouses/layers",
    method: "delete",
    data: {
      id: id
    }
  });
}
export function reqStoreSimplePositionsUpdateBatch(data) {
  return request({
    module: "erp",
    url: "/storehouses/positions/batch/default",
    method: "post",
    data
  });
}

export function reqStoreLayersDelete(id) {
  return request({
    module: "erp",
    url: "/storehouses/layerss/" + id,
    method: "delete"
  });
}
export function reqStoreSimplePositions(id) {
  return request({
    module: "erp",
    url: "/storehouses/warehouses/" + id + "/positions/simple"
  });
}
//列出货位
export function reqGetStorePositionList(data) {
  return request({
    module: "erp",
    url: "/storehouses/positions",
    params: data
  });
}
//获取货位详情
export function reqGetStorePosition(id) {
  return request({
    module: "erp",
    url: "/storehouses/positions/" + id
  });
}
//新增货位
export function reqStorePositionAdd(data) {
  return request({
    module: "erp",
    url: "/storehouses/positions",
    method: "post",
    data
  });
}
//修改货位
export function reqStorePositionUpdate(data) {
  return request({
    module: "erp",
    url: "/storehouses/positions",
    method: "put",
    data
  });
}
//批量新增货位
export function reqStorePositionBatch(data) {
  return request({
    module: "erp",
    url: "/storehouses/positions/batch",
    method: "post",
    data
  });
}
//删除货位
export function reqStorePositionDelete(id) {
  return request({
    module: "erp",
    url: "/storehouses/positions",
    method: "delete",
    data: {
      id: id
    }
  });
}

export function reqStoreFlowUpdate(data) {
  return request({
    module: "erp",
    url: "/storehouses/warehouses/setting",
    method: "put",
    data
  });
}

// 仓库地址信息
export function reqStoreAddress(id) {
  return request({
    module: "erp",
    url: "/addresses/" + id,
    method: "get"
  });
}
// 快速新增货位
export function quickAddPositions(data) {
  return request({
    module: "erp",
    url: "/storehouses/positions/quick/batch",
    method: "post",
    data
  });
}
