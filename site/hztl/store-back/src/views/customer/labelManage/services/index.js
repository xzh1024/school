import request, { SERVICE_MODULE_MAP } from "@/utils/request";


export class LabelManageApi {

  //获取标签列表 
  getLabelsInfo(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/companies/labels`,
      method: "get",
      params
    });
  }


  //删除标签list 
  deleteLabels(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/companies/labels`,
      method: "delete",
      data: params
    });
  }

  //新增 标签list 
  insertLabels(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/companies/labels`,
      method: "post",
      data: params
    });
  }

  //编辑修改标签list
  updateLabels(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/companies/labels/${params.id}`,
      method: "post",
      data: params
    });
  }
}
