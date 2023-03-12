<template>
  <i-sys title="购物车" nav-placeholder nav-bg="bg-white" :back="false">
    <template #navLeft>
      <view class="container-header-location" @click="handleManagementMenu">
        {{ managementMenu ? "管理" : "取消管理" }}
      </view>
    </template>
    <view>
      <view class="cart-box">
        <view v-if="cartData?.storeList?.length < 1" class="no-data-box">
          <image
            class="noData-image"
            src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/shopCart/icon-noData.png"
          />
          <view>还没有商品，去逛逛吧</view>
        </view>
        <view
          v-for="(items, index) in cartData.storeList"
          :key="index"
          class="cart-shop"
        >
          <view class="cart-name">
            <radio
              :checked="items.shopSelected == 1"
              color="#FF5F00"
              style="transform: scale(0.8)"
              @click="handleShopSelect(items)"
            />
            <!-- @tap="goShop(items)" -->
            <view class="cart-name-box" @click="onStore(items)">
              <!-- <image class="cart-name-image" :src="items.logo"></image> -->
              <view class="cart-name-storeName">
                <view class="name-box">
                  {{ items.storeName }}
                </view>
              </view>
              <image class="icon-box" :src="jump2" mode="" />
            </view>
            <!-- <image
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F1114%2F0I120152936%2F200I1152936-5-1200.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660038670&t=e8441d5e828609e4b30312694c3c5749"
              class="cart-name-go" @tap="goShop(items)"></image> -->
          </view>
          <!-- <view class="cart-line cart-pad"></view> -->
          <view class="cart-goods-box">
            <view v-for="(item, k) in items.skuList" :key="k" class="cart-cont">
              <view class="cart-detail-box">
                <view
                  class="detail-box-left"
                  @click="handleGoodsSelect(items, item)"
                >
                  <radio
                    :checked="item.goodsSelected == 1"
                    color="#FF5F00"
                    style="transform: scale(0.8)"
                  />
                  <image
                    :src="fixImage(item.prdPic, { w: 148 })"
                    mode="aspectFill"
                  />
                </view>
                <view class="detail-box-right">
                  <view class="right-top" @click="onGood(item)">
                    {{ item.prdName }}
                  </view>
                  <view class="right-mid-sku">
                    {{ item.specDesc }}
                  </view>
                  <view class="right-footer">
                    <view class="footer-left">
                      <view class="footer-left-price">
                        ¥{{ item.prdPrice }}
                      </view>
                    </view>
                    <view class="footer-right">
                      <view
                        class="reduce-box"
                        @click.stop="handleCutShop(item)"
                      ></view>
                      <view class="num-box">{{ item.prdNum }}</view>
                      <view
                        class="plus-box"
                        @click.stop="handleAddShop(item)"
                      ></view>
                      <!-- <text class="link" :class="item.prdNum==1? 'jj':'aj'" @click.stop="handleCutShop(item)">-</text>
                      <text class="input1 num input">{{item.prdNum}}</text>
                      <text class="link" :class="item.prdNum*1<item.stockNum*1? 'aj':'jj'"
                        @click.stop="handleAddShop(item)">+</text> -->
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view v-if="managementMenu" class="cart-total">
          <view class="cart-total-box">
            <!-- <radio :checked="cartData.allSelected==1" color="#FF5F00" style="transform:scale(0.8)"
              @click="handleSelectAllAction" />
            <view class="cart-choose" @click="handleSelectAllAction">
              全选
            </view> -->
            <view class="logo-box">
              <image
                class="image-style"
                src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/shopCart/icon-shopCart.png"
              />
              <view v-if="selectGoodsNum" class="shop-num">{{
                selectGoodsNum
              }}</view>
            </view>
            <view class="cart-num">
              <view class="cart-num-forecast">
                预估到手价 <text class="cart-num-price">¥</text
                ><text style="font-size: 32rpx; color: #333333">{{
                  totalPrice.toFixed(2)
                }}</text>
              </view>
              <view class="cart-num-preferential">
                <!-- 共优惠 ¥ {{totalPrice.toFixed(2)}} -->
              </view>
            </view>
          </view>
          <view class="cart-total-btn" @tap="handleSubmitShop"> 去结算 </view>
        </view>
        <view v-else class="cart-total-han">
          <view class="cart-total-box">
            <view class="total-box-num">
              <radio
                :checked="cartData.allSelected == 1"
                color="#FF5F00"
                style="transform: scale(0.8)"
                @click="handleSelectAllAction"
              />
              <view class="cart-choose" @click="handleSelectAllAction">
                全选
              </view>
            </view>
            <view class="total-box-btn">
              <!--<i-button class="margin-right-xs" type="primary" plan :width="172" size="medium" round @click="handleCartCollection">收藏</i-button> -->
              <i-button
                type="primary"
                :width="172"
                size="medium"
                round
                @click="handleDelShop"
                >删除</i-button
              >
            </view>
          </view>
        </view>
      </view>
    </view>
  </i-sys>
