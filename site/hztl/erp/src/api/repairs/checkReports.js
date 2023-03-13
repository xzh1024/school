import request from "@/utils/request";

/* 模板详情 */
export async function checkReportDetail(params) {
  return request({
    module: "erp",
    url: "/repairs/check-reports/detail",
    method: "get",
    params
  });
}

/* 模板详情 */
export async function checkHealthsDetail(params) {
  return request({
    module: "erp",
    url: "/repairs/check-healths/detail",
    method: "get",
    params
  });
}

/* 查模板详情 */
export async function templateReportDetail(params) {
  return request({
    module: "erp",
    url: "/repairs/check-reports/template-to-report",
    method: "get",
    params
  });
}

/* 检测创建 */
export async function checkReportCreate(data) {
  return request({
    module: "erp",
    url: "/repairs/check-reports/create",
    method: "post",
    data
  });
}

/* 更新检测创建 */
export async function checkReportUpdate(data) {
  return request({
    module: "erp",
    url: "/repairs/check-reports/update",
    method: "post",
    data
  });
}

/* 查模板详情-云诊车嵌套 */
export async function importHealth(params) {
  return request({
    module: "erp",
    url: "/repairs/check-reports/import-health",
    method: "get",
    params
  });
}

/* 查模板详情-云诊车嵌套 */
export async function vehicleReportDetail(params) {
  return request({
    module: "erp",
    url: "/platforms/vehicle-checks/template-to-report",
    method: "get",
    params
  });
}

/* 检测创建-云诊车嵌套 */
export async function vehicleReportCreate(data) {
  return request({
    module: "erp",
    url: "/platforms/vehicle-checks/create-report",
    method: "post",
    data
  });
}

/* 更新检测创建-云诊车嵌套 */
export async function vehicleReportUpdate(data) {
  return request({
    module: "erp",
    url: "/platforms/vehicle-checks/update-report",
    method: "post",
    data
  });
}

/* 云诊车嵌套页面设置token */
export async function setDetectionToken(params) {
  return request({
    module: "erp",
    url: "/check-token",
    method: "get",
    params
  });
}

/* 模板列表 */
export async function templateLists(params) {
  return await request({
    module: "erp",
    url: "/platforms/vehicle-checks/template-list",
    method: "get",
    params
  });
}
