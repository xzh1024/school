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

const mockUrl_0_1_0_0 = 'https://yapi.huianrong.com/mock/1722' as any;
const devUrl_0_1_0_0 = '' as any;
const prodUrl_0_1_0_0 = '' as any;
const dataKey_0_1_0_0 = 'data' as any;

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69084) 的 **请求类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `GET /flowable-engine/category/page`
 * @更新时间 `2022-11-22 17:36:28`
 */
export interface FlowableEngineCategoryPageGetRequest {
  /**
   * 分类名称
   */
  name?: string;
  /**
   * 分类编码
   */
  code?: string;
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
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69084) 的 **返回类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `GET /flowable-engine/category/page`
 * @更新时间 `2022-11-22 17:36:28`
 */
export interface FlowableEngineCategoryPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 分类名称
     */
    name: string;
    /**
     * 分类编码
     */
    code: string;
    /**
     * 备注
     */
    remark?: string;
  }[];
}

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69084) 的 **请求配置的类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `GET /flowable-engine/category/page`
 * @更新时间 `2022-11-22 17:36:28`
 */
type FlowableEngineCategoryPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/category/page',
    'data',
    string,
    'name' | 'code' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69084) 的 **请求配置**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `GET /flowable-engine/category/page`
 * @更新时间 `2022-11-22 17:36:28`
 */
const flowableEngineCategoryPageGetRequestConfig: FlowableEngineCategoryPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_0,
    devUrl: devUrl_0_1_0_0,
    prodUrl: prodUrl_0_1_0_0,
    path: '/flowable-engine/category/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_0,
    paramNames: [],
    queryNames: ['name', 'code', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineCategoryPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69084) 的 **请求函数**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `GET /flowable-engine/category/page`
 * @更新时间 `2022-11-22 17:36:28`
 */
export const flowableEngineCategoryPageGet = /*#__PURE__*/ (
  requestData: FlowableEngineCategoryPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineCategoryPageGetResponse>(
    prepare(flowableEngineCategoryPageGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineCategoryPageGet.requestConfig =
  flowableEngineCategoryPageGetRequestConfig;

/**
 * 接口 [详细↗](https://yapi.huianrong.com/project/1722/interface/api/69086) 的 **请求类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `GET /flowable-engine/category/info/{code}`
 * @更新时间 `2022-11-22 17:36:28`
 */
export interface FlowableEngineCategoryInfoCodeGetRequest {
  code: string;
}

/**
 * 接口 [详细↗](https://yapi.huianrong.com/project/1722/interface/api/69086) 的 **返回类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `GET /flowable-engine/category/info/{code}`
 * @更新时间 `2022-11-22 17:36:28`
 */
export interface FlowableEngineCategoryInfoCodeGetResponse {
  /**
   * 分类名称
   */
  name: string;
  /**
   * 分类编码
   */
  code: string;
  /**
   * 备注
   */
  remark: string;
}

/**
 * 接口 [详细↗](https://yapi.huianrong.com/project/1722/interface/api/69086) 的 **请求配置的类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `GET /flowable-engine/category/info/{code}`
 * @更新时间 `2022-11-22 17:36:28`
 */
type FlowableEngineCategoryInfoCodeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/category/info/{code}',
    'data',
    'code',
    string,
    false
  >
>;

/**
 * 接口 [详细↗](https://yapi.huianrong.com/project/1722/interface/api/69086) 的 **请求配置**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `GET /flowable-engine/category/info/{code}`
 * @更新时间 `2022-11-22 17:36:28`
 */
const flowableEngineCategoryInfoCodeGetRequestConfig: FlowableEngineCategoryInfoCodeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_0,
    devUrl: devUrl_0_1_0_0,
    prodUrl: prodUrl_0_1_0_0,
    path: '/flowable-engine/category/info/{code}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_0,
    paramNames: ['code'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineCategoryInfoCodeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [详细↗](https://yapi.huianrong.com/project/1722/interface/api/69086) 的 **请求函数**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `GET /flowable-engine/category/info/{code}`
 * @更新时间 `2022-11-22 17:36:28`
 */
export const flowableEngineCategoryInfoCodeGet = /*#__PURE__*/ (
  requestData: FlowableEngineCategoryInfoCodeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineCategoryInfoCodeGetResponse>(
    prepare(flowableEngineCategoryInfoCodeGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineCategoryInfoCodeGet.requestConfig =
  flowableEngineCategoryInfoCodeGetRequestConfig;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69088) 的 **请求类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `POST /flowable-engine/category/add`
 * @更新时间 `2022-11-22 17:36:29`
 */
export interface FlowableEngineCategoryAddPostRequest {
  /**
   * 分类名称
   */
  name: string;
  /**
   * 分类编码
   */
  code: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69088) 的 **返回类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `POST /flowable-engine/category/add`
 * @更新时间 `2022-11-22 17:36:29`
 */
export interface FlowableEngineCategoryAddPostResponse {}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69088) 的 **请求配置的类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `POST /flowable-engine/category/add`
 * @更新时间 `2022-11-22 17:36:29`
 */
type FlowableEngineCategoryAddPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/category/add',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69088) 的 **请求配置**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `POST /flowable-engine/category/add`
 * @更新时间 `2022-11-22 17:36:29`
 */
const flowableEngineCategoryAddPostRequestConfig: FlowableEngineCategoryAddPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_0,
    devUrl: devUrl_0_1_0_0,
    prodUrl: prodUrl_0_1_0_0,
    path: '/flowable-engine/category/add',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineCategoryAddPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69088) 的 **请求函数**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `POST /flowable-engine/category/add`
 * @更新时间 `2022-11-22 17:36:29`
 */
export const flowableEngineCategoryAddPost = /*#__PURE__*/ (
  requestData: FlowableEngineCategoryAddPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineCategoryAddPostResponse>(
    prepare(flowableEngineCategoryAddPostRequestConfig, requestData),
    ...args
  );
};

flowableEngineCategoryAddPost.requestConfig =
  flowableEngineCategoryAddPostRequestConfig;

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/69090) 的 **请求类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `PUT /flowable-engine/category/update`
 * @更新时间 `2022-11-22 17:36:29`
 */
export interface FlowableEngineCategoryUpdatePutRequest {
  /**
   * 分类名称
   */
  name: string;
  /**
   * 分类编码
   */
  code: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/69090) 的 **返回类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `PUT /flowable-engine/category/update`
 * @更新时间 `2022-11-22 17:36:29`
 */
export interface FlowableEngineCategoryUpdatePutResponse {}

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/69090) 的 **请求配置的类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `PUT /flowable-engine/category/update`
 * @更新时间 `2022-11-22 17:36:29`
 */
type FlowableEngineCategoryUpdatePutRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/category/update',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/69090) 的 **请求配置**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `PUT /flowable-engine/category/update`
 * @更新时间 `2022-11-22 17:36:29`
 */
const flowableEngineCategoryUpdatePutRequestConfig: FlowableEngineCategoryUpdatePutRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_0,
    devUrl: devUrl_0_1_0_0,
    prodUrl: prodUrl_0_1_0_0,
    path: '/flowable-engine/category/update',
    method: Method.PUT,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineCategoryUpdatePut',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/69090) 的 **请求函数**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `PUT /flowable-engine/category/update`
 * @更新时间 `2022-11-22 17:36:29`
 */
export const flowableEngineCategoryUpdatePut = /*#__PURE__*/ (
  requestData: FlowableEngineCategoryUpdatePutRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineCategoryUpdatePutResponse>(
    prepare(flowableEngineCategoryUpdatePutRequestConfig, requestData),
    ...args
  );
};

flowableEngineCategoryUpdatePut.requestConfig =
  flowableEngineCategoryUpdatePutRequestConfig;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69092) 的 **请求类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `POST /flowable-engine/category/delete`
 * @更新时间 `2022-11-22 17:36:29`
 */
export interface FlowableEngineCategoryDeletePostRequest {
  /**
   * 分类编码
   */
  codes?: string[];
}

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69092) 的 **返回类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `POST /flowable-engine/category/delete`
 * @更新时间 `2022-11-22 17:36:29`
 */
export interface FlowableEngineCategoryDeletePostResponse {}

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69092) 的 **请求配置的类型**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `POST /flowable-engine/category/delete`
 * @更新时间 `2022-11-22 17:36:29`
 */
type FlowableEngineCategoryDeletePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/category/delete',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69092) 的 **请求配置**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `POST /flowable-engine/category/delete`
 * @更新时间 `2022-11-22 17:36:29`
 */
const flowableEngineCategoryDeletePostRequestConfig: FlowableEngineCategoryDeletePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_0,
    devUrl: devUrl_0_1_0_0,
    prodUrl: prodUrl_0_1_0_0,
    path: '/flowable-engine/category/delete',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineCategoryDeletePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69092) 的 **请求函数**
 *
 * @分类 [流程分类↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22131)
 * @请求头 `POST /flowable-engine/category/delete`
 * @更新时间 `2022-11-22 17:36:29`
 */
export const flowableEngineCategoryDeletePost = /*#__PURE__*/ (
  requestData: FlowableEngineCategoryDeletePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineCategoryDeletePostResponse>(
    prepare(flowableEngineCategoryDeletePostRequestConfig, requestData),
    ...args
  );
};

flowableEngineCategoryDeletePost.requestConfig =
  flowableEngineCategoryDeletePostRequestConfig;

const mockUrl_0_1_0_1 = 'https://yapi.huianrong.com/mock/1722' as any;
const devUrl_0_1_0_1 = '' as any;
const prodUrl_0_1_0_1 = '' as any;
const dataKey_0_1_0_1 = 'data' as any;

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69094) 的 **请求类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/page`
 * @更新时间 `2022-12-23 11:21:37`
 */
export interface FlowableEngineDeploymentPageGetRequest {
  /**
   * 流程标识
   */
  key?: string;
  /**
   * 流程名称
   */
  name?: string;
  /**
   * 流程分类
   */
  category?: string;
  /**
   * 状态: active-激活,suspended-中止
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
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69094) 的 **返回类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/page`
 * @更新时间 `2022-12-23 11:21:37`
 */
export interface FlowableEngineDeploymentPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 流程id
     */
    id?: string;
    /**
     * 部署id
     */
    deploymentId?: string;
    /**
     * 流程标识
     */
    key?: string;
    /**
     * 流程名称
     */
    name?: string;
    /**
     * 流程分类
     */
    category?: string;
    /**
     * 版本
     */
    version?: number;
    /**
     * 状态: active-激活,suspended-中止
     */
    status?: string;
    /**
     * 部署时间
     */
    deploymentTime?: string;
  }[];
}

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69094) 的 **请求配置的类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/page`
 * @更新时间 `2022-12-23 11:21:37`
 */
type FlowableEngineDeploymentPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/deployment/page',
    'data',
    string,
    'key' | 'name' | 'category' | 'status' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69094) 的 **请求配置**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/page`
 * @更新时间 `2022-12-23 11:21:37`
 */
const flowableEngineDeploymentPageGetRequestConfig: FlowableEngineDeploymentPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: '/flowable-engine/deployment/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_1,
    paramNames: [],
    queryNames: ['key', 'name', 'category', 'status', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineDeploymentPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69094) 的 **请求函数**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/page`
 * @更新时间 `2022-12-23 11:21:37`
 */
export const flowableEngineDeploymentPageGet = /*#__PURE__*/ (
  requestData: FlowableEngineDeploymentPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineDeploymentPageGetResponse>(
    prepare(flowableEngineDeploymentPageGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineDeploymentPageGet.requestConfig =
  flowableEngineDeploymentPageGetRequestConfig;

/**
 * 接口 [部署分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69096) 的 **请求类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/page/publish`
 * @更新时间 `2022-12-23 11:21:38`
 */
