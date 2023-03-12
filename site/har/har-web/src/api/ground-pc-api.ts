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

const mockUrl_0_2_0_0 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_0 = '' as any;
const prodUrl_0_2_0_0 = '' as any;
const dataKey_0_2_0_0 = 'data' as any;

/**
 * 接口 [根据店铺id查询店铺下的员工列表↗](https://yapi.huianrong.com/project/1764/interface/api/72220) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23059)
 * @请求头 `GET /ground-pc-api/merchantEmployee/listByStoreId`
 * @更新时间 `2023-03-01 15:03:18`
 */
export interface GroundPcApiMerchantEmployeeListByStoreIdGetRequest {
  storeId?: string;
}

/**
 * 接口 [根据店铺id查询店铺下的员工列表↗](https://yapi.huianrong.com/project/1764/interface/api/72220) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23059)
 * @请求头 `GET /ground-pc-api/merchantEmployee/listByStoreId`
 * @更新时间 `2023-03-01 15:03:18`
 */
export type GroundPcApiMerchantEmployeeListByStoreIdGetResponse = {
  /**
   * 自增id
   */
  id?: number;
  /**
   * 用户中心唯一id
   */
  userCode?: string;
  /**
   * 系统表用户id
   */
  userId?: number;
  /**
   * 姓名
   */
  realName?: string;
}[];

/**
 * 接口 [根据店铺id查询店铺下的员工列表↗](https://yapi.huianrong.com/project/1764/interface/api/72220) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23059)
 * @请求头 `GET /ground-pc-api/merchantEmployee/listByStoreId`
 * @更新时间 `2023-03-01 15:03:18`
 */
type GroundPcApiMerchantEmployeeListByStoreIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/merchantEmployee/listByStoreId',
    'data',
    string,
    'storeId',
    false
  >
>;

/**
 * 接口 [根据店铺id查询店铺下的员工列表↗](https://yapi.huianrong.com/project/1764/interface/api/72220) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23059)
 * @请求头 `GET /ground-pc-api/merchantEmployee/listByStoreId`
 * @更新时间 `2023-03-01 15:03:18`
 */
const groundPcApiMerchantEmployeeListByStoreIdGetRequestConfig: GroundPcApiMerchantEmployeeListByStoreIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_0,
    devUrl: devUrl_0_2_0_0,
    prodUrl: prodUrl_0_2_0_0,
    path: '/ground-pc-api/merchantEmployee/listByStoreId',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_0,
    paramNames: [],
    queryNames: ['storeId'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMerchantEmployeeListByStoreIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [根据店铺id查询店铺下的员工列表↗](https://yapi.huianrong.com/project/1764/interface/api/72220) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23059)
 * @请求头 `GET /ground-pc-api/merchantEmployee/listByStoreId`
 * @更新时间 `2023-03-01 15:03:18`
 */
export const groundPcApiMerchantEmployeeListByStoreIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiMerchantEmployeeListByStoreIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMerchantEmployeeListByStoreIdGetResponse>(
    prepare(
      groundPcApiMerchantEmployeeListByStoreIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiMerchantEmployeeListByStoreIdGet.requestConfig =
  groundPcApiMerchantEmployeeListByStoreIdGetRequestConfig;

const mockUrl_0_2_0_1 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_1 = '' as any;
const prodUrl_0_2_0_1 = '' as any;
const dataKey_0_2_0_1 = 'data' as any;

/**
 * 接口 [保存到访记录↗](https://yapi.huianrong.com/project/1764/interface/api/72100) 的 **请求类型**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `POST /ground-pc-api/visitRecord/add`
 * @更新时间 `2023-02-16 17:58:56`
 */
export interface GroundPcApiVisitRecordAddPostRequest {
  /**
   * 集团客户id
   */
  clientId?: number;
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 店铺id
   */
  storeId: number;
  /**
   * 到访类型, 0 : 临时到访，1 : 预约到访
   */
  visitType: number;
  /**
   * 会员id
   */
  memberId: number;
  /**
   * 接待人员id/员工id
   */
  merchantEmployeeId: number;
  /**
   * 预约时间, 到访类型为预约到访时必填
   */
  visitTime?: string;
}

/**
 * 接口 [保存到访记录↗](https://yapi.huianrong.com/project/1764/interface/api/72100) 的 **返回类型**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `POST /ground-pc-api/visitRecord/add`
 * @更新时间 `2023-02-16 17:58:56`
 */
export interface GroundPcApiVisitRecordAddPostResponse {}

/**
 * 接口 [保存到访记录↗](https://yapi.huianrong.com/project/1764/interface/api/72100) 的 **请求配置的类型**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `POST /ground-pc-api/visitRecord/add`
 * @更新时间 `2023-02-16 17:58:56`
 */
type GroundPcApiVisitRecordAddPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/visitRecord/add',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [保存到访记录↗](https://yapi.huianrong.com/project/1764/interface/api/72100) 的 **请求配置**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `POST /ground-pc-api/visitRecord/add`
 * @更新时间 `2023-02-16 17:58:56`
 */
const groundPcApiVisitRecordAddPostRequestConfig: GroundPcApiVisitRecordAddPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_1,
    devUrl: devUrl_0_2_0_1,
    prodUrl: prodUrl_0_2_0_1,
    path: '/ground-pc-api/visitRecord/add',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVisitRecordAddPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [保存到访记录↗](https://yapi.huianrong.com/project/1764/interface/api/72100) 的 **请求函数**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `POST /ground-pc-api/visitRecord/add`
 * @更新时间 `2023-02-16 17:58:56`
 */
export const groundPcApiVisitRecordAddPost = /*#__PURE__*/ (
  requestData: GroundPcApiVisitRecordAddPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVisitRecordAddPostResponse>(
    prepare(groundPcApiVisitRecordAddPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiVisitRecordAddPost.requestConfig =
  groundPcApiVisitRecordAddPostRequestConfig;

/**
 * 接口 [查询预约时间↗](https://yapi.huianrong.com/project/1764/interface/api/72102) 的 **请求类型**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `GET /ground-pc-api/visitRecord/findAppointmentTime`
 * @更新时间 `2023-02-16 17:59:10`
 */
export interface GroundPcApiVisitRecordFindAppointmentTimeGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 会员id
   */
  memberId?: string;
}

/**
 * 接口 [查询预约时间↗](https://yapi.huianrong.com/project/1764/interface/api/72102) 的 **返回类型**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `GET /ground-pc-api/visitRecord/findAppointmentTime`
 * @更新时间 `2023-02-16 17:59:10`
 */
export type GroundPcApiVisitRecordFindAppointmentTimeGetResponse = {
  id?: number;
  /**
   * 集团客户id
   */
  clientId?: number;
  /**
   * 项目id
   */
  projectId?: number;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 到访类型, 0 : 临时到访，1 : 预约到访
   */
  visitType?: number;
  /**
   * 会员id
   */
  memberId?: number;
  /**
   * 接待人员id/员工id
   */
  merchantEmployeeId?: number;
  /**
   * 预约时间
   */
  visitTime?: string;
  /**
   * 预约状态,1 : 已核销，0 : 未核销
   */
  visitStatus?: number;
  /**
   * 核销时间
   */
  verificationTime?: string;
  /**
   * 删除状态:0否 1是
   */
  deleted?: number;
  /**
   * 创建者
   */
  createBy?: string;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 更新者
   */
  updateBy?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
  /**
   * 备注
   */
  remark?: string;
}[];

/**
 * 接口 [查询预约时间↗](https://yapi.huianrong.com/project/1764/interface/api/72102) 的 **请求配置的类型**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `GET /ground-pc-api/visitRecord/findAppointmentTime`
 * @更新时间 `2023-02-16 17:59:10`
 */
type GroundPcApiVisitRecordFindAppointmentTimeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/visitRecord/findAppointmentTime',
    'data',
    string,
    'projectId' | 'storeId' | 'memberId',
    false
  >
>;

/**
 * 接口 [查询预约时间↗](https://yapi.huianrong.com/project/1764/interface/api/72102) 的 **请求配置**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `GET /ground-pc-api/visitRecord/findAppointmentTime`
 * @更新时间 `2023-02-16 17:59:10`
 */
const groundPcApiVisitRecordFindAppointmentTimeGetRequestConfig: GroundPcApiVisitRecordFindAppointmentTimeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_1,
    devUrl: devUrl_0_2_0_1,
    prodUrl: prodUrl_0_2_0_1,
    path: '/ground-pc-api/visitRecord/findAppointmentTime',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_1,
    paramNames: [],
    queryNames: ['projectId', 'storeId', 'memberId'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVisitRecordFindAppointmentTimeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [查询预约时间↗](https://yapi.huianrong.com/project/1764/interface/api/72102) 的 **请求函数**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `GET /ground-pc-api/visitRecord/findAppointmentTime`
 * @更新时间 `2023-02-16 17:59:10`
 */
export const groundPcApiVisitRecordFindAppointmentTimeGet = /*#__PURE__*/ (
  requestData: GroundPcApiVisitRecordFindAppointmentTimeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVisitRecordFindAppointmentTimeGetResponse>(
    prepare(
      groundPcApiVisitRecordFindAppointmentTimeGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiVisitRecordFindAppointmentTimeGet.requestConfig =
  groundPcApiVisitRecordFindAppointmentTimeGetRequestConfig;

/**
 * 接口 [核销到访记录↗](https://yapi.huianrong.com/project/1764/interface/api/72104) 的 **请求类型**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `GET /ground-pc-api/visitRecord/visitVerification`
 * @更新时间 `2023-02-16 17:59:18`
 */
export interface GroundPcApiVisitRecordVisitVerificationGetRequest {
  visitRecordId?: string;
}

/**
 * 接口 [核销到访记录↗](https://yapi.huianrong.com/project/1764/interface/api/72104) 的 **返回类型**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `GET /ground-pc-api/visitRecord/visitVerification`
 * @更新时间 `2023-02-16 17:59:18`
 */
export interface GroundPcApiVisitRecordVisitVerificationGetResponse {}

/**
 * 接口 [核销到访记录↗](https://yapi.huianrong.com/project/1764/interface/api/72104) 的 **请求配置的类型**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `GET /ground-pc-api/visitRecord/visitVerification`
 * @更新时间 `2023-02-16 17:59:18`
 */
type GroundPcApiVisitRecordVisitVerificationGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/visitRecord/visitVerification',
    'data',
    string,
    'visitRecordId',
    false
  >
>;

/**
 * 接口 [核销到访记录↗](https://yapi.huianrong.com/project/1764/interface/api/72104) 的 **请求配置**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `GET /ground-pc-api/visitRecord/visitVerification`
 * @更新时间 `2023-02-16 17:59:18`
 */
const groundPcApiVisitRecordVisitVerificationGetRequestConfig: GroundPcApiVisitRecordVisitVerificationGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_1,
    devUrl: devUrl_0_2_0_1,
    prodUrl: prodUrl_0_2_0_1,
    path: '/ground-pc-api/visitRecord/visitVerification',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_1,
    paramNames: [],
    queryNames: ['visitRecordId'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVisitRecordVisitVerificationGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [核销到访记录↗](https://yapi.huianrong.com/project/1764/interface/api/72104) 的 **请求函数**
 *
 * @分类 [到访记录接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23063)
 * @请求头 `GET /ground-pc-api/visitRecord/visitVerification`
 * @更新时间 `2023-02-16 17:59:18`
 */
export const groundPcApiVisitRecordVisitVerificationGet = /*#__PURE__*/ (
  requestData: GroundPcApiVisitRecordVisitVerificationGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVisitRecordVisitVerificationGetResponse>(
    prepare(
      groundPcApiVisitRecordVisitVerificationGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiVisitRecordVisitVerificationGet.requestConfig =
  groundPcApiVisitRecordVisitVerificationGetRequestConfig;

const mockUrl_0_2_0_2 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_2 = '' as any;
const prodUrl_0_2_0_2 = '' as any;
const dataKey_0_2_0_2 = 'data' as any;

/**
 * 接口 [下拉列表↗](https://yapi.huianrong.com/project/1764/interface/api/72106) 的 **请求类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/drop-list`
 * @更新时间 `2023-03-04 18:53:21`
 */
export interface GroundPcApiCardBaseDropListGetRequest {
  /**
   * SALE_CHANNEL 发布渠道, SHELF_STATUS 上架状态, SALE_STATUS 售卖状态
   */
  type?: string;
}

/**
 * 接口 [下拉列表↗](https://yapi.huianrong.com/project/1764/interface/api/72106) 的 **返回类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/drop-list`
 * @更新时间 `2023-03-04 18:53:21`
 */
export type GroundPcApiCardBaseDropListGetResponse = {
  value?: number;
  label?: string;
}[];

/**
 * 接口 [下拉列表↗](https://yapi.huianrong.com/project/1764/interface/api/72106) 的 **请求配置的类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/drop-list`
 * @更新时间 `2023-03-04 18:53:21`
 */
type GroundPcApiCardBaseDropListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-base/drop-list',
    'data',
    string,
    'type',
    false
  >
>;

/**
 * 接口 [下拉列表↗](https://yapi.huianrong.com/project/1764/interface/api/72106) 的 **请求配置**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/drop-list`
 * @更新时间 `2023-03-04 18:53:21`
 */
const groundPcApiCardBaseDropListGetRequestConfig: GroundPcApiCardBaseDropListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_2,
    devUrl: devUrl_0_2_0_2,
    prodUrl: prodUrl_0_2_0_2,
    path: '/ground-pc-api/card-base/drop-list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_2,
    paramNames: [],
    queryNames: ['type'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardBaseDropListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [下拉列表↗](https://yapi.huianrong.com/project/1764/interface/api/72106) 的 **请求函数**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/drop-list`
 * @更新时间 `2023-03-04 18:53:21`
 */
export const groundPcApiCardBaseDropListGet = /*#__PURE__*/ (
  requestData: GroundPcApiCardBaseDropListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardBaseDropListGetResponse>(
    prepare(groundPcApiCardBaseDropListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardBaseDropListGet.requestConfig =
  groundPcApiCardBaseDropListGetRequestConfig;

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72108) 的 **请求类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/page-list`
 * @更新时间 `2023-02-25 15:14:42`
 */
export interface GroundPcApiCardBasePageListGetRequest {
  /**
   * 卡类型，1、限期卡2、次卡
   */
  cardType?: string;
  /**
   * 选择的项目的id
   */
  projectId?: string;
  /**
   * 选择的店铺的id
   */
  storeId?: string;
  /**
   * 发布渠道，1、线下 2、线上 3、线上线下
   */
  saleChannel?: string;
  /**
   * 上架状态1、已上架2、已下架3、未上架
   */
  shelveStatus?: string;
  /**
   * 销售状态，0、停售1、可售
   */
  saleStatus?: string;
  /**
   * 选择的场馆的id
   */
  venuesId?: string;
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
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72108) 的 **返回类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/page-list`
 * @更新时间 `2023-02-25 15:14:42`
 */
export interface GroundPcApiCardBasePageListGetResponse {
  list?: {
    /**
     * id
     */
    id?: number;
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
    name?: string;
    /**
     * 次卡的次数
     */
    limitTimes?: string;
    /**
     * 有效期
     */
    expirationDate?: string;
    /**
     * 场馆范围
     */
    venuesArea?: string;
    /**
     * 售价
     */
    salePrice?: string;
    /**
     * 上架状态
     */
    shelfStatusName?: string;
    /**
     * 售卖状态
     */
    saleStatusName?: string;
    /**
     * 发布渠道
     */
    saleChannelName?: string;
  }[];
  total?: number;
}

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72108) 的 **请求配置的类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/page-list`
 * @更新时间 `2023-02-25 15:14:42`
 */
type GroundPcApiCardBasePageListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-base/page-list',
    'data',
    string,
    | 'cardType'
    | 'projectId'
    | 'storeId'
    | 'saleChannel'
    | 'shelveStatus'
    | 'saleStatus'
    | 'venuesId'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72108) 的 **请求配置**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/page-list`
 * @更新时间 `2023-02-25 15:14:42`
 */
const groundPcApiCardBasePageListGetRequestConfig: GroundPcApiCardBasePageListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_2,
    devUrl: devUrl_0_2_0_2,
    prodUrl: prodUrl_0_2_0_2,
    path: '/ground-pc-api/card-base/page-list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_2,
    paramNames: [],
    queryNames: [
      'cardType',
      'projectId',
      'storeId',
      'saleChannel',
      'shelveStatus',
      'saleStatus',
      'venuesId',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardBasePageListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72108) 的 **请求函数**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/page-list`
 * @更新时间 `2023-02-25 15:14:42`
 */
export const groundPcApiCardBasePageListGet = /*#__PURE__*/ (
  requestData: GroundPcApiCardBasePageListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardBasePageListGetResponse>(
    prepare(groundPcApiCardBasePageListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardBasePageListGet.requestConfig =
  groundPcApiCardBasePageListGetRequestConfig;

/**
 * 接口 [查看详情↗](https://yapi.huianrong.com/project/1764/interface/api/72110) 的 **请求类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/detail`
 * @更新时间 `2023-03-04 18:53:22`
 */
export interface GroundPcApiCardBaseDetailGetRequest {
  /**
   * 主键id
   */
  id?: string;
  cardType?: string;
}

/**
 * 接口 [查看详情↗](https://yapi.huianrong.com/project/1764/interface/api/72110) 的 **返回类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/detail`
 * @更新时间 `2023-03-04 18:53:22`
 */
export interface GroundPcApiCardBaseDetailGetResponse {
  /**
   * 卡id
   */
  id?: number;
  /**
   * 卡类型，1、限期卡2、次卡
   */
  cardType?: number;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 项目id
   */
  projectId?: number;
  /**
   * 店铺
   */
  stores?: number[];
  /**
   * 卡名称
   */
  name?: string;
  /**
   * 卡介绍
   */
  productDescription?: string;
  /**
   * 上架状态
   */
  shelfStatusName?: string;
  /**
   * 售卖状态
   */
  saleStatus?: string;
  /**
   * 售卖状态名
   */
  saleStatusName?: string;
  /**
   * 已售张数
   */
  saleCount?: number;
  /**
   * 限期卡为，已售卖的总天数(包括赠送的天数)
   * 次卡为，已售卖的总次数(包括赠送的次数)
   */
  daysOrTimes?: number;
  /**
   * 已售卖的价格合计
   */
  totalPrice?: string;
  /**
   * 卡面设置1、颜色 2、自定义
   */
  cardFaceType?: number;
  /**
   * cardFaceType == 1,颜色的RGB字符值
   * cardFaceType == 2,背景图路径
   */
  cardFaceColor?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 支持场馆
   */
  venuesName?: string;
  /**
   * 支持场馆
   */
  venues?: number[];
  /**
   * 销售时间类型,1、不限时 2、限时
   */
  saleDateType?: number;
  /**
   * 销售开始时间,sale_date为b'2'时才会有用
   */
  saleDateStart?: string;
  /**
   * 销售结束时间,sale_date为b'2'时才会有用
   */
  saleDateEnd?: string;
  /**
   * 销售时间
   */
  saleDate?: string;
  /**
   * 销售渠道
   */
  saleChannelName?: string;
  /**
   * 销售渠道
   */
  saleChannel?: number;
  /**
   * 入场时段，1、全时段 2、特定时段
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
   * 期限卡是否支持转让
   */
  allowTransferType?: number;
  /**
   * 期限卡是否支持转让
   */
  allowTransferTypeName?: string;
  /**
   * 转让价格,支持转让的卡使用
   */
  transferPrice?: number;
  /**
   * 卡说明
   */
  cardContent?: string;
  /**
   * 上架信息
   */
  shelveName?: string;
  /**
   * 激活方式
   */
  activeMethodName?: string;
  /**
   * 激活方式，1、购买激活2、第一次到店激活3、指定时间激活
   */
  activeMethod?: number;
  /**
   * 激活时间，active_method为3时使用，到时间对卡进行激活
   */
  activeDate?: string;
  /**
   * xx天未到店后激活，active_method为2时使用
   */
  activeDay?: number;
  /**
   * 有效期类型，1、不限制2、xx天内有效
   */
  expirationMethod?: number;
  /**
   * 有效天数
   */
  expirationDay?: number;
  /**
   * 上架信息1、立即上架2、定时上架
   */
  shelveType?: number;
  /**
   * 限期卡售价信息
   */
  cardSalePrice?: {
    cardId?: number;
    id?: number;
    /**
     * 使用时间（天）/次数
     */
    useDayOrTimes?: number;
    /**
     * 标价（元）
     */
    listPrice?: number;
    /**
     * 售价（元）
     */
    salePrice?: number;
    /**
     * 允许冻结天数
     */
    allowFreezeDay?: number;
    /**
     * 赠送天数（天）/次数
     */
    giveDayOrTimes?: number;
  }[];
}

/**
 * 接口 [查看详情↗](https://yapi.huianrong.com/project/1764/interface/api/72110) 的 **请求配置的类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/detail`
 * @更新时间 `2023-03-04 18:53:22`
 */
type GroundPcApiCardBaseDetailGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-base/detail',
    'data',
    string,
    'id' | 'cardType',
    false
  >
>;

/**
 * 接口 [查看详情↗](https://yapi.huianrong.com/project/1764/interface/api/72110) 的 **请求配置**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/detail`
 * @更新时间 `2023-03-04 18:53:22`
 */
const groundPcApiCardBaseDetailGetRequestConfig: GroundPcApiCardBaseDetailGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_2,
    devUrl: devUrl_0_2_0_2,
    prodUrl: prodUrl_0_2_0_2,
    path: '/ground-pc-api/card-base/detail',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_2,
    paramNames: [],
    queryNames: ['id', 'cardType'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardBaseDetailGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [查看详情↗](https://yapi.huianrong.com/project/1764/interface/api/72110) 的 **请求函数**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/detail`
 * @更新时间 `2023-03-04 18:53:22`
 */
export const groundPcApiCardBaseDetailGet = /*#__PURE__*/ (
  requestData: GroundPcApiCardBaseDetailGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardBaseDetailGetResponse>(
    prepare(groundPcApiCardBaseDetailGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardBaseDetailGet.requestConfig =
  groundPcApiCardBaseDetailGetRequestConfig;

/**
 * 接口 [查看操作记录↗](https://yapi.huianrong.com/project/1764/interface/api/72112) 的 **请求类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/handle-log`
 * @更新时间 `2023-03-04 18:53:22`
 */
export interface GroundPcApiCardBaseHandleLogGetRequest {
  /**
   * 主键id
   */
  id?: string;
  type?: string;
}

/**
 * 接口 [查看操作记录↗](https://yapi.huianrong.com/project/1764/interface/api/72112) 的 **返回类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/handle-log`
 * @更新时间 `2023-03-04 18:53:22`
 */
export type GroundPcApiCardBaseHandleLogGetResponse = {
  /**
   * 操作时间
   */
  operaTime?: string;
  /**
   * 操作人
   */
  operator?: string;
  /**
   * 资源id
   */
  resourceId?: number;
  /**
   * 操作描述
   */
  handleContent?: string;
  /**
   * 操作类型 1 增加 2 删除 3 修改 4 查看
   */
  handleType?: number;
  /**
   * 操作名
   */
  handleTypeName?: string;
}[];

/**
 * 接口 [查看操作记录↗](https://yapi.huianrong.com/project/1764/interface/api/72112) 的 **请求配置的类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/handle-log`
 * @更新时间 `2023-03-04 18:53:22`
 */
type GroundPcApiCardBaseHandleLogGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-base/handle-log',
    'data',
    string,
    'id' | 'type',
    false
  >
>;

/**
 * 接口 [查看操作记录↗](https://yapi.huianrong.com/project/1764/interface/api/72112) 的 **请求配置**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/handle-log`
 * @更新时间 `2023-03-04 18:53:22`
 */
const groundPcApiCardBaseHandleLogGetRequestConfig: GroundPcApiCardBaseHandleLogGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_2,
    devUrl: devUrl_0_2_0_2,
    prodUrl: prodUrl_0_2_0_2,
    path: '/ground-pc-api/card-base/handle-log',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_2,
    paramNames: [],
    queryNames: ['id', 'type'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardBaseHandleLogGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [查看操作记录↗](https://yapi.huianrong.com/project/1764/interface/api/72112) 的 **请求函数**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base/handle-log`
 * @更新时间 `2023-03-04 18:53:22`
 */
export const groundPcApiCardBaseHandleLogGet = /*#__PURE__*/ (
  requestData: GroundPcApiCardBaseHandleLogGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardBaseHandleLogGetResponse>(
    prepare(groundPcApiCardBaseHandleLogGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardBaseHandleLogGet.requestConfig =
  groundPcApiCardBaseHandleLogGetRequestConfig;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72114) 的 **请求类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `POST /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:22`
 */
export interface GroundPcApiCardBaseCardPostRequest {
  /**
   * 卡类型，1、限期卡2、次卡
   */
  cardType: number;
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 项目名称(冗余)
   */
  projectName?: string;
  /**
   * 销售时间类型,1、不限时 2、限时
   */
  saleDateType: number;
  /**
   * 销售开始时间,sale_date为b'2'时才会有用,精确到小时
   */
  saleDateStart?: string;
  /**
   * 销售结束时间,sale_date为b'2'时才会有用,精确到小时
   */
  saleDateEnd?: string;
  /**
   * 产品介绍
   */
  productDescription?: string;
  /**
   * 销售渠道,1、线下 2、线上 3、线上线下
   */
  saleChannel: number;
  /**
   * 激活方式，1、购买激活2、第一次到店激活3、指定时间激活
   */
  activeMethod?: number;
  /**
   * 激活时间，active_method为3时使用，到时间对卡进行激活,
   */
  activeDate?: string;
  /**
   * xx天未到店后激活，active_method为2时使用
   */
  activeDay?: number;
  /**
   * 入场时段，1、全时段 2、特定时段
   */
  admission: number;
  /**
   * 卡面设置类型，1、颜色 2、自定义
   */
  cardFaceType: number;
  /**
   * 卡面设置为1时，为颜色的RGB字符值，设置为2是为oss的code
   */
  cardFaceColor: string;
  /**
   * 卡说明
   */
  cardContent: string;
  /**
   * 上架信息类型,1、立即上架2、定时上架
   */
  shelveType: number;
  /**
   * 上架时间，shelve为2时有效
   */
  shelveDate?: string;
  /**
   * 卡名称
   */
  name: string;
  /**
   * 期限卡是否支持转让，0、不支持1、支持
   */
  allowTransferType?: number;
  /**
   * 转让价格,支持转让的卡使用
   */
  transferPrice?: number;
  /**
   * 次卡的有效期类型，1、不限制2、xx天内有效
   */
  expirationMethod?: number;
  /**
   * 有效天数，expirationMethod=2时使用
   */
  expirationDay?: number;
  /**
   * 场馆
   */
  venues: number[];
  /**
   * 店铺信息
   */
  stores?: number[];
  /**
   * 卡售价信息
   */
  cardSalePrice: {
    cardId?: number;
    id?: number;
    /**
     * 使用时间（天）/次数
     */
    useDayOrTimes?: number;
    /**
     * 标价（元）
     */
    listPrice?: number;
    /**
     * 售价（元）
     */
    salePrice?: number;
    /**
     * 允许冻结天数
     */
    allowFreezeDay?: number;
    /**
     * 赠送天数（天）/次数
     */
    giveDayOrTimes?: number;
  }[];
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
}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72114) 的 **返回类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `POST /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:22`
 */
export type GroundPcApiCardBaseCardPostResponse = boolean;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72114) 的 **请求配置的类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `POST /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:22`
 */
type GroundPcApiCardBaseCardPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-base/card',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72114) 的 **请求配置**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `POST /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:22`
 */
const groundPcApiCardBaseCardPostRequestConfig: GroundPcApiCardBaseCardPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_2,
    devUrl: devUrl_0_2_0_2,
    prodUrl: prodUrl_0_2_0_2,
    path: '/ground-pc-api/card-base/card',
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
    requestFunctionName: 'groundPcApiCardBaseCardPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72114) 的 **请求函数**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `POST /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:22`
 */
export const groundPcApiCardBaseCardPost = /*#__PURE__*/ (
  requestData: GroundPcApiCardBaseCardPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardBaseCardPostResponse>(
    prepare(groundPcApiCardBaseCardPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardBaseCardPost.requestConfig =
  groundPcApiCardBaseCardPostRequestConfig;

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72116) 的 **请求类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:23`
 */
export interface GroundPcApiCardBaseCardPutRequest {
  /**
   * id
   */
  id: number;
  /**
   * 卡类型，1、限期卡2、次卡
   */
  cardType: number;
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 项目名称(冗余)
   */
  projectName?: string;
  /**
   * 销售时间类型,1、不限时 2、限时
   */
  saleDateType: number;
  /**
   * 销售开始时间,sale_date为b'2'时才会有用,精确到小时
   */
  saleDateStart?: string;
  /**
   * 销售结束时间,sale_date为b'2'时才会有用,精确到小时
   */
  saleDateEnd?: string;
  /**
   * 产品介绍
   */
  productDescription?: string;
  /**
   * 销售渠道,1、线下 2、线上 3、线上线下
   */
  saleChannel: number;
  /**
   * 激活方式，1、购买激活2、第一次到店激活3、指定时间激活
   */
  activeMethod?: number;
  /**
   * 激活时间，active_method为3时使用，到时间对卡进行激活,
   */
  activeDate?: string;
  /**
   * xx天未到店后激活，active_method为2时使用
   */
  activeDay?: number;
  /**
   * 入场时段，1、全时段 2、特定时段
   */
  admission: number;
  /**
   * 卡面设置类型，1、颜色 2、自定义
   */
  cardFaceType: number;
  /**
   * 卡面设置为1时，为颜色的RGB字符值，设置为2是为oss的code
   */
  cardFaceColor: string;
  /**
   * 卡说明
   */
  cardContent: string;
  /**
   * 上架信息类型,1、立即上架2、定时上架
   */
  shelveType: number;
  /**
   * 上架时间，shelve为2时有效
   */
  shelveDate?: string;
  /**
   * 卡名称
   */
  name: string;
  /**
   * 期限卡是否支持转让，0、不支持1、支持
   */
  allowTransferType?: number;
  /**
   * 转让价格,支持转让的卡使用
   */
  transferPrice?: number;
  /**
   * 次卡的有效期类型，1、不限制2、xx天内有效
   */
  expirationMethod?: number;
  /**
   * 有效天数，expirationMethod=2时使用
   */
  expirationDay?: number;
  /**
   * 场馆
   */
  venues: number[];
  /**
   * 店铺信息
   */
  stores?: number[];
  /**
   * 卡售价信息
   */
  cardSalePrice: {
    cardId?: number;
    id?: number;
    /**
     * 使用时间（天）/次数
     */
    useDayOrTimes?: number;
    /**
     * 标价（元）
     */
    listPrice?: number;
    /**
     * 售价（元）
     */
    salePrice?: number;
    /**
     * 允许冻结天数
     */
    allowFreezeDay?: number;
    /**
     * 赠送天数（天）/次数
     */
    giveDayOrTimes?: number;
  }[];
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
}

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72116) 的 **返回类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:23`
 */
export type GroundPcApiCardBaseCardPutResponse = boolean;

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72116) 的 **请求配置的类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:23`
 */
type GroundPcApiCardBaseCardPutRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-base/card',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72116) 的 **请求配置**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:23`
 */
const groundPcApiCardBaseCardPutRequestConfig: GroundPcApiCardBaseCardPutRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_2,
    devUrl: devUrl_0_2_0_2,
    prodUrl: prodUrl_0_2_0_2,
    path: '/ground-pc-api/card-base/card',
    method: Method.PUT,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_2,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardBaseCardPut',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72116) 的 **请求函数**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:23`
 */
export const groundPcApiCardBaseCardPut = /*#__PURE__*/ (
  requestData: GroundPcApiCardBaseCardPutRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardBaseCardPutResponse>(
    prepare(groundPcApiCardBaseCardPutRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardBaseCardPut.requestConfig =
  groundPcApiCardBaseCardPutRequestConfig;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1764/interface/api/72118) 的 **请求类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `DELETE /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:23`
 */
export interface GroundPcApiCardBaseCardDeleteRequest {
  /**
   * 主键id
   */
  id: string;
}

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1764/interface/api/72118) 的 **返回类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `DELETE /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:23`
 */
export type GroundPcApiCardBaseCardDeleteResponse = boolean;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1764/interface/api/72118) 的 **请求配置的类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `DELETE /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:23`
 */
type GroundPcApiCardBaseCardDeleteRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-base/card',
    'data',
    string,
    'id',
    false
  >
>;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1764/interface/api/72118) 的 **请求配置**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `DELETE /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:23`
 */
const groundPcApiCardBaseCardDeleteRequestConfig: GroundPcApiCardBaseCardDeleteRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_2,
    devUrl: devUrl_0_2_0_2,
    prodUrl: prodUrl_0_2_0_2,
    path: '/ground-pc-api/card-base/card',
    method: Method.DELETE,
    requestHeaders: {},
    requestBodyType: RequestBodyType.form,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_2,
    paramNames: [],
    queryNames: ['id'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardBaseCardDelete',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1764/interface/api/72118) 的 **请求函数**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `DELETE /ground-pc-api/card-base/card`
 * @更新时间 `2023-03-04 18:53:23`
 */
export const groundPcApiCardBaseCardDelete = /*#__PURE__*/ (
  requestData: GroundPcApiCardBaseCardDeleteRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardBaseCardDeleteResponse>(
    prepare(groundPcApiCardBaseCardDeleteRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardBaseCardDelete.requestConfig =
  groundPcApiCardBaseCardDeleteRequestConfig;

/**
 * 接口 [上架or下架↗](https://yapi.huianrong.com/project/1764/interface/api/72120) 的 **请求类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/shelf`
 * @更新时间 `2023-03-04 18:53:23`
 */
export interface GroundPcApiCardBaseShelfPutRequest {
  /**
   * 主键id
   */
  id: string;
  /**
   * 1、上架,2、下架
   */
  status: string;
}

/**
 * 接口 [上架or下架↗](https://yapi.huianrong.com/project/1764/interface/api/72120) 的 **返回类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/shelf`
 * @更新时间 `2023-03-04 18:53:23`
 */
export type GroundPcApiCardBaseShelfPutResponse = boolean;

/**
 * 接口 [上架or下架↗](https://yapi.huianrong.com/project/1764/interface/api/72120) 的 **请求配置的类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/shelf`
 * @更新时间 `2023-03-04 18:53:23`
 */
type GroundPcApiCardBaseShelfPutRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-base/shelf',
    'data',
    string,
    'id' | 'status',
    false
  >
>;

/**
 * 接口 [上架or下架↗](https://yapi.huianrong.com/project/1764/interface/api/72120) 的 **请求配置**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/shelf`
 * @更新时间 `2023-03-04 18:53:23`
 */
const groundPcApiCardBaseShelfPutRequestConfig: GroundPcApiCardBaseShelfPutRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_2,
    devUrl: devUrl_0_2_0_2,
    prodUrl: prodUrl_0_2_0_2,
    path: '/ground-pc-api/card-base/shelf',
    method: Method.PUT,
    requestHeaders: {},
    requestBodyType: RequestBodyType.form,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_2,
    paramNames: [],
    queryNames: ['id', 'status'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardBaseShelfPut',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [上架or下架↗](https://yapi.huianrong.com/project/1764/interface/api/72120) 的 **请求函数**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/shelf`
 * @更新时间 `2023-03-04 18:53:23`
 */
export const groundPcApiCardBaseShelfPut = /*#__PURE__*/ (
  requestData: GroundPcApiCardBaseShelfPutRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardBaseShelfPutResponse>(
    prepare(groundPcApiCardBaseShelfPutRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardBaseShelfPut.requestConfig =
  groundPcApiCardBaseShelfPutRequestConfig;

/**
 * 接口 [停售↗](https://yapi.huianrong.com/project/1764/interface/api/72122) 的 **请求类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/off-sale`
 * @更新时间 `2023-03-04 18:53:24`
 */
export interface GroundPcApiCardBaseOffSalePutRequest {
  /**
   * 主键id
   */
  id: string;
}

/**
 * 接口 [停售↗](https://yapi.huianrong.com/project/1764/interface/api/72122) 的 **返回类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/off-sale`
 * @更新时间 `2023-03-04 18:53:24`
 */
export type GroundPcApiCardBaseOffSalePutResponse = boolean;

/**
 * 接口 [停售↗](https://yapi.huianrong.com/project/1764/interface/api/72122) 的 **请求配置的类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/off-sale`
 * @更新时间 `2023-03-04 18:53:24`
 */
type GroundPcApiCardBaseOffSalePutRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-base/off-sale',
    'data',
    string,
    'id',
    false
  >
>;

/**
 * 接口 [停售↗](https://yapi.huianrong.com/project/1764/interface/api/72122) 的 **请求配置**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/off-sale`
 * @更新时间 `2023-03-04 18:53:24`
 */
const groundPcApiCardBaseOffSalePutRequestConfig: GroundPcApiCardBaseOffSalePutRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_2,
    devUrl: devUrl_0_2_0_2,
    prodUrl: prodUrl_0_2_0_2,
    path: '/ground-pc-api/card-base/off-sale',
    method: Method.PUT,
    requestHeaders: {},
    requestBodyType: RequestBodyType.form,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_2,
    paramNames: [],
    queryNames: ['id'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardBaseOffSalePut',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [停售↗](https://yapi.huianrong.com/project/1764/interface/api/72122) 的 **请求函数**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `PUT /ground-pc-api/card-base/off-sale`
 * @更新时间 `2023-03-04 18:53:24`
 */
export const groundPcApiCardBaseOffSalePut = /*#__PURE__*/ (
  requestData: GroundPcApiCardBaseOffSalePutRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardBaseOffSalePutResponse>(
    prepare(groundPcApiCardBaseOffSalePutRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardBaseOffSalePut.requestConfig =
  groundPcApiCardBaseOffSalePutRequestConfig;

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72400) 的 **请求类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `POST /ground-pc-api/card-base/page-list`
 * @更新时间 `2023-03-04 18:53:21`
 */
export interface GroundPcApiCardBasePageListPostRequest {
  /**
   * 卡类型，1、限期卡2、次卡
   */
  cardType: number;
  /**
   * 选择的项目的id
   */
  projectId?: number;
  /**
   * 选择的店铺的id
   */
  storeId?: number;
  /**
   * 发布渠道，1、线下 2、线上 3、线上线下
   */
  saleChannel?: number;
  /**
   * 上架状态1、已上架2、已下架3、未上架
   */
  shelveStatus?: number;
  /**
   * 销售状态，0、停售1、可售
   */
  saleStatus?: number;
  /**
   * 选择的场馆的id
   */
  venuesId?: number;
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
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72400) 的 **返回类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `POST /ground-pc-api/card-base/page-list`
 * @更新时间 `2023-03-04 18:53:21`
 */
export interface GroundPcApiCardBasePageListPostResponse {
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
    name?: string;
    /**
     * 次卡的次数
     */
    limitTimes?: string;
    /**
     * 有效期
     */
    expirationDate?: string;
    /**
     * 场馆范围
     */
    venuesArea?: string;
    /**
     * 售价
     */
    salePrice?: string;
    /**
     * 上架状态
     */
    shelfStatusName?: string;
    /**
     * 售卖状态
     */
    saleStatusName?: string;
    /**
     * 发布渠道
     */
    saleChannelName?: string;
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
  }[];
}

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72400) 的 **请求配置的类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `POST /ground-pc-api/card-base/page-list`
 * @更新时间 `2023-03-04 18:53:21`
 */
type GroundPcApiCardBasePageListPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-base/page-list',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72400) 的 **请求配置**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `POST /ground-pc-api/card-base/page-list`
 * @更新时间 `2023-03-04 18:53:21`
 */
const groundPcApiCardBasePageListPostRequestConfig: GroundPcApiCardBasePageListPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_2,
    devUrl: devUrl_0_2_0_2,
    prodUrl: prodUrl_0_2_0_2,
    path: '/ground-pc-api/card-base/page-list',
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
    requestFunctionName: 'groundPcApiCardBasePageListPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72400) 的 **请求函数**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `POST /ground-pc-api/card-base/page-list`
 * @更新时间 `2023-03-04 18:53:21`
 */
export const groundPcApiCardBasePageListPost = /*#__PURE__*/ (
  requestData: GroundPcApiCardBasePageListPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardBasePageListPostResponse>(
    prepare(groundPcApiCardBasePageListPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardBasePageListPost.requestConfig =
  groundPcApiCardBasePageListPostRequestConfig;

/**
 * 接口 [查询卡列表↗](https://yapi.huianrong.com/project/1764/interface/api/72634) 的 **请求类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base`
 * @更新时间 `2023-03-04 18:53:24`
 */
export interface GroundPcApiCardBaseGetRequest {
  projectId?: string;
  storeId?: string;
  cardType?: string;
}

/**
 * 接口 [查询卡列表↗](https://yapi.huianrong.com/project/1764/interface/api/72634) 的 **返回类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base`
 * @更新时间 `2023-03-04 18:53:24`
 */
export type GroundPcApiCardBaseGetResponse = {
  value?: number;
  label?: string;
}[];

/**
 * 接口 [查询卡列表↗](https://yapi.huianrong.com/project/1764/interface/api/72634) 的 **请求配置的类型**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base`
 * @更新时间 `2023-03-04 18:53:24`
 */
type GroundPcApiCardBaseGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-base',
    'data',
    string,
    'projectId' | 'storeId' | 'cardType',
    false
  >
>;

/**
 * 接口 [查询卡列表↗](https://yapi.huianrong.com/project/1764/interface/api/72634) 的 **请求配置**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base`
 * @更新时间 `2023-03-04 18:53:24`
 */
const groundPcApiCardBaseGetRequestConfig: GroundPcApiCardBaseGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_2,
    devUrl: devUrl_0_2_0_2,
    prodUrl: prodUrl_0_2_0_2,
    path: '/ground-pc-api/card-base',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_2,
    paramNames: [],
    queryNames: ['projectId', 'storeId', 'cardType'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardBaseGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [查询卡列表↗](https://yapi.huianrong.com/project/1764/interface/api/72634) 的 **请求函数**
 *
 * @分类 [卡项管理基本信息管理接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23065)
 * @请求头 `GET /ground-pc-api/card-base`
 * @更新时间 `2023-03-04 18:53:24`
 */
export const groundPcApiCardBaseGet = /*#__PURE__*/ (
  requestData: GroundPcApiCardBaseGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardBaseGetResponse>(
    prepare(groundPcApiCardBaseGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardBaseGet.requestConfig = groundPcApiCardBaseGetRequestConfig;

const mockUrl_0_2_0_3 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_3 = '' as any;
const prodUrl_0_2_0_3 = '' as any;
const dataKey_0_2_0_3 = 'data' as any;

/**
 * 接口 [核销卡详情查询↗](https://yapi.huianrong.com/project/1764/interface/api/72128) 的 **请求类型**
 *
 * @分类 [POS卡核销接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23071)
 * @请求头 `GET /ground-pc-api/card-verification/detail`
 * @更新时间 `2023-03-01 14:04:17`
 */
export interface GroundPcApiCardVerificationDetailGetRequest {
  /**
   * 电子卡号或实体卡号
   */
  cardCode?: string;
  /**
   * 当前pos所在的场馆名
   */
  venuesName?: string;
}

/**
 * 接口 [核销卡详情查询↗](https://yapi.huianrong.com/project/1764/interface/api/72128) 的 **返回类型**
 *
 * @分类 [POS卡核销接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23071)
 * @请求头 `GET /ground-pc-api/card-verification/detail`
 * @更新时间 `2023-03-01 14:04:17`
 */
export interface GroundPcApiCardVerificationDetailGetResponse {
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
   * 颜色的RGB字符值,卡面设置为1时使用
   */
  cardFaceColor?: string;
}

/**
 * 接口 [核销卡详情查询↗](https://yapi.huianrong.com/project/1764/interface/api/72128) 的 **请求配置的类型**
 *
 * @分类 [POS卡核销接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23071)
 * @请求头 `GET /ground-pc-api/card-verification/detail`
 * @更新时间 `2023-03-01 14:04:17`
 */
type GroundPcApiCardVerificationDetailGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-verification/detail',
    'data',
    string,
    'cardCode' | 'venuesName',
    false
  >
>;

/**
 * 接口 [核销卡详情查询↗](https://yapi.huianrong.com/project/1764/interface/api/72128) 的 **请求配置**
 *
 * @分类 [POS卡核销接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23071)
 * @请求头 `GET /ground-pc-api/card-verification/detail`
 * @更新时间 `2023-03-01 14:04:17`
 */
const groundPcApiCardVerificationDetailGetRequestConfig: GroundPcApiCardVerificationDetailGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_3,
    devUrl: devUrl_0_2_0_3,
    prodUrl: prodUrl_0_2_0_3,
    path: '/ground-pc-api/card-verification/detail',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_3,
    paramNames: [],
    queryNames: ['cardCode', 'venuesName'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardVerificationDetailGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [核销卡详情查询↗](https://yapi.huianrong.com/project/1764/interface/api/72128) 的 **请求函数**
 *
 * @分类 [POS卡核销接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23071)
 * @请求头 `GET /ground-pc-api/card-verification/detail`
 * @更新时间 `2023-03-01 14:04:17`
 */
export const groundPcApiCardVerificationDetailGet = /*#__PURE__*/ (
  requestData: GroundPcApiCardVerificationDetailGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardVerificationDetailGetResponse>(
    prepare(groundPcApiCardVerificationDetailGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardVerificationDetailGet.requestConfig =
  groundPcApiCardVerificationDetailGetRequestConfig;

/**
 * 接口 [确认核销↗](https://yapi.huianrong.com/project/1764/interface/api/72302) 的 **请求类型**
 *
 * @分类 [POS卡核销接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23071)
 * @请求头 `POST /ground-pc-api/card-verification/verification`
 * @更新时间 `2023-03-01 14:04:17`
 */
export interface GroundPcApiCardVerificationVerificationPostRequest {
  /**
   * *
   * 持卡信息id
   */
  cardHoldId: number;
  /**
   * 集团客户id
   */
  clientId: number;
  /**
   * 设备名称
   */
  deviceName: string;
  /**
   * 操作员id
   */
  merchantEmployeeId: number;
  /**
   * 卡号
   */
  cardCode: string;
  /**
   * 当前pos所在的店铺名
   */
  storeName: string;
  /**
   * 当前pos所在的场馆名
   */
  venuesName: string;
  /**
   * 当前店铺所在的项目id
   */
  projectId: number;
  /**
   * 当前店铺所在的项目名称
   */
  projectName: string;
  /**
   * 卡类型 1:期限卡 2:次卡
   */
  cardType: number;
}

/**
 * 接口 [确认核销↗](https://yapi.huianrong.com/project/1764/interface/api/72302) 的 **返回类型**
 *
 * @分类 [POS卡核销接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23071)
 * @请求头 `POST /ground-pc-api/card-verification/verification`
 * @更新时间 `2023-03-01 14:04:17`
 */
export type GroundPcApiCardVerificationVerificationPostResponse = boolean;

/**
 * 接口 [确认核销↗](https://yapi.huianrong.com/project/1764/interface/api/72302) 的 **请求配置的类型**
 *
 * @分类 [POS卡核销接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23071)
 * @请求头 `POST /ground-pc-api/card-verification/verification`
 * @更新时间 `2023-03-01 14:04:17`
 */
type GroundPcApiCardVerificationVerificationPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-verification/verification',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [确认核销↗](https://yapi.huianrong.com/project/1764/interface/api/72302) 的 **请求配置**
 *
 * @分类 [POS卡核销接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23071)
 * @请求头 `POST /ground-pc-api/card-verification/verification`
 * @更新时间 `2023-03-01 14:04:17`
 */
const groundPcApiCardVerificationVerificationPostRequestConfig: GroundPcApiCardVerificationVerificationPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_3,
    devUrl: devUrl_0_2_0_3,
    prodUrl: prodUrl_0_2_0_3,
    path: '/ground-pc-api/card-verification/verification',
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
    requestFunctionName: 'groundPcApiCardVerificationVerificationPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [确认核销↗](https://yapi.huianrong.com/project/1764/interface/api/72302) 的 **请求函数**
 *
 * @分类 [POS卡核销接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23071)
 * @请求头 `POST /ground-pc-api/card-verification/verification`
 * @更新时间 `2023-03-01 14:04:17`
 */
export const groundPcApiCardVerificationVerificationPost = /*#__PURE__*/ (
  requestData: GroundPcApiCardVerificationVerificationPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardVerificationVerificationPostResponse>(
    prepare(
      groundPcApiCardVerificationVerificationPostRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiCardVerificationVerificationPost.requestConfig =
  groundPcApiCardVerificationVerificationPostRequestConfig;

const mockUrl_0_2_0_4 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_4 = '' as any;
const prodUrl_0_2_0_4 = '' as any;
const dataKey_0_2_0_4 = 'data' as any;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72146) 的 **请求类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `POST /ground-pc-api/member/label/add`
 * @更新时间 `2023-03-04 15:47:37`
 */
export interface GroundPcApiMemberLabelAddPostRequest {
  /**
   * 会员标签
   */
  name: string;
}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72146) 的 **返回类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `POST /ground-pc-api/member/label/add`
 * @更新时间 `2023-03-04 15:47:37`
 */
export interface GroundPcApiMemberLabelAddPostResponse {}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72146) 的 **请求配置的类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `POST /ground-pc-api/member/label/add`
 * @更新时间 `2023-03-04 15:47:37`
 */
type GroundPcApiMemberLabelAddPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/member/label/add',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72146) 的 **请求配置**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `POST /ground-pc-api/member/label/add`
 * @更新时间 `2023-03-04 15:47:37`
 */
const groundPcApiMemberLabelAddPostRequestConfig: GroundPcApiMemberLabelAddPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_4,
    devUrl: devUrl_0_2_0_4,
    prodUrl: prodUrl_0_2_0_4,
    path: '/ground-pc-api/member/label/add',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_4,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMemberLabelAddPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72146) 的 **请求函数**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `POST /ground-pc-api/member/label/add`
 * @更新时间 `2023-03-04 15:47:37`
 */
export const groundPcApiMemberLabelAddPost = /*#__PURE__*/ (
  requestData: GroundPcApiMemberLabelAddPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMemberLabelAddPostResponse>(
    prepare(groundPcApiMemberLabelAddPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiMemberLabelAddPost.requestConfig =
  groundPcApiMemberLabelAddPostRequestConfig;

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72148) 的 **请求类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `POST /ground-pc-api/member/label/edit`
 * @更新时间 `2023-03-04 15:47:37`
 */
export interface GroundPcApiMemberLabelEditPostRequest {
  id: number;
  name: string;
}

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72148) 的 **返回类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `POST /ground-pc-api/member/label/edit`
 * @更新时间 `2023-03-04 15:47:37`
 */
export interface GroundPcApiMemberLabelEditPostResponse {}

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72148) 的 **请求配置的类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `POST /ground-pc-api/member/label/edit`
 * @更新时间 `2023-03-04 15:47:37`
 */
type GroundPcApiMemberLabelEditPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/member/label/edit',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72148) 的 **请求配置**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `POST /ground-pc-api/member/label/edit`
 * @更新时间 `2023-03-04 15:47:37`
 */
const groundPcApiMemberLabelEditPostRequestConfig: GroundPcApiMemberLabelEditPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_4,
    devUrl: devUrl_0_2_0_4,
    prodUrl: prodUrl_0_2_0_4,
    path: '/ground-pc-api/member/label/edit',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_4,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMemberLabelEditPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72148) 的 **请求函数**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `POST /ground-pc-api/member/label/edit`
 * @更新时间 `2023-03-04 15:47:37`
 */
export const groundPcApiMemberLabelEditPost = /*#__PURE__*/ (
  requestData: GroundPcApiMemberLabelEditPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMemberLabelEditPostResponse>(
    prepare(groundPcApiMemberLabelEditPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiMemberLabelEditPost.requestConfig =
  groundPcApiMemberLabelEditPostRequestConfig;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1764/interface/api/72152) 的 **请求类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/delete/{id}`
 * @更新时间 `2023-03-04 15:47:39`
 */
export interface GroundPcApiMemberLabelDeleteIdGetRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1764/interface/api/72152) 的 **返回类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/delete/{id}`
 * @更新时间 `2023-03-04 15:47:39`
 */
export interface GroundPcApiMemberLabelDeleteIdGetResponse {}

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1764/interface/api/72152) 的 **请求配置的类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/delete/{id}`
 * @更新时间 `2023-03-04 15:47:39`
 */
type GroundPcApiMemberLabelDeleteIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/member/label/delete/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1764/interface/api/72152) 的 **请求配置**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/delete/{id}`
 * @更新时间 `2023-03-04 15:47:39`
 */
const groundPcApiMemberLabelDeleteIdGetRequestConfig: GroundPcApiMemberLabelDeleteIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_4,
    devUrl: devUrl_0_2_0_4,
    prodUrl: prodUrl_0_2_0_4,
    path: '/ground-pc-api/member/label/delete/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_4,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMemberLabelDeleteIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1764/interface/api/72152) 的 **请求函数**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/delete/{id}`
 * @更新时间 `2023-03-04 15:47:39`
 */
export const groundPcApiMemberLabelDeleteIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiMemberLabelDeleteIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMemberLabelDeleteIdGetResponse>(
    prepare(groundPcApiMemberLabelDeleteIdGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiMemberLabelDeleteIdGet.requestConfig =
  groundPcApiMemberLabelDeleteIdGetRequestConfig;

/**
 * 接口 [会员标签下拉选择↗](https://yapi.huianrong.com/project/1764/interface/api/72206) 的 **请求类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/select_list`
 * @更新时间 `2023-03-04 15:47:40`
 */
export interface GroundPcApiMemberLabelSelectListGetRequest {}

/**
 * 接口 [会员标签下拉选择↗](https://yapi.huianrong.com/project/1764/interface/api/72206) 的 **返回类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/select_list`
 * @更新时间 `2023-03-04 15:47:40`
 */
export type GroundPcApiMemberLabelSelectListGetResponse = {
  /**
   * id值
   */
  value: number;
  /**
   * 名称
   */
  label: string;
}[];

/**
 * 接口 [会员标签下拉选择↗](https://yapi.huianrong.com/project/1764/interface/api/72206) 的 **请求配置的类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/select_list`
 * @更新时间 `2023-03-04 15:47:40`
 */
type GroundPcApiMemberLabelSelectListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/member/label/select_list',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [会员标签下拉选择↗](https://yapi.huianrong.com/project/1764/interface/api/72206) 的 **请求配置**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/select_list`
 * @更新时间 `2023-03-04 15:47:40`
 */
const groundPcApiMemberLabelSelectListGetRequestConfig: GroundPcApiMemberLabelSelectListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_4,
    devUrl: devUrl_0_2_0_4,
    prodUrl: prodUrl_0_2_0_4,
    path: '/ground-pc-api/member/label/select_list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_4,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMemberLabelSelectListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [会员标签下拉选择↗](https://yapi.huianrong.com/project/1764/interface/api/72206) 的 **请求函数**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/select_list`
 * @更新时间 `2023-03-04 15:47:40`
 */
export const groundPcApiMemberLabelSelectListGet = /*#__PURE__*/ (
  requestData?: GroundPcApiMemberLabelSelectListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMemberLabelSelectListGetResponse>(
    prepare(groundPcApiMemberLabelSelectListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiMemberLabelSelectListGet.requestConfig =
  groundPcApiMemberLabelSelectListGetRequestConfig;

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72536) 的 **请求类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/page`
 * @更新时间 `2023-03-04 15:47:38`
 */
export interface GroundPcApiMemberLabelPageGetRequest {
  /**
   * 页码
   */
  pageSize?: string;
  /**
   * 每页大小
   */
  pageNum?: string;
}

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72536) 的 **返回类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/page`
 * @更新时间 `2023-03-04 15:47:38`
 */
export interface GroundPcApiMemberLabelPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 标签id
     */
    id?: number;
    /**
     * 标签名称
     */
    name?: string;
    /**
     * 创建人
     */
    createBy?: string;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 会员数量
     */
    memberNum?: number;
  }[];
}

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72536) 的 **请求配置的类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/page`
 * @更新时间 `2023-03-04 15:47:38`
 */
type GroundPcApiMemberLabelPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/member/label/page',
    'data',
    string,
    'pageSize' | 'pageNum',
    false
  >
>;

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72536) 的 **请求配置**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/page`
 * @更新时间 `2023-03-04 15:47:38`
 */
const groundPcApiMemberLabelPageGetRequestConfig: GroundPcApiMemberLabelPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_4,
    devUrl: devUrl_0_2_0_4,
    prodUrl: prodUrl_0_2_0_4,
    path: '/ground-pc-api/member/label/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_4,
    paramNames: [],
    queryNames: ['pageSize', 'pageNum'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMemberLabelPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1764/interface/api/72536) 的 **请求函数**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/page`
 * @更新时间 `2023-03-04 15:47:38`
 */
export const groundPcApiMemberLabelPageGet = /*#__PURE__*/ (
  requestData: GroundPcApiMemberLabelPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMemberLabelPageGetResponse>(
    prepare(groundPcApiMemberLabelPageGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiMemberLabelPageGet.requestConfig =
  groundPcApiMemberLabelPageGetRequestConfig;

/**
 * 接口 [判断表示是否可以删除（标签使用中）↗](https://yapi.huianrong.com/project/1764/interface/api/72676) 的 **请求类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/allow_delete/{id}`
 * @更新时间 `2023-03-04 15:47:40`
 */
export interface GroundPcApiMemberLabelAllowDeleteIdGetRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [判断表示是否可以删除（标签使用中）↗](https://yapi.huianrong.com/project/1764/interface/api/72676) 的 **返回类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/allow_delete/{id}`
 * @更新时间 `2023-03-04 15:47:40`
 */
export type GroundPcApiMemberLabelAllowDeleteIdGetResponse = boolean;

/**
 * 接口 [判断表示是否可以删除（标签使用中）↗](https://yapi.huianrong.com/project/1764/interface/api/72676) 的 **请求配置的类型**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/allow_delete/{id}`
 * @更新时间 `2023-03-04 15:47:40`
 */
type GroundPcApiMemberLabelAllowDeleteIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/member/label/allow_delete/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [判断表示是否可以删除（标签使用中）↗](https://yapi.huianrong.com/project/1764/interface/api/72676) 的 **请求配置**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/allow_delete/{id}`
 * @更新时间 `2023-03-04 15:47:40`
 */
const groundPcApiMemberLabelAllowDeleteIdGetRequestConfig: GroundPcApiMemberLabelAllowDeleteIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_4,
    devUrl: devUrl_0_2_0_4,
    prodUrl: prodUrl_0_2_0_4,
    path: '/ground-pc-api/member/label/allow_delete/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_4,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMemberLabelAllowDeleteIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [判断表示是否可以删除（标签使用中）↗](https://yapi.huianrong.com/project/1764/interface/api/72676) 的 **请求函数**
 *
 * @分类 [会员标签↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23099)
 * @请求头 `GET /ground-pc-api/member/label/allow_delete/{id}`
 * @更新时间 `2023-03-04 15:47:40`
 */
export const groundPcApiMemberLabelAllowDeleteIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiMemberLabelAllowDeleteIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMemberLabelAllowDeleteIdGetResponse>(
    prepare(groundPcApiMemberLabelAllowDeleteIdGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiMemberLabelAllowDeleteIdGet.requestConfig =
  groundPcApiMemberLabelAllowDeleteIdGetRequestConfig;

const mockUrl_0_2_0_5 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_5 = '' as any;
const prodUrl_0_2_0_5 = '' as any;
const dataKey_0_2_0_5 = 'data' as any;

/**
 * 接口 [订单列表↗](https://yapi.huianrong.com/project/1764/interface/api/72166) 的 **请求类型**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/list`
 * @更新时间 `2023-02-20 14:39:46`
 */
export interface GroundPcApiCardOrderFrequencyListGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 商铺id
   */
  storeId?: string;
  /**
   * 卡状态  1:使用中 2:已冻结 3:已过期
   */
  cardStatus?: string;
  /**
   * 购买时间-开始
   */
  purchaseStartTime?: string;
  /**
   * 购买时间-结束
   */
  purchaseEndTime?: string;
  /**
   * 购买渠道 1:线上 2:线下
   */
  purchaseChannel?: string;
  /**
   * 到期时间-开始
   */
  expirationStartTime?: string;
  /**
   * 到期时间-结束
   */
  expirationEndTime?: string;
  /**
   * 持卡人（姓名/电话/会员号）
   */
  memberKeyWord?: string;
  /**
   * 销售人员
   */
  salesStaffId?: string;
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
 * 接口 [订单列表↗](https://yapi.huianrong.com/project/1764/interface/api/72166) 的 **返回类型**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/list`
 * @更新时间 `2023-02-20 14:39:46`
 */
export interface GroundPcApiCardOrderFrequencyListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 数据id
     */
    id?: number;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 店铺名字
     */
    storeName?: string;
    /**
     * 订单编号
     */
    orderNo?: string;
    /**
     * 卡名称
     */
    cardName?: string;
    /**
     * 卡类型 1:期限卡 2:次卡
     */
    cardType?: number;
    /**
     * 有效期(-1为不限制）
     */
    buyNum?: number;
    /**
     * 购卡人姓名
     */
    membersName?: string;
    /**
     * 购卡人手机号
     */
    membersPhone?: string;
    /**
     * 购买渠道 1:线上 2:线下
     */
    purchaseChannel?: number;
    /**
     * 购买渠道
     */
    purchaseChannelName?: string;
    /**
     * 剩余次数
     */
    surplusNum?: number;
    /**
     * 签单门店(操作人所属门店)
     */
    signStoreName?: string;
    /**
     * 卡状态  1:使用中 2:已冻结 3:已过期
     */
    cardStatus?: number;
    /**
     * 卡状态  1:使用中 2:已冻结 3:已过期
     */
    cardStatusName?: string;
  }[];
}

/**
 * 接口 [订单列表↗](https://yapi.huianrong.com/project/1764/interface/api/72166) 的 **请求配置的类型**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/list`
 * @更新时间 `2023-02-20 14:39:46`
 */
type GroundPcApiCardOrderFrequencyListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card/order/frequency/list',
    'data',
    string,
    | 'projectId'
    | 'storeId'
    | 'cardStatus'
    | 'purchaseStartTime'
    | 'purchaseEndTime'
    | 'purchaseChannel'
    | 'expirationStartTime'
    | 'expirationEndTime'
    | 'memberKeyWord'
    | 'salesStaffId'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [订单列表↗](https://yapi.huianrong.com/project/1764/interface/api/72166) 的 **请求配置**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/list`
 * @更新时间 `2023-02-20 14:39:46`
 */
const groundPcApiCardOrderFrequencyListGetRequestConfig: GroundPcApiCardOrderFrequencyListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_5,
    devUrl: devUrl_0_2_0_5,
    prodUrl: prodUrl_0_2_0_5,
    path: '/ground-pc-api/card/order/frequency/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_5,
    paramNames: [],
    queryNames: [
      'projectId',
      'storeId',
      'cardStatus',
      'purchaseStartTime',
      'purchaseEndTime',
      'purchaseChannel',
      'expirationStartTime',
      'expirationEndTime',
      'memberKeyWord',
      'salesStaffId',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderFrequencyListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [订单列表↗](https://yapi.huianrong.com/project/1764/interface/api/72166) 的 **请求函数**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/list`
 * @更新时间 `2023-02-20 14:39:46`
 */
export const groundPcApiCardOrderFrequencyListGet = /*#__PURE__*/ (
  requestData: GroundPcApiCardOrderFrequencyListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderFrequencyListGetResponse>(
    prepare(groundPcApiCardOrderFrequencyListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardOrderFrequencyListGet.requestConfig =
  groundPcApiCardOrderFrequencyListGetRequestConfig;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72168) 的 **请求类型**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/info/{id}`
 * @更新时间 `2023-02-20 14:39:46`
 */
export interface GroundPcApiCardOrderFrequencyInfoIdGetRequest {
  /**
   * 数据id
   */
  id: string;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72168) 的 **返回类型**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/info/{id}`
 * @更新时间 `2023-02-20 14:39:46`
 */
export interface GroundPcApiCardOrderFrequencyInfoIdGetResponse {
  /**
   * 数据id
   */
  id?: number;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 场馆名称
   */
  venueName?: string;
  /**
   * 店铺名字
   */
  storeName?: string;
  /**
   * 激活状态 1:未激活 2:已激活
   */
  activeStatus?: number;
  /**
   * 激活状态
   */
  activeStatusName?: string;
  /**
   * 卡名称
   */
  cardName?: string;
  /**
   * 卡介绍
   */
  cardInfo?: string;
  /**
   * 剩余次数
   */
  surplusNum?: number;
  /**
   * 购买时间
   */
  purchaseTime?: string;
  /**
   * 会员号
   */
  membersCode?: string;
  /**
   * 购卡人姓名
   */
  membersName?: string;
  /**
   * 购卡人手机号
   */
  membersPhone?: string;
  /**
   * 购卡人身份证号
   */
  idCard?: string;
  /**
   * 时间（天）
   */
  num?: number;
  /**
   * 标价（元）
   */
  price?: number;
  /**
   * 售价（元）
   */
  salePrice?: number;
  /**
   * 赠送次数
   */
  giveNum?: number;
  /**
   * 合计次数
   */
  totalNum?: number;
  /**
   * 付款方式（1：微信、2：支付宝。。。。。。）
   */
  payType?: number;
  /**
   * 付款方式
   */
  payTypeName?: string;
  /**
   * 应付金额
   */
  meetAmount?: number;
  /**
   * 实付金额
   */
  payAmount?: number;
  /**
   * 有效期类型，1、不限制 2、xx天内有效
   */
  expirationMethod?: number;
  /**
   * 有效期
   */
  expirationMethodName?: number;
  /**
   * 入场时段
   */
  entrancePeriod?: string;
  /**
   * 上架信息
   */
  groundingInfo?: number;
  /**
   * 销售人员姓名
   */
  salesStaffName?: string;
  /**
   * 合同编号
   */
  contractCode?: string;
  /**
   * 卡说明
   */
  cardRemark?: string;
  /**
   * 使用记录
   */
  useRecords?: {
    /**
     * 入场时间
     */
    entranceDate?: string;
    /**
     * 出场时间
     */
    exitDate?: string;
    /**
     * 时⻓（⼩时）
     */
    duration?: number;
  }[];
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72168) 的 **请求配置的类型**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/info/{id}`
 * @更新时间 `2023-02-20 14:39:46`
 */
type GroundPcApiCardOrderFrequencyInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card/order/frequency/info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72168) 的 **请求配置**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/info/{id}`
 * @更新时间 `2023-02-20 14:39:46`
 */
const groundPcApiCardOrderFrequencyInfoIdGetRequestConfig: GroundPcApiCardOrderFrequencyInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_5,
    devUrl: devUrl_0_2_0_5,
    prodUrl: prodUrl_0_2_0_5,
    path: '/ground-pc-api/card/order/frequency/info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_5,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderFrequencyInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72168) 的 **请求函数**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/info/{id}`
 * @更新时间 `2023-02-20 14:39:46`
 */
export const groundPcApiCardOrderFrequencyInfoIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiCardOrderFrequencyInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderFrequencyInfoIdGetResponse>(
    prepare(groundPcApiCardOrderFrequencyInfoIdGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardOrderFrequencyInfoIdGet.requestConfig =
  groundPcApiCardOrderFrequencyInfoIdGetRequestConfig;

/**
 * 接口 [统计↗](https://yapi.huianrong.com/project/1764/interface/api/72180) 的 **请求类型**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/statistics`
 * @更新时间 `2023-02-20 14:39:47`
 */
export interface GroundPcApiCardOrderFrequencyStatisticsGetRequest {}

/**
 * 接口 [统计↗](https://yapi.huianrong.com/project/1764/interface/api/72180) 的 **返回类型**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/statistics`
 * @更新时间 `2023-02-20 14:39:47`
 */
export interface GroundPcApiCardOrderFrequencyStatisticsGetResponse {
  /**
   * 销售总金额
   */
  totalAmount?: number;
  /**
   * 销售张数
   */
  totalCardNum?: number;
  /**
   * 销售次数
   */
  totalNum?: number;
  /**
   * 已消费次数
   */
  totalConsumedNum?: number;
  /**
   * 未消费次数
   */
  totalUnConsumedNum?: number;
}

/**
 * 接口 [统计↗](https://yapi.huianrong.com/project/1764/interface/api/72180) 的 **请求配置的类型**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/statistics`
 * @更新时间 `2023-02-20 14:39:47`
 */
type GroundPcApiCardOrderFrequencyStatisticsGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card/order/frequency/statistics',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [统计↗](https://yapi.huianrong.com/project/1764/interface/api/72180) 的 **请求配置**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/statistics`
 * @更新时间 `2023-02-20 14:39:47`
 */
const groundPcApiCardOrderFrequencyStatisticsGetRequestConfig: GroundPcApiCardOrderFrequencyStatisticsGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_5,
    devUrl: devUrl_0_2_0_5,
    prodUrl: prodUrl_0_2_0_5,
    path: '/ground-pc-api/card/order/frequency/statistics',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_5,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderFrequencyStatisticsGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [统计↗](https://yapi.huianrong.com/project/1764/interface/api/72180) 的 **请求函数**
 *
 * @分类 [次卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23115)
 * @请求头 `GET /ground-pc-api/card/order/frequency/statistics`
 * @更新时间 `2023-02-20 14:39:47`
 */
export const groundPcApiCardOrderFrequencyStatisticsGet = /*#__PURE__*/ (
  requestData?: GroundPcApiCardOrderFrequencyStatisticsGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderFrequencyStatisticsGetResponse>(
    prepare(
      groundPcApiCardOrderFrequencyStatisticsGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiCardOrderFrequencyStatisticsGet.requestConfig =
  groundPcApiCardOrderFrequencyStatisticsGetRequestConfig;

const mockUrl_0_2_0_6 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_6 = '' as any;
const prodUrl_0_2_0_6 = '' as any;
const dataKey_0_2_0_6 = 'data' as any;

/**
 * 接口 [订单列表↗](https://yapi.huianrong.com/project/1764/interface/api/72170) 的 **请求类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/list`
 * @更新时间 `2023-02-27 17:15:35`
 */
export interface GroundPcApiCardOrderTimeLimitListGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 商铺id
   */
  storeId?: string;
  /**
   * 激活状态 1:未激活 2:已激活
   */
  activeStatus?: string;
  /**
   * 卡状态  1:使用中 2:已冻结 3:已过期
   */
  cardStatus?: string;
  /**
   * 购买时间-开始
   */
  purchaseStartTime?: string;
  /**
   * 购买时间-结束
   */
  purchaseEndTime?: string;
  /**
   * 购买渠道 1:线上 2:线下
   */
  purchaseChannel?: string;
  /**
   * 激活时间-开始
   */
  activeStartTime?: string;
  /**
   * 激活时间-结束
   */
  activeEndTime?: string;
  /**
   * 到期时间-开始
   */
  expirationStartTime?: string;
  /**
   * 到期时间-结束
   */
  expirationEndTime?: string;
  /**
   * 持卡人（姓名/电话/会员号）
   */
  memberKeyWord?: string;
  /**
   * 销售人员
   */
  salesStaffId?: string;
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
 * 接口 [订单列表↗](https://yapi.huianrong.com/project/1764/interface/api/72170) 的 **返回类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/list`
 * @更新时间 `2023-02-27 17:15:35`
 */
export interface GroundPcApiCardOrderTimeLimitListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 数据id
     */
    id?: number;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 店铺名字
     */
    storeName?: string;
    /**
     * 订单编号
     */
    orderNo?: string;
    /**
     * 卡名称
     */
    cardName?: string;
    /**
     * 卡类型 1:期限卡 2:次卡
     */
    cardType?: number;
    /**
     * 购买数量(期限卡为天数，次卡为次数）
     */
    buyNum?: number;
    /**
     * 购卡人姓名
     */
    membersName?: string;
    /**
     * 购卡人手机号
     */
    membersPhone?: string;
    /**
     * 购买渠道 1:线上 2:线下
     */
    purchaseChannel?: number;
    /**
     * 购买渠道 1:线上 2:线下
     */
    purchaseChannelName?: string;
    /**
     * 签单门店(操作人所属门店)
     */
    signStoreName?: string;
    /**
     * 激活状态 1:未激活 2:已激活
     */
    activeStatus?: number;
    /**
     * 激活状态 1:未激活 2:已激活
     */
    activeStatusName?: string;
    /**
     * 卡状态  1:使用中 2:已冻结 3:已过期
     */
    cardStatus?: number;
    /**
     * 卡状态
     */
    cardStatusName?: string;
    /**
     * 合同id
     */
    contractId?: number;
  }[];
}

/**
 * 接口 [订单列表↗](https://yapi.huianrong.com/project/1764/interface/api/72170) 的 **请求配置的类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/list`
 * @更新时间 `2023-02-27 17:15:35`
 */
type GroundPcApiCardOrderTimeLimitListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card/order/timeLimit/list',
    'data',
    string,
    | 'projectId'
    | 'storeId'
    | 'activeStatus'
    | 'cardStatus'
    | 'purchaseStartTime'
    | 'purchaseEndTime'
    | 'purchaseChannel'
    | 'activeStartTime'
    | 'activeEndTime'
    | 'expirationStartTime'
    | 'expirationEndTime'
    | 'memberKeyWord'
    | 'salesStaffId'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [订单列表↗](https://yapi.huianrong.com/project/1764/interface/api/72170) 的 **请求配置**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/list`
 * @更新时间 `2023-02-27 17:15:35`
 */
const groundPcApiCardOrderTimeLimitListGetRequestConfig: GroundPcApiCardOrderTimeLimitListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_6,
    devUrl: devUrl_0_2_0_6,
    prodUrl: prodUrl_0_2_0_6,
    path: '/ground-pc-api/card/order/timeLimit/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_6,
    paramNames: [],
    queryNames: [
      'projectId',
      'storeId',
      'activeStatus',
      'cardStatus',
      'purchaseStartTime',
      'purchaseEndTime',
      'purchaseChannel',
      'activeStartTime',
      'activeEndTime',
      'expirationStartTime',
      'expirationEndTime',
      'memberKeyWord',
      'salesStaffId',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderTimeLimitListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [订单列表↗](https://yapi.huianrong.com/project/1764/interface/api/72170) 的 **请求函数**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/list`
 * @更新时间 `2023-02-27 17:15:35`
 */
export const groundPcApiCardOrderTimeLimitListGet = /*#__PURE__*/ (
  requestData: GroundPcApiCardOrderTimeLimitListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderTimeLimitListGetResponse>(
    prepare(groundPcApiCardOrderTimeLimitListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardOrderTimeLimitListGet.requestConfig =
  groundPcApiCardOrderTimeLimitListGetRequestConfig;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72172) 的 **请求类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/info/{id}`
 * @更新时间 `2023-02-27 17:15:36`
 */
export interface GroundPcApiCardOrderTimeLimitInfoIdGetRequest {
  /**
   * 数据id
   */
  id: string;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72172) 的 **返回类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/info/{id}`
 * @更新时间 `2023-02-27 17:15:36`
 */
export interface GroundPcApiCardOrderTimeLimitInfoIdGetResponse {
  /**
   * 数据id
   */
  id?: number;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 场馆名称
   */
  venueName?: string;
  /**
   * 店铺名字
   */
  storeName?: string;
  /**
   * 激活状态 1:未激活 2:已激活
   */
  activeStatus?: number;
  /**
   * 激活状态
   */
  activeStatusName?: string;
  /**
   * 卡名称
   */
  cardName?: string;
  /**
   * 卡说明
   */
  cardRemark?: string;
  /**
   * 卡介绍
   */
  cardIntroduce?: string;
  /**
   * 购买时间
   */
  purchaseTime?: string;
  /**
   * 剩余天数
   */
  surplusNum?: number;
  /**
   * 剩余冻结天数
   */
  surplusFreezeNum?: number;
  /**
   * 会员号
   */
  membersCode?: string;
  /**
   * 购卡人姓名
   */
  membersName?: string;
  /**
   * 购卡人手机号
   */
  membersPhone?: string;
  /**
   * 购卡人身份证号
   */
  idCard?: string;
  /**
   * 时间（天）
   */
  num?: number;
  /**
   * 标价（元）
   */
  listPrice?: number;
  /**
   * 售价（元）
   */
  salePrice?: number;
  /**
   * 允许冻结天数
   */
  freezeNum?: number;
  /**
   * 赠送时间（天）
   */
  giveNum?: number;
  /**
   * 合计天数
   */
  totalNum?: number;
  /**
   * 支付类别  1微信  2支付宝  3储值卡
   */
  payType?: number;
  /**
   * 支付类别
   */
  payTypeName?: string;
  /**
   * 应付金额
   */
  meetAmount?: number;
  /**
   * 实付金额
   */
  payAmount?: number;
  /**
   * 激活方式 1购买激活 2第一次到店激活 3指定日期激活
   */
  activeType?: number;
  /**
   * 激活方式
   */
  activeTypeName?: string;
  /**
   * 入场时段
   */
  entrancePeriod?: string;
  /**
   * 是否支持转让（1：是、2：否）
   */
  transferState?: number;
  /**
   * 是否支持转让
   */
  transferStateName?: string;
  /**
   * 上架信息
   */
  groundingInfo?: number;
  /**
   * 销售人员姓名
   */
  salesStaffName?: string;
  /**
   * 合同id
   */
  contractId?: number;
  /**
   * 合同编号
   */
  contractCode?: string;
  /**
   * 合同备注
   */
  contractRemark?: string;
  /**
   * 使用记录
   */
  useRecords?: {
    /**
     * 入场时间
     */
    intoTime?: string;
    /**
     * 出场时间
     */
    outTime?: string;
    /**
     * 消耗时长
     */
    useDuration?: number;
  }[];
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72172) 的 **请求配置的类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/info/{id}`
 * @更新时间 `2023-02-27 17:15:36`
 */
type GroundPcApiCardOrderTimeLimitInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card/order/timeLimit/info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72172) 的 **请求配置**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/info/{id}`
 * @更新时间 `2023-02-27 17:15:36`
 */
const groundPcApiCardOrderTimeLimitInfoIdGetRequestConfig: GroundPcApiCardOrderTimeLimitInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_6,
    devUrl: devUrl_0_2_0_6,
    prodUrl: prodUrl_0_2_0_6,
    path: '/ground-pc-api/card/order/timeLimit/info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_6,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderTimeLimitInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72172) 的 **请求函数**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/info/{id}`
 * @更新时间 `2023-02-27 17:15:36`
 */
export const groundPcApiCardOrderTimeLimitInfoIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiCardOrderTimeLimitInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderTimeLimitInfoIdGetResponse>(
    prepare(groundPcApiCardOrderTimeLimitInfoIdGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardOrderTimeLimitInfoIdGet.requestConfig =
  groundPcApiCardOrderTimeLimitInfoIdGetRequestConfig;

/**
 * 接口 [冻结↗](https://yapi.huianrong.com/project/1764/interface/api/72174) 的 **请求类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `PUT /ground-pc-api/card/order/timeLimit/freeze`
 * @更新时间 `2023-02-27 17:15:37`
 */
export interface GroundPcApiCardOrderTimeLimitFreezePutRequest {
  /**
   * 订单ids
   */
  ids: number[];
  /**
   * 冻结时间-开始
   */
  startTime: string;
  /**
   * 冻结时间-结束
   */
  endTime: string;
}

/**
 * 接口 [冻结↗](https://yapi.huianrong.com/project/1764/interface/api/72174) 的 **返回类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `PUT /ground-pc-api/card/order/timeLimit/freeze`
 * @更新时间 `2023-02-27 17:15:37`
 */
export type GroundPcApiCardOrderTimeLimitFreezePutResponse = null;

/**
 * 接口 [冻结↗](https://yapi.huianrong.com/project/1764/interface/api/72174) 的 **请求配置的类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `PUT /ground-pc-api/card/order/timeLimit/freeze`
 * @更新时间 `2023-02-27 17:15:37`
 */
type GroundPcApiCardOrderTimeLimitFreezePutRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card/order/timeLimit/freeze',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [冻结↗](https://yapi.huianrong.com/project/1764/interface/api/72174) 的 **请求配置**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `PUT /ground-pc-api/card/order/timeLimit/freeze`
 * @更新时间 `2023-02-27 17:15:37`
 */
const groundPcApiCardOrderTimeLimitFreezePutRequestConfig: GroundPcApiCardOrderTimeLimitFreezePutRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_6,
    devUrl: devUrl_0_2_0_6,
    prodUrl: prodUrl_0_2_0_6,
    path: '/ground-pc-api/card/order/timeLimit/freeze',
    method: Method.PUT,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_6,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderTimeLimitFreezePut',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [冻结↗](https://yapi.huianrong.com/project/1764/interface/api/72174) 的 **请求函数**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `PUT /ground-pc-api/card/order/timeLimit/freeze`
 * @更新时间 `2023-02-27 17:15:37`
 */
export const groundPcApiCardOrderTimeLimitFreezePut = /*#__PURE__*/ (
  requestData: GroundPcApiCardOrderTimeLimitFreezePutRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderTimeLimitFreezePutResponse>(
    prepare(groundPcApiCardOrderTimeLimitFreezePutRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardOrderTimeLimitFreezePut.requestConfig =
  groundPcApiCardOrderTimeLimitFreezePutRequestConfig;

/**
 * 接口 [解冻↗](https://yapi.huianrong.com/project/1764/interface/api/72176) 的 **请求类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `PUT /ground-pc-api/card/order/timeLimit/thaw`
 * @更新时间 `2023-02-27 17:15:37`
 */
export interface GroundPcApiCardOrderTimeLimitThawPutRequest {
  /**
   * 订单ids
   */
  ids: number[];
}

/**
 * 接口 [解冻↗](https://yapi.huianrong.com/project/1764/interface/api/72176) 的 **返回类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `PUT /ground-pc-api/card/order/timeLimit/thaw`
 * @更新时间 `2023-02-27 17:15:37`
 */
export type GroundPcApiCardOrderTimeLimitThawPutResponse = null;

/**
 * 接口 [解冻↗](https://yapi.huianrong.com/project/1764/interface/api/72176) 的 **请求配置的类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `PUT /ground-pc-api/card/order/timeLimit/thaw`
 * @更新时间 `2023-02-27 17:15:37`
 */
type GroundPcApiCardOrderTimeLimitThawPutRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card/order/timeLimit/thaw',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [解冻↗](https://yapi.huianrong.com/project/1764/interface/api/72176) 的 **请求配置**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `PUT /ground-pc-api/card/order/timeLimit/thaw`
 * @更新时间 `2023-02-27 17:15:37`
 */
const groundPcApiCardOrderTimeLimitThawPutRequestConfig: GroundPcApiCardOrderTimeLimitThawPutRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_6,
    devUrl: devUrl_0_2_0_6,
    prodUrl: prodUrl_0_2_0_6,
    path: '/ground-pc-api/card/order/timeLimit/thaw',
    method: Method.PUT,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_6,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderTimeLimitThawPut',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [解冻↗](https://yapi.huianrong.com/project/1764/interface/api/72176) 的 **请求函数**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `PUT /ground-pc-api/card/order/timeLimit/thaw`
 * @更新时间 `2023-02-27 17:15:37`
 */
export const groundPcApiCardOrderTimeLimitThawPut = /*#__PURE__*/ (
  requestData: GroundPcApiCardOrderTimeLimitThawPutRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderTimeLimitThawPutResponse>(
    prepare(groundPcApiCardOrderTimeLimitThawPutRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardOrderTimeLimitThawPut.requestConfig =
  groundPcApiCardOrderTimeLimitThawPutRequestConfig;

/**
 * 接口 [统计↗](https://yapi.huianrong.com/project/1764/interface/api/72178) 的 **请求类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/statistics`
 * @更新时间 `2023-02-27 17:15:37`
 */
export interface GroundPcApiCardOrderTimeLimitStatisticsGetRequest {}

/**
 * 接口 [统计↗](https://yapi.huianrong.com/project/1764/interface/api/72178) 的 **返回类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/statistics`
 * @更新时间 `2023-02-27 17:15:37`
 */
export interface GroundPcApiCardOrderTimeLimitStatisticsGetResponse {
  /**
   * 销售总金额
   */
  totalAmount?: number;
  /**
   * 销售张数
   */
  totalCardNum?: number;
  /**
   * 销售次数
   */
  totalNum?: number;
  /**
   * 已消费次数
   */
  totalConsumedNum?: number;
  /**
   * 未消费次数
   */
  totalUnConsumedNum?: number;
}

/**
 * 接口 [统计↗](https://yapi.huianrong.com/project/1764/interface/api/72178) 的 **请求配置的类型**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/statistics`
 * @更新时间 `2023-02-27 17:15:37`
 */
type GroundPcApiCardOrderTimeLimitStatisticsGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card/order/timeLimit/statistics',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [统计↗](https://yapi.huianrong.com/project/1764/interface/api/72178) 的 **请求配置**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/statistics`
 * @更新时间 `2023-02-27 17:15:37`
 */
const groundPcApiCardOrderTimeLimitStatisticsGetRequestConfig: GroundPcApiCardOrderTimeLimitStatisticsGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_6,
    devUrl: devUrl_0_2_0_6,
    prodUrl: prodUrl_0_2_0_6,
    path: '/ground-pc-api/card/order/timeLimit/statistics',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_6,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderTimeLimitStatisticsGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [统计↗](https://yapi.huianrong.com/project/1764/interface/api/72178) 的 **请求函数**
 *
 * @分类 [期限卡销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23117)
 * @请求头 `GET /ground-pc-api/card/order/timeLimit/statistics`
 * @更新时间 `2023-02-27 17:15:37`
 */
export const groundPcApiCardOrderTimeLimitStatisticsGet = /*#__PURE__*/ (
  requestData?: GroundPcApiCardOrderTimeLimitStatisticsGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderTimeLimitStatisticsGetResponse>(
    prepare(
      groundPcApiCardOrderTimeLimitStatisticsGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiCardOrderTimeLimitStatisticsGet.requestConfig =
  groundPcApiCardOrderTimeLimitStatisticsGetRequestConfig;

const mockUrl_0_2_0_7 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_7 = '' as any;
const prodUrl_0_2_0_7 = '' as any;
const dataKey_0_2_0_7 = 'data' as any;

/**
 * 接口 [通过会员名称或手机号查询会员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72424) 的 **请求类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/searchMember`
 * @更新时间 `2023-03-02 09:37:50`
 */
export interface GroundPcApiMemberSearchMemberGetRequest {
  /**
   * 会员i的(String)
   */
  searchKey?: string;
}

/**
 * 接口 [通过会员名称或手机号查询会员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72424) 的 **返回类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/searchMember`
 * @更新时间 `2023-03-02 09:37:50`
 */
export type GroundPcApiMemberSearchMemberGetResponse = {
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
   * 会员来源.,1-小程序注册,2-老带新,3-顾问推荐,4-客户自到店,5-自主发掘;
   */
  sourceType?: number;
  /**
   * 性别,1-男；0-女
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
   * 标签id ,Long
   */
  labelIds?: number[];
}[];

/**
 * 接口 [通过会员名称或手机号查询会员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72424) 的 **请求配置的类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/searchMember`
 * @更新时间 `2023-03-02 09:37:50`
 */
type GroundPcApiMemberSearchMemberGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/member/searchMember',
    'data',
    string,
    'searchKey',
    false
  >
>;

/**
 * 接口 [通过会员名称或手机号查询会员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72424) 的 **请求配置**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/searchMember`
 * @更新时间 `2023-03-02 09:37:50`
 */
const groundPcApiMemberSearchMemberGetRequestConfig: GroundPcApiMemberSearchMemberGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_7,
    devUrl: devUrl_0_2_0_7,
    prodUrl: prodUrl_0_2_0_7,
    path: '/ground-pc-api/member/searchMember',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_7,
    paramNames: [],
    queryNames: ['searchKey'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMemberSearchMemberGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [通过会员名称或手机号查询会员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72424) 的 **请求函数**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/searchMember`
 * @更新时间 `2023-03-02 09:37:50`
 */
export const groundPcApiMemberSearchMemberGet = /*#__PURE__*/ (
  requestData: GroundPcApiMemberSearchMemberGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMemberSearchMemberGetResponse>(
    prepare(groundPcApiMemberSearchMemberGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiMemberSearchMemberGet.requestConfig =
  groundPcApiMemberSearchMemberGetRequestConfig;

/**
 * 接口 [会员新增↗](https://yapi.huianrong.com/project/1764/interface/api/72524) 的 **请求类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/add`
 * @更新时间 `2023-03-02 09:37:46`
 */
export interface GroundPcApiMemberAddPostRequest {
  /**
   * 项目id
   */
  projectId?: number;
  /**
   * 会员名称
   */
  name: string;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 身份证
   */
  identityNo?: string;
  /**
   * 会员来源.,1-小程序注册,2-老带新,3-顾问推荐,4-客户自到店,5-自主发掘;
   */
  sourceType?: number;
  /**
   * 性别,1-男；0-女
   */
  gender?: number;
  /**
   * 生日
   */
  birthDay?: string;
  /**
   * 会员标签ids ,Long
   */
  labelIds?: number[];
  /**
   * 头像
   */
  avatarUrl?: string;
  /**
   * 0-未成年,1-成年人
   */
  personType: number;
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
}

/**
 * 接口 [会员新增↗](https://yapi.huianrong.com/project/1764/interface/api/72524) 的 **返回类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/add`
 * @更新时间 `2023-03-02 09:37:46`
 */
export interface GroundPcApiMemberAddPostResponse {}

/**
 * 接口 [会员新增↗](https://yapi.huianrong.com/project/1764/interface/api/72524) 的 **请求配置的类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/add`
 * @更新时间 `2023-03-02 09:37:46`
 */
type GroundPcApiMemberAddPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/member/add',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [会员新增↗](https://yapi.huianrong.com/project/1764/interface/api/72524) 的 **请求配置**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/add`
 * @更新时间 `2023-03-02 09:37:46`
 */
const groundPcApiMemberAddPostRequestConfig: GroundPcApiMemberAddPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_7,
    devUrl: devUrl_0_2_0_7,
    prodUrl: prodUrl_0_2_0_7,
    path: '/ground-pc-api/member/add',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_7,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMemberAddPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [会员新增↗](https://yapi.huianrong.com/project/1764/interface/api/72524) 的 **请求函数**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/add`
 * @更新时间 `2023-03-02 09:37:46`
 */
export const groundPcApiMemberAddPost = /*#__PURE__*/ (
  requestData: GroundPcApiMemberAddPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMemberAddPostResponse>(
    prepare(groundPcApiMemberAddPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiMemberAddPost.requestConfig = groundPcApiMemberAddPostRequestConfig;

/**
 * 接口 [会员编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72526) 的 **请求类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/edit`
 * @更新时间 `2023-03-02 09:37:47`
 */
export interface GroundPcApiMemberEditPostRequest {
  id: number;
  /**
   * 项目id
   */
  projectId?: number;
  /**
   * 会员名称
   */
  name: string;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 身份证
   */
  identityNo?: string;
  /**
   * 会员来源.,1-小程序注册,2-老带新,3-顾问推荐,4-客户自到店,5-自主发掘;
   */
  sourceType?: number;
  /**
   * 性别,1-男；0-女
   */
  gender?: number;
  /**
   * 生日
   */
  birthDay?: string;
  /**
   * 会员标签ids ,Long
   */
  labelIds?: number[];
  /**
   * 头像
   */
  avatarUrl?: string;
  /**
   * 0-未成年,1-成年人
   */
  personType: number;
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
}

/**
 * 接口 [会员编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72526) 的 **返回类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/edit`
 * @更新时间 `2023-03-02 09:37:47`
 */
export interface GroundPcApiMemberEditPostResponse {}

/**
 * 接口 [会员编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72526) 的 **请求配置的类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/edit`
 * @更新时间 `2023-03-02 09:37:47`
 */
type GroundPcApiMemberEditPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/member/edit',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [会员编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72526) 的 **请求配置**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/edit`
 * @更新时间 `2023-03-02 09:37:47`
 */
const groundPcApiMemberEditPostRequestConfig: GroundPcApiMemberEditPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_7,
    devUrl: devUrl_0_2_0_7,
    prodUrl: prodUrl_0_2_0_7,
    path: '/ground-pc-api/member/edit',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_7,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMemberEditPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [会员编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72526) 的 **请求函数**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/edit`
 * @更新时间 `2023-03-02 09:37:47`
 */
export const groundPcApiMemberEditPost = /*#__PURE__*/ (
  requestData: GroundPcApiMemberEditPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMemberEditPostResponse>(
    prepare(groundPcApiMemberEditPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiMemberEditPost.requestConfig =
  groundPcApiMemberEditPostRequestConfig;

/**
 * 接口 [会员详情↗](https://yapi.huianrong.com/project/1764/interface/api/72528) 的 **请求类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/detail/{id}`
 * @更新时间 `2023-03-02 09:37:47`
 */
export interface GroundPcApiMemberDetailIdGetRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [会员详情↗](https://yapi.huianrong.com/project/1764/interface/api/72528) 的 **返回类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/detail/{id}`
 * @更新时间 `2023-03-02 09:37:47`
 */
export interface GroundPcApiMemberDetailIdGetResponse {
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
   * 会员来源.,1-小程序注册,2-老带新,3-顾问推荐,4-客户自到店,5-自主发掘;
   */
  sourceType?: number;
  /**
   * 性别,1-男；0-女
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
   * 标签id ,Long
   */
  labelIds?: number[];
}

/**
 * 接口 [会员详情↗](https://yapi.huianrong.com/project/1764/interface/api/72528) 的 **请求配置的类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/detail/{id}`
 * @更新时间 `2023-03-02 09:37:47`
 */
type GroundPcApiMemberDetailIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/member/detail/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [会员详情↗](https://yapi.huianrong.com/project/1764/interface/api/72528) 的 **请求配置**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/detail/{id}`
 * @更新时间 `2023-03-02 09:37:47`
 */
const groundPcApiMemberDetailIdGetRequestConfig: GroundPcApiMemberDetailIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_7,
    devUrl: devUrl_0_2_0_7,
    prodUrl: prodUrl_0_2_0_7,
    path: '/ground-pc-api/member/detail/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_7,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMemberDetailIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [会员详情↗](https://yapi.huianrong.com/project/1764/interface/api/72528) 的 **请求函数**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/detail/{id}`
 * @更新时间 `2023-03-02 09:37:47`
 */
export const groundPcApiMemberDetailIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiMemberDetailIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMemberDetailIdGetResponse>(
    prepare(groundPcApiMemberDetailIdGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiMemberDetailIdGet.requestConfig =
  groundPcApiMemberDetailIdGetRequestConfig;

/**
 * 接口 [会员列表↗](https://yapi.huianrong.com/project/1764/interface/api/72530) 的 **请求类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/page`
 * @更新时间 `2023-03-02 09:37:48`
 */
export interface GroundPcApiMemberPagePostRequest {
  /**
   * 项目id
   */
  projectId?: number;
  /**
   * 会员来源
   */
  sourceType?: number;
  /**
   * 会员标签ids ,Long
   */
  labelIds?: number[];
  /**
   * 姓名、电话、编号
   */
  keyword?: string;
  /**
   * 页码
   */
  pageSize: number;
  /**
   * 每页大小
   */
  pageNum: number;
}

/**
 * 接口 [会员列表↗](https://yapi.huianrong.com/project/1764/interface/api/72530) 的 **返回类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/page`
 * @更新时间 `2023-03-02 09:37:48`
 */
export interface GroundPcApiMemberPagePostResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 会员id
     */
    id?: number;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 用户编号
     */
    code?: string;
    /**
     * 用户头像
     */
    avatarUrl?: string;
    /**
     * 会员名称
     */
    name?: string;
    /**
     * 手机号码
     */
    phone?: string;
    /**
     * 用户昵称
     */
    nickName?: string;
    /**
     * 会员来源.,1-小程序注册,2-老带新,3-顾问推荐,4-客户自到店,5-自主发掘;
     */
    sourceType?: number;
    /**
     * 注册时间
     */
    createTime?: string;
    /**
     * 会员标签
     */
    labelNames?: string;
  }[];
}

/**
 * 接口 [会员列表↗](https://yapi.huianrong.com/project/1764/interface/api/72530) 的 **请求配置的类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/page`
 * @更新时间 `2023-03-02 09:37:48`
 */
type GroundPcApiMemberPagePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/member/page',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [会员列表↗](https://yapi.huianrong.com/project/1764/interface/api/72530) 的 **请求配置**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/page`
 * @更新时间 `2023-03-02 09:37:48`
 */
const groundPcApiMemberPagePostRequestConfig: GroundPcApiMemberPagePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_7,
    devUrl: devUrl_0_2_0_7,
    prodUrl: prodUrl_0_2_0_7,
    path: '/ground-pc-api/member/page',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_7,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMemberPagePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [会员列表↗](https://yapi.huianrong.com/project/1764/interface/api/72530) 的 **请求函数**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/page`
 * @更新时间 `2023-03-02 09:37:48`
 */
export const groundPcApiMemberPagePost = /*#__PURE__*/ (
  requestData: GroundPcApiMemberPagePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMemberPagePostResponse>(
    prepare(groundPcApiMemberPagePostRequestConfig, requestData),
    ...args
  );
};

groundPcApiMemberPagePost.requestConfig =
  groundPcApiMemberPagePostRequestConfig;

/**
 * 接口 [会员删除↗](https://yapi.huianrong.com/project/1764/interface/api/72532) 的 **请求类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/delete/{id}`
 * @更新时间 `2023-03-02 09:37:49`
 */
export interface GroundPcApiMemberDeleteIdGetRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [会员删除↗](https://yapi.huianrong.com/project/1764/interface/api/72532) 的 **返回类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/delete/{id}`
 * @更新时间 `2023-03-02 09:37:49`
 */
export interface GroundPcApiMemberDeleteIdGetResponse {}

/**
 * 接口 [会员删除↗](https://yapi.huianrong.com/project/1764/interface/api/72532) 的 **请求配置的类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/delete/{id}`
 * @更新时间 `2023-03-02 09:37:49`
 */
type GroundPcApiMemberDeleteIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/member/delete/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [会员删除↗](https://yapi.huianrong.com/project/1764/interface/api/72532) 的 **请求配置**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/delete/{id}`
 * @更新时间 `2023-03-02 09:37:49`
 */
const groundPcApiMemberDeleteIdGetRequestConfig: GroundPcApiMemberDeleteIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_7,
    devUrl: devUrl_0_2_0_7,
    prodUrl: prodUrl_0_2_0_7,
    path: '/ground-pc-api/member/delete/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_7,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMemberDeleteIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [会员删除↗](https://yapi.huianrong.com/project/1764/interface/api/72532) 的 **请求函数**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `GET /ground-pc-api/member/delete/{id}`
 * @更新时间 `2023-03-02 09:37:49`
 */
export const groundPcApiMemberDeleteIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiMemberDeleteIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMemberDeleteIdGetResponse>(
    prepare(groundPcApiMemberDeleteIdGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiMemberDeleteIdGet.requestConfig =
  groundPcApiMemberDeleteIdGetRequestConfig;

/**
 * 接口 [会员导出↗](https://yapi.huianrong.com/project/1764/interface/api/72534) 的 **请求类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/export`
 * @更新时间 `2023-03-02 09:37:50`
 */
export interface GroundPcApiMemberExportPostRequest {
  /**
   * 项目id
   */
  projectId?: number;
  /**
   * 会员来源
   */
  sourceType?: number;
  /**
   * 会员标签ids ,Long
   */
  labelIds?: number[];
  /**
   * 姓名、电话、编号
   */
  keyword?: string;
  /**
   * 选中需要导出的数据 ,Long
   */
  ids?: number[];
}

/**
 * 接口 [会员导出↗](https://yapi.huianrong.com/project/1764/interface/api/72534) 的 **返回类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/export`
 * @更新时间 `2023-03-02 09:37:50`
 */
export interface GroundPcApiMemberExportPostResponse {}

/**
 * 接口 [会员导出↗](https://yapi.huianrong.com/project/1764/interface/api/72534) 的 **请求配置的类型**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/export`
 * @更新时间 `2023-03-02 09:37:50`
 */
type GroundPcApiMemberExportPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/member/export',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [会员导出↗](https://yapi.huianrong.com/project/1764/interface/api/72534) 的 **请求配置**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/export`
 * @更新时间 `2023-03-02 09:37:50`
 */
const groundPcApiMemberExportPostRequestConfig: GroundPcApiMemberExportPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_7,
    devUrl: devUrl_0_2_0_7,
    prodUrl: prodUrl_0_2_0_7,
    path: '/ground-pc-api/member/export',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_7,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMemberExportPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [会员导出↗](https://yapi.huianrong.com/project/1764/interface/api/72534) 的 **请求函数**
 *
 * @分类 [会员管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23129)
 * @请求头 `POST /ground-pc-api/member/export`
 * @更新时间 `2023-03-02 09:37:50`
 */
export const groundPcApiMemberExportPost = /*#__PURE__*/ (
  requestData: GroundPcApiMemberExportPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMemberExportPostResponse>(
    prepare(groundPcApiMemberExportPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiMemberExportPost.requestConfig =
  groundPcApiMemberExportPostRequestConfig;

const mockUrl_0_2_0_8 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_8 = '' as any;
const prodUrl_0_2_0_8 = '' as any;
const dataKey_0_2_0_8 = 'data' as any;

/**
 * 接口 [编辑合同模版↗](https://yapi.huianrong.com/project/1764/interface/api/72216) 的 **请求类型**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/modify_template`
 * @更新时间 `2023-03-01 16:36:56`
 */
export interface GroundPcApiGroundContractTemplateModifyTemplatePostRequest {
  /**
   * 合同模版id
   */
  id: number;
  /**
   * 标题
   */
  title: string;
  /**
   * 内容
   */
  content: string;
  /**
   * 打印类型 1 一式两联 2 一式三联
   */
  printType: number;
}

/**
 * 接口 [编辑合同模版↗](https://yapi.huianrong.com/project/1764/interface/api/72216) 的 **返回类型**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/modify_template`
 * @更新时间 `2023-03-01 16:36:56`
 */
export interface GroundPcApiGroundContractTemplateModifyTemplatePostResponse {}

/**
 * 接口 [编辑合同模版↗](https://yapi.huianrong.com/project/1764/interface/api/72216) 的 **请求配置的类型**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/modify_template`
 * @更新时间 `2023-03-01 16:36:56`
 */
type GroundPcApiGroundContractTemplateModifyTemplatePostRequestConfig =
  Readonly<
    RequestConfig<
      'https://yapi.huianrong.com/mock/1764',
      '',
      '',
      '/ground-pc-api/ground/contract_template/modify_template',
      'data',
      string,
      string,
      false
    >
  >;

/**
 * 接口 [编辑合同模版↗](https://yapi.huianrong.com/project/1764/interface/api/72216) 的 **请求配置**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/modify_template`
 * @更新时间 `2023-03-01 16:36:56`
 */
const groundPcApiGroundContractTemplateModifyTemplatePostRequestConfig: GroundPcApiGroundContractTemplateModifyTemplatePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_8,
    devUrl: devUrl_0_2_0_8,
    prodUrl: prodUrl_0_2_0_8,
    path: '/ground-pc-api/ground/contract_template/modify_template',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiGroundContractTemplateModifyTemplatePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [编辑合同模版↗](https://yapi.huianrong.com/project/1764/interface/api/72216) 的 **请求函数**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/modify_template`
 * @更新时间 `2023-03-01 16:36:56`
 */
export const groundPcApiGroundContractTemplateModifyTemplatePost =
  /*#__PURE__*/ (
    requestData: GroundPcApiGroundContractTemplateModifyTemplatePostRequest,
    ...args: UserRequestRestArgs
  ) => {
    return request<GroundPcApiGroundContractTemplateModifyTemplatePostResponse>(
      prepare(
        groundPcApiGroundContractTemplateModifyTemplatePostRequestConfig,
        requestData
      ),
      ...args
    );
  };

groundPcApiGroundContractTemplateModifyTemplatePost.requestConfig =
  groundPcApiGroundContractTemplateModifyTemplatePostRequestConfig;

/**
 * 接口 [初始化店铺合同模版↗](https://yapi.huianrong.com/project/1764/interface/api/72218) 的 **请求类型**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/init_template`
 * @更新时间 `2023-03-01 16:36:56`
 */
export interface GroundPcApiGroundContractTemplateInitTemplatePostRequest {
  /**
   * 店铺id
   */
  storeId: number;
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 商户id
   */
  merchantId: number;
  /**
   * 客户端id
   */
  clientId: number;
  /**
   * 店铺名字
   */
  storeName: string;
  /**
   * 项目名字
   */
  projectName: string;
  /**
   * 商户名字
   */
  merchantName: string;
  /**
   * 创建人
   */
  createBy: string;
  /**
   * 创建时间
   */
  createTime: string;
}

/**
 * 接口 [初始化店铺合同模版↗](https://yapi.huianrong.com/project/1764/interface/api/72218) 的 **返回类型**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/init_template`
 * @更新时间 `2023-03-01 16:36:56`
 */
export interface GroundPcApiGroundContractTemplateInitTemplatePostResponse {}

/**
 * 接口 [初始化店铺合同模版↗](https://yapi.huianrong.com/project/1764/interface/api/72218) 的 **请求配置的类型**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/init_template`
 * @更新时间 `2023-03-01 16:36:56`
 */
type GroundPcApiGroundContractTemplateInitTemplatePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/ground/contract_template/init_template',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [初始化店铺合同模版↗](https://yapi.huianrong.com/project/1764/interface/api/72218) 的 **请求配置**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/init_template`
 * @更新时间 `2023-03-01 16:36:56`
 */
const groundPcApiGroundContractTemplateInitTemplatePostRequestConfig: GroundPcApiGroundContractTemplateInitTemplatePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_8,
    devUrl: devUrl_0_2_0_8,
    prodUrl: prodUrl_0_2_0_8,
    path: '/ground-pc-api/ground/contract_template/init_template',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiGroundContractTemplateInitTemplatePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [初始化店铺合同模版↗](https://yapi.huianrong.com/project/1764/interface/api/72218) 的 **请求函数**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/init_template`
 * @更新时间 `2023-03-01 16:36:56`
 */
export const groundPcApiGroundContractTemplateInitTemplatePost = /*#__PURE__*/ (
  requestData: GroundPcApiGroundContractTemplateInitTemplatePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiGroundContractTemplateInitTemplatePostResponse>(
    prepare(
      groundPcApiGroundContractTemplateInitTemplatePostRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiGroundContractTemplateInitTemplatePost.requestConfig =
  groundPcApiGroundContractTemplateInitTemplatePostRequestConfig;

/**
 * 接口 [合同模版列表↗](https://yapi.huianrong.com/project/1764/interface/api/72522) 的 **请求类型**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/get_template_by_req`
 * @更新时间 `2023-03-01 16:36:55`
 */
export interface GroundPcApiGroundContractTemplateGetTemplateByReqPostRequest {
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 店铺id集合
   */
  storeIdList?: number[];
}

/**
 * 接口 [合同模版列表↗](https://yapi.huianrong.com/project/1764/interface/api/72522) 的 **返回类型**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/get_template_by_req`
 * @更新时间 `2023-03-01 16:36:55`
 */
export type GroundPcApiGroundContractTemplateGetTemplateByReqPostResponse = {
  /**
   * id
   */
  id: number;
  /**
   * 模版内容
   */
  content: string;
  /**
   * 模版标题
   */
  title: string;
  /**
   * 模版类型 1 限期卡 2 次卡
   */
  templateType: number;
  /**
   * 打印类型 1 一式两联 2 一式三联
   */
  printType: number;
  /**
   * 店铺id
   */
  storeId: number;
  /**
   * 店铺名字
   */
  storeName: string;
}[];

/**
 * 接口 [合同模版列表↗](https://yapi.huianrong.com/project/1764/interface/api/72522) 的 **请求配置的类型**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/get_template_by_req`
 * @更新时间 `2023-03-01 16:36:55`
 */
type GroundPcApiGroundContractTemplateGetTemplateByReqPostRequestConfig =
  Readonly<
    RequestConfig<
      'https://yapi.huianrong.com/mock/1764',
      '',
      '',
      '/ground-pc-api/ground/contract_template/get_template_by_req',
      'data',
      string,
      string,
      false
    >
  >;

/**
 * 接口 [合同模版列表↗](https://yapi.huianrong.com/project/1764/interface/api/72522) 的 **请求配置**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/get_template_by_req`
 * @更新时间 `2023-03-01 16:36:55`
 */
const groundPcApiGroundContractTemplateGetTemplateByReqPostRequestConfig: GroundPcApiGroundContractTemplateGetTemplateByReqPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_8,
    devUrl: devUrl_0_2_0_8,
    prodUrl: prodUrl_0_2_0_8,
    path: '/ground-pc-api/ground/contract_template/get_template_by_req',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName:
      'groundPcApiGroundContractTemplateGetTemplateByReqPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [合同模版列表↗](https://yapi.huianrong.com/project/1764/interface/api/72522) 的 **请求函数**
 *
 * @分类 [合同模版设置↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23131)
 * @请求头 `POST /ground-pc-api/ground/contract_template/get_template_by_req`
 * @更新时间 `2023-03-01 16:36:55`
 */
export const groundPcApiGroundContractTemplateGetTemplateByReqPost =
  /*#__PURE__*/ (
    requestData: GroundPcApiGroundContractTemplateGetTemplateByReqPostRequest,
    ...args: UserRequestRestArgs
  ) => {
    return request<GroundPcApiGroundContractTemplateGetTemplateByReqPostResponse>(
      prepare(
        groundPcApiGroundContractTemplateGetTemplateByReqPostRequestConfig,
        requestData
      ),
      ...args
    );
  };

groundPcApiGroundContractTemplateGetTemplateByReqPost.requestConfig =
  groundPcApiGroundContractTemplateGetTemplateByReqPostRequestConfig;

const mockUrl_0_2_0_10 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_10 = '' as any;
const prodUrl_0_2_0_10 = '' as any;
const dataKey_0_2_0_10 = 'data' as any;

/**
 * 接口 [分类列表↗](https://yapi.huianrong.com/project/1764/interface/api/72230) 的 **请求类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `GET /ground-pc-api/product-attribute/classify-list`
 * @更新时间 `2023-02-23 20:19:19`
 */
export interface GroundPcApiProductAttributeClassifyListGetRequest {}

/**
 * 接口 [分类列表↗](https://yapi.huianrong.com/project/1764/interface/api/72230) 的 **返回类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `GET /ground-pc-api/product-attribute/classify-list`
 * @更新时间 `2023-02-23 20:19:19`
 */
export type GroundPcApiProductAttributeClassifyListGetResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 父id
   */
  pid?: number;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 分类名称
   */
  name?: string;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 是否允许添加子分类（true允许）
   */
  allow?: boolean;
  /**
   * 子集数据 ,ProductClassifyListDto
   */
  children?: {
    [k: string]: unknown;
  }[];
}[];

/**
 * 接口 [分类列表↗](https://yapi.huianrong.com/project/1764/interface/api/72230) 的 **请求配置的类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `GET /ground-pc-api/product-attribute/classify-list`
 * @更新时间 `2023-02-23 20:19:19`
 */
type GroundPcApiProductAttributeClassifyListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/classify-list',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [分类列表↗](https://yapi.huianrong.com/project/1764/interface/api/72230) 的 **请求配置**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `GET /ground-pc-api/product-attribute/classify-list`
 * @更新时间 `2023-02-23 20:19:19`
 */
const groundPcApiProductAttributeClassifyListGetRequestConfig: GroundPcApiProductAttributeClassifyListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_10,
    devUrl: devUrl_0_2_0_10,
    prodUrl: prodUrl_0_2_0_10,
    path: '/ground-pc-api/product-attribute/classify-list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_10,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeClassifyListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分类列表↗](https://yapi.huianrong.com/project/1764/interface/api/72230) 的 **请求函数**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `GET /ground-pc-api/product-attribute/classify-list`
 * @更新时间 `2023-02-23 20:19:19`
 */
export const groundPcApiProductAttributeClassifyListGet = /*#__PURE__*/ (
  requestData?: GroundPcApiProductAttributeClassifyListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeClassifyListGetResponse>(
    prepare(
      groundPcApiProductAttributeClassifyListGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiProductAttributeClassifyListGet.requestConfig =
  groundPcApiProductAttributeClassifyListGetRequestConfig;

/**
 * 接口 [新增分类↗](https://yapi.huianrong.com/project/1764/interface/api/72232) 的 **请求类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-add`
 * @更新时间 `2023-02-23 20:19:20`
 */
export interface GroundPcApiProductAttributeClassifyAddPostRequest {
  /**
   * 父级id为空是顶级
   */
  pid?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 项目ID
   */
  projectId?: number;
  /**
   * 门店ID ,Long
   */
  storeId?: number[];
  /**
   * 分类名称
   */
  name: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [新增分类↗](https://yapi.huianrong.com/project/1764/interface/api/72232) 的 **返回类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-add`
 * @更新时间 `2023-02-23 20:19:20`
 */
export type GroundPcApiProductAttributeClassifyAddPostResponse = number;

/**
 * 接口 [新增分类↗](https://yapi.huianrong.com/project/1764/interface/api/72232) 的 **请求配置的类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-add`
 * @更新时间 `2023-02-23 20:19:20`
 */
type GroundPcApiProductAttributeClassifyAddPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/classify-add',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增分类↗](https://yapi.huianrong.com/project/1764/interface/api/72232) 的 **请求配置**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-add`
 * @更新时间 `2023-02-23 20:19:20`
 */
const groundPcApiProductAttributeClassifyAddPostRequestConfig: GroundPcApiProductAttributeClassifyAddPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_10,
    devUrl: devUrl_0_2_0_10,
    prodUrl: prodUrl_0_2_0_10,
    path: '/ground-pc-api/product-attribute/classify-add',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_10,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeClassifyAddPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [新增分类↗](https://yapi.huianrong.com/project/1764/interface/api/72232) 的 **请求函数**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-add`
 * @更新时间 `2023-02-23 20:19:20`
 */
export const groundPcApiProductAttributeClassifyAddPost = /*#__PURE__*/ (
  requestData: GroundPcApiProductAttributeClassifyAddPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeClassifyAddPostResponse>(
    prepare(
      groundPcApiProductAttributeClassifyAddPostRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiProductAttributeClassifyAddPost.requestConfig =
  groundPcApiProductAttributeClassifyAddPostRequestConfig;

/**
 * 接口 [分类详情↗](https://yapi.huianrong.com/project/1764/interface/api/72234) 的 **请求类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `GET /ground-pc-api/product-attribute/classify-info/{id}`
 * @更新时间 `2023-02-23 20:19:21`
 */
export interface GroundPcApiProductAttributeClassifyInfoIdGetRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [分类详情↗](https://yapi.huianrong.com/project/1764/interface/api/72234) 的 **返回类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `GET /ground-pc-api/product-attribute/classify-info/{id}`
 * @更新时间 `2023-02-23 20:19:21`
 */
export interface GroundPcApiProductAttributeClassifyInfoIdGetResponse {
  /**
   * 父级id
   */
  pid?: number;
  /**
   * id
   */
  id?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 分类名称
   */
  name?: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [分类详情↗](https://yapi.huianrong.com/project/1764/interface/api/72234) 的 **请求配置的类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `GET /ground-pc-api/product-attribute/classify-info/{id}`
 * @更新时间 `2023-02-23 20:19:21`
 */
type GroundPcApiProductAttributeClassifyInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/classify-info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [分类详情↗](https://yapi.huianrong.com/project/1764/interface/api/72234) 的 **请求配置**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `GET /ground-pc-api/product-attribute/classify-info/{id}`
 * @更新时间 `2023-02-23 20:19:21`
 */
const groundPcApiProductAttributeClassifyInfoIdGetRequestConfig: GroundPcApiProductAttributeClassifyInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_10,
    devUrl: devUrl_0_2_0_10,
    prodUrl: prodUrl_0_2_0_10,
    path: '/ground-pc-api/product-attribute/classify-info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_10,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeClassifyInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分类详情↗](https://yapi.huianrong.com/project/1764/interface/api/72234) 的 **请求函数**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `GET /ground-pc-api/product-attribute/classify-info/{id}`
 * @更新时间 `2023-02-23 20:19:21`
 */
export const groundPcApiProductAttributeClassifyInfoIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiProductAttributeClassifyInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeClassifyInfoIdGetResponse>(
    prepare(
      groundPcApiProductAttributeClassifyInfoIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiProductAttributeClassifyInfoIdGet.requestConfig =
  groundPcApiProductAttributeClassifyInfoIdGetRequestConfig;

/**
 * 接口 [编辑分类↗](https://yapi.huianrong.com/project/1764/interface/api/72236) 的 **请求类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-update`
 * @更新时间 `2023-02-23 20:19:22`
 */
export interface GroundPcApiProductAttributeClassifyUpdatePostRequest {
  /**
   * id
   */
  id: number;
  /**
   * 父级id为空是顶级
   */
  pid?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 项目ID
   */
  projectId?: number;
  /**
   * 门店ID ,Long
   */
  storeId?: number[];
  /**
   * 分类名称
   */
  name: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [编辑分类↗](https://yapi.huianrong.com/project/1764/interface/api/72236) 的 **返回类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-update`
 * @更新时间 `2023-02-23 20:19:22`
 */
export type GroundPcApiProductAttributeClassifyUpdatePostResponse = number;

/**
 * 接口 [编辑分类↗](https://yapi.huianrong.com/project/1764/interface/api/72236) 的 **请求配置的类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-update`
 * @更新时间 `2023-02-23 20:19:22`
 */
type GroundPcApiProductAttributeClassifyUpdatePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/classify-update',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [编辑分类↗](https://yapi.huianrong.com/project/1764/interface/api/72236) 的 **请求配置**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-update`
 * @更新时间 `2023-02-23 20:19:22`
 */
const groundPcApiProductAttributeClassifyUpdatePostRequestConfig: GroundPcApiProductAttributeClassifyUpdatePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_10,
    devUrl: devUrl_0_2_0_10,
    prodUrl: prodUrl_0_2_0_10,
    path: '/ground-pc-api/product-attribute/classify-update',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_10,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeClassifyUpdatePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [编辑分类↗](https://yapi.huianrong.com/project/1764/interface/api/72236) 的 **请求函数**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-update`
 * @更新时间 `2023-02-23 20:19:22`
 */
export const groundPcApiProductAttributeClassifyUpdatePost = /*#__PURE__*/ (
  requestData: GroundPcApiProductAttributeClassifyUpdatePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeClassifyUpdatePostResponse>(
    prepare(
      groundPcApiProductAttributeClassifyUpdatePostRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiProductAttributeClassifyUpdatePost.requestConfig =
  groundPcApiProductAttributeClassifyUpdatePostRequestConfig;

/**
 * 接口 [删除分类↗](https://yapi.huianrong.com/project/1764/interface/api/72238) 的 **请求类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-delete`
 * @更新时间 `2023-02-23 20:19:23`
 */
export interface GroundPcApiProductAttributeClassifyDeletePostRequest {
  /**
   * 父级id
   */
  pid?: number;
  /**
   * id
   */
  id: number;
}

/**
 * 接口 [删除分类↗](https://yapi.huianrong.com/project/1764/interface/api/72238) 的 **返回类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-delete`
 * @更新时间 `2023-02-23 20:19:23`
 */
export type GroundPcApiProductAttributeClassifyDeletePostResponse = number;

/**
 * 接口 [删除分类↗](https://yapi.huianrong.com/project/1764/interface/api/72238) 的 **请求配置的类型**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-delete`
 * @更新时间 `2023-02-23 20:19:23`
 */
type GroundPcApiProductAttributeClassifyDeletePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/classify-delete',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [删除分类↗](https://yapi.huianrong.com/project/1764/interface/api/72238) 的 **请求配置**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-delete`
 * @更新时间 `2023-02-23 20:19:23`
 */
const groundPcApiProductAttributeClassifyDeletePostRequestConfig: GroundPcApiProductAttributeClassifyDeletePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_10,
    devUrl: devUrl_0_2_0_10,
    prodUrl: prodUrl_0_2_0_10,
    path: '/ground-pc-api/product-attribute/classify-delete',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_10,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeClassifyDeletePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [删除分类↗](https://yapi.huianrong.com/project/1764/interface/api/72238) 的 **请求函数**
 *
 * @分类 [商品分类↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23139)
 * @请求头 `POST /ground-pc-api/product-attribute/classify-delete`
 * @更新时间 `2023-02-23 20:19:23`
 */
export const groundPcApiProductAttributeClassifyDeletePost = /*#__PURE__*/ (
  requestData: GroundPcApiProductAttributeClassifyDeletePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeClassifyDeletePostResponse>(
    prepare(
      groundPcApiProductAttributeClassifyDeletePostRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiProductAttributeClassifyDeletePost.requestConfig =
  groundPcApiProductAttributeClassifyDeletePostRequestConfig;

const mockUrl_0_2_0_11 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_11 = '' as any;
const prodUrl_0_2_0_11 = '' as any;
const dataKey_0_2_0_11 = 'data' as any;

/**
 * 接口 [新增规格↗](https://yapi.huianrong.com/project/1764/interface/api/72240) 的 **请求类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-add`
 * @更新时间 `2023-02-23 20:19:23`
 */
export interface GroundPcApiProductAttributeSpecificationsAddPostRequest {
  /**
   * 父级id(可以为空，为空是添加顶级)
   */
  pid?: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 分类名称
   */
  name: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [新增规格↗](https://yapi.huianrong.com/project/1764/interface/api/72240) 的 **返回类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-add`
 * @更新时间 `2023-02-23 20:19:23`
 */
export type GroundPcApiProductAttributeSpecificationsAddPostResponse = number;

/**
 * 接口 [新增规格↗](https://yapi.huianrong.com/project/1764/interface/api/72240) 的 **请求配置的类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-add`
 * @更新时间 `2023-02-23 20:19:23`
 */
type GroundPcApiProductAttributeSpecificationsAddPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/specifications-add',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增规格↗](https://yapi.huianrong.com/project/1764/interface/api/72240) 的 **请求配置**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-add`
 * @更新时间 `2023-02-23 20:19:23`
 */
const groundPcApiProductAttributeSpecificationsAddPostRequestConfig: GroundPcApiProductAttributeSpecificationsAddPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_11,
    devUrl: devUrl_0_2_0_11,
    prodUrl: prodUrl_0_2_0_11,
    path: '/ground-pc-api/product-attribute/specifications-add',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_11,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeSpecificationsAddPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [新增规格↗](https://yapi.huianrong.com/project/1764/interface/api/72240) 的 **请求函数**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-add`
 * @更新时间 `2023-02-23 20:19:23`
 */
export const groundPcApiProductAttributeSpecificationsAddPost = /*#__PURE__*/ (
  requestData: GroundPcApiProductAttributeSpecificationsAddPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeSpecificationsAddPostResponse>(
    prepare(
      groundPcApiProductAttributeSpecificationsAddPostRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiProductAttributeSpecificationsAddPost.requestConfig =
  groundPcApiProductAttributeSpecificationsAddPostRequestConfig;

/**
 * 接口 [规格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72242) 的 **请求类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `GET /ground-pc-api/product-attribute/specifications-list`
 * @更新时间 `2023-02-23 20:19:24`
 */
export interface GroundPcApiProductAttributeSpecificationsListGetRequest {}

/**
 * 接口 [规格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72242) 的 **返回类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `GET /ground-pc-api/product-attribute/specifications-list`
 * @更新时间 `2023-02-23 20:19:24`
 */
export type GroundPcApiProductAttributeSpecificationsListGetResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 父id
   */
  pid?: number;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 分类名称
   */
  name?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 是否允许添加子分类（true允许）
   */
  allow?: boolean;
  /**
   * 子集数据 ,ProductSpecificationsListDto
   */
  children?: {
    [k: string]: unknown;
  }[];
}[];

/**
 * 接口 [规格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72242) 的 **请求配置的类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `GET /ground-pc-api/product-attribute/specifications-list`
 * @更新时间 `2023-02-23 20:19:24`
 */
type GroundPcApiProductAttributeSpecificationsListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/specifications-list',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [规格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72242) 的 **请求配置**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `GET /ground-pc-api/product-attribute/specifications-list`
 * @更新时间 `2023-02-23 20:19:24`
 */
const groundPcApiProductAttributeSpecificationsListGetRequestConfig: GroundPcApiProductAttributeSpecificationsListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_11,
    devUrl: devUrl_0_2_0_11,
    prodUrl: prodUrl_0_2_0_11,
    path: '/ground-pc-api/product-attribute/specifications-list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_11,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeSpecificationsListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [规格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72242) 的 **请求函数**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `GET /ground-pc-api/product-attribute/specifications-list`
 * @更新时间 `2023-02-23 20:19:24`
 */
export const groundPcApiProductAttributeSpecificationsListGet = /*#__PURE__*/ (
  requestData?: GroundPcApiProductAttributeSpecificationsListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeSpecificationsListGetResponse>(
    prepare(
      groundPcApiProductAttributeSpecificationsListGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiProductAttributeSpecificationsListGet.requestConfig =
  groundPcApiProductAttributeSpecificationsListGetRequestConfig;

/**
 * 接口 [规格详情↗](https://yapi.huianrong.com/project/1764/interface/api/72244) 的 **请求类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `GET /ground-pc-api/product-attribute/specifications-info/{id}`
 * @更新时间 `2023-02-23 20:19:25`
 */
export interface GroundPcApiProductAttributeSpecificationsInfoIdGetRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [规格详情↗](https://yapi.huianrong.com/project/1764/interface/api/72244) 的 **返回类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `GET /ground-pc-api/product-attribute/specifications-info/{id}`
 * @更新时间 `2023-02-23 20:19:25`
 */
export interface GroundPcApiProductAttributeSpecificationsInfoIdGetResponse {
  /**
   * 父级id
   */
  pid?: number;
  /**
   * id
   */
  id?: number;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 规格名称规格值
   */
  name?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 是否允许添加规格值（true允许）
   */
  allow?: boolean;
  /**
   * 子集数据 ,ProductSpecificationsInfoDto
   */
  children?: {
    [k: string]: unknown;
  }[];
}

/**
 * 接口 [规格详情↗](https://yapi.huianrong.com/project/1764/interface/api/72244) 的 **请求配置的类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `GET /ground-pc-api/product-attribute/specifications-info/{id}`
 * @更新时间 `2023-02-23 20:19:25`
 */
type GroundPcApiProductAttributeSpecificationsInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/specifications-info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [规格详情↗](https://yapi.huianrong.com/project/1764/interface/api/72244) 的 **请求配置**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `GET /ground-pc-api/product-attribute/specifications-info/{id}`
 * @更新时间 `2023-02-23 20:19:25`
 */
const groundPcApiProductAttributeSpecificationsInfoIdGetRequestConfig: GroundPcApiProductAttributeSpecificationsInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_11,
    devUrl: devUrl_0_2_0_11,
    prodUrl: prodUrl_0_2_0_11,
    path: '/ground-pc-api/product-attribute/specifications-info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_11,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeSpecificationsInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [规格详情↗](https://yapi.huianrong.com/project/1764/interface/api/72244) 的 **请求函数**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `GET /ground-pc-api/product-attribute/specifications-info/{id}`
 * @更新时间 `2023-02-23 20:19:25`
 */
export const groundPcApiProductAttributeSpecificationsInfoIdGet =
  /*#__PURE__*/ (
    requestData: GroundPcApiProductAttributeSpecificationsInfoIdGetRequest,
    ...args: UserRequestRestArgs
  ) => {
    return request<GroundPcApiProductAttributeSpecificationsInfoIdGetResponse>(
      prepare(
        groundPcApiProductAttributeSpecificationsInfoIdGetRequestConfig,
        requestData
      ),
      ...args
    );
  };

groundPcApiProductAttributeSpecificationsInfoIdGet.requestConfig =
  groundPcApiProductAttributeSpecificationsInfoIdGetRequestConfig;

/**
 * 接口 [编辑规格↗](https://yapi.huianrong.com/project/1764/interface/api/72246) 的 **请求类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-update`
 * @更新时间 `2023-02-23 20:19:26`
 */
export interface GroundPcApiProductAttributeSpecificationsUpdatePostRequest {
  /**
   * 父级id
   */
  pid?: number;
  /**
   * id
   */
  id: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 分类名称
   */
  name: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [编辑规格↗](https://yapi.huianrong.com/project/1764/interface/api/72246) 的 **返回类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-update`
 * @更新时间 `2023-02-23 20:19:26`
 */
export type GroundPcApiProductAttributeSpecificationsUpdatePostResponse =
  number;

/**
 * 接口 [编辑规格↗](https://yapi.huianrong.com/project/1764/interface/api/72246) 的 **请求配置的类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-update`
 * @更新时间 `2023-02-23 20:19:26`
 */
type GroundPcApiProductAttributeSpecificationsUpdatePostRequestConfig =
  Readonly<
    RequestConfig<
      'https://yapi.huianrong.com/mock/1764',
      '',
      '',
      '/ground-pc-api/product-attribute/specifications-update',
      'data',
      string,
      string,
      false
    >
  >;

/**
 * 接口 [编辑规格↗](https://yapi.huianrong.com/project/1764/interface/api/72246) 的 **请求配置**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-update`
 * @更新时间 `2023-02-23 20:19:26`
 */
const groundPcApiProductAttributeSpecificationsUpdatePostRequestConfig: GroundPcApiProductAttributeSpecificationsUpdatePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_11,
    devUrl: devUrl_0_2_0_11,
    prodUrl: prodUrl_0_2_0_11,
    path: '/ground-pc-api/product-attribute/specifications-update',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_11,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeSpecificationsUpdatePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [编辑规格↗](https://yapi.huianrong.com/project/1764/interface/api/72246) 的 **请求函数**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-update`
 * @更新时间 `2023-02-23 20:19:26`
 */
export const groundPcApiProductAttributeSpecificationsUpdatePost =
  /*#__PURE__*/ (
    requestData: GroundPcApiProductAttributeSpecificationsUpdatePostRequest,
    ...args: UserRequestRestArgs
  ) => {
    return request<GroundPcApiProductAttributeSpecificationsUpdatePostResponse>(
      prepare(
        groundPcApiProductAttributeSpecificationsUpdatePostRequestConfig,
        requestData
      ),
      ...args
    );
  };

groundPcApiProductAttributeSpecificationsUpdatePost.requestConfig =
  groundPcApiProductAttributeSpecificationsUpdatePostRequestConfig;

/**
 * 接口 [删除规格↗](https://yapi.huianrong.com/project/1764/interface/api/72248) 的 **请求类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-delete`
 * @更新时间 `2023-02-23 20:19:26`
 */
export interface GroundPcApiProductAttributeSpecificationsDeletePostRequest {
  /**
   * 父级id
   */
  pid?: number;
  /**
   * id
   */
  id: number;
}

/**
 * 接口 [删除规格↗](https://yapi.huianrong.com/project/1764/interface/api/72248) 的 **返回类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-delete`
 * @更新时间 `2023-02-23 20:19:26`
 */
export type GroundPcApiProductAttributeSpecificationsDeletePostResponse =
  number;

/**
 * 接口 [删除规格↗](https://yapi.huianrong.com/project/1764/interface/api/72248) 的 **请求配置的类型**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-delete`
 * @更新时间 `2023-02-23 20:19:26`
 */
type GroundPcApiProductAttributeSpecificationsDeletePostRequestConfig =
  Readonly<
    RequestConfig<
      'https://yapi.huianrong.com/mock/1764',
      '',
      '',
      '/ground-pc-api/product-attribute/specifications-delete',
      'data',
      string,
      string,
      false
    >
  >;

/**
 * 接口 [删除规格↗](https://yapi.huianrong.com/project/1764/interface/api/72248) 的 **请求配置**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-delete`
 * @更新时间 `2023-02-23 20:19:26`
 */
const groundPcApiProductAttributeSpecificationsDeletePostRequestConfig: GroundPcApiProductAttributeSpecificationsDeletePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_11,
    devUrl: devUrl_0_2_0_11,
    prodUrl: prodUrl_0_2_0_11,
    path: '/ground-pc-api/product-attribute/specifications-delete',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_11,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeSpecificationsDeletePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [删除规格↗](https://yapi.huianrong.com/project/1764/interface/api/72248) 的 **请求函数**
 *
 * @分类 [商品规格↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23141)
 * @请求头 `POST /ground-pc-api/product-attribute/specifications-delete`
 * @更新时间 `2023-02-23 20:19:26`
 */
export const groundPcApiProductAttributeSpecificationsDeletePost =
  /*#__PURE__*/ (
    requestData: GroundPcApiProductAttributeSpecificationsDeletePostRequest,
    ...args: UserRequestRestArgs
  ) => {
    return request<GroundPcApiProductAttributeSpecificationsDeletePostResponse>(
      prepare(
        groundPcApiProductAttributeSpecificationsDeletePostRequestConfig,
        requestData
      ),
      ...args
    );
  };

groundPcApiProductAttributeSpecificationsDeletePost.requestConfig =
  groundPcApiProductAttributeSpecificationsDeletePostRequestConfig;

const mockUrl_0_2_0_12 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_12 = '' as any;
const prodUrl_0_2_0_12 = '' as any;
const dataKey_0_2_0_12 = 'data' as any;

/**
 * 接口 [新增品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72250) 的 **请求类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-add`
 * @更新时间 `2023-02-23 20:19:28`
 */
export interface GroundPcApiProductAttributeBrandAddPostRequest {
  /**
   * 排序
   */
  sort?: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 文件
   */
  file?: string;
}

/**
 * 接口 [新增品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72250) 的 **返回类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-add`
 * @更新时间 `2023-02-23 20:19:28`
 */
export type GroundPcApiProductAttributeBrandAddPostResponse = number;

/**
 * 接口 [新增品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72250) 的 **请求配置的类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-add`
 * @更新时间 `2023-02-23 20:19:28`
 */
type GroundPcApiProductAttributeBrandAddPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/brand-add',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72250) 的 **请求配置**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-add`
 * @更新时间 `2023-02-23 20:19:28`
 */
const groundPcApiProductAttributeBrandAddPostRequestConfig: GroundPcApiProductAttributeBrandAddPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_12,
    devUrl: devUrl_0_2_0_12,
    prodUrl: prodUrl_0_2_0_12,
    path: '/ground-pc-api/product-attribute/brand-add',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_12,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeBrandAddPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [新增品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72250) 的 **请求函数**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-add`
 * @更新时间 `2023-02-23 20:19:28`
 */
export const groundPcApiProductAttributeBrandAddPost = /*#__PURE__*/ (
  requestData: GroundPcApiProductAttributeBrandAddPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeBrandAddPostResponse>(
    prepare(groundPcApiProductAttributeBrandAddPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiProductAttributeBrandAddPost.requestConfig =
  groundPcApiProductAttributeBrandAddPostRequestConfig;

/**
 * 接口 [编辑品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72252) 的 **请求类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-update`
 * @更新时间 `2023-02-23 20:19:29`
 */
export interface GroundPcApiProductAttributeBrandUpdatePostRequest {
  id: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 文件
   */
  file?: string;
}

/**
 * 接口 [编辑品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72252) 的 **返回类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-update`
 * @更新时间 `2023-02-23 20:19:29`
 */
export type GroundPcApiProductAttributeBrandUpdatePostResponse = number;

/**
 * 接口 [编辑品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72252) 的 **请求配置的类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-update`
 * @更新时间 `2023-02-23 20:19:29`
 */
type GroundPcApiProductAttributeBrandUpdatePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/brand-update',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [编辑品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72252) 的 **请求配置**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-update`
 * @更新时间 `2023-02-23 20:19:29`
 */
const groundPcApiProductAttributeBrandUpdatePostRequestConfig: GroundPcApiProductAttributeBrandUpdatePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_12,
    devUrl: devUrl_0_2_0_12,
    prodUrl: prodUrl_0_2_0_12,
    path: '/ground-pc-api/product-attribute/brand-update',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_12,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeBrandUpdatePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [编辑品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72252) 的 **请求函数**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-update`
 * @更新时间 `2023-02-23 20:19:29`
 */
export const groundPcApiProductAttributeBrandUpdatePost = /*#__PURE__*/ (
  requestData: GroundPcApiProductAttributeBrandUpdatePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeBrandUpdatePostResponse>(
    prepare(
      groundPcApiProductAttributeBrandUpdatePostRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiProductAttributeBrandUpdatePost.requestConfig =
  groundPcApiProductAttributeBrandUpdatePostRequestConfig;

/**
 * 接口 [删除品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72254) 的 **请求类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-delete`
 * @更新时间 `2023-02-23 20:19:31`
 */
export interface GroundPcApiProductAttributeBrandDeletePostRequest {
  id: number;
}

/**
 * 接口 [删除品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72254) 的 **返回类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-delete`
 * @更新时间 `2023-02-23 20:19:31`
 */
export type GroundPcApiProductAttributeBrandDeletePostResponse = number;

/**
 * 接口 [删除品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72254) 的 **请求配置的类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-delete`
 * @更新时间 `2023-02-23 20:19:31`
 */
type GroundPcApiProductAttributeBrandDeletePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/brand-delete',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [删除品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72254) 的 **请求配置**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-delete`
 * @更新时间 `2023-02-23 20:19:31`
 */
const groundPcApiProductAttributeBrandDeletePostRequestConfig: GroundPcApiProductAttributeBrandDeletePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_12,
    devUrl: devUrl_0_2_0_12,
    prodUrl: prodUrl_0_2_0_12,
    path: '/ground-pc-api/product-attribute/brand-delete',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_12,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeBrandDeletePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [删除品牌↗](https://yapi.huianrong.com/project/1764/interface/api/72254) 的 **请求函数**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `POST /ground-pc-api/product-attribute/brand-delete`
 * @更新时间 `2023-02-23 20:19:31`
 */
export const groundPcApiProductAttributeBrandDeletePost = /*#__PURE__*/ (
  requestData: GroundPcApiProductAttributeBrandDeletePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeBrandDeletePostResponse>(
    prepare(
      groundPcApiProductAttributeBrandDeletePostRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiProductAttributeBrandDeletePost.requestConfig =
  groundPcApiProductAttributeBrandDeletePostRequestConfig;

/**
 * 接口 [品牌详情↗](https://yapi.huianrong.com/project/1764/interface/api/72316) 的 **请求类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `GET /ground-pc-api/product-attribute/brand-info/{id}`
 * @更新时间 `2023-02-23 20:19:30`
 */
export interface GroundPcApiProductAttributeBrandInfoIdGetRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [品牌详情↗](https://yapi.huianrong.com/project/1764/interface/api/72316) 的 **返回类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `GET /ground-pc-api/product-attribute/brand-info/{id}`
 * @更新时间 `2023-02-23 20:19:30`
 */
export interface GroundPcApiProductAttributeBrandInfoIdGetResponse {
  /**
   * id
   */
  id?: number;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 分类名称
   */
  name?: string;
  /**
   * 品牌logo ,GetResourceFilesResp
   */
  file?: {
    /**
     * id
     */
    id?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 类型
     */
    type?: string;
    /**
     * 格式
     */
    format?: string;
    /**
     * 文件大小（字节B）
     */
    size?: number;
    /**
     * 预览地址
     */
    previewAddress?: string;
  };
  /**
   * 品牌logocode;
   */
  fileCode?: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [品牌详情↗](https://yapi.huianrong.com/project/1764/interface/api/72316) 的 **请求配置的类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `GET /ground-pc-api/product-attribute/brand-info/{id}`
 * @更新时间 `2023-02-23 20:19:30`
 */
type GroundPcApiProductAttributeBrandInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/brand-info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [品牌详情↗](https://yapi.huianrong.com/project/1764/interface/api/72316) 的 **请求配置**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `GET /ground-pc-api/product-attribute/brand-info/{id}`
 * @更新时间 `2023-02-23 20:19:30`
 */
const groundPcApiProductAttributeBrandInfoIdGetRequestConfig: GroundPcApiProductAttributeBrandInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_12,
    devUrl: devUrl_0_2_0_12,
    prodUrl: prodUrl_0_2_0_12,
    path: '/ground-pc-api/product-attribute/brand-info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_12,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeBrandInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [品牌详情↗](https://yapi.huianrong.com/project/1764/interface/api/72316) 的 **请求函数**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `GET /ground-pc-api/product-attribute/brand-info/{id}`
 * @更新时间 `2023-02-23 20:19:30`
 */
export const groundPcApiProductAttributeBrandInfoIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiProductAttributeBrandInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeBrandInfoIdGetResponse>(
    prepare(
      groundPcApiProductAttributeBrandInfoIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiProductAttributeBrandInfoIdGet.requestConfig =
  groundPcApiProductAttributeBrandInfoIdGetRequestConfig;

/**
 * 接口 [品牌列表↗](https://yapi.huianrong.com/project/1764/interface/api/72318) 的 **请求类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `GET /ground-pc-api/product-attribute/brand-list`
 * @更新时间 `2023-02-23 20:19:27`
 */
export interface GroundPcApiProductAttributeBrandListGetRequest {}

/**
 * 接口 [品牌列表↗](https://yapi.huianrong.com/project/1764/interface/api/72318) 的 **返回类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `GET /ground-pc-api/product-attribute/brand-list`
 * @更新时间 `2023-02-23 20:19:27`
 */
export type GroundPcApiProductAttributeBrandListGetResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 分类名称
   */
  name?: string;
  /**
   * 品牌logo ,GetResourceFilesResp
   */
  file?: {
    /**
     * id
     */
    id?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 类型
     */
    type?: string;
    /**
     * 格式
     */
    format?: string;
    /**
     * 文件大小（字节B）
     */
    size?: number;
    /**
     * 预览地址
     */
    previewAddress?: string;
  };
  /**
   * 备注
   */
  remark?: string;
}[];

/**
 * 接口 [品牌列表↗](https://yapi.huianrong.com/project/1764/interface/api/72318) 的 **请求配置的类型**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `GET /ground-pc-api/product-attribute/brand-list`
 * @更新时间 `2023-02-23 20:19:27`
 */
type GroundPcApiProductAttributeBrandListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/brand-list',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [品牌列表↗](https://yapi.huianrong.com/project/1764/interface/api/72318) 的 **请求配置**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `GET /ground-pc-api/product-attribute/brand-list`
 * @更新时间 `2023-02-23 20:19:27`
 */
const groundPcApiProductAttributeBrandListGetRequestConfig: GroundPcApiProductAttributeBrandListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_12,
    devUrl: devUrl_0_2_0_12,
    prodUrl: prodUrl_0_2_0_12,
    path: '/ground-pc-api/product-attribute/brand-list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_12,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeBrandListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [品牌列表↗](https://yapi.huianrong.com/project/1764/interface/api/72318) 的 **请求函数**
 *
 * @分类 [商品品牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23143)
 * @请求头 `GET /ground-pc-api/product-attribute/brand-list`
 * @更新时间 `2023-02-23 20:19:27`
 */
export const groundPcApiProductAttributeBrandListGet = /*#__PURE__*/ (
  requestData?: GroundPcApiProductAttributeBrandListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeBrandListGetResponse>(
    prepare(groundPcApiProductAttributeBrandListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiProductAttributeBrandListGet.requestConfig =
  groundPcApiProductAttributeBrandListGetRequestConfig;

const mockUrl_0_2_0_13 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_13 = '' as any;
const prodUrl_0_2_0_13 = '' as any;
const dataKey_0_2_0_13 = 'data' as any;

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72270) 的 **请求类型**
 *
 * @分类 [商品销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23149)
 * @请求头 `GET /ground-pc-api/order/list`
 * @更新时间 `2023-02-27 17:38:38`
 */
export interface GroundPcApiOrderListGetRequest {
  /**
   * 门店ID(商圈后台有效)
   */
  storeId?: string;
  /**
   * 订单筛选(订单号)
   */
  orderNo?: string;
  /**
   * 订单来源(1：线上，2：线下)
   */
  orderSource?: string;
  /**
   * 订单状态（-1已取消0待付款1待使用2退款中3已退款4部分付款5部分退款10已发货11已完成）
   */
  orderStatus?: string;
  /**
   * 开始时间(下单时间，非必填)
   */
  startTime?: string;
  /**
   * 结束时间(下单时间，非必填)
   */
  endTime?: string;
  /**
   * 日期格式(非必填，7、30、90、day、month、year)
   */
  date?: string;
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
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72270) 的 **返回类型**
 *
 * @分类 [商品销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23149)
 * @请求头 `GET /ground-pc-api/order/list`
 * @更新时间 `2023-02-27 17:38:38`
 */
export interface GroundPcApiOrderListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 订单编号
     */
    orderNo?: string;
    /**
     * 店铺名称
     */
    storeName?: string;
    /**
     * 店铺号
     */
    storeCode?: string;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 订单来源：1：线上，2：线下
     */
    orderSource?: number;
    /**
     * 订单类型：1：商品订单，2：场馆订单
     */
    orderType?: number;
    /**
     * 订单金额
     */
    orderTotalPrice?: number;
    /**
     * 订单实付金额
     */
    payAmt?: number;
    /**
     * 下单时间
     */
    createTime?: string;
    /**
     * 更新时间
     */
    updateTime?: string;
    /**
     * 订单状态（-1已取消0待付款1待使用2退款中3已退款4部分付款5部分退款10已发货11已完成）
     */
    orderStatus?: number;
    /**
     * 是否允许退款(0：否，1：是)<BR>,线下订单操作，同一收银机有此操作
     */
    canRefund?: number;
    /**
     * 是否允许审核(0：否，1：是)<BR>,线上订单操作
     */
    canVerify?: number;
  }[];
}

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72270) 的 **请求配置的类型**
 *
 * @分类 [商品销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23149)
 * @请求头 `GET /ground-pc-api/order/list`
 * @更新时间 `2023-02-27 17:38:38`
 */
type GroundPcApiOrderListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/order/list',
    'data',
    string,
    | 'storeId'
    | 'orderNo'
    | 'orderSource'
    | 'orderStatus'
    | 'startTime'
    | 'endTime'
    | 'date'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72270) 的 **请求配置**
 *
 * @分类 [商品销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23149)
 * @请求头 `GET /ground-pc-api/order/list`
 * @更新时间 `2023-02-27 17:38:38`
 */
const groundPcApiOrderListGetRequestConfig: GroundPcApiOrderListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_13,
    devUrl: devUrl_0_2_0_13,
    prodUrl: prodUrl_0_2_0_13,
    path: '/ground-pc-api/order/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_13,
    paramNames: [],
    queryNames: [
      'storeId',
      'orderNo',
      'orderSource',
      'orderStatus',
      'startTime',
      'endTime',
      'date',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiOrderListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72270) 的 **请求函数**
 *
 * @分类 [商品销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23149)
 * @请求头 `GET /ground-pc-api/order/list`
 * @更新时间 `2023-02-27 17:38:38`
 */
export const groundPcApiOrderListGet = /*#__PURE__*/ (
  requestData: GroundPcApiOrderListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiOrderListGetResponse>(
    prepare(groundPcApiOrderListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiOrderListGet.requestConfig = groundPcApiOrderListGetRequestConfig;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72272) 的 **请求类型**
 *
 * @分类 [商品销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23149)
 * @请求头 `GET /ground-pc-api/order/info`
 * @更新时间 `2023-02-27 17:38:39`
 */
export interface GroundPcApiOrderInfoGetRequest {
  /**
   * 订单编号(String)
   */
  orderNo?: string;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72272) 的 **返回类型**
 *
 * @分类 [商品销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23149)
 * @请求头 `GET /ground-pc-api/order/info`
 * @更新时间 `2023-02-27 17:38:39`
 */
export interface GroundPcApiOrderInfoGetResponse {
  /**
   * 商品列表 ,OrderPrdInfo
   */
  prdList: {
    /**
     * 商品ID
     */
    prdId?: number;
    /**
     * 场地名称
     */
    venueName?: string;
    /**
     * 商品名称
     */
    prdName?: string;
    /**
     * 商品分类
     */
    prdClassifyName?: string;
    /**
     * 品牌名称
     */
    prdBrandName?: string;
    /**
     * 单位名
     */
    prdUnitName?: string;
    /**
     * 商品图片
     */
    prdPic?: string;
    /**
     * 商品规格名称
     */
    prdSpecNames?: string;
    /**
     * 商品数量
     */
    prdNum?: number;
    /**
     * 商品退货状态(0：正常，1：已退货)
     */
    refundStatus?: number;
    /**
     * 商品单价
     */
    prdPrice?: number;
    /**
     * 商品总价
     */
    prdTotalPrice?: number;
  }[];
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺编码
   */
  storeCode?: string;
  /**
   * 客服电话
   */
  customerServiceTel?: string;
  /**
   * 特色服务
   */
  feature?: string;
  /**
   * 所属区域+地址
   */
  location?: string;
  /**
   * 所属区域
   */
  region?: string;
  /**
   * 地址
   */
  address?: string;
  /**
   * 订单编号
   */
  orderNo?: string;
  /**
   * 订单来源：1：线上，2：线下
   */
  orderSource?: number;
  /**
   * 订单类型：1：商品订单，2：场馆订单
   */
  orderType?: number;
  /**
   * 订单金额
   */
  orderTotalPrice?: number;
  /**
   * 下单时间
   */
  createTime?: string;
  /**
   * 订单状态（-1已取消0待付款1待使用2退款中3已退款4部分付款5部分退款10已发货11已完成）
   */
  orderStatus?: number;
  /**
   * 账单编号
   */
  fundFlowNo?: string;
  /**
   * 用户编号
   */
  userCode?: string;
  /**
   * 用户昵称
   */
  nickName?: string;
  /**
   * 会员等级
   */
  memberLevel?: string;
  /**
   * 用户电话
   */
  phone?: string;
  /**
   * 买家留言
   */
  buyerMsg?: string;
  /**
   * 会员抵扣
   */
  memberDiscount?: number;
  /**
   * 会员积分抵扣
   */
  integralDiscount?: number;
  /**
   * 优惠券优惠
   */
  couponDiscount?: number;
  /**
   * 促销优惠
   */
  promotionAmount?: number;
  /**
   * 优惠总金额(手动优惠)
   */
  discountAmount?: number;
  /**
   * 小计(付款金额=订单金额-优惠金额)
   */
  payAmount?: number;
  /**
   * 支付通道费
   */
  channelFee?: number;
  /**
   * 现金支付金额
   */
  cashAmt?: number;
  /**
   * 微信支付金额
   */
  wxAmt?: number;
  /**
   * 支付宝支付金额
   */
  alipayAmt?: number;
  /**
   * POS刷卡支付金额
   */
  posAmt?: number;
  /**
   * 其他支付金额
   */
  otherAmt?: number;
  /**
   * 是否允许退款(0：否，1：是)<BR>,线下订单操作，同一收银机有此操作
   */
  canRefund?: number;
  /**
   * 是否允许审核(0：否，1：是)<BR>,线上订单操作
   */
  canVerify?: number;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72272) 的 **请求配置的类型**
 *
 * @分类 [商品销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23149)
 * @请求头 `GET /ground-pc-api/order/info`
 * @更新时间 `2023-02-27 17:38:39`
 */
type GroundPcApiOrderInfoGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/order/info',
    'data',
    string,
    'orderNo',
    false
  >
>;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72272) 的 **请求配置**
 *
 * @分类 [商品销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23149)
 * @请求头 `GET /ground-pc-api/order/info`
 * @更新时间 `2023-02-27 17:38:39`
 */
const groundPcApiOrderInfoGetRequestConfig: GroundPcApiOrderInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_13,
    devUrl: devUrl_0_2_0_13,
    prodUrl: prodUrl_0_2_0_13,
    path: '/ground-pc-api/order/info',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_13,
    paramNames: [],
    queryNames: ['orderNo'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiOrderInfoGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72272) 的 **请求函数**
 *
 * @分类 [商品销售订单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23149)
 * @请求头 `GET /ground-pc-api/order/info`
 * @更新时间 `2023-02-27 17:38:39`
 */
export const groundPcApiOrderInfoGet = /*#__PURE__*/ (
  requestData: GroundPcApiOrderInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiOrderInfoGetResponse>(
    prepare(groundPcApiOrderInfoGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiOrderInfoGet.requestConfig = groundPcApiOrderInfoGetRequestConfig;

const mockUrl_0_2_0_15 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_15 = '' as any;
const prodUrl_0_2_0_15 = '' as any;
const dataKey_0_2_0_15 = 'data' as any;

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72274) 的 **请求类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue/list`
 * @更新时间 `2023-03-01 14:36:40`
 */
export interface GroundPcApiVenueListGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 场地分类id
   */
  venueClassifyId?: string;
  /**
   * 关键字（场地名称、编码）
   */
  keyWord?: string;
  /**
   * 状态1启用;2禁用;
   */
  status?: string;
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
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72274) 的 **返回类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue/list`
 * @更新时间 `2023-03-01 14:36:40`
 */
export interface GroundPcApiVenueListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 场地id
     */
    id?: number;
    /**
     * 场地编码
     */
    code?: string;
    /**
     * 场地名称
     */
    name?: string;
    /**
     * 项目id
     */
    projectId?: number;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 店铺id
     */
    storeId?: number;
    /**
     * 店铺名称
     */
    storeName?: string;
    /**
     * 分类id
     */
    venueClassifyId?: number;
    /**
     * 分类名称
     */
    venueClassifyName?: string;
    /**
     * 状态1启用;2禁用;
     */
    status?: number;
    /**
     * 封面(文件code)
     */
    coverFileCode?: string;
    /**
     * 详情图片文件Code
     */
    detailsFileCode?: string;
    /**
     * 销量
     */
    sales?: number;
    /**
     * 更新人
     */
    updateBy?: string;
    /**
     * 更新时间
     */
    updateTime?: string;
    /**
     * 包含规则类型1散客；2时段；3包场 ,Byte
     */
    ruleTypes: number[];
  }[];
}

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72274) 的 **请求配置的类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue/list`
 * @更新时间 `2023-03-01 14:36:40`
 */
type GroundPcApiVenueListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/venue/list',
    'data',
    string,
    | 'projectId'
    | 'storeId'
    | 'venueClassifyId'
    | 'keyWord'
    | 'status'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72274) 的 **请求配置**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue/list`
 * @更新时间 `2023-03-01 14:36:40`
 */
const groundPcApiVenueListGetRequestConfig: GroundPcApiVenueListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_15,
    devUrl: devUrl_0_2_0_15,
    prodUrl: prodUrl_0_2_0_15,
    path: '/ground-pc-api/venue/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_15,
    paramNames: [],
    queryNames: [
      'projectId',
      'storeId',
      'venueClassifyId',
      'keyWord',
      'status',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVenueListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72274) 的 **请求函数**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue/list`
 * @更新时间 `2023-03-01 14:36:40`
 */
export const groundPcApiVenueListGet = /*#__PURE__*/ (
  requestData: GroundPcApiVenueListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVenueListGetResponse>(
    prepare(groundPcApiVenueListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiVenueListGet.requestConfig = groundPcApiVenueListGetRequestConfig;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72276) 的 **请求类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/add`
 * @更新时间 `2023-02-23 15:10:07`
 */
export interface GroundPcApiVenueAddPostRequest {
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 店铺id
   */
  storeId: number;
  /**
   * 铺位号
   */
  estateId: number;
  /**
   * 场地名称
   */
  name: string;
  /**
   * 场地分类Id
   */
  venueClassifyId: number;
  /**
   * 场地编码
   */
  code?: string;
  /**
   * 状态1启用;2禁用;
   */
  status: number;
  /**
   * 封面(文件code)
   */
  coverFileCode?: string;
  /**
   * 详情图片文件Code ,String
   */
  detailsFileCode?: string[];
  /**
   * 计费规则 ,VenueRuleAddDto
   */
  rules: {
    /**
     * 1散客,,2时段,,3包场
     */
    rule: number;
    /**
     * 自定义规则标题
     */
    title?: string;
    /**
     * 最多可预定近多少天
     */
    days?: number;
    /**
     * 开场时间前预约可退款
     */
    hours?: number;
    /**
     * 规则配置 ,VenueRuleConfigAddDto
     */
    configs: {
      /**
       * 周几 ,Integer
       */
      week: number[];
      /**
       * 定价规则 ,VenueRulePriceAddDto
       */
      priceRules: {
        /**
         * id不为空更新否则新增
         */
        id?: number;
        /**
         * 定价元
         */
        price: number;
        /**
         * 开始时间，散客不需要传HH:mm
         */
        startTime?: string;
        /**
         * 结束时间，散客不需要传HH:mm
         */
        endTime?: string;
      }[];
    }[];
  }[];
}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72276) 的 **返回类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/add`
 * @更新时间 `2023-02-23 15:10:07`
 */
export interface GroundPcApiVenueAddPostResponse {
  code?: number;
  msg?: string;
}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72276) 的 **请求配置的类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/add`
 * @更新时间 `2023-02-23 15:10:07`
 */
type GroundPcApiVenueAddPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/venue/add',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72276) 的 **请求配置**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/add`
 * @更新时间 `2023-02-23 15:10:07`
 */
const groundPcApiVenueAddPostRequestConfig: GroundPcApiVenueAddPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_15,
    devUrl: devUrl_0_2_0_15,
    prodUrl: prodUrl_0_2_0_15,
    path: '/ground-pc-api/venue/add',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_15,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVenueAddPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72276) 的 **请求函数**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/add`
 * @更新时间 `2023-02-23 15:10:07`
 */
export const groundPcApiVenueAddPost = /*#__PURE__*/ (
  requestData: GroundPcApiVenueAddPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVenueAddPostResponse>(
    prepare(groundPcApiVenueAddPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiVenueAddPost.requestConfig = groundPcApiVenueAddPostRequestConfig;

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72278) 的 **请求类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/update`
 * @更新时间 `2023-02-23 15:10:08`
 */
export interface GroundPcApiVenueUpdatePostRequest {
  /**
   * 场地id
   */
  id: number;
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 店铺id
   */
  storeId: number;
  /**
   * 铺位号
   */
  estateId: number;
  /**
   * 场地名称
   */
  name: string;
  /**
   * 场地分类Id
   */
  venueClassifyId: number;
  /**
   * 场地编码
   */
  code?: string;
  /**
   * 状态1启用;2禁用;
   */
  status: number;
  /**
   * 封面(文件code)
   */
  coverFileCode?: string;
  /**
   * 详情图片文件Code ,String
   */
  detailsFileCode?: string[];
  /**
   * 计费规则 ,VenueRuleUpdateDto
   */
  rules: {
    /**
     * id存在则更新，否则新增
     */
    id?: number;
    /**
     * 1散客,,2时段,,3包场
     */
    rule: number;
    /**
     * 自定义规则标题
     */
    title?: string;
    /**
     * 最多可预定近多少天
     */
    days?: number;
    /**
     * 开场时间前预约可退款
     */
    hours?: number;
    /**
     * 规则配置 ,VenueRuleConfigUpdateDto
     */
    configs: {
      /**
       * id
       */
      id?: number;
      /**
       * 周几 ,Integer
       */
      week: number[];
      /**
       * 定价规则 ,VenueRulePriceAddDto
       */
      priceRules: {
        /**
         * id不为空更新否则新增
         */
        id?: number;
        /**
         * 定价元
         */
        price: number;
        /**
         * 开始时间，散客不需要传HH:mm
         */
        startTime?: string;
        /**
         * 结束时间，散客不需要传HH:mm
         */
        endTime?: string;
      }[];
    }[];
  }[];
}

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72278) 的 **返回类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/update`
 * @更新时间 `2023-02-23 15:10:08`
 */
export interface GroundPcApiVenueUpdatePostResponse {
  code?: number;
  msg?: string;
}

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72278) 的 **请求配置的类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/update`
 * @更新时间 `2023-02-23 15:10:08`
 */
type GroundPcApiVenueUpdatePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/venue/update',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72278) 的 **请求配置**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/update`
 * @更新时间 `2023-02-23 15:10:08`
 */
const groundPcApiVenueUpdatePostRequestConfig: GroundPcApiVenueUpdatePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_15,
    devUrl: devUrl_0_2_0_15,
    prodUrl: prodUrl_0_2_0_15,
    path: '/ground-pc-api/venue/update',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_15,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVenueUpdatePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72278) 的 **请求函数**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/update`
 * @更新时间 `2023-02-23 15:10:08`
 */
export const groundPcApiVenueUpdatePost = /*#__PURE__*/ (
  requestData: GroundPcApiVenueUpdatePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVenueUpdatePostResponse>(
    prepare(groundPcApiVenueUpdatePostRequestConfig, requestData),
    ...args
  );
};

groundPcApiVenueUpdatePost.requestConfig =
  groundPcApiVenueUpdatePostRequestConfig;

/**
 * 接口 [启用禁用↗](https://yapi.huianrong.com/project/1764/interface/api/72282) 的 **请求类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/updateStatus`
 * @更新时间 `2023-02-23 15:10:09`
 */
export interface GroundPcApiVenueUpdateStatusPostRequest {
  /**
   * 场地id
   */
  id: number;
  /**
   * 状态1启用;2禁用;
   */
  status: number;
}

/**
 * 接口 [启用禁用↗](https://yapi.huianrong.com/project/1764/interface/api/72282) 的 **返回类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/updateStatus`
 * @更新时间 `2023-02-23 15:10:09`
 */
export interface GroundPcApiVenueUpdateStatusPostResponse {
  code?: number;
  msg?: string;
}

/**
 * 接口 [启用禁用↗](https://yapi.huianrong.com/project/1764/interface/api/72282) 的 **请求配置的类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/updateStatus`
 * @更新时间 `2023-02-23 15:10:09`
 */
type GroundPcApiVenueUpdateStatusPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/venue/updateStatus',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [启用禁用↗](https://yapi.huianrong.com/project/1764/interface/api/72282) 的 **请求配置**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/updateStatus`
 * @更新时间 `2023-02-23 15:10:09`
 */
const groundPcApiVenueUpdateStatusPostRequestConfig: GroundPcApiVenueUpdateStatusPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_15,
    devUrl: devUrl_0_2_0_15,
    prodUrl: prodUrl_0_2_0_15,
    path: '/ground-pc-api/venue/updateStatus',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_15,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVenueUpdateStatusPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [启用禁用↗](https://yapi.huianrong.com/project/1764/interface/api/72282) 的 **请求函数**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/updateStatus`
 * @更新时间 `2023-02-23 15:10:09`
 */
export const groundPcApiVenueUpdateStatusPost = /*#__PURE__*/ (
  requestData: GroundPcApiVenueUpdateStatusPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVenueUpdateStatusPostResponse>(
    prepare(groundPcApiVenueUpdateStatusPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiVenueUpdateStatusPost.requestConfig =
  groundPcApiVenueUpdateStatusPostRequestConfig;

/**
 * 接口 [批量启用禁用↗](https://yapi.huianrong.com/project/1764/interface/api/72284) 的 **请求类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/batchUpdateStatus`
 * @更新时间 `2023-02-23 15:10:10`
 */
export interface GroundPcApiVenueBatchUpdateStatusPostRequest {
  /**
   * id集合 ,Long
   */
  ids: number[];
  /**
   * 状态1启用;2禁用;
   */
  status: number;
}

/**
 * 接口 [批量启用禁用↗](https://yapi.huianrong.com/project/1764/interface/api/72284) 的 **返回类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/batchUpdateStatus`
 * @更新时间 `2023-02-23 15:10:10`
 */
export interface GroundPcApiVenueBatchUpdateStatusPostResponse {
  code?: number;
  msg?: string;
}

/**
 * 接口 [批量启用禁用↗](https://yapi.huianrong.com/project/1764/interface/api/72284) 的 **请求配置的类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/batchUpdateStatus`
 * @更新时间 `2023-02-23 15:10:10`
 */
type GroundPcApiVenueBatchUpdateStatusPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/venue/batchUpdateStatus',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [批量启用禁用↗](https://yapi.huianrong.com/project/1764/interface/api/72284) 的 **请求配置**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/batchUpdateStatus`
 * @更新时间 `2023-02-23 15:10:10`
 */
const groundPcApiVenueBatchUpdateStatusPostRequestConfig: GroundPcApiVenueBatchUpdateStatusPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_15,
    devUrl: devUrl_0_2_0_15,
    prodUrl: prodUrl_0_2_0_15,
    path: '/ground-pc-api/venue/batchUpdateStatus',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_15,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVenueBatchUpdateStatusPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [批量启用禁用↗](https://yapi.huianrong.com/project/1764/interface/api/72284) 的 **请求函数**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `POST /ground-pc-api/venue/batchUpdateStatus`
 * @更新时间 `2023-02-23 15:10:10`
 */
export const groundPcApiVenueBatchUpdateStatusPost = /*#__PURE__*/ (
  requestData: GroundPcApiVenueBatchUpdateStatusPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVenueBatchUpdateStatusPostResponse>(
    prepare(groundPcApiVenueBatchUpdateStatusPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiVenueBatchUpdateStatusPost.requestConfig =
  groundPcApiVenueBatchUpdateStatusPostRequestConfig;

/**
 * 接口 [规则价格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72286) 的 **请求类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue-rule-price/list`
 * @更新时间 `2023-02-23 14:43:45`
 */
export interface GroundPcApiVenueRulePriceListGetRequest {
  /**
   * 搜索场地名称场地编号
   */
  searchKey?: string;
  /**
   * 场馆分类
   */
  classifyId?: string;
  /**
   * 规则类型1散客；2时段；3包场;
   */
  ruleType?: string;
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
 * 接口 [规则价格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72286) 的 **返回类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue-rule-price/list`
 * @更新时间 `2023-02-23 14:43:45`
 */
export interface GroundPcApiVenueRulePriceListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 规则价格IDSKU
     */
    id: number;
    /**
     * 场地IDSPU
     */
    venueId: number;
    /**
     * 场馆名称
     */
    venueName: string;
    /**
     * 分类名称
     */
    classifyName: string;
    /**
     * 场馆编号
     */
    venueCode: string;
    /**
     * 计费类型1散客；2时段；3包场;
     */
    ruleType: number;
    /**
     * 规则描述
     */
    ruleDesc: string;
    /**
     * 价格
     */
    price: number;
  }[];
}

/**
 * 接口 [规则价格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72286) 的 **请求配置的类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue-rule-price/list`
 * @更新时间 `2023-02-23 14:43:45`
 */
type GroundPcApiVenueRulePriceListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/venue-rule-price/list',
    'data',
    string,
    'searchKey' | 'classifyId' | 'ruleType' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [规则价格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72286) 的 **请求配置**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue-rule-price/list`
 * @更新时间 `2023-02-23 14:43:45`
 */
const groundPcApiVenueRulePriceListGetRequestConfig: GroundPcApiVenueRulePriceListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_15,
    devUrl: devUrl_0_2_0_15,
    prodUrl: prodUrl_0_2_0_15,
    path: '/ground-pc-api/venue-rule-price/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_15,
    paramNames: [],
    queryNames: ['searchKey', 'classifyId', 'ruleType', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVenueRulePriceListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [规则价格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72286) 的 **请求函数**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue-rule-price/list`
 * @更新时间 `2023-02-23 14:43:45`
 */
export const groundPcApiVenueRulePriceListGet = /*#__PURE__*/ (
  requestData: GroundPcApiVenueRulePriceListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVenueRulePriceListGetResponse>(
    prepare(groundPcApiVenueRulePriceListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiVenueRulePriceListGet.requestConfig =
  groundPcApiVenueRulePriceListGetRequestConfig;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72498) 的 **请求类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue/info/{id}`
 * @更新时间 `2023-03-01 16:13:20`
 */
export interface GroundPcApiVenueInfoIdGetRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72498) 的 **返回类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue/info/{id}`
 * @更新时间 `2023-03-01 16:13:20`
 */
export interface GroundPcApiVenueInfoIdGetResponse {
  /**
   * 场地id
   */
  id?: number;
  /**
   * 场地编码
   */
  code?: string;
  /**
   * 场地名称
   */
  name?: string;
  /**
   * 项目id
   */
  projectId?: number;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 铺位id
   */
  estateId?: number;
  /**
   * 铺位名称
   */
  estateName?: string;
  /**
   * 场地分类id
   */
  venueClassifyId?: number;
  /**
   * 场地分类名称
   */
  venueClassifyName?: string;
  /**
   * 状态1启用;2禁用;
   */
  status?: number;
  /**
   * 封面(文件code)
   */
  coverFileCode?: string;
  /**
   * 封面文件 ,GetResourceFilesResp
   */
  coverFiles?: {
    /**
     * id
     */
    id?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 类型
     */
    type?: string;
    /**
     * 格式
     */
    format?: string;
    /**
     * 文件大小（字节B）
     */
    size?: number;
    /**
     * 预览地址
     */
    previewAddress?: string;
  };
  /**
   * 详情图片文件 ,GetResourceFilesResp
   */
  detailsFiles?: {
    /**
     * id
     */
    id?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 类型
     */
    type?: string;
    /**
     * 格式
     */
    format?: string;
    /**
     * 文件大小（字节B）
     */
    size?: number;
    /**
     * 预览地址
     */
    previewAddress?: string;
  }[];
  /**
   * 规则 ,RespVenueRuleConfigDto
   */
  rules: {
    /**
     * id
     */
    id: number;
    /**
     * 规则类型1散客；2时段；3包场
     */
    rule?: number;
    /**
     * 自定义规则标题
     */
    title?: string;
    /**
     * 最多可预定近多少天
     */
    days?: number;
    /**
     * 开场时间前预约可退款
     */
    hours?: number;
    /**
     * 设置 ,RespVenueRuleDto
     */
    configs?: {
      /**
       * ID
       */
      id: number;
      /**
       * 星期 ,Integer
       */
      week?: number[];
      /**
       * 价格规则 ,RespVenueRulePriceDto
       */
      priceRules?: {
        /**
         * id不为空更新否则新增
         */
        id: number;
        /**
         * 定价元
         */
        price: number;
        /**
         * 开始时间，散客不需要传HH:mm
         */
        startTime?: string;
        /**
         * 结束时间，散客不需要传HH:mm
         */
        endTime?: string;
      }[];
    }[];
  }[];
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72498) 的 **请求配置的类型**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue/info/{id}`
 * @更新时间 `2023-03-01 16:13:20`
 */
type GroundPcApiVenueInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/venue/info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72498) 的 **请求配置**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue/info/{id}`
 * @更新时间 `2023-03-01 16:13:20`
 */
const groundPcApiVenueInfoIdGetRequestConfig: GroundPcApiVenueInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_15,
    devUrl: devUrl_0_2_0_15,
    prodUrl: prodUrl_0_2_0_15,
    path: '/ground-pc-api/venue/info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_15,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVenueInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72498) 的 **请求函数**
 *
 * @分类 [场馆管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23153)
 * @请求头 `GET /ground-pc-api/venue/info/{id}`
 * @更新时间 `2023-03-01 16:13:20`
 */
export const groundPcApiVenueInfoIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiVenueInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVenueInfoIdGetResponse>(
    prepare(groundPcApiVenueInfoIdGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiVenueInfoIdGet.requestConfig =
  groundPcApiVenueInfoIdGetRequestConfig;

const mockUrl_0_2_0_16 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_16 = '' as any;
const prodUrl_0_2_0_16 = '' as any;
const dataKey_0_2_0_16 = 'data' as any;

/**
 * 接口 [场馆-分类列表↗](https://yapi.huianrong.com/project/1764/interface/api/72288) 的 **请求类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/list`
 * @更新时间 `2023-03-03 11:11:28`
 */
export interface GroundPcApiVenueClassifyListGetRequest {}

/**
 * 接口 [场馆-分类列表↗](https://yapi.huianrong.com/project/1764/interface/api/72288) 的 **返回类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/list`
 * @更新时间 `2023-03-03 11:11:28`
 */
export type GroundPcApiVenueClassifyListGetResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 备注
   */
  remark?: string;
}[];

/**
 * 接口 [场馆-分类列表↗](https://yapi.huianrong.com/project/1764/interface/api/72288) 的 **请求配置的类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/list`
 * @更新时间 `2023-03-03 11:11:28`
 */
type GroundPcApiVenueClassifyListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/venue-classify/list',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [场馆-分类列表↗](https://yapi.huianrong.com/project/1764/interface/api/72288) 的 **请求配置**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/list`
 * @更新时间 `2023-03-03 11:11:28`
 */
const groundPcApiVenueClassifyListGetRequestConfig: GroundPcApiVenueClassifyListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_16,
    devUrl: devUrl_0_2_0_16,
    prodUrl: prodUrl_0_2_0_16,
    path: '/ground-pc-api/venue-classify/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_16,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVenueClassifyListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [场馆-分类列表↗](https://yapi.huianrong.com/project/1764/interface/api/72288) 的 **请求函数**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/list`
 * @更新时间 `2023-03-03 11:11:28`
 */
export const groundPcApiVenueClassifyListGet = /*#__PURE__*/ (
  requestData?: GroundPcApiVenueClassifyListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVenueClassifyListGetResponse>(
    prepare(groundPcApiVenueClassifyListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiVenueClassifyListGet.requestConfig =
  groundPcApiVenueClassifyListGetRequestConfig;

/**
 * 接口 [场馆-新增↗](https://yapi.huianrong.com/project/1764/interface/api/72290) 的 **请求类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/add`
 * @更新时间 `2023-03-03 11:11:28`
 */
export interface GroundPcApiVenueClassifyAddPostRequest {
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 店铺id
   */
  storeId: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [场馆-新增↗](https://yapi.huianrong.com/project/1764/interface/api/72290) 的 **返回类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/add`
 * @更新时间 `2023-03-03 11:11:28`
 */
export type GroundPcApiVenueClassifyAddPostResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 备注
   */
  remark?: string;
}[];

/**
 * 接口 [场馆-新增↗](https://yapi.huianrong.com/project/1764/interface/api/72290) 的 **请求配置的类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/add`
 * @更新时间 `2023-03-03 11:11:28`
 */
type GroundPcApiVenueClassifyAddPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/venue-classify/add',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [场馆-新增↗](https://yapi.huianrong.com/project/1764/interface/api/72290) 的 **请求配置**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/add`
 * @更新时间 `2023-03-03 11:11:28`
 */
const groundPcApiVenueClassifyAddPostRequestConfig: GroundPcApiVenueClassifyAddPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_16,
    devUrl: devUrl_0_2_0_16,
    prodUrl: prodUrl_0_2_0_16,
    path: '/ground-pc-api/venue-classify/add',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_16,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVenueClassifyAddPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [场馆-新增↗](https://yapi.huianrong.com/project/1764/interface/api/72290) 的 **请求函数**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/add`
 * @更新时间 `2023-03-03 11:11:28`
 */
export const groundPcApiVenueClassifyAddPost = /*#__PURE__*/ (
  requestData: GroundPcApiVenueClassifyAddPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVenueClassifyAddPostResponse>(
    prepare(groundPcApiVenueClassifyAddPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiVenueClassifyAddPost.requestConfig =
  groundPcApiVenueClassifyAddPostRequestConfig;

/**
 * 接口 [场馆-编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72292) 的 **请求类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/update`
 * @更新时间 `2023-03-03 11:11:29`
 */
export interface GroundPcApiVenueClassifyUpdatePostRequest {
  /**
   * id
   */
  id: number;
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 店铺id
   */
  storeId: number;
  /**
   * 名称
   */
  name: string;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [场馆-编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72292) 的 **返回类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/update`
 * @更新时间 `2023-03-03 11:11:29`
 */
export type GroundPcApiVenueClassifyUpdatePostResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 备注
   */
  remark?: string;
}[];

/**
 * 接口 [场馆-编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72292) 的 **请求配置的类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/update`
 * @更新时间 `2023-03-03 11:11:29`
 */
type GroundPcApiVenueClassifyUpdatePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/venue-classify/update',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [场馆-编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72292) 的 **请求配置**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/update`
 * @更新时间 `2023-03-03 11:11:29`
 */
const groundPcApiVenueClassifyUpdatePostRequestConfig: GroundPcApiVenueClassifyUpdatePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_16,
    devUrl: devUrl_0_2_0_16,
    prodUrl: prodUrl_0_2_0_16,
    path: '/ground-pc-api/venue-classify/update',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_16,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVenueClassifyUpdatePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [场馆-编辑↗](https://yapi.huianrong.com/project/1764/interface/api/72292) 的 **请求函数**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/update`
 * @更新时间 `2023-03-03 11:11:29`
 */
export const groundPcApiVenueClassifyUpdatePost = /*#__PURE__*/ (
  requestData: GroundPcApiVenueClassifyUpdatePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVenueClassifyUpdatePostResponse>(
    prepare(groundPcApiVenueClassifyUpdatePostRequestConfig, requestData),
    ...args
  );
};

groundPcApiVenueClassifyUpdatePost.requestConfig =
  groundPcApiVenueClassifyUpdatePostRequestConfig;

/**
 * 接口 [场馆-删除↗](https://yapi.huianrong.com/project/1764/interface/api/72294) 的 **请求类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/delete`
 * @更新时间 `2023-03-03 11:11:30`
 */
export interface GroundPcApiVenueClassifyDeletePostRequest {
  /**
   * id
   */
  id: number;
}

/**
 * 接口 [场馆-删除↗](https://yapi.huianrong.com/project/1764/interface/api/72294) 的 **返回类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/delete`
 * @更新时间 `2023-03-03 11:11:30`
 */
export type GroundPcApiVenueClassifyDeletePostResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 备注
   */
  remark?: string;
}[];

/**
 * 接口 [场馆-删除↗](https://yapi.huianrong.com/project/1764/interface/api/72294) 的 **请求配置的类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/delete`
 * @更新时间 `2023-03-03 11:11:30`
 */
type GroundPcApiVenueClassifyDeletePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/venue-classify/delete',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [场馆-删除↗](https://yapi.huianrong.com/project/1764/interface/api/72294) 的 **请求配置**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/delete`
 * @更新时间 `2023-03-03 11:11:30`
 */
const groundPcApiVenueClassifyDeletePostRequestConfig: GroundPcApiVenueClassifyDeletePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_16,
    devUrl: devUrl_0_2_0_16,
    prodUrl: prodUrl_0_2_0_16,
    path: '/ground-pc-api/venue-classify/delete',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_16,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVenueClassifyDeletePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [场馆-删除↗](https://yapi.huianrong.com/project/1764/interface/api/72294) 的 **请求函数**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `POST /ground-pc-api/venue-classify/delete`
 * @更新时间 `2023-03-03 11:11:30`
 */
export const groundPcApiVenueClassifyDeletePost = /*#__PURE__*/ (
  requestData: GroundPcApiVenueClassifyDeletePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVenueClassifyDeletePostResponse>(
    prepare(groundPcApiVenueClassifyDeletePostRequestConfig, requestData),
    ...args
  );
};

groundPcApiVenueClassifyDeletePost.requestConfig =
  groundPcApiVenueClassifyDeletePostRequestConfig;

/**
 * 接口 [场馆-详情↗](https://yapi.huianrong.com/project/1764/interface/api/72500) 的 **请求类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/info/{id}`
 * @更新时间 `2023-03-03 11:11:39`
 */
export interface GroundPcApiVenueClassifyInfoIdGetRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [场馆-详情↗](https://yapi.huianrong.com/project/1764/interface/api/72500) 的 **返回类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/info/{id}`
 * @更新时间 `2023-03-03 11:11:39`
 */
export interface GroundPcApiVenueClassifyInfoIdGetResponse {
  /**
   * id
   */
  id?: number;
  /**
   * 项目id
   */
  projectId?: number;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [场馆-详情↗](https://yapi.huianrong.com/project/1764/interface/api/72500) 的 **请求配置的类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/info/{id}`
 * @更新时间 `2023-03-03 11:11:39`
 */
type GroundPcApiVenueClassifyInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/venue-classify/info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [场馆-详情↗](https://yapi.huianrong.com/project/1764/interface/api/72500) 的 **请求配置**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/info/{id}`
 * @更新时间 `2023-03-03 11:11:39`
 */
const groundPcApiVenueClassifyInfoIdGetRequestConfig: GroundPcApiVenueClassifyInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_16,
    devUrl: devUrl_0_2_0_16,
    prodUrl: prodUrl_0_2_0_16,
    path: '/ground-pc-api/venue-classify/info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_16,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVenueClassifyInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [场馆-详情↗](https://yapi.huianrong.com/project/1764/interface/api/72500) 的 **请求函数**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/info/{id}`
 * @更新时间 `2023-03-03 11:11:39`
 */
export const groundPcApiVenueClassifyInfoIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiVenueClassifyInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVenueClassifyInfoIdGetResponse>(
    prepare(groundPcApiVenueClassifyInfoIdGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiVenueClassifyInfoIdGet.requestConfig =
  groundPcApiVenueClassifyInfoIdGetRequestConfig;

/**
 * 接口 [场馆-校验是否使用↗](https://yapi.huianrong.com/project/1764/interface/api/72538) 的 **请求类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/make/use/{id}`
 * @更新时间 `2023-03-03 11:11:31`
 */
export interface GroundPcApiVenueClassifyMakeUseIdGetRequest {
  /**
   * 分类(Long)
   */
  id: string;
}

/**
 * 接口 [场馆-校验是否使用↗](https://yapi.huianrong.com/project/1764/interface/api/72538) 的 **返回类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/make/use/{id}`
 * @更新时间 `2023-03-03 11:11:31`
 */
export type GroundPcApiVenueClassifyMakeUseIdGetResponse = boolean;

/**
 * 接口 [场馆-校验是否使用↗](https://yapi.huianrong.com/project/1764/interface/api/72538) 的 **请求配置的类型**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/make/use/{id}`
 * @更新时间 `2023-03-03 11:11:31`
 */
type GroundPcApiVenueClassifyMakeUseIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/venue-classify/make/use/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [场馆-校验是否使用↗](https://yapi.huianrong.com/project/1764/interface/api/72538) 的 **请求配置**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/make/use/{id}`
 * @更新时间 `2023-03-03 11:11:31`
 */
const groundPcApiVenueClassifyMakeUseIdGetRequestConfig: GroundPcApiVenueClassifyMakeUseIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_16,
    devUrl: devUrl_0_2_0_16,
    prodUrl: prodUrl_0_2_0_16,
    path: '/ground-pc-api/venue-classify/make/use/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_16,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiVenueClassifyMakeUseIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [场馆-校验是否使用↗](https://yapi.huianrong.com/project/1764/interface/api/72538) 的 **请求函数**
 *
 * @分类 [场馆分类管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23155)
 * @请求头 `GET /ground-pc-api/venue-classify/make/use/{id}`
 * @更新时间 `2023-03-03 11:11:31`
 */
export const groundPcApiVenueClassifyMakeUseIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiVenueClassifyMakeUseIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiVenueClassifyMakeUseIdGetResponse>(
    prepare(groundPcApiVenueClassifyMakeUseIdGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiVenueClassifyMakeUseIdGet.requestConfig =
  groundPcApiVenueClassifyMakeUseIdGetRequestConfig;

const mockUrl_0_2_0_17 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_17 = '' as any;
const prodUrl_0_2_0_17 = '' as any;
const dataKey_0_2_0_17 = 'data' as any;

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72320) 的 **请求类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/list`
 * @更新时间 `2023-03-03 14:34:34`
 */
export interface GroundPcApiStoreProductListGetRequest {
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 筛选
   */
  retrievalStr?: string;
  /**
   * 商品分类id
   */
  classifyId?: string;
  /**
   * 品牌id
   */
  brandId?: string;
  /**
   * 状态(1-销售中；2-已售罄；3-已下架)
   */
  status?: string;
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
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72320) 的 **返回类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/list`
 * @更新时间 `2023-03-03 14:34:34`
 */
export interface GroundPcApiStoreProductListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 数据id
     */
    id?: number;
    /**
     * 商品名称
     */
    name?: string;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 门店ID
     */
    storeId?: number;
    /**
     * 店铺名称
     */
    storeName?: string;
    /**
     * 商品分类名称
     */
    classifyName?: string;
    /**
     * 商品规格数
     */
    skuNum?: number;
    /**
     * 总销量
     */
    salesVolume?: number;
    /**
     * 可售库存
     */
    stockNum?: number;
    /**
     * 状态(1-销售中；2-已售罄；3-已下架)
     */
    status?: number;
    /**
     * 更新时间
     */
    updateTime?: string;
    /**
     * 销售渠道
     */
    salesFunnel?: number;
  }[];
}

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72320) 的 **请求配置的类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/list`
 * @更新时间 `2023-03-03 14:34:34`
 */
type GroundPcApiStoreProductListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product/list',
    'data',
    string,
    | 'storeId'
    | 'retrievalStr'
    | 'classifyId'
    | 'brandId'
    | 'status'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72320) 的 **请求配置**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/list`
 * @更新时间 `2023-03-03 14:34:34`
 */
const groundPcApiStoreProductListGetRequestConfig: GroundPcApiStoreProductListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_17,
    devUrl: devUrl_0_2_0_17,
    prodUrl: prodUrl_0_2_0_17,
    path: '/ground-pc-api/store-product/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_17,
    paramNames: [],
    queryNames: [
      'storeId',
      'retrievalStr',
      'classifyId',
      'brandId',
      'status',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1764/interface/api/72320) 的 **请求函数**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/list`
 * @更新时间 `2023-03-03 14:34:34`
 */
export const groundPcApiStoreProductListGet = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductListGetResponse>(
    prepare(groundPcApiStoreProductListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreProductListGet.requestConfig =
  groundPcApiStoreProductListGetRequestConfig;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72322) 的 **请求类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `POST /ground-pc-api/store-product/save`
 * @更新时间 `2023-02-27 15:49:01`
 */
export interface GroundPcApiStoreProductSavePostRequest {
  /**
   * 项目ID
   */
  projectId: number;
  /**
   * 门店ID ,Long
   */
  storeIdList: number[];
  /**
   * 商品名称
   */
  name: string;
  /**
   * 商品分类id
   */
  classifyId: string;
  /**
   * 商品品牌id
   */
  brandId?: number;
  /**
   * 商品单位id
   */
  unitId: number;
  /**
   * 货品组别id
   */
  productGroup?: number;
  /**
   * 商品编码
   */
  code?: string;
  /**
   * 封面图片编码
   */
  coverCode?: string;
  /**
   * 详情图片编码 ,String
   */
  detailsCodes?: string[];
  /**
   * 规格名集合 ,PrdSpecName
   */
  specNames: {
    /**
     * 规格值ID
     */
    psnId?: number;
    /**
     * 规格名id
     */
    specId: number;
    /**
     * 规格值对象 ,PrdSpecValue
     */
    specVals: {
      /**
       * 规格值id
       */
      specValueId: number;
    }[];
  }[];
  /**
   * SKU集合 ,PrdWeight
   */
  weights: {
    /**
     * 规格值id（多规格值用英文逗号分隔） ,Long
     */
    ids?: number[];
    idsStr?: string;
    /**
     * 规格
     */
    names: string;
    /**
     * 规格图片编码
     */
    picCode?: string;
    /**
     * 规格编码
     */
    code?: string;
    /**
     * 规格条码
     */
    barcode: string;
    /**
     * 货号
     */
    artCode?: string;
    /**
     * 税率
     */
    taxRate?: number;
    /**
     * 划线价
     */
    scribingPrice?: number;
    /**
     * 销售价
     */
    salePrice?: number;
    /**
     * 库存量
     */
    stockNum?: number;
  }[];
  /**
   * 商品须知
   */
  instructions?: string;
  /**
   * 图文详情
   */
  graphicDetails?: string;
  /**
   * 操作方式（0-下架；1-上架）
   */
  method: number;
  /**
   * 销售渠道1-线上；2-线下,@seeSalesFunnelEnum
   */
  salesFunnel: number;
}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72322) 的 **返回类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `POST /ground-pc-api/store-product/save`
 * @更新时间 `2023-02-27 15:49:01`
 */
export type GroundPcApiStoreProductSavePostResponse = number;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72322) 的 **请求配置的类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `POST /ground-pc-api/store-product/save`
 * @更新时间 `2023-02-27 15:49:01`
 */
type GroundPcApiStoreProductSavePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product/save',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72322) 的 **请求配置**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `POST /ground-pc-api/store-product/save`
 * @更新时间 `2023-02-27 15:49:01`
 */
const groundPcApiStoreProductSavePostRequestConfig: GroundPcApiStoreProductSavePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_17,
    devUrl: devUrl_0_2_0_17,
    prodUrl: prodUrl_0_2_0_17,
    path: '/ground-pc-api/store-product/save',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_17,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductSavePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1764/interface/api/72322) 的 **请求函数**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `POST /ground-pc-api/store-product/save`
 * @更新时间 `2023-02-27 15:49:01`
 */
export const groundPcApiStoreProductSavePost = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductSavePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductSavePostResponse>(
    prepare(groundPcApiStoreProductSavePostRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreProductSavePost.requestConfig =
  groundPcApiStoreProductSavePostRequestConfig;

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1764/interface/api/72324) 的 **请求类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `PUT /ground-pc-api/store-product/update`
 * @更新时间 `2023-02-27 15:49:02`
 */
export interface GroundPcApiStoreProductUpdatePutRequest {
  /**
   * 数据id
   */
  id: number;
  /**
   * 项目ID
   */
  projectId: number;
  /**
   * 门店ID ,Long
   */
  storeIdList: number[];
  /**
   * 商品名称
   */
  name: string;
  /**
   * 商品分类id
   */
  classifyId: string;
  /**
   * 商品分类名称
   */
  classifyName?: string;
  /**
   * 商品品牌id
   */
  brandId?: number;
  /**
   * 商品品牌名称
   */
  brandName?: string;
  /**
   * 商品单位id
   */
  unitId: number;
  /**
   * 商品单位名称
   */
  unitName?: string;
  /**
   * 货品组别id
   */
  productGroup?: number;
  /**
   * 商品编码
   */
  code?: string;
  /**
   * 封面图片编码
   */
  coverCode?: string;
  /**
   * 详情图片编码 ,String
   */
  detailsCodes?: string[];
  /**
   * SKU集合 ,PrdWeight
   */
  weights: {
    /**
     * 数据id
     */
    id: number;
    /**
     * 规格
     */
    names: string;
    /**
     * 规格图片编码
     */
    picCode?: string;
    /**
     * 规格编码
     */
    code?: string;
    /**
     * 规格条码
     */
    barcode: string;
    /**
     * 划线价
     */
    scribingPrice?: number;
    /**
     * 门店零售价
     */
    salePrice?: number;
  }[];
  /**
   * 商品须知
   */
  instructions?: string;
  /**
   * 图文详情
   */
  graphicDetails?: string;
  /**
   * 操作方式（0-下架；1-上架）
   */
  method: number;
  /**
   * 销售渠道1-线上；2-线下,@seeSalesFunnelEnum
   */
  salesFunnel: number;
}

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1764/interface/api/72324) 的 **返回类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `PUT /ground-pc-api/store-product/update`
 * @更新时间 `2023-02-27 15:49:02`
 */
export type GroundPcApiStoreProductUpdatePutResponse = number;

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1764/interface/api/72324) 的 **请求配置的类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `PUT /ground-pc-api/store-product/update`
 * @更新时间 `2023-02-27 15:49:02`
 */
type GroundPcApiStoreProductUpdatePutRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product/update',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1764/interface/api/72324) 的 **请求配置**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `PUT /ground-pc-api/store-product/update`
 * @更新时间 `2023-02-27 15:49:02`
 */
const groundPcApiStoreProductUpdatePutRequestConfig: GroundPcApiStoreProductUpdatePutRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_17,
    devUrl: devUrl_0_2_0_17,
    prodUrl: prodUrl_0_2_0_17,
    path: '/ground-pc-api/store-product/update',
    method: Method.PUT,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_17,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductUpdatePut',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1764/interface/api/72324) 的 **请求函数**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `PUT /ground-pc-api/store-product/update`
 * @更新时间 `2023-02-27 15:49:02`
 */
export const groundPcApiStoreProductUpdatePut = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductUpdatePutRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductUpdatePutResponse>(
    prepare(groundPcApiStoreProductUpdatePutRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreProductUpdatePut.requestConfig =
  groundPcApiStoreProductUpdatePutRequestConfig;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72326) 的 **请求类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/info/{id}`
 * @更新时间 `2023-03-03 13:42:57`
 */
export interface GroundPcApiStoreProductInfoIdGetRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72326) 的 **返回类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/info/{id}`
 * @更新时间 `2023-03-03 13:42:57`
 */
export interface GroundPcApiStoreProductInfoIdGetResponse {
  /**
   * 数据id
   */
  id?: number;
  /**
   * 门店IDList ,Long
   */
  storeIdList?: number[];
  /**
   * 项目ID
   */
  projectId?: number;
  /**
   * 销售渠道1-线上；2-线下,@seeSalesFunnelEnum
   */
  salesFunnel?: number;
  /**
   * 货品组别id
   */
  productGroup?: number;
  /**
   * 商品名称
   */
  name?: string;
  /**
   * 商品分类id
   */
  classifyId?: string;
  /**
   * 商品分类名称
   */
  classifyName?: string;
  /**
   * 商品品牌id
   */
  brandId?: number;
  /**
   * 商品品牌名称
   */
  brandName?: string;
  /**
   * 商品单位id
   */
  unitId?: number;
  /**
   * 商品单位名称
   */
  unitName?: string;
  /**
   * 商品编码
   */
  code?: string;
  /**
   * 状态(1-销售中；2-已售罄；3-已下架)
   */
  status?: number;
  /**
   * 封面图片编码 ,GetResourceFilesResp
   */
  coverCode?: {
    /**
     * id
     */
    id?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 类型
     */
    type?: string;
    /**
     * 格式
     */
    format?: string;
    /**
     * 文件大小（字节B）
     */
    size?: number;
    /**
     * 预览地址
     */
    previewAddress?: string;
  };
  /**
   * 详情图片编码 ,GetResourceFilesResp
   */
  detailsCodes?: {
    /**
     * id
     */
    id?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 类型
     */
    type?: string;
    /**
     * 格式
     */
    format?: string;
    /**
     * 文件大小（字节B）
     */
    size?: number;
    /**
     * 预览地址
     */
    previewAddress?: string;
  }[];
  /**
   * SKU集合 ,PrdWeight
   */
  weights?: {
    /**
     * 数据id
     */
    id?: number;
    /**
     * 规格
     */
    names?: string;
    /**
     * 规格图片编码 ,GetResourceFilesResp
     */
    picCode?: {
      /**
       * id
       */
      id?: string;
      /**
       * 名称
       */
      name?: string;
      /**
       * 类型
       */
      type?: string;
      /**
       * 格式
       */
      format?: string;
      /**
       * 文件大小（字节B）
       */
      size?: number;
      /**
       * 预览地址
       */
      previewAddress?: string;
    };
    /**
     * 规格编码
     */
    code?: string;
    /**
     * 规格条码
     */
    barcode?: string;
    /**
     * 货号
     */
    artCode?: string;
    /**
     * 税率
     */
    taxRate?: number;
    /**
     * 划线价
     */
    scribingPrice?: number;
    /**
     * 销售价
     */
    salePrice?: number;
    /**
     * 库存
     */
    stockNum?: number;
  }[];
  /**
   * 商品须知
   */
  instructions?: string;
  /**
   * 图文详情
   */
  graphicDetails?: string;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72326) 的 **请求配置的类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/info/{id}`
 * @更新时间 `2023-03-03 13:42:57`
 */
type GroundPcApiStoreProductInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product/info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72326) 的 **请求配置**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/info/{id}`
 * @更新时间 `2023-03-03 13:42:57`
 */
const groundPcApiStoreProductInfoIdGetRequestConfig: GroundPcApiStoreProductInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_17,
    devUrl: devUrl_0_2_0_17,
    prodUrl: prodUrl_0_2_0_17,
    path: '/ground-pc-api/store-product/info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_17,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72326) 的 **请求函数**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/info/{id}`
 * @更新时间 `2023-03-03 13:42:57`
 */
export const groundPcApiStoreProductInfoIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductInfoIdGetResponse>(
    prepare(groundPcApiStoreProductInfoIdGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreProductInfoIdGet.requestConfig =
  groundPcApiStoreProductInfoIdGetRequestConfig;

/**
 * 接口 [上下架↗](https://yapi.huianrong.com/project/1764/interface/api/72370) 的 **请求类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `PUT /ground-pc-api/store-product/upperAndLowerShelves`
 * @更新时间 `2023-02-27 15:49:03`
 */
export interface GroundPcApiStoreProductUpperAndLowerShelvesPutRequest {
  /**
   * 数据ids ,Long
   */
  ids: number[];
  /**
   * 操作方式（0-下架；1-上架）
   */
  method: number;
}

/**
 * 接口 [上下架↗](https://yapi.huianrong.com/project/1764/interface/api/72370) 的 **返回类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `PUT /ground-pc-api/store-product/upperAndLowerShelves`
 * @更新时间 `2023-02-27 15:49:03`
 */
export type GroundPcApiStoreProductUpperAndLowerShelvesPutResponse = number[];

/**
 * 接口 [上下架↗](https://yapi.huianrong.com/project/1764/interface/api/72370) 的 **请求配置的类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `PUT /ground-pc-api/store-product/upperAndLowerShelves`
 * @更新时间 `2023-02-27 15:49:03`
 */
type GroundPcApiStoreProductUpperAndLowerShelvesPutRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product/upperAndLowerShelves',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [上下架↗](https://yapi.huianrong.com/project/1764/interface/api/72370) 的 **请求配置**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `PUT /ground-pc-api/store-product/upperAndLowerShelves`
 * @更新时间 `2023-02-27 15:49:03`
 */
const groundPcApiStoreProductUpperAndLowerShelvesPutRequestConfig: GroundPcApiStoreProductUpperAndLowerShelvesPutRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_17,
    devUrl: devUrl_0_2_0_17,
    prodUrl: prodUrl_0_2_0_17,
    path: '/ground-pc-api/store-product/upperAndLowerShelves',
    method: Method.PUT,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_17,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductUpperAndLowerShelvesPut',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [上下架↗](https://yapi.huianrong.com/project/1764/interface/api/72370) 的 **请求函数**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `PUT /ground-pc-api/store-product/upperAndLowerShelves`
 * @更新时间 `2023-02-27 15:49:03`
 */
export const groundPcApiStoreProductUpperAndLowerShelvesPut = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductUpperAndLowerShelvesPutRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductUpperAndLowerShelvesPutResponse>(
    prepare(
      groundPcApiStoreProductUpperAndLowerShelvesPutRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiStoreProductUpperAndLowerShelvesPut.requestConfig =
  groundPcApiStoreProductUpperAndLowerShelvesPutRequestConfig;

/**
 * 接口 [指定商品规格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72372) 的 **请求类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/all-sku/{storeProductId}`
 * @更新时间 `2023-02-27 15:49:03`
 */
export interface GroundPcApiStoreProductAllSkuStoreProductIdGetRequest {
  /**
   * (Long)
   */
  storeProductId: string;
}

/**
 * 接口 [指定商品规格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72372) 的 **返回类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/all-sku/{storeProductId}`
 * @更新时间 `2023-02-27 15:49:03`
 */
export type GroundPcApiStoreProductAllSkuStoreProductIdGetResponse = {
  /**
   * skuid
   */
  storeProductWeightId?: number;
  /**
   * sku
   */
  sku?: string;
}[];

/**
 * 接口 [指定商品规格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72372) 的 **请求配置的类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/all-sku/{storeProductId}`
 * @更新时间 `2023-02-27 15:49:03`
 */
type GroundPcApiStoreProductAllSkuStoreProductIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product/all-sku/{storeProductId}',
    'data',
    'storeProductId',
    string,
    false
  >
>;

/**
 * 接口 [指定商品规格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72372) 的 **请求配置**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/all-sku/{storeProductId}`
 * @更新时间 `2023-02-27 15:49:03`
 */
const groundPcApiStoreProductAllSkuStoreProductIdGetRequestConfig: GroundPcApiStoreProductAllSkuStoreProductIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_17,
    devUrl: devUrl_0_2_0_17,
    prodUrl: prodUrl_0_2_0_17,
    path: '/ground-pc-api/store-product/all-sku/{storeProductId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_17,
    paramNames: ['storeProductId'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductAllSkuStoreProductIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [指定商品规格列表↗](https://yapi.huianrong.com/project/1764/interface/api/72372) 的 **请求函数**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/all-sku/{storeProductId}`
 * @更新时间 `2023-02-27 15:49:03`
 */
export const groundPcApiStoreProductAllSkuStoreProductIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductAllSkuStoreProductIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductAllSkuStoreProductIdGetResponse>(
    prepare(
      groundPcApiStoreProductAllSkuStoreProductIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiStoreProductAllSkuStoreProductIdGet.requestConfig =
  groundPcApiStoreProductAllSkuStoreProductIdGetRequestConfig;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72630) 的 **请求类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/info/{id}/{storeId}`
 * @更新时间 `2023-03-03 14:21:46`
 */
export interface GroundPcApiStoreProductInfoIdStoreIdGetRequest {
  /**
   * (Long)
   */
  id: string;
  /**
   * (Long)
   */
  storeId: string;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72630) 的 **返回类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/info/{id}/{storeId}`
 * @更新时间 `2023-03-03 14:21:46`
 */
export interface GroundPcApiStoreProductInfoIdStoreIdGetResponse {
  /**
   * 数据id
   */
  id?: number;
  /**
   * 门店IDList ,Long
   */
  storeIdList?: number[];
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 项目ID
   */
  projectId?: number;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 销售渠道1-线上；2-线下,@seeSalesFunnelEnum
   */
  salesFunnel?: number;
  /**
   * 货品组别id
   */
  productGroup?: number;
  /**
   * 商品名称
   */
  name?: string;
  /**
   * 商品分类id
   */
  classifyId?: string;
  /**
   * 商品分类名称
   */
  classifyName?: string;
  /**
   * 商品品牌id
   */
  brandId?: number;
  /**
   * 商品品牌名称
   */
  brandName?: string;
  /**
   * 商品单位id
   */
  unitId?: number;
  /**
   * 商品单位名称
   */
  unitName?: string;
  /**
   * 商品编码
   */
  code?: string;
  /**
   * 状态(1-销售中；2-已售罄；3-已下架)
   */
  status?: number;
  /**
   * 封面图片编码 ,GetResourceFilesResp
   */
  coverCode?: {
    /**
     * id
     */
    id?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 类型
     */
    type?: string;
    /**
     * 格式
     */
    format?: string;
    /**
     * 文件大小（字节B）
     */
    size?: number;
    /**
     * 预览地址
     */
    previewAddress?: string;
  };
  /**
   * 详情图片编码 ,GetResourceFilesResp
   */
  detailsCodes?: {
    /**
     * id
     */
    id?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 类型
     */
    type?: string;
    /**
     * 格式
     */
    format?: string;
    /**
     * 文件大小（字节B）
     */
    size?: number;
    /**
     * 预览地址
     */
    previewAddress?: string;
  }[];
  /**
   * SKU集合 ,PrdWeight
   */
  weights?: {
    /**
     * 数据id
     */
    id?: number;
    /**
     * 规格
     */
    names?: string;
    /**
     * 规格图片编码 ,GetResourceFilesResp
     */
    picCode?: {
      /**
       * id
       */
      id?: string;
      /**
       * 名称
       */
      name?: string;
      /**
       * 类型
       */
      type?: string;
      /**
       * 格式
       */
      format?: string;
      /**
       * 文件大小（字节B）
       */
      size?: number;
      /**
       * 预览地址
       */
      previewAddress?: string;
    };
    /**
     * 规格编码
     */
    code?: string;
    /**
     * 规格条码
     */
    barcode?: string;
    /**
     * 货号
     */
    artCode?: string;
    /**
     * 税率
     */
    taxRate?: number;
    /**
     * 划线价
     */
    scribingPrice?: number;
    /**
     * 销售价
     */
    salePrice?: number;
    /**
     * 库存
     */
    stockNum?: number;
  }[];
  /**
   * 商品须知
   */
  instructions?: string;
  /**
   * 图文详情
   */
  graphicDetails?: string;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72630) 的 **请求配置的类型**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/info/{id}/{storeId}`
 * @更新时间 `2023-03-03 14:21:46`
 */
type GroundPcApiStoreProductInfoIdStoreIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product/info/{id}/{storeId}',
    'data',
    'id' | 'storeId',
    string,
    false
  >
>;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72630) 的 **请求配置**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/info/{id}/{storeId}`
 * @更新时间 `2023-03-03 14:21:46`
 */
const groundPcApiStoreProductInfoIdStoreIdGetRequestConfig: GroundPcApiStoreProductInfoIdStoreIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_17,
    devUrl: devUrl_0_2_0_17,
    prodUrl: prodUrl_0_2_0_17,
    path: '/ground-pc-api/store-product/info/{id}/{storeId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_17,
    paramNames: ['id', 'storeId'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductInfoIdStoreIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1764/interface/api/72630) 的 **请求函数**
 *
 * @分类 [商品档案↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23165)
 * @请求头 `GET /ground-pc-api/store-product/info/{id}/{storeId}`
 * @更新时间 `2023-03-03 14:21:46`
 */
export const groundPcApiStoreProductInfoIdStoreIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductInfoIdStoreIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductInfoIdStoreIdGetResponse>(
    prepare(groundPcApiStoreProductInfoIdStoreIdGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreProductInfoIdStoreIdGet.requestConfig =
  groundPcApiStoreProductInfoIdStoreIdGetRequestConfig;

const mockUrl_0_2_0_18 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_18 = '' as any;
const prodUrl_0_2_0_18 = '' as any;
const dataKey_0_2_0_18 = 'data' as any;

/**
 * 接口 [获取用户菜单信息↗](https://yapi.huianrong.com/project/1764/interface/api/72336) 的 **请求类型**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/auth/getRouters`
 * @更新时间 `2023-02-24 14:56:40`
 */
export interface GroundPcApiAuthGetRoutersGetRequest {}

/**
 * 接口 [获取用户菜单信息↗](https://yapi.huianrong.com/project/1764/interface/api/72336) 的 **返回类型**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/auth/getRouters`
 * @更新时间 `2023-02-24 14:56:40`
 */
export type GroundPcApiAuthGetRoutersGetResponse = {
  name?: string;
  nameEn?: string;
  path?: string;
  hidden?: boolean;
  redirect?: string;
  component?: string;
  query?: string;
  alwaysShow?: boolean;
  meta?: {
    title?: string;
    icon?: string;
    noCache?: boolean;
    link?: string;
  };
  children?: {
    name?: string;
    nameEn?: string;
    path?: string;
    hidden?: boolean;
    redirect?: string;
    component?: string;
    query?: string;
    alwaysShow?: boolean;
    meta?: {
      title?: string;
      icon?: string;
      noCache?: boolean;
      link?: string;
    };
    children?: {}[];
    isFrame?: number;
    groupType?: number;
    remark?: string;
  }[];
  isFrame?: number;
  groupType?: number;
  remark?: string;
}[];

/**
 * 接口 [获取用户菜单信息↗](https://yapi.huianrong.com/project/1764/interface/api/72336) 的 **请求配置的类型**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/auth/getRouters`
 * @更新时间 `2023-02-24 14:56:40`
 */
type GroundPcApiAuthGetRoutersGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/auth/getRouters',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [获取用户菜单信息↗](https://yapi.huianrong.com/project/1764/interface/api/72336) 的 **请求配置**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/auth/getRouters`
 * @更新时间 `2023-02-24 14:56:40`
 */
const groundPcApiAuthGetRoutersGetRequestConfig: GroundPcApiAuthGetRoutersGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_18,
    devUrl: devUrl_0_2_0_18,
    prodUrl: prodUrl_0_2_0_18,
    path: '/ground-pc-api/auth/getRouters',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_18,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiAuthGetRoutersGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取用户菜单信息↗](https://yapi.huianrong.com/project/1764/interface/api/72336) 的 **请求函数**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/auth/getRouters`
 * @更新时间 `2023-02-24 14:56:40`
 */
export const groundPcApiAuthGetRoutersGet = /*#__PURE__*/ (
  requestData?: GroundPcApiAuthGetRoutersGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiAuthGetRoutersGetResponse>(
    prepare(groundPcApiAuthGetRoutersGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiAuthGetRoutersGet.requestConfig =
  groundPcApiAuthGetRoutersGetRequestConfig;

/**
 * 接口 [获取当前登录的用户信息↗](https://yapi.huianrong.com/project/1764/interface/api/72338) 的 **请求类型**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/auth/getUserInfo`
 * @更新时间 `2023-02-24 14:56:40`
 */
export interface GroundPcApiAuthGetUserInfoGetRequest {}

/**
 * 接口 [获取当前登录的用户信息↗](https://yapi.huianrong.com/project/1764/interface/api/72338) 的 **返回类型**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/auth/getUserInfo`
 * @更新时间 `2023-02-24 14:56:40`
 */
export interface GroundPcApiAuthGetUserInfoGetResponse {
  /**
   * 用户ID
   */
  userId?: number;
  /**
   * 部门ID
   */
  deptId?: number;
  /**
   * 用户统一编号
   */
  userCode?: string;
  /**
   * 用户签名
   */
  userSignature?: string;
  /**
   * 用户账号
   */
  userName?: string;
  /**
   * 姓名
   */
  realName?: string;
  /**
   * 用户昵称
   */
  nickName?: string;
  /**
   * 用户类型 0超级管理员 1其他
   */
  userType?: number;
  /**
   * 用户邮箱
   */
  email?: string;
  /**
   * 手机号码
   */
  phoneNumber?: string;
  /**
   * 身份证号
   */
  idNumber?: string;
  /**
   * 用户性别（0男 1女 2未知）
   */
  sex?: string;
  /**
   * 头像地址
   */
  avatar?: string;
  /**
   * 帐号状态（0正常 1停用）
   */
  status?: string;
  /**
   * 商户id
   */
  merchantId?: number;
  /**
   * 创建者
   */
  createBy?: string;
  clientId?: number;
  projectId?: number;
  systemKey?: string;
  /**
   * 用户角色列表
   */
  roles?: string[];
  /**
   * 用户权限信息
   */
  permissions?: string[];
}

/**
 * 接口 [获取当前登录的用户信息↗](https://yapi.huianrong.com/project/1764/interface/api/72338) 的 **请求配置的类型**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/auth/getUserInfo`
 * @更新时间 `2023-02-24 14:56:40`
 */
type GroundPcApiAuthGetUserInfoGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/auth/getUserInfo',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [获取当前登录的用户信息↗](https://yapi.huianrong.com/project/1764/interface/api/72338) 的 **请求配置**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/auth/getUserInfo`
 * @更新时间 `2023-02-24 14:56:40`
 */
const groundPcApiAuthGetUserInfoGetRequestConfig: GroundPcApiAuthGetUserInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_18,
    devUrl: devUrl_0_2_0_18,
    prodUrl: prodUrl_0_2_0_18,
    path: '/ground-pc-api/auth/getUserInfo',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_18,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiAuthGetUserInfoGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取当前登录的用户信息↗](https://yapi.huianrong.com/project/1764/interface/api/72338) 的 **请求函数**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/auth/getUserInfo`
 * @更新时间 `2023-02-24 14:56:40`
 */
export const groundPcApiAuthGetUserInfoGet = /*#__PURE__*/ (
  requestData?: GroundPcApiAuthGetUserInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiAuthGetUserInfoGetResponse>(
    prepare(groundPcApiAuthGetUserInfoGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiAuthGetUserInfoGet.requestConfig =
  groundPcApiAuthGetUserInfoGetRequestConfig;

/**
 * 接口 [登陆接口↗](https://yapi.huianrong.com/project/1764/interface/api/72340) 的 **请求类型**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/oauth2/authorize`
 * @更新时间 `2023-02-24 10:42:14`
 */
export interface GroundPcApiOauth2AuthorizeGetRequest {
  /**
   * 额外参数
   */
  extra?: string;
  /**
   * 同一登陆平台的凭证
   */
  certificate?: string;
}

/**
 * 接口 [登陆接口↗](https://yapi.huianrong.com/project/1764/interface/api/72340) 的 **返回类型**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/oauth2/authorize`
 * @更新时间 `2023-02-24 10:42:14`
 */
export interface GroundPcApiOauth2AuthorizeGetResponse {
  /**
   * 状态码
   */
  state: string;
  /**
   * 重定向地址
   */
  redirectUrl: string;
}

/**
 * 接口 [登陆接口↗](https://yapi.huianrong.com/project/1764/interface/api/72340) 的 **请求配置的类型**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/oauth2/authorize`
 * @更新时间 `2023-02-24 10:42:14`
 */
type GroundPcApiOauth2AuthorizeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/oauth2/authorize',
    'data',
    string,
    'extra' | 'certificate',
    false
  >
>;

/**
 * 接口 [登陆接口↗](https://yapi.huianrong.com/project/1764/interface/api/72340) 的 **请求配置**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/oauth2/authorize`
 * @更新时间 `2023-02-24 10:42:14`
 */
const groundPcApiOauth2AuthorizeGetRequestConfig: GroundPcApiOauth2AuthorizeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_18,
    devUrl: devUrl_0_2_0_18,
    prodUrl: prodUrl_0_2_0_18,
    path: '/ground-pc-api/oauth2/authorize',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_18,
    paramNames: [],
    queryNames: ['extra', 'certificate'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiOauth2AuthorizeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [登陆接口↗](https://yapi.huianrong.com/project/1764/interface/api/72340) 的 **请求函数**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/oauth2/authorize`
 * @更新时间 `2023-02-24 10:42:14`
 */
export const groundPcApiOauth2AuthorizeGet = /*#__PURE__*/ (
  requestData: GroundPcApiOauth2AuthorizeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiOauth2AuthorizeGetResponse>(
    prepare(groundPcApiOauth2AuthorizeGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiOauth2AuthorizeGet.requestConfig =
  groundPcApiOauth2AuthorizeGetRequestConfig;

/**
 * 接口 [token交换获取↗](https://yapi.huianrong.com/project/1764/interface/api/72342) 的 **请求类型**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/oauth2/exchange`
 * @更新时间 `2023-02-24 10:41:15`
 */
export interface GroundPcApiOauth2ExchangeGetRequest {
  /**
   * 状态值
   */
  state?: string;
}

/**
 * 接口 [token交换获取↗](https://yapi.huianrong.com/project/1764/interface/api/72342) 的 **返回类型**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/oauth2/exchange`
 * @更新时间 `2023-02-24 10:41:15`
 */
export interface GroundPcApiOauth2ExchangeGetResponse {
  token: string;
}

/**
 * 接口 [token交换获取↗](https://yapi.huianrong.com/project/1764/interface/api/72342) 的 **请求配置的类型**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/oauth2/exchange`
 * @更新时间 `2023-02-24 10:41:15`
 */
type GroundPcApiOauth2ExchangeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/oauth2/exchange',
    'data',
    string,
    'state',
    false
  >
>;

/**
 * 接口 [token交换获取↗](https://yapi.huianrong.com/project/1764/interface/api/72342) 的 **请求配置**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/oauth2/exchange`
 * @更新时间 `2023-02-24 10:41:15`
 */
const groundPcApiOauth2ExchangeGetRequestConfig: GroundPcApiOauth2ExchangeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_18,
    devUrl: devUrl_0_2_0_18,
    prodUrl: prodUrl_0_2_0_18,
    path: '/ground-pc-api/oauth2/exchange',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_18,
    paramNames: [],
    queryNames: ['state'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiOauth2ExchangeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [token交换获取↗](https://yapi.huianrong.com/project/1764/interface/api/72342) 的 **请求函数**
 *
 * @分类 [权限相关接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23171)
 * @请求头 `GET /ground-pc-api/oauth2/exchange`
 * @更新时间 `2023-02-24 10:41:15`
 */
export const groundPcApiOauth2ExchangeGet = /*#__PURE__*/ (
  requestData: GroundPcApiOauth2ExchangeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiOauth2ExchangeGetResponse>(
    prepare(groundPcApiOauth2ExchangeGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiOauth2ExchangeGet.requestConfig =
  groundPcApiOauth2ExchangeGetRequestConfig;

const mockUrl_0_2_0_19 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_19 = '' as any;
const prodUrl_0_2_0_19 = '' as any;
const dataKey_0_2_0_19 = 'data' as any;

/**
 * 接口 [根据持有卡id查询持有卡详细信息↗](https://yapi.huianrong.com/project/1764/interface/api/72386) 的 **请求类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23187)
 * @请求头 `GET /ground-pc-api/memberCardHold/cardHoldInfo`
 * @更新时间 `2023-02-28 11:34:21`
 */
export interface GroundPcApiMemberCardHoldCardHoldInfoGetRequest {
  /**
   * 电子卡号或物理卡号
   */
  cardNo?: string;
}

/**
 * 接口 [根据持有卡id查询持有卡详细信息↗](https://yapi.huianrong.com/project/1764/interface/api/72386) 的 **返回类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23187)
 * @请求头 `GET /ground-pc-api/memberCardHold/cardHoldInfo`
 * @更新时间 `2023-02-28 11:34:21`
 */
export interface GroundPcApiMemberCardHoldCardHoldInfoGetResponse {
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
   * 颜色的RGB字符值,卡面设置为1时使用
   */
  cardFaceColor?: string;
}

/**
 * 接口 [根据持有卡id查询持有卡详细信息↗](https://yapi.huianrong.com/project/1764/interface/api/72386) 的 **请求配置的类型**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23187)
 * @请求头 `GET /ground-pc-api/memberCardHold/cardHoldInfo`
 * @更新时间 `2023-02-28 11:34:21`
 */
type GroundPcApiMemberCardHoldCardHoldInfoGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/memberCardHold/cardHoldInfo',
    'data',
    string,
    'cardNo',
    false
  >
>;

/**
 * 接口 [根据持有卡id查询持有卡详细信息↗](https://yapi.huianrong.com/project/1764/interface/api/72386) 的 **请求配置**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23187)
 * @请求头 `GET /ground-pc-api/memberCardHold/cardHoldInfo`
 * @更新时间 `2023-02-28 11:34:21`
 */
const groundPcApiMemberCardHoldCardHoldInfoGetRequestConfig: GroundPcApiMemberCardHoldCardHoldInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_19,
    devUrl: devUrl_0_2_0_19,
    prodUrl: prodUrl_0_2_0_19,
    path: '/ground-pc-api/memberCardHold/cardHoldInfo',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_19,
    paramNames: [],
    queryNames: ['cardNo'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiMemberCardHoldCardHoldInfoGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [根据持有卡id查询持有卡详细信息↗](https://yapi.huianrong.com/project/1764/interface/api/72386) 的 **请求函数**
 *
 * @分类 [会员的持卡信息查询↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23187)
 * @请求头 `GET /ground-pc-api/memberCardHold/cardHoldInfo`
 * @更新时间 `2023-02-28 11:34:21`
 */
export const groundPcApiMemberCardHoldCardHoldInfoGet = /*#__PURE__*/ (
  requestData: GroundPcApiMemberCardHoldCardHoldInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiMemberCardHoldCardHoldInfoGetResponse>(
    prepare(groundPcApiMemberCardHoldCardHoldInfoGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiMemberCardHoldCardHoldInfoGet.requestConfig =
  groundPcApiMemberCardHoldCardHoldInfoGetRequestConfig;

const mockUrl_0_2_0_21 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_21 = '' as any;
const prodUrl_0_2_0_21 = '' as any;
const dataKey_0_2_0_21 = 'data' as any;

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1764/interface/api/72404) 的 **请求类型**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/page`
 * @更新时间 `2023-03-02 14:36:21`
 */
export interface GroundPcApiStoreProductStockPageGetRequest {
  /**
   * 商品名称编码条码
   */
  key?: string;
  /**
   * 商品分类
   */
  classifyId?: string;
  /**
   * 商品品牌
   */
  brandId?: string;
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
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1764/interface/api/72404) 的 **返回类型**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/page`
 * @更新时间 `2023-03-02 14:36:21`
 */
export interface GroundPcApiStoreProductStockPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 店铺商品id
     */
    storeProductId?: number;
    /**
     * 商品名称
     */
    productName?: string;
    /**
     * 分类
     */
    classifyName?: string;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 店铺名称
     */
    storeName?: string;
    /**
     * 库存数量(可用数量)
     */
    availableNum?: number;
    /**
     * 价值
     */
    amount?: number;
  }[];
}

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1764/interface/api/72404) 的 **请求配置的类型**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/page`
 * @更新时间 `2023-03-02 14:36:21`
 */
type GroundPcApiStoreProductStockPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product-stock/page',
    'data',
    string,
    'key' | 'classifyId' | 'brandId' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1764/interface/api/72404) 的 **请求配置**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/page`
 * @更新时间 `2023-03-02 14:36:21`
 */
const groundPcApiStoreProductStockPageGetRequestConfig: GroundPcApiStoreProductStockPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_21,
    devUrl: devUrl_0_2_0_21,
    prodUrl: prodUrl_0_2_0_21,
    path: '/ground-pc-api/store-product-stock/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_21,
    paramNames: [],
    queryNames: ['key', 'classifyId', 'brandId', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductStockPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1764/interface/api/72404) 的 **请求函数**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/page`
 * @更新时间 `2023-03-02 14:36:21`
 */
export const groundPcApiStoreProductStockPageGet = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductStockPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductStockPageGetResponse>(
    prepare(groundPcApiStoreProductStockPageGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreProductStockPageGet.requestConfig =
  groundPcApiStoreProductStockPageGetRequestConfig;

/**
 * 接口 [商品库存概况↗](https://yapi.huianrong.com/project/1764/interface/api/72406) 的 **请求类型**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/info/{storeProductId}`
 * @更新时间 `2023-03-02 14:36:22`
 */
export interface GroundPcApiStoreProductStockInfoStoreProductIdGetRequest {
  /**
   * (Long)
   */
  storeProductId: string;
}

/**
 * 接口 [商品库存概况↗](https://yapi.huianrong.com/project/1764/interface/api/72406) 的 **返回类型**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/info/{storeProductId}`
 * @更新时间 `2023-03-02 14:36:22`
 */
export interface GroundPcApiStoreProductStockInfoStoreProductIdGetResponse {
  /**
   * 商品信息 ,ProductInfo
   */
  productInfo?: {
    /**
     * 商品id
     */
    storeProductId?: number;
    /**
     * 商品名称
     */
    name?: string;
    /**
     * 分类
     */
    classifyName?: string;
    /**
     * 品牌
     */
    brandName?: string;
    /**
     * 单位
     */
    unitName?: string;
    /**
     * 状态1-销售中；2-已售罄；3-已下架
     */
    status?: number;
    /**
     * 商品封面图片 ,GetResourceFilesResp
     */
    coverPic?: {
      /**
       * id
       */
      id?: string;
      /**
       * 名称
       */
      name?: string;
      /**
       * 类型
       */
      type?: string;
      /**
       * 格式
       */
      format?: string;
      /**
       * 文件大小（字节B）
       */
      size?: number;
      /**
       * 预览地址
       */
      previewAddress?: string;
    }[];
    /**
     * 商品详情图片 ,GetResourceFilesResp
     */
    detailPic?: {
      /**
       * id
       */
      id?: string;
      /**
       * 名称
       */
      name?: string;
      /**
       * 类型
       */
      type?: string;
      /**
       * 格式
       */
      format?: string;
      /**
       * 文件大小（字节B）
       */
      size?: number;
      /**
       * 预览地址
       */
      previewAddress?: string;
    }[];
  };
  /**
   * sku库存信息 ,SkuStockInfo
   */
  skuStockInfoList?: {
    /**
     * 商品id
     */
    storeProductId?: number;
    /**
     * 店铺商品skuid
     */
    storeProductWeightId?: number;
    /**
     * 规格
     */
    sku?: string;
    /**
     * 规格图片 ,GetResourceFilesResp
     */
    skuPic?: {
      /**
       * id
       */
      id?: string;
      /**
       * 名称
       */
      name?: string;
      /**
       * 类型
       */
      type?: string;
      /**
       * 格式
       */
      format?: string;
      /**
       * 文件大小（字节B）
       */
      size?: number;
      /**
       * 预览地址
       */
      previewAddress?: string;
    }[];
    /**
     * 规格编码
     */
    skuCode?: string;
    /**
     * 规格条码
     */
    barcode?: string;
    /**
     * 销售价格
     */
    scribingPrice?: number;
    /**
     * 门店零售价
     */
    salePrice?: number;
    /**
     * 可用数量
     */
    availableNum?: number;
    /**
     * 库存价值
     */
    amount?: number;
  }[];
}

/**
 * 接口 [商品库存概况↗](https://yapi.huianrong.com/project/1764/interface/api/72406) 的 **请求配置的类型**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/info/{storeProductId}`
 * @更新时间 `2023-03-02 14:36:22`
 */
type GroundPcApiStoreProductStockInfoStoreProductIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product-stock/info/{storeProductId}',
    'data',
    'storeProductId',
    string,
    false
  >
>;

/**
 * 接口 [商品库存概况↗](https://yapi.huianrong.com/project/1764/interface/api/72406) 的 **请求配置**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/info/{storeProductId}`
 * @更新时间 `2023-03-02 14:36:22`
 */
const groundPcApiStoreProductStockInfoStoreProductIdGetRequestConfig: GroundPcApiStoreProductStockInfoStoreProductIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_21,
    devUrl: devUrl_0_2_0_21,
    prodUrl: prodUrl_0_2_0_21,
    path: '/ground-pc-api/store-product-stock/info/{storeProductId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_21,
    paramNames: ['storeProductId'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductStockInfoStoreProductIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [商品库存概况↗](https://yapi.huianrong.com/project/1764/interface/api/72406) 的 **请求函数**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/info/{storeProductId}`
 * @更新时间 `2023-03-02 14:36:22`
 */
export const groundPcApiStoreProductStockInfoStoreProductIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductStockInfoStoreProductIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductStockInfoStoreProductIdGetResponse>(
    prepare(
      groundPcApiStoreProductStockInfoStoreProductIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiStoreProductStockInfoStoreProductIdGet.requestConfig =
  groundPcApiStoreProductStockInfoStoreProductIdGetRequestConfig;

/**
 * 接口 [单个商品出入库明细↗](https://yapi.huianrong.com/project/1764/interface/api/72408) 的 **请求类型**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/single-product-list`
 * @更新时间 `2023-03-02 14:36:23`
 */
export interface GroundPcApiStoreProductStockSingleProductListGetRequest {
  /**
   * 店铺商品id
   */
  storeProductId?: string;
  /**
   * 查询类型:1入库2出库
   */
  queryType?: string;
  /**
   * 出入库开始时间
   */
  startTime?: string;
  /**
   * 出入库结束时间
   */
  endTime?: string;
  /**
   * 操作人
   */
  createBy?: string;
  /**
   * 入库方式:1手动入库2退货入库初始化入库,出库方式:1手动出库2销售出库
   */
  way?: string;
  /**
   * skuid
   */
  storeProductWeightId?: string;
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
 * 接口 [单个商品出入库明细↗](https://yapi.huianrong.com/project/1764/interface/api/72408) 的 **返回类型**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/single-product-list`
 * @更新时间 `2023-03-02 14:36:23`
 */
export interface GroundPcApiStoreProductStockSingleProductListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 类型:1入库2出库
     */
    type?: number;
    /**
     * 订单code退货入库或者出库记录对应订单
     */
    orderCode?: string;
    /**
     * 编号
     */
    code?: string;
    /**
     * 操作人
     */
    createBy?: string;
    /**
     * 操作时间
     */
    createTime?: string;
    /**
     * 出入库规格
     */
    sku?: string;
    /**
     * 入库方式:1手动入库2退货入库3初始化入库,出库方式:1手动出库2销售出库
     */
    way?: number;
    /**
     * 入库状态:1待入库2入库完成3入库取消,出库状态:1待出库冻结2出库完成3出库取消4退货
     */
    status?: number;
    /**
     * 出入库数量
     */
    num?: number;
  }[];
}

/**
 * 接口 [单个商品出入库明细↗](https://yapi.huianrong.com/project/1764/interface/api/72408) 的 **请求配置的类型**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/single-product-list`
 * @更新时间 `2023-03-02 14:36:23`
 */
type GroundPcApiStoreProductStockSingleProductListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product-stock/single-product-list',
    'data',
    string,
    | 'storeProductId'
    | 'queryType'
    | 'startTime'
    | 'endTime'
    | 'createBy'
    | 'way'
    | 'storeProductWeightId'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [单个商品出入库明细↗](https://yapi.huianrong.com/project/1764/interface/api/72408) 的 **请求配置**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/single-product-list`
 * @更新时间 `2023-03-02 14:36:23`
 */
const groundPcApiStoreProductStockSingleProductListGetRequestConfig: GroundPcApiStoreProductStockSingleProductListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_21,
    devUrl: devUrl_0_2_0_21,
    prodUrl: prodUrl_0_2_0_21,
    path: '/ground-pc-api/store-product-stock/single-product-list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_21,
    paramNames: [],
    queryNames: [
      'storeProductId',
      'queryType',
      'startTime',
      'endTime',
      'createBy',
      'way',
      'storeProductWeightId',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductStockSingleProductListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [单个商品出入库明细↗](https://yapi.huianrong.com/project/1764/interface/api/72408) 的 **请求函数**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/single-product-list`
 * @更新时间 `2023-03-02 14:36:23`
 */
export const groundPcApiStoreProductStockSingleProductListGet = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductStockSingleProductListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductStockSingleProductListGetResponse>(
    prepare(
      groundPcApiStoreProductStockSingleProductListGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiStoreProductStockSingleProductListGet.requestConfig =
  groundPcApiStoreProductStockSingleProductListGetRequestConfig;

/**
 * 接口 [店铺所有商品库存信息↗](https://yapi.huianrong.com/project/1764/interface/api/72410) 的 **请求类型**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/all-info`
 * @更新时间 `2023-03-02 15:59:14`
 */
export interface GroundPcApiStoreProductStockAllInfoGetRequest {
  /**
   * 商品名称编码条码
   */
  key?: string;
  /**
   * 店铺ID
   */
  storeId?: string;
  /**
   * 商品分类
   */
  classifyId?: string;
  /**
   * 商品品牌
   */
  brandId?: string;
  /**
   * 优惠券ID
   */
  couponId?: string;
  /**
   * 店铺商品ids
   */
  storeProductIds?: string;
  /**
   * 平台商品ids
   */
  productIds?: string;
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
 * 接口 [店铺所有商品库存信息↗](https://yapi.huianrong.com/project/1764/interface/api/72410) 的 **返回类型**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/all-info`
 * @更新时间 `2023-03-02 15:59:14`
 */
export interface GroundPcApiStoreProductStockAllInfoGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 商品id
     */
    storeProductId?: number;
    /**
     * 商品名称
     */
    name?: string;
    /**
     * 分类
     */
    classifyName?: string;
    /**
     * 品牌
     */
    brandName?: string;
    /**
     * 单位
     */
    unitName?: string;
    /**
     * 店铺商品skuid
     */
    storeProductWeightId?: number;
    /**
     * 规格
     */
    sku?: string;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 店铺名称
     */
    storeName?: string;
    /**
     * 规格图片 ,GetResourceFilesResp
     */
    skuPic?: {
      /**
       * id
       */
      id?: string;
      /**
       * 名称
       */
      name?: string;
      /**
       * 类型
       */
      type?: string;
      /**
       * 格式
       */
      format?: string;
      /**
       * 文件大小（字节B）
       */
      size?: number;
      /**
       * 预览地址
       */
      previewAddress?: string;
    }[];
    /**
     * 规格编码
     */
    skuCode?: string;
    /**
     * 规格条码
     */
    barcode?: string;
    /**
     * 销售价格
     */
    scribingPrice?: number;
    /**
     * 门店零售价
     */
    salePrice?: number;
    /**
     * 可用数量
     */
    availableNum?: number;
    /**
     * 库存价值
     */
    amount?: number;
  }[];
}

/**
 * 接口 [店铺所有商品库存信息↗](https://yapi.huianrong.com/project/1764/interface/api/72410) 的 **请求配置的类型**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/all-info`
 * @更新时间 `2023-03-02 15:59:14`
 */
type GroundPcApiStoreProductStockAllInfoGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product-stock/all-info',
    'data',
    string,
    | 'key'
    | 'storeId'
    | 'classifyId'
    | 'brandId'
    | 'couponId'
    | 'storeProductIds'
    | 'productIds'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [店铺所有商品库存信息↗](https://yapi.huianrong.com/project/1764/interface/api/72410) 的 **请求配置**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/all-info`
 * @更新时间 `2023-03-02 15:59:14`
 */
const groundPcApiStoreProductStockAllInfoGetRequestConfig: GroundPcApiStoreProductStockAllInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_21,
    devUrl: devUrl_0_2_0_21,
    prodUrl: prodUrl_0_2_0_21,
    path: '/ground-pc-api/store-product-stock/all-info',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_21,
    paramNames: [],
    queryNames: [
      'key',
      'storeId',
      'classifyId',
      'brandId',
      'couponId',
      'storeProductIds',
      'productIds',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductStockAllInfoGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [店铺所有商品库存信息↗](https://yapi.huianrong.com/project/1764/interface/api/72410) 的 **请求函数**
 *
 * @分类 [库存管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23191)
 * @请求头 `GET /ground-pc-api/store-product-stock/all-info`
 * @更新时间 `2023-03-02 15:59:14`
 */
export const groundPcApiStoreProductStockAllInfoGet = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductStockAllInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductStockAllInfoGetResponse>(
    prepare(groundPcApiStoreProductStockAllInfoGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreProductStockAllInfoGet.requestConfig =
  groundPcApiStoreProductStockAllInfoGetRequestConfig;

const mockUrl_0_2_0_22 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_22 = '' as any;
const prodUrl_0_2_0_22 = '' as any;
const dataKey_0_2_0_22 = 'data' as any;

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1764/interface/api/72412) 的 **请求类型**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `GET /ground-pc-api/store-product-in-out-order/page`
 * @更新时间 `2023-03-02 16:32:45`
 */
export interface GroundPcApiStoreProductInOutOrderPageGetRequest {
  /**
   * 店铺id
   */
  storeIdList?: string;
  /**
   * 项目ID
   */
  projectIdList?: string;
  /**
   * 查询类型:1入库2出库
   */
  queryType?: string;
  /**
   * 出入库单号原单据编号
   */
  key?: string;
  /**
   * 出入库开始时间
   */
  startTime?: string;
  /**
   * 出入库结束时间
   */
  endTime?: string;
  /**
   * 操作人
   */
  createBy?: string;
  /**
   * 入库方式:1手动入库2退货入库初始化入库,出库方式:1手动出库2销售出库
   */
  way?: string;
  /**
   * 出入库状态:,入库(1待入库2入库完成3入库取消),出库(1待出库冻结2出库完成3出库取消4退货)
   */
  status?: string;
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
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1764/interface/api/72412) 的 **返回类型**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `GET /ground-pc-api/store-product-in-out-order/page`
 * @更新时间 `2023-03-02 16:32:45`
 */
export interface GroundPcApiStoreProductInOutOrderPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * id
     */
    id?: number;
    /**
     * 订单code退货入库或者出库记录对应订单
     */
    orderCode?: string;
    /**
     * 类型:1入库2出库
     */
    type?: number;
    /**
     * 单号
     */
    code?: string;
    /**
     * 操作人
     */
    createBy?: string;
    /**
     * 操作时间
     */
    createTime?: string;
    /**
     * 入库方式:1手动入库2退货入库3初始化入库,出库方式:1手动出库2销售出库
     */
    way?: number;
    /**
     * 入库状态:1待入库2入库完成3入库取消,出库状态:1待出库冻结2出库完成3出库取消4退货
     */
    status?: number;
    /**
     * 出入库数量
     */
    num?: number;
    /**
     * 价值
     */
    amount?: number;
  }[];
}

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1764/interface/api/72412) 的 **请求配置的类型**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `GET /ground-pc-api/store-product-in-out-order/page`
 * @更新时间 `2023-03-02 16:32:45`
 */
type GroundPcApiStoreProductInOutOrderPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product-in-out-order/page',
    'data',
    string,
    | 'storeIdList'
    | 'projectIdList'
    | 'queryType'
    | 'key'
    | 'startTime'
    | 'endTime'
    | 'createBy'
    | 'way'
    | 'status'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1764/interface/api/72412) 的 **请求配置**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `GET /ground-pc-api/store-product-in-out-order/page`
 * @更新时间 `2023-03-02 16:32:45`
 */
const groundPcApiStoreProductInOutOrderPageGetRequestConfig: GroundPcApiStoreProductInOutOrderPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_22,
    devUrl: devUrl_0_2_0_22,
    prodUrl: prodUrl_0_2_0_22,
    path: '/ground-pc-api/store-product-in-out-order/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_22,
    paramNames: [],
    queryNames: [
      'storeIdList',
      'projectIdList',
      'queryType',
      'key',
      'startTime',
      'endTime',
      'createBy',
      'way',
      'status',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductInOutOrderPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1764/interface/api/72412) 的 **请求函数**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `GET /ground-pc-api/store-product-in-out-order/page`
 * @更新时间 `2023-03-02 16:32:45`
 */
export const groundPcApiStoreProductInOutOrderPageGet = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductInOutOrderPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductInOutOrderPageGetResponse>(
    prepare(groundPcApiStoreProductInOutOrderPageGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreProductInOutOrderPageGet.requestConfig =
  groundPcApiStoreProductInOutOrderPageGetRequestConfig;

/**
 * 接口 [入库↗](https://yapi.huianrong.com/project/1764/interface/api/72414) 的 **请求类型**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `POST /ground-pc-api/store-product-in-out-order/in`
 * @更新时间 `2023-03-02 19:06:46`
 */
export type GroundPcApiStoreProductInOutOrderInPostRequest = {
  /**
   * 商铺id
   */
  storeId: number;
  /**
   * 店铺商品id
   */
  storeProductId: number;
  /**
   * 店铺商品skuid
   */
  storeProductWeightId: number;
  /**
   * 入库数量
   */
  inOutNum: number;
}[];

/**
 * 接口 [入库↗](https://yapi.huianrong.com/project/1764/interface/api/72414) 的 **返回类型**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `POST /ground-pc-api/store-product-in-out-order/in`
 * @更新时间 `2023-03-02 19:06:46`
 */
export interface GroundPcApiStoreProductInOutOrderInPostResponse {
  code?: number;
  msg?: string;
}

/**
 * 接口 [入库↗](https://yapi.huianrong.com/project/1764/interface/api/72414) 的 **请求配置的类型**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `POST /ground-pc-api/store-product-in-out-order/in`
 * @更新时间 `2023-03-02 19:06:46`
 */
type GroundPcApiStoreProductInOutOrderInPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product-in-out-order/in',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [入库↗](https://yapi.huianrong.com/project/1764/interface/api/72414) 的 **请求配置**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `POST /ground-pc-api/store-product-in-out-order/in`
 * @更新时间 `2023-03-02 19:06:46`
 */
const groundPcApiStoreProductInOutOrderInPostRequestConfig: GroundPcApiStoreProductInOutOrderInPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_22,
    devUrl: devUrl_0_2_0_22,
    prodUrl: prodUrl_0_2_0_22,
    path: '/ground-pc-api/store-product-in-out-order/in',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_22,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductInOutOrderInPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [入库↗](https://yapi.huianrong.com/project/1764/interface/api/72414) 的 **请求函数**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `POST /ground-pc-api/store-product-in-out-order/in`
 * @更新时间 `2023-03-02 19:06:46`
 */
export const groundPcApiStoreProductInOutOrderInPost = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductInOutOrderInPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductInOutOrderInPostResponse>(
    prepare(groundPcApiStoreProductInOutOrderInPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreProductInOutOrderInPost.requestConfig =
  groundPcApiStoreProductInOutOrderInPostRequestConfig;

/**
 * 接口 [出入库单详情↗](https://yapi.huianrong.com/project/1764/interface/api/72416) 的 **请求类型**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `GET /ground-pc-api/store-product-in-out-order/info/{id}`
 * @更新时间 `2023-03-02 19:54:59`
 */
export interface GroundPcApiStoreProductInOutOrderInfoIdGetRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [出入库单详情↗](https://yapi.huianrong.com/project/1764/interface/api/72416) 的 **返回类型**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `GET /ground-pc-api/store-product-in-out-order/info/{id}`
 * @更新时间 `2023-03-02 19:54:59`
 */
export interface GroundPcApiStoreProductInOutOrderInfoIdGetResponse {
  /**
   * 基础信息 ,BaseInfo
   */
  baseInfo?: {
    /**
     * 订单code退货入库或者出库记录对应订单
     */
    orderCode?: string;
    /**
     * 单号
     */
    code?: string;
    /**
     * 操作人
     */
    createBy?: string;
    /**
     * 操作时间
     */
    createTime?: string;
    /**
     * 入库方式:1手动入库2退货入库3初始化入库,出库方式:1手动出库2销售出库
     */
    way?: number;
    /**
     * 入库状态:1待入库2入库完成3入库取消,出库状态:1待出库冻结2出库完成3出库取消4退货
     */
    status?: number;
    /**
     * 出入库数量
     */
    num?: number;
    /**
     * 价值
     */
    amount?: number;
  };
  /**
   * 出入库详细数据 ,InOutInfo
   */
  inOutInfoList?: {
    /**
     * 商品名称
     */
    productName?: string;
    /**
     * 分类
     */
    classifyName?: string;
    /**
     * 品牌
     */
    brandName?: string;
    /**
     * 单位
     */
    unitName?: string;
    /**
     * 规格sku信息
     */
    sku?: string;
    /**
     * 出入库数量
     */
    num?: number;
  }[];
}

/**
 * 接口 [出入库单详情↗](https://yapi.huianrong.com/project/1764/interface/api/72416) 的 **请求配置的类型**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `GET /ground-pc-api/store-product-in-out-order/info/{id}`
 * @更新时间 `2023-03-02 19:54:59`
 */
type GroundPcApiStoreProductInOutOrderInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product-in-out-order/info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [出入库单详情↗](https://yapi.huianrong.com/project/1764/interface/api/72416) 的 **请求配置**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `GET /ground-pc-api/store-product-in-out-order/info/{id}`
 * @更新时间 `2023-03-02 19:54:59`
 */
const groundPcApiStoreProductInOutOrderInfoIdGetRequestConfig: GroundPcApiStoreProductInOutOrderInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_22,
    devUrl: devUrl_0_2_0_22,
    prodUrl: prodUrl_0_2_0_22,
    path: '/ground-pc-api/store-product-in-out-order/info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_22,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductInOutOrderInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [出入库单详情↗](https://yapi.huianrong.com/project/1764/interface/api/72416) 的 **请求函数**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `GET /ground-pc-api/store-product-in-out-order/info/{id}`
 * @更新时间 `2023-03-02 19:54:59`
 */
export const groundPcApiStoreProductInOutOrderInfoIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductInOutOrderInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductInOutOrderInfoIdGetResponse>(
    prepare(
      groundPcApiStoreProductInOutOrderInfoIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiStoreProductInOutOrderInfoIdGet.requestConfig =
  groundPcApiStoreProductInOutOrderInfoIdGetRequestConfig;

/**
 * 接口 [出库↗](https://yapi.huianrong.com/project/1764/interface/api/72418) 的 **请求类型**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `POST /ground-pc-api/store-product-in-out-order/out`
 * @更新时间 `2023-03-02 20:42:27`
 */
export type GroundPcApiStoreProductInOutOrderOutPostRequest = {
  /**
   * 商铺id
   */
  storeId: number;
  /**
   * 店铺商品id
   */
  storeProductId: number;
  /**
   * 店铺商品skuid
   */
  storeProductWeightId: number;
  /**
   * 出库数量
   */
  inOutNum: number;
  /**
   * 出库时候的库存
   */
  availableNum: number;
}[];

/**
 * 接口 [出库↗](https://yapi.huianrong.com/project/1764/interface/api/72418) 的 **返回类型**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `POST /ground-pc-api/store-product-in-out-order/out`
 * @更新时间 `2023-03-02 20:42:27`
 */
export interface GroundPcApiStoreProductInOutOrderOutPostResponse {
  code?: number;
  msg?: string;
}

/**
 * 接口 [出库↗](https://yapi.huianrong.com/project/1764/interface/api/72418) 的 **请求配置的类型**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `POST /ground-pc-api/store-product-in-out-order/out`
 * @更新时间 `2023-03-02 20:42:27`
 */
type GroundPcApiStoreProductInOutOrderOutPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store-product-in-out-order/out',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [出库↗](https://yapi.huianrong.com/project/1764/interface/api/72418) 的 **请求配置**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `POST /ground-pc-api/store-product-in-out-order/out`
 * @更新时间 `2023-03-02 20:42:27`
 */
const groundPcApiStoreProductInOutOrderOutPostRequestConfig: GroundPcApiStoreProductInOutOrderOutPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_22,
    devUrl: devUrl_0_2_0_22,
    prodUrl: prodUrl_0_2_0_22,
    path: '/ground-pc-api/store-product-in-out-order/out',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_22,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreProductInOutOrderOutPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [出库↗](https://yapi.huianrong.com/project/1764/interface/api/72418) 的 **请求函数**
 *
 * @分类 [出入库管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23193)
 * @请求头 `POST /ground-pc-api/store-product-in-out-order/out`
 * @更新时间 `2023-03-02 20:42:27`
 */
export const groundPcApiStoreProductInOutOrderOutPost = /*#__PURE__*/ (
  requestData: GroundPcApiStoreProductInOutOrderOutPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreProductInOutOrderOutPostResponse>(
    prepare(groundPcApiStoreProductInOutOrderOutPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreProductInOutOrderOutPost.requestConfig =
  groundPcApiStoreProductInOutOrderOutPostRequestConfig;

const mockUrl_0_2_0_23 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_23 = '' as any;
const prodUrl_0_2_0_23 = '' as any;
const dataKey_0_2_0_23 = 'data' as any;

/**
 * 接口 [店铺列表↗](https://yapi.huianrong.com/project/1764/interface/api/72452) 的 **请求类型**
 *
 * @分类 [店铺管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23199)
 * @请求头 `GET /ground-pc-api/store/list`
 * @更新时间 `2023-03-01 14:57:10`
 */
export interface GroundPcApiStoreListGetRequest {
  /**
   * 店铺类型1自营2联营，默认1自营
   */
  type?: string;
  /**
   * 搜索店铺名称联系人联系电话
   */
  searchKey?: string;
  /**
   * 店铺状态0草稿;1认证中;2已认证;3拒绝认证;
   */
  storeStatus?: string;
  /**
   * 经营状态1营业中;2打烊
   */
  operatingStatus?: string;
  /**
   * 业态ID
   */
  sceneId?: string;
  /**
   * 省
   */
  provinceCode?: string;
  /**
   * 区
   */
  cityCode?: string;
  /**
   * 县
   */
  districtCode?: string;
  /**
   * id集合
   */
  ids?: string;
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
 * 接口 [店铺列表↗](https://yapi.huianrong.com/project/1764/interface/api/72452) 的 **返回类型**
 *
 * @分类 [店铺管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23199)
 * @请求头 `GET /ground-pc-api/store/list`
 * @更新时间 `2023-03-01 14:57:10`
 */
export interface GroundPcApiStoreListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * ID
     */
    id?: number;
    /**
     * 店铺名称
     */
    name?: string;
    /**
     * 联系人
     */
    linkman?: string;
    /**
     * 联系电话
     */
    linkTel?: string;
    /**
     * 业态名称
     */
    sceneNames?: string;
    /**
     * 面积
     */
    acreage?: number;
    /**
     * 营业时间描述,后台自动拼接
     */
    openTimeDesc?: string;
    /**
     * 特色服务
     */
    feature?: string;
    /**
     * 详细地址，后台自动拼接
     */
    addressDetail?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 店铺状态0草稿;1认证中;2已认证;3拒绝认证;
     */
    storeStatus?: number;
    /**
     * 经营状态1营业中;2打烊;
     */
    operatingStatus?: number;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 超管账号手机号
     */
    managerPhone?: string;
  }[];
}

/**
 * 接口 [店铺列表↗](https://yapi.huianrong.com/project/1764/interface/api/72452) 的 **请求配置的类型**
 *
 * @分类 [店铺管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23199)
 * @请求头 `GET /ground-pc-api/store/list`
 * @更新时间 `2023-03-01 14:57:10`
 */
type GroundPcApiStoreListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store/list',
    'data',
    string,
    | 'type'
    | 'searchKey'
    | 'storeStatus'
    | 'operatingStatus'
    | 'sceneId'
    | 'provinceCode'
    | 'cityCode'
    | 'districtCode'
    | 'ids'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [店铺列表↗](https://yapi.huianrong.com/project/1764/interface/api/72452) 的 **请求配置**
 *
 * @分类 [店铺管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23199)
 * @请求头 `GET /ground-pc-api/store/list`
 * @更新时间 `2023-03-01 14:57:10`
 */
const groundPcApiStoreListGetRequestConfig: GroundPcApiStoreListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_23,
    devUrl: devUrl_0_2_0_23,
    prodUrl: prodUrl_0_2_0_23,
    path: '/ground-pc-api/store/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_23,
    paramNames: [],
    queryNames: [
      'type',
      'searchKey',
      'storeStatus',
      'operatingStatus',
      'sceneId',
      'provinceCode',
      'cityCode',
      'districtCode',
      'ids',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [店铺列表↗](https://yapi.huianrong.com/project/1764/interface/api/72452) 的 **请求函数**
 *
 * @分类 [店铺管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23199)
 * @请求头 `GET /ground-pc-api/store/list`
 * @更新时间 `2023-03-01 14:57:10`
 */
export const groundPcApiStoreListGet = /*#__PURE__*/ (
  requestData: GroundPcApiStoreListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreListGetResponse>(
    prepare(groundPcApiStoreListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreListGet.requestConfig = groundPcApiStoreListGetRequestConfig;

const mockUrl_0_2_0_24 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_24 = '' as any;
const prodUrl_0_2_0_24 = '' as any;
const dataKey_0_2_0_24 = 'data' as any;

/**
 * 接口 [更新店铺运营信息↗](https://yapi.huianrong.com/project/1764/interface/api/72430) 的 **请求类型**
 *
 * @分类 [店铺运营↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23201)
 * @请求头 `PUT /ground-pc-api/store/operation/update/{id}`
 * @更新时间 `2023-03-02 15:36:23`
 */
export interface GroundPcApiStoreOperationUpdateIdPutRequest {
  /**
   * 客服电话
   */
  customerServiceTel?: string;
  /**
   * 特色服务,数据源来源于commonstorefeatureSelect接口 ,Byte
   */
  features?: number[];
  /**
   * 地址
   */
  address: string;
  /**
   * 营业时间配置 ,ReqFrontStoreOpenTimeConfigDto
   */
  openTimes: {
    /**
     * 星期周一到周日1~7
     */
    week: number;
    /**
     * 开始时间HH:mm
     */
    startTime: string;
    /**
     * 结束时间HH:mm
     */
    endTime: string;
  }[];
  /**
   * 店铺log
   */
  storeLogoAttachment: string;
  /**
   * 店铺图片 ,String
   */
  storePhotos: string[];
  /**
   * 经营状态0试营业;1营业中;2打烊;
   */
  operatingStatus: number;
  /**
   * 店铺ID(Long)
   */
  id: string;
}

/**
 * 接口 [更新店铺运营信息↗](https://yapi.huianrong.com/project/1764/interface/api/72430) 的 **返回类型**
 *
 * @分类 [店铺运营↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23201)
 * @请求头 `PUT /ground-pc-api/store/operation/update/{id}`
 * @更新时间 `2023-03-02 15:36:23`
 */
export interface GroundPcApiStoreOperationUpdateIdPutResponse {}

/**
 * 接口 [更新店铺运营信息↗](https://yapi.huianrong.com/project/1764/interface/api/72430) 的 **请求配置的类型**
 *
 * @分类 [店铺运营↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23201)
 * @请求头 `PUT /ground-pc-api/store/operation/update/{id}`
 * @更新时间 `2023-03-02 15:36:23`
 */
type GroundPcApiStoreOperationUpdateIdPutRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store/operation/update/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [更新店铺运营信息↗](https://yapi.huianrong.com/project/1764/interface/api/72430) 的 **请求配置**
 *
 * @分类 [店铺运营↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23201)
 * @请求头 `PUT /ground-pc-api/store/operation/update/{id}`
 * @更新时间 `2023-03-02 15:36:23`
 */
const groundPcApiStoreOperationUpdateIdPutRequestConfig: GroundPcApiStoreOperationUpdateIdPutRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_24,
    devUrl: devUrl_0_2_0_24,
    prodUrl: prodUrl_0_2_0_24,
    path: '/ground-pc-api/store/operation/update/{id}',
    method: Method.PUT,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_24,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreOperationUpdateIdPut',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [更新店铺运营信息↗](https://yapi.huianrong.com/project/1764/interface/api/72430) 的 **请求函数**
 *
 * @分类 [店铺运营↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23201)
 * @请求头 `PUT /ground-pc-api/store/operation/update/{id}`
 * @更新时间 `2023-03-02 15:36:23`
 */
export const groundPcApiStoreOperationUpdateIdPut = /*#__PURE__*/ (
  requestData: GroundPcApiStoreOperationUpdateIdPutRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreOperationUpdateIdPutResponse>(
    prepare(groundPcApiStoreOperationUpdateIdPutRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreOperationUpdateIdPut.requestConfig =
  groundPcApiStoreOperationUpdateIdPutRequestConfig;

/**
 * 接口 [获取店铺运营信息↗](https://yapi.huianrong.com/project/1764/interface/api/72432) 的 **请求类型**
 *
 * @分类 [店铺运营↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23201)
 * @请求头 `GET /ground-pc-api/store/operation/info/{id}`
 * @更新时间 `2023-03-02 15:36:24`
 */
export interface GroundPcApiStoreOperationInfoIdGetRequest {
  /**
   * 店铺ID(Long)
   */
  id: string;
}

/**
 * 接口 [获取店铺运营信息↗](https://yapi.huianrong.com/project/1764/interface/api/72432) 的 **返回类型**
 *
 * @分类 [店铺运营↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23201)
 * @请求头 `GET /ground-pc-api/store/operation/info/{id}`
 * @更新时间 `2023-03-02 15:36:24`
 */
export interface GroundPcApiStoreOperationInfoIdGetResponse {
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 项目名称
   */
  projectName: string;
  /**
   * 店铺id
   */
  id: number;
  /**
   * 店铺名称
   */
  name: string;
  /**
   * 客服电话
   */
  customerServiceTel?: string;
  /**
   * 特色服务，与featureSelects下标对应 ,Byte
   */
  features?: number[];
  /**
   * 地址
   */
  address: string;
  /**
   * 营业时间 ,StoreOpenConfigInfo
   */
  openTimes: {
    /**
     * 星期
     */
    week: number;
    /**
     * 开始时间HH:mm
     */
    startTime: string;
    /**
     * 结束时间HH:mm
     */
    endTime: string;
  }[];
  /**
   * 门店logo ,GetResourceFilesResp
   */
  storeLogoAttachment: {
    /**
     * id
     */
    id?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 类型
     */
    type?: string;
    /**
     * 格式
     */
    format?: string;
    /**
     * 文件大小（字节B）
     */
    size?: number;
    /**
     * 预览地址
     */
    previewAddress?: string;
  };
  /**
   * 店铺图片 ,GetResourceFilesResp
   */
  storePhotoAttachments: {
    /**
     * id
     */
    id?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 类型
     */
    type?: string;
    /**
     * 格式
     */
    format?: string;
    /**
     * 文件大小（字节B）
     */
    size?: number;
    /**
     * 预览地址
     */
    previewAddress?: string;
  }[];
  /**
   * 经营状态0试营业;1营业中;2打烊;
   */
  operatingStatus?: number;
}

/**
 * 接口 [获取店铺运营信息↗](https://yapi.huianrong.com/project/1764/interface/api/72432) 的 **请求配置的类型**
 *
 * @分类 [店铺运营↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23201)
 * @请求头 `GET /ground-pc-api/store/operation/info/{id}`
 * @更新时间 `2023-03-02 15:36:24`
 */
type GroundPcApiStoreOperationInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store/operation/info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [获取店铺运营信息↗](https://yapi.huianrong.com/project/1764/interface/api/72432) 的 **请求配置**
 *
 * @分类 [店铺运营↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23201)
 * @请求头 `GET /ground-pc-api/store/operation/info/{id}`
 * @更新时间 `2023-03-02 15:36:24`
 */
const groundPcApiStoreOperationInfoIdGetRequestConfig: GroundPcApiStoreOperationInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_24,
    devUrl: devUrl_0_2_0_24,
    prodUrl: prodUrl_0_2_0_24,
    path: '/ground-pc-api/store/operation/info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_24,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreOperationInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取店铺运营信息↗](https://yapi.huianrong.com/project/1764/interface/api/72432) 的 **请求函数**
 *
 * @分类 [店铺运营↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23201)
 * @请求头 `GET /ground-pc-api/store/operation/info/{id}`
 * @更新时间 `2023-03-02 15:36:24`
 */
export const groundPcApiStoreOperationInfoIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiStoreOperationInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreOperationInfoIdGetResponse>(
    prepare(groundPcApiStoreOperationInfoIdGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreOperationInfoIdGet.requestConfig =
  groundPcApiStoreOperationInfoIdGetRequestConfig;

const mockUrl_0_2_0_25 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_25 = '' as any;
const prodUrl_0_2_0_25 = '' as any;
const dataKey_0_2_0_25 = 'data' as any;

/**
 * 接口 [单位详情↗](https://yapi.huianrong.com/project/1764/interface/api/72442) 的 **请求类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `GET /ground-pc-api/product-attribute/units-info/{id}`
 * @更新时间 `2023-03-01 14:52:35`
 */
export interface GroundPcApiProductAttributeUnitsInfoIdGetRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [单位详情↗](https://yapi.huianrong.com/project/1764/interface/api/72442) 的 **返回类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `GET /ground-pc-api/product-attribute/units-info/{id}`
 * @更新时间 `2023-03-01 14:52:35`
 */
export interface GroundPcApiProductAttributeUnitsInfoIdGetResponse {
  /**
   * id
   */
  id?: number;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 名称
   */
  name?: string;
}

/**
 * 接口 [单位详情↗](https://yapi.huianrong.com/project/1764/interface/api/72442) 的 **请求配置的类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `GET /ground-pc-api/product-attribute/units-info/{id}`
 * @更新时间 `2023-03-01 14:52:35`
 */
type GroundPcApiProductAttributeUnitsInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/units-info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [单位详情↗](https://yapi.huianrong.com/project/1764/interface/api/72442) 的 **请求配置**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `GET /ground-pc-api/product-attribute/units-info/{id}`
 * @更新时间 `2023-03-01 14:52:35`
 */
const groundPcApiProductAttributeUnitsInfoIdGetRequestConfig: GroundPcApiProductAttributeUnitsInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_25,
    devUrl: devUrl_0_2_0_25,
    prodUrl: prodUrl_0_2_0_25,
    path: '/ground-pc-api/product-attribute/units-info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_25,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeUnitsInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [单位详情↗](https://yapi.huianrong.com/project/1764/interface/api/72442) 的 **请求函数**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `GET /ground-pc-api/product-attribute/units-info/{id}`
 * @更新时间 `2023-03-01 14:52:35`
 */
export const groundPcApiProductAttributeUnitsInfoIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiProductAttributeUnitsInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeUnitsInfoIdGetResponse>(
    prepare(
      groundPcApiProductAttributeUnitsInfoIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiProductAttributeUnitsInfoIdGet.requestConfig =
  groundPcApiProductAttributeUnitsInfoIdGetRequestConfig;

/**
 * 接口 [删除单位↗](https://yapi.huianrong.com/project/1764/interface/api/72444) 的 **请求类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-delete`
 * @更新时间 `2023-03-01 14:52:52`
 */
export interface GroundPcApiProductAttributeUnitsDeletePostRequest {
  /**
   * id
   */
  id: number;
}

/**
 * 接口 [删除单位↗](https://yapi.huianrong.com/project/1764/interface/api/72444) 的 **返回类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-delete`
 * @更新时间 `2023-03-01 14:52:52`
 */
export type GroundPcApiProductAttributeUnitsDeletePostResponse = number;

/**
 * 接口 [删除单位↗](https://yapi.huianrong.com/project/1764/interface/api/72444) 的 **请求配置的类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-delete`
 * @更新时间 `2023-03-01 14:52:52`
 */
type GroundPcApiProductAttributeUnitsDeletePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/units-delete',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [删除单位↗](https://yapi.huianrong.com/project/1764/interface/api/72444) 的 **请求配置**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-delete`
 * @更新时间 `2023-03-01 14:52:52`
 */
const groundPcApiProductAttributeUnitsDeletePostRequestConfig: GroundPcApiProductAttributeUnitsDeletePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_25,
    devUrl: devUrl_0_2_0_25,
    prodUrl: prodUrl_0_2_0_25,
    path: '/ground-pc-api/product-attribute/units-delete',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_25,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeUnitsDeletePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [删除单位↗](https://yapi.huianrong.com/project/1764/interface/api/72444) 的 **请求函数**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-delete`
 * @更新时间 `2023-03-01 14:52:52`
 */
export const groundPcApiProductAttributeUnitsDeletePost = /*#__PURE__*/ (
  requestData: GroundPcApiProductAttributeUnitsDeletePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeUnitsDeletePostResponse>(
    prepare(
      groundPcApiProductAttributeUnitsDeletePostRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiProductAttributeUnitsDeletePost.requestConfig =
  groundPcApiProductAttributeUnitsDeletePostRequestConfig;

/**
 * 接口 [编辑单位↗](https://yapi.huianrong.com/project/1764/interface/api/72446) 的 **请求类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-update`
 * @更新时间 `2023-03-01 14:52:57`
 */
export interface GroundPcApiProductAttributeUnitsUpdatePostRequest {
  /**
   * id
   */
  id: number;
  /**
   * 排序
   */
  sort?: number;
  /**
   * 名称
   */
  name: string;
}

/**
 * 接口 [编辑单位↗](https://yapi.huianrong.com/project/1764/interface/api/72446) 的 **返回类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-update`
 * @更新时间 `2023-03-01 14:52:57`
 */
export type GroundPcApiProductAttributeUnitsUpdatePostResponse = number;

/**
 * 接口 [编辑单位↗](https://yapi.huianrong.com/project/1764/interface/api/72446) 的 **请求配置的类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-update`
 * @更新时间 `2023-03-01 14:52:57`
 */
type GroundPcApiProductAttributeUnitsUpdatePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/units-update',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [编辑单位↗](https://yapi.huianrong.com/project/1764/interface/api/72446) 的 **请求配置**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-update`
 * @更新时间 `2023-03-01 14:52:57`
 */
const groundPcApiProductAttributeUnitsUpdatePostRequestConfig: GroundPcApiProductAttributeUnitsUpdatePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_25,
    devUrl: devUrl_0_2_0_25,
    prodUrl: prodUrl_0_2_0_25,
    path: '/ground-pc-api/product-attribute/units-update',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_25,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeUnitsUpdatePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [编辑单位↗](https://yapi.huianrong.com/project/1764/interface/api/72446) 的 **请求函数**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-update`
 * @更新时间 `2023-03-01 14:52:57`
 */
export const groundPcApiProductAttributeUnitsUpdatePost = /*#__PURE__*/ (
  requestData: GroundPcApiProductAttributeUnitsUpdatePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeUnitsUpdatePostResponse>(
    prepare(
      groundPcApiProductAttributeUnitsUpdatePostRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiProductAttributeUnitsUpdatePost.requestConfig =
  groundPcApiProductAttributeUnitsUpdatePostRequestConfig;

/**
 * 接口 [新增单位↗](https://yapi.huianrong.com/project/1764/interface/api/72448) 的 **请求类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-add`
 * @更新时间 `2023-03-01 14:53:02`
 */
export interface GroundPcApiProductAttributeUnitsAddPostRequest {
  /**
   * 排序
   */
  sort?: number;
  /**
   * 名称
   */
  name: string;
}

/**
 * 接口 [新增单位↗](https://yapi.huianrong.com/project/1764/interface/api/72448) 的 **返回类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-add`
 * @更新时间 `2023-03-01 14:53:02`
 */
export type GroundPcApiProductAttributeUnitsAddPostResponse = number;

/**
 * 接口 [新增单位↗](https://yapi.huianrong.com/project/1764/interface/api/72448) 的 **请求配置的类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-add`
 * @更新时间 `2023-03-01 14:53:02`
 */
type GroundPcApiProductAttributeUnitsAddPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/units-add',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增单位↗](https://yapi.huianrong.com/project/1764/interface/api/72448) 的 **请求配置**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-add`
 * @更新时间 `2023-03-01 14:53:02`
 */
const groundPcApiProductAttributeUnitsAddPostRequestConfig: GroundPcApiProductAttributeUnitsAddPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_25,
    devUrl: devUrl_0_2_0_25,
    prodUrl: prodUrl_0_2_0_25,
    path: '/ground-pc-api/product-attribute/units-add',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_25,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeUnitsAddPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [新增单位↗](https://yapi.huianrong.com/project/1764/interface/api/72448) 的 **请求函数**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `POST /ground-pc-api/product-attribute/units-add`
 * @更新时间 `2023-03-01 14:53:02`
 */
export const groundPcApiProductAttributeUnitsAddPost = /*#__PURE__*/ (
  requestData: GroundPcApiProductAttributeUnitsAddPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeUnitsAddPostResponse>(
    prepare(groundPcApiProductAttributeUnitsAddPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiProductAttributeUnitsAddPost.requestConfig =
  groundPcApiProductAttributeUnitsAddPostRequestConfig;

/**
 * 接口 [单位列表↗](https://yapi.huianrong.com/project/1764/interface/api/72450) 的 **请求类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `GET /ground-pc-api/product-attribute/units-list`
 * @更新时间 `2023-03-01 14:53:06`
 */
export interface GroundPcApiProductAttributeUnitsListGetRequest {}

/**
 * 接口 [单位列表↗](https://yapi.huianrong.com/project/1764/interface/api/72450) 的 **返回类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `GET /ground-pc-api/product-attribute/units-list`
 * @更新时间 `2023-03-01 14:53:06`
 */
export type GroundPcApiProductAttributeUnitsListGetResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 名称
   */
  name?: string;
}[];

/**
 * 接口 [单位列表↗](https://yapi.huianrong.com/project/1764/interface/api/72450) 的 **请求配置的类型**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `GET /ground-pc-api/product-attribute/units-list`
 * @更新时间 `2023-03-01 14:53:06`
 */
type GroundPcApiProductAttributeUnitsListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/product-attribute/units-list',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [单位列表↗](https://yapi.huianrong.com/project/1764/interface/api/72450) 的 **请求配置**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `GET /ground-pc-api/product-attribute/units-list`
 * @更新时间 `2023-03-01 14:53:06`
 */
const groundPcApiProductAttributeUnitsListGetRequestConfig: GroundPcApiProductAttributeUnitsListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_25,
    devUrl: devUrl_0_2_0_25,
    prodUrl: prodUrl_0_2_0_25,
    path: '/ground-pc-api/product-attribute/units-list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_25,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiProductAttributeUnitsListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [单位列表↗](https://yapi.huianrong.com/project/1764/interface/api/72450) 的 **请求函数**
 *
 * @分类 [商品单位↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23207)
 * @请求头 `GET /ground-pc-api/product-attribute/units-list`
 * @更新时间 `2023-03-01 14:53:06`
 */
export const groundPcApiProductAttributeUnitsListGet = /*#__PURE__*/ (
  requestData?: GroundPcApiProductAttributeUnitsListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiProductAttributeUnitsListGetResponse>(
    prepare(groundPcApiProductAttributeUnitsListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiProductAttributeUnitsListGet.requestConfig =
  groundPcApiProductAttributeUnitsListGetRequestConfig;

const mockUrl_0_2_0_26 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_26 = '' as any;
const prodUrl_0_2_0_26 = '' as any;
const dataKey_0_2_0_26 = 'data' as any;

/**
 * 接口 [商品库分类下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72454) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/classify`
 * @更新时间 `2023-03-03 10:39:50`
 */
export interface GroundPcApiCommonProductAttributeClassifyGetRequest {}

/**
 * 接口 [商品库分类下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72454) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/classify`
 * @更新时间 `2023-03-03 10:39:50`
 */
export type GroundPcApiCommonProductAttributeClassifyGetResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 父id
   */
  pid?: number;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 分类名称
   */
  name?: string;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 是否允许添加子分类（true允许）
   */
  allow?: boolean;
  /**
   * 子集数据 ,ProductClassifyListDto
   */
  children?: {
    [k: string]: unknown;
  }[];
}[];

/**
 * 接口 [商品库分类下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72454) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/classify`
 * @更新时间 `2023-03-03 10:39:50`
 */
type GroundPcApiCommonProductAttributeClassifyGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/product/attribute/classify',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [商品库分类下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72454) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/classify`
 * @更新时间 `2023-03-03 10:39:50`
 */
const groundPcApiCommonProductAttributeClassifyGetRequestConfig: GroundPcApiCommonProductAttributeClassifyGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/product/attribute/classify',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonProductAttributeClassifyGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [商品库分类下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72454) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/classify`
 * @更新时间 `2023-03-03 10:39:50`
 */
export const groundPcApiCommonProductAttributeClassifyGet = /*#__PURE__*/ (
  requestData?: GroundPcApiCommonProductAttributeClassifyGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCommonProductAttributeClassifyGetResponse>(
    prepare(
      groundPcApiCommonProductAttributeClassifyGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiCommonProductAttributeClassifyGet.requestConfig =
  groundPcApiCommonProductAttributeClassifyGetRequestConfig;

/**
 * 接口 [商品库规格下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72456) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/specifications`
 * @更新时间 `2023-03-03 10:39:51`
 */
export interface GroundPcApiCommonProductAttributeSpecificationsGetRequest {}

/**
 * 接口 [商品库规格下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72456) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/specifications`
 * @更新时间 `2023-03-03 10:39:51`
 */
export type GroundPcApiCommonProductAttributeSpecificationsGetResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 父id
   */
  pid?: number;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 分类名称
   */
  name?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 是否允许添加子分类（true允许）
   */
  allow?: boolean;
  /**
   * 子集数据 ,ProductSpecificationsListDto
   */
  children?: {
    [k: string]: unknown;
  }[];
}[];

/**
 * 接口 [商品库规格下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72456) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/specifications`
 * @更新时间 `2023-03-03 10:39:51`
 */
type GroundPcApiCommonProductAttributeSpecificationsGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/product/attribute/specifications',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [商品库规格下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72456) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/specifications`
 * @更新时间 `2023-03-03 10:39:51`
 */
const groundPcApiCommonProductAttributeSpecificationsGetRequestConfig: GroundPcApiCommonProductAttributeSpecificationsGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/product/attribute/specifications',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonProductAttributeSpecificationsGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [商品库规格下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72456) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/specifications`
 * @更新时间 `2023-03-03 10:39:51`
 */
export const groundPcApiCommonProductAttributeSpecificationsGet =
  /*#__PURE__*/ (
    requestData?: GroundPcApiCommonProductAttributeSpecificationsGetRequest,
    ...args: UserRequestRestArgs
  ) => {
    return request<GroundPcApiCommonProductAttributeSpecificationsGetResponse>(
      prepare(
        groundPcApiCommonProductAttributeSpecificationsGetRequestConfig,
        requestData
      ),
      ...args
    );
  };

groundPcApiCommonProductAttributeSpecificationsGet.requestConfig =
  groundPcApiCommonProductAttributeSpecificationsGetRequestConfig;

/**
 * 接口 [商品库品牌下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72458) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/brand`
 * @更新时间 `2023-03-03 10:39:52`
 */
export interface GroundPcApiCommonProductAttributeBrandGetRequest {}

/**
 * 接口 [商品库品牌下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72458) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/brand`
 * @更新时间 `2023-03-03 10:39:52`
 */
export type GroundPcApiCommonProductAttributeBrandGetResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 分类名称
   */
  name?: string;
  /**
   * 品牌logo ,GetResourceFilesResp
   */
  file?: {
    /**
     * id
     */
    id?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 类型
     */
    type?: string;
    /**
     * 格式
     */
    format?: string;
    /**
     * 文件大小（字节B）
     */
    size?: number;
    /**
     * 预览地址
     */
    previewAddress?: string;
  };
  /**
   * 备注
   */
  remark?: string;
}[];

/**
 * 接口 [商品库品牌下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72458) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/brand`
 * @更新时间 `2023-03-03 10:39:52`
 */
type GroundPcApiCommonProductAttributeBrandGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/product/attribute/brand',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [商品库品牌下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72458) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/brand`
 * @更新时间 `2023-03-03 10:39:52`
 */
const groundPcApiCommonProductAttributeBrandGetRequestConfig: GroundPcApiCommonProductAttributeBrandGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/product/attribute/brand',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonProductAttributeBrandGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [商品库品牌下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72458) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/brand`
 * @更新时间 `2023-03-03 10:39:52`
 */
export const groundPcApiCommonProductAttributeBrandGet = /*#__PURE__*/ (
  requestData?: GroundPcApiCommonProductAttributeBrandGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCommonProductAttributeBrandGetResponse>(
    prepare(
      groundPcApiCommonProductAttributeBrandGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiCommonProductAttributeBrandGet.requestConfig =
  groundPcApiCommonProductAttributeBrandGetRequestConfig;

/**
 * 接口 [商品库单位下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72460) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/units`
 * @更新时间 `2023-03-03 10:39:53`
 */
export interface GroundPcApiCommonProductAttributeUnitsGetRequest {}

/**
 * 接口 [商品库单位下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72460) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/units`
 * @更新时间 `2023-03-03 10:39:53`
 */
export type GroundPcApiCommonProductAttributeUnitsGetResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 名称
   */
  name?: string;
}[];

/**
 * 接口 [商品库单位下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72460) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/units`
 * @更新时间 `2023-03-03 10:39:53`
 */
type GroundPcApiCommonProductAttributeUnitsGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/product/attribute/units',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [商品库单位下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72460) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/units`
 * @更新时间 `2023-03-03 10:39:53`
 */
const groundPcApiCommonProductAttributeUnitsGetRequestConfig: GroundPcApiCommonProductAttributeUnitsGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/product/attribute/units',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonProductAttributeUnitsGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [商品库单位下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72460) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/product/attribute/units`
 * @更新时间 `2023-03-03 10:39:53`
 */
export const groundPcApiCommonProductAttributeUnitsGet = /*#__PURE__*/ (
  requestData?: GroundPcApiCommonProductAttributeUnitsGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCommonProductAttributeUnitsGetResponse>(
    prepare(
      groundPcApiCommonProductAttributeUnitsGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiCommonProductAttributeUnitsGet.requestConfig =
  groundPcApiCommonProductAttributeUnitsGetRequestConfig;

/**
 * 接口 [优惠券弹窗选择↗](https://yapi.huianrong.com/project/1764/interface/api/72496) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/coupon/selectPage`
 * @更新时间 `2023-03-03 10:39:54`
 */
export interface GroundPcApiCommonCouponSelectPageGetRequest {
  /**
   * 名称
   */
  name?: string;
  /**
   * 类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
   */
  type?: string;
  /**
   * 项目ID
   */
  projectId?: string;
  /**
   * 店铺ID
   */
  storeId?: string;
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
 * 接口 [优惠券弹窗选择↗](https://yapi.huianrong.com/project/1764/interface/api/72496) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/coupon/selectPage`
 * @更新时间 `2023-03-03 10:39:54`
 */
export interface GroundPcApiCommonCouponSelectPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 剩余库存
     */
    surplusStock?: number;
    /**
     * ID
     */
    id?: number;
    /**
     * 名称
     */
    name?: string;
    /**
     * 类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
     */
    type?: number;
    /**
     * 使用门槛
     */
    threshold?: string;
    /**
     * 发放数量
     */
    stock?: number;
  }[];
}

/**
 * 接口 [优惠券弹窗选择↗](https://yapi.huianrong.com/project/1764/interface/api/72496) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/coupon/selectPage`
 * @更新时间 `2023-03-03 10:39:54`
 */
type GroundPcApiCommonCouponSelectPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/coupon/selectPage',
    'data',
    string,
    'name' | 'type' | 'projectId' | 'storeId' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [优惠券弹窗选择↗](https://yapi.huianrong.com/project/1764/interface/api/72496) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/coupon/selectPage`
 * @更新时间 `2023-03-03 10:39:54`
 */
const groundPcApiCommonCouponSelectPageGetRequestConfig: GroundPcApiCommonCouponSelectPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/coupon/selectPage',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: ['name', 'type', 'projectId', 'storeId', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonCouponSelectPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [优惠券弹窗选择↗](https://yapi.huianrong.com/project/1764/interface/api/72496) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/coupon/selectPage`
 * @更新时间 `2023-03-03 10:39:54`
 */
export const groundPcApiCommonCouponSelectPageGet = /*#__PURE__*/ (
  requestData: GroundPcApiCommonCouponSelectPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCommonCouponSelectPageGetResponse>(
    prepare(groundPcApiCommonCouponSelectPageGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCommonCouponSelectPageGet.requestConfig =
  groundPcApiCommonCouponSelectPageGetRequestConfig;

/**
 * 接口 [店铺场地弹窗选择↗](https://yapi.huianrong.com/project/1764/interface/api/72502) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/space/selectPage`
 * @更新时间 `2023-03-03 10:39:56`
 */
export interface GroundPcApiCommonSpaceSelectPageGetRequest {
  /**
   * 操作类型1、查看2、编辑
   */
  type?: string;
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 场地ids
   */
  spaceIds?: string;
  /**
   * 商品名称编码条码
   */
  key?: string;
  /**
   * 场馆分类ID
   */
  classifyId?: string;
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
 * 接口 [店铺场地弹窗选择↗](https://yapi.huianrong.com/project/1764/interface/api/72502) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/space/selectPage`
 * @更新时间 `2023-03-03 10:39:56`
 */
export interface GroundPcApiCommonSpaceSelectPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 场地id
     */
    id: number;
    /**
     * 场地名称
     */
    name: string;
    /**
     * 场地分类
     */
    classify: string;
    /**
     * 场地编码
     */
    code: string;
    /**
     * 计费类型
     */
    calType: string;
    /**
     * 价格
     */
    price: number;
  }[];
}

/**
 * 接口 [店铺场地弹窗选择↗](https://yapi.huianrong.com/project/1764/interface/api/72502) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/space/selectPage`
 * @更新时间 `2023-03-03 10:39:56`
 */
type GroundPcApiCommonSpaceSelectPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/space/selectPage',
    'data',
    string,
    | 'type'
    | 'storeId'
    | 'spaceIds'
    | 'key'
    | 'classifyId'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [店铺场地弹窗选择↗](https://yapi.huianrong.com/project/1764/interface/api/72502) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/space/selectPage`
 * @更新时间 `2023-03-03 10:39:56`
 */
const groundPcApiCommonSpaceSelectPageGetRequestConfig: GroundPcApiCommonSpaceSelectPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/space/selectPage',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: [
      'type',
      'storeId',
      'spaceIds',
      'key',
      'classifyId',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonSpaceSelectPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [店铺场地弹窗选择↗](https://yapi.huianrong.com/project/1764/interface/api/72502) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/space/selectPage`
 * @更新时间 `2023-03-03 10:39:56`
 */
export const groundPcApiCommonSpaceSelectPageGet = /*#__PURE__*/ (
  requestData: GroundPcApiCommonSpaceSelectPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCommonSpaceSelectPageGetResponse>(
    prepare(groundPcApiCommonSpaceSelectPageGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCommonSpaceSelectPageGet.requestConfig =
  groundPcApiCommonSpaceSelectPageGetRequestConfig;

/**
 * 接口 [项目下拉列表↗](https://yapi.huianrong.com/project/1764/interface/api/72544) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/project/selectList`
 * @更新时间 `2023-03-03 10:39:46`
 */
export interface GroundPcApiCommonProjectSelectListGetRequest {
  /**
   * 所属公司id
   */
  companyId?: string;
  /**
   * 所属片区id
   */
  areaId?: string;
  /**
   * 项目名称
   */
  name?: string;
}

/**
 * 接口 [项目下拉列表↗](https://yapi.huianrong.com/project/1764/interface/api/72544) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/project/selectList`
 * @更新时间 `2023-03-03 10:39:46`
 */
export type GroundPcApiCommonProjectSelectListGetResponse = {
  /**
   * id值
   */
  value: number;
  /**
   * 名称
   */
  label: string;
}[];

/**
 * 接口 [项目下拉列表↗](https://yapi.huianrong.com/project/1764/interface/api/72544) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/project/selectList`
 * @更新时间 `2023-03-03 10:39:46`
 */
type GroundPcApiCommonProjectSelectListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/project/selectList',
    'data',
    string,
    'companyId' | 'areaId' | 'name',
    false
  >
>;

/**
 * 接口 [项目下拉列表↗](https://yapi.huianrong.com/project/1764/interface/api/72544) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/project/selectList`
 * @更新时间 `2023-03-03 10:39:46`
 */
const groundPcApiCommonProjectSelectListGetRequestConfig: GroundPcApiCommonProjectSelectListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/project/selectList',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: ['companyId', 'areaId', 'name'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonProjectSelectListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [项目下拉列表↗](https://yapi.huianrong.com/project/1764/interface/api/72544) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/project/selectList`
 * @更新时间 `2023-03-03 10:39:46`
 */
export const groundPcApiCommonProjectSelectListGet = /*#__PURE__*/ (
  requestData: GroundPcApiCommonProjectSelectListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCommonProjectSelectListGetResponse>(
    prepare(groundPcApiCommonProjectSelectListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCommonProjectSelectListGet.requestConfig =
  groundPcApiCommonProjectSelectListGetRequestConfig;

/**
 * 接口 [楼宇下拉\/树↗](https://yapi.huianrong.com/project/1764/interface/api/72554) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/building/list-select`
 * @更新时间 `2023-03-03 10:39:47`
 */
export interface GroundPcApiCommonBuildingListSelectGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 项目id集合
   */
  projectIds?: string;
}

/**
 * 接口 [楼宇下拉\/树↗](https://yapi.huianrong.com/project/1764/interface/api/72554) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/building/list-select`
 * @更新时间 `2023-03-03 10:39:47`
 */
export type GroundPcApiCommonBuildingListSelectGetResponse = {
  /**
   * id
   */
  value?: number;
  /**
   * 名称
   */
  label?: string;
  /**
   * 编号
   */
  code?: string;
  /**
   * 业态id
   */
  formatId?: number;
}[];

/**
 * 接口 [楼宇下拉\/树↗](https://yapi.huianrong.com/project/1764/interface/api/72554) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/building/list-select`
 * @更新时间 `2023-03-03 10:39:47`
 */
type GroundPcApiCommonBuildingListSelectGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/building/list-select',
    'data',
    string,
    'projectId' | 'projectIds',
    false
  >
>;

/**
 * 接口 [楼宇下拉\/树↗](https://yapi.huianrong.com/project/1764/interface/api/72554) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/building/list-select`
 * @更新时间 `2023-03-03 10:39:47`
 */
const groundPcApiCommonBuildingListSelectGetRequestConfig: GroundPcApiCommonBuildingListSelectGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/building/list-select',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: ['projectId', 'projectIds'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonBuildingListSelectGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [楼宇下拉\/树↗](https://yapi.huianrong.com/project/1764/interface/api/72554) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/building/list-select`
 * @更新时间 `2023-03-03 10:39:47`
 */
export const groundPcApiCommonBuildingListSelectGet = /*#__PURE__*/ (
  requestData: GroundPcApiCommonBuildingListSelectGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCommonBuildingListSelectGetResponse>(
    prepare(groundPcApiCommonBuildingListSelectGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCommonBuildingListSelectGet.requestConfig =
  groundPcApiCommonBuildingListSelectGetRequestConfig;

/**
 * 接口 [楼层下拉\/树↗](https://yapi.huianrong.com/project/1764/interface/api/72560) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/building-floor/list-select`
 * @更新时间 `2023-03-03 10:39:48`
 */
export interface GroundPcApiCommonBuildingFloorListSelectGetRequest {
  /**
   * 楼宇id
   */
  buildingId?: string;
  /**
   * 楼宇id集合
   */
  buildingIds?: string;
}

/**
 * 接口 [楼层下拉\/树↗](https://yapi.huianrong.com/project/1764/interface/api/72560) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/building-floor/list-select`
 * @更新时间 `2023-03-03 10:39:48`
 */
export type GroundPcApiCommonBuildingFloorListSelectGetResponse = {
  /**
   * id
   */
  value?: number;
  /**
   * 名称
   */
  label?: string;
  /**
   * 编号
   */
  code?: string;
  /**
   * 业态id
   */
  formatId?: number;
}[];

/**
 * 接口 [楼层下拉\/树↗](https://yapi.huianrong.com/project/1764/interface/api/72560) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/building-floor/list-select`
 * @更新时间 `2023-03-03 10:39:48`
 */
type GroundPcApiCommonBuildingFloorListSelectGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/building-floor/list-select',
    'data',
    string,
    'buildingId' | 'buildingIds',
    false
  >
>;

/**
 * 接口 [楼层下拉\/树↗](https://yapi.huianrong.com/project/1764/interface/api/72560) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/building-floor/list-select`
 * @更新时间 `2023-03-03 10:39:48`
 */
const groundPcApiCommonBuildingFloorListSelectGetRequestConfig: GroundPcApiCommonBuildingFloorListSelectGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/building-floor/list-select',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: ['buildingId', 'buildingIds'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonBuildingFloorListSelectGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [楼层下拉\/树↗](https://yapi.huianrong.com/project/1764/interface/api/72560) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/building-floor/list-select`
 * @更新时间 `2023-03-03 10:39:48`
 */
export const groundPcApiCommonBuildingFloorListSelectGet = /*#__PURE__*/ (
  requestData: GroundPcApiCommonBuildingFloorListSelectGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCommonBuildingFloorListSelectGetResponse>(
    prepare(
      groundPcApiCommonBuildingFloorListSelectGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiCommonBuildingFloorListSelectGet.requestConfig =
  groundPcApiCommonBuildingFloorListSelectGetRequestConfig;

/**
 * 接口 [铺位下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72562) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/estate/selectList`
 * @更新时间 `2023-03-03 14:55:49`
 */
export interface GroundPcApiCommonEstateSelectListGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 店铺id
   */
  storeId?: string;
}

/**
 * 接口 [铺位下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72562) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/estate/selectList`
 * @更新时间 `2023-03-03 14:55:49`
 */
export type GroundPcApiCommonEstateSelectListGetResponse = {
  /**
   * id
   */
  value?: number;
  /**
   * 名称
   */
  label?: string;
}[];

/**
 * 接口 [铺位下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72562) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/estate/selectList`
 * @更新时间 `2023-03-03 14:55:49`
 */
type GroundPcApiCommonEstateSelectListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/estate/selectList',
    'data',
    string,
    'projectId' | 'storeId',
    false
  >
>;

/**
 * 接口 [铺位下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72562) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/estate/selectList`
 * @更新时间 `2023-03-03 14:55:49`
 */
const groundPcApiCommonEstateSelectListGetRequestConfig: GroundPcApiCommonEstateSelectListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/estate/selectList',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: ['projectId', 'storeId'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonEstateSelectListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [铺位下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72562) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/estate/selectList`
 * @更新时间 `2023-03-03 14:55:49`
 */
export const groundPcApiCommonEstateSelectListGet = /*#__PURE__*/ (
  requestData: GroundPcApiCommonEstateSelectListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCommonEstateSelectListGetResponse>(
    prepare(groundPcApiCommonEstateSelectListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCommonEstateSelectListGet.requestConfig =
  groundPcApiCommonEstateSelectListGetRequestConfig;

/**
 * 接口 [店铺下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72568) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/store/select`
 * @更新时间 `2023-03-03 14:55:52`
 */
export interface GroundPcApiCommonStoreSelectGetRequest {
  /**
   * 经营状态1营业中;2打烊
   */
  operatingStatus?: string;
  /**
   * 搜索店铺名称联系人联系电话
   */
  searchKey?: string;
  /**
   * 排除店铺ID
   */
  excludeStoreId?: string;
  /**
   * 项目ID
   */
  projectId?: string;
  /**
   * 商户ID
   */
  merchantId?: string;
  /**
   * 业态ID
   */
  sceneId?: string;
  /**
   * 省
   */
  provinceCode?: string;
  /**
   * 区
   */
  cityCode?: string;
  /**
   * 县
   */
  districtCode?: string;
}

/**
 * 接口 [店铺下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72568) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/store/select`
 * @更新时间 `2023-03-03 14:55:52`
 */
export type GroundPcApiCommonStoreSelectGetResponse = {
  /**
   * id
   */
  value?: number;
  /**
   * 名称
   */
  label?: string;
}[];

/**
 * 接口 [店铺下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72568) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/store/select`
 * @更新时间 `2023-03-03 14:55:52`
 */
type GroundPcApiCommonStoreSelectGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/store/select',
    'data',
    string,
    | 'operatingStatus'
    | 'searchKey'
    | 'excludeStoreId'
    | 'projectId'
    | 'merchantId'
    | 'sceneId'
    | 'provinceCode'
    | 'cityCode'
    | 'districtCode',
    false
  >
>;

/**
 * 接口 [店铺下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72568) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/store/select`
 * @更新时间 `2023-03-03 14:55:52`
 */
const groundPcApiCommonStoreSelectGetRequestConfig: GroundPcApiCommonStoreSelectGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/store/select',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: [
      'operatingStatus',
      'searchKey',
      'excludeStoreId',
      'projectId',
      'merchantId',
      'sceneId',
      'provinceCode',
      'cityCode',
      'districtCode'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonStoreSelectGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [店铺下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72568) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/store/select`
 * @更新时间 `2023-03-03 14:55:52`
 */
export const groundPcApiCommonStoreSelectGet = /*#__PURE__*/ (
  requestData: GroundPcApiCommonStoreSelectGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCommonStoreSelectGetResponse>(
    prepare(groundPcApiCommonStoreSelectGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCommonStoreSelectGet.requestConfig =
  groundPcApiCommonStoreSelectGetRequestConfig;

/**
 * 接口 [场地分类下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72570) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/venue/classify`
 * @更新时间 `2023-03-03 11:07:05`
 */
export interface GroundPcApiCommonVenueClassifyGetRequest {}

/**
 * 接口 [场地分类下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72570) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/venue/classify`
 * @更新时间 `2023-03-03 11:07:05`
 */
export type GroundPcApiCommonVenueClassifyGetResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 项目名称
   */
  projectName?: string;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 序号
   */
  sort?: number;
  /**
   * 备注
   */
  remark?: string;
}[];

/**
 * 接口 [场地分类下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72570) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/venue/classify`
 * @更新时间 `2023-03-03 11:07:05`
 */
type GroundPcApiCommonVenueClassifyGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/venue/classify',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [场地分类下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72570) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/venue/classify`
 * @更新时间 `2023-03-03 11:07:05`
 */
const groundPcApiCommonVenueClassifyGetRequestConfig: GroundPcApiCommonVenueClassifyGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/venue/classify',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonVenueClassifyGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [场地分类下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72570) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/venue/classify`
 * @更新时间 `2023-03-03 11:07:05`
 */
export const groundPcApiCommonVenueClassifyGet = /*#__PURE__*/ (
  requestData?: GroundPcApiCommonVenueClassifyGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCommonVenueClassifyGetResponse>(
    prepare(groundPcApiCommonVenueClassifyGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCommonVenueClassifyGet.requestConfig =
  groundPcApiCommonVenueClassifyGetRequestConfig;

/**
 * 接口 [店铺特色选择↗](https://yapi.huianrong.com/project/1764/interface/api/72578) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/store/featureSelect`
 * @更新时间 `2023-03-03 10:39:55`
 */
export interface GroundPcApiCommonStoreFeatureSelectGetRequest {}

/**
 * 接口 [店铺特色选择↗](https://yapi.huianrong.com/project/1764/interface/api/72578) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/store/featureSelect`
 * @更新时间 `2023-03-03 10:39:55`
 */
export type GroundPcApiCommonStoreFeatureSelectGetResponse = {
  /**
   * id值
   */
  value: number;
  /**
   * 显示名称
   */
  label: string;
}[];

/**
 * 接口 [店铺特色选择↗](https://yapi.huianrong.com/project/1764/interface/api/72578) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/store/featureSelect`
 * @更新时间 `2023-03-03 10:39:55`
 */
type GroundPcApiCommonStoreFeatureSelectGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/store/featureSelect',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [店铺特色选择↗](https://yapi.huianrong.com/project/1764/interface/api/72578) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/store/featureSelect`
 * @更新时间 `2023-03-03 10:39:55`
 */
const groundPcApiCommonStoreFeatureSelectGetRequestConfig: GroundPcApiCommonStoreFeatureSelectGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/store/featureSelect',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonStoreFeatureSelectGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [店铺特色选择↗](https://yapi.huianrong.com/project/1764/interface/api/72578) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/store/featureSelect`
 * @更新时间 `2023-03-03 10:39:55`
 */
export const groundPcApiCommonStoreFeatureSelectGet = /*#__PURE__*/ (
  requestData?: GroundPcApiCommonStoreFeatureSelectGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCommonStoreFeatureSelectGetResponse>(
    prepare(groundPcApiCommonStoreFeatureSelectGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCommonStoreFeatureSelectGet.requestConfig =
  groundPcApiCommonStoreFeatureSelectGetRequestConfig;

/**
 * 接口 [场馆下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72590) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/venue/selectList`
 * @更新时间 `2023-03-03 10:39:57`
 */
export interface GroundPcApiCommonVenueSelectListGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 店铺id
   */
  storeId?: string;
}

/**
 * 接口 [场馆下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72590) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/venue/selectList`
 * @更新时间 `2023-03-03 10:39:57`
 */
export type GroundPcApiCommonVenueSelectListGetResponse = {
  /**
   * 场馆id
   */
  id: number;
  /**
   * 场馆名称
   */
  name: string;
}[];

/**
 * 接口 [场馆下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72590) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/venue/selectList`
 * @更新时间 `2023-03-03 10:39:57`
 */
type GroundPcApiCommonVenueSelectListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/venue/selectList',
    'data',
    string,
    'projectId' | 'storeId',
    false
  >
>;

/**
 * 接口 [场馆下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72590) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/venue/selectList`
 * @更新时间 `2023-03-03 10:39:57`
 */
const groundPcApiCommonVenueSelectListGetRequestConfig: GroundPcApiCommonVenueSelectListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/venue/selectList',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: ['projectId', 'storeId'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonVenueSelectListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [场馆下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72590) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/venue/selectList`
 * @更新时间 `2023-03-03 10:39:57`
 */
export const groundPcApiCommonVenueSelectListGet = /*#__PURE__*/ (
  requestData: GroundPcApiCommonVenueSelectListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCommonVenueSelectListGetResponse>(
    prepare(groundPcApiCommonVenueSelectListGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCommonVenueSelectListGet.requestConfig =
  groundPcApiCommonVenueSelectListGetRequestConfig;

/**
 * 接口 [货品组下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72592) 的 **请求类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/goods/group/select`
 * @更新时间 `2023-03-03 10:49:15`
 */
export interface GroundPcApiCommonGoodsGroupSelectGetRequest {
  /**
   * 项目id(Long)
   */
  projectId?: string;
}

/**
 * 接口 [货品组下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72592) 的 **返回类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/goods/group/select`
 * @更新时间 `2023-03-03 10:49:15`
 */
export type GroundPcApiCommonGoodsGroupSelectGetResponse = {
  /**
   * 组别id
   */
  value: number;
  /**
   * 组别名称
   */
  label: string;
}[];

/**
 * 接口 [货品组下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72592) 的 **请求配置的类型**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/goods/group/select`
 * @更新时间 `2023-03-03 10:49:15`
 */
type GroundPcApiCommonGoodsGroupSelectGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/common/goods/group/select',
    'data',
    string,
    'projectId',
    false
  >
>;

/**
 * 接口 [货品组下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72592) 的 **请求配置**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/goods/group/select`
 * @更新时间 `2023-03-03 10:49:15`
 */
const groundPcApiCommonGoodsGroupSelectGetRequestConfig: GroundPcApiCommonGoodsGroupSelectGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_26,
    devUrl: devUrl_0_2_0_26,
    prodUrl: prodUrl_0_2_0_26,
    path: '/ground-pc-api/common/goods/group/select',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_26,
    paramNames: [],
    queryNames: ['projectId'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCommonGoodsGroupSelectGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [货品组下拉↗](https://yapi.huianrong.com/project/1764/interface/api/72592) 的 **请求函数**
 *
 * @分类 [公共接口↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23209)
 * @请求头 `GET /ground-pc-api/common/goods/group/select`
 * @更新时间 `2023-03-03 10:49:15`
 */
export const groundPcApiCommonGoodsGroupSelectGet = /*#__PURE__*/ (
  requestData: GroundPcApiCommonGoodsGroupSelectGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCommonGoodsGroupSelectGetResponse>(
    prepare(groundPcApiCommonGoodsGroupSelectGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCommonGoodsGroupSelectGet.requestConfig =
  groundPcApiCommonGoodsGroupSelectGetRequestConfig;

const mockUrl_0_2_0_27 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_27 = '' as any;
const prodUrl_0_2_0_27 = '' as any;
const dataKey_0_2_0_27 = 'data' as any;

/**
 * 接口 [店铺招牌详情↗](https://yapi.huianrong.com/project/1764/interface/api/72462) 的 **请求类型**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `GET /ground-pc-api/store/feature/info/{storeId}`
 * @更新时间 `2023-03-01 15:08:15`
 */
export interface GroundPcApiStoreFeatureInfoStoreIdGetRequest {
  /**
   * 店铺id(Long)
   */
  storeId: string;
}

/**
 * 接口 [店铺招牌详情↗](https://yapi.huianrong.com/project/1764/interface/api/72462) 的 **返回类型**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `GET /ground-pc-api/store/feature/info/{storeId}`
 * @更新时间 `2023-03-01 15:08:15`
 */
export interface GroundPcApiStoreFeatureInfoStoreIdGetResponse {
  /**
   * 店铺信息 ,StoreInfo
   */
  storeInfo?: {
    /**
     * 店铺id
     */
    storeId?: number;
    /**
     * 店铺名字
     */
    storeName?: string;
    /**
     * 业态
     */
    format?: string;
  };
  /**
   * 优惠卷信息 ,CouponInfo
   */
  couponInfoList?: {
    /**
     * 数据id
     */
    id?: number;
    /**
     * 优惠卷id
     */
    couponTemplateId?: number;
    /**
     * 优惠卷名字
     */
    name?: string;
    /**
     * 优惠券类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
     */
    couponType?: number;
    /**
     * 门槛
     */
    thresholdAmount?: number;
    /**
     * 排序
     */
    sort?: number;
  }[];
  /**
   * 商品信息 ,ProductInfo
   */
  productInfoList?: {
    /**
     * 数据id
     */
    id?: number;
    /**
     * 店铺商品id
     */
    storeProductId?: number;
    /**
     * 商品名称
     */
    name?: string;
    /**
     * 店铺商品skuid
     */
    storeProductWeightId?: number;
    /**
     * 分类
     */
    classifyName?: string;
    /**
     * 品牌
     */
    brandName?: string;
    /**
     * 单位
     */
    unitName?: string;
    /**
     * 规格
     */
    sku?: string;
    /**
     * 门店零售价
     */
    salePrice?: number;
    /**
     * 排序
     */
    sort?: number;
  }[];
  /**
   * 场馆信息 ,VenueInfo
   */
  venueInfoList?: {
    /**
     * 数据id
     */
    id?: number;
    /**
     * 场馆id
     */
    venueId?: number;
    /**
     * 场馆计费id
     */
    venuePriceId?: number;
    /**
     * 场馆名字
     */
    name?: string;
    /**
     * 分类
     */
    classifyName?: string;
    /**
     * code
     */
    code?: string;
    /**
     * 计费规则
     */
    rule?: string;
    /**
     * 价格
     */
    price?: number;
  }[];
}

/**
 * 接口 [店铺招牌详情↗](https://yapi.huianrong.com/project/1764/interface/api/72462) 的 **请求配置的类型**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `GET /ground-pc-api/store/feature/info/{storeId}`
 * @更新时间 `2023-03-01 15:08:15`
 */
type GroundPcApiStoreFeatureInfoStoreIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store/feature/info/{storeId}',
    'data',
    'storeId',
    string,
    false
  >
>;

/**
 * 接口 [店铺招牌详情↗](https://yapi.huianrong.com/project/1764/interface/api/72462) 的 **请求配置**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `GET /ground-pc-api/store/feature/info/{storeId}`
 * @更新时间 `2023-03-01 15:08:15`
 */
const groundPcApiStoreFeatureInfoStoreIdGetRequestConfig: GroundPcApiStoreFeatureInfoStoreIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_27,
    devUrl: devUrl_0_2_0_27,
    prodUrl: prodUrl_0_2_0_27,
    path: '/ground-pc-api/store/feature/info/{storeId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_27,
    paramNames: ['storeId'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreFeatureInfoStoreIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [店铺招牌详情↗](https://yapi.huianrong.com/project/1764/interface/api/72462) 的 **请求函数**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `GET /ground-pc-api/store/feature/info/{storeId}`
 * @更新时间 `2023-03-01 15:08:15`
 */
export const groundPcApiStoreFeatureInfoStoreIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiStoreFeatureInfoStoreIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreFeatureInfoStoreIdGetResponse>(
    prepare(groundPcApiStoreFeatureInfoStoreIdGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreFeatureInfoStoreIdGet.requestConfig =
  groundPcApiStoreFeatureInfoStoreIdGetRequestConfig;

/**
 * 接口 [店铺招牌新增↗](https://yapi.huianrong.com/project/1764/interface/api/72464) 的 **请求类型**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/add`
 * @更新时间 `2023-03-01 15:08:16`
 */
export interface GroundPcApiStoreFeatureAddPostRequest {
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 类型:1优惠卷2商品3场馆
   */
  type?: number;
  /**
   * 优惠卷商品id ,Long
   */
  objectIdList?: number[];
}

/**
 * 接口 [店铺招牌新增↗](https://yapi.huianrong.com/project/1764/interface/api/72464) 的 **返回类型**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/add`
 * @更新时间 `2023-03-01 15:08:16`
 */
export interface GroundPcApiStoreFeatureAddPostResponse {}

/**
 * 接口 [店铺招牌新增↗](https://yapi.huianrong.com/project/1764/interface/api/72464) 的 **请求配置的类型**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/add`
 * @更新时间 `2023-03-01 15:08:16`
 */
type GroundPcApiStoreFeatureAddPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store/feature/add',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [店铺招牌新增↗](https://yapi.huianrong.com/project/1764/interface/api/72464) 的 **请求配置**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/add`
 * @更新时间 `2023-03-01 15:08:16`
 */
const groundPcApiStoreFeatureAddPostRequestConfig: GroundPcApiStoreFeatureAddPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_27,
    devUrl: devUrl_0_2_0_27,
    prodUrl: prodUrl_0_2_0_27,
    path: '/ground-pc-api/store/feature/add',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_27,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreFeatureAddPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [店铺招牌新增↗](https://yapi.huianrong.com/project/1764/interface/api/72464) 的 **请求函数**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/add`
 * @更新时间 `2023-03-01 15:08:16`
 */
export const groundPcApiStoreFeatureAddPost = /*#__PURE__*/ (
  requestData: GroundPcApiStoreFeatureAddPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreFeatureAddPostResponse>(
    prepare(groundPcApiStoreFeatureAddPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreFeatureAddPost.requestConfig =
  groundPcApiStoreFeatureAddPostRequestConfig;

/**
 * 接口 [店铺招牌删除↗](https://yapi.huianrong.com/project/1764/interface/api/72466) 的 **请求类型**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/delete/{id}`
 * @更新时间 `2023-03-01 15:08:16`
 */
export interface GroundPcApiStoreFeatureDeleteIdPostRequest {
  /**
   * 招牌(Long)
   */
  id: string;
}

/**
 * 接口 [店铺招牌删除↗](https://yapi.huianrong.com/project/1764/interface/api/72466) 的 **返回类型**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/delete/{id}`
 * @更新时间 `2023-03-01 15:08:16`
 */
export interface GroundPcApiStoreFeatureDeleteIdPostResponse {}

/**
 * 接口 [店铺招牌删除↗](https://yapi.huianrong.com/project/1764/interface/api/72466) 的 **请求配置的类型**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/delete/{id}`
 * @更新时间 `2023-03-01 15:08:16`
 */
type GroundPcApiStoreFeatureDeleteIdPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store/feature/delete/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [店铺招牌删除↗](https://yapi.huianrong.com/project/1764/interface/api/72466) 的 **请求配置**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/delete/{id}`
 * @更新时间 `2023-03-01 15:08:16`
 */
const groundPcApiStoreFeatureDeleteIdPostRequestConfig: GroundPcApiStoreFeatureDeleteIdPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_27,
    devUrl: devUrl_0_2_0_27,
    prodUrl: prodUrl_0_2_0_27,
    path: '/ground-pc-api/store/feature/delete/{id}',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_27,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreFeatureDeleteIdPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [店铺招牌删除↗](https://yapi.huianrong.com/project/1764/interface/api/72466) 的 **请求函数**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/delete/{id}`
 * @更新时间 `2023-03-01 15:08:16`
 */
export const groundPcApiStoreFeatureDeleteIdPost = /*#__PURE__*/ (
  requestData: GroundPcApiStoreFeatureDeleteIdPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreFeatureDeleteIdPostResponse>(
    prepare(groundPcApiStoreFeatureDeleteIdPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreFeatureDeleteIdPost.requestConfig =
  groundPcApiStoreFeatureDeleteIdPostRequestConfig;

/**
 * 接口 [店铺招牌移动↗](https://yapi.huianrong.com/project/1764/interface/api/72468) 的 **请求类型**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/move`
 * @更新时间 `2023-03-01 15:08:17`
 */
export interface GroundPcApiStoreFeatureMovePostRequest {
  /**
   * id
   */
  id?: number;
  /**
   * 方向1上2下
   */
  direction?: number;
}

/**
 * 接口 [店铺招牌移动↗](https://yapi.huianrong.com/project/1764/interface/api/72468) 的 **返回类型**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/move`
 * @更新时间 `2023-03-01 15:08:17`
 */
export interface GroundPcApiStoreFeatureMovePostResponse {}

/**
 * 接口 [店铺招牌移动↗](https://yapi.huianrong.com/project/1764/interface/api/72468) 的 **请求配置的类型**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/move`
 * @更新时间 `2023-03-01 15:08:17`
 */
type GroundPcApiStoreFeatureMovePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/store/feature/move',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [店铺招牌移动↗](https://yapi.huianrong.com/project/1764/interface/api/72468) 的 **请求配置**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/move`
 * @更新时间 `2023-03-01 15:08:17`
 */
const groundPcApiStoreFeatureMovePostRequestConfig: GroundPcApiStoreFeatureMovePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_27,
    devUrl: devUrl_0_2_0_27,
    prodUrl: prodUrl_0_2_0_27,
    path: '/ground-pc-api/store/feature/move',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_27,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiStoreFeatureMovePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [店铺招牌移动↗](https://yapi.huianrong.com/project/1764/interface/api/72468) 的 **请求函数**
 *
 * @分类 [店铺招牌↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23211)
 * @请求头 `POST /ground-pc-api/store/feature/move`
 * @更新时间 `2023-03-01 15:08:17`
 */
export const groundPcApiStoreFeatureMovePost = /*#__PURE__*/ (
  requestData: GroundPcApiStoreFeatureMovePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiStoreFeatureMovePostResponse>(
    prepare(groundPcApiStoreFeatureMovePostRequestConfig, requestData),
    ...args
  );
};

groundPcApiStoreFeatureMovePost.requestConfig =
  groundPcApiStoreFeatureMovePostRequestConfig;

const mockUrl_0_2_0_28 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_28 = '' as any;
const prodUrl_0_2_0_28 = '' as any;
const dataKey_0_2_0_28 = 'data' as any;

/**
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1764/interface/api/72580) 的 **请求类型**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `GET /ground-pc-api/file-direct-upload/sign`
 * @更新时间 `2023-03-02 18:05:12`
 */
export interface GroundPcApiFileDirectUploadSignGetRequest {}

/**
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1764/interface/api/72580) 的 **返回类型**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `GET /ground-pc-api/file-direct-upload/sign`
 * @更新时间 `2023-03-02 18:05:12`
 */
export interface GroundPcApiFileDirectUploadSignGetResponse {
  accessid?: string;
  policy?: string;
  signature?: string;
  host?: string;
  /**
   * 存储地址
   */
  dir?: string;
  /**
   * cdn地址
   */
  cdnUrl?: string;
  /**
   * 过期时间
   */
  expire?: string;
  /**
   * 回调参数
   */
  callback?: string;
  /**
   * key
   */
  key?: string;
}

/**
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1764/interface/api/72580) 的 **请求配置的类型**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `GET /ground-pc-api/file-direct-upload/sign`
 * @更新时间 `2023-03-02 18:05:12`
 */
type GroundPcApiFileDirectUploadSignGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/file-direct-upload/sign',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1764/interface/api/72580) 的 **请求配置**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `GET /ground-pc-api/file-direct-upload/sign`
 * @更新时间 `2023-03-02 18:05:12`
 */
const groundPcApiFileDirectUploadSignGetRequestConfig: GroundPcApiFileDirectUploadSignGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_28,
    devUrl: devUrl_0_2_0_28,
    prodUrl: prodUrl_0_2_0_28,
    path: '/ground-pc-api/file-direct-upload/sign',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_28,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiFileDirectUploadSignGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1764/interface/api/72580) 的 **请求函数**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `GET /ground-pc-api/file-direct-upload/sign`
 * @更新时间 `2023-03-02 18:05:12`
 */
export const groundPcApiFileDirectUploadSignGet = /*#__PURE__*/ (
  requestData?: GroundPcApiFileDirectUploadSignGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiFileDirectUploadSignGetResponse>(
    prepare(groundPcApiFileDirectUploadSignGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiFileDirectUploadSignGet.requestConfig =
  groundPcApiFileDirectUploadSignGetRequestConfig;

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1764/interface/api/72582) 的 **请求类型**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `POST /ground-pc-api/file-direct-upload/callback`
 * @更新时间 `2023-03-02 18:03:13`
 */
export interface GroundPcApiFileDirectUploadCallbackPostRequest {}

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1764/interface/api/72582) 的 **返回类型**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `POST /ground-pc-api/file-direct-upload/callback`
 * @更新时间 `2023-03-02 18:03:13`
 */
export interface GroundPcApiFileDirectUploadCallbackPostResponse {}

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1764/interface/api/72582) 的 **请求配置的类型**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `POST /ground-pc-api/file-direct-upload/callback`
 * @更新时间 `2023-03-02 18:03:13`
 */
type GroundPcApiFileDirectUploadCallbackPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/file-direct-upload/callback',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1764/interface/api/72582) 的 **请求配置**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `POST /ground-pc-api/file-direct-upload/callback`
 * @更新时间 `2023-03-02 18:03:13`
 */
const groundPcApiFileDirectUploadCallbackPostRequestConfig: GroundPcApiFileDirectUploadCallbackPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_28,
    devUrl: devUrl_0_2_0_28,
    prodUrl: prodUrl_0_2_0_28,
    path: '/ground-pc-api/file-direct-upload/callback',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_28,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiFileDirectUploadCallbackPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1764/interface/api/72582) 的 **请求函数**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `POST /ground-pc-api/file-direct-upload/callback`
 * @更新时间 `2023-03-02 18:03:13`
 */
export const groundPcApiFileDirectUploadCallbackPost = /*#__PURE__*/ (
  requestData?: GroundPcApiFileDirectUploadCallbackPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiFileDirectUploadCallbackPostResponse>(
    prepare(groundPcApiFileDirectUploadCallbackPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiFileDirectUploadCallbackPost.requestConfig =
  groundPcApiFileDirectUploadCallbackPostRequestConfig;

/**
 * 接口 [文件上传签名-测试↗](https://yapi.huianrong.com/project/1764/interface/api/72586) 的 **请求类型**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `GET /ground-pc-api/file-direct-upload/signTest`
 * @更新时间 `2023-03-02 18:03:17`
 */
export interface GroundPcApiFileDirectUploadSignTestGetRequest {
  /**
   * (String)
   */
  callBackUrl?: string;
  /**
   * (String)
   */
  callBackHost?: string;
}

/**
 * 接口 [文件上传签名-测试↗](https://yapi.huianrong.com/project/1764/interface/api/72586) 的 **返回类型**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `GET /ground-pc-api/file-direct-upload/signTest`
 * @更新时间 `2023-03-02 18:03:17`
 */
export interface GroundPcApiFileDirectUploadSignTestGetResponse {
  accessid?: string;
  policy?: string;
  signature?: string;
  host?: string;
  /**
   * 存储地址
   */
  dir?: string;
  /**
   * cdn地址
   */
  cdnUrl?: string;
  /**
   * 过期时间
   */
  expire?: string;
  /**
   * 回调参数
   */
  callback?: string;
  /**
   * key
   */
  key?: string;
}

/**
 * 接口 [文件上传签名-测试↗](https://yapi.huianrong.com/project/1764/interface/api/72586) 的 **请求配置的类型**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `GET /ground-pc-api/file-direct-upload/signTest`
 * @更新时间 `2023-03-02 18:03:17`
 */
type GroundPcApiFileDirectUploadSignTestGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/file-direct-upload/signTest',
    'data',
    string,
    'callBackUrl' | 'callBackHost',
    false
  >
>;

/**
 * 接口 [文件上传签名-测试↗](https://yapi.huianrong.com/project/1764/interface/api/72586) 的 **请求配置**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `GET /ground-pc-api/file-direct-upload/signTest`
 * @更新时间 `2023-03-02 18:03:17`
 */
const groundPcApiFileDirectUploadSignTestGetRequestConfig: GroundPcApiFileDirectUploadSignTestGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_28,
    devUrl: devUrl_0_2_0_28,
    prodUrl: prodUrl_0_2_0_28,
    path: '/ground-pc-api/file-direct-upload/signTest',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_28,
    paramNames: [],
    queryNames: ['callBackUrl', 'callBackHost'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiFileDirectUploadSignTestGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [文件上传签名-测试↗](https://yapi.huianrong.com/project/1764/interface/api/72586) 的 **请求函数**
 *
 * @分类 [资源管理↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23227)
 * @请求头 `GET /ground-pc-api/file-direct-upload/signTest`
 * @更新时间 `2023-03-02 18:03:17`
 */
export const groundPcApiFileDirectUploadSignTestGet = /*#__PURE__*/ (
  requestData: GroundPcApiFileDirectUploadSignTestGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiFileDirectUploadSignTestGetResponse>(
    prepare(groundPcApiFileDirectUploadSignTestGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiFileDirectUploadSignTestGet.requestConfig =
  groundPcApiFileDirectUploadSignTestGetRequestConfig;

const mockUrl_0_2_0_29 = 'https://yapi.huianrong.com/mock/1764' as any;
const devUrl_0_2_0_29 = '' as any;
const prodUrl_0_2_0_29 = '' as any;
const dataKey_0_2_0_29 = 'data' as any;

/**
 * 接口 [期限卡\/次卡保存订单数据↗](https://yapi.huianrong.com/project/1764/interface/api/72598) 的 **请求类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/save`
 * @更新时间 `2023-03-03 11:03:11`
 */
export interface GroundPcApiCardOrderSavePostRequest {
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
 * 接口 [期限卡\/次卡保存订单数据↗](https://yapi.huianrong.com/project/1764/interface/api/72598) 的 **返回类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/save`
 * @更新时间 `2023-03-03 11:03:11`
 */
export interface GroundPcApiCardOrderSavePostResponse {
  /**
   * 卡订单id
   */
  cardOrderId?: number;
  /**
   * 卡订单编号
   */
  orderNo?: string;
}

/**
 * 接口 [期限卡\/次卡保存订单数据↗](https://yapi.huianrong.com/project/1764/interface/api/72598) 的 **请求配置的类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/save`
 * @更新时间 `2023-03-03 11:03:11`
 */
type GroundPcApiCardOrderSavePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-order/save',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [期限卡\/次卡保存订单数据↗](https://yapi.huianrong.com/project/1764/interface/api/72598) 的 **请求配置**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/save`
 * @更新时间 `2023-03-03 11:03:11`
 */
const groundPcApiCardOrderSavePostRequestConfig: GroundPcApiCardOrderSavePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_29,
    devUrl: devUrl_0_2_0_29,
    prodUrl: prodUrl_0_2_0_29,
    path: '/ground-pc-api/card-order/save',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_29,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderSavePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [期限卡\/次卡保存订单数据↗](https://yapi.huianrong.com/project/1764/interface/api/72598) 的 **请求函数**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/save`
 * @更新时间 `2023-03-03 11:03:11`
 */
export const groundPcApiCardOrderSavePost = /*#__PURE__*/ (
  requestData: GroundPcApiCardOrderSavePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderSavePostResponse>(
    prepare(groundPcApiCardOrderSavePostRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardOrderSavePost.requestConfig =
  groundPcApiCardOrderSavePostRequestConfig;

/**
 * 接口 [期限卡\/次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/72600) 的 **请求类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/sign`
 * @更新时间 `2023-03-03 11:03:11`
 */
export interface GroundPcApiCardOrderSignPostRequest {
  /**
   * 订单编号
   */
  orderId: number;
  /**
   * 物理卡号
   */
  physicalCardNo?: string;
}

/**
 * 接口 [期限卡\/次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/72600) 的 **返回类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/sign`
 * @更新时间 `2023-03-03 11:03:11`
 */
export interface GroundPcApiCardOrderSignPostResponse {
  /**
   * 订单id
   */
  orderId?: number;
  /**
   * 合同类型 1期限卡合同  2次卡合同
   */
  contractType?: number;
  /**
   * 合同编号
   */
  contractCode?: string;
  /**
   * 购卡人姓名
   */
  membersName?: string;
  /**
   * 购卡人手机号
   */
  membersPhone?: string;
  /**
   * 购卡人身份证号
   */
  membersIdCardNo?: string;
  /**
   * 销售人员姓名
   */
  salesStaffName?: string;
  /**
   * 购买天数
   */
  purchaseDays?: number;
  /**
   * 赠送天数（天）
   */
  giveDay?: number;
  /**
   * 允许冻结天数
   */
  allowFreezeDay?: number;
  /**
   * 合计天数
   */
  totalDays?: number;
  /**
   * 购买次数
   */
  purchaseTimes?: number;
  /**
   * 赠送次数（次）
   */
  giveTimes?: number;
  /**
   * 合计次数
   */
  totalTimes?: number;
  /**
   * 售价
   */
  sellingPrice?: number;
  /**
   * 支付类别  1微信  2支付宝  3储值卡
   */
  payMethodType?: number;
  /**
   * 收款金额(实收金额)
   */
  receivedAmount?: number;
  /**
   * 应收金额
   */
  receivableAmount?: number;
  /**
   * 合同总金额
   */
  totalAmount?: number;
  /**
   * 购买时间
   */
  purchaseTime?: string;
  /**
   * 操作员
   */
  operator?: string;
  /**
   * 激活方式 1购买激活 2第一次到店激活 3指定日期激活
   */
  activeType?: number;
  /**
   * 激活时间  方式为指定激活时，该值就是设置的指定激活日期
   */
  activeTime?: string;
  /**
   * 支持店铺
   */
  supportStores?: string;
  /**
   * 支持场馆
   */
  supportStadium?: string;
  /**
   * 期限卡是否支持转让，0、不支持1、支持
   */
  allowTransferType?: number;
  /**
   * 转让价格,支持转让的卡使用
   */
  transferPrice?: number;
  /**
   * 合同备注
   */
  contractRemark?: string;
  /**
   * 合同章程
   */
  contractArticles?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 打印类型 1 一式两联 2 一式三联
   */
  printType?: number;
}

/**
 * 接口 [期限卡\/次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/72600) 的 **请求配置的类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/sign`
 * @更新时间 `2023-03-03 11:03:11`
 */
type GroundPcApiCardOrderSignPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-order/sign',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [期限卡\/次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/72600) 的 **请求配置**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/sign`
 * @更新时间 `2023-03-03 11:03:11`
 */
const groundPcApiCardOrderSignPostRequestConfig: GroundPcApiCardOrderSignPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_29,
    devUrl: devUrl_0_2_0_29,
    prodUrl: prodUrl_0_2_0_29,
    path: '/ground-pc-api/card-order/sign',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_29,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderSignPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [期限卡\/次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/72600) 的 **请求函数**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/sign`
 * @更新时间 `2023-03-03 11:03:11`
 */
export const groundPcApiCardOrderSignPost = /*#__PURE__*/ (
  requestData: GroundPcApiCardOrderSignPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderSignPostResponse>(
    prepare(groundPcApiCardOrderSignPostRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardOrderSignPost.requestConfig =
  groundPcApiCardOrderSignPostRequestConfig;

/**
 * 接口 [预览合同↗](https://yapi.huianrong.com/project/1764/interface/api/72602) 的 **请求类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/viewContract/{orderId}`
 * @更新时间 `2023-03-03 11:03:12`
 */
export interface GroundPcApiCardOrderViewContractOrderIdGetRequest {
  orderId: string;
}

/**
 * 接口 [预览合同↗](https://yapi.huianrong.com/project/1764/interface/api/72602) 的 **返回类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/viewContract/{orderId}`
 * @更新时间 `2023-03-03 11:03:12`
 */
export interface GroundPcApiCardOrderViewContractOrderIdGetResponse {
  /**
   * 订单id
   */
  orderId?: number;
  /**
   * 合同类型 1期限卡合同  2次卡合同
   */
  contractType?: number;
  /**
   * 合同编号
   */
  contractCode?: string;
  /**
   * 购卡人姓名
   */
  membersName?: string;
  /**
   * 购卡人手机号
   */
  membersPhone?: string;
  /**
   * 购卡人身份证号
   */
  membersIdCardNo?: string;
  /**
   * 销售人员姓名
   */
  salesStaffName?: string;
  /**
   * 购买天数
   */
  purchaseDays?: number;
  /**
   * 赠送天数（天）
   */
  giveDay?: number;
  /**
   * 允许冻结天数
   */
  allowFreezeDay?: number;
  /**
   * 合计天数
   */
  totalDays?: number;
  /**
   * 购买次数
   */
  purchaseTimes?: number;
  /**
   * 赠送次数（次）
   */
  giveTimes?: number;
  /**
   * 合计次数
   */
  totalTimes?: number;
  /**
   * 售价
   */
  sellingPrice?: number;
  /**
   * 支付类别  1微信  2支付宝  3储值卡
   */
  payMethodType?: number;
  /**
   * 收款金额(实收金额)
   */
  receivedAmount?: number;
  /**
   * 应收金额
   */
  receivableAmount?: number;
  /**
   * 合同总金额
   */
  totalAmount?: number;
  /**
   * 购买时间
   */
  purchaseTime?: string;
  /**
   * 操作员
   */
  operator?: string;
  /**
   * 激活方式 1购买激活 2第一次到店激活 3指定日期激活
   */
  activeType?: number;
  /**
   * 激活时间  方式为指定激活时，该值就是设置的指定激活日期
   */
  activeTime?: string;
  /**
   * 支持店铺
   */
  supportStores?: string;
  /**
   * 支持场馆
   */
  supportStadium?: string;
  /**
   * 期限卡是否支持转让，0、不支持1、支持
   */
  allowTransferType?: number;
  /**
   * 转让价格,支持转让的卡使用
   */
  transferPrice?: number;
  /**
   * 合同备注
   */
  contractRemark?: string;
  /**
   * 合同章程
   */
  contractArticles?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 打印类型 1 一式两联 2 一式三联
   */
  printType?: number;
}

/**
 * 接口 [预览合同↗](https://yapi.huianrong.com/project/1764/interface/api/72602) 的 **请求配置的类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/viewContract/{orderId}`
 * @更新时间 `2023-03-03 11:03:12`
 */
type GroundPcApiCardOrderViewContractOrderIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-order/viewContract/{orderId}',
    'data',
    'orderId',
    string,
    false
  >
>;

/**
 * 接口 [预览合同↗](https://yapi.huianrong.com/project/1764/interface/api/72602) 的 **请求配置**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/viewContract/{orderId}`
 * @更新时间 `2023-03-03 11:03:12`
 */
const groundPcApiCardOrderViewContractOrderIdGetRequestConfig: GroundPcApiCardOrderViewContractOrderIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_29,
    devUrl: devUrl_0_2_0_29,
    prodUrl: prodUrl_0_2_0_29,
    path: '/ground-pc-api/card-order/viewContract/{orderId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_29,
    paramNames: ['orderId'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderViewContractOrderIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [预览合同↗](https://yapi.huianrong.com/project/1764/interface/api/72602) 的 **请求函数**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/viewContract/{orderId}`
 * @更新时间 `2023-03-03 11:03:12`
 */
export const groundPcApiCardOrderViewContractOrderIdGet = /*#__PURE__*/ (
  requestData: GroundPcApiCardOrderViewContractOrderIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderViewContractOrderIdGetResponse>(
    prepare(
      groundPcApiCardOrderViewContractOrderIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiCardOrderViewContractOrderIdGet.requestConfig =
  groundPcApiCardOrderViewContractOrderIdGetRequestConfig;

/**
 * 接口 [校验物理卡号是否已存在↗](https://yapi.huianrong.com/project/1764/interface/api/72604) 的 **请求类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/check-physicalNo/{physicalNo}`
 * @更新时间 `2023-03-03 11:03:12`
 */
export interface GroundPcApiCardOrderCheckPhysicalNoPhysicalNoPostRequest {
  physicalNo: string;
}

/**
 * 接口 [校验物理卡号是否已存在↗](https://yapi.huianrong.com/project/1764/interface/api/72604) 的 **返回类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/check-physicalNo/{physicalNo}`
 * @更新时间 `2023-03-03 11:03:12`
 */
export type GroundPcApiCardOrderCheckPhysicalNoPhysicalNoPostResponse = string;

/**
 * 接口 [校验物理卡号是否已存在↗](https://yapi.huianrong.com/project/1764/interface/api/72604) 的 **请求配置的类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/check-physicalNo/{physicalNo}`
 * @更新时间 `2023-03-03 11:03:12`
 */
type GroundPcApiCardOrderCheckPhysicalNoPhysicalNoPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-order/check-physicalNo/{physicalNo}',
    'data',
    'physicalNo',
    string,
    false
  >
>;

/**
 * 接口 [校验物理卡号是否已存在↗](https://yapi.huianrong.com/project/1764/interface/api/72604) 的 **请求配置**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/check-physicalNo/{physicalNo}`
 * @更新时间 `2023-03-03 11:03:12`
 */
const groundPcApiCardOrderCheckPhysicalNoPhysicalNoPostRequestConfig: GroundPcApiCardOrderCheckPhysicalNoPhysicalNoPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_29,
    devUrl: devUrl_0_2_0_29,
    prodUrl: prodUrl_0_2_0_29,
    path: '/ground-pc-api/card-order/check-physicalNo/{physicalNo}',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.none,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_29,
    paramNames: ['physicalNo'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderCheckPhysicalNoPhysicalNoPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [校验物理卡号是否已存在↗](https://yapi.huianrong.com/project/1764/interface/api/72604) 的 **请求函数**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/check-physicalNo/{physicalNo}`
 * @更新时间 `2023-03-03 11:03:12`
 */
export const groundPcApiCardOrderCheckPhysicalNoPhysicalNoPost = /*#__PURE__*/ (
  requestData: GroundPcApiCardOrderCheckPhysicalNoPhysicalNoPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderCheckPhysicalNoPhysicalNoPostResponse>(
    prepare(
      groundPcApiCardOrderCheckPhysicalNoPhysicalNoPostRequestConfig,
      requestData
    ),
    ...args
  );
};

groundPcApiCardOrderCheckPhysicalNoPhysicalNoPost.requestConfig =
  groundPcApiCardOrderCheckPhysicalNoPhysicalNoPostRequestConfig;

/**
 * 接口 [根据手机号获取会员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72606) 的 **请求类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/check-member/{phone}`
 * @更新时间 `2023-03-03 11:03:12`
 */
export interface GroundPcApiCardOrderCheckMemberPhonePostRequest {
  phone: string;
}

/**
 * 接口 [根据手机号获取会员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72606) 的 **返回类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/check-member/{phone}`
 * @更新时间 `2023-03-03 11:03:12`
 */
export interface GroundPcApiCardOrderCheckMemberPhonePostResponse {
  /**
   * 数据id
   */
  id?: number;
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
   * 身份证
   */
  identityNo?: string;
}

/**
 * 接口 [根据手机号获取会员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72606) 的 **请求配置的类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/check-member/{phone}`
 * @更新时间 `2023-03-03 11:03:12`
 */
type GroundPcApiCardOrderCheckMemberPhonePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-order/check-member/{phone}',
    'data',
    'phone',
    string,
    false
  >
>;

/**
 * 接口 [根据手机号获取会员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72606) 的 **请求配置**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/check-member/{phone}`
 * @更新时间 `2023-03-03 11:03:12`
 */
const groundPcApiCardOrderCheckMemberPhonePostRequestConfig: GroundPcApiCardOrderCheckMemberPhonePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_29,
    devUrl: devUrl_0_2_0_29,
    prodUrl: prodUrl_0_2_0_29,
    path: '/ground-pc-api/card-order/check-member/{phone}',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.none,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_29,
    paramNames: ['phone'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderCheckMemberPhonePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [根据手机号获取会员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72606) 的 **请求函数**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `POST /ground-pc-api/card-order/check-member/{phone}`
 * @更新时间 `2023-03-03 11:03:12`
 */
export const groundPcApiCardOrderCheckMemberPhonePost = /*#__PURE__*/ (
  requestData: GroundPcApiCardOrderCheckMemberPhonePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderCheckMemberPhonePostResponse>(
    prepare(groundPcApiCardOrderCheckMemberPhonePostRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardOrderCheckMemberPhonePost.requestConfig =
  groundPcApiCardOrderCheckMemberPhonePostRequestConfig;

/**
 * 接口 [获取支付方式↗](https://yapi.huianrong.com/project/1764/interface/api/72608) 的 **请求类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/getPayType`
 * @更新时间 `2023-03-03 11:03:13`
 */
export interface GroundPcApiCardOrderGetPayTypeGetRequest {}

/**
 * 接口 [获取支付方式↗](https://yapi.huianrong.com/project/1764/interface/api/72608) 的 **返回类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/getPayType`
 * @更新时间 `2023-03-03 11:03:13`
 */
export type GroundPcApiCardOrderGetPayTypeGetResponse = {
  value?: number;
  label?: string;
}[];

/**
 * 接口 [获取支付方式↗](https://yapi.huianrong.com/project/1764/interface/api/72608) 的 **请求配置的类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/getPayType`
 * @更新时间 `2023-03-03 11:03:13`
 */
type GroundPcApiCardOrderGetPayTypeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-order/getPayType',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [获取支付方式↗](https://yapi.huianrong.com/project/1764/interface/api/72608) 的 **请求配置**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/getPayType`
 * @更新时间 `2023-03-03 11:03:13`
 */
const groundPcApiCardOrderGetPayTypeGetRequestConfig: GroundPcApiCardOrderGetPayTypeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_29,
    devUrl: devUrl_0_2_0_29,
    prodUrl: prodUrl_0_2_0_29,
    path: '/ground-pc-api/card-order/getPayType',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_29,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderGetPayTypeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取支付方式↗](https://yapi.huianrong.com/project/1764/interface/api/72608) 的 **请求函数**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/getPayType`
 * @更新时间 `2023-03-03 11:03:13`
 */
export const groundPcApiCardOrderGetPayTypeGet = /*#__PURE__*/ (
  requestData?: GroundPcApiCardOrderGetPayTypeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderGetPayTypeGetResponse>(
    prepare(groundPcApiCardOrderGetPayTypeGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardOrderGetPayTypeGet.requestConfig =
  groundPcApiCardOrderGetPayTypeGetRequestConfig;

/**
 * 接口 [获取销售人员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72610) 的 **请求类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/getSalesStaffInfo`
 * @更新时间 `2023-03-03 11:03:13`
 */
export interface GroundPcApiCardOrderGetSalesStaffInfoGetRequest {
  /**
   * 项目编号
   */
  projectId?: string;
  /**
   * 店铺编号
   */
  storeId?: string;
}

/**
 * 接口 [获取销售人员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72610) 的 **返回类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/getSalesStaffInfo`
 * @更新时间 `2023-03-03 11:03:13`
 */
export type GroundPcApiCardOrderGetSalesStaffInfoGetResponse = {
  /**
   * 员工编号
   */
  staffId?: number;
  /**
   * 员工姓名
   */
  staffName?: string;
}[];

/**
 * 接口 [获取销售人员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72610) 的 **请求配置的类型**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/getSalesStaffInfo`
 * @更新时间 `2023-03-03 11:03:13`
 */
type GroundPcApiCardOrderGetSalesStaffInfoGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1764',
    '',
    '',
    '/ground-pc-api/card-order/getSalesStaffInfo',
    'data',
    string,
    'projectId' | 'storeId',
    false
  >
>;

/**
 * 接口 [获取销售人员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72610) 的 **请求配置**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/getSalesStaffInfo`
 * @更新时间 `2023-03-03 11:03:13`
 */
const groundPcApiCardOrderGetSalesStaffInfoGetRequestConfig: GroundPcApiCardOrderGetSalesStaffInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_2_0_29,
    devUrl: devUrl_0_2_0_29,
    prodUrl: prodUrl_0_2_0_29,
    path: '/ground-pc-api/card-order/getSalesStaffInfo',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_2_0_29,
    paramNames: [],
    queryNames: ['projectId', 'storeId'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'groundPcApiCardOrderGetSalesStaffInfoGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取销售人员信息↗](https://yapi.huianrong.com/project/1764/interface/api/72610) 的 **请求函数**
 *
 * @分类 [期限卡次卡签单↗](https://yapi.huianrong.com/project/1764/interface/api/cat_23231)
 * @请求头 `GET /ground-pc-api/card-order/getSalesStaffInfo`
 * @更新时间 `2023-03-03 11:03:13`
 */
export const groundPcApiCardOrderGetSalesStaffInfoGet = /*#__PURE__*/ (
  requestData: GroundPcApiCardOrderGetSalesStaffInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<GroundPcApiCardOrderGetSalesStaffInfoGetResponse>(
    prepare(groundPcApiCardOrderGetSalesStaffInfoGetRequestConfig, requestData),
    ...args
  );
};

groundPcApiCardOrderGetSalesStaffInfoGet.requestConfig =
  groundPcApiCardOrderGetSalesStaffInfoGetRequestConfig;

/* prettier-ignore-end */
