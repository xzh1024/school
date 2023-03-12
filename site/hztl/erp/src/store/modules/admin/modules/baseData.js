import { selectCompanys } from "@/api/company/company";
import { getAuthorityFundAccountList } from "@/api/finance/manual";

export default {
  namespaced: true,
  state: {
    companies: [],
    accountList: []
  },
  actions: {
    async loadAll({ dispatch }, isReload = false) {
      dispatch("loadAllCompanies", isReload);
    },
    async loadAllCompanies({ state }, isReload = false) {
      if (isReload || state.companies.length === 0) {
        const res = await selectCompanys();
        state.companies = res;
      }
    },
    async loadAccountList({ state }, isReload = false) {
      if (isReload || state.accountList.length === 0) {
        const res = await getAuthorityFundAccountList();
        state.accountList =
          res && res.length
            ? res.map(item => {
                return {
                  ...item,
                  id: item.id,
                  name: item.fundAccountName
                };
              })
            : [];
      }
    }
  },
  mutations: {
    clearData(state) {
      state.companies = [];
      state.accountList = [];
    }
  }
};
