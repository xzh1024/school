<template>
  <div class="page-container">
    <div class="tab-btn-box">
      <template v-for="(item, index) in tabBtnArr" :key="index">
        <div v-if="item.show" class="tab-btn-cell" @click="toUrl(item.url)">
          <a-image :src="item.icon" width="48" height="48" />
          <div class="right-content-box">
            <div class="right-title">{{ item.title }}</div>
            <div class="right-subTitle">{{ item.subTitle }}</div>
          </div>
        </div>
      </template>
    </div>
    <div class="info-box flex justify-between">
      <div class="examine-table flex-1">
        <examine-list
          v-model:tab-active="tabActive"
          :need-page="false"
          :need-search="false"
          :page-size="5"
        />
        <a-button class="more-btn" type="text" size="small" @click="onMore"
          >查看全部<icon-right
        /></a-button>
      </div>
      <div class="tip-table"></div>
    </div>
    <div class="chart-container">
      <div class="flex justify-between">
        <div class="pie-title">{{ `${currentProject.label}分析表` }}</div>
        <div>
          <div class="type-title">维度统计</div>
          <div>
            <a-select
              v-model="dateType"
              :style="{ width: '100px' }"
              placeholder="请选择"
              @change="onDateTypeChange"
            >
              <a-option :value="1">按年</a-option>
              <a-option :value="2">按月</a-option>
            </a-select>
            <a-year-picker
              v-if="dateType === 1"
              v-model="dateValue"
              :allow-clear="false"
              style="width: 200px"
            />
            <a-month-picker
              v-else
              v-model="dateValue"
              :allow-clear="false"
              style="width: 200px"
            />
          </div>
        </div>
      </div>
      <div class="pie-container">
        <div class="pie-box">
          <i-pie :options="chartData1" :width="'100%'" height="100%" />
        </div>
        <div class="pie-box">
          <i-pie :options="chartData2" :width="'100%'" height="100%" />
        </div>
        <div class="pie-box">
          <i-pie :options="chartData3" :width="'100%'" height="100%" />
        </div>
        <div class="pie-box">
          <i-pie :options="chartData4" :width="'100%'" height="100%" />
        </div>
      </div>
      <div class="pie-title">近十日销售统计</div>
      <div class="bar-container">
        <i-bar :options="barOptions" :height="'100%'" :width="'100%'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import ExamineList from './_components_/examine-list.vue';
  import { onMounted, reactive, ref, watch } from 'vue';
  import IconDeposit from '@/assets/images/homePage/icon-deposit.png';
  import IconCollectPay from '@/assets/images/homePage/icon-collect-pay.png';
  import IconBill from '@/assets/images/homePage/icon-bill.png';
  import IconContract from '@/assets/images/homePage/icon-contract.png';
  import { useUserStore } from '@/store';
  import dayjs from 'dayjs';
  import IPie from '@/components/i-chart/pie/index.vue';
  import IBar from '@/components/i-chart/bar/index.vue';
  import { useRequest } from '@har/use';
  import {
    cbdApiProjectMisIndexDimensionStatisticsGet,
    cbdApiProjectMisIndexSalesStatisticsGet
  } from '@/api';

  const { permissions = [], currentProject } = useUserStore();

  const dateType = ref(1);
  const dateValue = ref('');

  watch(
    () => dateValue.value,
    () => {
      getStatisticsData({
        projectId: currentProject.value + '',
        type: dateType.value + '',
        queryDate: dateValue.value
      });
    }
  );

  const chartData = reactive<any>({
    legend: {
      type: 'scroll',
      bottom: 0,
      width: '100%',
      height: 40
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        left: 'center',
        top: 'middle',
        width: 120,
        height: 120,
        avoidLabelOverlap: false,
        center: ['50%', '50%'],
        labelLine: {
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: []
      }
    ]
  });

  type SeriesData = {
    name: string;
    amount: number;
  };

  const setChartData = (
    title: string,
    seriesData: SeriesData[],
    type = 'value'
  ) => {
    return {
      title: {
        text: title
      },
      legend: chartData.legend,
      series: chartData.series.map((item: any) => {
        return {
          ...item,
          label: {
            show: false,
            position: 'center',
            formatter: type === 'percent' ? '{b}: {d}%' : '{b}: {c}万元'
          },
          data: seriesData?.map((sub) => {
            return {
              value: sub.amount,
              name: sub.name
            };
          })
        };
      })
    };
  };

  const barOptions = ref({});

  onMounted(() => {
    console.log(currentProject);
    onDateTypeChange();

    const endDate = dayjs().format('YYYY-MM-DD');
    const startDate = dayjs(endDate).subtract(9, 'day').format('YYYY-MM-DD');

    getBarData({
      projectId: currentProject.value + '',
      startDate,
      endDate
    });
  });

  const chartData1 = ref({});
  const chartData2 = ref({});
  const chartData3 = ref({});
  const chartData4 = ref({});

  const { run: getStatisticsData } = useRequest(
    cbdApiProjectMisIndexDimensionStatisticsGet,
    {
      manual: true,
      onSuccess(e) {
        //本年收入
        chartData1.value = setChartData(
          dateType.value === 1 ? '本年收入' : '本月收入',
          e.expenseItemList || []
        );
        //租金缴纳率
        chartData2.value = setChartData(
          '租金缴纳率',
          e.paymentRate || [],
          'percent'
        );
        //应收实收
        chartData3.value = setChartData('应收实收', e.payment || []);
        //业态销售额
        chartData4.value = setChartData('业态销售额', e.salesVolumeList || []);
        // };
      }
    }
  );

  const { run: getBarData } = useRequest(
    cbdApiProjectMisIndexSalesStatisticsGet,
    {
      manual: true,
      onSuccess(e) {
        console.log(e);
        barOptions.value = {
          grid: {
            left: 0,
            right: 0,
            bottom: 10,
            top: 40,
            containLabel: true
          },
          xAxis: {
            data: e.map((item) => item.date)
          },
          yAxis: {
            name: '万元'
          },
          series: [
            {
              type: 'bar',
              label: {
                show: true,
                formatter: '{c}'
              },
              data: e.map((item) => item.totalAmount)
            }
          ]
        };
      }
    }
  );

  const onDateTypeChange = () => {
    if (dateType.value === 1) {
      dateValue.value = dayjs().format('YYYY');
    } else {
      dateValue.value = dayjs().format('YYYY-MM');
    }
  };

  const tabBtnArr = [
    {
      title: '存款处理单',
      subTitle: '点击新建存款处理单',
      icon: IconDeposit,
      url: 'finance-manage/deposit/list',
      show: permissions.includes('deposit:change:page')
    },
    {
      title: '收付款单',
      subTitle: '点击新建收付款单',
      icon: IconCollectPay,
      url: 'finance-manage/collect-pay',
      show: permissions.includes('mis:payment:list')
    },
    {
      title: '账单生成',
      subTitle: '点击新建应收账单',
      icon: IconBill,
      url: 'finance-manage/bill',
      show: permissions.includes('formal:bill:list')
    },
    {
      title: '新建合同',
      subTitle: '点击新建正式合同',
      icon: IconContract,
      url: 'new-contract/formalList',
      show: permissions.includes('formal:contract:list')
    }
  ];

  const tabActive = ref(1);

  watch(
    () => tabActive.value,
    (val) => {
      tabActive.value = val;
    }
  );

  const router = useRouter();
  const onMore = () => {
    router.push({
      path: '/homePage/examine-list',
      query: {
        tabActive: tabActive.value
      }
    });
  };

  const toUrl = (path: string) => {
    router.push({
      path
    });
  };
