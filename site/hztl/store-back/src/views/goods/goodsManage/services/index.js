import request, { SERVICE_MODULE_MAP } from "@/utils/request";

export class GoodsManageApi {

  /**
   * @param 获取商品信息列表
   * @param {page}  
   * @param {pageSize}  
   * @param {type}  0:零配件;1:服务项目;2:项目套餐(int)
   * @param {partType}  配件类别
   * @param {productionPlace}  产地
   * @param {vehBrand}  汽车品牌 精确匹配
   * @param {image}  图片上传情况 1.已上传 2.未上传 0.全部(string)
   * @param {onShelf}  是否上架  1,已上架 2.未上架 0.查询全部(my-skus 不用该字段过滤)(string)
   * @param {keyword}  配件名称/编码/规格/车型/生产码等关键字
   */
  getGoodsTableList(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: "/goods",
      method: "get",
      params
    });
  }

  //获取商品详情 
  getGoodsDetail(obj) {
    let params = {type:obj.type};
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: `/goods/${obj.id}`,
      method: "get",
      params
    });
  }

  //获取服务项目/项目套餐 分类信息列表
  getGoodsCategory(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: `/goods/list/category`,
      method: "get",
      params
    });
  }

  //依据ID获取商品分享地址
  getGoodsShare(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: `/goods/share`,
      method: "get",
      params
    });
  }

  //依据类型，上传商品图片 
  uploadImages(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: `/goods/update/upload-images`,
      method: "post",
      data: params
    });
  }

  //上传图片 
  uploadFileImg(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.accounts,
      url: `/img/upToken`,
      method: "get",
      data: params
    });
  }

  //获取汽车品牌
  getBrands(params){
    return request({
      baseURL: SERVICE_MODULE_MAP.basic,
      url: `/brands?type=1,2,3`,
      method: "get",
      params

    });
  }
  
  //配件清洗
  partsClean(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: `/company-parts/clean?brand=${params.brand}`,
      method: "post",
      data: params.obj
    });
  }
}
