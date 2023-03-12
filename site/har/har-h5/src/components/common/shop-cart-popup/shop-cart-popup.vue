<template>
  <view class="container">
    <view class="box" :style="{ zIndex: zIndex }">
      <view class="logo-box" @click="showMore">
        <image
          class="image-style"
          src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/shopCart/icon-shopCart.png"
        />
        <view class="shop-num">{{ goodsNum }}</view>
      </view>
      <view class="right-box">
        <view class="shop-info">
          ￥<text class="p">{{ goodsTotalPrice }}</text>
          <!-- <view class="flex align-center margin-bottom-4">
            <view class="text-xs text-color-6">预估到手价</view>
            <view class="flex align-end text-color-3">
              <view class="text-xs padding-bottom-2">￥</view>
              <view class="text-lg">1750.20</view>
            </view>
          </view>
          <view class="flex align-center text-red text-xs">
            <view>共优惠</view>
            <view class="flex align-end">
              <view class="text-xss padding-bottom-2">￥</view>
              <view>587.2</view>
            </view>
          </view> -->
        </view>
        <i-button class="i-btn" :disabled="goodsNum <= 0" @click="toBuy"
          >去结算</i-button
        >
      </view>
    </view>

    <uni-popup ref="popup" type="bottom" background-color="#fff">
      <view class="popup-box">
        <view class="title">
          <view>已选商品</view>
          <view v-if="goodsNum" class="flex align-center" @click="onClear">
            <image
              class="icon-del"
              src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/home_img/trash.png"
            />
            <view class="text-color-6">清空购物车</view>
          </view>
        </view>
        <view class="content">
          <scroll-view scroll-y="true" class="scroll-y">
            <view v-if="goodsInShopCart.length < 1" class="no-data-box">
              <image
                class="noData-image"
                src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/shopCart/icon-noData.png"
              />
              <view>还没有商品，去逛逛吧</view>
            </view>
            <view
              v-for="(item, index) in goodsInShopCart"
              :key="index"
              class="cell-box"
            >
              <view class="shop-item flex">
                <!--商品图片-->
                <view>
                  <image
                    class="shop-image"
                    :src="fixImage(item.prdPic, { w: 116 })"
                    mode="aspectFill"
                  />
                </view>
                <view class="flex flex-1 space-between">
                  <!--商品信息区-->
                  <view class="shop-info">
                    <view class="name">{{ item.prdName }}</view>
                    <view class="tag-type-list">
                      {{ item.specDesc || "--" }}
                      <!--{{ newTag(item.tags) }}
                      <slot name="desc">
                        <view class="tag-type" v-for="(t,index) in item.tags" :key="index">{{ t }}</view>
                      </slot> -->
                    </view>
                    <view class="price">￥{{ item.prdPrice }}</view>
                  </view>
                  <!--加减商品区-->
                  <view class="flex align-center">
                    <view class="flex">
                      <view class="icon-box" @tap.stop="reduceClick(item)">
                        <image
                          class="image-style"
                          src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/shopCart/icon-reduce.png"
                        />
                      </view>
                      <input
                        disabled
                        :value="item.prdNum"
                        class="num-input"
                        type="number"
                      />
                      <view class="icon-box" @tap.stop="addClick(item)">
                        <image
                          class="image-style"
                          src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/shopCart/icon-plus.png"
                        />
                      </view>
                    </view>
                    <!-- <uni-number-box
                      @change="goodsNumChange"
                      :value="item.goodsNum"
                      background="#FB5F05"
                      color="#fff"
                    /> -->
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </uni-popup>
    <!-- 二次确认弹窗 -->
    <i-dialog
      v-if="showDialog"
      :content="'是否清空当前已选商品？'"
      :cancel-content="'再想想'"
      @dialog-confirm="dialogConfirm"
      @dialog-close="dialogClose"
    />
    <!-- <uni-popup ref="confirmDialog" type="dialog" :is-mask-click="false">
      <view class="dialog-box">
        <view class="top">提示</view>
        <view class="content">是否清空当前已选商品？</view>
        <view class="bottom">
          <button class="i-block-btn" type="primary" @click="dialogConfirm">确定</button>
          <i-button class="i-block-btn i-active" type="primary" @click="dialogClose">再想想</i-button>
        </view>
      </view>
    </uni-popup> -->
  </view>
