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

const mockUrl_0_2_0_1 = "https://yapi.huianrong.com/mock/1770" as any;
const devUrl_0_2_0_1 = "http://192.168.50.12:9403" as any;
const prodUrl_0_2_0_1 = "https://cbd.t-cube.cn" as any;
const dataKey_0_2_0_1 = "data" as any;

/**
 * 接口 [核销记录查询↗](https://yapi.huianrong.com/project/1770/interface/api/72182) 的 **请求类型**
 *
 * @分类 [限期卡/次卡核销记录↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23119)
 * @请求头 `GET /ground-mp-api/cardVerificationRecord/listByOrderId`
 * @更新时间 `2023-03-03 13:56:35`
 */
export interface GroundMpApiCardVerificationRecordListByOrderIdGetRequest {
  /**
   * 持有卡id
   */
  cardHoldId?: string;
  /**
   * 当前记录起始索引（默认为1）
   */
  pageNum: string;
  /**
   * 每页显示记录数（默认为10）
   */
  pageSize: string;
}

/**
 * 接口 [核销记录查询↗](https://yapi.huianrong.com/project/1770/interface/api/72182) 的 **返回类型**
 *
 * @分类 [限期卡/次卡核销记录↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23119)
 * @请求头 `GET /ground-mp-api/cardVerificationRecord/listByOrderId`
 * @更新时间 `2023-03-03 13:56:35`
 */
export interface GroundMpApiCardVerificationRecordListByOrderIdGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * id
     */
    id?: number;
    /**
     * 核销时间
     */
    verificationTime?: string;
    /**
     * 设备名称
     */
    deviceName?: string;
    /**
     * 操作员id
     */
    merchantEmployeeId?: number;
    /**
     * 操作员姓名
     */
    merchantEmployeeName?: string;
    /**
     * 核销状态,1 : 成功，0 ： 失败
     */
    verificationStatus?: number;
  }[];
}

/**
 * 接口 [核销记录查询↗](https://yapi.huianrong.com/project/1770/interface/api/72182) 的 **请求配置的类型**
 *
 * @分类 [限期卡/次卡核销记录↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23119)
 * @请求头 `GET /ground-mp-api/cardVerificationRecord/listByOrderId`
 * @更新时间 `2023-03-03 13:56:35`
 */
