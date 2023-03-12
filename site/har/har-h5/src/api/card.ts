/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
// prettier-ignore
import { Method, RequestBodyType, ResponseBodyType, RequestConfig, RequestFunctionRestArgs, FileData, prepare } from 'yapi-to-typescript'
// @ts-ignore
import request from "./request";

type UserRequestRestArgs = RequestFunctionRestArgs<typeof request>;

// Request: 目前 React Hooks 功能有用到
export type Request<
  TRequestData,
  TRequestConfig extends RequestConfig,
  TRequestResult
> = (TRequestConfig["requestDataOptional"] extends true
  ? (
      requestData?: TRequestData,
      ...args: RequestFunctionRestArgs<typeof request>
    ) => TRequestResult
  : (
      requestData: TRequestData,
      ...args: RequestFunctionRestArgs<typeof request>
    ) => TRequestResult) & {
  requestConfig: TRequestConfig;
};

const mockUrl_0_1_0_0 = "https://yapi.huianrong.com/mock/1746" as any;
const devUrl_0_1_0_0 = "http://192.168.3.151" as any;
const prodUrl_0_1_0_0 = "https://cbd.t-cube.cn" as any;
const dataKey_0_1_0_0 = "data" as any;

/**
 * 接口 [项目选择↗](https://yapi.huianrong.com/project/1746/interface/api/69282) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22161)
 * @请求头 `GET /svc-applet/common/select-project`
 * @更新时间 `2022-12-01 10:31:45`
 */
export interface SvcAppletCommonSelectProjectGetRequest {}

/**
 * 接口 [项目选择↗](https://yapi.huianrong.com/project/1746/interface/api/69282) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22161)
 * @请求头 `GET /svc-applet/common/select-project`
 * @更新时间 `2022-12-01 10:31:45`
 */
export type SvcAppletCommonSelectProjectGetResponse = {
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 项目名称
   */
  projectName: string;
  /**
   * 详细地址
   */
  fullAddress: string;
}[];

/**
 * 接口 [项目选择↗](https://yapi.huianrong.com/project/1746/interface/api/69282) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22161)
 * @请求头 `GET /svc-applet/common/select-project`
 * @更新时间 `2022-12-01 10:31:45`
 */
type SvcAppletCommonSelectProjectGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/common/select-project",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [项目选择↗](https://yapi.huianrong.com/project/1746/interface/api/69282) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22161)
 * @请求头 `GET /svc-applet/common/select-project`
 * @更新时间 `2022-12-01 10:31:45`
 */
const svcAppletCommonSelectProjectGetRequestConfig: SvcAppletCommonSelectProjectGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_0,
    devUrl: devUrl_0_1_0_0,
    prodUrl: prodUrl_0_1_0_0,
    path: "/svc-applet/common/select-project",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletCommonSelectProjectGet",
    extraInfo: {}
  };

/**
 * 接口 [项目选择↗](https://yapi.huianrong.com/project/1746/interface/api/69282) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22161)
 * @请求头 `GET /svc-applet/common/select-project`
 * @更新时间 `2022-12-01 10:31:45`
 */
export const svcAppletCommonSelectProjectGet = /*#__PURE__*/ (
  requestData?: SvcAppletCommonSelectProjectGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletCommonSelectProjectGetResponse>(
    prepare(svcAppletCommonSelectProjectGetRequestConfig, requestData),
    ...args
  );
};

svcAppletCommonSelectProjectGet.requestConfig =
  svcAppletCommonSelectProjectGetRequestConfig;

const mockUrl_0_1_0_1 = "https://yapi.huianrong.com/mock/1746" as any;
const devUrl_0_1_0_1 = "http://192.168.3.151" as any;
const prodUrl_0_1_0_1 = "https://cbd.t-cube.cn" as any;
const dataKey_0_1_0_1 = "data" as any;

/**
 * 接口 [我的储值卡列表↗](https://yapi.huianrong.com/project/1746/interface/api/69252) 的 **请求类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/page`
 * @更新时间 `2022-12-11 12:18:18`
 */
export interface SvcAppletMemberCardPageGetRequest {
  /**
   * 状态1:正常;2:冻结;3:退卡;
   */
  status: string;
  pageNum: string;
  pageSize: string;
}

/**
 * 接口 [我的储值卡列表↗](https://yapi.huianrong.com/project/1746/interface/api/69252) 的 **返回类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/page`
 * @更新时间 `2022-12-11 12:18:18`
 */
export interface SvcAppletMemberCardPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 储值卡编号
     */
    memberCardCode: string;
    /**
     * 电子卡编号
     */
    cardCode: string;
    /**
     * 储值卡名称
     */
    cardName: string;
    /**
     * 当前余额
     */
    balance: number;
    /**
     * 状态1:正常;2:冻结;3:退卡;
     */
    status: number;
    /**
     * 商场logourl
     */
    marketLogoUrl: string;
    /**
     * 电子卡卡背景url
     */
    cardBackgroundUrl: string;
  }[];
}

/**
 * 接口 [我的储值卡列表↗](https://yapi.huianrong.com/project/1746/interface/api/69252) 的 **请求配置的类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/page`
 * @更新时间 `2022-12-11 12:18:18`
 */
type SvcAppletMemberCardPageGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/member/card/page",
    "data",
    string,
    "status" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [我的储值卡列表↗](https://yapi.huianrong.com/project/1746/interface/api/69252) 的 **请求配置**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/page`
 * @更新时间 `2022-12-11 12:18:18`
 */
const svcAppletMemberCardPageGetRequestConfig: SvcAppletMemberCardPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: "/svc-applet/member/card/page",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_1,
    paramNames: [],
    queryNames: ["status", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletMemberCardPageGet",
    extraInfo: {}
  };

/**
 * 接口 [我的储值卡列表↗](https://yapi.huianrong.com/project/1746/interface/api/69252) 的 **请求函数**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/page`
 * @更新时间 `2022-12-11 12:18:18`
 */
export const svcAppletMemberCardPageGet = /*#__PURE__*/ (
  requestData: SvcAppletMemberCardPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletMemberCardPageGetResponse>(
    prepare(svcAppletMemberCardPageGetRequestConfig, requestData),
    ...args
  );
};

svcAppletMemberCardPageGet.requestConfig =
  svcAppletMemberCardPageGetRequestConfig;

/**
 * 接口 [获取储值卡详情↗](https://yapi.huianrong.com/project/1746/interface/api/69254) 的 **请求类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/info`
 * @更新时间 `2022-12-11 12:18:19`
 */
export interface SvcAppletMemberCardInfoGetRequest {
  /**
   * 储值卡编号(String)
   */
  memberCardCode: string;
}

/**
 * 接口 [获取储值卡详情↗](https://yapi.huianrong.com/project/1746/interface/api/69254) 的 **返回类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/info`
 * @更新时间 `2022-12-11 12:18:19`
 */
export interface SvcAppletMemberCardInfoGetResponse {
  /**
   * 总共充值
   */
  totalRecharge: number;
  /**
   * 总共消费
   */
  totalConsume: number;
  /**
   * 储值卡编号
   */
  memberCardCode: string;
  /**
   * 电子卡编号
   */
  cardCode: string;
  /**
   * 储值卡名称
   */
  cardName: string;
  /**
   * 当前余额
   */
  balance: number;
  /**
   * 状态1:正常;2:冻结;3:退卡;
   */
  status: number;
  /**
   * 商场logourl
   */
  marketLogoUrl: string;
  /**
   * 电子卡卡背景url
   */
  cardBackgroundUrl: string;
}

/**
 * 接口 [获取储值卡详情↗](https://yapi.huianrong.com/project/1746/interface/api/69254) 的 **请求配置的类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/info`
 * @更新时间 `2022-12-11 12:18:19`
 */
type SvcAppletMemberCardInfoGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/member/card/info",
    "data",
    string,
    "memberCardCode",
    false
  >
>;

/**
 * 接口 [获取储值卡详情↗](https://yapi.huianrong.com/project/1746/interface/api/69254) 的 **请求配置**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/info`
 * @更新时间 `2022-12-11 12:18:19`
 */
const svcAppletMemberCardInfoGetRequestConfig: SvcAppletMemberCardInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: "/svc-applet/member/card/info",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_1,
    paramNames: [],
    queryNames: ["memberCardCode"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletMemberCardInfoGet",
    extraInfo: {}
  };

/**
 * 接口 [获取储值卡详情↗](https://yapi.huianrong.com/project/1746/interface/api/69254) 的 **请求函数**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/info`
 * @更新时间 `2022-12-11 12:18:19`
 */
export const svcAppletMemberCardInfoGet = /*#__PURE__*/ (
  requestData: SvcAppletMemberCardInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletMemberCardInfoGetResponse>(
    prepare(svcAppletMemberCardInfoGetRequestConfig, requestData),
    ...args
  );
};

svcAppletMemberCardInfoGet.requestConfig =
  svcAppletMemberCardInfoGetRequestConfig;

/**
 * 接口 [储值卡交易明细↗](https://yapi.huianrong.com/project/1746/interface/api/69256) 的 **请求类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/cardTrade/page`
 * @更新时间 `2022-12-11 12:18:20`
 */
export interface SvcAppletMemberCardTradePageGetRequest {
  /**
   * 储值卡编号非必选
   */
  memberCardCode: string;
  /**
   * 日期筛选开始，格式yyyy-MM-dd非必选
   */
  startDate: string;
  /**
   * 日期筛选结束，格式yyyy-MM-dd非必选
   */
  endDate: string;
  /**
   * 类型（1、购卡2、充值3、消费4、退款5、退卡）非必选
   */
  type: string;
  pageNum: string;
  pageSize: string;
}

/**
 * 接口 [储值卡交易明细↗](https://yapi.huianrong.com/project/1746/interface/api/69256) 的 **返回类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/cardTrade/page`
 * @更新时间 `2022-12-11 12:18:20`
 */
export interface SvcAppletMemberCardTradePageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 流水号
     */
    tradeNo: string;
    /**
     * 储值卡编号
     */
    memberCardCode: string;
    /**
     * 余额
     */
    balance: number;
    /**
     * 花费金额
     */
    tradeAmount: number;
    /**
     * 类型（1、购卡2、充值3、消费4、退款5、退卡）
     */
    source: number;
    /**
     * 交易状态0失败1成功
     */
    tradeStatus: number;
    /**
     * 业务时间yyyy-MM-ddHH:mm:ss
     */
    tradeTime: string;
    /**
     * 类型1:满减；2：满赠；3：满折
     */
    type: number;
    /**
     * 是否命中优惠:1是；0：否;
     */
    discount: number;
    /**
     * 优惠金额没有命中优惠时0
     */
    discountAmount: number;
    /**
     * 命中活动名称没有命中优惠时为空
     */
    activityName?: string;
    /**
     * 命中优惠名称没有命中优惠时为空
     */
    activityDiscountName?: string;
  }[];
}

/**
 * 接口 [储值卡交易明细↗](https://yapi.huianrong.com/project/1746/interface/api/69256) 的 **请求配置的类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/cardTrade/page`
 * @更新时间 `2022-12-11 12:18:20`
 */
type SvcAppletMemberCardTradePageGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/member/cardTrade/page",
    "data",
    string,
    | "memberCardCode"
    | "startDate"
    | "endDate"
    | "type"
    | "pageNum"
    | "pageSize",
    false
  >
>;

/**
 * 接口 [储值卡交易明细↗](https://yapi.huianrong.com/project/1746/interface/api/69256) 的 **请求配置**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/cardTrade/page`
 * @更新时间 `2022-12-11 12:18:20`
 */
const svcAppletMemberCardTradePageGetRequestConfig: SvcAppletMemberCardTradePageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: "/svc-applet/member/cardTrade/page",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_1,
    paramNames: [],
    queryNames: [
      "memberCardCode",
      "startDate",
      "endDate",
      "type",
      "pageNum",
      "pageSize"
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletMemberCardTradePageGet",
    extraInfo: {}
  };

/**
 * 接口 [储值卡交易明细↗](https://yapi.huianrong.com/project/1746/interface/api/69256) 的 **请求函数**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/cardTrade/page`
 * @更新时间 `2022-12-11 12:18:20`
 */
export const svcAppletMemberCardTradePageGet = /*#__PURE__*/ (
  requestData: SvcAppletMemberCardTradePageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletMemberCardTradePageGetResponse>(
    prepare(svcAppletMemberCardTradePageGetRequestConfig, requestData),
    ...args
  );
};

svcAppletMemberCardTradePageGet.requestConfig =
  svcAppletMemberCardTradePageGetRequestConfig;

/**
 * 接口 [购卡↗](https://yapi.huianrong.com/project/1746/interface/api/69258) 的 **请求类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/buy`
 * @更新时间 `2022-12-11 12:18:20`
 */
export interface SvcAppletMemberCardBuyPostRequest {
  /**
   * 电子卡编号
   */
  cardCode: string;
  /**
   * 活动优惠编号非必选
   */
  activityDiscountCode?: string;
  /**
   * 实付金额
   */
  actAmount: number;
  /**
   * 应付金额
   */
  amount: number;
  /**
   * 消费活动优惠编号非必选
   */
  consumeActivityDiscountCode?: string;
}

/**
 * 接口 [购卡↗](https://yapi.huianrong.com/project/1746/interface/api/69258) 的 **返回类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/buy`
 * @更新时间 `2022-12-11 12:18:20`
 */
