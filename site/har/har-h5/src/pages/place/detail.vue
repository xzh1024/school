<template>
  <i-sys title="预约" :nav-placeholder="true">
    <view class="page" :class="totalPrice === 0 ? 'safe-area' : ''">
      <!--场地信息-->
      <view class="place-image-box">
        <swiper class="swiper" circular>
          <swiper-item
            v-for="(item, index) in placeInfo.venuePics"
            :key="index"
          >
            <image
              class="image-style"
              :src="fixImage(item, { w: 375 })"
              mode="aspectFit"
            />
          </swiper-item>
        </swiper>
      </view>
      <view class="place-info-box">
        <view class="text-xl text-color-3 margin-bottom-9">{{
          placeInfo.venueName
        }}</view>
        <view class="flex align-center space-between text-xs text-color-9">
          <view>{{ placeInfo.venueClassify }}</view>
          <view
            >月售
            <text class="text-color-3">{{ placeInfo.sales || 0 }}</text></view
          >
        </view>
      </view>
      <!--场地预约区域-->
      <view class="place-order-box margin-top-16">
        <view class="order-type-box">
          <view
            v-for="(item, index) in newTitleTypes"
            :key="index"
            class="order-type-item"
            :class="Number(item.type) === Number(ruleType) ? 'active' : ''"
            @click="onChange(item.type)"
          >
            <view class="icon-type-box">
              <image :src="item.icon" class="image-style" />
            </view>
            <view>{{ item.title }}</view>
          </view>
        </view>
      </view>
      <view
        class="handle-area-box"
        :class="ruleType === 1 ? 'bottom-space' : ''"
      >
        <date-slider
          v-if="[2, 3].includes(ruleType) && showSlider"
          :choose-date="dayTimes"
          @get-date="getDate"
        />
        <template v-if="[1, 3].includes(ruleType)">
          <cell-item
            v-for="(item, index) in cellInfo"
            :key="index"
            :cell-info="item"
            @on-join-cart="onJoinCart"
          />
        </template>
        <template v-else>
          <view v-if="cellInfo && cellInfo.length">
            <time-item
              v-for="(item, index) in cellInfo"
              :key="index"
              :cell-info="item"
            />
          </view>
        </template>
      </view>
      <view v-if="totalPrice > 0" class="space-box"></view>
      <!-- 购物结算 -->
      <view v-if="totalPrice > 0" class="bottom-box">
        <view class="flex align-center">
          <view class="text-xss text-color-6">预估到手价</view>
          <view class="flex align-center">
            <view class="text-xs">￥</view>
            <view class="text-lg">{{ totalPrice || 0.0 }}</view>
          </view>
        </view>
        <view>
          <i-button type="primary" class="i-button" @click="onTimeRangeBuy"
            >去结算</i-button
          >
        </view>
      </view>
      <!--购物车弹窗-->
      <shop-cart-popup
        v-show="ruleType === 1"
        v-model:do-update="isNeedDo"
        :market-id="storeId"
        goods-type="2"
      />
    </view>
  </i-sys>
</template>

