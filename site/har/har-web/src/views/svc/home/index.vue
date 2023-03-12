<template>
  <div class="home">
    <a-card style="margin-bottom: 20px" :header-style="{ height: '62px' }">
      <template #title>
        <div class="flex justify-between align-center">
          <div>欢迎回来{{ user.userName || '' }}</div>
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
        </div>
      </template>
      <a-row :gutter="30" justify="space-around">
        <a-col :span="6">
          <a-row div style="display: flex">
            <a-col>
              <div class="iconItem" style="background-color: #d9eafe">
                <a-image
                  src="~@/assets/images/home/icon1.png"
                  :preview="false"
                  width="26px"
                />
              </div>
            </a-col>
            <a-col class="rightItem">
              <div>电子卡开卡金额</div>
              <div class="textItem"
                >￥:{{ totalData.open && totalData.open.amount }}</div
              >
              <div
                >开卡单数:{{ totalData.open && totalData.open.orderNum }}</div
              >
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="6">
          <a-row div style="display: flex">
            <a-col>
              <div class="iconItem" style="background-color: #fff5dd">
                <a-image
                  src="~@/assets/images/home/icon2.png"
                  :preview="false"
                  width="26px"
                />
              </div>
            </a-col>
            <a-col class="rightItem">
              <div>电子卡充值金额</div>
              <div class="textItem"
                >￥:{{ totalData.recharge && totalData.recharge.amount }}</div
              >
              <div
                >充值单数:{{
                  totalData.recharge && totalData.recharge.orderNum
                }}</div
              >
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="6">
          <a-row div style="display: flex">
            <a-col>
              <div class="iconItem" style="background-color: #ffdbdf">
                <a-image
                  src="~@/assets/images/home/icon3.png"
                  :preview="false"
                  width="26px"
                />
              </div>
            </a-col>
            <a-col class="rightItem">
              <div>电子卡消费金额</div>
              <div class="textItem"
                >￥:{{ totalData.consume && totalData.consume.amount }}</div
              >
              <div
                >消费单数:{{
                  totalData.consume && totalData.consume.orderNum
                }}</div
              >
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="6">
          <a-row div style="display: flex">
            <a-col>
              <div class="iconItem" style="background-color: #f1e3ff">
                <a-image
                  src="~@/assets/images/home/icon4.png"
                  :preview="false"
                  width="26px"
                />
              </div>
            </a-col>
            <a-col class="rightItem">
              <div>电子卡退款金额</div>
              <div class="textItem"
                >￥:{{ totalData.refund && totalData.refund.amount }}</div
              >
              <div
                >退款订单数:{{
                  totalData.refund && totalData.refund.orderNum
                }}</div
              >
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
    <a-row :gutter="24">
      <a-col :span="18">
        <a-card title="储值卡运营分析（¥）">
          <multi-line :options="runAnalysis" style="height: 400px" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card title="电子卡状态占比">
          <pie :options="cardStatusData" style="height: 400px" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue';
  import { useUserStore } from '@/store/svc/user';
  import { dateList } from '@/utils/dic';
  import MultiLine from '@/components/i-chart/multi-line/index.vue';
  import Pie from '@/components/i-chart/pie/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    svcWebHomeDataGet,
    SvcWebHomeDataGetResponse,
    svcWebHomeHistoryDataGet
  } from '@/api/svc-web';
  import { getPastDays } from '@/utils';
  import useDateParams from '@/views/statistics/useDateParams';
  import useSetEchartsOthers, { DataSource } from '@/hooks/useSetEchartsOthers';
  import NP from 'number-precision';

  const { user } = useUserStore();
  console.log(user);
  const totalData = ref<SvcWebHomeDataGetResponse>({
    open: {},
    refund: {},
    recharge: {},
    consume: {},
    chart: []
  });
  const cardStatusData = computed(() => {
    const arr: DataSource[] = [];
    totalData.value.chart!.forEach((el: any) =>
      arr.push({ name: String(el.name), value: Number(el.value) })
    );
    const formatData = useSetEchartsOthers(arr, 10);
    return {
      grid: {
        top: '5%',
        left: 0,
        right: 0,
        bottom: '5%'
      },
      legend: {
        orient: 'horizontal',
        bottom: '5',
        formatter(name: string) {
          const item = formatData.find((el: any) => el.name === name);
          return name + '  ' + (item?.value || 0);
        },
        data: formatData
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['25%', '60%'],
          center: ['50%', '40%'],
          label: {
            normal: {
              position: 'inner',
              formatter: (data: any) => {
                const a = data.name;
                const b = data.percent.toFixed(0) + '%';
                return a + ': \n\n' + b;
              }
            }
          },
          data: formatData
        }
      ]
    };
  });
  const search = ref<{
    startDate: string;
    endDate: string;
    dateType: string;
  }>({
    startDate: getPastDays().startDate,
    endDate: getPastDays().endDate,
    dateType: '1'
  });
  // 控制日期条件
  const current_date_type = ref<number>(0);
  const current_date_value = ref<number>(1);
  const pickValue = ref<Array<Date | string | number>>([
    getPastDays().standardStart,
    getPastDays().standardEnd
  ]);
  const mode = computed<any>(() => {
    return { 1: 'date', 2: 'month', 3: 'year' }[current_date_value.value!];
  });
  const handleDateList = (idx: number, v: number) => {
    current_date_type.value = idx;
    current_date_value.value = v;
    pickValue.value = [];
  };
  const onSubmit = () => {
    const [startDate = '', endDate = ''] = useDateParams(
      current_date_value,
      pickValue
    );
    search.value = {
      startDate,
      endDate,
      dateType: String(current_date_value.value!)
    };
    if (!startDate || !endDate) {
      return false;
    }
    getLineData();
  };
  const [getStatistics] = useFuncProxy(async () => {
    totalData.value = await svcWebHomeDataGet({});
  });
  const runAnalysis = ref<any>({});
  const [getLineData] = useFuncProxy(async () => {
    const res = await svcWebHomeHistoryDataGet({
      ...search.value
    });
    const {
      buyY = {},
      rechargeY = {},
      consumeY = {},
      refundY = {},
      returnY = {}
    } = res;
    const series = [
      { name: buyY.name!, data: buyY.value!, type: 'line' },
      { name: rechargeY.name!, data: rechargeY.value!, type: 'line' },
      { name: consumeY.name!, data: consumeY.value!, type: 'line' },
      { name: refundY.name!, data: refundY.value!, type: 'line' },
      { name: returnY.name!, data: returnY.value!, type: 'line' }
    ];
    runAnalysis.value = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        formatter: function (arg: any[]) {
          let str = '';
          let total = 0;
          arg.forEach((el: any) => {
            str += el.seriesName + '：' + el.data + '</br>';
            total = NP.plus(total, Number(el.value));
          });
          const t =
            '日期' + '：' + arg[0].name + '</br>' + '合计：' + total.toFixed(2) + '</br>';
          return t + str;
        }
      },
      legend: {
        data: series.map((x) => x.name),
        right: '1%',
        top: 'center',
        orient: 'vertical',
        itemGap: 20
      },
      grid: {
        top: '15%',
        left: '5%',
        right: '10%',
        bottom: '1%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: res.x!.map((x) => x.showData!),
          axisTick: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '储值卡运营分析（¥）',
          axisLine: {
            show: true
          },
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: series.map((x) => {
        return {
          ...x,
          barWidth: 20,
          tooltip: {
            valueFormatter: function (value: number) {
              return value;
            }
          },
          itemStyle: {
            normal: {
              barBorderRadius: [20, 20, 0, 0]
            }
          }
        };
      })
    };
  });
  onMounted(() => {
    getLineData();
    getStatistics();
  });
</script>

<style scoped lang="less">
  .iconItem {
    width: 66px;
    height: 66px;
    line-height: 66px;
    text-align: center;
    border-radius: 8px;
  }

  .rightItem {
    min-width: 140px;
    margin-left: 12px;
    color: #666;
    font-size: 14px;
    line-height: 22px;

    .textItem {
      color: #0a7bff;
      font-size: 20px;
    }
  }
</style>
