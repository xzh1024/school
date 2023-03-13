import { getCurLoginLimit } from "@/api/loginLimit";
import { sleep } from "@/utils/tool";
import { getLimtCurTime } from "@/utils/date";

let isGetting = false;

export default {
  namespaced: true,
  state: {
    isRotation: false,
    isTimeOut: false,
    isLimitTimeOut: false,
    isWhitelist: false,
    startedAt: null,
    finishedAt: null,
    applyFinishedAt: null,
    isShowTips: false
  },
  actions: {
    async refreshTimeout({ dispatch, state }) {
      if (!state.isTimeOut && !isGetting) {
        isGetting = true;
        await dispatch("refreshData", true);
      }
    },
    async refreshData({ dispatch, state }, isClose) {
      isGetting = true;
      try {
        const res = await getCurLoginLimit();
        isGetting = false;
        state.isWhitelist = res.isWhitelist;
        state.applyFinishedAt = res.applyFinishedAt;
        state.startedAt = res.startedAt;
        state.finishedAt = res.finishedAt;
        state.isShowTips = false;
        if (isClose) {
          await dispatch("rotationData", isClose);
        }
        if (
          !res.isWhitelist &&
          res.startedAt &&
          (res.applyFinishedAt || res.finishedAt)
        ) {
          await dispatch("startRotation");
        } else {
          state.isRotation = false;
        }
      } catch (e) {
        isGetting = false;
      }
    },
    async startRotation({ dispatch, state }) {
      if (!state.isRotation) {
        state.isRotation = true;
        await dispatch("rotationData");
      }
    },
    async rotationData({ dispatch, state }, isClose) {
      if (state.isRotation) {
        let isTimeOut = false;
        const finishedTimes = state.applyFinishedAt
          ? getLimtCurTime(state.applyFinishedAt, "date")
          : getLimtCurTime(state.finishedAt);
        if (getLimtCurTime(state.startedAt) > 0) {
          // 早于登录时间
          isTimeOut = true;
        } else if (finishedTimes <= 0) {
          // 迟于登录时间
          isTimeOut = true;
        } else if (finishedTimes < 30 * 60) {
          // 到期三十分钟之前
          state.isLimitTimeOut = true;
          if (!state.isShowTips) {
            state.isShowTips = true;
          }
        }
        if (isTimeOut && isClose) {
          await dispatch("admin/user/outLogin", null, { root: true });
        }
        state.isTimeOut = isTimeOut;
        await sleep(1 * 60 * 1000);
        await dispatch("rotationData");
      }
    }
  },
  mutations: {
    clear(state) {
      state.isRotation = false;
    }
  }
};
