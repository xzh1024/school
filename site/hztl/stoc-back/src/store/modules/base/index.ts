import { ActionContext } from "vuex";
import { BaseInfoModel } from "./interface";
import { CommonService } from "@/common/services/commonService";
const commonService = new CommonService();

export default {
  namespaced: true,
  state: {
    companyName: ""
  },
  getters: {
    baseInfo: (state: BaseInfoModel) => {
      return state;
    }
  },
  actions: {
    async loadBase(context: ActionContext<any, null>) {
      const res = await commonService.getBase();
      if (res) {
        context.commit("setBaseInfo", res);
      }
    }
  },
  mutations: {
    setBaseInfo(state: BaseInfoModel, data: BaseInfoModel) {
      Object.assign(state, data);
    }
  }
};