type GroundMpApiCardVerificationRecordListByOrderIdGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1770",
    "http://192.168.50.12:9403",
    "https://cbd.t-cube.cn",
    "/ground-mp-api/cardVerificationRecord/listByOrderId",
    "data",
    string,
    "cardHoldId" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [核销记录查询↗](https://yapi.huianrong.com/project/1770/interface/api/72182) 的 **请求配置**
 *
 * @分类 [限期卡/次卡核销记录↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23119)
 * @请求头 `GET /ground-mp-api/cardVerificationRecord/listByOrderId`
 * @更新时间 `2023-03-03 13:56:35`
 */
const groundMpApiCardVerificationRecordListByOrderIdGetRequestConfig: GroundMpApiCardVerificationRecordListByOrderIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_1,
    devUrl: devUrl_0_2_0_1,
    prodUrl: prodUrl_0_2_0_1,
    path: "/ground-mp-api/cardVerificationRecord/listByOrderId",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_1,
    paramNames: [],
    queryNames: ["cardHoldId", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "groundMpApiCardVerificationRecordListByOrderIdGet",
    extraInfo: {}
  };

/**
 * 接口 [核销记录查询↗](https://yapi.huianrong.com/project/1770/interface/api/72182) 的 **请求函数**
 *
 * @分类 [限期卡/次卡核销记录↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23119)
 * @请求头 `GET /ground-mp-api/cardVerificationRecord/listByOrderId`
 * @更新时间 `2023-03-03 13:56:35`
 */
export const groundMpApiCardVerificationRecordListByOrderIdGet = /*#__PURE__*/ (
  requestData: GroundMpApiCardVerificationRecordListByOrderIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundMpApiCardVerificationRecordListByOrderIdGetResponse>(
    prepare(
      groundMpApiCardVerificationRecordListByOrderIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundMpApiCardVerificationRecordListByOrderIdGet.requestConfig =
  groundMpApiCardVerificationRecordListByOrderIdGetRequestConfig;

/**
 * 接口 [查询卡核销成功的次数↗](https://yapi.huianrong.com/project/1770/interface/api/72626) 的 **请求类型**
 *
 * @分类 [限期卡/次卡核销记录↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23119)
 * @请求头 `GET /ground-mp-api/cardVerificationRecord/countVerificationSuccess`
 * @更新时间 `2023-03-03 13:56:35`
 */
export interface GroundMpApiCardVerificationRecordCountVerificationSuccessGetRequest {
  cardHoldId?: string;
}

/**
 * 接口 [查询卡核销成功的次数↗](https://yapi.huianrong.com/project/1770/interface/api/72626) 的 **返回类型**
 *
 * @分类 [限期卡/次卡核销记录↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23119)
 * @请求头 `GET /ground-mp-api/cardVerificationRecord/countVerificationSuccess`
 * @更新时间 `2023-03-03 13:56:35`
 */
export type GroundMpApiCardVerificationRecordCountVerificationSuccessGetResponse =
  number;

/**
 * 接口 [查询卡核销成功的次数↗](https://yapi.huianrong.com/project/1770/interface/api/72626) 的 **请求配置的类型**
 *
 * @分类 [限期卡/次卡核销记录↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23119)
 * @请求头 `GET /ground-mp-api/cardVerificationRecord/countVerificationSuccess`
 * @更新时间 `2023-03-03 13:56:35`
 */
type GroundMpApiCardVerificationRecordCountVerificationSuccessGetRequestConfig =
  Readonly<
    RequestConfig<
      "https://yapi.huianrong.com/mock/1770",
      "http://192.168.50.12:9403",
      "https://cbd.t-cube.cn",
      "/ground-mp-api/cardVerificationRecord/countVerificationSuccess",
      "data",
      string,
      "cardHoldId",
      false
    >
  >;

/**
 * 接口 [查询卡核销成功的次数↗](https://yapi.huianrong.com/project/1770/interface/api/72626) 的 **请求配置**
 *
 * @分类 [限期卡/次卡核销记录↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23119)
 * @请求头 `GET /ground-mp-api/cardVerificationRecord/countVerificationSuccess`
 * @更新时间 `2023-03-03 13:56:35`
 */
const groundMpApiCardVerificationRecordCountVerificationSuccessGetRequestConfig: GroundMpApiCardVerificationRecordCountVerificationSuccessGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_1,
    devUrl: devUrl_0_2_0_1,
    prodUrl: prodUrl_0_2_0_1,
    path: "/ground-mp-api/cardVerificationRecord/countVerificationSuccess",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_1,
    paramNames: [],
    queryNames: ["cardHoldId"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName:
      "groundMpApiCardVerificationRecordCountVerificationSuccessGet",
    extraInfo: {}
  };

/**
 * 接口 [查询卡核销成功的次数↗](https://yapi.huianrong.com/project/1770/interface/api/72626) 的 **请求函数**
 *
 * @分类 [限期卡/次卡核销记录↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23119)
 * @请求头 `GET /ground-mp-api/cardVerificationRecord/countVerificationSuccess`
 * @更新时间 `2023-03-03 13:56:35`
 */
export const groundMpApiCardVerificationRecordCountVerificationSuccessGet =
  /*#__PURE__*/ (
    requestData: GroundMpApiCardVerificationRecordCountVerificationSuccessGetRequest,
    ...args: UserRequestRestArgs
  ) => {
    return request<GroundMpApiCardVerificationRecordCountVerificationSuccessGetResponse>(
      prepare(
        groundMpApiCardVerificationRecordCountVerificationSuccessGetRequestConfig,
        requestData
      ),
      ...args
    );
  };

groundMpApiCardVerificationRecordCountVerificationSuccessGet.requestConfig =
  groundMpApiCardVerificationRecordCountVerificationSuccessGetRequestConfig;

const mockUrl_0_2_0_2 = "https://yapi.huianrong.com/mock/1770" as any;
const devUrl_0_2_0_2 = "http://192.168.50.12:9403" as any;
const prodUrl_0_2_0_2 = "https://cbd.t-cube.cn" as any;
const dataKey_0_2_0_2 = "data" as any;

/**
 * 接口 [根据会员id查询持有卡列表↗](https://yapi.huianrong.com/project/1770/interface/api/72184) 的 **请求类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `POST /ground-mp-api/memberCardHold/listCardHold`
 * @更新时间 `2023-03-06 11:21:32`
 */
export interface GroundMpApiMemberCardHoldListCardHoldPostRequest {
  /**
   * 卡类型，1:期限卡 2:次卡
   */
  cardType: number;
  /**
   * 是否过期，0:未过期 1:已过期
   */
  expiredStatus: number;
  /**
   * 当前记录起始索引（默认为1）
   */
  pageNum: number;
  /**
   * 每页显示记录数（默认为10）
   */
  pageSize: number;
}

/**
 * 接口 [根据会员id查询持有卡列表↗](https://yapi.huianrong.com/project/1770/interface/api/72184) 的 **返回类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `POST /ground-mp-api/memberCardHold/listCardHold`
 * @更新时间 `2023-03-06 11:21:32`
 */
export interface GroundMpApiMemberCardHoldListCardHoldPostResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 持有卡信息id
     */
    id?: number;
    /**
     * 电子卡号
     */
    electronicCardNo?: string;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 卡名称
     */
    cardName?: string;
    /**
     * 激活状态， 1:未激活 2:已激或
     */
    activeStatus?: number;
    /**
     * 卡状态， 1:使用中 2:已冻结 3:已过期
     */
    cardStatus?: number;
    /**
     * 激活时间
     */
    activeTime?: string;
    /**
     * 到期时间
     */
    expirationTime?: string;
    /**
     * 剩余次数
     */
    surplusTimes?: number;
    /**
     * 卡面设置1、颜色 2、自定义
     */
    cardFaceType?: number;
    /**
     * 颜色的RGB字符值,卡面设置为1时使用
     */
    cardFaceColor?: string;
    /**
     * 卡图标
     */
    cardFaceIcon?: string;
  }[];
}

/**
 * 接口 [根据会员id查询持有卡列表↗](https://yapi.huianrong.com/project/1770/interface/api/72184) 的 **请求配置的类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `POST /ground-mp-api/memberCardHold/listCardHold`
 * @更新时间 `2023-03-06 11:21:32`
 */
type GroundMpApiMemberCardHoldListCardHoldPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1770",
    "http://192.168.50.12:9403",
    "https://cbd.t-cube.cn",
    "/ground-mp-api/memberCardHold/listCardHold",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [根据会员id查询持有卡列表↗](https://yapi.huianrong.com/project/1770/interface/api/72184) 的 **请求配置**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `POST /ground-mp-api/memberCardHold/listCardHold`
 * @更新时间 `2023-03-06 11:21:32`
 */
const groundMpApiMemberCardHoldListCardHoldPostRequestConfig: GroundMpApiMemberCardHoldListCardHoldPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_2,
    devUrl: devUrl_0_2_0_2,
    prodUrl: prodUrl_0_2_0_2,
    path: "/ground-mp-api/memberCardHold/listCardHold",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_2,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "groundMpApiMemberCardHoldListCardHoldPost",
    extraInfo: {}
  };

/**
 * 接口 [根据会员id查询持有卡列表↗](https://yapi.huianrong.com/project/1770/interface/api/72184) 的 **请求函数**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `POST /ground-mp-api/memberCardHold/listCardHold`
 * @更新时间 `2023-03-06 11:21:32`
 */
export const groundMpApiMemberCardHoldListCardHoldPost = /*#__PURE__*/ (
  requestData: GroundMpApiMemberCardHoldListCardHoldPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundMpApiMemberCardHoldListCardHoldPostResponse>(
    prepare(
      groundMpApiMemberCardHoldListCardHoldPostRequestConfig,
      requestData
    ),
    ...args
  );
};

groundMpApiMemberCardHoldListCardHoldPost.requestConfig =
  groundMpApiMemberCardHoldListCardHoldPostRequestConfig;

/**
 * 接口 [根据持有卡id查询持有卡详细信息↗](https://yapi.huianrong.com/project/1770/interface/api/72186) 的 **请求类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `GET /ground-mp-api/memberCardHold/cardHoldInfo`
 * @更新时间 `2023-03-06 11:20:25`
 */
export interface GroundMpApiMemberCardHoldCardHoldInfoGetRequest {
  cardHoldId?: string;
}

/**
 * 接口 [根据持有卡id查询持有卡详细信息↗](https://yapi.huianrong.com/project/1770/interface/api/72186) 的 **返回类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `GET /ground-mp-api/memberCardHold/cardHoldInfo`
 * @更新时间 `2023-03-06 11:20:25`
 */
export interface GroundMpApiMemberCardHoldCardHoldInfoGetResponse {
  /**
   * 持有卡信息id
   */
  id?: number;
  /**
   * 电子卡号
   */
  electronicCardNo?: string;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 卡名称
   */
  cardName?: string;
  /**
   * 卡类型 1:期限卡 2:次卡
   */
  cardType?: number;
  /**
   * 产品介绍
   */
  productDescription?: string;
  /**
   * 激活方式 1购买激活 2第一次到店激活 3指定日期激活
   */
  activeType?: number;
  /**
   * 激活状态， 1:未激活 2:已激活
   */
  activeStatus?: number;
  /**
   * 卡状态， 1:使用中 2:已冻结 3:已过期
   */
  cardStatus?: number;
  /**
   * 激活时间
   */
  activeTime?: string;
  /**
   * 到期时间
   */
  expirationTime?: string;
  /**
   * 卡时长（天）
   */
  cardDuration?: number;
  /**
   * 剩余时长（天）
   */
  usefulDays?: number;
  /**
   * 总次数，次卡有值
   */
  totalDegree?: number;
  /**
   * 剩余次数，次卡有值
   */
  surplusTimes?: number;
  /**
   * 购卡日期
   */
  purchaseTime?: string;
  /**
   * 使用场馆
   */
  supportStadium?: string;
  /**
   * 入场时段，1、全时段 2、特定时段
   */
  admission?: number;
  /**
   * 使用时间段
   */
  admissionPeriod?: string;
  /**
   * 使用具体时段时间
   */
  admissionTime?: string[];
  /**
   * 卡说明
   */
  cardContent?: string;
  /**
   * 会员id
   */
  membersId?: number;
  /**
   * 会员信息
   */
  member?: {
    /**
     * 数据id
     */
    id?: number;
    /**
     * 项目id
     */
    projectId?: number;
    /**
     * 客户id
     */
    clientId?: number;
    /**
     * 用户编号
     */
    code?: string;
    /**
     * 会员名称
     */
    name?: string;
    /**
     * 用户昵称
     */
    nickName?: string;
    /**
     * 用户头像
     */
    avatarUrl?: string;
    /**
     * 用户手机号
     */
    phone?: string;
    /**
     * 注册时间
     */
    createTime?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 身份证
     */
    identityNo?: string;
    /**
     * 会员来源.
     * 1-小程序注册,2-老带新,3-顾问推荐,4-客户自到店,5-自主发掘;
     */
    sourceType?: number;
    /**
     * 性别
     * 1-男；0-女
     */
    gender?: number;
    /**
     * 生日
     */
    birthDay?: string;
    /**
     * 0-未成年,1-成年人
     */
    personType?: number;
    /**
     * 健身目标
     */
    fitnessGoal?: string;
    /**
     * 健身等级
     */
    fitnessLevel?: string;
    /**
     * 体重
     */
    weight?: number;
    /**
     * 身高
     */
    height?: number;
    /**
     * 标签id
     */
    labelIds?: number[];
  };
  /**
   * 卡面设置1、颜色 2、自定义
   */
  cardFaceType?: number;
  /**
   * 卡面设置为1时,颜色的RGB字符值
   * 为2时,文件的信息
   */
  cardFaceColor?: string;
  /**
   * 卡图标
   */
  cardFaceIcon?: string;
}

/**
 * 接口 [根据持有卡id查询持有卡详细信息↗](https://yapi.huianrong.com/project/1770/interface/api/72186) 的 **请求配置的类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `GET /ground-mp-api/memberCardHold/cardHoldInfo`
 * @更新时间 `2023-03-06 11:20:25`
 */
type GroundMpApiMemberCardHoldCardHoldInfoGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1770",
    "http://192.168.50.12:9403",
    "https://cbd.t-cube.cn",
    "/ground-mp-api/memberCardHold/cardHoldInfo",
    "data",
    string,
    "cardHoldId",
    false
  >
>;

/**
 * 接口 [根据持有卡id查询持有卡详细信息↗](https://yapi.huianrong.com/project/1770/interface/api/72186) 的 **请求配置**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `GET /ground-mp-api/memberCardHold/cardHoldInfo`
 * @更新时间 `2023-03-06 11:20:25`
 */
const groundMpApiMemberCardHoldCardHoldInfoGetRequestConfig: GroundMpApiMemberCardHoldCardHoldInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_2,
    devUrl: devUrl_0_2_0_2,
    prodUrl: prodUrl_0_2_0_2,
    path: "/ground-mp-api/memberCardHold/cardHoldInfo",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_2,
    paramNames: [],
    queryNames: ["cardHoldId"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "groundMpApiMemberCardHoldCardHoldInfoGet",
    extraInfo: {}
  };

/**
 * 接口 [根据持有卡id查询持有卡详细信息↗](https://yapi.huianrong.com/project/1770/interface/api/72186) 的 **请求函数**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `GET /ground-mp-api/memberCardHold/cardHoldInfo`
 * @更新时间 `2023-03-06 11:20:25`
 */
export const groundMpApiMemberCardHoldCardHoldInfoGet = /*#__PURE__*/ (
  requestData: GroundMpApiMemberCardHoldCardHoldInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundMpApiMemberCardHoldCardHoldInfoGetResponse>(
    prepare(groundMpApiMemberCardHoldCardHoldInfoGetRequestConfig, requestData),
    ...args
  );
};

groundMpApiMemberCardHoldCardHoldInfoGet.requestConfig =
  groundMpApiMemberCardHoldCardHoldInfoGetRequestConfig;

/**
 * 接口 [刷新持卡信息的电子卡号↗](https://yapi.huianrong.com/project/1770/interface/api/72268) 的 **请求类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `GET /ground-mp-api/memberCardHold/flushCardNo`
 * @更新时间 `2023-03-06 11:20:26`
 */
export interface GroundMpApiMemberCardHoldFlushCardNoGetRequest {
  cardHoldId?: string;
}

/**
 * 接口 [刷新持卡信息的电子卡号↗](https://yapi.huianrong.com/project/1770/interface/api/72268) 的 **返回类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `GET /ground-mp-api/memberCardHold/flushCardNo`
 * @更新时间 `2023-03-06 11:20:26`
 */
export type GroundMpApiMemberCardHoldFlushCardNoGetResponse = string;

/**
 * 接口 [刷新持卡信息的电子卡号↗](https://yapi.huianrong.com/project/1770/interface/api/72268) 的 **请求配置的类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `GET /ground-mp-api/memberCardHold/flushCardNo`
 * @更新时间 `2023-03-06 11:20:26`
 */
type GroundMpApiMemberCardHoldFlushCardNoGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1770",
    "http://192.168.50.12:9403",
    "https://cbd.t-cube.cn",
    "/ground-mp-api/memberCardHold/flushCardNo",
    "data",
    string,
    "cardHoldId",
    false
  >
>;

/**
 * 接口 [刷新持卡信息的电子卡号↗](https://yapi.huianrong.com/project/1770/interface/api/72268) 的 **请求配置**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `GET /ground-mp-api/memberCardHold/flushCardNo`
 * @更新时间 `2023-03-06 11:20:26`
 */
const groundMpApiMemberCardHoldFlushCardNoGetRequestConfig: GroundMpApiMemberCardHoldFlushCardNoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_2,
    devUrl: devUrl_0_2_0_2,
    prodUrl: prodUrl_0_2_0_2,
    path: "/ground-mp-api/memberCardHold/flushCardNo",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_2,
    paramNames: [],
    queryNames: ["cardHoldId"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "groundMpApiMemberCardHoldFlushCardNoGet",
    extraInfo: {}
  };

/**
 * 接口 [刷新持卡信息的电子卡号↗](https://yapi.huianrong.com/project/1770/interface/api/72268) 的 **请求函数**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `GET /ground-mp-api/memberCardHold/flushCardNo`
 * @更新时间 `2023-03-06 11:20:26`
 */
export const groundMpApiMemberCardHoldFlushCardNoGet = /*#__PURE__*/ (
  requestData: GroundMpApiMemberCardHoldFlushCardNoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundMpApiMemberCardHoldFlushCardNoGetResponse>(
    prepare(groundMpApiMemberCardHoldFlushCardNoGetRequestConfig, requestData),
    ...args
  );
};

groundMpApiMemberCardHoldFlushCardNoGet.requestConfig =
  groundMpApiMemberCardHoldFlushCardNoGetRequestConfig;

const mockUrl_0_2_0_3 = "https://yapi.huianrong.com/mock/1770" as any;
const devUrl_0_2_0_3 = "http://192.168.50.12:9403" as any;
const prodUrl_0_2_0_3 = "https://cbd.t-cube.cn" as any;
const dataKey_0_2_0_3 = "data" as any;

/**
 * 接口 [列表(次卡\/年卡)↗](https://yapi.huianrong.com/project/1770/interface/api/72380) 的 **请求类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/list`
 * @更新时间 `2023-03-06 16:51:22`
 */
export interface GroundMpApiCardSaleListGetRequest {
  /**
   * 类型（1：期限卡、2：次卡）
   */
  type: string;
  /**
   * 项目id
   */
  projectId: string;
  /**
   * 当前记录起始索引（默认为1）
   */
  pageNum: string;
  /**
   * 每页显示记录数（默认为10）
   */
  pageSize: string;
}

/**
 * 接口 [列表(次卡\/年卡)↗](https://yapi.huianrong.com/project/1770/interface/api/72380) 的 **返回类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/list`
 * @更新时间 `2023-03-06 16:51:22`
 */
export interface GroundMpApiCardSaleListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 卡id
     */
    id?: number;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 卡名称
     */
    name?: string;
    /**
     * 售价（元）
     */
    salePrice?: string;
    /**
     * 卡说明
     */
    cardContent?: string;
    /**
     * 卡面设置1、颜色 2、自定义
     */
    cardFaceType?: number;
    /**
     * 卡面设置为1时，颜色的RGB字符值,2时，图片的地址
     */
    cardFaceColor?: string;
    /**
     * 默认logo图片
     */
    defaultLogoImg?: string;
    /**
     * 卡类型 1 次卡 2 年卡
     */
    cardType?: number;
  }[];
}

