<template>
  <view class="shop">
    <view>
      <view class="type-v-box">
        <view>
          <scroll-view
            scroll-y
            class="type-v-scroll"
            :style="{ height: height + 'px' }"
          >
            <view class="type-v-list">
              <view
                v-for="(item, index) in typeList"
                :key="index"
                class="type-v-item"
                :class="activeId === item.value && 'type-v-item-active'"
                @tap="typeChange(item)"
              >
                {{ item.label }}</view
              >
            </view>
          </scroll-view>
        </view>
        <view class="shop-cont flex-1">
          <view v-if="typeChildrenList.length > 1" class="type-h-box">
            <image
              class="type-h-bottom"
              :class="shopFilterVisible && 'type-h-top'"
              src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/icon/back-icon.png"
              @tap="openVisible"
            ></image>
            <scroll-view
              v-if="!shopFilterVisible"
              scroll-x
              class="type-h-scroll"
            >
              <view class="type-list">
                <view
                  v-for="(item, index) in typeChildrenList"
                  :key="index"
                  class="type-item"
                  @tap="typeChildChange(item)"
                >
                  <view
                    class="item-box"
                    :class="activeChildId === item.value && 'item-box-active'"
                    >{{ item.label }}</view
                  >
                </view>
              </view>
            </scroll-view>
          </view>

          <z-paging
            ref="paging"
            v-model="list"
            :refresher-enabled="false"
            :fixed="false"
            class="paging"
            inside-more
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
            @query="getList"
          >
            <view class="list">
              <shop-item
                v-for="item in list"
                :key="item.productId"
                :item="item"
                @add-click="addHandle"
                @click="shopClick"
              />
            </view>
          </z-paging>
        </view>
      </view>
    </view>
    <view v-if="shopFilterVisible" class="shop-popup" @tap="putAway">
      <view class="shop-filter">
        <!--上面scorll 浮层直接使用-->
        <!--        <view class="type-h-box bg-white">
          <image class="type-h-bottom type-h-top" @tap.stop="putAway" src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/icon/back-icon.png"></image>
          <scroll-view scroll-x class="type-h-scroll">
            <view class="type-list">
              <view
                class="type-item"
                v-for="(item,index) in typeChildrenList"
                :key="index"
                @tap="typeChildChange(item)"
              >
                <view class="item-box" :class="activeChildId === item.value && 'item-box-active'">{{ item.label }}</view>
              </view>
            </view>
          </scroll-view>
        </view>-->
        <view class="list-block" @tap.prevent="">
          <view
            v-for="(item, index) in typeChildrenList"
            :key="index"
            class="block-item"
            :class="activeChildId === item.value && 'block-item-active'"
            @tap="typeChildChange(item)"
            >{{ item.label }}</view
          >
        </view>
      </view>
    </view>
    <add-cart
      ref="popup"
      :item="currentItem"
      :store-id="currentItem.storeId"
      :store-name="currentItem.storeName"
      @close="updateCart"
    />
    <shop-cart-popup
      v-model:z-index="shopCartZIndex"
      v-model:do-update="doUpdate"
      :market-id="storeId"
    ></shop-cart-popup>
  </view>
</template>

<script>
  export default {
    name: "Shop"
  };
