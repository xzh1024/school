import { defineStore } from 'pinia';
import {
  cbdApiPortalGetInfoGet,
  CbdApiPortalGetInfoGetResponse,
  cbdApiPortalLoginPost,
  CbdApiPortalLoginPostRequest,
  cbdApiPortalLogoutPost
} from '@/api/cbd-api-portal';
import useToken from '@/composables/useToken';

export const useUserStore = defineStore('platformUser', {
  state() {
    return {
      user: {} as Partial<CbdApiPortalGetInfoGetResponse['user']>,
      roles: [] as string[],
      permissions: [] as string[]
    };
  },
  actions: {
    async login(loginForm: CbdApiPortalLoginPostRequest) {
      const res = await cbdApiPortalLoginPost(loginForm);
      const t = useToken();
      t.setToken(res.token || '');
    },
    async getUserInfo() {
      const res = await cbdApiPortalGetInfoGet();
      this.user = res?.user || {};
      this.roles = res?.roles || [];
      this.permissions = res?.permissions || [];
    },
    async logout() {
      await cbdApiPortalLogoutPost();
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
