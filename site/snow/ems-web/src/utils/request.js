import storage from '@/utils/storage';
import axios from 'axios';
import dayjs from 'dayjs';
import md5 from 'js-md5';
import { v4 as uuid } from 'uuid';

let confirmModal = null;

let requestMap = {};

const getToken = (key = process.env.REACT_APP_TOKEN_FIELD) => {
  return storage.get(key, 'sessionStorage') || '';
};
const getTokened = (key = process.env.REACT_APP_TOKEN_FIELD) => {
  return storage.get('AI_TOKEN', 'sessionStorage') || '';
};

const blobToJson = blobData => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(JSON.parse(reader.result));
    };
    reader.onerror = reject;
    reader.readAsText(blobData);
  });
};

/**
 * 请求拦截器
 * 处理http请求request，添加token等
 */

const request = axios.create({
  withCredentials: true,
  // timeout: 60000,
  baseURL: process.env.REACT_APP_BASE_URL,
});

request.interceptors.request.use(
  config => {
    let headers = {};
    if (config.type === 'ai') {
      headers = { token: getTokened(), ems: 'pc', ...config.headers };
    } else {
      headers = { token: getToken(), ems: 'pc', ...config.headers };
    }
    config.headers = headers;

    // 重新登陆窗口打开时  请求取消
    if (confirmModal) {
      const cancelFunc = requestMap[config.headers.requestId];
      delete requestMap[config.headers.requestId];
      cancelFunc && cancelFunc();
    }
    return config;
  },
  error => {
    console.log(error, 123123);
    return Promise.reject(error);
  },
);

/**
 * 响应拦截器
 * 处理http响应response，判断异常或错误等
 */
request.interceptors.response.use(
  response => {
    const data = response.data;
    delete requestMap[response.config.headers.requestId];
    if (response.config.responseType === 'blob') {
      if (data.type === 'application/json') {
        return blobToJson(data);
      }
      return Promise.resolve(data);
    }

    // 正常情况code === 200     flag判断为警示中心
    if (data.code === 200 || ['SUCCESS', 'success'].includes(data.flag) || data.isOk || data.code === 'SUCCESS') {
      return Promise.resolve(data);
    }

    if (data.code === 403) {
      console.log(response, 38211111);
      // 没有权限后取消所有接口请求
      Object.keys(requestMap).forEach(requestId => {
        const cancelFunc = requestMap[requestId];
        if (requestId !== response.config.headers.requestId) {
          cancelFunc && cancelFunc();
        }
      });
      requestMap = {};

      storage.remove(process.env.REACT_APP_TOKEN_FIELD, 'sessionStorage');
      confirmModal = true;

      if (data.model === 'local') {
        const url = `${location.origin}${
          process.env.NODE_ENV === 'development' ? '' : '/ems-web'
        }/login?redirect=${encodeURIComponent(location.href)}`;
        window.$message.error('登陆信息失效，是否重新登陆？');
        window.location.href = url;
      }

      if (data.model === 'ldap') {
        const url = data.redirectUrl + encodeURIComponent(window.location.href);
        window.location.href = url;
      }

      setTimeout(() => {
        confirmModal = null;
      }, 10);

      // confirmModal = window.$modal.confirm({
      //   token: {
      //     borderRadiusSM: 2,
      //   },
      //   title: '温馨提示',
      //   content: '登陆信息失效，是否重新登陆？',
      //   onOk: () => {

      //   },
      //   onCancel: () => {
      //     confirmModal = null;
      //   },
      // });
      return Promise.reject(data);
    }

    if (!response.config.hideMsg) {
      console.log(response, 1888888);

      window.$message.error(data.message || data.msg || '请求失败');
    }

    return Promise.reject(data);
  },
  error => {
    // 手动取消
    if (error.code === 'ERR_CANCELED') {
      return Promise.reject(error);
    }
    delete requestMap[error.config.headers.requestId];

    window.$message.error(error.message);
    return Promise.reject(error);
  },
);

export default config => {
  const requestId = uuid();
  config.headers = { ...(config.headers || {}), requestId };
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      requestMap[requestId] = cancel;
    });

  return request(config);
};

