import { merge } from 'lodash';
import axios, { AxiosRequestConfig } from 'axios';
import type { Options } from '@har/use';
import { RequestFunctionParams } from 'yapi-to-typescript';
import { Message } from '@arco-design/web-vue';
import router from '@/router';
import store from '@/store';
import lsStore from '@/utils/ls-store';
import useToken from '@/composables/useToken';
import { getPlatformFlag } from '@/utils';

const instance = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export interface RequestOptions {
  /**
   * 使用的服务器。
   *
   * - `prod`: 生产服务器
   * - `dev`: 测试服务器
   * - `mock`: 模拟服务器
   *
   * @default prod
   */
  server?: 'prod' | 'dev' | 'mock';
  cache?: boolean;
  show?: boolean;
}
type ParamsType = {
  _?: number;
};
type TParams = [RequestFunctionParams, RequestOptions];
export function service<T = unknown>(
  payload: TParams[0],
  options: TParams[1],
  config: AxiosRequestConfig = {} as AxiosRequestConfig
): Promise<T> {
  const params: ParamsType = {};
  if (payload.method === 'GET') {
    if (!options.cache) {
      params._ = Date.now();
    }
  }
  const t = useToken();
  const axiosRequestConfig = merge(
    {
      url: payload.path,
      method: payload.method,
      params,
      headers: {
        'Authorization': t.getToken() || '',
        'client-id': `${store.state.value?.user?.user?.clientId}`,
        'businessId': `${store.state.value?.user?.user?.businessId}`,
        'project-id': `${store.state.value?.user?.currentProject?.value || ''}`
      },
      data: payload.hasFileData ? payload.getFormData() : payload.data
    },
    config
  );
  return instance
    .request(axiosRequestConfig)
    .then(async ({ data: tempData, config }) => {
      // 二进制文件处理
      let data = tempData;

      if (data instanceof Blob) {
        try {
          const d = await data.text();
          data = JSON.parse(d);
        } catch (e) {
          return data;
        }
      }
      const { code } = data;
      if (code === 200) {
        return data.data;
      }
      lsStore.setItem('state', '');
      if (code === 401) {
        return handleError(data);
      }
      Message.error({ content: data.msg });
      return Promise.reject(data);
    });
}

async function handleError(data: { code: number; msg: string }) {
  const { code, msg } = data;
  if (code === 401) {
    // 跳转
    Message.error({ content: msg || '登录状态已过期,请重新登录' });
    const t = useToken();
    t.setToken('');
    // const plat = getPlatformFlag();
    // router.replace(plat ? `/${plat}/login` : '/login');
    await router.replace('platform/login');
    return Promise.reject(data);
  }
}

export default function defaultRequest<T>(
  payload: TParams[0],
  options: TParams[1] & Options<any, any> = {}
): Promise<T> {
  return service<T>(payload, options).catch((e: Error) => {
    lsStore.setItem('state', '');
    if (e.message) {
      Message.error({ content: e.message });
    }
    return Promise.reject(e);
  });
}
