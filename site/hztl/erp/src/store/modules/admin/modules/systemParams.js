import { cloneDeep } from "lodash";
import { getAllSystemParams, getFinancialsSettles } from "@/api/base/base";
import defaultDateRange from "@/utils/defaultDateRange";

export default {
  namespaced: true,
  state: {
    params: {},
    precisions: {},
    flows: {}
  },
  getters: {
    sumQueryDefaultDateRange(state) {
      return defaultDateRange.getSumDefaultDateRange(
        state.params.queryDefaultMonths
      );
    },
    billQueryDefaultDateRange(state) {
      return defaultDateRange.getBillDefaultDateRange(
        state.params.queryDefaultDaysForBill - 1
      );
    }
  },
  actions: {
    async loadSystemParams({ commit }) {
      const systemParams = await getAllSystemParams();
      commit("setSystemParams", systemParams);
      return systemParams;
    },
    async loadFinancialsSettles({ commit }) {
      const financialsSettles = await getFinancialsSettles();
      commit("setFinancialsSettles", financialsSettles);
      return financialsSettles;
    }
  },
  mutations: {
    setSystemParams(state, systemParams) {
      // 暴露出来方便查看数据
      window.systemParams = cloneDeep(systemParams);

      const keys = Object.keys(systemParams);
      if (keys && keys.length) {
        keys.forEach(item => {
          if (item === "flow") {
            state.flows = { ...systemParams[item] };
          } else if (item === "common") {
            const {
              qtyPrecision,
              pricePrecision,
              untaxedPricePrecision,
              moneyPrecision,
              billPrintFlow,
              ...otherParams
            } = systemParams[item];
            state.flows = { ...state.flows, billPrintFlow };
            state.precisions = {
              ...state.precisions,
              qtyPrecision,
              pricePrecision,
              untaxedPricePrecision,
              moneyPrecision
            };
            state.params = {
              ...state.params,
              ...otherParams
            };
          } else if (item === "financial") {
            const { taxAdjustRange, ...otherParams } = systemParams[item];
            state.precisions = {
              ...state.precisions,
              taxAdjustRange
            };
            state.params = {
              ...state.params,
              ...otherParams
            };
          } else {
            state.params = {
              ...state.params,
              ...systemParams[item]
            };
          }
        });
      }
    },
    setFinancialsSettles(state, financialsSettles) {
      // 暴露出来方便查看数据
      window.financialsSettles = cloneDeep(financialsSettles);
      state.financialsSettles = financialsSettles || [];
    },
    clearData(state) {
      window.systemParams = null;
      window.financialsSettles = null;
      state.financialsSettles = null;
      state.params = {};
      state.precisions = {};
      state.flows = {};
    }
  }
};
