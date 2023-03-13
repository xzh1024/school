import request from "@/utils/request";

// 待收票单
export async function invoicesInWaitingList(params) {
  return await request({
    module: "erp",
    url: `/financials/invoices/in/business`,
    method: "get",
    params
  });
}

// 创建收票
export async function invoicesInCreate(data) {
  return await request({
    module: "erp",
    url: `/financials/invoices/in`,
    method: "post",
    data: data
  });
}

// 导出待收票单
export async function invoicesInWaitingExport(data) {
  return await request({
    module: "erp",
    url: `/financials/invoices/in/business/export`,
    method: "post",
    data: data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

// 收票单
export async function invoicesInList(params) {
  return await request({
    module: "erp",
    url: `/financials/invoices/in`,
    method: "get",
    params
  });
}

// 作废收票单
export async function invoicesInvalid(data) {
  return await request({
    module: "erp",
    url: `/financials/invoices/in/invalid`,
    method: "put",
    data: data
  });
}

// 导出收票单
export async function invoicesInExport(data) {
  return await request({
    module: "erp",
    url: `/financials/invoices/in/export`,
    method: "post",
    data: data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

// 收票单详情
export async function invoicesInDetail(params) {
  return await request({
    module: "erp",
    url: `/financials/invoices/in/details`,
    method: "get",
    params
  });
}

// 收票单详情导出
export async function invoicesInDetailExport(data) {
  return await request({
    module: "erp",
    url: `/financials/invoices/in/details/export`,
    method: "post",
    data: data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

// 待开票单
export async function invoicesOutWaitingList(params) {
  return await request({
    module: "erp",
    url: `/financials/invoices/out/business`,
    method: "get",
    params
  });
}

// 创建开票
export async function invoicesOutCreate(data) {
  return await request({
    module: "erp",
    url: `/financials/invoices/out`,
    method: "post",
    data: data
  });
}

// 导出待开票单
export async function invoicesOutWaitingExport(data) {
  return await request({
    module: "erp",
    url: `/financials/invoices/out/business/export`,
    method: "post",
    data: data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

// 开票单
export async function invoicesOutList(params) {
  return await request({
    module: "erp",
    url: `/financials/invoices/out`,
    method: "get",
    params
  });
}

// 作废开票单
export async function invoicesOutvalid(data) {
  return await request({
    module: "erp",
    url: `/financials/invoices/out/invalid`,
    method: "put",
    data: data
  });
}

// 导出开票单
export async function invoicesOutExport(data) {
  return await request({
    module: "erp",
    url: `/financials/invoices/out/export`,
    method: "post",
    data: data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}

// 开票单详情
export async function invoicesOutDetail(params) {
  return await request({
    module: "erp",
    url: `/financials/invoices/out/details`,
    method: "get",
    params
  });
}

// 开票单详情导出
export async function invoicesOutDetailExport(data) {
  return await request({
    module: "erp",
    url: `/financials/invoices/out/details/export`,
    method: "post",
    data: data,
    isExportData: true,
    contentType: "application/json; charset=utf-8",
    responseType: "blob"
  });
}
