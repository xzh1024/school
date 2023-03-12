<template>
  <uni-popup ref="popup" type="bottom">
    <view v-if="item.productId" class="modal-box">
      <view class="shop-info flex">
        <view>
          <image
            class="shop-image"
            :src="fixImage(currentSku.prdPic || productCoverPic, { w: 116 })"
          ></image>
        </view>
        <view class="flex-1 flex-flex flex-column space-between">
          <view class="shop-name">{{ item.productName }}</view>
          <view class="tag-type-list">
            <view
              v-for="(t, index) in item.tags"
              :key="index"
              class="tag-type"
              >{{ t }}</view
            >
          </view>
          <view class="flex space-between align-center">
            <view class="price"
              >￥<text class="p">{{
                currentSku.salePrice || item.salePrice
              }}</text></view
            >
            <view class="sales"
              >销量：<text>{{ currentSku.sales || item.sales }}</text></view
            >
          </view>
        </view>
      </view>
      <view class="sku-content">
        <view v-for="(specs, index) in specList" :key="index" class="sku-item">
          <view class="sku-name">{{ specs.specName }}</view>
          <view class="sku-specs">
            <view
              v-for="(spv, sIndex) in specs.specValues"
              :key="sIndex"
              class="specs"
              :class="[
                hash[specs.specName] === spv.specValueId ? 'specs-active' : '',
                spv.isNotCheck && 'specs-disabled'
              ]"
              @tap.stop="specsValueClick(specs, spv)"
              >{{ spv.specValue }}</view
            >
          </view>
        </view>
      </view>
      <view class="add-cart">
        <i-button
          :radius="0"
          :round="false"
          type="primary"
          size="medium"
          @click="addCart"
          >加入购物车</i-button
        >
        <safe-bottom />
      </view>
    </view>
  </uni-popup>
</template>

<script lang="ts">
  export default {
    name: "AddCart"
  };
</script>
<script setup lang="ts">
  import IButton from "@/components/i-button/index.vue";
  import { ref, computed } from "vue";
  import { joinCart } from "@/utils/shopCart";
  import { cbdApiAppletReserveProductChooseSkuProductIdGet } from "@/api";
  import SafeBottom from "../../safe-bottom/index.vue";
  import { fixImage } from "@/utils";

  const props = defineProps({
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
    storeId: {
      type: Number
    },
    storeName: {
      type: String
    }
  });

  const doUpdate = ref(false);
  const skuInfo = ref();
  const hash = ref<Record<string, any>>({});
  const popup = ref();
  const currentSku = ref<any>({});
  const productCoverPic = ref("");

  const emits = defineEmits(["close"]);
  defineExpose({
    open,
    close
  });

  const specList = computed(() => {
    return skuInfo.value?.specList || [];
  });

  function open() {
    hash.value = {};
    getSkuList();
    popup.value.open();
  }
  function close() {
    popup.value.close();
  }

  async function getSkuList() {
    try {
      console.log(props.item);
      const res = await cbdApiAppletReserveProductChooseSkuProductIdGet({
        productId: props.item.productId
      });
      const { specList = [] } = res;
      productCoverPic.value = res?.productCoverPic;
      specList.forEach((i: any) => (hash.value[i.specName] = ""));
      skuInfo.value = res;
    } catch (e) {
      console.error(e);
    }
  }

  function specsValueClick(s: any, item: any) {
    const { specName } = s;
    const id = item.specValueId;
    const { isNotCheck } = item;
    if (isNotCheck) return;
    hash.value[specName] = id;
    const { skuList = [], specList = [] } = skuInfo.value;

    const selectArr = skuList.filter((i: any) => i.specValueIds.includes(id));
    const sp = specList.map((i: any) => {
      let { specValues = [] } = i;
      specValues = specValues.map((j: any) => {
        const item = selectArr.find((s: any) =>
          s.specValueIds.includes(j.specValueId)
        );
        let isNotCheck = false;
        if (item && item.stockNum < 1) {
          isNotCheck = true;
        }
        return { ...j, isNotCheck };
      });
      return { ...i, specValues };
    });
    getCurrentSkuList();
    skuInfo.value.specList = sp;
  }

  function validateSku() {
    const pass = Object.keys(hash.value).find((i) => !hash.value[i]);
    console.log(pass);
    if (pass) {
      uni.showToast({ title: `请选择${pass}`, icon: "none" });
      return false;
    } else {
      return true;
    }
  }

  function getCurrentSkuList() {
    const ids = Object.values(hash.value);
    // console.log(ids,"ids")
    const { skuList = [] } = skuInfo.value;
    // console.log(skuList)
    currentSku.value =
      skuList.find((i: any) =>
        i.specValueIds?.every((j: any) => ids.includes(Number(j)))
      ) || {};
  }

  function addCart() {
    if (!validateSku()) return;
    getCurrentSkuList();
    const { skuId, names, prdPic, salePrice, stockNum } = currentSku.value;
    if (stockNum <= 0) return uni.showToast({ title: "库存不足" });
    const { productId, productName } = props.item;
    // console.log(props.storeId,"props.storeId"
    const p = {
      storeId: props.storeId,
      storeName: props.storeName,
      skuList: [
        {
          type: 1,
          prdId: productId,
          prdName: productName,
          prdPic,
          prdNum: 1,
          prdPrice: salePrice,
          skuId,
          specDesc: names
        }
      ]
    };
    joinCart(p, 1);
    setTimeout(() => {
      doUpdate.value = true;
      uni.showToast({
        title: "加入购物车成功",
        icon: "none"
      });
      popup.value.close();
      emits("close");
    }, 100);
  }
