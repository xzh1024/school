import request, { SERVICE_MODULE_MAP } from "@/utils/request";

export function getUploadToken() {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/img/upToken"
  });
}

export function tokenLogin(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/token-login",
    method: "post",
    data: params
  });
}

export function getBase() {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/base"
  });
}

export function getCompanies() {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/open/companies"
  });
}

//分享页详情信息
export function getShareInfo() {
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/stores/detail/share"
  });
}

export function uploadImgFile(params) {
  // params = {
  //   type: "", // 文件关联对象类型。 parts: 配件，companies：公司。
  //   file: []  // file || files
  // };
  const form = new FormData();
  if (params.type) {
    form.append("objectType", params.type);
  }
  if (Array.isArray(params.file)) {
    params.file.forEach(file => {
      form.append("file", file, file.name);
    });
  } else {
    form.append("file", params.file, params.file.name);
  }
  return request({
    method: "post",
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/upload",
    headers: { "Content-Type": "multipart/form-data" },
    data: form
  });
}
