import request, { SERVICE_MODULE_MAP } from '@/utils/request';

// 获取优惠券启用设置
export function getCouponSetting() {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: '/companies/settings/coupon',
  });
}

// 修改优惠券启用设置
export function setCouponSetting(params) {
  return request({
    method: 'post',
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: '/companies/settings/coupon',
    data: params,
  });
}

// 优惠券列表
export function getCouponList(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/coupons',
    params,
  });
}

// 创建优惠券
export function addCoupon(params) {
  return request({
    method: 'post',
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/coupons',
    data: params,
  });
}

// 优惠券详情
export function getCouponInfo(id) {
  return request({
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/coupons/' + id,
  });
}

// 更新优惠券
export function updateCoupon(id, params) {
  return request({
    method: 'post',
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/coupons/' + id,
    data: params,
  });
}

// 结束优惠券
export function finishCoupon(id) {
  return request({
    method: 'post',
    baseURL: SERVICE_MODULE_MAP.united,
    url: `/coupons/${id}/finish`,
  });
}

// 发放优惠券
export function grantCoupons(params) {
  return request({
    method: 'post',
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/customer-coupons/grant',
    data: params,
  });
}

// 指定客户优惠券列表
export function getCustomerCouponList(id, params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/customer-coupons/list/' + id,
    params,
  });
}

// 作废用户的优惠券
export function cancelCustomerCoupon(id, params) {
  return request({
    method: 'post',
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/customer-coupons/cancel/' + id,
    data: params,
  });
}

// 获取分享数据
export function getShare(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/share',
    params,
  });
}
