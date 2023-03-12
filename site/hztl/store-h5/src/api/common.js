import request, { URL_MODULE } from "@/request";

export function getDomainParse() {
  return request({
    url: "/domain/parse",
    params: {
      domain:
        process.env.NODE_ENV === "development"
          ? "https://store.qa.hztl3.com/3065"
          : location.hostname
    }
  });
}

export function getBase() {
  return request({
    url: "/base"
  });
}

export function getStoreInfo() {
  return request({
    url: "/open/stores/info"
  });
}

export function getForMall() {
  return request({
    url: "/for-mall"
  });
}

export function getOpenCompanies() {
  return request({
    url: "/open/companies"
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
    url: "/upload",
    headers: { "Content-Type": "multipart/form-data" },
    data: form
  });
}

// 校验库存
export function cartsVerifyInventory(params) {
  return request({
    url: "/carts/app?order=true",
    method: "post",
    baseURL: URL_MODULE.united,
    data: params
  });
}