<script setup>
  import { onLoad, onShow } from "@dcloudio/uni-app";
  import { cbdApiAppletReserveVenueInfoGet } from "@/api";
  import { ref, computed, watch } from "vue";
  import CellItem from "./_components_/cell-item";
  import TimeItem from "./_components_/time-item";
  import DateSlider from "./_components_/date-slider";
  import dayjs from "dayjs";
  import NP from "number-precision";
  import ShopCartPopup from "../../components/common/shop-cart-popup/shop-cart-popup";
  import { joinCart } from "@/utils/shopCart";
  import IButton from "../../components/i-button/index.vue";
  import { usePlaceStore } from "@/stores/place";
  import { fixImage } from "@/utils";

  const placeInfo = ref({}); //场地所有信息
  const ruleType = ref(0); //当前默认选中的预约类型
  const storeId = ref(""); //店铺id
  const venueId = ref(""); //场馆id
  const dayTimes = ref(); //选择的时间
  const showSlider = ref(true); //显示时间滚动组件
  const newTitleTypes = ref([]); //卡类型列表

  const iconArr = [
    {
      icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/place/icon-count-card.png",
      name: 1
    },
    {
      icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/place/icon-time-card.png",
      name: 2
    },
    {
      icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/place/icon-site-card.png",
      name: 3
    }
  ];

  onLoad((option) => {
    console.log(option, "url传递参数");
    venueId.value = option.venueId ? option.venueId : "";
    ruleType.value = option.ruleType ? Number(option.ruleType) : 1;
    storeId.value = option.storeId ? Number(option.storeId) : "";
    dayTimes.value = dayjs().format("YYYY-MM-DD");
    // getPlaceDetail(ruleType.value, venueId.value, dayTimes.value);
  });

  /**
   * 获取场地信息
   * @returns {Promise<void>}
   */
  const getPlaceDetail = async (ruleTypeValue, venueId, dayTimes) => {
    uni.showLoading({
      title: "加载中"
    });
    try {
      const d = await cbdApiAppletReserveVenueInfoGet({
        venueId,
        ruleType: ruleTypeValue,
        dayTimes
      });
      placeInfo.value = d;
      newTitleTypes.value = d.titleTypes.map((item) => {
        return {
          ...item,
          icon: iconArr.find((sub) => sub.name === item.type).icon
        };
      });
      setCellInfo();
    } catch (e) {
      console.error(e);
    } finally {
      uni.hideLoading();
    }
  };

  /**
   * 切换预约场地类型
   * @param value
   */
  const onChange = (value) => {
    if (value === ruleType.value) return;
    ruleType.value = value;
    showSlider.value = false;
    setTimeout(() => {
      showSlider.value = true;
    }, 50);
    const storeTimeArr = placeStore.chooseTimeArr;
    if (value !== 2 && storeTimeArr.length > 0) {
      placeStore.clearArr();
    }
  };

  const cellInfo = ref([]);
  const setCellInfo = () => {
    if ([1, 3].includes(ruleType.value)) {
      //包场卡|次卡
      cellInfo.value = placeInfo.value.periods.map((item) => {
        const { skuId, title, salePrice, week, startTime, endTime, state } =
          item;
        return {
          skuId,
          title,
          salePrice,
          state,
          desc: ruleType.value === 1 ? week : `${week}${startTime}-${endTime}`,
          btnName: ruleType.value === 3 ? "去结算" : "加入购物车",
          ruleType: ruleType.value
        };
      });
    } else {
      cellInfo.value = placeInfo.value.periods.map((item) => {
        const { skuId, title, salePrice, startTime, endTime, timesList } = item;
        return {
          skuId,
          title,
          salePrice,
          timeRange: `${startTime}-${endTime}`,
          timesList
        };
      });
    }
  };

  const placeStore = usePlaceStore();
  const totalPrice = computed(() => {
    const storeTimeArr = placeStore.chooseTimeArr;
    let total = 0;
    storeTimeArr.forEach((item) => {
      item.timeArr.forEach((sub) => {
        total = NP.plus(total, sub.salePrice);
      });
    });
    return total;
  });

  const getDate = (value) => {
    dayTimes.value = value;
    cellInfo.value = [];
    getPlaceDetail(Number(ruleType.value), venueId.value, value);
  };

  /**
   * 时段卡结算
   */
  const onTimeRangeBuy = () => {
    const { venueId, storeId } = placeInfo.value;
    placeStore.setVenueId(venueId);
    placeStore.setStoreId(storeId);
    uni.navigateTo({
      url: `/pages/order/order-preview?type=2&gymType=22`
    });
  };

  const isNeedDo = ref(false);
  /**
   * 次卡加入购物车或包场卡结算
   */
  const onJoinCart = (item) => {
    const { ruleType, skuId, title, desc } = item;
    const { storeId, venueId, venueName } = placeInfo.value;
    if (ruleType === 1) {
      //次卡加入购物车
      const data = {
        storeId: storeId,
        storeName: venueName,
        skuList: [
          {
            type: 2,
            prdId: item.skuId,
            prdName: title,
            prdPic:
              "https://har-cbd-cdn.huianrong.com/har-cbd/applet/place/icon-card-cover.png",
            prdNum: 1,
            prdPrice: item.salePrice,
            skuId: skuId,
            specDesc: desc
          }
        ]
      };
      joinCart(data, 2, () => {
        isNeedDo.value = true;
      });
      isNeedDo.value = true;
    } else if (ruleType === 3) {
      //包场卡结算
      placeStore.setPlaceCard({ skuId, date: dayTimes.value });
      placeStore.setVenueId(venueId);
      placeStore.setStoreId(storeId);
      uni.navigateTo({
        url: `/pages/order/order-preview?type=2&gymType=23`
      });
    }
  };

  watch(
    () => ruleType.value,
    (newVal) => {
      dayTimes.value = dayjs().format("YYYY-MM-DD");
      cellInfo.value = [];
      getPlaceDetail(Number(newVal), venueId.value, dayTimes.value);
    }
  );

  // 每次都重新请求数据,显示场馆最新状态
  onShow(() => {
    isNeedDo.value = true;
    if (venueId.value && dayTimes.value) {
      getPlaceDetail(Number(ruleType.value), venueId.value, dayTimes.value);
    }
  });