export interface FlowableEngineDeploymentPagePublishGetRequest {
  /**
   * 流程标识
   */
  key?: string;
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
 * 接口 [部署分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69096) 的 **返回类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/page/publish`
 * @更新时间 `2022-12-23 11:21:38`
 */
export interface FlowableEngineDeploymentPagePublishGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 流程ID
     */
    id?: string;
    /**
     * 部署id
     */
    deploymentId?: string;
    /**
     * 流程标识
     */
    key?: string;
    /**
     * 流程名称
     */
    name?: string;
    /**
     * 流程分类
     */
    category?: string;
    /**
     * 版本
     */
    version?: number;
    /**
     * 状态: 1.激活,2.中止
     */
    status?: string;
  }[];
}

/**
 * 接口 [部署分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69096) 的 **请求配置的类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/page/publish`
 * @更新时间 `2022-12-23 11:21:38`
 */
type FlowableEngineDeploymentPagePublishGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/deployment/page/publish',
    'data',
    string,
    'key' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [部署分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69096) 的 **请求配置**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/page/publish`
 * @更新时间 `2022-12-23 11:21:38`
 */
const flowableEngineDeploymentPagePublishGetRequestConfig: FlowableEngineDeploymentPagePublishGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: '/flowable-engine/deployment/page/publish',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_1,
    paramNames: [],
    queryNames: ['key', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineDeploymentPagePublishGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [部署分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69096) 的 **请求函数**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/page/publish`
 * @更新时间 `2022-12-23 11:21:38`
 */
export const flowableEngineDeploymentPagePublishGet = /*#__PURE__*/ (
  requestData: FlowableEngineDeploymentPagePublishGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineDeploymentPagePublishGetResponse>(
    prepare(flowableEngineDeploymentPagePublishGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineDeploymentPagePublishGet.requestConfig =
  flowableEngineDeploymentPagePublishGetRequestConfig;

/**
 * 接口 [激活或挂起流程↗](https://yapi.huianrong.com/project/1722/interface/api/69098) 的 **请求类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `POST /flowable-engine/deployment/changeState`
 * @更新时间 `2022-12-23 11:21:38`
 */
export interface FlowableEngineDeploymentChangeStatePostRequest {
  /**
   * 流程ID
   */
  id: string;
  /**
   * 状态：active.激活,suspended.挂起
   */
  status: string;
}

/**
 * 接口 [激活或挂起流程↗](https://yapi.huianrong.com/project/1722/interface/api/69098) 的 **返回类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `POST /flowable-engine/deployment/changeState`
 * @更新时间 `2022-12-23 11:21:38`
 */
export type FlowableEngineDeploymentChangeStatePostResponse = null;

/**
 * 接口 [激活或挂起流程↗](https://yapi.huianrong.com/project/1722/interface/api/69098) 的 **请求配置的类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `POST /flowable-engine/deployment/changeState`
 * @更新时间 `2022-12-23 11:21:38`
 */
type FlowableEngineDeploymentChangeStatePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/deployment/changeState',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [激活或挂起流程↗](https://yapi.huianrong.com/project/1722/interface/api/69098) 的 **请求配置**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `POST /flowable-engine/deployment/changeState`
 * @更新时间 `2022-12-23 11:21:38`
 */
const flowableEngineDeploymentChangeStatePostRequestConfig: FlowableEngineDeploymentChangeStatePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: '/flowable-engine/deployment/changeState',
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
    requestFunctionName: 'flowableEngineDeploymentChangeStatePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [激活或挂起流程↗](https://yapi.huianrong.com/project/1722/interface/api/69098) 的 **请求函数**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `POST /flowable-engine/deployment/changeState`
 * @更新时间 `2022-12-23 11:21:38`
 */
export const flowableEngineDeploymentChangeStatePost = /*#__PURE__*/ (
  requestData: FlowableEngineDeploymentChangeStatePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineDeploymentChangeStatePostResponse>(
    prepare(flowableEngineDeploymentChangeStatePostRequestConfig, requestData),
    ...args
  );
};

flowableEngineDeploymentChangeStatePost.requestConfig =
  flowableEngineDeploymentChangeStatePostRequestConfig;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69100) 的 **请求类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `POST /flowable-engine/deployment/delete`
 * @更新时间 `2022-12-23 11:21:38`
 */
export interface FlowableEngineDeploymentDeletePostRequest {
  /**
   * 部署IDs
   */
  deployIds: string[];
}

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69100) 的 **返回类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `POST /flowable-engine/deployment/delete`
 * @更新时间 `2022-12-23 11:21:38`
 */
export type FlowableEngineDeploymentDeletePostResponse = null;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69100) 的 **请求配置的类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `POST /flowable-engine/deployment/delete`
 * @更新时间 `2022-12-23 11:21:38`
 */
type FlowableEngineDeploymentDeletePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/deployment/delete',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69100) 的 **请求配置**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `POST /flowable-engine/deployment/delete`
 * @更新时间 `2022-12-23 11:21:38`
 */
const flowableEngineDeploymentDeletePostRequestConfig: FlowableEngineDeploymentDeletePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: '/flowable-engine/deployment/delete',
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
    requestFunctionName: 'flowableEngineDeploymentDeletePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69100) 的 **请求函数**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `POST /flowable-engine/deployment/delete`
 * @更新时间 `2022-12-23 11:21:38`
 */
export const flowableEngineDeploymentDeletePost = /*#__PURE__*/ (
  requestData: FlowableEngineDeploymentDeletePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineDeploymentDeletePostResponse>(
    prepare(flowableEngineDeploymentDeletePostRequestConfig, requestData),
    ...args
  );
};

flowableEngineDeploymentDeletePost.requestConfig =
  flowableEngineDeploymentDeletePostRequestConfig;

/**
 * 接口 [bmpn↗](https://yapi.huianrong.com/project/1722/interface/api/69102) 的 **请求类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/bpmn/{processId}`
 * @更新时间 `2022-11-22 17:36:32`
 */
export interface FlowableEngineDeploymentBpmnProcessIdGetRequest {
  /**
   * 流程ID
   */
  processId: string;
}

/**
 * 接口 [bmpn↗](https://yapi.huianrong.com/project/1722/interface/api/69102) 的 **返回类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/bpmn/{processId}`
 * @更新时间 `2022-11-22 17:36:32`
 */
export type FlowableEngineDeploymentBpmnProcessIdGetResponse = string;

/**
 * 接口 [bmpn↗](https://yapi.huianrong.com/project/1722/interface/api/69102) 的 **请求配置的类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/bpmn/{processId}`
 * @更新时间 `2022-11-22 17:36:32`
 */
type FlowableEngineDeploymentBpmnProcessIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/deployment/bpmn/{processId}',
    'data',
    'processId',
    string,
    false
  >
>;

/**
 * 接口 [bmpn↗](https://yapi.huianrong.com/project/1722/interface/api/69102) 的 **请求配置**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/bpmn/{processId}`
 * @更新时间 `2022-11-22 17:36:32`
 */
const flowableEngineDeploymentBpmnProcessIdGetRequestConfig: FlowableEngineDeploymentBpmnProcessIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: '/flowable-engine/deployment/bpmn/{processId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_1,
    paramNames: ['processId'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineDeploymentBpmnProcessIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [bmpn↗](https://yapi.huianrong.com/project/1722/interface/api/69102) 的 **请求函数**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/bpmn/{processId}`
 * @更新时间 `2022-11-22 17:36:32`
 */
export const flowableEngineDeploymentBpmnProcessIdGet = /*#__PURE__*/ (
  requestData: FlowableEngineDeploymentBpmnProcessIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineDeploymentBpmnProcessIdGetResponse>(
    prepare(flowableEngineDeploymentBpmnProcessIdGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineDeploymentBpmnProcessIdGet.requestConfig =
  flowableEngineDeploymentBpmnProcessIdGetRequestConfig;

/**
 * 接口 [bmpn↗](https://yapi.huianrong.com/project/1722/interface/api/70216) 的 **请求类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/bpmn/{id}`
 * @更新时间 `2022-12-23 11:21:39`
 */
export interface FlowableEngineDeploymentBpmnIdGetRequest {
  /**
   * 流程ID
   */
  id: string;
}

/**
 * 接口 [bmpn↗](https://yapi.huianrong.com/project/1722/interface/api/70216) 的 **返回类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/bpmn/{id}`
 * @更新时间 `2022-12-23 11:21:39`
 */
export type FlowableEngineDeploymentBpmnIdGetResponse = string;

/**
 * 接口 [bmpn↗](https://yapi.huianrong.com/project/1722/interface/api/70216) 的 **请求配置的类型**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/bpmn/{id}`
 * @更新时间 `2022-12-23 11:21:39`
 */
type FlowableEngineDeploymentBpmnIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/deployment/bpmn/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [bmpn↗](https://yapi.huianrong.com/project/1722/interface/api/70216) 的 **请求配置**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/bpmn/{id}`
 * @更新时间 `2022-12-23 11:21:39`
 */
const flowableEngineDeploymentBpmnIdGetRequestConfig: FlowableEngineDeploymentBpmnIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_1,
    devUrl: devUrl_0_1_0_1,
    prodUrl: prodUrl_0_1_0_1,
    path: '/flowable-engine/deployment/bpmn/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_1,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineDeploymentBpmnIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [bmpn↗](https://yapi.huianrong.com/project/1722/interface/api/70216) 的 **请求函数**
 *
 * @分类 [部署管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22133)
 * @请求头 `GET /flowable-engine/deployment/bpmn/{id}`
 * @更新时间 `2022-12-23 11:21:39`
 */
export const flowableEngineDeploymentBpmnIdGet = /*#__PURE__*/ (
  requestData: FlowableEngineDeploymentBpmnIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineDeploymentBpmnIdGetResponse>(
    prepare(flowableEngineDeploymentBpmnIdGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineDeploymentBpmnIdGet.requestConfig =
  flowableEngineDeploymentBpmnIdGetRequestConfig;

const mockUrl_0_1_0_2 = 'https://yapi.huianrong.com/mock/1722' as any;
const devUrl_0_1_0_2 = '' as any;
const prodUrl_0_1_0_2 = '' as any;
const dataKey_0_1_0_2 = 'data' as any;

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69104) 的 **请求类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `GET /flowable-engine/form/page`
 * @更新时间 `2022-11-22 17:39:51`
 */
export interface FlowableEngineFormPageGetRequest {
  /**
   * 表单名称
   */
  name?: string;
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
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69104) 的 **返回类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `GET /flowable-engine/form/page`
 * @更新时间 `2022-11-22 17:39:51`
 */
export interface FlowableEngineFormPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * ID
     */
    id: number;
    /**
     * 表单名称
     */
    name: string;
    /**
     * 表单内容
     */
    content: string;
    /**
     * 备注
     */
    remark?: string;
  }[];
}

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69104) 的 **请求配置的类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `GET /flowable-engine/form/page`
 * @更新时间 `2022-11-22 17:39:51`
 */
type FlowableEngineFormPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/form/page',
    'data',
    string,
    'name' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69104) 的 **请求配置**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `GET /flowable-engine/form/page`
 * @更新时间 `2022-11-22 17:39:51`
 */
const flowableEngineFormPageGetRequestConfig: FlowableEngineFormPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_2,
    devUrl: devUrl_0_1_0_2,
    prodUrl: prodUrl_0_1_0_2,
    path: '/flowable-engine/form/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_2,
    paramNames: [],
    queryNames: ['name', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineFormPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69104) 的 **请求函数**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `GET /flowable-engine/form/page`
 * @更新时间 `2022-11-22 17:39:51`
 */
export const flowableEngineFormPageGet = /*#__PURE__*/ (
  requestData: FlowableEngineFormPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineFormPageGetResponse>(
    prepare(flowableEngineFormPageGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineFormPageGet.requestConfig =
  flowableEngineFormPageGetRequestConfig;

/**
 * 接口 [详细↗](https://yapi.huianrong.com/project/1722/interface/api/69106) 的 **请求类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `GET /flowable-engine/form/info/{id}`
 * @更新时间 `2022-11-22 17:39:52`
 */
export interface FlowableEngineFormInfoIdGetRequest {
  /**
   * 主键
   */
  id: string;
}

/**
 * 接口 [详细↗](https://yapi.huianrong.com/project/1722/interface/api/69106) 的 **返回类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `GET /flowable-engine/form/info/{id}`
 * @更新时间 `2022-11-22 17:39:52`
 */
export interface FlowableEngineFormInfoIdGetResponse {
  /**
   * ID
   */
  id: number;
  /**
   * 表单名称
   */
  name: string;
  /**
   * 表单内容
   */
  content: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [详细↗](https://yapi.huianrong.com/project/1722/interface/api/69106) 的 **请求配置的类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `GET /flowable-engine/form/info/{id}`
 * @更新时间 `2022-11-22 17:39:52`
 */
type FlowableEngineFormInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/form/info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [详细↗](https://yapi.huianrong.com/project/1722/interface/api/69106) 的 **请求配置**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `GET /flowable-engine/form/info/{id}`
 * @更新时间 `2022-11-22 17:39:52`
 */
const flowableEngineFormInfoIdGetRequestConfig: FlowableEngineFormInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_2,
    devUrl: devUrl_0_1_0_2,
    prodUrl: prodUrl_0_1_0_2,
    path: '/flowable-engine/form/info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_2,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineFormInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [详细↗](https://yapi.huianrong.com/project/1722/interface/api/69106) 的 **请求函数**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `GET /flowable-engine/form/info/{id}`
 * @更新时间 `2022-11-22 17:39:52`
 */
export const flowableEngineFormInfoIdGet = /*#__PURE__*/ (
  requestData: FlowableEngineFormInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineFormInfoIdGetResponse>(
    prepare(flowableEngineFormInfoIdGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineFormInfoIdGet.requestConfig =
  flowableEngineFormInfoIdGetRequestConfig;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69108) 的 **请求类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/add`
 * @更新时间 `2022-11-22 17:39:52`
 */
export interface FlowableEngineFormAddPostRequest {
  /**
   * 表单名称
   */
  name: string;
  /**
   * 表单内容
   */
  content: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69108) 的 **返回类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/add`
 * @更新时间 `2022-11-22 17:39:52`
 */
export interface FlowableEngineFormAddPostResponse {}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69108) 的 **请求配置的类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/add`
 * @更新时间 `2022-11-22 17:39:52`
 */
type FlowableEngineFormAddPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/form/add',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69108) 的 **请求配置**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/add`
 * @更新时间 `2022-11-22 17:39:52`
 */
const flowableEngineFormAddPostRequestConfig: FlowableEngineFormAddPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_2,
    devUrl: devUrl_0_1_0_2,
    prodUrl: prodUrl_0_1_0_2,
    path: '/flowable-engine/form/add',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_2,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineFormAddPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69108) 的 **请求函数**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/add`
 * @更新时间 `2022-11-22 17:39:52`
 */
export const flowableEngineFormAddPost = /*#__PURE__*/ (
  requestData: FlowableEngineFormAddPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineFormAddPostResponse>(
    prepare(flowableEngineFormAddPostRequestConfig, requestData),
    ...args
  );
};

flowableEngineFormAddPost.requestConfig =
  flowableEngineFormAddPostRequestConfig;

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/69110) 的 **请求类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/update`
 * @更新时间 `2022-11-22 17:39:52`
 */
export interface FlowableEngineFormUpdatePostRequest {
  /**
   * ID
   */
  id: number;
  /**
   * 表单名称
   */
  name: string;
  /**
   * 表单内容
   */
  content: string;
  /**
   * 备注
   */
  remark?: string;
}

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/69110) 的 **返回类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/update`
 * @更新时间 `2022-11-22 17:39:52`
 */
export interface FlowableEngineFormUpdatePostResponse {}

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/69110) 的 **请求配置的类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/update`
 * @更新时间 `2022-11-22 17:39:52`
 */
type FlowableEngineFormUpdatePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/form/update',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/69110) 的 **请求配置**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/update`
 * @更新时间 `2022-11-22 17:39:52`
 */
const flowableEngineFormUpdatePostRequestConfig: FlowableEngineFormUpdatePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_2,
    devUrl: devUrl_0_1_0_2,
    prodUrl: prodUrl_0_1_0_2,
    path: '/flowable-engine/form/update',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_2,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineFormUpdatePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/69110) 的 **请求函数**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/update`
 * @更新时间 `2022-11-22 17:39:52`
 */
export const flowableEngineFormUpdatePost = /*#__PURE__*/ (
  requestData: FlowableEngineFormUpdatePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineFormUpdatePostResponse>(
    prepare(flowableEngineFormUpdatePostRequestConfig, requestData),
    ...args
  );
};

flowableEngineFormUpdatePost.requestConfig =
  flowableEngineFormUpdatePostRequestConfig;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69112) 的 **请求类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/delete`
 * @更新时间 `2022-11-22 17:39:53`
 */
export interface FlowableEngineFormDeletePostRequest {
  /**
   * 表单IDs
   */
  ids: number[];
}

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69112) 的 **返回类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/delete`
 * @更新时间 `2022-11-22 17:39:53`
 */
export interface FlowableEngineFormDeletePostResponse {}

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69112) 的 **请求配置的类型**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/delete`
 * @更新时间 `2022-11-22 17:39:53`
 */
type FlowableEngineFormDeletePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/form/delete',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69112) 的 **请求配置**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/delete`
 * @更新时间 `2022-11-22 17:39:53`
 */
const flowableEngineFormDeletePostRequestConfig: FlowableEngineFormDeletePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_2,
    devUrl: devUrl_0_1_0_2,
    prodUrl: prodUrl_0_1_0_2,
    path: '/flowable-engine/form/delete',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_2,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineFormDeletePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69112) 的 **请求函数**
 *
 * @分类 [表单配置↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22135)
 * @请求头 `POST /flowable-engine/form/delete`
 * @更新时间 `2022-11-22 17:39:53`
 */
export const flowableEngineFormDeletePost = /*#__PURE__*/ (
  requestData: FlowableEngineFormDeletePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineFormDeletePostResponse>(
    prepare(flowableEngineFormDeletePostRequestConfig, requestData),
    ...args
  );
};

flowableEngineFormDeletePost.requestConfig =
  flowableEngineFormDeletePostRequestConfig;

const mockUrl_0_1_0_3 = 'https://yapi.huianrong.com/mock/1722' as any;
const devUrl_0_1_0_3 = '' as any;
const prodUrl_0_1_0_3 = '' as any;
const dataKey_0_1_0_3 = 'data' as any;

/**
 * 接口 [流程模型分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69170) 的 **请求类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/page`
 * @更新时间 `2022-12-24 15:50:50`
 */
export interface FlowableEngineModelPageGetRequest {
  /**
   * 流程分类
   */
  category?: string;
  /**
   * 流程KEY
   */
  key?: string;
  /**
   * 流程名称
   */
  name?: string;
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
 * 接口 [流程模型分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69170) 的 **返回类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/page`
 * @更新时间 `2022-12-24 15:50:50`
 */
export interface FlowableEngineModelPageGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 模型ID
     */
    id?: string;
    /**
     * 流程名称
     */
    name?: string;
    /**
     * 流程KEY
     */
    key?: string;
    /**
     * 流程分类
     */
    category?: string;
    /**
     * 版本
     */
    version?: number;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 描述
     */
    description?: string;
  }[];
}

/**
 * 接口 [流程模型分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69170) 的 **请求配置的类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/page`
 * @更新时间 `2022-12-24 15:50:50`
 */
type FlowableEngineModelPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/model/page',
    'data',
    string,
    'category' | 'key' | 'name' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [流程模型分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69170) 的 **请求配置**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/page`
 * @更新时间 `2022-12-24 15:50:50`
 */
const flowableEngineModelPageGetRequestConfig: FlowableEngineModelPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_3,
    devUrl: devUrl_0_1_0_3,
    prodUrl: prodUrl_0_1_0_3,
    path: '/flowable-engine/model/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_3,
    paramNames: [],
    queryNames: ['category', 'key', 'name', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineModelPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [流程模型分页列表↗](https://yapi.huianrong.com/project/1722/interface/api/69170) 的 **请求函数**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/page`
 * @更新时间 `2022-12-24 15:50:50`
 */
export const flowableEngineModelPageGet = /*#__PURE__*/ (
  requestData: FlowableEngineModelPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineModelPageGetResponse>(
    prepare(flowableEngineModelPageGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineModelPageGet.requestConfig =
  flowableEngineModelPageGetRequestConfig;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69172) 的 **请求类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/add`
 * @更新时间 `2022-12-24 15:50:50`
 */
export interface FlowableEngineModelAddPostRequest {
  /**
   * 流程名称
   */
  name: string;
  /**
   * 流程分类
   */
  category?: string;
  /**
   * 描述
   */
  description?: string;
}

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69172) 的 **返回类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/add`
 * @更新时间 `2022-12-24 15:50:50`
 */
export type FlowableEngineModelAddPostResponse = null;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69172) 的 **请求配置的类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/add`
 * @更新时间 `2022-12-24 15:50:50`
 */
type FlowableEngineModelAddPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/model/add',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69172) 的 **请求配置**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/add`
 * @更新时间 `2022-12-24 15:50:50`
 */
const flowableEngineModelAddPostRequestConfig: FlowableEngineModelAddPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_3,
    devUrl: devUrl_0_1_0_3,
    prodUrl: prodUrl_0_1_0_3,
    path: '/flowable-engine/model/add',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_3,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineModelAddPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [新增↗](https://yapi.huianrong.com/project/1722/interface/api/69172) 的 **请求函数**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/add`
 * @更新时间 `2022-12-24 15:50:50`
 */
export const flowableEngineModelAddPost = /*#__PURE__*/ (
  requestData: FlowableEngineModelAddPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineModelAddPostResponse>(
    prepare(flowableEngineModelAddPostRequestConfig, requestData),
    ...args
  );
};

flowableEngineModelAddPost.requestConfig =
  flowableEngineModelAddPostRequestConfig;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69174) 的 **请求类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `DELETE /flowable-engine/model/delete/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
export interface FlowableEngineModelDeleteIdDeleteRequest {
  id: string;
}

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69174) 的 **返回类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `DELETE /flowable-engine/model/delete/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
export type FlowableEngineModelDeleteIdDeleteResponse = null;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69174) 的 **请求配置的类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `DELETE /flowable-engine/model/delete/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
type FlowableEngineModelDeleteIdDeleteRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/model/delete/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69174) 的 **请求配置**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `DELETE /flowable-engine/model/delete/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
const flowableEngineModelDeleteIdDeleteRequestConfig: FlowableEngineModelDeleteIdDeleteRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_3,
    devUrl: devUrl_0_1_0_3,
    prodUrl: prodUrl_0_1_0_3,
    path: '/flowable-engine/model/delete/{id}',
    method: Method.DELETE,
    requestHeaders: {},
    requestBodyType: RequestBodyType.none,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_3,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineModelDeleteIdDelete',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/69174) 的 **请求函数**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `DELETE /flowable-engine/model/delete/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
export const flowableEngineModelDeleteIdDelete = /*#__PURE__*/ (
  requestData: FlowableEngineModelDeleteIdDeleteRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineModelDeleteIdDeleteResponse>(
    prepare(flowableEngineModelDeleteIdDeleteRequestConfig, requestData),
    ...args
  );
};

flowableEngineModelDeleteIdDelete.requestConfig =
  flowableEngineModelDeleteIdDeleteRequestConfig;

/**
 * 接口 [部署↗](https://yapi.huianrong.com/project/1722/interface/api/69176) 的 **请求类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/deploy/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
export interface FlowableEngineModelDeployIdGetRequest {
  id: string;
}

/**
 * 接口 [部署↗](https://yapi.huianrong.com/project/1722/interface/api/69176) 的 **返回类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/deploy/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
export type FlowableEngineModelDeployIdGetResponse = null;

/**
 * 接口 [部署↗](https://yapi.huianrong.com/project/1722/interface/api/69176) 的 **请求配置的类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/deploy/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
type FlowableEngineModelDeployIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/model/deploy/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [部署↗](https://yapi.huianrong.com/project/1722/interface/api/69176) 的 **请求配置**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/deploy/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
const flowableEngineModelDeployIdGetRequestConfig: FlowableEngineModelDeployIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_3,
    devUrl: devUrl_0_1_0_3,
    prodUrl: prodUrl_0_1_0_3,
    path: '/flowable-engine/model/deploy/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_3,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineModelDeployIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [部署↗](https://yapi.huianrong.com/project/1722/interface/api/69176) 的 **请求函数**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/deploy/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
export const flowableEngineModelDeployIdGet = /*#__PURE__*/ (
  requestData: FlowableEngineModelDeployIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineModelDeployIdGetResponse>(
    prepare(flowableEngineModelDeployIdGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineModelDeployIdGet.requestConfig =
  flowableEngineModelDeployIdGetRequestConfig;

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/69178) 的 **请求类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/bpmn/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
export interface FlowableEngineModelBpmnIdGetRequest {
  id: string;
}

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/69178) 的 **返回类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/bpmn/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
export type FlowableEngineModelBpmnIdGetResponse = string;

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/69178) 的 **请求配置的类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/bpmn/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
type FlowableEngineModelBpmnIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/model/bpmn/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/69178) 的 **请求配置**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/bpmn/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
const flowableEngineModelBpmnIdGetRequestConfig: FlowableEngineModelBpmnIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_3,
    devUrl: devUrl_0_1_0_3,
    prodUrl: prodUrl_0_1_0_3,
    path: '/flowable-engine/model/bpmn/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_3,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineModelBpmnIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/69178) 的 **请求函数**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/bpmn/{id}`
 * @更新时间 `2022-12-24 15:50:51`
 */
export const flowableEngineModelBpmnIdGet = /*#__PURE__*/ (
  requestData: FlowableEngineModelBpmnIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineModelBpmnIdGetResponse>(
    prepare(flowableEngineModelBpmnIdGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineModelBpmnIdGet.requestConfig =
  flowableEngineModelBpmnIdGetRequestConfig;

/**
 * 接口 [更新模型↗](https://yapi.huianrong.com/project/1722/interface/api/69180) 的 **请求类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/update`
 * @更新时间 `2022-12-24 15:50:52`
 */
export interface FlowableEngineModelUpdatePostRequest {
  /**
   * 模型ID
   */
  id: string;
  /**
   * 流程名称
   */
  name: string;
  /**
   * 流程分类
   */
  category?: string;
  /**
   * 描述
   */
  description?: string;
}

/**
 * 接口 [更新模型↗](https://yapi.huianrong.com/project/1722/interface/api/69180) 的 **返回类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/update`
 * @更新时间 `2022-12-24 15:50:52`
 */
export type FlowableEngineModelUpdatePostResponse = null;

/**
 * 接口 [更新模型↗](https://yapi.huianrong.com/project/1722/interface/api/69180) 的 **请求配置的类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/update`
 * @更新时间 `2022-12-24 15:50:52`
 */
type FlowableEngineModelUpdatePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/model/update',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [更新模型↗](https://yapi.huianrong.com/project/1722/interface/api/69180) 的 **请求配置**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/update`
 * @更新时间 `2022-12-24 15:50:52`
 */
const flowableEngineModelUpdatePostRequestConfig: FlowableEngineModelUpdatePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_3,
    devUrl: devUrl_0_1_0_3,
    prodUrl: prodUrl_0_1_0_3,
    path: '/flowable-engine/model/update',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_3,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineModelUpdatePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [更新模型↗](https://yapi.huianrong.com/project/1722/interface/api/69180) 的 **请求函数**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/update`
 * @更新时间 `2022-12-24 15:50:52`
 */
export const flowableEngineModelUpdatePost = /*#__PURE__*/ (
  requestData: FlowableEngineModelUpdatePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineModelUpdatePostResponse>(
    prepare(flowableEngineModelUpdatePostRequestConfig, requestData),
    ...args
  );
};

flowableEngineModelUpdatePost.requestConfig =
  flowableEngineModelUpdatePostRequestConfig;

/**
 * 接口 [保存bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/69182) 的 **请求类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/saveBpmn`
 * @更新时间 `2022-12-24 15:50:52`
 */
export interface FlowableEngineModelSaveBpmnPostRequest {
  /**
   * 模型ID
   */
  id: string;
  /**
   * bpmn.xml内容
   */
  xml: string;
  newVersion?: boolean;
}

/**
 * 接口 [保存bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/69182) 的 **返回类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/saveBpmn`
 * @更新时间 `2022-12-24 15:50:52`
 */
export type FlowableEngineModelSaveBpmnPostResponse = null;

/**
 * 接口 [保存bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/69182) 的 **请求配置的类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/saveBpmn`
 * @更新时间 `2022-12-24 15:50:52`
 */
type FlowableEngineModelSaveBpmnPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/model/saveBpmn',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [保存bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/69182) 的 **请求配置**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/saveBpmn`
 * @更新时间 `2022-12-24 15:50:52`
 */
const flowableEngineModelSaveBpmnPostRequestConfig: FlowableEngineModelSaveBpmnPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_3,
    devUrl: devUrl_0_1_0_3,
    prodUrl: prodUrl_0_1_0_3,
    path: '/flowable-engine/model/saveBpmn',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_3,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineModelSaveBpmnPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [保存bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/69182) 的 **请求函数**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `POST /flowable-engine/model/saveBpmn`
 * @更新时间 `2022-12-24 15:50:52`
 */
export const flowableEngineModelSaveBpmnPost = /*#__PURE__*/ (
  requestData: FlowableEngineModelSaveBpmnPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineModelSaveBpmnPostResponse>(
    prepare(flowableEngineModelSaveBpmnPostRequestConfig, requestData),
    ...args
  );
};

flowableEngineModelSaveBpmnPost.requestConfig =
  flowableEngineModelSaveBpmnPostRequestConfig;

/**
 * 接口 [历史版本↗](https://yapi.huianrong.com/project/1722/interface/api/69184) 的 **请求类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/page/historyVersion`
 * @更新时间 `2022-12-24 15:50:52`
 */
export interface FlowableEngineModelPageHistoryVersionGetRequest {
  /**
   * 模型ID
   */
  key?: string;
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
 * 接口 [历史版本↗](https://yapi.huianrong.com/project/1722/interface/api/69184) 的 **返回类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/page/historyVersion`
 * @更新时间 `2022-12-24 15:50:52`
 */
export interface FlowableEngineModelPageHistoryVersionGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 模型ID
     */
    id?: string;
    /**
     * 流程名称
     */
    name?: string;
    /**
     * 流程KEY
     */
    key?: string;
    /**
     * 流程分类
     */
    category?: string;
    /**
     * 版本
     */
    version?: number;
    /**
     * 创建时间
     */
    createTime?: string;
  }[];
}

/**
 * 接口 [历史版本↗](https://yapi.huianrong.com/project/1722/interface/api/69184) 的 **请求配置的类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/page/historyVersion`
 * @更新时间 `2022-12-24 15:50:52`
 */
type FlowableEngineModelPageHistoryVersionGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/model/page/historyVersion',
    'data',
    string,
    'key' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [历史版本↗](https://yapi.huianrong.com/project/1722/interface/api/69184) 的 **请求配置**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/page/historyVersion`
 * @更新时间 `2022-12-24 15:50:52`
 */
const flowableEngineModelPageHistoryVersionGetRequestConfig: FlowableEngineModelPageHistoryVersionGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_3,
    devUrl: devUrl_0_1_0_3,
    prodUrl: prodUrl_0_1_0_3,
    path: '/flowable-engine/model/page/historyVersion',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_3,
    paramNames: [],
    queryNames: ['key', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineModelPageHistoryVersionGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [历史版本↗](https://yapi.huianrong.com/project/1722/interface/api/69184) 的 **请求函数**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/page/historyVersion`
 * @更新时间 `2022-12-24 15:50:52`
 */
export const flowableEngineModelPageHistoryVersionGet = /*#__PURE__*/ (
  requestData: FlowableEngineModelPageHistoryVersionGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineModelPageHistoryVersionGetResponse>(
    prepare(flowableEngineModelPageHistoryVersionGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineModelPageHistoryVersionGet.requestConfig =
  flowableEngineModelPageHistoryVersionGetRequestConfig;

/**
 * 接口 [最新版本↗](https://yapi.huianrong.com/project/1722/interface/api/69186) 的 **请求类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/latest/{id}`
 * @更新时间 `2022-12-24 15:50:53`
 */
export interface FlowableEngineModelLatestIdGetRequest {
  id: string;
}

/**
 * 接口 [最新版本↗](https://yapi.huianrong.com/project/1722/interface/api/69186) 的 **返回类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/latest/{id}`
 * @更新时间 `2022-12-24 15:50:53`
 */
export type FlowableEngineModelLatestIdGetResponse = null;

/**
 * 接口 [最新版本↗](https://yapi.huianrong.com/project/1722/interface/api/69186) 的 **请求配置的类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/latest/{id}`
 * @更新时间 `2022-12-24 15:50:53`
 */
type FlowableEngineModelLatestIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/model/latest/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [最新版本↗](https://yapi.huianrong.com/project/1722/interface/api/69186) 的 **请求配置**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/latest/{id}`
 * @更新时间 `2022-12-24 15:50:53`
 */
const flowableEngineModelLatestIdGetRequestConfig: FlowableEngineModelLatestIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_3,
    devUrl: devUrl_0_1_0_3,
    prodUrl: prodUrl_0_1_0_3,
    path: '/flowable-engine/model/latest/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_3,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineModelLatestIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [最新版本↗](https://yapi.huianrong.com/project/1722/interface/api/69186) 的 **请求函数**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/latest/{id}`
 * @更新时间 `2022-12-24 15:50:53`
 */
export const flowableEngineModelLatestIdGet = /*#__PURE__*/ (
  requestData: FlowableEngineModelLatestIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineModelLatestIdGetResponse>(
    prepare(flowableEngineModelLatestIdGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineModelLatestIdGet.requestConfig =
  flowableEngineModelLatestIdGetRequestConfig;

/**
 * 接口 [流程模型列表↗](https://yapi.huianrong.com/project/1722/interface/api/70492) 的 **请求类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/list`
 * @更新时间 `2022-12-24 15:50:50`
 */
export interface FlowableEngineModelListGetRequest {}

/**
 * 接口 [流程模型列表↗](https://yapi.huianrong.com/project/1722/interface/api/70492) 的 **返回类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/list`
 * @更新时间 `2022-12-24 15:50:50`
 */
export type FlowableEngineModelListGetResponse = {
  /**
   * 模型ID
   */
  id?: string;
  /**
   * 流程名称
   */
  name?: string;
  /**
   * 流程KEY
   */
  key?: string;
  /**
   * 流程分类
   */
  category?: string;
  /**
   * 版本
   */
  version?: number;
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 描述
   */
  description?: string;
}[];

/**
 * 接口 [流程模型列表↗](https://yapi.huianrong.com/project/1722/interface/api/70492) 的 **请求配置的类型**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/list`
 * @更新时间 `2022-12-24 15:50:50`
 */
type FlowableEngineModelListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/model/list',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [流程模型列表↗](https://yapi.huianrong.com/project/1722/interface/api/70492) 的 **请求配置**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/list`
 * @更新时间 `2022-12-24 15:50:50`
 */
const flowableEngineModelListGetRequestConfig: FlowableEngineModelListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_3,
    devUrl: devUrl_0_1_0_3,
    prodUrl: prodUrl_0_1_0_3,
    path: '/flowable-engine/model/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_3,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineModelListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [流程模型列表↗](https://yapi.huianrong.com/project/1722/interface/api/70492) 的 **请求函数**
 *
 * @分类 [流程模型↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22145)
 * @请求头 `GET /flowable-engine/model/list`
 * @更新时间 `2022-12-24 15:50:50`
 */
export const flowableEngineModelListGet = /*#__PURE__*/ (
  requestData?: FlowableEngineModelListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineModelListGetResponse>(
    prepare(flowableEngineModelListGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineModelListGet.requestConfig =
  flowableEngineModelListGetRequestConfig;

const mockUrl_0_1_0_4 = 'https://yapi.huianrong.com/mock/1722' as any;
const devUrl_0_1_0_4 = '' as any;
const prodUrl_0_1_0_4 = '' as any;
const dataKey_0_1_0_4 = 'data' as any;

/**
 * 接口 [流程分类列表↗](https://yapi.huianrong.com/project/1722/interface/api/69230) 的 **请求类型**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/list/category`
 * @更新时间 `2023-01-03 18:44:12`
 */
export interface FlowableEngineCommonListCategoryGetRequest {}

/**
 * 接口 [流程分类列表↗](https://yapi.huianrong.com/project/1722/interface/api/69230) 的 **返回类型**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/list/category`
 * @更新时间 `2023-01-03 18:44:12`
 */
export type FlowableEngineCommonListCategoryGetResponse = {
  /**
   * 分类名称
   */
  name: string;
  /**
   * 分类编码
   */
  code: string;
}[];

/**
 * 接口 [流程分类列表↗](https://yapi.huianrong.com/project/1722/interface/api/69230) 的 **请求配置的类型**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/list/category`
 * @更新时间 `2023-01-03 18:44:12`
 */
type FlowableEngineCommonListCategoryGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/common/list/category',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [流程分类列表↗](https://yapi.huianrong.com/project/1722/interface/api/69230) 的 **请求配置**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/list/category`
 * @更新时间 `2023-01-03 18:44:12`
 */
const flowableEngineCommonListCategoryGetRequestConfig: FlowableEngineCommonListCategoryGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_4,
    devUrl: devUrl_0_1_0_4,
    prodUrl: prodUrl_0_1_0_4,
    path: '/flowable-engine/common/list/category',
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
    requestFunctionName: 'flowableEngineCommonListCategoryGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [流程分类列表↗](https://yapi.huianrong.com/project/1722/interface/api/69230) 的 **请求函数**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/list/category`
 * @更新时间 `2023-01-03 18:44:12`
 */
export const flowableEngineCommonListCategoryGet = /*#__PURE__*/ (
  requestData?: FlowableEngineCommonListCategoryGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineCommonListCategoryGetResponse>(
    prepare(flowableEngineCommonListCategoryGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineCommonListCategoryGet.requestConfig =
  flowableEngineCommonListCategoryGetRequestConfig;

/**
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70028) 的 **请求类型**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/project-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
export interface FlowableEngineCommonProjectSelectGetRequest {}

/**
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70028) 的 **返回类型**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/project-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
export type FlowableEngineCommonProjectSelectGetResponse = {
  /**
   * id / code
   */
  value?: string;
  /**
   * 名称
   */
  label?: string;
}[];

/**
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70028) 的 **请求配置的类型**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/project-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
type FlowableEngineCommonProjectSelectGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/common/project-select',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70028) 的 **请求配置**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/project-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
const flowableEngineCommonProjectSelectGetRequestConfig: FlowableEngineCommonProjectSelectGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_4,
    devUrl: devUrl_0_1_0_4,
    prodUrl: prodUrl_0_1_0_4,
    path: '/flowable-engine/common/project-select',
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
    requestFunctionName: 'flowableEngineCommonProjectSelectGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [项目下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70028) 的 **请求函数**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/project-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
export const flowableEngineCommonProjectSelectGet = /*#__PURE__*/ (
  requestData?: FlowableEngineCommonProjectSelectGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineCommonProjectSelectGetResponse>(
    prepare(flowableEngineCommonProjectSelectGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineCommonProjectSelectGet.requestConfig =
  flowableEngineCommonProjectSelectGetRequestConfig;

/**
 * 接口 [审批类型下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70256) 的 **请求类型**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/approval-type-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
export interface FlowableEngineCommonApprovalTypeSelectGetRequest {}

/**
 * 接口 [审批类型下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70256) 的 **返回类型**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/approval-type-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
export type FlowableEngineCommonApprovalTypeSelectGetResponse = {
  /**
   * id / code
   */
  value?: string;
  /**
   * 名称
   */
  label?: string;
}[];

/**
 * 接口 [审批类型下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70256) 的 **请求配置的类型**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/approval-type-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
type FlowableEngineCommonApprovalTypeSelectGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/common/approval-type-select',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [审批类型下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70256) 的 **请求配置**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/approval-type-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
const flowableEngineCommonApprovalTypeSelectGetRequestConfig: FlowableEngineCommonApprovalTypeSelectGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_4,
    devUrl: devUrl_0_1_0_4,
    prodUrl: prodUrl_0_1_0_4,
    path: '/flowable-engine/common/approval-type-select',
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
    requestFunctionName: 'flowableEngineCommonApprovalTypeSelectGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [审批类型下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70256) 的 **请求函数**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/approval-type-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
export const flowableEngineCommonApprovalTypeSelectGet = /*#__PURE__*/ (
  requestData?: FlowableEngineCommonApprovalTypeSelectGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineCommonApprovalTypeSelectGetResponse>(
    prepare(
      flowableEngineCommonApprovalTypeSelectGetRequestConfig,
      requestData
    ),
    ...args
  );
};

flowableEngineCommonApprovalTypeSelectGet.requestConfig =
  flowableEngineCommonApprovalTypeSelectGetRequestConfig;

/**
 * 接口 [触发功能下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70852) 的 **请求类型**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/function-type-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
export interface FlowableEngineCommonFunctionTypeSelectGetRequest {}

/**
 * 接口 [触发功能下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70852) 的 **返回类型**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/function-type-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
export type FlowableEngineCommonFunctionTypeSelectGetResponse = {
  /**
   * id / code
   */
  value?: number;
  /**
   * 名称
   */
  label?: string;
}[];

/**
 * 接口 [触发功能下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70852) 的 **请求配置的类型**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/function-type-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
type FlowableEngineCommonFunctionTypeSelectGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/common/function-type-select',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [触发功能下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70852) 的 **请求配置**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/function-type-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
const flowableEngineCommonFunctionTypeSelectGetRequestConfig: FlowableEngineCommonFunctionTypeSelectGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_4,
    devUrl: devUrl_0_1_0_4,
    prodUrl: prodUrl_0_1_0_4,
    path: '/flowable-engine/common/function-type-select',
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
    requestFunctionName: 'flowableEngineCommonFunctionTypeSelectGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [触发功能下拉↗](https://yapi.huianrong.com/project/1722/interface/api/70852) 的 **请求函数**
 *
 * @分类 [公共↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22153)
 * @请求头 `GET /flowable-engine/common/function-type-select`
 * @更新时间 `2023-01-03 18:44:13`
 */
export const flowableEngineCommonFunctionTypeSelectGet = /*#__PURE__*/ (
  requestData?: FlowableEngineCommonFunctionTypeSelectGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineCommonFunctionTypeSelectGetResponse>(
    prepare(
      flowableEngineCommonFunctionTypeSelectGetRequestConfig,
      requestData
    ),
    ...args
  );
};

flowableEngineCommonFunctionTypeSelectGet.requestConfig =
  flowableEngineCommonFunctionTypeSelectGetRequestConfig;

const mockUrl_0_1_0_5 = 'https://yapi.huianrong.com/mock/1722' as any;
const devUrl_0_1_0_5 = '' as any;
const prodUrl_0_1_0_5 = '' as any;
const dataKey_0_1_0_5 = 'data' as any;

/**
 * 接口 [获取部门树列表↗](https://yapi.huianrong.com/project/1722/interface/api/69996) 的 **请求类型**
 *
 * @分类 [部门↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22521)
 * @请求头 `GET /flowable-engine/dept/dept_tree`
 * @更新时间 `2022-12-22 17:17:44`
 */
export interface FlowableEngineDeptDeptTreeGetRequest {}

/**
 * 接口 [获取部门树列表↗](https://yapi.huianrong.com/project/1722/interface/api/69996) 的 **返回类型**
 *
 * @分类 [部门↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22521)
 * @请求头 `GET /flowable-engine/dept/dept_tree`
 * @更新时间 `2022-12-22 17:17:44`
 */
export type FlowableEngineDeptDeptTreeGetResponse = {
  /**
   * 部门id
   */
  id?: number;
  /**
   * 部门名称
   */
  label?: string;
  /**
   * 子部门
   */
  children?: {
    /**
     * 部门id
     */
    id?: number;
    /**
     * 部门名称
     */
    label?: string;
    /**
     * 子部门
     */
    children?: {}[];
    disabled?: boolean;
  }[];
  disabled?: boolean;
}[];

/**
 * 接口 [获取部门树列表↗](https://yapi.huianrong.com/project/1722/interface/api/69996) 的 **请求配置的类型**
 *
 * @分类 [部门↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22521)
 * @请求头 `GET /flowable-engine/dept/dept_tree`
 * @更新时间 `2022-12-22 17:17:44`
 */
type FlowableEngineDeptDeptTreeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/dept/dept_tree',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [获取部门树列表↗](https://yapi.huianrong.com/project/1722/interface/api/69996) 的 **请求配置**
 *
 * @分类 [部门↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22521)
 * @请求头 `GET /flowable-engine/dept/dept_tree`
 * @更新时间 `2022-12-22 17:17:44`
 */
const flowableEngineDeptDeptTreeGetRequestConfig: FlowableEngineDeptDeptTreeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_5,
    devUrl: devUrl_0_1_0_5,
    prodUrl: prodUrl_0_1_0_5,
    path: '/flowable-engine/dept/dept_tree',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_5,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineDeptDeptTreeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取部门树列表↗](https://yapi.huianrong.com/project/1722/interface/api/69996) 的 **请求函数**
 *
 * @分类 [部门↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22521)
 * @请求头 `GET /flowable-engine/dept/dept_tree`
 * @更新时间 `2022-12-22 17:17:44`
 */
export const flowableEngineDeptDeptTreeGet = /*#__PURE__*/ (
  requestData?: FlowableEngineDeptDeptTreeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineDeptDeptTreeGetResponse>(
    prepare(flowableEngineDeptDeptTreeGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineDeptDeptTreeGet.requestConfig =
  flowableEngineDeptDeptTreeGetRequestConfig;

const mockUrl_0_1_0_6 = 'https://yapi.huianrong.com/mock/1722' as any;
const devUrl_0_1_0_6 = '' as any;
const prodUrl_0_1_0_6 = '' as any;
const dataKey_0_1_0_6 = 'data' as any;

/**
 * 接口 [角色列表↗](https://yapi.huianrong.com/project/1722/interface/api/69998) 的 **请求类型**
 *
 * @分类 [角色↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22523)
 * @请求头 `GET /flowable-engine/role/list`
 * @更新时间 `2022-12-22 17:17:49`
 */
export interface FlowableEngineRoleListGetRequest {}

/**
 * 接口 [角色列表↗](https://yapi.huianrong.com/project/1722/interface/api/69998) 的 **返回类型**
 *
 * @分类 [角色↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22523)
 * @请求头 `GET /flowable-engine/role/list`
 * @更新时间 `2022-12-22 17:17:49`
 */
export type FlowableEngineRoleListGetResponse = {
  /**
   * 角色编号
   */
  roleCode?: string;
  /**
   * 角色名称
   */
  roleName?: string;
  /**
   * 权限标识
   */
  roleKey?: string;
}[];

/**
 * 接口 [角色列表↗](https://yapi.huianrong.com/project/1722/interface/api/69998) 的 **请求配置的类型**
 *
 * @分类 [角色↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22523)
 * @请求头 `GET /flowable-engine/role/list`
 * @更新时间 `2022-12-22 17:17:49`
 */
type FlowableEngineRoleListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/role/list',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [角色列表↗](https://yapi.huianrong.com/project/1722/interface/api/69998) 的 **请求配置**
 *
 * @分类 [角色↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22523)
 * @请求头 `GET /flowable-engine/role/list`
 * @更新时间 `2022-12-22 17:17:49`
 */
const flowableEngineRoleListGetRequestConfig: FlowableEngineRoleListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_6,
    devUrl: devUrl_0_1_0_6,
    prodUrl: prodUrl_0_1_0_6,
    path: '/flowable-engine/role/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_6,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineRoleListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [角色列表↗](https://yapi.huianrong.com/project/1722/interface/api/69998) 的 **请求函数**
 *
 * @分类 [角色↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22523)
 * @请求头 `GET /flowable-engine/role/list`
 * @更新时间 `2022-12-22 17:17:49`
 */
export const flowableEngineRoleListGet = /*#__PURE__*/ (
  requestData?: FlowableEngineRoleListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineRoleListGetResponse>(
    prepare(flowableEngineRoleListGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineRoleListGet.requestConfig =
  flowableEngineRoleListGetRequestConfig;

const mockUrl_0_1_0_7 = 'https://yapi.huianrong.com/mock/1722' as any;
const devUrl_0_1_0_7 = '' as any;
const prodUrl_0_1_0_7 = '' as any;
const dataKey_0_1_0_7 = 'data' as any;

/**
 * 接口 [用户列表↗](https://yapi.huianrong.com/project/1722/interface/api/70076) 的 **请求类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list`
 * @更新时间 `2022-12-26 17:33:29`
 */
export interface FlowableEngineUserListGetRequest {
  /**
   * 用户code
   */
  userCode?: string;
  /**
   * 用户名称
   */
  userName?: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 真实名称
   */
  realName?: string;
  /**
   * 部门ID
   */
  deptId?: string;
  /**
   * 手机号
   */
  phoneNumber?: string;
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
 * 接口 [用户列表↗](https://yapi.huianrong.com/project/1722/interface/api/70076) 的 **返回类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list`
 * @更新时间 `2022-12-26 17:33:29`
 */
export interface FlowableEngineUserListGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 用户名称
     */
    userName?: string;
    /**
     * 用户编号
     */
    userCode?: string;
    /**
     * 昵称
     */
    nickName?: string;
    /**
     * 真实名称
     */
    realName?: string;
    /**
     * 部门ID
     */
    deptId?: number;
    /**
     * 部门名称
     */
    deptName?: string;
    /**
     * 手机号
     */
    phoneNumber?: string;
    /**
     * 用户签名地址
     */
    signatureUrl?: string;
    /**
     * 用户角色信息
     */
    roles?: {
      /**
       * 角色编号
       */
      roleCode?: string;
      /**
       * 角色名称
       */
      roleName?: string;
      /**
       * 权限标识
       */
      roleKey?: string;
    }[];
  }[];
}

/**
 * 接口 [用户列表↗](https://yapi.huianrong.com/project/1722/interface/api/70076) 的 **请求配置的类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list`
 * @更新时间 `2022-12-26 17:33:29`
 */
type FlowableEngineUserListGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/user/list',
    'data',
    string,
    | 'userCode'
    | 'userName'
    | 'nickName'
    | 'realName'
    | 'deptId'
    | 'phoneNumber'
    | 'pageNum'
    | 'pageSize',
    false
  >
>;

/**
 * 接口 [用户列表↗](https://yapi.huianrong.com/project/1722/interface/api/70076) 的 **请求配置**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list`
 * @更新时间 `2022-12-26 17:33:29`
 */
const flowableEngineUserListGetRequestConfig: FlowableEngineUserListGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_7,
    devUrl: devUrl_0_1_0_7,
    prodUrl: prodUrl_0_1_0_7,
    path: '/flowable-engine/user/list',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_7,
    paramNames: [],
    queryNames: [
      'userCode',
      'userName',
      'nickName',
      'realName',
      'deptId',
      'phoneNumber',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineUserListGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [用户列表↗](https://yapi.huianrong.com/project/1722/interface/api/70076) 的 **请求函数**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list`
 * @更新时间 `2022-12-26 17:33:29`
 */
export const flowableEngineUserListGet = /*#__PURE__*/ (
  requestData: FlowableEngineUserListGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineUserListGetResponse>(
    prepare(flowableEngineUserListGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineUserListGet.requestConfig =
  flowableEngineUserListGetRequestConfig;

/**
 * 接口 [根据用户code查询用户↗](https://yapi.huianrong.com/project/1722/interface/api/70210) 的 **请求类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list/{use_code}`
 * @更新时间 `2022-12-22 17:19:38`
 */
export interface FlowableEngineUserListUseCodeGetRequest {
  use_code: string;
}

/**
 * 接口 [根据用户code查询用户↗](https://yapi.huianrong.com/project/1722/interface/api/70210) 的 **返回类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list/{use_code}`
 * @更新时间 `2022-12-22 17:19:38`
 */
export interface FlowableEngineUserListUseCodeGetResponse {
  /**
   * 用户名称
   */
  userName?: string;
  /**
   * 用户编号
   */
  userCode?: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 真实名称
   */
  realName?: string;
  /**
   * 部门ID
   */
  deptId?: number;
  /**
   * 用户名称
   */
  deptName?: string;
  /**
   * 手机号
   */
  phoneNumber?: string;
  /**
   * 用户角色信息
   */
  roles?: {
    /**
     * 角色编号
     */
    roleCode?: string;
    /**
     * 角色名称
     */
    roleName?: string;
    /**
     * 权限标识
     */
    roleKey?: string;
  }[];
}

/**
 * 接口 [根据用户code查询用户↗](https://yapi.huianrong.com/project/1722/interface/api/70210) 的 **请求配置的类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list/{use_code}`
 * @更新时间 `2022-12-22 17:19:38`
 */
type FlowableEngineUserListUseCodeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/user/list/{use_code}',
    'data',
    'use_code',
    string,
    false
  >
>;

/**
 * 接口 [根据用户code查询用户↗](https://yapi.huianrong.com/project/1722/interface/api/70210) 的 **请求配置**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list/{use_code}`
 * @更新时间 `2022-12-22 17:19:38`
 */
const flowableEngineUserListUseCodeGetRequestConfig: FlowableEngineUserListUseCodeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_7,
    devUrl: devUrl_0_1_0_7,
    prodUrl: prodUrl_0_1_0_7,
    path: '/flowable-engine/user/list/{use_code}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_7,
    paramNames: ['use_code'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineUserListUseCodeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [根据用户code查询用户↗](https://yapi.huianrong.com/project/1722/interface/api/70210) 的 **请求函数**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list/{use_code}`
 * @更新时间 `2022-12-22 17:19:38`
 */
export const flowableEngineUserListUseCodeGet = /*#__PURE__*/ (
  requestData: FlowableEngineUserListUseCodeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineUserListUseCodeGetResponse>(
    prepare(flowableEngineUserListUseCodeGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineUserListUseCodeGet.requestConfig =
  flowableEngineUserListUseCodeGetRequestConfig;

/**
 * 接口 [根据用户code查询用户↗](https://yapi.huianrong.com/project/1722/interface/api/70694) 的 **请求类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list/{user_code}`
 * @更新时间 `2022-12-26 17:33:29`
 */
export interface FlowableEngineUserListUserCodeGetRequest {
  user_code: string;
}

/**
 * 接口 [根据用户code查询用户↗](https://yapi.huianrong.com/project/1722/interface/api/70694) 的 **返回类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list/{user_code}`
 * @更新时间 `2022-12-26 17:33:29`
 */
export interface FlowableEngineUserListUserCodeGetResponse {
  /**
   * 用户名称
   */
  userName?: string;
  /**
   * 用户编号
   */
  userCode?: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 真实名称
   */
  realName?: string;
  /**
   * 部门ID
   */
  deptId?: number;
  /**
   * 部门名称
   */
  deptName?: string;
  /**
   * 手机号
   */
  phoneNumber?: string;
  /**
   * 用户签名地址
   */
  signatureUrl?: string;
  /**
   * 用户角色信息
   */
  roles?: {
    /**
     * 角色编号
     */
    roleCode?: string;
    /**
     * 角色名称
     */
    roleName?: string;
    /**
     * 权限标识
     */
    roleKey?: string;
  }[];
}

/**
 * 接口 [根据用户code查询用户↗](https://yapi.huianrong.com/project/1722/interface/api/70694) 的 **请求配置的类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list/{user_code}`
 * @更新时间 `2022-12-26 17:33:29`
 */
type FlowableEngineUserListUserCodeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/user/list/{user_code}',
    'data',
    'user_code',
    string,
    false
  >
>;

/**
 * 接口 [根据用户code查询用户↗](https://yapi.huianrong.com/project/1722/interface/api/70694) 的 **请求配置**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list/{user_code}`
 * @更新时间 `2022-12-26 17:33:29`
 */
const flowableEngineUserListUserCodeGetRequestConfig: FlowableEngineUserListUserCodeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_7,
    devUrl: devUrl_0_1_0_7,
    prodUrl: prodUrl_0_1_0_7,
    path: '/flowable-engine/user/list/{user_code}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_7,
    paramNames: ['user_code'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineUserListUserCodeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [根据用户code查询用户↗](https://yapi.huianrong.com/project/1722/interface/api/70694) 的 **请求函数**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list/{user_code}`
 * @更新时间 `2022-12-26 17:33:29`
 */
export const flowableEngineUserListUserCodeGet = /*#__PURE__*/ (
  requestData: FlowableEngineUserListUserCodeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineUserListUserCodeGetResponse>(
    prepare(flowableEngineUserListUserCodeGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineUserListUserCodeGet.requestConfig =
  flowableEngineUserListUserCodeGetRequestConfig;

/**
 * 接口 [根据用户code查询用户权限↗](https://yapi.huianrong.com/project/1722/interface/api/70696) 的 **请求类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/permission/{user_code}`
 * @更新时间 `2022-12-26 17:33:29`
 */
export interface FlowableEngineUserPermissionUserCodeGetRequest {
  user_code: string;
}

/**
 * 接口 [根据用户code查询用户权限↗](https://yapi.huianrong.com/project/1722/interface/api/70696) 的 **返回类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/permission/{user_code}`
 * @更新时间 `2022-12-26 17:33:29`
 */
export type FlowableEngineUserPermissionUserCodeGetResponse = string[];

/**
 * 接口 [根据用户code查询用户权限↗](https://yapi.huianrong.com/project/1722/interface/api/70696) 的 **请求配置的类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/permission/{user_code}`
 * @更新时间 `2022-12-26 17:33:29`
 */
type FlowableEngineUserPermissionUserCodeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/user/permission/{user_code}',
    'data',
    'user_code',
    string,
    false
  >
>;

/**
 * 接口 [根据用户code查询用户权限↗](https://yapi.huianrong.com/project/1722/interface/api/70696) 的 **请求配置**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/permission/{user_code}`
 * @更新时间 `2022-12-26 17:33:29`
 */
const flowableEngineUserPermissionUserCodeGetRequestConfig: FlowableEngineUserPermissionUserCodeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_7,
    devUrl: devUrl_0_1_0_7,
    prodUrl: prodUrl_0_1_0_7,
    path: '/flowable-engine/user/permission/{user_code}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_7,
    paramNames: ['user_code'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineUserPermissionUserCodeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [根据用户code查询用户权限↗](https://yapi.huianrong.com/project/1722/interface/api/70696) 的 **请求函数**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/permission/{user_code}`
 * @更新时间 `2022-12-26 17:33:29`
 */
export const flowableEngineUserPermissionUserCodeGet = /*#__PURE__*/ (
  requestData: FlowableEngineUserPermissionUserCodeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineUserPermissionUserCodeGetResponse>(
    prepare(flowableEngineUserPermissionUserCodeGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineUserPermissionUserCodeGet.requestConfig =
  flowableEngineUserPermissionUserCodeGetRequestConfig;

/**
 * 接口 [获取用路由↗](https://yapi.huianrong.com/project/1722/interface/api/70698) 的 **请求类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/router/{user_code}`
 * @更新时间 `2022-12-26 17:33:30`
 */
export interface FlowableEngineUserRouterUserCodeGetRequest {
  user_code: string;
}

/**
 * 接口 [获取用路由↗](https://yapi.huianrong.com/project/1722/interface/api/70698) 的 **返回类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/router/{user_code}`
 * @更新时间 `2022-12-26 17:33:30`
 */
export type FlowableEngineUserRouterUserCodeGetResponse = {
  /**
   * 当你一个路由下面的children声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
   */
  alwaysShow?: boolean;
  /**
   * 子路由
   */
  children?: {
    /**
     * 当你一个路由下面的children声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
     */
    alwaysShow?: boolean;
    /**
     * 子路由
     */
    children?: {}[];
    /**
     * 组件地址
     */
    component?: string;
    /**
     * 菜单分组,1:资产;2:商城;3:商户后台;4:POS后台;5:POS移动;
     */
    groupType?: number;
    /**
     * 是否隐藏路由，当设置true的时候该路由不会再侧边栏出现
     */
    hidden?: boolean;
    /**
     * 是否为外链（0是1否）
     */
    isFrame?: number;
    /**
     * 其他元素
     */
    meta?: {
      /**
       * 设置该路由的图标，对应路径srcassetsiconssvg
       */
      icon?: string;
      /**
       * 内链地址（http(s):开头）
       */
      link?: string;
      /**
       * 设置为true，则不会被<keep-alive>缓存
       */
      noCache?: boolean;
      /**
       * 设置该路由在侧边栏和面包屑中展示的名字
       */
      title?: string;
    };
    /**
     * 路由名字
     */
    name?: string;
    /**
     * 路由名字英文
     */
    nameEn?: string;
    /**
     * 路由地址
     */
    path?: string;
    /**
     * 重定向地址，当设置noRedirect的时候该路由在面包屑导航中不可被点击
     */
    redirect?: string;
    /**
     * 描述
     */
    remark?: string;
    /**
     * 路由参数：如{"id":1,"name":"ry"}
     */
    query?: string;
  }[];
  /**
   * 组件地址
   */
  component?: string;
  /**
   * 菜单分组,1:资产;2:商城;3:商户后台;4:POS后台;5:POS移动;
   */
  groupType?: number;
  /**
   * 是否隐藏路由，当设置true的时候该路由不会再侧边栏出现
   */
  hidden?: boolean;
  /**
   * 是否为外链（0是1否）
   */
  isFrame?: number;
  /**
   * 其他元素
   */
  meta?: {
    /**
     * 设置该路由的图标，对应路径srcassetsiconssvg
     */
    icon?: string;
    /**
     * 内链地址（http(s):开头）
     */
    link?: string;
    /**
     * 设置为true，则不会被<keep-alive>缓存
     */
    noCache?: boolean;
    /**
     * 设置该路由在侧边栏和面包屑中展示的名字
     */
    title?: string;
  };
  /**
   * 路由名字
   */
  name?: string;
  /**
   * 路由名字英文
   */
  nameEn?: string;
  /**
   * 路由地址
   */
  path?: string;
  /**
   * 重定向地址，当设置noRedirect的时候该路由在面包屑导航中不可被点击
   */
  redirect?: string;
  /**
   * 描述
   */
  remark?: string;
  /**
   * 路由参数：如{"id":1,"name":"ry"}
   */
  query?: string;
}[];

/**
 * 接口 [获取用路由↗](https://yapi.huianrong.com/project/1722/interface/api/70698) 的 **请求配置的类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/router/{user_code}`
 * @更新时间 `2022-12-26 17:33:30`
 */
type FlowableEngineUserRouterUserCodeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/user/router/{user_code}',
    'data',
    'user_code',
    string,
    false
  >
>;

/**
 * 接口 [获取用路由↗](https://yapi.huianrong.com/project/1722/interface/api/70698) 的 **请求配置**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/router/{user_code}`
 * @更新时间 `2022-12-26 17:33:30`
 */
const flowableEngineUserRouterUserCodeGetRequestConfig: FlowableEngineUserRouterUserCodeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_7,
    devUrl: devUrl_0_1_0_7,
    prodUrl: prodUrl_0_1_0_7,
    path: '/flowable-engine/user/router/{user_code}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_7,
    paramNames: ['user_code'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineUserRouterUserCodeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取用路由↗](https://yapi.huianrong.com/project/1722/interface/api/70698) 的 **请求函数**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/router/{user_code}`
 * @更新时间 `2022-12-26 17:33:30`
 */
export const flowableEngineUserRouterUserCodeGet = /*#__PURE__*/ (
  requestData: FlowableEngineUserRouterUserCodeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineUserRouterUserCodeGetResponse>(
    prepare(flowableEngineUserRouterUserCodeGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineUserRouterUserCodeGet.requestConfig =
  flowableEngineUserRouterUserCodeGetRequestConfig;

/**
 * 接口 [查询所有用户↗](https://yapi.huianrong.com/project/1722/interface/api/70700) 的 **请求类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list_all`
 * @更新时间 `2022-12-26 17:33:30`
 */
export interface FlowableEngineUserListAllGetRequest {}

/**
 * 接口 [查询所有用户↗](https://yapi.huianrong.com/project/1722/interface/api/70700) 的 **返回类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list_all`
 * @更新时间 `2022-12-26 17:33:30`
 */
export type FlowableEngineUserListAllGetResponse = {
  /**
   * 用户名称
   */
  userName?: string;
  /**
   * 用户编号
   */
  userCode?: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 真实名称
   */
  realName?: string;
  /**
   * 部门ID
   */
  deptId?: number;
  /**
   * 部门名称
   */
  deptName?: string;
  /**
   * 手机号
   */
  phoneNumber?: string;
  /**
   * 用户签名地址
   */
  signatureUrl?: string;
  /**
   * 用户角色信息
   */
  roles?: {
    /**
     * 角色编号
     */
    roleCode?: string;
    /**
     * 角色名称
     */
    roleName?: string;
    /**
     * 权限标识
     */
    roleKey?: string;
  }[];
}[];

/**
 * 接口 [查询所有用户↗](https://yapi.huianrong.com/project/1722/interface/api/70700) 的 **请求配置的类型**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list_all`
 * @更新时间 `2022-12-26 17:33:30`
 */
type FlowableEngineUserListAllGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/user/list_all',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [查询所有用户↗](https://yapi.huianrong.com/project/1722/interface/api/70700) 的 **请求配置**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list_all`
 * @更新时间 `2022-12-26 17:33:30`
 */
const flowableEngineUserListAllGetRequestConfig: FlowableEngineUserListAllGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_7,
    devUrl: devUrl_0_1_0_7,
    prodUrl: prodUrl_0_1_0_7,
    path: '/flowable-engine/user/list_all',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_7,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineUserListAllGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [查询所有用户↗](https://yapi.huianrong.com/project/1722/interface/api/70700) 的 **请求函数**
 *
 * @分类 [用户↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22525)
 * @请求头 `GET /flowable-engine/user/list_all`
 * @更新时间 `2022-12-26 17:33:30`
 */
export const flowableEngineUserListAllGet = /*#__PURE__*/ (
  requestData?: FlowableEngineUserListAllGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineUserListAllGetResponse>(
    prepare(flowableEngineUserListAllGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineUserListAllGet.requestConfig =
  flowableEngineUserListAllGetRequestConfig;

const mockUrl_0_1_0_8 = 'https://yapi.huianrong.com/mock/1722' as any;
const devUrl_0_1_0_8 = '' as any;
const prodUrl_0_1_0_8 = '' as any;
const dataKey_0_1_0_8 = 'data' as any;

/**
 * 接口 [取消↗](https://yapi.huianrong.com/project/1722/interface/api/70032) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/cancel`
 * @更新时间 `2023-02-24 15:25:55`
 */
export interface FlowableEngineInstanceTaskCancelPostRequest {
  /**
   * 流程实例Id
   */
  procInsId?: string;
}

/**
 * 接口 [取消↗](https://yapi.huianrong.com/project/1722/interface/api/70032) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/cancel`
 * @更新时间 `2023-02-24 15:25:55`
 */
export interface FlowableEngineInstanceTaskCancelPostResponse {}

/**
 * 接口 [取消↗](https://yapi.huianrong.com/project/1722/interface/api/70032) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/cancel`
 * @更新时间 `2023-02-24 15:25:55`
 */
type FlowableEngineInstanceTaskCancelPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/cancel',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [取消↗](https://yapi.huianrong.com/project/1722/interface/api/70032) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/cancel`
 * @更新时间 `2023-02-24 15:25:55`
 */
const flowableEngineInstanceTaskCancelPostRequestConfig: FlowableEngineInstanceTaskCancelPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/cancel',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskCancelPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [取消↗](https://yapi.huianrong.com/project/1722/interface/api/70032) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/cancel`
 * @更新时间 `2023-02-24 15:25:55`
 */
export const flowableEngineInstanceTaskCancelPost = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskCancelPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskCancelPostResponse>(
    prepare(flowableEngineInstanceTaskCancelPostRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstanceTaskCancelPost.requestConfig =
  flowableEngineInstanceTaskCancelPostRequestConfig;

/**
 * 接口 [撤回↗](https://yapi.huianrong.com/project/1722/interface/api/70034) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/revoke`
 * @更新时间 `2023-02-24 15:25:55`
 */
export interface FlowableEngineInstanceTaskRevokePostRequest {
  /**
   * 流程实例Id
   */
  procInsId?: string;
}

/**
 * 接口 [撤回↗](https://yapi.huianrong.com/project/1722/interface/api/70034) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/revoke`
 * @更新时间 `2023-02-24 15:25:55`
 */
export interface FlowableEngineInstanceTaskRevokePostResponse {}

/**
 * 接口 [撤回↗](https://yapi.huianrong.com/project/1722/interface/api/70034) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/revoke`
 * @更新时间 `2023-02-24 15:25:55`
 */
type FlowableEngineInstanceTaskRevokePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/revoke',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [撤回↗](https://yapi.huianrong.com/project/1722/interface/api/70034) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/revoke`
 * @更新时间 `2023-02-24 15:25:55`
 */
const flowableEngineInstanceTaskRevokePostRequestConfig: FlowableEngineInstanceTaskRevokePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/revoke',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskRevokePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [撤回↗](https://yapi.huianrong.com/project/1722/interface/api/70034) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/revoke`
 * @更新时间 `2023-02-24 15:25:55`
 */
export const flowableEngineInstanceTaskRevokePost = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskRevokePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskRevokePostResponse>(
    prepare(flowableEngineInstanceTaskRevokePostRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstanceTaskRevokePost.requestConfig =
  flowableEngineInstanceTaskRevokePostRequestConfig;

/**
 * 接口 [获取流程变量↗](https://yapi.huianrong.com/project/1722/interface/api/70036) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/processVariables/{taskId}`
 * @更新时间 `2023-02-24 15:25:56`
 */
export interface FlowableEngineInstanceTaskProcessVariablesTaskIdGetRequest {
  /**
   * 流程任务Id
   */
  taskId: string;
}

/**
 * 接口 [获取流程变量↗](https://yapi.huianrong.com/project/1722/interface/api/70036) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/processVariables/{taskId}`
 * @更新时间 `2023-02-24 15:25:56`
 */
export interface FlowableEngineInstanceTaskProcessVariablesTaskIdGetResponse {
  key?: {};
}

/**
 * 接口 [获取流程变量↗](https://yapi.huianrong.com/project/1722/interface/api/70036) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/processVariables/{taskId}`
 * @更新时间 `2023-02-24 15:25:56`
 */
type FlowableEngineInstanceTaskProcessVariablesTaskIdGetRequestConfig =
  Readonly<
    RequestConfig<
      'https://yapi.huianrong.com/mock/1722',
      '',
      '',
      '/flowable-engine/instance/task/processVariables/{taskId}',
      'data',
      'taskId',
      string,
      false
    >
  >;

/**
 * 接口 [获取流程变量↗](https://yapi.huianrong.com/project/1722/interface/api/70036) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/processVariables/{taskId}`
 * @更新时间 `2023-02-24 15:25:56`
 */
const flowableEngineInstanceTaskProcessVariablesTaskIdGetRequestConfig: FlowableEngineInstanceTaskProcessVariablesTaskIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/processVariables/{taskId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: ['taskId'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskProcessVariablesTaskIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取流程变量↗](https://yapi.huianrong.com/project/1722/interface/api/70036) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/processVariables/{taskId}`
 * @更新时间 `2023-02-24 15:25:56`
 */
export const flowableEngineInstanceTaskProcessVariablesTaskIdGet =
  /*#__PURE__*/ (
    requestData: FlowableEngineInstanceTaskProcessVariablesTaskIdGetRequest,
    ...args: UserRequestRestArgs
  ) => {
    return request<FlowableEngineInstanceTaskProcessVariablesTaskIdGetResponse>(
      prepare(
        flowableEngineInstanceTaskProcessVariablesTaskIdGetRequestConfig,
        requestData
      ),
      ...args
    );
  };

flowableEngineInstanceTaskProcessVariablesTaskIdGet.requestConfig =
  flowableEngineInstanceTaskProcessVariablesTaskIdGetRequestConfig;

/**
 * 接口 [审批↗](https://yapi.huianrong.com/project/1722/interface/api/70038) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/complete`
 * @更新时间 `2023-02-24 15:25:56`
 */
export interface FlowableEngineInstanceTaskCompletePostRequest {
  /**
   * 任务Id
   */
  taskId?: string;
  /**
   * 用户Ids
   */
  userIds?: string[];
  /**
   * 任务意见
   */
  comment?: string;
  /**
   * 流程实例Id
   */
  procInsId?: string;
  /**
   * 流程变量信息
   */
  variables?: {
    key?: {};
  };
  /**
   * 抄送用户Id
   */
  copyUserIds?: string;
}

/**
 * 接口 [审批↗](https://yapi.huianrong.com/project/1722/interface/api/70038) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/complete`
 * @更新时间 `2023-02-24 15:25:56`
 */
export interface FlowableEngineInstanceTaskCompletePostResponse {}

/**
 * 接口 [审批↗](https://yapi.huianrong.com/project/1722/interface/api/70038) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/complete`
 * @更新时间 `2023-02-24 15:25:56`
 */
type FlowableEngineInstanceTaskCompletePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/complete',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [审批↗](https://yapi.huianrong.com/project/1722/interface/api/70038) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/complete`
 * @更新时间 `2023-02-24 15:25:56`
 */
const flowableEngineInstanceTaskCompletePostRequestConfig: FlowableEngineInstanceTaskCompletePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/complete',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskCompletePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [审批↗](https://yapi.huianrong.com/project/1722/interface/api/70038) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/complete`
 * @更新时间 `2023-02-24 15:25:56`
 */
export const flowableEngineInstanceTaskCompletePost = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskCompletePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskCompletePostResponse>(
    prepare(flowableEngineInstanceTaskCompletePostRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstanceTaskCompletePost.requestConfig =
  flowableEngineInstanceTaskCompletePostRequestConfig;

/**
 * 接口 [拒绝↗](https://yapi.huianrong.com/project/1722/interface/api/70040) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/reject`
 * @更新时间 `2023-02-24 15:25:56`
 */
export interface FlowableEngineInstanceTaskRejectPostRequest {
  /**
   * 任务Id
   */
  taskId?: string;
  /**
   * 任务意见
   */
  comment?: string;
  /**
   * 流程实例Id
   */
  procInsId?: string;
  /**
   * 流程变量信息
   */
  variables?: {
    key?: {};
  };
  /**
   * 抄送用户Id
   */
  copyUserIds?: string;
}

/**
 * 接口 [拒绝↗](https://yapi.huianrong.com/project/1722/interface/api/70040) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/reject`
 * @更新时间 `2023-02-24 15:25:56`
 */
export interface FlowableEngineInstanceTaskRejectPostResponse {}

/**
 * 接口 [拒绝↗](https://yapi.huianrong.com/project/1722/interface/api/70040) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/reject`
 * @更新时间 `2023-02-24 15:25:56`
 */
type FlowableEngineInstanceTaskRejectPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/reject',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [拒绝↗](https://yapi.huianrong.com/project/1722/interface/api/70040) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/reject`
 * @更新时间 `2023-02-24 15:25:56`
 */
const flowableEngineInstanceTaskRejectPostRequestConfig: FlowableEngineInstanceTaskRejectPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/reject',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskRejectPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [拒绝↗](https://yapi.huianrong.com/project/1722/interface/api/70040) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/reject`
 * @更新时间 `2023-02-24 15:25:56`
 */
export const flowableEngineInstanceTaskRejectPost = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskRejectPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskRejectPostResponse>(
    prepare(flowableEngineInstanceTaskRejectPostRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstanceTaskRejectPost.requestConfig =
  flowableEngineInstanceTaskRejectPostRequestConfig;

/**
 * 接口 [退回↗](https://yapi.huianrong.com/project/1722/interface/api/70042) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/retreat`
 * @更新时间 `2023-02-24 15:25:57`
 */
export interface FlowableEngineInstanceTaskRetreatPostRequest {
  /**
   * 任务Id
   */
  taskId?: string;
  /**
   * 任务意见
   */
  comment?: string;
  /**
   * 节点
   */
  targetKey?: string;
  /**
   * 流程变量信息
   */
  variables?: {
    key?: {};
  };
  /**
   * 抄送用户Id
   */
  copyUserIds?: string;
}

/**
 * 接口 [退回↗](https://yapi.huianrong.com/project/1722/interface/api/70042) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/retreat`
 * @更新时间 `2023-02-24 15:25:57`
 */
export interface FlowableEngineInstanceTaskRetreatPostResponse {}

/**
 * 接口 [退回↗](https://yapi.huianrong.com/project/1722/interface/api/70042) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/retreat`
 * @更新时间 `2023-02-24 15:25:57`
 */
type FlowableEngineInstanceTaskRetreatPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/retreat',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [退回↗](https://yapi.huianrong.com/project/1722/interface/api/70042) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/retreat`
 * @更新时间 `2023-02-24 15:25:57`
 */
const flowableEngineInstanceTaskRetreatPostRequestConfig: FlowableEngineInstanceTaskRetreatPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/retreat',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskRetreatPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [退回↗](https://yapi.huianrong.com/project/1722/interface/api/70042) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/retreat`
 * @更新时间 `2023-02-24 15:25:57`
 */
export const flowableEngineInstanceTaskRetreatPost = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskRetreatPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskRetreatPostResponse>(
    prepare(flowableEngineInstanceTaskRetreatPostRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstanceTaskRetreatPost.requestConfig =
  flowableEngineInstanceTaskRetreatPostRequestConfig;

/**
 * 接口 [获取所有可回退的节点↗](https://yapi.huianrong.com/project/1722/interface/api/70044) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/list/retreatNode`
 * @更新时间 `2023-02-24 15:25:57`
 */
export interface FlowableEngineInstanceTaskListRetreatNodePostRequest {
  /**
   * 任务Id
   */
  taskId?: string;
  /**
   * 任务名称
   */
  taskName?: string;
  /**
   * 用户Id
   */
  userId?: string;
  /**
   * 任务意见
   */
  comment?: string;
  /**
   * 流程实例Id
   */
  procInsId?: string;
  /**
   * 节点
   */
  targetKey?: string;
  /**
   * 流程变量信息
   */
  variables?: {
    key?: {};
  };
  /**
   * 审批人
   */
  assignee?: string;
  /**
   * 候选人
   */
  candidateUsers?: string[];
  /**
   * 审批组
   */
  candidateGroups?: string[];
  /**
   * 抄送用户Id
   */
  copyUserIds?: string;
}

/**
 * 接口 [获取所有可回退的节点↗](https://yapi.huianrong.com/project/1722/interface/api/70044) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/list/retreatNode`
 * @更新时间 `2023-02-24 15:25:57`
 */
export interface FlowableEngineInstanceTaskListRetreatNodePostResponse {}

/**
 * 接口 [获取所有可回退的节点↗](https://yapi.huianrong.com/project/1722/interface/api/70044) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/list/retreatNode`
 * @更新时间 `2023-02-24 15:25:57`
 */
type FlowableEngineInstanceTaskListRetreatNodePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/list/retreatNode',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [获取所有可回退的节点↗](https://yapi.huianrong.com/project/1722/interface/api/70044) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/list/retreatNode`
 * @更新时间 `2023-02-24 15:25:57`
 */
const flowableEngineInstanceTaskListRetreatNodePostRequestConfig: FlowableEngineInstanceTaskListRetreatNodePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/list/retreatNode',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskListRetreatNodePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取所有可回退的节点↗](https://yapi.huianrong.com/project/1722/interface/api/70044) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/list/retreatNode`
 * @更新时间 `2023-02-24 15:25:57`
 */
export const flowableEngineInstanceTaskListRetreatNodePost = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskListRetreatNodePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskListRetreatNodePostResponse>(
    prepare(
      flowableEngineInstanceTaskListRetreatNodePostRequestConfig,
      requestData
    ),
    ...args
  );
};

flowableEngineInstanceTaskListRetreatNodePost.requestConfig =
  flowableEngineInstanceTaskListRetreatNodePostRequestConfig;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/70046) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `DELETE /flowable-engine/instance/task/delete`
 * @更新时间 `2023-02-24 15:25:57`
 */
export interface FlowableEngineInstanceTaskDeleteDeleteRequest {
  /**
   * 任务Id
   */
  taskId?: string;
  /**
   * 任务意见
   */
  comment?: string;
  /**
   * 抄送用户Id
   */
  copyUserIds?: string;
}

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/70046) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `DELETE /flowable-engine/instance/task/delete`
 * @更新时间 `2023-02-24 15:25:57`
 */
export interface FlowableEngineInstanceTaskDeleteDeleteResponse {}

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/70046) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `DELETE /flowable-engine/instance/task/delete`
 * @更新时间 `2023-02-24 15:25:57`
 */
type FlowableEngineInstanceTaskDeleteDeleteRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/delete',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/70046) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `DELETE /flowable-engine/instance/task/delete`
 * @更新时间 `2023-02-24 15:25:57`
 */
const flowableEngineInstanceTaskDeleteDeleteRequestConfig: FlowableEngineInstanceTaskDeleteDeleteRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/delete',
    method: Method.DELETE,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskDeleteDelete',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [删除↗](https://yapi.huianrong.com/project/1722/interface/api/70046) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `DELETE /flowable-engine/instance/task/delete`
 * @更新时间 `2023-02-24 15:25:57`
 */
export const flowableEngineInstanceTaskDeleteDelete = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskDeleteDeleteRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskDeleteDeleteResponse>(
    prepare(flowableEngineInstanceTaskDeleteDeleteRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstanceTaskDeleteDelete.requestConfig =
  flowableEngineInstanceTaskDeleteDeleteRequestConfig;

/**
 * 接口 [认领\/签收↗](https://yapi.huianrong.com/project/1722/interface/api/70048) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/claim`
 * @更新时间 `2023-02-24 15:25:58`
 */
export interface FlowableEngineInstanceTaskClaimPostRequest {
  /**
   * 任务Id
   */
  taskId?: string;
  /**
   * 流程变量信息
   */
  variables?: {
    key?: {};
  };
  /**
   * 抄送用户Id
   */
  copyUserIds?: string;
}

/**
 * 接口 [认领\/签收↗](https://yapi.huianrong.com/project/1722/interface/api/70048) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/claim`
 * @更新时间 `2023-02-24 15:25:58`
 */
export interface FlowableEngineInstanceTaskClaimPostResponse {}

/**
 * 接口 [认领\/签收↗](https://yapi.huianrong.com/project/1722/interface/api/70048) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/claim`
 * @更新时间 `2023-02-24 15:25:58`
 */
type FlowableEngineInstanceTaskClaimPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/claim',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [认领\/签收↗](https://yapi.huianrong.com/project/1722/interface/api/70048) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/claim`
 * @更新时间 `2023-02-24 15:25:58`
 */
const flowableEngineInstanceTaskClaimPostRequestConfig: FlowableEngineInstanceTaskClaimPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/claim',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskClaimPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [认领\/签收↗](https://yapi.huianrong.com/project/1722/interface/api/70048) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/claim`
 * @更新时间 `2023-02-24 15:25:58`
 */
export const flowableEngineInstanceTaskClaimPost = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskClaimPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskClaimPostResponse>(
    prepare(flowableEngineInstanceTaskClaimPostRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstanceTaskClaimPost.requestConfig =
  flowableEngineInstanceTaskClaimPostRequestConfig;

/**
 * 接口 [取消认领\/签收任务↗](https://yapi.huianrong.com/project/1722/interface/api/70050) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/cancelClaim`
 * @更新时间 `2023-02-24 15:25:59`
 */
export interface FlowableEngineInstanceTaskCancelClaimPostRequest {
  /**
   * 任务Id
   */
  taskId?: string;
  /**
   * 任务意见
   */
  comment?: string;
  /**
   * 流程实例Id
   */
  procInsId?: string;
  /**
   * 流程变量信息
   */
  variables?: {
    key?: {};
  };
  /**
   * 抄送用户Id
   */
  copyUserIds?: string;
}

/**
 * 接口 [取消认领\/签收任务↗](https://yapi.huianrong.com/project/1722/interface/api/70050) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/cancelClaim`
 * @更新时间 `2023-02-24 15:25:59`
 */
export interface FlowableEngineInstanceTaskCancelClaimPostResponse {}

/**
 * 接口 [取消认领\/签收任务↗](https://yapi.huianrong.com/project/1722/interface/api/70050) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/cancelClaim`
 * @更新时间 `2023-02-24 15:25:59`
 */
type FlowableEngineInstanceTaskCancelClaimPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/cancelClaim',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [取消认领\/签收任务↗](https://yapi.huianrong.com/project/1722/interface/api/70050) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/cancelClaim`
 * @更新时间 `2023-02-24 15:25:59`
 */
const flowableEngineInstanceTaskCancelClaimPostRequestConfig: FlowableEngineInstanceTaskCancelClaimPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/cancelClaim',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskCancelClaimPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [取消认领\/签收任务↗](https://yapi.huianrong.com/project/1722/interface/api/70050) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/cancelClaim`
 * @更新时间 `2023-02-24 15:25:59`
 */
export const flowableEngineInstanceTaskCancelClaimPost = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskCancelClaimPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskCancelClaimPostResponse>(
    prepare(
      flowableEngineInstanceTaskCancelClaimPostRequestConfig,
      requestData
    ),
    ...args
  );
};

flowableEngineInstanceTaskCancelClaimPost.requestConfig =
  flowableEngineInstanceTaskCancelClaimPostRequestConfig;

/**
 * 接口 [委派↗](https://yapi.huianrong.com/project/1722/interface/api/70052) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/delegate`
 * @更新时间 `2023-02-24 15:25:59`
 */
export interface FlowableEngineInstanceTaskDelegatePostRequest {
  /**
   * 任务Id
   */
  taskId?: string;
  /**
   * 用户Id
   */
  userId?: string;
  /**
   * 任务意见
   */
  comment?: string;
  /**
   * 流程变量信息
   */
  variables?: {
    key?: {};
  };
  /**
   * 抄送用户Id
   */
  copyUserIds?: string;
}

/**
 * 接口 [委派↗](https://yapi.huianrong.com/project/1722/interface/api/70052) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/delegate`
 * @更新时间 `2023-02-24 15:25:59`
 */
export interface FlowableEngineInstanceTaskDelegatePostResponse {}

/**
 * 接口 [委派↗](https://yapi.huianrong.com/project/1722/interface/api/70052) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/delegate`
 * @更新时间 `2023-02-24 15:25:59`
 */
type FlowableEngineInstanceTaskDelegatePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/delegate',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [委派↗](https://yapi.huianrong.com/project/1722/interface/api/70052) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/delegate`
 * @更新时间 `2023-02-24 15:25:59`
 */
const flowableEngineInstanceTaskDelegatePostRequestConfig: FlowableEngineInstanceTaskDelegatePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/delegate',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskDelegatePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [委派↗](https://yapi.huianrong.com/project/1722/interface/api/70052) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/delegate`
 * @更新时间 `2023-02-24 15:25:59`
 */
export const flowableEngineInstanceTaskDelegatePost = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskDelegatePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskDelegatePostResponse>(
    prepare(flowableEngineInstanceTaskDelegatePostRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstanceTaskDelegatePost.requestConfig =
  flowableEngineInstanceTaskDelegatePostRequestConfig;

/**
 * 接口 [转办任务↗](https://yapi.huianrong.com/project/1722/interface/api/70054) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/transfer`
 * @更新时间 `2023-02-24 15:25:59`
 */
export interface FlowableEngineInstanceTaskTransferPostRequest {
  /**
   * 任务Id
   */
  taskId?: string;
  /**
   * 用户Id
   */
  userId?: string;
  /**
   * 任务意见
   */
  comment?: string;
  /**
   * 流程变量信息
   */
  variables?: {
    key?: {};
  };
  /**
   * 抄送用户Id
   */
  copyUserIds?: string;
}

/**
 * 接口 [转办任务↗](https://yapi.huianrong.com/project/1722/interface/api/70054) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/transfer`
 * @更新时间 `2023-02-24 15:25:59`
 */
export interface FlowableEngineInstanceTaskTransferPostResponse {}

/**
 * 接口 [转办任务↗](https://yapi.huianrong.com/project/1722/interface/api/70054) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/transfer`
 * @更新时间 `2023-02-24 15:25:59`
 */
type FlowableEngineInstanceTaskTransferPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/transfer',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [转办任务↗](https://yapi.huianrong.com/project/1722/interface/api/70054) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/transfer`
 * @更新时间 `2023-02-24 15:25:59`
 */
const flowableEngineInstanceTaskTransferPostRequestConfig: FlowableEngineInstanceTaskTransferPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/transfer',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskTransferPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [转办任务↗](https://yapi.huianrong.com/project/1722/interface/api/70054) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/transfer`
 * @更新时间 `2023-02-24 15:25:59`
 */
export const flowableEngineInstanceTaskTransferPost = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskTransferPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskTransferPostResponse>(
    prepare(flowableEngineInstanceTaskTransferPostRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstanceTaskTransferPost.requestConfig =
  flowableEngineInstanceTaskTransferPostRequestConfig;

/**
 * 接口 [下一节点↗](https://yapi.huianrong.com/project/1722/interface/api/70056) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/nextNode`
 * @更新时间 `2023-02-24 15:26:00`
 */
export interface FlowableEngineInstanceTaskNextNodePostRequest {
  /**
   * 任务Id
   */
  taskId?: string;
  /**
   * 任务意见
   */
  comment?: string;
  /**
   * 流程实例Id
   */
  procInsId?: string;
  /**
   * 节点
   */
  targetKey?: string;
  /**
   * 流程变量信息
   */
  variables?: {
    key?: {};
  };
  /**
   * 抄送用户Id
   */
  copyUserIds?: string;
}

/**
 * 接口 [下一节点↗](https://yapi.huianrong.com/project/1722/interface/api/70056) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/nextNode`
 * @更新时间 `2023-02-24 15:26:00`
 */
export interface FlowableEngineInstanceTaskNextNodePostResponse {
  /**
   * 节点类型
   */
  type?: string;
  /**
   * 环境变量
   */
  variables?: string;
  /**
   * 用户列表
   */
  userList?: {
    /**
     * 用户名称
     */
    userName?: string;
    /**
     * 用户编号
     */
    userCode?: string;
    /**
     * 昵称
     */
    nickName?: string;
    /**
     * 真实名称
     */
    realName?: string;
    /**
     * 部门ID
     */
    deptId?: number;
    /**
     * 部门名称
     */
    deptName?: string;
    /**
     * 手机号
     */
    phoneNumber?: string;
    /**
     * 用户签名地址
     */
    signatureUrl?: string;
    /**
     * 用户角色信息
     */
    roles?: {
      /**
       * 角色编号
       */
      roleCode?: string;
      /**
       * 角色名称
       */
      roleName?: string;
      /**
       * 权限标识
       */
      roleKey?: string;
    }[];
  }[];
  /**
   * 角色列表
   */
  roleList?: {
    /**
     * 角色编号
     */
    roleCode?: string;
    /**
     * 角色名称
     */
    roleName?: string;
    /**
     * 权限标识
     */
    roleKey?: string;
  }[];
}

/**
 * 接口 [下一节点↗](https://yapi.huianrong.com/project/1722/interface/api/70056) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/nextNode`
 * @更新时间 `2023-02-24 15:26:00`
 */
type FlowableEngineInstanceTaskNextNodePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/nextNode',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [下一节点↗](https://yapi.huianrong.com/project/1722/interface/api/70056) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/nextNode`
 * @更新时间 `2023-02-24 15:26:00`
 */
const flowableEngineInstanceTaskNextNodePostRequestConfig: FlowableEngineInstanceTaskNextNodePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/nextNode',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskNextNodePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [下一节点↗](https://yapi.huianrong.com/project/1722/interface/api/70056) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/nextNode`
 * @更新时间 `2023-02-24 15:26:00`
 */
export const flowableEngineInstanceTaskNextNodePost = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskNextNodePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskNextNodePostResponse>(
    prepare(flowableEngineInstanceTaskNextNodePostRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstanceTaskNextNodePost.requestConfig =
  flowableEngineInstanceTaskNextNodePostRequestConfig;

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/70058) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/bpmn/{id}`
 * @更新时间 `2023-02-24 15:26:00`
 */
export interface FlowableEngineInstanceTaskBpmnIdGetRequest {
  id: string;
}

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/70058) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/bpmn/{id}`
 * @更新时间 `2023-02-24 15:26:00`
 */
export type FlowableEngineInstanceTaskBpmnIdGetResponse = string;

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/70058) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/bpmn/{id}`
 * @更新时间 `2023-02-24 15:26:00`
 */
type FlowableEngineInstanceTaskBpmnIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/bpmn/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/70058) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/bpmn/{id}`
 * @更新时间 `2023-02-24 15:26:00`
 */
const flowableEngineInstanceTaskBpmnIdGetRequestConfig: FlowableEngineInstanceTaskBpmnIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/bpmn/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskBpmnIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/70058) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/bpmn/{id}`
 * @更新时间 `2023-02-24 15:26:00`
 */
export const flowableEngineInstanceTaskBpmnIdGet = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskBpmnIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskBpmnIdGetResponse>(
    prepare(flowableEngineInstanceTaskBpmnIdGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstanceTaskBpmnIdGet.requestConfig =
  flowableEngineInstanceTaskBpmnIdGetRequestConfig;

/**
 * 接口 [生成流程图↗](https://yapi.huianrong.com/project/1722/interface/api/71306) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/diagram/{processId}`
 * @更新时间 `2023-02-24 15:26:01`
 */
export interface FlowableEngineInstanceTaskDiagramProcessIdGetRequest {
  /**
   * 任务ID
   */
  processId: string;
}

/**
 * 接口 [生成流程图↗](https://yapi.huianrong.com/project/1722/interface/api/71306) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/diagram/{processId}`
 * @更新时间 `2023-02-24 15:26:01`
 */
export interface FlowableEngineInstanceTaskDiagramProcessIdGetResponse {}

/**
 * 接口 [生成流程图↗](https://yapi.huianrong.com/project/1722/interface/api/71306) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/diagram/{processId}`
 * @更新时间 `2023-02-24 15:26:01`
 */
type FlowableEngineInstanceTaskDiagramProcessIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/diagram/{processId}',
    'data',
    'processId',
    string,
    false
  >
>;

/**
 * 接口 [生成流程图↗](https://yapi.huianrong.com/project/1722/interface/api/71306) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/diagram/{processId}`
 * @更新时间 `2023-02-24 15:26:01`
 */
const flowableEngineInstanceTaskDiagramProcessIdGetRequestConfig: FlowableEngineInstanceTaskDiagramProcessIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/diagram/{processId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: ['processId'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskDiagramProcessIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [生成流程图↗](https://yapi.huianrong.com/project/1722/interface/api/71306) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/diagram/{processId}`
 * @更新时间 `2023-02-24 15:26:01`
 */
export const flowableEngineInstanceTaskDiagramProcessIdGet = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskDiagramProcessIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskDiagramProcessIdGetResponse>(
    prepare(
      flowableEngineInstanceTaskDiagramProcessIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

flowableEngineInstanceTaskDiagramProcessIdGet.requestConfig =
  flowableEngineInstanceTaskDiagramProcessIdGetRequestConfig;

/**
 * 接口 [任务用户（加签，转签）↗](https://yapi.huianrong.com/project/1722/interface/api/71308) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/select/user/{taskId}`
 * @更新时间 `2023-02-24 15:26:01`
 */
export interface FlowableEngineInstanceTaskSelectUserTaskIdGetRequest {
  taskId: string;
}

/**
 * 接口 [任务用户（加签，转签）↗](https://yapi.huianrong.com/project/1722/interface/api/71308) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/select/user/{taskId}`
 * @更新时间 `2023-02-24 15:26:01`
 */
export type FlowableEngineInstanceTaskSelectUserTaskIdGetResponse = {
  /**
   * 用户编号
   */
  userCode?: string;
  /**
   * 用户名
   */
  username?: string;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 部门名字
   */
  deptName?: string;
  /**
   * 角色名
   */
  roleName?: string;
  /**
   * 手机号
   */
  phone?: string;
}[];

/**
 * 接口 [任务用户（加签，转签）↗](https://yapi.huianrong.com/project/1722/interface/api/71308) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/select/user/{taskId}`
 * @更新时间 `2023-02-24 15:26:01`
 */
type FlowableEngineInstanceTaskSelectUserTaskIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/select/user/{taskId}',
    'data',
    'taskId',
    string,
    false
  >
>;

/**
 * 接口 [任务用户（加签，转签）↗](https://yapi.huianrong.com/project/1722/interface/api/71308) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/select/user/{taskId}`
 * @更新时间 `2023-02-24 15:26:01`
 */
const flowableEngineInstanceTaskSelectUserTaskIdGetRequestConfig: FlowableEngineInstanceTaskSelectUserTaskIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/select/user/{taskId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: ['taskId'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskSelectUserTaskIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [任务用户（加签，转签）↗](https://yapi.huianrong.com/project/1722/interface/api/71308) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `GET /flowable-engine/instance/task/select/user/{taskId}`
 * @更新时间 `2023-02-24 15:26:01`
 */
export const flowableEngineInstanceTaskSelectUserTaskIdGet = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskSelectUserTaskIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskSelectUserTaskIdGetResponse>(
    prepare(
      flowableEngineInstanceTaskSelectUserTaskIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

flowableEngineInstanceTaskSelectUserTaskIdGet.requestConfig =
  flowableEngineInstanceTaskSelectUserTaskIdGetRequestConfig;

/**
 * 接口 [加签任务↗](https://yapi.huianrong.com/project/1722/interface/api/72344) 的 **请求类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/sign`
 * @更新时间 `2023-02-24 15:26:00`
 */
export interface FlowableEngineInstanceTaskSignPostRequest {
  /**
   * 任务Id
   */
  taskId?: string;
  /**
   * 被加签用户Ids
   */
  userIds?: string[];
  /**
   * 任务意见
   */
  comment?: string;
}

/**
 * 接口 [加签任务↗](https://yapi.huianrong.com/project/1722/interface/api/72344) 的 **返回类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/sign`
 * @更新时间 `2023-02-24 15:26:00`
 */
export interface FlowableEngineInstanceTaskSignPostResponse {}

/**
 * 接口 [加签任务↗](https://yapi.huianrong.com/project/1722/interface/api/72344) 的 **请求配置的类型**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/sign`
 * @更新时间 `2023-02-24 15:26:00`
 */
type FlowableEngineInstanceTaskSignPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/task/sign',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [加签任务↗](https://yapi.huianrong.com/project/1722/interface/api/72344) 的 **请求配置**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/sign`
 * @更新时间 `2023-02-24 15:26:00`
 */
const flowableEngineInstanceTaskSignPostRequestConfig: FlowableEngineInstanceTaskSignPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_8,
    devUrl: devUrl_0_1_0_8,
    prodUrl: prodUrl_0_1_0_8,
    path: '/flowable-engine/instance/task/sign',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_8,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceTaskSignPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [加签任务↗](https://yapi.huianrong.com/project/1722/interface/api/72344) 的 **请求函数**
 *
 * @分类 [流程操作(任务相关)↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22533)
 * @请求头 `POST /flowable-engine/instance/task/sign`
 * @更新时间 `2023-02-24 15:26:00`
 */
export const flowableEngineInstanceTaskSignPost = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceTaskSignPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceTaskSignPostResponse>(
    prepare(flowableEngineInstanceTaskSignPostRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstanceTaskSignPost.requestConfig =
  flowableEngineInstanceTaskSignPostRequestConfig;

const mockUrl_0_1_0_9 = 'https://yapi.huianrong.com/mock/1722' as any;
const devUrl_0_1_0_9 = '' as any;
const prodUrl_0_1_0_9 = '' as any;
const dataKey_0_1_0_9 = 'data' as any;

/**
 * 接口 [授权请求↗](https://yapi.huianrong.com/project/1722/interface/api/70194) 的 **请求类型**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22569)
 * @请求头 `GET /flowable-engine/oauth2/authorize`
 * @更新时间 `2022-12-22 16:29:31`
 */
export interface FlowableEngineOauth2AuthorizeGetRequest {
  /**
   * 统一门户凭证
   */
  certificate?: string;
  /**
   * 额外参数
   */
  extra?: string;
}

/**
 * 接口 [授权请求↗](https://yapi.huianrong.com/project/1722/interface/api/70194) 的 **返回类型**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22569)
 * @请求头 `GET /flowable-engine/oauth2/authorize`
 * @更新时间 `2022-12-22 16:29:31`
 */
export interface FlowableEngineOauth2AuthorizeGetResponse {
  /**
   * 令牌
   */
  state: string;
  /**
   * 重定向url
   */
  redirectUrl: string;
}

/**
 * 接口 [授权请求↗](https://yapi.huianrong.com/project/1722/interface/api/70194) 的 **请求配置的类型**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22569)
 * @请求头 `GET /flowable-engine/oauth2/authorize`
 * @更新时间 `2022-12-22 16:29:31`
 */
type FlowableEngineOauth2AuthorizeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/oauth2/authorize',
    'data',
    string,
    'certificate' | 'extra',
    false
  >
>;

/**
 * 接口 [授权请求↗](https://yapi.huianrong.com/project/1722/interface/api/70194) 的 **请求配置**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22569)
 * @请求头 `GET /flowable-engine/oauth2/authorize`
 * @更新时间 `2022-12-22 16:29:31`
 */
const flowableEngineOauth2AuthorizeGetRequestConfig: FlowableEngineOauth2AuthorizeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_9,
    devUrl: devUrl_0_1_0_9,
    prodUrl: prodUrl_0_1_0_9,
    path: '/flowable-engine/oauth2/authorize',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_9,
    paramNames: [],
    queryNames: ['certificate', 'extra'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineOauth2AuthorizeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [授权请求↗](https://yapi.huianrong.com/project/1722/interface/api/70194) 的 **请求函数**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22569)
 * @请求头 `GET /flowable-engine/oauth2/authorize`
 * @更新时间 `2022-12-22 16:29:31`
 */
export const flowableEngineOauth2AuthorizeGet = /*#__PURE__*/ (
  requestData: FlowableEngineOauth2AuthorizeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineOauth2AuthorizeGetResponse>(
    prepare(flowableEngineOauth2AuthorizeGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineOauth2AuthorizeGet.requestConfig =
  flowableEngineOauth2AuthorizeGetRequestConfig;

/**
 * 接口 [令牌换token↗](https://yapi.huianrong.com/project/1722/interface/api/70196) 的 **请求类型**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22569)
 * @请求头 `GET /flowable-engine/oauth2/exchange`
 * @更新时间 `2022-12-22 16:31:12`
 */
export interface FlowableEngineOauth2ExchangeGetRequest {
  /**
   * 令牌
   */
  state?: string;
}

/**
 * 接口 [令牌换token↗](https://yapi.huianrong.com/project/1722/interface/api/70196) 的 **返回类型**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22569)
 * @请求头 `GET /flowable-engine/oauth2/exchange`
 * @更新时间 `2022-12-22 16:31:12`
 */
export interface FlowableEngineOauth2ExchangeGetResponse {
  /**
   * token
   */
  token: string;
}

/**
 * 接口 [令牌换token↗](https://yapi.huianrong.com/project/1722/interface/api/70196) 的 **请求配置的类型**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22569)
 * @请求头 `GET /flowable-engine/oauth2/exchange`
 * @更新时间 `2022-12-22 16:31:12`
 */
type FlowableEngineOauth2ExchangeGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/oauth2/exchange',
    'data',
    string,
    'state',
    false
  >
>;

/**
 * 接口 [令牌换token↗](https://yapi.huianrong.com/project/1722/interface/api/70196) 的 **请求配置**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22569)
 * @请求头 `GET /flowable-engine/oauth2/exchange`
 * @更新时间 `2022-12-22 16:31:12`
 */
const flowableEngineOauth2ExchangeGetRequestConfig: FlowableEngineOauth2ExchangeGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_9,
    devUrl: devUrl_0_1_0_9,
    prodUrl: prodUrl_0_1_0_9,
    path: '/flowable-engine/oauth2/exchange',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_9,
    paramNames: [],
    queryNames: ['state'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineOauth2ExchangeGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [令牌换token↗](https://yapi.huianrong.com/project/1722/interface/api/70196) 的 **请求函数**
 *
 * @分类 [oauth2↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22569)
 * @请求头 `GET /flowable-engine/oauth2/exchange`
 * @更新时间 `2022-12-22 16:31:12`
 */
export const flowableEngineOauth2ExchangeGet = /*#__PURE__*/ (
  requestData: FlowableEngineOauth2ExchangeGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineOauth2ExchangeGetResponse>(
    prepare(flowableEngineOauth2ExchangeGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineOauth2ExchangeGet.requestConfig =
  flowableEngineOauth2ExchangeGetRequestConfig;

const mockUrl_0_1_0_10 = 'https://yapi.huianrong.com/mock/1722' as any;
const devUrl_0_1_0_10 = '' as any;
const prodUrl_0_1_0_10 = '' as any;
const dataKey_0_1_0_10 = 'data' as any;

/**
 * 接口 [分页获取↗](https://yapi.huianrong.com/project/1722/interface/api/70200) 的 **请求类型**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `GET /flowable-engine/project-model/page`
 * @更新时间 `2022-12-24 14:13:15`
 */
export interface FlowableEngineProjectModelPageGetRequest {
  /**
   * 项目id
   */
  projectId?: string;
  /**
   * 审批类型
   */
  approvalType?: string;
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
 * 接口 [分页获取↗](https://yapi.huianrong.com/project/1722/interface/api/70200) 的 **返回类型**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `GET /flowable-engine/project-model/page`
 * @更新时间 `2022-12-24 14:13:15`
 */
export interface FlowableEngineProjectModelPageGetResponse {
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
     * 项目id
     */
    projectId?: number;
    /**
     * 项目名字
     */
    projectName?: string;
    /**
     * 审批类型名称
     */
    approvalTypeName?: string;
    /**
     * 模型数量
     */
    modelNum?: number;
    /**
     * 最后设置时间
     */
    updateTime?: string;
    /**
     * 设置人
     */
    createBy?: string;
  }[];
}

/**
 * 接口 [分页获取↗](https://yapi.huianrong.com/project/1722/interface/api/70200) 的 **请求配置的类型**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `GET /flowable-engine/project-model/page`
 * @更新时间 `2022-12-24 14:13:15`
 */
type FlowableEngineProjectModelPageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/project-model/page',
    'data',
    string,
    'projectId' | 'approvalType' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [分页获取↗](https://yapi.huianrong.com/project/1722/interface/api/70200) 的 **请求配置**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `GET /flowable-engine/project-model/page`
 * @更新时间 `2022-12-24 14:13:15`
 */
const flowableEngineProjectModelPageGetRequestConfig: FlowableEngineProjectModelPageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_10,
    devUrl: devUrl_0_1_0_10,
    prodUrl: prodUrl_0_1_0_10,
    path: '/flowable-engine/project-model/page',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_10,
    paramNames: [],
    queryNames: ['projectId', 'approvalType', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineProjectModelPageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [分页获取↗](https://yapi.huianrong.com/project/1722/interface/api/70200) 的 **请求函数**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `GET /flowable-engine/project-model/page`
 * @更新时间 `2022-12-24 14:13:15`
 */
export const flowableEngineProjectModelPageGet = /*#__PURE__*/ (
  requestData: FlowableEngineProjectModelPageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineProjectModelPageGetResponse>(
    prepare(flowableEngineProjectModelPageGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineProjectModelPageGet.requestConfig =
  flowableEngineProjectModelPageGetRequestConfig;

/**
 * 接口 [保存↗](https://yapi.huianrong.com/project/1722/interface/api/70202) 的 **请求类型**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `POST /flowable-engine/project-model/save`
 * @更新时间 `2022-12-24 14:13:15`
 */
export interface FlowableEngineProjectModelSavePostRequest {
  /**
   * 项目id
   */
  projectId: number;
  /**
   * 审批类型
   */
  approvalType: string;
  /**
   * 模型列表
   */
  modelInfoList?: {
    /**
     * id
     */
    id?: number;
    /**
     * 名字
     */
    name: string;
    /**
     * 流程模型key
     */
    modelKey: string;
    /**
     * 事件类型:1新增 2修改 3删除
     */
    functionType: number;
  }[];
}

/**
 * 接口 [保存↗](https://yapi.huianrong.com/project/1722/interface/api/70202) 的 **返回类型**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `POST /flowable-engine/project-model/save`
 * @更新时间 `2022-12-24 14:13:15`
 */
export interface FlowableEngineProjectModelSavePostResponse {}

/**
 * 接口 [保存↗](https://yapi.huianrong.com/project/1722/interface/api/70202) 的 **请求配置的类型**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `POST /flowable-engine/project-model/save`
 * @更新时间 `2022-12-24 14:13:15`
 */
type FlowableEngineProjectModelSavePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/project-model/save',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [保存↗](https://yapi.huianrong.com/project/1722/interface/api/70202) 的 **请求配置**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `POST /flowable-engine/project-model/save`
 * @更新时间 `2022-12-24 14:13:15`
 */
const flowableEngineProjectModelSavePostRequestConfig: FlowableEngineProjectModelSavePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_10,
    devUrl: devUrl_0_1_0_10,
    prodUrl: prodUrl_0_1_0_10,
    path: '/flowable-engine/project-model/save',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_10,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineProjectModelSavePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [保存↗](https://yapi.huianrong.com/project/1722/interface/api/70202) 的 **请求函数**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `POST /flowable-engine/project-model/save`
 * @更新时间 `2022-12-24 14:13:15`
 */
export const flowableEngineProjectModelSavePost = /*#__PURE__*/ (
  requestData: FlowableEngineProjectModelSavePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineProjectModelSavePostResponse>(
    prepare(flowableEngineProjectModelSavePostRequestConfig, requestData),
    ...args
  );
};

flowableEngineProjectModelSavePost.requestConfig =
  flowableEngineProjectModelSavePostRequestConfig;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1722/interface/api/70204) 的 **请求类型**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `GET /flowable-engine/project-model/info/{id}`
 * @更新时间 `2022-12-24 14:13:15`
 */
export interface FlowableEngineProjectModelInfoIdGetRequest {
  id: string;
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1722/interface/api/70204) 的 **返回类型**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `GET /flowable-engine/project-model/info/{id}`
 * @更新时间 `2022-12-24 14:13:15`
 */
export interface FlowableEngineProjectModelInfoIdGetResponse {
  /**
   * 项目id
   */
  projectId?: number;
  /**
   * 审批类型
   */
  approvalType?: string;
  /**
   * 审批类型名称
   */
  approvalTypeName?: string;
  /**
   * 模型列表
   */
  modelInfoList?: {
    /**
     * id
     */
    id?: number;
    /**
     * 名字
     */
    name: string;
    /**
     * 流程模型key
     */
    modelKey: string;
    /**
     * 事件类型:1新增 2修改 3删除
     */
    functionType: number;
  }[];
}

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1722/interface/api/70204) 的 **请求配置的类型**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `GET /flowable-engine/project-model/info/{id}`
 * @更新时间 `2022-12-24 14:13:15`
 */
type FlowableEngineProjectModelInfoIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/project-model/info/{id}',
    'data',
    'id',
    string,
    false
  >
>;

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1722/interface/api/70204) 的 **请求配置**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `GET /flowable-engine/project-model/info/{id}`
 * @更新时间 `2022-12-24 14:13:15`
 */
const flowableEngineProjectModelInfoIdGetRequestConfig: FlowableEngineProjectModelInfoIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_10,
    devUrl: devUrl_0_1_0_10,
    prodUrl: prodUrl_0_1_0_10,
    path: '/flowable-engine/project-model/info/{id}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_10,
    paramNames: ['id'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineProjectModelInfoIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [详情↗](https://yapi.huianrong.com/project/1722/interface/api/70204) 的 **请求函数**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `GET /flowable-engine/project-model/info/{id}`
 * @更新时间 `2022-12-24 14:13:15`
 */
export const flowableEngineProjectModelInfoIdGet = /*#__PURE__*/ (
  requestData: FlowableEngineProjectModelInfoIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineProjectModelInfoIdGetResponse>(
    prepare(flowableEngineProjectModelInfoIdGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineProjectModelInfoIdGet.requestConfig =
  flowableEngineProjectModelInfoIdGetRequestConfig;

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/70206) 的 **请求类型**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `POST /flowable-engine/project-model/edit`
 * @更新时间 `2022-12-24 14:13:16`
 */
export interface FlowableEngineProjectModelEditPostRequest {
  /**
   * id
   */
  id: number;
  /**
   * 审批类型
   */
  approvalType: string;
  /**
   * 模型列表
   */
  modelInfoList: {
    /**
     * id
     */
    id?: number;
    /**
     * 名字
     */
    name: string;
    /**
     * 流程模型key
     */
    modelKey: string;
    /**
     * 事件类型:1新增 2修改 3删除
     */
    functionType: number;
  }[];
}

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/70206) 的 **返回类型**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `POST /flowable-engine/project-model/edit`
 * @更新时间 `2022-12-24 14:13:16`
 */
export interface FlowableEngineProjectModelEditPostResponse {}

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/70206) 的 **请求配置的类型**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `POST /flowable-engine/project-model/edit`
 * @更新时间 `2022-12-24 14:13:16`
 */
type FlowableEngineProjectModelEditPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/project-model/edit',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/70206) 的 **请求配置**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `POST /flowable-engine/project-model/edit`
 * @更新时间 `2022-12-24 14:13:16`
 */
const flowableEngineProjectModelEditPostRequestConfig: FlowableEngineProjectModelEditPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_10,
    devUrl: devUrl_0_1_0_10,
    prodUrl: prodUrl_0_1_0_10,
    path: '/flowable-engine/project-model/edit',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_10,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineProjectModelEditPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [修改↗](https://yapi.huianrong.com/project/1722/interface/api/70206) 的 **请求函数**
 *
 * @分类 [业务对接关联↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22571)
 * @请求头 `POST /flowable-engine/project-model/edit`
 * @更新时间 `2022-12-24 14:13:16`
 */
export const flowableEngineProjectModelEditPost = /*#__PURE__*/ (
  requestData: FlowableEngineProjectModelEditPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineProjectModelEditPostResponse>(
    prepare(flowableEngineProjectModelEditPostRequestConfig, requestData),
    ...args
  );
};

flowableEngineProjectModelEditPost.requestConfig =
  flowableEngineProjectModelEditPostRequestConfig;

const mockUrl_0_1_0_11 = 'https://yapi.huianrong.com/mock/1722' as any;
const devUrl_0_1_0_11 = '' as any;
const prodUrl_0_1_0_11 = '' as any;
const dataKey_0_1_0_11 = 'data' as any;

/**
 * 接口 [流程列表↗](https://yapi.huianrong.com/project/1722/interface/api/70218) 的 **请求类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/process`
 * @更新时间 `2023-01-14 14:54:05`
 */
export interface FlowableEngineInstancePageProcessGetRequest {
  /**
   * 流程名称
   */
  processName?: string;
  /**
   * 分类编码
   */
  category?: string;
  /**
   * 流程标识
   */
  key?: string;
  /**
   * 版本
   */
  version?: string;
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
 * 接口 [流程列表↗](https://yapi.huianrong.com/project/1722/interface/api/70218) 的 **返回类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/process`
 * @更新时间 `2023-01-14 14:54:05`
 */
export interface FlowableEngineInstancePageProcessGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 流程ID
     */
    processId?: string;
    /**
     * 流程名称
     */
    processName?: string;
    /**
     * 流程Key
     */
    processKey?: string;
    /**
     * 分类
     */
    category?: string;
    /**
     * 版本
     */
    version?: number;
    /**
     * 部署ID
     */
    deploymentId?: string;
    /**
     * 流程定义状态: 1:激活 , 2:中止
     */
    suspended?: boolean;
    /**
     * 部署时间
     */
    deploymentTime?: string;
  }[];
}

/**
 * 接口 [流程列表↗](https://yapi.huianrong.com/project/1722/interface/api/70218) 的 **请求配置的类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/process`
 * @更新时间 `2023-01-14 14:54:05`
 */
type FlowableEngineInstancePageProcessGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/page/process',
    'data',
    string,
    'processName' | 'category' | 'key' | 'version' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [流程列表↗](https://yapi.huianrong.com/project/1722/interface/api/70218) 的 **请求配置**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/process`
 * @更新时间 `2023-01-14 14:54:05`
 */
const flowableEngineInstancePageProcessGetRequestConfig: FlowableEngineInstancePageProcessGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_11,
    devUrl: devUrl_0_1_0_11,
    prodUrl: prodUrl_0_1_0_11,
    path: '/flowable-engine/instance/page/process',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_11,
    paramNames: [],
    queryNames: [
      'processName',
      'category',
      'key',
      'version',
      'pageNum',
      'pageSize'
    ],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstancePageProcessGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [流程列表↗](https://yapi.huianrong.com/project/1722/interface/api/70218) 的 **请求函数**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/process`
 * @更新时间 `2023-01-14 14:54:05`
 */
export const flowableEngineInstancePageProcessGet = /*#__PURE__*/ (
  requestData: FlowableEngineInstancePageProcessGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstancePageProcessGetResponse>(
    prepare(flowableEngineInstancePageProcessGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstancePageProcessGet.requestConfig =
  flowableEngineInstancePageProcessGetRequestConfig;

/**
 * 接口 [表单↗](https://yapi.huianrong.com/project/1722/interface/api/70220) 的 **请求类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/form/{processId}/{deployId}`
 * @更新时间 `2023-01-14 14:54:05`
 */
export interface FlowableEngineInstanceFormProcessIdDeployIdGetRequest {
  processId: string;
  deployId: string;
}

/**
 * 接口 [表单↗](https://yapi.huianrong.com/project/1722/interface/api/70220) 的 **返回类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/form/{processId}/{deployId}`
 * @更新时间 `2023-01-14 14:54:05`
 */
export type FlowableEngineInstanceFormProcessIdDeployIdGetResponse = string;

/**
 * 接口 [表单↗](https://yapi.huianrong.com/project/1722/interface/api/70220) 的 **请求配置的类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/form/{processId}/{deployId}`
 * @更新时间 `2023-01-14 14:54:05`
 */
type FlowableEngineInstanceFormProcessIdDeployIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/form/{processId}/{deployId}',
    'data',
    'processId' | 'deployId',
    string,
    false
  >
>;

/**
 * 接口 [表单↗](https://yapi.huianrong.com/project/1722/interface/api/70220) 的 **请求配置**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/form/{processId}/{deployId}`
 * @更新时间 `2023-01-14 14:54:05`
 */
const flowableEngineInstanceFormProcessIdDeployIdGetRequestConfig: FlowableEngineInstanceFormProcessIdDeployIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_11,
    devUrl: devUrl_0_1_0_11,
    prodUrl: prodUrl_0_1_0_11,
    path: '/flowable-engine/instance/form/{processId}/{deployId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_11,
    paramNames: ['processId', 'deployId'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceFormProcessIdDeployIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [表单↗](https://yapi.huianrong.com/project/1722/interface/api/70220) 的 **请求函数**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/form/{processId}/{deployId}`
 * @更新时间 `2023-01-14 14:54:05`
 */
export const flowableEngineInstanceFormProcessIdDeployIdGet = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceFormProcessIdDeployIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceFormProcessIdDeployIdGetResponse>(
    prepare(
      flowableEngineInstanceFormProcessIdDeployIdGetRequestConfig,
      requestData
    ),
    ...args
  );
};

flowableEngineInstanceFormProcessIdDeployIdGet.requestConfig =
  flowableEngineInstanceFormProcessIdDeployIdGetRequestConfig;

/**
 * 接口 [创建实例↗](https://yapi.huianrong.com/project/1722/interface/api/70222) 的 **请求类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `POST /flowable-engine/instance/create/{processId}`
 * @更新时间 `2023-01-14 14:54:06`
 */
export interface FlowableEngineInstanceCreateProcessIdPostRequest {
  key?: {};
  processId: string;
}

/**
 * 接口 [创建实例↗](https://yapi.huianrong.com/project/1722/interface/api/70222) 的 **返回类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `POST /flowable-engine/instance/create/{processId}`
 * @更新时间 `2023-01-14 14:54:06`
 */
export interface FlowableEngineInstanceCreateProcessIdPostResponse {}

/**
 * 接口 [创建实例↗](https://yapi.huianrong.com/project/1722/interface/api/70222) 的 **请求配置的类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `POST /flowable-engine/instance/create/{processId}`
 * @更新时间 `2023-01-14 14:54:06`
 */
type FlowableEngineInstanceCreateProcessIdPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/create/{processId}',
    'data',
    'processId',
    string,
    false
  >
>;

/**
 * 接口 [创建实例↗](https://yapi.huianrong.com/project/1722/interface/api/70222) 的 **请求配置**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `POST /flowable-engine/instance/create/{processId}`
 * @更新时间 `2023-01-14 14:54:06`
 */
const flowableEngineInstanceCreateProcessIdPostRequestConfig: FlowableEngineInstanceCreateProcessIdPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_11,
    devUrl: devUrl_0_1_0_11,
    prodUrl: prodUrl_0_1_0_11,
    path: '/flowable-engine/instance/create/{processId}',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_11,
    paramNames: ['processId'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceCreateProcessIdPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [创建实例↗](https://yapi.huianrong.com/project/1722/interface/api/70222) 的 **请求函数**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `POST /flowable-engine/instance/create/{processId}`
 * @更新时间 `2023-01-14 14:54:06`
 */
export const flowableEngineInstanceCreateProcessIdPost = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceCreateProcessIdPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceCreateProcessIdPostResponse>(
    prepare(
      flowableEngineInstanceCreateProcessIdPostRequestConfig,
      requestData
    ),
    ...args
  );
};

flowableEngineInstanceCreateProcessIdPost.requestConfig =
  flowableEngineInstanceCreateProcessIdPostRequestConfig;

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/70224) 的 **请求类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/bpmn/{processId}`
 * @更新时间 `2023-01-14 14:54:06`
 */
export interface FlowableEngineInstanceBpmnProcessIdGetRequest {
  processId: string;
}

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/70224) 的 **返回类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/bpmn/{processId}`
 * @更新时间 `2023-01-14 14:54:06`
 */
export interface FlowableEngineInstanceBpmnProcessIdGetResponse {}

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/70224) 的 **请求配置的类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/bpmn/{processId}`
 * @更新时间 `2023-01-14 14:54:06`
 */
type FlowableEngineInstanceBpmnProcessIdGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/bpmn/{processId}',
    'data',
    'processId',
    string,
    false
  >
>;

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/70224) 的 **请求配置**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/bpmn/{processId}`
 * @更新时间 `2023-01-14 14:54:06`
 */
const flowableEngineInstanceBpmnProcessIdGetRequestConfig: FlowableEngineInstanceBpmnProcessIdGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_11,
    devUrl: devUrl_0_1_0_11,
    prodUrl: prodUrl_0_1_0_11,
    path: '/flowable-engine/instance/bpmn/{processId}',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_11,
    paramNames: ['processId'],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceBpmnProcessIdGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [bpmn↗](https://yapi.huianrong.com/project/1722/interface/api/70224) 的 **请求函数**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/bpmn/{processId}`
 * @更新时间 `2023-01-14 14:54:06`
 */
export const flowableEngineInstanceBpmnProcessIdGet = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceBpmnProcessIdGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceBpmnProcessIdGetResponse>(
    prepare(flowableEngineInstanceBpmnProcessIdGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstanceBpmnProcessIdGet.requestConfig =
  flowableEngineInstanceBpmnProcessIdGetRequestConfig;

/**
 * 接口 [我的流程列表↗](https://yapi.huianrong.com/project/1722/interface/api/70226) 的 **请求类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/mine`
 * @更新时间 `2023-01-14 14:54:06`
 */
export interface FlowableEngineInstancePageMineGetRequest {
  /**
   * 流程名称
   */
  processName?: string;
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
 * 接口 [我的流程列表↗](https://yapi.huianrong.com/project/1722/interface/api/70226) 的 **返回类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/mine`
 * @更新时间 `2023-01-14 14:54:06`
 */
export interface FlowableEngineInstancePageMineGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 流程编号
     */
    code?: string;
    /**
     * 任务编号
     */
    taskId?: string;
    /**
     * 任务名称
     */
    taskName?: string;
    /**
     * 任务Key
     */
    taskDefKey?: string;
    /**
     * 任务执行人Id
     */
    assigneeId?: number;
    /**
     * 部门名称
     */
    deptName?: string;
    /**
     * 流程发起人部门名称
     */
    startDeptName?: string;
    /**
     * 任务执行人名称
     */
    assigneeName?: string;
    /**
     * 流程发起人Id
     */
    startUserId?: string;
    /**
     * 流程发起人名称
     */
    startUserName?: string;
    /**
     * 流程类型
     */
    category?: string;
    /**
     * 流程变量信息
     */
    procVars?: {};
    /**
     * 局部变量信息
     */
    taskLocalVars?: {};
    /**
     * 流程部署编号
     */
    deployId?: string;
    /**
     * 流程ID
     */
    procDefId?: string;
    /**
     * 流程key
     */
    procDefKey?: string;
    /**
     * 流程定义名称
     */
    procDefName?: string;
    /**
     * 流程定义内置使用版本
     */
    procDefVersion?: number;
    /**
     * 流程实例ID
     */
    procInsId?: string;
    /**
     * 历史流程实例ID
     */
    hisProcInsId?: string;
    /**
     * 任务耗时
     */
    duration?: string;
    /**
     * 任务意见
     */
    commentList?: {}[];
    /**
     * 候选执行人
     */
    candidate?: string;
    /**
     * 任务创建时间
     */
    createTime?: string;
    /**
     * 任务完成时间
     */
    finishTime?: string;
    /**
     * 流程状态 1：已完成，2进行中
     */
    status?: number;
  }[];
}

/**
 * 接口 [我的流程列表↗](https://yapi.huianrong.com/project/1722/interface/api/70226) 的 **请求配置的类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/mine`
 * @更新时间 `2023-01-14 14:54:06`
 */
type FlowableEngineInstancePageMineGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/page/mine',
    'data',
    string,
    'processName' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [我的流程列表↗](https://yapi.huianrong.com/project/1722/interface/api/70226) 的 **请求配置**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/mine`
 * @更新时间 `2023-01-14 14:54:06`
 */
const flowableEngineInstancePageMineGetRequestConfig: FlowableEngineInstancePageMineGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_11,
    devUrl: devUrl_0_1_0_11,
    prodUrl: prodUrl_0_1_0_11,
    path: '/flowable-engine/instance/page/mine',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_11,
    paramNames: [],
    queryNames: ['processName', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstancePageMineGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [我的流程列表↗](https://yapi.huianrong.com/project/1722/interface/api/70226) 的 **请求函数**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/mine`
 * @更新时间 `2023-01-14 14:54:06`
 */
export const flowableEngineInstancePageMineGet = /*#__PURE__*/ (
  requestData: FlowableEngineInstancePageMineGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstancePageMineGetResponse>(
    prepare(flowableEngineInstancePageMineGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstancePageMineGet.requestConfig =
  flowableEngineInstancePageMineGetRequestConfig;

/**
 * 接口 [获取待办列表↗](https://yapi.huianrong.com/project/1722/interface/api/70228) 的 **请求类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/todo`
 * @更新时间 `2023-01-14 14:54:07`
 */
export interface FlowableEngineInstancePageTodoGetRequest {
  /**
   * 流程名称
   */
  processName?: string;
  /**
   * 是否自己
   */
  isOwn?: string;
  /**
   * 是否超时
   */
  isTimeOut?: string;
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
 * 接口 [获取待办列表↗](https://yapi.huianrong.com/project/1722/interface/api/70228) 的 **返回类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/todo`
 * @更新时间 `2023-01-14 14:54:07`
 */
export interface FlowableEngineInstancePageTodoGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 流程编号
     */
    code?: string;
    /**
     * 任务编号
     */
    taskId?: string;
    /**
     * 任务名称
     */
    taskName?: string;
    /**
     * 任务Key
     */
    taskDefKey?: string;
    /**
     * 任务执行人Id
     */
    assigneeId?: number;
    /**
     * 部门名称
     */
    deptName?: string;
    /**
     * 流程发起人部门名称
     */
    startDeptName?: string;
    /**
     * 任务执行人名称
     */
    assigneeName?: string;
    /**
     * 流程发起人Id
     */
    startUserId?: string;
    /**
     * 流程发起人名称
     */
    startUserName?: string;
    /**
     * 流程类型
     */
    category?: string;
    /**
     * 流程变量信息
     */
    procVars?: {};
    /**
     * 局部变量信息
     */
    taskLocalVars?: {};
    /**
     * 流程部署编号
     */
    deployId?: string;
    /**
     * 流程ID
     */
    procDefId?: string;
    /**
     * 流程key
     */
    procDefKey?: string;
    /**
     * 流程定义名称
     */
    procDefName?: string;
    /**
     * 流程定义内置使用版本
     */
    procDefVersion?: number;
    /**
     * 流程实例ID
     */
    procInsId?: string;
    /**
     * 历史流程实例ID
     */
    hisProcInsId?: string;
    /**
     * 任务耗时
     */
    duration?: string;
    /**
     * 任务意见
     */
    commentList?: {}[];
    /**
     * 候选执行人
     */
    candidate?: string;
    /**
     * 任务创建时间
     */
    createTime?: string;
    /**
     * 任务完成时间
     */
    finishTime?: string;
  }[];
}

/**
 * 接口 [获取待办列表↗](https://yapi.huianrong.com/project/1722/interface/api/70228) 的 **请求配置的类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/todo`
 * @更新时间 `2023-01-14 14:54:07`
 */
type FlowableEngineInstancePageTodoGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/page/todo',
    'data',
    string,
    'processName' | 'isOwn' | 'isTimeOut' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [获取待办列表↗](https://yapi.huianrong.com/project/1722/interface/api/70228) 的 **请求配置**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/todo`
 * @更新时间 `2023-01-14 14:54:07`
 */
const flowableEngineInstancePageTodoGetRequestConfig: FlowableEngineInstancePageTodoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_11,
    devUrl: devUrl_0_1_0_11,
    prodUrl: prodUrl_0_1_0_11,
    path: '/flowable-engine/instance/page/todo',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_11,
    paramNames: [],
    queryNames: ['processName', 'isOwn', 'isTimeOut', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstancePageTodoGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取待办列表↗](https://yapi.huianrong.com/project/1722/interface/api/70228) 的 **请求函数**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/todo`
 * @更新时间 `2023-01-14 14:54:07`
 */
export const flowableEngineInstancePageTodoGet = /*#__PURE__*/ (
  requestData: FlowableEngineInstancePageTodoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstancePageTodoGetResponse>(
    prepare(flowableEngineInstancePageTodoGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstancePageTodoGet.requestConfig =
  flowableEngineInstancePageTodoGetRequestConfig;

/**
 * 接口 [获取待签列表↗](https://yapi.huianrong.com/project/1722/interface/api/70230) 的 **请求类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/claim`
 * @更新时间 `2023-01-14 14:54:07`
 */
export interface FlowableEngineInstancePageClaimGetRequest {
  /**
   * 流程名称
   */
  processName?: string;
  /**
   * 是否自己
   */
  isOwn?: string;
  /**
   * 是否超时
   */
  isTimeOut?: string;
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
 * 接口 [获取待签列表↗](https://yapi.huianrong.com/project/1722/interface/api/70230) 的 **返回类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/claim`
 * @更新时间 `2023-01-14 14:54:07`
 */
export interface FlowableEngineInstancePageClaimGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 流程编号
     */
    code?: string;
    /**
     * 任务编号
     */
    taskId?: string;
    /**
     * 任务名称
     */
    taskName?: string;
    /**
     * 任务Key
     */
    taskDefKey?: string;
    /**
     * 任务执行人Id
     */
    assigneeId?: number;
    /**
     * 部门名称
     */
    deptName?: string;
    /**
     * 流程发起人部门名称
     */
    startDeptName?: string;
    /**
     * 任务执行人名称
     */
    assigneeName?: string;
    /**
     * 流程发起人Id
     */
    startUserId?: string;
    /**
     * 流程发起人名称
     */
    startUserName?: string;
    /**
     * 流程类型
     */
    category?: string;
    /**
     * 流程变量信息
     */
    procVars?: {};
    /**
     * 局部变量信息
     */
    taskLocalVars?: {};
    /**
     * 流程部署编号
     */
    deployId?: string;
    /**
     * 流程ID
     */
    procDefId?: string;
    /**
     * 流程key
     */
    procDefKey?: string;
    /**
     * 流程定义名称
     */
    procDefName?: string;
    /**
     * 流程定义内置使用版本
     */
    procDefVersion?: number;
    /**
     * 流程实例ID
     */
    procInsId?: string;
    /**
     * 历史流程实例ID
     */
    hisProcInsId?: string;
    /**
     * 任务耗时
     */
    duration?: string;
    /**
     * 任务意见
     */
    commentList?: {}[];
    /**
     * 候选执行人
     */
    candidate?: string;
    /**
     * 任务创建时间
     */
    createTime?: string;
    /**
     * 任务完成时间
     */
    finishTime?: string;
  }[];
}

/**
 * 接口 [获取待签列表↗](https://yapi.huianrong.com/project/1722/interface/api/70230) 的 **请求配置的类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/claim`
 * @更新时间 `2023-01-14 14:54:07`
 */
type FlowableEngineInstancePageClaimGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/page/claim',
    'data',
    string,
    'processName' | 'isOwn' | 'isTimeOut' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [获取待签列表↗](https://yapi.huianrong.com/project/1722/interface/api/70230) 的 **请求配置**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/claim`
 * @更新时间 `2023-01-14 14:54:07`
 */
const flowableEngineInstancePageClaimGetRequestConfig: FlowableEngineInstancePageClaimGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_11,
    devUrl: devUrl_0_1_0_11,
    prodUrl: prodUrl_0_1_0_11,
    path: '/flowable-engine/instance/page/claim',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_11,
    paramNames: [],
    queryNames: ['processName', 'isOwn', 'isTimeOut', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstancePageClaimGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取待签列表↗](https://yapi.huianrong.com/project/1722/interface/api/70230) 的 **请求函数**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/claim`
 * @更新时间 `2023-01-14 14:54:07`
 */
export const flowableEngineInstancePageClaimGet = /*#__PURE__*/ (
  requestData: FlowableEngineInstancePageClaimGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstancePageClaimGetResponse>(
    prepare(flowableEngineInstancePageClaimGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstancePageClaimGet.requestConfig =
  flowableEngineInstancePageClaimGetRequestConfig;

/**
 * 接口 [获取已办列表↗](https://yapi.huianrong.com/project/1722/interface/api/70232) 的 **请求类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/finished`
 * @更新时间 `2023-01-14 14:54:08`
 */
export interface FlowableEngineInstancePageFinishedGetRequest {
  /**
   * 流程名称
   */
  processName?: string;
  /**
   * 开始时间
   */
  startTime?: string;
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
 * 接口 [获取已办列表↗](https://yapi.huianrong.com/project/1722/interface/api/70232) 的 **返回类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/finished`
 * @更新时间 `2023-01-14 14:54:08`
 */
export interface FlowableEngineInstancePageFinishedGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 流程编号
     */
    code?: string;
    /**
     * 任务编号
     */
    taskId?: string;
    /**
     * 任务名称
     */
    taskName?: string;
    /**
     * 任务Key
     */
    taskDefKey?: string;
    /**
     * 任务执行人Id
     */
    assigneeId?: number;
    /**
     * 部门名称
     */
    deptName?: string;
    /**
     * 流程发起人部门名称
     */
    startDeptName?: string;
    /**
     * 任务执行人名称
     */
    assigneeName?: string;
    /**
     * 流程发起人Id
     */
    startUserId?: string;
    /**
     * 流程发起人名称
     */
    startUserName?: string;
    /**
     * 流程类型
     */
    category?: string;
    /**
     * 流程变量信息
     */
    procVars?: {};
    /**
     * 局部变量信息
     */
    taskLocalVars?: {};
    /**
     * 流程部署编号
     */
    deployId?: string;
    /**
     * 流程ID
     */
    procDefId?: string;
    /**
     * 流程key
     */
    procDefKey?: string;
    /**
     * 流程定义名称
     */
    procDefName?: string;
    /**
     * 流程定义内置使用版本
     */
    procDefVersion?: number;
    /**
     * 流程实例ID
     */
    procInsId?: string;
    /**
     * 历史流程实例ID
     */
    hisProcInsId?: string;
    /**
     * 任务耗时
     */
    duration?: string;
    /**
     * 任务意见
     */
    commentList?: {}[];
    /**
     * 候选执行人
     */
    candidate?: string;
    /**
     * 任务创建时间
     */
    createTime?: string;
    /**
     * 任务完成时间
     */
    finishTime?: string;
  }[];
}

/**
 * 接口 [获取已办列表↗](https://yapi.huianrong.com/project/1722/interface/api/70232) 的 **请求配置的类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/finished`
 * @更新时间 `2023-01-14 14:54:08`
 */
type FlowableEngineInstancePageFinishedGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/page/finished',
    'data',
    string,
    'processName' | 'startTime' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [获取已办列表↗](https://yapi.huianrong.com/project/1722/interface/api/70232) 的 **请求配置**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/finished`
 * @更新时间 `2023-01-14 14:54:08`
 */
const flowableEngineInstancePageFinishedGetRequestConfig: FlowableEngineInstancePageFinishedGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_11,
    devUrl: devUrl_0_1_0_11,
    prodUrl: prodUrl_0_1_0_11,
    path: '/flowable-engine/instance/page/finished',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_11,
    paramNames: [],
    queryNames: ['processName', 'startTime', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstancePageFinishedGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取已办列表↗](https://yapi.huianrong.com/project/1722/interface/api/70232) 的 **请求函数**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/finished`
 * @更新时间 `2023-01-14 14:54:08`
 */
export const flowableEngineInstancePageFinishedGet = /*#__PURE__*/ (
  requestData: FlowableEngineInstancePageFinishedGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstancePageFinishedGetResponse>(
    prepare(flowableEngineInstancePageFinishedGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstancePageFinishedGet.requestConfig =
  flowableEngineInstancePageFinishedGetRequestConfig;

/**
 * 接口 [获取抄送列表↗](https://yapi.huianrong.com/project/1722/interface/api/70234) 的 **请求类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/copy`
 * @更新时间 `2023-01-14 14:54:08`
 */
export interface FlowableEngineInstancePageCopyGetRequest {
  /**
   * 流程名称
   */
  processName?: string;
  /**
   * 发起人名称
   */
  originatorName?: string;
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
 * 接口 [获取抄送列表↗](https://yapi.huianrong.com/project/1722/interface/api/70234) 的 **返回类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/copy`
 * @更新时间 `2023-01-14 14:54:08`
 */
export interface FlowableEngineInstancePageCopyGetResponse {
  /**
   * 总条数
   */
  total?: number;
  /**
   * 项目列表数据
   */
  rows?: {
    /**
     * 流程编号
     */
    code?: string;
    /**
     * 抄送主键
     */
    copyId?: number;
    /**
     * 抄送标题
     */
    title?: string;
    /**
     * 流程主键
     */
    processId?: string;
    /**
     * 流程名称
     */
    procDefName?: string;
    /**
     * 流程分类主键
     */
    categoryId?: string;
    /**
     * 部署主键
     */
    deployId?: string;
    /**
     * 流程实例主键
     */
    procInsId?: string;
    /**
     * 任务主键
     */
    taskId?: string;
    /**
     * 用户主键
     */
    userId?: string;
    /**
     * 发起人Id
     */
    originatorId?: string;
    /**
     * 发起人名称
     */
    originatorName?: string;
    /**
     * 抄送时间（创建时间）
     */
    createTime?: string;
  }[];
}

/**
 * 接口 [获取抄送列表↗](https://yapi.huianrong.com/project/1722/interface/api/70234) 的 **请求配置的类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/copy`
 * @更新时间 `2023-01-14 14:54:08`
 */
type FlowableEngineInstancePageCopyGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/page/copy',
    'data',
    string,
    'processName' | 'originatorName' | 'pageNum' | 'pageSize',
    false
  >
>;

/**
 * 接口 [获取抄送列表↗](https://yapi.huianrong.com/project/1722/interface/api/70234) 的 **请求配置**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/copy`
 * @更新时间 `2023-01-14 14:54:08`
 */
const flowableEngineInstancePageCopyGetRequestConfig: FlowableEngineInstancePageCopyGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_11,
    devUrl: devUrl_0_1_0_11,
    prodUrl: prodUrl_0_1_0_11,
    path: '/flowable-engine/instance/page/copy',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_11,
    paramNames: [],
    queryNames: ['processName', 'originatorName', 'pageNum', 'pageSize'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstancePageCopyGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取抄送列表↗](https://yapi.huianrong.com/project/1722/interface/api/70234) 的 **请求函数**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/page/copy`
 * @更新时间 `2023-01-14 14:54:08`
 */
export const flowableEngineInstancePageCopyGet = /*#__PURE__*/ (
  requestData: FlowableEngineInstancePageCopyGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstancePageCopyGetResponse>(
    prepare(flowableEngineInstancePageCopyGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstancePageCopyGet.requestConfig =
  flowableEngineInstancePageCopyGetRequestConfig;

/**
 * 接口 [查询流程详情信息↗](https://yapi.huianrong.com/project/1722/interface/api/70236) 的 **请求类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/detail`
 * @更新时间 `2023-01-14 14:54:08`
 */
export interface FlowableEngineInstanceDetailGetRequest {
  /**
   * 流程实例ID
   */
  procInsId?: string;
  /**
   * 部署ID
   */
  deployId?: string;
  /**
   * 任务ID
   */
  taskId?: string;
}

/**
 * 接口 [查询流程详情信息↗](https://yapi.huianrong.com/project/1722/interface/api/70236) 的 **返回类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/detail`
 * @更新时间 `2023-01-14 14:54:08`
 */
export interface FlowableEngineInstanceDetailGetResponse {
  /**
   * 流程编码
   */
  code: string;
  /**
   * 流程审批状态：0：审批不通过；1：审批中；2: 审批通过；3：撤销; 4：驳回
   */
  status?: number;
  /**
   * 业务详情
   */
  bizInfo?: {
    /**
     * 类型 铺位调整：floorAdjust，招商计划：investPlan
     */
    type?: string;
    /**
     * 详情数据
     */
    info?: {
      key?: {};
    };
  };
  /**
   * 流程实例id
   */
  processInstanceId?: string;
  /**
   * 流程结束时间
   */
  finishTime?: string;
  /**
   * 任务表单信息
   */
  taskFormData?: {
    /**
     * 标题
     */
    title?: string;
    /**
     * 表单名
     */
    formRef?: string;
    /**
     * 表单模型
     */
    formModel?: string;
    /**
     * 表单尺寸
     */
    size?: string;
    /**
     * 标签对齐
     */
    labelPosition?: string;
    /**
     * 标签宽度
     */
    labelWidth?: number;
    /**
     * 校验模型
     */
    formRules?: string;
    /**
     * 栅格间隔
     */
    gutter?: number;
    /**
     * 禁用表单
     */
    disabled?: boolean;
    /**
     * 栅格占据的列数
     */
    span?: number;
    /**
     * 表单按钮
     */
    formBtns?: boolean;
    /**
     * 表单项
     */
    fields?: {
      key?: {};
    }[];
  };
  /**
   * 历史流程节点信息
   */
  historyProcNodeList?: {
    /**
     * 流程ID
     */
    procDefId?: string;
    /**
     * 活动ID
     */
    activityId?: string;
    /**
     * 活动名称
     */
    activityName?: string;
    /**
     * 活动类型
     */
    activityType?: string;
    /**
     * 活动耗时
     */
    duration?: string;
    /**
     * 执行人Id
     */
    assigneeId?: string;
    /**
     * 执行人名称
     */
    assigneeName?: string;
    /**
     * 候选执行人
     */
    candidate?: string;
    /**
     * 任务意见
     */
    commentList?: {}[];
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 结束时间
     */
    endTime?: string;
  }[];
  /**
   * 历史流程节点数据信息
   */
  historyInstanceInfoList?: {
    /**
     * 用户id
     */
    userCode?: string;
    /**
     * 用户名
     */
    username?: string;
    /**
     * 签名
     */
    signatureUrl?: string;
    /**
     * 用户角色
     */
    userRole?: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 审核时间
     */
    auditTime?: string;
    /**
     * 意见描述
     */
    remarks?: string;
    /**
     * 流程意见:1正常 2退回 3驳回 4委派 5转办 6中止
     */
    type?: string;
    /**
     * 活动类型: startEvent流程开始  endEvent流程结束 userTask用户任务
     */
    activityType?: string;
    /**
     * 活动类型名字
     */
    activityName?: string;
  }[];
  /**
   * 流程表单列表
   */
  processFormList?: {
    /**
     * 标题
     */
    title?: string;
    /**
     * 表单名
     */
    formRef?: string;
    /**
     * 表单模型
     */
    formModel?: string;
    /**
     * 表单尺寸
     */
    size?: string;
    /**
     * 标签对齐
     */
    labelPosition?: string;
    /**
     * 标签宽度
     */
    labelWidth?: number;
    /**
     * 校验模型
     */
    formRules?: string;
    /**
     * 栅格间隔
     */
    gutter?: number;
    /**
     * 禁用表单
     */
    disabled?: boolean;
    /**
     * 栅格占据的列数
     */
    span?: number;
    /**
     * 表单按钮
     */
    formBtns?: boolean;
    /**
     * 表单项
     */
    fields?: {
      key?: {};
    }[];
  }[];
  /**
   * 流程XML
   */
  bpmnXml?: string;
  flowViewer?: {
    /**
     * 获取流程实例的历史节点（去重）
     */
    finishedTaskSet?: string[];
    /**
     * 已完成
     */
    finishedSequenceFlowSet?: string[];
    /**
     * 获取流程实例当前正在待办的节点（去重）
     */
    unfinishedTaskSet?: string[];
    /**
     * 已拒绝
     */
    rejectedTaskSet?: string[];
  };
  /**
   * 操作按钮：revoke: 撤销,sign: 加签,transfer: 转签,reject: 驳回,agree: 同意
   */
  buttons?: string[];
}

/**
 * 接口 [查询流程详情信息↗](https://yapi.huianrong.com/project/1722/interface/api/70236) 的 **请求配置的类型**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/detail`
 * @更新时间 `2023-01-14 14:54:08`
 */
type FlowableEngineInstanceDetailGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/instance/detail',
    'data',
    string,
    'procInsId' | 'deployId' | 'taskId',
    false
  >
>;

/**
 * 接口 [查询流程详情信息↗](https://yapi.huianrong.com/project/1722/interface/api/70236) 的 **请求配置**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/detail`
 * @更新时间 `2023-01-14 14:54:08`
 */
const flowableEngineInstanceDetailGetRequestConfig: FlowableEngineInstanceDetailGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_11,
    devUrl: devUrl_0_1_0_11,
    prodUrl: prodUrl_0_1_0_11,
    path: '/flowable-engine/instance/detail',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_11,
    paramNames: [],
    queryNames: ['procInsId', 'deployId', 'taskId'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineInstanceDetailGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [查询流程详情信息↗](https://yapi.huianrong.com/project/1722/interface/api/70236) 的 **请求函数**
 *
 * @分类 [实例管理↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22575)
 * @请求头 `GET /flowable-engine/instance/detail`
 * @更新时间 `2023-01-14 14:54:08`
 */
export const flowableEngineInstanceDetailGet = /*#__PURE__*/ (
  requestData: FlowableEngineInstanceDetailGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineInstanceDetailGetResponse>(
    prepare(flowableEngineInstanceDetailGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineInstanceDetailGet.requestConfig =
  flowableEngineInstanceDetailGetRequestConfig;

const mockUrl_0_1_0_12 = 'https://yapi.huianrong.com/mock/1722' as any;
const devUrl_0_1_0_12 = '' as any;
const prodUrl_0_1_0_12 = '' as any;
const dataKey_0_1_0_12 = 'data' as any;

/**
 * 接口 [用户信息↗](https://yapi.huianrong.com/project/1722/interface/api/70610) 的 **请求类型**
 *
 * @分类 [系统↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22611)
 * @请求头 `GET /flowable-engine/system/user/info`
 * @更新时间 `2022-12-26 14:52:09`
 */
export interface FlowableEngineSystemUserInfoGetRequest {}

/**
 * 接口 [用户信息↗](https://yapi.huianrong.com/project/1722/interface/api/70610) 的 **返回类型**
 *
 * @分类 [系统↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22611)
 * @请求头 `GET /flowable-engine/system/user/info`
 * @更新时间 `2022-12-26 14:52:09`
 */
export interface FlowableEngineSystemUserInfoGetResponse {
  /**
   * 用户名称
   */
  userName?: string;
  /**
   * 真实姓名
   */
  realName?: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 邮件
   */
  email?: string;
  /**
   * 手机号码
   */
  phoneNumber?: string;
  /**
   * 用户性别 0=男,1=女,2=未知
   */
  sex?: string;
  /**
   * 用户头像
   */
  avatar?: string;
  /**
   * 权限
   */
  permissions?: string[];
}

/**
 * 接口 [用户信息↗](https://yapi.huianrong.com/project/1722/interface/api/70610) 的 **请求配置的类型**
 *
 * @分类 [系统↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22611)
 * @请求头 `GET /flowable-engine/system/user/info`
 * @更新时间 `2022-12-26 14:52:09`
 */
type FlowableEngineSystemUserInfoGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/system/user/info',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [用户信息↗](https://yapi.huianrong.com/project/1722/interface/api/70610) 的 **请求配置**
 *
 * @分类 [系统↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22611)
 * @请求头 `GET /flowable-engine/system/user/info`
 * @更新时间 `2022-12-26 14:52:09`
 */
const flowableEngineSystemUserInfoGetRequestConfig: FlowableEngineSystemUserInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_12,
    devUrl: devUrl_0_1_0_12,
    prodUrl: prodUrl_0_1_0_12,
    path: '/flowable-engine/system/user/info',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_12,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineSystemUserInfoGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [用户信息↗](https://yapi.huianrong.com/project/1722/interface/api/70610) 的 **请求函数**
 *
 * @分类 [系统↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22611)
 * @请求头 `GET /flowable-engine/system/user/info`
 * @更新时间 `2022-12-26 14:52:09`
 */
export const flowableEngineSystemUserInfoGet = /*#__PURE__*/ (
  requestData?: FlowableEngineSystemUserInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineSystemUserInfoGetResponse>(
    prepare(flowableEngineSystemUserInfoGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineSystemUserInfoGet.requestConfig =
  flowableEngineSystemUserInfoGetRequestConfig;

/**
 * 接口 [菜单↗](https://yapi.huianrong.com/project/1722/interface/api/70612) 的 **请求类型**
 *
 * @分类 [系统↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22611)
 * @请求头 `GET /flowable-engine/system/menus`
 * @更新时间 `2022-12-26 14:52:10`
 */
export interface FlowableEngineSystemMenusGetRequest {}

/**
 * 接口 [菜单↗](https://yapi.huianrong.com/project/1722/interface/api/70612) 的 **返回类型**
 *
 * @分类 [系统↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22611)
 * @请求头 `GET /flowable-engine/system/menus`
 * @更新时间 `2022-12-26 14:52:10`
 */
export type FlowableEngineSystemMenusGetResponse = {
  /**
   * 当你一个路由下面的children声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
   */
  alwaysShow?: boolean;
  /**
   * 子路由
   */
  children?: {
    /**
     * 当你一个路由下面的children声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
     */
    alwaysShow?: boolean;
    /**
     * 子路由
     */
    children?: {}[];
    /**
     * 组件地址
     */
    component?: string;
    /**
     * 菜单分组,1:资产;2:商城;3:商户后台;4:POS后台;5:POS移动;
     */
    groupType?: number;
    /**
     * 是否隐藏路由，当设置true的时候该路由不会再侧边栏出现
     */
    hidden?: boolean;
    /**
     * 是否为外链（0是1否）
     */
    isFrame?: number;
    /**
     * 其他元素
     */
    meta?: {
      /**
       * 设置该路由的图标，对应路径srcassetsiconssvg
       */
      icon?: string;
      /**
       * 内链地址（http(s):开头）
       */
      link?: string;
      /**
       * 设置为true，则不会被<keep-alive>缓存
       */
      noCache?: boolean;
      /**
       * 设置该路由在侧边栏和面包屑中展示的名字
       */
      title?: string;
    };
    /**
     * 路由名字
     */
    name?: string;
    /**
     * 路由名字英文
     */
    nameEn?: string;
    /**
     * 路由地址
     */
    path?: string;
    /**
     * 重定向地址，当设置noRedirect的时候该路由在面包屑导航中不可被点击
     */
    redirect?: string;
    /**
     * 描述
     */
    remark?: string;
    /**
     * 路由参数：如{"id":1,"name":"ry"}
     */
    query?: string;
  }[];
  /**
   * 组件地址
   */
  component?: string;
  /**
   * 菜单分组,1:资产;2:商城;3:商户后台;4:POS后台;5:POS移动;
   */
  groupType?: number;
  /**
   * 是否隐藏路由，当设置true的时候该路由不会再侧边栏出现
   */
  hidden?: boolean;
  /**
   * 是否为外链（0是1否）
   */
  isFrame?: number;
  /**
   * 其他元素
   */
  meta?: {
    /**
     * 设置该路由的图标，对应路径srcassetsiconssvg
     */
    icon?: string;
    /**
     * 内链地址（http(s):开头）
     */
    link?: string;
    /**
     * 设置为true，则不会被<keep-alive>缓存
     */
    noCache?: boolean;
    /**
     * 设置该路由在侧边栏和面包屑中展示的名字
     */
    title?: string;
  };
  /**
   * 路由名字
   */
  name?: string;
  /**
   * 路由名字英文
   */
  nameEn?: string;
  /**
   * 路由地址
   */
  path?: string;
  /**
   * 重定向地址，当设置noRedirect的时候该路由在面包屑导航中不可被点击
   */
  redirect?: string;
  /**
   * 描述
   */
  remark?: string;
  /**
   * 路由参数：如{"id":1,"name":"ry"}
   */
  query?: string;
}[];

/**
 * 接口 [菜单↗](https://yapi.huianrong.com/project/1722/interface/api/70612) 的 **请求配置的类型**
 *
 * @分类 [系统↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22611)
 * @请求头 `GET /flowable-engine/system/menus`
 * @更新时间 `2022-12-26 14:52:10`
 */
type FlowableEngineSystemMenusGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1722',
    '',
    '',
    '/flowable-engine/system/menus',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [菜单↗](https://yapi.huianrong.com/project/1722/interface/api/70612) 的 **请求配置**
 *
 * @分类 [系统↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22611)
 * @请求头 `GET /flowable-engine/system/menus`
 * @更新时间 `2022-12-26 14:52:10`
 */
const flowableEngineSystemMenusGetRequestConfig: FlowableEngineSystemMenusGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_12,
    devUrl: devUrl_0_1_0_12,
    prodUrl: prodUrl_0_1_0_12,
    path: '/flowable-engine/system/menus',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_12,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'flowableEngineSystemMenusGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [菜单↗](https://yapi.huianrong.com/project/1722/interface/api/70612) 的 **请求函数**
 *
 * @分类 [系统↗](https://yapi.huianrong.com/project/1722/interface/api/cat_22611)
 * @请求头 `GET /flowable-engine/system/menus`
 * @更新时间 `2022-12-26 14:52:10`
 */
export const flowableEngineSystemMenusGet = /*#__PURE__*/ (
  requestData?: FlowableEngineSystemMenusGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<FlowableEngineSystemMenusGetResponse>(
    prepare(flowableEngineSystemMenusGetRequestConfig, requestData),
    ...args
  );
};

flowableEngineSystemMenusGet.requestConfig =
  flowableEngineSystemMenusGetRequestConfig;

/* prettier-ignore-end */
