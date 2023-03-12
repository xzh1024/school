<template>
  <i-sys nav-placeholder title="商品详情">
    <i-navbar
      bg="bg-white"
      :no-fixed="true"
      :placeholder="true"
      :stop-back="false"
      :back="true"
    >
      <template #right>
        <collect-icon
          :type="2"
          :store-id="productId"
          :collect="goodsInfo.collect"
          @change="collectChange"
        ></collect-icon>
      </template>
    </i-navbar>
    <view class="container-main">
      <view class="banner">
        <swiper class="swiper" circular autoplay @change="swiperChange">
          <swiper-item v-for="(item, index) in productDetailPics" :key="index">
            <image
              class="swiper-image"
              :src="fixImage(item, { height: 440 })"
              mode="aspectFill"
            ></image>
          </swiper-item>
        </swiper>
        <view v-if="productDetailPics.length" class="swiper-num"
          >{{ activeIndex + 1 }}/{{ productDetailPics.length }}</view
        >
      </view>
      <view class="container-main-box">
        <view class="main-title">{{ goodsInfo.productName }}</view>
        <view class="main-type"
          >{{ goodsInfo.brandName
          }}<text class="main-sale"
            >月售 <text class="main-num">{{ goodsInfo.sales }}</text></text
          ></view
        >
        <view class="main-tag-box">
          <i-tag
            v-for="(item, index) in tags"
            :key="index"
            :text="item"
            background="#FFEFE6"
            color="#FB5F05"
          ></i-tag>
        </view>
        <view class="flex space-between align-center">
          <view class="main-tips"
            >¥<text class="main-price">{{ goodsInfo.salePrice }}</text></view
          >
          <i-button
            type="primary"
            :width="220"
            size="medium"
            round
            @click="handleCardPopup"
            >加入购物车</i-button
          >
        </view>
      </view>
    </view>
    <view class="container-footer">
      <view class="footer-detail">
        <view class="detail-title">商品须知</view>
        <view class="detail-desc">{{ goodsInfo.instructions }}</view>
      </view>
      <view class="padding-lr detail">
        <mp-html :content="goodsInfo.graphicDetails"></mp-html>
      </view>
    </view>
    <add-cart
      ref="refCart"
      :item="goodsInfo"
      :store-id="goodsInfo.storeId"
      :store-name="goodsInfo.storeName"
      @close="updateCart"
    ></add-cart>
    <shop-cart-popup
      v-model:do-update="doUpdate"
      :market-id="storeId"
    ></shop-cart-popup>
  </i-sys>
</template>

<script setup>
  import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";
  import IButton from "@/components/i-button/index.vue";
  import ITag from "@/components/i-tag/index.vue";
  import { cbdApiAppletReserveProductInfoProductIdGet } from "@/api";
  import { ref, computed } from "vue";
  import CollectIcon from "@/components/common/collect-icon";
  import AddCart from "../../../../components/common/add-cart";
  import ShopCartPopup from "@/components/common/shop-cart-popup/shop-cart-popup";
  import { fixImage } from "@/utils";

  const productId = ref();
  const goodsInfo = ref({});
  const activeIndex = ref(0);
  const refCart = ref(null);
  const doUpdate = ref(false);
  const storeId = ref();

  onLoad((e) => {
    statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight;
    const { productId: id, storeId: sId } = e;
    productId.value = id;
    storeId.value = sId;
    getInfo();
  });

  // const handleBack = () => {
  //   uni.navigateBack({
  //     delta: 1
  //   });
  // };

  async function getInfo() {
    uni.showLoading("加载中...");
    try {
      goodsInfo.value = await cbdApiAppletReserveProductInfoProductIdGet({
        productId: productId.value
      });
    } catch (e) {
      console.error(e);
    } finally {
      uni.hideLoading();
    }
  }
  const productDetailPics = computed(() => {
    return goodsInfo.value?.productDetailPics || [];
  });
  const tags = computed(() => {
    return goodsInfo.value?.tags || [];
  });

  function swiperChange(e) {
    activeIndex.value = e.detail.current;
  }

  const statusBarHeight = ref("");

  // 底部弹窗
  const handleCardPopup = () => {
    console.log(2222);
    refCart.value.open();
  };

  function collectChange(b) {
    goodsInfo.value.collect = b;
  }
  onShareAppMessage(() => {
    return {
      title: goodsInfo.value.productName,
      path: `/pages/home/merchants/goodsDetail/goodsDetail?productId=${productId.value}&storeId=${storeId.value}`
    };
  });
  function updateCart() {
    doUpdate.value = true;
  }
</script>

<style lang="scss" scoped>
  @import "./goodsDetail.scss";
  .banner {
    position: relative;
    .swiper-num {
      position: absolute;
      right: 24rpx;
      top: 24rpx;
      z-index: 10;
      font-size: 24rpx;
      border-radius: 12rpx;
      color: #fff;
      padding: 4rpx 12rpx;
      background: rgba(0, 0, 0, 0.2);
    }
  }
  .swiper {
    height: 440rpx;
    width: 100%;
    .swiper-image {
      height: 440rpx;
      width: 100%;
    }
  }
  .footer-detail {
    margin: 32rpx 0;
  }
  .container-main-box,
  .footer-detail {
    background: #fff;
  }
  .detail {
    padding-bottom: 170rpx;
  }
</style>
