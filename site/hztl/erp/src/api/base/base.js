import request from "@/utils/request";

export function baseDictionary(params) {
  return request({
    module: "erp",
    url: "/settings/dicts",
    method: "get",
    params
  });
}

export function baseSet(params) {
  if (params.module == "platform") {
    return request({
      module: "erp",
      url: "/platforms/settings",
      method: "get"
    });
  } else {
    return request({
      module: "erp",
      url: "/settings/params",
      method: "get",
      params
    });
  }
}

export function addRoles(data) {
  // 新增角色
  return request({
    url: "/account-sets/roles",
    method: "post",
    data
  });
}
export function deleteRoles(params) {
  // 删除角色
  return request({
    url: "/account-sets/roles/" + params,
    method: "delete"
  });
}
export function updateNoInfoRoles(data) {
  // 跟新非内置角色
  return request({
    url: "/account-sets/roles",
    method: "put",
    data
  });
}
export function batchSetPermissions(data) {
  // 批量更新角色权限
  return request({
    url: "/account-sets/roles/set-permissions",
    method: "post",
    data
  });
}
export function resRoles(params) {
  return request({
    // 获取账套内角色列表
    url: "/account-sets/roles",
    method: "get",
    params
  });
}
export function getRolesPermissions(params) {
  return request({
    // 获取权限树
    url: "/account-sets/roles/perms-tree",
    method: "get",
    params
  });
}
export function restoreRolesPermissions(data) {
  // 恢复权限设置
  return request({
    url: "/account-sets/roles/restore-permissions",
    method: "post",
    data
  });
}
export function createDicts(data) {
  return request({
    module: "erp",
    url: "/settings/dicts",
    method: "post",
    data
  });
}
export function deleteDicts(params) {
  return request({
    module: "erp",
    url: "/settings/dicts/",
    method: "delete",
    params
  });
}
export function updateDicts(data) {
  return request({
    module: "erp",
    url: "/settings/dicts",
    method: "put",
    data
  });
}
export function ableDicts(data) {
  return request({
    module: "erp",
    url: "/settings/dicts/status",
    method: "put",
    data
  });
}

export function getPartName(data) {
  return request({
    module: "erp",
    url: "/goods/parts/name_match",
    method: "post",
    data
  });
}

// 根据名称获取账套下仓库信息
export function searchAllWarehouses(params) {
  return request({
    module: "erp",
    url: "/storehouses/warehouses/option",
    method: "get",
    params
  });
}
// 根据名称获取各种情况下仓库信息
export function searchAllTypeWarehouses(params) {
  return request({
    module: "erp",
    url: "/storehouses/warehouses/perm/option",
    method: "get",
    params
  });
}
// 根据名称获取账套下调拨申请转调拨出库仓库信息
export function searchAllocOutWarehouses(params) {
  return request({
    module: "erp",
    url: "/storehouses/assignments/allocs/priority-warehouse",
    method: "get",
    params
  });
}

export function getJoinedPlatform() {
  return request({
    module: "erp",
    url: "/relation-alliances",
    method: "get"
  });
}

// 获取平台内置配件品牌
export function getPlatformBrands(data) {
  return request({
    module: "erp",
    url: "/settings/brands/platform",
    method: "post",
    data
  });
}

// 获取全部系统参数全局使用
export function getAllSystemParams(params) {
  return request({
    module: "erp",
    url: "/settings/params/base",
    method: "get",
    params
  });
}
// 获取系统参数详情
export function getSystemParamsDetail(params) {
  return request({
    module: "erp",
    url: "/settings/params/detail",
    method: "get",
    params
  });
}
// 新增、更新系统参数
export function updateSystemParamsDetail(data) {
  return request({
    module: "erp",
    url: "/settings/params",
    method: "post",
    data
  });
}
// 获取公司系统参数详情
export function getCompanySystemParamsDetail(params) {
  return request({
    module: "erp",
    url: "/settings/params/detail/by-company",
    method: "get",
    params
  });
}
// 新增、更新公司系统参数详情
export function updateCompanySystemParamsDetail(data) {
  return request({
    module: "erp",
    url: "/settings/params/by-company",
    method: "post",
    data
  });
}
// 获取员工系统参数详情
export function getStaffSystemParamsDetail(params) {
  return request({
    module: "erp",
    url: "/settings/params/detail/by-staff",
    method: "get",
    params
  });
}
// 新增、更新员工系统参数详情
export function updateStaffSystemParamsDetail(data) {
  return request({
    module: "erp",
    url: "/settings/params/by-staff",
    method: "post",
    data
  });
}
// 新增、更新员工系统参数部分详情
export function updateStaffSystemParamsPartDetail(data) {
  return request({
    module: "erp",
    url: "/settings/params/by-staff/part",
    method: "post",
    data
  });
}

// 结算参数
export async function getFinancialsSettles(data) {
  return await request({
    url: "/financials/settles/config",
    method: "post",
    data
  });
}

// 组织架构树
export function getOrganizations() {
  return request({
    module: "erp",
    url: "/account-sets/organizations/tree",
    method: "get"
  });
}
// 组织架构详情
export function getOrganizationsDetail(params) {
  return request({
    module: "erp",
    url: "/account-sets/organizations",
    method: "get",
    params
  });
}
/* 修改时列出下属分公司选项 */
export function getOrganizationsCompanies(params) {
  return request({
    module: "erp",
    url: "/account-sets/organizations/companies/option-for-update",
    method: "get",
    params
  });
}
/* 插入或更新组织架构 */
export function addOrganizations(data) {
  return request({
    module: "erp",
    url: "/account-sets/organizations",
    method: "post",
    data
  });
}

// 分享
export function createShares(data) {
  return request({
    module: "erp",
    url: "/shares",
    method: "post",
    data
  });
}

export function getSharesData(params) {
  return request({
    module: "erp",
    url: "/shares/data",
    method: "get",
    params
  });
}
/* 移动组织架构 */
export function moveOrganizations(data) {
  return request({
    module: "erp",
    url: "/account-sets/organizations/move",
    method: "put",
    data
  });
}
/* 更新部门 */
export function updateDepartments(data) {
  return request({
    module: "erp",
    url: "/account-sets/organizations/departments",
    method: "put",
    data
  });
}
/* 新增部门 */
export function addDepartments(data) {
  return request({
    module: "erp",
    url: "/account-sets/organizations/departments",
    method: "post",
    data
  });
}
/* 删除组织架构 */
export function deleteOrganizations(data) {
  return request({
    module: "erp",
    url: "/account-sets/organizations",
    method: "delete",
    data
  });
}
