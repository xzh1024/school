<template>
  <drawer
    v-model="visible"
    no-padding
    :mask-close="false"
    title="查看能耗录入"
    width="60%"
    @cancel="visible = false"
  >
    <a-tabs
      v-model="active"
      default-active-key="1"
      style="width: 100%; height: 100%"
    >
      <a-tab-pane key="1" title="能耗记录">
        <div class="detail_box">
          <a-card :bordered="false">
            <div class="title">设备信息</div>
            <div class="info_ul">
              <div
                v-for="(item, index) in equipmentInfoData"
                :key="index"
                class="info_li"
              >
                <span>{{ item.label }}</span>
                <div>{{ item.value }}</div>
              </div>
            </div>
          </a-card>
          <a-card :bordered="false">
            <div class="title">设备读数</div>
            <div class="info_ul">
              <div
                v-for="(item, index) in descripData"
                :key="index"
                class="info_li"
              >
                <span>{{ item.label }}</span>
                <div>{{ item.value }}</div>
              </div>
            </div>
          </a-card>
          <a-card :bordered="false">
            <div class="info_ul">
              <div
                v-for="(item, index) in countData"
                :key="index"
                class="info_li margin_top_0"
              >
                <span>{{ item.label }}</span>
                <div>{{ item.value }}</div>
              </div>
            </div>
          </a-card>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" title="账单信息">
        <div class="detail_box">
          <a-card :bordered="false">
            <div class="title"
              >{{ billdDetailData.deviceCode }}
              {{ billdDetailData.deviceName }}</div
            >
            <div class="info_ul">
              <div
                v-for="(item, index) in electricityMeterData"
                :key="index"
                class="info_li"
              >
                <span>{{ item.label }}</span>
                <div>{{ item.value }}</div>
              </div>
            </div>
            <div class="title" style="margin: 24px 0 0 0">费用分摊</div>
            <a-table
              :data="electricityTableData"
              :bordered="true"
              :pagination="false"
              style="margin-top: 16px"
            >
              <template #columns>
                <a-table-column
                  v-for="(item, index) in columns"
                  :key="index"
                  :title="item.title"
                  :width="item.width"
                  :data-index="item.dataIndex"
                >
                  <template #cell="{ record, rowIndex }">
                    <span v-if="item.dataIndex === '_index'">{{
                      record.sum ? record.sum : rowIndex + 1
                    }}</span>
                    <span v-if="item.dataIndex === 'billDate'">{{
                      `${record.billStartDate} -
                    ${record.billEndDate}`
                    }}</span>
                    <span v-else>{{ record[item.dataIndex] }}</span>
                  </template>
                </a-table-column>
              </template>
            </a-table>
            <!-- <div class="info_ul bottomCount">
              <div class="info_li">
                <span>已经分摊：</span>
                <div>￥{{ shareMoney }}</div>
              </div>
              <div class="info_li">
                <span>未分摊：</span>
                <div>￥0.0</div>
              </div>
            </div> -->
          </a-card>
        </div>
      </a-tab-pane>
    </a-tabs>

    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button v-if="detail.status == 1" type="primary" @click="onUpdate"
        >修改</a-button
      >
      <a-button v-if="detail.status == 1" type="primary" @click="handleBill"
        >生成账单</a-button
      >
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import Drawer from '@/components/drawer/drawer.vue';
  import { ref, computed, watch } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectEstateEnergyConsumeRecordInfoIdGet,
    cbdApiProjectEstateEnergyConsumeBillInfoIdGet,
    CbdApiProjectEstateEnergyConsumeBillInfoIdGetResponse as billdDetailType,
    CbdApiProjectEstateEnergyConsumeRecordInfoIdGetResponse as detailDataType
  } from '@/api';
  import {
    deviceTypeList,
    energyBillStatusList,
    rateTypeList
  } from '@/utils/dic';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String],
      default: undefined
    }
  });
  const emits = defineEmits(['update:modelValue', 'update', 'generateBill']);
  const active = ref('1');
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const onUpdate = () => {
    emits('update', { id: props.id });
  };
  const handleBill = () => {
    emits('generateBill', { id: props.id });
  };
  const electricityTableData = ref<any>([]);
  const columns = [
    {
      title: '序号',
      dataIndex: '_index',
      width: 75,
      align: '' as any
    },
    {
      title: '费用期间',
      width: 220,
      dataIndex: 'billDate'
    },
    {
      title: '商户',
      dataIndex: 'merchantName'
    },
    {
      title: '店铺',
      dataIndex: 'storeName'
    },
    {
      title: '铺位号',
      dataIndex: 'estateName'
    },
    {
      title: '分摊金额(元)',
      width: 200,
      dataIndex: 'totalCost'
    }
  ];
  // const shareMoney = computed(() => {
  //   return electricityTableData.value.reduce((prev = 0, item: any) => {
  //     return NP.plus(prev, item.totalCost);
  //   }, 0)
  // })
  const electricityMeterData = computed(() => {
    return [
      {
        label: '账单生成日',
        value: billdDetailData.value.billCreateDate || '--'
      },
      {
        label: '账期',
        value: billdDetailData.value.billTerm || '--'
      },
      {
        label: '设备类型',
        value: billdDetailData.value.deviceType
          ? deviceTypeList.find(
              (item) => item.value == billdDetailData.value.deviceType
            )?.label
          : '--'
      },
      {
        label: '费用项目',
        value: billdDetailData.value.expenseItemName || '--'
      },
      {
        label: '单价',
        value: `${billdDetailData.value.price || 0}元/${
          billdDetailData.value.deviceType == 2 ? 'kwh' : 'm³'
        }`
      },
      {
        label: '税率',
        value: `${
          billdDetailData.value.rateType
            ? rateTypeList.find(
                (item) => item.value == billdDetailData.value.rateType
              )?.label
            : ''
        } ${billdDetailData.value.rateNum || '0'}%`
      },
      {
        label: '上期抄表时间',
        value: billdDetailData.value.previousMeterReadingDate || '--'
      },
      {
        label: '上期读数',
        value: `${billdDetailData.value.previousReadOutNum || 0}${
          billdDetailData.value.deviceType == 2 ? 'kwh' : 'm³'
        }`
      },
      {
        label: '上期单价',
        value: `${billdDetailData.value.previousPrice || 0}元/${
          billdDetailData.value.deviceType == 2 ? 'kwh' : 'm³'
        }`
      },
      {
        label: '上期总价',
        value: `￥${billdDetailData.value.previousCost || 0}`
      },
      {
        label: '本期抄表时间',
        value: billdDetailData.value.currentMeterReadingDate || '--'
      },
      {
        label: '本期读数',
        value: `${billdDetailData.value.currentReadOutNum || 0}${
          billdDetailData.value.deviceType == 2 ? 'kwh' : 'm³'
        }`
      },
      {
        label: '本期单价',
        value: `${billdDetailData.value.currentPrice || 0}元/${
          billdDetailData.value.deviceType == 2 ? 'kwh' : 'm³'
        }`
      },
      {
        label: '本期总价',
        value: `￥${billdDetailData.value.currentCost || 0}`
      }
    ];
  });
  const equipmentInfoData = computed(() => {
    return [
      {
        label: '项目名称',
        value: detail.value.projectName || '--'
      },
      {
        label: '楼宇',
        value: detail.value.buildingName || '--'
      },
      {
        label: '楼层',
        value: detail.value.buildingFloorName || '--'
      },
      {
        label: '设备类型',
        value: deviceTypeList.find(
          (item) => item.value == detail.value.deviceType
        )?.label
      },
      {
        label: '设备编码和名称',
        value: `${detail.value.deviceName || '--'}(${
          detail.value.deviceCode || '--'
        })`
      },
      {
        label: '状态',
        value: energyBillStatusList.find(
          (item) => item.value == detail.value.status
        )?.label
      }
    ];
  });
  const priceUnit = computed(() => {
    return detail.value.deviceType == 2 ? 'kwh' : 'm³';
  });
  const descripData = computed(() => {
    return [
      {
        label: '上期抄表时间',
        value: detail.value.previousMeterReadingDate || '--'
      },
      {
        label: '上期读数',
        value: `${detail.value.previousReadOutNum || 0}${priceUnit.value}`
      },
      {
        label: '上期单价',
        value: `${detail.value.previousPrice || 0}元/${priceUnit.value}`
      },
      {
        label: '本期抄表时间',
        value: detail.value.currentMeterReadingDate || '--'
      },
      {
        label: '本期读数',
        value: `${detail.value.currentReadOutNum || 0}${priceUnit.value}`
      },
      {
        label: '本期单价',
        value: `${detail.value.currentPrice || 0}元/${priceUnit.value}`
      }
    ];
  });
  const countData = computed(() => {
    return [
      {
        label: '本期时间范围',
        value: `${detail.value.currentStartDate || ''} - ${
          detail.value.currentEndDate || ''
        }`
      },
      {
        label: '本期用量',
        value: `${detail.value.currentEnergyConsumptionNum || 0}${
          priceUnit.value
        }`
      },
      {
        label: '本期费用',
        value: `￥${detail.value.currentCost || 0}`
      }
    ];
  });
  const detail = ref<detailDataType>({} as detailDataType);
  const [initDetailInfo] = useFuncProxy(async () => {
    const res = await cbdApiProjectEstateEnergyConsumeRecordInfoIdGet({
      id: String(props.id)
    });
    detail.value = { ...res };
    if (res.status == 2) {
      getBillDetail(res.billId);
    } else {
      billdDetailData.value = {} as any;
      electricityTableData.value = [];
    }
  });
  const billdDetailData = ref<billdDetailType>({} as billdDetailType);
  const [getBillDetail] = useFuncProxy(async (id: string) => {
    const res = await cbdApiProjectEstateEnergyConsumeBillInfoIdGet({ id });
    billdDetailData.value = { ...res };
    electricityTableData.value = res.storeList;
  });
  watch(
    () => props.modelValue,
    (v) => {
      if (v && props.id) {
        initDetailInfo();
      }
    }
  );
  watch(
    () => props.refresh,
    (v) => {
      if (v && props.id) {
        initDetailInfo();
      }
    }
  );
</script>
<style scoped lang="less">
  :deep(.arco-tabs-pane) {
    max-height: 80.5vh;
    overflow-x: hidden;
    overflow-y: auto;
  }

  :deep(.arco-card-actions) {
    margin-top: 0;
  }

  :deep(.arco-tabs-nav-tab) {
    background-color: #fff;
  }

  :deep(.arco-tabs-content) {
    padding: 16px;
  }

  :deep(.arco-tabs-nav-tab-list) {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .detail_box {
    width: 100%;
    height: 100%;
    overflow: auto;

    .info_ul {
      display: flex;
      flex-wrap: wrap;

      .info_li {
        width: 25%;
        display: flex;
        flex-direction: column;
        margin-top: 16px;

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

      .margin_top_0 {
        margin-top: 0;
      }
    }

    .bottomCount {
      justify-content: flex-end;

      .info_li {
        flex-direction: row;
        width: auto;

        & > span {
          margin-bottom: 0;
        }

        & > div {
          padding-right: 16px;
        }
      }
    }

    .codeBox {
      display: flex;
      flex-direction: column;
      width: 120px;
    }

    .title {
      font-size: 16px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 24px;
    }
  }
</style>
