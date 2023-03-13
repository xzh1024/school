<template>
  <i-sys title="历史记录" nav-bg="bg-white">
    <!-- #ifndef H5 -->
    <z-paging
      ref="paging"
      v-model="list"
      auto-show-back-to-top
      inside-more
      :hide-empty-view="true"
      class="page-container"
      @query="getList"
    >
      <template #top>
        <calc-top />
        <view class="card-info-box">
          <card-cell :info="cardInfo" />
          <view class="card-statistics">
            <view class="statistics-cell">
              <view class="text-18">{{
                formatPrice(cardInfo?.balance || 0)
              }}</view>
              <view>当前余额(￥)</view>
            </view>
            <view class="statistics-cell">
              <view class="text-18">{{
                formatPrice(cardInfo?.totalRecharge || 0)
              }}</view>
              <view>累计充值(￥)</view>
            </view>
            <view class="statistics-cell">
              <view class="text-18">{{
                formatPrice(cardInfo?.totalConsume || 0)
              }}</view>
              <view>累计消费(￥)</view>
            </view>
          </view>
        </view>
        <view class="choose-time-box">
          <date-range-select v-model:date-range="timeRange" />
        </view>
      </template>
      <i-empty-card v-if="list.length === 0" text="暂无相关记录" />
      <view v-if="list.length > 0" class="list-container">
        <view v-for="(item, index) in list" :key="`r_${index}`">
          <record-cell :item="item" :show-bottom="index < list.length - 1" />
        </view>
      </view>
      <view class="space-box"></view>
      <template #bottom>
        <i-footer v-if="cardInfo.status === 1">
          <i-card-button bg-color="#FF811A" class="i-btn" @tap="onRecharge"
            >充值</i-card-button
          >
        </i-footer>
      </template>
      <!-- <i-footer v-if="cardInfo.status === 1">
        <i-card-button bg-color="#FF811A" class="i-btn" @tap="onRecharge"
        >充值</i-card-button
        >
      </i-footer> -->
    </z-paging>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <view class="page-h5-container">
      <card-cell :info="cardInfo" />
      <view class="money">{{ `余额：0.00元` }}</view>
      <view class="btn-box">
        <view class="i-btn-pay">付款</view>
      </view>
      <view class="pay-content">点击生成付款码</view>
      <i-cell label="储蓄卡详情" :right-icon="true" />
      <i-cell label="充值" :right-icon="true" />
      <i-cell label="使用店铺" :right-icon="true" />
    </view>
    <!-- #endif -->
  </i-sys>
</template>

