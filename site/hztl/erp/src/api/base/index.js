import request from "@/utils/request";

export * from "./search";
export * from "./base";

export function getPrintAuth(md5) {
  return request({
    module: "erp",
    url: "/basic/print-auth",
    method: "get",
    params: {
      md5: md5
    }
  });
}