</template>

<script>
  export default {
    name: "ShopCartPopup"
  };
</script>
<script setup>
  import IButton from "@/components/i-button";
  import { ref, computed, onMounted, watch } from "vue";
  import {
    getCart,
    clearCart,
    reduceGoods,
    plusGoods,
    updateCart
  } from "@/utils/shopCart";
  import NP from "number-precision";
  import { cbdApiAppletCartInfoPost } from "@/api";
  import IDialog from "../../i-dialog/i-dialog";
  import { useShopCartStore } from "../../../stores/shopCart";
  import { fixImage } from "@/utils";

  const props = defineProps({
    zIndex: {
      type: Number,
      default: 0
    },
    marketId: {
      type: [Number, String],
      default: 0
    },
    doUpdate: {
      type: Boolean,
      default: false
    },
    goodsType: {
      // 商品类型 1商品 2次卡
      type: [Number, String],
      default: 1
    }
  });

  const emits = defineEmits(["update:doUpdate", "update:zIndex"]);

  const shopCart = ref({});
  onMounted(() => {
    if (toServeData.value.length > 0) {
      upDateFromServe(toServeData.value);
    }
  });

  const upDateFromServe = async (storeList) => {
    try {
      const d = await cbdApiAppletCartInfoPost({
        storeList
      });
      doUpdateLocalInfo(d);
    } catch (e) {
      console.error(e);
    }
  };

  const doUpdateLocalInfo = ({ storeList = [] }) => {
    if (!storeList.length) {
      clearCart(props.marketId);
      return;
    }
    // 当前店铺下已加入购物车的数据 --- storeList数组中只会有一组店铺数据
    const { storeId, storeName, skuList = [] } = storeList[0];
    const temp = skuList.map((item) => {
      const {
        type,
        prdId,
        prdName,
        prdPic,
        prdNum,
        prdPrice,
        skuId,
        specDesc
      } = item;
      return {
        type,
        prdId,
        prdName,
        prdPic,
        prdNum,
        prdPrice,
        skuId,
        specDesc
      };
    });
    const saveData = {
      storeId,
      storeName,
      skuList: temp
    };
    updateCart(saveData, storeId);
    shopCart.value = [saveData];
  };

  const toServeData = computed(() => {
    const d = getShopCartInLocal(props.marketId);
    if (d && d[0]) {
      const { storeId, skuList = [] } = d[0];
      const tempList = skuList.map((item) => {
        return {
          skuId: item.skuId,
          type: item.type || 2,
          prdNum: item.prdNum
        };
      });
      return [
        {
          storeId,
          skuList: tempList
        }
      ];
    } else {
      return [];
    }
  });
  const store = useShopCartStore();
  const toBuy = () => {
    const d = getShopCartInLocal(props.marketId);
    if (d && d.length) {
      const temp = d.map((item) => {
        const skuList = item.skuList.filter(
          (sub) => Number(sub.type) === Number(props.goodsType)
        );
        return {
          ...item,
          skuList
        };
      });
      store.setStoreList(temp);
      uni.navigateTo({
        url: `/pages/order/order-preview?type=1`
      });
    } else {
      uni.showToast({
        icon: "none",
        title: "请先选择商品",
        duration: 2000
      });
    }
  };

  const popup = ref(null);
  const showMore = () => {
    popup.value.open();
    shopCart.value = getShopCartInLocal(props.marketId);
    emits("update:zIndex", 100);
  };

  const reduceClick = (item) => {
    const d = { skuId: item.skuId, storeId: props.marketId, type: item.type };
    reduceGoods(d);
    shopCart.value = getShopCartInLocal(props.marketId);
  };
  const addClick = (item) => {
    const d = { skuId: item.skuId, storeId: props.marketId, type: item.type };
    plusGoods(d);
    shopCart.value = getShopCartInLocal(props.marketId);
  };

  const getShopCartInLocal = (marketId) => {
    return getCart(marketId);
  };

  // const confirmDialog = ref(null);
  const showDialog = ref(false);
  const onClear = () => {
    showDialog.value = true;
    // confirmDialog.value.open("center");
    /*uni.showModal({
    title: '提示',
    content: '确认清空当前购物车',
    success: function (res) {
      if (res.confirm) {
        clearCart(props.marketId || "");
        shopCart.value = getShopCartInLocal(props.marketId);
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });*/
  };
  const dialogConfirm = () => {
    clearCart(props.marketId || "");
    shopCart.value = getShopCartInLocal(props.marketId);
    showDialog.value = false;
    // confirmDialog.value.close();
  };
  const dialogClose = () => {
    showDialog.value = false;
    // confirmDialog.value.close();
  };

  // const newTag = computed(() => (value) => {
  //   return value?.join('、');
  // })

  watch(
    () => props.doUpdate,
    (newVal) => {
      console.log(newVal, "---是否更新---");
      console.log();
      if (newVal) {
        shopCart.value = getShopCartInLocal(props.marketId);
        emits("update:doUpdate", false);
      }
    }
  );

  /**
   * 购物车中店铺中的商品
   */
  const goodsInShopCart = computed(() => {
    let value = [];
    if (shopCart.value[0]) {
      value = shopCart.value[0]?.skuList.filter(
        (item) => Number(item.type) === Number(props.goodsType)
      );
    }
    return value;
  });

  const goodsNum = computed(() => {
    if (goodsInShopCart.value && goodsInShopCart.value.length > 0) {
      let value = 0;
      goodsInShopCart.value.forEach((item) => {
        value = value + item.prdNum;
      });
      return value;
    } else {
      return 0;
    }
  });

  const goodsTotalPrice = computed(() => {
    if (goodsInShopCart.value && goodsInShopCart.value.length > 0) {
      let value = 0;
      goodsInShopCart.value.forEach((item) => {
        value = NP.plus(
          Number(value),
          Number(NP.times(Number(item.prdNum), Number(item.prdPrice)))
        );
      });
      return value;
    } else {
      return 0;
    }
  });
