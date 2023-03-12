import ls from "@/ls";
import { cbdApiAppletUserSaveInfoPost, cbdApiAppletUserLoginPost } from "@/api";
import { useAppStore } from "@/stores/app";
// 微信登录
export async function login() {
  // #ifndef H5
  const { code } = (await uni.login({})) as unknown as UniNamespace.LoginRes;
  // const accountInfo = uni.getAccountInfoSync();
  const d = await cbdApiAppletUserLoginPost({
    code
  });
  ls.set("clientId", d.clientId);
  ls.set("token", d.token);
  ls.set("loginId", d.loginId);
  return d;
  // #endif
}

export async function loginStatus() {
  if (!ls.get("token")) {
    await login();
  } else {
    try {
      await uni.checkSession({});
    } catch (e) {
      await login();
    }
  }
  return;
}
export default async () => {
  // #ifdef MP-WEIXIN
  await loginStatus();
  //  #endif
  const store = useAppStore();
  return store.getUserInfo();
};

export async function validateHasUserInfo(callback?: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const store = useAppStore();
    const user = store.userInfo;
    if (user?.nickName) {
      resolve();
    } else {
      uni.getUserProfile({
        desc: "用于完善会员资料",
        success: async (e) => {
          console.log(e);
          const { code } = (await uni.login(
            {}
          )) as unknown as UniNamespace.LoginRes;
          await cbdApiAppletUserSaveInfoPost({
            ...e,
            code
          });
          await store.getUserInfo(true);
          callback && callback();
          resolve();
        },
        fail: (e) => {
          console.log(e);
          reject();
        }
      });
    }
  });
}
// todo 优化实现
let res: any = null;
let rej: any = null;
const ready = function () {
  return new Promise<void>((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
};

export async function callbackReady(bool?: boolean) {
  bool ? res?.() : rej?.();
  res = null;
  rej = null;
}
export function validatePhone() {
  const store = useAppStore();
  if (!store.userInfo?.phone) {
    store.updateShowLogin(true);
    return ready();
  }
  return Promise.resolve();
}

export function authUserInfo() {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await validateHasUserInfo();
      await validatePhone();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
