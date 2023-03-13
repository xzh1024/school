<template>
  <div :id="multiLine" class="chart-box"></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { ref, onMounted, Ref, watch, PropType } from 'vue';
  import type { EChartsOption } from 'echarts';
  import resize from '@/utils/resize';
  const props = defineProps({
    options: {
      type: Object as PropType<EChartsOption>,
      default: () => {
        return {};
      }
    }
  });
  const multiLine: Ref = ref(`multiLine${Date.now()}${Math.random()}`);
  function initChart(options: EChartsOption) {
    const chart = echarts.init(
      document.getElementById(multiLine.value) as HTMLElement
    );
    chart.setOption(options);
    resize.add(chart);
  }

  onMounted(() => {
    initChart(props.options);
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
