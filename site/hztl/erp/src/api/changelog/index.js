import request from "@/utils/request";

export function reqVersionLog(id) {
  return request({
    module: "erp",
    url: "/system/version-log/" + id,
    method: "get",
    readonly: true
  });
}
