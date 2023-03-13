import request from "@/utils/request";

/* 获取维修技师班组结构 */
export async function getTechniciansGroupStructure() {
  return request({
    module: "erp",
    url: "/repairs/technicians/group/structure",
    method: "get"
  });
}

/* 获取维修技师班组详情 */
export async function getTechniciansGroupDetail(params) {
  return request({
    module: "erp",
    url: "/repairs/technicians/group",
    method: "get",
    params
  });
}

/* 创建维修技师班组 */
export async function createTechniciansGroup(data) {
  return request({
    module: "erp",
    url: "/repairs/technicians/group",
    method: "post",
    data
  });
}

/* 修改维修技师班组 */
export async function updateTechniciansGroup(data) {
  return request({
    module: "erp",
    url: "/repairs/technicians/group",
    method: "put",
    data
  });
}

/* 删除维修技师班组 */
export async function deleteTechniciansGroup(data) {
  return request({
    module: "erp",
    url: "/repairs/technicians/group",
    method: "delete",
    data
  });
}

/* 移动技师到其他班组 */
export async function moveTechnicians(data) {
  return request({
    module: "erp",
    url: "/repairs/technicians/technicians/move",
    method: "put",
    data
  });
}

/* 修改技师 */
export async function updateTechnicians(data) {
  return request({
    module: "erp",
    url: "/repairs/technicians/technicians",
    method: "put",
    data
  });
}

/* 创建车辆档案 */
export async function createCarFile(data) {
  return request({
    module: "erp",
    url: "/repairs/vehicles/create",
    method: "post",
    data
  });
}

/* 获取车辆档案列表 */
export async function listCarFile(params) {
  return request({
    module: "erp",
    url: "/repairs/vehicles/list",
    method: "get",
    params
  });
}

/* 获取车辆档案详情 */
export async function getCarFileDetail(params) {
  return request({
    module: "erp",
    url: "/repairs/vehicles/detail",
    method: "get",
    params
  });
}
/* 删除 */
export async function deleteCarFile(params) {
  return request({
    module: "erp",
    url: "/repairs/vehicles/delete",
    method: "delete",
    params
  });
}

export async function updateCarFile(data) {
  return request({
    module: "erp",
    url: "/repairs/vehicles/update",
    method: "post",
    data
  });
}

/* 创建车主信息 */
export async function createVehicleOwners(data) {
  return request({
    module: "erp",
    url: "/repairs/vehicle_owners/create",
    method: "post",
    data
  });
}

/* 更新车主信息 */
export async function updateVehicleOwners(data) {
  return request({
    module: "erp",
    url: "/repairs/vehicle_owners/update",
    method: "post",
    data
  });
}

/* 获取服务项目列表 */
export async function listItems(params) {
  return request({
    module: "erp",
    url: "/repairs/items",
    method: "get",
    params
  });
}

/* 新增服务项目 */
export async function createItems(data) {
  return request({
    module: "erp",
    url: "/repairs/items",
    method: "post",
    data
  });
}
/* 更新服务项目 */
export async function updateItems(data) {
  return request({
    module: "erp",
    url: "/repairs/items",
    method: "put",
    data
  });
}

/* 删除服务项目 */
export async function deleteItems(data) {
  return request({
    module: "erp",
    url: "/repairs/items",
    method: "delete",
    data
  });
}

/* 导出服务项目 */
export async function exportItems(data) {
  return request({
    module: "erp",
    url: "/repairs/items/export",
    method: "post",
    data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

/* 车辆档案变更日志 */
export async function vehicleLogs(params) {
  return request({
    module: "erp",
    url: "/repairs/vehicle_logs/detail",
    method: "get",
    params
  });
}
/* 车辆过户 */
export async function changeOwner(data) {
  return request({
    module: "erp",
    url: "/repairs/vehicles/changeOwner",
    method: "post",
    data
  });
}

/* 获取云整车检测报告页面url */
export async function getVehicleDectationUrl(params) {
  return request({
    module: "erp",
    url: "/repairs/check-reports/report-url",
    method: "get",
    params
  });
}
