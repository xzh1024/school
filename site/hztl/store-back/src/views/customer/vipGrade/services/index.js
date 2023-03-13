import request, { SERVICE_MODULE_MAP } from "@/utils/request";


export class MemberGradeApi {

  //获取会员等级列表 
  getMemberGradeList(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/members-grades`,
      method: "get",
      params
    });
  }

  //会员背景色 
  getMemberColorList(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/members/colors`,
      method: "get",
      params
    });
  }

  //会员等级id和名称列表 
  getMemberGradeIdNameList(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/members-grades/id-and-name`,
      method: "get",
      params
    });
  }

  //新增/修改会员等级 
  updateMemberGrade(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/members-grades`,
      method: "post",
      data: params
    });
  }

  //根据会员等级ID修改状态 
  updateMemberGradeStatus(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/members-grades/status/${params.id}`,
      method: "post",
      data: params.obj
    });
  }

  //配置等级更新模式 
  setMemberGradeUpgrade(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/members-grades/auto-upgrade`,
      method: "post",
      data: params
    });
  }

  //获取配置等级更新模式 
  getMemberGradeAutoUpgrade(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/members-grades/auto-upgrade`,
      method: "get",
      params
    });
  }

  //等级更新模式为自动升级后数客户据导出 
  exportGradeUpgrade(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/members-grades/auto-upgrade/export`,
      method: "post",
      data: params,
      contentType: "application/json; charset=utf-8",
      responseType: "blob"
    });
  }

}
