<template>
  <drawer v-model="visible" :title="title" :footer="false" @close="onClose">
    <div class="white-detail-box">
      <a-button type="primary" class="print-btn" @click="handlePrint">
        打印
      </a-button>
      <i-loading :loading="loading" />
      <!--startprint-->
      <div ref="printEl" class="print-box">
        <h1 class="tooltip-title">催缴单</h1>
        <div class="border">
          <div class="padded">
            <h3>基本信息</h3>
            <a-row>
              <template v-for="item in baseInfo" :key="item.label">
                <a-col :span="8">
                  <span>{{ item.label }}：</span>
                  <span>{{ item.value }}</span>
                </a-col>
              </template>
            </a-row>
          </div>
          <div class="border-top padded">
            <h3>费用明细</h3>
            <i-table :options="merchantTable" :data="formData.details">
              <template #billCycleStartDateCell="{ record }">
                <div v-if="record.billCycleStartDate">
                  {{
                    `${record.billCycleStartDate}~${record.billCycleEndDate}`
                  }}
                </div>
              </template>
            </i-table>
          </div>
          <div class="border-top padded" style="min-height: 180px">
            <h3>温馨提示</h3>
            <div>{{ formData.tips }}</div>
          </div>
          <div class="border-top padded flex" style="height: 180px">
            <div class="flex-1">店铺签收</div>
            <div class="flex-1">签收人员</div>
          </div>
        </div>
      </div>
      <!--endprint-->
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, onMounted, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import ITable from '@/components/i-table/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { cbdApiProjectTenementReceivableBillInfoIdGet } from '@/api';
  import type { CbdApiProjectTenementReceivableBillInfoIdGetResponse } from '@/api';
  import { getHtml2Pdf, toPrint } from '@/utils/print';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    rowId: {
      type: String,
      required: true
    }
  });
  const emits = defineEmits(['update:modelValue', 'reset', 'close']);

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const formData = ref<CbdApiProjectTenementReceivableBillInfoIdGetResponse>({
    id: 0,
    code: '',
    merchantName: '',
    storeNames: '',
    estateNames: '',
    contractCode: '',
    delayingAmount: 0,
    amountUnreceived: 0,
    maker: '',
    tips: '',
    totalActualAmount: 0,
    details: []
  });

  const baseInfo = computed(() => {
    return [
      { label: '商户名称', value: formData.value.merchantName },
      { label: '店铺名称', value: formData.value.storeNames },
      { label: '合同号', value: formData.value.contractCode },
      // { label: '品牌', value: formData.value.merchantName },
      { label: '承租铺位号', value: formData.value.estateNames },
      { label: '滞纳金金额', value: formData.value.delayingAmount },
      { label: '欠缴金额', value: formData.value.amountUnreceived },
      { label: '制单人员', value: formData.value.maker }
    ];
  });

  const merchantTable = ref({
    tableCard: false,
    menu: false,
    pageShow: false,
    menuOtherOptions: {
      'rowKey': 'id',
      'summary': true,
      'summary-text': '合计'
    },
    columns: [
      {
        label: '费用项目',
        prop: 'typeName'
      },
      {
        label: '账期',
        prop: 'billCycleStartDate'
      },
      {
        label: '账单金额',
        prop: 'actualAmount'
      },
      {
        label: '欠缴金额',
        prop: 'amountUnreceived'
      }
    ]
  });

  const printEl: Ref<HTMLElement | undefined> = ref();
  async function handlePrint() {
    if (printEl.value) {
      const canvas = await getHtml2Pdf(printEl.value);
      toPrint(canvas as any);
    }
  }

  const [getPrintDetail, loading] = useFuncProxy(async () => {
    const res = await cbdApiProjectTenementReceivableBillInfoIdGet({
      id: props.rowId
    });
    formData.value = res;
  });

  function onClose() {
    emits('close');
  }

  watch(
    () => props.rowId,
    () => {
      if (props.rowId) {
        getPrintDetail();
      }
    }
  );

  onMounted(() => {
    // getIndustryList();
    // getAssetsSelectList();
  });
</script>

<style scoped lang="less">
  .print-btn {
    position: absolute;
    right: 85px;
    top: 40px;
  }
  .print-box {
    width: 794px;
    margin: 0 auto;
  }
  .border {
    border: 1px solid var(--color-fill-3);
  }

  .border-top {
    border-top: 1px solid var(--color-fill-3);
  }

  .padded {
    padding: 15px;
  }

  h1 {
    text-align: center;
    font-weight: 600;
  }

  h3 {
    margin: 0 0 15px;
    font-weight: 600;
  }
</style>
