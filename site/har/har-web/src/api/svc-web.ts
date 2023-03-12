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

const mockUrl_0_4_0_0 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_0 = '' as any;
const prodUrl_0_4_0_0 = '' as any;
const dataKey_0_4_0_0 = 'data' as any;

/**
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69670) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/project-select`
 * @更新时间 `2022-12-09 09:59:06`
 */
export interface SvcWebCommonProjectSelectPostRequest {
  /**
   * (String)
   */
  name: string;
}

/**
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69670) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/project-select`
 * @更新时间 `2022-12-09 09:59:06`
 */
export type SvcWebCommonProjectSelectPostResponse = {
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
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69670) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/project-select`
 * @更新时间 `2022-12-09 09:59:06`
 */
type SvcWebCommonProjectSelectPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/common/project-select',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69670) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/project-select`
 * @更新时间 `2022-12-09 09:59:06`
 */
const svcWebCommonProjectSelectPostRequestConfig: SvcWebCommonProjectSelectPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_0,
    devUrl: devUrl_0_4_0_0,
    prodUrl: prodUrl_0_4_0_0,
    path: '/svc-web/common/project-select',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.form,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCommonProjectSelectPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69670) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/project-select`
 * @更新时间 `2022-12-09 09:59:06`
 */
export const svcWebCommonProjectSelectPost = /*#__PURE__*/ (
  requestData: SvcWebCommonProjectSelectPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCommonProjectSelectPostResponse>(
    prepare(svcWebCommonProjectSelectPostRequestConfig, requestData),
    ...args
  );
};

svcWebCommonProjectSelectPost.requestConfig =
  svcWebCommonProjectSelectPostRequestConfig;

/**
 * 接口 [模糊查询店铺信息↗](https://yapi.huianrong.com/project/1734/interface/api/69672) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/store/list`
 * @更新时间 `2022-12-09 09:59:06`
 */
export interface SvcWebCommonStoreListGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 店铺编号名称
   */
  storeName?: string;
}

/**
 * 接口 [模糊查询店铺信息↗](https://yapi.huianrong.com/project/1734/interface/api/69672) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/store/list`
 * @更新时间 `2022-12-09 09:59:06`
 */
export type SvcWebCommonStoreListGetResponse = {
  /**
   * 店铺id
   */
  value?: number;
  /**
   * 店铺名称
   */
  label?: string;
}[];

/**
 * 接口 [模糊查询店铺信息↗](https://yapi.huianrong.com/project/1734/interface/api/69672) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/store/list`
 * @更新时间 `2022-12-09 09:59:06`
 */
type SvcWebCommonStoreListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/common/store/list',
    'data',
    string,
    'projectId' | 'storeName',
    false
  >
>;

/**
 * 接口 [模糊查询店铺信息↗](https://yapi.huianrong.com/project/1734/interface/api/69672) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/store/list`
 * @更新时间 `2022-12-09 09:59:06`
 */
