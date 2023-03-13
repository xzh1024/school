import request from "@/utils/request";

export async function loadCompanySeting() {
  return await request({
    module: "erp",
    url: "/financials/company_settings/list",
    method: "post"
  });
}

export async function updateCompanySeting(data) {
  return await request({
    module: "erp",
    url: "/financials/company_settings/set ",
    method: "post",
    data
  });
}

export async function loadCompanyOpening() {
  return await request({
    module: "erp",
    url: "/financials/company_openings/list",
    method: "post"
  });
}

export async function openCompanyFundAccounts(data) {
  return await request({
    module: "erp",
    url: "/financials/company_fund_accounts/open",
    method: "post",
    data
  });
}

// export async function getCompanyFundAccountList(data) {
//   return await request({
//     module: "erp",
//     url: "/financials/company_fund_accounts/list",
//     method: "post",
//     data: data || {}
//   }).then(res => ({
//     ...res,
//     accounts: res ? res.accounts : []
//   }));
// }

export async function loadCompanyFundAccounts(data) {
  return await request({
    module: "erp",
    url: "/financials/company_fund_accounts/list-for-settle",
    method: "post",
    data
  }).then(res => ({
    ...res,
    accounts: res ? res.accounts : []
  }));
}

export async function deleteCompanyFundAccount(data) {
  return await request({
    module: "erp",
    url: "/financials/company_fund_accounts/delete",
    method: "post",
    data
  });
}

export async function updateCompanyFundAccount(data) {
  return await request({
    module: "erp",
    url: "/financials/company_fund_accounts/update",
    method: "post",
    data
  });
}
export async function createCompanyFundAccount(data) {
  return await request({
    module: "erp",
    url: "/financials/company_fund_accounts/create",
    method: "post",
    data
  });
}

// 获取有权核算的分公司列表
export async function getFinancialsCompanys(params) {
  return await request({
    module: "erp",
    url: "/financials/company_settings/list-of-companies",
    method: "get",
    params
  });
}

// 获取有权核算的分公司列表(带权限)
export async function getCompanyList(params) {
  return await request({
    module: "erp",
    url: "/repairs/devices/company-list",
    method: "get",
    params
  });
}

// 某公司下辖资金账户列表
export async function getCompanyFundAccounts(id) {
  return await request({
    module: "erp",
    url: `/financials/company_fund_accounts/list/${id}`,
    method: "get"
  });
}