/**
 * 接口 [列表(次卡\/年卡)↗](https://yapi.huianrong.com/project/1770/interface/api/72380) 的 **请求配置的类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/list`
 * @更新时间 `2023-03-06 16:51:22`
 */
type GroundMpApiCardSaleListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1770",
    "http://192.168.50.12:9403",
    "https://cbd.t-cube.cn",
    "/ground-mp-api/card/sale/list",
    "data",
    string,
    "type" | "projectId" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [列表(次卡\/年卡)↗](https://yapi.huianrong.com/project/1770/interface/api/72380) 的 **请求配置**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/list`
 * @更新时间 `2023-03-06 16:51:22`
 */
const groundMpApiCardSaleListGetRequestConfig: GroundMpApiCardSaleListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_3,
    devUrl: devUrl_0_2_0_3,
    prodUrl: prodUrl_0_2_0_3,
    path: "/ground-mp-api/card/sale/list",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_3,
    paramNames: [],
    queryNames: ["type", "projectId", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "groundMpApiCardSaleListGet",
    extraInfo: {}
  };

/**
 * 接口 [列表(次卡\/年卡)↗](https://yapi.huianrong.com/project/1770/interface/api/72380) 的 **请求函数**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/list`
 * @更新时间 `2023-03-06 16:51:22`
 */
export const groundMpApiCardSaleListGet = /*#__PURE__*/ (
  requestData: GroundMpApiCardSaleListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundMpApiCardSaleListGetResponse>(
    prepare(groundMpApiCardSaleListGetRequestConfig, requestData),
    ...args
  );
};

groundMpApiCardSaleListGet.requestConfig =
  groundMpApiCardSaleListGetRequestConfig;

/**
 * 接口 [提交结算↗](https://yapi.huianrong.com/project/1770/interface/api/72398) 的 **请求类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit`
 * @更新时间 `2023-03-02 19:15:53`
 */
export interface GroundMpApiCardSaleSubmitPostRequest {
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 商铺id
   */
  storeId: number;
  /**
   * 店铺名字
   */
  storeName?: string;
  /**
   * 会员id
   */
  membersId: number;
  /**
   * 购卡人姓名
   */
  membersName?: string;
  /**
   * 会员号
   */
  membersCode?: string;
  /**
   * 购卡人手机号
   */
  membersPhone?: string;
  /**
   * 卡id
   */
  cardId: number;
  /**
   * 价格Id
   */
  priceId: number;
  /**
   * 卡名称
   */
  cardName?: string;
  /**
   * 卡类型 1:期限卡 2:次卡
   */
  cardType: number;
  /**
   * 激活方式 1购买激活 2第一次到店激活 3指定日期激活
   */
  activeType: number;
  /**
   * 激活时间 方式为指定激活时，该值就是设置的指定激活日期
   */
  activeTime?: string;
  /**
   * 销售人员编号
   */
  salesStaffId?: number;
  /**
   * 销售人员姓名
   */
  salesStaffName?: string;
  /**
   * 签单门店(操作人所属门店)
   */
  signStoreName: string;
  /**
   * 支付类别  1微信  2支付宝  3储值卡
   */
  payMethodType: number;
  /**
   * 储值卡id（仅支付方式为 3：储值卡时必填）
   */
  svcCardId?: number;
  /**
   * 收款金额(实收金额)
   */
  receivedAmount: number;
  /**
   * 应收金额
   */
  receivableAmount: number;
  /**
   * 购买渠道 1:线上 2:线下
   */
  purchaseChannel: number;
  /**
   * 合同备注
   */
  contractRemark?: string;
}

/**
 * 接口 [提交结算↗](https://yapi.huianrong.com/project/1770/interface/api/72398) 的 **返回类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit`
 * @更新时间 `2023-03-02 19:15:53`
 */
export interface GroundMpApiCardSaleSubmitPostResponse {
  /**
   * 订单id
   */
  orderId: number;
  /**
   * 订单编号(提交支付时传入此订单编号)
   */
  orderNo: string;
  /**
   * 支付透传参数(调用支付时将此参数传入 透传参数中)
   */
  req: {
    /**
     * 订单编号
     */
    orderId: number;
    /**
     * 物理卡号
     */
    physicalCardNo?: string;
  };
}

/**
 * 接口 [提交结算↗](https://yapi.huianrong.com/project/1770/interface/api/72398) 的 **请求配置的类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit`
 * @更新时间 `2023-03-02 19:15:53`
 */
type GroundMpApiCardSaleSubmitPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1770",
    "http://192.168.50.12:9403",
    "https://cbd.t-cube.cn",
    "/ground-mp-api/card/sale/submit",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [提交结算↗](https://yapi.huianrong.com/project/1770/interface/api/72398) 的 **请求配置**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit`
 * @更新时间 `2023-03-02 19:15:53`
 */
const groundMpApiCardSaleSubmitPostRequestConfig: GroundMpApiCardSaleSubmitPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_3,
    devUrl: devUrl_0_2_0_3,
    prodUrl: prodUrl_0_2_0_3,
    path: "/ground-mp-api/card/sale/submit",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_3,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "groundMpApiCardSaleSubmitPost",
    extraInfo: {}
  };

/**
 * 接口 [提交结算↗](https://yapi.huianrong.com/project/1770/interface/api/72398) 的 **请求函数**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit`
 * @更新时间 `2023-03-02 19:15:53`
 */
export const groundMpApiCardSaleSubmitPost = /*#__PURE__*/ (
  requestData: GroundMpApiCardSaleSubmitPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundMpApiCardSaleSubmitPostResponse>(
    prepare(groundMpApiCardSaleSubmitPostRequestConfig, requestData),
    ...args
  );
};

groundMpApiCardSaleSubmitPost.requestConfig =
  groundMpApiCardSaleSubmitPostRequestConfig;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1770/interface/api/72588) 的 **请求类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/info/{id}/{cardType}`
 * @更新时间 `2023-03-06 16:51:22`
 */
export interface GroundMpApiCardSaleInfoIdCardTypeGetRequest {
  /**
   * 卡id
   */
  id: string;
  cardType: string;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1770/interface/api/72588) 的 **返回类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/info/{id}/{cardType}`
 * @更新时间 `2023-03-06 16:51:22`
 */
