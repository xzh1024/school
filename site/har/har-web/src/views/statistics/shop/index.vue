<template>
  <div>
    <a-card title="">
      <a-space>
        <a-button-group>
          <a-button
            v-for="(item, index) in dateList"
            :key="item.value"
            :type="current_date_type === index ? 'primary' : undefined"
            @click="handleDateList(index, item.value)"
          >
            {{ item.label }}
          </a-button>
        </a-button-group>
        <a-range-picker v-model="pickValue" :mode="mode" />
        <a-button type="primary" @click="onSubmit">
          <template #icon>
            <icon-search />
          </template>
          搜索
        </a-button>
      </a-space>
      <a-row style="margin-top: 15px">
        <a-col>
          <a-button-group>
            <a-button
              v-for="(item, index) in channelList"
              :key="item.value"
              :type="current_channel_type === index ? 'primary' : undefined"
              @click="handleChannelType(index, item.value)"
            >
              {{ item.label }}
            </a-button>
          </a-button-group>
        </a-col>
      </a-row>
      <p>{{ search.startDate }} 至 {{ search.endDate }}</p>
      <div class="chart-box">
        <bar-chart :data="barData" />
      </div>
    </a-card>
    <i-table
      v-model="search"
      v-model:refresh-now="refresh"
      :options="options"
      :api="cbdApiProjectReportStoreListGet"
    ></i-table>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import BarChart from '@/components/bar-chart/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectReportStoreChartGet,
    cbdApiProjectReportStoreListGet
  } from '@/api';
  import { getPastDays } from '@/utils';
  import type { BarType } from '@/components/bar-chart/bar-type';
  import { dateList, channelList } from '../data';
  import useDateParams from '../useDateParams';

  const search = ref<{
    startDate: string;
    endDate: string;
    dateType: string;
    queryType: string;
  }>({
    startDate: getPastDays().startDate,
    endDate: getPastDays().endDate,
    dateType: '1',
    queryType: '1'
  });
  const mode = computed<any>(() => {
    return { 1: 'date', 2: 'month', 3: 'year' }[current_date_value.value!];
  });
  // 控制日期条件
  const current_date_type = ref<number>(0);
  const current_date_value = ref<number>(1);
  const pickValue = ref<Array<Date | string | number>>([
    getPastDays().standardStart,
    getPastDays().standardEnd
  ]);
  const handleDateList = (idx: number, v: number) => {
    current_date_type.value = idx;
    current_date_value.value = v;
    pickValue.value = [];
  };
  // 控制渠道条件
  const current_channel_type = ref<number>(0);
  const current_channel_value = ref<number>(1);
  const handleChannelType = (idx: number, v: number) => {
    current_channel_type.value = idx;
    current_channel_value.value = v;
    onSubmit();
  };

  const barData = ref<BarType>({
    xData: [],
    y1Data: [],
    y2Data: []
  });
  const [getBarData] = useFuncProxy(async () => {
    const res = await cbdApiProjectReportStoreChartGet({ ...search.value });
    barData.value.xData = res.x!.map((x) => x.showData!);
    barData.value.y1Data = res.barY!.map((x) => Number(x));
    barData.value.y2Data = res.lineY!.map((x) => Number(x));
  });

  // table
  const options = ref({
    index: true,
    indexTitle: '序号',
    menu: false,
    columns: [
      {
        label: '店铺名称',
        prop: 'storeName'
      },
      {
        label: '店铺号',
        prop: 'storeCode'
      },
      {
        label: '订单数量',
        prop: 'orderNum'
      },
      {
        label: '订单金额（¥）',
        prop: 'orderMoney'
      },
      {
        label: '线上订单数',
        prop: 'onlineOrderNum'
      },
      {
        label: '线上订单金额（¥）',
        prop: 'onlineOrderMoney'
      },

      {
        label: '线下订单数',
        prop: 'offlineOrderNum'
      },
      {
        label: '线下订单金额（¥）',
        prop: 'offlineOrderMoney'
      },
      {
        label: '单品订单数',
        prop: 'productNum'
      },
      {
        label: '单品订单金额（¥）',
        prop: 'productMoney'
      },
      {
        label: '场馆订单数',
        prop: 'venueNum'
      },
      {
        label: '场馆订单金额（¥）',
        prop: 'venueMoney'
      }
    ]
  });
  const refresh = ref<boolean>(false);
  const onSubmit = () => {
    const [startDate, endDate] = useDateParams(current_date_value, pickValue);
    search.value = {
      startDate,
      endDate,
      dateType: String(current_date_value.value!),
      queryType: String(current_channel_value.value!)
    };
    refresh.value = true;
    getBarData();
  };
  onMounted(() => {
    getBarData();
  });
</script>
<style scoped lang="less">
  .chart-box {
    width: 100%;
    height: 300px;
  }
</style>
