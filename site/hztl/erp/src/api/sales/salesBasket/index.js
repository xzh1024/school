/*
 * @Author: Yong
 * @Date: 2021-11-10 09:48:43
 * @LastEditors: Yong
 * @LastEditTime: 2021-11-10 09:49:38
 * @Description:
 */
import request from "@/utils/request";

export function loadSalesBasket(data) {
  if (!data) {
    data = {
      createdBy: 0,
      channel: "",
      quoteWays: null,
      partner: "",
      cooperatorName: "",
      code: "",
      brand: "",
      date: "",
      fromDate: "",
      toDate: "",
      failed: false
    };
  }
  return request({
    module: "erp",
    url: "/sales/quotation-basket/list",
    method: "post",
    data
  });
}

export function addSalesBasket(data) {
  return request({
    module: "erp",
    url: "/sales/quotation-basket",
    method: "post",
    data
  });
}

export function updateSalesBasket(data) {
  return request({
    module: "erp",
    url: "/sales/quotation-basket",
    method: "PATCH",
    data
  });
}
export function removeSalesBasket(data) {
  return request({
    module: "erp",
    url: "/sales/quotation-basket",
    method: "delete",
    data
  });
}

export function createOrder(data) {
  return request({
    module: "erp",
    url: "/sales/quotation-basket/create-sale-order",
    method: "post",
    data
  });
}

export function createSaleOutOrder(data) {
  return request({
    module: "erp",
    url: "/sales/quotation-basket/create-sale-sale",
    method: "post",
    data
  });
}

export function addOrder(data) {
  return request({
    module: "erp",
    url: "/sales/quotation-basket/add-to-sale-order",
    method: "post",
    data
  });
}
/**
 * @description: 检查报价篮配件是否需要映射
 * @param {*} ids: number[]
 */
export function basketPartCheck(data) {
  return request({
    module: "erp",
    url: "/sales/quotation-basket/part/check",
    method: "post",
    data
  });
}