// 调用AI的ecsb方法
export const ecsbPostAi = params => {
  const ecsbVersion = process.env.REACT_APP_ENV === 'prod' ? 'prod' : 'uat';
  const ecsb = process.env.REACT_APP_ENV === 'prod' ? 'snowbeer.PASS_RBAC.RBAC.v2_' : 'snowbeer.SPP.spp.v2_';

  const ecsbBaseUrl =
    process.env.REACT_APP_ENV === 'prod'
      ? 'https://ecsb-crb.crcloud.com/ecsb/gw/app/rf/'
      : 'https://ecsb-dev.crb.cn/ecsb/gw/app/rf/';
  const appTokenKey = sessionStorage.getItem('APPTOKEN');
  const { url, headers = {} } = params;
  const base64str = btoa(
    `Api_ID=${
      ecsb + url
    }&Api_Version=${ecsbVersion}&App_ID=VTest&App_Sub_ID=1200000702Q0&App_Token=${appTokenKey}&App_Version=V1.0.3&Divice_ID=diviceId&Divice_Version=diviceVersion&ENV=${
      ecsbVersion === 'prod' ? 'prd' : ecsbVersion
    }&OS_Version=osVersion&Partner_ID=12000000&Sign=NO_SIGN&Time_Stamp=${dayjs().format(
      'YYYY-MM-DD HH:mm:ss:SSS',
    )}&User_Token=`,
  );
  params.method = 'post';
  params.url = `${ecsbBaseUrl}?ssdp=${base64str}`;
  params.headers = Object.assign(
    {
      'Content-type': 'application/json',
      key: url,
      token: sessionStorage.getItem('AI_TOKEN'),
      emsToken: sessionStorage.getItem('token'),
    },
    headers,
  );
  return request(params);
};

// 获取移动报销ecsbAppToken
export const getEcsbAppToken = (params = {}) => {
  const { headers = {} } = params;
  const ecsbBaseUrl =
    process.env.REACT_APP_ENV === 'prod'
      ? 'https://ecsb-crb.crcloud.com/ecsb/gw/app/rf/'
      : 'https://ecsb-dev.crb.cn/ecsb/gw/app/rf/';

  const appToken =
    process.env.REACT_APP_ENV === 'prod' ? 'a6382ea8b15d46a1b32dc4483d858f2c' : '211afc09622f4963bc96fedf4a239c79';
  const appKey =
    process.env.REACT_APP_ENV === 'prod' ? '65dda95285d945a5a0c99a0a62c66f06' : '6137130a6abc4131901772527cf83ee3';

  let time = dayjs().format('YYYY-MM-DD HH:mm:ss:SSS');
  let ats = md5(
    `Api_ID=crc.ssdp.public.apptoken&Api_Version=1.0&App_ID=VTest&App_Sub_ID=1200000702Q0&App_Token=${appToken}&App_Version=V1.0.3&Divice_ID=diviceId&Divice_Version=diviceVersion&ENV=${
      process.env.REACT_APP_ENV === 'prod' ? 'prd' : 'uat'
    }&OS_Version=osVersion&Partner_ID=12000000&REQUEST_DATA={"App_key":"${appKey}"}&Time_Stamp=${time}&User_Token=&${appKey}`,
  ).toUpperCase();

  const sign = btoa(
    `Api_ID=crc.ssdp.public.apptoken&Api_Version=1.0&App_ID=VTest&App_Sub_ID=1200000702Q0&App_Token=${appToken}&App_Version=V1.0.3&Divice_ID=diviceId&Divice_Version=diviceVersion&ENV=${
      process.env.REACT_APP_ENV === 'prod' ? 'prd' : 'uat'
    }&OS_Version=osVersion&Partner_ID=12000000&Sign=${ats}&Time_Stamp=${time}&User_Token=&`,
  );

  params.url = `${ecsbBaseUrl}?ssdp=${sign}`;
  params.headers = Object.assign(
    {
      // 'Content-type': 'application/x-www-form-urlencoded',
      key: 'crc.ssdp.public.apptoken',
      token: sessionStorage.getItem('token'),
    },
    headers,
  );

  return axios({
    ...params,
    method: 'post',
    data: {
      App_key:
        process.env.REACT_APP_ENV === 'prod' ? '65dda95285d945a5a0c99a0a62c66f06' : '6137130a6abc4131901772527cf83ee3',
    },
  }).then(res => {
    if (res.status === 200) {
      if (res.data.RESPONSE.RETURN_CODE === 'S0A00000') {
        sessionStorage.setItem('APPTOKEN', res.data.RESPONSE.RETURN_DATA.App_Token);
        return res.data;
      }
      return res.data;
    }
  });
};
