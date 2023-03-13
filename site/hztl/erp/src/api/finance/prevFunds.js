import request from "@/utils/request";

export async function summary(params) {
  return await request({
    module: "erp",
    url: "/financials/prev-funds/summary",
    method: "get",
    params
  });
}

export async function detail(params) {
  return await request({
    module: "erp",
    url: "/financials/prev-funds",
    method: "get",
    params
  });
}

export async function chargeDetail(params) {
  return await request({
    module: "erp",
    url: "/financials/prev-fund-logs",
    method: "get",
    params
  });
}

// 补充登记
export async function supplement(data) {
  return await request({
    module: "erp",
    url: "/financials/prev-funds/supplement",
    method: "post",
    data
  });
}

// 冲销登记
export async function chargeSupplement(data) {
  return await request({
    module: "erp",
    url: "/financials/prev-fund-logs/supplement",
    method: "post",
    data
  });
}

export async function balance(params) {
  return await request({
    module: "erp",
    url: "/financials/prev-funds/balance",
    method: "get",
    params
  });
}