export interface GroundMpApiCardSaleInfoIdCardTypeGetResponse {
  /**
   * 卡id
   */
  id: number;
  /**
   * 项目id
   */
  projectId?: number;
  /**
   * 项目名称
   */
  projectName: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName: string;
  /**
   * 卡名称
   */
  cardName: string;
  /**
   * 卡说明
   */
  cardContent: string;
  /**
   * 销售时间类型,1、不限时 2、限时
   */
  saleDateType: number;
  /**
   * 销售时间-开始
   */
  saleDateStart?: string;
  /**
   * 销售时间-结束
   */
  saleDateEnd?: string;
  /**
   * 售价信息
   */
  salePriceDataList?: {
    /**
     * 数据id
     */
    id?: number;
    /**
     * 标价(划线价)
     */
    listPrice?: number;
    /**
     * 售价
     */
    salePrice?: number;
    /**
     * 使用天数(限期卡)/使用次数(次卡)
     */
    useNums?: number;
    /**
     * 赠送天数(限期卡)/赠送次数(次卡)
     */
    giveNums?: number;
  }[];
  /**
   * 卡类型，1、限期卡 2、次卡
   */
  cardType?: number;
  /**
   * 使用场馆名称
   */
  venueName?: string;
  /**
   * 激活方式，1、购买激活 2、第一次到店激活 3、指定时间激活
   */
  activeMethod?: number;
  /**
   * 激活方式
   */
  activeMethodName?: string;
  /**
   * 使用时段，1、全时段 2、特定时段
   */
  admission?: number;
  /**
   * 入场时段
   */
  admissionName?: string;
  /**
   * 入场具体时段
   */
  admissionTimes?: {
    /**
     * 星期(1~7，星期一~星期日)
     */
    week?: number;
    /**
     * 星期一~星期日
     */
    weekChinese?: string;
    /**
     * 每一天的时刻表
     * 例 7~24 >> [7,24]
     */
    time?: number[];
  }[];
  /**
   * 有效期类型，1、不限制 2、xx天内有效
   */
  expirationMethod?: number;
  /**
   * 有效天数
   */
  expirationDay?: number;
  /**
   * 卡项列表信息
   */
  cardListRespDto?: {
    /**
     * 卡id
     */
    id?: number;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 卡名称
     */
    name?: string;
    /**
     * 售价（元）
     */
    salePrice?: string;
    /**
     * 卡说明
     */
    cardContent?: string;
    /**
     * 卡面设置1、颜色 2、自定义
     */
    cardFaceType?: number;
    /**
     * 卡面设置为1时，颜色的RGB字符值,2时，图片的地址
     */
    cardFaceColor?: string;
    /**
     * 默认logo图片
     */
    defaultLogoImg?: string;
    /**
     * 卡类型 1 次卡 2 年卡
     */
    cardType?: number;
  };
  /**
   * 默认logo图片
   */
  defaultLogoImg?: string;
  /**
   * 产品介绍
   */
  productDescription?: string;
  /**
   * 卡片说明
   */
  respDto?: {
    /**
     * 卡id
     */
    id?: number;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 卡名称
     */
    name?: string;
    /**
     * 售价（元）
     */
    salePrice?: string;
    /**
     * 卡说明
     */
    cardContent?: string;
    /**
     * 卡面设置1、颜色 2、自定义
     */
    cardFaceType?: number;
    /**
     * 卡面设置为1时，颜色的RGB字符值,2时，图片的地址
     */
    cardFaceColor?: string;
    /**
     * 默认logo图片
     */
    defaultLogoImg?: string;
    /**
     * 卡类型 1 次卡 2 年卡
     */
    cardType?: number;
  };
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1770/interface/api/72588) 的 **请求配置的类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/info/{id}/{cardType}`
 * @更新时间 `2023-03-06 16:51:22`
 */
type GroundMpApiCardSaleInfoIdCardTypeGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1770",
    "http://192.168.50.12:9403",
    "https://cbd.t-cube.cn",
    "/ground-mp-api/card/sale/info/{id}/{cardType}",
    "data",
    "id" | "cardType",
    string,
    false
  >
>;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1770/interface/api/72588) 的 **请求配置**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/info/{id}/{cardType}`
 * @更新时间 `2023-03-06 16:51:22`
 */
