<template>
  <div class="fee-content-box">
    <i-form v-model="searchForm" :options="formOptions">
      <template #volumeAmountForm>
        <a-input-number
          v-model="searchForm.volumeAmount"
          hide-button
          :min="0"
          :max="999999999.99"
        >
          <template #suffix>万</template>
        </a-input-number>
      </template>
      <template #menuForm>
        <a-button :disabled="loading" type="primary" @click="getList">
          查询
        </a-button>
        <a-button :disabled="loading" type="primary" @click="onReset">
          重置</a-button
        >
        <a-button
          v-permission="[
            'intention:contract:payscheme:bill:export',
            'formal:contract:payscheme:bill:export'
          ]"
          :disabled="loading"
          @click="onExport"
          >导出</a-button
        >
      </template>
    </i-form>
    <a-spin
      class="table-box"
      :loading="loading"
      style="display: block"
      tip="数据加载中,请稍后..."
    >
      <div v-if="feeData && feeData.length">
        <template v-for="(item, idx) in feeData" :key="idx">
          <i-table
            :options="getOptions(item.expenseKeyCode)"
            :data="item.payments"
          >
            <template #header
              ><div>{{ item.expenseType }}</div></template
            >
            <template #hasTaxCell="{ record }"
              ><div>{{
                valueFindLabel(contractHasTaxList, record.hasTax)
              }}</div></template
            >
          </i-table>
        </template>
      </div>
      <a-empty v-else style="background-color: #fff"> </a-empty>
    </a-spin>
  </div>
  <div class="bottoms">
    <footer-btn
      need-pre
      :btn-loading="loading"
      :need-update-btn="false"
      :need-save="false"
      @on-cancel="cancelClick"
      @on-next="nextClick"
      @on-pre="preClick"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUpdated } from 'vue';
  import IForm from '@/components/i-form/index.vue';
  import ITable from '@/components/i-table/index.vue';
  import NP from 'number-precision';
  import { contractHasTaxList, contractChargeTypeList } from '@/utils/dic';
  import { download, valueFindLabel, formatPrice } from '@/utils';
  import FooterBtn from './footer-btn.vue';
  import {
    cbdApiProjectCommonMisTreeExpenseGet,
    cbdApiProjectFormalContractPayPaymentInfosGet,
    cbdApiProjectIntentionContractPayPaymentInfosGet,
    CbdApiProjectFormalContractPayPaymentInfosGetResponse
  } from '@/api';
  import axios from 'axios';
  import useToken from '@/composables/useToken';
  import { useContractStore } from '@/store/project/contract';
  import useFuncProxy from '@/hooks/useFuncProxy';

  type RowData = {
    expenseId: number;
    expenseType: string;
    expenseKeyCode: string;
    paymentMethod?: string;
    paymentPeriod?: string;
    startDate?: string;
    endDate?: string;
    paymentPeriodStart?: string;
    paymentPeriodEnd?: string;
    statementDay: string;
    contractPayment: string;
    hasTax: number;
    taxRatio: string;
    taxExcludePayment: string;
    taxPayment: string;
    freePayment: string;
    actPayment: string;
    freeExcludePayment: string;
  };
  const contractInfo = useContractStore();
  const contractId = contractInfo.$state.contractInfo.contractId || '';
  const contractType = contractInfo.$state.contractInfo.contractType;
  const isIntention = contractType === 1;
  const requestPaymentInfoApi = isIntention
    ? cbdApiProjectIntentionContractPayPaymentInfosGet
    : cbdApiProjectFormalContractPayPaymentInfosGet;
  const exportUrl = isIntention
    ? `/cbd-api-project/intention/contract/pay/paymentInfos/export`
    : `/cbd-api-project/formal/contract/pay/paymentInfos/export`;
  const t = useToken();
  const emits = defineEmits(['onCancel', 'onNext', 'onPre']);
  const searchForm = ref<{
    contractId: string;
    expenseIds?: string;
    chargingMethod?: string;
    hasTax?: string;
    volumeAmount?: number;
  }>({
    contractId: String(contractId),
    expenseIds: undefined,
    chargingMethod: undefined,
    hasTax: undefined,
    volumeAmount: undefined
  });

  const formOptions = ref<Recordable>({
    menuSpan: 24,
    columns: [
      {
        label: '费用项目',
        prop: 'expenseIds',
        search: true,
        type: 'select',
        span: 6,
        dicRequest: () =>
          cbdApiProjectCommonMisTreeExpenseGet({
            parentExpenseCodes: isIntention
              ? '202212270001,202212270002,202212270003'
              : '202212270001,202212270002,202212270004',
            contractId: String(contractId),
            contractProjectFilter: '1'
          }),
        options: {
          multiple: true,
          fieldNames: {
            label: 'expenseType',
            value: 'expenseId'
          }
        }
      },
      {
        label: '收费方式',
        prop: 'chargingMethod',
        span: 6,
        search: true,
        dic: contractChargeTypeList,
        type: 'select'
      },
      {
        label: '是否含税',
        prop: 'hasTax',
        span: 6,
        dic: contractHasTaxList,
        search: true,
        type: 'select'
      },
      {
        label: '预估销售额（月）',
        prop: 'volumeAmount',
        search: true,
        span: 6
      }
    ]
  });

  interface countDataType {
    isSummary: boolean;
    statementDay: string;
    contractPayment: string | number;
    taxExcludePayment?: string | number;
    taxPayment?: string | number;
    freePayment?: string | number;
    actPayment: string | number;
  }
  const feeOptions = ref<Recordable>({
    index: true,
    menu: false,
    indexTitle: '序号',
    pageShow: false,
    menuOtherOptions: {
      scroll: {
        y: 400
      },
      summaryText: '合计',
      summary({ data = [] }) {
        const countData: countDataType = {
          isSummary: true,
          statementDay: '合计',
          contractPayment: 0,
          taxExcludePayment: 0,
          taxPayment: 0,
          freePayment: 0,
          actPayment: 0
        };
        data.forEach((record: any) => {
          countData.contractPayment = NP.plus(
            countData.contractPayment,
            record.freeExcludePayment
          );
          countData.taxExcludePayment = NP.plus(
            countData.taxExcludePayment!,
            record.taxExcludePayment
          );
          countData.taxPayment = NP.plus(
            countData.taxPayment!,
            record.taxPayment
          );
          countData.freePayment = NP.plus(
            countData.freePayment || 0,
            record.freePayment
          );
          countData.actPayment = NP.plus(
            countData.actPayment,
            record.actPayment
          );
        });
        countData.contractPayment = formatPrice(countData.contractPayment);
        console.log(countData);
        countData.taxExcludePayment = formatPrice(countData.taxExcludePayment!);
        countData.taxPayment = formatPrice(countData.taxPayment!);
        countData.freePayment = formatPrice(countData.freePayment || 0);
        countData.actPayment = formatPrice(countData.actPayment);
        console.log([countData]);
        return [countData];
      }
    },
    columns: [
      {
        label: '费用项目',
        width: 120,
        prop: 'expenseType'
      },
      {
        label: '收费方式',
        width: 120,
        prop: 'paymentMethod'
      },
      {
        label: '合同期间',
        width: 250,
        prop: 'paymentPeriod',
        formatter: (record: RowData) => {
          return record.startDate
            ? `${record.startDate}~${record.endDate}`
            : '';
        }
      },
      {
        label: '账单生成日期',
        width: 120,
        prop: 'statementDay'
      },
      {
        label: '合同金额（元）',
        width: 150,
        prop: 'contractPayment',
        formatter: (el: RowData) => formatPrice(el.contractPayment)
      },
      {
        label: '是否含税',
        width: 100,
        prop: 'hasTax'
      },
      {
        label: '税率',
        width: 120,
        prop: 'taxRatio',
        formatter: (el: RowData) => (el.taxRatio ? el.taxRatio + '%' : '--')
      },
      {
        label: '不含税金额（元）',
        width: 150,
        formatter: (el: RowData) => formatPrice(el.taxExcludePayment),
        prop: 'taxExcludePayment'
      },
      {
        label: '税额（元）',
        width: 120,
        formatter: (el: RowData) => formatPrice(el.taxPayment),
        prop: 'taxPayment'
      },
      {
        label: '免租金额（元）',
        width: 150,
        formatter: (el: RowData) => formatPrice(el.freePayment),
        prop: 'freePayment'
      },
      {
        label: '总金额（元）',
        width: 120,
        formatter: (el: RowData) => formatPrice(el.actPayment),
        prop: 'actPayment'
      }
    ]
  });

  const intentionOptions = ref<Recordable>({
    index: true,
    menu: false,
    indexTitle: '序号',
    pageShow: false,
    menuOtherOptions: {
      scroll: {
        y: 400
      },
      summaryText: '合计',
      summary({ data = [] }) {
        const countData: countDataType = {
          isSummary: true,
          statementDay: '合计',
          contractPayment: 0,
          // taxExcludePayment: 0,
          // taxPayment: 0,
          actPayment: 0
        };
        data.forEach((record: any) => {
          countData.contractPayment = NP.plus(
            countData.contractPayment,
            record.contractPayment
          );
          countData.actPayment = NP.plus(
            countData.actPayment,
            record.actPayment
          );
        });
        countData.contractPayment = formatPrice(countData.contractPayment);
        // countData.taxExcludePayment = formatPrice(countData.taxExcludePayment);
        // countData.taxPayment = formatPrice(countData.taxPayment);
        countData.actPayment = formatPrice(countData.actPayment);
        return [countData];
      }
    },
    columns: [
      {
        label: '费用项目',
        width: 120,
        prop: 'expenseType'
      },
      {
        label: '应收日期',
        width: 120,
        prop: 'statementDay'
      },
      {
        label: '合同金额（元）',
        width: 140,
        formatter: (el: RowData) => formatPrice(el.contractPayment),
        prop: 'contractPayment'
      },
      // {
      //   label: '是否含税',
      //   width: 120,
      //   prop: 'hasTax'
      // },
      // {
      //   label: '税率',
      //   width: 120,
      //   prop: 'taxRatio'
      // },
      // {
      //   label: '不含税金额（元）',
      //   width: 200,
      //   formatter: (el: RowData) => formatPrice(el.taxExcludePayment),
      //   prop: 'taxExcludePayment'
      // },
      // {
      //   label: '税额',
      //   width: 120,
      //   formatter: (el: RowData) => formatPrice(el.taxPayment),
      //   prop: 'taxPayment'
      // },
      {
        label: '总金额（元）',
        width: 140,
        formatter: (el: RowData) => formatPrice(el.actPayment),
        prop: 'actPayment'
      }
    ]
  });
  const feeData = ref<CbdApiProjectFormalContractPayPaymentInfosGetResponse>(
    []
  );
  // 表头拥有所有字段的类型 租金 物业费
  const feeTypeList = ['202212270001', '202212270002'];
  const getOptions = (code?: string) => {
    if (!code) return [];
    if (feeTypeList.includes(code)) {
      return feeOptions.value;
    } else if (code === '202212270003' || code === '202212270004') {
      return intentionOptions.value;
    } else {
      // 可能还有其他类型表头,有就添加配置,没有就按照正常费用的来来展示
      return feeOptions.value;
    }
  };
  const onReset = () => {
    searchForm.value = {
      contractId: String(contractId),
      expenseIds: undefined,
      chargingMethod: undefined,
      hasTax: undefined,
      volumeAmount: undefined
    };
    getList();
  };
  const onExport = async () => {
    try {
      const d: any = await axios({
        method: 'get',
        url: exportUrl,
        params: {
          ...searchForm.value
        },
        headers: {
          Authorization: t.getToken()
        },
        responseType: 'blob'
      });
      const blob = new Blob([d.data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      download(url, '费用明细');
    } catch (e) {
      console.error(e);
    }
  };
  const cancelClick = async () => {
    await emits('onCancel');
  };
  const nextClick = async () => {
    emits('onNext');
  };
  const preClick = async () => {
    emits('onPre');
  };
  const [getList, loading] = useFuncProxy(async () => {
    feeData.value = await requestPaymentInfoApi({
      ...searchForm.value,
      volumeAmount: String(searchForm.value.volumeAmount || '')
    });
  });
  onMounted(() => {
    getList();
  });
  onUpdated(() => {});
</script>

<style scoped lang="less">
  //.fee-box {
  //  height: 85vh;
  //}
  //.table-box {
  //  height: 65vh;
  //  overflow-y: scroll;
  //}
  .fee-content-box {
    height: calc(100vh - 47px - 64px - 56px);
    overflow-y: auto;
  }
  .bottoms {
    z-index: 99;
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
</style>
