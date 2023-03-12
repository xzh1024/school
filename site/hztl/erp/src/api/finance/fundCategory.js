import request from "@/utils/request";

export async function tree() {
  return await request({
    module: "erp",
    url: `/financials/fund-categories/tree`,
    method: "get"
  });
}

export async function add(data) {
  return await request({
    module: "erp",
    url: `/financials/fund-categories`,
    method: "post",
    data
  });
}

export async function update(data) {
  return await request({
    module: "erp",
    url: `/financials/fund-categories`,
    method: "put",
    data
  });
}

export async function updateStatus(data) {
  return await request({
    module: "erp",
    url: `/financials/fund-categories/status`,
    method: "put",
    data
  });
}

export async function deleteRecord(data) {
  return await request({
    module: "erp",
    url: `/financials/fund-categories`,
    method: "delete",
    data
  });
}
