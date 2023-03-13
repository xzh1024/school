import request from "@/utils/request";

/* 工单履历 */
export async function resumesBills(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/resumes/bills",
    method: "get",
    params
  });
}

/* 项目履历 */
export async function resumesItems(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/resumes/items",
    method: "get",
    params
  });
}

/* 配件履历 */
export async function resumesParts(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/resumes/parts",
    method: "get",
    params
  });
}

/* 建议履历 */
export async function resumesSuggestions(params) {
  return request({
    module: "erp",
    url: "/repairs/bills/resumes/suggestions",
    method: "get",
    params
  });
}
