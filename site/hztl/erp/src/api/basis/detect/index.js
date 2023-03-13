import request from "@/utils/request";

// 基础-车辆检测项目管理-树
export async function getDetectTree() {
  return await request({
    module: "erp",
    url: "/repairs/check_categories/tree",
    method: "get"
  });
}

// 基础-车辆检测项目管理-添加项目
export async function addDetect(data) {
  return await request({
    module: "erp",
    url: "/repairs/check_categories/create",
    method: "post",
    data
  });
}

// 基础-车辆检测项目管理-更新项目
export async function updateDetect(params) {
  return await request({
    module: "erp",
    url: "/repairs/check_categories/update",
    method: "get",
    params
  });
}

// 基础-车辆检测项目管理-删除项目
export async function delDetect(params) {
  return await request({
    module: "erp",
    url: "/repairs/check_categories/delete",
    method: "delete",
    params
  });
}

// 基础-车辆检测项目管理-查询该分类是否在项目中存在
export async function categoryExist(params) {
  return await request({
    module: "erp",
    url: "/repairs/check_templates/category-exist",
    method: "get",
    params
  });
}

// 基础-车辆检测项目管理-排序
export async function sortDetect(params) {
  return await request({
    module: "erp",
    url: "/repairs/check_categories/sort",
    method: "get",
    params
  });
}

// 基础-车辆检测项目管理-检测项目列表
export async function checkItemsList(params) {
  return await request({
    module: "erp",
    url: "/repairs/check_items/list",
    method: "get",
    params
  });
}

// 基础-车辆检测项目管理-检测项目新增
export async function checkItemsAdd(data) {
  return await request({
    module: "erp",
    url: "/repairs/check_items/create",
    method: "post",
    data
  });
}

// 基础-车辆检测项目管理-检测项目删除
export async function checkItemsDel(params) {
  return await request({
    module: "erp",
    url: "/repairs/check_items/delete",
    method: "delete",
    params
  });
}

// 基础-车辆检测项目管理-检测项目排序
export async function checkItemsSort(params) {
  return await request({
    module: "erp",
    url: "/repairs/check_items/sort",
    method: "get",
    params
  });
}

// 基础-车辆检测项目管理-检测项目更新
export async function checkItemsUpdate(data) {
  return await request({
    module: "erp",
    url: "/repairs/check_items/update",
    method: "post",
    data
  });
}

//基础-车辆检测项目管理-检测模板列表
export async function templateList(params) {
  return await request({
    module: "erp",
    url: "/repairs/check_templates/list",
    method: "get",
    params
  });
}

//基础-车辆检测项目管理-检测模板新增
export async function templateAdd(data) {
  return await request({
    module: "erp",
    url: "/repairs/check_templates/create",
    method: "post",
    data
  });
}

//基础-车辆检测项目管理-检测模板删除
export async function templateDelete(params) {
  return await request({
    module: "erp",
    url: "/repairs/check_templates/delete",
    method: "delete",
    params
  });
}

//基础-车辆检测项目管理-检测模板更新
export async function templateUpdate(data) {
  return await request({
    module: "erp",
    url: "/repairs/check_templates/update",
    method: "post",
    data
  });
}

//基础-车辆检测项目管理-检测模板提示
export async function templateItemList(data) {
  return await request({
    module: "erp",
    url: "/repairs/check_templates/item-list",
    method: "post",
    data
  });
}