<script setup lang="ts">
  import CardCell from "./_component_/card-cell.vue";
  import { reactive, ref, watch } from "vue";
  import RecordCell from "./_component_/record-cell.vue";
  import {
    svcAppletMemberCardInfoGet,
    svcAppletMemberCardTradePageGet
  } from "@/api/card";
  import DateRangeSelect from "@/pages/card/cardRecord/_component_/date-range-select.vue";
  import { onLoad } from "@dcloudio/uni-app";
  import IEmptyCard from "@/components/i-empty-card/i-empty-card.vue";
  import useFuncProxy from "@/hooks/useFuncProxy";
  import { formatPrice } from "@/utils";
  // #ifdef H5
  import Messaenger from "MessengerJS";
  import ICell from "@/components/i-cell/index.vue";
  // import NP from "number-precision";
  // #endif

  const cardInfo: any = ref({});
  // #ifdef H5
  const messenger = new Messaenger("basciRefs", "cardCode");
  // @ts-ignore
  messenger.listen((data) => {
    console.log("basciRefs", data);

    cardInfo.value = data;
  });
  // #endif

  // onMounted(() => {
  //   getCardInfo();
  // })
  // #ifndef H5
  const memberCardCode = ref("");
  onLoad((options) => {
    memberCardCode.value = options?.cardNo;
    getCardInfo();
  });

  const onRecharge = () => {
    console.log("去充值");
    uni.navigateTo({
      url: `/pages/card/recharge/recharge?cardNo=${cardInfo.value.cardCode}&type=recharge&memberCardCode=${cardInfo.value.memberCardCode}`
    });
  };

  const timeRange = ref({
    startDate: "",
    endDate: ""
  });
  watch(
    () => timeRange.value,
    (val) => {
      console.log(val, "--*--");
      const { startDate, endDate } = val;
      if (startDate && endDate) {
        paging.value.reload();
      }
    },
    {
      deep: true
    }
  );

  const [getCardInfo] = useFuncProxy(async () => {
    cardInfo.value = await svcAppletMemberCardInfoGet({
      memberCardCode: memberCardCode.value
    });
  });
  // const getCardInfo = async () => {
  //   try {
  //     cardInfo.value = await svcAppletMemberCardInfoGet({
  //       memberCardCode: memberCardCode.value
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const list: any = ref([]);
  const paging: any = ref(null);
  const page = reactive({
    pageNum: "1",
    pageSize: "10"
  });
  const getList = (pageNo: string, pageSize: string) => {
    console.log(pageNo, pageSize, "--pageNo--");
    page.pageNum = pageNo;
    page.pageSize = pageSize;
    getCardRecordList();
  };
  const [getCardRecordList] = useFuncProxy(async () => {
    uni.showLoading({ title: "加载中..." });
    const d = await svcAppletMemberCardTradePageGet({
      ...timeRange.value,
      memberCardCode: memberCardCode.value,
      type: "0",
      pageNum: page.pageNum,
      pageSize: page.pageSize
    });
    // if (NP.times(Number(page.pageNum), Number(page.pageSize)) >= d?.total) {
    //
    // }
    // paging.value.complete(d?.rows || []);
    paging.value.completeByTotal(d?.rows || [], d?.total);
    uni.hideLoading();
  });
  // #endif
  // const getList = async (pageNo: string, pageSize: string) => {
  //   try {
  //     const d = await svcAppletMemberCardTradePageGet({
  //       ...timeRange.value,
  //       memberCardCode: memberCardCode.value,
  //       type: "0",
  //       pageNum: pageNo,
  //       pageSize
  //     });
  //     paging.value.complete(d?.rows || []);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
</script>

<style scoped lang="scss">
  :deep(.zp-empty-view) {
    flex: 0;
  }
  .text-18 {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 8rpx;
  }
  .card-box {
    background: #ffffff;
    padding: 32rpx;
  }
  .card-statistics {
    margin-top: 24rpx;
    background: #f0f0f0;
    border-radius: 24rpx;
    padding: 32rpx 42rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .statistics-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      font-size: 24rpx;
    }
  }
  .space-box {
    width: 100%;
    //padding: 24rpx 32rpx calc(24rpx + constant(safe-area-inset-bottom));
    padding: 24rpx 32rpx calc(24rpx + env(safe-area-inset-bottom));
    // background: #ffffff;
  }
  .choose-time-box {
    padding: 32rpx;
  }
  .card-info-box {
    padding: 32rpx;
    background: #ffffff;
  }
  .page-container {
  }
  .list-container {
    padding: 0 32rpx;
  }
  .i-btn {
    width: 100%;
  }
  .page-h5-container {
    padding: 32rpx;
    background: #ffffff;
    .money {
      text-align: center;
      font-size: 28rpx;
      margin-top: 24rpx;
    }
    .btn-box {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .i-btn-pay {
      border: 1px solid rgb(40, 90, 250);
      width: 30%;
      padding: 12rpx 24rpx;
      color: rgb(40, 90, 250);
      font-size: 28rpx;
      text-align: center;
      border-radius: 16rpx;
      margin: 24rpx 0;
    }
    .pay-content {
      font-size: 28rpx;
      text-align: center;
    }
  }
</style>