export interface SvcAppletMemberCardBuyPostResponse {
  /**
   * 储值卡编号
   */
  memberCardCode: string;
  /**
   * 支付系统业务流水号(查询支付结果使用)
   */
  serverRspNo: string;
  /**
   * 订单编号
   */
  orderNo: string;
  /**
   * 公众号id或小程序id(调起支付所需)
   */
  appid: string;
  /**
   * busiCode为1005时才返回（调起支付所需）
   */
  partnerid: string;
  /**
   * busiCode为1005时才返回（调起支付所需）
   */
  prepayid: string;
  /**
   * 时间戳，自1970年1月1日0点0分0秒以来的秒数(调起支付所需)
   */
  timestamp: string;
  /**
   * 随机字符串（调起支付所需）
   */
  noncestr: string;
  /**
   * 数据包（调起支付所需）
   */
  dataPackage: string;
  /**
   * 签名（调起支付所需）
   */
  paysign: string;
  /**
   * 签名算法
   */
  signType: string;
}

/**
 * 接口 [购卡↗](https://yapi.huianrong.com/project/1746/interface/api/69258) 的 **请求配置的类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/buy`
 * @更新时间 `2022-12-11 12:18:20`
 */
type SvcAppletMemberCardBuyPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/member/card/buy",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [购卡↗](https://yapi.huianrong.com/project/1746/interface/api/69258) 的 **请求配置**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/buy`
 * @更新时间 `2022-12-11 12:18:20`
 */
const svcAppletMemberCardBuyPostRequestConfig: SvcAppletMemberCardBuyPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: "/svc-applet/member/card/buy",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletMemberCardBuyPost",
    extraInfo: {}
  };

/**
 * 接口 [购卡↗](https://yapi.huianrong.com/project/1746/interface/api/69258) 的 **请求函数**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/buy`
 * @更新时间 `2022-12-11 12:18:20`
 */
export const svcAppletMemberCardBuyPost = /*#__PURE__*/ (
  requestData: SvcAppletMemberCardBuyPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletMemberCardBuyPostResponse>(
    prepare(svcAppletMemberCardBuyPostRequestConfig, requestData),
    ...args
  );
};

svcAppletMemberCardBuyPost.requestConfig =
  svcAppletMemberCardBuyPostRequestConfig;

/**
 * 接口 [充值↗](https://yapi.huianrong.com/project/1746/interface/api/69260) 的 **请求类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/recharge`
 * @更新时间 `2022-12-11 12:18:21`
 */
export interface SvcAppletMemberCardRechargePostRequest {
  /**
   * 储值卡编号
   */
  memberCardCode: string;
  /**
   * 活动优惠编号非必选
   */
  activityDiscountCode?: string;
  /**
   * 实付金额
   */
  actAmount: number;
  /**
   * 应付金额
   */
  amount: number;
  /**
   * 消费活动优惠编号非必选
   */
  consumeActivityDiscountCode?: string;
}

/**
 * 接口 [充值↗](https://yapi.huianrong.com/project/1746/interface/api/69260) 的 **返回类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/recharge`
 * @更新时间 `2022-12-11 12:18:21`
 */
export interface SvcAppletMemberCardRechargePostResponse {
  /**
   * 储值卡编号
   */
  memberCardCode: string;
  /**
   * 支付系统业务流水号(查询支付结果使用)
   */
  serverRspNo: string;
  /**
   * 订单编号
   */
  orderNo: string;
  /**
   * 公众号id或小程序id(调起支付所需)
   */
  appid: string;
  /**
   * busiCode为1005时才返回（调起支付所需）
   */
  partnerid: string;
  /**
   * busiCode为1005时才返回（调起支付所需）
   */
  prepayid: string;
  /**
   * 时间戳，自1970年1月1日0点0分0秒以来的秒数(调起支付所需)
   */
  timestamp: string;
  /**
   * 随机字符串（调起支付所需）
   */
  noncestr: string;
  /**
   * 数据包（调起支付所需）
   */
  dataPackage: string;
  /**
   * 签名（调起支付所需）
   */
  paysign: string;
  /**
   * 签名算法
   */
  signType: string;
}

/**
 * 接口 [充值↗](https://yapi.huianrong.com/project/1746/interface/api/69260) 的 **请求配置的类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/recharge`
 * @更新时间 `2022-12-11 12:18:21`
 */
type SvcAppletMemberCardRechargePostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/member/card/recharge",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [充值↗](https://yapi.huianrong.com/project/1746/interface/api/69260) 的 **请求配置**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/recharge`
 * @更新时间 `2022-12-11 12:18:21`
 */
const svcAppletMemberCardRechargePostRequestConfig: SvcAppletMemberCardRechargePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: "/svc-applet/member/card/recharge",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletMemberCardRechargePost",
    extraInfo: {}
  };

/**
 * 接口 [充值↗](https://yapi.huianrong.com/project/1746/interface/api/69260) 的 **请求函数**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/recharge`
 * @更新时间 `2022-12-11 12:18:21`
 */
export const svcAppletMemberCardRechargePost = /*#__PURE__*/ (
  requestData: SvcAppletMemberCardRechargePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletMemberCardRechargePostResponse>(
    prepare(svcAppletMemberCardRechargePostRequestConfig, requestData),
    ...args
  );
};

svcAppletMemberCardRechargePost.requestConfig =
  svcAppletMemberCardRechargePostRequestConfig;

/**
 * 接口 [会员信息↗](https://yapi.huianrong.com/project/1746/interface/api/69270) 的 **请求类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/info`
 * @更新时间 `2022-12-11 12:18:17`
 */
export interface SvcAppletMemberInfoGetRequest {}

/**
 * 接口 [会员信息↗](https://yapi.huianrong.com/project/1746/interface/api/69270) 的 **返回类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/info`
 * @更新时间 `2022-12-11 12:18:17`
 */
export interface SvcAppletMemberInfoGetResponse {
  /**
   * 会员编号
   */
  memberCode: string;
  /**
   * 昵称
   */
  nickName: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 总余额
   */
  totalBalance: number;
  /**
   * 总共充值
   */
  totalRecharge: number;
  /**
   * 总共消费
   */
  totalConsume: number;
}

/**
 * 接口 [会员信息↗](https://yapi.huianrong.com/project/1746/interface/api/69270) 的 **请求配置的类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/info`
 * @更新时间 `2022-12-11 12:18:17`
 */
type SvcAppletMemberInfoGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/member/info",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [会员信息↗](https://yapi.huianrong.com/project/1746/interface/api/69270) 的 **请求配置**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/info`
 * @更新时间 `2022-12-11 12:18:17`
 */
const svcAppletMemberInfoGetRequestConfig: SvcAppletMemberInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: "/svc-applet/member/info",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletMemberInfoGet",
    extraInfo: {}
  };

/**
 * 接口 [会员信息↗](https://yapi.huianrong.com/project/1746/interface/api/69270) 的 **请求函数**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/info`
 * @更新时间 `2022-12-11 12:18:17`
 */
export const svcAppletMemberInfoGet = /*#__PURE__*/ (
  requestData?: SvcAppletMemberInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletMemberInfoGetResponse>(
    prepare(svcAppletMemberInfoGetRequestConfig, requestData),
    ...args
  );
};

