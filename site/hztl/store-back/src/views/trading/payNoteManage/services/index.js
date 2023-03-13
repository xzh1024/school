import request, { SERVICE_MODULE_MAP } from "@/utils/request";

export class PayNoteManageApi {

  /**
   * @param 获取支付单 table 数据
   * @param {page}  
   * @param {pageSize}  
   * @param {statuses}  statuses:0：待支付，1：支付中，2：支付成功，-1：支付失败，-2：已失败，不传全部，多状态“,”分隔
   * @param {type}  type=financial
   * @param {startTime}  
   * @param {endTime}  
   * @param {companyName}  
   * @param {orderCode}  订单号
   * @param {orderTypes}  订单类型 1：配件购买，2：会员服务购买，3：余额充值，不传全部，多类型“,”分隔
   * @param {keyword}  订单号/公司名称/个人名称/个人手机号
   */
  getPayNoteTableList(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.pay,
      url: "/payments",
      method: "get",
      params
    });
  }

  //通过审核 
  throughCheck(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.pay,
      url: `/payments/${params.payType}`,
      method: "post",
      data: params.obj
    });
  }

  //拒绝 
  refusedCheck(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.pay,
      url: "/payments/cancel",
      method: "post",
      data: params
    });
  }

  
}
