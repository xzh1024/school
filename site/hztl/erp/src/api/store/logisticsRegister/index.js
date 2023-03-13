import request from "@/utils/request";

export function reqLogisticsRegisterToBeDeliverList(data) {
  return request({
    module: "erp",
    url: "/storage/logistics_registrations/bill_query/to_deliver",
    method: "post",
    data
  });
}

export function reqLogisticsRegisterToBeReceiveList(data) {
  return request({
    module: "erp",
    url: "/storage/logistics_registrations/bill_query/to_receive",
    method: "post",
    data
  });
}

export function reqLogisticsRegisterDetailsList(data) {
  return request({
    module: "erp",
    url: "/storage/logistics_registrations/search",
    method: "post",
    data
  });
}

export function reqCreateLogisticsRegister(data) {
  return request({
    module: "erp",
    url: "/storage/logistics_registrations",
    method: "post",
    data
  });
}

export function reqUpdateLogisticsRegister(data, id) {
  return request({
    module: "erp",
    url: `/storage/logistics_registrations/${id}`,
    method: "put",
    data
  });
}

export function reqConfirmLogisticsRegister(id) {
  return request({
    module: "erp",
    url: `/storage/logistics_registrations/${id}/confirm`,
    method: "put"
  });
}

export function reqLogisticsRegisterDetail(id) {
  return request({
    module: "erp",
    url: `/storage/logistics_registrations/${id}`,
    method: "get"
  });
}

export function reqSignForLogisticsRegister(id) {
  return request({
    module: "erp",
    url: `/storage/logistics_registrations/${id}/receive`,
    method: "put"
  });
}