svcAppletMemberInfoGet.requestConfig = svcAppletMemberInfoGetRequestConfig;

/**
 * 接口 [付款码↗](https://yapi.huianrong.com/project/1746/interface/api/69272) 的 **请求类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/payment`
 * @更新时间 `2022-12-11 12:18:23`
 */
export interface SvcAppletMemberCardPaymentPostRequest {
  /**
   * 储值卡编号
   */
  memberCardCode: string;
  /**
   * 付款金额，非必须填写值后将提前校验余额非必选
   */
  amount?: number;
}

/**
 * 接口 [付款码↗](https://yapi.huianrong.com/project/1746/interface/api/69272) 的 **返回类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/payment`
 * @更新时间 `2022-12-11 12:18:23`
 */
export interface SvcAppletMemberCardPaymentPostResponse {
  /**
   * 付款码编号
   */
  paymentNo: string;
  /**
   * 有效期单位秒
   */
  expire: number;
  /**
   * 储值卡名称
   */
  cardName?: string;
  /**
   * 金额(余额)
   */
  amount?: number;
}

/**
 * 接口 [付款码↗](https://yapi.huianrong.com/project/1746/interface/api/69272) 的 **请求配置的类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/payment`
 * @更新时间 `2022-12-11 12:18:23`
 */
type SvcAppletMemberCardPaymentPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/member/card/payment",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [付款码↗](https://yapi.huianrong.com/project/1746/interface/api/69272) 的 **请求配置**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/payment`
 * @更新时间 `2022-12-11 12:18:23`
 */
const svcAppletMemberCardPaymentPostRequestConfig: SvcAppletMemberCardPaymentPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: "/svc-applet/member/card/payment",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletMemberCardPaymentPost",
    extraInfo: {}
  };

/**
 * 接口 [付款码↗](https://yapi.huianrong.com/project/1746/interface/api/69272) 的 **请求函数**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `POST /svc-applet/member/card/payment`
 * @更新时间 `2022-12-11 12:18:23`
 */
export const svcAppletMemberCardPaymentPost = /*#__PURE__*/ (
  requestData: SvcAppletMemberCardPaymentPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletMemberCardPaymentPostResponse>(
    prepare(svcAppletMemberCardPaymentPostRequestConfig, requestData),
    ...args
  );
};

svcAppletMemberCardPaymentPost.requestConfig =
  svcAppletMemberCardPaymentPostRequestConfig;

/**
 * 接口 [订单编号查询储值卡交易结果↗](https://yapi.huianrong.com/project/1746/interface/api/69926) 的 **请求类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/getTradeInfo`
 * @更新时间 `2022-12-11 12:18:22`
 */
export interface SvcAppletMemberCardGetTradeInfoGetRequest {
  /**
   * (String)
   */
  orderNo: string;
}

/**
 * 接口 [订单编号查询储值卡交易结果↗](https://yapi.huianrong.com/project/1746/interface/api/69926) 的 **返回类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/getTradeInfo`
 * @更新时间 `2022-12-11 12:18:22`
 */
export interface SvcAppletMemberCardGetTradeInfoGetResponse {
  /**
   * 电子卡名称
   */
  cardName: string;
  /**
   * 储值卡编号
   */
  memberCardCode: string;
  /**
   * 电子卡商场logo
   */
  marketLogoUrl: string;
  /**
   * 电子卡背景
   */
  cardBackgroundUrl: string;
  /**
   * 当前余额
   */
  balance: number;
  /**
   * 交易金额
   */
  tradeAmount: number;
  /**
   * 状态1:正常;2:冻结;3:退卡;
   */
  status: number;
  /**
   * 订单状态1、处理中2、成功3、失败
   */
  tradeStatus: number;
}

/**
 * 接口 [订单编号查询储值卡交易结果↗](https://yapi.huianrong.com/project/1746/interface/api/69926) 的 **请求配置的类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/getTradeInfo`
 * @更新时间 `2022-12-11 12:18:22`
 */
type SvcAppletMemberCardGetTradeInfoGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/member/card/getTradeInfo",
    "data",
    string,
    "orderNo",
    false
  >
>;

/**
 * 接口 [订单编号查询储值卡交易结果↗](https://yapi.huianrong.com/project/1746/interface/api/69926) 的 **请求配置**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/getTradeInfo`
 * @更新时间 `2022-12-11 12:18:22`
 */
const svcAppletMemberCardGetTradeInfoGetRequestConfig: SvcAppletMemberCardGetTradeInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: "/svc-applet/member/card/getTradeInfo",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_1,
    paramNames: [],
    queryNames: ["orderNo"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletMemberCardGetTradeInfoGet",
    extraInfo: {}
  };

/**
 * 接口 [订单编号查询储值卡交易结果↗](https://yapi.huianrong.com/project/1746/interface/api/69926) 的 **请求函数**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/getTradeInfo`
 * @更新时间 `2022-12-11 12:18:22`
 */
export const svcAppletMemberCardGetTradeInfoGet = /*#__PURE__*/ (
  requestData: SvcAppletMemberCardGetTradeInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletMemberCardGetTradeInfoGetResponse>(
    prepare(svcAppletMemberCardGetTradeInfoGetRequestConfig, requestData),
    ...args
  );
};

svcAppletMemberCardGetTradeInfoGet.requestConfig =
  svcAppletMemberCardGetTradeInfoGetRequestConfig;

/**
 * 接口 [付款码状态↗](https://yapi.huianrong.com/project/1746/interface/api/69950) 的 **请求类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/paymentStatus`
 * @更新时间 `2022-12-11 12:18:24`
 */
export interface SvcAppletMemberCardPaymentStatusGetRequest {
  /**
   * 付款码
   */
  paymentNo: string;
}

/**
 * 接口 [付款码状态↗](https://yapi.huianrong.com/project/1746/interface/api/69950) 的 **返回类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/paymentStatus`
 * @更新时间 `2022-12-11 12:18:24`
 */
export interface SvcAppletMemberCardPaymentStatusGetResponse {
  /**
   * 状态0：待使用;1：支付中;2:交易成功;3:交易失败;4:失效
   */
  status?: number;
  /**
   * 信息状态非0和1的时候
   */
  message?: string;
}

/**
 * 接口 [付款码状态↗](https://yapi.huianrong.com/project/1746/interface/api/69950) 的 **请求配置的类型**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/paymentStatus`
 * @更新时间 `2022-12-11 12:18:24`
 */
type SvcAppletMemberCardPaymentStatusGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/member/card/paymentStatus",
    "data",
    string,
    "paymentNo",
    false
  >
>;

/**
 * 接口 [付款码状态↗](https://yapi.huianrong.com/project/1746/interface/api/69950) 的 **请求配置**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/paymentStatus`
 * @更新时间 `2022-12-11 12:18:24`
 */
const svcAppletMemberCardPaymentStatusGetRequestConfig: SvcAppletMemberCardPaymentStatusGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: "/svc-applet/member/card/paymentStatus",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_1,
    paramNames: [],
    queryNames: ["paymentNo"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletMemberCardPaymentStatusGet",
    extraInfo: {}
  };

