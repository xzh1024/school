import request, { SERVICE_MODULE_MAP } from "@/utils/request";

export function queryNotifications(params) {
  return request({
    method: "post",
    baseURL: SERVICE_MODULE_MAP.im,
    url: "/notifications",
    data: params
  });
}

export function getNotices(params) {
  // const params = {
  //   page: 1,
  //   pageSize: 10,
  //   status: 0
  // }
  return request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/notices",
    params
  });
}

export function updateNotices(params) {
  return request({
    method: "post",
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/notices/update",
    data: params
  });
}

export function getContacts(params) {
  return request({
    baseURL: SERVICE_MODULE_MAP.chats,
    url: "/contacts",
    params
  });
}

export function getMessages(params) {
  // const params = {
  //   contact: 0,
  //   offset: 0
  // }
  return request({
    baseURL: SERVICE_MODULE_MAP.chats,
    url: "/messages",
    params
  });
}