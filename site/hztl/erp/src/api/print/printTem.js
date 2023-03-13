import request from "@/utils/request";

export function loadPrintTems(params) {
  return request({
    module: "erp",
    url: "/basic/print_templates",
    params
  });
}

export function createPrintTem(data) {
  return request({
    module: "erp",
    url: "/basic/print_templates",
    method: "post",
    data
  });
}

export function updatePrintTem(data) {
  return request({
    module: "erp",
    url: "/basic/print_templates",
    method: "put",
    data
  });
}

export function deletePrintTem(id) {
  return request({
    module: "erp",
    url: `/basic/print_templates/${id}`,
    method: "delete"
  });
}

export function setDefaultPrintTem(id, type) {
  return request({
    module: "erp",
    url: `/basic/print_templates/${id}/set_default`,
    method: "put",
    params: {
      type
    }
  });
}
