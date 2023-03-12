<template>
  <div class="container">
    <div>
      <div class="container-echarts">
        <div class="echarts-left">
          <div
            v-if="pieForData && pieForData.length"
            :id="pieId"
            class="echarts"
            style="width: 250px; height: 250px"
          >
          </div>
          <div v-if="pieForData && pieForData.length" class="echarts-left-box">
            <p class="echarts-left-title">实缴总金额(¥)</p>
            <p class="echarts-left-money">{{ actualPaymentMoney }}</p>
            <div
              v-for="(item, index) in pieForData"
              :key="index"
              class="left-box"
            >
              <p class="left-box-title">{{ item.typeName }}(¥)</p>
              <p class="left-box-money">{{ item.amountReceived }}</p>
            </div>
          </div>
        </div>
        <div class="echarts-right">
          <div
            v-if="chargeTypeLength > 2"
            :id="raderId"
            class="echarts"
            style="width: 400px; height: 250px"
          >
          </div>
        </div>
      </div>
    </div>
    <a-divider orientation="left" class="divider-title">缴费汇总 </a-divider>
    <a-table
      class="arco-table-assets"
      :columns="paymentSummaryTableColumns"
      :data="paymentSummaryData"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AssetsCondition'
  };
</script>

<script lang="ts" setup>
  import { ref, Ref, computed, watch, onMounted, nextTick } from 'vue';
  import {
    cbdApiProjectAssetBusinessConditionChartEstateIdGet,
    cbdApiProjectAssetBusinessConditionPaymentEstateIdGet,
    type CbdApiProjectAssetBusinessConditionChartEstateIdGetResponse,
    type CbdApiProjectAssetBusinessConditionPaymentEstateIdGetResponse
  } from '@/api';
  import * as echarts from 'echarts';

  type PieDataType = { name: string; value: number };
  type PieDataRaw = Required<
    Required<CbdApiProjectAssetBusinessConditionChartEstateIdGetResponse>['pieChart']
  >['pieChartDataList'][0];
  type RadarDataRaw = Required<
    Required<CbdApiProjectAssetBusinessConditionChartEstateIdGetResponse>['radarChart']
  >['radarChartDataList'][0];
  type EstateItem =
    Required<CbdApiProjectAssetBusinessConditionPaymentEstateIdGetResponse>[0];
  interface Props {
    estateId: number | null;
  }

  const props = withDefaults(defineProps<Props>(), {
    estateId: null
  });

  const estateId = computed(() => {
    return props.estateId;
  });

  onMounted(() => {
    handleEchartsGetInfo();
  });

  const chargeTypeLength = ref<number>(0);
  const pieId: Ref<string> = ref(`pie${Date.now()}${Math.random()}`);
  const actualPaymentMoney: Ref<number | undefined> = ref();
  const raderId: Ref<string> = ref(`radar${Date.now()}${Math.random()}`);
  const pieData = ref<PieDataType[]>([]);
  const pieForData = ref<Array<PieDataRaw>>([]);
  const radarDataPaidIn: Ref<{ name: string; max: number }[]> = ref([]);
  const radarDataAmount = ref<Array<number>>([]);
  const radarDataPaidAmount = ref<Array<number>>([]);
  const paymentSummaryTableColumns: Array<{
    dataIndex: string;
    title: string;
  }> = [
    {
      title: '资金类型',
      dataIndex: 'typeName'
    },
    {
      title: '应缴金额(¥)',
      dataIndex: 'actualAmount'
    },
    {
      title: '实缴金额(¥)',
      dataIndex: 'amountReceived'
    },
    // {
    //   title: '滞纳金(¥)',
    //   dataIndex: 'lateFeeAmount'
    // },
    {
      title: '总欠费(¥)',
      dataIndex: 'lastAmount'
    },
    {
      title: '欠费时长(天)',
      dataIndex: 'arrearsDay'
    }
  ];
  const paymentSummaryData = ref<Array<EstateItem>>([]);

  // echarts饼状图表数据
  const handlePieEchartsView = () => {
    const pieEchart = echarts.init(
      document.getElementById(pieId.value) as HTMLElement
    );
    // 饼图百分比数据
    pieEchart.setOption({
      color: ['#BACFFF', '#8BAEFF', '#457DFF', '#165DFF'],
      tooltip: {
        trigger: 'item'
      },
      series:
        pieData.value && pieData.value.length
          ? [
              {
                type: 'pie',
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                labelLine: {
                  show: false
                },
                label: {
                  show: false,
                  position: 'center',
                  fontSize: '20',
                  formatter: '{b}\n{d}%',
                  normal: {
                    show: true,
                    position: 'inner', // 数值显示在内部
                    formatter: '{d}%' // 格式化数值百分比输出
                  }
                },
                emphasis: {
                  label: {
                    show: false
                  }
                },
                data: pieData.value.filter((el: PieDataType) => el.value > 0)
              }
            ]
          : []
    });
  };
  // echarts雷达图
  const handleRadarEchartsView = () => {
    const raderEchart = echarts.init(
      document.getElementById(raderId.value) as HTMLElement
    );
    // 雷达图数据
    raderEchart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      radar: [
        {
          indicator: radarDataPaidIn.value, // 配置各个维度的最大值
          shape: 'polygon', // 配置雷达图最外层的图形 circle polygon
          radius: 80,
          triggerEvent: true
        }
      ],
      series: [
        {
          // symbol: 'none', // 去掉圆点
          type: 'radar', // radar 此图表时一个雷达图
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(40, 44, 52,0.8)', // 设置背景图片 rgba格式
            color: '#fff',
            borderWidth: '1', // 边框宽度设置1
            borderColor: 'gray', // 设置边框颜色
            textStyle: {
              color: '#fff' // 设置文字颜色
            }
          },
          label: {
            // 设置标签的样式
            show: false // 显示数值
          },
          areaStyle: {}, // 将每一个产品的雷达图形成阴影的面积
          data: [
            {
              name: '实缴金额(¥)',
              value: radarDataPaidAmount.value
            },
            {
              name: '应缴金额(¥)',
              value: radarDataAmount.value
            }
          ]
        }
      ]
    });
  };

  /**
   * @param
   * handleEchartsGetInfo 获取图表详情
   */
  const handleEchartsGetInfo = async () => {
    /**
     * @param pieChart 饼状图数据
     * @param radarChart 雷达图数据
     */
    const pie = await cbdApiProjectAssetBusinessConditionChartEstateIdGet({
      estateId: String(estateId.value)
    });
    pieForData.value = pie.pieChart?.pieChartDataList || [];

    /**
     * @param 饼状图数据 pieChart
     */
    pie.pieChart?.pieChartDataList?.forEach((item: PieDataRaw) => {
      pieData.value.push({
        name: item.typeName!,
        value: item.amountReceived!
      });
    });
    /**
     * @param 雷达图数据 radarChart
     */
    chargeTypeLength.value = pie.radarChart?.radarChartDataList?.length || 0;
    let total = 0;
    pie.radarChart?.radarChartDataList?.forEach((item: RadarDataRaw) => {
      total += item.actualAmount!;
    });
    pie.radarChart?.radarChartDataList?.forEach((item: RadarDataRaw) => {
      radarDataPaidIn.value.push({ name: item.typeName!, max: total });
      // 应缴金额
      radarDataAmount.value.push(item.actualAmount!);
      // 实缴金额
      radarDataPaidAmount.value.push(item.amountReceived!);
    });
    if (pieForData.value.length > 0) {
      await nextTick(() => {
        handlePieEchartsView();
        handleRadarEchartsView();
      });
    }
    /**
     * @param 缴费汇总
     */
    const res = await cbdApiProjectAssetBusinessConditionPaymentEstateIdGet({
      estateId: String(estateId.value)
    });
    let actualPayment = 0;
    res.forEach((item: EstateItem) => {
      actualPayment += item.amountReceived!;
    });
    actualPaymentMoney.value = actualPayment;
    paymentSummaryData.value = res;

    watch(estateId, () => {
      if (estateId.value) {
        handleEchartsGetInfo();
        handleRadarEchartsView();
      }
    });
  };
</script>

<style scoped lang="less">
  @import './assetsCondition.less';
</style>
