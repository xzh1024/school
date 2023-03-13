const getStorageSync = (key: string) => {
  try {
    const d = uni.getStorageSync(key);
    return d ? d : "";
  } catch (e) {
    console.error(e);
  }
};

const setStorageSync = (key: string, value: any) => {
  try {
    uni.setStorageSync(key, value);
  } catch (e) {
    console.error(e);
  }
};

const removeStorageSync = (key: string) => {
  try {
    uni.removeStorageSync(key);
  } catch (e) {
    console.error(e);
  }
};

/**
 * 加入购物车
 * data：存储的数据；type:商品类型 1商品 2次卡
 * @param data
 * @param type
 * @param cb
 */
export const joinCart = (data: any, type: 1 | 2, cb?: () => void) => {
  const t = uni.getStorageSync("har_shopCart");
  if (!t || (Array.isArray(t) && t.length <= 0)) {
    const arr = [];
    arr.push(data);
    uni.setStorage({
      key: "har_shopCart",
      data: JSON.stringify(arr),
      success: () => {
        cb && cb();
      }
    });
  } else {
    const d = JSON.parse(uni.getStorageSync("har_shopCart")); //本地存储数据
    const { storeId } = data;
    const { skuId } = data.skuList[0];
    const storeIndex = d.findIndex((item: any) => item.storeId === storeId);

    if (storeIndex > -1) {
      //本地已有相关店铺
      const skuIndex = d[storeIndex].skuList.findIndex(
        (item: any) => item.skuId === skuId && item.type === type
      );
      if (skuIndex > -1) {
        //本地已有相关商品
        d[storeIndex].skuList[skuIndex].prdNum += 1;
      } else {
        d[storeIndex].skuList.push(data.skuList[0]);
      }
    } else {
      d.push(data);
    }
    console.log(d, "本地数据");
    uni.setStorage({
      key: "har_shopCart",
      data: JSON.stringify(d),
      success: () => {
        cb && cb();
      }
    });
  }
};

/***
 * 购物车商品数量+
 * item:商品信息
 * @param item
 */
export const plusGoods = (item: any) => {
  console.log(item, "----");
  const d = JSON.parse(getStorageSync("har_shopCart")); //本地存储数据
  const { storeId, skuId, type } = item;
  const storeIndex = d.findIndex(
    (item: any) => Number(item.storeId) === Number(storeId)
  );
  const goodsIndex = d[storeIndex].skuList.findIndex(
    (item: any) => item.skuId === skuId && item.type === type
  );
  // const goodsNum = d[storeIndex].cart[goodsIndex].num;
  //@todo 验证库存上限
  d[storeIndex].skuList[goodsIndex].prdNum += 1;
  setStorageSync("har_shopCart", JSON.stringify(d));
  // try {
  //   uni.setStorageSync('har_shopCart', JSON.stringify(d));
  // } catch (e) {
  //   console.log(e);
  // }
  // uni.setStorage({
  //   key: "har_shopCart",
  //   data: JSON.stringify(d),
  // });
  // return d;
};

/**
 * 购物车商品数量-
 * item:商品信息
 * @param item
 */
export const reduceGoods = (item: any) => {
  const d = JSON.parse(getStorageSync("har_shopCart")); //本地存储数据
  const { storeId, skuId, type } = item;
  const storeIndex = d.findIndex(
    (item: any) => Number(item.storeId) === Number(storeId)
  );
  const goodsIndex = d[storeIndex].skuList.findIndex(
    (item: any) => item.skuId === skuId && item.type === type
  );
  const goodsNum = d[storeIndex].skuList[goodsIndex].prdNum;
  if (goodsNum === 1) {
    d[storeIndex].skuList.splice(goodsIndex, 1);
    setStorageSync("har_shopCart", JSON.stringify(d));
    // uni.setStorage({
    //   key: "har_shopCart",
    //   data: JSON.stringify(d),
    // })
  } else {
    d[storeIndex].skuList[goodsIndex].prdNum -= 1;
    setStorageSync("har_shopCart", JSON.stringify(d));
    // uni.setStorage({
    //   key: "har_shopCart",
    //   data: JSON.stringify(d),
    // })
  }
};

export const delCartBySkuId = (skuIdList: any) => {
  const d = JSON.parse(getStorageSync("har_shopCart")); //本地存储数据
  const tempArr = d
    .map((item: any) => {
      const skuList = item.skuList.filter((sub: any) => {
        const index = skuIdList.findIndex(
          (cell: any) => cell.skuId === sub.skuId && cell.type === sub.type
        );
        return index < 0;
      });
      return {
        ...item,
        skuList
      };
    })
    .filter((item: any) => {
      return item.skuList.length > 0;
    });
  setStorageSync("har_shopCart", JSON.stringify(tempArr));
};

export const updateCart = (data: any, storeId?: any) => {
  //有店铺id更新指定店铺；无则更新整个购物车数据
  if (storeId) {
    const d = JSON.parse(getStorageSync("har_shopCart")); //本地存储数据
    const storeIndex = d.findIndex(
      (item: any) => Number(item.storeId) === Number(storeId)
    );
    if (storeIndex > -1) {
      d[storeIndex] = data;
    } else {
      d.push(data);
    }
    setStorageSync("har_shopCart", JSON.stringify(d));
    // uni.setStorage({
    //   key: "har_shopCart",
    //   data: JSON.stringify(d),
    // })
  } else {
    setStorageSync("har_shopCart", JSON.stringify(data));
    // uni.setStorage({
    //   key: "har_shopCart",
    //   data: JSON.stringify(data),
    // })
  }
};

export const clearCart = (storeId?: number) => {
  if (storeId) {
    const d = JSON.parse(getStorageSync("har_shopCart")); //本地存储数据
    const storeIndex = d.findIndex(
      (item: any) => Number(item.storeId) === Number(storeId)
    );
    d.splice(storeIndex, 1);
    setStorageSync("har_shopCart", JSON.stringify(d));
    // uni.setStorage({
    //   key: "har_shopCart",
    //   data: JSON.stringify(d),
    // })
  } else {
    removeStorageSync("har_shopCart");
    // uni.removeStorage({
    //   key: "har_shopCart",
    // })
  }
};

export const getCart = (storeId = "") => {
  const data = getStorageSync("har_shopCart");
  if (data === "" || data === "[]") {
    return [];
  } else {
    if (storeId) {
      return [
        JSON.parse(data).find(
          (item: any) => Number(item.storeId) === Number(storeId)
        )
      ];
    } else {
      return JSON.parse(data);
    }
  }
};