</script>

<style scoped lang="scss">
  .flex-flex {
    display: flex;
  }
  .modal-box {
    width: 750rpx;
    min-height: 764rpx;
    max-height: 900rpx;
    box-sizing: border-box;
    background: #fff;
    padding: 32rpx;
    border-radius: 16rpx 16rpx 0 0;
    .sku-content {
      margin-bottom: 50rpx;
    }
    .add-cart {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 9999;
      background: #fff;
    }
    .tag-type-list {
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
    .sku-item {
      padding-top: 32rpx;
    }
    .sku-specs {
      padding: 24rpx 0 0;
    }
    .specs {
      display: inline-block;
      padding: 0 16rpx;
      color: #333;
      background: #f7f7f7;
      font-size: 24rpx;
      line-height: 56rpx;
      font-weight: 400;
      border-radius: 8rpx;
      margin-right: 32rpx;
      margin-bottom: 16rpx;
      &-active {
        background: #ffefe6;
        color: #fb5f05;
      }
      &-disabled {
        color: #999;
        text-decoration: line-through;
      }
    }
    .sku-name {
      font-size: 28rpx;
      color: #333;
      line-height: 28rpx;
      font-weight: 400;
    }
    .shop-image {
      width: 116rpx;
      height: 128rpx;
      margin-right: 32rpx;
      display: block;
    }
    .shop-name {
      font-size: 32rpx;
      color: #333;
      line-height: 32rpx;
      padding-bottom: 16rpx;
      max-width: 520rpx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .shop-desc {
      font-size: 24rpx;
      color: #999;
      line-height: 24rpx;
      max-width: 520rpx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 16rpx;
    }
    .price {
      color: #d93044;
      font-size: 24rpx;
      line-height: 24rpx;
      font-weight: 400;
      .p {
        font-size: 36rpx;
        font-weight: bold;
      }
    }
    .sales {
      font-size: 24rpx;
      color: #999;
      line-height: 24rpx;
      text {
        color: #333;
      }
    }
    .shop-info {
      padding-bottom: 32rpx;
      border-bottom: 2rpx solid #e6e6e6;
    }
  }
</style>
