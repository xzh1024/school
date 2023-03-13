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

const mockUrl_0_3_0_1 = 'https://yapi.huianrong.com/mock/1716' as any;
const devUrl_0_3_0_1 = '' as any;
const prodUrl_0_3_0_1 = '' as any;
const dataKey_0_3_0_1 = 'data' as any;

/**
 * 接口 [生成验证码↗](https://yapi.huianrong.com/project/1716/interface/api/68744) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/captchaImage`
 * @更新时间 `2023-02-23 16:10:53`
 */
export interface CbdApiPortalCaptchaImageGetRequest {}

/**
 * 接口 [生成验证码↗](https://yapi.huianrong.com/project/1716/interface/api/68744) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/captchaImage`
 * @更新时间 `2023-02-23 16:10:53`
 */
export interface CbdApiPortalCaptchaImageGetResponse {
  /**
   * 验证码开关
   */
  captchaOnOff?: boolean;
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
 * 接口 [生成验证码↗](https://yapi.huianrong.com/project/1716/interface/api/68744) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/captchaImage`
 * @更新时间 `2023-02-23 16:10:53`
 */
type CbdApiPortalCaptchaImageGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1716',
    '',
    '',
    '/cbd-api-portal/captchaImage',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [生成验证码↗](https://yapi.huianrong.com/project/1716/interface/api/68744) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/captchaImage`
 * @更新时间 `2023-02-23 16:10:53`
 */
const cbdApiPortalCaptchaImageGetRequestConfig: CbdApiPortalCaptchaImageGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_3_0_1,
    devUrl: devUrl_0_3_0_1,
    prodUrl: prodUrl_0_3_0_1,
    path: '/cbd-api-portal/captchaImage',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_3_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'cbdApiPortalCaptchaImageGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [生成验证码↗](https://yapi.huianrong.com/project/1716/interface/api/68744) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/captchaImage`
 * @更新时间 `2023-02-23 16:10:53`
 */
export const cbdApiPortalCaptchaImageGet = /*#__PURE__*/ (
  requestData?: CbdApiPortalCaptchaImageGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiPortalCaptchaImageGetResponse>(
    prepare(cbdApiPortalCaptchaImageGetRequestConfig, requestData),
    ...args
  );
};

cbdApiPortalCaptchaImageGet.requestConfig =
  cbdApiPortalCaptchaImageGetRequestConfig;

/**
 * 接口 [登录方法↗](https://yapi.huianrong.com/project/1716/interface/api/68746) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `POST /cbd-api-portal/login`
 * @更新时间 `2023-02-23 16:10:54`
 */
export interface CbdApiPortalLoginPostRequest {
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
 * 接口 [登录方法↗](https://yapi.huianrong.com/project/1716/interface/api/68746) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `POST /cbd-api-portal/login`
 * @更新时间 `2023-02-23 16:10:54`
 */
export interface CbdApiPortalLoginPostResponse {
  /**
   * 用户token
   */
  token?: string;
}

/**
 * 接口 [登录方法↗](https://yapi.huianrong.com/project/1716/interface/api/68746) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `POST /cbd-api-portal/login`
 * @更新时间 `2023-02-23 16:10:54`
 */
type CbdApiPortalLoginPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1716',
    '',
    '',
    '/cbd-api-portal/login',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [登录方法↗](https://yapi.huianrong.com/project/1716/interface/api/68746) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `POST /cbd-api-portal/login`
 * @更新时间 `2023-02-23 16:10:54`
 */
const cbdApiPortalLoginPostRequestConfig: CbdApiPortalLoginPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_3_0_1,
    devUrl: devUrl_0_3_0_1,
    prodUrl: prodUrl_0_3_0_1,
    path: '/cbd-api-portal/login',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_3_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'cbdApiPortalLoginPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [登录方法↗](https://yapi.huianrong.com/project/1716/interface/api/68746) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `POST /cbd-api-portal/login`
 * @更新时间 `2023-02-23 16:10:54`
 */
export const cbdApiPortalLoginPost = /*#__PURE__*/ (
  requestData: CbdApiPortalLoginPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiPortalLoginPostResponse>(
    prepare(cbdApiPortalLoginPostRequestConfig, requestData),
    ...args
  );
};

cbdApiPortalLoginPost.requestConfig = cbdApiPortalLoginPostRequestConfig;

/**
 * 接口 [获取用户信息↗](https://yapi.huianrong.com/project/1716/interface/api/68748) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/getInfo`
 * @更新时间 `2023-02-23 16:10:55`
 */
export interface CbdApiPortalGetInfoGetRequest {}

/**
 * 接口 [获取用户信息↗](https://yapi.huianrong.com/project/1716/interface/api/68748) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/getInfo`
 * @更新时间 `2023-02-23 16:10:55`
 */
export interface CbdApiPortalGetInfoGetResponse {
  /**
   * 用户对象 ,RespUserBaseInfoDto
   */
  user?: {
    /**
     * 用户ID
     */
    userId: number;
    /**
     * 用户编码
     */
    userCode: string;
    /**
     * 登录名
     */
    userName: string;
    /**
     * 昵称
     */
    nickName?: string;
    /**
     * 姓名
     */
    realName?: string;
    /**
     * 用户性别（0男1女2未知）
     */
    sex?: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 帐号状态（0正常1停用）
     */
    status?: string;
    /**
     * 所属部门,组织架构
     */
    deptId?: number;
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
 * 接口 [获取用户信息↗](https://yapi.huianrong.com/project/1716/interface/api/68748) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/getInfo`
 * @更新时间 `2023-02-23 16:10:55`
 */
type CbdApiPortalGetInfoGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1716',
    '',
    '',
    '/cbd-api-portal/getInfo',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [获取用户信息↗](https://yapi.huianrong.com/project/1716/interface/api/68748) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/getInfo`
 * @更新时间 `2023-02-23 16:10:55`
 */
const cbdApiPortalGetInfoGetRequestConfig: CbdApiPortalGetInfoGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_3_0_1,
    devUrl: devUrl_0_3_0_1,
    prodUrl: prodUrl_0_3_0_1,
    path: '/cbd-api-portal/getInfo',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_3_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'cbdApiPortalGetInfoGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取用户信息↗](https://yapi.huianrong.com/project/1716/interface/api/68748) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/getInfo`
 * @更新时间 `2023-02-23 16:10:55`
 */
export const cbdApiPortalGetInfoGet = /*#__PURE__*/ (
  requestData?: CbdApiPortalGetInfoGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiPortalGetInfoGetResponse>(
    prepare(cbdApiPortalGetInfoGetRequestConfig, requestData),
    ...args
  );
};

cbdApiPortalGetInfoGet.requestConfig = cbdApiPortalGetInfoGetRequestConfig;

/**
 * 接口 [获取路由信息↗](https://yapi.huianrong.com/project/1716/interface/api/68750) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/getRouters`
 * @更新时间 `2023-02-23 16:10:57`
 */
export interface CbdApiPortalGetRoutersGetRequest {}

/**
 * 接口 [获取路由信息↗](https://yapi.huianrong.com/project/1716/interface/api/68750) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/getRouters`
 * @更新时间 `2023-02-23 16:10:57`
 */
export type CbdApiPortalGetRoutersGetResponse = {
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
   * 菜单分组,1:资产;2:商城;3:商户后台;4:POS后台;5:POS移动;
   */
  groupType?: number;
  /**
   * 描述
   */
  remark?: string;
  /**
   * 系统是否可用(1可用；2不可用)
   */
  available?: number;
  /**
   * 业务标识
   */
  extra?: string;
}[];

/**
 * 接口 [获取路由信息↗](https://yapi.huianrong.com/project/1716/interface/api/68750) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/getRouters`
 * @更新时间 `2023-02-23 16:10:57`
 */
type CbdApiPortalGetRoutersGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1716',
    '',
    '',
    '/cbd-api-portal/getRouters',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [获取路由信息↗](https://yapi.huianrong.com/project/1716/interface/api/68750) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/getRouters`
 * @更新时间 `2023-02-23 16:10:57`
 */
const cbdApiPortalGetRoutersGetRequestConfig: CbdApiPortalGetRoutersGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_3_0_1,
    devUrl: devUrl_0_3_0_1,
    prodUrl: prodUrl_0_3_0_1,
    path: '/cbd-api-portal/getRouters',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_3_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'cbdApiPortalGetRoutersGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取路由信息↗](https://yapi.huianrong.com/project/1716/interface/api/68750) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `GET /cbd-api-portal/getRouters`
 * @更新时间 `2023-02-23 16:10:57`
 */
export const cbdApiPortalGetRoutersGet = /*#__PURE__*/ (
  requestData?: CbdApiPortalGetRoutersGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiPortalGetRoutersGetResponse>(
    prepare(cbdApiPortalGetRoutersGetRequestConfig, requestData),
    ...args
  );
};

cbdApiPortalGetRoutersGet.requestConfig =
  cbdApiPortalGetRoutersGetRequestConfig;

/**
 * 接口 [登出↗](https://yapi.huianrong.com/project/1716/interface/api/68828) 的 **请求类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `POST /cbd-api-portal/logout`
 * @更新时间 `2023-02-23 16:10:56`
 */
export interface CbdApiPortalLogoutPostRequest {}

/**
 * 接口 [登出↗](https://yapi.huianrong.com/project/1716/interface/api/68828) 的 **返回类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `POST /cbd-api-portal/logout`
 * @更新时间 `2023-02-23 16:10:56`
 */
export interface CbdApiPortalLogoutPostResponse {}

/**
 * 接口 [登出↗](https://yapi.huianrong.com/project/1716/interface/api/68828) 的 **请求配置的类型**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `POST /cbd-api-portal/logout`
 * @更新时间 `2023-02-23 16:10:56`
 */
type CbdApiPortalLogoutPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1716',
    '',
    '',
    '/cbd-api-portal/logout',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [登出↗](https://yapi.huianrong.com/project/1716/interface/api/68828) 的 **请求配置**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `POST /cbd-api-portal/logout`
 * @更新时间 `2023-02-23 16:10:56`
 */
const cbdApiPortalLogoutPostRequestConfig: CbdApiPortalLogoutPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_3_0_1,
    devUrl: devUrl_0_3_0_1,
    prodUrl: prodUrl_0_3_0_1,
    path: '/cbd-api-portal/logout',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_3_0_1,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'cbdApiPortalLogoutPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [登出↗](https://yapi.huianrong.com/project/1716/interface/api/68828) 的 **请求函数**
 *
 * @分类 [用户登录↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22057)
 * @请求头 `POST /cbd-api-portal/logout`
 * @更新时间 `2023-02-23 16:10:56`
 */
export const cbdApiPortalLogoutPost = /*#__PURE__*/ (
  requestData?: CbdApiPortalLogoutPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiPortalLogoutPostResponse>(
    prepare(cbdApiPortalLogoutPostRequestConfig, requestData),
    ...args
  );
};

cbdApiPortalLogoutPost.requestConfig = cbdApiPortalLogoutPostRequestConfig;

const mockUrl_0_3_0_2 = 'https://yapi.huianrong.com/mock/1716' as any;
const devUrl_0_3_0_2 = '' as any;
const prodUrl_0_3_0_2 = '' as any;
const dataKey_0_3_0_2 = 'data' as any;

/**
 * 接口 [回收 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69232) 的 **请求类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/revoke`
 * @更新时间 `2023-02-23 17:29:19`
 */
export interface CbdApiPortalOauth2RevokePostRequest {}

/**
 * 接口 [回收 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69232) 的 **返回类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/revoke`
 * @更新时间 `2023-02-23 17:29:19`
 */
export interface CbdApiPortalOauth2RevokePostResponse {}

/**
 * 接口 [回收 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69232) 的 **请求配置的类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/revoke`
 * @更新时间 `2023-02-23 17:29:19`
 */
type CbdApiPortalOauth2RevokePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1716',
    '',
    '',
    '/cbd-api-portal/oauth2/revoke',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [回收 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69232) 的 **请求配置**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/revoke`
 * @更新时间 `2023-02-23 17:29:19`
 */
const cbdApiPortalOauth2RevokePostRequestConfig: CbdApiPortalOauth2RevokePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_3_0_2,
    devUrl: devUrl_0_3_0_2,
    prodUrl: prodUrl_0_3_0_2,
    path: '/cbd-api-portal/oauth2/revoke',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_3_0_2,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'cbdApiPortalOauth2RevokePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [回收 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69232) 的 **请求函数**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/revoke`
 * @更新时间 `2023-02-23 17:29:19`
 */
export const cbdApiPortalOauth2RevokePost = /*#__PURE__*/ (
  requestData?: CbdApiPortalOauth2RevokePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiPortalOauth2RevokePostResponse>(
    prepare(cbdApiPortalOauth2RevokePostRequestConfig, requestData),
    ...args
  );
};

cbdApiPortalOauth2RevokePost.requestConfig =
  cbdApiPortalOauth2RevokePostRequestConfig;

/**
 * 接口 [刷新 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69234) 的 **请求类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/refresh`
 * @更新时间 `2023-02-23 17:29:20`
 */
export interface CbdApiPortalOauth2RefreshPostRequest {}

/**
 * 接口 [刷新 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69234) 的 **返回类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/refresh`
 * @更新时间 `2023-02-23 17:29:20`
 */
export interface CbdApiPortalOauth2RefreshPostResponse {}

/**
 * 接口 [刷新 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69234) 的 **请求配置的类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/refresh`
 * @更新时间 `2023-02-23 17:29:20`
 */
type CbdApiPortalOauth2RefreshPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1716',
    '',
    '',
    '/cbd-api-portal/oauth2/refresh',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [刷新 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69234) 的 **请求配置**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/refresh`
 * @更新时间 `2023-02-23 17:29:20`
 */
const cbdApiPortalOauth2RefreshPostRequestConfig: CbdApiPortalOauth2RefreshPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_3_0_2,
    devUrl: devUrl_0_3_0_2,
    prodUrl: prodUrl_0_3_0_2,
    path: '/cbd-api-portal/oauth2/refresh',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_3_0_2,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'cbdApiPortalOauth2RefreshPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [刷新 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69234) 的 **请求函数**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/refresh`
 * @更新时间 `2023-02-23 17:29:20`
 */
export const cbdApiPortalOauth2RefreshPost = /*#__PURE__*/ (
  requestData?: CbdApiPortalOauth2RefreshPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiPortalOauth2RefreshPostResponse>(
    prepare(cbdApiPortalOauth2RefreshPostRequestConfig, requestData),
    ...args
  );
};

cbdApiPortalOauth2RefreshPost.requestConfig =
  cbdApiPortalOauth2RefreshPostRequestConfig;

/**
 * 接口 [Code授权码 获取 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69236) 的 **请求类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/token`
 * @更新时间 `2023-02-23 17:29:21`
 */
export interface CbdApiPortalOauth2TokenPostRequest {}

/**
 * 接口 [Code授权码 获取 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69236) 的 **返回类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/token`
 * @更新时间 `2023-02-23 17:29:21`
 */
export interface CbdApiPortalOauth2TokenPostResponse {}

/**
 * 接口 [Code授权码 获取 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69236) 的 **请求配置的类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/token`
 * @更新时间 `2023-02-23 17:29:21`
 */
type CbdApiPortalOauth2TokenPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1716',
    '',
    '',
    '/cbd-api-portal/oauth2/token',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [Code授权码 获取 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69236) 的 **请求配置**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/token`
 * @更新时间 `2023-02-23 17:29:21`
 */
const cbdApiPortalOauth2TokenPostRequestConfig: CbdApiPortalOauth2TokenPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_3_0_2,
    devUrl: devUrl_0_3_0_2,
    prodUrl: prodUrl_0_3_0_2,
    path: '/cbd-api-portal/oauth2/token',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_3_0_2,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'cbdApiPortalOauth2TokenPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [Code授权码 获取 Access-Token↗](https://yapi.huianrong.com/project/1716/interface/api/69236) 的 **请求函数**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/token`
 * @更新时间 `2023-02-23 17:29:21`
 */
export const cbdApiPortalOauth2TokenPost = /*#__PURE__*/ (
  requestData?: CbdApiPortalOauth2TokenPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiPortalOauth2TokenPostResponse>(
    prepare(cbdApiPortalOauth2TokenPostRequestConfig, requestData),
    ...args
  );
};

cbdApiPortalOauth2TokenPost.requestConfig =
  cbdApiPortalOauth2TokenPostRequestConfig;

/**
 * 接口 [授权↗](https://yapi.huianrong.com/project/1716/interface/api/69238) 的 **请求类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/authorize`
 * @更新时间 `2023-02-23 17:29:21`
 */
export interface CbdApiPortalOauth2AuthorizePostRequest {}

/**
 * 接口 [授权↗](https://yapi.huianrong.com/project/1716/interface/api/69238) 的 **返回类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/authorize`
 * @更新时间 `2023-02-23 17:29:21`
 */
export interface CbdApiPortalOauth2AuthorizePostResponse {}

/**
 * 接口 [授权↗](https://yapi.huianrong.com/project/1716/interface/api/69238) 的 **请求配置的类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/authorize`
 * @更新时间 `2023-02-23 17:29:21`
 */
type CbdApiPortalOauth2AuthorizePostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1716',
    '',
    '',
    '/cbd-api-portal/oauth2/authorize',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [授权↗](https://yapi.huianrong.com/project/1716/interface/api/69238) 的 **请求配置**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/authorize`
 * @更新时间 `2023-02-23 17:29:21`
 */
const cbdApiPortalOauth2AuthorizePostRequestConfig: CbdApiPortalOauth2AuthorizePostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_3_0_2,
    devUrl: devUrl_0_3_0_2,
    prodUrl: prodUrl_0_3_0_2,
    path: '/cbd-api-portal/oauth2/authorize',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_3_0_2,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'cbdApiPortalOauth2AuthorizePost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [授权↗](https://yapi.huianrong.com/project/1716/interface/api/69238) 的 **请求函数**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/authorize`
 * @更新时间 `2023-02-23 17:29:21`
 */
export const cbdApiPortalOauth2AuthorizePost = /*#__PURE__*/ (
  requestData?: CbdApiPortalOauth2AuthorizePostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiPortalOauth2AuthorizePostResponse>(
    prepare(cbdApiPortalOauth2AuthorizePostRequestConfig, requestData),
    ...args
  );
};

cbdApiPortalOauth2AuthorizePost.requestConfig =
  cbdApiPortalOauth2AuthorizePostRequestConfig;

/**
 * 接口 [获取Userinfo信息：昵称、头像、性别等等↗](https://yapi.huianrong.com/project/1716/interface/api/69240) 的 **请求类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/userinfo`
 * @更新时间 `2023-02-23 17:29:22`
 */
export interface CbdApiPortalOauth2UserinfoPostRequest {}

/**
 * 接口 [获取Userinfo信息：昵称、头像、性别等等↗](https://yapi.huianrong.com/project/1716/interface/api/69240) 的 **返回类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/userinfo`
 * @更新时间 `2023-02-23 17:29:22`
 */
export interface CbdApiPortalOauth2UserinfoPostResponse {
  /**
   * 角色code ,String
   */
  roleCodes?: string[];
  /**
   * 角色列表 ,RespRoleInfoDto
   */
  roles?: {
    /**
     * 角色编号
     */
    roleCode: string;
    /**
     * 角色名
     */
    roleName: string;
    /**
     * 权限标识
     */
    roleKey: string;
  }[];
  /**
   * 签名图片地址
   */
  signatureUrl?: string;
  /**
   * 部门名称
   */
  deptName?: string;
  /**
   * 所属部门,组织架构
   */
  deptId?: number;
  /**
   * 项目权限 ,RespProjectInfoDto
   */
  projects?: {
    /**
     * 项目id
     */
    projectId: number;
    /**
     * 项目编号
     */
    projectCode: string;
    /**
     * 项目名称
     */
    projectName: string;
  }[];
  /**
   * 用户ID
   */
  userId: number;
  /**
   * 用户编码
   */
  userCode: string;
  /**
   * 登录名
   */
  userName: string;
  /**
   * 昵称
   */
  nickName?: string;
  /**
   * 姓名
   */
  realName?: string;
  /**
   * 用户性别（0男1女2未知）
   */
  sex?: string;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 帐号状态（0正常1停用）
   */
  status?: string;
}

/**
 * 接口 [获取Userinfo信息：昵称、头像、性别等等↗](https://yapi.huianrong.com/project/1716/interface/api/69240) 的 **请求配置的类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/userinfo`
 * @更新时间 `2023-02-23 17:29:22`
 */
type CbdApiPortalOauth2UserinfoPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1716',
    '',
    '',
    '/cbd-api-portal/oauth2/userinfo',
    'data',
    string,
    string,
    true
  >
>;

/**
 * 接口 [获取Userinfo信息：昵称、头像、性别等等↗](https://yapi.huianrong.com/project/1716/interface/api/69240) 的 **请求配置**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/userinfo`
 * @更新时间 `2023-02-23 17:29:22`
 */
const cbdApiPortalOauth2UserinfoPostRequestConfig: CbdApiPortalOauth2UserinfoPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_3_0_2,
    devUrl: devUrl_0_3_0_2,
    prodUrl: prodUrl_0_3_0_2,
    path: '/cbd-api-portal/oauth2/userinfo',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_3_0_2,
    paramNames: [],
    queryNames: [],
    requestDataOptional: true,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'cbdApiPortalOauth2UserinfoPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取Userinfo信息：昵称、头像、性别等等↗](https://yapi.huianrong.com/project/1716/interface/api/69240) 的 **请求函数**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/userinfo`
 * @更新时间 `2023-02-23 17:29:22`
 */
export const cbdApiPortalOauth2UserinfoPost = /*#__PURE__*/ (
  requestData?: CbdApiPortalOauth2UserinfoPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiPortalOauth2UserinfoPostResponse>(
    prepare(cbdApiPortalOauth2UserinfoPostRequestConfig, requestData),
    ...args
  );
};

cbdApiPortalOauth2UserinfoPost.requestConfig =
  cbdApiPortalOauth2UserinfoPostRequestConfig;

/**
 * 接口 [生成凭证↗](https://yapi.huianrong.com/project/1716/interface/api/69242) 的 **请求类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `GET /cbd-api-portal/oauth2/genCredential`
 * @更新时间 `2023-02-23 17:29:24`
 */
export interface CbdApiPortalOauth2GenCredentialGetRequest {
  /**
   * 子系统系统名称(String)
   */
  system?: string;
  /**
   * 子系统地址(String)
   */
  link?: string;
}

/**
 * 接口 [生成凭证↗](https://yapi.huianrong.com/project/1716/interface/api/69242) 的 **返回类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `GET /cbd-api-portal/oauth2/genCredential`
 * @更新时间 `2023-02-23 17:29:24`
 */
export interface CbdApiPortalOauth2GenCredentialGetResponse {
  /**
   * 凭证
   */
  certificate: string;
}

/**
 * 接口 [生成凭证↗](https://yapi.huianrong.com/project/1716/interface/api/69242) 的 **请求配置的类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `GET /cbd-api-portal/oauth2/genCredential`
 * @更新时间 `2023-02-23 17:29:24`
 */
type CbdApiPortalOauth2GenCredentialGetRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1716',
    '',
    '',
    '/cbd-api-portal/oauth2/genCredential',
    'data',
    string,
    'system' | 'link',
    false
  >
>;

/**
 * 接口 [生成凭证↗](https://yapi.huianrong.com/project/1716/interface/api/69242) 的 **请求配置**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `GET /cbd-api-portal/oauth2/genCredential`
 * @更新时间 `2023-02-23 17:29:24`
 */
const cbdApiPortalOauth2GenCredentialGetRequestConfig: CbdApiPortalOauth2GenCredentialGetRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_3_0_2,
    devUrl: devUrl_0_3_0_2,
    prodUrl: prodUrl_0_3_0_2,
    path: '/cbd-api-portal/oauth2/genCredential',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_3_0_2,
    paramNames: [],
    queryNames: ['system', 'link'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'cbdApiPortalOauth2GenCredentialGet',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [生成凭证↗](https://yapi.huianrong.com/project/1716/interface/api/69242) 的 **请求函数**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `GET /cbd-api-portal/oauth2/genCredential`
 * @更新时间 `2023-02-23 17:29:24`
 */
export const cbdApiPortalOauth2GenCredentialGet = /*#__PURE__*/ (
  requestData: CbdApiPortalOauth2GenCredentialGetRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiPortalOauth2GenCredentialGetResponse>(
    prepare(cbdApiPortalOauth2GenCredentialGetRequestConfig, requestData),
    ...args
  );
};

cbdApiPortalOauth2GenCredentialGet.requestConfig =
  cbdApiPortalOauth2GenCredentialGetRequestConfig;

/**
 * 接口 [获取应用oauth2配置信息↗](https://yapi.huianrong.com/project/1716/interface/api/72304) 的 **请求类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/clientConfig`
 * @更新时间 `2023-02-23 17:29:23`
 */
export interface CbdApiPortalOauth2ClientConfigPostRequest {
  /**
   * 集团客户应用id即clientCode
   */
  clientId: string;
  /**
   * 系统标识
   */
  systemName: string;
}

/**
 * 接口 [获取应用oauth2配置信息↗](https://yapi.huianrong.com/project/1716/interface/api/72304) 的 **返回类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/clientConfig`
 * @更新时间 `2023-02-23 17:29:23`
 */
export interface CbdApiPortalOauth2ClientConfigPostResponse {
  /**
   * oauth2服务端授权回调地址，如:http:xxxx.xx:xxxxxurl;,这个地址应该是当前接入sdk的服务器实例地址
   */
  authorizedCallbackAddress?: string;
  /**
   * 处理成功后重定向地址，如:前端某个页面
   */
  successRedirectAddress?: string;
  /**
   * 处理失败后重定向地址，如：前端某个登录页面
   */
  failRedirectAddress?: string;
}

/**
 * 接口 [获取应用oauth2配置信息↗](https://yapi.huianrong.com/project/1716/interface/api/72304) 的 **请求配置的类型**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/clientConfig`
 * @更新时间 `2023-02-23 17:29:23`
 */
type CbdApiPortalOauth2ClientConfigPostRequestConfig = Readonly<
  RequestConfig<
    'https://yapi.huianrong.com/mock/1716',
    '',
    '',
    '/cbd-api-portal/oauth2/clientConfig',
    'data',
    string,
    string,
    false
  >
>;

/**
 * 接口 [获取应用oauth2配置信息↗](https://yapi.huianrong.com/project/1716/interface/api/72304) 的 **请求配置**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/clientConfig`
 * @更新时间 `2023-02-23 17:29:23`
 */
const cbdApiPortalOauth2ClientConfigPostRequestConfig: CbdApiPortalOauth2ClientConfigPostRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_3_0_2,
    devUrl: devUrl_0_3_0_2,
    prodUrl: prodUrl_0_3_0_2,
    path: '/cbd-api-portal/oauth2/clientConfig',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_3_0_2,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'cbdApiPortalOauth2ClientConfigPost',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {}
  };

/**
 * 接口 [获取应用oauth2配置信息↗](https://yapi.huianrong.com/project/1716/interface/api/72304) 的 **请求函数**
 *
 * @分类 [oauth2认证↗](https://yapi.huianrong.com/project/1716/interface/api/cat_22155)
 * @请求头 `POST /cbd-api-portal/oauth2/clientConfig`
 * @更新时间 `2023-02-23 17:29:23`
 */
export const cbdApiPortalOauth2ClientConfigPost = /*#__PURE__*/ (
  requestData: CbdApiPortalOauth2ClientConfigPostRequest,
  ...args: UserRequestRestArgs
) => {
  return request<CbdApiPortalOauth2ClientConfigPostResponse>(
    prepare(cbdApiPortalOauth2ClientConfigPostRequestConfig, requestData),
    ...args
  );
};

cbdApiPortalOauth2ClientConfigPost.requestConfig =
  cbdApiPortalOauth2ClientConfigPostRequestConfig;

/* prettier-ignore-end */