</script>

<style scoped lang="scss">
  .padding-bottom-2 {
    padding-bottom: 4rpx;
  }
  .margin-bottom-4 {
    margin-bottom: 8rpx;
  }
  .flex {
    display: flex;
  }
  .align-center {
    align-items: center;
  }
  .align-end {
    align-items: flex-end;
  }
  .text-red {
    color: #ea3d41;
  }
  .text-color-3 {
    color: #333333;
  }
  .text-color-6 {
    color: #666666;
  }
  .text-xss {
    font-size: 16rpx;
  }
  .text-xs {
    font-size: 24rpx;
  }
  .text-lg {
    font-size: 32rpx;
  }
  .image-style {
    height: 100%;
    width: 100%;
  }
  .num-input {
    width: 80rpx;
    height: 44rpx;
    background: #ffffff;
    border-radius: 24rpx;
    border: 1px solid #fb5f05;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 8rpx;
    text-align: center;
    color: #fb5f05;
    font-size: 28rpx;
  }
  .container {
    .box {
      width: stretch;
      height: 160rpx;
      background: #ffffff;
      box-shadow: 0 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.16);
      padding: 0 32rpx;
      position: fixed;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo-box {
        height: 56px;
        width: 56px;
        position: relative;
        .shop-num {
          position: absolute;
          top: 0;
          right: 0;
          width: 36rpx;
          height: 36rpx;
          background: #ea3d41;
          color: #ffffff;
          font-size: 20rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
      }
      .right-box {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 12rpx;
        .shop-info {
          font-size: 24rpx;
          .p {
            font-size: 32rpx;
          }
        }
        .i-btn {
          width: 186rpx;
          height: 76rpx;
          background: #fb5f05;
          border-radius: 38rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32rpx;
          color: #ffffff;
        }
      }
    }
    .popup-box {
      height: 620rpx;
      background: #ffffff;
      border-radius: 16rpx 16rpx 0 0;
      padding: 0 32rpx 160rpx 32rpx;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100rpx;
        font-size: 28rpx;
        color: #333333;
        .icon-del {
          height: 36rpx;
          width: 36rpx;
          margin-right: 8rpx;
        }
      }
      .content {
        .scroll-y {
          height: 500rpx;
          .cell-box {
            //height: 160rpx;
            width: 100%;
            margin-bottom: 20rpx;
            border-bottom: 2rpx solid #e4e4e4;
            &:last-child {
              margin-bottom: 0;
            }
            .shop-item {
              background-color: #fff;
              .shop-image {
                width: 116rpx;
                height: 148rpx;
                margin-right: 16rpx;
                border-radius: 8rpx;
                overflow: hidden;
              }
              .shop-info {
                display: flex;
                flex-direction: column;
                width: 284rpx;
              }
              .name {
                font-size: 28rpx;
                color: #333333;
                padding-bottom: 32rpx;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
              .tag-type-list {
                width: 284rpx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 24rpx;
                color: #666666;
                padding-bottom: 16rpx;
              }
              .tag-type {
                font-size: 24rpx;
                color: #fb5f05;
                padding: 0 24rpx;
                line-height: 36rpx;
                border-radius: 8rpx;
                background: #ffefe6;
                display: inline-block;
                margin-right: 16rpx;
              }
              .sales {
                font-size: 24rpx;
                color: #999999;
                line-height: 24rpx;
                padding-top: 20rpx;
                padding-bottom: 8rpx;
              }
              .price {
                font-size: 24rpx;
                color: #d93044;
                line-height: 24rpx;
              }
              .icon-box {
                height: 48rpx;
                width: 48rpx;
                padding: 0 15rpx;
              }
              /*.add{
              width: 40rpx;
              height: 40rpx;
              border-radius: 8rpx;
              border: 2rpx solid #FB9C65;
              position: relative;
              &::before{
                content: "";
                width: 24rpx;
                height: 2rpx;
                background: #FB9C65;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
              }
              &::after{
                content: "";
                width: 2rpx;
                height: 24rpx;
                background: #FB9C65;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
              }
            }*/
            }
          }
        }
        .no-data-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 28rpx;
          color: #333333;
          height: 100%;
          .noData-image {
            height: 272rpx;
            width: 384rpx;
            margin-bottom: 22rpx;
          }
        }
      }
    }
    .dialog-box {
      background: #ffffff;
      width: 343px;
      height: 200px;
      border-radius: 16rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      //position: relative;
      overflow: hidden;
      .top {
        //position: absolute;
        //top: 0;
        //left: 0;
        width: stretch;
        height: 75rpx;
        align-items: center;
        justify-content: space-between;
        padding: 0 24rpx;
        border-bottom: 1px solid #e6e6e6;
        font-size: 28rpx;
        display: none;
      }
      .content {
        //position: absolute;
        //top: 75rpx;
        //left: 0;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: stretch;
        padding: 32rpx;
        font-size: 32rpx;
        color: #333333;
        text-align: center;
      }
      .bottom {
        //position: absolute;
        //left: 0;
        //bottom: 0;
        width: 100%;
        display: flex;
        padding-bottom: 32rpx;
        justify-content: space-around;
        align-items: center;
        .i-block-btn {
          width: 114px;
          height: 38px;
          background: #ffffff;
          border-radius: 38rpx;
          color: #fb5f05;
          font-size: 32rpx;
          border: 2rpx solid #fb5f05;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          &:after {
            border: none;
            margin: 0;
          }
        }
        .i-active {
          background: #fb5f05 !important;
          color: #ffffff !important;
        }
      }
    }
  }
</style>
