<template>
  <div>
    <a-card title="">
      <a-space>
        <a-button-group>
          <a-button
            v-for="(item, index) in payTypeList"
            :key="item.value"
            :type="current_btn_type === index ? 'primary' : undefined"
            @click="handleBtnType(index, item.value)"
          >
            {{ item.label }}
          </a-button>
        </a-button-group>
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
      <div style="margin-top: 20px">
        <a-space>
          <a-button-group v-if="current_btn_value !== 1">
            <a-button
              v-for="(item, index) in payTypeSort"
              :key="item.value"
              :type="current_sort_type === index ? 'primary' : undefined"
              @click="handleSortType(index, item.value)"
            >
              {{ item.label }}
            </a-button>
          </a-button-group>
          <span>{{ search.startDate }} 至 {{ search.endDate }}</span>
        </a-space>
      </div>
      <div v-if="current_btn_value === 1" class="chart-box">
        <multi :options="barData" />
      </div>
    </a-card>
    <i-table
      v-if="current_btn_value === 1"
      v-model="search"
      v-model:refresh-now="refresh"
      :options="options1"
      :api="cbdApiProjectReportDayPayListGet"
    />
    <i-table
      v-else
      v-model="search"
      v-model:refresh-now="refresh"
      :options="options2"
      :page="pageOptions"
      :api="cbdApiProjectReportDayPayTopGet"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Multi from '../__components__/multi-line/index.vue';
  import type { MultiLineType } from '../__components__/multi-line/multi-line';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectReportDayPayChartGet,
    cbdApiProjectReportDayPayListGet,
    cbdApiProjectReportDayPayTopGet
  } from '@/api';
  import { getPastDays } from '@/utils';
  import { dateList, payTypeList, payTypeSort } from '../data';
  import useDateParams from '@/views/statistics/useDateParams';
  const search = ref<{
    startDate: string;
    endDate: string;
    dateType: string;
    sort?: string;
  }>({
    startDate: getPastDays().startDate,
    endDate: getPastDays().endDate,
    dateType: '1',
    sort: '1'
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
  // 控制数据来源 销售,场地
  const current_btn_type = ref<number>(0);
  const current_btn_value = ref<number>(1);
  const handleBtnType = (idx: number, v: number) => {
    current_btn_type.value = idx;
    current_btn_value.value = v;
    // 每次切换从第一页开始请求
    pageOptions.value.current = 1;
  };
  // 控制排序
  const current_sort_type = ref<number>(0);
  const handleSortType = (idx: number, v: number) => {
    current_sort_type.value = idx;
    search.value.sort = String(v);
    // 每次切换从第一页开始请求
    pageOptions.value.current = 1;
    refresh.value = true;
  };

  // echarts 图表数据
  const barData = ref<MultiLineType>({
    xData: [],
    series: [],
    total1: 0,
    total2: 0
  });
  const [getBarData] = useFuncProxy(async () => {
    const res = await cbdApiProjectReportDayPayChartGet({
      ...search.value
    });
    barData.value.xData = res.x!.map((x) => x.showData!);
    barData.value.total1 = res.totalMoney;
    barData.value.total2 = res.totalNum;
    const {
      aliBarY = {},
      wechatBarY = {},
      posBarY = {},
      cashBarY = {},
      mixedBarY = {},
      aliLineY = {},
      wechatLineY = {},
      posLineY = {},
      mixedLineY = {},
      cashLineY = {}
    } = res;
    barData.value.series = [
      { name: aliBarY.name!, data: aliBarY.value!, type: 'bar' },
      { name: wechatBarY.name!, data: wechatBarY.value!, type: 'bar' },
      { name: posBarY.name!, data: posBarY.value!, type: 'bar' },
      { name: cashBarY.name!, data: cashBarY.value!, type: 'bar' },
      { name: mixedBarY.name!, data: mixedBarY.value!, type: 'bar' },
      { name: aliLineY.name!, data: aliLineY.value!, type: 'line' },
      { name: wechatLineY.name!, data: wechatLineY.value!, type: 'line' },
      { name: posLineY.name!, data: posLineY.value!, type: 'line' },
      { name: mixedLineY.name!, data: mixedLineY.value!, type: 'line' },
      { name: cashLineY.name!, data: cashLineY.value!, type: 'line' }
    ];
  });

  // table
  const options1 = {
    index: true,
    indexTitle: '序号',
    menu: false,
    columns: [
      {
        label: '日期',
        prop: 'dataDate'
      },
      {
        label: '支付总单数',
        prop: 'payNum'
      },
      {
        label: '支付总金额（¥）',
        prop: 'payMoney'
      },
      {
        label: '微信支付单数',
        prop: 'wechatPayNum'
      },
      {
        label: '微信支付金额（¥）',
        prop: 'wechatPayMoney'
      },
      {
        label: '支付宝支付单数',
        prop: 'aliPayNum'
      },
      {
        label: '支付宝支付金额（¥）',
        prop: 'aliPayMoney'
      },
      {
        label: '现金支付单数',
        prop: 'cashPayNum'
      },
      {
        label: '现金支付金额（¥）',
        prop: 'cashPayMoney'
      },
      {
        label: '混合支付单数',
        prop: 'mixedPayNum'
      },
      {
        label: '混合支付金额（¥）',
        prop: 'mixedPayMoney'
      }
    ]
  };
  const options2 = {
    index: true,
    indexTitle: '序号',
    menu: false,
    notPage: true,
    pageShow: false,
    columns: [
      {
        label: '支付方式',
        prop: 'payName'
      },
      {
        label: '支付单数（sku数）',
        prop: 'payNum'
      },
      {
        label: '支付金额（¥）',
        prop: 'payMoney'
      }
    ]
  };
  const pageOptions = ref<{ current: number }>({
    current: 1
  });
  const refresh = ref<boolean>(false);
  const onSubmit = () => {
    const [startDate, endDate] = useDateParams(current_date_value, pickValue);
    // 有选择time就用,没有就默认过去七天
    search.value = {
      sort: search.value.sort,
      startDate,
      endDate,
      dateType: String(current_date_value.value!)
    };
    // 只有销售统计需要请求图表
    if (current_btn_value.value === 1) {
      getBarData();
    }
    refresh.value = true;
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
