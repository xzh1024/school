import request, { SERVICE_MODULE_MAP } from "@/utils/request";


export class StockGroupApi {

  //获取库存信息 
  getStockInfo(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/companies/warehouse-groups`,
      method: "get",
      params
    });
  }

   //获取仓库list 
   getWarehouse(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/companies/warehouse-groups/warehouses`,
      method: "get",
      params
    });
  }

  //删除仓库list 
  deleteWarehouse(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/companies/warehouse-groups`,
      method: "delete",
      data: params
    });
  }

  //新增 仓库list 
  insertWarehouse(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/companies/warehouse-groups`,
      method: "post",
      data: params
    });
  }

  //编辑修改仓库list
  updateWarehouse(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/companies/warehouse-groups/${params.id}`,
      method: "post",
      data: params
    });
  }
}
