import request from "@/utils/request";

export async function notifications(params) {
  return await request({
    module: "erp",
    url: "/pull",
    method: "get",
    params,
    ignoreErr: true,
    readonly: true
  });
}

export async function getUnreadMsgsCount() {
  return await request({
    // 平台平台im数量
    module: "erp",
    url: "/feedbacks/unread-msgs-count",
    method: "get",
    readonly: true
  });
}
