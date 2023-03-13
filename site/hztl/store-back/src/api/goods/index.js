import request, { SERVICE_MODULE_MAP } from '@/utils/request';

// 商品列表-关联操作
export function getGoods(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/goods',
    method: 'post',
    data: params,
  });
}

// 商品列表
export function queryGoods(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/goods',
    method: 'get',
    params,
  });
}

// 获取服务项目/项目套餐 分类信息列表
export function getGoodsCategory(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/goods/list/category',
    method: 'get',
    params,
  });
}

// 商品详情
export function getGoodsInfo(id, params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/goods/' + id,
    params,
  });
}

// 依据ID获取商品分享地址
export function getGoodsShare(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/goods/share',
    method: 'get',
    params,
  });
}

// 依据主键ID更新商品信息
export function updateGoods(id, params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/goods/update/' + id,
    method: 'post',
    data: params,
  });
}

// 批量更新商品信息
export function batchUpdateGoods(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.united,
    url: '/goods/update',
    method: 'post',
    data: params,
  });
}

// 获取车辆级别
export function getVehicleLevelList() {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: '/dicts/vehicle-level',
  });
}
