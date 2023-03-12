<template>
  <div>
    <a-card title="">
      <a-space>
        <a-button-group>
          <a-button
            v-for="(item, index) in goodsBtnList"
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
        <a-input
          v-if="current_btn_value !== 1"
          placeholder="请输入货品名称或户号搜索"
        ></a-input>
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
              v-for="(item, index) in sortTypeList"
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
        <bar-chart :data="barData" />
      </div>
    </a-card>
    <i-table
      v-if="current_btn_value === 1"
      v-model="search"
      v-model:refresh-now="refresh"
      :options="options1"
      :api="cbdApiProjectReportDayProductListGet"
    ></i-table>
    <i-table
      v-else-if="current_btn_value === 2"
      v-model="search"
      v-model:refresh-now="refresh"
      :options="options2"
      :page="pageOptions"
      :api="cbdApiProjectReportDayProductTopGet"
    ></i-table>
    <i-table
      v-else
      v-model="search"
      v-model:refresh-now="refresh"
      :options="options3"
      :page="pageOptions"
      :api="cbdApiProjectReportDayVenueTopGet"
    ></i-table>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import BarChart from '@/components/bar-chart/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectReportDayProductChartGet,
    cbdApiProjectReportDayProductListGet,
    cbdApiProjectReportDayProductTopGet,
    cbdApiProjectReportDayVenueTopGet
  } from '@/api';
  import { getPastDays } from '@/utils';
  import type { BarType } from '@/components/bar-chart/bar-type';
  import { dateList, goodsBtnList, sortTypeList } from '../data';
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
  const barData = ref<BarType>({
    xData: [],
    y1Data: [],
    y2Data: []
  });
  const [getBarData] = useFuncProxy(async () => {
    const res = await cbdApiProjectReportDayProductChartGet({
      ...search.value
    });
    barData.value.xData = res.x!.map((x) => x.showData!);
    barData.value.y1Data = res.barGraphDataList!.map((x) => Number(x));
    barData.value.y2Data = res.lineChartDataList!.map((x) => Number(x));
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
        label: '销售数量（sku数）',
        prop: 'sellNum'
      },
      {
        label: '销售总金额（¥）',
        prop: 'sellMoney'
      },
      {
        label: '单品销售数量（sku数）',
        prop: 'productNum'
      },
      {
        label: '单品销售金额（¥）',
        prop: 'productMoney'
      },
      {
        label: '场馆销售数量（sku数）',
        prop: 'venueNum'
      },
      {
        label: '场馆销售金额（¥）',
        prop: 'venueMoney'
      }
    ]
  };
  const options2 = {
    index: true,
    indexTitle: '序号',
    menu: false,
    columns: [
      {
        label: '商品',
        prop: 'productName'
      },
      {
        label: '规格',
        prop: 'sku'
      },
      {
        label: '商品条码',
        prop: 'barcode'
      },
      {
        label: '销售数量（sku数）',
        prop: 'sellNum'
      },
      {
        label: '销售金额（¥）',
        prop: 'sellMoney'
      }
    ]
  };
  const options3 = {
    index: true,
    indexTitle: '序号',
    menu: false,
    columns: [
      {
        label: '场地',
        prop: 'venueName',
        formatter: (e: any) => e.venueName || '--'
      },
      {
        label: '时间',
        prop: 'sku',
        formatter: (e: any) => e.sku || '--'
      },
      {
        label: '商品',
        prop: 'sellMoney'
      },
      {
        label: '销售数量（sku数）',
        prop: 'sellNum'
      },
      {
        label: '销售金额（¥）',
        prop: 'sellMoney'
      }
    ]
  };
  const pageOptions = ref<{ current: number }>({
    current: 1
  });
  const refresh = ref<boolean>(false);
  const onSubmit = () => {
    const [startDate, endDate] = useDateParams(current_date_value, pickValue);
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
