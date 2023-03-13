import request from "@/utils/request";

export function reqVehModelSubs(data) {
  return request({
    module: "erp",
    url: "/goods/parts/veh_models/search_for_subs",
    method: "post",
    data
  });
}
export function reqVehModelTrees(data) {
  return request({
    module: "erp",
    url: "/goods/parts/veh_models/search_for_trees",
    method: "post",
    data
  });
}
export function reqAddVehModel(data) {
  return request({
    module: "erp",
    url: "/goods/parts/veh_models/add",
    method: "post",
    data
  });
}
export function reqDeleteVehModel(data) {
  return request({
    module: "erp",
    url: "/goods/parts/veh_models/delete",
    method: "post",
    data
  });
}
export function reqInitVehModel(data) {
  return request({
    module: "erp",
    url: "/goods/parts/veh_models/search_for_model_ids",
    method: "post",
    data
  });
}
export function reqSearchCustomVehModels(data) {
  return request({
    module: "erp",
    url: "/goods/parts/veh_models/search_for_customs",
    method: "post",
    data
  });
}
export function reqUpdateCustomVehModels(data) {
  return request({
    module: "erp",
    url: "/goods/parts/veh_models/update_custom",
    method: "post",
    data
  });
}
export function reqVehModels(data) {
  return request({
    module: "erp",
    url: "/goods/parts/veh_models/search_for_avaliables",
    method: "post",
    data
  });
}
