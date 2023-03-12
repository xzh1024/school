import request from "@/utils/request";

export function initAddressTable(params) {
  return request({
    url: "/addresses",
    method: "get",
    params
  });
}
export function setDefaultAddress(id) {
  return request({
    url: "/addresses/" + id + "/set-default",
    method: "post"
  });
}
export function createAddress(data) {
  return request({
    url: "/addresses",
    method: "post",
    data
  });
}
export function updateAddress(data, id) {
  return request({
    url: "/addresses/" + id,
    method: "post",
    data
  });
}
export function deleteAddress(id) {
  return request({
    module: "erp",
    url: "/addresses/" + id,
    method: "delete"
  });
}
