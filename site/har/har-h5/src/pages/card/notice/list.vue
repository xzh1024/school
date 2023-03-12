<template>
  <i-sys title="消息" nav-bg="bg-white">
    <z-paging
      ref="paging"
      v-model="list"
      auto-show-back-to-top
      inside-more
      :hide-empty-view="true"
      @query="getList"
    >
      <template #top>
        <calc-top />
        <i-tab v-model:value="active" :list="newFeeClassify"></i-tab>
        <view class="choose-time-box">
          <date-range-select v-model:date-range="timeRange" />
        </view>
      </template>
      <i-empty-card v-if="list?.length === 0" text="暂无相关记录" />
      <view v-if="list?.length > 0" class="list-container">
        <view
          v-for="(item, index) in list"
          :key="`r_${index}`"
          class="cell-box"
          @click="onGo(item)"
        >
          <record-cell :item="item" :card-type="2" />
        </view>
      </view>
    </z-paging>
  </i-sys>
</template>

<script setup lang="ts">
  import ITab from "./_components_/i-tab.vue";
  import { fee_classify } from "@/dic";
  import { computed, reactive, ref, watch } from "vue";
  import DateRangeSelect from "@/pages/card/cardRecord/_component_/date-range-select.vue";
  import RecordCell from "@/pages/card/cardRecord/_component_/record-cell.vue";
  import { svcAppletMessagePageGet } from "@/api/card";
  import useFuncProxy from "@/hooks/useFuncProxy";
  import IEmptyCard from "@/components/i-empty-card/i-empty-card.vue";
  import CalcTop from "@/components/calc-top/calc-top.vue";

  const active: any = ref("");
  watch(
    () => active.value,
    () => {
      paging.value.reload();
      // console.log(val, "tab change")
    }
  );

  const timeRange = ref({
    startDate: "",
    endDate: ""
  });
  watch(
    () => timeRange.value,
    (val) => {
      console.log(val, "--*--");
      const { startDate, endDate } = val;
      if ((startDate && endDate) || (!startDate && !endDate)) {
        paging.value.reload();
      }
    },
    {
      deep: true
    }
  );

  const newFeeClassify = computed(() => {
    return fee_classify.filter((item) => item.value !== 5);
  });

  const list: any = ref([]);
  const paging: any = ref(null);
  const page = reactive({
    pageNum: "1",
    pageSize: "10"
  });
  const getList = (pageNo: string, pageSize: string) => {
    page.pageNum = pageNo;
    page.pageSize = pageSize;
    getNoticeList();
  };
  const [getNoticeList] = useFuncProxy(async () => {
    uni.showLoading({ title: "加载中..." });
    const d = await svcAppletMessagePageGet({
      source: active.value,
      startTime: timeRange.value.startDate,
      endTime: timeRange.value.endDate,
      pageNum: page.pageNum,
      pageSize: page.pageSize
    });
    paging.value.completeByTotal(d?.rows || [], d?.total);
    uni.hideLoading();
  });
  // const getList = async (pageNo: string, pageSize: string) => {
  //   try {
  //     const d = await svcAppletMessagePageGet({
  //       source: active.value,
  //       startTime: timeRange.value.startDate,
  //       endTime: timeRange.value.endDate,
  //       pageNum: pageNo,
  //       pageSize
  //     });
  //     paging.value.complete(d?.rows || []);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const newType = computed(() => (val: number) => {
  //   return fee_classify.find((item) => item.value === val)?.label;
  // });
  // const newStatus = computed(() => (val: number) => {
  //   return fee_classify.find((item) => item.value === val)?.label + "成功";
  // });

  const onGo = (item: any) => {
    console.log(item, "--*--");
    uni.navigateTo({
      url: `./detail?id=${item.messageId}`
    });
  };
</script>

<style scoped lang="scss">
  .text-black {
    color: #070a16;
  }

  .text-red {
    color: #fa4e40;
  }

  .choose-time-box {
    padding: 32rpx;

    :deep(.choose-time) {
      border-bottom: none;
      padding-bottom: 0;
    }
  }

  .list-container {
    background: #f7f8fa;
    padding: 0 32rpx;
  }
</style>
