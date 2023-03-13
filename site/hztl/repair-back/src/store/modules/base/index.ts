import { ActionContext } from "vuex";
import { BaseInfoModel } from "./interface";
import { CommonService } from "@/common/services/commonService";
const commonService = new CommonService();

export default {
  namespaced: true,
  state: {
    areaId: 0,
    areaName: "",
    cityId: 0,
    companyId: 0,
    companyName: "",
    erpType: 0,
    needGuide: false
  },
  getters: {
    baseInfo: (state: BaseInfoModel) => {
      return state;
    }
  },
  actions: {
    loadBase(context: ActionContext<any, null>) {
      commonService.getBase().then(res => {
        if (res) {
          context.commit("setBaseInfo", res);
        }
      });
    }
  },
  mutations: {
    setBaseInfo(state: BaseInfoModel, data: BaseInfoModel) {
      Object.assign(state, data);
    }
  }
};
