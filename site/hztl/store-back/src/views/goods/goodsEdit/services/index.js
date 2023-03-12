import request, { SERVICE_MODULE_MAP } from "@/utils/request";


export class GoodsEditApi {

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

  //依据主键ID更新商品信息 
  update(params) {
    return request({
      baseURL: SERVICE_MODULE_MAP.united,
      url: `/goods/update/${params.id}`,
      method: "post",
      data: params
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
}
