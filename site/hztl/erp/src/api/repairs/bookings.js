import request from "@/utils/request";

/* 获取预约设置信息 */
export async function getBookingsSettings(params) {
  return request({
    module: "erp",
    url: "/settings/params/detail/by-company",
    method: "get",
    params
  });
}

/* 更新预约设置信息 */
export async function updateBookingsSettings(data) {
  return request({
    module: "erp",
    url: "/settings/params/by-company",
    method: "post",
    data
  });
}

/* 获取预约设置信息 */
export async function getBookingsCalendar() {
  return request({
    module: "erp",
    url: "/repairs/bookings/kanban",
    method: "get"
  });
}

/* 预约列表 */
export async function bookingsList(params) {
  return request({
    module: "erp",
    url: "/repairs/bookings/list",
    method: "get",
    params
  });
}

/* 新增预约 */
export async function bookingsCreate(data) {
  return request({
    module: "erp",
    url: "/repairs/bookings/create",
    method: "post",
    data
  });
}

/* 更新预约 */
export async function bookingsUpdate(data) {
  return request({
    module: "erp",
    url: "/repairs/bookings/update",
    method: "post",
    data
  });
}

/* 取消预约 */
export async function bookingsCancel(params) {
  return request({
    module: "erp",
    url: "/repairs/bookings/cancel",
    method: "patch",
    data: params
  });
}

/* 转接待 */
export async function transReception(data) {
  return request({
    module: "erp",
    url: "/repairs/bookings/trans-reception",
    method: "post",
    data
  });
}