const svcWebCommonStoreListGetRequestConfig: SvcWebCommonStoreListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_0,
    devUrl: devUrl_0_4_0_0,
    prodUrl: prodUrl_0_4_0_0,
    path: '/svc-web/common/store/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_0,
    paramNames: [],
    queryNames: ['projectId', 'storeName'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCommonStoreListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [模糊查询店铺信息↗](https://yapi.huianrong.com/project/1734/interface/api/69672) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/store/list`
 * @更新时间 `2022-12-09 09:59:06`
 */
export const svcWebCommonStoreListGet = /*#__PURE__*/ (
  requestData: SvcWebCommonStoreListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCommonStoreListGetResponse>(
    prepare(svcWebCommonStoreListGetRequestConfig, requestData),
    ...args
  );
};

svcWebCommonStoreListGet.requestConfig = svcWebCommonStoreListGetRequestConfig;

/**
 * 接口 [储值卡下拉列表↗](https://yapi.huianrong.com/project/1734/interface/api/69674) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/card/selectList`
 * @更新时间 `2022-12-09 09:59:07`
 */
export interface SvcWebCommonCardSelectListGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 卡名
   */
  searchKey?: string;
}

/**
 * 接口 [储值卡下拉列表↗](https://yapi.huianrong.com/project/1734/interface/api/69674) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/card/selectList`
 * @更新时间 `2022-12-09 09:59:07`
 */
export type SvcWebCommonCardSelectListGetResponse = {
  /**
   * 卡id
   */
  value: number;
  /**
   * 卡名
   */
  label: string;
}[];

/**
 * 接口 [储值卡下拉列表↗](https://yapi.huianrong.com/project/1734/interface/api/69674) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/card/selectList`
 * @更新时间 `2022-12-09 09:59:07`
 */
type SvcWebCommonCardSelectListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/common/card/selectList',
    'data',
    string,
    'projectId' | 'searchKey',
    false
  >
>;

/**
 * 接口 [储值卡下拉列表↗](https://yapi.huianrong.com/project/1734/interface/api/69674) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/card/selectList`
 * @更新时间 `2022-12-09 09:59:07`
 */
const svcWebCommonCardSelectListGetRequestConfig: SvcWebCommonCardSelectListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_0,
    devUrl: devUrl_0_4_0_0,
    prodUrl: prodUrl_0_4_0_0,
    path: '/svc-web/common/card/selectList',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_0,
    paramNames: [],
    queryNames: ['projectId', 'searchKey'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCommonCardSelectListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [储值卡下拉列表↗](https://yapi.huianrong.com/project/1734/interface/api/69674) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/card/selectList`
 * @更新时间 `2022-12-09 09:59:07`
 */
export const svcWebCommonCardSelectListGet = /*#__PURE__*/ (
  requestData: SvcWebCommonCardSelectListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCommonCardSelectListGetResponse>(
    prepare(svcWebCommonCardSelectListGetRequestConfig, requestData),
    ...args
  );
};

svcWebCommonCardSelectListGet.requestConfig =
  svcWebCommonCardSelectListGetRequestConfig;

/**
 * 接口 [活动下拉(活动名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69676) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/name`
 * @更新时间 `2022-12-09 09:59:08`
 */
export interface SvcWebCommonActivitySelectNamePostRequest {
  /**
   * 项目id
   */
  projectId?: number;
  /**
   * 活动名称
   */
  nameSearchKey?: string;
  /**
   * 状态:1.未开始2.进行中3.已暂停4.已完成 ,Byte
   */
  statuses?: number[];
  /**
   * 场景:purchase购卡；recharge充值；consume消费
   */
  scene?: string;
}

/**
 * 接口 [活动下拉(活动名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69676) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/name`
 * @更新时间 `2022-12-09 09:59:08`
 */
export type SvcWebCommonActivitySelectNamePostResponse = {
  /**
   * 活动id
   */
  value: number;
  /**
   * 活动名称
   */
  label: string;
}[];

/**
 * 接口 [活动下拉(活动名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69676) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/name`
 * @更新时间 `2022-12-09 09:59:08`
 */
type SvcWebCommonActivitySelectNamePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/common/activity/select/name',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [活动下拉(活动名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69676) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/name`
 * @更新时间 `2022-12-09 09:59:08`
 */
const svcWebCommonActivitySelectNamePostRequestConfig: SvcWebCommonActivitySelectNamePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_0,
    devUrl: devUrl_0_4_0_0,
    prodUrl: prodUrl_0_4_0_0,
    path: '/svc-web/common/activity/select/name',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCommonActivitySelectNamePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [活动下拉(活动名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69676) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/name`
 * @更新时间 `2022-12-09 09:59:08`
 */
export const svcWebCommonActivitySelectNamePost = /*#__PURE__*/ (
  requestData: SvcWebCommonActivitySelectNamePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCommonActivitySelectNamePostResponse>(
    prepare(svcWebCommonActivitySelectNamePostRequestConfig, requestData),
    ...args
  );
};

svcWebCommonActivitySelectNamePost.requestConfig =
  svcWebCommonActivitySelectNamePostRequestConfig;

/**
 * 接口 [活动下拉(活动编码)↗](https://yapi.huianrong.com/project/1734/interface/api/69678) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/code`
 * @更新时间 `2022-12-09 09:59:15`
 */
export interface SvcWebCommonActivitySelectCodePostRequest {
  /**
   * 项目id
   */
  projectId?: number;
  /**
   * 活动编码
   */
  codeSearchKey?: string;
  /**
   * 状态:1.未开始2.进行中3.已暂停4.已完成 ,Byte
   */
  statuses?: number[];
  /**
   * 场景:purchase购卡；recharge充值；consume消费
   */
  scene?: string;
}

/**
 * 接口 [活动下拉(活动编码)↗](https://yapi.huianrong.com/project/1734/interface/api/69678) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/code`
 * @更新时间 `2022-12-09 09:59:15`
 */
export type SvcWebCommonActivitySelectCodePostResponse = {
  /**
   * 活动id
   */
  value: number;
  /**
   * 活动名称
   */
  label: string;
}[];

/**
 * 接口 [活动下拉(活动编码)↗](https://yapi.huianrong.com/project/1734/interface/api/69678) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/code`
 * @更新时间 `2022-12-09 09:59:15`
 */
type SvcWebCommonActivitySelectCodePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/common/activity/select/code',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [活动下拉(活动编码)↗](https://yapi.huianrong.com/project/1734/interface/api/69678) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/code`
 * @更新时间 `2022-12-09 09:59:15`
 */
const svcWebCommonActivitySelectCodePostRequestConfig: SvcWebCommonActivitySelectCodePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_0,
    devUrl: devUrl_0_4_0_0,
    prodUrl: prodUrl_0_4_0_0,
    path: '/svc-web/common/activity/select/code',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCommonActivitySelectCodePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [活动下拉(活动编码)↗](https://yapi.huianrong.com/project/1734/interface/api/69678) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/code`
 * @更新时间 `2022-12-09 09:59:15`
 */
export const svcWebCommonActivitySelectCodePost = /*#__PURE__*/ (
  requestData: SvcWebCommonActivitySelectCodePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCommonActivitySelectCodePostResponse>(
    prepare(svcWebCommonActivitySelectCodePostRequestConfig, requestData),
    ...args
  );
};

svcWebCommonActivitySelectCodePost.requestConfig =
  svcWebCommonActivitySelectCodePostRequestConfig;

/**
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1734/interface/api/69748) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/file-direct-upload/sign`
 * @更新时间 `2022-12-06 20:34:01`
 */
export interface SvcWebFileDirectUploadSignGetRequest {}

/**
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1734/interface/api/69748) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/file-direct-upload/sign`
 * @更新时间 `2022-12-06 20:34:01`
 */
export interface SvcWebFileDirectUploadSignGetResponse {
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
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1734/interface/api/69748) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/file-direct-upload/sign`
 * @更新时间 `2022-12-06 20:34:01`
 */
type SvcWebFileDirectUploadSignGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/file-direct-upload/sign',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1734/interface/api/69748) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/file-direct-upload/sign`
 * @更新时间 `2022-12-06 20:34:01`
 */
const svcWebFileDirectUploadSignGetRequestConfig: SvcWebFileDirectUploadSignGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_0,
    devUrl: devUrl_0_4_0_0,
    prodUrl: prodUrl_0_4_0_0,
    path: '/svc-web/file-direct-upload/sign',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebFileDirectUploadSignGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [文件上传签名↗](https://yapi.huianrong.com/project/1734/interface/api/69748) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/file-direct-upload/sign`
 * @更新时间 `2022-12-06 20:34:01`
 */
export const svcWebFileDirectUploadSignGet = /*#__PURE__*/ (
  requestData?: SvcWebFileDirectUploadSignGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebFileDirectUploadSignGetResponse>(
    prepare(svcWebFileDirectUploadSignGetRequestConfig, requestData),
    ...args
  );
};

svcWebFileDirectUploadSignGet.requestConfig =
  svcWebFileDirectUploadSignGetRequestConfig;

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1734/interface/api/69750) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/file-direct-upload/callback`
 * @更新时间 `2022-12-06 20:34:02`
 */
export interface SvcWebFileDirectUploadCallbackPostRequest {}

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1734/interface/api/69750) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/file-direct-upload/callback`
 * @更新时间 `2022-12-06 20:34:02`
 */
export interface SvcWebFileDirectUploadCallbackPostResponse {}

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1734/interface/api/69750) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/file-direct-upload/callback`
 * @更新时间 `2022-12-06 20:34:02`
 */
type SvcWebFileDirectUploadCallbackPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/file-direct-upload/callback',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1734/interface/api/69750) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/file-direct-upload/callback`
 * @更新时间 `2022-12-06 20:34:02`
 */
const svcWebFileDirectUploadCallbackPostRequestConfig: SvcWebFileDirectUploadCallbackPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_0,
    devUrl: devUrl_0_4_0_0,
    prodUrl: prodUrl_0_4_0_0,
    path: '/svc-web/file-direct-upload/callback',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebFileDirectUploadCallbackPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [上传oss回调↗](https://yapi.huianrong.com/project/1734/interface/api/69750) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/file-direct-upload/callback`
 * @更新时间 `2022-12-06 20:34:02`
 */
export const svcWebFileDirectUploadCallbackPost = /*#__PURE__*/ (
  requestData?: SvcWebFileDirectUploadCallbackPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebFileDirectUploadCallbackPostResponse>(
    prepare(svcWebFileDirectUploadCallbackPostRequestConfig, requestData),
    ...args
  );
};

svcWebFileDirectUploadCallbackPost.requestConfig =
  svcWebFileDirectUploadCallbackPostRequestConfig;

/**
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69756) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/format/tree`
 * @更新时间 `2022-12-09 09:59:10`
 */
export interface SvcWebCommonFormatTreeGetRequest {}

/**
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69756) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/format/tree`
 * @更新时间 `2022-12-09 09:59:10`
 */
export type SvcWebCommonFormatTreeGetResponse = {
  /**
   * 当前节点ID
   */
  value?: number;
  /**
   * 名称
   */
  label?: string;
  /**
   * 父节点ID
   */
  parentId?: number;
  /**
   * 子节点 ,TreeNode
   */
  children?: {
    [k: string]: unknown;
  }[];
}[];

/**
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69756) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/format/tree`
 * @更新时间 `2022-12-09 09:59:10`
 */
type SvcWebCommonFormatTreeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/common/format/tree',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69756) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/format/tree`
 * @更新时间 `2022-12-09 09:59:10`
 */
const svcWebCommonFormatTreeGetRequestConfig: SvcWebCommonFormatTreeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_0,
    devUrl: devUrl_0_4_0_0,
    prodUrl: prodUrl_0_4_0_0,
    path: '/svc-web/common/format/tree',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCommonFormatTreeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [业态下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69756) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/format/tree`
 * @更新时间 `2022-12-09 09:59:10`
 */
export const svcWebCommonFormatTreeGet = /*#__PURE__*/ (
  requestData?: SvcWebCommonFormatTreeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCommonFormatTreeGetResponse>(
    prepare(svcWebCommonFormatTreeGetRequestConfig, requestData),
    ...args
  );
};

svcWebCommonFormatTreeGet.requestConfig =
  svcWebCommonFormatTreeGetRequestConfig;

/**
 * 接口 [场馆分类下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69774) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/classify-select`
 * @更新时间 `2022-12-09 09:59:11`
 */
export interface SvcWebCommonClassifySelectGetRequest {
  storeId?: string;
}

/**
 * 接口 [场馆分类下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69774) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/classify-select`
 * @更新时间 `2022-12-09 09:59:11`
 */
export type SvcWebCommonClassifySelectGetResponse = {
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
 * 接口 [场馆分类下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69774) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/classify-select`
 * @更新时间 `2022-12-09 09:59:11`
 */
type SvcWebCommonClassifySelectGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/common/classify-select',
    'data',
    string,
    'storeId',
    false
  >
>;

/**
 * 接口 [场馆分类下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69774) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/classify-select`
 * @更新时间 `2022-12-09 09:59:11`
 */
const svcWebCommonClassifySelectGetRequestConfig: SvcWebCommonClassifySelectGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_0,
    devUrl: devUrl_0_4_0_0,
    prodUrl: prodUrl_0_4_0_0,
    path: '/svc-web/common/classify-select',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_0,
    paramNames: [],
    queryNames: ['storeId'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCommonClassifySelectGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [场馆分类下拉↗](https://yapi.huianrong.com/project/1734/interface/api/69774) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `GET /svc-web/common/classify-select`
 * @更新时间 `2022-12-09 09:59:11`
 */
export const svcWebCommonClassifySelectGet = /*#__PURE__*/ (
  requestData: SvcWebCommonClassifySelectGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCommonClassifySelectGetResponse>(
    prepare(svcWebCommonClassifySelectGetRequestConfig, requestData),
    ...args
  );
};

svcWebCommonClassifySelectGet.requestConfig =
  svcWebCommonClassifySelectGetRequestConfig;

/**
 * 接口 [活动下拉(活动编码或名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69900) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/code_name`
 * @更新时间 `2022-12-09 09:59:18`
 */
export interface SvcWebCommonActivitySelectCodeNamePostRequest {
  /**
   * 项目id
   */
  projectId?: number;
  /**
   * 活动编码
   */
  codeSearchKey?: string;
  /**
   * 状态:1.未开始2.进行中3.已暂停4.已完成 ,Byte
   */
  statuses?: number[];
  /**
   * 场景:purchase购卡；recharge充值；consume消费
   */
  scene?: string;
}

/**
 * 接口 [活动下拉(活动编码或名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69900) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/code_name`
 * @更新时间 `2022-12-09 09:59:18`
 */
export type SvcWebCommonActivitySelectCodeNamePostResponse = {
  /**
   * 活动id
   */
  value: number;
  /**
   * 活动名称
   */
  label: string;
}[];

/**
 * 接口 [活动下拉(活动编码或名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69900) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/code_name`
 * @更新时间 `2022-12-09 09:59:18`
 */
type SvcWebCommonActivitySelectCodeNamePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/common/activity/select/code_name',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [活动下拉(活动编码或名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69900) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/code_name`
 * @更新时间 `2022-12-09 09:59:18`
 */
const svcWebCommonActivitySelectCodeNamePostRequestConfig: SvcWebCommonActivitySelectCodeNamePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_0,
    devUrl: devUrl_0_4_0_0,
    prodUrl: prodUrl_0_4_0_0,
    path: '/svc-web/common/activity/select/code_name',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCommonActivitySelectCodeNamePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [活动下拉(活动编码或名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69900) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22157)
 * @请求头 `POST /svc-web/common/activity/select/code_name`
 * @更新时间 `2022-12-09 09:59:18`
 */
export const svcWebCommonActivitySelectCodeNamePost = /*#__PURE__*/ (
  requestData: SvcWebCommonActivitySelectCodeNamePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCommonActivitySelectCodeNamePostResponse>(
    prepare(svcWebCommonActivitySelectCodeNamePostRequestConfig, requestData),
    ...args
  );
};

svcWebCommonActivitySelectCodeNamePost.requestConfig =
  svcWebCommonActivitySelectCodeNamePostRequestConfig;

const mockUrl_0_4_0_1 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_1 = '' as any;
const prodUrl_0_4_0_1 = '' as any;
const dataKey_0_4_0_1 = 'data' as any;

/**
 * 接口 [店铺对账单分页列表↗](https://yapi.huianrong.com/project/1734/interface/api/69296) 的 **请求类型**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/page`
 * @更新时间 `2022-12-03 11:19:39`
 */
export interface SvcWebStoreStatementPageGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 对账单时间
   */
  billDate?: string;
  /**
   * 对账单编号
   */
  billNo?: string;
  /**
   * 店铺id
   */
  storeId?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [店铺对账单分页列表↗](https://yapi.huianrong.com/project/1734/interface/api/69296) 的 **返回类型**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/page`
 * @更新时间 `2022-12-03 11:19:39`
 */
export interface SvcWebStoreStatementPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 项目id
     */
    projectId?: number;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 账单日期
     */
    billDate?: string;
    /**
     * 对账单编号
     */
    billNo?: string;
    /**
     * 店铺id
     */
    storeId?: number;
    /**
     * 店铺编号
     */
    storeCode?: string;
    /**
     * 店铺名称
     */
    storeName?: string;
    /**
     * 刷卡金额
     */
    amount?: number;
  }[];
}

/**
 * 接口 [店铺对账单分页列表↗](https://yapi.huianrong.com/project/1734/interface/api/69296) 的 **请求配置的类型**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/page`
 * @更新时间 `2022-12-03 11:19:39`
 */
type SvcWebStoreStatementPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/store_statement/page',
    'data',
    string,
    'projectId' | 'billDate' | 'billNo' | 'storeId' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [店铺对账单分页列表↗](https://yapi.huianrong.com/project/1734/interface/api/69296) 的 **请求配置**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/page`
 * @更新时间 `2022-12-03 11:19:39`
 */
const svcWebStoreStatementPageGetRequestConfig: SvcWebStoreStatementPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_1,
    devUrl: devUrl_0_4_0_1,
    prodUrl: prodUrl_0_4_0_1,
    path: '/svc-web/store_statement/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_1,
    paramNames: [],
    queryNames: [
      'projectId',
      'billDate',
      'billNo',
      'storeId',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebStoreStatementPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [店铺对账单分页列表↗](https://yapi.huianrong.com/project/1734/interface/api/69296) 的 **请求函数**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/page`
 * @更新时间 `2022-12-03 11:19:39`
 */
export const svcWebStoreStatementPageGet = /*#__PURE__*/ (
  requestData: SvcWebStoreStatementPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebStoreStatementPageGetResponse>(
    prepare(svcWebStoreStatementPageGetRequestConfig, requestData),
    ...args
  );
};

svcWebStoreStatementPageGet.requestConfig =
  svcWebStoreStatementPageGetRequestConfig;

/**
 * 接口 [查看对账单明细↗](https://yapi.huianrong.com/project/1734/interface/api/69298) 的 **请求类型**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/info`
 * @更新时间 `2022-12-03 11:19:39`
 */
export interface SvcWebStoreStatementInfoGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 账单日期
   */
  billDate?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [查看对账单明细↗](https://yapi.huianrong.com/project/1734/interface/api/69298) 的 **返回类型**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/info`
 * @更新时间 `2022-12-03 11:19:39`
 */
export interface SvcWebStoreStatementInfoGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 交易时间
     */
    tradeTime?: string;
    /**
     * 交易流水号
     */
    serialNo?: string;
    /**
     * 卡片id
     */
    memberCardId?: number;
    /**
     * 卡名
     */
    cardName?: string;
    /**
     * 卡号
     */
    memberCardCode?: string;
    /**
     * 交易类型
     */
    type?: number;
    /**
     * 交易金额
     */
    amount?: number;
  }[];
}

/**
 * 接口 [查看对账单明细↗](https://yapi.huianrong.com/project/1734/interface/api/69298) 的 **请求配置的类型**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/info`
 * @更新时间 `2022-12-03 11:19:39`
 */
type SvcWebStoreStatementInfoGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/store_statement/info',
    'data',
    string,
    'projectId' | 'storeId' | 'billDate' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [查看对账单明细↗](https://yapi.huianrong.com/project/1734/interface/api/69298) 的 **请求配置**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/info`
 * @更新时间 `2022-12-03 11:19:39`
 */
const svcWebStoreStatementInfoGetRequestConfig: SvcWebStoreStatementInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_1,
    devUrl: devUrl_0_4_0_1,
    prodUrl: prodUrl_0_4_0_1,
    path: '/svc-web/store_statement/info',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_1,
    paramNames: [],
    queryNames: ['projectId', 'storeId', 'billDate', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebStoreStatementInfoGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [查看对账单明细↗](https://yapi.huianrong.com/project/1734/interface/api/69298) 的 **请求函数**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/info`
 * @更新时间 `2022-12-03 11:19:39`
 */
export const svcWebStoreStatementInfoGet = /*#__PURE__*/ (
  requestData: SvcWebStoreStatementInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebStoreStatementInfoGetResponse>(
    prepare(svcWebStoreStatementInfoGetRequestConfig, requestData),
    ...args
  );
};

svcWebStoreStatementInfoGet.requestConfig =
  svcWebStoreStatementInfoGetRequestConfig;

/**
 * 接口 [导出对账单明细↗](https://yapi.huianrong.com/project/1734/interface/api/69300) 的 **请求类型**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/export`
 * @更新时间 `2022-12-03 11:19:39`
 */
export interface SvcWebStoreStatementExportGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 账单日期
   */
  billDate?: string;
}

/**
 * 接口 [导出对账单明细↗](https://yapi.huianrong.com/project/1734/interface/api/69300) 的 **返回类型**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/export`
 * @更新时间 `2022-12-03 11:19:39`
 */
export interface SvcWebStoreStatementExportGetResponse {}

/**
 * 接口 [导出对账单明细↗](https://yapi.huianrong.com/project/1734/interface/api/69300) 的 **请求配置的类型**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/export`
 * @更新时间 `2022-12-03 11:19:39`
 */
type SvcWebStoreStatementExportGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/store_statement/export',
    'data',
    string,
    'projectId' | 'storeId' | 'billDate',
    false
  >
>;

/**
 * 接口 [导出对账单明细↗](https://yapi.huianrong.com/project/1734/interface/api/69300) 的 **请求配置**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/export`
 * @更新时间 `2022-12-03 11:19:39`
 */
const svcWebStoreStatementExportGetRequestConfig: SvcWebStoreStatementExportGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_1,
    devUrl: devUrl_0_4_0_1,
    prodUrl: prodUrl_0_4_0_1,
    path: '/svc-web/store_statement/export',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_1,
    paramNames: [],
    queryNames: ['projectId', 'storeId', 'billDate'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebStoreStatementExportGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [导出对账单明细↗](https://yapi.huianrong.com/project/1734/interface/api/69300) 的 **请求函数**
 *
 * @分类 [店铺对账单↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22163)
 * @请求头 `GET /svc-web/store_statement/export`
 * @更新时间 `2022-12-03 11:19:39`
 */
export const svcWebStoreStatementExportGet = /*#__PURE__*/ (
  requestData: SvcWebStoreStatementExportGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebStoreStatementExportGetResponse>(
    prepare(svcWebStoreStatementExportGetRequestConfig, requestData),
    ...args
  );
};

svcWebStoreStatementExportGet.requestConfig =
  svcWebStoreStatementExportGetRequestConfig;

const mockUrl_0_4_0_2 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_2 = '' as any;
const prodUrl_0_4_0_2 = '' as any;
const dataKey_0_4_0_2 = 'data' as any;

/**
 * 接口 [流水明细列表↗](https://yapi.huianrong.com/project/1734/interface/api/69302) 的 **请求类型**
 *
 * @分类 [流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22165)
 * @请求头 `GET /svc-web/trade_history/page`
 * @更新时间 `2022-12-08 20:21:37`
 */
export interface SvcWebTradeHistoryPageGetRequest {
  /**
   * 交易类型: 1、购卡 2、充值 3、消费 4、退款 5、退卡
   */
  type?: string;
  /**
   * 开始时间
   */
  startTime?: string;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 流水号
   */
  serialNo?: string;
  /**
   * 卡片id
   */
  cardId?: string;
  /**
   * 卡号
   */
  memberCardCode?: string;
  /**
   * 会员电话
   */
  memberPhone?: string;
  /**
   * 会员名称或编号
   */
  memberName?: string;
  /**
   * 店铺id
   */
  storeId?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [流水明细列表↗](https://yapi.huianrong.com/project/1734/interface/api/69302) 的 **返回类型**
 *
 * @分类 [流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22165)
 * @请求头 `GET /svc-web/trade_history/page`
 * @更新时间 `2022-12-08 20:21:37`
 */
export interface SvcWebTradeHistoryPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 项目id
     */
    projectId?: number;
    /**
     * 项目名称
     */
    projectName?: string;
    /**
     * 交易类型
     */
    type?: number;
    /**
     * 交易时间
     */
    tradeTime?: string;
    /**
     * 流水号
     */
    serialNo?: string;
    /**
     * 卡id
     */
    cardId?: number;
    /**
     * 卡名
     */
    cardName?: string;
    /**
     * 卡号
     */
    memberCardCode?: string;
    /**
     * 会员id
     */
    memberId?: number;
    /**
     * 持卡人编号
     */
    memberCode?: string;
    /**
     * 持卡人名称
     */
    memberName?: string;
    /**
     * 会员电话
     */
    memberPhone?: string;
    /**
     * 店铺id
     */
    storeId?: number;
    /**
     * 店铺编号
     */
    storeCode?: string;
    /**
     * 店铺名称或编号
     */
    storeName?: string;
    /**
     * 收银员/操作人
     */
    createBy?: string;
    /**
     * 优惠金额
     */
    discount?: number;
    /**
     * 发生金额
     */
    principal?: number;
    /**
     * 卡内余额
     */
    balance?: number;
  }[];
}

/**
 * 接口 [流水明细列表↗](https://yapi.huianrong.com/project/1734/interface/api/69302) 的 **请求配置的类型**
 *
 * @分类 [流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22165)
 * @请求头 `GET /svc-web/trade_history/page`
 * @更新时间 `2022-12-08 20:21:37`
 */
type SvcWebTradeHistoryPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/trade_history/page',
    'data',
    string,
    | 'type'
    | 'startTime'
    | 'endTime'
    | 'serialNo'
    | 'cardId'
    | 'memberCardCode'
    | 'memberPhone'
    | 'memberName'
    | 'storeId'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [流水明细列表↗](https://yapi.huianrong.com/project/1734/interface/api/69302) 的 **请求配置**
 *
 * @分类 [流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22165)
 * @请求头 `GET /svc-web/trade_history/page`
 * @更新时间 `2022-12-08 20:21:37`
 */
const svcWebTradeHistoryPageGetRequestConfig: SvcWebTradeHistoryPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_2,
    devUrl: devUrl_0_4_0_2,
    prodUrl: prodUrl_0_4_0_2,
    path: '/svc-web/trade_history/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_2,
    paramNames: [],
    queryNames: [
      'type',
      'startTime',
      'endTime',
      'serialNo',
      'cardId',
      'memberCardCode',
      'memberPhone',
      'memberName',
      'storeId',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebTradeHistoryPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [流水明细列表↗](https://yapi.huianrong.com/project/1734/interface/api/69302) 的 **请求函数**
 *
 * @分类 [流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22165)
 * @请求头 `GET /svc-web/trade_history/page`
 * @更新时间 `2022-12-08 20:21:37`
 */
export const svcWebTradeHistoryPageGet = /*#__PURE__*/ (
  requestData: SvcWebTradeHistoryPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebTradeHistoryPageGetResponse>(
    prepare(svcWebTradeHistoryPageGetRequestConfig, requestData),
    ...args
  );
};

svcWebTradeHistoryPageGet.requestConfig =
  svcWebTradeHistoryPageGetRequestConfig;

/**
 * 接口 [导出流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/69304) 的 **请求类型**
 *
 * @分类 [流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22165)
 * @请求头 `GET /svc-web/trade_history/export`
 * @更新时间 `2022-12-08 20:21:37`
 */
export interface SvcWebTradeHistoryExportGetRequest {
  /**
   * 交易类型
   */
  type?: string;
  /**
   * 开始时间
   */
  startDate?: string;
  /**
   * 结束时间
   */
  endDate?: string;
  /**
   * 流水号
   */
  serialNo?: string;
  /**
   * 卡片id
   */
  cardId?: string;
  /**
   * 卡号
   */
  memberCardCode?: string;
  /**
   * 会员电话
   */
  memberPhone?: string;
  /**
   * 会员名称或编号
   */
  memberName?: string;
  /**
   * 店铺id
   */
  storeId?: string;
}

/**
 * 接口 [导出流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/69304) 的 **返回类型**
 *
 * @分类 [流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22165)
 * @请求头 `GET /svc-web/trade_history/export`
 * @更新时间 `2022-12-08 20:21:37`
 */
export interface SvcWebTradeHistoryExportGetResponse {}

/**
 * 接口 [导出流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/69304) 的 **请求配置的类型**
 *
 * @分类 [流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22165)
 * @请求头 `GET /svc-web/trade_history/export`
 * @更新时间 `2022-12-08 20:21:37`
 */
type SvcWebTradeHistoryExportGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/trade_history/export',
    'data',
    string,
    | 'type'
    | 'startDate'
    | 'endDate'
    | 'serialNo'
    | 'cardId'
    | 'memberCardCode'
    | 'memberPhone'
    | 'memberName'
    | 'storeId',
    false
  >
>;

/**
 * 接口 [导出流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/69304) 的 **请求配置**
 *
 * @分类 [流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22165)
 * @请求头 `GET /svc-web/trade_history/export`
 * @更新时间 `2022-12-08 20:21:37`
 */
const svcWebTradeHistoryExportGetRequestConfig: SvcWebTradeHistoryExportGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_2,
    devUrl: devUrl_0_4_0_2,
    prodUrl: prodUrl_0_4_0_2,
    path: '/svc-web/trade_history/export',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_2,
    paramNames: [],
    queryNames: [
      'type',
      'startDate',
      'endDate',
      'serialNo',
      'cardId',
      'memberCardCode',
      'memberPhone',
      'memberName',
      'storeId'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebTradeHistoryExportGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [导出流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/69304) 的 **请求函数**
 *
 * @分类 [流水明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22165)
 * @请求头 `GET /svc-web/trade_history/export`
 * @更新时间 `2022-12-08 20:21:37`
 */
export const svcWebTradeHistoryExportGet = /*#__PURE__*/ (
  requestData: SvcWebTradeHistoryExportGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebTradeHistoryExportGetResponse>(
    prepare(svcWebTradeHistoryExportGetRequestConfig, requestData),
    ...args
  );
};

svcWebTradeHistoryExportGet.requestConfig =
  svcWebTradeHistoryExportGetRequestConfig;

const mockUrl_0_4_0_4 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_4 = '' as any;
const prodUrl_0_4_0_4 = '' as any;
const dataKey_0_4_0_4 = 'data' as any;

/**
 * 接口 [储值卡列表↗](https://yapi.huianrong.com/project/1734/interface/api/69366) 的 **请求类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/pageList`
 * @更新时间 `2022-12-07 13:52:17`
 */
export interface SvcWebCardPageListGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 卡id
   */
  cardId?: string;
  /**
   * 商场名称
   */
  marketName?: string;
  /**
   * 更新时间开始yyyy-MM-dd
   */
  startDate?: string;
  /**
   * 更新时间结束yyyy-MM-dd
   */
  endDate?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [储值卡列表↗](https://yapi.huianrong.com/project/1734/interface/api/69366) 的 **返回类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/pageList`
 * @更新时间 `2022-12-07 13:52:17`
 */
export interface SvcWebCardPageListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 卡id
     */
    id: number;
    /**
     * 项目名称
     */
    projectName: string;
    /**
     * 储值卡名称
     */
    cardName: string;
    /**
     * 商场名称
     */
    marketName: string;
    /**
     * 创建人
     */
    createBy: string;
    /**
     * 创建时间yyyy-MM-ddHH:mm:ss
     */
    createTime: string;
    /**
     * 更新人
     */
    updateBy?: string;
    /**
     * 更新时间yyyy-MM-ddHH:mm:ss
     */
    updateTime?: string;
  }[];
}

/**
 * 接口 [储值卡列表↗](https://yapi.huianrong.com/project/1734/interface/api/69366) 的 **请求配置的类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/pageList`
 * @更新时间 `2022-12-07 13:52:17`
 */
type SvcWebCardPageListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/card/pageList',
    'data',
    string,
    | 'projectId'
    | 'cardId'
    | 'marketName'
    | 'startDate'
    | 'endDate'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [储值卡列表↗](https://yapi.huianrong.com/project/1734/interface/api/69366) 的 **请求配置**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/pageList`
 * @更新时间 `2022-12-07 13:52:17`
 */
const svcWebCardPageListGetRequestConfig: SvcWebCardPageListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_4,
    devUrl: devUrl_0_4_0_4,
    prodUrl: prodUrl_0_4_0_4,
    path: '/svc-web/card/pageList',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_4,
    paramNames: [],
    queryNames: [
      'projectId',
      'cardId',
      'marketName',
      'startDate',
      'endDate',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCardPageListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [储值卡列表↗](https://yapi.huianrong.com/project/1734/interface/api/69366) 的 **请求函数**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/pageList`
 * @更新时间 `2022-12-07 13:52:17`
 */
export const svcWebCardPageListGet = /*#__PURE__*/ (
  requestData: SvcWebCardPageListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCardPageListGetResponse>(
    prepare(svcWebCardPageListGetRequestConfig, requestData),
    ...args
  );
};

svcWebCardPageListGet.requestConfig = svcWebCardPageListGetRequestConfig;

/**
 * 接口 [储值卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69374) 的 **请求类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/detail/{id}`
 * @更新时间 `2022-12-11 22:58:53`
 */
export interface SvcWebCardDetailIdGetRequest {
  /**
   * 储值卡(Long)
   */
  id: string;
}

/**
 * 接口 [储值卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69374) 的 **返回类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/detail/{id}`
 * @更新时间 `2022-12-11 22:58:53`
 */
export interface SvcWebCardDetailIdGetResponse {
  /**
   * 数据id
   */
  id: number;
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 项目名称
   */
  projectName: string;
  /**
   * 储值卡名称
   */
  cardName: string;
  /**
   * 商场名称
   */
  marketName: string;
  /**
   * 储值卡金额列表 ,BigDecimal
   */
  cardAmountList?: number[];
  /**
   * 适用类型1、全部店铺2、指定店铺可用3、指定店铺不可用
   */
  applyType: number;
  /**
   * 店铺列表 ,CardStoreVo
   */
  cardStoreList?: {
    /**
     * 店铺id
     */
    id: number;
    /**
     * 店铺名称
     */
    storeName: string;
    /**
     * 联系人
     */
    contacts: string;
    /**
     * 联系电话
     */
    contactsPhone: string;
    /**
     * 场地适用类型1、全部场地2、指定场地可用3、指定场地不可用
     */
    venueApplyType: number;
    /**
     * 场地ids ,Long
     */
    venueIds?: number[];
  }[];
  /**
   * 商场logo ,GetResourceFilesResp
   */
  marketLogo: {
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
   * 卡背景 ,GetResourceFilesResp
   */
  cardBack: {
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
   * 储值卡详情
   */
  cardDetail: string;
  /**
   * 创建人
   */
  createBy: string;
  /**
   * 创建时间yyyy-MM-ddHH:mm:ss
   */
  createTime: string;
  /**
   * 更新人
   */
  updateBy: string;
  /**
   * 更新时间yyyy-MM-ddHH:mm:ss
   */
  updateTime: string;
}

/**
 * 接口 [储值卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69374) 的 **请求配置的类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/detail/{id}`
 * @更新时间 `2022-12-11 22:58:53`
 */
type SvcWebCardDetailIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/card/detail/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [储值卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69374) 的 **请求配置**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/detail/{id}`
 * @更新时间 `2022-12-11 22:58:53`
 */
const svcWebCardDetailIdGetRequestConfig: SvcWebCardDetailIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_4,
    devUrl: devUrl_0_4_0_4,
    prodUrl: prodUrl_0_4_0_4,
    path: '/svc-web/card/detail/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_4,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCardDetailIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [储值卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69374) 的 **请求函数**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/detail/{id}`
 * @更新时间 `2022-12-11 22:58:53`
 */
export const svcWebCardDetailIdGet = /*#__PURE__*/ (
  requestData: SvcWebCardDetailIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCardDetailIdGetResponse>(
    prepare(svcWebCardDetailIdGetRequestConfig, requestData),
    ...args
  );
};

svcWebCardDetailIdGet.requestConfig = svcWebCardDetailIdGetRequestConfig;

/**
 * 接口 [修改储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/69380) 的 **请求类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `PUT /svc-web/card/modify`
 * @更新时间 `2022-12-01 20:39:23`
 */
export interface SvcWebCardModifyPutRequest {
  /**
   * 数据id
   */
  id: number;
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 储值卡名称
   */
  cardName: string;
  /**
   * 商场名称
   */
  marketName: string;
  /**
   * 商场logo
   */
  marketLogo: string;
  /**
   * 卡背景
   */
  cardBack: string;
  /**
   * 储值卡详情
   */
  cardDetail: string;
  /**
   * 储值卡金额 ,BigDecimal
   */
  cardAmountList?: number[];
  /**
   * 适用类型1、全部店铺2、指定店铺可用3、指定店铺不可用
   */
  applyType: number;
  /**
   * 店铺列表 ,CardStore
   */
  cardStoreList?: {
    /**
     * 店铺id
     */
    id: number;
    /**
     * 场地适用类型1、全部场地2、指定场地可用3、指定场地不可用
     */
    venueApplyType: number;
    /**
     * 场地列表 ,Long
     */
    venueIds?: number[];
  }[];
}

/**
 * 接口 [修改储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/69380) 的 **返回类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `PUT /svc-web/card/modify`
 * @更新时间 `2022-12-01 20:39:23`
 */
export interface SvcWebCardModifyPutResponse {
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
 * 接口 [修改储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/69380) 的 **请求配置的类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `PUT /svc-web/card/modify`
 * @更新时间 `2022-12-01 20:39:23`
 */
type SvcWebCardModifyPutRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/card/modify',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [修改储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/69380) 的 **请求配置**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `PUT /svc-web/card/modify`
 * @更新时间 `2022-12-01 20:39:23`
 */
const svcWebCardModifyPutRequestConfig: SvcWebCardModifyPutRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_4,
    devUrl: devUrl_0_4_0_4,
    prodUrl: prodUrl_0_4_0_4,
    path: '/svc-web/card/modify',
    method: Method.PUT,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_4,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCardModifyPut',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [修改储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/69380) 的 **请求函数**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `PUT /svc-web/card/modify`
 * @更新时间 `2022-12-01 20:39:23`
 */
export const svcWebCardModifyPut = /*#__PURE__*/ (
  requestData: SvcWebCardModifyPutRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCardModifyPutResponse>(
    prepare(svcWebCardModifyPutRequestConfig, requestData),
    ...args
  );
};

svcWebCardModifyPut.requestConfig = svcWebCardModifyPutRequestConfig;

/**
 * 接口 [新增储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/69516) 的 **请求类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `POST /svc-web/card/save`
 * @更新时间 `2022-12-07 13:52:14`
 */
export interface SvcWebCardSavePostRequest {
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 储值卡名称
   */
  cardName: string;
  /**
   * 商场名称
   */
  marketName: string;
  /**
   * 商场logo
   */
  marketLogo: string;
  /**
   * 卡背景
   */
  cardBack: string;
  /**
   * 储值卡详情
   */
  cardDetail: string;
  /**
   * 储值卡金额 ,BigDecimal
   */
  cardAmountList?: number[];
  /**
   * 适用类型1、全部店铺2、指定店铺可用3、指定店铺不可用
   */
  applyType: number;
  /**
   * 店铺列表 ,CardStore
   */
  cardStoreList?: {
    /**
     * 店铺id
     */
    id: number;
    /**
     * 场地适用类型1、全部场地2、指定场地可用3、指定场地不可用
     */
    venueApplyType: number;
    /**
     * 场地列表 ,Long
     */
    venueIds?: number[];
  }[];
}

/**
 * 接口 [新增储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/69516) 的 **返回类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `POST /svc-web/card/save`
 * @更新时间 `2022-12-07 13:52:14`
 */
export interface SvcWebCardSavePostResponse {
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
 * 接口 [新增储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/69516) 的 **请求配置的类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `POST /svc-web/card/save`
 * @更新时间 `2022-12-07 13:52:14`
 */
type SvcWebCardSavePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/card/save',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/69516) 的 **请求配置**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `POST /svc-web/card/save`
 * @更新时间 `2022-12-07 13:52:14`
 */
const svcWebCardSavePostRequestConfig: SvcWebCardSavePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_4,
    devUrl: devUrl_0_4_0_4,
    prodUrl: prodUrl_0_4_0_4,
    path: '/svc-web/card/save',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_4,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCardSavePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [新增储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/69516) 的 **请求函数**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `POST /svc-web/card/save`
 * @更新时间 `2022-12-07 13:52:14`
 */
export const svcWebCardSavePost = /*#__PURE__*/ (
  requestData: SvcWebCardSavePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCardSavePostResponse>(
    prepare(svcWebCardSavePostRequestConfig, requestData),
    ...args
  );
};

svcWebCardSavePost.requestConfig = svcWebCardSavePostRequestConfig;

/**
 * 接口 [获取卡片指定场地↗](https://yapi.huianrong.com/project/1734/interface/api/69946) 的 **请求类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/venue`
 * @更新时间 `2022-12-10 10:17:12`
 */
export interface SvcWebCardVenueGetRequest {
  /**
   * 卡id
   */
  cardId?: string;
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 名称编码
   */
  key?: string;
  /**
   * 场馆分类ID
   */
  classifyId?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [获取卡片指定场地↗](https://yapi.huianrong.com/project/1734/interface/api/69946) 的 **返回类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/venue`
 * @更新时间 `2022-12-10 10:17:12`
 */
export interface SvcWebCardVenueGetResponse {
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
     * 名字
     */
    name?: string;
    /**
     * 编号
     */
    code?: string;
    /**
     * 分类名字
     */
    classifyName?: string;
  }[];
}

/**
 * 接口 [获取卡片指定场地↗](https://yapi.huianrong.com/project/1734/interface/api/69946) 的 **请求配置的类型**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/venue`
 * @更新时间 `2022-12-10 10:17:12`
 */
type SvcWebCardVenueGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/card/venue',
    'data',
    string,
    'cardId' | 'storeId' | 'key' | 'classifyId' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [获取卡片指定场地↗](https://yapi.huianrong.com/project/1734/interface/api/69946) 的 **请求配置**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/venue`
 * @更新时间 `2022-12-10 10:17:12`
 */
const svcWebCardVenueGetRequestConfig: SvcWebCardVenueGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_4,
    devUrl: devUrl_0_4_0_4,
    prodUrl: prodUrl_0_4_0_4,
    path: '/svc-web/card/venue',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_4,
    paramNames: [],
    queryNames: [
      'cardId',
      'storeId',
      'key',
      'classifyId',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCardVenueGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取卡片指定场地↗](https://yapi.huianrong.com/project/1734/interface/api/69946) 的 **请求函数**
 *
 * @分类 [储值卡基础设置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22179)
 * @请求头 `GET /svc-web/card/venue`
 * @更新时间 `2022-12-10 10:17:12`
 */
export const svcWebCardVenueGet = /*#__PURE__*/ (
  requestData: SvcWebCardVenueGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCardVenueGetResponse>(
    prepare(svcWebCardVenueGetRequestConfig, requestData),
    ...args
  );
};

svcWebCardVenueGet.requestConfig = svcWebCardVenueGetRequestConfig;

const mockUrl_0_4_0_5 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_5 = '' as any;
const prodUrl_0_4_0_5 = '' as any;
const dataKey_0_4_0_5 = 'data' as any;

/**
 * 接口 [配置列表↗](https://yapi.huianrong.com/project/1734/interface/api/69384) 的 **请求类型**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `GET /svc-web/card/home/list`
 * @更新时间 `2022-12-03 14:03:20`
 */
export interface SvcWebCardHomeListGetRequest {}

/**
 * 接口 [配置列表↗](https://yapi.huianrong.com/project/1734/interface/api/69384) 的 **返回类型**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `GET /svc-web/card/home/list`
 * @更新时间 `2022-12-03 14:03:20`
 */
export type SvcWebCardHomeListGetResponse = {
  /**
   * 配置id
   */
  id?: number;
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 项目名称
   */
  projectName: string;
  /**
   * 状态1、待设置2、已设置
   */
  status: number;
  /**
   * 数量
   */
  num: number;
  /**
   * 创建人
   */
  createBy: string;
  /**
   * 创建时间yyyy-MM-ddHH:mm:ss
   */
  createTime: string;
  /**
   * 更新人
   */
  updateBy?: string;
  /**
   * 更新时间yyyy-MM-ddHH:mm:ss
   */
  updateTime?: string;
}[];

/**
 * 接口 [配置列表↗](https://yapi.huianrong.com/project/1734/interface/api/69384) 的 **请求配置的类型**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `GET /svc-web/card/home/list`
 * @更新时间 `2022-12-03 14:03:20`
 */
type SvcWebCardHomeListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/card/home/list',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [配置列表↗](https://yapi.huianrong.com/project/1734/interface/api/69384) 的 **请求配置**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `GET /svc-web/card/home/list`
 * @更新时间 `2022-12-03 14:03:20`
 */
const svcWebCardHomeListGetRequestConfig: SvcWebCardHomeListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_5,
    devUrl: devUrl_0_4_0_5,
    prodUrl: prodUrl_0_4_0_5,
    path: '/svc-web/card/home/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_5,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCardHomeListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [配置列表↗](https://yapi.huianrong.com/project/1734/interface/api/69384) 的 **请求函数**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `GET /svc-web/card/home/list`
 * @更新时间 `2022-12-03 14:03:20`
 */
export const svcWebCardHomeListGet = /*#__PURE__*/ (
  requestData?: SvcWebCardHomeListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCardHomeListGetResponse>(
    prepare(svcWebCardHomeListGetRequestConfig, requestData),
    ...args
  );
};

svcWebCardHomeListGet.requestConfig = svcWebCardHomeListGetRequestConfig;

/**
 * 接口 [新增配置↗](https://yapi.huianrong.com/project/1734/interface/api/69458) 的 **请求类型**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `POST /svc-web/card/home/save`
 * @更新时间 `2022-12-10 16:08:23`
 */
export interface SvcWebCardHomeSavePostRequest {
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 帮助信息
   */
  helpInfo: string;
  /**
   * 使用指引
   */
  applyGuide: string;
  /**
   * 广告列表 ,CardHomeAdvert
   */
  advertList?: {
    /**
     * 类型1、图片2、活动
     */
    type: number;
    /**
     * 图片链接
     */
    content?: string;
    /**
     * 活动id
     */
    activityId?: number;
    /**
     * 图片
     */
    pic: string;
  }[];
}

/**
 * 接口 [新增配置↗](https://yapi.huianrong.com/project/1734/interface/api/69458) 的 **返回类型**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `POST /svc-web/card/home/save`
 * @更新时间 `2022-12-10 16:08:23`
 */
export interface SvcWebCardHomeSavePostResponse {
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
 * 接口 [新增配置↗](https://yapi.huianrong.com/project/1734/interface/api/69458) 的 **请求配置的类型**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `POST /svc-web/card/home/save`
 * @更新时间 `2022-12-10 16:08:23`
 */
type SvcWebCardHomeSavePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/card/home/save',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增配置↗](https://yapi.huianrong.com/project/1734/interface/api/69458) 的 **请求配置**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `POST /svc-web/card/home/save`
 * @更新时间 `2022-12-10 16:08:23`
 */
const svcWebCardHomeSavePostRequestConfig: SvcWebCardHomeSavePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_5,
    devUrl: devUrl_0_4_0_5,
    prodUrl: prodUrl_0_4_0_5,
    path: '/svc-web/card/home/save',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_5,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCardHomeSavePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [新增配置↗](https://yapi.huianrong.com/project/1734/interface/api/69458) 的 **请求函数**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `POST /svc-web/card/home/save`
 * @更新时间 `2022-12-10 16:08:23`
 */
export const svcWebCardHomeSavePost = /*#__PURE__*/ (
  requestData: SvcWebCardHomeSavePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCardHomeSavePostResponse>(
    prepare(svcWebCardHomeSavePostRequestConfig, requestData),
    ...args
  );
};

svcWebCardHomeSavePost.requestConfig = svcWebCardHomeSavePostRequestConfig;

/**
 * 接口 [配置详情↗](https://yapi.huianrong.com/project/1734/interface/api/69460) 的 **请求类型**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `GET /svc-web/card/home/detail/{id}`
 * @更新时间 `2022-12-10 14:22:40`
 */
export interface SvcWebCardHomeDetailIdGetRequest {
  /**
   * 储值卡(Long)
   */
  id: string;
}

/**
 * 接口 [配置详情↗](https://yapi.huianrong.com/project/1734/interface/api/69460) 的 **返回类型**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `GET /svc-web/card/home/detail/{id}`
 * @更新时间 `2022-12-10 14:22:40`
 */
export interface SvcWebCardHomeDetailIdGetResponse {
  /**
   * 配置id
   */
  id: number;
  /**
   * 广告列表 ,CardHomeAdvert
   */
  advertList?: {
    /**
     * 类型1、图片2、活动
     */
    type: number;
    /**
     * 图片链接
     */
    content?: string;
    /**
     * 活动id
     */
    activityId?: number;
    /**
     * 活动名称
     */
    activityName?: string;
    /**
     * 图片 ,GetResourceFilesResp
     */
    pic: {
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
  }[];
  /**
   * 帮助信息
   */
  helpInfo: string;
  /**
   * 使用指引
   */
  applyGuide: string;
  /**
   * 创建人
   */
  createBy: string;
  /**
   * 创建时间yyyy-MM-ddHH:mm:ss
   */
  createTime: string;
  /**
   * 更新人
   */
  updateBy: string;
  /**
   * 更新时间yyyy-MM-ddHH:mm:ss
   */
  updateTime: string;
}

/**
 * 接口 [配置详情↗](https://yapi.huianrong.com/project/1734/interface/api/69460) 的 **请求配置的类型**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `GET /svc-web/card/home/detail/{id}`
 * @更新时间 `2022-12-10 14:22:40`
 */
type SvcWebCardHomeDetailIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/card/home/detail/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [配置详情↗](https://yapi.huianrong.com/project/1734/interface/api/69460) 的 **请求配置**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `GET /svc-web/card/home/detail/{id}`
 * @更新时间 `2022-12-10 14:22:40`
 */
const svcWebCardHomeDetailIdGetRequestConfig: SvcWebCardHomeDetailIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_5,
    devUrl: devUrl_0_4_0_5,
    prodUrl: prodUrl_0_4_0_5,
    path: '/svc-web/card/home/detail/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_5,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCardHomeDetailIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [配置详情↗](https://yapi.huianrong.com/project/1734/interface/api/69460) 的 **请求函数**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `GET /svc-web/card/home/detail/{id}`
 * @更新时间 `2022-12-10 14:22:40`
 */
export const svcWebCardHomeDetailIdGet = /*#__PURE__*/ (
  requestData: SvcWebCardHomeDetailIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCardHomeDetailIdGetResponse>(
    prepare(svcWebCardHomeDetailIdGetRequestConfig, requestData),
    ...args
  );
};

svcWebCardHomeDetailIdGet.requestConfig =
  svcWebCardHomeDetailIdGetRequestConfig;

/**
 * 接口 [修改配置↗](https://yapi.huianrong.com/project/1734/interface/api/69462) 的 **请求类型**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `PUT /svc-web/card/home/modify`
 * @更新时间 `2022-12-10 16:08:27`
 */
export interface SvcWebCardHomeModifyPutRequest {
  /**
   * 配置id
   */
  id: number;
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 帮助信息
   */
  helpInfo: string;
  /**
   * 使用指引
   */
  applyGuide: string;
  /**
   * 广告列表 ,CardHomeAdvert
   */
  advertList?: {
    /**
     * 类型1、图片2、活动
     */
    type: number;
    /**
     * 图片链接
     */
    content?: string;
    /**
     * 活动id
     */
    activityId?: number;
    /**
     * 图片
     */
    pic: string;
  }[];
}

/**
 * 接口 [修改配置↗](https://yapi.huianrong.com/project/1734/interface/api/69462) 的 **返回类型**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `PUT /svc-web/card/home/modify`
 * @更新时间 `2022-12-10 16:08:27`
 */
export interface SvcWebCardHomeModifyPutResponse {
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
 * 接口 [修改配置↗](https://yapi.huianrong.com/project/1734/interface/api/69462) 的 **请求配置的类型**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `PUT /svc-web/card/home/modify`
 * @更新时间 `2022-12-10 16:08:27`
 */
type SvcWebCardHomeModifyPutRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/card/home/modify',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [修改配置↗](https://yapi.huianrong.com/project/1734/interface/api/69462) 的 **请求配置**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `PUT /svc-web/card/home/modify`
 * @更新时间 `2022-12-10 16:08:27`
 */
const svcWebCardHomeModifyPutRequestConfig: SvcWebCardHomeModifyPutRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_5,
    devUrl: devUrl_0_4_0_5,
    prodUrl: prodUrl_0_4_0_5,
    path: '/svc-web/card/home/modify',
    method: Method.PUT,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_5,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCardHomeModifyPut',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [修改配置↗](https://yapi.huianrong.com/project/1734/interface/api/69462) 的 **请求函数**
 *
 * @分类 [储值卡首页配置↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22255)
 * @请求头 `PUT /svc-web/card/home/modify`
 * @更新时间 `2022-12-10 16:08:27`
 */
export const svcWebCardHomeModifyPut = /*#__PURE__*/ (
  requestData: SvcWebCardHomeModifyPutRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCardHomeModifyPutResponse>(
    prepare(svcWebCardHomeModifyPutRequestConfig, requestData),
    ...args
  );
};

svcWebCardHomeModifyPut.requestConfig = svcWebCardHomeModifyPutRequestConfig;

const mockUrl_0_4_0_6 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_6 = '' as any;
const prodUrl_0_4_0_6 = '' as any;
const dataKey_0_4_0_6 = 'data' as any;

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69420) 的 **请求类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/page`
 * @更新时间 `2022-12-11 16:39:52`
 */
export interface SvcWebServiceCounterPageGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 卡id
   */
  cardId?: string;
  /**
   * 用户储值卡卡号
   */
  memberCardCode?: string;
  /**
   * 状态1:正常;2:冻结;3:退卡;
   */
  status?: string;
  /**
   * 会员信息名字编号
   */
  memberInfo?: string;
  /**
   * 会员手机号
   */
  memberPhone?: string;
  /**
   * 卡销售时间开始
   */
  cardSoldDateStart?: string;
  /**
   * 卡销售时间截至
   */
  cardSoldDateEnd?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69420) 的 **返回类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/page`
 * @更新时间 `2022-12-11 16:39:52`
 */
export interface SvcWebServiceCounterPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 会员卡id
     */
    memberCardId?: number;
    /**
     * 项目id
     */
    projectId?: number;
    /**
     * 项目名字
     */
    projectName?: string;
    /**
     * 储值卡卡名
     */
    cardName?: string;
    /**
     * 储值卡卡号
     */
    cardCode?: string;
    /**
     * 用户储值卡卡号
     */
    memberCardCode?: string;
    /**
     * 状态1:正常;2:冻结;3:退卡;
     */
    status?: number;
    /**
     * 持卡人编号
     */
    memberCode?: string;
    /**
     * 会员名字
     */
    memberName?: string;
    /**
     * 会员手机号
     */
    memberPhone?: string;
    /**
     * 充值总金额
     */
    rechargeAmount?: number;
    /**
     * 消费总金额
     */
    consumeAmount?: number;
    /**
     * 余额
     */
    balance?: number;
    /**
     * 卡销售日期
     */
    cardSoldDate?: string;
  }[];
}

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69420) 的 **请求配置的类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/page`
 * @更新时间 `2022-12-11 16:39:52`
 */
type SvcWebServiceCounterPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/service-counter/page',
    'data',
    string,
    | 'projectId'
    | 'cardId'
    | 'memberCardCode'
    | 'status'
    | 'memberInfo'
    | 'memberPhone'
    | 'cardSoldDateStart'
    | 'cardSoldDateEnd'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69420) 的 **请求配置**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/page`
 * @更新时间 `2022-12-11 16:39:52`
 */
const svcWebServiceCounterPageGetRequestConfig: SvcWebServiceCounterPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_6,
    devUrl: devUrl_0_4_0_6,
    prodUrl: prodUrl_0_4_0_6,
    path: '/svc-web/service-counter/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_6,
    paramNames: [],
    queryNames: [
      'projectId',
      'cardId',
      'memberCardCode',
      'status',
      'memberInfo',
      'memberPhone',
      'cardSoldDateStart',
      'cardSoldDateEnd',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebServiceCounterPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69420) 的 **请求函数**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/page`
 * @更新时间 `2022-12-11 16:39:52`
 */
export const svcWebServiceCounterPageGet = /*#__PURE__*/ (
  requestData: SvcWebServiceCounterPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebServiceCounterPageGetResponse>(
    prepare(svcWebServiceCounterPageGetRequestConfig, requestData),
    ...args
  );
};

svcWebServiceCounterPageGet.requestConfig =
  svcWebServiceCounterPageGetRequestConfig;

/**
 * 接口 [会员卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69424) 的 **请求类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/info/{memberCardId}`
 * @更新时间 `2022-12-11 16:39:56`
 */
export interface SvcWebServiceCounterInfoMemberCardIdGetRequest {
  /**
   * (Long)
   */
  memberCardId: string;
}

/**
 * 接口 [会员卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69424) 的 **返回类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/info/{memberCardId}`
 * @更新时间 `2022-12-11 16:39:56`
 */
export interface SvcWebServiceCounterInfoMemberCardIdGetResponse {
  /**
   * 会员卡id
   */
  memberCardId?: number;
  /**
   * 项目名字
   */
  projectName?: string;
  /**
   * 储值卡卡号
   */
  cardCode?: string;
  /**
   * 储值卡名称
   */
  cardName?: string;
  /**
   * 用户储值卡卡号
   */
  memberCardCode?: string;
  /**
   * 之前状态1:正常;2:冻结;3:退卡;
   */
  beforeStatus?: number;
  /**
   * 状态1:正常;2:冻结;3:退卡;
   */
  status?: number;
  /**
   * 会员名字
   */
  memberName?: string;
  /**
   * 会员手机号
   */
  memberPhone?: string;
  /**
   * 充值总金额
   */
  rechargeAmount?: number;
  /**
   * 消费总金额
   */
  consumeAmount?: number;
  /**
   * 余额
   */
  balance?: number;
  /**
   * 可退余额
   */
  canReturnBalance?: number;
  /**
   * 退还余额
   */
  returnBalance?: number;
  /**
   * 退卡人
   */
  returnMemberName?: string;
  /**
   * 退卡时间
   */
  returnTime?: string;
}

/**
 * 接口 [会员卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69424) 的 **请求配置的类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/info/{memberCardId}`
 * @更新时间 `2022-12-11 16:39:56`
 */
type SvcWebServiceCounterInfoMemberCardIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/service-counter/info/{memberCardId}',
    'data',
    'memberCardId',
    string,
    false
  >
>;

/**
 * 接口 [会员卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69424) 的 **请求配置**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/info/{memberCardId}`
 * @更新时间 `2022-12-11 16:39:56`
 */
const svcWebServiceCounterInfoMemberCardIdGetRequestConfig: SvcWebServiceCounterInfoMemberCardIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_6,
    devUrl: devUrl_0_4_0_6,
    prodUrl: prodUrl_0_4_0_6,
    path: '/svc-web/service-counter/info/{memberCardId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_6,
    paramNames: ['memberCardId'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebServiceCounterInfoMemberCardIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [会员卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69424) 的 **请求函数**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/info/{memberCardId}`
 * @更新时间 `2022-12-11 16:39:56`
 */
export const svcWebServiceCounterInfoMemberCardIdGet = /*#__PURE__*/ (
  requestData: SvcWebServiceCounterInfoMemberCardIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebServiceCounterInfoMemberCardIdGetResponse>(
    prepare(svcWebServiceCounterInfoMemberCardIdGetRequestConfig, requestData),
    ...args
  );
};

svcWebServiceCounterInfoMemberCardIdGet.requestConfig =
  svcWebServiceCounterInfoMemberCardIdGetRequestConfig;

/**
 * 接口 [冻结解冻记录↗](https://yapi.huianrong.com/project/1734/interface/api/69426) 的 **请求类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/freeze-history/{memberCardId}`
 * @更新时间 `2022-12-01 17:19:51`
 */
export interface SvcWebServiceCounterFreezeHistoryMemberCardIdGetRequest {
  pageNum?: string;
  pageSize?: string;
  /**
   * (Long)
   */
  memberCardId: string;
}

/**
 * 接口 [冻结解冻记录↗](https://yapi.huianrong.com/project/1734/interface/api/69426) 的 **返回类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/freeze-history/{memberCardId}`
 * @更新时间 `2022-12-01 17:19:51`
 */
export interface SvcWebServiceCounterFreezeHistoryMemberCardIdGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 冻结解冻记录id
     */
    memberCardFreezeId?: number;
    /**
     * 类型:1、解冻2、冻结
     */
    type?: number;
    /**
     * 单号
     */
    code?: string;
    /**
     * 操作人
     */
    freezeBy?: string;
    /**
     * 操作时间
     */
    freezeTime?: string;
  }[];
}

/**
 * 接口 [冻结解冻记录↗](https://yapi.huianrong.com/project/1734/interface/api/69426) 的 **请求配置的类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/freeze-history/{memberCardId}`
 * @更新时间 `2022-12-01 17:19:51`
 */
type SvcWebServiceCounterFreezeHistoryMemberCardIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/service-counter/freeze-history/{memberCardId}',
    'data',
    'memberCardId',
    'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [冻结解冻记录↗](https://yapi.huianrong.com/project/1734/interface/api/69426) 的 **请求配置**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/freeze-history/{memberCardId}`
 * @更新时间 `2022-12-01 17:19:51`
 */
const svcWebServiceCounterFreezeHistoryMemberCardIdGetRequestConfig: SvcWebServiceCounterFreezeHistoryMemberCardIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_6,
    devUrl: devUrl_0_4_0_6,
    prodUrl: prodUrl_0_4_0_6,
    path: '/svc-web/service-counter/freeze-history/{memberCardId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_6,
    paramNames: ['memberCardId'],
    queryNames: ['pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebServiceCounterFreezeHistoryMemberCardIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [冻结解冻记录↗](https://yapi.huianrong.com/project/1734/interface/api/69426) 的 **请求函数**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/freeze-history/{memberCardId}`
 * @更新时间 `2022-12-01 17:19:51`
 */
export const svcWebServiceCounterFreezeHistoryMemberCardIdGet = /*#__PURE__*/ (
  requestData: SvcWebServiceCounterFreezeHistoryMemberCardIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebServiceCounterFreezeHistoryMemberCardIdGetResponse>(
    prepare(
      svcWebServiceCounterFreezeHistoryMemberCardIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

svcWebServiceCounterFreezeHistoryMemberCardIdGet.requestConfig =
  svcWebServiceCounterFreezeHistoryMemberCardIdGetRequestConfig;

/**
 * 接口 [充值记录↗](https://yapi.huianrong.com/project/1734/interface/api/69428) 的 **请求类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/recharge-history/{memberCardId}`
 * @更新时间 `2022-12-09 14:42:27`
 */
export interface SvcWebServiceCounterRechargeHistoryMemberCardIdGetRequest {
  pageNum?: string;
  pageSize?: string;
  /**
   * (Long)
   */
  memberCardId: string;
}

/**
 * 接口 [充值记录↗](https://yapi.huianrong.com/project/1734/interface/api/69428) 的 **返回类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/recharge-history/{memberCardId}`
 * @更新时间 `2022-12-09 14:42:27`
 */
export interface SvcWebServiceCounterRechargeHistoryMemberCardIdGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 充值记录id
     */
    memberCardRechargeId?: number;
    /**
     * 类型:1充值
     */
    type?: number;
    /**
     * 单号
     */
    code?: string;
    /**
     * 实付金额
     */
    paymentAmount?: number;
    /**
     * 优惠金额
     */
    discountAmount?: number;
    /**
     * 到账金额
     */
    receivedAmount?: number;
    /**
     * 充值人
     */
    rechargeBy?: string;
    /**
     * 活动
     */
    activity?: string;
    /**
     * 操作时间
     */
    rechargeTime?: string;
  }[];
}

/**
 * 接口 [充值记录↗](https://yapi.huianrong.com/project/1734/interface/api/69428) 的 **请求配置的类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/recharge-history/{memberCardId}`
 * @更新时间 `2022-12-09 14:42:27`
 */
type SvcWebServiceCounterRechargeHistoryMemberCardIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/service-counter/recharge-history/{memberCardId}',
    'data',
    'memberCardId',
    'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [充值记录↗](https://yapi.huianrong.com/project/1734/interface/api/69428) 的 **请求配置**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/recharge-history/{memberCardId}`
 * @更新时间 `2022-12-09 14:42:27`
 */
const svcWebServiceCounterRechargeHistoryMemberCardIdGetRequestConfig: SvcWebServiceCounterRechargeHistoryMemberCardIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_6,
    devUrl: devUrl_0_4_0_6,
    prodUrl: prodUrl_0_4_0_6,
    path: '/svc-web/service-counter/recharge-history/{memberCardId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_6,
    paramNames: ['memberCardId'],
    queryNames: ['pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebServiceCounterRechargeHistoryMemberCardIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [充值记录↗](https://yapi.huianrong.com/project/1734/interface/api/69428) 的 **请求函数**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/recharge-history/{memberCardId}`
 * @更新时间 `2022-12-09 14:42:27`
 */
export const svcWebServiceCounterRechargeHistoryMemberCardIdGet =
  /*#__PURE__*/ (
    requestData: SvcWebServiceCounterRechargeHistoryMemberCardIdGetRequest,
    ...args: UserRequestRestArgs
  ) => {
    return request<SvcWebServiceCounterRechargeHistoryMemberCardIdGetResponse>(
      prepare(
        svcWebServiceCounterRechargeHistoryMemberCardIdGetRequestConfig,
        requestData
      ),
      ...args
    );
  };

svcWebServiceCounterRechargeHistoryMemberCardIdGet.requestConfig =
  svcWebServiceCounterRechargeHistoryMemberCardIdGetRequestConfig;

/**
 * 接口 [消费记录↗](https://yapi.huianrong.com/project/1734/interface/api/69432) 的 **请求类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/consume-history/{memberCardId}`
 * @更新时间 `2022-12-02 15:32:41`
 */
export interface SvcWebServiceCounterConsumeHistoryMemberCardIdGetRequest {
  pageNum?: string;
  pageSize?: string;
  /**
   * (Long)
   */
  memberCardId: string;
}

/**
 * 接口 [消费记录↗](https://yapi.huianrong.com/project/1734/interface/api/69432) 的 **返回类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/consume-history/{memberCardId}`
 * @更新时间 `2022-12-02 15:32:41`
 */
export interface SvcWebServiceCounterConsumeHistoryMemberCardIdGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 1购卡2充值3消费4退款5退卡
     */
    type?: number;
    /**
     * 时间
     */
    time?: string;
    /**
     * 流水单号
     */
    serialNo?: string;
    /**
     * 店铺编号
     */
    storeCode?: string;
    /**
     * 店铺名
     */
    storeName?: string;
    /**
     * 操作员
     */
    operator?: string;
    /**
     * 发生金额
     */
    operationAmount?: number;
    /**
     * 余额
     */
    balance?: number;
  }[];
}

/**
 * 接口 [消费记录↗](https://yapi.huianrong.com/project/1734/interface/api/69432) 的 **请求配置的类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/consume-history/{memberCardId}`
 * @更新时间 `2022-12-02 15:32:41`
 */
type SvcWebServiceCounterConsumeHistoryMemberCardIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/service-counter/consume-history/{memberCardId}',
    'data',
    'memberCardId',
    'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [消费记录↗](https://yapi.huianrong.com/project/1734/interface/api/69432) 的 **请求配置**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/consume-history/{memberCardId}`
 * @更新时间 `2022-12-02 15:32:41`
 */
const svcWebServiceCounterConsumeHistoryMemberCardIdGetRequestConfig: SvcWebServiceCounterConsumeHistoryMemberCardIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_6,
    devUrl: devUrl_0_4_0_6,
    prodUrl: prodUrl_0_4_0_6,
    path: '/svc-web/service-counter/consume-history/{memberCardId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_6,
    paramNames: ['memberCardId'],
    queryNames: ['pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebServiceCounterConsumeHistoryMemberCardIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [消费记录↗](https://yapi.huianrong.com/project/1734/interface/api/69432) 的 **请求函数**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/consume-history/{memberCardId}`
 * @更新时间 `2022-12-02 15:32:41`
 */
export const svcWebServiceCounterConsumeHistoryMemberCardIdGet = /*#__PURE__*/ (
  requestData: SvcWebServiceCounterConsumeHistoryMemberCardIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebServiceCounterConsumeHistoryMemberCardIdGetResponse>(
    prepare(
      svcWebServiceCounterConsumeHistoryMemberCardIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

svcWebServiceCounterConsumeHistoryMemberCardIdGet.requestConfig =
  svcWebServiceCounterConsumeHistoryMemberCardIdGetRequestConfig;

/**
 * 接口 [退卡退款记录↗](https://yapi.huianrong.com/project/1734/interface/api/69480) 的 **请求类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/return-history/{memberCardId}`
 * @更新时间 `2022-12-01 15:23:53`
 */
export interface SvcWebServiceCounterReturnHistoryMemberCardIdGetRequest {
  pageNum?: string;
  pageSize?: string;
  /**
   * (Long)
   */
  memberCardId: string;
}

/**
 * 接口 [退卡退款记录↗](https://yapi.huianrong.com/project/1734/interface/api/69480) 的 **返回类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/return-history/{memberCardId}`
 * @更新时间 `2022-12-01 15:23:53`
 */
export interface SvcWebServiceCounterReturnHistoryMemberCardIdGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 支付方式:1现金
     */
    payWay?: number;
    /**
     * 金额
     */
    amount?: number;
  }[];
}

/**
 * 接口 [退卡退款记录↗](https://yapi.huianrong.com/project/1734/interface/api/69480) 的 **请求配置的类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/return-history/{memberCardId}`
 * @更新时间 `2022-12-01 15:23:53`
 */
type SvcWebServiceCounterReturnHistoryMemberCardIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/service-counter/return-history/{memberCardId}',
    'data',
    'memberCardId',
    'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [退卡退款记录↗](https://yapi.huianrong.com/project/1734/interface/api/69480) 的 **请求配置**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/return-history/{memberCardId}`
 * @更新时间 `2022-12-01 15:23:53`
 */
const svcWebServiceCounterReturnHistoryMemberCardIdGetRequestConfig: SvcWebServiceCounterReturnHistoryMemberCardIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_6,
    devUrl: devUrl_0_4_0_6,
    prodUrl: prodUrl_0_4_0_6,
    path: '/svc-web/service-counter/return-history/{memberCardId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_6,
    paramNames: ['memberCardId'],
    queryNames: ['pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebServiceCounterReturnHistoryMemberCardIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [退卡退款记录↗](https://yapi.huianrong.com/project/1734/interface/api/69480) 的 **请求函数**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/return-history/{memberCardId}`
 * @更新时间 `2022-12-01 15:23:53`
 */
export const svcWebServiceCounterReturnHistoryMemberCardIdGet = /*#__PURE__*/ (
  requestData: SvcWebServiceCounterReturnHistoryMemberCardIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebServiceCounterReturnHistoryMemberCardIdGetResponse>(
    prepare(
      svcWebServiceCounterReturnHistoryMemberCardIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

svcWebServiceCounterReturnHistoryMemberCardIdGet.requestConfig =
  svcWebServiceCounterReturnHistoryMemberCardIdGetRequestConfig;

/**
 * 接口 [导出数据↗](https://yapi.huianrong.com/project/1734/interface/api/69840) 的 **请求类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/export`
 * @更新时间 `2022-12-08 09:58:23`
 */
export interface SvcWebServiceCounterExportGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 卡id
   */
  cardId?: string;
  /**
   * 卡号
   */
  cardCode?: string;
  /**
   * 状态1:正常;2:冻结;3:退卡;
   */
  status?: string;
  /**
   * 会员信息名字编号
   */
  memberInfo?: string;
  /**
   * 会员手机号
   */
  memberPhone?: string;
  /**
   * 卡销售时间开始
   */
  cardSoldDateStart?: string;
  /**
   * 卡销售时间截至
   */
  cardSoldDateEnd?: string;
  /**
   * 会员卡ids
   */
  memberCardIdList?: string;
}

/**
 * 接口 [导出数据↗](https://yapi.huianrong.com/project/1734/interface/api/69840) 的 **返回类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/export`
 * @更新时间 `2022-12-08 09:58:23`
 */
export interface SvcWebServiceCounterExportGetResponse {}

/**
 * 接口 [导出数据↗](https://yapi.huianrong.com/project/1734/interface/api/69840) 的 **请求配置的类型**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/export`
 * @更新时间 `2022-12-08 09:58:23`
 */
type SvcWebServiceCounterExportGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/service-counter/export',
    'data',
    string,
    | 'projectId'
    | 'cardId'
    | 'cardCode'
    | 'status'
    | 'memberInfo'
    | 'memberPhone'
    | 'cardSoldDateStart'
    | 'cardSoldDateEnd'
    | 'memberCardIdList',
    false
  >
>;

/**
 * 接口 [导出数据↗](https://yapi.huianrong.com/project/1734/interface/api/69840) 的 **请求配置**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/export`
 * @更新时间 `2022-12-08 09:58:23`
 */
const svcWebServiceCounterExportGetRequestConfig: SvcWebServiceCounterExportGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_6,
    devUrl: devUrl_0_4_0_6,
    prodUrl: prodUrl_0_4_0_6,
    path: '/svc-web/service-counter/export',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_6,
    paramNames: [],
    queryNames: [
      'projectId',
      'cardId',
      'cardCode',
      'status',
      'memberInfo',
      'memberPhone',
      'cardSoldDateStart',
      'cardSoldDateEnd',
      'memberCardIdList'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebServiceCounterExportGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [导出数据↗](https://yapi.huianrong.com/project/1734/interface/api/69840) 的 **请求函数**
 *
 * @分类 [储值卡服务台↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22291)
 * @请求头 `GET /svc-web/service-counter/export`
 * @更新时间 `2022-12-08 09:58:23`
 */
export const svcWebServiceCounterExportGet = /*#__PURE__*/ (
  requestData: SvcWebServiceCounterExportGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebServiceCounterExportGetResponse>(
    prepare(svcWebServiceCounterExportGetRequestConfig, requestData),
    ...args
  );
};

svcWebServiceCounterExportGet.requestConfig =
  svcWebServiceCounterExportGetRequestConfig;

const mockUrl_0_4_0_7 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_7 = '' as any;
const prodUrl_0_4_0_7 = '' as any;
const dataKey_0_4_0_7 = 'data' as any;

/**
 * 接口 [冻结、解冻列表↗](https://yapi.huianrong.com/project/1734/interface/api/69486) 的 **请求类型**
 *
 * @分类 [储值卡冻结、解冻↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22349)
 * @请求头 `GET /svc-web/member/card/freeze/list`
 * @更新时间 `2022-12-07 17:03:38`
 */
export interface SvcWebMemberCardFreezeListGetRequest {
  /**
   * 操作类型1、解冻2、冻结
   */
  type?: string;
  /**
   * 单号
   */
  orderNo?: string;
  /**
   * 卡号
   */
  memberCardCode?: string;
  /**
   * 卡id
   */
  cardId?: string;
  /**
   * 操作人
   */
  createBy?: string;
  /**
   * 操作时间开始yyyy-MM-dd
   */
  startDate?: string;
  /**
   * 操作时间结束yyyy-MM-dd
   */
  endDate?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [冻结、解冻列表↗](https://yapi.huianrong.com/project/1734/interface/api/69486) 的 **返回类型**
 *
 * @分类 [储值卡冻结、解冻↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22349)
 * @请求头 `GET /svc-web/member/card/freeze/list`
 * @更新时间 `2022-12-07 17:03:38`
 */
export interface SvcWebMemberCardFreezeListGetResponse {
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
    id: number;
    /**
     * 项目名称
     */
    projectName: string;
    /**
     * 操作类型1、解冻2、冻结
     */
    type: number;
    /**
     * 单号
     */
    orderNo: string;
    /**
     * 卡号
     */
    memberCardCode: string;
    /**
     * 卡名
     */
    cardName: string;
    /**
     * 持卡人编号
     */
    memberCode: string;
    /**
     * 持卡人姓名
     */
    memberName: string;
    /**
     * 持卡人电话
     */
    memberPhone: string;
    /**
     * 操作人
     */
    createBy: string;
    /**
     * 操作时间yyyy-MM-ddHH:mm:ss
     */
    createTime: string;
  }[];
}

/**
 * 接口 [冻结、解冻列表↗](https://yapi.huianrong.com/project/1734/interface/api/69486) 的 **请求配置的类型**
 *
 * @分类 [储值卡冻结、解冻↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22349)
 * @请求头 `GET /svc-web/member/card/freeze/list`
 * @更新时间 `2022-12-07 17:03:38`
 */
type SvcWebMemberCardFreezeListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/member/card/freeze/list',
    'data',
    string,
    | 'type'
    | 'orderNo'
    | 'memberCardCode'
    | 'cardId'
    | 'createBy'
    | 'startDate'
    | 'endDate'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [冻结、解冻列表↗](https://yapi.huianrong.com/project/1734/interface/api/69486) 的 **请求配置**
 *
 * @分类 [储值卡冻结、解冻↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22349)
 * @请求头 `GET /svc-web/member/card/freeze/list`
 * @更新时间 `2022-12-07 17:03:38`
 */
const svcWebMemberCardFreezeListGetRequestConfig: SvcWebMemberCardFreezeListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_7,
    devUrl: devUrl_0_4_0_7,
    prodUrl: prodUrl_0_4_0_7,
    path: '/svc-web/member/card/freeze/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_7,
    paramNames: [],
    queryNames: [
      'type',
      'orderNo',
      'memberCardCode',
      'cardId',
      'createBy',
      'startDate',
      'endDate',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebMemberCardFreezeListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [冻结、解冻列表↗](https://yapi.huianrong.com/project/1734/interface/api/69486) 的 **请求函数**
 *
 * @分类 [储值卡冻结、解冻↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22349)
 * @请求头 `GET /svc-web/member/card/freeze/list`
 * @更新时间 `2022-12-07 17:03:38`
 */
export const svcWebMemberCardFreezeListGet = /*#__PURE__*/ (
  requestData: SvcWebMemberCardFreezeListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebMemberCardFreezeListGetResponse>(
    prepare(svcWebMemberCardFreezeListGetRequestConfig, requestData),
    ...args
  );
};

svcWebMemberCardFreezeListGet.requestConfig =
  svcWebMemberCardFreezeListGetRequestConfig;

/**
 * 接口 [冻结、解冻详情↗](https://yapi.huianrong.com/project/1734/interface/api/69488) 的 **请求类型**
 *
 * @分类 [储值卡冻结、解冻↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22349)
 * @请求头 `GET /svc-web/member/card/freeze/detail/{id}`
 * @更新时间 `2022-12-10 16:32:51`
 */
export interface SvcWebMemberCardFreezeDetailIdGetRequest {
  /**
   * 储值卡(Long)
   */
  id: string;
}

/**
 * 接口 [冻结、解冻详情↗](https://yapi.huianrong.com/project/1734/interface/api/69488) 的 **返回类型**
 *
 * @分类 [储值卡冻结、解冻↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22349)
 * @请求头 `GET /svc-web/member/card/freeze/detail/{id}`
 * @更新时间 `2022-12-10 16:32:51`
 */
export interface SvcWebMemberCardFreezeDetailIdGetResponse {
  /**
   * 数据id
   */
  id: number;
  /**
   * 单号
   */
  orderNo: string;
  /**
   * 项目名称
   */
  projectName: string;
  /**
   * 卡名
   */
  cardName: string;
  /**
   * 卡号
   */
  carCode?: string;
  /**
   * 用户卡号
   */
  memberCardCode: string;
  /**
   * 持卡人编号
   */
  memberCode: string;
  /**
   * 持卡人姓名
   */
  memberName: string;
  /**
   * 持卡人电话
   */
  memberPhone: string;
  /**
   * 卡內余额
   */
  balance: number;
  /**
   * 当前状态1、使用中2、已冻结3、已退卡
   */
  currentStatus: number;
  /**
   * 更改前状态1、使用中2、已冻结3、已退卡
   */
  beforeStatus: number;
  /**
   * 冻结人
   */
  freezeBy: string;
  /**
   * 冻结时间yyyy-MM-ddHH:mm:ss
   */
  freezeTime: string;
  /**
   * 解冻人
   */
  unfreezeBy?: string;
  /**
   * 解冻时间yyyy-MM-ddHH:mm:ss
   */
  unfreezeTime?: string;
}

/**
 * 接口 [冻结、解冻详情↗](https://yapi.huianrong.com/project/1734/interface/api/69488) 的 **请求配置的类型**
 *
 * @分类 [储值卡冻结、解冻↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22349)
 * @请求头 `GET /svc-web/member/card/freeze/detail/{id}`
 * @更新时间 `2022-12-10 16:32:51`
 */
type SvcWebMemberCardFreezeDetailIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/member/card/freeze/detail/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [冻结、解冻详情↗](https://yapi.huianrong.com/project/1734/interface/api/69488) 的 **请求配置**
 *
 * @分类 [储值卡冻结、解冻↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22349)
 * @请求头 `GET /svc-web/member/card/freeze/detail/{id}`
 * @更新时间 `2022-12-10 16:32:51`
 */
const svcWebMemberCardFreezeDetailIdGetRequestConfig: SvcWebMemberCardFreezeDetailIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_7,
    devUrl: devUrl_0_4_0_7,
    prodUrl: prodUrl_0_4_0_7,
    path: '/svc-web/member/card/freeze/detail/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_7,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebMemberCardFreezeDetailIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [冻结、解冻详情↗](https://yapi.huianrong.com/project/1734/interface/api/69488) 的 **请求函数**
 *
 * @分类 [储值卡冻结、解冻↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22349)
 * @请求头 `GET /svc-web/member/card/freeze/detail/{id}`
 * @更新时间 `2022-12-10 16:32:51`
 */
export const svcWebMemberCardFreezeDetailIdGet = /*#__PURE__*/ (
  requestData: SvcWebMemberCardFreezeDetailIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebMemberCardFreezeDetailIdGetResponse>(
    prepare(svcWebMemberCardFreezeDetailIdGetRequestConfig, requestData),
    ...args
  );
};

svcWebMemberCardFreezeDetailIdGet.requestConfig =
  svcWebMemberCardFreezeDetailIdGetRequestConfig;

const mockUrl_0_4_0_8 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_8 = '' as any;
const prodUrl_0_4_0_8 = '' as any;
const dataKey_0_4_0_8 = 'data' as any;

/**
 * 接口 [基础数据和饼状图↗](https://yapi.huianrong.com/project/1734/interface/api/69494) 的 **请求类型**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22371)
 * @请求头 `GET /svc-web/home/data`
 * @更新时间 `2022-12-01 14:57:29`
 */
export interface SvcWebHomeDataGetRequest {}

/**
 * 接口 [基础数据和饼状图↗](https://yapi.huianrong.com/project/1734/interface/api/69494) 的 **返回类型**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22371)
 * @请求头 `GET /svc-web/home/data`
 * @更新时间 `2022-12-01 14:57:29`
 */
export interface SvcWebHomeDataGetResponse {
  /**
   * 开卡金额 ,AmountData
   */
  open?: {
    /**
     * 金额
     */
    amount?: number;
    /**
     * 订单数量
     */
    orderNum?: number;
  };
  /**
   * 充值金额 ,AmountData
   */
  recharge?: {
    /**
     * 金额
     */
    amount?: number;
    /**
     * 订单数量
     */
    orderNum?: number;
  };
  /**
   * 消费金额 ,AmountData
   */
  consume?: {
    /**
     * 金额
     */
    amount?: number;
    /**
     * 订单数量
     */
    orderNum?: number;
  };
  /**
   * 退款金额 ,AmountData
   */
  refund?: {
    /**
     * 金额
     */
    amount?: number;
    /**
     * 订单数量
     */
    orderNum?: number;
  };
  /**
   * 饼状图 ,PieChart
   */
  chart?: {
    /**
     * 值
     */
    value?: string;
    /**
     * 名字
     */
    name?: string;
  }[];
}

/**
 * 接口 [基础数据和饼状图↗](https://yapi.huianrong.com/project/1734/interface/api/69494) 的 **请求配置的类型**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22371)
 * @请求头 `GET /svc-web/home/data`
 * @更新时间 `2022-12-01 14:57:29`
 */
type SvcWebHomeDataGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/home/data',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [基础数据和饼状图↗](https://yapi.huianrong.com/project/1734/interface/api/69494) 的 **请求配置**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22371)
 * @请求头 `GET /svc-web/home/data`
 * @更新时间 `2022-12-01 14:57:29`
 */
const svcWebHomeDataGetRequestConfig: SvcWebHomeDataGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_8,
    devUrl: devUrl_0_4_0_8,
    prodUrl: prodUrl_0_4_0_8,
    path: '/svc-web/home/data',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebHomeDataGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [基础数据和饼状图↗](https://yapi.huianrong.com/project/1734/interface/api/69494) 的 **请求函数**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22371)
 * @请求头 `GET /svc-web/home/data`
 * @更新时间 `2022-12-01 14:57:29`
 */
export const svcWebHomeDataGet = /*#__PURE__*/ (
  requestData?: SvcWebHomeDataGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebHomeDataGetResponse>(
    prepare(svcWebHomeDataGetRequestConfig, requestData),
    ...args
  );
};

svcWebHomeDataGet.requestConfig = svcWebHomeDataGetRequestConfig;

/**
 * 接口 [储值卡运营分析图↗](https://yapi.huianrong.com/project/1734/interface/api/69496) 的 **请求类型**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22371)
 * @请求头 `GET /svc-web/home/history-data`
 * @更新时间 `2022-12-01 14:57:30`
 */
export interface SvcWebHomeHistoryDataGetRequest {
  /**
   * 开始日期
   */
  startDate?: string;
  /**
   * 截至日期
   */
  endDate?: string;
  /**
   * 日期类型:1日2月3年
   */
  dateType?: string;
}

/**
 * 接口 [储值卡运营分析图↗](https://yapi.huianrong.com/project/1734/interface/api/69496) 的 **返回类型**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22371)
 * @请求头 `GET /svc-web/home/history-data`
 * @更新时间 `2022-12-01 14:57:30`
 */
export interface SvcWebHomeHistoryDataGetResponse {
  /**
   * x轴 ,X
   */
  x?: {
    /**
     * 显示数据-用以x轴数据的显示
     */
    showData?: string;
    /**
     * 完整数据-用于鼠标移动显示的完整数据
     */
    fullData?: string;
  }[];
  /**
   * 购卡Y ,Y
   */
  buyY?: {
    /**
     * 名字
     */
    name?: string;
    /**
     * 值 ,String
     */
    value?: string[];
  };
  /**
   * 充值Y ,Y
   */
  rechargeY?: {
    /**
     * 名字
     */
    name?: string;
    /**
     * 值 ,String
     */
    value?: string[];
  };
  /**
   * 消费Y ,Y
   */
  consumeY?: {
    /**
     * 名字
     */
    name?: string;
    /**
     * 值 ,String
     */
    value?: string[];
  };
  /**
   * 退款Y ,Y
   */
  refundY?: {
    /**
     * 名字
     */
    name?: string;
    /**
     * 值 ,String
     */
    value?: string[];
  };
  /**
   * 退卡Y ,Y
   */
  returnY?: {
    /**
     * 名字
     */
    name?: string;
    /**
     * 值 ,String
     */
    value?: string[];
  };
}

/**
 * 接口 [储值卡运营分析图↗](https://yapi.huianrong.com/project/1734/interface/api/69496) 的 **请求配置的类型**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22371)
 * @请求头 `GET /svc-web/home/history-data`
 * @更新时间 `2022-12-01 14:57:30`
 */
type SvcWebHomeHistoryDataGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/home/history-data',
    'data',
    string,
    'startDate' | 'endDate' | 'dateType',
    false
  >
>;

/**
 * 接口 [储值卡运营分析图↗](https://yapi.huianrong.com/project/1734/interface/api/69496) 的 **请求配置**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22371)
 * @请求头 `GET /svc-web/home/history-data`
 * @更新时间 `2022-12-01 14:57:30`
 */
const svcWebHomeHistoryDataGetRequestConfig: SvcWebHomeHistoryDataGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_8,
    devUrl: devUrl_0_4_0_8,
    prodUrl: prodUrl_0_4_0_8,
    path: '/svc-web/home/history-data',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_8,
    paramNames: [],
    queryNames: ['startDate', 'endDate', 'dateType'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebHomeHistoryDataGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [储值卡运营分析图↗](https://yapi.huianrong.com/project/1734/interface/api/69496) 的 **请求函数**
 *
 * @分类 [首页↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22371)
 * @请求头 `GET /svc-web/home/history-data`
 * @更新时间 `2022-12-01 14:57:30`
 */
export const svcWebHomeHistoryDataGet = /*#__PURE__*/ (
  requestData: SvcWebHomeHistoryDataGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebHomeHistoryDataGetResponse>(
    prepare(svcWebHomeHistoryDataGetRequestConfig, requestData),
    ...args
  );
};

svcWebHomeHistoryDataGet.requestConfig = svcWebHomeHistoryDataGetRequestConfig;

const mockUrl_0_4_0_9 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_9 = '' as any;
const prodUrl_0_4_0_9 = '' as any;
const dataKey_0_4_0_9 = 'data' as any;

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69550) 的 **请求类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/page`
 * @更新时间 `2022-12-10 15:59:37`
 */
export interface SvcWebActivityDiscountPageGetRequest {
  /**
   * 项目
   */
  projectId?: string;
  /**
   * 活动id
   */
  activityId?: string;
  /**
   * 活动场景 购卡:purchase,充值:recharge,消费:consume
   */
  scene?: string;
  /**
   * 活动类型 满减:decrement ,满赠:gift ,满折:discount ,消费打折：consume_discount
   */
  type?: string;
  /**
   * 开始时间
   */
  startDate?: string;
  /**
   * 结束时间
   */
  endDate?: string;
  /**
   * 状态: 1.未开始 2.进行中 3.已暂停 4.已完成
   */
  status?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69550) 的 **返回类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/page`
 * @更新时间 `2022-12-10 15:59:37`
 */
export interface SvcWebActivityDiscountPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    id?: number;
    /**
     * 项目
     */
    projectName?: string;
    /**
     * 活动编码
     */
    code?: string;
    /**
     * 活动名称
     */
    name?: string;
    /**
     * 活动场景 购卡:purchase,充值:recharge,消费:consume
     */
    scene?: string;
    /**
     * 活动类型 满减:decrement ,满赠:gift ,满折:discount
     */
    type?: string;
    /**
     * 开始时间
     */
    startTime?: string;
    /**
     * 结束时间
     */
    endTime?: string;
    /**
     * 状态: 1.未开始 2.进行中 3.已暂停 4.已完成
     */
    status?: number;
    /**
     * 创建人
     */
    createBy?: string;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 更新人
     */
    updateBy?: string;
    /**
     * 更新时间
     */
    updateTime?: string;
  }[];
}

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69550) 的 **请求配置的类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/page`
 * @更新时间 `2022-12-10 15:59:37`
 */
type SvcWebActivityDiscountPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/activity/discount/page',
    'data',
    string,
    | 'projectId'
    | 'activityId'
    | 'scene'
    | 'type'
    | 'startDate'
    | 'endDate'
    | 'status'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69550) 的 **请求配置**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/page`
 * @更新时间 `2022-12-10 15:59:37`
 */
const svcWebActivityDiscountPageGetRequestConfig: SvcWebActivityDiscountPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_9,
    devUrl: devUrl_0_4_0_9,
    prodUrl: prodUrl_0_4_0_9,
    path: '/svc-web/activity/discount/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_9,
    paramNames: [],
    queryNames: [
      'projectId',
      'activityId',
      'scene',
      'type',
      'startDate',
      'endDate',
      'status',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebActivityDiscountPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69550) 的 **请求函数**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/page`
 * @更新时间 `2022-12-10 15:59:37`
 */
export const svcWebActivityDiscountPageGet = /*#__PURE__*/ (
  requestData: SvcWebActivityDiscountPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebActivityDiscountPageGetResponse>(
    prepare(svcWebActivityDiscountPageGetRequestConfig, requestData),
    ...args
  );
};

svcWebActivityDiscountPageGet.requestConfig =
  svcWebActivityDiscountPageGetRequestConfig;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1734/interface/api/69552) 的 **请求类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `POST /svc-web/activity/discount/save`
 * @更新时间 `2022-12-10 15:59:37`
 */
export interface SvcWebActivityDiscountSavePostRequest {
  /**
   * 项目
   */
  projectId: number;
  /**
   * 活动名称
   */
  name: string;
  /**
   * 开始时间
   */
  startTime: string;
  /**
   * 结束时间
   */
  endTime: string;
  /**
   * 活动场景 购卡:purchase,充值:recharge,消费:consume
   */
  scene: string;
  /**
   * 电子卡列表
   */
  cardIds: number[];
  /**
   * 活动类型 满减:decrement ,满赠:gift ,满折:discount,消费打折：consume_discount
   */
  type: string;
  /**
   * 预算
   */
  budget: number;
  /**
   * 购卡优惠区间
   */
  rangeList: {
    /**
     * 区间开始值
     */
    start: number;
    /**
     * 区间结束值
     */
    end?: number;
    /**
     * 折扣(金额)
     */
    amount: number;
  }[];
  /**
   * 适用类型 1、全部店铺 2、指定店铺可用 3、指定店铺不可用
   */
  applyType: number;
  /**
   * 店铺列表
   */
  activityStoreList?: {
    /**
     * 店铺id
     */
    id: number;
    /**
     * 场地适用类型 1、全部场地 2、指定场地可用 3、指定场地不可用
     */
    venueApplyType: number;
    /**
     * 场地列表
     */
    venueIds?: number[];
  }[];
  /**
   * 描述
   */
  desc: string;
  /**
   * 广告图
   */
  adPictureResourceCodes?: string[];
}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1734/interface/api/69552) 的 **返回类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `POST /svc-web/activity/discount/save`
 * @更新时间 `2022-12-10 15:59:37`
 */
export interface SvcWebActivityDiscountSavePostResponse {}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1734/interface/api/69552) 的 **请求配置的类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `POST /svc-web/activity/discount/save`
 * @更新时间 `2022-12-10 15:59:37`
 */
type SvcWebActivityDiscountSavePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/activity/discount/save',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1734/interface/api/69552) 的 **请求配置**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `POST /svc-web/activity/discount/save`
 * @更新时间 `2022-12-10 15:59:37`
 */
const svcWebActivityDiscountSavePostRequestConfig: SvcWebActivityDiscountSavePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_9,
    devUrl: devUrl_0_4_0_9,
    prodUrl: prodUrl_0_4_0_9,
    path: '/svc-web/activity/discount/save',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_9,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebActivityDiscountSavePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1734/interface/api/69552) 的 **请求函数**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `POST /svc-web/activity/discount/save`
 * @更新时间 `2022-12-10 15:59:37`
 */
export const svcWebActivityDiscountSavePost = /*#__PURE__*/ (
  requestData: SvcWebActivityDiscountSavePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebActivityDiscountSavePostResponse>(
    prepare(svcWebActivityDiscountSavePostRequestConfig, requestData),
    ...args
  );
};

svcWebActivityDiscountSavePost.requestConfig =
  svcWebActivityDiscountSavePostRequestConfig;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1734/interface/api/69554) 的 **请求类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/info/{id}`
 * @更新时间 `2022-12-10 15:59:37`
 */
export interface SvcWebActivityDiscountInfoIdGetRequest {
  id: string;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1734/interface/api/69554) 的 **返回类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/info/{id}`
 * @更新时间 `2022-12-10 15:59:37`
 */
export interface SvcWebActivityDiscountInfoIdGetResponse {
  /**
   * 项目ID
   */
  projectId: number;
  /**
   * 活动名称
   */
  name: string;
  /**
   * 编码
   */
  code: string;
  /**
   * 开始时间
   */
  startTime: string;
  /**
   * 结束时间
   */
  endTime: string;
  /**
   * 活动场景 购卡:purchase,充值:recharge,消费:consume
   */
  scene: string;
  /**
   * 电子卡列表
   */
  cardIds: number[];
  /**
   * 活动类型 满减:decrement ,满赠:gift ,满折:discount
   */
  type: string;
  /**
   * 预算
   */
  budget: number;
  /**
   * 适用类型 1、全部店铺 2、指定店铺可用 3、指定店铺不可用
   */
  applyType: number;
  /**
   * 店铺列表
   */
  cardStoreList?: {
    /**
     * 店铺id
     */
    id: number;
    /**
     * 店铺名称
     */
    storeName: string;
    /**
     * 联系人
     */
    contacts: string;
    /**
     * 联系电话
     */
    contactsPhone: string;
    /**
     * 场地适用类型 1、全部场地 2、指定场地可用 3、指定场地不可用
     */
    spaceApplyType: number;
    /**
     * 场地ids
     */
    venueIds?: number[];
  }[];
  /**
   * 购卡优惠区间
   */
  rangeList: {
    /**
     * 区间开始值
     */
    start: number;
    /**
     * 区间结束值
     */
    end?: number;
    /**
     * 折扣(金额)
     */
    amount: number;
  }[];
  /**
   * 描述
   */
  desc: string;
  /**
   * 广告图
   */
  adPictureResourceCodes?: {
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
   * 状态: 1.未开始 2.进行中 3.已暂停 4.已完成'
   */
  status?: number;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1734/interface/api/69554) 的 **请求配置的类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/info/{id}`
 * @更新时间 `2022-12-10 15:59:37`
 */
type SvcWebActivityDiscountInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/activity/discount/info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1734/interface/api/69554) 的 **请求配置**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/info/{id}`
 * @更新时间 `2022-12-10 15:59:37`
 */
const svcWebActivityDiscountInfoIdGetRequestConfig: SvcWebActivityDiscountInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_9,
    devUrl: devUrl_0_4_0_9,
    prodUrl: prodUrl_0_4_0_9,
    path: '/svc-web/activity/discount/info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_9,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebActivityDiscountInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1734/interface/api/69554) 的 **请求函数**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/info/{id}`
 * @更新时间 `2022-12-10 15:59:37`
 */
export const svcWebActivityDiscountInfoIdGet = /*#__PURE__*/ (
  requestData: SvcWebActivityDiscountInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebActivityDiscountInfoIdGetResponse>(
    prepare(svcWebActivityDiscountInfoIdGetRequestConfig, requestData),
    ...args
  );
};

svcWebActivityDiscountInfoIdGet.requestConfig =
  svcWebActivityDiscountInfoIdGetRequestConfig;

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1734/interface/api/69556) 的 **请求类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `POST /svc-web/activity/discount/update`
 * @更新时间 `2022-12-10 15:59:38`
 */
export interface SvcWebActivityDiscountUpdatePostRequest {
  /**
   * ID
   */
  id: number;
  /**
   * 项目
   */
  projectId: number;
  /**
   * 活动名称
   */
  name: string;
  /**
   * 开始时间
   */
  startTime: string;
  /**
   * 结束时间
   */
  endTime: string;
  /**
   * 活动场景 购卡:purchase,充值:recharge,消费:consume
   */
  scene: string;
  /**
   * 电子卡列表
   */
  cardIds: number[];
  /**
   * 活动类型 满减:decrement ,满赠:gift ,满折:discount,消费打折：consume_discount
   */
  type: string;
  /**
   * 预算
   */
  budget: number;
  /**
   * 购卡优惠区间
   */
  rangeList: {
    /**
     * 区间开始值
     */
    start: number;
    /**
     * 区间结束值
     */
    end?: number;
    /**
     * 折扣(金额)
     */
    amount: number;
  }[];
  /**
   * 适用类型 1、全部店铺 2、指定店铺可用 3、指定店铺不可用
   */
  applyType?: number;
  /**
   * 店铺列表
   */
  activityStoreList?: {
    /**
     * 店铺id
     */
    id: number;
    /**
     * 场地适用类型 1、全部场地 2、指定场地可用 3、指定场地不可用
     */
    venueApplyType: number;
    /**
     * 场地列表
     */
    venueIds?: number[];
  }[];
  /**
   * 描述
   */
  desc: string;
  /**
   * 广告图
   */
  adPictureResourceCodes?: string[];
}

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1734/interface/api/69556) 的 **返回类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `POST /svc-web/activity/discount/update`
 * @更新时间 `2022-12-10 15:59:38`
 */
export interface SvcWebActivityDiscountUpdatePostResponse {}

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1734/interface/api/69556) 的 **请求配置的类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `POST /svc-web/activity/discount/update`
 * @更新时间 `2022-12-10 15:59:38`
 */
type SvcWebActivityDiscountUpdatePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/activity/discount/update',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1734/interface/api/69556) 的 **请求配置**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `POST /svc-web/activity/discount/update`
 * @更新时间 `2022-12-10 15:59:38`
 */
const svcWebActivityDiscountUpdatePostRequestConfig: SvcWebActivityDiscountUpdatePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_9,
    devUrl: devUrl_0_4_0_9,
    prodUrl: prodUrl_0_4_0_9,
    path: '/svc-web/activity/discount/update',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_9,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebActivityDiscountUpdatePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [编辑↗](https://yapi.huianrong.com/project/1734/interface/api/69556) 的 **请求函数**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `POST /svc-web/activity/discount/update`
 * @更新时间 `2022-12-10 15:59:38`
 */
export const svcWebActivityDiscountUpdatePost = /*#__PURE__*/ (
  requestData: SvcWebActivityDiscountUpdatePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebActivityDiscountUpdatePostResponse>(
    prepare(svcWebActivityDiscountUpdatePostRequestConfig, requestData),
    ...args
  );
};

svcWebActivityDiscountUpdatePost.requestConfig =
  svcWebActivityDiscountUpdatePostRequestConfig;

/**
 * 接口 [暂停↗](https://yapi.huianrong.com/project/1734/interface/api/69558) 的 **请求类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/suspend/{id}`
 * @更新时间 `2022-12-10 15:59:38`
 */
export interface SvcWebActivityDiscountSuspendIdGetRequest {
  id: string;
}

/**
 * 接口 [暂停↗](https://yapi.huianrong.com/project/1734/interface/api/69558) 的 **返回类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/suspend/{id}`
 * @更新时间 `2022-12-10 15:59:38`
 */
export interface SvcWebActivityDiscountSuspendIdGetResponse {}

/**
 * 接口 [暂停↗](https://yapi.huianrong.com/project/1734/interface/api/69558) 的 **请求配置的类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/suspend/{id}`
 * @更新时间 `2022-12-10 15:59:38`
 */
type SvcWebActivityDiscountSuspendIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/activity/discount/suspend/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [暂停↗](https://yapi.huianrong.com/project/1734/interface/api/69558) 的 **请求配置**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/suspend/{id}`
 * @更新时间 `2022-12-10 15:59:38`
 */
const svcWebActivityDiscountSuspendIdGetRequestConfig: SvcWebActivityDiscountSuspendIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_9,
    devUrl: devUrl_0_4_0_9,
    prodUrl: prodUrl_0_4_0_9,
    path: '/svc-web/activity/discount/suspend/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_9,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebActivityDiscountSuspendIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [暂停↗](https://yapi.huianrong.com/project/1734/interface/api/69558) 的 **请求函数**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/suspend/{id}`
 * @更新时间 `2022-12-10 15:59:38`
 */
export const svcWebActivityDiscountSuspendIdGet = /*#__PURE__*/ (
  requestData: SvcWebActivityDiscountSuspendIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebActivityDiscountSuspendIdGetResponse>(
    prepare(svcWebActivityDiscountSuspendIdGetRequestConfig, requestData),
    ...args
  );
};

svcWebActivityDiscountSuspendIdGet.requestConfig =
  svcWebActivityDiscountSuspendIdGetRequestConfig;

/**
 * 接口 [恢复↗](https://yapi.huianrong.com/project/1734/interface/api/69560) 的 **请求类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/resume/{id}`
 * @更新时间 `2022-12-10 15:59:38`
 */
export interface SvcWebActivityDiscountResumeIdGetRequest {
  id: string;
}

/**
 * 接口 [恢复↗](https://yapi.huianrong.com/project/1734/interface/api/69560) 的 **返回类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/resume/{id}`
 * @更新时间 `2022-12-10 15:59:38`
 */
export interface SvcWebActivityDiscountResumeIdGetResponse {}

/**
 * 接口 [恢复↗](https://yapi.huianrong.com/project/1734/interface/api/69560) 的 **请求配置的类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/resume/{id}`
 * @更新时间 `2022-12-10 15:59:38`
 */
type SvcWebActivityDiscountResumeIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/activity/discount/resume/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [恢复↗](https://yapi.huianrong.com/project/1734/interface/api/69560) 的 **请求配置**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/resume/{id}`
 * @更新时间 `2022-12-10 15:59:38`
 */
const svcWebActivityDiscountResumeIdGetRequestConfig: SvcWebActivityDiscountResumeIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_9,
    devUrl: devUrl_0_4_0_9,
    prodUrl: prodUrl_0_4_0_9,
    path: '/svc-web/activity/discount/resume/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_9,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebActivityDiscountResumeIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [恢复↗](https://yapi.huianrong.com/project/1734/interface/api/69560) 的 **请求函数**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/resume/{id}`
 * @更新时间 `2022-12-10 15:59:38`
 */
export const svcWebActivityDiscountResumeIdGet = /*#__PURE__*/ (
  requestData: SvcWebActivityDiscountResumeIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebActivityDiscountResumeIdGetResponse>(
    prepare(svcWebActivityDiscountResumeIdGetRequestConfig, requestData),
    ...args
  );
};

svcWebActivityDiscountResumeIdGet.requestConfig =
  svcWebActivityDiscountResumeIdGetRequestConfig;

/**
 * 接口 [venue↗](https://yapi.huianrong.com/project/1734/interface/api/69948) 的 **请求类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/venue`
 * @更新时间 `2022-12-10 15:59:39`
 */
export interface SvcWebActivityDiscountVenueGetRequest {
  /**
   * 活动id
   */
  activityId?: string;
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 名称/编码
   */
  key?: string;
  /**
   * 场馆分类ID
   */
  classifyId?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [venue↗](https://yapi.huianrong.com/project/1734/interface/api/69948) 的 **返回类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/venue`
 * @更新时间 `2022-12-10 15:59:39`
 */
export interface SvcWebActivityDiscountVenueGetResponse {
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
     * 名字
     */
    name?: string;
    /**
     * 编号
     */
    code?: string;
    /**
     * 分类名字
     */
    classifyName?: string;
  }[];
}

/**
 * 接口 [venue↗](https://yapi.huianrong.com/project/1734/interface/api/69948) 的 **请求配置的类型**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/venue`
 * @更新时间 `2022-12-10 15:59:39`
 */
type SvcWebActivityDiscountVenueGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/activity/discount/venue',
    'data',
    string,
    'activityId' | 'storeId' | 'key' | 'classifyId' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [venue↗](https://yapi.huianrong.com/project/1734/interface/api/69948) 的 **请求配置**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/venue`
 * @更新时间 `2022-12-10 15:59:39`
 */
const svcWebActivityDiscountVenueGetRequestConfig: SvcWebActivityDiscountVenueGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_9,
    devUrl: devUrl_0_4_0_9,
    prodUrl: prodUrl_0_4_0_9,
    path: '/svc-web/activity/discount/venue',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_9,
    paramNames: [],
    queryNames: [
      'activityId',
      'storeId',
      'key',
      'classifyId',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebActivityDiscountVenueGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [venue↗](https://yapi.huianrong.com/project/1734/interface/api/69948) 的 **请求函数**
 *
 * @分类 [优惠活动↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22385)
 * @请求头 `GET /svc-web/activity/discount/venue`
 * @更新时间 `2022-12-10 15:59:39`
 */
export const svcWebActivityDiscountVenueGet = /*#__PURE__*/ (
  requestData: SvcWebActivityDiscountVenueGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebActivityDiscountVenueGetResponse>(
    prepare(svcWebActivityDiscountVenueGetRequestConfig, requestData),
    ...args
  );
};

svcWebActivityDiscountVenueGet.requestConfig =
  svcWebActivityDiscountVenueGetRequestConfig;

const mockUrl_0_4_0_10 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_10 = '' as any;
const prodUrl_0_4_0_10 = '' as any;
const dataKey_0_4_0_10 = 'data' as any;

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69510) 的 **请求类型**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `POST /svc-web/activity/stat/page`
 * @更新时间 `2022-12-10 15:59:45`
 */
export interface SvcWebActivityStatPagePostRequest {
  /**
   * 项目
   */
  projectId?: number;
  /**
   * 活动id
   */
  activityId?: number;
  /**
   * 活动场景 购卡:purchase,充值:recharge,消费:consume
   */
  scene?: string;
  /**
   * 活动类型 满减:decrement ,满赠:gift ,满折:discount,消费打折：consume_discount
   */
  type?: string;
  /**
   * 开始时间
   */
  startDate?: string;
  /**
   * 结束时间
   */
  endDate?: string;
  /**
   * 状态: 1.未开始 2.进行中 3.已暂停 4.已完成
   */
  status?: number;
  pageNum: number;
  pageSize: number;
}

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69510) 的 **返回类型**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `POST /svc-web/activity/stat/page`
 * @更新时间 `2022-12-10 15:59:45`
 */
export interface SvcWebActivityStatPagePostResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    id?: number;
    /**
     * 项目
     */
    projectName?: string;
    /**
     * 活动编码
     */
    code?: string;
    /**
     * 活动名称
     */
    name?: string;
    /**
     * 活动场景 购卡:purchase,充值:recharge,消费:consume
     */
    scene?: string;
    /**
     * 活动类型 满减:decrement ,满赠:gift ,满折:discount
     */
    type?: string;
    /**
     * 开始时间
     */
    startTime?: string;
    /**
     * 结束时间
     */
    endTime?: string;
    /**
     * 状态: 1.未开始 2.进行中 3.已暂停 4.已完成
     */
    status: number;
    /**
     * 活动预算
     */
    budget: number;
    /**
     * 已用预算
     */
    usedBudget: number;
    /**
     * 剩余预算
     */
    balance: number;
    /**
     * 活动参与次数
     */
    number: number;
  }[];
}

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69510) 的 **请求配置的类型**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `POST /svc-web/activity/stat/page`
 * @更新时间 `2022-12-10 15:59:45`
 */
type SvcWebActivityStatPagePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/activity/stat/page',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69510) 的 **请求配置**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `POST /svc-web/activity/stat/page`
 * @更新时间 `2022-12-10 15:59:45`
 */
const svcWebActivityStatPagePostRequestConfig: SvcWebActivityStatPagePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_10,
    devUrl: devUrl_0_4_0_10,
    prodUrl: prodUrl_0_4_0_10,
    path: '/svc-web/activity/stat/page',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_10,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebActivityStatPagePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69510) 的 **请求函数**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `POST /svc-web/activity/stat/page`
 * @更新时间 `2022-12-10 15:59:45`
 */
export const svcWebActivityStatPagePost = /*#__PURE__*/ (
  requestData: SvcWebActivityStatPagePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebActivityStatPagePostResponse>(
    prepare(svcWebActivityStatPagePostRequestConfig, requestData),
    ...args
  );
};

svcWebActivityStatPagePost.requestConfig =
  svcWebActivityStatPagePostRequestConfig;

/**
 * 接口 [查看↗](https://yapi.huianrong.com/project/1734/interface/api/69512) 的 **请求类型**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/info/{id}`
 * @更新时间 `2022-12-10 15:59:45`
 */
export interface SvcWebActivityStatInfoIdGetRequest {
  id: string;
}

/**
 * 接口 [查看↗](https://yapi.huianrong.com/project/1734/interface/api/69512) 的 **返回类型**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/info/{id}`
 * @更新时间 `2022-12-10 15:59:45`
 */
export interface SvcWebActivityStatInfoIdGetResponse {
  /**
   * 项目
   */
  projectName: string;
  /**
   * 活动名称
   */
  name: string;
  /**
   * 编码
   */
  code: string;
  /**
   * 开始时间
   */
  startTime: string;
  /**
   * 结束时间
   */
  endTime: string;
  /**
   * 活动场景 购卡:purchase,充值:recharge,消费:consume
   */
  scene: string;
  /**
   * 电子卡列表
   */
  cardIds: number[];
  /**
   * 活动类型 满减:decrement ,满赠:gift ,满折:discount
   */
  type: string;
  /**
   * 预算
   */
  budget: number;
  /**
   * 剩余预算
   */
  balanceBudget: number;
  /**
   * 购卡优惠区间
   */
  rangeList: {
    /**
     * 区间开始值
     */
    start: number;
    /**
     * 区间结束值
     */
    end?: number;
    /**
     * 折扣(金额)
     */
    amount: number;
  }[];
}

/**
 * 接口 [查看↗](https://yapi.huianrong.com/project/1734/interface/api/69512) 的 **请求配置的类型**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/info/{id}`
 * @更新时间 `2022-12-10 15:59:45`
 */
type SvcWebActivityStatInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/activity/stat/info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [查看↗](https://yapi.huianrong.com/project/1734/interface/api/69512) 的 **请求配置**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/info/{id}`
 * @更新时间 `2022-12-10 15:59:45`
 */
const svcWebActivityStatInfoIdGetRequestConfig: SvcWebActivityStatInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_10,
    devUrl: devUrl_0_4_0_10,
    prodUrl: prodUrl_0_4_0_10,
    path: '/svc-web/activity/stat/info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_10,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebActivityStatInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [查看↗](https://yapi.huianrong.com/project/1734/interface/api/69512) 的 **请求函数**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/info/{id}`
 * @更新时间 `2022-12-10 15:59:45`
 */
export const svcWebActivityStatInfoIdGet = /*#__PURE__*/ (
  requestData: SvcWebActivityStatInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebActivityStatInfoIdGetResponse>(
    prepare(svcWebActivityStatInfoIdGetRequestConfig, requestData),
    ...args
  );
};

svcWebActivityStatInfoIdGet.requestConfig =
  svcWebActivityStatInfoIdGetRequestConfig;

/**
 * 接口 [充值记录分页↗](https://yapi.huianrong.com/project/1734/interface/api/69514) 的 **请求类型**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/recharge/page`
 * @更新时间 `2022-12-11 22:47:52`
 */
export interface SvcWebActivityStatRechargePageGetRequest {
  /**
   * ID
   */
  id?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [充值记录分页↗](https://yapi.huianrong.com/project/1734/interface/api/69514) 的 **返回类型**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/recharge/page`
 * @更新时间 `2022-12-11 22:47:52`
 */
export interface SvcWebActivityStatRechargePageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 充值时间
     */
    createTime: string;
    /**
     * 单号
     */
    orderNo: string;
    /**
     * 卡名
     */
    cardName: string;
    /**
     * 卡号
     */
    cardCode: string;
    /**
     * 会员名字
     */
    memberName: string;
    /**
     * 持卡人电话
     */
    phone: string;
    /**
     * 收银员
     */
    createBy: string;
    /**
     * 充值金额
     */
    rechargeAmount: number;
    /**
     * 优惠金额
     */
    discountAmount: number;
    /**
     * 余额
     */
    balance: number;
  }[];
}

/**
 * 接口 [充值记录分页↗](https://yapi.huianrong.com/project/1734/interface/api/69514) 的 **请求配置的类型**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/recharge/page`
 * @更新时间 `2022-12-11 22:47:52`
 */
type SvcWebActivityStatRechargePageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/activity/stat/recharge/page',
    'data',
    string,
    'id' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [充值记录分页↗](https://yapi.huianrong.com/project/1734/interface/api/69514) 的 **请求配置**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/recharge/page`
 * @更新时间 `2022-12-11 22:47:52`
 */
const svcWebActivityStatRechargePageGetRequestConfig: SvcWebActivityStatRechargePageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_10,
    devUrl: devUrl_0_4_0_10,
    prodUrl: prodUrl_0_4_0_10,
    path: '/svc-web/activity/stat/recharge/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_10,
    paramNames: [],
    queryNames: ['id', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebActivityStatRechargePageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [充值记录分页↗](https://yapi.huianrong.com/project/1734/interface/api/69514) 的 **请求函数**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/recharge/page`
 * @更新时间 `2022-12-11 22:47:52`
 */
export const svcWebActivityStatRechargePageGet = /*#__PURE__*/ (
  requestData: SvcWebActivityStatRechargePageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebActivityStatRechargePageGetResponse>(
    prepare(svcWebActivityStatRechargePageGetRequestConfig, requestData),
    ...args
  );
};

svcWebActivityStatRechargePageGet.requestConfig =
  svcWebActivityStatRechargePageGetRequestConfig;

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69894) 的 **请求类型**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/page`
 * @更新时间 `2022-12-08 18:20:33`
 */
export interface SvcWebActivityStatPageGetRequest {
  /**
   * 项目
   */
  projectId?: string;
  /**
   * 活动id
   */
  activityId?: string;
  /**
   * 活动场景 购卡:purchase,充值:recharge,消费:consume
   */
  scene?: string;
  /**
   * 活动类型 满减:decrement ,满赠:gift ,满折:discount
   */
  type?: string;
  /**
   * 开始时间
   */
  startDate?: string;
  /**
   * 结束时间
   */
  endDate?: string;
  /**
   * 状态: 1.未开始 2.进行中 3.已暂停 4.已完成
   */
  status?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69894) 的 **返回类型**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/page`
 * @更新时间 `2022-12-08 18:20:33`
 */
export interface SvcWebActivityStatPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    id?: number;
    /**
     * 项目
     */
    projectName?: string;
    /**
     * 活动编码
     */
    code?: string;
    /**
     * 活动名称
     */
    name?: string;
    /**
     * 活动场景 购卡:purchase,充值:recharge,消费:consume
     */
    scene?: string;
    /**
     * 活动类型 满减:decrement ,满赠:gift ,满折:discount
     */
    type?: string;
    /**
     * 开始时间
     */
    startTime?: string;
    /**
     * 结束时间
     */
    endTime?: string;
    /**
     * 状态: 1.未开始 2.进行中 3.已暂停 4.已完成
     */
    status: number;
    /**
     * 活动预算
     */
    budget: number;
    /**
     * 已用预算
     */
    usedBudget: number;
    /**
     * 剩余预算
     */
    balance: number;
    /**
     * 活动参与次数
     */
    number: number;
  }[];
}

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69894) 的 **请求配置的类型**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/page`
 * @更新时间 `2022-12-08 18:20:33`
 */
type SvcWebActivityStatPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/activity/stat/page',
    'data',
    string,
    | 'projectId'
    | 'activityId'
    | 'scene'
    | 'type'
    | 'startDate'
    | 'endDate'
    | 'status'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69894) 的 **请求配置**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/page`
 * @更新时间 `2022-12-08 18:20:33`
 */
const svcWebActivityStatPageGetRequestConfig: SvcWebActivityStatPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_10,
    devUrl: devUrl_0_4_0_10,
    prodUrl: prodUrl_0_4_0_10,
    path: '/svc-web/activity/stat/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_10,
    paramNames: [],
    queryNames: [
      'projectId',
      'activityId',
      'scene',
      'type',
      'startDate',
      'endDate',
      'status',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebActivityStatPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页↗](https://yapi.huianrong.com/project/1734/interface/api/69894) 的 **请求函数**
 *
 * @分类 [活动报表↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22397)
 * @请求头 `GET /svc-web/activity/stat/page`
 * @更新时间 `2022-12-08 18:20:33`
 */
export const svcWebActivityStatPageGet = /*#__PURE__*/ (
  requestData: SvcWebActivityStatPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebActivityStatPageGetResponse>(
    prepare(svcWebActivityStatPageGetRequestConfig, requestData),
    ...args
  );
};

svcWebActivityStatPageGet.requestConfig =
  svcWebActivityStatPageGetRequestConfig;

const mockUrl_0_4_0_11 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_11 = '' as any;
const prodUrl_0_4_0_11 = '' as any;
const dataKey_0_4_0_11 = 'data' as any;

/**
 * 接口 [充值列表↗](https://yapi.huianrong.com/project/1734/interface/api/69532) 的 **请求类型**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/list`
 * @更新时间 `2022-12-07 17:06:19`
 */
export interface SvcWebMemberCardRechargeListGetRequest {
  /**
   * 单号
   */
  orderNo?: string;
  /**
   * 卡id
   */
  cardId?: string;
  /**
   * 卡号
   */
  memberCardCode?: string;
  /**
   * 充值人
   */
  createBy?: string;
  /**
   * 操作时间开始yyyy-MM-dd
   */
  startDate?: string;
  /**
   * 操作时间结束yyyy-MM-dd
   */
  endDate?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [充值列表↗](https://yapi.huianrong.com/project/1734/interface/api/69532) 的 **返回类型**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/list`
 * @更新时间 `2022-12-07 17:06:19`
 */
export interface SvcWebMemberCardRechargeListGetResponse {
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
    id: number;
    /**
     * 来源1、线上2、线下
     */
    source: number;
    /**
     * 充值状态1、充值中2、充值成功3、充值失败4、交易关闭
     */
    status: number;
    /**
     * 项目名称
     */
    projectName: string;
    /**
     * 单号
     */
    orderNo: string;
    /**
     * 卡名
     */
    cardName: string;
    /**
     * 卡号
     */
    memberCardCode: string;
    /**
     * 持卡人编号
     */
    memberCode: string;
    /**
     * 持卡人姓名
     */
    memberName: string;
    /**
     * 持卡人电话
     */
    memberPhone: string;
    /**
     * 充值金额
     */
    rechargeAmount: number;
    /**
     * 实付金额
     */
    actuallyAmount: number;
    /**
     * 优惠金额
     */
    discountAmount: number;
    /**
     * 到账金额
     */
    receivedAmount: number;
    /**
     * 充值人
     */
    createBy: string;
    /**
     * 操作时间yyyy-MM-ddHH:mm:ss
     */
    createTime: string;
  }[];
}

/**
 * 接口 [充值列表↗](https://yapi.huianrong.com/project/1734/interface/api/69532) 的 **请求配置的类型**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/list`
 * @更新时间 `2022-12-07 17:06:19`
 */
type SvcWebMemberCardRechargeListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/member/card/recharge/list',
    'data',
    string,
    | 'orderNo'
    | 'cardId'
    | 'memberCardCode'
    | 'createBy'
    | 'startDate'
    | 'endDate'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [充值列表↗](https://yapi.huianrong.com/project/1734/interface/api/69532) 的 **请求配置**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/list`
 * @更新时间 `2022-12-07 17:06:19`
 */
const svcWebMemberCardRechargeListGetRequestConfig: SvcWebMemberCardRechargeListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_11,
    devUrl: devUrl_0_4_0_11,
    prodUrl: prodUrl_0_4_0_11,
    path: '/svc-web/member/card/recharge/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_11,
    paramNames: [],
    queryNames: [
      'orderNo',
      'cardId',
      'memberCardCode',
      'createBy',
      'startDate',
      'endDate',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebMemberCardRechargeListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [充值列表↗](https://yapi.huianrong.com/project/1734/interface/api/69532) 的 **请求函数**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/list`
 * @更新时间 `2022-12-07 17:06:19`
 */
export const svcWebMemberCardRechargeListGet = /*#__PURE__*/ (
  requestData: SvcWebMemberCardRechargeListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebMemberCardRechargeListGetResponse>(
    prepare(svcWebMemberCardRechargeListGetRequestConfig, requestData),
    ...args
  );
};

svcWebMemberCardRechargeListGet.requestConfig =
  svcWebMemberCardRechargeListGetRequestConfig;

/**
 * 接口 [充值详情↗](https://yapi.huianrong.com/project/1734/interface/api/69534) 的 **请求类型**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/detail/{id}`
 * @更新时间 `2022-12-10 16:32:45`
 */
export interface SvcWebMemberCardRechargeDetailIdGetRequest {
  /**
   * 储值卡(Long)
   */
  id: string;
}

/**
 * 接口 [充值详情↗](https://yapi.huianrong.com/project/1734/interface/api/69534) 的 **返回类型**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/detail/{id}`
 * @更新时间 `2022-12-10 16:32:45`
 */
export interface SvcWebMemberCardRechargeDetailIdGetResponse {
  /**
   * 数据id
   */
  id: number;
  /**
   * 单号
   */
  orderNo: string;
  /**
   * 项目名称
   */
  projectName: string;
  /**
   * 来源1、线上2、线下
   */
  source: number;
  /**
   * 充值状态1、充值中2、充值成功3、充值失败4、交易关闭
   */
  status: number;
  /**
   * 卡号
   */
  carCode: string;
  /**
   * 卡名
   */
  cardName: string;
  /**
   * 卡号
   */
  memberCardCode: string;
  /**
   * 持卡人编号
   */
  memberCode: string;
  /**
   * 持卡人姓名
   */
  memberName: string;
  /**
   * 持卡人电话
   */
  memberPhone: string;
  /**
   * 充值金额
   */
  rechargeAmount: number;
  /**
   * 实付金额
   */
  actuallyAmount: number;
  /**
   * 优惠金额
   */
  discountAmount: number;
  /**
   * 到账金额
   */
  receivedAmount: number;
  /**
   * 卡內余额
   */
  balance: number;
  /**
   * 充值人
   */
  createBy: string;
  /**
   * 充值时间yyyy-MM-ddHH:mm:ss
   */
  createTime: string;
  /**
   * 活动名称
   */
  activityName?: string;
  /**
   * 支付方式列表 ,MemberCardRechargeMode
   */
  modeList?: {
    /**
     * 支付方式1、现金2、支付宝3、微信
     */
    payment: number;
    /**
     * 充值金额
     */
    amount: number;
  }[];
}

/**
 * 接口 [充值详情↗](https://yapi.huianrong.com/project/1734/interface/api/69534) 的 **请求配置的类型**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/detail/{id}`
 * @更新时间 `2022-12-10 16:32:45`
 */
type SvcWebMemberCardRechargeDetailIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/member/card/recharge/detail/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [充值详情↗](https://yapi.huianrong.com/project/1734/interface/api/69534) 的 **请求配置**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/detail/{id}`
 * @更新时间 `2022-12-10 16:32:45`
 */
const svcWebMemberCardRechargeDetailIdGetRequestConfig: SvcWebMemberCardRechargeDetailIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_11,
    devUrl: devUrl_0_4_0_11,
    prodUrl: prodUrl_0_4_0_11,
    path: '/svc-web/member/card/recharge/detail/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_11,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebMemberCardRechargeDetailIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [充值详情↗](https://yapi.huianrong.com/project/1734/interface/api/69534) 的 **请求函数**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/detail/{id}`
 * @更新时间 `2022-12-10 16:32:45`
 */
export const svcWebMemberCardRechargeDetailIdGet = /*#__PURE__*/ (
  requestData: SvcWebMemberCardRechargeDetailIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebMemberCardRechargeDetailIdGetResponse>(
    prepare(svcWebMemberCardRechargeDetailIdGetRequestConfig, requestData),
    ...args
  );
};

svcWebMemberCardRechargeDetailIdGet.requestConfig =
  svcWebMemberCardRechargeDetailIdGetRequestConfig;

/**
 * 接口 [活动优惠区间↗](https://yapi.huianrong.com/project/1734/interface/api/69626) 的 **请求类型**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/activity/sectionList`
 * @更新时间 `2022-12-03 12:05:52`
 */
export interface SvcWebMemberCardRechargeActivitySectionListGetRequest {
  /**
   * 活动id
   */
  id?: string;
}

/**
 * 接口 [活动优惠区间↗](https://yapi.huianrong.com/project/1734/interface/api/69626) 的 **返回类型**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/activity/sectionList`
 * @更新时间 `2022-12-03 12:05:52`
 */
export type SvcWebMemberCardRechargeActivitySectionListGetResponse = {
  /**
   * 活动区间id
   */
  id: number;
  /**
   * 类型:decrement满减；gift满赠；discount满折
   */
  type: string;
  /**
   * 开始金额
   */
  startAmount: number;
  /**
   * 结束金额
   */
  endAmount: number;
  /**
   * 优惠金额或折扣
   */
  amount: number;
}[];

/**
 * 接口 [活动优惠区间↗](https://yapi.huianrong.com/project/1734/interface/api/69626) 的 **请求配置的类型**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/activity/sectionList`
 * @更新时间 `2022-12-03 12:05:52`
 */
type SvcWebMemberCardRechargeActivitySectionListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/member/card/recharge/activity/sectionList',
    'data',
    string,
    'id',
    false
  >
>;

/**
 * 接口 [活动优惠区间↗](https://yapi.huianrong.com/project/1734/interface/api/69626) 的 **请求配置**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/activity/sectionList`
 * @更新时间 `2022-12-03 12:05:52`
 */
const svcWebMemberCardRechargeActivitySectionListGetRequestConfig: SvcWebMemberCardRechargeActivitySectionListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_11,
    devUrl: devUrl_0_4_0_11,
    prodUrl: prodUrl_0_4_0_11,
    path: '/svc-web/member/card/recharge/activity/sectionList',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_11,
    paramNames: [],
    queryNames: ['id'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebMemberCardRechargeActivitySectionListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [活动优惠区间↗](https://yapi.huianrong.com/project/1734/interface/api/69626) 的 **请求函数**
 *
 * @分类 [储值卡充值↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22417)
 * @请求头 `GET /svc-web/member/card/recharge/activity/sectionList`
 * @更新时间 `2022-12-03 12:05:52`
 */
export const svcWebMemberCardRechargeActivitySectionListGet = /*#__PURE__*/ (
  requestData: SvcWebMemberCardRechargeActivitySectionListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebMemberCardRechargeActivitySectionListGetResponse>(
    prepare(
      svcWebMemberCardRechargeActivitySectionListGetRequestConfig,
      requestData
    ),
    ...args
  );
};

svcWebMemberCardRechargeActivitySectionListGet.requestConfig =
  svcWebMemberCardRechargeActivitySectionListGetRequestConfig;

const mockUrl_0_4_0_12 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_12 = '' as any;
const prodUrl_0_4_0_12 = '' as any;
const dataKey_0_4_0_12 = 'data' as any;

/**
 * 接口 [退卡列表↗](https://yapi.huianrong.com/project/1734/interface/api/69540) 的 **请求类型**
 *
 * @分类 [储值卡退卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22421)
 * @请求头 `GET /svc-web/member/card/cancel/list`
 * @更新时间 `2022-12-07 17:02:41`
 */
export interface SvcWebMemberCardCancelListGetRequest {
  /**
   * 单号
   */
  orderNo?: string;
  /**
   * 卡号
   */
  memberCardCode?: string;
  /**
   * 卡id
   */
  cardId?: string;
  /**
   * 退卡人
   */
  createBy?: string;
  /**
   * 退卡时间开始yyyy-MM-dd
   */
  startDate?: string;
  /**
   * 退卡时间结束yyyy-MM-dd
   */
  endDate?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [退卡列表↗](https://yapi.huianrong.com/project/1734/interface/api/69540) 的 **返回类型**
 *
 * @分类 [储值卡退卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22421)
 * @请求头 `GET /svc-web/member/card/cancel/list`
 * @更新时间 `2022-12-07 17:02:41`
 */
export interface SvcWebMemberCardCancelListGetResponse {
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
    id: number;
    /**
     * 项目名称
     */
    projectName: string;
    /**
     * 单号
     */
    orderNo: string;
    /**
     * 卡号
     */
    memberCardCode: string;
    /**
     * 卡名
     */
    cardName: string;
    /**
     * 持卡人编号
     */
    memberCode: string;
    /**
     * 持卡人姓名
     */
    memberName: string;
    /**
     * 持卡人电话
     */
    memberPhone: string;
    /**
     * 卡内余额
     */
    balance: number;
    /**
     * 可退金额
     */
    refundableAmount: number;
    /**
     * 实退金额
     */
    actuallyAmount: number;
    /**
     * 退卡人
     */
    createBy: string;
    /**
     * 退卡时间yyyy-MM-ddHH:mm:ss
     */
    createTime: string;
  }[];
}

/**
 * 接口 [退卡列表↗](https://yapi.huianrong.com/project/1734/interface/api/69540) 的 **请求配置的类型**
 *
 * @分类 [储值卡退卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22421)
 * @请求头 `GET /svc-web/member/card/cancel/list`
 * @更新时间 `2022-12-07 17:02:41`
 */
type SvcWebMemberCardCancelListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/member/card/cancel/list',
    'data',
    string,
    | 'orderNo'
    | 'memberCardCode'
    | 'cardId'
    | 'createBy'
    | 'startDate'
    | 'endDate'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [退卡列表↗](https://yapi.huianrong.com/project/1734/interface/api/69540) 的 **请求配置**
 *
 * @分类 [储值卡退卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22421)
 * @请求头 `GET /svc-web/member/card/cancel/list`
 * @更新时间 `2022-12-07 17:02:41`
 */
const svcWebMemberCardCancelListGetRequestConfig: SvcWebMemberCardCancelListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_12,
    devUrl: devUrl_0_4_0_12,
    prodUrl: prodUrl_0_4_0_12,
    path: '/svc-web/member/card/cancel/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_12,
    paramNames: [],
    queryNames: [
      'orderNo',
      'memberCardCode',
      'cardId',
      'createBy',
      'startDate',
      'endDate',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebMemberCardCancelListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [退卡列表↗](https://yapi.huianrong.com/project/1734/interface/api/69540) 的 **请求函数**
 *
 * @分类 [储值卡退卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22421)
 * @请求头 `GET /svc-web/member/card/cancel/list`
 * @更新时间 `2022-12-07 17:02:41`
 */
export const svcWebMemberCardCancelListGet = /*#__PURE__*/ (
  requestData: SvcWebMemberCardCancelListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebMemberCardCancelListGetResponse>(
    prepare(svcWebMemberCardCancelListGetRequestConfig, requestData),
    ...args
  );
};

svcWebMemberCardCancelListGet.requestConfig =
  svcWebMemberCardCancelListGetRequestConfig;

/**
 * 接口 [退卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69542) 的 **请求类型**
 *
 * @分类 [储值卡退卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22421)
 * @请求头 `GET /svc-web/member/card/cancel/detail/{id}`
 * @更新时间 `2022-12-10 16:34:10`
 */
export interface SvcWebMemberCardCancelDetailIdGetRequest {
  /**
   * 储值卡(Long)
   */
  id: string;
}

/**
 * 接口 [退卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69542) 的 **返回类型**
 *
 * @分类 [储值卡退卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22421)
 * @请求头 `GET /svc-web/member/card/cancel/detail/{id}`
 * @更新时间 `2022-12-10 16:34:10`
 */
export interface SvcWebMemberCardCancelDetailIdGetResponse {
  /**
   * 数据id
   */
  id: number;
  /**
   * 单号
   */
  orderNo: string;
  /**
   * 项目名称
   */
  projectName: string;
  /**
   * 卡号
   */
  carCode: string;
  /**
   * 卡名
   */
  cardName: string;
  /**
   * 卡号
   */
  memberCardCode: string;
  /**
   * 持卡人编号
   */
  memberCode: string;
  /**
   * 持卡人姓名
   */
  memberName: string;
  /**
   * 持卡人电话
   */
  memberPhone: string;
  /**
   * 卡内余额
   */
  balance: number;
  /**
   * 可退金额
   */
  refundableAmount: number;
  /**
   * 实退金额
   */
  actuallyAmount: number;
  /**
   * 当前状态1、使用中2、已冻结3、已退卡
   */
  currentStatus: number;
  /**
   * 更改前状态1、使用中2、已冻结3、已退卡
   */
  beforeStatus: number;
  /**
   * 退卡人
   */
  createBy: string;
  /**
   * 退卡时间yyyy-MM-ddHH:mm:ss
   */
  createTime: string;
  /**
   * 退款方式列表 ,MemberCardCancelMode
   */
  modeList?: {
    /**
     * 退款方式1、现金2、支付宝3、微信
     */
    payment: number;
    /**
     * 退款金额
     */
    amount: number;
  }[];
}

/**
 * 接口 [退卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69542) 的 **请求配置的类型**
 *
 * @分类 [储值卡退卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22421)
 * @请求头 `GET /svc-web/member/card/cancel/detail/{id}`
 * @更新时间 `2022-12-10 16:34:10`
 */
type SvcWebMemberCardCancelDetailIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/member/card/cancel/detail/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [退卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69542) 的 **请求配置**
 *
 * @分类 [储值卡退卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22421)
 * @请求头 `GET /svc-web/member/card/cancel/detail/{id}`
 * @更新时间 `2022-12-10 16:34:10`
 */
const svcWebMemberCardCancelDetailIdGetRequestConfig: SvcWebMemberCardCancelDetailIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_12,
    devUrl: devUrl_0_4_0_12,
    prodUrl: prodUrl_0_4_0_12,
    path: '/svc-web/member/card/cancel/detail/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_12,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebMemberCardCancelDetailIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [退卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69542) 的 **请求函数**
 *
 * @分类 [储值卡退卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22421)
 * @请求头 `GET /svc-web/member/card/cancel/detail/{id}`
 * @更新时间 `2022-12-10 16:34:10`
 */
export const svcWebMemberCardCancelDetailIdGet = /*#__PURE__*/ (
  requestData: SvcWebMemberCardCancelDetailIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebMemberCardCancelDetailIdGetResponse>(
    prepare(svcWebMemberCardCancelDetailIdGetRequestConfig, requestData),
    ...args
  );
};

svcWebMemberCardCancelDetailIdGet.requestConfig =
  svcWebMemberCardCancelDetailIdGetRequestConfig;

const mockUrl_0_4_0_13 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_13 = '' as any;
const prodUrl_0_4_0_13 = '' as any;
const dataKey_0_4_0_13 = 'data' as any;

/**
 * 接口 [消费明细列表↗](https://yapi.huianrong.com/project/1734/interface/api/69562) 的 **请求类型**
 *
 * @分类 [储值卡消费明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22427)
 * @请求头 `GET /svc-web/member/card/consumer/list`
 * @更新时间 `2022-12-12 14:01:16`
 */
export interface SvcWebMemberCardConsumerListGetRequest {
  /**
   * 1、购卡2、充值3、消费4、退款5、退卡
   */
  type?: string;
  /**
   * 单号
   */
  orderNo?: string;
  /**
   * 卡id
   */
  cardId?: string;
  /**
   * 卡号
   */
  memberCardCode?: string;
  /**
   * 店铺信息（店铺编号店铺名称）
   */
  storeKey?: string;
  /**
   * 开始时间yyyy-MM-dd
   */
  startDate?: string;
  /**
   * 结束时间yyyy-MM-dd
   */
  endDate?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [消费明细列表↗](https://yapi.huianrong.com/project/1734/interface/api/69562) 的 **返回类型**
 *
 * @分类 [储值卡消费明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22427)
 * @请求头 `GET /svc-web/member/card/consumer/list`
 * @更新时间 `2022-12-12 14:01:16`
 */
export interface SvcWebMemberCardConsumerListGetResponse {
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
    id: number;
    /**
     * 1、购卡2、充值3、消费4、退款5、退卡
     */
    type: number;
    /**
     * 项目名称
     */
    projectName: string;
    /**
     * 流水号
     */
    serialNo: string;
    /**
     * 卡名
     */
    cardName: string;
    /**
     * 卡号
     */
    memberCardCode: string;
    /**
     * 店铺编号
     */
    storeCode?: string;
    /**
     * 店铺名称
     */
    storeName?: string;
    /**
     * 发生金额
     */
    changeBalance: number;
    /**
     * 卡内余额
     */
    balance: number;
    /**
     * 操作人收银员
     */
    createBy: string;
    /**
     * 操作时间yyyy-MM-ddHH:mm:ss
     */
    createTime: string;
  }[];
}

/**
 * 接口 [消费明细列表↗](https://yapi.huianrong.com/project/1734/interface/api/69562) 的 **请求配置的类型**
 *
 * @分类 [储值卡消费明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22427)
 * @请求头 `GET /svc-web/member/card/consumer/list`
 * @更新时间 `2022-12-12 14:01:16`
 */
type SvcWebMemberCardConsumerListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/member/card/consumer/list',
    'data',
    string,
    | 'type'
    | 'orderNo'
    | 'cardId'
    | 'memberCardCode'
    | 'storeKey'
    | 'startDate'
    | 'endDate'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [消费明细列表↗](https://yapi.huianrong.com/project/1734/interface/api/69562) 的 **请求配置**
 *
 * @分类 [储值卡消费明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22427)
 * @请求头 `GET /svc-web/member/card/consumer/list`
 * @更新时间 `2022-12-12 14:01:16`
 */
const svcWebMemberCardConsumerListGetRequestConfig: SvcWebMemberCardConsumerListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_13,
    devUrl: devUrl_0_4_0_13,
    prodUrl: prodUrl_0_4_0_13,
    path: '/svc-web/member/card/consumer/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_13,
    paramNames: [],
    queryNames: [
      'type',
      'orderNo',
      'cardId',
      'memberCardCode',
      'storeKey',
      'startDate',
      'endDate',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebMemberCardConsumerListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [消费明细列表↗](https://yapi.huianrong.com/project/1734/interface/api/69562) 的 **请求函数**
 *
 * @分类 [储值卡消费明细↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22427)
 * @请求头 `GET /svc-web/member/card/consumer/list`
 * @更新时间 `2022-12-12 14:01:16`
 */
export const svcWebMemberCardConsumerListGet = /*#__PURE__*/ (
  requestData: SvcWebMemberCardConsumerListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebMemberCardConsumerListGetResponse>(
    prepare(svcWebMemberCardConsumerListGetRequestConfig, requestData),
    ...args
  );
};

svcWebMemberCardConsumerListGet.requestConfig =
  svcWebMemberCardConsumerListGetRequestConfig;

const mockUrl_0_4_0_14 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_14 = '' as any;
const prodUrl_0_4_0_14 = '' as any;
const dataKey_0_4_0_14 = 'data' as any;

/**
 * 接口 [用户储值卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69574) 的 **请求类型**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `GET /svc-web/member/card/info`
 * @更新时间 `2022-12-11 21:06:45`
 */
export interface SvcWebMemberCardInfoGetRequest {
  /**
   * 用户储值卡id
   */
  memberCardId?: string;
  /**
   * 卡号电话姓名
   */
  searchKey?: string;
  /**
   * 状态1、使用中2、已冻结3、已退卡多个使用,间隔
   */
  status?: string;
}

/**
 * 接口 [用户储值卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69574) 的 **返回类型**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `GET /svc-web/member/card/info`
 * @更新时间 `2022-12-11 21:06:45`
 */
export type SvcWebMemberCardInfoGetResponse = {
  /**
   * 用户储值卡id
   */
  memberCardId: number;
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 储值卡卡号
   */
  cardNo: string;
  /**
   * 储值卡卡名
   */
  cardName: string;
  /**
   * 用户卡号
   */
  memberCardCode: string;
  /**
   * 项目名称
   */
  projectName: string;
  /**
   * 持卡人编号
   */
  memberCode: string;
  /**
   * 持卡人姓名
   */
  memberName: string;
  /**
   * 持卡人电话
   */
  memberPhone: string;
  /**
   * 卡內余额
   */
  balance: number;
  /**
   * 可退余额
   */
  refundableBalance?: number;
  /**
   * 状态1、使用中2、已冻结3、已退卡
   */
  status: number;
}[];

/**
 * 接口 [用户储值卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69574) 的 **请求配置的类型**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `GET /svc-web/member/card/info`
 * @更新时间 `2022-12-11 21:06:45`
 */
type SvcWebMemberCardInfoGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/member/card/info',
    'data',
    string,
    'memberCardId' | 'searchKey' | 'status',
    false
  >
>;

/**
 * 接口 [用户储值卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69574) 的 **请求配置**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `GET /svc-web/member/card/info`
 * @更新时间 `2022-12-11 21:06:45`
 */
const svcWebMemberCardInfoGetRequestConfig: SvcWebMemberCardInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_14,
    devUrl: devUrl_0_4_0_14,
    prodUrl: prodUrl_0_4_0_14,
    path: '/svc-web/member/card/info',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_14,
    paramNames: [],
    queryNames: ['memberCardId', 'searchKey', 'status'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebMemberCardInfoGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [用户储值卡详情↗](https://yapi.huianrong.com/project/1734/interface/api/69574) 的 **请求函数**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `GET /svc-web/member/card/info`
 * @更新时间 `2022-12-11 21:06:45`
 */
export const svcWebMemberCardInfoGet = /*#__PURE__*/ (
  requestData: SvcWebMemberCardInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebMemberCardInfoGetResponse>(
    prepare(svcWebMemberCardInfoGetRequestConfig, requestData),
    ...args
  );
};

svcWebMemberCardInfoGet.requestConfig = svcWebMemberCardInfoGetRequestConfig;

/**
 * 接口 [充值↗](https://yapi.huianrong.com/project/1734/interface/api/69576) 的 **请求类型**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/recharge`
 * @更新时间 `2022-12-13 01:29:47`
 */
export interface SvcWebMemberCardRechargePostRequest {
  /**
   * 用户储值卡id
   */
  memberCardId: number;
  /**
   * 活动id
   */
  activityId?: number;
  /**
   * 活动区间id
   */
  activityRangeId?: number;
  /**
   * 消费活动id
   */
  caActivityId?: number;
  /**
   * 优惠金额
   */
  discountAmount: number;
  /**
   * 到账金额
   */
  receivedAmount: number;
  /**
   * 支付方式列表 ,MemberCardRechargeMode
   */
  modeList: {
    /**
     * 支付方式1、现金2、支付宝3、微信
     */
    payment: number;
    /**
     * 充值金额
     */
    amount: number;
  }[];
}

/**
 * 接口 [充值↗](https://yapi.huianrong.com/project/1734/interface/api/69576) 的 **返回类型**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/recharge`
 * @更新时间 `2022-12-13 01:29:47`
 */
export interface SvcWebMemberCardRechargePostResponse {
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
 * 接口 [充值↗](https://yapi.huianrong.com/project/1734/interface/api/69576) 的 **请求配置的类型**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/recharge`
 * @更新时间 `2022-12-13 01:29:47`
 */
type SvcWebMemberCardRechargePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/member/card/recharge',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [充值↗](https://yapi.huianrong.com/project/1734/interface/api/69576) 的 **请求配置**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/recharge`
 * @更新时间 `2022-12-13 01:29:47`
 */
const svcWebMemberCardRechargePostRequestConfig: SvcWebMemberCardRechargePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_14,
    devUrl: devUrl_0_4_0_14,
    prodUrl: prodUrl_0_4_0_14,
    path: '/svc-web/member/card/recharge',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_14,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebMemberCardRechargePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [充值↗](https://yapi.huianrong.com/project/1734/interface/api/69576) 的 **请求函数**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/recharge`
 * @更新时间 `2022-12-13 01:29:47`
 */
export const svcWebMemberCardRechargePost = /*#__PURE__*/ (
  requestData: SvcWebMemberCardRechargePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebMemberCardRechargePostResponse>(
    prepare(svcWebMemberCardRechargePostRequestConfig, requestData),
    ...args
  );
};

svcWebMemberCardRechargePost.requestConfig =
  svcWebMemberCardRechargePostRequestConfig;

/**
 * 接口 [退卡↗](https://yapi.huianrong.com/project/1734/interface/api/69578) 的 **请求类型**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/cancel`
 * @更新时间 `2022-12-03 12:06:04`
 */
export interface SvcWebMemberCardCancelPostRequest {
  /**
   * 用户储值卡id
   */
  memberCardId: number;
  /**
   * 退款方式列表 ,MemberCardCancelMode
   */
  modeList: {
    /**
     * 退款方式1、现金2、支付宝3、微信
     */
    payment: number;
    /**
     * 退款金额
     */
    amount: number;
  }[];
}

/**
 * 接口 [退卡↗](https://yapi.huianrong.com/project/1734/interface/api/69578) 的 **返回类型**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/cancel`
 * @更新时间 `2022-12-03 12:06:04`
 */
export interface SvcWebMemberCardCancelPostResponse {
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
 * 接口 [退卡↗](https://yapi.huianrong.com/project/1734/interface/api/69578) 的 **请求配置的类型**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/cancel`
 * @更新时间 `2022-12-03 12:06:04`
 */
type SvcWebMemberCardCancelPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/member/card/cancel',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [退卡↗](https://yapi.huianrong.com/project/1734/interface/api/69578) 的 **请求配置**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/cancel`
 * @更新时间 `2022-12-03 12:06:04`
 */
const svcWebMemberCardCancelPostRequestConfig: SvcWebMemberCardCancelPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_14,
    devUrl: devUrl_0_4_0_14,
    prodUrl: prodUrl_0_4_0_14,
    path: '/svc-web/member/card/cancel',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_14,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebMemberCardCancelPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [退卡↗](https://yapi.huianrong.com/project/1734/interface/api/69578) 的 **请求函数**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/cancel`
 * @更新时间 `2022-12-03 12:06:04`
 */
export const svcWebMemberCardCancelPost = /*#__PURE__*/ (
  requestData: SvcWebMemberCardCancelPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebMemberCardCancelPostResponse>(
    prepare(svcWebMemberCardCancelPostRequestConfig, requestData),
    ...args
  );
};

svcWebMemberCardCancelPost.requestConfig =
  svcWebMemberCardCancelPostRequestConfig;

/**
 * 接口 [冻结解冻↗](https://yapi.huianrong.com/project/1734/interface/api/69580) 的 **请求类型**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/freeze`
 * @更新时间 `2022-12-05 11:44:52`
 */
export interface SvcWebMemberCardFreezePostRequest {
  /**
   * 用户储值卡id
   */
  memberCardId: number;
  /**
   * 操作类型1、解冻2、冻结
   */
  type: number;
}

/**
 * 接口 [冻结解冻↗](https://yapi.huianrong.com/project/1734/interface/api/69580) 的 **返回类型**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/freeze`
 * @更新时间 `2022-12-05 11:44:52`
 */
export interface SvcWebMemberCardFreezePostResponse {
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
 * 接口 [冻结解冻↗](https://yapi.huianrong.com/project/1734/interface/api/69580) 的 **请求配置的类型**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/freeze`
 * @更新时间 `2022-12-05 11:44:52`
 */
type SvcWebMemberCardFreezePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/member/card/freeze',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [冻结解冻↗](https://yapi.huianrong.com/project/1734/interface/api/69580) 的 **请求配置**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/freeze`
 * @更新时间 `2022-12-05 11:44:52`
 */
const svcWebMemberCardFreezePostRequestConfig: SvcWebMemberCardFreezePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_14,
    devUrl: devUrl_0_4_0_14,
    prodUrl: prodUrl_0_4_0_14,
    path: '/svc-web/member/card/freeze',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_14,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebMemberCardFreezePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [冻结解冻↗](https://yapi.huianrong.com/project/1734/interface/api/69580) 的 **请求函数**
 *
 * @分类 [用户储值卡↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22431)
 * @请求头 `POST /svc-web/member/card/freeze`
 * @更新时间 `2022-12-05 11:44:52`
 */
export const svcWebMemberCardFreezePost = /*#__PURE__*/ (
  requestData: SvcWebMemberCardFreezePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebMemberCardFreezePostResponse>(
    prepare(svcWebMemberCardFreezePostRequestConfig, requestData),
    ...args
  );
};

svcWebMemberCardFreezePost.requestConfig =
  svcWebMemberCardFreezePostRequestConfig;

const mockUrl_0_4_0_15 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_15 = '' as any;
const prodUrl_0_4_0_15 = '' as any;
const dataKey_0_4_0_15 = 'data' as any;

/**
 * 接口 [生成验证码↗](https://yapi.huianrong.com/project/1734/interface/api/69610) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/captchaImage`
 * @更新时间 `2022-12-06 11:04:26`
 */
export interface SvcWebCaptchaImageGetRequest {}

/**
 * 接口 [生成验证码↗](https://yapi.huianrong.com/project/1734/interface/api/69610) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/captchaImage`
 * @更新时间 `2022-12-06 11:04:26`
 */
export interface SvcWebCaptchaImageGetResponse {
  /**
   * 验证码开关
   */
  captchaOnOff: boolean;
  /**
   * 验证码唯一id
   */
  uuid?: string;
  /**
   * 验证码base64图片
   */
  img?: string;
}

/**
 * 接口 [生成验证码↗](https://yapi.huianrong.com/project/1734/interface/api/69610) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/captchaImage`
 * @更新时间 `2022-12-06 11:04:26`
 */
type SvcWebCaptchaImageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/captchaImage',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [生成验证码↗](https://yapi.huianrong.com/project/1734/interface/api/69610) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/captchaImage`
 * @更新时间 `2022-12-06 11:04:26`
 */
const svcWebCaptchaImageGetRequestConfig: SvcWebCaptchaImageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_15,
    devUrl: devUrl_0_4_0_15,
    prodUrl: prodUrl_0_4_0_15,
    path: '/svc-web/captchaImage',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_15,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCaptchaImageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [生成验证码↗](https://yapi.huianrong.com/project/1734/interface/api/69610) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/captchaImage`
 * @更新时间 `2022-12-06 11:04:26`
 */
export const svcWebCaptchaImageGet = /*#__PURE__*/ (
  requestData?: SvcWebCaptchaImageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCaptchaImageGetResponse>(
    prepare(svcWebCaptchaImageGetRequestConfig, requestData),
    ...args
  );
};

svcWebCaptchaImageGet.requestConfig = svcWebCaptchaImageGetRequestConfig;

/**
 * 接口 [登录方法↗](https://yapi.huianrong.com/project/1734/interface/api/69612) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `POST /svc-web/login`
 * @更新时间 `2022-12-06 11:04:26`
 */
export interface SvcWebLoginPostRequest {
  /**
   * 用户名
   */
  userName: string;
  /**
   * 用户密码
   */
  passWord: string;
  /**
   * 验证码
   */
  code: string;
  /**
   * 验证码唯一标识
   */
  uuid: string;
}

/**
 * 接口 [登录方法↗](https://yapi.huianrong.com/project/1734/interface/api/69612) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `POST /svc-web/login`
 * @更新时间 `2022-12-06 11:04:26`
 */
export interface SvcWebLoginPostResponse {
  /**
   * 用户token
   */
  token: string;
}

/**
 * 接口 [登录方法↗](https://yapi.huianrong.com/project/1734/interface/api/69612) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `POST /svc-web/login`
 * @更新时间 `2022-12-06 11:04:26`
 */
type SvcWebLoginPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/login',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [登录方法↗](https://yapi.huianrong.com/project/1734/interface/api/69612) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `POST /svc-web/login`
 * @更新时间 `2022-12-06 11:04:26`
 */
const svcWebLoginPostRequestConfig: SvcWebLoginPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_15,
    devUrl: devUrl_0_4_0_15,
    prodUrl: prodUrl_0_4_0_15,
    path: '/svc-web/login',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_15,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebLoginPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [登录方法↗](https://yapi.huianrong.com/project/1734/interface/api/69612) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `POST /svc-web/login`
 * @更新时间 `2022-12-06 11:04:26`
 */
export const svcWebLoginPost = /*#__PURE__*/ (
  requestData: SvcWebLoginPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebLoginPostResponse>(
    prepare(svcWebLoginPostRequestConfig, requestData),
    ...args
  );
};

svcWebLoginPost.requestConfig = svcWebLoginPostRequestConfig;

/**
 * 接口 [获取用户信息↗](https://yapi.huianrong.com/project/1734/interface/api/69614) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/getInfo`
 * @更新时间 `2022-12-06 11:04:27`
 */
export interface SvcWebGetInfoGetRequest {}

/**
 * 接口 [获取用户信息↗](https://yapi.huianrong.com/project/1734/interface/api/69614) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/getInfo`
 * @更新时间 `2022-12-06 11:04:27`
 */
export interface SvcWebGetInfoGetResponse {
  /**
   * 用户对象 ,RespUserInfoBaseDto
   */
  user: {
    /**
     * 用户id
     */
    userId: number;
    /**
     * 用户账号
     */
    userName: string;
    /**
     * 姓名
     */
    realName?: string;
    /**
     * 用户昵称
     */
    nickName?: string;
    /**
     * 用户邮箱
     */
    email?: string;
    /**
     * 用户性别（0男1女2未知）
     */
    sex?: string;
    /**
     * 头像地址
     */
    avatar?: string;
  };
  /**
   * 用户角色集合 ,String
   */
  roles?: string[];
  /**
   * 用户权限集合 ,String
   */
  permissions?: string[];
}

/**
 * 接口 [获取用户信息↗](https://yapi.huianrong.com/project/1734/interface/api/69614) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/getInfo`
 * @更新时间 `2022-12-06 11:04:27`
 */
type SvcWebGetInfoGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/getInfo',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [获取用户信息↗](https://yapi.huianrong.com/project/1734/interface/api/69614) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/getInfo`
 * @更新时间 `2022-12-06 11:04:27`
 */
const svcWebGetInfoGetRequestConfig: SvcWebGetInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_15,
    devUrl: devUrl_0_4_0_15,
    prodUrl: prodUrl_0_4_0_15,
    path: '/svc-web/getInfo',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_15,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebGetInfoGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取用户信息↗](https://yapi.huianrong.com/project/1734/interface/api/69614) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/getInfo`
 * @更新时间 `2022-12-06 11:04:27`
 */
export const svcWebGetInfoGet = /*#__PURE__*/ (
  requestData?: SvcWebGetInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebGetInfoGetResponse>(
    prepare(svcWebGetInfoGetRequestConfig, requestData),
    ...args
  );
};

svcWebGetInfoGet.requestConfig = svcWebGetInfoGetRequestConfig;

/**
 * 接口 [获取路由信息↗](https://yapi.huianrong.com/project/1734/interface/api/69616) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/getRouters`
 * @更新时间 `2022-12-06 11:04:28`
 */
export interface SvcWebGetRoutersGetRequest {}

/**
 * 接口 [获取路由信息↗](https://yapi.huianrong.com/project/1734/interface/api/69616) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/getRouters`
 * @更新时间 `2022-12-06 11:04:28`
 */
export type SvcWebGetRoutersGetResponse = {
  /**
   * 路由名字
   */
  name: string;
  /**
   * 路由名字英文
   */
  nameEn?: string;
  /**
   * 路由地址
   */
  path: string;
  /**
   * 是否隐藏路由，当设置true的时候该路由不会再侧边栏出现
   */
  hidden?: boolean;
  /**
   * 重定向地址，当设置noRedirect的时候该路由在面包屑导航中不可被点击
   */
  redirect?: string;
  /**
   * 组件地址
   */
  component?: string;
  /**
   * 路由参数：如{"id":1,"name":"ry"}
   */
  query?: string;
  /**
   * 当你一个路由下面的children声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
   */
  alwaysShow?: boolean;
  /**
   * 其他元素 ,MetaVo
   */
  meta?: {
    /**
     * 设置该路由在侧边栏和面包屑中展示的名字
     */
    title?: string;
    /**
     * 设置该路由的图标，对应路径srcassetsiconssvg
     */
    icon?: string;
    /**
     * 设置为true，则不会被<keep-alive>缓存
     */
    noCache?: boolean;
    /**
     * 内链地址（http(s):开头）
     */
    link?: string;
  };
  /**
   * 子路由 ,RouterVo
   */
  children?: {
    [k: string]: unknown;
  }[];
  /**
   * 是否为外链（0是1否）
   */
  isFrame?: number;
  /**
   * 描述
   */
  remark?: string;
}[];

/**
 * 接口 [获取路由信息↗](https://yapi.huianrong.com/project/1734/interface/api/69616) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/getRouters`
 * @更新时间 `2022-12-06 11:04:28`
 */
type SvcWebGetRoutersGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/getRouters',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [获取路由信息↗](https://yapi.huianrong.com/project/1734/interface/api/69616) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/getRouters`
 * @更新时间 `2022-12-06 11:04:28`
 */
const svcWebGetRoutersGetRequestConfig: SvcWebGetRoutersGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_15,
    devUrl: devUrl_0_4_0_15,
    prodUrl: prodUrl_0_4_0_15,
    path: '/svc-web/getRouters',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_15,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebGetRoutersGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取路由信息↗](https://yapi.huianrong.com/project/1734/interface/api/69616) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/getRouters`
 * @更新时间 `2022-12-06 11:04:28`
 */
export const svcWebGetRoutersGet = /*#__PURE__*/ (
  requestData?: SvcWebGetRoutersGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebGetRoutersGetResponse>(
    prepare(svcWebGetRoutersGetRequestConfig, requestData),
    ...args
  );
};

svcWebGetRoutersGet.requestConfig = svcWebGetRoutersGetRequestConfig;

/**
 * 接口 [退出↗](https://yapi.huianrong.com/project/1734/interface/api/69664) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/logout`
 * @更新时间 `2022-12-06 11:04:29`
 */
export interface SvcWebLogoutGetRequest {}

/**
 * 接口 [退出↗](https://yapi.huianrong.com/project/1734/interface/api/69664) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/logout`
 * @更新时间 `2022-12-06 11:04:29`
 */
export interface SvcWebLogoutGetResponse {}

/**
 * 接口 [退出↗](https://yapi.huianrong.com/project/1734/interface/api/69664) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/logout`
 * @更新时间 `2022-12-06 11:04:29`
 */
type SvcWebLogoutGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/logout',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [退出↗](https://yapi.huianrong.com/project/1734/interface/api/69664) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/logout`
 * @更新时间 `2022-12-06 11:04:29`
 */
const svcWebLogoutGetRequestConfig: SvcWebLogoutGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_15,
    devUrl: devUrl_0_4_0_15,
    prodUrl: prodUrl_0_4_0_15,
    path: '/svc-web/logout',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_15,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebLogoutGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [退出↗](https://yapi.huianrong.com/project/1734/interface/api/69664) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22437)
 * @请求头 `GET /svc-web/logout`
 * @更新时间 `2022-12-06 11:04:29`
 */
export const svcWebLogoutGet = /*#__PURE__*/ (
  requestData?: SvcWebLogoutGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebLogoutGetResponse>(
    prepare(svcWebLogoutGetRequestConfig, requestData),
    ...args
  );
};

svcWebLogoutGet.requestConfig = svcWebLogoutGetRequestConfig;

const mockUrl_0_4_0_17 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_17 = '' as any;
const prodUrl_0_4_0_17 = '' as any;
const dataKey_0_4_0_17 = 'data' as any;

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69764) 的 **请求类型**
 *
 * @分类 [场馆↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22461)
 * @请求头 `GET /svc-web/venue/page`
 * @更新时间 `2022-12-07 09:58:18`
 */
export interface SvcWebVenuePageGetRequest {
  /**
   * 店铺id
   */
  storeId?: string;
  /**
   * 名称编码
   */
  key?: string;
  /**
   * 场馆分类ID
   */
  classifyId?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69764) 的 **返回类型**
 *
 * @分类 [场馆↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22461)
 * @请求头 `GET /svc-web/venue/page`
 * @更新时间 `2022-12-07 09:58:18`
 */
export interface SvcWebVenuePageGetResponse {
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
     * 名字
     */
    name?: string;
    /**
     * 编号
     */
    code?: string;
    /**
     * 分类名字
     */
    classifyName?: string;
  }[];
}

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69764) 的 **请求配置的类型**
 *
 * @分类 [场馆↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22461)
 * @请求头 `GET /svc-web/venue/page`
 * @更新时间 `2022-12-07 09:58:18`
 */
type SvcWebVenuePageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/venue/page',
    'data',
    string,
    'storeId' | 'key' | 'classifyId' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69764) 的 **请求配置**
 *
 * @分类 [场馆↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22461)
 * @请求头 `GET /svc-web/venue/page`
 * @更新时间 `2022-12-07 09:58:18`
 */
const svcWebVenuePageGetRequestConfig: SvcWebVenuePageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_17,
    devUrl: devUrl_0_4_0_17,
    prodUrl: prodUrl_0_4_0_17,
    path: '/svc-web/venue/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_17,
    paramNames: [],
    queryNames: ['storeId', 'key', 'classifyId', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebVenuePageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69764) 的 **请求函数**
 *
 * @分类 [场馆↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22461)
 * @请求头 `GET /svc-web/venue/page`
 * @更新时间 `2022-12-07 09:58:18`
 */
export const svcWebVenuePageGet = /*#__PURE__*/ (
  requestData: SvcWebVenuePageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebVenuePageGetResponse>(
    prepare(svcWebVenuePageGetRequestConfig, requestData),
    ...args
  );
};

svcWebVenuePageGet.requestConfig = svcWebVenuePageGetRequestConfig;

const mockUrl_0_4_0_18 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_18 = '' as any;
const prodUrl_0_4_0_18 = '' as any;
const dataKey_0_4_0_18 = 'data' as any;

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69820) 的 **请求类型**
 *
 * @分类 [店铺↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22471)
 * @请求头 `GET /svc-web/store/page`
 * @更新时间 `2022-12-07 15:54:02`
 */
export interface SvcWebStorePageGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 名字联系人电话
   */
  key?: string;
  /**
   * 业态id
   */
  formatId?: string;
  /**
   * 省
   */
  provinceCode?: string;
  /**
   * 市
   */
  cityCode?: string;
  /**
   * 区县
   */
  districtCode?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69820) 的 **返回类型**
 *
 * @分类 [店铺↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22471)
 * @请求头 `GET /svc-web/store/page`
 * @更新时间 `2022-12-07 15:54:02`
 */
export interface SvcWebStorePageGetResponse {
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
     * 店铺名字
     */
    name?: string;
    /**
     * 项目名字
     */
    projectName?: string;
    /**
     * 业态
     */
    format?: string;
    /**
     * 联系人
     */
    linkman?: string;
    /**
     * 联系电话
     */
    linkTel?: string;
    /**
     * 省
     */
    provinceCode?: string;
    /**
     * 省名字
     */
    provinceName?: string;
    /**
     * 市
     */
    cityCode?: string;
    /**
     * 市
     */
    cityName?: string;
    /**
     * 区县
     */
    districtCode?: string;
    /**
     * 区县
     */
    districtName?: string;
  }[];
}

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69820) 的 **请求配置的类型**
 *
 * @分类 [店铺↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22471)
 * @请求头 `GET /svc-web/store/page`
 * @更新时间 `2022-12-07 15:54:02`
 */
type SvcWebStorePageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/store/page',
    'data',
    string,
    | 'projectId'
    | 'key'
    | 'formatId'
    | 'provinceCode'
    | 'cityCode'
    | 'districtCode'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69820) 的 **请求配置**
 *
 * @分类 [店铺↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22471)
 * @请求头 `GET /svc-web/store/page`
 * @更新时间 `2022-12-07 15:54:02`
 */
const svcWebStorePageGetRequestConfig: SvcWebStorePageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_18,
    devUrl: devUrl_0_4_0_18,
    prodUrl: prodUrl_0_4_0_18,
    path: '/svc-web/store/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_18,
    paramNames: [],
    queryNames: [
      'projectId',
      'key',
      'formatId',
      'provinceCode',
      'cityCode',
      'districtCode',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebStorePageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页查询↗](https://yapi.huianrong.com/project/1734/interface/api/69820) 的 **请求函数**
 *
 * @分类 [店铺↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22471)
 * @请求头 `GET /svc-web/store/page`
 * @更新时间 `2022-12-07 15:54:02`
 */
export const svcWebStorePageGet = /*#__PURE__*/ (
  requestData: SvcWebStorePageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebStorePageGetResponse>(
    prepare(svcWebStorePageGetRequestConfig, requestData),
    ...args
  );
};

svcWebStorePageGet.requestConfig = svcWebStorePageGetRequestConfig;

const mockUrl_0_4_0_19 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_19 = '' as any;
const prodUrl_0_4_0_19 = '' as any;
const dataKey_0_4_0_19 = 'data' as any;

/**
 * 接口 [projectSelect↗](https://yapi.huianrong.com/project/1734/interface/api/69896) 的 **请求类型**
 *
 * @分类 [CommonController↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22491)
 * @请求头 `GET /svc-web/common/project-select`
 * @更新时间 `2022-12-08 19:04:07`
 */
export interface SvcWebCommonProjectSelectGetRequest {
  name?: string;
}

/**
 * 接口 [projectSelect↗](https://yapi.huianrong.com/project/1734/interface/api/69896) 的 **返回类型**
 *
 * @分类 [CommonController↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22491)
 * @请求头 `GET /svc-web/common/project-select`
 * @更新时间 `2022-12-08 19:04:07`
 */
export type SvcWebCommonProjectSelectGetResponse = {
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
 * 接口 [projectSelect↗](https://yapi.huianrong.com/project/1734/interface/api/69896) 的 **请求配置的类型**
 *
 * @分类 [CommonController↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22491)
 * @请求头 `GET /svc-web/common/project-select`
 * @更新时间 `2022-12-08 19:04:07`
 */
type SvcWebCommonProjectSelectGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/common/project-select',
    'data',
    string,
    'name',
    false
  >
>;

/**
 * 接口 [projectSelect↗](https://yapi.huianrong.com/project/1734/interface/api/69896) 的 **请求配置**
 *
 * @分类 [CommonController↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22491)
 * @请求头 `GET /svc-web/common/project-select`
 * @更新时间 `2022-12-08 19:04:07`
 */
const svcWebCommonProjectSelectGetRequestConfig: SvcWebCommonProjectSelectGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_19,
    devUrl: devUrl_0_4_0_19,
    prodUrl: prodUrl_0_4_0_19,
    path: '/svc-web/common/project-select',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_19,
    paramNames: [],
    queryNames: ['name'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCommonProjectSelectGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [projectSelect↗](https://yapi.huianrong.com/project/1734/interface/api/69896) 的 **请求函数**
 *
 * @分类 [CommonController↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22491)
 * @请求头 `GET /svc-web/common/project-select`
 * @更新时间 `2022-12-08 19:04:07`
 */
export const svcWebCommonProjectSelectGet = /*#__PURE__*/ (
  requestData: SvcWebCommonProjectSelectGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCommonProjectSelectGetResponse>(
    prepare(svcWebCommonProjectSelectGetRequestConfig, requestData),
    ...args
  );
};

svcWebCommonProjectSelectGet.requestConfig =
  svcWebCommonProjectSelectGetRequestConfig;

/**
 * 接口 [活动下拉(活动编码或名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69898) 的 **请求类型**
 *
 * @分类 [CommonController↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22491)
 * @请求头 `GET /svc-web/common/activity/select/code_name`
 * @更新时间 `2022-12-08 18:20:45`
 */
export interface SvcWebCommonActivitySelectCodeNameGetRequest {}

/**
 * 接口 [活动下拉(活动编码或名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69898) 的 **返回类型**
 *
 * @分类 [CommonController↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22491)
 * @请求头 `GET /svc-web/common/activity/select/code_name`
 * @更新时间 `2022-12-08 18:20:45`
 */
export type SvcWebCommonActivitySelectCodeNameGetResponse = {
  /**
   * 活动id
   */
  value: number;
  /**
   * 活动名称
   */
  label: string;
}[];

/**
 * 接口 [活动下拉(活动编码或名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69898) 的 **请求配置的类型**
 *
 * @分类 [CommonController↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22491)
 * @请求头 `GET /svc-web/common/activity/select/code_name`
 * @更新时间 `2022-12-08 18:20:45`
 */
type SvcWebCommonActivitySelectCodeNameGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/common/activity/select/code_name',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [活动下拉(活动编码或名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69898) 的 **请求配置**
 *
 * @分类 [CommonController↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22491)
 * @请求头 `GET /svc-web/common/activity/select/code_name`
 * @更新时间 `2022-12-08 18:20:45`
 */
const svcWebCommonActivitySelectCodeNameGetRequestConfig: SvcWebCommonActivitySelectCodeNameGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_19,
    devUrl: devUrl_0_4_0_19,
    prodUrl: prodUrl_0_4_0_19,
    path: '/svc-web/common/activity/select/code_name',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_19,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebCommonActivitySelectCodeNameGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [活动下拉(活动编码或名称)↗](https://yapi.huianrong.com/project/1734/interface/api/69898) 的 **请求函数**
 *
 * @分类 [CommonController↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22491)
 * @请求头 `GET /svc-web/common/activity/select/code_name`
 * @更新时间 `2022-12-08 18:20:45`
 */
export const svcWebCommonActivitySelectCodeNameGet = /*#__PURE__*/ (
  requestData?: SvcWebCommonActivitySelectCodeNameGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebCommonActivitySelectCodeNameGetResponse>(
    prepare(svcWebCommonActivitySelectCodeNameGetRequestConfig, requestData),
    ...args
  );
};

svcWebCommonActivitySelectCodeNameGet.requestConfig =
  svcWebCommonActivitySelectCodeNameGetRequestConfig;

const mockUrl_0_4_0_20 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_20 = '' as any;
const prodUrl_0_4_0_20 = '' as any;
const dataKey_0_4_0_20 = 'data' as any;

/**
 * 接口 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/69936) 的 **请求类型**
 *
 * @分类 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22503)
 * @请求头 `GET /svc-web/sysOpt/pageOptList`
 * @更新时间 `2022-12-09 19:40:42`
 */
export interface SvcWebSysOptPageOptListGetRequest {
  /**
   * modeId
   */
  modeId?: string;
  /**
   * 1，新增2，修改
   */
  businessType?: string;
  /**
   * 需要查看那个mode的操作记录
   */
  mode?: string;
  /**
   * 操作时间
   */
  optTime?: string;
  pageNum?: string;
  pageSize?: string;
}

/**
 * 接口 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/69936) 的 **返回类型**
 *
 * @分类 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22503)
 * @请求头 `GET /svc-web/sysOpt/pageOptList`
 * @更新时间 `2022-12-09 19:40:42`
 */
export interface SvcWebSysOptPageOptListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 描述
     */
    describe?: string;
    /**
     * 类型1，新增2，修改3，删除
     */
    businessType?: number;
    /**
     * 操作人
     */
    optUser?: string;
    /**
     * 操作时间
     */
    optTime?: string;
  }[];
}

/**
 * 接口 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/69936) 的 **请求配置的类型**
 *
 * @分类 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22503)
 * @请求头 `GET /svc-web/sysOpt/pageOptList`
 * @更新时间 `2022-12-09 19:40:42`
 */
type SvcWebSysOptPageOptListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/sysOpt/pageOptList',
    'data',
    string,
    'modeId' | 'businessType' | 'mode' | 'optTime' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/69936) 的 **请求配置**
 *
 * @分类 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22503)
 * @请求头 `GET /svc-web/sysOpt/pageOptList`
 * @更新时间 `2022-12-09 19:40:42`
 */
const svcWebSysOptPageOptListGetRequestConfig: SvcWebSysOptPageOptListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_20,
    devUrl: devUrl_0_4_0_20,
    prodUrl: prodUrl_0_4_0_20,
    path: '/svc-web/sysOpt/pageOptList',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_20,
    paramNames: [],
    queryNames: [
      'modeId',
      'businessType',
      'mode',
      'optTime',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebSysOptPageOptListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/69936) 的 **请求函数**
 *
 * @分类 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22503)
 * @请求头 `GET /svc-web/sysOpt/pageOptList`
 * @更新时间 `2022-12-09 19:40:42`
 */
export const svcWebSysOptPageOptListGet = /*#__PURE__*/ (
  requestData: SvcWebSysOptPageOptListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebSysOptPageOptListGetResponse>(
    prepare(svcWebSysOptPageOptListGetRequestConfig, requestData),
    ...args
  );
};

svcWebSysOptPageOptListGet.requestConfig =
  svcWebSysOptPageOptListGetRequestConfig;

/**
 * 接口 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/69938) 的 **请求类型**
 *
 * @分类 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22503)
 * @请求头 `POST /svc-web/sysOpt/pageOptList`
 * @更新时间 `2022-12-09 20:40:21`
 */
export interface SvcWebSysOptPageOptListPostRequest {
  /**
   * modeId
   */
  modeId: string;
  /**
   * 1，新增2，修改 :
   */
  businessType?: number[];
  /**
   * 需要查看那个mode的操作记录
   */
  mode: string;
  /**
   * 操作时间
   */
  optTime?: string;
  pageNum: number;
  pageSize: number;
}

/**
 * 接口 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/69938) 的 **返回类型**
 *
 * @分类 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22503)
 * @请求头 `POST /svc-web/sysOpt/pageOptList`
 * @更新时间 `2022-12-09 20:40:21`
 */
export interface SvcWebSysOptPageOptListPostResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据 ,T
   */
  rows?: {
    /**
     * 描述
     */
    describe?: string;
    /**
     * 类型1，新增2，修改3，删除
     */
    businessType?: number;
    /**
     * 操作人
     */
    optUser?: string;
    /**
     * 操作时间
     */
    optTime?: string;
  }[];
}

/**
 * 接口 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/69938) 的 **请求配置的类型**
 *
 * @分类 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22503)
 * @请求头 `POST /svc-web/sysOpt/pageOptList`
 * @更新时间 `2022-12-09 20:40:21`
 */
type SvcWebSysOptPageOptListPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/sysOpt/pageOptList',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/69938) 的 **请求配置**
 *
 * @分类 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22503)
 * @请求头 `POST /svc-web/sysOpt/pageOptList`
 * @更新时间 `2022-12-09 20:40:21`
 */
const svcWebSysOptPageOptListPostRequestConfig: SvcWebSysOptPageOptListPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_20,
    devUrl: devUrl_0_4_0_20,
    prodUrl: prodUrl_0_4_0_20,
    path: '/svc-web/sysOpt/pageOptList',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_20,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebSysOptPageOptListPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/69938) 的 **请求函数**
 *
 * @分类 [操作记录↗](https://yapi.huianrong.com/project/1734/interface/api/cat_22503)
 * @请求头 `POST /svc-web/sysOpt/pageOptList`
 * @更新时间 `2022-12-09 20:40:21`
 */
export const svcWebSysOptPageOptListPost = /*#__PURE__*/ (
  requestData: SvcWebSysOptPageOptListPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebSysOptPageOptListPostResponse>(
    prepare(svcWebSysOptPageOptListPostRequestConfig, requestData),
    ...args
  );
};

svcWebSysOptPageOptListPost.requestConfig =
  svcWebSysOptPageOptListPostRequestConfig;

const mockUrl_0_4_0_21 = 'https://yapi.huianrong.com/mock/1734' as any;
const devUrl_0_4_0_21 = '' as any;
const prodUrl_0_4_0_21 = '' as any;
const dataKey_0_4_0_21 = 'data' as any;

/**
 * 接口 [请求授权↗](https://yapi.huianrong.com/project/1734/interface/api/72362) 的 **请求类型**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1734/interface/api/cat_23179)
 * @请求头 `GET /svc-web/oauth2/authorize`
 * @更新时间 `2023-02-27 14:13:03`
 */
export interface SvcWebOauth2AuthorizeGetRequest {
  /**
   * 凭证
   */
  certificate?: string;
}

/**
 * 接口 [请求授权↗](https://yapi.huianrong.com/project/1734/interface/api/72362) 的 **返回类型**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1734/interface/api/cat_23179)
 * @请求头 `GET /svc-web/oauth2/authorize`
 * @更新时间 `2023-02-27 14:13:03`
 */
export interface SvcWebOauth2AuthorizeGetResponse {
  /**
   * 授权码标识
   */
  state: string;
  /**
   * 重定向地址
   */
  redirectUrl: string;
}

/**
 * 接口 [请求授权↗](https://yapi.huianrong.com/project/1734/interface/api/72362) 的 **请求配置的类型**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1734/interface/api/cat_23179)
 * @请求头 `GET /svc-web/oauth2/authorize`
 * @更新时间 `2023-02-27 14:13:03`
 */
type SvcWebOauth2AuthorizeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/oauth2/authorize',
    'data',
    string,
    'certificate',
    false
  >
>;

/**
 * 接口 [请求授权↗](https://yapi.huianrong.com/project/1734/interface/api/72362) 的 **请求配置**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1734/interface/api/cat_23179)
 * @请求头 `GET /svc-web/oauth2/authorize`
 * @更新时间 `2023-02-27 14:13:03`
 */
const svcWebOauth2AuthorizeGetRequestConfig: SvcWebOauth2AuthorizeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_21,
    devUrl: devUrl_0_4_0_21,
    prodUrl: prodUrl_0_4_0_21,
    path: '/svc-web/oauth2/authorize',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_21,
    paramNames: [],
    queryNames: ['certificate'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebOauth2AuthorizeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [请求授权↗](https://yapi.huianrong.com/project/1734/interface/api/72362) 的 **请求函数**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1734/interface/api/cat_23179)
 * @请求头 `GET /svc-web/oauth2/authorize`
 * @更新时间 `2023-02-27 14:13:03`
 */
export const svcWebOauth2AuthorizeGet = /*#__PURE__*/ (
  requestData: SvcWebOauth2AuthorizeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebOauth2AuthorizeGetResponse>(
    prepare(svcWebOauth2AuthorizeGetRequestConfig, requestData),
    ...args
  );
};

svcWebOauth2AuthorizeGet.requestConfig = svcWebOauth2AuthorizeGetRequestConfig;

/**
 * 接口 [换取token↗](https://yapi.huianrong.com/project/1734/interface/api/72364) 的 **请求类型**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1734/interface/api/cat_23179)
 * @请求头 `GET /svc-web/oauth2/exchange`
 * @更新时间 `2023-02-27 14:13:54`
 */
export interface SvcWebOauth2ExchangeGetRequest {
  state?: string;
}

/**
 * 接口 [换取token↗](https://yapi.huianrong.com/project/1734/interface/api/72364) 的 **返回类型**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1734/interface/api/cat_23179)
 * @请求头 `GET /svc-web/oauth2/exchange`
 * @更新时间 `2023-02-27 14:13:54`
 */
export interface SvcWebOauth2ExchangeGetResponse {
  /**
   * token
   */
  token?: string;
}

/**
 * 接口 [换取token↗](https://yapi.huianrong.com/project/1734/interface/api/72364) 的 **请求配置的类型**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1734/interface/api/cat_23179)
 * @请求头 `GET /svc-web/oauth2/exchange`
 * @更新时间 `2023-02-27 14:13:54`
 */
type SvcWebOauth2ExchangeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1734',
    '',
    '',
    '/svc-web/oauth2/exchange',
    'data',
    string,
    'state',
    false
  >
>;

/**
 * 接口 [换取token↗](https://yapi.huianrong.com/project/1734/interface/api/72364) 的 **请求配置**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1734/interface/api/cat_23179)
 * @请求头 `GET /svc-web/oauth2/exchange`
 * @更新时间 `2023-02-27 14:13:54`
 */
const svcWebOauth2ExchangeGetRequestConfig: SvcWebOauth2ExchangeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_4_0_21,
    devUrl: devUrl_0_4_0_21,
    prodUrl: prodUrl_0_4_0_21,
    path: '/svc-web/oauth2/exchange',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_4_0_21,
    paramNames: [],
    queryNames: ['state'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'svcWebOauth2ExchangeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [换取token↗](https://yapi.huianrong.com/project/1734/interface/api/72364) 的 **请求函数**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1734/interface/api/cat_23179)
 * @请求头 `GET /svc-web/oauth2/exchange`
 * @更新时间 `2023-02-27 14:13:54`
 */
export const svcWebOauth2ExchangeGet = /*#__PURE__*/ (
  requestData: SvcWebOauth2ExchangeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<SvcWebOauth2ExchangeGetResponse>(
    prepare(svcWebOauth2ExchangeGetRequestConfig, requestData),
    ...args
  );
};

svcWebOauth2ExchangeGet.requestConfig = svcWebOauth2ExchangeGetRequestConfig;

/* prettier-ignore-end */
