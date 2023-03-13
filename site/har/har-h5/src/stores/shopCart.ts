import { defineStore } from "pinia";
export const useShopCartStore = defineStore("shopCart", {
  state: () => {
    return {
      storeList: []
    };
  },
  actions: {
    setStoreList(payload: any) {
      this.storeList = payload;
    }
  }
});
