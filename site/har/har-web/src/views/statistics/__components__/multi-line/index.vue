<template>
  <div :id="multiLine" class="chart-box"></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { ref, onMounted, Ref, watch, PropType } from 'vue';
  import type { MultiLineType } from './multi-line';
  import resize from '@/utils/resize';
  const props = defineProps({
    options: {
      type: Object as PropType<MultiLineType>,
      default: () => {
        return {
          xData: [],
          series: []
        };
      }
    }
  });
  const multiLine: Ref = ref(`multiLine${Date.now()}${Math.random()}`);
  function initChart(data: MultiLineType) {
    const chart = echarts.init(
      document.getElementById(multiLine.value) as HTMLElement
    );
    chart.setOption({
      title: [
        {
          text: `销售总金额（¥）：${data.total1}`,
          textStyle: {
            color: '#666',
            fontSize: 14,
            fontWeight: 'normal'
          },
          left: '25%'
        },
        {
          text: `销售总单数：${data.total2}`,
          textStyle: {
            color: '#666',
            fontSize: 14,
            fontWeight: 'normal'
          },
          left: '55%'
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: data.series.map((x) => x.name),
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
          data: props.options.xData,
          axisTick: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '销售金额(元)',
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
          axisLine: {
            show: true
          },
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: data.series.map((x) => {
        return {
          ...x,
          barWidth: 20,
          tooltip: {
            valueFormatter: function (value: number) {
              return value + (x.type! === 'bar' ? '元' : '单');
            }
          },
          // 决定该series是哪个y轴
          yAxisIndex: x.type! === 'bar' ? 0 : 1,
          itemStyle: {
            normal: {
              barBorderRadius: [20, 20, 0, 0]
            }
          }
        };
      })
    });
    resize.add(chart);
  }

  onMounted(() => {
    if (props.options.xData?.length) {
      initChart(props.options);
    }
  });
  watch(
    () => props.options,
    () => {
      initChart(props.options);
    },
    { deep: true }
  );
</script>
<style scoped lang="less">
  .chart-box {
    width: 100%;
    height: 100%;
  }
</style>
