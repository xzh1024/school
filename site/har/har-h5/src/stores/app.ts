import { defineStore } from "pinia";
import {
  CbdApiAppletMemberInfoGetResponse,
  cbdApiAppletMemberInfoGet,
  cbdApiAppletUserInfoGet,
  CbdApiAppletUserInfoGetResponse
} from "@/api";
type AppState = {
  userInfo?: CbdApiAppletUserInfoGetResponse;
  showLogin: boolean;
  MAX_ORDER_CLOSE_TIME: number;
  memberInfo?: CbdApiAppletMemberInfoGetResponse;
};
export const useAppStore = defineStore("app", {
  state: (): AppState => {
    return {
      userInfo: undefined,
      showLogin: false,
      MAX_ORDER_CLOSE_TIME: 15,
      memberInfo: undefined
    };
  },
  actions: {
    updateShowLogin(state: boolean) {
      this.showLogin = state;
    },
    async getUserInfo(force = false) {
      if (force || !this.userInfo) {
        this.userInfo = await cbdApiAppletUserInfoGet({}, { cache: false });
      }
      return this.userInfo;
    },
    async getMemberInfo(force = false) {
      if (force || !this.memberInfo) {
        this.memberInfo = await cbdApiAppletMemberInfoGet({}, { cache: false });
      }
      return this.memberInfo;
    }
  },
  getters: {
    sysCapsule() {
      let temp = {
        bottom: 56,
        height: 32,
        left: 281,
        right: 368,
        top: 24,
        width: 87
      };
      // #ifdef MP
      // #ifndef MP-ALIPAY
      const capsule = uni.getMenuButtonBoundingClientRect();
      if (capsule) {
        temp = capsule;
      }
      // #endif
      // #endif
      return temp;
    },
    sysNavBar() {
      const { statusBarHeight = 0, titleBarHeight } = uni.getSystemInfoSync();
      // #ifndef MP
      return statusBarHeight + 44;
      // #endif

      // #ifdef MP
      // #ifndef MP-ALIPAY
      const capsule = this.sysCapsule;
      //@ts-ignore;
      return capsule.bottom + capsule.top - statusBarHeight;
      // #endif
      // #endif

      // #ifdef MP-ALIPAY
      return statusBarHeight + titleBarHeight!;
      // #endif
    },
    sysNavStatusBar() {
      return uni.getSystemInfoSync().statusBarHeight || 0 + 44;
    }
  }
});
