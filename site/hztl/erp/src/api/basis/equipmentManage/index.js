import request from "@/utils/request";

// 基础-外部设备管理-设备列表
export async function devicesList(params) {
  return await request({
    module: "erp",
    url: "/repairs/devices/list",
    method: "get",
    params
  });
}

// 基础-外部设备管理-添加设备
export async function devicesAdd(data) {
  return await request({
    module: "erp",
    url: "/repairs/devices/create",
    method: "post",
    data
  });
}

// 基础-外部设备管理-解绑设备
export async function devicesDel(params) {
  return await request({
    module: "erp",
    url: "/repairs/devices/delete",
    method: "delete",
    params
  });
}
