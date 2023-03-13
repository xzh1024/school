<template>
  <div class="bg-white">
    <i-form
      v-model="form"
      :options="formOptions"
      @submit="submit"
      @reset="reset"
    >
      <template #submitIcon>
        <slot name="submitIcon">
          <icon-search />
        </slot>
      </template>
    </i-form>

    <!--  -->
    <div class="flex nav-box">
      <div
        v-for="item in navData"
        :key="item.label"
        class="flex-1 flex nav-item"
      >
        <div class="nav-item-icon" :style="{ background: item.color }">
          <icon-bookmark />
        </div>
        <div class="nav-item-info">
          <span>
            {{ item.unit }}{{ item.value }}{{ item.unit ? '' : '单' }}
          </span>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>

    <div style="width: 100%; height: 450px">
      <bar ref="barChart" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';
  import { reactive, computed, ref, onMounted } from 'vue';
  import Bar from './__components__/bar.vue';
  import {
    cbdApiProjectCommonUserSelectListGet,
    cbdApiProjectWorkOrderStatisticsGet
  } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import useDictData from '@/hooks/useDictData';

  const [configDic] = useDictData('00012');

  const formOptions = computed(() => {
    return {
      submitText: '搜索',
      menuSpan: 24,
      columns: [
        {
          label: '时间',
          prop: 'date',
          type: 'dateRange',
          on: {
            change(v: string[]) {
              form.reportTimeStart = v ? v[0] : '';
              form.reportTimeEnd = v ? v[0] : '';
            }
          }
        },
        {
          label: '报修人：',
          prop: 'reporter',
          type: 'select',
          dic: userList.value
        },
        {
          label: '故障类型：',
          prop: 'faultTypeId',
          type: 'select',
          dic: configDic
        },
        {
          label: '维修人：',
          prop: 'handler',
          type: 'select',
          dic: userList.value
        }
      ]
    };
  });
  const currentDay = dayjs().format('YYYY-MM-DD');
  const subtractDay = dayjs(dayjs().subtract(7, 'd')).format('YYYY-MM-DD');
  const form = reactive({
    date: [subtractDay, currentDay],
    reportTimeStart: subtractDay,
    reportTimeEnd: currentDay,
    reporter: '',
    faultTypeId: '',
    handler: ''
  });

  function submit(data: any) {
    form.date = data.values.date;
    form.reportTimeStart = data.values.date ? data.values.date[0] : '';
    form.reportTimeEnd = data.values.date ? data.values.date[1] : '';
    form.reporter = data.values.reporter;
    form.faultTypeId = data.values.faultTypeId;
    form.handler = data.values.handler;
    getStatisticsData();
  }
  function reset(done: (bool: boolean) => void) {
    form.date = [subtractDay, currentDay];
    form.reportTimeStart = subtractDay;
    form.reportTimeEnd = currentDay;
    done(true);
    getStatisticsData();
  }

  const formData = reactive({
    totalWorkOrderNum: 0,
    totalHandlingNum: 0,
    totalAcceptNum: 0,
    totalRejectNum: 0,
    totalExpense: 0
  });

  const navData = computed(() => {
    return [
      {
        label: '总维修单数',
        value: formData.totalWorkOrderNum,
        color: '#167BAF'
      },
      { label: '维修中', value: formData.totalHandlingNum, color: '#00BB10' },
      { label: '已通过', value: formData.totalAcceptNum, color: '#98CE54' },
      { label: '未通过', value: formData.totalRejectNum, color: '#FF4577' },
      {
        label: '收费金额',
        value: formData.totalExpense,
        color: '#FFA300',
        unit: '￥'
      }
    ];
  });

  type UserItemType = {
    label?: string;
    value?: number;
  };
  const userList = ref<UserItemType[]>([]);
  const [getUserList] = useFuncProxy(async () => {
    const res = await cbdApiProjectCommonUserSelectListGet({});
    userList.value = res;
  });

  const barChart = ref();
  const [getStatisticsData] = useFuncProxy(async () => {
    const res = await cbdApiProjectWorkOrderStatisticsGet({
      ...form
    });
    formData.totalWorkOrderNum = res.totalWorkOrderNum;
    formData.totalHandlingNum = res.totalHandlingNum;
    formData.totalAcceptNum = res.totalAcceptNum;
    formData.totalRejectNum = res.totalRejectNum;
    formData.totalExpense = res.totalExpense || 0;

    if (barChart.value) {
      barChart.value.setOptions(res.statistics);
    }
  });

  onMounted(() => {
    getUserList();
    getStatisticsData();
  });
</script>

<style scoped lang="less">
  .nav-box {
    margin: 25px;
  }
  .nav-item {
    border-radius: 15px 0px 0px 15px;
    overflow: hidden;

    &:not(:first-child) {
      margin-left: 25px;
    }
  }
  .nav-item-icon {
    width: 45px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 24px;
  }

  .nav-item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: #f2f4f5;
  }

  .bg-white {
    min-height: 100%;
    background-color: #fff;
  }
</style>
