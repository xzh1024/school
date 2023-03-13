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

const mockUrl_0_0_0_0 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_0 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_0 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_0 = "data" as any;

/**
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68364) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectFormat`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCommonSelectFormatGetRequest {
  /**
   * 父ID，为空返回1级
   */
  parentId: string;
}

/**
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68364) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectFormat`
 * @更新时间 `2022-11-09 14:19:07`
 */
export type CbdApiAppletCommonSelectFormatGetResponse = {
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
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68364) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectFormat`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCommonSelectFormatGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/common/selectFormat",
    "data",
    string,
    "parentId",
    false
  >
>;

/**
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68364) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectFormat`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCommonSelectFormatGetRequestConfig: CbdApiAppletCommonSelectFormatGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_0,
    devUrl: devUrl_0_0_0_0,
    prodUrl: prodUrl_0_0_0_0,
    path: "/cbd-api-applet/common/selectFormat",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_0,
    paramNames: [],
    queryNames: ["parentId"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCommonSelectFormatGet",
    extraInfo: {}
  };

/**
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68364) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectFormat`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCommonSelectFormatGet = /*#__PURE__*/ (
  requestData: CbdApiAppletCommonSelectFormatGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCommonSelectFormatGetResponse>(
    prepare(cbdApiAppletCommonSelectFormatGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCommonSelectFormatGet.requestConfig =
  cbdApiAppletCommonSelectFormatGetRequestConfig;

/**
 * 接口 [商品分类下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68366) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectProductClassify`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCommonSelectProductClassifyGetRequest {
  /**
   * 父ID，为空返回1级
   */
  parentId: string;
}

/**
 * 接口 [商品分类下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68366) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectProductClassify`
 * @更新时间 `2022-11-09 14:19:07`
 */
export type CbdApiAppletCommonSelectProductClassifyGetResponse = {
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
 * 接口 [商品分类下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68366) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectProductClassify`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCommonSelectProductClassifyGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/common/selectProductClassify",
    "data",
    string,
    "parentId",
    false
  >
>;

/**
 * 接口 [商品分类下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68366) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectProductClassify`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCommonSelectProductClassifyGetRequestConfig: CbdApiAppletCommonSelectProductClassifyGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_0,
    devUrl: devUrl_0_0_0_0,
    prodUrl: prodUrl_0_0_0_0,
    path: "/cbd-api-applet/common/selectProductClassify",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_0,
    paramNames: [],
    queryNames: ["parentId"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCommonSelectProductClassifyGet",
    extraInfo: {}
  };

/**
 * 接口 [商品分类下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68366) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectProductClassify`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCommonSelectProductClassifyGet = /*#__PURE__*/ (
  requestData: CbdApiAppletCommonSelectProductClassifyGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCommonSelectProductClassifyGetResponse>(
    prepare(
      cbdApiAppletCommonSelectProductClassifyGetRequestConfig,
      requestData
    ),
    ...args
  );
};

cbdApiAppletCommonSelectProductClassifyGet.requestConfig =
  cbdApiAppletCommonSelectProductClassifyGetRequestConfig;

/**
 * 接口 [场馆分类下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68368) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectVenueClassify`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCommonSelectVenueClassifyGetRequest {}

/**
 * 接口 [场馆分类下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68368) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectVenueClassify`
 * @更新时间 `2022-11-09 14:19:07`
 */
export type CbdApiAppletCommonSelectVenueClassifyGetResponse = {
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
 * 接口 [场馆分类下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68368) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectVenueClassify`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCommonSelectVenueClassifyGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/common/selectVenueClassify",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [场馆分类下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68368) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectVenueClassify`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCommonSelectVenueClassifyGetRequestConfig: CbdApiAppletCommonSelectVenueClassifyGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_0,
    devUrl: devUrl_0_0_0_0,
    prodUrl: prodUrl_0_0_0_0,
    path: "/cbd-api-applet/common/selectVenueClassify",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCommonSelectVenueClassifyGet",
    extraInfo: {}
  };

/**
 * 接口 [场馆分类下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68368) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectVenueClassify`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCommonSelectVenueClassifyGet = /*#__PURE__*/ (
  requestData?: CbdApiAppletCommonSelectVenueClassifyGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCommonSelectVenueClassifyGetResponse>(
    prepare(cbdApiAppletCommonSelectVenueClassifyGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCommonSelectVenueClassifyGet.requestConfig =
  cbdApiAppletCommonSelectVenueClassifyGetRequestConfig;

/**
 * 接口 [活动类型下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68370) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectActivityType`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCommonSelectActivityTypeGetRequest {}

/**
 * 接口 [活动类型下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68370) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectActivityType`
 * @更新时间 `2022-11-09 14:19:07`
 */
export type CbdApiAppletCommonSelectActivityTypeGetResponse = {
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
 * 接口 [活动类型下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68370) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectActivityType`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCommonSelectActivityTypeGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/common/selectActivityType",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [活动类型下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68370) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectActivityType`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCommonSelectActivityTypeGetRequestConfig: CbdApiAppletCommonSelectActivityTypeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_0,
    devUrl: devUrl_0_0_0_0,
    prodUrl: prodUrl_0_0_0_0,
    path: "/cbd-api-applet/common/selectActivityType",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCommonSelectActivityTypeGet",
    extraInfo: {}
  };

/**
 * 接口 [活动类型下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68370) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/common/selectActivityType`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCommonSelectActivityTypeGet = /*#__PURE__*/ (
  requestData?: CbdApiAppletCommonSelectActivityTypeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCommonSelectActivityTypeGetResponse>(
    prepare(cbdApiAppletCommonSelectActivityTypeGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCommonSelectActivityTypeGet.requestConfig =
  cbdApiAppletCommonSelectActivityTypeGetRequestConfig;

/**
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1692/interface/api/72680) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/file-direct-upload/sign`
 * @更新时间 `2023-03-04 16:23:58`
 */
export interface CbdApiAppletFileDirectUploadSignGetRequest {}

/**
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1692/interface/api/72680) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/file-direct-upload/sign`
 * @更新时间 `2023-03-04 16:23:58`
 */
export interface CbdApiAppletFileDirectUploadSignGetResponse {
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
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1692/interface/api/72680) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/file-direct-upload/sign`
 * @更新时间 `2023-03-04 16:23:58`
 */
type CbdApiAppletFileDirectUploadSignGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/file-direct-upload/sign",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1692/interface/api/72680) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/file-direct-upload/sign`
 * @更新时间 `2023-03-04 16:23:58`
 */
const cbdApiAppletFileDirectUploadSignGetRequestConfig: CbdApiAppletFileDirectUploadSignGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_0,
    devUrl: devUrl_0_0_0_0,
    prodUrl: prodUrl_0_0_0_0,
    path: "/cbd-api-applet/file-direct-upload/sign",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletFileDirectUploadSignGet",
    extraInfo: {}
  };

/**
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1692/interface/api/72680) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `GET /cbd-api-applet/file-direct-upload/sign`
 * @更新时间 `2023-03-04 16:23:58`
 */
export const cbdApiAppletFileDirectUploadSignGet = /*#__PURE__*/ (
  requestData?: CbdApiAppletFileDirectUploadSignGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletFileDirectUploadSignGetResponse>(
    prepare(cbdApiAppletFileDirectUploadSignGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletFileDirectUploadSignGet.requestConfig =
  cbdApiAppletFileDirectUploadSignGetRequestConfig;

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1692/interface/api/72682) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `POST /cbd-api-applet/file-direct-upload/callback`
 * @更新时间 `2023-03-04 16:23:59`
 */
export interface CbdApiAppletFileDirectUploadCallbackPostRequest {}

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1692/interface/api/72682) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `POST /cbd-api-applet/file-direct-upload/callback`
 * @更新时间 `2023-03-04 16:23:59`
 */
export interface CbdApiAppletFileDirectUploadCallbackPostResponse {}

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1692/interface/api/72682) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `POST /cbd-api-applet/file-direct-upload/callback`
 * @更新时间 `2023-03-04 16:23:59`
 */
type CbdApiAppletFileDirectUploadCallbackPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/file-direct-upload/callback",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1692/interface/api/72682) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `POST /cbd-api-applet/file-direct-upload/callback`
 * @更新时间 `2023-03-04 16:23:59`
 */
const cbdApiAppletFileDirectUploadCallbackPostRequestConfig: CbdApiAppletFileDirectUploadCallbackPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_0,
    devUrl: devUrl_0_0_0_0,
    prodUrl: prodUrl_0_0_0_0,
    path: "/cbd-api-applet/file-direct-upload/callback",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletFileDirectUploadCallbackPost",
    extraInfo: {}
  };

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1692/interface/api/72682) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `POST /cbd-api-applet/file-direct-upload/callback`
 * @更新时间 `2023-03-04 16:23:59`
 */
export const cbdApiAppletFileDirectUploadCallbackPost = /*#__PURE__*/ (
  requestData?: CbdApiAppletFileDirectUploadCallbackPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletFileDirectUploadCallbackPostResponse>(
    prepare(cbdApiAppletFileDirectUploadCallbackPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletFileDirectUploadCallbackPost.requestConfig =
  cbdApiAppletFileDirectUploadCallbackPostRequestConfig;

/**
 * 接口 [获取Post消息体↗](https://yapi.huianrong.com/project/1692/interface/api/72684) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `POST /cbd-api-applet/file-direct-upload`
 * @更新时间 `2023-03-04 16:24:00`
 */
export interface CbdApiAppletFileDirectUploadPostRequest {
  /**
   * (int)
   */
  contentLen: string;
}

/**
 * 接口 [获取Post消息体↗](https://yapi.huianrong.com/project/1692/interface/api/72684) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `POST /cbd-api-applet/file-direct-upload`
 * @更新时间 `2023-03-04 16:24:00`
 */
export interface CbdApiAppletFileDirectUploadPostResponse {}

/**
 * 接口 [获取Post消息体↗](https://yapi.huianrong.com/project/1692/interface/api/72684) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `POST /cbd-api-applet/file-direct-upload`
 * @更新时间 `2023-03-04 16:24:00`
 */
type CbdApiAppletFileDirectUploadPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/file-direct-upload",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [获取Post消息体↗](https://yapi.huianrong.com/project/1692/interface/api/72684) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `POST /cbd-api-applet/file-direct-upload`
 * @更新时间 `2023-03-04 16:24:00`
 */
const cbdApiAppletFileDirectUploadPostRequestConfig: CbdApiAppletFileDirectUploadPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_0,
    devUrl: devUrl_0_0_0_0,
    prodUrl: prodUrl_0_0_0_0,
    path: "/cbd-api-applet/file-direct-upload",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.form,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletFileDirectUploadPost",
    extraInfo: {}
  };

/**
 * 接口 [获取Post消息体↗](https://yapi.huianrong.com/project/1692/interface/api/72684) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21939)
 * @请求头 `POST /cbd-api-applet/file-direct-upload`
 * @更新时间 `2023-03-04 16:24:00`
 */
export const cbdApiAppletFileDirectUploadPost = /*#__PURE__*/ (
  requestData: CbdApiAppletFileDirectUploadPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletFileDirectUploadPostResponse>(
    prepare(cbdApiAppletFileDirectUploadPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletFileDirectUploadPost.requestConfig =
  cbdApiAppletFileDirectUploadPostRequestConfig;

const mockUrl_0_0_0_1 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_1 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_1 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_1 = "data" as any;

/**
 * 接口 [保存小程序账户信息↗](https://yapi.huianrong.com/project/1692/interface/api/68372) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/saveInfo`
 * @更新时间 `2023-02-28 14:41:24`
 */
export interface CbdApiAppletUserSaveInfoPostRequest {
  /**
   * 用户登录凭证
   */
  code: string;
  /**
   * 原始数据字符串
   */
  signature?: string;
  /**
   * 校验用户信息字符串
   */
  rawData?: string;
  /**
   * 加密用户数据
   */
  encryptedData: string;
  /**
   * 加密算法的初始向量
   */
  iv: string;
}

/**
 * 接口 [保存小程序账户信息↗](https://yapi.huianrong.com/project/1692/interface/api/68372) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/saveInfo`
 * @更新时间 `2023-02-28 14:41:24`
 */
export interface CbdApiAppletUserSaveInfoPostResponse {
  /**
   * 响应码（200：成功，其他失败）
   */
  code: number;
  /**
   * 响应文本
   */
  msg: string;
}

/**
 * 接口 [保存小程序账户信息↗](https://yapi.huianrong.com/project/1692/interface/api/68372) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/saveInfo`
 * @更新时间 `2023-02-28 14:41:24`
 */
type CbdApiAppletUserSaveInfoPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/user/saveInfo",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [保存小程序账户信息↗](https://yapi.huianrong.com/project/1692/interface/api/68372) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/saveInfo`
 * @更新时间 `2023-02-28 14:41:24`
 */
const cbdApiAppletUserSaveInfoPostRequestConfig: CbdApiAppletUserSaveInfoPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_1,
    devUrl: devUrl_0_0_0_1,
    prodUrl: prodUrl_0_0_0_1,
    path: "/cbd-api-applet/user/saveInfo",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletUserSaveInfoPost",
    extraInfo: {}
  };

/**
 * 接口 [保存小程序账户信息↗](https://yapi.huianrong.com/project/1692/interface/api/68372) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/saveInfo`
 * @更新时间 `2023-02-28 14:41:24`
 */
export const cbdApiAppletUserSaveInfoPost = /*#__PURE__*/ (
  requestData: CbdApiAppletUserSaveInfoPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletUserSaveInfoPostResponse>(
    prepare(cbdApiAppletUserSaveInfoPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletUserSaveInfoPost.requestConfig =
  cbdApiAppletUserSaveInfoPostRequestConfig;

/**
 * 接口 [授权登录↗](https://yapi.huianrong.com/project/1692/interface/api/68374) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/login`
 * @更新时间 `2023-02-28 14:41:20`
 */
export interface CbdApiAppletUserLoginPostRequest {
  /**
   * 用户标志凭证
   */
  code: string;
}

/**
 * 接口 [授权登录↗](https://yapi.huianrong.com/project/1692/interface/api/68374) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/login`
 * @更新时间 `2023-02-28 14:41:20`
 */
export interface CbdApiAppletUserLoginPostResponse {
  /**
   * 用户token
   */
  token: string;
  /**
   * token过期时间
   */
  expire: number;
  /**
   * 客户id
   */
  clientId: number;
  /**
   * 登录ID
   */
  loginId: string;
}

/**
 * 接口 [授权登录↗](https://yapi.huianrong.com/project/1692/interface/api/68374) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/login`
 * @更新时间 `2023-02-28 14:41:20`
 */
type CbdApiAppletUserLoginPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/user/login",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [授权登录↗](https://yapi.huianrong.com/project/1692/interface/api/68374) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/login`
 * @更新时间 `2023-02-28 14:41:20`
 */
const cbdApiAppletUserLoginPostRequestConfig: CbdApiAppletUserLoginPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_1,
    devUrl: devUrl_0_0_0_1,
    prodUrl: prodUrl_0_0_0_1,
    path: "/cbd-api-applet/user/login",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletUserLoginPost",
    extraInfo: {}
  };

/**
 * 接口 [授权登录↗](https://yapi.huianrong.com/project/1692/interface/api/68374) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/login`
 * @更新时间 `2023-02-28 14:41:20`
 */
export const cbdApiAppletUserLoginPost = /*#__PURE__*/ (
  requestData: CbdApiAppletUserLoginPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletUserLoginPostResponse>(
    prepare(cbdApiAppletUserLoginPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletUserLoginPost.requestConfig =
  cbdApiAppletUserLoginPostRequestConfig;

/**
 * 接口 [查询登录用户信息↗](https://yapi.huianrong.com/project/1692/interface/api/68376) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `GET /cbd-api-applet/user/info`
 * @更新时间 `2023-02-28 14:41:26`
 */
export interface CbdApiAppletUserInfoGetRequest {}

/**
 * 接口 [查询登录用户信息↗](https://yapi.huianrong.com/project/1692/interface/api/68376) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `GET /cbd-api-applet/user/info`
 * @更新时间 `2023-02-28 14:41:26`
 */
export interface CbdApiAppletUserInfoGetResponse {
  /**
   * 客户id
   */
  clientId: number;
  /**
   * 会员id
   */
  id: number;
  /**
   * 用户编码
   */
  code: string;
  /**
   * 用户唯一标识
   */
  openId: string;
  /**
   * 用户昵称
   */
  nickName: string;
  /**
   * 用户头像
   */
  avatarUrl: string;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 是否更新用户头像昵称，0：未更新，1：已更新
   */
  editFlag?: number;
  /**
   * 用户头像文件编号
   */
  avatarCode: string;
}

/**
 * 接口 [查询登录用户信息↗](https://yapi.huianrong.com/project/1692/interface/api/68376) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `GET /cbd-api-applet/user/info`
 * @更新时间 `2023-02-28 14:41:26`
 */
type CbdApiAppletUserInfoGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/user/info",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [查询登录用户信息↗](https://yapi.huianrong.com/project/1692/interface/api/68376) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `GET /cbd-api-applet/user/info`
 * @更新时间 `2023-02-28 14:41:26`
 */
const cbdApiAppletUserInfoGetRequestConfig: CbdApiAppletUserInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_1,
    devUrl: devUrl_0_0_0_1,
    prodUrl: prodUrl_0_0_0_1,
    path: "/cbd-api-applet/user/info",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletUserInfoGet",
    extraInfo: {}
  };

/**
 * 接口 [查询登录用户信息↗](https://yapi.huianrong.com/project/1692/interface/api/68376) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `GET /cbd-api-applet/user/info`
 * @更新时间 `2023-02-28 14:41:26`
 */
export const cbdApiAppletUserInfoGet = /*#__PURE__*/ (
  requestData?: CbdApiAppletUserInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletUserInfoGetResponse>(
    prepare(cbdApiAppletUserInfoGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletUserInfoGet.requestConfig = cbdApiAppletUserInfoGetRequestConfig;

/**
 * 接口 [获取小程序手机号↗](https://yapi.huianrong.com/project/1692/interface/api/68378) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/getPhone`
 * @更新时间 `2023-02-28 14:41:24`
 */
export interface CbdApiAppletUserGetPhonePostRequest {
  /**
   * 用户标志凭证
   */
  code: string;
}

/**
 * 接口 [获取小程序手机号↗](https://yapi.huianrong.com/project/1692/interface/api/68378) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/getPhone`
 * @更新时间 `2023-02-28 14:41:24`
 */
export interface CbdApiAppletUserGetPhonePostResponse {
  /**
   * 手机号
   */
  phone: string;
  /**
   * 用户登录token
   */
  token: string;
}

/**
 * 接口 [获取小程序手机号↗](https://yapi.huianrong.com/project/1692/interface/api/68378) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/getPhone`
 * @更新时间 `2023-02-28 14:41:24`
 */
type CbdApiAppletUserGetPhonePostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/user/getPhone",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [获取小程序手机号↗](https://yapi.huianrong.com/project/1692/interface/api/68378) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/getPhone`
 * @更新时间 `2023-02-28 14:41:24`
 */
const cbdApiAppletUserGetPhonePostRequestConfig: CbdApiAppletUserGetPhonePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_1,
    devUrl: devUrl_0_0_0_1,
    prodUrl: prodUrl_0_0_0_1,
    path: "/cbd-api-applet/user/getPhone",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletUserGetPhonePost",
    extraInfo: {}
  };

/**
 * 接口 [获取小程序手机号↗](https://yapi.huianrong.com/project/1692/interface/api/68378) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/getPhone`
 * @更新时间 `2023-02-28 14:41:24`
 */
export const cbdApiAppletUserGetPhonePost = /*#__PURE__*/ (
  requestData: CbdApiAppletUserGetPhonePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletUserGetPhonePostResponse>(
    prepare(cbdApiAppletUserGetPhonePostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletUserGetPhonePost.requestConfig =
  cbdApiAppletUserGetPhonePostRequestConfig;

/**
 * 接口 [编辑用户昵称头像↗](https://yapi.huianrong.com/project/1692/interface/api/72394) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/editNickInfo`
 * @更新时间 `2023-02-28 14:41:25`
 */
export interface CbdApiAppletUserEditNickInfoPostRequest {
  /**
   * 用户昵称
   */
  nickName?: string;
  /**
   * 用户头像文件编号
   */
  avatarCode?: string;
}

/**
 * 接口 [编辑用户昵称头像↗](https://yapi.huianrong.com/project/1692/interface/api/72394) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/editNickInfo`
 * @更新时间 `2023-02-28 14:41:25`
 */
export interface CbdApiAppletUserEditNickInfoPostResponse {
  /**
   * 响应码（200：成功，其他失败）
   */
  code: number;
  /**
   * 响应文本
   */
  msg: string;
}

/**
 * 接口 [编辑用户昵称头像↗](https://yapi.huianrong.com/project/1692/interface/api/72394) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/editNickInfo`
 * @更新时间 `2023-02-28 14:41:25`
 */
type CbdApiAppletUserEditNickInfoPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/user/editNickInfo",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [编辑用户昵称头像↗](https://yapi.huianrong.com/project/1692/interface/api/72394) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/editNickInfo`
 * @更新时间 `2023-02-28 14:41:25`
 */
const cbdApiAppletUserEditNickInfoPostRequestConfig: CbdApiAppletUserEditNickInfoPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_1,
    devUrl: devUrl_0_0_0_1,
    prodUrl: prodUrl_0_0_0_1,
    path: "/cbd-api-applet/user/editNickInfo",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletUserEditNickInfoPost",
    extraInfo: {}
  };

/**
 * 接口 [编辑用户昵称头像↗](https://yapi.huianrong.com/project/1692/interface/api/72394) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/editNickInfo`
 * @更新时间 `2023-02-28 14:41:25`
 */
export const cbdApiAppletUserEditNickInfoPost = /*#__PURE__*/ (
  requestData: CbdApiAppletUserEditNickInfoPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletUserEditNickInfoPostResponse>(
    prepare(cbdApiAppletUserEditNickInfoPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletUserEditNickInfoPost.requestConfig =
  cbdApiAppletUserEditNickInfoPostRequestConfig;

/**
 * 接口 [鉴权↗](https://yapi.huianrong.com/project/1692/interface/api/72396) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/authenticationToken`
 * @更新时间 `2023-02-28 14:41:27`
 */
export interface CbdApiAppletUserAuthenticationTokenPostRequest {}

/**
 * 接口 [鉴权↗](https://yapi.huianrong.com/project/1692/interface/api/72396) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/authenticationToken`
 * @更新时间 `2023-02-28 14:41:27`
 */
export interface CbdApiAppletUserAuthenticationTokenPostResponse {
  /**
   * 客户id
   */
  clientId: number;
  /**
   * 会员id
   */
  id: number;
  /**
   * 用户编码
   */
  code: string;
  /**
   * 用户唯一标识
   */
  openId: string;
  /**
   * 用户昵称
   */
  nickName: string;
  /**
   * 用户头像
   */
  avatarUrl: string;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 是否更新用户头像昵称，0：未更新，1：已更新
   */
  editFlag?: number;
  /**
   * 用户头像文件编号
   */
  avatarCode: string;
}

/**
 * 接口 [鉴权↗](https://yapi.huianrong.com/project/1692/interface/api/72396) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/authenticationToken`
 * @更新时间 `2023-02-28 14:41:27`
 */
type CbdApiAppletUserAuthenticationTokenPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/user/authenticationToken",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [鉴权↗](https://yapi.huianrong.com/project/1692/interface/api/72396) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/authenticationToken`
 * @更新时间 `2023-02-28 14:41:27`
 */
const cbdApiAppletUserAuthenticationTokenPostRequestConfig: CbdApiAppletUserAuthenticationTokenPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_1,
    devUrl: devUrl_0_0_0_1,
    prodUrl: prodUrl_0_0_0_1,
    path: "/cbd-api-applet/user/authenticationToken",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletUserAuthenticationTokenPost",
    extraInfo: {}
  };

/**
 * 接口 [鉴权↗](https://yapi.huianrong.com/project/1692/interface/api/72396) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21941)
 * @请求头 `POST /cbd-api-applet/user/authenticationToken`
 * @更新时间 `2023-02-28 14:41:27`
 */
export const cbdApiAppletUserAuthenticationTokenPost = /*#__PURE__*/ (
  requestData?: CbdApiAppletUserAuthenticationTokenPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletUserAuthenticationTokenPostResponse>(
    prepare(cbdApiAppletUserAuthenticationTokenPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletUserAuthenticationTokenPost.requestConfig =
  cbdApiAppletUserAuthenticationTokenPostRequestConfig;

const mockUrl_0_0_0_2 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_2 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_2 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_2 = "data" as any;

/**
 * 接口 [唤起支付↗](https://yapi.huianrong.com/project/1692/interface/api/68380) 的 **请求类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-signup/call-pay/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivitySignupCallPayActivityIdGetRequest {
  /**
   * (Long)
   */
  activityId: string;
}

/**
 * 接口 [唤起支付↗](https://yapi.huianrong.com/project/1692/interface/api/68380) 的 **返回类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-signup/call-pay/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivitySignupCallPayActivityIdGetResponse {
  /**
   * 报名id
   */
  id?: number;
  /**
   * 活动id
   */
  activityId?: number;
  /**
   * 公众号id或小程序id(调起支付所需)
   */
  appid?: string;
  /**
   * busiCode为1005时才返回（调起支付所需）
   */
  partnerid?: string;
  /**
   * busiCode为1005时才返回（调起支付所需）
   */
  prepayid?: string;
  /**
   * 时间戳，自1970年1月1日0点0分0秒以来的秒数(调起支付所需)
   */
  timestamp?: string;
  /**
   * 随机字符串（调起支付所需）
   */
  noncestr?: string;
  /**
   * 数据包（调起支付所需）
   */
  dataPackage?: string;
  /**
   * 签名（调起支付所需）
   */
  paysign?: string;
  /**
   * 签名算法
   */
  signType?: string;
  /**
   * 支付系统业务流水号
   */
  serverRspNo: string;
}

/**
 * 接口 [唤起支付↗](https://yapi.huianrong.com/project/1692/interface/api/68380) 的 **请求配置的类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-signup/call-pay/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletActivitySignupCallPayActivityIdGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/activity-signup/call-pay/{activityId}",
    "data",
    "activityId",
    string,
    false
  >
>;

/**
 * 接口 [唤起支付↗](https://yapi.huianrong.com/project/1692/interface/api/68380) 的 **请求配置**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-signup/call-pay/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletActivitySignupCallPayActivityIdGetRequestConfig: CbdApiAppletActivitySignupCallPayActivityIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_2,
    devUrl: devUrl_0_0_0_2,
    prodUrl: prodUrl_0_0_0_2,
    path: "/cbd-api-applet/activity-signup/call-pay/{activityId}",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_2,
    paramNames: ["activityId"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletActivitySignupCallPayActivityIdGet",
    extraInfo: {}
  };

/**
 * 接口 [唤起支付↗](https://yapi.huianrong.com/project/1692/interface/api/68380) 的 **请求函数**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-signup/call-pay/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletActivitySignupCallPayActivityIdGet = /*#__PURE__*/ (
  requestData: CbdApiAppletActivitySignupCallPayActivityIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletActivitySignupCallPayActivityIdGetResponse>(
    prepare(
      cbdApiAppletActivitySignupCallPayActivityIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

cbdApiAppletActivitySignupCallPayActivityIdGet.requestConfig =
  cbdApiAppletActivitySignupCallPayActivityIdGetRequestConfig;

/**
 * 接口 [支付或者退款的状态↗](https://yapi.huianrong.com/project/1692/interface/api/68382) 的 **请求类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-signup/pay-refund-status/{id}/{type}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivitySignupPayRefundStatusIdTypeGetRequest {
  /**
   * (Long)
   */
  id: string;
  /**
   * (Integer)
   */
  type: string;
}

/**
 * 接口 [支付或者退款的状态↗](https://yapi.huianrong.com/project/1692/interface/api/68382) 的 **返回类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-signup/pay-refund-status/{id}/{type}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivitySignupPayRefundStatusIdTypeGetResponse {
  /**
   * 0为请求参数不对或者状态错误支付:1支付中2支付成功3支付失败退款:1退款中2退款成功3退款失败
   */
  status?: number;
  /**
   * 类型:1付款2退款
   */
  type?: number;
  /**
   * 报名费用:积分元
   */
  signupFee?: string;
  /**
   * 支付时间
   */
  payTime?: string;
}

/**
 * 接口 [支付或者退款的状态↗](https://yapi.huianrong.com/project/1692/interface/api/68382) 的 **请求配置的类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-signup/pay-refund-status/{id}/{type}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletActivitySignupPayRefundStatusIdTypeGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/activity-signup/pay-refund-status/{id}/{type}",
    "data",
    "id" | "type",
    string,
    false
  >
>;

/**
 * 接口 [支付或者退款的状态↗](https://yapi.huianrong.com/project/1692/interface/api/68382) 的 **请求配置**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-signup/pay-refund-status/{id}/{type}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletActivitySignupPayRefundStatusIdTypeGetRequestConfig: CbdApiAppletActivitySignupPayRefundStatusIdTypeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_2,
    devUrl: devUrl_0_0_0_2,
    prodUrl: prodUrl_0_0_0_2,
    path: "/cbd-api-applet/activity-signup/pay-refund-status/{id}/{type}",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_2,
    paramNames: ["id", "type"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletActivitySignupPayRefundStatusIdTypeGet",
    extraInfo: {}
  };

/**
 * 接口 [支付或者退款的状态↗](https://yapi.huianrong.com/project/1692/interface/api/68382) 的 **请求函数**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-signup/pay-refund-status/{id}/{type}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletActivitySignupPayRefundStatusIdTypeGet =
  /*#__PURE__*/ (
    requestData: CbdApiAppletActivitySignupPayRefundStatusIdTypeGetRequest,
    ...args: UserRequestRestArgs
  ) => {
    return request<CbdApiAppletActivitySignupPayRefundStatusIdTypeGetResponse>(
      prepare(
        cbdApiAppletActivitySignupPayRefundStatusIdTypeGetRequestConfig,
        requestData
      ),
      ...args
    );
  };

cbdApiAppletActivitySignupPayRefundStatusIdTypeGet.requestConfig =
  cbdApiAppletActivitySignupPayRefundStatusIdTypeGetRequestConfig;

/**
 * 接口 [活动列表↗](https://yapi.huianrong.com/project/1692/interface/api/68384) 的 **请求类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivityListGetRequest {
  /**
   * 活动类型id
   */
  activityTypeId: string;
  /**
   * 排序:1热度最高2最新发布3我的收藏4我已报名不传默认排序
   */
  sortKey: string;
  /**
   * 店铺id
   */
  storeId: string;
  /**
   * 活动名称
   */
  name: string;
  /**
   * 关键词搜索（活动名称）
   */
  keyWords: string;
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
 * 接口 [活动列表↗](https://yapi.huianrong.com/project/1692/interface/api/68384) 的 **返回类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivityListGetResponse {
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
     * 活动名称
     */
    name?: string;
    /**
     * 活动类型
     */
    activityType?: string;
    /**
     * 报名参与人数
     */
    signupNum?: number;
    /**
     * 封面图
     */
    coverPic?: string;
    /**
     * -1.作废1.等待预热2.预热中3.等待报名4.报名中5.等待活动开始6.活动中7.活动结束
     */
    status?: number;
    /**
     * 报名状态:0未报名1待付款2已报名3订单关闭4退款
     */
    signupStatus?: number;
    /**
     * 活动报名开始时间
     */
    signupStartTime?: number;
    /**
     * 活动报名截至时间
     */
    signupEndTime?: number;
    /**
     * 活动开始时间
     */
    activityStartTime?: number;
    /**
     * 活动截至时间
     */
    activityEndTime?: number;
  }[];
}

/**
 * 接口 [活动列表↗](https://yapi.huianrong.com/project/1692/interface/api/68384) 的 **请求配置的类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletActivityListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/activity/list",
    "data",
    string,
    | "activityTypeId"
    | "sortKey"
    | "storeId"
    | "name"
    | "keyWords"
    | "pageNum"
    | "pageSize",
    false
  >
>;

/**
 * 接口 [活动列表↗](https://yapi.huianrong.com/project/1692/interface/api/68384) 的 **请求配置**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletActivityListGetRequestConfig: CbdApiAppletActivityListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_2,
    devUrl: devUrl_0_0_0_2,
    prodUrl: prodUrl_0_0_0_2,
    path: "/cbd-api-applet/activity/list",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_2,
    paramNames: [],
    queryNames: [
      "activityTypeId",
      "sortKey",
      "storeId",
      "name",
      "keyWords",
      "pageNum",
      "pageSize"
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletActivityListGet",
    extraInfo: {}
  };

/**
 * 接口 [活动列表↗](https://yapi.huianrong.com/project/1692/interface/api/68384) 的 **请求函数**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletActivityListGet = /*#__PURE__*/ (
  requestData: CbdApiAppletActivityListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletActivityListGetResponse>(
    prepare(cbdApiAppletActivityListGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletActivityListGet.requestConfig =
  cbdApiAppletActivityListGetRequestConfig;

/**
 * 接口 [活动类型列表↗](https://yapi.huianrong.com/project/1692/interface/api/68386) 的 **请求类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-type/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivityTypeListGetRequest {}

/**
 * 接口 [活动类型列表↗](https://yapi.huianrong.com/project/1692/interface/api/68386) 的 **返回类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-type/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export type CbdApiAppletActivityTypeListGetResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 名字
   */
  name?: string;
  /**
   * 排序
   */
  sort?: number;
}[];

/**
 * 接口 [活动类型列表↗](https://yapi.huianrong.com/project/1692/interface/api/68386) 的 **请求配置的类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-type/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletActivityTypeListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/activity-type/list",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [活动类型列表↗](https://yapi.huianrong.com/project/1692/interface/api/68386) 的 **请求配置**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-type/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletActivityTypeListGetRequestConfig: CbdApiAppletActivityTypeListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_2,
    devUrl: devUrl_0_0_0_2,
    prodUrl: prodUrl_0_0_0_2,
    path: "/cbd-api-applet/activity-type/list",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_2,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletActivityTypeListGet",
    extraInfo: {}
  };

/**
 * 接口 [活动类型列表↗](https://yapi.huianrong.com/project/1692/interface/api/68386) 的 **请求函数**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity-type/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletActivityTypeListGet = /*#__PURE__*/ (
  requestData?: CbdApiAppletActivityTypeListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletActivityTypeListGetResponse>(
    prepare(cbdApiAppletActivityTypeListGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletActivityTypeListGet.requestConfig =
  cbdApiAppletActivityTypeListGetRequestConfig;

/**
 * 接口 [活动详情↗](https://yapi.huianrong.com/project/1692/interface/api/68388) 的 **请求类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/info/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivityInfoIdGetRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [活动详情↗](https://yapi.huianrong.com/project/1692/interface/api/68388) 的 **返回类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/info/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivityInfoIdGetResponse {
  /**
   * 活动信息 ,ActivityInfo
   */
  activityInfo?: {
    /**
     * id
     */
    id?: number;
    /**
     * 活动报名id
     */
    activitySignupId?: number;
    /**
     * 编号
     */
    code?: string;
    /**
     * 活动类型
     */
    activityType?: string;
    /**
     * 活动名称
     */
    name?: string;
    /**
     * 活动地点
     */
    address?: string;
    /**
     * 最大报名人数
     */
    maxSignupNum?: number;
    /**
     * 报名人数
     */
    signupNum?: number;
    /**
     * 支付方式:1.现金2.积分3.免费
     */
    payType?: number;
    /**
     * 报名费用:积分元
     */
    signupFee?: string;
    /**
     * 活动图 ,String
     */
    activityPic?: string[];
    /**
     * 活动详情
     */
    detail?: string;
    /**
     * 参与等级限制null或者空数组则没有限制 ,String
     */
    memberLevel?: string[];
    /**
     * -1.作废1.等待预热2.预热中3.等待报名4.报名中5.等待活动开始6.活动中7.活动结束
     */
    status?: number;
    /**
     * 报名限制:0无限制1会员等级不足2积分不足3活动报名人数已满
     */
    signupLimit?: number;
    /**
     * 报名状态:0未报名1待付款2已报名3订单关闭4退款
     */
    signupStatus?: number;
    cancelTime?: string;
    /**
     * 收藏true已收藏false未收藏
     */
    collect?: boolean;
  };
  /**
   * 活动店铺 ,ActivityStore
   */
  activityStore?: {
    /**
     * 店铺id
     */
    id?: number;
    /**
     * 举办方
     */
    name?: string;
  };
  /**
   * 活动时间 ,ActivityTime
   */
  activityTime?: {
    /**
     * 活动报名开始时间
     */
    signupStartTime?: number;
    /**
     * 活动报名截至时间
     */
    signupEndTime?: number;
    /**
     * 活动开始时间
     */
    activityStartTime?: number;
    /**
     * 活动截至时间
     */
    activityEndTime?: number;
  };
  /**
   * 支付信息 ,PayInfo
   */
  payInfo?: {
    /**
     * 支付单号
     */
    payCode?: string;
    /**
     * 实付金额为空免费
     */
    payment?: string;
    /**
     * 报名时间
     */
    signupTime?: string;
    /**
     * 支付时间
     */
    payTime?: string;
  };
  /**
   * 入场码信息 ,CardInfo
   */
  cardInfo?: {
    /**
     * 入场码
     */
    cardCode?: string;
    /**
     * 卡卷状态:1.未使用2.已使用3.已过期4.已作废
     */
    cardStatus?: number;
  };
}

/**
 * 接口 [活动详情↗](https://yapi.huianrong.com/project/1692/interface/api/68388) 的 **请求配置的类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/info/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletActivityInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/activity/info/{id}",
    "data",
    "id",
    string,
    false
  >
>;

/**
 * 接口 [活动详情↗](https://yapi.huianrong.com/project/1692/interface/api/68388) 的 **请求配置**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/info/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletActivityInfoIdGetRequestConfig: CbdApiAppletActivityInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_2,
    devUrl: devUrl_0_0_0_2,
    prodUrl: prodUrl_0_0_0_2,
    path: "/cbd-api-applet/activity/info/{id}",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_2,
    paramNames: ["id"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletActivityInfoIdGet",
    extraInfo: {}
  };

/**
 * 接口 [活动详情↗](https://yapi.huianrong.com/project/1692/interface/api/68388) 的 **请求函数**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/info/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletActivityInfoIdGet = /*#__PURE__*/ (
  requestData: CbdApiAppletActivityInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletActivityInfoIdGetResponse>(
    prepare(cbdApiAppletActivityInfoIdGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletActivityInfoIdGet.requestConfig =
  cbdApiAppletActivityInfoIdGetRequestConfig;

/**
 * 接口 [现金报名参与↗](https://yapi.huianrong.com/project/1692/interface/api/68390) 的 **请求类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/cash-signup/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivitySignupCashSignupActivityIdPostRequest {
  /**
   * (Long)
   */
  activityId: string;
}

/**
 * 接口 [现金报名参与↗](https://yapi.huianrong.com/project/1692/interface/api/68390) 的 **返回类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/cash-signup/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivitySignupCashSignupActivityIdPostResponse {
  /**
   * 报名id
   */
  id?: number;
  /**
   * 活动id
   */
  activityId?: number;
  /**
   * 公众号id或小程序id(调起支付所需)
   */
  appid?: string;
  /**
   * busiCode为1005时才返回（调起支付所需）
   */
  partnerid?: string;
  /**
   * busiCode为1005时才返回（调起支付所需）
   */
  prepayid?: string;
  /**
   * 时间戳，自1970年1月1日0点0分0秒以来的秒数(调起支付所需)
   */
  timestamp?: string;
  /**
   * 随机字符串（调起支付所需）
   */
  noncestr?: string;
  /**
   * 数据包（调起支付所需）
   */
  dataPackage?: string;
  /**
   * 签名（调起支付所需）
   */
  paysign?: string;
  /**
   * 签名算法
   */
  signType?: string;
  /**
   * 支付系统业务流水号
   */
  serverRspNo: string;
}

/**
 * 接口 [现金报名参与↗](https://yapi.huianrong.com/project/1692/interface/api/68390) 的 **请求配置的类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/cash-signup/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletActivitySignupCashSignupActivityIdPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/activity-signup/cash-signup/{activityId}",
    "data",
    "activityId",
    string,
    false
  >
>;

/**
 * 接口 [现金报名参与↗](https://yapi.huianrong.com/project/1692/interface/api/68390) 的 **请求配置**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/cash-signup/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletActivitySignupCashSignupActivityIdPostRequestConfig: CbdApiAppletActivitySignupCashSignupActivityIdPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_2,
    devUrl: devUrl_0_0_0_2,
    prodUrl: prodUrl_0_0_0_2,
    path: "/cbd-api-applet/activity-signup/cash-signup/{activityId}",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_2,
    paramNames: ["activityId"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletActivitySignupCashSignupActivityIdPost",
    extraInfo: {}
  };

/**
 * 接口 [现金报名参与↗](https://yapi.huianrong.com/project/1692/interface/api/68390) 的 **请求函数**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/cash-signup/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletActivitySignupCashSignupActivityIdPost =
  /*#__PURE__*/ (
    requestData: CbdApiAppletActivitySignupCashSignupActivityIdPostRequest,
    ...args: UserRequestRestArgs
  ) => {
    return request<CbdApiAppletActivitySignupCashSignupActivityIdPostResponse>(
      prepare(
        cbdApiAppletActivitySignupCashSignupActivityIdPostRequestConfig,
        requestData
      ),
      ...args
    );
  };

cbdApiAppletActivitySignupCashSignupActivityIdPost.requestConfig =
  cbdApiAppletActivitySignupCashSignupActivityIdPostRequestConfig;

/**
 * 接口 [用户报名活动列表↗](https://yapi.huianrong.com/project/1692/interface/api/68392) 的 **请求类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/signup-list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivitySignupListGetRequest {
  /**
   * 状态:1待支付2未开始3进行中4已结束
   */
  status: string;
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
 * 接口 [用户报名活动列表↗](https://yapi.huianrong.com/project/1692/interface/api/68392) 的 **返回类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/signup-list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivitySignupListGetResponse {
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
     * 活动名称
     */
    name?: string;
    /**
     * 活动类型
     */
    activityType?: string;
    /**
     * 报名参与人数
     */
    signupNum?: number;
    /**
     * 封面图
     */
    coverPic?: string;
    /**
     * -1.作废1.等待预热2.预热中3.等待报名4.报名中5.等待活动开始6.活动中7.活动结束
     */
    status?: number;
    /**
     * 报名状态:0未报名1待付款2已报名3订单关闭4退款
     */
    signupStatus?: number;
    /**
     * 活动报名开始时间
     */
    signupStartTime?: number;
    /**
     * 活动报名截至时间
     */
    signupEndTime?: number;
    /**
     * 活动开始时间
     */
    activityStartTime?: number;
    /**
     * 活动截至时间
     */
    activityEndTime?: number;
  }[];
}

/**
 * 接口 [用户报名活动列表↗](https://yapi.huianrong.com/project/1692/interface/api/68392) 的 **请求配置的类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/signup-list`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletActivitySignupListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/activity/signup-list",
    "data",
    string,
    "status" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [用户报名活动列表↗](https://yapi.huianrong.com/project/1692/interface/api/68392) 的 **请求配置**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/signup-list`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletActivitySignupListGetRequestConfig: CbdApiAppletActivitySignupListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_2,
    devUrl: devUrl_0_0_0_2,
    prodUrl: prodUrl_0_0_0_2,
    path: "/cbd-api-applet/activity/signup-list",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_2,
    paramNames: [],
    queryNames: ["status", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletActivitySignupListGet",
    extraInfo: {}
  };

/**
 * 接口 [用户报名活动列表↗](https://yapi.huianrong.com/project/1692/interface/api/68392) 的 **请求函数**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `GET /cbd-api-applet/activity/signup-list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletActivitySignupListGet = /*#__PURE__*/ (
  requestData: CbdApiAppletActivitySignupListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletActivitySignupListGetResponse>(
    prepare(cbdApiAppletActivitySignupListGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletActivitySignupListGet.requestConfig =
  cbdApiAppletActivitySignupListGetRequestConfig;

/**
 * 接口 [积分\/免费报名参与↗](https://yapi.huianrong.com/project/1692/interface/api/68394) 的 **请求类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/integral-signup/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivitySignupIntegralSignupActivityIdPostRequest {
  /**
   * (Long)
   */
  activityId: string;
}

/**
 * 接口 [积分\/免费报名参与↗](https://yapi.huianrong.com/project/1692/interface/api/68394) 的 **返回类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/integral-signup/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivitySignupIntegralSignupActivityIdPostResponse {
  /**
   * 响应码（200：成功，其他失败）
   */
  code: number;
  /**
   * 响应文本
   */
  msg: string;
}

/**
 * 接口 [积分\/免费报名参与↗](https://yapi.huianrong.com/project/1692/interface/api/68394) 的 **请求配置的类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/integral-signup/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletActivitySignupIntegralSignupActivityIdPostRequestConfig =
  Readonly<
    RequestConfig<
      "https://yapi.huianrong.com/mock/1692",
      "http://192.168.50.12:8082",
      "https://cbd.t-cube.cn",
      "/cbd-api-applet/activity-signup/integral-signup/{activityId}",
      "data",
      "activityId",
      string,
      false
    >
  >;

/**
 * 接口 [积分\/免费报名参与↗](https://yapi.huianrong.com/project/1692/interface/api/68394) 的 **请求配置**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/integral-signup/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletActivitySignupIntegralSignupActivityIdPostRequestConfig: CbdApiAppletActivitySignupIntegralSignupActivityIdPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_2,
    devUrl: devUrl_0_0_0_2,
    prodUrl: prodUrl_0_0_0_2,
    path: "/cbd-api-applet/activity-signup/integral-signup/{activityId}",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_2,
    paramNames: ["activityId"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName:
      "cbdApiAppletActivitySignupIntegralSignupActivityIdPost",
    extraInfo: {}
  };

/**
 * 接口 [积分\/免费报名参与↗](https://yapi.huianrong.com/project/1692/interface/api/68394) 的 **请求函数**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/integral-signup/{activityId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletActivitySignupIntegralSignupActivityIdPost =
  /*#__PURE__*/ (
    requestData: CbdApiAppletActivitySignupIntegralSignupActivityIdPostRequest,
    ...args: UserRequestRestArgs
  ) => {
    return request<CbdApiAppletActivitySignupIntegralSignupActivityIdPostResponse>(
      prepare(
        cbdApiAppletActivitySignupIntegralSignupActivityIdPostRequestConfig,
        requestData
      ),
      ...args
    );
  };

cbdApiAppletActivitySignupIntegralSignupActivityIdPost.requestConfig =
  cbdApiAppletActivitySignupIntegralSignupActivityIdPostRequestConfig;

/**
 * 接口 [退款↗](https://yapi.huianrong.com/project/1692/interface/api/68396) 的 **请求类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/refund/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivitySignupRefundIdPostRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [退款↗](https://yapi.huianrong.com/project/1692/interface/api/68396) 的 **返回类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/refund/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivitySignupRefundIdPostResponse {
  /**
   * 响应码（200：成功，其他失败）
   */
  code: number;
  /**
   * 响应文本
   */
  msg: string;
}

/**
 * 接口 [退款↗](https://yapi.huianrong.com/project/1692/interface/api/68396) 的 **请求配置的类型**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/refund/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletActivitySignupRefundIdPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/activity-signup/refund/{id}",
    "data",
    "id",
    string,
    false
  >
>;

/**
 * 接口 [退款↗](https://yapi.huianrong.com/project/1692/interface/api/68396) 的 **请求配置**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/refund/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletActivitySignupRefundIdPostRequestConfig: CbdApiAppletActivitySignupRefundIdPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_2,
    devUrl: devUrl_0_0_0_2,
    prodUrl: prodUrl_0_0_0_2,
    path: "/cbd-api-applet/activity-signup/refund/{id}",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_2,
    paramNames: ["id"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletActivitySignupRefundIdPost",
    extraInfo: {}
  };

/**
 * 接口 [退款↗](https://yapi.huianrong.com/project/1692/interface/api/68396) 的 **请求函数**
 *
 * @分类 [活动↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21943)
 * @请求头 `POST /cbd-api-applet/activity-signup/refund/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletActivitySignupRefundIdPost = /*#__PURE__*/ (
  requestData: CbdApiAppletActivitySignupRefundIdPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletActivitySignupRefundIdPostResponse>(
    prepare(cbdApiAppletActivitySignupRefundIdPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletActivitySignupRefundIdPost.requestConfig =
  cbdApiAppletActivitySignupRefundIdPostRequestConfig;

const mockUrl_0_0_0_3 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_3 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_3 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_3 = "data" as any;

/**
 * 接口 [优惠券列表↗](https://yapi.huianrong.com/project/1692/interface/api/68398) 的 **请求类型**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21945)
 * @请求头 `GET /cbd-api-applet/coupon/couponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCouponCouponListGetRequest {
  /**
   * 优惠券类型1：满减券；2：折扣券；3：礼品券；4：积分现金券5、商家福利6、品类券
   */
  type: string;
  /**
   * 业态id品类券必传
   */
  sceneId: string;
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
 * 接口 [优惠券列表↗](https://yapi.huianrong.com/project/1692/interface/api/68398) 的 **返回类型**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21945)
 * @请求头 `GET /cbd-api-applet/coupon/couponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCouponCouponListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 优惠券id
     */
    id: number;
    /**
     * 会员优惠券码
     */
    code?: string;
    /**
     * 优惠券类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
     */
    type: number;
    /**
     * 优惠券名称
     */
    name: string;
    /**
     * 使用说明
     */
    instruction?: string;
    /**
     * 开始时间eg：yyyy-MM-ddHH:mm:ss
     */
    startTime: string;
    /**
     * 到期时间eg：yyyy-MM-ddHH:mm:ss
     */
    expireTime: string;
    /**
     * 剩余数量
     */
    quantity?: number;
    /**
     * 使用门槛
     */
    thresholdAmount: number;
    /**
     * 优惠
     */
    discount?: string;
    /**
     * 积分
     */
    integral?: number;
    /**
     * 是否已领取true:是，false:否
     */
    received?: boolean;
    /**
     * 已领取优惠券状态(0-未使用；1-已使用；2-已过期)
     */
    status?: number;
    /**
     * 领取人限制 ,Recipient
     */
    recipient?: {
      /**
       * 类型1.不限制，所有人可领取，2.指定会员等级或该等级以上可领取
       */
      type?: number;
      /**
       * 会员等级 ,String
       */
      memberLevel?: string[];
    };
    /**
     * 每人限领次数 ,PerPerson
     */
    perPerson?: {
      /**
       * 类型：1:限领次数，2:每人每天限领次数
       */
      type?: number;
      /**
       * 次数
       */
      number?: number;
    };
  }[];
}

/**
 * 接口 [优惠券列表↗](https://yapi.huianrong.com/project/1692/interface/api/68398) 的 **请求配置的类型**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21945)
 * @请求头 `GET /cbd-api-applet/coupon/couponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCouponCouponListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/coupon/couponList",
    "data",
    string,
    "type" | "sceneId" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [优惠券列表↗](https://yapi.huianrong.com/project/1692/interface/api/68398) 的 **请求配置**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21945)
 * @请求头 `GET /cbd-api-applet/coupon/couponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCouponCouponListGetRequestConfig: CbdApiAppletCouponCouponListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_3,
    devUrl: devUrl_0_0_0_3,
    prodUrl: prodUrl_0_0_0_3,
    path: "/cbd-api-applet/coupon/couponList",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_3,
    paramNames: [],
    queryNames: ["type", "sceneId", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCouponCouponListGet",
    extraInfo: {}
  };

/**
 * 接口 [优惠券列表↗](https://yapi.huianrong.com/project/1692/interface/api/68398) 的 **请求函数**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21945)
 * @请求头 `GET /cbd-api-applet/coupon/couponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCouponCouponListGet = /*#__PURE__*/ (
  requestData: CbdApiAppletCouponCouponListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCouponCouponListGetResponse>(
    prepare(cbdApiAppletCouponCouponListGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCouponCouponListGet.requestConfig =
  cbdApiAppletCouponCouponListGetRequestConfig;

const mockUrl_0_0_0_4 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_4 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_4 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_4 = "data" as any;

/**
 * 接口 [品类卷↗](https://yapi.huianrong.com/project/1692/interface/api/68400) 的 **请求类型**
 *
 * @分类 [热门↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21947)
 * @请求头 `GET /cbd-api-applet/hot/hot-format`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletHotHotFormatGetRequest {}

/**
 * 接口 [品类卷↗](https://yapi.huianrong.com/project/1692/interface/api/68400) 的 **返回类型**
 *
 * @分类 [热门↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21947)
 * @请求头 `GET /cbd-api-applet/hot/hot-format`
 * @更新时间 `2022-11-09 14:19:07`
 */
export type CbdApiAppletHotHotFormatGetResponse = {
  /**
   * 业态id
   */
  formatId?: number;
  /**
   * 业态名字
   */
  formatName?: string;
  /**
   * 业态图片
   */
  pic?: string;
}[];

/**
 * 接口 [品类卷↗](https://yapi.huianrong.com/project/1692/interface/api/68400) 的 **请求配置的类型**
 *
 * @分类 [热门↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21947)
 * @请求头 `GET /cbd-api-applet/hot/hot-format`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletHotHotFormatGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/hot/hot-format",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [品类卷↗](https://yapi.huianrong.com/project/1692/interface/api/68400) 的 **请求配置**
 *
 * @分类 [热门↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21947)
 * @请求头 `GET /cbd-api-applet/hot/hot-format`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletHotHotFormatGetRequestConfig: CbdApiAppletHotHotFormatGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_4,
    devUrl: devUrl_0_0_0_4,
    prodUrl: prodUrl_0_0_0_4,
    path: "/cbd-api-applet/hot/hot-format",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_4,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletHotHotFormatGet",
    extraInfo: {}
  };

/**
 * 接口 [品类卷↗](https://yapi.huianrong.com/project/1692/interface/api/68400) 的 **请求函数**
 *
 * @分类 [热门↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21947)
 * @请求头 `GET /cbd-api-applet/hot/hot-format`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletHotHotFormatGet = /*#__PURE__*/ (
  requestData?: CbdApiAppletHotHotFormatGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletHotHotFormatGetResponse>(
    prepare(cbdApiAppletHotHotFormatGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletHotHotFormatGet.requestConfig =
  cbdApiAppletHotHotFormatGetRequestConfig;

/**
 * 接口 [热门数据↗](https://yapi.huianrong.com/project/1692/interface/api/68402) 的 **请求类型**
 *
 * @分类 [热门↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21947)
 * @请求头 `GET /cbd-api-applet/hot/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletHotInfoGetRequest {}

/**
 * 接口 [热门数据↗](https://yapi.huianrong.com/project/1692/interface/api/68402) 的 **返回类型**
 *
 * @分类 [热门↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21947)
 * @请求头 `GET /cbd-api-applet/hot/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletHotInfoGetResponse {
  /**
   * 热门优惠 ,Discount
   */
  discount?: {
    /**
     * 名字
     */
    name?: string;
    /**
     * 状态:1启用2关闭
     */
    status?: number;
    /**
     * 内容 ,DiscountInfo
     */
    discountInfo?: {
      /**
       * 满减图片
       */
      fullPic?: string;
      /**
       * 折扣图片
       */
      discountPic?: string;
      /**
       * 礼品图片
       */
      giftPic?: string;
      /**
       * 积分现金图片
       */
      cashPic?: string;
    };
  };
  /**
   * 商家福利 ,Benefit
   */
  benefit?: {
    /**
     * 名字
     */
    name?: string;
    /**
     * 状态:1启用2关闭
     */
    status?: number;
    /**
     * 内容 ,BenefitInfo
     */
    benefitInfoList?: {
      /**
       * 优惠卷id
       */
      couponTemplateId?: number;
      /**
       * 优惠卷名字
       */
      couponTemplateName?: string;
      /**
       * 优惠券类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
       */
      couponTemplateType?: number;
      /**
       * 图片
       */
      pic?: string;
    }[];
  };
  /**
   * 品类卷 ,Format
   */
  format?: {
    /**
     * 名字
     */
    name?: string;
    /**
     * 状态:1启用2关闭
     */
    status?: number;
    /**
     * 内容 ,FormatInfo
     */
    formatInfoList?: {
      /**
       * 业态id
       */
      formatId?: number;
      /**
       * 业态名字
       */
      formatName?: string;
      /**
       * 业态图片
       */
      pic?: string;
    }[];
  };
}

/**
 * 接口 [热门数据↗](https://yapi.huianrong.com/project/1692/interface/api/68402) 的 **请求配置的类型**
 *
 * @分类 [热门↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21947)
 * @请求头 `GET /cbd-api-applet/hot/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletHotInfoGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/hot/info",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [热门数据↗](https://yapi.huianrong.com/project/1692/interface/api/68402) 的 **请求配置**
 *
 * @分类 [热门↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21947)
 * @请求头 `GET /cbd-api-applet/hot/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletHotInfoGetRequestConfig: CbdApiAppletHotInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_4,
    devUrl: devUrl_0_0_0_4,
    prodUrl: prodUrl_0_0_0_4,
    path: "/cbd-api-applet/hot/info",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_4,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletHotInfoGet",
    extraInfo: {}
  };

/**
 * 接口 [热门数据↗](https://yapi.huianrong.com/project/1692/interface/api/68402) 的 **请求函数**
 *
 * @分类 [热门↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21947)
 * @请求头 `GET /cbd-api-applet/hot/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletHotInfoGet = /*#__PURE__*/ (
  requestData?: CbdApiAppletHotInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletHotInfoGetResponse>(
    prepare(cbdApiAppletHotInfoGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletHotInfoGet.requestConfig = cbdApiAppletHotInfoGetRequestConfig;

const mockUrl_0_0_0_5 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_5 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_5 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_5 = "data" as any;

/**
 * 接口 [banner列表↗](https://yapi.huianrong.com/project/1692/interface/api/68404) 的 **请求类型**
 *
 * @分类 [banner↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21949)
 * @请求头 `GET /cbd-api-applet/banner/list/{type}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletBannerListTypeGetRequest {
  /**
   * 所属类型1热门活动页  2优质商家页 3个人中心(Integer)
   */
  type: string;
}

/**
 * 接口 [banner列表↗](https://yapi.huianrong.com/project/1692/interface/api/68404) 的 **返回类型**
 *
 * @分类 [banner↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21949)
 * @请求头 `GET /cbd-api-applet/banner/list/{type}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export type CbdApiAppletBannerListTypeGetResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 所属类型:1热门活动页2优质商家页3个人中心
   */
  type?: number;
  /**
   * 封面图
   */
  coverPic?: string;
  /**
   * 详情类型:1店铺2活动
   */
  detailType?: number;
  /**
   * 详情指向id
   */
  detailId?: number;
}[];

/**
 * 接口 [banner列表↗](https://yapi.huianrong.com/project/1692/interface/api/68404) 的 **请求配置的类型**
 *
 * @分类 [banner↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21949)
 * @请求头 `GET /cbd-api-applet/banner/list/{type}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletBannerListTypeGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/banner/list/{type}",
    "data",
    "type",
    string,
    false
  >
>;

/**
 * 接口 [banner列表↗](https://yapi.huianrong.com/project/1692/interface/api/68404) 的 **请求配置**
 *
 * @分类 [banner↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21949)
 * @请求头 `GET /cbd-api-applet/banner/list/{type}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletBannerListTypeGetRequestConfig: CbdApiAppletBannerListTypeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_5,
    devUrl: devUrl_0_0_0_5,
    prodUrl: prodUrl_0_0_0_5,
    path: "/cbd-api-applet/banner/list/{type}",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_5,
    paramNames: ["type"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletBannerListTypeGet",
    extraInfo: {}
  };

/**
 * 接口 [banner列表↗](https://yapi.huianrong.com/project/1692/interface/api/68404) 的 **请求函数**
 *
 * @分类 [banner↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21949)
 * @请求头 `GET /cbd-api-applet/banner/list/{type}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletBannerListTypeGet = /*#__PURE__*/ (
  requestData: CbdApiAppletBannerListTypeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletBannerListTypeGetResponse>(
    prepare(cbdApiAppletBannerListTypeGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletBannerListTypeGet.requestConfig =
  cbdApiAppletBannerListTypeGetRequestConfig;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1692/interface/api/68406) 的 **请求类型**
 *
 * @分类 [banner↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21949)
 * @请求头 `GET /cbd-api-applet/banner/info/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletBannerInfoIdGetRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1692/interface/api/68406) 的 **返回类型**
 *
 * @分类 [banner↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21949)
 * @请求头 `GET /cbd-api-applet/banner/info/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletBannerInfoIdGetResponse {
  /**
   * id
   */
  id?: number;
  /**
   * 所属类型:1热门活动页2优质商家页3个人中心
   */
  type?: number;
  /**
   * banner名字
   */
  name?: string;
  /**
   * 封面图
   */
  coverPic?: string;
  /**
   * 详情类型:1店铺2商品
   */
  detailType?: number;
  /**
   * 详情指向id
   */
  detailId?: number;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1692/interface/api/68406) 的 **请求配置的类型**
 *
 * @分类 [banner↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21949)
 * @请求头 `GET /cbd-api-applet/banner/info/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletBannerInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/banner/info/{id}",
    "data",
    "id",
    string,
    false
  >
>;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1692/interface/api/68406) 的 **请求配置**
 *
 * @分类 [banner↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21949)
 * @请求头 `GET /cbd-api-applet/banner/info/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletBannerInfoIdGetRequestConfig: CbdApiAppletBannerInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_5,
    devUrl: devUrl_0_0_0_5,
    prodUrl: prodUrl_0_0_0_5,
    path: "/cbd-api-applet/banner/info/{id}",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_5,
    paramNames: ["id"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletBannerInfoIdGet",
    extraInfo: {}
  };

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1692/interface/api/68406) 的 **请求函数**
 *
 * @分类 [banner↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21949)
 * @请求头 `GET /cbd-api-applet/banner/info/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletBannerInfoIdGet = /*#__PURE__*/ (
  requestData: CbdApiAppletBannerInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletBannerInfoIdGetResponse>(
    prepare(cbdApiAppletBannerInfoIdGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletBannerInfoIdGet.requestConfig =
  cbdApiAppletBannerInfoIdGetRequestConfig;

const mockUrl_0_0_0_6 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_6 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_6 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_6 = "data" as any;

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1692/interface/api/68408) 的 **请求类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/list`
 * @更新时间 `2023-03-03 11:32:15`
 */
export interface CbdApiAppletOrderListGetRequest {
  /**
   * 订单状态（-1已取消0待付款1待使用2退款中3已退款10已发货11已完成）
   */
  orderStatus: string;
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
 * 接口 [列表↗](https://yapi.huianrong.com/project/1692/interface/api/68408) 的 **返回类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/list`
 * @更新时间 `2023-03-03 11:32:15`
 */
export interface CbdApiAppletOrderListGetResponse {
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
     * 1：商品订单，2：场馆订单
     */
    orderType?: number;
    /**
     * 店铺ID
     */
    storeId?: number;
    /**
     * 店铺名称
     */
    storeName?: string;
    /**
     * 场馆名称(orderType=2时使用)
     */
    venueName?: string;
    /**
     * 下单时间
     */
    createTime?: string;
    /**
     * 商品信息 ,PrdOrderInfo
     */
    prdList?: {
      /**
       * 商品ID
       */
      prdId?: number;
      /**
       * 场地ID
       */
      venueId?: number;
      /**
       * 场地名称
       */
      venueName?: string;
      /**
       * 商品名称
       */
      prdName?: string;
      /**
       * 商品规则值描述
       */
      prdSpecNames?: string;
      /**
       * 商品图片
       */
      prdPic?: string;
      /**
       * 商品数量
       */
      prdNum?: number;
    }[];
    /**
     * 商品数量
     */
    prdNum?: number;
    /**
     * 合计金额
     */
    payAmt?: number;
    /**
     * 订单状态（-1已取消0待付款1待使用2退款中3已退款10已发货11已完成）
     */
    orderStatus?: number;
  }[];
}

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1692/interface/api/68408) 的 **请求配置的类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/list`
 * @更新时间 `2023-03-03 11:32:15`
 */
type CbdApiAppletOrderListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/list",
    "data",
    string,
    "orderStatus" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1692/interface/api/68408) 的 **请求配置**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/list`
 * @更新时间 `2023-03-03 11:32:15`
 */
const cbdApiAppletOrderListGetRequestConfig: CbdApiAppletOrderListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_6,
    devUrl: devUrl_0_0_0_6,
    prodUrl: prodUrl_0_0_0_6,
    path: "/cbd-api-applet/order/list",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_6,
    paramNames: [],
    queryNames: ["orderStatus", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderListGet",
    extraInfo: {}
  };

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1692/interface/api/68408) 的 **请求函数**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/list`
 * @更新时间 `2023-03-03 11:32:15`
 */
export const cbdApiAppletOrderListGet = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderListGetResponse>(
    prepare(cbdApiAppletOrderListGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderListGet.requestConfig = cbdApiAppletOrderListGetRequestConfig;

/**
 * 接口 [去付款↗](https://yapi.huianrong.com/project/1692/interface/api/68410) 的 **请求类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/pay`
 * @更新时间 `2023-03-03 11:32:16`
 */
export interface CbdApiAppletOrderPayGetRequest {
  /**
   * 订单(流水)编号(String)
   */
  orderNo: string;
  /**
   * 1、重新支付，2、订单支付(Byte)
   */
  type: string;
}

/**
 * 接口 [去付款↗](https://yapi.huianrong.com/project/1692/interface/api/68410) 的 **返回类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/pay`
 * @更新时间 `2023-03-03 11:32:16`
 */
export interface CbdApiAppletOrderPayGetResponse {
  /**
   * 支付系统业务流水号(查询支付结果使用)
   */
  serverRspNo: string;
  /**
   * 订单编号
   */
  orderNo?: string;
  /**
   * 公众号id或小程序id(调起支付所需)
   */
  appid?: string;
  /**
   * busiCode为1005时才返回（调起支付所需）
   */
  partnerid?: string;
  /**
   * busiCode为1005时才返回（调起支付所需）
   */
  prepayid?: string;
  /**
   * 时间戳，自1970年1月1日0点0分0秒以来的秒数(调起支付所需)
   */
  timestamp?: string;
  /**
   * 随机字符串（调起支付所需）
   */
  noncestr?: string;
  /**
   * 数据包（调起支付所需）
   */
  dataPackage?: string;
  /**
   * 签名（调起支付所需）
   */
  paysign?: string;
  /**
   * 签名算法
   */
  signType?: string;
}

/**
 * 接口 [去付款↗](https://yapi.huianrong.com/project/1692/interface/api/68410) 的 **请求配置的类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/pay`
 * @更新时间 `2023-03-03 11:32:16`
 */
type CbdApiAppletOrderPayGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/pay",
    "data",
    string,
    "orderNo" | "type",
    false
  >
>;

/**
 * 接口 [去付款↗](https://yapi.huianrong.com/project/1692/interface/api/68410) 的 **请求配置**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/pay`
 * @更新时间 `2023-03-03 11:32:16`
 */
const cbdApiAppletOrderPayGetRequestConfig: CbdApiAppletOrderPayGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_6,
    devUrl: devUrl_0_0_0_6,
    prodUrl: prodUrl_0_0_0_6,
    path: "/cbd-api-applet/order/pay",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_6,
    paramNames: [],
    queryNames: ["orderNo", "type"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderPayGet",
    extraInfo: {}
  };

/**
 * 接口 [去付款↗](https://yapi.huianrong.com/project/1692/interface/api/68410) 的 **请求函数**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/pay`
 * @更新时间 `2023-03-03 11:32:16`
 */
export const cbdApiAppletOrderPayGet = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderPayGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderPayGetResponse>(
    prepare(cbdApiAppletOrderPayGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderPayGet.requestConfig = cbdApiAppletOrderPayGetRequestConfig;

/**
 * 接口 [取消订单↗](https://yapi.huianrong.com/project/1692/interface/api/68412) 的 **请求类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/cancel`
 * @更新时间 `2023-03-03 11:32:17`
 */
export interface CbdApiAppletOrderCancelGetRequest {
  /**
   * 订单编号(String)
   */
  orderNo: string;
}

/**
 * 接口 [取消订单↗](https://yapi.huianrong.com/project/1692/interface/api/68412) 的 **返回类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/cancel`
 * @更新时间 `2023-03-03 11:32:17`
 */
export interface CbdApiAppletOrderCancelGetResponse {
  /**
   * 响应码（200：成功，其他失败）
   */
  code: number;
  /**
   * 响应文本
   */
  msg: string;
}

/**
 * 接口 [取消订单↗](https://yapi.huianrong.com/project/1692/interface/api/68412) 的 **请求配置的类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/cancel`
 * @更新时间 `2023-03-03 11:32:17`
 */
type CbdApiAppletOrderCancelGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/cancel",
    "data",
    string,
    "orderNo",
    false
  >
>;

/**
 * 接口 [取消订单↗](https://yapi.huianrong.com/project/1692/interface/api/68412) 的 **请求配置**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/cancel`
 * @更新时间 `2023-03-03 11:32:17`
 */
const cbdApiAppletOrderCancelGetRequestConfig: CbdApiAppletOrderCancelGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_6,
    devUrl: devUrl_0_0_0_6,
    prodUrl: prodUrl_0_0_0_6,
    path: "/cbd-api-applet/order/cancel",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_6,
    paramNames: [],
    queryNames: ["orderNo"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderCancelGet",
    extraInfo: {}
  };

/**
 * 接口 [取消订单↗](https://yapi.huianrong.com/project/1692/interface/api/68412) 的 **请求函数**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/cancel`
 * @更新时间 `2023-03-03 11:32:17`
 */
export const cbdApiAppletOrderCancelGet = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderCancelGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderCancelGetResponse>(
    prepare(cbdApiAppletOrderCancelGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderCancelGet.requestConfig =
  cbdApiAppletOrderCancelGetRequestConfig;

/**
 * 接口 [取消退款↗](https://yapi.huianrong.com/project/1692/interface/api/68414) 的 **请求类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/refund/cancel`
 * @更新时间 `2023-03-03 11:32:19`
 */
export interface CbdApiAppletOrderRefundCancelGetRequest {
  /**
   * 订单编号(String)
   */
  orderNo: string;
}

/**
 * 接口 [取消退款↗](https://yapi.huianrong.com/project/1692/interface/api/68414) 的 **返回类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/refund/cancel`
 * @更新时间 `2023-03-03 11:32:19`
 */
export interface CbdApiAppletOrderRefundCancelGetResponse {
  /**
   * 响应码（200：成功，其他失败）
   */
  code: number;
  /**
   * 响应文本
   */
  msg: string;
}

/**
 * 接口 [取消退款↗](https://yapi.huianrong.com/project/1692/interface/api/68414) 的 **请求配置的类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/refund/cancel`
 * @更新时间 `2023-03-03 11:32:19`
 */
type CbdApiAppletOrderRefundCancelGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/refund/cancel",
    "data",
    string,
    "orderNo",
    false
  >
>;

/**
 * 接口 [取消退款↗](https://yapi.huianrong.com/project/1692/interface/api/68414) 的 **请求配置**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/refund/cancel`
 * @更新时间 `2023-03-03 11:32:19`
 */
const cbdApiAppletOrderRefundCancelGetRequestConfig: CbdApiAppletOrderRefundCancelGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_6,
    devUrl: devUrl_0_0_0_6,
    prodUrl: prodUrl_0_0_0_6,
    path: "/cbd-api-applet/order/refund/cancel",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_6,
    paramNames: [],
    queryNames: ["orderNo"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderRefundCancelGet",
    extraInfo: {}
  };

/**
 * 接口 [取消退款↗](https://yapi.huianrong.com/project/1692/interface/api/68414) 的 **请求函数**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/refund/cancel`
 * @更新时间 `2023-03-03 11:32:19`
 */
export const cbdApiAppletOrderRefundCancelGet = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderRefundCancelGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderRefundCancelGetResponse>(
    prepare(cbdApiAppletOrderRefundCancelGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderRefundCancelGet.requestConfig =
  cbdApiAppletOrderRefundCancelGetRequestConfig;

/**
 * 接口 [申请退款↗](https://yapi.huianrong.com/project/1692/interface/api/68416) 的 **请求类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `POST /cbd-api-applet/order/refund`
 * @更新时间 `2023-03-03 11:32:18`
 */
export interface CbdApiAppletOrderRefundPostRequest {
  /**
   * 订单号
   */
  orderNo: string;
  /**
   * 退款原因
   */
  remark: string;
}

/**
 * 接口 [申请退款↗](https://yapi.huianrong.com/project/1692/interface/api/68416) 的 **返回类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `POST /cbd-api-applet/order/refund`
 * @更新时间 `2023-03-03 11:32:18`
 */
export interface CbdApiAppletOrderRefundPostResponse {
  /**
   * 订单号
   */
  orderNo: string;
}

/**
 * 接口 [申请退款↗](https://yapi.huianrong.com/project/1692/interface/api/68416) 的 **请求配置的类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `POST /cbd-api-applet/order/refund`
 * @更新时间 `2023-03-03 11:32:18`
 */
type CbdApiAppletOrderRefundPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/refund",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [申请退款↗](https://yapi.huianrong.com/project/1692/interface/api/68416) 的 **请求配置**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `POST /cbd-api-applet/order/refund`
 * @更新时间 `2023-03-03 11:32:18`
 */
const cbdApiAppletOrderRefundPostRequestConfig: CbdApiAppletOrderRefundPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_6,
    devUrl: devUrl_0_0_0_6,
    prodUrl: prodUrl_0_0_0_6,
    path: "/cbd-api-applet/order/refund",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_6,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderRefundPost",
    extraInfo: {}
  };

/**
 * 接口 [申请退款↗](https://yapi.huianrong.com/project/1692/interface/api/68416) 的 **请求函数**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `POST /cbd-api-applet/order/refund`
 * @更新时间 `2023-03-03 11:32:18`
 */
export const cbdApiAppletOrderRefundPost = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderRefundPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderRefundPostResponse>(
    prepare(cbdApiAppletOrderRefundPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderRefundPost.requestConfig =
  cbdApiAppletOrderRefundPostRequestConfig;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1692/interface/api/68418) 的 **请求类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/info`
 * @更新时间 `2023-03-03 11:32:16`
 */
export interface CbdApiAppletOrderInfoGetRequest {
  /**
   * 订单编号(String)
   */
  orderNo: string;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1692/interface/api/68418) 的 **返回类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/info`
 * @更新时间 `2023-03-03 11:32:16`
 */
export interface CbdApiAppletOrderInfoGetResponse {
  /**
   * 当订单未支付时订单关闭倒计毫秒
   */
  closeCountdown?: number;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺联系电话
   */
  linkTel?: string;
  /**
   * 订单号
   */
  orderNo?: string;
  /**
   * 核销码(随机串)
   */
  pickUpCode?: string;
  /**
   * 1：商品订单，2：场馆订单
   */
  orderType?: number;
  /**
   * 订单状态（-1已取消0待付款1待使用2退款中3已退款10已发货11已完成）
   */
  orderStatus?: number;
  /**
   * 商品小计
   */
  goodsTotalAmt?: number;
  /**
   * 优惠金额
   */
  discount?: number;
  /**
   * 订单总金额
   */
  orderTotalPrice?: number;
  /**
   * 实付金额
   */
  payAmt?: number;
  /**
   * 买家留言
   */
  buyerMsg?: string;
  /**
   * 下单时间
   */
  createTime?: string;
  /**
   * 付款时间
   */
  payTime?: string;
  /**
   * 支付单号
   */
  fundFlowNo?: string;
  /**
   * 确认收货时间
   */
  completeTime?: string;
  /**
   * 退款时间
   */
  refundTime?: string;
  /**
   * 退款单号
   */
  refundFlowNo?: string;
  /**
   * 取消时间
   */
  cancelTime?: string;
  /**
   * 商品列表 ,PrdOrderInfo
   */
  prdList: {
    /**
     * 商品ID
     */
    prdId?: number;
    /**
     * 场地ID
     */
    venueId?: number;
    /**
     * 场地名称
     */
    venueName?: string;
    /**
     * 商品名称
     */
    prdName?: string;
    /**
     * 商品规则值描述
     */
    prdSpecNames?: string;
    /**
     * 商品图片
     */
    prdPic?: string;
    /**
     * 商品数量
     */
    prdNum?: number;
    /**
     * 商品金额
     */
    prdTotalPrice?: number;
  }[];
  /**
   * 抵扣项 ,RespOrderDisctItemDto
   */
  disctItemList?: {
    /**
     * 优惠项值(member：会员折扣，coupon：优惠券，integral：积分抵扣，cashier：手动优惠)
     */
    name: string;
    /**
     * 优惠金额
     */
    amount: number;
  }[];
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1692/interface/api/68418) 的 **请求配置的类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/info`
 * @更新时间 `2023-03-03 11:32:16`
 */
type CbdApiAppletOrderInfoGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/info",
    "data",
    string,
    "orderNo",
    false
  >
>;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1692/interface/api/68418) 的 **请求配置**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/info`
 * @更新时间 `2023-03-03 11:32:16`
 */
const cbdApiAppletOrderInfoGetRequestConfig: CbdApiAppletOrderInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_6,
    devUrl: devUrl_0_0_0_6,
    prodUrl: prodUrl_0_0_0_6,
    path: "/cbd-api-applet/order/info",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_6,
    paramNames: [],
    queryNames: ["orderNo"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderInfoGet",
    extraInfo: {}
  };

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1692/interface/api/68418) 的 **请求函数**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/info`
 * @更新时间 `2023-03-03 11:32:16`
 */
export const cbdApiAppletOrderInfoGet = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderInfoGetResponse>(
    prepare(cbdApiAppletOrderInfoGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderInfoGet.requestConfig = cbdApiAppletOrderInfoGetRequestConfig;

/**
 * 接口 [重新支付↗](https://yapi.huianrong.com/project/1692/interface/api/72622) 的 **请求类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/retry/pay`
 * @更新时间 `2023-03-03 11:32:12`
 */
export interface CbdApiAppletOrderRetryPayGetRequest {
  /**
   * 订单(流水)编号(String)
   */
  orderNo: string;
  /**
   * 1、重新支付，2、订单支付(Byte)
   */
  type: string;
}

/**
 * 接口 [重新支付↗](https://yapi.huianrong.com/project/1692/interface/api/72622) 的 **返回类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/retry/pay`
 * @更新时间 `2023-03-03 11:32:12`
 */
export interface CbdApiAppletOrderRetryPayGetResponse {
  /**
   * 是否需要储值卡支付(1：是，默认0：否)
   */
  memberCard?: number;
  /**
   * 店铺ID
   */
  storeId?: number;
  /**
   * 场地ID
   */
  venueId?: number;
  /**
   * 订单流水号
   */
  serialNo?: string;
  /**
   * 订单号
   */
  orderNo?: string;
  payAmt?: number;
}

/**
 * 接口 [重新支付↗](https://yapi.huianrong.com/project/1692/interface/api/72622) 的 **请求配置的类型**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/retry/pay`
 * @更新时间 `2023-03-03 11:32:12`
 */
type CbdApiAppletOrderRetryPayGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/retry/pay",
    "data",
    string,
    "orderNo" | "type",
    false
  >
>;

/**
 * 接口 [重新支付↗](https://yapi.huianrong.com/project/1692/interface/api/72622) 的 **请求配置**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/retry/pay`
 * @更新时间 `2023-03-03 11:32:12`
 */
const cbdApiAppletOrderRetryPayGetRequestConfig: CbdApiAppletOrderRetryPayGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_6,
    devUrl: devUrl_0_0_0_6,
    prodUrl: prodUrl_0_0_0_6,
    path: "/cbd-api-applet/order/retry/pay",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_6,
    paramNames: [],
    queryNames: ["orderNo", "type"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderRetryPayGet",
    extraInfo: {}
  };

/**
 * 接口 [重新支付↗](https://yapi.huianrong.com/project/1692/interface/api/72622) 的 **请求函数**
 *
 * @分类 [我的订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21951)
 * @请求头 `GET /cbd-api-applet/order/retry/pay`
 * @更新时间 `2023-03-03 11:32:12`
 */
export const cbdApiAppletOrderRetryPayGet = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderRetryPayGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderRetryPayGetResponse>(
    prepare(cbdApiAppletOrderRetryPayGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderRetryPayGet.requestConfig =
  cbdApiAppletOrderRetryPayGetRequestConfig;

const mockUrl_0_0_0_7 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_7 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_7 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_7 = "data" as any;

/**
 * 接口 [店铺搜索↗](https://yapi.huianrong.com/project/1692/interface/api/68420) 的 **请求类型**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/store/search`
 * @更新时间 `2023-03-04 16:25:05`
 */
export interface CbdApiAppletStoreSearchGetRequest {
  /**
   * 关键词
   */
  searchKey: string;
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
 * 接口 [店铺搜索↗](https://yapi.huianrong.com/project/1692/interface/api/68420) 的 **返回类型**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/store/search`
 * @更新时间 `2023-03-04 16:25:05`
 */
export interface CbdApiAppletStoreSearchGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 店铺ID,冗余字段
     */
    storeId: number;
    /**
     * 店铺ID
     */
    id: number;
    /**
     * 店铺类型1自营2联营
     */
    type: number;
    /**
     * 店铺名称
     */
    name: string;
    /**
     * 业态ID
     */
    sceneId: number;
    /**
     * 业态 ,DictData
     */
    scene: {
      /**
       * id
       */
      id?: number;
      /**
       * 显示名称
       */
      name?: string;
    };
    /**
     * 月销量
     */
    monthSaleNum: number;
    /**
     * 推荐优惠列表 ,Coupon
     */
    recommendCoupons?: {
      /**
       * 优惠券ID
       */
      id?: number;
      /**
       * 名称
       */
      name: string;
      /**
       * 类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
       */
      type: number;
      /**
       * 是否有门槛0无1有
       */
      required: number;
    }[];
    /**
     * 推荐商品(包含商品与场馆) ,GoodData
     */
    recommendGoods?: {
      /**
       * 商品ID场馆ID
       */
      spuId: number;
      /**
       * 规格ID规格价格ID
       */
      skuId: number;
      /**
       * 类型1商品，2场馆
       */
      goodType: number;
      /**
       * 场馆sku类型1次卡2时段3包场
       */
      ruleType?: number;
      /**
       * 名称
       */
      name: string;
      /**
       * 封面附件
       */
      coverAttachment: string;
      /**
       * 划线价只有商品时才有
       */
      scribingPrice?: number;
      /**
       * 销售价
       */
      salePrice: number;
    }[];
    /**
     * 经营状态1营业中;2打烊;
     */
    operatingStatus: number;
    /**
     * 营业时间,打烊时为空
     */
    openTime?: string;
    /**
     * 店铺logo附件
     */
    logoAttachment?: string;
    /**
     * 特色服务 ,String
     */
    feature?: string[];
  }[];
}

/**
 * 接口 [店铺搜索↗](https://yapi.huianrong.com/project/1692/interface/api/68420) 的 **请求配置的类型**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/store/search`
 * @更新时间 `2023-03-04 16:25:05`
 */
type CbdApiAppletStoreSearchGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/store/search",
    "data",
    string,
    "searchKey" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [店铺搜索↗](https://yapi.huianrong.com/project/1692/interface/api/68420) 的 **请求配置**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/store/search`
 * @更新时间 `2023-03-04 16:25:05`
 */
const cbdApiAppletStoreSearchGetRequestConfig: CbdApiAppletStoreSearchGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_7,
    devUrl: devUrl_0_0_0_7,
    prodUrl: prodUrl_0_0_0_7,
    path: "/cbd-api-applet/store/search",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_7,
    paramNames: [],
    queryNames: ["searchKey", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletStoreSearchGet",
    extraInfo: {}
  };

/**
 * 接口 [店铺搜索↗](https://yapi.huianrong.com/project/1692/interface/api/68420) 的 **请求函数**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/store/search`
 * @更新时间 `2023-03-04 16:25:05`
 */
export const cbdApiAppletStoreSearchGet = /*#__PURE__*/ (
  requestData: CbdApiAppletStoreSearchGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletStoreSearchGetResponse>(
    prepare(cbdApiAppletStoreSearchGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletStoreSearchGet.requestConfig =
  cbdApiAppletStoreSearchGetRequestConfig;

/**
 * 接口 [活动搜索↗](https://yapi.huianrong.com/project/1692/interface/api/68422) 的 **请求类型**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/activity/search`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivitySearchGetRequest {
  /**
   * 关键词
   */
  searchKey: string;
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
 * 接口 [活动搜索↗](https://yapi.huianrong.com/project/1692/interface/api/68422) 的 **返回类型**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/activity/search`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletActivitySearchGetResponse {
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
     * 活动名称
     */
    name?: string;
    /**
     * 活动类型
     */
    activityType?: string;
    /**
     * 报名参与人数
     */
    signupNum?: number;
    /**
     * 封面图
     */
    coverPic?: string;
    /**
     * -1.作废1.等待预热2.预热中3.等待报名4.报名中5.等待活动开始6.活动中7.活动结束
     */
    status?: number;
    /**
     * 报名状态:0未报名1待付款2已报名3订单关闭4退款
     */
    signupStatus?: number;
    /**
     * 活动报名开始时间
     */
    signupStartTime?: number;
    /**
     * 活动报名截至时间
     */
    signupEndTime?: number;
    /**
     * 活动开始时间
     */
    activityStartTime?: number;
    /**
     * 活动截至时间
     */
    activityEndTime?: number;
  }[];
}

/**
 * 接口 [活动搜索↗](https://yapi.huianrong.com/project/1692/interface/api/68422) 的 **请求配置的类型**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/activity/search`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletActivitySearchGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/activity/search",
    "data",
    string,
    "searchKey" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [活动搜索↗](https://yapi.huianrong.com/project/1692/interface/api/68422) 的 **请求配置**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/activity/search`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletActivitySearchGetRequestConfig: CbdApiAppletActivitySearchGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_7,
    devUrl: devUrl_0_0_0_7,
    prodUrl: prodUrl_0_0_0_7,
    path: "/cbd-api-applet/activity/search",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_7,
    paramNames: [],
    queryNames: ["searchKey", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletActivitySearchGet",
    extraInfo: {}
  };

/**
 * 接口 [活动搜索↗](https://yapi.huianrong.com/project/1692/interface/api/68422) 的 **请求函数**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/activity/search`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletActivitySearchGet = /*#__PURE__*/ (
  requestData: CbdApiAppletActivitySearchGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletActivitySearchGetResponse>(
    prepare(cbdApiAppletActivitySearchGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletActivitySearchGet.requestConfig =
  cbdApiAppletActivitySearchGetRequestConfig;

/**
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68424) 的 **请求类型**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/project/selectProject`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletProjectSelectProjectGetRequest {
  /**
   * 经度推荐附近项目未实现
   */
  longitude: string;
  /**
   * 纬度推荐附近项目未实现
   */
  latitude: string;
}

/**
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68424) 的 **返回类型**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/project/selectProject`
 * @更新时间 `2022-11-09 14:19:07`
 */
export type CbdApiAppletProjectSelectProjectGetResponse = {
  /**
   * 地址
   */
  fullAddress?: string;
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
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68424) 的 **请求配置的类型**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/project/selectProject`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletProjectSelectProjectGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/project/selectProject",
    "data",
    string,
    "longitude" | "latitude",
    false
  >
>;

/**
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68424) 的 **请求配置**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/project/selectProject`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletProjectSelectProjectGetRequestConfig: CbdApiAppletProjectSelectProjectGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_7,
    devUrl: devUrl_0_0_0_7,
    prodUrl: prodUrl_0_0_0_7,
    path: "/cbd-api-applet/project/selectProject",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_7,
    paramNames: [],
    queryNames: ["longitude", "latitude"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletProjectSelectProjectGet",
    extraInfo: {}
  };

/**
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68424) 的 **请求函数**
 *
 * @分类 [T立方↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21953)
 * @请求头 `GET /cbd-api-applet/project/selectProject`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletProjectSelectProjectGet = /*#__PURE__*/ (
  requestData: CbdApiAppletProjectSelectProjectGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletProjectSelectProjectGetResponse>(
    prepare(cbdApiAppletProjectSelectProjectGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletProjectSelectProjectGet.requestConfig =
  cbdApiAppletProjectSelectProjectGetRequestConfig;

const mockUrl_0_0_0_9 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_9 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_9 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_9 = "data" as any;

/**
 * 接口 [场地详情↗](https://yapi.huianrong.com/project/1692/interface/api/68426) 的 **请求类型**
 *
 * @分类 [店铺场馆↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21957)
 * @请求头 `GET /cbd-api-applet/reserve/venue/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveVenueInfoGetRequest {
  /**
   * 场地id
   */
  venueId: string;
  /**
   * 预约类型1、次卡，2、时段，3、包场
   */
  ruleType: string;
  /**
   * 日期（年-月-日）（规则类型为时段包场时必传）
   */
  dayTimes: string;
}

/**
 * 接口 [场地详情↗](https://yapi.huianrong.com/project/1692/interface/api/68426) 的 **返回类型**
 *
 * @分类 [店铺场馆↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21957)
 * @请求头 `GET /cbd-api-applet/reserve/venue/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveVenueInfoGetResponse {
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 场地id
   */
  venueId?: number;
  /**
   * 场地名称
   */
  venueName?: string;
  /**
   * 场地图片 ,String
   */
  venuePics?: string[];
  /**
   * 场地分类
   */
  venueClassify?: string;
  /**
   * 月售
   */
  sales?: number;
  /**
   * 标题类型集合 ,TitleType
   */
  titleTypes?: {
    /**
     * 预约类型1、次卡，2、时段，3、包场
     */
    type?: number;
    /**
     * 标题
     */
    title?: string;
  }[];
  /**
   * 次卡、时段、包场周期 ,ReserveVenuePeriod
   */
  periods?: {
    /**
     * skuId(次卡id、时段id、场次id)
     */
    skuId?: number;
    /**
     * 标题（次卡一、时段一、场次一）
     */
    title?: string;
    /**
     * 划线价
     */
    scribingPrice?: number;
    /**
     * 销售价
     */
    salePrice?: number;
    /**
     * 开始时间（6:00）
     */
    startTime?: string;
    /**
     * 结束时间（12:00）
     */
    endTime?: string;
    /**
     * 星期（逗号分割）
     */
    week?: string;
    /**
     * 时间段（时-时,6:00-7:00） ,Times
     */
    timesList?: {
      /**
       * 预定状态1:未预定，2:已预定
       */
      state?: number;
      /**
       * 日期（年-月-日，2022-07-05）
       */
      dayTimes?: string;
      /**
       * 开始时间（时,6:00）
       */
      start?: string;
      /**
       * 结束时间（时,7:00）
       */
      end?: string;
    }[];
  }[];
}

/**
 * 接口 [场地详情↗](https://yapi.huianrong.com/project/1692/interface/api/68426) 的 **请求配置的类型**
 *
 * @分类 [店铺场馆↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21957)
 * @请求头 `GET /cbd-api-applet/reserve/venue/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletReserveVenueInfoGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/reserve/venue/info",
    "data",
    string,
    "venueId" | "ruleType" | "dayTimes",
    false
  >
>;

/**
 * 接口 [场地详情↗](https://yapi.huianrong.com/project/1692/interface/api/68426) 的 **请求配置**
 *
 * @分类 [店铺场馆↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21957)
 * @请求头 `GET /cbd-api-applet/reserve/venue/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletReserveVenueInfoGetRequestConfig: CbdApiAppletReserveVenueInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_9,
    devUrl: devUrl_0_0_0_9,
    prodUrl: prodUrl_0_0_0_9,
    path: "/cbd-api-applet/reserve/venue/info",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_9,
    paramNames: [],
    queryNames: ["venueId", "ruleType", "dayTimes"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletReserveVenueInfoGet",
    extraInfo: {}
  };

/**
 * 接口 [场地详情↗](https://yapi.huianrong.com/project/1692/interface/api/68426) 的 **请求函数**
 *
 * @分类 [店铺场馆↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21957)
 * @请求头 `GET /cbd-api-applet/reserve/venue/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletReserveVenueInfoGet = /*#__PURE__*/ (
  requestData: CbdApiAppletReserveVenueInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletReserveVenueInfoGetResponse>(
    prepare(cbdApiAppletReserveVenueInfoGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletReserveVenueInfoGet.requestConfig =
  cbdApiAppletReserveVenueInfoGetRequestConfig;

/**
 * 接口 [场馆预约列表↗](https://yapi.huianrong.com/project/1692/interface/api/68428) 的 **请求类型**
 *
 * @分类 [店铺场馆↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21957)
 * @请求头 `GET /cbd-api-applet/reserve/venue/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveVenueListGetRequest {
  /**
   * 店铺id
   */
  storeId: string;
  /**
   * 分类id
   */
  classifyId: string;
  /**
   * 关键词搜索（场馆名称or分类）
   */
  keyWords: string;
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
 * 接口 [场馆预约列表↗](https://yapi.huianrong.com/project/1692/interface/api/68428) 的 **返回类型**
 *
 * @分类 [店铺场馆↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21957)
 * @请求头 `GET /cbd-api-applet/reserve/venue/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveVenueListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 店铺id
     */
    storeId?: number;
    /**
     * 店铺名称
     */
    storeName?: string;
    /**
     * 场地id
     */
    venueId?: number;
    /**
     * 场地名称
     */
    venueName?: string;
    /**
     * 场地图片
     */
    venuePic?: string;
    /**
     * 场地分类
     */
    venueClassify?: string;
    /**
     * 月售
     */
    sales?: number;
    /**
     * 推荐商品列表 ,PriceRule
     */
    priceRules?: {
      /**
       * 预约类型1、次卡，2、时段，3、包场
       */
      ruleType?: number;
      /**
       * 标题
       */
      title?: string;
      /**
       * 划线价
       */
      scribingPrice?: number;
      /**
       * 销售价
       */
      salePrice?: number;
    }[];
  }[];
}

/**
 * 接口 [场馆预约列表↗](https://yapi.huianrong.com/project/1692/interface/api/68428) 的 **请求配置的类型**
 *
 * @分类 [店铺场馆↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21957)
 * @请求头 `GET /cbd-api-applet/reserve/venue/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletReserveVenueListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/reserve/venue/list",
    "data",
    string,
    "storeId" | "classifyId" | "keyWords" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [场馆预约列表↗](https://yapi.huianrong.com/project/1692/interface/api/68428) 的 **请求配置**
 *
 * @分类 [店铺场馆↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21957)
 * @请求头 `GET /cbd-api-applet/reserve/venue/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletReserveVenueListGetRequestConfig: CbdApiAppletReserveVenueListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_9,
    devUrl: devUrl_0_0_0_9,
    prodUrl: prodUrl_0_0_0_9,
    path: "/cbd-api-applet/reserve/venue/list",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_9,
    paramNames: [],
    queryNames: ["storeId", "classifyId", "keyWords", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletReserveVenueListGet",
    extraInfo: {}
  };

/**
 * 接口 [场馆预约列表↗](https://yapi.huianrong.com/project/1692/interface/api/68428) 的 **请求函数**
 *
 * @分类 [店铺场馆↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21957)
 * @请求头 `GET /cbd-api-applet/reserve/venue/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletReserveVenueListGet = /*#__PURE__*/ (
  requestData: CbdApiAppletReserveVenueListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletReserveVenueListGetResponse>(
    prepare(cbdApiAppletReserveVenueListGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletReserveVenueListGet.requestConfig =
  cbdApiAppletReserveVenueListGetRequestConfig;

const mockUrl_0_0_0_10 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_10 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_10 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_10 = "data" as any;

/**
 * 接口 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/68430) 的 **请求类型**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveStoreStoreIdGetRequest {
  /**
   * (Long)
   */
  storeId: string;
}

/**
 * 接口 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/68430) 的 **返回类型**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveStoreStoreIdGetResponse {
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺图片(限6张) ,String
   */
  storePics?: string[];
  /**
   * 店铺业态
   */
  storeFormat?: string;
  /**
   * 月售
   */
  sales?: number;
  /**
   * 经营状态1营业中;2打烊;
   */
  operatingStatus: number;
  /**
   * 营业时间
   */
  openTime?: string;
  /**
   * 优惠标签 ,couponTag
   */
  couponTag?: {
    /**
     * 优惠券类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
     */
    type?: number;
    /**
     * 优惠券标签
     */
    tag?: string;
  }[];
  /**
   * 特色服务 ,String
   */
  feature?: string[];
  /**
   * 门店地址
   */
  address?: string;
  /**
   * 客服电话
   */
  customerServiceTel?: string;
  /**
   * 经度
   */
  longitude?: number;
  /**
   * 纬度
   */
  latitude?: number;
  /**
   * 经营方向集合 ,BusinessScope
   */
  businessScopes?: {
    /**
     * 经营方向id
     */
    id?: number;
    /**
     * 类型1商品;2场馆预约;3优惠;4活动
     */
    type?: number;
    /**
     * 显示标题
     */
    title?: string;
    /**
     * 排序
     */
    orderNum?: number;
  }[];
  /**
   * 门店图片 ,ReserveStorePicResp
   */
  storePhotos?: {
    /**
     * 图片类型(全部,门头..)
     */
    type?: string;
    /**
     * 数量
     */
    num?: number;
    /**
     * 店铺图片 ,String
     */
    storePics?: string[];
  }[];
  /**
   * 是否收藏
   */
  collect?: boolean;
}

/**
 * 接口 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/68430) 的 **请求配置的类型**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletReserveStoreStoreIdGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/reserve/store/{storeId}",
    "data",
    "storeId",
    string,
    false
  >
>;

/**
 * 接口 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/68430) 的 **请求配置**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletReserveStoreStoreIdGetRequestConfig: CbdApiAppletReserveStoreStoreIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_10,
    devUrl: devUrl_0_0_0_10,
    prodUrl: prodUrl_0_0_0_10,
    path: "/cbd-api-applet/reserve/store/{storeId}",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_10,
    paramNames: ["storeId"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletReserveStoreStoreIdGet",
    extraInfo: {}
  };

/**
 * 接口 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/68430) 的 **请求函数**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletReserveStoreStoreIdGet = /*#__PURE__*/ (
  requestData: CbdApiAppletReserveStoreStoreIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletReserveStoreStoreIdGetResponse>(
    prepare(cbdApiAppletReserveStoreStoreIdGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletReserveStoreStoreIdGet.requestConfig =
  cbdApiAppletReserveStoreStoreIdGetRequestConfig;

/**
 * 接口 [店铺图片↗](https://yapi.huianrong.com/project/1692/interface/api/68432) 的 **请求类型**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/pic/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveStorePicStoreIdGetRequest {
  /**
   * (Long)
   */
  storeId: string;
}

/**
 * 接口 [店铺图片↗](https://yapi.huianrong.com/project/1692/interface/api/68432) 的 **返回类型**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/pic/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export type CbdApiAppletReserveStorePicStoreIdGetResponse = {
  /**
   * 图片类型(全部,门头..)
   */
  type?: string;
  /**
   * 数量
   */
  num?: number;
  /**
   * 店铺图片 ,String
   */
  storePics?: string[];
}[];

/**
 * 接口 [店铺图片↗](https://yapi.huianrong.com/project/1692/interface/api/68432) 的 **请求配置的类型**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/pic/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletReserveStorePicStoreIdGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/reserve/store/pic/{storeId}",
    "data",
    "storeId",
    string,
    false
  >
>;

/**
 * 接口 [店铺图片↗](https://yapi.huianrong.com/project/1692/interface/api/68432) 的 **请求配置**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/pic/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletReserveStorePicStoreIdGetRequestConfig: CbdApiAppletReserveStorePicStoreIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_10,
    devUrl: devUrl_0_0_0_10,
    prodUrl: prodUrl_0_0_0_10,
    path: "/cbd-api-applet/reserve/store/pic/{storeId}",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_10,
    paramNames: ["storeId"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletReserveStorePicStoreIdGet",
    extraInfo: {}
  };

/**
 * 接口 [店铺图片↗](https://yapi.huianrong.com/project/1692/interface/api/68432) 的 **请求函数**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/pic/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletReserveStorePicStoreIdGet = /*#__PURE__*/ (
  requestData: CbdApiAppletReserveStorePicStoreIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletReserveStorePicStoreIdGetResponse>(
    prepare(cbdApiAppletReserveStorePicStoreIdGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletReserveStorePicStoreIdGet.requestConfig =
  cbdApiAppletReserveStorePicStoreIdGetRequestConfig;

/**
 * 接口 [店铺详情↗](https://yapi.huianrong.com/project/1692/interface/api/68434) 的 **请求类型**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/info/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveStoreInfoStoreIdGetRequest {
  /**
   * (Long)
   */
  storeId: string;
}

/**
 * 接口 [店铺详情↗](https://yapi.huianrong.com/project/1692/interface/api/68434) 的 **返回类型**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/info/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveStoreInfoStoreIdGetResponse {
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 店铺业态
   */
  storeFormat?: string;
  /**
   * 经营状态1营业中;2打烊
   */
  operatingStatus?: number;
  /**
   * 营业时间
   */
  openTime?: string;
  /**
   * 特色服务 ,String
   */
  feature?: string[];
  /**
   * 门店地址
   */
  address?: string;
  /**
   * 客服电话
   */
  customerServiceTel?: string;
  /**
   * 经度
   */
  longitude?: number;
  /**
   * 纬度
   */
  latitude?: number;
}

/**
 * 接口 [店铺详情↗](https://yapi.huianrong.com/project/1692/interface/api/68434) 的 **请求配置的类型**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/info/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletReserveStoreInfoStoreIdGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/reserve/store/info/{storeId}",
    "data",
    "storeId",
    string,
    false
  >
>;

/**
 * 接口 [店铺详情↗](https://yapi.huianrong.com/project/1692/interface/api/68434) 的 **请求配置**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/info/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletReserveStoreInfoStoreIdGetRequestConfig: CbdApiAppletReserveStoreInfoStoreIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_10,
    devUrl: devUrl_0_0_0_10,
    prodUrl: prodUrl_0_0_0_10,
    path: "/cbd-api-applet/reserve/store/info/{storeId}",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_10,
    paramNames: ["storeId"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletReserveStoreInfoStoreIdGet",
    extraInfo: {}
  };

/**
 * 接口 [店铺详情↗](https://yapi.huianrong.com/project/1692/interface/api/68434) 的 **请求函数**
 *
 * @分类 [店铺信息↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21959)
 * @请求头 `GET /cbd-api-applet/reserve/store/info/{storeId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletReserveStoreInfoStoreIdGet = /*#__PURE__*/ (
  requestData: CbdApiAppletReserveStoreInfoStoreIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletReserveStoreInfoStoreIdGetResponse>(
    prepare(cbdApiAppletReserveStoreInfoStoreIdGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletReserveStoreInfoStoreIdGet.requestConfig =
  cbdApiAppletReserveStoreInfoStoreIdGetRequestConfig;

const mockUrl_0_0_0_11 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_11 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_11 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_11 = "data" as any;

/**
 * 接口 [商品列表↗](https://yapi.huianrong.com/project/1692/interface/api/68436) 的 **请求类型**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveProductListGetRequest {
  /**
   * 店铺id
   */
  storeId: string;
  /**
   * 商品分类id
   */
  productClassifyId: string;
  /**
   * 关键词搜索（商品名称or标签or编码or条码）
   */
  keyWords: string;
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
 * 接口 [商品列表↗](https://yapi.huianrong.com/project/1692/interface/api/68436) 的 **返回类型**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveProductListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 店铺id
     */
    storeId?: number;
    /**
     * 店铺名称
     */
    storeName?: string;
    /**
     * 商品id
     */
    productId?: number;
    /**
     * 商品名称
     */
    productName?: string;
    /**
     * 商品封面图片
     */
    productCoverPic?: string;
    /**
     * 商品标签 ,String
     */
    tags?: string[];
    /**
     * 销量
     */
    sales?: number;
    /**
     * 划线价
     */
    scribingPrice?: number;
    /**
     * 销售价
     */
    salePrice?: number;
  }[];
}

/**
 * 接口 [商品列表↗](https://yapi.huianrong.com/project/1692/interface/api/68436) 的 **请求配置的类型**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletReserveProductListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/reserve/product/list",
    "data",
    string,
    "storeId" | "productClassifyId" | "keyWords" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [商品列表↗](https://yapi.huianrong.com/project/1692/interface/api/68436) 的 **请求配置**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletReserveProductListGetRequestConfig: CbdApiAppletReserveProductListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_11,
    devUrl: devUrl_0_0_0_11,
    prodUrl: prodUrl_0_0_0_11,
    path: "/cbd-api-applet/reserve/product/list",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_11,
    paramNames: [],
    queryNames: [
      "storeId",
      "productClassifyId",
      "keyWords",
      "pageNum",
      "pageSize"
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletReserveProductListGet",
    extraInfo: {}
  };

/**
 * 接口 [商品列表↗](https://yapi.huianrong.com/project/1692/interface/api/68436) 的 **请求函数**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletReserveProductListGet = /*#__PURE__*/ (
  requestData: CbdApiAppletReserveProductListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletReserveProductListGetResponse>(
    prepare(cbdApiAppletReserveProductListGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletReserveProductListGet.requestConfig =
  cbdApiAppletReserveProductListGetRequestConfig;

/**
 * 接口 [商品详情↗](https://yapi.huianrong.com/project/1692/interface/api/68438) 的 **请求类型**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/info/{productId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveProductInfoProductIdGetRequest {
  /**
   * (Long)
   */
  productId: string;
}

/**
 * 接口 [商品详情↗](https://yapi.huianrong.com/project/1692/interface/api/68438) 的 **返回类型**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/info/{productId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveProductInfoProductIdGetResponse {
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商品id
   */
  productId?: number;
  /**
   * 商品名称
   */
  productName?: string;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 商品标签 ,String
   */
  tags?: string[];
  /**
   * 月售
   */
  sales?: number;
  /**
   * 划线价
   */
  scribingPrice?: number;
  /**
   * 销售价
   */
  salePrice?: number;
  /**
   * 商品须知
   */
  instructions?: string;
  /**
   * 商品详情图片集合 ,String
   */
  productDetailPics?: string[];
  /**
   * 商品图文详情
   */
  graphicDetails?: string;
  /**
   * 是否收藏
   */
  collect?: boolean;
}

/**
 * 接口 [商品详情↗](https://yapi.huianrong.com/project/1692/interface/api/68438) 的 **请求配置的类型**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/info/{productId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletReserveProductInfoProductIdGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/reserve/product/info/{productId}",
    "data",
    "productId",
    string,
    false
  >
>;

/**
 * 接口 [商品详情↗](https://yapi.huianrong.com/project/1692/interface/api/68438) 的 **请求配置**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/info/{productId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletReserveProductInfoProductIdGetRequestConfig: CbdApiAppletReserveProductInfoProductIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_11,
    devUrl: devUrl_0_0_0_11,
    prodUrl: prodUrl_0_0_0_11,
    path: "/cbd-api-applet/reserve/product/info/{productId}",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_11,
    paramNames: ["productId"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletReserveProductInfoProductIdGet",
    extraInfo: {}
  };

/**
 * 接口 [商品详情↗](https://yapi.huianrong.com/project/1692/interface/api/68438) 的 **请求函数**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/info/{productId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletReserveProductInfoProductIdGet = /*#__PURE__*/ (
  requestData: CbdApiAppletReserveProductInfoProductIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletReserveProductInfoProductIdGetResponse>(
    prepare(
      cbdApiAppletReserveProductInfoProductIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

cbdApiAppletReserveProductInfoProductIdGet.requestConfig =
  cbdApiAppletReserveProductInfoProductIdGetRequestConfig;

/**
 * 接口 [选择商品sku↗](https://yapi.huianrong.com/project/1692/interface/api/68440) 的 **请求类型**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/chooseSku/{productId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveProductChooseSkuProductIdGetRequest {
  /**
   * (Long)
   */
  productId: string;
}

/**
 * 接口 [选择商品sku↗](https://yapi.huianrong.com/project/1692/interface/api/68440) 的 **返回类型**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/chooseSku/{productId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveProductChooseSkuProductIdGetResponse {
  /**
   * 店铺id
   */
  storeId?: number;
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 商品id
   */
  productId?: number;
  /**
   * 商品名称
   */
  productName?: string;
  /**
   * 商品封面图
   */
  productCoverPic?: string;
  /**
   * 商品标签 ,String
   */
  tags?: string[];
  /**
   * 规格选项集合 ,ReserveProductSpec
   */
  specList?: {
    /**
     * 规格名称
     */
    specName?: string;
    /**
     * 规格值集合 ,SpecValue
     */
    specValues?: {
      /**
       * 规格值id
       */
      specValueId?: number;
      /**
       * 规格值
       */
      specValue?: string;
    }[];
  }[];
  /**
   * sku集合 ,ReserveProductSku
   */
  skuList?: {
    /**
     * SKU
     */
    skuId?: number;
    /**
     * 规格值id ,Long
     */
    specValueIds?: number[];
    /**
     * 剩余库存量
     */
    stockNum?: number;
    /**
     * 销量
     */
    sales?: number;
    /**
     * 划线价
     */
    scribingPrice?: number;
    /**
     * 销售价
     */
    salePrice?: number;
    /**
     * 商品sku图片
     */
    prdPic?: string;
    /**
     * 规格名称拼接
     */
    names?: string;
  }[];
}

/**
 * 接口 [选择商品sku↗](https://yapi.huianrong.com/project/1692/interface/api/68440) 的 **请求配置的类型**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/chooseSku/{productId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletReserveProductChooseSkuProductIdGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/reserve/product/chooseSku/{productId}",
    "data",
    "productId",
    string,
    false
  >
>;

/**
 * 接口 [选择商品sku↗](https://yapi.huianrong.com/project/1692/interface/api/68440) 的 **请求配置**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/chooseSku/{productId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletReserveProductChooseSkuProductIdGetRequestConfig: CbdApiAppletReserveProductChooseSkuProductIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_11,
    devUrl: devUrl_0_0_0_11,
    prodUrl: prodUrl_0_0_0_11,
    path: "/cbd-api-applet/reserve/product/chooseSku/{productId}",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_11,
    paramNames: ["productId"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletReserveProductChooseSkuProductIdGet",
    extraInfo: {}
  };

/**
 * 接口 [选择商品sku↗](https://yapi.huianrong.com/project/1692/interface/api/68440) 的 **请求函数**
 *
 * @分类 [店铺商品↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21961)
 * @请求头 `GET /cbd-api-applet/reserve/product/chooseSku/{productId}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletReserveProductChooseSkuProductIdGet = /*#__PURE__*/ (
  requestData: CbdApiAppletReserveProductChooseSkuProductIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletReserveProductChooseSkuProductIdGetResponse>(
    prepare(
      cbdApiAppletReserveProductChooseSkuProductIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

cbdApiAppletReserveProductChooseSkuProductIdGet.requestConfig =
  cbdApiAppletReserveProductChooseSkuProductIdGetRequestConfig;

const mockUrl_0_0_0_12 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_12 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_12 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_12 = "data" as any;

/**
 * 接口 [店铺优惠列表↗](https://yapi.huianrong.com/project/1692/interface/api/68442) 的 **请求类型**
 *
 * @分类 [店铺优惠↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21963)
 * @请求头 `GET /cbd-api-applet/coupon/storeCouponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCouponStoreCouponListGetRequest {
  /**
   * 店铺id
   */
  storeId: string;
  /**
   * 关键词搜索（优惠券名称）
   */
  keyWords: string;
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
 * 接口 [店铺优惠列表↗](https://yapi.huianrong.com/project/1692/interface/api/68442) 的 **返回类型**
 *
 * @分类 [店铺优惠↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21963)
 * @请求头 `GET /cbd-api-applet/coupon/storeCouponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCouponStoreCouponListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 优惠券id
     */
    id: number;
    /**
     * 会员优惠券码
     */
    code?: string;
    /**
     * 优惠券类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
     */
    type: number;
    /**
     * 优惠券名称
     */
    name: string;
    /**
     * 使用说明
     */
    instruction?: string;
    /**
     * 开始时间eg：yyyy-MM-ddHH:mm:ss
     */
    startTime: string;
    /**
     * 到期时间eg：yyyy-MM-ddHH:mm:ss
     */
    expireTime: string;
    /**
     * 剩余数量
     */
    quantity?: number;
    /**
     * 使用门槛
     */
    thresholdAmount: number;
    /**
     * 优惠
     */
    discount?: string;
    /**
     * 积分
     */
    integral?: number;
    /**
     * 是否已领取true:是，false:否
     */
    received?: boolean;
    /**
     * 已领取优惠券状态(0-未使用；1-已使用；2-已过期)
     */
    status?: number;
    /**
     * 领取人限制 ,Recipient
     */
    recipient?: {
      /**
       * 类型1.不限制，所有人可领取，2.指定会员等级或该等级以上可领取
       */
      type?: number;
      /**
       * 会员等级 ,String
       */
      memberLevel?: string[];
    };
    /**
     * 每人限领次数 ,PerPerson
     */
    perPerson?: {
      /**
       * 类型：1:限领次数，2:每人每天限领次数
       */
      type?: number;
      /**
       * 次数
       */
      number?: number;
    };
  }[];
}

/**
 * 接口 [店铺优惠列表↗](https://yapi.huianrong.com/project/1692/interface/api/68442) 的 **请求配置的类型**
 *
 * @分类 [店铺优惠↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21963)
 * @请求头 `GET /cbd-api-applet/coupon/storeCouponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCouponStoreCouponListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/coupon/storeCouponList",
    "data",
    string,
    "storeId" | "keyWords" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [店铺优惠列表↗](https://yapi.huianrong.com/project/1692/interface/api/68442) 的 **请求配置**
 *
 * @分类 [店铺优惠↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21963)
 * @请求头 `GET /cbd-api-applet/coupon/storeCouponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCouponStoreCouponListGetRequestConfig: CbdApiAppletCouponStoreCouponListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_12,
    devUrl: devUrl_0_0_0_12,
    prodUrl: prodUrl_0_0_0_12,
    path: "/cbd-api-applet/coupon/storeCouponList",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_12,
    paramNames: [],
    queryNames: ["storeId", "keyWords", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCouponStoreCouponListGet",
    extraInfo: {}
  };

/**
 * 接口 [店铺优惠列表↗](https://yapi.huianrong.com/project/1692/interface/api/68442) 的 **请求函数**
 *
 * @分类 [店铺优惠↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21963)
 * @请求头 `GET /cbd-api-applet/coupon/storeCouponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCouponStoreCouponListGet = /*#__PURE__*/ (
  requestData: CbdApiAppletCouponStoreCouponListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCouponStoreCouponListGetResponse>(
    prepare(cbdApiAppletCouponStoreCouponListGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCouponStoreCouponListGet.requestConfig =
  cbdApiAppletCouponStoreCouponListGetRequestConfig;

const mockUrl_0_0_0_13 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_13 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_13 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_13 = "data" as any;

/**
 * 接口 [首页列表↗](https://yapi.huianrong.com/project/1692/interface/api/68444) 的 **请求类型**
 *
 * @分类 [预约首页↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21965)
 * @请求头 `GET /cbd-api-applet/reserve/home/page`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveHomePageGetRequest {
  /**
   * 场地分类id
   */
  venueClassifyId: string;
  /**
   * 排序类型：,0:智能排序(暂以最新开张匹配),1:热度最高(未实现产品未定规则),2:销量优先,3:最新开张,4:我的收藏(未实现暂没收藏功能)
   */
  sortType: string;
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
 * 接口 [首页列表↗](https://yapi.huianrong.com/project/1692/interface/api/68444) 的 **返回类型**
 *
 * @分类 [预约首页↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21965)
 * @请求头 `GET /cbd-api-applet/reserve/home/page`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletReserveHomePageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 店铺id
     */
    storeId?: number;
    /**
     * 店铺名称
     */
    storeName?: string;
    /**
     * 店铺图片
     */
    storePic?: string;
    /**
     * 店铺业态
     */
    storeFormat?: string;
    /**
     * 月售
     */
    sales?: number;
    /**
     * 营业状态1营业中;2已打烊;
     */
    operatingStatus: number;
    /**
     * 营业时间
     */
    openTime?: string;
    /**
     * 优惠标签 ,couponTag
     */
    couponTag?: {
      /**
       * 优惠券类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
       */
      type?: number;
      /**
       * 优惠券标签
       */
      tag?: string;
    }[];
    /**
     * 店铺推荐场地列表 ,ReserveRecommendVenue
     */
    venueList?: {
      /**
       * 场地id
       */
      venueId?: number;
      /**
       * 规则类型1次卡2时段3包场
       */
      ruleType?: number;
      /**
       * 推荐场地图片
       */
      venuePic?: string;
      /**
       * 场地名称
       */
      venueName?: string;
      /**
       * 划线价
       */
      scribingPrice?: number;
      /**
       * 销售价
       */
      salePrice?: number;
    }[];
  }[];
}

/**
 * 接口 [首页列表↗](https://yapi.huianrong.com/project/1692/interface/api/68444) 的 **请求配置的类型**
 *
 * @分类 [预约首页↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21965)
 * @请求头 `GET /cbd-api-applet/reserve/home/page`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletReserveHomePageGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/reserve/home/page",
    "data",
    string,
    "venueClassifyId" | "sortType" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [首页列表↗](https://yapi.huianrong.com/project/1692/interface/api/68444) 的 **请求配置**
 *
 * @分类 [预约首页↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21965)
 * @请求头 `GET /cbd-api-applet/reserve/home/page`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletReserveHomePageGetRequestConfig: CbdApiAppletReserveHomePageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_13,
    devUrl: devUrl_0_0_0_13,
    prodUrl: prodUrl_0_0_0_13,
    path: "/cbd-api-applet/reserve/home/page",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_13,
    paramNames: [],
    queryNames: ["venueClassifyId", "sortType", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletReserveHomePageGet",
    extraInfo: {}
  };

/**
 * 接口 [首页列表↗](https://yapi.huianrong.com/project/1692/interface/api/68444) 的 **请求函数**
 *
 * @分类 [预约首页↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21965)
 * @请求头 `GET /cbd-api-applet/reserve/home/page`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletReserveHomePageGet = /*#__PURE__*/ (
  requestData: CbdApiAppletReserveHomePageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletReserveHomePageGetResponse>(
    prepare(cbdApiAppletReserveHomePageGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletReserveHomePageGet.requestConfig =
  cbdApiAppletReserveHomePageGetRequestConfig;

const mockUrl_0_0_0_14 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_14 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_14 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_14 = "data" as any;

/**
 * 接口 [我的优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/68446) 的 **请求类型**
 *
 * @分类 [个人中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21967)
 * @请求头 `GET /cbd-api-applet/coupon/myCouponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCouponMyCouponListGetRequest {
  /**
   * 状态(0-未使用；1-已使用；2-已过期)
   */
  status: string;
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
 * 接口 [我的优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/68446) 的 **返回类型**
 *
 * @分类 [个人中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21967)
 * @请求头 `GET /cbd-api-applet/coupon/myCouponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCouponMyCouponListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 优惠券id
     */
    id: number;
    /**
     * 会员优惠券码
     */
    code?: string;
    /**
     * 优惠券类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
     */
    type: number;
    /**
     * 优惠券名称
     */
    name: string;
    /**
     * 使用说明
     */
    instruction?: string;
    /**
     * 开始时间eg：yyyy-MM-ddHH:mm:ss
     */
    startTime: string;
    /**
     * 到期时间eg：yyyy-MM-ddHH:mm:ss
     */
    expireTime: string;
    /**
     * 剩余数量
     */
    quantity?: number;
    /**
     * 使用门槛
     */
    thresholdAmount: number;
    /**
     * 优惠
     */
    discount?: string;
    /**
     * 积分
     */
    integral?: number;
    /**
     * 是否已领取true:是，false:否
     */
    received?: boolean;
    /**
     * 已领取优惠券状态(0-未使用；1-已使用；2-已过期)
     */
    status?: number;
    /**
     * 领取人限制 ,Recipient
     */
    recipient?: {
      /**
       * 类型1.不限制，所有人可领取，2.指定会员等级或该等级以上可领取
       */
      type?: number;
      /**
       * 会员等级 ,String
       */
      memberLevel?: string[];
    };
    /**
     * 每人限领次数 ,PerPerson
     */
    perPerson?: {
      /**
       * 类型：1:限领次数，2:每人每天限领次数
       */
      type?: number;
      /**
       * 次数
       */
      number?: number;
    };
  }[];
}

/**
 * 接口 [我的优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/68446) 的 **请求配置的类型**
 *
 * @分类 [个人中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21967)
 * @请求头 `GET /cbd-api-applet/coupon/myCouponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCouponMyCouponListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/coupon/myCouponList",
    "data",
    string,
    "status" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [我的优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/68446) 的 **请求配置**
 *
 * @分类 [个人中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21967)
 * @请求头 `GET /cbd-api-applet/coupon/myCouponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCouponMyCouponListGetRequestConfig: CbdApiAppletCouponMyCouponListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_14,
    devUrl: devUrl_0_0_0_14,
    prodUrl: prodUrl_0_0_0_14,
    path: "/cbd-api-applet/coupon/myCouponList",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_14,
    paramNames: [],
    queryNames: ["status", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCouponMyCouponListGet",
    extraInfo: {}
  };

/**
 * 接口 [我的优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/68446) 的 **请求函数**
 *
 * @分类 [个人中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21967)
 * @请求头 `GET /cbd-api-applet/coupon/myCouponList`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCouponMyCouponListGet = /*#__PURE__*/ (
  requestData: CbdApiAppletCouponMyCouponListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCouponMyCouponListGetResponse>(
    prepare(cbdApiAppletCouponMyCouponListGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCouponMyCouponListGet.requestConfig =
  cbdApiAppletCouponMyCouponListGetRequestConfig;

const mockUrl_0_0_0_15 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_15 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_15 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_15 = "data" as any;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1692/interface/api/68448) 的 **请求类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/delete/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCollectDeleteIdPostRequest {
  /**
   * (Long)
   */
  id: string;
}

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1692/interface/api/68448) 的 **返回类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/delete/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCollectDeleteIdPostResponse {
  /**
   * 响应码（200：成功，其他失败）
   */
  code: number;
  /**
   * 响应文本
   */
  msg: string;
}

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1692/interface/api/68448) 的 **请求配置的类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/delete/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCollectDeleteIdPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/collect/delete/{id}",
    "data",
    "id",
    string,
    false
  >
>;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1692/interface/api/68448) 的 **请求配置**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/delete/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCollectDeleteIdPostRequestConfig: CbdApiAppletCollectDeleteIdPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_15,
    devUrl: devUrl_0_0_0_15,
    prodUrl: prodUrl_0_0_0_15,
    path: "/cbd-api-applet/collect/delete/{id}",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_15,
    paramNames: ["id"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCollectDeleteIdPost",
    extraInfo: {}
  };

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1692/interface/api/68448) 的 **请求函数**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/delete/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCollectDeleteIdPost = /*#__PURE__*/ (
  requestData: CbdApiAppletCollectDeleteIdPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCollectDeleteIdPostResponse>(
    prepare(cbdApiAppletCollectDeleteIdPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCollectDeleteIdPost.requestConfig =
  cbdApiAppletCollectDeleteIdPostRequestConfig;

/**
 * 接口 [批量新增↗](https://yapi.huianrong.com/project/1692/interface/api/68450) 的 **请求类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/add-batch`
 * @更新时间 `2022-11-09 14:19:07`
 */
export type CbdApiAppletCollectAddBatchPostRequest = {
  /**
   * 类型:1店铺2商品3场馆4活动
   */
  type: number;
  /**
   * 店铺商品id活动
   */
  objectId: number;
}[];

/**
 * 接口 [批量新增↗](https://yapi.huianrong.com/project/1692/interface/api/68450) 的 **返回类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/add-batch`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCollectAddBatchPostResponse {
  /**
   * 响应码（200：成功，其他失败）
   */
  code: number;
  /**
   * 响应文本
   */
  msg: string;
}

/**
 * 接口 [批量新增↗](https://yapi.huianrong.com/project/1692/interface/api/68450) 的 **请求配置的类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/add-batch`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCollectAddBatchPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/collect/add-batch",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [批量新增↗](https://yapi.huianrong.com/project/1692/interface/api/68450) 的 **请求配置**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/add-batch`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCollectAddBatchPostRequestConfig: CbdApiAppletCollectAddBatchPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_15,
    devUrl: devUrl_0_0_0_15,
    prodUrl: prodUrl_0_0_0_15,
    path: "/cbd-api-applet/collect/add-batch",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_15,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCollectAddBatchPost",
    extraInfo: {}
  };

/**
 * 接口 [批量新增↗](https://yapi.huianrong.com/project/1692/interface/api/68450) 的 **请求函数**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/add-batch`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCollectAddBatchPost = /*#__PURE__*/ (
  requestData: CbdApiAppletCollectAddBatchPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCollectAddBatchPostResponse>(
    prepare(cbdApiAppletCollectAddBatchPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCollectAddBatchPost.requestConfig =
  cbdApiAppletCollectAddBatchPostRequestConfig;

/**
 * 接口 [收藏的商品↗](https://yapi.huianrong.com/project/1692/interface/api/68452) 的 **请求类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/product`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCollectProductGetRequest {
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
 * 接口 [收藏的商品↗](https://yapi.huianrong.com/project/1692/interface/api/68452) 的 **返回类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/product`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCollectProductGetResponse {
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
     * 类型:1店铺2商品3场馆4活动
     */
    type?: number;
    /**
     * storeProductIdvenueId
     */
    objectId?: number;
    /**
     * 名字
     */
    name?: string;
    /**
     * 价格
     */
    price?: number;
    /**
     * 店铺名字
     */
    storeName?: string;
    /**
     * 店铺id
     */
    storeId?: number;
    /**
     * 图片
     */
    pic?: string;
  }[];
}

/**
 * 接口 [收藏的商品↗](https://yapi.huianrong.com/project/1692/interface/api/68452) 的 **请求配置的类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/product`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCollectProductGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/collect/product",
    "data",
    string,
    "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [收藏的商品↗](https://yapi.huianrong.com/project/1692/interface/api/68452) 的 **请求配置**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/product`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCollectProductGetRequestConfig: CbdApiAppletCollectProductGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_15,
    devUrl: devUrl_0_0_0_15,
    prodUrl: prodUrl_0_0_0_15,
    path: "/cbd-api-applet/collect/product",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_15,
    paramNames: [],
    queryNames: ["pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCollectProductGet",
    extraInfo: {}
  };

/**
 * 接口 [收藏的商品↗](https://yapi.huianrong.com/project/1692/interface/api/68452) 的 **请求函数**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/product`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCollectProductGet = /*#__PURE__*/ (
  requestData: CbdApiAppletCollectProductGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCollectProductGetResponse>(
    prepare(cbdApiAppletCollectProductGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCollectProductGet.requestConfig =
  cbdApiAppletCollectProductGetRequestConfig;

/**
 * 接口 [收藏的店铺↗](https://yapi.huianrong.com/project/1692/interface/api/68454) 的 **请求类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/store`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCollectStoreGetRequest {
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
 * 接口 [收藏的店铺↗](https://yapi.huianrong.com/project/1692/interface/api/68454) 的 **返回类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/store`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCollectStoreGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 店铺ID
     */
    id: number;
    /**
     * 店铺类型1自营2联营
     */
    type: number;
    /**
     * 店铺名称
     */
    name: string;
    /**
     * 业态ID
     */
    sceneId: number;
    /**
     * 业态 ,DictData
     */
    scene: {
      /**
       * id
       */
      id?: number;
      /**
       * 显示名称
       */
      name?: string;
    };
    /**
     * 月销量
     */
    monthSaleNum: number;
    /**
     * 推荐优惠列表 ,Coupon
     */
    recommendCoupons?: {
      /**
       * 优惠券ID
       */
      id?: number;
      /**
       * 名称
       */
      name: string;
      /**
       * 类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
       */
      type: number;
      /**
       * 是否有门槛0无1有
       */
      required: number;
    }[];
    /**
     * 推荐商品(包含商品与场馆) ,GoodData
     */
    recommendGoods?: {
      /**
       * 商品ID场馆ID
       */
      spuId: number;
      /**
       * 规格ID规格价格ID
       */
      skuId: number;
      /**
       * 类型1商品，2场馆
       */
      goodType: number;
      /**
       * 名称
       */
      name: string;
      /**
       * 封面附件
       */
      coverAttachment: string;
      /**
       * 划线价只有商品时才有
       */
      scribingPrice?: number;
      /**
       * 销售价
       */
      salePrice: number;
    }[];
    /**
     * 经营状态1营业中;2打烊;
     */
    operatingStatus: number;
    /**
     * 营业时间,打烊时为空
     */
    openTime?: string;
    /**
     * 店铺logo附件
     */
    logoAttachment?: string;
    /**
     * 特色服务 ,String
     */
    feature?: string[];
  }[];
}

/**
 * 接口 [收藏的店铺↗](https://yapi.huianrong.com/project/1692/interface/api/68454) 的 **请求配置的类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/store`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCollectStoreGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/collect/store",
    "data",
    string,
    "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [收藏的店铺↗](https://yapi.huianrong.com/project/1692/interface/api/68454) 的 **请求配置**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/store`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCollectStoreGetRequestConfig: CbdApiAppletCollectStoreGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_15,
    devUrl: devUrl_0_0_0_15,
    prodUrl: prodUrl_0_0_0_15,
    path: "/cbd-api-applet/collect/store",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_15,
    paramNames: [],
    queryNames: ["pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCollectStoreGet",
    extraInfo: {}
  };

/**
 * 接口 [收藏的店铺↗](https://yapi.huianrong.com/project/1692/interface/api/68454) 的 **请求函数**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/store`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCollectStoreGet = /*#__PURE__*/ (
  requestData: CbdApiAppletCollectStoreGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCollectStoreGetResponse>(
    prepare(cbdApiAppletCollectStoreGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCollectStoreGet.requestConfig =
  cbdApiAppletCollectStoreGetRequestConfig;

/**
 * 接口 [收藏的活动↗](https://yapi.huianrong.com/project/1692/interface/api/68456) 的 **请求类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/activity`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCollectActivityGetRequest {
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
 * 接口 [收藏的活动↗](https://yapi.huianrong.com/project/1692/interface/api/68456) 的 **返回类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/activity`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCollectActivityGetResponse {
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
     * 活动名称
     */
    name?: string;
    /**
     * 活动类型
     */
    activityType?: string;
    /**
     * 报名参与人数
     */
    signupNum?: number;
    /**
     * 封面图
     */
    coverPic?: string;
    /**
     * -1.作废1.等待预热2.预热中3.等待报名4.报名中5.等待活动开始6.活动中7.活动结束
     */
    status?: number;
    /**
     * 报名状态:0未报名1待付款2已报名3订单关闭4退款
     */
    signupStatus?: number;
    /**
     * 活动报名开始时间
     */
    signupStartTime?: number;
    /**
     * 活动报名截至时间
     */
    signupEndTime?: number;
    /**
     * 活动开始时间
     */
    activityStartTime?: number;
    /**
     * 活动截至时间
     */
    activityEndTime?: number;
  }[];
}

/**
 * 接口 [收藏的活动↗](https://yapi.huianrong.com/project/1692/interface/api/68456) 的 **请求配置的类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/activity`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCollectActivityGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/collect/activity",
    "data",
    string,
    "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [收藏的活动↗](https://yapi.huianrong.com/project/1692/interface/api/68456) 的 **请求配置**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/activity`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCollectActivityGetRequestConfig: CbdApiAppletCollectActivityGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_15,
    devUrl: devUrl_0_0_0_15,
    prodUrl: prodUrl_0_0_0_15,
    path: "/cbd-api-applet/collect/activity",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_15,
    paramNames: [],
    queryNames: ["pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCollectActivityGet",
    extraInfo: {}
  };

/**
 * 接口 [收藏的活动↗](https://yapi.huianrong.com/project/1692/interface/api/68456) 的 **请求函数**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `GET /cbd-api-applet/collect/activity`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCollectActivityGet = /*#__PURE__*/ (
  requestData: CbdApiAppletCollectActivityGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCollectActivityGetResponse>(
    prepare(cbdApiAppletCollectActivityGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCollectActivityGet.requestConfig =
  cbdApiAppletCollectActivityGetRequestConfig;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1692/interface/api/68458) 的 **请求类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/add`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCollectAddPostRequest {
  /**
   * 类型:1店铺2商品3场馆4活动
   */
  type: number;
  /**
   * 店铺商品id活动
   */
  objectId: number;
}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1692/interface/api/68458) 的 **返回类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/add`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCollectAddPostResponse {
  /**
   * 响应码（200：成功，其他失败）
   */
  code: number;
  /**
   * 响应文本
   */
  msg: string;
}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1692/interface/api/68458) 的 **请求配置的类型**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/add`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCollectAddPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/collect/add",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1692/interface/api/68458) 的 **请求配置**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/add`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCollectAddPostRequestConfig: CbdApiAppletCollectAddPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_15,
    devUrl: devUrl_0_0_0_15,
    prodUrl: prodUrl_0_0_0_15,
    path: "/cbd-api-applet/collect/add",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_15,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCollectAddPost",
    extraInfo: {}
  };

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1692/interface/api/68458) 的 **请求函数**
 *
 * @分类 [收藏↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21969)
 * @请求头 `POST /cbd-api-applet/collect/add`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCollectAddPost = /*#__PURE__*/ (
  requestData: CbdApiAppletCollectAddPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCollectAddPostResponse>(
    prepare(cbdApiAppletCollectAddPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCollectAddPost.requestConfig =
  cbdApiAppletCollectAddPostRequestConfig;

const mockUrl_0_0_0_16 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_16 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_16 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_16 = "data" as any;

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1692/interface/api/68460) 的 **请求类型**
 *
 * @分类 [客户服务↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21971)
 * @请求头 `GET /cbd-api-applet/customer-service/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCustomerServiceListGetRequest {}

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1692/interface/api/68460) 的 **返回类型**
 *
 * @分类 [客户服务↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21971)
 * @请求头 `GET /cbd-api-applet/customer-service/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export type CbdApiAppletCustomerServiceListGetResponse = {
  /**
   * id
   */
  id?: number;
  /**
   * 电话
   */
  telephone?: string;
  /**
   * 更新时间
   */
  updateTime?: string;
}[];

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1692/interface/api/68460) 的 **请求配置的类型**
 *
 * @分类 [客户服务↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21971)
 * @请求头 `GET /cbd-api-applet/customer-service/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCustomerServiceListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/customer-service/list",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1692/interface/api/68460) 的 **请求配置**
 *
 * @分类 [客户服务↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21971)
 * @请求头 `GET /cbd-api-applet/customer-service/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCustomerServiceListGetRequestConfig: CbdApiAppletCustomerServiceListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_16,
    devUrl: devUrl_0_0_0_16,
    prodUrl: prodUrl_0_0_0_16,
    path: "/cbd-api-applet/customer-service/list",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_16,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCustomerServiceListGet",
    extraInfo: {}
  };

/**
 * 接口 [列表↗](https://yapi.huianrong.com/project/1692/interface/api/68460) 的 **请求函数**
 *
 * @分类 [客户服务↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21971)
 * @请求头 `GET /cbd-api-applet/customer-service/list`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCustomerServiceListGet = /*#__PURE__*/ (
  requestData?: CbdApiAppletCustomerServiceListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCustomerServiceListGetResponse>(
    prepare(cbdApiAppletCustomerServiceListGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCustomerServiceListGet.requestConfig =
  cbdApiAppletCustomerServiceListGetRequestConfig;

const mockUrl_0_0_0_17 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_17 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_17 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_17 = "data" as any;

/**
 * 接口 [会员中心信息↗](https://yapi.huianrong.com/project/1692/interface/api/68462) 的 **请求类型**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletMemberInfoGetRequest {}

/**
 * 接口 [会员中心信息↗](https://yapi.huianrong.com/project/1692/interface/api/68462) 的 **返回类型**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletMemberInfoGetResponse {
  /**
   * 昵称
   */
  nickName: string;
  /**
   * 会员编号
   */
  memberCode: string;
  /**
   * 头像
   */
  avatarUrl: string;
  /**
   * 等级id，为空表示没有会员体系
   */
  levelId?: number;
  /**
   * 会员等级VIP1VIP2，固定名称
   */
  levelDefaultName?: string;
  /**
   * 等级名字普通会员
   */
  levelName?: string;
  /**
   * 当前总等级豆
   */
  levelBean: number;
  /**
   * 下级等级豆
   */
  nextLevelBean: number;
  /**
   * 当前总积分
   */
  integral: number;
  /**
   * 可用积分
   */
  availableIntegral: number;
  /**
   * 不可用未生效积分
   */
  disabledIntegral: number;
  /**
   * 权益信息 ,MemberRightsInfo
   */
  memberRightsInfoList?: {
    /**
     * 等级id
     */
    memberRightsId?: number;
    /**
     * 会员等级
     */
    showName?: string;
    /**
     * 图标
     */
    fileUrl?: string;
  }[];
  /**
   * banner ,RespBannerListDto
   */
  banners?: {
    /**
     * id
     */
    id?: number;
    /**
     * 所属类型:1热门活动页2优质商家页3个人中心
     */
    type?: number;
    /**
     * 封面图
     */
    coverPic?: string;
    /**
     * banner详情优先级低于detail_url
     */
    detail?: string;
    /**
     * banner详情url优先级高于detail
     */
    detailUrl?: string;
  }[];
}

/**
 * 接口 [会员中心信息↗](https://yapi.huianrong.com/project/1692/interface/api/68462) 的 **请求配置的类型**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletMemberInfoGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/member/info",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [会员中心信息↗](https://yapi.huianrong.com/project/1692/interface/api/68462) 的 **请求配置**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletMemberInfoGetRequestConfig: CbdApiAppletMemberInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_17,
    devUrl: devUrl_0_0_0_17,
    prodUrl: prodUrl_0_0_0_17,
    path: "/cbd-api-applet/member/info",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_17,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletMemberInfoGet",
    extraInfo: {}
  };

/**
 * 接口 [会员中心信息↗](https://yapi.huianrong.com/project/1692/interface/api/68462) 的 **请求函数**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletMemberInfoGet = /*#__PURE__*/ (
  requestData?: CbdApiAppletMemberInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletMemberInfoGetResponse>(
    prepare(cbdApiAppletMemberInfoGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletMemberInfoGet.requestConfig =
  cbdApiAppletMemberInfoGetRequestConfig;

/**
 * 接口 [积分明细↗](https://yapi.huianrong.com/project/1692/interface/api/68464) 的 **请求类型**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/integralRecords`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletMemberIntegralRecordsGetRequest {
  /**
   * 类型1、消费2、赠送3、退款4、签到,暂不支持搜搜
   */
  type: string;
  /**
   * 来源1、商品订单2、活动,暂不支持搜搜
   */
  source: string;
  /**
   * true获得的false消耗的,暂不支持搜搜
   */
  negative: string;
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
 * 接口 [积分明细↗](https://yapi.huianrong.com/project/1692/interface/api/68464) 的 **返回类型**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/integralRecords`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletMemberIntegralRecordsGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 类型1、消费2、赠送3、退款4、签到
     */
    type: number;
    /**
     * 来源1、商品订单2、活动
     */
    source: number;
    /**
     * 描述
     */
    remark: string;
    /**
     * 积分数量有正负
     */
    integralNum: number;
    /**
     * 是否是负true是false否
     */
    negative: boolean;
    /**
     * 时间yyyy-MM-ddHH:mm:ss
     */
    createTime: string;
  }[];
}

/**
 * 接口 [积分明细↗](https://yapi.huianrong.com/project/1692/interface/api/68464) 的 **请求配置的类型**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/integralRecords`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletMemberIntegralRecordsGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/member/integralRecords",
    "data",
    string,
    "type" | "source" | "negative" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [积分明细↗](https://yapi.huianrong.com/project/1692/interface/api/68464) 的 **请求配置**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/integralRecords`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletMemberIntegralRecordsGetRequestConfig: CbdApiAppletMemberIntegralRecordsGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_17,
    devUrl: devUrl_0_0_0_17,
    prodUrl: prodUrl_0_0_0_17,
    path: "/cbd-api-applet/member/integralRecords",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_17,
    paramNames: [],
    queryNames: ["type", "source", "negative", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletMemberIntegralRecordsGet",
    extraInfo: {}
  };

/**
 * 接口 [积分明细↗](https://yapi.huianrong.com/project/1692/interface/api/68464) 的 **请求函数**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/integralRecords`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletMemberIntegralRecordsGet = /*#__PURE__*/ (
  requestData: CbdApiAppletMemberIntegralRecordsGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletMemberIntegralRecordsGetResponse>(
    prepare(cbdApiAppletMemberIntegralRecordsGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletMemberIntegralRecordsGet.requestConfig =
  cbdApiAppletMemberIntegralRecordsGetRequestConfig;

/**
 * 接口 [等级豆明细↗](https://yapi.huianrong.com/project/1692/interface/api/68466) 的 **请求类型**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/beanRecords`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletMemberBeanRecordsGetRequest {
  /**
   * 类型1、购买2、退款
   */
  type: string;
  /**
   * 来源1、商品订单2、活动
   */
  source: string;
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
 * 接口 [等级豆明细↗](https://yapi.huianrong.com/project/1692/interface/api/68466) 的 **返回类型**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/beanRecords`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletMemberBeanRecordsGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 类型:1购买2退款
     */
    type: number;
    /**
     * 来源1、商品订单2、活动
     */
    source: number;
    /**
     * 订单编号
     */
    orderNo: string;
    /**
     * 等级豆
     */
    levelBean: number;
    /**
     * 时间yyyy-MM-ddHH:mm:ss
     */
    createTime: string;
  }[];
}

/**
 * 接口 [等级豆明细↗](https://yapi.huianrong.com/project/1692/interface/api/68466) 的 **请求配置的类型**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/beanRecords`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletMemberBeanRecordsGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/member/beanRecords",
    "data",
    string,
    "type" | "source" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [等级豆明细↗](https://yapi.huianrong.com/project/1692/interface/api/68466) 的 **请求配置**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/beanRecords`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletMemberBeanRecordsGetRequestConfig: CbdApiAppletMemberBeanRecordsGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_17,
    devUrl: devUrl_0_0_0_17,
    prodUrl: prodUrl_0_0_0_17,
    path: "/cbd-api-applet/member/beanRecords",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_17,
    paramNames: [],
    queryNames: ["type", "source", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletMemberBeanRecordsGet",
    extraInfo: {}
  };

/**
 * 接口 [等级豆明细↗](https://yapi.huianrong.com/project/1692/interface/api/68466) 的 **请求函数**
 *
 * @分类 [会员中心↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21973)
 * @请求头 `GET /cbd-api-applet/member/beanRecords`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletMemberBeanRecordsGet = /*#__PURE__*/ (
  requestData: CbdApiAppletMemberBeanRecordsGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletMemberBeanRecordsGetResponse>(
    prepare(cbdApiAppletMemberBeanRecordsGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletMemberBeanRecordsGet.requestConfig =
  cbdApiAppletMemberBeanRecordsGetRequestConfig;

const mockUrl_0_0_0_18 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_18 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_18 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_18 = "data" as any;

/**
 * 接口 [等级体系信息↗](https://yapi.huianrong.com/project/1692/interface/api/68468) 的 **请求类型**
 *
 * @分类 [等级↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21975)
 * @请求头 `GET /cbd-api-applet/memberLevel/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletMemberLevelInfoGetRequest {}

/**
 * 接口 [等级体系信息↗](https://yapi.huianrong.com/project/1692/interface/api/68468) 的 **返回类型**
 *
 * @分类 [等级↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21975)
 * @请求头 `GET /cbd-api-applet/memberLevel/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletMemberLevelInfoGetResponse {
  /**
   * 用户当前等级豆
   */
  levelBean: number;
  /**
   * 用户下级等级豆
   */
  nextLevelBean: number;
  /**
   * 等级列表 ,MemberLevel
   */
  levels: {
    /**
     * 等级id
     */
    levelId: number;
    /**
     * 会员等级
     */
    levelDefaultName: string;
    /**
     * 等级名字普通会员
     */
    levelName: string;
    /**
     * 获取条件
     */
    levelBean: number;
  }[];
  /**
   * 规则 ,String
   */
  rules: string[];
}

/**
 * 接口 [等级体系信息↗](https://yapi.huianrong.com/project/1692/interface/api/68468) 的 **请求配置的类型**
 *
 * @分类 [等级↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21975)
 * @请求头 `GET /cbd-api-applet/memberLevel/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletMemberLevelInfoGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/memberLevel/info",
    "data",
    string,
    string,
    true
  >
>;

/**
 * 接口 [等级体系信息↗](https://yapi.huianrong.com/project/1692/interface/api/68468) 的 **请求配置**
 *
 * @分类 [等级↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21975)
 * @请求头 `GET /cbd-api-applet/memberLevel/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletMemberLevelInfoGetRequestConfig: CbdApiAppletMemberLevelInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_18,
    devUrl: devUrl_0_0_0_18,
    prodUrl: prodUrl_0_0_0_18,
    path: "/cbd-api-applet/memberLevel/info",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_18,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletMemberLevelInfoGet",
    extraInfo: {}
  };

/**
 * 接口 [等级体系信息↗](https://yapi.huianrong.com/project/1692/interface/api/68468) 的 **请求函数**
 *
 * @分类 [等级↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21975)
 * @请求头 `GET /cbd-api-applet/memberLevel/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletMemberLevelInfoGet = /*#__PURE__*/ (
  requestData?: CbdApiAppletMemberLevelInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletMemberLevelInfoGetResponse>(
    prepare(cbdApiAppletMemberLevelInfoGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletMemberLevelInfoGet.requestConfig =
  cbdApiAppletMemberLevelInfoGetRequestConfig;

const mockUrl_0_0_0_19 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_19 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_19 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_19 = "data" as any;

/**
 * 接口 [购物车商品详情↗](https://yapi.huianrong.com/project/1692/interface/api/68470) 的 **请求类型**
 *
 * @分类 [购物车↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21977)
 * @请求头 `POST /cbd-api-applet/cart/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCartInfoPostRequest {
  /**
   * 商品信息 ,ReqCartStorePrdInfo
   */
  storeList?: {
    /**
     * 店铺ID
     */
    storeId: number;
    /**
     * 商品信息 ,ReqPrdSkuInfo
     */
    skuList: {
      /**
       * SKU
       */
      skuId: number;
      /**
       * 1：商品，2：场次
       */
      type: number;
      /**
       * 商品数量
       */
      prdNum?: number;
    }[];
  }[];
}

/**
 * 接口 [购物车商品详情↗](https://yapi.huianrong.com/project/1692/interface/api/68470) 的 **返回类型**
 *
 * @分类 [购物车↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21977)
 * @请求头 `POST /cbd-api-applet/cart/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCartInfoPostResponse {
  /**
   * 商品信息 ,RespCartStorePrdInfo
   */
  storeList: {
    /**
     * 店铺ID
     */
    storeId: number;
    /**
     * 店铺名称
     */
    storeName: string;
    /**
     * 店铺状态(1:正常，2：禁用)
     */
    status?: number;
    /**
     * 经营状态1营业中;2打烊
     */
    operatingStatus?: number;
    /**
     * 商品信息 ,RespPrdSkuInfo
     */
    skuList: {
      /**
       * 店铺ID
       */
      storeId: number;
      /**
       * 商品ID
       */
      prdId?: number;
      /**
       * SKU
       */
      skuId: number;
      /**
       * 场地ID
       */
      venueId?: number;
      /**
       * 场地名称
       */
      venueName?: string;
      /**
       * 商品名称(或"次卡")
       */
      prdName?: string;
      /**
       * 所选规格值对应的描述
       */
      specDesc?: string;
      /**
       * 商品状态(1-销售中；2-已售罄；3-已下架)
       */
      status?: number;
      /**
       * 库存(次卡无库存限制，上限99)
       */
      stockNum?: number;
      /**
       * 商品价格(单价)
       */
      prdPrice?: number;
      /**
       * 图片
       */
      prdPic?: string;
      /**
       * 1：商品，2：场次
       */
      type: number;
      /**
       * 商品数量
       */
      prdNum?: number;
    }[];
    /**
     * 券列表 ,String
     */
    couponList?: string[];
  }[];
}

/**
 * 接口 [购物车商品详情↗](https://yapi.huianrong.com/project/1692/interface/api/68470) 的 **请求配置的类型**
 *
 * @分类 [购物车↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21977)
 * @请求头 `POST /cbd-api-applet/cart/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCartInfoPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/cart/info",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [购物车商品详情↗](https://yapi.huianrong.com/project/1692/interface/api/68470) 的 **请求配置**
 *
 * @分类 [购物车↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21977)
 * @请求头 `POST /cbd-api-applet/cart/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCartInfoPostRequestConfig: CbdApiAppletCartInfoPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_19,
    devUrl: devUrl_0_0_0_19,
    prodUrl: prodUrl_0_0_0_19,
    path: "/cbd-api-applet/cart/info",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_19,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCartInfoPost",
    extraInfo: {}
  };

/**
 * 接口 [购物车商品详情↗](https://yapi.huianrong.com/project/1692/interface/api/68470) 的 **请求函数**
 *
 * @分类 [购物车↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21977)
 * @请求头 `POST /cbd-api-applet/cart/info`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCartInfoPost = /*#__PURE__*/ (
  requestData: CbdApiAppletCartInfoPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCartInfoPostResponse>(
    prepare(cbdApiAppletCartInfoPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCartInfoPost.requestConfig = cbdApiAppletCartInfoPostRequestConfig;

const mockUrl_0_0_0_20 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_20 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_20 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_20 = "data" as any;

/**
 * 接口 [付款↗](https://yapi.huianrong.com/project/1692/interface/api/68472) 的 **请求类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/submit`
 * @更新时间 `2023-03-03 11:32:09`
 */
export interface CbdApiAppletOrderSubmitPostRequest {
  /**
   * 订单列表 ,ReqOrderInfo
   */
  orderList: {
    /**
     * 店铺ID
     */
    storeId: number;
    /**
     * 商品信息 ,ReqPrdInfo
     */
    skuList: {
      /**
       * SKU(type=1或21时不能为空，22及23也有唯一标识)
       */
      skuId: number;
      /**
       * 场地ID
       */
      venueId?: number;
      /**
       * 日期(yyyy-mm-dd)<BR>,时段及包场使用
       */
      date?: string;
      /**
       * 时段(7:00-8:00，7:00-9:00)<BR>,时段及包场使用
       */
      startTime?: string;
      /**
       * 结束时间
       */
      endTime?: string;
      /**
       * 1：商品，21：次卡，22：时段，23：包场<BR>,时段及包场通过日期+时段来区分
       */
      type: number;
      /**
       * 购买数量(type=22或23时默认为1)
       */
      prdNum: number;
    }[];
    /**
     * 优惠券ID(为空则没使用优惠券)
     */
    cpId?: string;
    /**
     * 优惠券优惠金额
     */
    couponAmt?: number;
    /**
     * 会员折扣
     */
    memberDisctAmt?: number;
    /**
     * 使用积分数量(为空或0则未使用积分抵扣)
     */
    integral?: number;
    /**
     * 积分抵扣金额
     */
    integralAmt?: number;
    /**
     * 订单所属商品类型（1：商品，21：次卡，22：时段，23：包场）
     */
    type: number;
    /**
     * 场地ID
     */
    venueId?: number;
    /**
     * 买家留言
     */
    buyerMsg?: string;
    /**
     * 订单预览标记
     */
    orderMark?: string;
  }[];
}

/**
 * 接口 [付款↗](https://yapi.huianrong.com/project/1692/interface/api/68472) 的 **返回类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/submit`
 * @更新时间 `2023-03-03 11:32:09`
 */
export interface CbdApiAppletOrderSubmitPostResponse {
  /**
   * 支付系统业务流水号(查询支付结果使用)
   */
  serverRspNo: string;
  /**
   * 订单编号
   */
  orderNo?: string;
  /**
   * 公众号id或小程序id(调起支付所需)
   */
  appid?: string;
  /**
   * busiCode为1005时才返回（调起支付所需）
   */
  partnerid?: string;
  /**
   * busiCode为1005时才返回（调起支付所需）
   */
  prepayid?: string;
  /**
   * 时间戳，自1970年1月1日0点0分0秒以来的秒数(调起支付所需)
   */
  timestamp?: string;
  /**
   * 随机字符串（调起支付所需）
   */
  noncestr?: string;
  /**
   * 数据包（调起支付所需）
   */
  dataPackage?: string;
  /**
   * 签名（调起支付所需）
   */
  paysign?: string;
  /**
   * 签名算法
   */
  signType?: string;
}

/**
 * 接口 [付款↗](https://yapi.huianrong.com/project/1692/interface/api/68472) 的 **请求配置的类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/submit`
 * @更新时间 `2023-03-03 11:32:09`
 */
type CbdApiAppletOrderSubmitPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/submit",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [付款↗](https://yapi.huianrong.com/project/1692/interface/api/68472) 的 **请求配置**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/submit`
 * @更新时间 `2023-03-03 11:32:09`
 */
const cbdApiAppletOrderSubmitPostRequestConfig: CbdApiAppletOrderSubmitPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_20,
    devUrl: devUrl_0_0_0_20,
    prodUrl: prodUrl_0_0_0_20,
    path: "/cbd-api-applet/order/submit",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_20,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderSubmitPost",
    extraInfo: {}
  };

/**
 * 接口 [付款↗](https://yapi.huianrong.com/project/1692/interface/api/68472) 的 **请求函数**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/submit`
 * @更新时间 `2023-03-03 11:32:09`
 */
export const cbdApiAppletOrderSubmitPost = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderSubmitPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderSubmitPostResponse>(
    prepare(cbdApiAppletOrderSubmitPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderSubmitPost.requestConfig =
  cbdApiAppletOrderSubmitPostRequestConfig;

/**
 * 接口 [我的优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/68474) 的 **请求类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/coupon`
 * @更新时间 `2023-03-03 11:32:08`
 */
export interface CbdApiAppletOrderCouponPostRequest {
  /**
   * 店铺ID
   */
  storeId: number;
  /**
   * 商品 ,ReqPrdInfo
   */
  list: {
    /**
     * 商品ID
     */
    prdId: number;
    /**
     * SKU
     */
    skuId: number;
    /**
     * 商品价格
     */
    prdPrice: number;
    /**
     * 商品使用会员折扣后的单价
     */
    disctdPrice: number;
    /**
     * 购买数量
     */
    prdNum: number;
  }[];
  /**
   * 1：商品，21：次卡，22：时段，23：包场<BR>,时段通过日期+时段来区分
   */
  type: number;
  /**
   * 是否使得会员折扣(默认0：否，1：是)
   */
  memberDisct?: number;
}

/**
 * 接口 [我的优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/68474) 的 **返回类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/coupon`
 * @更新时间 `2023-03-03 11:32:08`
 */
export type CbdApiAppletOrderCouponPostResponse = {
  /**
   * 优惠券id
   */
  cpId: string;
  /**
   * 券可使用的商品列表(商品与次卡为skuId，时段及包场为场地ID(价格ID)) ,Long
   */
  prdList?: number[];
  /**
   * 优惠券类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
   */
  type: number;
  /**
   * 优惠券名称
   */
  name: string;
  /**
   * 使用规则
   */
  instruction?: string;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 到期时间
   */
  expireTime?: string;
  /**
   * 使用门槛(默认0)
   */
  thresholdAmount: number;
  /**
   * 当前订单可优惠金额
   */
  discount?: number;
  /**
   * 优惠(折扣或金额)
   */
  discountDesc?: number;
}[];

/**
 * 接口 [我的优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/68474) 的 **请求配置的类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/coupon`
 * @更新时间 `2023-03-03 11:32:08`
 */
type CbdApiAppletOrderCouponPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/coupon",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [我的优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/68474) 的 **请求配置**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/coupon`
 * @更新时间 `2023-03-03 11:32:08`
 */
const cbdApiAppletOrderCouponPostRequestConfig: CbdApiAppletOrderCouponPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_20,
    devUrl: devUrl_0_0_0_20,
    prodUrl: prodUrl_0_0_0_20,
    path: "/cbd-api-applet/order/coupon",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_20,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderCouponPost",
    extraInfo: {}
  };

/**
 * 接口 [我的优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/68474) 的 **请求函数**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/coupon`
 * @更新时间 `2023-03-03 11:32:08`
 */
export const cbdApiAppletOrderCouponPost = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderCouponPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderCouponPostResponse>(
    prepare(cbdApiAppletOrderCouponPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderCouponPost.requestConfig =
  cbdApiAppletOrderCouponPostRequestConfig;

/**
 * 接口 [查询支付结果↗](https://yapi.huianrong.com/project/1692/interface/api/68476) 的 **请求类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/pay/result`
 * @更新时间 `2023-03-03 11:32:14`
 */
export interface CbdApiAppletOrderPayResultGetRequest {
  /**
   * 流水号(String)
   */
  orderNo: string;
}

/**
 * 接口 [查询支付结果↗](https://yapi.huianrong.com/project/1692/interface/api/68476) 的 **返回类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/pay/result`
 * @更新时间 `2023-03-03 11:32:14`
 */
export interface CbdApiAppletOrderPayResultGetResponse {
  /**
   * 支付流水号
   */
  orderNo: string;
  /**
   * 支付状态(0：未支付未退款、1：支付失败退款失败、2:支付成功退款成功查询成功、3:未知、9:删除)
   */
  payStatus?: number;
  /**
   * 失败原因描述
   */
  payResult?: string;
  /**
   * 支付时间
   */
  payTime?: string;
}

/**
 * 接口 [查询支付结果↗](https://yapi.huianrong.com/project/1692/interface/api/68476) 的 **请求配置的类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/pay/result`
 * @更新时间 `2023-03-03 11:32:14`
 */
type CbdApiAppletOrderPayResultGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/pay/result",
    "data",
    string,
    "orderNo",
    false
  >
>;

/**
 * 接口 [查询支付结果↗](https://yapi.huianrong.com/project/1692/interface/api/68476) 的 **请求配置**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/pay/result`
 * @更新时间 `2023-03-03 11:32:14`
 */
const cbdApiAppletOrderPayResultGetRequestConfig: CbdApiAppletOrderPayResultGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_20,
    devUrl: devUrl_0_0_0_20,
    prodUrl: prodUrl_0_0_0_20,
    path: "/cbd-api-applet/order/pay/result",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_20,
    paramNames: [],
    queryNames: ["orderNo"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderPayResultGet",
    extraInfo: {}
  };

/**
 * 接口 [查询支付结果↗](https://yapi.huianrong.com/project/1692/interface/api/68476) 的 **请求函数**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/pay/result`
 * @更新时间 `2023-03-03 11:32:14`
 */
export const cbdApiAppletOrderPayResultGet = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderPayResultGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderPayResultGetResponse>(
    prepare(cbdApiAppletOrderPayResultGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderPayResultGet.requestConfig =
  cbdApiAppletOrderPayResultGetRequestConfig;

/**
 * 接口 [订单预览↗](https://yapi.huianrong.com/project/1692/interface/api/68478) 的 **请求类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/preview`
 * @更新时间 `2023-03-03 11:32:07`
 */
export interface CbdApiAppletOrderPreviewPostRequest {
  /**
   * 商品信息 ,ReqPreviewStorePrdInfo
   */
  storeList: {
    /**
     * 店铺ID
     */
    storeId: number;
    /**
     * 商品信息(与场馆时段信息不能同时为空) ,ReqPreviewPrdInfo
     */
    skuList?: {
      /**
       * SKU
       */
      skuId: number;
      /**
       * 1：商品，21：次卡
       */
      type: number;
      /**
       * 商品数量
       */
      prdNum: number;
    }[];
    /**
     * 场馆商品类型(22：时段，23：包场)
     */
    type?: number;
    /**
     * 场地ID
     */
    venueId?: number;
    /**
     * 场馆时段信息 ,ReqPreviewTimeIntervalInfo
     */
    timeList?: {
      /**
       * 日期(yyyy-MM-dd)
       */
      date: string;
      /**
       * 时间段 ,ReqVenueTimeDto
       */
      timeArr: {
        /**
         * 时间ID(场地时段价格ID，商品类型type=22使用)
         */
        skuId: number;
        /**
         * 开始时间(07:00，HH:mm)
         */
        start: string;
        /**
         * 结束时间(08:00，HH:mm)
         */
        end: string;
      }[];
    }[];
    /**
     * 包场信息 ,ReqPreviewVenueInfo
     */
    venue?: {
      /**
       * 日期(yyyy-MM-dd)
       */
      date: string;
      /**
       * 包场价格ID
       */
      skuId: number;
    };
  }[];
  /**
   * 订单类型(1：商品订单，2：场馆订单)<BR>,商品类型1，21为商品订单，可以加入购物车；22、23为场馆订单，不可加入购物车
   */
  orderType?: number;
}

/**
 * 接口 [订单预览↗](https://yapi.huianrong.com/project/1692/interface/api/68478) 的 **返回类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/preview`
 * @更新时间 `2023-03-03 11:32:07`
 */
export interface CbdApiAppletOrderPreviewPostResponse {
  /**
   * 订单列表 ,RespOrderInfo
   */
  orderList: {
    /**
     * 店铺ID
     */
    storeId: number;
    /**
     * 店铺名称
     */
    storeName: string;
    /**
     * 商品信息 ,RespPrdInfo
     */
    skuList: {
      /**
       * 商品ID
       */
      prdId: number;
      /**
       * SKU
       */
      skuId: number;
      /**
       * 场地ID(场馆订单的价格ID)
       */
      venueId?: number;
      /**
       * 场地名称
       */
      venueName?: string;
      /**
       * 日期(yyyy-mm-dd)<BR>,时段及包场使用
       */
      date?: string;
      /**
       * 时段开始时间(7:00-8:00，7:00-9:00)
       */
      startTime?: string;
      /**
       * 时段结束时间
       */
      endTime?: string;
      /**
       * 商品名称
       */
      prdName?: string;
      /**
       * 所选规格值对应的描述
       */
      specDesc?: string;
      /**
       * 商品状态(1-销售中；2-已售罄；3-已下架)
       */
      status?: number;
      /**
       * 商品价格
       */
      prdPrice: number;
      /**
       * 商品折扣后的单价
       */
      disctdPrice: number;
      /**
       * 图片
       */
      prdPic: string;
      /**
       * 1：商品，21：次卡，22：时段，23：包场<BR>,时段及包场通过日期+时段来区分
       */
      type: number;
      /**
       * 购买数量
       */
      prdNum: number;
    }[];
    /**
     * 会员等级折扣
     */
    memberDisctAmt?: number;
    /**
     * 是否使用会员折扣(0：否，1：是)
     */
    memberDisct?: number;
    /**
     * 优惠券ID
     */
    cpId?: string;
    /**
     * 优惠券优惠金额
     */
    couponAmt?: number;
    /**
     * 积分抵扣金额
     */
    integralAmt?: number;
    /**
     * 订单所属商品类型（1：商品，21：次卡，22：时段，23：包场）
     */
    type: number;
    /**
     * 场地ID
     */
    venueId?: number;
    /**
     * 订单预览标记
     */
    orderMark?: string;
  }[];
  /**
   * 会员等级名称(如黄金会员)
   */
  memberLevel?: string;
  /**
   * 会员折扣比例(如0.95，为空则没有会员折扣)
   */
  memberDisctRate?: number;
  /**
   * 会员可使用积分
   */
  integral?: number;
  /**
   * 积分抵扣规则 ,IntegralRule
   */
  integralRule?: {
    /**
     * 积分抵扣开启状态1、关闭2、开启
     */
    ruleStatus: number;
    /**
     * 兑换比率(100换1元，50换1元)
     */
    rate?: number;
    /**
     * 订单金额门槛
     */
    minAmt?: number;
    /**
     * 抵现金额上限类型1、不限制2、每笔最多抵扣金额3、每笔最多抵扣百分比
     */
    limitType?: number;
    /**
     * 抵扣金额(对应数字)
     */
    limitAmt?: number;
  };
}

/**
 * 接口 [订单预览↗](https://yapi.huianrong.com/project/1692/interface/api/68478) 的 **请求配置的类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/preview`
 * @更新时间 `2023-03-03 11:32:07`
 */
type CbdApiAppletOrderPreviewPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/preview",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [订单预览↗](https://yapi.huianrong.com/project/1692/interface/api/68478) 的 **请求配置**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/preview`
 * @更新时间 `2023-03-03 11:32:07`
 */
const cbdApiAppletOrderPreviewPostRequestConfig: CbdApiAppletOrderPreviewPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_20,
    devUrl: devUrl_0_0_0_20,
    prodUrl: prodUrl_0_0_0_20,
    path: "/cbd-api-applet/order/preview",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_20,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderPreviewPost",
    extraInfo: {}
  };

/**
 * 接口 [订单预览↗](https://yapi.huianrong.com/project/1692/interface/api/68478) 的 **请求函数**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/preview`
 * @更新时间 `2023-03-03 11:32:07`
 */
export const cbdApiAppletOrderPreviewPost = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderPreviewPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderPreviewPostResponse>(
    prepare(cbdApiAppletOrderPreviewPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderPreviewPost.requestConfig =
  cbdApiAppletOrderPreviewPostRequestConfig;

/**
 * 接口 [储值卡消费预览↗](https://yapi.huianrong.com/project/1692/interface/api/72614) 的 **请求类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/member-card/consumerPreview`
 * @更新时间 `2023-03-03 11:27:48`
 */
export interface CbdApiAppletOrderMemberCardConsumerPreviewGetRequest {
  /**
   * 屏蔽储值卡id
   */
  blockMemberCardCodes: string;
  /**
   * 订单金额
   */
  amount: string;
  /**
   * 店铺id
   */
  storeId: string;
  /**
   * 场地id
   */
  venueId: string;
}

/**
 * 接口 [储值卡消费预览↗](https://yapi.huianrong.com/project/1692/interface/api/72614) 的 **返回类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/member-card/consumerPreview`
 * @更新时间 `2023-03-03 11:27:48`
 */
export type CbdApiAppletOrderMemberCardConsumerPreviewGetResponse = {
  /**
   * 储值卡编号
   */
  memberCardCode: string;
  /**
   * 商场logo
   */
  marketLogoUrl: string;
  /**
   * 卡背景url
   */
  cardBackUrl: string;
  /**
   * 卡名称
   */
  cardName: string;
  /**
   * 余额
   */
  balance: number;
  /**
   * 消费金额
   */
  amount: number;
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

/**
 * 接口 [储值卡消费预览↗](https://yapi.huianrong.com/project/1692/interface/api/72614) 的 **请求配置的类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/member-card/consumerPreview`
 * @更新时间 `2023-03-03 11:27:48`
 */
type CbdApiAppletOrderMemberCardConsumerPreviewGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/member-card/consumerPreview",
    "data",
    string,
    "blockMemberCardCodes" | "amount" | "storeId" | "venueId",
    false
  >
>;

/**
 * 接口 [储值卡消费预览↗](https://yapi.huianrong.com/project/1692/interface/api/72614) 的 **请求配置**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/member-card/consumerPreview`
 * @更新时间 `2023-03-03 11:27:48`
 */
const cbdApiAppletOrderMemberCardConsumerPreviewGetRequestConfig: CbdApiAppletOrderMemberCardConsumerPreviewGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_20,
    devUrl: devUrl_0_0_0_20,
    prodUrl: prodUrl_0_0_0_20,
    path: "/cbd-api-applet/order/member-card/consumerPreview",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_20,
    paramNames: [],
    queryNames: ["blockMemberCardCodes", "amount", "storeId", "venueId"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderMemberCardConsumerPreviewGet",
    extraInfo: {}
  };

/**
 * 接口 [储值卡消费预览↗](https://yapi.huianrong.com/project/1692/interface/api/72614) 的 **请求函数**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/member-card/consumerPreview`
 * @更新时间 `2023-03-03 11:27:48`
 */
export const cbdApiAppletOrderMemberCardConsumerPreviewGet = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderMemberCardConsumerPreviewGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderMemberCardConsumerPreviewGetResponse>(
    prepare(
      cbdApiAppletOrderMemberCardConsumerPreviewGetRequestConfig,
      requestData
    ),
    ...args
  );
};

cbdApiAppletOrderMemberCardConsumerPreviewGet.requestConfig =
  cbdApiAppletOrderMemberCardConsumerPreviewGetRequestConfig;

/**
 * 接口 [生成订单↗](https://yapi.huianrong.com/project/1692/interface/api/72616) 的 **请求类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/generate`
 * @更新时间 `2023-03-03 11:32:10`
 */
export interface CbdApiAppletOrderGeneratePostRequest {
  /**
   * 订单列表 ,ReqOrderInfo
   */
  orderList: {
    /**
     * 店铺ID
     */
    storeId: number;
    /**
     * 商品信息 ,ReqPrdInfo
     */
    skuList: {
      /**
       * SKU(type=1或21时不能为空，22及23也有唯一标识)
       */
      skuId: number;
      /**
       * 场地ID
       */
      venueId?: number;
      /**
       * 日期(yyyy-mm-dd)<BR>,时段及包场使用
       */
      date?: string;
      /**
       * 时段(7:00-8:00，7:00-9:00)<BR>,时段及包场使用
       */
      startTime?: string;
      /**
       * 结束时间
       */
      endTime?: string;
      /**
       * 1：商品，21：次卡，22：时段，23：包场<BR>,时段及包场通过日期+时段来区分
       */
      type: number;
      /**
       * 购买数量(type=22或23时默认为1)
       */
      prdNum: number;
    }[];
    /**
     * 优惠券ID(为空则没使用优惠券)
     */
    cpId?: string;
    /**
     * 优惠券优惠金额
     */
    couponAmt?: number;
    /**
     * 会员折扣
     */
    memberDisctAmt?: number;
    /**
     * 使用积分数量(为空或0则未使用积分抵扣)
     */
    integral?: number;
    /**
     * 积分抵扣金额
     */
    integralAmt?: number;
    /**
     * 订单所属商品类型（1：商品，21：次卡，22：时段，23：包场）
     */
    type: number;
    /**
     * 场地ID
     */
    venueId?: number;
    /**
     * 买家留言
     */
    buyerMsg?: string;
    /**
     * 订单预览标记
     */
    orderMark?: string;
  }[];
}

/**
 * 接口 [生成订单↗](https://yapi.huianrong.com/project/1692/interface/api/72616) 的 **返回类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/generate`
 * @更新时间 `2023-03-03 11:32:10`
 */
export interface CbdApiAppletOrderGeneratePostResponse {
  /**
   * 总订单号
   */
  serialNo?: string;
  /**
   * 订单列表 ,RespClientOrderDto
   */
  orderList?: {
    /**
     * 店铺ID
     */
    storeId?: number;
    /**
     * 场馆ID
     */
    venueId?: number;
    /**
     * 订单号(子订单号)
     */
    orderNo?: string;
    /**
     * 订单标记
     */
    orderRemark?: string;
    /**
     * 订单应付金额
     */
    payAmt?: number;
  }[];
}

/**
 * 接口 [生成订单↗](https://yapi.huianrong.com/project/1692/interface/api/72616) 的 **请求配置的类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/generate`
 * @更新时间 `2023-03-03 11:32:10`
 */
type CbdApiAppletOrderGeneratePostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/generate",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [生成订单↗](https://yapi.huianrong.com/project/1692/interface/api/72616) 的 **请求配置**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/generate`
 * @更新时间 `2023-03-03 11:32:10`
 */
const cbdApiAppletOrderGeneratePostRequestConfig: CbdApiAppletOrderGeneratePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_20,
    devUrl: devUrl_0_0_0_20,
    prodUrl: prodUrl_0_0_0_20,
    path: "/cbd-api-applet/order/generate",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_20,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderGeneratePost",
    extraInfo: {}
  };

/**
 * 接口 [生成订单↗](https://yapi.huianrong.com/project/1692/interface/api/72616) 的 **请求函数**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/generate`
 * @更新时间 `2023-03-03 11:32:10`
 */
export const cbdApiAppletOrderGeneratePost = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderGeneratePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderGeneratePostResponse>(
    prepare(cbdApiAppletOrderGeneratePostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderGeneratePost.requestConfig =
  cbdApiAppletOrderGeneratePostRequestConfig;

/**
 * 接口 [提交支付↗](https://yapi.huianrong.com/project/1692/interface/api/72618) 的 **请求类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/submit/payment`
 * @更新时间 `2023-03-03 11:32:10`
 */
export interface CbdApiAppletOrderSubmitPaymentPostRequest {
  /**
   * 总订单号
   */
  serialNo: string;
  /**
   * 订单列表 ,ReqClientOrderPayDto
   */
  orderList?: {
    /**
     * 店铺ID
     */
    storeId: number;
    /**
     * 场馆ID
     */
    venueId?: number;
    /**
     * 订单号(子订单号)
     */
    orderNo: string;
    /**
     * 订单标记
     */
    orderRemark?: string;
    /**
     * 订单应付金额
     */
    wechatAmt?: number;
    /**
     * 储值卡使用列表 ,ReqOrderMemberCard
     */
    memberCardList?: {
      /**
       * 会员储值卡号
       */
      memberCardCode: string;
      /**
       * 储值卡支付金额
       */
      amount: number;
      /**
       * 优惠金额
       */
      discountAmount?: number;
    }[];
  }[];
}

/**
 * 接口 [提交支付↗](https://yapi.huianrong.com/project/1692/interface/api/72618) 的 **返回类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/submit/payment`
 * @更新时间 `2023-03-03 11:32:10`
 */
export interface CbdApiAppletOrderSubmitPaymentPostResponse {
  /**
   * 订单号
   */
  orderNo: string;
}

/**
 * 接口 [提交支付↗](https://yapi.huianrong.com/project/1692/interface/api/72618) 的 **请求配置的类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/submit/payment`
 * @更新时间 `2023-03-03 11:32:10`
 */
type CbdApiAppletOrderSubmitPaymentPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/submit/payment",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [提交支付↗](https://yapi.huianrong.com/project/1692/interface/api/72618) 的 **请求配置**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/submit/payment`
 * @更新时间 `2023-03-03 11:32:10`
 */
const cbdApiAppletOrderSubmitPaymentPostRequestConfig: CbdApiAppletOrderSubmitPaymentPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_20,
    devUrl: devUrl_0_0_0_20,
    prodUrl: prodUrl_0_0_0_20,
    path: "/cbd-api-applet/order/submit/payment",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_20,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderSubmitPaymentPost",
    extraInfo: {}
  };

/**
 * 接口 [提交支付↗](https://yapi.huianrong.com/project/1692/interface/api/72618) 的 **请求函数**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/submit/payment`
 * @更新时间 `2023-03-03 11:32:10`
 */
export const cbdApiAppletOrderSubmitPaymentPost = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderSubmitPaymentPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderSubmitPaymentPostResponse>(
    prepare(cbdApiAppletOrderSubmitPaymentPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderSubmitPaymentPost.requestConfig =
  cbdApiAppletOrderSubmitPaymentPostRequestConfig;

/**
 * 接口 [获取微信支付凭证↗](https://yapi.huianrong.com/project/1692/interface/api/72620) 的 **请求类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/payment/sign`
 * @更新时间 `2023-03-03 11:32:11`
 */
export interface CbdApiAppletOrderPaymentSignGetRequest {
  /**
   * 订单号(String)
   */
  orderNo: string;
}

/**
 * 接口 [获取微信支付凭证↗](https://yapi.huianrong.com/project/1692/interface/api/72620) 的 **返回类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/payment/sign`
 * @更新时间 `2023-03-03 11:32:11`
 */
export interface CbdApiAppletOrderPaymentSignGetResponse {
  /**
   * 支付系统业务流水号(查询支付结果使用)
   */
  serverRspNo: string;
  /**
   * 订单编号
   */
  orderNo?: string;
  /**
   * 公众号id或小程序id(调起支付所需)
   */
  appid?: string;
  /**
   * busiCode为1005时才返回（调起支付所需）
   */
  partnerid?: string;
  /**
   * busiCode为1005时才返回（调起支付所需）
   */
  prepayid?: string;
  /**
   * 时间戳，自1970年1月1日0点0分0秒以来的秒数(调起支付所需)
   */
  timestamp?: string;
  /**
   * 随机字符串（调起支付所需）
   */
  noncestr?: string;
  /**
   * 数据包（调起支付所需）
   */
  dataPackage?: string;
  /**
   * 签名（调起支付所需）
   */
  paysign?: string;
  /**
   * 签名算法
   */
  signType?: string;
}

/**
 * 接口 [获取微信支付凭证↗](https://yapi.huianrong.com/project/1692/interface/api/72620) 的 **请求配置的类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/payment/sign`
 * @更新时间 `2023-03-03 11:32:11`
 */
type CbdApiAppletOrderPaymentSignGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/payment/sign",
    "data",
    string,
    "orderNo",
    false
  >
>;

/**
 * 接口 [获取微信支付凭证↗](https://yapi.huianrong.com/project/1692/interface/api/72620) 的 **请求配置**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/payment/sign`
 * @更新时间 `2023-03-03 11:32:11`
 */
const cbdApiAppletOrderPaymentSignGetRequestConfig: CbdApiAppletOrderPaymentSignGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_20,
    devUrl: devUrl_0_0_0_20,
    prodUrl: prodUrl_0_0_0_20,
    path: "/cbd-api-applet/order/payment/sign",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_20,
    paramNames: [],
    queryNames: ["orderNo"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderPaymentSignGet",
    extraInfo: {}
  };

/**
 * 接口 [获取微信支付凭证↗](https://yapi.huianrong.com/project/1692/interface/api/72620) 的 **请求函数**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `GET /cbd-api-applet/order/payment/sign`
 * @更新时间 `2023-03-03 11:32:11`
 */
export const cbdApiAppletOrderPaymentSignGet = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderPaymentSignGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderPaymentSignGetResponse>(
    prepare(cbdApiAppletOrderPaymentSignGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderPaymentSignGet.requestConfig =
  cbdApiAppletOrderPaymentSignGetRequestConfig;

/**
 * 接口 [查询储值卡支付结果↗](https://yapi.huianrong.com/project/1692/interface/api/72624) 的 **请求类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/payment/result`
 * @更新时间 `2023-03-03 11:32:13`
 */
export interface CbdApiAppletOrderPaymentResultPostRequest {
  /**
   * 订单号
   */
  orderNo: string;
}

/**
 * 接口 [查询储值卡支付结果↗](https://yapi.huianrong.com/project/1692/interface/api/72624) 的 **返回类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/payment/result`
 * @更新时间 `2023-03-03 11:32:13`
 */
export interface CbdApiAppletOrderPaymentResultPostResponse {
  /**
   * 支付流水号
   */
  orderNo: string;
  /**
   * 支付状态(0：未支付未退款、1：支付失败退款失败、2:支付成功退款成功查询成功、3:未知、9:删除)
   */
  payStatus?: number;
  /**
   * 失败原因描述
   */
  payResult?: string;
  /**
   * 支付时间
   */
  payTime?: string;
}

/**
 * 接口 [查询储值卡支付结果↗](https://yapi.huianrong.com/project/1692/interface/api/72624) 的 **请求配置的类型**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/payment/result`
 * @更新时间 `2023-03-03 11:32:13`
 */
type CbdApiAppletOrderPaymentResultPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/order/payment/result",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [查询储值卡支付结果↗](https://yapi.huianrong.com/project/1692/interface/api/72624) 的 **请求配置**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/payment/result`
 * @更新时间 `2023-03-03 11:32:13`
 */
const cbdApiAppletOrderPaymentResultPostRequestConfig: CbdApiAppletOrderPaymentResultPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_20,
    devUrl: devUrl_0_0_0_20,
    prodUrl: prodUrl_0_0_0_20,
    path: "/cbd-api-applet/order/payment/result",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_20,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletOrderPaymentResultPost",
    extraInfo: {}
  };

/**
 * 接口 [查询储值卡支付结果↗](https://yapi.huianrong.com/project/1692/interface/api/72624) 的 **请求函数**
 *
 * @分类 [提交订单↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21979)
 * @请求头 `POST /cbd-api-applet/order/payment/result`
 * @更新时间 `2023-03-03 11:32:13`
 */
export const cbdApiAppletOrderPaymentResultPost = /*#__PURE__*/ (
  requestData: CbdApiAppletOrderPaymentResultPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletOrderPaymentResultPostResponse>(
    prepare(cbdApiAppletOrderPaymentResultPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletOrderPaymentResultPost.requestConfig =
  cbdApiAppletOrderPaymentResultPostRequestConfig;

const mockUrl_0_0_0_21 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_21 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_21 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_21 = "data" as any;

/**
 * 接口 [优惠券可用店铺↗](https://yapi.huianrong.com/project/1692/interface/api/68480) 的 **请求类型**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/couponUseStoreList`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCouponCouponUseStoreListGetRequest {
  /**
   * 优惠券id
   */
  id: string;
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
 * 接口 [优惠券可用店铺↗](https://yapi.huianrong.com/project/1692/interface/api/68480) 的 **返回类型**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/couponUseStoreList`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCouponCouponUseStoreListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 店铺ID
     */
    id: number;
    /**
     * 店铺类型1自营2联营
     */
    type: number;
    /**
     * 店铺名称
     */
    name: string;
    /**
     * 业态ID
     */
    sceneId: number;
    /**
     * 业态 ,DictData
     */
    scene: {
      /**
       * id
       */
      id?: number;
      /**
       * 显示名称
       */
      name?: string;
    };
    /**
     * 月销量
     */
    monthSaleNum: number;
    /**
     * 推荐优惠列表 ,Coupon
     */
    recommendCoupons?: {
      /**
       * 优惠券ID
       */
      id?: number;
      /**
       * 名称
       */
      name: string;
      /**
       * 类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
       */
      type: number;
      /**
       * 是否有门槛0无1有
       */
      required: number;
    }[];
    /**
     * 推荐商品(包含商品与场馆) ,GoodData
     */
    recommendGoods?: {
      /**
       * 商品ID场馆ID
       */
      spuId: number;
      /**
       * 规格ID规格价格ID
       */
      skuId: number;
      /**
       * 类型1商品，2场馆
       */
      goodType: number;
      /**
       * 名称
       */
      name: string;
      /**
       * 封面附件
       */
      coverAttachment: string;
      /**
       * 划线价只有商品时才有
       */
      scribingPrice?: number;
      /**
       * 销售价
       */
      salePrice: number;
    }[];
    /**
     * 经营状态1营业中;2打烊;
     */
    operatingStatus: number;
    /**
     * 营业时间,打烊时为空
     */
    openTime?: string;
    /**
     * 店铺logo附件
     */
    logoAttachment?: string;
    /**
     * 特色服务 ,String
     */
    feature?: string[];
  }[];
}

/**
 * 接口 [优惠券可用店铺↗](https://yapi.huianrong.com/project/1692/interface/api/68480) 的 **请求配置的类型**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/couponUseStoreList`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCouponCouponUseStoreListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/coupon/couponUseStoreList",
    "data",
    string,
    "id" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [优惠券可用店铺↗](https://yapi.huianrong.com/project/1692/interface/api/68480) 的 **请求配置**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/couponUseStoreList`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCouponCouponUseStoreListGetRequestConfig: CbdApiAppletCouponCouponUseStoreListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_21,
    devUrl: devUrl_0_0_0_21,
    prodUrl: prodUrl_0_0_0_21,
    path: "/cbd-api-applet/coupon/couponUseStoreList",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_21,
    paramNames: [],
    queryNames: ["id", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCouponCouponUseStoreListGet",
    extraInfo: {}
  };

/**
 * 接口 [优惠券可用店铺↗](https://yapi.huianrong.com/project/1692/interface/api/68480) 的 **请求函数**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/couponUseStoreList`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCouponCouponUseStoreListGet = /*#__PURE__*/ (
  requestData: CbdApiAppletCouponCouponUseStoreListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCouponCouponUseStoreListGetResponse>(
    prepare(cbdApiAppletCouponCouponUseStoreListGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCouponCouponUseStoreListGet.requestConfig =
  cbdApiAppletCouponCouponUseStoreListGetRequestConfig;

/**
 * 接口 [优惠券详情↗](https://yapi.huianrong.com/project/1692/interface/api/68482) 的 **请求类型**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/couponInfo`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCouponCouponInfoGetRequest {
  /**
   * 优惠券id
   */
  id: string;
  /**
   * 会员优惠券码
   */
  code: string;
}

/**
 * 接口 [优惠券详情↗](https://yapi.huianrong.com/project/1692/interface/api/68482) 的 **返回类型**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/couponInfo`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCouponCouponInfoGetResponse {
  /**
   * 优惠券id
   */
  id: number;
  /**
   * 会员优惠券码
   */
  code?: string;
  /**
   * 优惠券类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
   */
  type: number;
  /**
   * 优惠券名称
   */
  name: string;
  /**
   * 使用说明
   */
  instruction?: string;
  /**
   * 开始时间eg：yyyy-MM-ddHH:mm:ss
   */
  startTime: string;
  /**
   * 到期时间eg：yyyy-MM-ddHH:mm:ss
   */
  expireTime: string;
  /**
   * 剩余数量
   */
  quantity?: number;
  /**
   * 使用门槛
   */
  thresholdAmount: number;
  /**
   * 优惠
   */
  discount?: string;
  /**
   * 积分
   */
  integral?: number;
  /**
   * 是否已领取true:是，false:否
   */
  received?: boolean;
  /**
   * 已领取优惠券状态(0-未使用；1-已使用；2-已过期)
   */
  status?: number;
  /**
   * 领取人限制 ,Recipient
   */
  recipient?: {
    /**
     * 类型1.不限制，所有人可领取，2.指定会员等级或该等级以上可领取
     */
    type?: number;
    /**
     * 会员等级 ,String
     */
    memberLevel?: string[];
  };
  /**
   * 每人限领次数 ,PerPerson
   */
  perPerson?: {
    /**
     * 类型：1:限领次数，2:每人每天限领次数
     */
    type?: number;
    /**
     * 次数
     */
    number?: number;
  };
}

/**
 * 接口 [优惠券详情↗](https://yapi.huianrong.com/project/1692/interface/api/68482) 的 **请求配置的类型**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/couponInfo`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCouponCouponInfoGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/coupon/couponInfo",
    "data",
    string,
    "id" | "code",
    false
  >
>;

/**
 * 接口 [优惠券详情↗](https://yapi.huianrong.com/project/1692/interface/api/68482) 的 **请求配置**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/couponInfo`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCouponCouponInfoGetRequestConfig: CbdApiAppletCouponCouponInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_21,
    devUrl: devUrl_0_0_0_21,
    prodUrl: prodUrl_0_0_0_21,
    path: "/cbd-api-applet/coupon/couponInfo",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_21,
    paramNames: [],
    queryNames: ["id", "code"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCouponCouponInfoGet",
    extraInfo: {}
  };

/**
 * 接口 [优惠券详情↗](https://yapi.huianrong.com/project/1692/interface/api/68482) 的 **请求函数**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/couponInfo`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCouponCouponInfoGet = /*#__PURE__*/ (
  requestData: CbdApiAppletCouponCouponInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCouponCouponInfoGetResponse>(
    prepare(cbdApiAppletCouponCouponInfoGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCouponCouponInfoGet.requestConfig =
  cbdApiAppletCouponCouponInfoGetRequestConfig;

/**
 * 接口 [立即支付↗](https://yapi.huianrong.com/project/1692/interface/api/68484) 的 **请求类型**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `POST /cbd-api-applet/coupon/buyCoupon`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCouponBuyCouponPostRequest {
  /**
   * 优惠券id
   */
  id: number;
  /**
   * 积分
   */
  integral: number;
}

/**
 * 接口 [立即支付↗](https://yapi.huianrong.com/project/1692/interface/api/68484) 的 **返回类型**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `POST /cbd-api-applet/coupon/buyCoupon`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCouponBuyCouponPostResponse {
  /**
   * 响应码（200：成功，其他失败）
   */
  code: number;
  /**
   * 响应文本
   */
  msg: string;
}

/**
 * 接口 [立即支付↗](https://yapi.huianrong.com/project/1692/interface/api/68484) 的 **请求配置的类型**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `POST /cbd-api-applet/coupon/buyCoupon`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCouponBuyCouponPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/coupon/buyCoupon",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [立即支付↗](https://yapi.huianrong.com/project/1692/interface/api/68484) 的 **请求配置**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `POST /cbd-api-applet/coupon/buyCoupon`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCouponBuyCouponPostRequestConfig: CbdApiAppletCouponBuyCouponPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_21,
    devUrl: devUrl_0_0_0_21,
    prodUrl: prodUrl_0_0_0_21,
    path: "/cbd-api-applet/coupon/buyCoupon",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_21,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCouponBuyCouponPost",
    extraInfo: {}
  };

/**
 * 接口 [立即支付↗](https://yapi.huianrong.com/project/1692/interface/api/68484) 的 **请求函数**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `POST /cbd-api-applet/coupon/buyCoupon`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCouponBuyCouponPost = /*#__PURE__*/ (
  requestData: CbdApiAppletCouponBuyCouponPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCouponBuyCouponPostResponse>(
    prepare(cbdApiAppletCouponBuyCouponPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCouponBuyCouponPost.requestConfig =
  cbdApiAppletCouponBuyCouponPostRequestConfig;

/**
 * 接口 [立即领取↗](https://yapi.huianrong.com/project/1692/interface/api/68486) 的 **请求类型**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/receiveCoupon/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCouponReceiveCouponIdGetRequest {
  /**
   * 优惠券(Long)
   */
  id: string;
}

/**
 * 接口 [立即领取↗](https://yapi.huianrong.com/project/1692/interface/api/68486) 的 **返回类型**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/receiveCoupon/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export interface CbdApiAppletCouponReceiveCouponIdGetResponse {
  /**
   * 开始时间eg：yyyy-MM-ddHH:mm:ss
   */
  startTime: string;
  /**
   * 到期时间eg：yyyy-MM-ddHH:mm:ss
   */
  expireTime: string;
}

/**
 * 接口 [立即领取↗](https://yapi.huianrong.com/project/1692/interface/api/68486) 的 **请求配置的类型**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/receiveCoupon/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
type CbdApiAppletCouponReceiveCouponIdGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/coupon/receiveCoupon/{id}",
    "data",
    "id",
    string,
    false
  >
>;

/**
 * 接口 [立即领取↗](https://yapi.huianrong.com/project/1692/interface/api/68486) 的 **请求配置**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/receiveCoupon/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
const cbdApiAppletCouponReceiveCouponIdGetRequestConfig: CbdApiAppletCouponReceiveCouponIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_21,
    devUrl: devUrl_0_0_0_21,
    prodUrl: prodUrl_0_0_0_21,
    path: "/cbd-api-applet/coupon/receiveCoupon/{id}",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_21,
    paramNames: ["id"],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletCouponReceiveCouponIdGet",
    extraInfo: {}
  };

/**
 * 接口 [立即领取↗](https://yapi.huianrong.com/project/1692/interface/api/68486) 的 **请求函数**
 *
 * @分类 [优惠券↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21981)
 * @请求头 `GET /cbd-api-applet/coupon/receiveCoupon/{id}`
 * @更新时间 `2022-11-09 14:19:07`
 */
export const cbdApiAppletCouponReceiveCouponIdGet = /*#__PURE__*/ (
  requestData: CbdApiAppletCouponReceiveCouponIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletCouponReceiveCouponIdGetResponse>(
    prepare(cbdApiAppletCouponReceiveCouponIdGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletCouponReceiveCouponIdGet.requestConfig =
  cbdApiAppletCouponReceiveCouponIdGetRequestConfig;

const mockUrl_0_0_0_22 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_22 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_22 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_22 = "data" as any;

/**
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68488) 的 **请求类型**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/format/selectFormat`
 * @更新时间 `2022-11-09 14:19:08`
 */
export interface CbdApiAppletFormatSelectFormatGetRequest {
  /**
   * 父ID，为空返回1级
   */
  parentId: string;
}

/**
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68488) 的 **返回类型**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/format/selectFormat`
 * @更新时间 `2022-11-09 14:19:08`
 */
export type CbdApiAppletFormatSelectFormatGetResponse = {
  /**
   * id
   */
  value?: number;
  /**
   * 名称
   */
  label?: string;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 是否是子节点,true表示没有下级节点false表示有下级节点，此参数不表示是否有子节点
   */
  isLeaf?: boolean;
}[];

/**
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68488) 的 **请求配置的类型**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/format/selectFormat`
 * @更新时间 `2022-11-09 14:19:08`
 */
type CbdApiAppletFormatSelectFormatGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/format/selectFormat",
    "data",
    string,
    "parentId",
    false
  >
>;

/**
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68488) 的 **请求配置**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/format/selectFormat`
 * @更新时间 `2022-11-09 14:19:08`
 */
const cbdApiAppletFormatSelectFormatGetRequestConfig: CbdApiAppletFormatSelectFormatGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_22,
    devUrl: devUrl_0_0_0_22,
    prodUrl: prodUrl_0_0_0_22,
    path: "/cbd-api-applet/format/selectFormat",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_22,
    paramNames: [],
    queryNames: ["parentId"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletFormatSelectFormatGet",
    extraInfo: {}
  };

/**
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1692/interface/api/68488) 的 **请求函数**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/format/selectFormat`
 * @更新时间 `2022-11-09 14:19:08`
 */
export const cbdApiAppletFormatSelectFormatGet = /*#__PURE__*/ (
  requestData: CbdApiAppletFormatSelectFormatGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletFormatSelectFormatGetResponse>(
    prepare(cbdApiAppletFormatSelectFormatGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletFormatSelectFormatGet.requestConfig =
  cbdApiAppletFormatSelectFormatGetRequestConfig;

/**
 * 接口 [业态店铺列表↗](https://yapi.huianrong.com/project/1692/interface/api/68490) 的 **请求类型**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/store/list`
 * @更新时间 `2023-03-04 16:25:04`
 */
export interface CbdApiAppletStoreListGetRequest {
  /**
   * 业态ID
   */
  formatId: string;
  /**
   * 排序类型：,0:智能排序(暂以最新开张匹配),1:热度最高(未实现产品未定规则),2:销量优先,3:最新开张,4:我的收藏(未实现暂没收藏功能)
   */
  sortType: string;
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
 * 接口 [业态店铺列表↗](https://yapi.huianrong.com/project/1692/interface/api/68490) 的 **返回类型**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/store/list`
 * @更新时间 `2023-03-04 16:25:04`
 */
export interface CbdApiAppletStoreListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 店铺ID,冗余字段
     */
    storeId: number;
    /**
     * 店铺ID
     */
    id: number;
    /**
     * 店铺类型1自营2联营
     */
    type: number;
    /**
     * 店铺名称
     */
    name: string;
    /**
     * 业态ID
     */
    sceneId: number;
    /**
     * 业态 ,DictData
     */
    scene: {
      /**
       * id
       */
      id?: number;
      /**
       * 显示名称
       */
      name?: string;
    };
    /**
     * 月销量
     */
    monthSaleNum: number;
    /**
     * 推荐优惠列表 ,Coupon
     */
    recommendCoupons?: {
      /**
       * 优惠券ID
       */
      id?: number;
      /**
       * 名称
       */
      name: string;
      /**
       * 类型1：满减券；2：折扣券；3：礼品券；4：积分现金券
       */
      type: number;
      /**
       * 是否有门槛0无1有
       */
      required: number;
    }[];
    /**
     * 推荐商品(包含商品与场馆) ,GoodData
     */
    recommendGoods?: {
      /**
       * 商品ID场馆ID
       */
      spuId: number;
      /**
       * 规格ID规格价格ID
       */
      skuId: number;
      /**
       * 类型1商品，2场馆
       */
      goodType: number;
      /**
       * 场馆sku类型1次卡2时段3包场
       */
      ruleType?: number;
      /**
       * 名称
       */
      name: string;
      /**
       * 封面附件
       */
      coverAttachment: string;
      /**
       * 划线价只有商品时才有
       */
      scribingPrice?: number;
      /**
       * 销售价
       */
      salePrice: number;
    }[];
    /**
     * 经营状态1营业中;2打烊;
     */
    operatingStatus: number;
    /**
     * 营业时间,打烊时为空
     */
    openTime?: string;
    /**
     * 店铺logo附件
     */
    logoAttachment?: string;
    /**
     * 特色服务 ,String
     */
    feature?: string[];
  }[];
}

/**
 * 接口 [业态店铺列表↗](https://yapi.huianrong.com/project/1692/interface/api/68490) 的 **请求配置的类型**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/store/list`
 * @更新时间 `2023-03-04 16:25:04`
 */
type CbdApiAppletStoreListGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/store/list",
    "data",
    string,
    "formatId" | "sortType" | "pageNum" | "pageSize",
    false
  >
>;

/**
 * 接口 [业态店铺列表↗](https://yapi.huianrong.com/project/1692/interface/api/68490) 的 **请求配置**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/store/list`
 * @更新时间 `2023-03-04 16:25:04`
 */
const cbdApiAppletStoreListGetRequestConfig: CbdApiAppletStoreListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_22,
    devUrl: devUrl_0_0_0_22,
    prodUrl: prodUrl_0_0_0_22,
    path: "/cbd-api-applet/store/list",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_22,
    paramNames: [],
    queryNames: ["formatId", "sortType", "pageNum", "pageSize"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletStoreListGet",
    extraInfo: {}
  };

/**
 * 接口 [业态店铺列表↗](https://yapi.huianrong.com/project/1692/interface/api/68490) 的 **请求函数**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/store/list`
 * @更新时间 `2023-03-04 16:25:04`
 */
export const cbdApiAppletStoreListGet = /*#__PURE__*/ (
  requestData: CbdApiAppletStoreListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletStoreListGetResponse>(
    prepare(cbdApiAppletStoreListGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletStoreListGet.requestConfig = cbdApiAppletStoreListGetRequestConfig;

/**
 * 接口 [业态树↗](https://yapi.huianrong.com/project/1692/interface/api/68492) 的 **请求类型**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/format/tree`
 * @更新时间 `2022-11-09 14:19:08`
 */
export interface CbdApiAppletFormatTreeGetRequest {
  /**
   * 父ID(Long)
   */
  parentId: string;
}

/**
 * 接口 [业态树↗](https://yapi.huianrong.com/project/1692/interface/api/68492) 的 **返回类型**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/format/tree`
 * @更新时间 `2022-11-09 14:19:08`
 */
export type CbdApiAppletFormatTreeGetResponse = {
  /**
   * id值
   */
  value?: number;
  /**
   * 显示值
   */
  text?: string;
  icon?: string;
  /**
   * 是否是子节点,true表示没有下级节点false表示有下级节点，此参数不表示是否有子节点
   */
  isLeaf?: boolean;
  /**
   * 下级数据 ,RespFormatTreeDto
   */
  children?: {
    [k: string]: unknown;
  }[];
}[];

/**
 * 接口 [业态树↗](https://yapi.huianrong.com/project/1692/interface/api/68492) 的 **请求配置的类型**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/format/tree`
 * @更新时间 `2022-11-09 14:19:08`
 */
type CbdApiAppletFormatTreeGetRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/format/tree",
    "data",
    string,
    "parentId",
    false
  >
>;

/**
 * 接口 [业态树↗](https://yapi.huianrong.com/project/1692/interface/api/68492) 的 **请求配置**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/format/tree`
 * @更新时间 `2022-11-09 14:19:08`
 */
const cbdApiAppletFormatTreeGetRequestConfig: CbdApiAppletFormatTreeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_22,
    devUrl: devUrl_0_0_0_22,
    prodUrl: prodUrl_0_0_0_22,
    path: "/cbd-api-applet/format/tree",
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_22,
    paramNames: [],
    queryNames: ["parentId"],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletFormatTreeGet",
    extraInfo: {}
  };

/**
 * 接口 [业态树↗](https://yapi.huianrong.com/project/1692/interface/api/68492) 的 **请求函数**
 *
 * @分类 [业态↗](https://yapi.huianrong.com/project/1692/interface/api/cat_21983)
 * @请求头 `GET /cbd-api-applet/format/tree`
 * @更新时间 `2022-11-09 14:19:08`
 */
export const cbdApiAppletFormatTreeGet = /*#__PURE__*/ (
  requestData: CbdApiAppletFormatTreeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletFormatTreeGetResponse>(
    prepare(cbdApiAppletFormatTreeGetRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletFormatTreeGet.requestConfig =
  cbdApiAppletFormatTreeGetRequestConfig;

const mockUrl_0_0_0_26 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_26 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_26 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_26 = "data" as any;

/**
 * 接口 [生成小程序码↗](https://yapi.huianrong.com/project/1692/interface/api/72686) 的 **请求类型**
 *
 * @分类 [小程序↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23239)
 * @请求头 `POST /cbd-api-applet/wechat/applet/wxa-code`
 * @更新时间 `2023-03-04 16:24:59`
 */
export interface CbdApiAppletWechatAppletWxaCodePostRequest {
  /**
   * 小程序appid
   */
  appletAppid: string;
  /**
   * 扫码进入的小程序页面路径
   */
  path: string;
  /**
   * 默认"release"要打开的小程序版本。正式版为"release"，体验版为"trial"，开发版为"develop"
   */
  envVersion?: string;
  /**
   * 默认430二维码的宽度
   */
  width?: number;
  /**
   * 默认true自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调
   */
  autoColor?: boolean;
  /**
   * autoColor为false时生效，使用rgb设置颜色例如{"r":"xxx","g":"xxx","b":"xxx"} ,CodeLineColor
   */
  CodeLineColor?: {
    r?: string;
    g?: string;
    b?: string;
  };
  /**
   * 是否需要透明底色，isHyaline为true时，生成透明底色的小程序码
   */
  isHyaline?: boolean;
}

/**
 * 接口 [生成小程序码↗](https://yapi.huianrong.com/project/1692/interface/api/72686) 的 **返回类型**
 *
 * @分类 [小程序↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23239)
 * @请求头 `POST /cbd-api-applet/wechat/applet/wxa-code`
 * @更新时间 `2023-03-04 16:24:59`
 */
export interface CbdApiAppletWechatAppletWxaCodePostResponse {
  /**
   * base64图片
   */
  codeBase64?: string;
}

/**
 * 接口 [生成小程序码↗](https://yapi.huianrong.com/project/1692/interface/api/72686) 的 **请求配置的类型**
 *
 * @分类 [小程序↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23239)
 * @请求头 `POST /cbd-api-applet/wechat/applet/wxa-code`
 * @更新时间 `2023-03-04 16:24:59`
 */
type CbdApiAppletWechatAppletWxaCodePostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/wechat/applet/wxa-code",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [生成小程序码↗](https://yapi.huianrong.com/project/1692/interface/api/72686) 的 **请求配置**
 *
 * @分类 [小程序↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23239)
 * @请求头 `POST /cbd-api-applet/wechat/applet/wxa-code`
 * @更新时间 `2023-03-04 16:24:59`
 */
const cbdApiAppletWechatAppletWxaCodePostRequestConfig: CbdApiAppletWechatAppletWxaCodePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_26,
    devUrl: devUrl_0_0_0_26,
    prodUrl: prodUrl_0_0_0_26,
    path: "/cbd-api-applet/wechat/applet/wxa-code",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_26,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletWechatAppletWxaCodePost",
    extraInfo: {}
  };

/**
 * 接口 [生成小程序码↗](https://yapi.huianrong.com/project/1692/interface/api/72686) 的 **请求函数**
 *
 * @分类 [小程序↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23239)
 * @请求头 `POST /cbd-api-applet/wechat/applet/wxa-code`
 * @更新时间 `2023-03-04 16:24:59`
 */
export const cbdApiAppletWechatAppletWxaCodePost = /*#__PURE__*/ (
  requestData: CbdApiAppletWechatAppletWxaCodePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletWechatAppletWxaCodePostResponse>(
    prepare(cbdApiAppletWechatAppletWxaCodePostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletWechatAppletWxaCodePost.requestConfig =
  cbdApiAppletWechatAppletWxaCodePostRequestConfig;

const mockUrl_0_0_0_27 = "https://yapi.huianrong.com/mock/1692" as any;
const devUrl_0_0_0_27 = "http://192.168.50.12:8082" as any;
const prodUrl_0_0_0_27 = "https://cbd.t-cube.cn" as any;
const dataKey_0_0_0_27 = "data" as any;

/**
 * 接口 [储值卡支付接口↗](https://yapi.huianrong.com/project/1692/interface/api/72688) 的 **请求类型**
 *
 * @分类 [期限卡/次卡支付↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23241)
 * @请求头 `POST /cbd-api-applet/ground_card_order/card_pay`
 * @更新时间 `2023-03-04 17:54:57`
 */
export interface CbdApiAppletGroundCardOrderCardPayPostRequest {
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
 * 接口 [储值卡支付接口↗](https://yapi.huianrong.com/project/1692/interface/api/72688) 的 **返回类型**
 *
 * @分类 [期限卡/次卡支付↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23241)
 * @请求头 `POST /cbd-api-applet/ground_card_order/card_pay`
 * @更新时间 `2023-03-04 17:54:57`
 */
export interface CbdApiAppletGroundCardOrderCardPayPostResponse {
  /**
   * 交易单(业务订单编号)
   */
  tradeNo?: string;
  /**
   * 储值卡交易单(支付单编号)
   */
  cardTradeNo?: string;
  /**
   * 应付金额
   */
  amount?: number;
  /**
   * 优惠金额
   */
  discountAmount?: number;
}

/**
 * 接口 [储值卡支付接口↗](https://yapi.huianrong.com/project/1692/interface/api/72688) 的 **请求配置的类型**
 *
 * @分类 [期限卡/次卡支付↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23241)
 * @请求头 `POST /cbd-api-applet/ground_card_order/card_pay`
 * @更新时间 `2023-03-04 17:54:57`
 */
type CbdApiAppletGroundCardOrderCardPayPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/ground_card_order/card_pay",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [储值卡支付接口↗](https://yapi.huianrong.com/project/1692/interface/api/72688) 的 **请求配置**
 *
 * @分类 [期限卡/次卡支付↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23241)
 * @请求头 `POST /cbd-api-applet/ground_card_order/card_pay`
 * @更新时间 `2023-03-04 17:54:57`
 */
const cbdApiAppletGroundCardOrderCardPayPostRequestConfig: CbdApiAppletGroundCardOrderCardPayPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_27,
    devUrl: devUrl_0_0_0_27,
    prodUrl: prodUrl_0_0_0_27,
    path: "/cbd-api-applet/ground_card_order/card_pay",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_27,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletGroundCardOrderCardPayPost",
    extraInfo: {}
  };

/**
 * 接口 [储值卡支付接口↗](https://yapi.huianrong.com/project/1692/interface/api/72688) 的 **请求函数**
 *
 * @分类 [期限卡/次卡支付↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23241)
 * @请求头 `POST /cbd-api-applet/ground_card_order/card_pay`
 * @更新时间 `2023-03-04 17:54:57`
 */
export const cbdApiAppletGroundCardOrderCardPayPost = /*#__PURE__*/ (
  requestData: CbdApiAppletGroundCardOrderCardPayPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletGroundCardOrderCardPayPostResponse>(
    prepare(cbdApiAppletGroundCardOrderCardPayPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletGroundCardOrderCardPayPost.requestConfig =
  cbdApiAppletGroundCardOrderCardPayPostRequestConfig;

/**
 * 接口 [微信支付接口↗](https://yapi.huianrong.com/project/1692/interface/api/72690) 的 **请求类型**
 *
 * @分类 [期限卡/次卡支付↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23241)
 * @请求头 `POST /cbd-api-applet/ground_card_order/wx_pay`
 * @更新时间 `2023-03-04 17:54:58`
 */
export interface CbdApiAppletGroundCardOrderWxPayPostRequest {
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
 * 接口 [微信支付接口↗](https://yapi.huianrong.com/project/1692/interface/api/72690) 的 **返回类型**
 *
 * @分类 [期限卡/次卡支付↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23241)
 * @请求头 `POST /cbd-api-applet/ground_card_order/wx_pay`
 * @更新时间 `2023-03-04 17:54:58`
 */
export interface CbdApiAppletGroundCardOrderWxPayPostResponse {
  /**
   * 支付系统业务流水号(查询支付结果使用)
   */
  serverRspNo: string;
  /**
   * 订单编号
   */
  orderNo?: string;
  /**
   * 公众号id 或 小程序id(调起支付所需)
   */
  appid?: string;
  /**
   * busiCode 为1005 时才返回（调起支付所需）
   */
  partnerid?: string;
  /**
   * busiCode 为1005 时才返回（调起支付所需）
   */
  prepayid?: string;
  /**
   * 时间戳，自1970 年1 月1 日0 点0 分0 秒以来的秒数(调起支付所需)
   */
  timestamp?: string;
  /**
   * 随机字符串（调起支付所需）
   */
  noncestr?: string;
  /**
   * 数据包（调起支付所需）
   */
  dataPackage?: string;
  /**
   * 签名（调起支付所需）
   */
  paysign?: string;
  /**
   * 签名算法
   */
  signType?: string;
}

/**
 * 接口 [微信支付接口↗](https://yapi.huianrong.com/project/1692/interface/api/72690) 的 **请求配置的类型**
 *
 * @分类 [期限卡/次卡支付↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23241)
 * @请求头 `POST /cbd-api-applet/ground_card_order/wx_pay`
 * @更新时间 `2023-03-04 17:54:58`
 */
type CbdApiAppletGroundCardOrderWxPayPostRequestConfig = Readonly<
  RequestConfig<
    "https://yapi.huianrong.com/mock/1692",
    "http://192.168.50.12:8082",
    "https://cbd.t-cube.cn",
    "/cbd-api-applet/ground_card_order/wx_pay",
    "data",
    string,
    string,
    false
  >
>;

/**
 * 接口 [微信支付接口↗](https://yapi.huianrong.com/project/1692/interface/api/72690) 的 **请求配置**
 *
 * @分类 [期限卡/次卡支付↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23241)
 * @请求头 `POST /cbd-api-applet/ground_card_order/wx_pay`
 * @更新时间 `2023-03-04 17:54:58`
 */
const cbdApiAppletGroundCardOrderWxPayPostRequestConfig: CbdApiAppletGroundCardOrderWxPayPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_0_0_27,
    devUrl: devUrl_0_0_0_27,
    prodUrl: prodUrl_0_0_0_27,
    path: "/cbd-api-applet/ground_card_order/wx_pay",
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_0_0_27,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: "cbdApiAppletGroundCardOrderWxPayPost",
    extraInfo: {}
  };

/**
 * 接口 [微信支付接口↗](https://yapi.huianrong.com/project/1692/interface/api/72690) 的 **请求函数**
 *
 * @分类 [期限卡/次卡支付↗](https://yapi.huianrong.com/project/1692/interface/api/cat_23241)
 * @请求头 `POST /cbd-api-applet/ground_card_order/wx_pay`
 * @更新时间 `2023-03-04 17:54:58`
 */
export const cbdApiAppletGroundCardOrderWxPayPost = /*#__PURE__*/ (
  requestData: CbdApiAppletGroundCardOrderWxPayPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiAppletGroundCardOrderWxPayPostResponse>(
    prepare(cbdApiAppletGroundCardOrderWxPayPostRequestConfig, requestData),
    ...args
  );
};

cbdApiAppletGroundCardOrderWxPayPost.requestConfig =
  cbdApiAppletGroundCardOrderWxPayPostRequestConfig;

/* prettier-ignore-end */
