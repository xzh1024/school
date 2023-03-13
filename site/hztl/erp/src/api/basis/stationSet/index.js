import request from "@/utils/request";

// 基础-工位设置-工位列表
export async function getStationList(params) {
  return await request({
    module: "erp",
    url: "/repairs/station/list",
    method: "get",
    params
  });
}

// 基础-工位设置-添加工位
export async function addStation(data) {
  return await request({
    module: "erp",
    url: "/repairs/station/create",
    method: "post",
    data
  });
}

// 基础-工位设置-删除工位
export async function delStation(params) {
  return await request({
    module: "erp",
    url: "/repairs/station/delete",
    method: "delete",
    params
  });
}
