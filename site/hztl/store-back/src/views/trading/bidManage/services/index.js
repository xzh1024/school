import request, { SERVICE_MODULE_MAP } from "@/utils/request";

export class BidService {

  getDetailNum(){
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: "/inquiries/count-with-wants",
      method: "get"
    });
  }

  //获取报价 table 数据
  getBidTableList(params) {

    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: "/wants-v2/wants/receiver",
      method: "get",
      params
    });
  }
  
  //获取报价 table 中某一条的详情
  getBidTableDetail(wantCode) {

    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: "/wants-v2/wants/receiver/" + wantCode,
      method: "get"
    });
  }

  //终止报价 
  stopQuote(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: "/wants-v2/receipts/receiver/offer",
      method: "post",
      data: params
    });
  }

  //提交报价单 
  toSubQuote(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: "/wants-v2/receipts/receiver/offer",
      method: "post",
      data: params
    });
  }

  //获取确认价格 table 数据
  getInquiriesTableList(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: "/inquiries/receive",
      method: "get",
      params
    });
  }

  //获取品质列表
  getPinzhiList(){
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: "/athena/dicts/insurance-certs",
      method: "get"
    });
  }
}