/**
 * 接口 [付款码状态↗](https://yapi.huianrong.com/project/1746/interface/api/69950) 的 **请求函数**
 *
 * @分类 [会员用户↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22167)
 * @请求头 `GET /svc-applet/member/card/paymentStatus`
 * @更新时间 `2022-12-11 12:18:24`
 */
export const svcAppletMemberCardPaymentStatusGet = /*#__PURE__*/ (
  requestData: SvcAppletMemberCardPaymentStatusGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletMemberCardPaymentStatusGetResponse>(
    prepare(svcAppletMemberCardPaymentStatusGetRequestConfig, requestData),
    ...args
  );
};

svcAppletMemberCardPaymentStatusGet.requestConfig =
  svcAppletMemberCardPaymentStatusGetRequestConfig;

const mockUrl_0_1_0_2 = "https://yapi.huianrong.com/mock/1746" as any;
const devUrl_0_1_0_2 = "http://192.168.3.151" as any;
const prodUrl_0_1_0_2 = "https://cbd.t-cube.cn" as any;
const dataKey_0_1_0_2 = "data" as any;

/**
 * 接口 [电子卡列表↗](https://yapi.huianrong.com/project/1746/interface/api/69262) 的 **请求类型**
 *
 * @分类 [电子卡↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22169)
 * @请求头 `GET /svc-applet/card/list`
 * @更新时间 `2022-12-07 16:44:46`
 */
export interface SvcAppletCardListGetRequest {
  /**
   * 电子卡编号
   */
  cardCode: string;
  /**
   * 状态1、启用2、停用,为空默认为1
   */
  status: string;
  /**
   * 活动code只现实活动适用的卡
   */
  activityCode: string;
  /**
   * 场景:1购卡；2充值；3消费
   */
  scene: string;
}

/**
 * 接口 [电子卡列表↗](https://yapi.huianrong.com/project/1746/interface/api/69262) 的 **返回类型**
 *
 * @分类 [电子卡↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22169)
 * @请求头 `GET /svc-applet/card/list`
 * @更新时间 `2022-12-07 16:44:46`
 */
export type SvcAppletCardListGetResponse = {
  /**
   * 电子卡编号
   */
  cardCode: string;
  /**
   * 电子卡卡背景url
   */
  cardBackgroundUrl: string;
  /**
   * 电子卡名称
   */
  cardName: string;
  /**
   * 商场logourl
   */
  marketLogoUrl: string;
  /**
   * 面额 ,BigDecimal
   */
  amounts?: number[];
}[];

/**
 * 接口 [电子卡列表↗](https://yapi.huianrong.com/project/1746/interface/api/69262) 的 **请求配置的类型**
 *
 * @分类 [电子卡↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22169)
 * @请求头 `GET /svc-applet/card/list`
 * @更新时间 `2022-12-07 16:44:46`
 */
type SvcAppletCardListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/card/list",
    "data",
    string,
    "cardCode" | "status" | "activityCode" | "scene",
    false
  >
>;

/**
 * 接口 [电子卡列表↗](https://yapi.huianrong.com/project/1746/interface/api/69262) 的 **请求配置**
 *
 * @分类 [电子卡↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22169)
 * @请求头 `GET /svc-applet/card/list`
 * @更新时间 `2022-12-07 16:44:46`
 */
const svcAppletCardListGetRequestConfig: SvcAppletCardListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_2,
    devUrl: devUrl_0_1_0_2,
    prodUrl: prodUrl_0_1_0_2,
    path: "/svc-applet/card/list",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_2,
    paramNames: [],
    queryNames: ["cardCode", "status", "activityCode", "scene"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletCardListGet",
    extraInfo: {}
  };

/**
 * 接口 [电子卡列表↗](https://yapi.huianrong.com/project/1746/interface/api/69262) 的 **请求函数**
 *
 * @分类 [电子卡↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22169)
 * @请求头 `GET /svc-applet/card/list`
 * @更新时间 `2022-12-07 16:44:46`
 */
export const svcAppletCardListGet = /*#__PURE__*/ (
  requestData: SvcAppletCardListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletCardListGetResponse>(
    prepare(svcAppletCardListGetRequestConfig, requestData),
    ...args
  );
};

svcAppletCardListGet.requestConfig = svcAppletCardListGetRequestConfig;

const mockUrl_0_1_0_3 = "https://yapi.huianrong.com/mock/1746" as any;
const devUrl_0_1_0_3 = "http://192.168.3.151" as any;
const prodUrl_0_1_0_3 = "https://cbd.t-cube.cn" as any;
const dataKey_0_1_0_3 = "data" as any;

/**
 * 接口 [活动优惠列表↗](https://yapi.huianrong.com/project/1746/interface/api/69264) 的 **请求类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/discountList`
 * @更新时间 `2022-12-07 16:44:52`
 */
export interface SvcAppletActivityDiscountListGetRequest {
  /**
   * 电子卡编号
   */
  cardCode: string;
  /**
   * 购值面额
   */
  amount: string;
  /**
   * 场景:1购卡；2充值；3消费
   */
  scene: string;
}

/**
 * 接口 [活动优惠列表↗](https://yapi.huianrong.com/project/1746/interface/api/69264) 的 **返回类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/discountList`
 * @更新时间 `2022-12-07 16:44:52`
 */
export interface SvcAppletActivityDiscountListGetResponse {
  /**
   * 购卡充值活动优惠列表 ,ActivityDiscountInfo
   */
  activityDiscounts?: {
    /**
     * 活动优惠编号
     */
    activityDiscountCode: string;
    /**
     * 优惠名称
     */
    discountName: string;
    /**
     * 类型1:满减；2：满赠；3：满折
     */
    type: number;
    /**
     * 优惠金额赠送金额折扣
     */
    discountAmount: number;
    /**
     * 是否是默认选中true是false否
     */
    defaultOne?: boolean;
  }[];
  /**
   * 消费折扣活动优惠列表 ,ActivityDiscountInfo
   */
  consumeActivityDiscounts?: {
    /**
     * 活动优惠编号
     */
    activityDiscountCode: string;
    /**
     * 优惠名称
     */
    discountName: string;
    /**
     * 类型1:满减；2：满赠；3：满折
     */
    type: number;
    /**
     * 优惠金额赠送金额折扣
     */
    discountAmount: number;
    /**
     * 是否是默认选中true是false否
     */
    defaultOne?: boolean;
  }[];
}

/**
 * 接口 [活动优惠列表↗](https://yapi.huianrong.com/project/1746/interface/api/69264) 的 **请求配置的类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/discountList`
 * @更新时间 `2022-12-07 16:44:52`
 */
type SvcAppletActivityDiscountListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/activity/discountList",
    "data",
    string,
    "cardCode" | "amount" | "scene",
    false
  >
>;