</template>

<script setup>
  import { useShopCartStore } from "@/stores/shopCart";
  import { ref, computed, onMounted } from "vue";
  import { jump2 } from "@/utils/imgUrl";
  import { setStoraged } from "@/utils/storage";
  import { cbdApiAppletCartInfoPost } from "@/api/index";
  import { getCart } from "@/utils/shopCart";

  import { onShow } from "@dcloudio/uni-app";
  import IButton from "@/components/i-button/index.vue";
  import { fixImage } from "@/utils";

  onMounted(() => {
    handleGetLocalStoreShopList();
    // handleGetShopList()
  });

  onShow(() => {
    handleGetLocalStoreShopList();
  });

  /**
   * @param  管理按钮相关
   */
  const managementMenu = ref(1);
  const handleManagementMenu = () => {
    managementMenu.value = !managementMenu.value;
    if (managementMenu.value) {
      cartData.value.allSelected = 1;
      cart.value = [];
      handleSelectAllAction();
    }
  };

  /**
   * @param 本地获取商品列表
   */
  const cartData = ref({});
  const cart = ref([]);
  const storeList = ref([]);
  const old_storeList = ref([]);
  const handleGetLocalStoreShopList = () => {
    const temp = [];
    // 获取本地指定
    // old_storeList.value = getStoraged("har_shopCart");
    old_storeList.value = getCart();
    old_storeList.value.forEach((item) => {
      temp.push({
        storeId: item.storeId,
        skuList: handleSkuList(item.skuList)
      });
    });
    storeList.value = {
      storeList: temp
    };
    handleGetDataList(storeList.value);
  };
  const handleSkuList = (list) => {
    const tempList = [];
    list.forEach((item) => {
      tempList.push({
        prdNum: item.prdNum,
        skuId: item.skuId,
        type: item.type
      });
    });
    return tempList;
  };

  /**
   * @param 根据本地存储获取对应最新数据
   */

  const handleGetDataList = async () => {
    const res = await cbdApiAppletCartInfoPost(storeList.value);
    res.storeList.forEach((shopItem) => {
      shopItem.shopSelected = "0";
      shopItem.skuList.forEach((goodsItem) => {
        goodsItem.goodsSelected = "0";
      });
    });
    cartData.value = {
      storeList: res.storeList,
      allSelected: "0",
      totalPrice: ""
    };
    if (cartData.value.allSelected == 1) {
      cartData.value.storeList.forEach((shopItem) => {
        shopItem.skuList.forEach((goodsItem) => {
          cart.value.push(goodsItem);
        });
      });
    } else {
      cartData.value.storeList.forEach((shopItem) => {
        shopItem.skuList.forEach((goodsItem) => {
          if (goodsItem.goodsSelected == 1) {
            cart.value.push(goodsItem);
          }
        });
      });
    }
  };

  /**
   * @param 选择店铺
   */
  const handleShopSelect = (shopItem) => {
    //遍历此店铺中商品 并全部选择
    if (shopItem.shopSelected == 0) {
      shopItem.shopSelected = 1;
      shopItem.skuList.map((goodItem) => {
        goodItem.goodsSelected = 1;
        cart.value.push(goodItem);
      });
    } else {
      shopItem.shopSelected = 0;
      shopItem.skuList.map((goodItem) => {
        goodItem.goodsSelected = 0;
      });
      cart.value = cart.value.filter((item) => {
        return item.storeId != shopItem.skuList[0].storeId;
      });
    }
    console.log("店铺数据", shopItem.skuList.length);
    handleSelectAll();
  };

  /**
   * @param 选择商品
   */
  const handleGoodsSelect = (shopItem, goodItem) => {
    // 如果商品没选中 则不选中店铺
    if (goodItem.goodsSelected == 0) {
      goodItem.goodsSelected = 1;
      shopItem.isSelectShop = false;
      //店铺中商品都满足条件 则返回true
      const shopS = shopItem.skuList.every((goodItem) => {
        return goodItem.goodsSelected == 1;
      });
      //商品都选中  则店铺选中
      if (shopS) {
        shopItem.shopSelected = 1;
      }
      cart.value.push(goodItem);
    } else {
      goodItem.goodsSelected = 0;
      shopItem.shopSelected = 0;
      cart.value.forEach((el, index) => {
        if (el.prdId == goodItem.prdId) {
          cart.value.splice(index, 1);
        }
      });
    }
    //监听全选按钮状态
    handleSelectAll();
  };

  /**
   * @param 选择全部
   */
  const handleSelectAllAction = () => {
    //遍历数据数组--遍历店铺  修改选择
    if (cartData.value.allSelected == 0) {
      cartData.value.allSelected = 1;
      cart.value = [];
      cartData.value.storeList.map((shopItem) => {
        shopItem.shopSelected = 1;
        shopItem.skuList.map((goodItem) => {
          cart.value.push(goodItem);
          goodItem.goodsSelected = 1;
        });
      });
    } else {
      //反选
      cartData.value.allSelected = 0;
      cartData.value.storeList.map((shopItem) => {
        shopItem.shopSelected = 0;
        shopItem.skuList.map((goodItem) => {
          cart.value = [];
          goodItem.goodsSelected = 0;
        });
      });
    }
  };

  /**
   * @param 选择店铺或者商品 监听全选按钮状态
   */
  const handleSelectAll = () => {
    const selectAll = cartData.value.storeList.every((shopItem) => {
      return shopItem.shopSelected == 1;
    });
    if (selectAll) {
      cartData.value.allSelected = 1;
    } else {
      cartData.value.allSelected = 0;
    }
  };
  /**
   * @param 增加数量
   */
  const handleAddShop = (goodItem) => {
    if (goodItem.prdNum >= parseInt(goodItem.stockNum)) {
      uni.showToast({
        title: "不能再多了~",
        icon: "none"
      });
      return true;
    }
    goodItem.prdNum++;
    // 本地存储
    setStoraged("har_shopCart", cartData.value.storeList);
  };
  /**
   * @param 减少数量
   */
  const handleCutShop = (goodItem) => {
    if (goodItem.prdNum > 1) {
      goodItem.prdNum--;
    } else {
      uni.showToast({
        title: "不能再少了~",
        icon: "none"
      });
    }
    // 本地存储
    setStoraged("har_shopCart", cartData.value.storeList);
  };
  /**
   * @param 删除
   */
  const handleDelShop = () => {
    // 循环店铺
    for (let i = 0; i < cartData.value.storeList.length; i++) {
      // 循环店铺的商品
      for (let j = 0; j < cartData.value.storeList[i].skuList.length; j++) {
        // 如果商品是选中状态
        if (cartData.value.storeList[i].skuList[j].goodsSelected == true) {
          // 删除吊这个商品
          cartData.value.storeList[i].skuList.splice(j, 1);
          j--;
        }
      }
    }
    // 循环店铺
    for (let i = 0; i < cartData.value.storeList.length; i++) {
      // 如果商铺下面的商品length为0
      if (cartData.value.storeList[i].skuList.length == 0) {
        // 删除商铺
        cartData.value.storeList.splice(i, 1);
        i--;
      }
    }
    // 本地存储
    setStoraged("har_shopCart", cartData.value.storeList);
  };

  /**
   * @param 收藏
   * @param {type} 类型:1店铺2商品3场馆4活动
   * @param {objectId} 店铺商品id活动
   */
  // const toast = ref(null);
  // const handleCartCollection = async () => {
  //   const collectionArr = [];
  //   cart.value.forEach((goodItem, index) => {
  //     // 如果收藏的是商品
  //     if (goodItem.type === 1) {
  //       collectionArr.push({
  //         type: 2,
  //         objectId: goodItem.prdId
  //       });
  //     } else {
  //       // 否则是场馆
  //       collectionArr.push({
  //         type: 3,
  //         objectId: goodItem.venueId
  //       });
  //     }
  //   });
  //   try {
  //     await cbdApiAppletCollectAddBatchPost(collectionArr);
  //     uni.showToast({
  //       title: "收藏成功",
  //       icon: "none",
  //       duration: 2000
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const store = useShopCartStore();
  /**
   * @param 结算
   */
  const handleSubmitShop = async () => {
    if (cart.value.length < 1)
      return uni.showToast({
        icon: "none",
        title: "请选择商品!",
        duration: 1500
      });
    const d = cartData.value.storeList
      .map((item) => {
        const skuList = item.skuList
          .filter((item) => Number(item.goodsSelected) === 1)
          .map((item) => {
            return {
              skuId: item.skuId,
              type: item.type,
              prdNum: item.prdNum
            };
          });
        return {
          storeId: item.storeId,
          skuList
        };
      })
      .filter((item) => item.skuList.length > 0);
    store.setStoreList(d);
    cart.value = [];
    uni.navigateTo({
      url: `/pages/order/order-preview?type=1`
    });
    // let data = []
    // cart.value.map(goodItem => {
    //   data.push(goodItem)
    // });
    // data = [...new Set(data)]
    // // 本地存储
    // setStoraged("har_shopCart", data)
    // uni.navigateTo({
    //   url: `../order/order-preview`
    // });
  };

  /**
   * @param 计算选中商品的总价
   */
  const totalPrice = computed(() => {
    let prices = 0;
    if (!!cartData.value.storeList) {
      cartData.value.storeList.map((shopItem) => {
        shopItem.skuList.map((goodItem) => {
          goodItem.goodsSelected == 1
            ? (prices += goodItem.prdPrice * goodItem.prdNum)
            : (prices += 0);
        });
      });
    }
    return prices;
  });

  /**
   * @param 删除店铺
   */
  // const goShop = (items) => {
  //   console.log(items);
  // }

  const selectGoodsNum = computed(() => {
    let value = 0;
    if (cart.value.length) {
      cart.value.forEach((item) => {
        value = value + item.prdNum;
      });
    }
    return value;
  });

  const onStore = (value) => {
    const { storeId } = value;
    uni.navigateTo({
      url: `/pages/home/merchants/merchants?storeId=${storeId}`
    });
  };
  const onGood = (value) => {
    console.log(value);
    const { type, storeId, prdId, venueId } = value;
    if (type === 1) {
      uni.navigateTo({
        url: `/pages/home/merchants/goodsDetail/goodsDetail?productId=${prdId}&storeId=${storeId}`
      });
    } else if (type === 2) {
      uni.navigateTo({
        url: `/pages/place/detail?venueId=${venueId}&ruleType=1`
      });
    }
  };
</script>

<style lang="scss" scoped>
  @import "./index.scss";
  .margin-right-xs {
    margin-right: 16rpx;
  }
  .footer-right {
    display: flex;
    align-items: center;
    .reduce-box {
      height: 40rpx;
      width: 40rpx;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 24rpx;
        border-top: 4rpx solid #ff5f00;
        transform: translate(-50%, -50%);
      }
    }
    .num-box {
      width: 64rpx;
      height: 40rpx;
      background: #eeeeee;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24rpx;
      color: #666666;
      margin: 0 16rpx;
    }
    .plus-box {
      height: 40rpx;
      width: 40rpx;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 24rpx;
        border-top: 4rpx solid #ff5f00;
        transform: translate(-50%, -50%);
      }
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        height: 24rpx;
        transform: translate(-50%, -50%);
        border-left: 4rpx solid #ff5f00;
      }
    }
  }
</style>
