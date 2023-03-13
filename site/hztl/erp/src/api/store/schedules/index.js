import request from "@/utils/request";

export function reqSchedulesType(params) {
  // 职能管理类别
  return request({
    module: "erp",
    url: "/storage/schedules/type/" + params,
    method: "get"
  });
}
export function reqSchedulesDispatch(params) {
  // 职能分组分配策略
  return request({
    module: "erp",
    url: "/storage/schedules/" + params + "/storehouses",
    method: "get"
  });
}
export function reqSchedulesSave(data) {
  // 职能分组分配策略保存
  return request({
    module: "erp",
    url: "/storage/schedules",
    method: "post",
    data
  });
}
export function deleteSchedulesGroup(params) {
  // 调度管理删除组
  return request({
    module: "erp",
    url: "/storage/schedules/" + params,
    method: "delete"
  });
}
export function deleteSchedulesMember(params) {
  // 调度管理删除成员
  return request({
    module: "erp",
    url: "/storage/schedules/" + params.groupId + "/member/" + params.staffId,
    method: "delete"
  });
}
export function schedulesReassign(params) {
  // 调度管理待处理面板列表
  return request({
    module: "erp",
    url: "/storage/schedules/reassign",
    method: "get",
    params
  });
}
export function schedulesReassignPicking(data, methods) {
  // 调度管理待处理面板列表待拣货重新分配/保存
  return request({
    module: "erp",
    url: "/storage/schedules/reassign/stockpicking",
    method: methods,
    data
  });
}
export function schedulesReassignStockout(data, methods) {
  // 调度管理待处理面板列表待验货-出 重新分配/保存
  return request({
    module: "erp",
    url: "/storage/schedules/reassign/stockout",
    method: methods,
    data
  });
}
export function schedulesReassignStockin(data, methods) {
  // 调度管理待处理面板列表待入库 重新分配/保存
  return request({
    module: "erp",
    url: "/storage/schedules/reassign/stockin",
    method: methods,
    data
  });
}
export function schedulesReassignStockreceiving(data, methods) {
  // 调度管理待处理面板列表待验收 重新分配/保存
  return request({
    module: "erp",
    url: "/storage/schedules/reassign/stockreceiving",
    method: methods,
    data
  });
}
export function scheduleStockoutList(data) {
  // 调度管理出库搜索列表
  return request({
    module: "erp",
    url: "/storage/schedules/reassign/stockout",
    method: "post",
    data
  });
}
export function scheduleStockinList(data) {
  // 调度管理入库搜索列表
  return request({
    module: "erp",
    url: "/storage/schedules/reassign/stockreceiving",
    method: "post",
    data
  });
}
export function scheduleStockoutDetail(data, id) {
  // 调度管理出库明细
  return request({
    module: "erp",
    url: "/storage/schedules/stockout/" + id + "/details",
    method: "post",
    data
  });
}
export function scheduleStockoutDetails(data) {
  // 调度管理出库明细缺货分配列表
  return request({
    module: "erp",
    url: "/storage/schedules/stockout/subs",
    method: "post",
    data
  });
}
export function scheduleStockoutDetailsUpdate(data) {
  // 调度管理出库明细缺货分配列表修改更新
  return request({
    module: "erp",
    url: "/storage/schedules/stockout/sub",
    method: "put",
    data
  });
}
export function scheduleStockoutDetailsCompelete(params) {
  // 调度管理出库明细 缺货处理完成
  return request({
    module: "erp",
    url: "/storage/schedules/stockout/" + params,
    method: "put"
  });
}
export function scheduleStockreceivingDetail(data, id) {
  // 调度管理入库明细
  return request({
    module: "erp",
    url: "/storage/schedules/stockreceiving/" + id + "/details",
    method: "post",
    data
  });
}
export function scheduleStockreceivingDetails(data) {
  // 调度管理入库明细无货位分配列表
  return request({
    module: "erp",
    url: "/storage/schedules/stockreceiving/subs",
    method: "post",
    data
  });
}
export function scheduleStockreceivingDetailsUpdate(data) {
  // 调度管理入库明细无货位分配列表更新保存
  return request({
    module: "erp",
    url: "/storage/schedules/stockreceiving/sub",
    method: "put",
    data
  });
}
export function scheduleStockreceivingCompelete(params) {
  // 调度管理入库明细处理完成
  return request({
    module: "erp",
    url: "/storage/schedules/stockreceiving/" + params,
    method: "put"
  });
}
export function schedulePopoverGroups(params) {
  // 调度管理组名称
  return request({
    module: "erp",
    url: "/storage/schedules/groups",
    method: "get",
    params
  });
}
export function schedulePopoverMembers(params) {
  // 调度管理人员分配
  return request({
    module: "erp",
    url: "/storage/schedules/members",
    method: "get",
    params
  });
}

export function scheduleAreas(params) {
  // 调度管理人员分配区域列表
  return request({
    module: "erp",
    url: "/settings/areas/regions",
    method: "get",
    params
  });
}

export function scheduleNotify(params) {
  // 调度管理出、入库数量
  return request({
    module: "erp",
    url: "/storage/schedules/notify",
    method: "get",
    params
  });
}