const groundMpApiCardSaleInfoIdCardTypeGetRequestConfig: GroundMpApiCardSaleInfoIdCardTypeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_3,
    devUrl: devUrl_0_2_0_3,
    prodUrl: prodUrl_0_2_0_3,
    path: "/ground-mp-api/card/sale/info/{id}/{cardType}",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_3,
    paramNames: ["id", "cardType"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "groundMpApiCardSaleInfoIdCardTypeGet",
    extraInfo: {}
  };

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1770/interface/api/72588) 的 **请求函数**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/info/{id}/{cardType}`
 * @更新时间 `2023-03-06 16:51:22`
 */
export const groundMpApiCardSaleInfoIdCardTypeGet = /*#__PURE__*/ (
  requestData: GroundMpApiCardSaleInfoIdCardTypeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundMpApiCardSaleInfoIdCardTypeGetResponse>(
    prepare(groundMpApiCardSaleInfoIdCardTypeGetRequestConfig, requestData),
    ...args
  );
};

groundMpApiCardSaleInfoIdCardTypeGet.requestConfig =
  groundMpApiCardSaleInfoIdCardTypeGetRequestConfig;

/**
 * 接口 [提交结算(微信下单)↗](https://yapi.huianrong.com/project/1770/interface/api/72636) 的 **请求类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit_wx_pay`
 * @更新时间 `2023-03-06 16:51:23`
 */