/**
 * 接口 [活动优惠列表↗](https://yapi.huianrong.com/project/1746/interface/api/69264) 的 **请求配置**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/discountList`
 * @更新时间 `2022-12-07 16:44:52`
 */
const svcAppletActivityDiscountListGetRequestConfig: SvcAppletActivityDiscountListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_3,
    devUrl: devUrl_0_1_0_3,
    prodUrl: prodUrl_0_1_0_3,
    path: "/svc-applet/activity/discountList",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_3,
    paramNames: [],
    queryNames: ["cardCode", "amount", "scene"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletActivityDiscountListGet",
    extraInfo: {}
  };

/**
 * 接口 [活动优惠列表↗](https://yapi.huianrong.com/project/1746/interface/api/69264) 的 **请求函数**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/discountList`
 * @更新时间 `2022-12-07 16:44:52`
 */
export const svcAppletActivityDiscountListGet = /*#__PURE__*/ (
  requestData: SvcAppletActivityDiscountListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletActivityDiscountListGetResponse>(
    prepare(svcAppletActivityDiscountListGetRequestConfig, requestData),
    ...args
  );
};

svcAppletActivityDiscountListGet.requestConfig =
  svcAppletActivityDiscountListGetRequestConfig;

/**
 * 接口 [活动详情↗](https://yapi.huianrong.com/project/1746/interface/api/69274) 的 **请求类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/info`
 * @更新时间 `2022-12-07 16:44:51`
 */
export interface SvcAppletActivityInfoGetRequest {
  /**
   * 活动编号(String)
   */
  activityCode: string;
}

/**
 * 接口 [活动详情↗](https://yapi.huianrong.com/project/1746/interface/api/69274) 的 **返回类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/info`
 * @更新时间 `2022-12-07 16:44:51`
 */
export interface SvcAppletActivityInfoGetResponse {
  /**
   * 活动名称
   */
  name: string;
  /**
   * 活动图片
   */
  adPictureUrl: string;
  /**
   * 活动开始时间
   */
  startTime: string;
  /**
   * 活动结束时间
   */
  endTime: string;
  /**
   * 场景:1购卡；2充值
   */
  scene: number;
  /**
   * 活动对象1全部用户
   */
  target: number;
  /**
   * 活动规则，后台拼装 ,String
   */
  rules: string[];
  /**
   * 适用范围 ,CardRange
   */
  cardRanges?: {
    /**
     * 卡名
     */
    cardName?: string;
    /**
     * 适用类型1、全部店铺2、指定店铺可用3、指店铺地不可用
     */
    storeApplyType?: number;
    /**
     * 适用范围 ,StoreRange
     */
    storeRanges?: {
      /**
       * 店铺名称
       */
      storeName: string;
      /**
       * 适用类型1、全部场地2、指定场地可用3、指定场地不可用
       */
      venueApplyType?: number;
      /**
       * 适用范围 ,String
       */
      ranges: string[];
    }[];
  }[];
  /**
   * 活动描述
   */
  desc?: string;
}

/**
 * 接口 [活动详情↗](https://yapi.huianrong.com/project/1746/interface/api/69274) 的 **请求配置的类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/info`
 * @更新时间 `2022-12-07 16:44:51`
 */
type SvcAppletActivityInfoGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/activity/info",
    "data",
    string,
    "activityCode",
    false
  >
>;

/**
 * 接口 [活动详情↗](https://yapi.huianrong.com/project/1746/interface/api/69274) 的 **请求配置**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/info`
 * @更新时间 `2022-12-07 16:44:51`
 */
const svcAppletActivityInfoGetRequestConfig: SvcAppletActivityInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_3,
    devUrl: devUrl_0_1_0_3,
    prodUrl: prodUrl_0_1_0_3,
    path: "/svc-applet/activity/info",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_3,
    paramNames: [],
    queryNames: ["activityCode"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletActivityInfoGet",
    extraInfo: {}
  };

/**
 * 接口 [活动详情↗](https://yapi.huianrong.com/project/1746/interface/api/69274) 的 **请求函数**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/info`
 * @更新时间 `2022-12-07 16:44:51`
 */
export const svcAppletActivityInfoGet = /*#__PURE__*/ (
  requestData: SvcAppletActivityInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletActivityInfoGetResponse>(
    prepare(svcAppletActivityInfoGetRequestConfig, requestData),
    ...args
  );
};

svcAppletActivityInfoGet.requestConfig = svcAppletActivityInfoGetRequestConfig;

/**
 * 接口 [活动列表↗](https://yapi.huianrong.com/project/1746/interface/api/69294) 的 **请求类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/page`
 * @更新时间 `2022-12-07 16:44:51`
 */
export interface SvcAppletActivityPageGetRequest {
  /**
   * 开始时间yyyy-MM-ddHH:mm:ss非必选
   */
  startTime: string;
  /**
   * 结束时间yyyy-MM-ddHH:mm:ss非必选
   */
  endTime: string;
  pageNum: string;
  pageSize: string;
}

/**
 * 接口 [活动列表↗](https://yapi.huianrong.com/project/1746/interface/api/69294) 的 **返回类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/page`
 * @更新时间 `2022-12-07 16:44:51`
 */
export interface SvcAppletActivityPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 活动编号
     */
    activityCode: string;
    /**
     * 活动名称
     */
    name: string;
    /**
     * 活动图片地址
     */
    adPictureUrl: string;
    /**
     * 开始时间yyyy-MM-ddHH:mm:ss
     */
    startTime: string;
    /**
     * 结束时间yyyy-MM-ddHH:mm:ss
     */
    endTime: string;
    /**
     * 状态:1.未开始2.进行中3.已暂停4.已完成
     */
    status: number;
    /**
     * 活动描述
     */
    desc?: string;
  }[];
}

/**
 * 接口 [活动列表↗](https://yapi.huianrong.com/project/1746/interface/api/69294) 的 **请求配置的类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/page`
 * @更新时间 `2022-12-07 16:44:51`
 */
type SvcAppletActivityPageGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/activity/page",
    "data",
    string,
    "startTime" | "endTime" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [活动列表↗](https://yapi.huianrong.com/project/1746/interface/api/69294) 的 **请求配置**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/page`
 * @更新时间 `2022-12-07 16:44:51`
 */
const svcAppletActivityPageGetRequestConfig: SvcAppletActivityPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_3,
    devUrl: devUrl_0_1_0_3,
    prodUrl: prodUrl_0_1_0_3,
    path: "/svc-applet/activity/page",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_3,
    paramNames: [],
    queryNames: ["startTime", "endTime", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletActivityPageGet",
    extraInfo: {}
  };

/**
 * 接口 [活动列表↗](https://yapi.huianrong.com/project/1746/interface/api/69294) 的 **请求函数**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22171)
 * @请求头 `GET /svc-applet/activity/page`
 * @更新时间 `2022-12-07 16:44:51`
 */
export const svcAppletActivityPageGet = /*#__PURE__*/ (
  requestData: SvcAppletActivityPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletActivityPageGetResponse>(
    prepare(svcAppletActivityPageGetRequestConfig, requestData),
    ...args
  );
};

svcAppletActivityPageGet.requestConfig = svcAppletActivityPageGetRequestConfig;

const mockUrl_0_1_0_4 = "https://yapi.huianrong.com/mock/1746" as any;
const devUrl_0_1_0_4 = "http://192.168.3.151" as any;
const prodUrl_0_1_0_4 = "https://cbd.t-cube.cn" as any;
const dataKey_0_1_0_4 = "data" as any;

/**
 * 接口 [banner列表↗](https://yapi.huianrong.com/project/1746/interface/api/69276) 的 **请求类型**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/banner/list`
 * @更新时间 `2022-12-01 11:36:47`
 */
export interface SvcAppletHomePageBannerListGetRequest {}

/**
 * 接口 [banner列表↗](https://yapi.huianrong.com/project/1746/interface/api/69276) 的 **返回类型**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/banner/list`
 * @更新时间 `2022-12-01 11:36:47`
 */
export type SvcAppletHomePageBannerListGetResponse = {
  /**
   * 类型1、图片2、活动
   */
  type: number;
  /**
   * 活动编号，活动时有效
   */
  activityCode?: string;
  /**
   * 跳转链接，图片时有效
   */
  path?: string;
  /**
   * 图片url
   */
  picUrl: string;
}[];

/**
 * 接口 [banner列表↗](https://yapi.huianrong.com/project/1746/interface/api/69276) 的 **请求配置的类型**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/banner/list`
 * @更新时间 `2022-12-01 11:36:47`
 */
type SvcAppletHomePageBannerListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/home-page/banner/list",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [banner列表↗](https://yapi.huianrong.com/project/1746/interface/api/69276) 的 **请求配置**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/banner/list`
 * @更新时间 `2022-12-01 11:36:47`
 */
const svcAppletHomePageBannerListGetRequestConfig: SvcAppletHomePageBannerListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_4,
    devUrl: devUrl_0_1_0_4,
    prodUrl: prodUrl_0_1_0_4,
    path: "/svc-applet/home-page/banner/list",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_4,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletHomePageBannerListGet",
    extraInfo: {}
  };

/**
 * 接口 [banner列表↗](https://yapi.huianrong.com/project/1746/interface/api/69276) 的 **请求函数**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/banner/list`
 * @更新时间 `2022-12-01 11:36:47`
 */
export const svcAppletHomePageBannerListGet = /*#__PURE__*/ (
  requestData?: SvcAppletHomePageBannerListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletHomePageBannerListGetResponse>(
    prepare(svcAppletHomePageBannerListGetRequestConfig, requestData),
    ...args
  );
};

svcAppletHomePageBannerListGet.requestConfig =
  svcAppletHomePageBannerListGetRequestConfig;

/**
 * 接口 [帮助信息↗](https://yapi.huianrong.com/project/1746/interface/api/69278) 的 **请求类型**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/help`
 * @更新时间 `2022-12-01 11:36:48`
 */
export interface SvcAppletHomePageHelpGetRequest {}

/**
 * 接口 [帮助信息↗](https://yapi.huianrong.com/project/1746/interface/api/69278) 的 **返回类型**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/help`
 * @更新时间 `2022-12-01 11:36:48`
 */
export interface SvcAppletHomePageHelpGetResponse {
  /**
   * 内容
   */
  content: string;
}

/**
 * 接口 [帮助信息↗](https://yapi.huianrong.com/project/1746/interface/api/69278) 的 **请求配置的类型**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/help`
 * @更新时间 `2022-12-01 11:36:48`
 */
type SvcAppletHomePageHelpGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/home-page/help",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [帮助信息↗](https://yapi.huianrong.com/project/1746/interface/api/69278) 的 **请求配置**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/help`
 * @更新时间 `2022-12-01 11:36:48`
 */
const svcAppletHomePageHelpGetRequestConfig: SvcAppletHomePageHelpGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_4,
    devUrl: devUrl_0_1_0_4,
    prodUrl: prodUrl_0_1_0_4,
    path: "/svc-applet/home-page/help",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_4,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletHomePageHelpGet",
    extraInfo: {}
  };

/**
 * 接口 [帮助信息↗](https://yapi.huianrong.com/project/1746/interface/api/69278) 的 **请求函数**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/help`
 * @更新时间 `2022-12-01 11:36:48`
 */
export const svcAppletHomePageHelpGet = /*#__PURE__*/ (
  requestData?: SvcAppletHomePageHelpGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletHomePageHelpGetResponse>(
    prepare(svcAppletHomePageHelpGetRequestConfig, requestData),
    ...args
  );
};

svcAppletHomePageHelpGet.requestConfig = svcAppletHomePageHelpGetRequestConfig;

/**
 * 接口 [使用指引↗](https://yapi.huianrong.com/project/1746/interface/api/69280) 的 **请求类型**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/guide`
 * @更新时间 `2022-12-01 11:36:49`
 */
export interface SvcAppletHomePageGuideGetRequest {}

/**
 * 接口 [使用指引↗](https://yapi.huianrong.com/project/1746/interface/api/69280) 的 **返回类型**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/guide`
 * @更新时间 `2022-12-01 11:36:49`
 */
export interface SvcAppletHomePageGuideGetResponse {
  /**
   * 内容
   */
  content: string;
}

/**
 * 接口 [使用指引↗](https://yapi.huianrong.com/project/1746/interface/api/69280) 的 **请求配置的类型**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/guide`
 * @更新时间 `2022-12-01 11:36:49`
 */
type SvcAppletHomePageGuideGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/home-page/guide",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [使用指引↗](https://yapi.huianrong.com/project/1746/interface/api/69280) 的 **请求配置**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/guide`
 * @更新时间 `2022-12-01 11:36:49`
 */
const svcAppletHomePageGuideGetRequestConfig: SvcAppletHomePageGuideGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_4,
    devUrl: devUrl_0_1_0_4,
    prodUrl: prodUrl_0_1_0_4,
    path: "/svc-applet/home-page/guide",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_4,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletHomePageGuideGet",
    extraInfo: {}
  };

/**
 * 接口 [使用指引↗](https://yapi.huianrong.com/project/1746/interface/api/69280) 的 **请求函数**
 *
 * @分类 [主页↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22181)
 * @请求头 `GET /svc-applet/home-page/guide`
 * @更新时间 `2022-12-01 11:36:49`
 */
export const svcAppletHomePageGuideGet = /*#__PURE__*/ (
  requestData?: SvcAppletHomePageGuideGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletHomePageGuideGetResponse>(
    prepare(svcAppletHomePageGuideGetRequestConfig, requestData),
    ...args
  );
};

svcAppletHomePageGuideGet.requestConfig =
  svcAppletHomePageGuideGetRequestConfig;

const mockUrl_0_1_0_5 = "https://yapi.huianrong.com/mock/1746" as any;
const devUrl_0_1_0_5 = "http://192.168.3.151" as any;
const prodUrl_0_1_0_5 = "https://cbd.t-cube.cn" as any;
const dataKey_0_1_0_5 = "data" as any;

