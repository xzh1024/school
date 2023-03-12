import request, { SERVICE_MODULE_MAP } from "@/utils/request";

class Points {
  constructor() {
    this.baseURL = SERVICE_MODULE_MAP
  }
  /**
   * @description: 获取积分管理列表
   * @param {*} searchData
   */
  getPointsAdminList(searchData) {
    return request({
      baseURL: this.baseURL.united,
      url: '/points/points/list',
      contentType: 'application/json',
      method: "post",
      data: searchData
    });
  }
  /**
   * @description: 修改客户积分
   * @param {*} data
   */
  updatePointsByid(data) {
    return request({
      baseURL: this.baseURL.united,
      url: '/points/points/adjust',
      contentType: 'application/json',
      method: "post",
      data
    });
  }
  /**
   * @description: 获取客户下拉
   * @param {*} data
  */
  getCustomerList(params) {
    return request({
      baseURL: this.baseURL.accounts,
      url: '/customers',
      contentType: 'application/json',
      method: "get",
      params
    });
  }
  /**
   * @description: 获取日志列表
   * @param {*} searchData
   */
  getLogList(searchData) {
    return request({
      baseURL: this.baseURL.united,
      url: "/points/point_logs/list",
      contentType: 'application/json',
      method: "post",
      data: searchData
    })
  }
  /**
   * @description: 获取积分参数
   */
  getPointsSetting() {
    return request({
      baseURL: this.baseURL.accounts,
      url: "/points/settings",
      contentType: 'application/json',
      method: "get",
    })
  }
  /**
   * @description: 设置积分参数
   */
  updatePointsSetting(data) {
    return request({
      baseURL: this.baseURL.accounts,
      url: "/points/settings",
      contentType: 'application/json',
      method: "post",
      data
    })
  }
  /**
   * @description: 切换积分开关
   */  
  togglePointsEnable(data) {
    return request({
      baseURL: this.baseURL.accounts,
      url: "/companies/settings/point",
      contentType: 'application/json',
      method: "post",
      data
    })
  }
  /**
   * @description: 获取积分状态
   */ 
  getPointsEnable(){
    return request({
      baseURL: this.baseURL.accounts,
      url: "/companies/settings/point",
      contentType: 'application/json',
      method: "get",
    })
  }
  //根据公司ID获取员工列表信息 
  getStaffsBycid(params) {
    return request({
      baseURL: this.baseURL.accounts,
      url: `/staffs/by-cid`,
      method: "get",
      params
    });
  }
  /**
   * @description: 导出积分用户列表
   */
  exportUserPointsList(data) {
    return request({
      baseURL: this.baseURL.united,
      url: "/points/points/export",
      method: "post",
      data,
      contentType: "application/json; charset=utf-8",
      responseType: "blob"
    })
  }
  /**
   * @description: 导出积分列表
   */
  exportLogsList(data) {
    return request({
      baseURL: this.baseURL.united,
      url: "/points/point_logs/export",
      method: "post",
      data,
      contentType: "application/json; charset=utf-8",
      responseType: "blob"
    })
  }
}
export default new Points()
