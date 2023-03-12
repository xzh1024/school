 import { useStorage } from "./useStorage";
import { computed, ref, watch } from "vue";
export type SkuItem = {
  [k: string]: string | number | boolean;
  selected: boolean;
  skuId: string;
  prdNum: number; // 数量
  type: 1 | 2; // 商品类型 1商品 2次卡
};
export type StoreInfo = {
  storeId: string;
  storeName: string;
};
export type SaveStoreData = StoreInfo & {
  skuList: SkuItem[];
};

export function useStoresDataList() {
  const shopCart = useStorage<SaveStoreData[]>("har_shopCart", [], {
    deep: true
  });
  // 查找店铺
  function findStoreIndex(storeId: string) {
    return shopCart.value.findIndex((item) => {
      return item.storeId === storeId;
    });
  }
  // 更新店铺信息
  function updateStoreInfo(data: SaveStoreData) {
    const index = findStoreIndex(data.storeId);
    index > -1 ? (shopCart.value[index] = data) : shopCart.value.push(data);
  }
  // 清除店铺信息
  function clearStore(storeId?: string) {
    if (storeId) {
      const index = findStoreIndex(storeId);
      shopCart.value.splice(index, 1);
    } else {
      shopCart.value = [];
    }
  }
  return { shopCart, updateStoreInfo, findStoreIndex, clearStore };
}

export function useStore(info: StoreInfo) {
  const { shopCart, updateStoreInfo } = useStoresDataList();
  const storeInfo = ref<SaveStoreData>({
    ...info,
    skuList: []
  });
  const storageInfo = computed(() => {
    return shopCart.value.find((item) => item.storeId === info.storeId);
  });
  watch(
    storageInfo,
    (info) => {
      if (info) storeInfo.value = info;
    },
    {
      deep: true
    }
  );
  watch(
    storeInfo,
    (val) => {
      updateStoreInfo(val);
    },
    {
      deep: true
    }
  );
  // 更新sku
  function updateSku(sku: SkuItem) {
    const index = storeInfo.value.skuList.findIndex(
      (item) => item.skuId === sku.skuId
    );
    if (index > -1) {
      if (sku.prdNum > 0) {
        const temp = storeInfo.value.skuList[index];
        storeInfo.value.skuList[index] = {
          ...temp,
          ...sku
        };
      } else {
        storeInfo.value.skuList.splice(index);
      }
    } else {
      storeInfo.value.skuList.push(sku);
    }
  }
  return {
    storeInfo,
    shopCart,
    updateSku
  };
}
