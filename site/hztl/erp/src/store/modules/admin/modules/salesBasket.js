import {
  addSalesBasket,
  createOrder,
  createSaleOutOrder,
  loadSalesBasket,
  removeSalesBasket,
  updateSalesBasket
} from "@/api/sales";
import router from "@/router/router";
import { Message } from "hztl-ui";

export default {
  namespaced: true,
  state: {
    groupData: [],
    loading: false,
    flag: true,
    total: 0
  },
  actions: {
    async loadData({ state }) {
      state.loading = true;
      let res = await loadSalesBasket();
      res = res || [];
      const groupData = [];
      let total = 0;
      res.forEach(item => {
        total = total + item.rows.length;
        groupData.push(
          {
            ...item,
            colType: "colspan",
            rowsId: item.rows.map(item => item.id),
            index: ""
          },
          ...item.rows.map((it, index) => {
            return {
              ...it,
              cooperatorId: item.cooperatorId,
              cooperatorName: item.cooperatorName,
              index: index + 1
            };
          })
        );
      });
      state.groupData = groupData;
      state.total = total;
      state.loading = false;
      state.flag = false;
    },
    async addData({ dispatch }, data) {
      await addSalesBasket(data);
      Message({
        message: "添加成功！",
        type: "success"
      });
      await dispatch("loadData");
    },
    async updateData({ dispatch }, data) {
      await updateSalesBasket(data);
      await dispatch("loadData");
    },
    async remove({ dispatch }, data) {
      await removeSalesBasket(data);
      await dispatch("loadData");
    },
    async createOrder(_, data) {
      const res = await createOrder(data);

      router.push({
        path: "/SalesBilling/",
        query: { billId: res.billId }
      });
    },
    async createSaleOutOrder(_, data) {
      const res = await createSaleOutOrder(data);

      router.push({
        path: "/SalesOutBilling/",
        query: { billId: res.billId }
      });
    }
  },
  mutations: {
    clearData(state) {
      state.groupData = [];
    }
  }
};
