<template>
  <div
    :id="pieChart"
    class="pie-box"
    :style="{ width: width, height: height }"
  ></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { ref, onMounted, Ref, watch } from 'vue';
  import type { EChartsOption } from 'echarts';
  // import useSetEchartsOthers from '@/hooks/useSetEchartsOthers';
  import resize from '@/utils/resize';
  const props = defineProps({
    options: {
      type: Object,
      default: () => {
        return {
          hasLegend: false,
          data: []
        };
      }
    },
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    }
  });
  const pieChart: Ref = ref(`pieChart${Date.now()}${Math.random()}`);
  function initPieChart(options: EChartsOption) {
    const chart = echarts.init(
      document.getElementById(pieChart.value) as HTMLElement
    );
    // const formatData = useSetEchartsOthers(params.data, params.maxNumber);
    chart.setOption(options);
    resize.add(chart);
  }

  onMounted(() => {
    initPieChart(props.options);
  });
  watch(
    () => props.options,
    () => {
      initPieChart(props.options);
    },
    { deep: true }
  );
</script>
<style scoped lang="less">
  .pie-box {
    //width: 100%;
    //height: 100%;
  }
</style>
