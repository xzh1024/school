import request from "@/utils/request";
import { HasWhscModel, BindWhscModel, BindWhscParams } from "./interfaces";

export default class RepairService {
  // 是否开通尾货市场及登录URL
  getWhsc(): Promise<HasWhscModel> {
    return request({
      url: "/platforms/auth/has-whsc"
    });
  }

  // 绑定尾货市场
  bindWhsc(params: BindWhscParams): Promise<BindWhscModel> {
    return request({
      url: "/platforms/auth/bind-whsc",
      method: "post",
      data: params
    });
  }

  // getRegisterInfo(params: RegisterRequest): Promise<RegisterResponse> {
  //   return request({
  //     url: "/storage/bill_assignments/register_info",
  //     method: "post",
  //     data: params
  //   });
  // }

  // // 获取有指定仓库权限的员工
  // getWarehousesUsers(params: WarehousesUsersModle): Promise<PersonModel[]> {
  //   return request({
  //     url: "/storehouses/managers/warehouses/staffs",
  //     method: "get",
  //     params: params
  //   });
  // }
}
