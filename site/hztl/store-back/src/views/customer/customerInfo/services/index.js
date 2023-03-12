import request, { SERVICE_MODULE_MAP } from "@/utils/request";


export class CustomerInfoApi {

  //获取客户资料 
  getCustomerInfo(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/customers/${params.id}`,
      method: "get",
    });
  }

  //我的客户车辆信息列表 
  getVehiclesList(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/customers/vehicles`,
      method: "get",
      params
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

  //获取会员等级列表 
  getMemberGradesList(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/members-grades`,
      method: "get",
      params
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

  // //通过
  // agree(params) {
  //   return request({
  //     baseURL: SERVICE_MODULE_MAP.accounts,
  //     url: `/customers/${params.id}/agree`,
  //     method: "post",
  //     data: params
  //   });
  // }

  // //拒绝
  // refuse(params) {
  //   return request({
  //     baseURL: SERVICE_MODULE_MAP.accounts,
  //     url: `/customers/${params.id}/refuse`,
  //     method: "post",
  //     data: params
  //   });
  // }
}
