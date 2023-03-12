import { useRequest } from "@har/use";
import { login } from "@/utils/user";
import ls from "@/ls";
import { RequestFunctionParams } from "yapi-to-typescript";
let appId = "";

// #ifdef MP-WEIXIN
const { miniProgram } = uni.getAccountInfoSync();
console.log(miniProgram);
appId = miniProgram.appId;
// #endif

// #ifdef H5
if (process.env.NODE_ENV === "development") {
  appId = "wx241299e426d020fe";
}
// #endif

type Options = {
  cache?: boolean;
  server?: "mock" | "dev" | "prod";
  show?: boolean;
};
function service(payload: RequestFunctionParams, options: Options) {
  const params: any = {};
  if (payload.method === "GET") {
    if (!options.cache) {
      params._ = Date.now();
    }
  }
  // 基本地址
  const baseUrl =
    options.server === "mock"
      ? payload.mockUrl
      : options.server === "dev"
      ? payload.devUrl
      : payload.prodUrl;
  const url = `${baseUrl}${payload.path}`;
  return (
    uni
      .request({
        url,
        method: payload.method as any,
        data: payload.data,
        header: {
          "app-id": appId,
          "client-id": ls.get("clientId") || "",
          "project-id": ls.get("projectId") || "",
          "token": ls.get("token") || "",
          "login-id": ls.get("loginId") || ""
        }
      })
      // @ts-ignore
      .then(async (res: any) => {
        const { code, msg } = res.data;
        if ([200, 302, 401].includes(code)) {
          return res.data;
        } else {
          throw {
            ...res.data,
            message: msg
          };
        }
      })
  );
}
let count = 0;
async function requestData<T extends Record<string, any>>(
  d: T,
  refreshAsync: () => Promise<T>
): Promise<T> {
  if (d.code === 302 || d.code === 401) {
    ls.remove("token");
    if (count > 5) Promise.reject();
    count++;
    await login();
    const dd = await refreshAsync();
    return requestData(dd, refreshAsync);
  } else {
    count = 0;
    return d.data;
  }
}
export default async function <T extends object>(
  payload: RequestFunctionParams,
  options: Options = {}
) {
  options = Object.assign({ server: "dev", cache: true, show: true }, options);
  const request = useRequest<T, [RequestFunctionParams, Options]>(service, {
    manual: true,
    onError({ message }) {
      if (options.show) {
        uni.showToast({
          icon: "none",
          title: message
        });
      }
    }
  });
  const d = await request.runAsync(payload, options);
  return requestData<T>(d, request.refreshAsync);
}
