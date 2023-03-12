import {
  addPurchaseBasketFromEnquiry,
  batchAdd,
  batchDemandAdd,
  clearPurchaseBasket,
  createOrderByCarts,
  deletePurchaseBasket,
  loadPurchaseBasket,
  updatePurchaseBasket
} from "@/api/purchase";
import router from "@/router/router";
import { Message } from "hztl-ui";

export default {
  namespaced: true,
  state: {
    groupData: [],
    loading: false,
    addChange: false,
    total: 0
  },
  actions: {
    async loadData({ state }) {
      state.loading = true;
      let { rows } = await loadPurchaseBasket();
      rows = rows || [];
      const groupData = [];
      let total = 0;
      rows.forEach(item => {
        total = total + item.carts.length;
        groupData.push(
          {
            ...item,
            colType: "colspan",
            rowsId: item.carts.map(item => item.id),
            cooperatorId:
              item.carts && item.carts[0] && item.carts[0].supplierId,
            index: ""
          },
          ...item.carts.map((item, index) => {
            return {
              ...item,
              index: index + 1
            };
          })
        );
      });
      state.groupData = groupData;
      state.total = total;

      state.loading = false;
    },
    async batchAdd({ dispatch, state }, { data, ...params }) {
      await batchAdd({
        partIds: [...data.map(item => item.id)],
        ...params
      });
      state.addChange = !state.addChange;
      await dispatch("loadData");
    },
    async batchDemandAdd({ dispatch, state }, { data, ...params }) {
      await batchDemandAdd({
        demandIds: [...data.map(item => item.id)],
        ...params
      });
      state.addChange = !state.addChange;

      Message({
        message: "添加成功！",
        type: "success"
      });
      await dispatch("loadData");
    },
    async addData({ dispatch, state }, data) {
      await addPurchaseBasketFromEnquiry(data);
      state.addChange = !state.addChange;

      Message({
        message: "添加成功！",
        type: "success"
      });
      await dispatch("loadData");
    },
    async updateData({ dispatch }, data) {
      await updatePurchaseBasket(data);
      await dispatch("loadData");
    },
    async remove({ dispatch }, { ids }) {
      await deletePurchaseBasket({ ids });
      await dispatch("loadData");
    },
    async removeAll({ dispatch }, data) {
      await clearPurchaseBasket(data);
      await dispatch("loadData");
    },
    async createOrder(_, data) {
      const res = await createOrderByCarts(data);
      router.push({ path: `/PurchaseBilling/${res.header.id}` });
    }
  },
  mutations: {
    clearData(state) {
      state.groupData = [];
    }
  }
};
