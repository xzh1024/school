import request from "@/utils/request";

//配件查询
export function reqPartsSimple(data) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/parts/search",
    method: "post",
    data
  });
}

//设置价格公式优先级改系统参数设置接口
// export function setPriceSettingsPriority(data, params) {
//   return request({
//     module: "erp",
//     url: "/purchases/price_settings/priority",
//     method: "post",
//     params,
//     data
//   });
// }

//自定义价格公式
export function reqPurchasePriceDefineList(data) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/formular_prices/search",
    method: "post",
    data
  });
}
export function reqPurchasePriceDefineCreate(data) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/formular_prices",
    method: "post",
    data
  });
}
export function reqPurchasePriceDefineUpdate(data) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/formular_prices/" + data.id,
    method: "put",
    data
  });
}
export function reqPurchasePriceDefineDetails(id) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/formular_prices/" + id
  });
}
export function reqPurchasePriceDefineDelete(ids) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/formular_prices",
    method: "delete",
    data: {
      ids: ids
    }
  });
}

// 固定价格
export function reqPurchasePriceFixedList(data) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/fixed_prices/search",
    method: "post",
    data: data
  });
}
export function reqPurchasePriceFixedCreate(data) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/fixed_prices",
    method: "post",
    data: data
  });
}
export function reqPurchasePriceFixedDelete(ids) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/fixed_prices",
    method: "delete",
    data: {
      ids: ids
    }
  });
}
export function reqPurchasePriceFixedUpdate(data) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/fixed_prices/" + data.id,
    method: "put",
    data
  });
}
export function reqPurchasePriceFixedSync(id) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/fixed_prices/" + id + "/sync",
    method: "put"
  });
}
export function reqPurchasePriceFixedSingle(data) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/fixed_prices/single",
    method: "post",
    data
  });
}
//根据售价制定策略计算售价
export function reqPurchasePriceSettings(data) {
  return request({
    module: "erp",
    url: "/purchases/price_settings/calculate",
    method: "post",
    data
  });
}
