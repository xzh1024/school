import type { Router } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { useUserStore } from '@/store';
import { getPlatformFlag } from '@/utils';

import { useUserStore as useUserPlatformStore } from '@/store/platform/user';
import { useUserStore as useUserPcsStore } from '@/store/pcs/user';
import { useUserStore as useSvcUserStore } from '@/store/svc/user';
import { useUserStore as useVmsUserStore } from '@/store/vms/user';
import {
  cbdApiProjectOauth2AuthorizeGet,
  cbdApiProjectOauth2ExchangeGet
} from '@/api';
import { StoreGeneric } from 'pinia';

import {
  flowableEngineOauth2AuthorizeGet,
  flowableEngineOauth2ExchangeGet
} from '@/api/flowable-engine';

import lsStore from '@/utils/ls-store';
import useToken from '@/composables/useToken';
import {
  groundPcApiOauth2AuthorizeGet,
  groundPcApiOauth2ExchangeGet
} from '@/api/ground-pc-api';
import {
  svcWebOauth2AuthorizeGet,
  svcWebOauth2ExchangeGet
} from '@/api/svc-web';
const t = useToken();

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const { source = '' } = to.query;
    const state = lsStore.getItem('state');
    if (source || state) {
      if (source) lsStore.setItem('state', '');
      await authHandle(source as string);
      //注： 重定向时不能操作  否则出现闪动
      if (!lsStore.getItem('state') && !source) await tokenAuth(to, next);
    } else {
      await tokenAuth(to, next);
    }
  });
  router.afterEach(() => {
    NProgress.done();
  });
}
async function tokenAuth(to: any, next: (v?: string) => void) {
  const { requiresAuth = true } = to.meta;
  if (requiresAuth) {
    await splitPlatform(to.path, next);
  } else {
    next();
  }
}
async function splitPlatform(v: string, next: (v?: string) => void) {
  const p = getPlatformFlag();
  let loginUrl = '';
  if (process.env.NODE_ENV === 'production') {
    loginUrl = '/platform/login';
  } else {
    if (p === 'pcs' || p === 'vms') {
      //mock环境 生成随机数 赋值环境token
      const random = Math.floor(Math.random() * 0xffffff).toString(16);
      if (!t.getToken()) t.setToken(random);
    } else {
      loginUrl = p ? `/${p}/login` : '/project/login';
    }
  }

  if (t.getToken()) {
    let platFormStore = <StoreGeneric>{};
    switch (p) {
      case 'svc':
        const userSvcStore = useSvcUserStore();
        if (!userSvcStore.user?.userId) {
          await userSvcStore.getUserInfo();
          await userSvcStore.getRouter();
        }
        platFormStore = userSvcStore;
        break;
      case 'platform':
        const userPlatformStore = useUserPlatformStore();
        if (!userPlatformStore.user?.userId) {
          await userPlatformStore.getUserInfo();
        }
        platFormStore = userPlatformStore;
        break;
      case 'pcs':
        const userPcsStore = useUserPcsStore();
        if (!userPcsStore.user?.userName) {
          await userPcsStore.getRouter();
          await userPcsStore.getUserInfo();
        }
        platFormStore = userPcsStore;
        break;
      case 'vms':
        const useVmsStore = useVmsUserStore();
        if (!useVmsStore.user?.userId) {
          await useVmsStore.getRouter();
          await useVmsStore.getUserInfo();
        }
        platFormStore = useVmsStore;
        break;
      default:
        const userStore = useUserStore();
        if (!userStore.user?.userId) {
          await userStore.info();
          await userStore.getRouter();
          await userStore.getProjects();
        }
        platFormStore = userStore;
    }
    next();
  } else if (v !== loginUrl) {
    t.setToken('');
    next(loginUrl);
    // next();
  } else {
    next();
  }
}

async function authHandle(assesToken: string) {
  const p = getPlatformFlag();
  if (lsStore.getItem('state')) {
    const keymap = {
      pcs: flowableEngineOauth2ExchangeGet,
      vms: groundPcApiOauth2ExchangeGet,
      svc: svcWebOauth2ExchangeGet
    } as any;
    const oauthRequest = keymap[p] || cbdApiProjectOauth2ExchangeGet;
    const res = await oauthRequest({
      state: lsStore.getItem('state')
    });
    lsStore.setItem('state', '');
    t.setToken(res.token);
    // lsStore.setItem('token', res.token);
  } else {
    const keymap = {
      pcs: flowableEngineOauth2AuthorizeGet,
      vms: groundPcApiOauth2AuthorizeGet,
      svc: svcWebOauth2AuthorizeGet
    } as any;
    const oauthRequest = keymap[p] || cbdApiProjectOauth2AuthorizeGet;
    const res = await oauthRequest({
      certificate: assesToken
    });
    const { redirectUrl, state = '' } = res || {};
    lsStore.setItem('state', state);
    // console.log(redirectUrl);
    location.href = redirectUrl;
  }
}
