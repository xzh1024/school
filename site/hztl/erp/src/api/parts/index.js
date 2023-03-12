import request from "@/utils/request";

export function reqPartsUpdate(data) {
  return request({
    module: "erp",
    url: "/goods/parts",
    method: data.id ? "put" : "post",
    data
  });
}

export function reqPartsDetails(id) {
  return request({
    module: "erp",
    url: "/goods/parts/" + id
  });
}

export function reqPartsDelete(id) {
  return request({
    module: "erp",
    url: "/goods/parts/" + id,
    method: "delete"
  });
}

export function loadParts(data) {
  return request({
    module: "erp",
    url: "/goods/parts/search",
    method: "post",
    data
  });
}

export function loadCanMergeParts(data) {
  return request({
    module: "erp",
    url: "/goods/parts/search_for_merge",
    method: "post",
    data
  });
}

export function mergeParts(data) {
  return request({
    module: "erp",
    url: "/goods/parts/parts_merge",
    method: "post",
    data
  });
}

// 批量创建配件
export function batchCreateParts(data) {
  return request({
    module: "erp",
    url: "/goods/parts/batch-create",
    method: "post",
    data
  });
}

// 批量修改配件信息
export function batchEditParts(data) {
  return request({
    module: "erp",
    url: "/goods/parts/batch-update",
    method: "post",
    data
  });
}

// 配件历史
export function partsPriceHistory(params) {
  return request({
    module: "erp",
    url: "/goods/parts/" + params + "/price-history",
    method: "get"
  });
}
/**批量删除配件**/
export function deleteMultipleParts(data) {
  return request({
    module: "erp",
    url: "/goods/parts/deletes",
    method: "post",
    data
  });
}
/**删除查询的所有配件 **/
export function deleteAllParts(data) {
  return request({
    module: "erp",
    url: "/goods/parts/delete_all",
    method: "post",
    data
  });
}
/**导出所有配件 **/
export function exportAllParts(data) {
  return request({
    module: "erp",
    url: "/goods/parts/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

// 批量查询配件属性（根据编码+品牌）
export function getPartAttributes(params) {
  return request({
    module: "erp",
    url: "/basic/part-codes/attributes",
    method: "get",
    params
  });
}
//查询原厂件或品牌件的适用车型、装配图
export function getPartVehModelsDwg(params) {
  return request({
    module: "erp",
    url: "/basic/part-codes/veh-models",
    method: "get",
    params
  });
}
//查询原厂件的替换件
export function getPartSubstituteParts(params) {
  return request({
    module: "erp",
    url: "/basic/part-codes/substitute-parts",
    method: "get",
    params
  });
}
//查询原厂件的品牌件
export function getPartBrandParts(params) {
  return request({
    module: "erp",
    url: "/basic/part-codes/brand-parts",
    method: "get",
    params
  });
}
