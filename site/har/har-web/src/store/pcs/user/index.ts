import { defineStore } from 'pinia';
import useToken from '@/composables/useToken';
import { routeFlat } from '@/utils';

import {
  flowableEngineSystemUserInfoGet,
  FlowableEngineSystemUserInfoGetResponse,
  flowableEngineSystemMenusGet,
  FlowableEngineSystemMenusGetResponse
} from '@/api/flowable-engine';

type Route = Omit<FlowableEngineSystemMenusGetResponse[0], 'children' | 'meta'>;
interface stateType {
  user: Partial<FlowableEngineSystemUserInfoGetResponse>;
  roles: string[];
  permissions: string[];
  routers: FlowableEngineSystemMenusGetResponse;
  flatRoutes: Route[];
}
export const useUserStore = defineStore('pcsUser', {
  state(): stateType {
    return {
      user: {} as Partial<FlowableEngineSystemUserInfoGetResponse>,
      roles: [] as string[],
      permissions: [] as string[],
      routers: [],
      flatRoutes: []
    };
  },
  actions: {
    // async login(loginForm: SvcWebLoginPostRequest) {
    //   const res = await svcWebLoginPost(loginForm);
    //   const t = useToken();
    //   t.setToken(res.token || '');
    // },
    async getUserInfo() {
      const res = await flowableEngineSystemUserInfoGet();
      this.user = res || {};
      this.roles = res?.permissions || [];
      this.permissions = res?.permissions || [];
    },
    async getRouter() {
      const res = await flowableEngineSystemMenusGet();
      this.routers = res;
      this.flatRoutes = routeFlat<FlowableEngineSystemMenusGetResponse[0]>(
        res || []
      );
    },
    async logout() {
      // await cbdApiPortalLogoutPost();
      const t = useToken();
      t.setToken('');
    },
    reset() {
      this.user = {};
      this.roles = [];
      this.permissions = [];
    }
  }
});
