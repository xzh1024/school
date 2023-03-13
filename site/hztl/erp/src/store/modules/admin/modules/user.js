// erp账号参数
import { erpAccounts, logoutByAccount } from "@/api/loginregister";
import router from "@/router/router";
import { cloneDeep } from "lodash";
import { DEFAULT_VIN_TYPE } from "@/constants/platform";
import getBrowserFinger from "device-key";
import { uiConfig } from "envConfigPath";

function clearAllCookie() {
  const keys = document.cookie.match(/[^ =;]+(?==)/g);
  if (keys) {
    for (let i = keys.length; i--; ) {
      document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  }
}

export default {
  namespaced: true,
  state: {
    // 用户个人信息
    registerAppName: "思锐云管家",
    appName: uiConfig ? uiConfig.appName : "思锐云管家",
    copyRight: uiConfig ? uiConfig.copyRight : "北京东方思锐软件",
    copyrightOwner: uiConfig
      ? uiConfig.copyrightOwner
      : "©北京东方思锐科技有限责任公司",
    recordNumber: uiConfig ? uiConfig.recordNumber : "京ICP备05054864号",
    recordSystemWebsite: "http://beian.miit.gov.cn/",
    deviceKey: "",
    userInfoMsg: null,
    hasYp: false,
    hasYx: false,
    perm: {},
    beyondMaxLoginNumberData: []
  },
  actions: {
    async loadDeviceKey({ commit }) {
      const res = await Promise.all([getBrowserFinger()]);
      commit("setDeviceKey", res[0]);
    },
    async outLogin() {
      // 本地登录cookie清除
      clearAllCookie();

      router.push({ path: "/Login" });
      await logoutByAccount();
    },
    async loadUserMsg({ commit }) {
      const userMsg = await erpAccounts();
      commit("setUserMsg", userMsg);
      return userMsg;
    }
  },
  mutations: {
    setDeviceKey(state, deviceKey) {
      state.deviceKey = deviceKey;
    },
    setUserMsg(state, userMsg) {
      // 暴露出来方便查看数据
      window.userInfoMsg = cloneDeep(userMsg);

      if (!userMsg.params) {
        userMsg.params = {
          flows: {},
          precisions: {}
        };
      }

      if (userMsg.accountSetStatus === 0 && userMsg.expiredDays) {
        userMsg.distanceExpiredDays =
          (new Date(userMsg.expiredDays).setHours(0, 0, 0, 0) -
            new Date().setHours(0, 0, 0, 0)) /
          (1000 * 3600 * 24);
        if (
          userMsg.distanceExpiredDays <= 29 &&
          userMsg.distanceExpiredDays >= 0
        ) {
          const msg = userMsg.distanceExpiredDays
            ? `${userMsg.distanceExpiredDays}日后`
            : "今日24点";
          // eslint-disable-next-line no-useless-escape
          const reg = /(\d{4})\-(\d{2})\-(\d{2})/;
          const expiredDays = userMsg.expiredDays.replace(reg, "$1年$2月$3日");
          userMsg.expiredDaysLocal = expiredDays;
          userMsg.dueTips = `您的${
            uiConfig
              ? uiConfig.appName
              : userMsg.hasYx
              ? "云修管家"
              : "云配管家"
          }服务将于${expiredDays}（${msg}）到期`;
        }
      }

      const { hasRootPerm, perms, hasYp, hasYx, ...userInfoMsg } = userMsg;
      state.userInfoMsg = {
        ...userInfoMsg,
        dataService: userInfoMsg.dataService || DEFAULT_VIN_TYPE
      };
      state.hasYp = hasYp;
      state.hasYx = hasYx;
      state.registerAppName = uiConfig ? uiConfig.appName : "思锐云管家";
      state.appName = uiConfig
        ? uiConfig.appName
        : hasYx
        ? "思锐云修管家"
        : "思锐云配管家";
      state.perm = { perms, hasRootPerm };
      state.beyondMaxLoginNumberData = [];
    },
    setErrData(state, errData) {
      if (errData.code == "beyondMaxLoginNumber") {
        state.beyondMaxLoginNumberData = [...errData.data];
      }
    },
    clearData(state) {
      window.userInfoMsg = null;
      state.userInfoMsg = null;
      state.perm = {};
      state.beyondMaxLoginNumberData = [];
    }
  }
};
