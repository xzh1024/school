import request, { SERVICE_MODULE_MAP } from "@/utils/request";


export class AuditedCustomerApi {

  //获取客户列表 
  getCustomersList(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/customers`,
      method: "get",
      params
    });
  }

  //获取客户基础信息设置 
  getsCustomersById(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/customers/sets/${params.id}`,
      method: "get",
    });
  }

  //设置 
  setsCustomers(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/customers/sets`,
      method: "post",
      data: params
    });
  }

  //通过
  agree(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/customers/${params.id}/agree`,
      method: "post",
      data: params
    });
  }

  //拒绝
  refuse(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/customers/${params.id}/refuse`,
      method: "post",
      data: params
    });
  }

  //获取标签list 
  getLabelList(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/companies/labels`,
      method: "get",
      params
    });
  }

  //获取erp的客户列表(关联本地客户) 
  getErpList(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/customers/erp`,
      method: "get",
      params
    });
  }

  //获取会员等级list 
  getMemberGradeList(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/members-grades/id-and-name`,
      method: "get",
      params
    });
  }

  //字典数据列表 
  getDicts(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/dicts`,
      method: "get",
      params
    });
  }

  //根据公司ID获取员工列表信息 
  getStaffsBycid(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/staffs/by-cid`,
      method: "get",
      params
    });
  }
}