export interface GroundMpApiCardSaleSubmitWxPayPostRequest {
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 卡id
   */
  cardId: number;
  /**
   * 价格Id
   */
  priceId: number;
  /**
   * 卡名称
   */
  cardName?: string;
  /**
   * 卡类型 1:期限卡 2:次卡
   */
  cardType: number;
  /**
   * 激活方式 1购买激活 2第一次到店激活 3指定日期激活
   */
  activeType: number;
  /**
   * 激活时间 方式为指定激活时，该值就是设置的指定激活日期
   */
  activeTime?: string;
  /**
   * 支付类别  1微信  2支付宝  3储值卡
   */
  payMethodType: number;
  /**
   * 收款金额(实收金额)
   */
  receivedAmount: number;
  /**
   * 应收金额
   */
  receivableAmount: number;
  /**
   * 合同备注
   */
  contractRemark?: string;
  /**
   * 储值卡卡号(储值卡支付传此字段)
   */
  cardNo?: string;
}

/**
 * 接口 [提交结算(微信下单)↗](https://yapi.huianrong.com/project/1770/interface/api/72636) 的 **返回类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit_wx_pay`
 * @更新时间 `2023-03-06 16:51:23`
 */
export interface GroundMpApiCardSaleSubmitWxPayPostResponse {
  /**
   * 订单id
   */
  orderId?: number;
  /**
   * 订单编号
   */
  orderNo?: string;
  /**
   * 微信openId
   */
  openId?: string;
  /**
   * 支付金额
   */
  paymentAmount?: number;
  /**
   * 签名
   */
  sign?: string;
}

/**
 * 接口 [提交结算(微信下单)↗](https://yapi.huianrong.com/project/1770/interface/api/72636) 的 **请求配置的类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit_wx_pay`
 * @更新时间 `2023-03-06 16:51:23`
 */
type GroundMpApiCardSaleSubmitWxPayPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1770",
    "http://192.168.50.12:9403",
    "https://cbd.t-cube.cn",
    "/ground-mp-api/card/sale/submit_wx_pay",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [提交结算(微信下单)↗](https://yapi.huianrong.com/project/1770/interface/api/72636) 的 **请求配置**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit_wx_pay`
 * @更新时间 `2023-03-06 16:51:23`
 */
const groundMpApiCardSaleSubmitWxPayPostRequestConfig: GroundMpApiCardSaleSubmitWxPayPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_3,
    devUrl: devUrl_0_2_0_3,
    prodUrl: prodUrl_0_2_0_3,
    path: "/ground-mp-api/card/sale/submit_wx_pay",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_3,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "groundMpApiCardSaleSubmitWxPayPost",
    extraInfo: {}
  };

