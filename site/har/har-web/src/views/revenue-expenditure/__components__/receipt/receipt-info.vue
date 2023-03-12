<template>
  <div v-if="loading">
    <a-skeleton>
      <a-space direction="vertical" :style="{ width: '100%' }" size="large">
        <a-skeleton-line :rows="8" />
        <a-skeleton-shape />
      </a-space>
    </a-skeleton>
  </div>
  <div v-else>
    <a-divider orientation="left">收款单基本信息</a-divider>
    <h4>收费类型：{{ dataInfo.typeName }}</h4>
    <a-descriptions
      :data="dataInfo"
      layout="inline-horizontal"
      :value-style="listItemStyle"
    >
      <descriptions-item
        v-for="(item, idx) in receiptBasicItems"
        :key="idx"
        :label="item.label + '：'"
        :span="item.span"
      >
        {{ useFormatDescription(dataInfo, item) }}
      </descriptions-item>
    </a-descriptions>
    <a-divider orientation="left">支付流水信息</a-divider>
    <a-descriptions
      style="margin-top: 15px"
      :label-style="{ color: '#333', fontWeight: 'bold' }"
      :value-style="{ color: '#333', fontWeight: 'bold' }"
    >
      <descriptions-item label="收款金额（¥）">
        {{ dataInfo['amountReceived'] || '--' }}
      </descriptions-item>
      <descriptions-item label="收款日期" :span="2">
        {{ dataInfo.collectionDate || '--' }}
      </descriptions-item>
      <descriptions-item
        v-if="dataInfo.paymentMethod === 2"
        label="渠道费（¥）"
      >
        {{ dataInfo.channelAmount || '--' }}
      </descriptions-item>
      <descriptions-item v-if="dataInfo.paymentMethod === 2" label="渠道费率">
        {{ dataInfo.channelFee ? dataInfo.channelFee + '‰' : '--' }}
      </descriptions-item>
      <!--      <descriptions-item label="本金（¥）">-->
      <!--        {{ dataInfo['amountReceived'] || '&#45;&#45;' }}-->
      <!--      </descriptions-item>-->
      <!--      <descriptions-item label="滞纳金（¥）">-->
      <!--        {{ dataInfo['amountReceived'] || '&#45;&#45;' }}-->
      <!--      </descriptions-item>-->
    </a-descriptions>
    <div v-if="dataInfo.paymentMethod === 1">
      <div style="margin-bottom: 15px; color: #86909c">支付凭证：</div>
      <i-custom-upload
        v-model="dataInfo.attachmentList"
        url-key="previewAddress"
        :options="{
          showUploadButton: false,
          showRemoveButton: false
        }"
      ></i-custom-upload>
    </div>
    <p>
      <span :style="listLabelStyle">备注：</span>
      <span :style="listItemStyle">{{ dataInfo['remark'] || '' }}</span></p
    >
    <a-divider orientation="left">收款信息</a-divider>
    <h4>实际收款：{{ dataInfo.amountReceived }}</h4>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ReceiptInfo'
  };
</script>

<script setup lang="ts">
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { computed, ref, watch } from 'vue';
  import { DescriptionsItem } from '@arco-design/web-vue';
  import { cbdApiProjectReceiptInfoIdGet } from '@/api';
  import useFormatDescription from '@/hooks/useFormatDescription';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import {
    receiptStatusHash,
    listItemStyle,
    listLabelStyle,
    paymentMethodHash
  } from '@/utils/dic';

  const props = defineProps({
    info: {
      type: Object,
      default: () => {
        return {};
      }
    },
    id: {
      type: Number
    }
  });
  const receiptId = computed(() => props.id);
  const dataInfo: any = Object.keys(props.info).length
    ? ref(props.info)
    : ref({});
  const receiptBasicItems = computed(() =>
    dataInfo.value.paymentMethod === 1
      ? [
          {
            label: '收款单号',
            prop: 'code'
          },
          {
            label: '源账单号',
            prop: 'accountReceivableCode'
          },
          {
            label: '状态',
            prop: 'status',
            isEnum: true,
            source: receiptStatusHash
          },
          {
            label: '审核完成时间',
            prop: 'auditTime',
            span: 2
          },
          {
            label: '商户 / 企业名称',
            prop: 'merchantCompanyName'
          },
          {
            label: '承租人 / 负责人姓名',
            prop: 'principal'
          },
          {
            label: '合同编号 / 能源单据号',
            prop: 'contractCode'
          },
          {
            label: '支付类型',
            prop: 'paymentMethod',
            isEnum: true,
            source: paymentMethodHash
          }
        ]
      : [
          {
            label: '收款单号',
            prop: 'code'
          },
          {
            label: '源账单号',
            prop: 'accountReceivableCode'
          },
          {
            label: '状态',
            prop: 'status',
            isEnum: true,
            source: receiptStatusHash
          },
          {
            label: '入账时间',
            prop: 'collectionDate',
            span: 2
          },
          {
            label: '商户 / 企业名称',
            prop: 'merchantCompanyName'
          },
          {
            label: '承租人 / 负责人姓名',
            prop: 'principal'
          },
          {
            label: '合同编号 / 能源单据号',
            prop: 'contractCode'
          },
          {
            label: '支付类型',
            prop: 'paymentMethod',
            isEnum: true,
            source: paymentMethodHash,
            span: 2
          }
          // {
          //   label: '渠道费（¥）',
          //   prop: 'todo1'
          // },
          // {
          //   label: '渠道费率',
          //   prop: 'todo2'
          // },
          // {
          //   label: '扣除渠道费后金额（¥）',
          //   prop: 'todo3'
          // }
        ]
  );
  const [getData, loading] = useFuncProxy(async () => {
    dataInfo.value = await cbdApiProjectReceiptInfoIdGet({
      id: String(receiptId.value!)
    });
  });
  watch(
    receiptId,
    (v) => {
      if (v && !Object.keys(props.info).length) {
        getData();
      }
    },
    { deep: true, immediate: true }
  );
</script>

<style scoped></style>
