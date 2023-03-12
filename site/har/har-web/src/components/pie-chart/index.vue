<template>
  <div :id="pieChart" class="pie-box"></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { ref, onMounted, Ref, watch } from 'vue';
  interface dataType {
    name: string;
    value: number;
  }
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  });
  const pieChart: Ref = ref(`pieChart${Date.now()}${Math.random()}`);
  function initPieChart(data: dataType[]) {
    const myChart = echarts.init(
      document.getElementById(pieChart.value) as HTMLElement
    );
    let totalNum = 0;
    (data || []).forEach((el: dataType) => {
      totalNum += el.value;
    });
    const options = {
      grid: {
        left: '1%',
        y: '1%'
      },
      title: {
        text: `参与总人数 ${totalNum} 人`,
        right: '5%',
        top: '5%',
        textStyle: {
          fontSize: 14
        }
      },
      legend: {
        orient: 'vertical',
        right: '5%',
        top: 'center',
        formatter(name: string) {
          const item = data.find((el: dataType) => el.name === name);
          return name + '  ' + (item?.value || 0);
        }
      },
      series: [
        {
          name: '参与总人数',
          type: 'pie',
          radius: ['25%', '80%'],
          center: ['30%', '50%'],
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              position: 'inner',
              formatter: '{d}%'
            }
          },
          data: data
        }
      ]
    };
    myChart.setOption(options);
  }
  onMounted(() => {
    initPieChart(props.data as dataType[]);
  });
  watch(
    () => props.data,
    () => {
      initPieChart(props.data as dataType[]);
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