/**
 * 接口 [提交结算(微信下单)↗](https://yapi.huianrong.com/project/1770/interface/api/72636) 的 **请求函数**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit_wx_pay`
 * @更新时间 `2023-03-06 16:51:23`
 */
export const groundMpApiCardSaleSubmitWxPayPost = /*#__PURE__*/ (
  requestData: GroundMpApiCardSaleSubmitWxPayPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundMpApiCardSaleSubmitWxPayPostResponse>(
    prepare(groundMpApiCardSaleSubmitWxPayPostRequestConfig, requestData),
    ...args
  );
};

groundMpApiCardSaleSubmitWxPayPost.requestConfig =
  groundMpApiCardSaleSubmitWxPayPostRequestConfig;

/**
 * 接口 [提交结算(储值卡下单)↗](https://yapi.huianrong.com/project/1770/interface/api/72638) 的 **请求类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit_card_pay`
 * @更新时间 `2023-03-06 16:51:23`
 */
export interface GroundMpApiCardSaleSubmitCardPayPostRequest {
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 卡id
   */
  cardId: number;
  /**
   * 价格Id
   */
  priceId: number;
  /**
   * 卡名称
   */
  cardName?: string;
  /**
   * 卡类型 1:期限卡 2:次卡
   */
  cardType: number;
  /**
   * 激活方式 1购买激活 2第一次到店激活 3指定日期激活
   */
  activeType: number;
  /**
   * 激活时间 方式为指定激活时，该值就是设置的指定激活日期
   */
  activeTime?: string;
  /**
   * 支付类别  1微信  2支付宝  3储值卡
   */
  payMethodType: number;
  /**
   * 收款金额(实收金额)
   */
  receivedAmount: number;
  /**
   * 应收金额
   */
  receivableAmount: number;
  /**
   * 合同备注
   */
  contractRemark?: string;
  /**
   * 储值卡卡号(储值卡支付传此字段)
   */
  cardNo?: string;
}

/**
 * 接口 [提交结算(储值卡下单)↗](https://yapi.huianrong.com/project/1770/interface/api/72638) 的 **返回类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit_card_pay`
 * @更新时间 `2023-03-06 16:51:23`
 */
export interface GroundMpApiCardSaleSubmitCardPayPostResponse {
  /**
   * 订单id
   */
  orderId: number;
  /**
   * 订单编号
   */
  orderNo: string;
  /**
   * 支付金额
   */
  paymentAmount: number;
  /**
   * 卡号
   */
  cardNo: string;
  /**
   * 签名
   */
  sign?: string;
}

/**
 * 接口 [提交结算(储值卡下单)↗](https://yapi.huianrong.com/project/1770/interface/api/72638) 的 **请求配置的类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit_card_pay`
 * @更新时间 `2023-03-06 16:51:23`
 */
type GroundMpApiCardSaleSubmitCardPayPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1770",
    "http://192.168.50.12:9403",
    "https://cbd.t-cube.cn",
    "/ground-mp-api/card/sale/submit_card_pay",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [提交结算(储值卡下单)↗](https://yapi.huianrong.com/project/1770/interface/api/72638) 的 **请求配置**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit_card_pay`
 * @更新时间 `2023-03-06 16:51:23`
 */
const groundMpApiCardSaleSubmitCardPayPostRequestConfig: GroundMpApiCardSaleSubmitCardPayPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_3,
    devUrl: devUrl_0_2_0_3,
    prodUrl: prodUrl_0_2_0_3,
    path: "/ground-mp-api/card/sale/submit_card_pay",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_3,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "groundMpApiCardSaleSubmitCardPayPost",
    extraInfo: {}
  };

/**
 * 接口 [提交结算(储值卡下单)↗](https://yapi.huianrong.com/project/1770/interface/api/72638) 的 **请求函数**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/submit_card_pay`
 * @更新时间 `2023-03-06 16:51:23`
 */
export const groundMpApiCardSaleSubmitCardPayPost = /*#__PURE__*/ (
  requestData: GroundMpApiCardSaleSubmitCardPayPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundMpApiCardSaleSubmitCardPayPostResponse>(
    prepare(groundMpApiCardSaleSubmitCardPayPostRequestConfig, requestData),
    ...args
  );
};

groundMpApiCardSaleSubmitCardPayPost.requestConfig =
  groundMpApiCardSaleSubmitCardPayPostRequestConfig;

/**
 * 接口 [交易完成通知(支付模块回调)↗](https://yapi.huianrong.com/project/1770/interface/api/72640) 的 **请求类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/notify_success`
 * @更新时间 `2023-03-03 17:31:49`
 */
export interface GroundMpApiCardSaleNotifySuccessPostRequest {
  /**
   * 订单编号
   */
  orderId: number;
  /**
   * 支付编号
   */
  payCode: string;
}

/**
 * 接口 [交易完成通知(支付模块回调)↗](https://yapi.huianrong.com/project/1770/interface/api/72640) 的 **返回类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/notify_success`
 * @更新时间 `2023-03-03 17:31:49`
 */
export interface GroundMpApiCardSaleNotifySuccessPostResponse {}

/**
 * 接口 [交易完成通知(支付模块回调)↗](https://yapi.huianrong.com/project/1770/interface/api/72640) 的 **请求配置的类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/notify_success`
 * @更新时间 `2023-03-03 17:31:49`
 */
type GroundMpApiCardSaleNotifySuccessPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1770",
    "http://192.168.50.12:9403",
    "https://cbd.t-cube.cn",
    "/ground-mp-api/card/sale/notify_success",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [交易完成通知(支付模块回调)↗](https://yapi.huianrong.com/project/1770/interface/api/72640) 的 **请求配置**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/notify_success`
 * @更新时间 `2023-03-03 17:31:49`
 */
const groundMpApiCardSaleNotifySuccessPostRequestConfig: GroundMpApiCardSaleNotifySuccessPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_3,
    devUrl: devUrl_0_2_0_3,
    prodUrl: prodUrl_0_2_0_3,
    path: "/ground-mp-api/card/sale/notify_success",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_3,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "groundMpApiCardSaleNotifySuccessPost",
    extraInfo: {}
  };

/**
 * 接口 [交易完成通知(支付模块回调)↗](https://yapi.huianrong.com/project/1770/interface/api/72640) 的 **请求函数**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/notify_success`
 * @更新时间 `2023-03-03 17:31:49`
 */
