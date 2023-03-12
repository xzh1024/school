<template>
  <div ref="barRef" class="bar-box"></div>
</template>

<script setup lang="ts">
  import * as charts from 'echarts';
  import { ref, Ref, nextTick } from 'vue';
  defineProps({
    options: {
      type: Object,
      default: () => {}
    }
  });
  type OptionType = {
    dates: string[];
    handlingNums: number[];
    acceptNums: number[];
    rejectNums: number[];
  };
  const barRef: Ref<HTMLDivElement | null> = ref(null);
  function initBarChart(opts: OptionType) {
    if (!barRef.value) return;
    const chart = charts.init(barRef.value);
    const options = {
      grid: {
        top: '10%',
        bottom: '10%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        // left: '5%',
        // bottom: '5'
      },
      xAxis: {
        type: 'category',
        data: opts.dates,
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLine: {
          show: true
        }
      },
      series: [
        {
          name: '维修中',
          type: 'bar',
          itemStyle: { color: '#00BB10' },
          data: opts.handlingNums
        },
        {
          name: '已通过',
          type: 'bar',
          itemStyle: { color: '#98CE54' },
          data: opts.acceptNums
        },
        {
          name: '未通过',
          type: 'bar',
          itemStyle: { color: '#FF4577' },
          data: opts.rejectNums
        }
      ]
    };
    chart.setOption(options);
    // window.addEventListener('resize', () => {
    //   chart.resize();
    // });
  }

  defineExpose({
    setOptions: (options: OptionType) => {
      nextTick(() => {
        initBarChart(options);
      });
    }
  });
</script>

<style scoped lang="less">
  .bar-box {
    width: 100%;
    height: 100%;
  }
</style>
