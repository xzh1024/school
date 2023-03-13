import request from "@/utils/request";

export function branchCompany(type) {
  // 获取账套下公司下拉框数据
  return request({
    module: "erp",
    url: `/account-sets/companies/${type}/options`
  });
}

export function getStaffs(type, data) {
  // 列出账套下员工下拉选项
  return request({
    module: "erp",
    url: `/account-sets/staffs/${type}/options`,
    params: data
  });
}
export function getStaffsList(data) {
  // 列出仓库权限员工
  return request({
    module: "erp",
    url: "/storehouses/managers/staffs",
    params: data
  });
}
export function getStaffsStore(data) {
  // 列出仓库权限树
  return request({
    module: "erp",
    url: "/storehouses/managers/tree",
    params: data
  });
}
export function ChangeStaffsStore(data) {
  // 创建、更新仓库权限
  return request({
    module: "erp",
    url: "/storehouses/managers",
    method: "post",
    data
  });
}