export const groundMpApiCardSaleNotifySuccessPost = /*#__PURE__*/ (
  requestData: GroundMpApiCardSaleNotifySuccessPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundMpApiCardSaleNotifySuccessPostResponse>(
    prepare(groundMpApiCardSaleNotifySuccessPostRequestConfig, requestData),
    ...args
  );
};

groundMpApiCardSaleNotifySuccessPost.requestConfig =
  groundMpApiCardSaleNotifySuccessPostRequestConfig;

/**
 * 接口 [获取支付结果↗](https://yapi.huianrong.com/project/1770/interface/api/72692) 的 **请求类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/get_pay_status`
 * @更新时间 `2023-03-06 16:51:24`
 */
export interface GroundMpApiCardSaleGetPayStatusGetRequest {
  orderNo: string;
}

/**
 * 接口 [获取支付结果↗](https://yapi.huianrong.com/project/1770/interface/api/72692) 的 **返回类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/get_pay_status`
 * @更新时间 `2023-03-06 16:51:24`
 */
export interface GroundMpApiCardSaleGetPayStatusGetResponse {}

/**
 * 接口 [获取支付结果↗](https://yapi.huianrong.com/project/1770/interface/api/72692) 的 **请求配置的类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/get_pay_status`
 * @更新时间 `2023-03-06 16:51:24`
 */
type GroundMpApiCardSaleGetPayStatusGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1770",
    "http://192.168.50.12:9403",
    "https://cbd.t-cube.cn",
    "/ground-mp-api/card/sale/get_pay_status",
    "data",
    string,
    "orderNo",
    false
  >
>;

/**
 * 接口 [获取支付结果↗](https://yapi.huianrong.com/project/1770/interface/api/72692) 的 **请求配置**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/get_pay_status`
 * @更新时间 `2023-03-06 16:51:24`
 */
const groundMpApiCardSaleGetPayStatusGetRequestConfig: GroundMpApiCardSaleGetPayStatusGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_3,
    devUrl: devUrl_0_2_0_3,
    prodUrl: prodUrl_0_2_0_3,
    path: "/ground-mp-api/card/sale/get_pay_status",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_3,
    paramNames: [],
    queryNames: ["orderNo"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "groundMpApiCardSaleGetPayStatusGet",
    extraInfo: {}
  };

/**
 * 接口 [获取支付结果↗](https://yapi.huianrong.com/project/1770/interface/api/72692) 的 **请求函数**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `GET /ground-mp-api/card/sale/get_pay_status`
 * @更新时间 `2023-03-06 16:51:24`
 */
export const groundMpApiCardSaleGetPayStatusGet = /*#__PURE__*/ (
  requestData: GroundMpApiCardSaleGetPayStatusGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundMpApiCardSaleGetPayStatusGetResponse>(
    prepare(groundMpApiCardSaleGetPayStatusGetRequestConfig, requestData),
    ...args
  );
};

groundMpApiCardSaleGetPayStatusGet.requestConfig =
  groundMpApiCardSaleGetPayStatusGetRequestConfig;

/**
 * 接口 [列表(储值卡)↗](https://yapi.huianrong.com/project/1770/interface/api/72706) 的 **请求类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/get_member_card_list`
 * @更新时间 `2023-03-06 16:51:23`
 */
export interface GroundMpApiCardSaleGetMemberCardListPostRequest {
  /**
   * 会员编号
   */
  memberCode?: string;
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 卡名字
   */
  cardName?: string;
  /**
   * 消费店铺编号
   */
  storeCode?: string;
  /**
   * 场地编号
   */
  spuCode?: string;
}

/**
 * 接口 [列表(储值卡)↗](https://yapi.huianrong.com/project/1770/interface/api/72706) 的 **返回类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/get_member_card_list`
 * @更新时间 `2023-03-06 16:51:23`
 */
export type GroundMpApiCardSaleGetMemberCardListPostResponse = {
  /**
   * 储值卡名字
   */
  cardName: string;
  /**
   * 储值卡code
   */
  cardCode: string;
  /**
   * 电子卡商场logo
   */
  marketLogoUrl: string;
  /**
   * 电子卡背景
   */
  cardBackUrl: string;
  /**
   * 卡详情
   */
  cardDetail?: string;
  /**
   * 项目名字
   */
  projectName?: string;
}[];

/**
 * 接口 [列表(储值卡)↗](https://yapi.huianrong.com/project/1770/interface/api/72706) 的 **请求配置的类型**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/get_member_card_list`
 * @更新时间 `2023-03-06 16:51:23`
 */
type GroundMpApiCardSaleGetMemberCardListPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1770",
    "http://192.168.50.12:9403",
    "https://cbd.t-cube.cn",
    "/ground-mp-api/card/sale/get_member_card_list",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [列表(储值卡)↗](https://yapi.huianrong.com/project/1770/interface/api/72706) 的 **请求配置**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/get_member_card_list`
 * @更新时间 `2023-03-06 16:51:23`
 */
const groundMpApiCardSaleGetMemberCardListPostRequestConfig: GroundMpApiCardSaleGetMemberCardListPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_3,
    devUrl: devUrl_0_2_0_3,
    prodUrl: prodUrl_0_2_0_3,
    path: "/ground-mp-api/card/sale/get_member_card_list",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_3,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "groundMpApiCardSaleGetMemberCardListPost",
    extraInfo: {}
  };

/**
 * 接口 [列表(储值卡)↗](https://yapi.huianrong.com/project/1770/interface/api/72706) 的 **请求函数**
 *
 * @分类 [期限卡/次卡卡项↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23183)
 * @请求头 `POST /ground-mp-api/card/sale/get_member_card_list`
 * @更新时间 `2023-03-06 16:51:23`
 */
export const groundMpApiCardSaleGetMemberCardListPost = /*#__PURE__*/ (
  requestData: GroundMpApiCardSaleGetMemberCardListPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundMpApiCardSaleGetMemberCardListPostResponse>(
    prepare(groundMpApiCardSaleGetMemberCardListPostRequestConfig, requestData),
    ...args
  );
};

groundMpApiCardSaleGetMemberCardListPost.requestConfig =
  groundMpApiCardSaleGetMemberCardListPostRequestConfig;

/* prettier-ignore-end */
