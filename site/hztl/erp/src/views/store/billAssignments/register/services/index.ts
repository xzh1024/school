import request from "@/utils/request";
import {
  ResponseModel,
  SearchFormModule,
  WarehouseData,
  WarehouseBillItem,
  RegisterRequest,
  RegisterResponse,
  RegisterModel,
  PersonModel,
  WarehousesUsersModle,
  SelectSearchModel
} from "../interface";

export class RegisterService {
  getBillList(
    params: SearchFormModule
  ): Promise<WarehouseData<WarehouseBillItem>> {
    return request({
      url: "/storage/bill_assignments/list",
      method: "post",
      data: params
    });
  }

  getRegisterInfo(params: RegisterRequest): Promise<RegisterResponse> {
    return request({
      url: "/storage/bill_assignments/register_info",
      method: "post",
      data: params
    });
  }

  // 获取有指定仓库权限的员工
  getWarehousesUsers(params: WarehousesUsersModle): Promise<PersonModel[]> {
    return request({
      url: "/storehouses/managers/warehouses/staffs",
      method: "get",
      params: params
    });
  }
  // 仓储公司列表
  getStorageCompany(params?: SelectSearchModel): Promise<PersonModel[]> {
    return request({
      url: "/storehouses/managers/storage-company",
      method: "get",
      params: params
    });
  }
  // 有权限的仓库列表
  getWarehouses(params?: SelectSearchModel): Promise<PersonModel[]> {
    return request({
      url: "/storehouses/managers/warehouses",
      method: "get",
      params: params
    });
  }

  // 出入库登记
  storageRegister(params: RegisterModel): Promise<ResponseModel> {
    return request({
      url: "/storage/bill_assignments/register",
      method: "post",
      data: params
    });
  }

  // 出入库审核确认
  storageAudit(params: RegisterModel): Promise<ResponseModel> {
    return request({
      url: "/storage/bill_assignments/audit",
      method: "post",
      data: params
    });
  }
}