</script>

<style scoped lang="scss">
  .safe-area {
    padding-bottom: env(safe-area-inset-bottom);
  }
  .space-box {
    height: 180rpx;
    background: transparent;
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
  .flex {
    display: flex;
  }
  .align-end {
    align-items: flex-end;
  }
  .align-center {
    align-items: center;
  }
  .space-between {
    justify-content: space-between;
  }
  .text-xss {
    font-size: 20rpx;
  }
  .text-xs {
    font-size: 24rpx;
  }
  .text-sm {
    font-size: 28rpx;
  }
  .text-lg {
    font-size: 32rpx;
  }
  .text-xl {
    font-size: 36rpx;
  }
  .text-bold {
    font-weight: bold;
  }
  .text-color-3 {
    color: #333333;
  }
  .text-color-6 {
    color: #666666;
  }
  .text-color-9 {
    color: #999999;
  }
  .text-red {
    color: #ea3d41;
  }
  .margin-bottom-9 {
    margin-bottom: 18rpx;
  }
  .margin-top-16 {
    margin-top: 32rpx;
  }
  .image-style {
    width: 100%;
    height: 100%;
  }
  .i-button {
    width: 168rpx;
    height: 76rpx;
    background: #fb5f05;
    border-radius: 38rpx;
    opacity: 1;
    color: #ffffff;
    font-size: 32rpx;
    display: flex;
    align-items: center;
    border: none;
    justify-content: center;
    &:after {
      border: none;
    }
  }
  .page {
    .place-image-box {
      .swiper {
        width: 100%;
        height: 500rpx;
      }
    }
    .place-info-box {
      background: #ffffff;
      padding: 22rpx 32rpx;
    }
    .place-order-box {
      padding: 32rpx;
      background: #ffffff;
      .order-type-box {
        padding: 5px;
        width: 100%;
        display: flex;
        overflow-x: auto;
        .order-type-item {
          height: 76rpx;
          flex-basis: 202rpx;
          flex-shrink: 0;
          white-space: nowrap;
          background: #ffffff;
          box-shadow: 0 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.08);
          border-radius: 16rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28rpx;
          margin-right: 40rpx;
          &:last-child {
            margin-right: 0;
          }
          .icon-type-box {
            height: 50rpx;
            width: 50rpx;
            margin-right: 16rpx;
          }
        }
        .active {
          background: #fb5f05;
          color: #ffffff;
        }
      }
    }
    .handle-area-box {
      background: #ffffff;
      //padding-bottom: 30rpx;
      &.bottom-space {
        padding-bottom: 165rpx;
        background: transparent;
      }
    }
    .bottom-box {
      position: fixed;
      bottom: 0;
      left: 0;
      height: 160rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 3px 6px 1px rgba(0, 0, 0, 0.16);
      background: #ffffff;
      padding: 0 16px;
      width: stretch;
    }
  }
</style>
