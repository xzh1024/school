import { defineStore } from 'pinia';
import useToken from '@/composables/useToken';
import { routeFlat } from '@/utils';

import {
  groundPcApiAuthGetUserInfoGet,
  GroundPcApiAuthGetUserInfoGetResponse,
  groundPcApiAuthGetRoutersGet,
  GroundPcApiAuthGetRoutersGetResponse
} from '@/api/ground-pc-api';

type Route = Omit<GroundPcApiAuthGetRoutersGetResponse[0], 'children' | 'meta'>;
interface stateType {
  user: Partial<GroundPcApiAuthGetUserInfoGetResponse>;
  roles: string[];
  permissions: string[];
  routers: GroundPcApiAuthGetRoutersGetResponse;
  flatRoutes: Route[];
}
export const useUserStore = defineStore('vmsUser', {
  state(): stateType {
    return {
      user: {} as Partial<GroundPcApiAuthGetUserInfoGetResponse>,
      roles: [] as string[],
      permissions: [] as string[],
      routers: [],
      flatRoutes: []
    };
  },
  actions: {
    async getUserInfo() {
      const res = await groundPcApiAuthGetUserInfoGet();
      this.user = res || {};
      this.roles = res?.permissions || [];
      this.permissions = res?.permissions || [];
    },
    async getRouter() {
      const res = await groundPcApiAuthGetRoutersGet();
      this.routers = res;
      this.flatRoutes = routeFlat<GroundPcApiAuthGetRoutersGetResponse[0]>(
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
