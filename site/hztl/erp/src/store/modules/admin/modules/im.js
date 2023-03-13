// 下拉配件品牌 - 下拉配件分类
import { notifications } from "@/api/im/notifications";
import { sleep } from "@/utils/tool";

let isLoading = false; //用于判断是否发起新的请求，isLoading为true则不发起新请求
let isRotation = false; //用于判断是否开启轮询，若为false则不请求，请求结果不做处理

export default {
  namespaced: true,
  state: {
    notices: "",
    feedbacks: "",
    loginTimeLimit: ""
  },
  actions: {
    async startRotation({ dispatch }) {
      if (!isRotation) {
        isRotation = true;
        await dispatch("loadData");
      }
    },
    async loadData({ dispatch, state }) {
      if (!isRotation || isLoading) {
        return;
      }

      isLoading = true;
      try {
        const res = await notifications(state);
        if (isRotation && res) {
          Object.keys(res).forEach(key => {
            if (state[key] !== res[key]) {
              state[key] = res[key];
              if (key === "loginTimeLimit") {
                dispatch("admin/limitTime/refreshTimeout", null, {
                  root: true
                });
              }
            }
          });
        }
      } catch (e) {
        // 轮询出现错误等待10s后再次轮询
        await sleep(10 * 1000);
      }
      isLoading = false;
      await dispatch("loadData");
    }
  },
  mutations: {
    stopRotation() {
      isRotation = false;
    }
  }
};
