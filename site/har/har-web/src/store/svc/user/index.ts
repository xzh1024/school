import { defineStore } from 'pinia';
import useToken from '@/composables/useToken';
import {
  svcWebGetInfoGet,
  SvcWebGetInfoGetResponse,
  svcWebGetRoutersGet,
  SvcWebGetRoutersGetResponse,
  svcWebLoginPost,
  SvcWebLoginPostRequest
} from '@/api/svc-web';
import { routeFlat } from '@/utils';

type Route = Omit<SvcWebGetRoutersGetResponse[0], 'children' | 'meta'>;
interface stateType {
  user: Partial<SvcWebGetInfoGetResponse['user']>;
  roles: string[];
  permissions: string[];
  routers: SvcWebGetRoutersGetResponse;
  flatRoutes: Route[];
}
export const useUserStore = defineStore('svcUser', {
  state(): stateType {
    return {
      user: {} as Partial<SvcWebGetInfoGetResponse['user']>,
      roles: [] as string[],
      permissions: [] as string[],
      routers: [],
      flatRoutes: []
    };
  },
  actions: {
    async login(loginForm: SvcWebLoginPostRequest) {
      const res = await svcWebLoginPost(loginForm);
      const t = useToken();
      t.setToken(res.token || '');
    },
    async getUserInfo() {
      const res = await svcWebGetInfoGet();
      this.user = res?.user || {};
      this.roles = res?.roles || [];
      this.permissions = res?.permissions || [];
    },
    async getRouter() {
      const res = await svcWebGetRoutersGet();
      this.routers = res;
      this.flatRoutes = routeFlat<SvcWebGetRoutersGetResponse[number]>(
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
