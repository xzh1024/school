<template>
  <div class="paymentRecords">
    <a-form ref="searchFormRef" :model="searchForm" auto-label-width>
      <a-row>
        <a-col :span="6">
          <a-form-item field="contractCode" label="合同编号:">
            <a-input
              v-model="searchForm.contractCode"
              placeholder="请输入合同编号搜索"
            />
          </a-form-item>
        </a-col>
        <a-col :span="5" :offset="13">
          <a-space>
            <a-button type="primary" @click="handleSearch">
              <template #icon>
                <icon-search />
              </template>
              搜索
            </a-button>
            <a-button @click="handleReset($refs.searchFormRef)">
              <template #icon>
                <icon-sync />
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>
    <div>
      <template v-if="resMarin && Object.keys(resMarin).length">
        <a-tabs>
          <a-tab-pane key="1" :title="`保证金：¥ ${earnestMoney}`">
            <a-table
              v-if="earnestTableData && earnestTableData.length"
              :columns="earnestColumns"
              :data="earnestTableData"
              :loading="earnestTableLoading"
            >
              <template #id="{ rowIndex }">
                <span>{{ rowIndex + 1 }}</span>
              </template>
              <template #billLastRepaymentDate="{ record }"
                >{{ record.billLastRepaymentDate || '--' }}
              </template>
              <template #operation="{ record }">
                <a-button
                  type="text"
                  @click="handleViewReceipt(record.receiptId)"
                  >查看收款单</a-button
                >
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </template>
      <template v-if="otherTableData && otherTableData.length">
        <a-tabs :default-active-key="0">
          <a-tab-pane
            v-for="(item, index) in otherTableData"
            :key="index"
            :title="`${item.typeName}： ¥ ${item.actualAmount}`"
          >
            <a-table
              :columns="otherColumns"
              :data="item.receiptList"
              :loading="otherTableLoading"
            >
              <template #id="{ rowIndex }">
                <span>{{ rowIndex + 1 }}</span>
              </template>
              <template #operation="{ record }">
                <a-button
                  type="text"
                  @click="handleViewReceipt(record.receiptId)"
                  >查看收款单</a-button
                >
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </template>
      <drawer v-model="receiptInfoMotal" title="查看收款单" :footer="false">
        <receipt-info :id="receiptInfoId" />
      </drawer>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'PaymentRecords'
  };
</script>

<script lang="ts" setup>
  import { ref, Ref, reactive, computed, onMounted } from 'vue';
  import { cbdApiProjectAssetPaymentRecordGet } from '@/api';
  import type { CbdApiProjectAssetPaymentRecordGetResponse } from '@/api';
  import Drawer from '@/components/drawer/drawer.vue';
  import ReceiptInfo from '../../revenue-expenditure/__components__/receipt/receipt-info.vue';

  interface Props {
    estateId: number | null;
  }
  type FeeType =
    Required<CbdApiProjectAssetPaymentRecordGetResponse>['feeList'][0];
  const props = withDefaults(defineProps<Props>(), {
    estateId: null
  });

  const estateId = computed(() => {
    return props.estateId;
  });

  onMounted(() => {
    handleGetTableDataAll();
  });

  const resMarin = ref();
  const resFeeList = ref();
  const receiptInfoMotal = ref(false);
  const receiptInfoId = ref<number>();
  const earnestTableData = ref<Array<TableDataType>>([]);

  interface TableDataType {
    receiptId?: number;
    contractCode?: string;
    receiptCode?: string;
    billCycleStr?: string;
    amountReceived?: number;
    billLastRepaymentDate?: string;
    paymentDate?: string;
  }
  const handleGetTableDataAll = async () => {
    const res = await cbdApiProjectAssetPaymentRecordGet({
      estateId: `${estateId.value}`
    });
    resMarin.value = res.margin!;
    resFeeList.value = res.feeList;
    // earnestTableData.value = res.margin?.receiptList;
    earnestTableData.value = res.margin?.receiptList || [];
    earnestMoney.value = res.margin?.actualAmount;
    otherTableData.value = res.feeList!;
  };

  /**
   * @param 保证金数据相关
   * @author {ljx}
   */
  const earnestMoney = ref<number>();
  const earnestColumns = [
    {
      title: '序号',
      slotName: 'id'
    },
    {
      title: '合同编号',
      dataIndex: 'contractCode'
    },
    {
      title: '收款单号',
      dataIndex: 'receiptCode'
    },
    {
      title: '实收金额(¥)',
      dataIndex: 'amountReceived'
    },
    {
      title: '应缴费日期',
      slotName: 'billLastRepaymentDate'
    },
    {
      title: '实缴费日期',
      dataIndex: 'paymentDate'
    },
    {
      title: '操作',
      slotName: 'operation'
    }
  ];
  // const earnestTableData: Ref<Array<any>> = ref([]);
  const earnestTableLoading: Ref<boolean> = ref(false);

  /**
   * @param 租金数据相关
   * @author {ljx}
   */
  const otherColumns = [
    {
      title: '合同编号',
      dataIndex: 'contractCode'
    },
    {
      title: '收款单号',
      dataIndex: 'receiptCode'
    },
    {
      title: '期数',
      dataIndex: 'billCycleStr'
    },
    {
      title: '实收金额',
      dataIndex: 'amountReceived'
    },
    {
      title: '应缴日期',
      dataIndex: 'billLastRepaymentDate'
    },
    {
      title: '实缴日期',
      dataIndex: 'paymentDate'
    },
    {
      title: '操作',
      slotName: 'operation'
    }
  ];

  const otherTableData = ref<Array<FeeType>>([]);

  // loading动画
  const otherTableLoading: Ref<boolean> = ref(false);

  /**
   * @param id
   * @param 查看收款单
   */
  const handleViewReceipt = (id: number) => {
    console.log(id);
    receiptInfoMotal.value = true;
    receiptInfoId.value = id;
  };

  /**
   * @param 表单提交
   */
  const searchForm = reactive({
    contractCode: ''
  });

  /**
   * @param 查询
   * @param estateId 是 房源id
   * @param contractCode 是  string  合同编号
   */
  const handleSearch = async () => {
    const res = await cbdApiProjectAssetPaymentRecordGet({
      estateId: `${estateId.value}`,
      // estateId: '9763',
      contractCode: searchForm.contractCode
    });
    resMarin.value = res.margin!;
    earnestTableData.value = res.margin!.receiptList!;
    earnestMoney.value = res.margin!.actualAmount!;
    otherTableData.value = res.feeList!;
  };

  /**
   * @param 重置表单
   */
  const handleReset = (el: any) => {
    el.resetFields();
    handleGetTableDataAll();
  };
</script>

<style scoped lang="less">
  @import './paymentRecords.less';
</style>
