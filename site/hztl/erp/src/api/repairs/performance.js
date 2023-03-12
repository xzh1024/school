import request from "@/utils/request";

/* 维修人员绩效统计-接待顾问-汇总 */
export async function receptionSummaryList(params) {
  return request({
    module: "erp",
    url: "/statistics/achievements/receptions/summary",
    method: "get",
    params
  });
}

/* 维修人员绩效统计-接待顾问-汇总导出 */
export async function receptionSummaryExport(params) {
  return request({
    module: "erp",
    url: "/statistics/achievements/receptions/summary/export",
    method: "get",
    params,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

/* 维修人员绩效统计-接待顾问-维修工单明细 */
export async function receptionBillList(params) {
  return request({
    module: "erp",
    url: "/statistics/achievements/receptions/repair-bills",
    method: "get",
    params
  });
}

/* 维修人员绩效统计-接待顾问-保险申请单明细 */
export async function insurancesList(params) {
  return request({
    module: "erp",
    url: "/repairs/insurances/achievements-detail",
    method: "get",
    params
  });
}

/* 维修综合查询-保险-保险申请单详情 维修人员绩效统计-接待顾问-保险申请单详情*/
export async function insurancesDetail(params) {
  return request({
    module: "erp",
    url: "/repairs/insurances/detail",
    method: "get",
    params
  });
}

/* 维修人员绩效统计-接待顾问-洗车单明细 */
export async function washCarDetail(params) {
  return request({
    module: "erp",
    url: "/repairs/washings/achievements-detail",
    method: "get",
    params
  });
}

/* 维修人员绩效统计-维修技师-汇总 */
export async function techniciansSummaryList(params) {
  return request({
    module: "erp",
    url: "/statistics/achievements/technicians/summary",
    method: "get",
    params
  });
}

/* 维修人员绩效统计-维修技师-汇总导出 */
export async function techniciansSummaryExport(params) {
  return request({
    module: "erp",
    url: "/statistics/achievements/technicians/summary/export",
    method: "get",
    params,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

/* 维修人员绩效统计-维修技师-服务项目明细 */
export async function techniciansItemList(params) {
  return request({
    module: "erp",
    url: "/statistics/achievements/technicians/items",
    method: "get",
    params
  });
}

/* 维修人员绩效统计-维修技师-绩效返工责任费服务项目明细 */
export async function techniciansReworkItemList(params) {
  return request({
    module: "erp",
    url: "/statistics/achievements/technicians/rework-items",
    method: "get",
    params
  });
}

/* 维修人员绩效统计-维修技师-配件材料明细 */
export async function techniciansPartList(params) {
  return request({
    module: "erp",
    url: "/statistics/achievements/technicians/parts",
    method: "get",
    params
  });
}

/* 维修人员绩效统计-维修技师-绩效返工责任费配件材料明细 */
export async function techniciansReworkPartList(params) {
  return request({
    module: "erp",
    url: "/statistics/achievements/technicians/rework-parts",
    method: "get",
    params
  });
}

/* 维修人员绩效统计-洗车人员-洗车汇总列表 */
export async function washCarList(params) {
  return request({
    module: "erp",
    url: "/repairs/washings/achievements-list",
    method: "get",
    params
  });
}

/* 维修人员绩效统计-洗车人员-洗车汇总导出 */
export async function achievementsExport(params) {
  return request({
    module: "erp",
    url: "/repairs/washings/achievements-export",
    method: "post",
    data: params,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