</script>
<script setup>
  import { ref, onMounted, nextTick } from "vue";
  import { cbdApiAppletReserveProductListGet } from "@/api";
  import ShopItem from "./shop-item";
  import { cbdApiAppletCommonSelectProductClassifyGet } from "@/api";
  import ShopCartPopup from "../../../../components/common/shop-cart-popup/shop-cart-popup";
  import AddCart from "@/components/common/add-cart";
  const emits = defineEmits(["fixed"]);

  const list = ref([]);
  const doUpdate = ref(false);
  const paging = ref(null);
  const popup = ref(null);
  const currentItem = ref({});
  const typeList = ref([{ value: "", label: "全部" }]);
  const typeChildrenList = ref([{ value: "", label: "全部" }]);
  const activeChildId = ref("");
  const activeId = ref("");
  const shopFilterVisible = ref(false);

  const shopCartZIndex = ref(100);

  onMounted(() => {
    getTypeList();
  });
  const props = defineProps({
    storeId: {
      type: [String, Number]
    },
    storeInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    height: {
      type: Number
    }
  });
  const touchY1 = ref(0);
  function onTouchStart(e) {
    touchY1.value = e.touches[0].pageY;
  }

  function onTouchEnd(e) {
    if (touchY1.value - e.changedTouches[0].pageY > 20) {
      emits("fixed");
    }
  }
  async function getList(pageNo, pageSize) {
    uni.showLoading({ title: "加载中..." });
    try {
      // console.log(pageNo, pageSize)
      const res = await cbdApiAppletReserveProductListGet({
        orderStatus: props.storeId,
        storeId: props.storeId,
        pageNum: pageNo,
        productClassifyId: activeChildId.value || activeId.value, //取最后一级id
        pageSize
      });
      // console.log(res)
      paging.value.complete(res?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    } finally {
      uni.hideLoading();
    }
  }

  async function getTypeList(parentId) {
    try {
      let res = await cbdApiAppletCommonSelectProductClassifyGet({
        parentId,
        storeId: props.storeId
      });
      res = [{ value: "", label: "全部" }, ...res];
      if (parentId) {
        typeChildrenList.value = res;
      } else {
        typeChildrenList.value = [{ value: "", label: "全部" }];
        typeList.value = res;
      }
    } catch (e) {
      console.error(e);
    }
  }

  function addHandle(item) {
    shopCartZIndex.value = 98;
    currentItem.value = item;
    // console.log(item)
    nextTick(() => {
      popup.value.open();
    });
  }

  function typeChange({ value }) {
    shopFilterVisible.value = false;
    activeId.value = value;
    activeChildId.value = "";
    getTypeList(value);
    paging.value.reload();
  }
  function typeChildChange({ value }) {
    shopFilterVisible.value = false;
    activeChildId.value = value;
    paging.value.reload();
  }

  function shopClick({ productId }) {
    uni.navigateTo({
      url: `/pages/home/merchants/goodsDetail/goodsDetail?productId=${productId}&storeId=${props.storeId}`
    });
  }

  function updateCart() {
    doUpdate.value = true;
  }

  function putAway() {
    shopFilterVisible.value = false;
  }
  function openVisible() {
    shopFilterVisible.value = !shopFilterVisible.value;
  }

  defineExpose({ updateCart });
</script>

<style lang="scss" scoped>
  :deep(.zp-scroll-view) {
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      color: transparent;
      display: none;
    }
  }
  .shop-cont {
    padding: 0 0 160rpx 0;
  }
  .modal-box {
    width: 750rpx;
    min-height: 764rpx;
    max-height: 900rpx;
    box-sizing: border-box;
    background: #fff;
    padding: 32rpx;
    border-radius: 16rpx 16rpx 0 0;
    .add-cart {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 9999;
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
  .type-h-box {
    position: relative;
    z-index: 12;
    padding: 16rpx 24rpx;
    box-sizing: border-box;
    background-color: #ffffff;
    .type-h-bottom {
      width: 24rpx;
      height: 24rpx;
      position: absolute;
      right: 32rpx;
      top: 24rpx;
      transform: rotate(-90deg);
      z-index: 1;
      transition: all 0.5s;
    }
    .type-h-top {
      transform: rotate(90deg);
    }
    .type-h-scroll {
      width: 454rpx;
    }
    .type-list {
      //padding: 18rpx 32rpx 0;
      white-space: nowrap;
    }
    .type-item {
      display: inline-block;
      font-size: 0;

      & + .type-item {
        margin-left: 16rpx;
      }
    }
    .item-box {
      display: inline-block;
      padding: 4rpx 16rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      font-weight: 400;
      background-color: #f0f0f0;
      color: #383840;
      line-height: 40rpx;
      border-radius: 8rpx;
      &-active {
        background: #ffefe6;
        color: #fb5f05;
      }
    }
  }
  .type-v-box {
    display: flex;
    .type-v-box {
      display: flex;
      align-items: flex-start;
      width: 176rpx;
      background-color: #f7f7f7;
    }
    .type-v-scroll {
      position: relative;
      z-index: 12;
      //height: 900rpx;
      //padding-bottom: 160rpx;
    }
    .type-v-list {
      width: 176rpx;
      //border-radius: 0 16rpx 0 0;
      height: 100%;
      box-sizing: border-box;
      padding-bottom: 160rpx;
      //padding-top: 20rpx;
    }
    .type-v-item {
      width: 100%;
      height: 92rpx;
      line-height: 92rpx;
      text-align: center;
      color: #666;
      font-size: 28rpx;
      &-active {
        background: #ffffff;
        color: #fb5f05;
      }
    }
  }
  .paging {
    //height: 1000rpx;
  }
  .list {
    //padding: 0 32rpx;
  }
  .shop {
    position: relative;
    .shop-popup {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      width: calc(100% - 176rpx);
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
    }
    .shop-filter {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 12;
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      padding: 80rpx 32rpx 24rpx 32rpx;
      .item-box {
        background: #f7f7f7;
      }

      .list-block {
        display: flex;
        flex-wrap: wrap;
        max-height: 500rpx;
        overflow-y: auto;
      }
      .block-item {
        background: #f7f7f7;
        width: 148rpx;
        border-radius: 8rpx;
        text-align: center;
        padding: 16rpx 8rpx;
        box-sizing: border-box;
        font-size: 28rpx;
        line-height: 28rpx;
        color: #666;
        font-weight: 400;
        margin-right: 24rpx;
        margin-bottom: 12rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:nth-child(3n + 2) {
          margin-right: 22rpx; // 设计如此
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
        &-active {
          color: #fb5f05;
          background: #ffefe6;
        }
      }
    }
  }
</style>
