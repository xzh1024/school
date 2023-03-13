import request from "@/utils/request";
/*
 * @Author: Yong
 * @Date: 2021-09-23 16:22:42
 * @LastEditors: Yong
 * @LastEditTime: 2021-11-11 13:38:36
 * @Description: 企鹅汽配接口
 */
interface GetUserListRequest {
  staffName: string; // 员工姓名
  staffNumber: string; // 员工编号
  status: "bind" | "unbind" | ""; // 绑定状态 bind: 绑定 unbind: 没有绑定 : 查找全部
  departmentName: string; // 所属本门名称
  page: number; // 页数
  pageSize: number; // 每页数量
}
interface GetUserListResult {
  Rows: {
    StaffId: number; //员工id
    staffName: string; // 员工姓名
    staffNumber: string; // 员工编号
    joinedAt: string; // 入职时间
    phone: string; // 联系电话
    departmentName: string; // 所属本门名称
    status: "bind" | "unbind" | ""; // 绑定状态
  }[];
  totalSize: number;
  totalPage: number;
}
interface GetUserCodesRequest {
  platformKey: string; //平台KEY
  staffIds: number[]; //员工Id
}
interface GetUserCodesResult {
  // 返回的数据
  rows: [
    {
      licenseCode: string; // 当前生效授权码
      staffId: number; // 员工ID
      staffName: string; // 员工名称
    }
  ];
}
interface DelUserBindRequest {
  staffIds: number[]; // 员工Id
  platformKey: "qeqp";
}
interface DelUserBindResult {
  code: string; //ok表示成功，其他表示错误代码
  message: string;
}
interface GetCoopsListRequest {
  keyword: string; // 往来单位、联系人、联系电话关键字
  platformCooperatorName: string; // 平台用户名
  status: string; // 绑定状态 bind-已绑定 unbind-未绑定 空查询全部
  fromDate: string; // 绑定开始时间
  toDate: string; // 绑定开始时间
  page: number; // 第几页 默认第一页
  pageSize: number;
}
interface GetCoopsListRresult {
  rows: {
    cooperatorId: string; //客户id
    platformCooperatorId: string; // 平台客户id
    platformCooperatorName: string; // 平台客户名称
    status: string; // 绑定状态 bind-已绑定 unbind-未绑定
    cooperatorName: string; // 绑定往来单位名称
    number: string; //erp往来单位编码
    contactsName: string; // 主联系人名称
    contactsPhone: string; // 联系人电话
    updatedBy: number; // 绑定人id
    updatedByName: string; // 绑定人名称
    updatedAt: string; // 绑定时间
  }[];
  totalSize: number;
  totalPage: number;
}
interface UpdateParamsSettingRequest {
  module: "platform"; //平台
  type: "quotation"; //自动报价
  value: {
    warehouseIds?: number[]; //支持报价的库存仓库 空为全部仓库
    priceType: string; //新客户默认享受的价格类型
    auto: boolean; //是否启动自动报价
    noStockAuto: boolean; //库存为0的配件是否允许自动报价
    noPriceAuto: boolean; //价格为0的配件是否允许自动报价
    newCustomerAuto: boolean; //新客户是否允许自动报价
  };
  platformKey: "qeqp"; //平台key
}
interface UnBindRequest {
  platformCooperatorId: string[]; // 客户Id
}
interface ChangeBindRequest {
  platformCooperatorIds: string[]; // 客户Id
  localCooperatorId: number;
}
interface PartMapingRequest {
  billId: number; // 平台客户id
  cooperatorId: number; // 本地客户id 不传往来单位id 表示不绑定本地往来单位
  billType: number; //单据类型：0-订货计划，1-客户订单 2-报价篮
  rows: {
    [quotationBasketId: string]: {
      // 报价篮id
      partId: number; // 配件Id
    };
  };
}
interface GetParamsSettingResult {
  value: {
    auto: boolean;
    newCustomerAuto: boolean;
    noPriceAuto: boolean;
    noStockAuto: boolean;
    priceType: string;
    warehouseIds?: number[];
  };
}
abstract class QQType {
  abstract getUserList: (
    params: GetUserListRequest
  ) => Promise<GetUserListResult>;
  abstract getUserCodes: (
    data: GetUserCodesRequest
  ) => Promise<GetUserCodesResult>;
  abstract delUserBind: (
    data: DelUserBindRequest
  ) => Promise<DelUserBindResult>;
}
class QQ implements QQType {
  /**
   * @description: 获取所有用户列表
   * @param {GetUserListRequest} params
   */
  getUserList(params: GetUserListRequest): Promise<GetUserListResult> {
    return request({
      module: "erp",
      url: "/platforms/apis/qeqp/staffs/list",
      method: "get",
      params
    });
  }
  /**
   * @description: 根据ids获取授权码
   * @param {GetUserCodesRequest} data
   */
  getUserCodes(data: GetUserCodesRequest): Promise<GetUserCodesResult> {
    return request({
      module: "erp",
      url: "/platforms/apis/qeqp/staffs/license",
      method: "post",
      data
    });
  }
  /**
   * @description: 根据ids解除用户绑定
   * @param {DelUserBindRequest} data
   */
  delUserBind(data: DelUserBindRequest): Promise<DelUserBindResult> {
    return request({
      module: "erp",
      url: "/platforms/apis/qeqp/staffs/unbind",
      method: "post",
      data,
      useOriginData: true
    });
  }
  /**
   * @description: 获取往来单位列表
   * @param {GetCoopsListRequest} params
   * @return {Promise GetCoopsListRresult}
   */
  getCoopsList(params: GetCoopsListRequest): Promise<GetCoopsListRresult> {
    return request({
      module: "erp",
      url: "/platforms/apis/qeqp/customers/list",
      method: "get",
      params
    });
  }
  /**
   * @description: 新增、更新系统参数
   * @param {UpdateParamsSettingRequest} data
   */
  updateParamsSetting(data: UpdateParamsSettingRequest["value"]): Promise<any> {
    return request({
      module: "erp",
      url: "/settings/params/by-company",
      method: "post",
      data: {
        module: "platform", //平台
        type: "quotation", //自动报价
        value: data,
        platformKey: "qeqp" //平台key
      }
    });
  }
  /**
   * @description: 获取自动报价配置参数
   */
  getParamsSetting(): Promise<GetParamsSettingResult> {
    return request({
      module: "erp",
      url: "/settings/params/detail/by-company",
      method: "get",
      params: {
        module: "platform", //平台
        type: "quotation", //自动报价
        platformKey: "qeqp" //平台key
      }
    });
  }
  /**
   * @description: 客户关系 单个/批量解绑
   * @param {UnBindRequest} data
   */
  delBind(data: UnBindRequest): Promise<any> {
    return request({
      module: "erp",
      url: "/platforms/apis/qeqp/customers/unbind",
      method: "post",
      data
    });
  }
  /**
   * @description:客户关系 单个/批量 绑定
   * @param {ChangeBindRequest} data
   */
  bindCoop(data: ChangeBindRequest): Promise<any> {
    return request({
      module: "erp",
      url: "/platforms/apis/qeqp/customers/bind",
      method: "post",
      data
    });
  }
  /**
   * @description:客户关系 单个/批量换绑
   * @param {ChangeBindRequest} data
   */
  changeBind(data: ChangeBindRequest): Promise<any> {
    return request({
      module: "erp",
      url: "/platforms/apis/qeqp/customers/change",
      method: "post",
      data
    });
  }
  /**
   * @description: 获取有权限的仓库
   * @param {object} params
   */
  getWarehouses(params: {
    businessCompanyId?: string;
  }): Promise<{ id: number; name: string }[]> {
    return request({
      url: "/storehouses/assignments/tree",
      method: "get",
      params
    });
  }
  /**
   * @description: 配件映射
   * @param {PartMapingRequest} data
   */
  partMapping(data: PartMapingRequest): Promise<any> {
    return request({
      module: "erp",
      url: "/platforms/mapping/mapping",
      method: "post",
      data
    });
  }
}
export {
  GetUserListRequest,
  GetUserListResult,
  GetCoopsListRequest,
  GetCoopsListRresult,
  UpdateParamsSettingRequest
};
export default new QQ();
