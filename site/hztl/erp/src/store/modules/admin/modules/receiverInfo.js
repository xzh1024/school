import { initAddressTable } from "@/api/receiverAddress";

export default {
  namespaced: true,
  state: {
    receiverInofData: [],
    defaultReceiverInfo: null
  },
  actions: {
    async loadAll({ dispatch }, isReload) {
      await dispatch("loadReceiverInofData", isReload);
    },
    // 以后isReload默认值改为false，以免重复请求数据
    async loadReceiverInofData({ state }, isReload = true) {
      if (isReload) {
        const res = await initAddressTable();
        state.receiverInofData =
          res && res.length
            ? res.map(item => {
                return {
                  ...item,
                  areaIds: [item.provinceId, item.cityId, item.areaId]
                };
              })
            : [];
        state.defaultReceiverInfo = state.receiverInofData.find(item => {
          return item.isDefault;
        });
      }
    }
  },
  mutations: {
    clearData(state) {
      state.receiverInofData = [];
      state.defaultReceiverInfo = null;
    }
  }
};