</script>

<style scoped lang="less">
  .page-container {
    .tab-btn-box {
      display: flex;
      align-items: center;
      width: 100%;
      .tab-btn-cell {
        display: flex;
        align-items: center;
        width: 25%;
        height: 82px;
        margin-right: 16px;
        margin-bottom: 16px;
        padding: 16px;
        background: #fff;
        border-radius: 8px;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
        .right-content-box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          margin-left: 16px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .right-title {
            color: #333;
            font-weight: bold;
            font-size: 18px;
          }
          .right-subTitle {
            color: #999;
            font-size: 12px;
          }
        }
      }
    }
    .info-box {
      .examine-table {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        .more-btn {
          position: absolute;
          top: 23px;
          right: 12px;
          color: #333;
        }
      }
      .tip-table {
        display: none;
        width: 393px;
        margin-left: 16px;
        overflow: hidden;
        background: #fff;
        border-radius: 8px;
      }
    }
    .chart-container {
      margin-top: 16px;
      padding: 16px;
      background: #fff;
      border-radius: 8px;
      .pie-title {
        display: flex;
        align-items: center;
        height: 16px;
        color: #333;
        font-weight: bold;
        font-size: 16px;
        &::before {
          display: inline-flex;
          width: 2px;
          height: 16px;
          margin-right: 4px;
          background: #117cfa;
          content: '';
        }
      }
      .type-title {
        margin-bottom: 8px;
        color: #333;
        font-size: 14px;
      }
      .pie-container {
        display: flex;
        align-items: center;
        margin-top: 18px;
        margin-bottom: 24px;
        .pie-box {
          width: 24%;
          height: 240px;
          margin-right: 22px;
          padding: 6px;
          background: #f7f7f7;
          border-radius: 8px;
          &:last-child {
            width: 25%;
            margin-right: 0;
          }
        }
      }
      .bar-container {
        width: 100%;
        height: 267px;
      }
    }
  }
</style>
