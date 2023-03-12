import request, { SERVICE_MODULE_MAP } from "@/utils/request";

export class StoreManageService {
  // 获取公司店铺状态
  getStoreStatus() {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: "/companies/store-status"
    });
  }

  getBase() {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: "/base"
    });
  }

  // 店铺模板列表
  getTemplateList() {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: "/stores/template-list"
    });
  }

  // 店铺组件列表
  getModuleList() {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: "/stores/module-list"
    });
  }

  // 开通并初始化店铺数据
  chooseTemplate(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: "/stores",
      method: "post",
      data: params
    });
  }

  // 店铺指引状态
  getStoreGuideState() {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: "/stores/got-guide"
    });
  }
  // 已了解店铺指引
  updateStoreGuideState() {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: "/stores/got-guide",
      method: "post"
    });
  }

  getStoreDetail() {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: "/stores/detail",
      method: "get"
    });
  }
  // 保存并发布店铺信息
  updateStore(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: "/stores/upsert",
      method: "post",
      data: params
    });
  }

  getDomain(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: "/domain",
      method: "get",
      params
    });
  }

  // 商品列表
  getGoods(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: "/goods",
      method: "post",
      data: params
    });
  }
  // 商品详情
  getGoodsInfo(id) {
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: "/goods/" + id,
      method: "get",
      params: {
        type: 0
      }
    });
  }

  // 内部页面
  getInternalPages(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: "/companies/pages/internal-pages",
      params
    });
  }

  //分享页详情信息
  getShareInfo() {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: "/stores/detail/share"
    });
  }
}
