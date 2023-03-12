<template>
  <div :id="barChart" class="pie-box"></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { ref, onMounted, Ref, watch, PropType } from 'vue';
  import type { BarType } from '@/components/bar-chart/bar-type';
  import Np from 'number-precision';
  import resize from '@/utils/resize';

  const props = defineProps({
    data: {
      type: Object as PropType<BarType>,
      default: () => {
        return {
          xData: [],
          y1Data: [],
          y2Data: []
        };
      }
    }
  });
  const barChart: Ref = ref(`barChart${Date.now()}${Math.random()}`);
  function initChart(data: BarType) {
    const chart = echarts.init(
      document.getElementById(barChart.value) as HTMLElement
    );
    let y1Total = 0;
    if (data.y1Data && data.y1Data.length) {
      y1Total = (data.y1Data || []).reduce((t: number, num: number) => {
        return Np.plus(t, num);
      });
    }
    let y2Total = 0;
    if (data.y2Data && data.y2Data.length) {
      y2Total = data.y2Data.reduce((total: number, num: number) => {
        return Np.plus(total, num);
      });
    }

    const options = {
      grid: {
        left: '5%',
        bottom: '8%',
        right: '5%'
      },
      title: [
        {
          text: `销售总金额（¥）：${y1Total}`,
          textStyle: {
            color: '#666',
            fontSize: 14,
            fontWeight: 'normal'
          },
          left: '35%'
        },
        {
          text: `销售总单数：${y2Total}`,
          textStyle: {
            color: '#666',
            fontSize: 14,
            fontWeight: 'normal'
          },
          left: '65%'
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      xAxis: [
        {
          type: 'category',
          data: data.xData,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '销售金额(元)',
          min: 0,
          axisLabel: {
            formatter: '{value}'
          },
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
          }
        },
        {
          type: 'value',
          name: '销售单数(单)',
          min: 0,
          axisLine: {
            show: true
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: [
        {
          name: `销售金额(¥)`,
          type: 'bar',
          tooltip: {
            valueFormatter: function (value: any) {
              return value + '元';
            }
          },
          showBackground: true,
          itemStyle: {
            normal: {
              barBorderRadius: [20, 20, 0, 0]
            }
          },
          data: data.y1Data
        },
        {
          name: '销售单数(单)',
          type: 'line',
          yAxisIndex: 1,
          showBackground: true,
          tooltip: {
            valueFormatter: function (value: any) {
              return value + ' 单';
            }
          },
          data: data.y2Data
        }
      ]
    };
    chart.setOption(options);
    resize.add(chart);
  }

  onMounted(() => {
    initChart(props.data as BarType);
  });
  watch(
    () => props.data,
    () => {
      console.log(props.data);
      initChart(props.data as BarType);
    },
    { deep: true }
  );
</script>
<style scoped lang="less">
  .pie-box {
    width: 100%;
    height: 100%;
  }
</style>
