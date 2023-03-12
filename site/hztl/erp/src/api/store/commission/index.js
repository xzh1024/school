import request from "@/utils/request";
export function commissionList(data) {
  //佣金列表
  return request({
    module: "erp",
    url: "/financials/commissions/list",
    method: "post",
    data
  });
}
export function commissionSettle(data) {
  //佣金结算
  return request({
    module: "erp",
    url: "/financials/settles/bill_settle",
    method: "post",
    data
  });
}
