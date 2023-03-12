<template>
  <drawer
    v-model="visible"
    title="订单详情"
    show-log
    class="count-card-order-drawer"
    :log-options="{
      modeId: props.id,
      logUrl: cbdApiProjectSysOptPageOptListPost,
      mode: 'cbd_mis_payment_refund'
    }"
    @cancel="visible = false"
  >
    <div class="i-card" style="width: 100%">
      <div class="card-style">
        <div>无锡T立方年卡</div>
        <div>icon</div>
      </div>
      <a-descriptions
        layout="vertical"
        :column="4"
        :label-style="{ color: '#999999' }"
        :value-style="{ 'color': '#333333', 'padding-bottom': '16px' }"
      >
        <a-descriptions-item label="项目名称">
          {{ info?.projectName }}
        </a-descriptions-item>
        <a-descriptions-item label="支持场馆">
          {{ info?.venueName }}
        </a-descriptions-item>
        <a-descriptions-item label="店铺名称">
          {{ info?.storeName }}
        </a-descriptions-item>
        <a-descriptions-item label="激活状态">
          {{ info?.activeStatusName }}
        </a-descriptions-item>
        <a-descriptions-item label="卡名称">
          {{ info?.cardName }}
        </a-descriptions-item>
        <a-descriptions-item label="产品介绍">
          {{ info?.cardInfo }}
        </a-descriptions-item>
        <a-descriptions-item label="剩余次数">
          {{ info?.surplusNum }}
        </a-descriptions-item>
        <a-descriptions-item label="购买时间">
          {{ info?.purchaseTime }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <div class="i-card" style="width: 100%">
      <h4 class="block-title" style="padding-top: 0">会员信息</h4>
      <a-descriptions
        layout="vertical"
        :column="4"
        :label-style="{ color: '#999999' }"
        :value-style="{ 'color': '#333333', 'padding-bottom': '16px' }"
      >
        <a-descriptions-item label="姓名">
          {{ info?.membersName }}
        </a-descriptions-item>
        <a-descriptions-item label="手机号">
          {{ info?.membersPhone }}
        </a-descriptions-item>
        <a-descriptions-item label="会员号">
          {{ info?.membersCode }}
        </a-descriptions-item>
        <a-descriptions-item label="身份证号">
          {{ info?.idCard }}
        </a-descriptions-item>
      </a-descriptions>
    </div>

    <div class="i-card">
      <i-table :options="contractOptions" :data="contractList">
        <template #header>
          <div class="flex align-center justify-between">
            <div :style="{ fontSize: '16px', color: '#333333' }">合同信息</div>
          </div>
          <a-descriptions
            layout="vertical"
            :column="3"
            :label-style="{ color: '#999999' }"
            :value-style="{ 'color': '#333333', 'padding-bottom': '16px' }"
            style="margin-top: 16px"
          >
            <a-descriptions-item label="有效期">
              {{ info?.expirationMethodName }}
            </a-descriptions-item>
            <a-descriptions-item label="入场时段">
              {{ info?.entrancePeriod }}
            </a-descriptions-item>
            <a-descriptions-item label="合同编号">
              {{ info?.contractCode }}
            </a-descriptions-item>
            <a-descriptions-item label="上架信息">
              {{ info?.groundingInfo }}
            </a-descriptions-item>
            <a-descriptions-item label="销售">
              {{ info?.salesStaffName }}
            </a-descriptions-item>
          </a-descriptions>
          <a-descriptions
            layout="vertical"
            :label-style="{ color: '#999999' }"
            :value-style="{ 'color': '#333333', 'padding-bottom': '16px' }"
          >
            <a-descriptions-item label="卡说明">
              {{ info?.cardRemark }}
            </a-descriptions-item>
          </a-descriptions>
        </template>
      </i-table>
    </div>
    <div class="i-card">
      <i-table :options="useRecordsOptions" :data="useRecordsList">
        <template #header>
          <div class="flex align-center justify-between">
            <div :style="{ fontSize: '16px', color: '#333333' }">使用记录</div>
          </div>
        </template>
      </i-table>
    </div>

    <template #footer>
      <a-button type="primary">重新打印合同</a-button>
      <a-button type="primary" @click="visible = false">返回</a-button>
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, PropType } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { useRequest } from '@har/use';
  import {
    CbdApiProjectMisPaymentRefundPageListGetResponse,
    cbdApiProjectSysOptPageOptListPost
  } from '@/api';
  import {
    groundPcApiCardOrderFrequencyInfoIdGet,
    GroundPcApiCardOrderFrequencyInfoIdGetResponse
  } from '@/api/ground-pc-api';

  type SelectData =
    Required<CbdApiProjectMisPaymentRefundPageListGetResponse>['rows'][0];

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    },
    rowData: {
      type: Object as PropType<SelectData>,
      default: () => {
        return {};
      }
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible = computed({
    get() {
      if (props.modelValue && props.id) {
        getInfo({ id: String(props.id) });
      }
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const info = ref<GroundPcApiCardOrderFrequencyInfoIdGetResponse>();
  // 获取详情
  const { run: getInfo } = useRequest(groundPcApiCardOrderFrequencyInfoIdGet, {
    manual: true,
    onSuccess(data: GroundPcApiCardOrderFrequencyInfoIdGetResponse) {
      console.log(data);
      info.value = data;
    }
  });

  const contractList = computed(() => {
    return info.value?.id ? [info.value] : [];
  });

  const contractOptions = computed(() => {
    return {
      pageShow: false,
      menu: false,
      index: true,
      indexTitle: '序号',
      tableCard: false,
      columns: [
        {
          label: '次数',
          width: 100,
          prop: 'surplusNum'
        },
        {
          label: '标价（元）',
          width: 100,
          prop: 'price'
        },
        {
          label: '售价（元）',
          width: 100,
          prop: 'salePrice'
        },
        {
          label: '赠送次数',
          width: 100,
          prop: 'giveNum'
        },
        {
          label: '合计次数',
          width: 100,
          prop: 'totalNum'
        },
        {
          label: '付款方式',
          width: 100,
          prop: 'payTypeName'
        },
        {
          label: '应付金额（元）',
          width: 100,
          prop: 'meetAmount'
        },
        {
          label: '实付金额（元）',
          width: 100,
          prop: 'payAmount'
        }
      ]
    };
  });
  const useRecordsOptions = computed(() => {
    return {
      pageShow: false,
      menu: false,
      index: true,
      indexTitle: '序号',
      tableCard: false,
      columns: [
        {
          label: '入场时间',
          width: 100,
          prop: 'entranceDate'
        },
        {
          label: '出场时间',
          width: 100,
          prop: 'exitDate'
        },
        {
          label: '时长（小时）',
          width: 50,
          prop: 'duration'
        }
      ]
    };
  });
  type UseRecordsModel =
    Required<GroundPcApiCardOrderFrequencyInfoIdGetResponse>['useRecords'][0] & {
      id: number;
    };
  const useRecordsList = computed((): UseRecordsModel[] => {
    const list: UseRecordsModel[] = [];
    if (info.value?.useRecords) {
      info.value?.useRecords.forEach((item, index) => {
        list.push({ ...item, id: index + 1 });
      });
    }
    return list;
  });
</script>
<style scoped lang="less">
  .count-card-order-drawer {
    .i-card {
      width: 100%;
      .card-style {
        display: inline-block;
        width: 212px;
        height: 100px;
        margin-bottom: 16px;
        padding: 16px;
        border-radius: 4px;
        font-size: 18px;
        font-weight: 700;
        color: #ffffff;
        background-color: orangered;
        display: flex;
        align-items: center;
      }
    }
  }
</style>
