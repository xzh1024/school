<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <a-card :bordered="false">
    <div class="title">{{ dataTitle }}</div>
    <div class="info_ul">
      <div
        v-for="(item,index) in (electricityMeterData as labelItem[])"
        :key="index"
        class="info_li"
      >
        <span>{{ item.label }}</span>
        <div>{{ item.value }}</div>
      </div>
    </div>
    <div class="title flex justify-between">
      <span>费用分摊</span>
      <a-space>
        <a-button type="primary" @click="handleAdd">添加</a-button>
        <a-button type="primary" @click="clearDivide">清空</a-button>
        <a-button @click="onResetCount">重新计算</a-button>
      </a-space>
    </div>
    <a-table
      :data="(electricityTableData as any)"
      :bordered="false"
      :pagination="false"
      style="margin-top: 16px"
    >
      <template #columns>
        <a-table-column
          v-for="(item,index) in (columns as columnItem[])"
          :key="index"
          :align="item.align"
          :title="item.title"
          :width="item.width"
          :data-index="item.dataIndex"
        >
          <template #cell="{ record, rowIndex }">
            <template v-if="item.slotName">
              <template v-if="item.slotName === 'totalCostSlot'">
                <a-input-number
                  v-model="record.totalCost"
                  :style="{ width: '100px' }"
                  placeholder="请输入"
                  class="input-demo"
                  :min="0"
                  @focus="onFocus(record)"
                  @blur="onBlur"
                />
              </template>
              <!-- <template v-if="item.slotName === 'menuSlot'">
                                <a-button type="text" @click="handleEdit(record)">删除</a-button>
                            </template> -->
            </template>
            <template v-else-if="item.formatter">
              <span>{{ item.formatter && item.formatter(record) }}</span>
            </template>
            <template v-else>
              <span v-if="item.dataIndex === '_index'">{{
                record.sum ? record.sum : rowIndex + 1
              }}</span>
              <span v-else>{{ record[item.dataIndex] }}</span>
            </template>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <div class="info_ul bottomCount">
      <div class="info_li">
        <span>已经分摊：</span>
        <div>￥{{ allDivideMoney }}</div>
      </div>
      <div class="info_li">
        <span>未分摊：</span>
        <div>￥{{ unDivideMoney }}</div>
      </div>
    </div>
  </a-card>
  <add-model
    v-model="modelVisible"
    :title="modelTitle"
    :row-id="String(infoData.deviceId)"
    @reset="reset"
  />
</template>
<script lang="ts" setup>
  import { ref, computed, watch, nextTick } from 'vue';
  import AddModel from '../../energyEquipment/__components__/energy-model.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import NP from 'number-precision';
  type labelItem = {
    label?: string;
    value?: string | number;
  };
  type columnItem = {
    title?: string;
    width?: number;
    dataIndex: string;
    slotName?: string;
    align?: undefined;
    formatter?: (record: any) => void;
  };
  const props = defineProps({
    electricityTableData: {
      type: Array,
      default: () => []
    },
    cacheElectricityTableData: {
      type: Array,
      default: () => []
    },
    dataTitle: {
      type: String,
      default: ''
    },
    infoData: {
      type: Object,
      default: () => {}
    },
    electricityMeterData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  });
  const allDivideMoney = computed(() => {
    return props.electricityTableData.reduce((prev: number, item: any) => {
      return NP.plus(prev, Number(item.totalCost || 0));
    }, 0);
  });
  const modelVisible = ref(false);
  const modelTitle = ref('');
  const handleAdd = async () => {
    const res = await props.infoData.verificationFunc();
    if (!res) {
      modelTitle.value = '修改能耗设备';
      modelVisible.value = true;
    }
  };
  function reset() {
    modelVisible.value = false;
    // todo: 刷新当前设备 列表铺位数据
    emits('onReCount', Number(props.infoData.id));
  }
  const clearDivide = () => {
    props.electricityTableData.forEach((item: any) => {
      item.totalCost = 0;
    });
  };
  const emits = defineEmits(['onReCount']);
  const onResetCount = () => {
    // props.electricityTableData.forEach((it: any) => {
    //     let currentObj: any = props.cacheElectricityTableData.find((item: any) => it.storeId === item.storeId)
    //     it.totalCost = currentObj.totalCost;
    // });
    // nextTick(() => {
    //     isSwitch.value = true;
    // })
    emits('onReCount', Number(props.infoData.id));
  };
  const currentDealId = ref('');
  function onFocus(record: any) {
    currentDealId.value = record.storeId;
  }
  function onBlur() {
    if (allDivideMoney.value > props.infoData?.totalMoney && !isSwitch.value) {
      // 手动输入的金额总和超过总金额
      nextTick(() => {
        props.electricityTableData.forEach((item: any) => {
          if (item.storeId == currentDealId.value) {
            item.totalCost = 0;
          }
        });
        Message.warning('分摊金额总数超出当前设备本期总价');
      });
    }
  }
  const isSwitch = ref(false); // 控制数据变化
  watch(
    () => allDivideMoney.value,
    (v) => {
      if (isSwitch.value) {
        // console.log(v, 888);
        // // 手动输入其中一个，其他的就是置为 0
        // props.electricityTableData.forEach((item: any) => {
        //     if (item.storeId != currentDealId.value) {
        //         item.totalCost = 0;
        //     }
        // });
        // isSwitch.value = false;
      }
    },
    { deep: true }
  );
  const unDivideMoney = computed(() => {
    return allDivideMoney.value > props.infoData?.totalMoney
      ? 0
      : NP.minus(props.infoData?.totalMoney, allDivideMoney.value);
  });
  function getTemplatePropsInfoData() {
    return props.infoData;
  }
  defineExpose({ unDivideMoney, isSwitch, getTemplatePropsInfoData });
</script>
<style lang="less" scoped>
  .info_ul {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;

    .info_li {
      width: 25%;
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;

      & > span {
        font-size: 14px;
        font-family: PingFang SC-Medium, PingFang SC;
        color: #999999;
        line-height: 22px;
        margin-bottom: 8px;
      }

      & > div {
        font-size: 14px;
        font-family: PingFang SC-Medium, PingFang SC;
        color: #333333;
        line-height: 22px;
        word-break: break-all;
        padding-right: 10px;
      }
    }
  }

  .bottomCount {
    justify-content: flex-end;
    margin-top: 16px;
    margin-bottom: 0;

    .info_li {
      flex-direction: row;
      width: auto;
      margin-bottom: 0;

      & > span {
        margin-bottom: 0;
      }

      & > div {
        padding-right: 16px;
      }
    }
  }

  .title {
    font-size: 16px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 24px;
    margin-bottom: 16px;
  }
</style>