/**
 * 接口 [消息列表↗](https://yapi.huianrong.com/project/1746/interface/api/69284) 的 **请求类型**
 *
 * @分类 [消息↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22185)
 * @请求头 `GET /svc-applet/message/page`
 * @更新时间 `2022-12-11 12:00:09`
 */
export interface SvcAppletMessagePageGetRequest {
  /**
   * 消息来源1、购卡2、充值3、消费4、退款5、退卡6、冻结,非必选
   */
  source: string;
  /**
   * 开始时间yyyy-MM-dd
   */
  startTime: string;
  /**
   * 结束时间yyyy-MM-dd
   */
  endTime: string;
  pageNum: string;
  pageSize: string;
}

/**
 * 接口 [消息列表↗](https://yapi.huianrong.com/project/1746/interface/api/69284) 的 **返回类型**
 *
 * @分类 [消息↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22185)
 * @请求头 `GET /svc-applet/message/page`
 * @更新时间 `2022-12-11 12:00:09`
 */
export interface SvcAppletMessagePageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 消息id
     */
    messageId: string;
    /**
     * 会员储值卡编号
     */
    memberCardCode: string;
    /**
     * 消息来源1、购卡2、充值3、消费4、退款5、退卡6、冻结
     */
    source: number;
    /**
     * 标题
     */
    title: string;
    /**
     * 到账金额
     */
    tradeAmount: number;
    /**
     * 支付金额
     */
    payAmount: number;
    /**
     * 交易时间yyyy-MM-ddHH:mm:ss
     */
    tradeTime?: string;
    /**
     * 交易状态0失败1成功
     */
    tradeStatus: number;
  }[];
}

/**
 * 接口 [消息列表↗](https://yapi.huianrong.com/project/1746/interface/api/69284) 的 **请求配置的类型**
 *
 * @分类 [消息↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22185)
 * @请求头 `GET /svc-applet/message/page`
 * @更新时间 `2022-12-11 12:00:09`
 */
type SvcAppletMessagePageGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/message/page",
    "data",
    string,
    "source" | "startTime" | "endTime" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [消息列表↗](https://yapi.huianrong.com/project/1746/interface/api/69284) 的 **请求配置**
 *
 * @分类 [消息↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22185)
 * @请求头 `GET /svc-applet/message/page`
 * @更新时间 `2022-12-11 12:00:09`
 */
const svcAppletMessagePageGetRequestConfig: SvcAppletMessagePageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_5,
    devUrl: devUrl_0_1_0_5,
    prodUrl: prodUrl_0_1_0_5,
    path: "/svc-applet/message/page",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_5,
    paramNames: [],
    queryNames: ["source", "startTime", "endTime", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletMessagePageGet",
    extraInfo: {}
  };

/**
 * 接口 [消息列表↗](https://yapi.huianrong.com/project/1746/interface/api/69284) 的 **请求函数**
 *
 * @分类 [消息↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22185)
 * @请求头 `GET /svc-applet/message/page`
 * @更新时间 `2022-12-11 12:00:09`
 */
export const svcAppletMessagePageGet = /*#__PURE__*/ (
  requestData: SvcAppletMessagePageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletMessagePageGetResponse>(
    prepare(svcAppletMessagePageGetRequestConfig, requestData),
    ...args
  );
};

svcAppletMessagePageGet.requestConfig = svcAppletMessagePageGetRequestConfig;

/**
 * 接口 [消息详情↗](https://yapi.huianrong.com/project/1746/interface/api/69292) 的 **请求类型**
 *
 * @分类 [消息↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22185)
 * @请求头 `GET /svc-applet/message/info`
 * @更新时间 `2022-12-11 12:00:10`
 */
export interface SvcAppletMessageInfoGetRequest {
  /**
   * (String)
   */
  messageId: string;
}

/**
 * 接口 [消息详情↗](https://yapi.huianrong.com/project/1746/interface/api/69292) 的 **返回类型**
 *
 * @分类 [消息↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22185)
 * @请求头 `GET /svc-applet/message/info`
 * @更新时间 `2022-12-11 12:00:10`
 */
export interface SvcAppletMessageInfoGetResponse {
  /**
   * 交易单号
   */
  tradeNo?: string;
  /**
   * 阅读状态
   */
  readStatus?: number;
  /**
   * 消息id
   */
  messageId: string;
  /**
   * 会员储值卡编号
   */
  memberCardCode: string;
  /**
   * 消息来源1、购卡2、充值3、消费4、退款5、退卡6、冻结
   */
  source: number;
  /**
   * 标题
   */
  title: string;
  /**
   * 到账金额
   */
  tradeAmount: number;
  /**
   * 支付金额
   */
  payAmount: number;
  /**
   * 交易时间yyyy-MM-ddHH:mm:ss
   */
  tradeTime?: string;
  /**
   * 交易状态0失败1成功
   */
  tradeStatus: number;
}

/**
 * 接口 [消息详情↗](https://yapi.huianrong.com/project/1746/interface/api/69292) 的 **请求配置的类型**
 *
 * @分类 [消息↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22185)
 * @请求头 `GET /svc-applet/message/info`
 * @更新时间 `2022-12-11 12:00:10`
 */
type SvcAppletMessageInfoGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1746",
    "http://192.168.3.151",
    "https://cbd.t-cube.cn",
    "/svc-applet/message/info",
    "data",
    string,
    "messageId",
    false
  >
>;

/**
 * 接口 [消息详情↗](https://yapi.huianrong.com/project/1746/interface/api/69292) 的 **请求配置**
 *
 * @分类 [消息↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22185)
 * @请求头 `GET /svc-applet/message/info`
 * @更新时间 `2022-12-11 12:00:10`
 */
const svcAppletMessageInfoGetRequestConfig: SvcAppletMessageInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_5,
    devUrl: devUrl_0_1_0_5,
    prodUrl: prodUrl_0_1_0_5,
    path: "/svc-applet/message/info",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_5,
    paramNames: [],
    queryNames: ["messageId"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "svcAppletMessageInfoGet",
    extraInfo: {}
  };

/**
 * 接口 [消息详情↗](https://yapi.huianrong.com/project/1746/interface/api/69292) 的 **请求函数**
 *
 * @分类 [消息↗](https://yapi.huianrong.com/project/1746/interface/api/cat_22185)
 * @请求头 `GET /svc-applet/message/info`
 * @更新时间 `2022-12-11 12:00:10`
 */
export const svcAppletMessageInfoGet = /*#__PURE__*/ (
  requestData: SvcAppletMessageInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcAppletMessageInfoGetResponse>(
    prepare(svcAppletMessageInfoGetRequestConfig, requestData),
    ...args
  );
};

svcAppletMessageInfoGet.requestConfig = svcAppletMessageInfoGetRequestConfig;

/* prettier-ignore-end */
