import request from "@/utils/request";

export function noLoginPath(data) {
  // 非登录状态进入平台
  return request({
    url: "/login/refresh",
    method: "post",
    isResAll: true,
    data
  });
}

export function createMyCompany(data) {
  // 注册我的公司
  return request({
    url: "/companies/create",
    method: "post",
    data
  });
}
export function recallCreateMyCompnay(data) {
  // 撤销注册我的公司
  return request({
    url: "/companies/cancel-apply",
    method: "post",
    data
  });
}
export function getMyCreateCompanyInfo() {
  // 获取我注册的公司信息
  return request({
    url: "/companies",
    method: "get"
  });
}
export function updateMyCreateCompnayInfo(data) {
  // 更新我注册的公司信息
  return request({
    url: "/companies/update",
    method: "post",
    data
  });
}

export function getMyCompanyInfo() {
  // 获取我的公司信息
  return request({
    url: "/account-sets/companies/my",
    method: "get"
  });
}
export function createBranchCompany(data) {
  // 创建分公司
  return request({
    url: "/account-sets/companies/create",
    method: "post",
    data
  });
}
export function getCompanyInfo(id) {
  // 获取id公司信息
  return request({
    url: "/account-sets/companies/detail/" + id,
    method: "get"
  });
}
export function updateCompnayInfo(data) {
  // 更新id公司信息
  return request({
    url: "/account-sets/companies/detail/" + data.id,
    method: "post",
    data
  });
}
export function getAllCompanies(params) {
  // 获取账套内所有公司
  return request({
    url: "/account-sets/companies/list",
    method: "get",
    params
  });
}
export function getAllCreatableCompanies(params) {
  // 获取所有可以添加员工的公司列表
  return request({
    url: "/account-sets/staffs/backend-create/list-company",
    method: "get",
    params
  });
}
export function createStaff(data) {
  // 创建员工
  return request({
    url: "/account-sets/staffs/backend-create",
    method: "post",
    data
  });
}
export function invitedJoinCompany(data) {
  // 申请加入公司
  return request({
    url: "/staffs/apply",
    method: "post",
    data
  });
}
export function getJoinCompanyAuditInfo() {
  // 获取申请加入公司审核信息
  return request({
    url: "/staffs/apply-info",
    method: "get"
  });
}
export function recallJoinCompany(data) {
  // 撤回申请加入公司
  return request({
    url: "/staffs/cancel-apply",
    method: "post",
    data
  });
}
export function searchOnlineStaffs(data) {
  // 全部在线员工
  return request({
    url: "/account-sets/staffs/list/online",
    method: "post",
    data
  });
}
export function searchStaffs(data) {
  // 全部员工
  return request({
    url: "/account-sets/staffs/list",
    method: "post",
    data
  });
}
export function deleteStaffs(id) {
  // 删除员工
  return request({
    url: "/account-sets/staffs/" + id,
    method: "delete"
  });
}
export function staffsInformation(id) {
  // 获取员工信息
  return request({
    url: "/account-sets/staffs/" + id,
    method: "get"
  });
}
export function loadPendingStaffs() {
  // 待审核员工
  return request({
    url: "/account-sets/staffs/list/pending"
  });
}
export function agreeStaffs(id) {
  // 同意员工加入
  return request({
    url: "/account-sets/staffs/" + id + "/agree",
    method: "post"
  });
}
export function refuseStaffs(data) {
  // 拒绝员工加入
  return request({
    url: "/account-sets/staffs/" + data.id + "/refuse",
    method: "post",
    data
  });
}
export function leaveStaffs(data) {
  // 办理员工离职
  return request({
    url: "/account-sets/staffs/" + data.staffId + "/leave",
    method: "post",
    data
  });
}
export function updateStaffs(data) {
  // 更新员工信息
  return request({
    url: "/account-sets/staffs",
    method: "put",
    data
  });
}
export function checkStaffs(data) {
  // 检查员工信息
  return request({
    module: "erp",
    url: "/account-sets/staffs/check_for_update",
    method: "post",
    data
  });
}
// 暂时不用
export function hasOrder(id) {
  // 获取员工是否有订单存在
  return request({
    url: "/staffs/" + id + "/has-order-uncompleted",
    method: "get"
  });
}
// 暂时不用
export function handoverStaffs(data) {
  // 移交单据
  return request({
    url: "/staffs/handover",
    method: "post",
    data
  });
}
// 暂时不用
export function changeDepartments(data) {
  // 员工更换部门
  return request({
    module: "erp",
    url: "accounts/departments/move",
    method: "post",
    data
  });
}

export function getAllDepartments(params) {
  // 获取帐套下部门
  return request({
    url: "/account-sets/organizations/staffs/departments",
    method: "get",
    params
  });
}
/* 获取公司部门信息 */
export function getCompanyDepartments() {
  return request({
    module: "erp",
    url: "/account-sets/organizations/company-departments",
    method: "get"
  });
}
export function getManageCompanies(params) {
  // 获取帐套下可管理的分公司
  return request({
    url: "/account-sets/organizations/staffs/companies",
    method: "get",
    params
  });
}
export function createDepartments(data) {
  // 创建部门
  return request({
    url: "/account-sets/departments",
    method: "post",
    data
  });
}
export function updateDepartments(data) {
  // 更新部门
  return request({
    url: "/account-sets/departments/",
    method: "put",
    data
  });
}
export function deleteDepartments(id, data) {
  // 删除部门
  return request({
    url: "/account-sets/departments/" + id + "/delete",
    method: "post",
    data
  });
}
export function loadComapnyDepartments(id) {
  // 获取公司部门
  return request({
    url: "/account-sets/departments/of-company/" + id,
    method: "get"
  });
}
export function loadDepartmentStaffs(id) {
  // 获取公司部门下员工
  return request({
    url: "/account-sets/departments/" + id + "/staffs",
    method: "get"
  });
}

// 适用于下拉列表
export function searchTypeStaffs(params) {
  // purchase:采购业务员, sale:销售业务员, store:仓库管理员
  return request({
    module: "erp",
    url: "/account-sets/staffs",
    method: "get",
    params
  });
}
// 适用于下拉列表
export function searchBusinessmen(data) {
  // purchaseMan:采购业务员, salesMan:销售业务员
  return request({
    module: "erp",
    url: "/account-sets/staffs/business_mans",
    method: "post",
    data
  });
}
// 适用于下拉列表
export function searchAuditmen(data) {
  // purchaseMan:采购业务员, salesMan:销售业务员
  return request({
    module: "erp",
    url: "/account-sets/staffs/financial-audit-mans",
    method: "post",
    data
  });
}
// 适用于下拉列表
export function searchCreatedmen(data) {
  // XD:销售订单, XS: "销售出库单", XT:销售退货单
  // CD: "采购订单", CG: "采购到货单", JJ: "急件到货单", CT: "采购退货单",
  return request({
    module: "erp",
    url: "/account-sets/staffs/created_mans",
    method: "post",
    data
  });
}
// 适用于下拉列表
export function selectCompanys(params) {
  return request({
    // 账套下公司列表
    module: "erp",
    url: "/account-sets/companies",
    method: "get",
    params
  });
}
