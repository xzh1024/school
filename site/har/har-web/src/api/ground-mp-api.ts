/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
// prettier-ignore
import { QueryStringArrayFormat, Method, RequestBodyType, ResponseBodyType, FileData, prepare } from 'yapi-to-typescript'
// @ts-ignore
// prettier-ignore
import type { RequestConfig, RequestFunctionRestArgs } from 'yapi-to-typescript'
// @ts-ignore
import request from './request';

type UserRequestRestArgs = RequestFunctionRestArgs<typeof request>;

// Request: 目前 React Hooks 功能有用到
export type Request<
  TRequestData,
  TRequestConfig extends RequestConfig,
  TRequestResult
> = (TRequestConfig['requestDataOptional'] extends true
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

const mockUrl_0_4_0_1 = 'https://yapi.huianrong.com/mock/1770' as any;
const devUrl_0_4_0_1 = '' as any;
const prodUrl_0_4_0_1 = '' as any;
const dataKey_0_4_0_1 = 'data' as any;

/**
 * 接口 [核销记录查询↗](https://yapi.huianrong.com/project/1770/interface/api/72182) 的 **请求类型**
 *
 * @分类 [限期卡/次卡核销记录↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23119)
 * @请求头 `GET /ground-mp-api/cardVerificationRecord/listByOrderId`
 * @更新时间 `2023-02-21 13:50:22`
 */
export interface GroundMpApiCardVerificationRecordListByOrderIdGetRequest {
  /**
   * 订单id/卡号
   */
  orderId?: string;
  /**
   * 当前记录起始索引（默认为1）
   */
  pageNum?: string;
  /**
   * 每页显示记录数（默认为10）
   */
  pageSize?: string;
}

/**
 * 接口 [核销记录查询↗](https://yapi.huianrong.com/project/1770/interface/api/72182) 的 **返回类型**
 *
 * @分类 [限期卡/次卡核销记录↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23119)
 * @请求头 `GET /ground-mp-api/cardVerificationRecord/listByOrderId`
 * @更新时间 `2023-02-21 13:50:22`
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
 * @更新时间 `2023-02-21 13:50:22`
 */
type GroundMpApiCardVerificationRecordListByOrderIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1770',
    '',
    '',
    '/ground-mp-api/cardVerificationRecord/listByOrderId',
    'data',
    string,
    'orderId' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [核销记录查询↗](https://yapi.huianrong.com/project/1770/interface/api/72182) 的 **请求配置**
 *
 * @分类 [限期卡/次卡核销记录↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23119)
 * @请求头 `GET /ground-mp-api/cardVerificationRecord/listByOrderId`
 * @更新时间 `2023-02-21 13:50:22`
 */
const groundMpApiCardVerificationRecordListByOrderIdGetRequestConfig: GroundMpApiCardVerificationRecordListByOrderIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_1,
    devUrl: devUrl_0_4_0_1,
    prodUrl: prodUrl_0_4_0_1,
    path: '/ground-mp-api/cardVerificationRecord/listByOrderId',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_1,
    paramNames: [],
    queryNames: ['orderId', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundMpApiCardVerificationRecordListByOrderIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [核销记录查询↗](https://yapi.huianrong.com/project/1770/interface/api/72182) 的 **请求函数**
 *
 * @分类 [限期卡/次卡核销记录↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23119)
 * @请求头 `GET /ground-mp-api/cardVerificationRecord/listByOrderId`
 * @更新时间 `2023-02-21 13:50:22`
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

const mockUrl_0_4_0_2 = 'https://yapi.huianrong.com/mock/1770' as any;
const devUrl_0_4_0_2 = '' as any;
const prodUrl_0_4_0_2 = '' as any;
const dataKey_0_4_0_2 = 'data' as any;

/**
 * 接口 [根据会员id查询持有卡列表↗](https://yapi.huianrong.com/project/1770/interface/api/72184) 的 **请求类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `POST /ground-mp-api/memberCardHold/listCardHold`
 * @更新时间 `2023-02-22 16:50:17`
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
   * 会员id
   */
  memberId: number;
}

/**
 * 接口 [根据会员id查询持有卡列表↗](https://yapi.huianrong.com/project/1770/interface/api/72184) 的 **返回类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `POST /ground-mp-api/memberCardHold/listCardHold`
 * @更新时间 `2023-02-22 16:50:17`
 */
export type GroundMpApiMemberCardHoldListCardHoldPostResponse = {
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
}[];

/**
 * 接口 [根据会员id查询持有卡列表↗](https://yapi.huianrong.com/project/1770/interface/api/72184) 的 **请求配置的类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `POST /ground-mp-api/memberCardHold/listCardHold`
 * @更新时间 `2023-02-22 16:50:17`
 */
type GroundMpApiMemberCardHoldListCardHoldPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1770',
    '',
    '',
    '/ground-mp-api/memberCardHold/listCardHold',
    'data',
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
 * @更新时间 `2023-02-22 16:50:17`
 */
const groundMpApiMemberCardHoldListCardHoldPostRequestConfig: GroundMpApiMemberCardHoldListCardHoldPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_2,
    devUrl: devUrl_0_4_0_2,
    prodUrl: prodUrl_0_4_0_2,
    path: '/ground-mp-api/memberCardHold/listCardHold',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_2,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundMpApiMemberCardHoldListCardHoldPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [根据会员id查询持有卡列表↗](https://yapi.huianrong.com/project/1770/interface/api/72184) 的 **请求函数**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `POST /ground-mp-api/memberCardHold/listCardHold`
 * @更新时间 `2023-02-22 16:50:17`
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
 * @更新时间 `2023-02-22 16:50:17`
 */
export interface GroundMpApiMemberCardHoldCardHoldInfoGetRequest {
  cardHoldId?: string;
}

/**
 * 接口 [根据持有卡id查询持有卡详细信息↗](https://yapi.huianrong.com/project/1770/interface/api/72186) 的 **返回类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `GET /ground-mp-api/memberCardHold/cardHoldInfo`
 * @更新时间 `2023-02-22 16:50:17`
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
   * 产品介绍
   */
  productDescription?: string;
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
   * 卡说明
   */
  cardContent?: string;
}

/**
 * 接口 [根据持有卡id查询持有卡详细信息↗](https://yapi.huianrong.com/project/1770/interface/api/72186) 的 **请求配置的类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `GET /ground-mp-api/memberCardHold/cardHoldInfo`
 * @更新时间 `2023-02-22 16:50:17`
 */
type GroundMpApiMemberCardHoldCardHoldInfoGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1770',
    '',
    '',
    '/ground-mp-api/memberCardHold/cardHoldInfo',
    'data',
    string,
    'cardHoldId',
    false
  >
>;

/**
 * 接口 [根据持有卡id查询持有卡详细信息↗](https://yapi.huianrong.com/project/1770/interface/api/72186) 的 **请求配置**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `GET /ground-mp-api/memberCardHold/cardHoldInfo`
 * @更新时间 `2023-02-22 16:50:17`
 */
const groundMpApiMemberCardHoldCardHoldInfoGetRequestConfig: GroundMpApiMemberCardHoldCardHoldInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_2,
    devUrl: devUrl_0_4_0_2,
    prodUrl: prodUrl_0_4_0_2,
    path: '/ground-mp-api/memberCardHold/cardHoldInfo',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_2,
    paramNames: [],
    queryNames: ['cardHoldId'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundMpApiMemberCardHoldCardHoldInfoGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [根据持有卡id查询持有卡详细信息↗](https://yapi.huianrong.com/project/1770/interface/api/72186) 的 **请求函数**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1770/interface/api/cat_23121)
 * @请求头 `GET /ground-mp-api/memberCardHold/cardHoldInfo`
 * @更新时间 `2023-02-22 16:50:17`
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

/* prettier-ignore-end */
