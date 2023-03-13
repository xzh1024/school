<template>
  <drawer v-model="visible" title="店铺对账单详情查询" :footer="false">
    <div class="detail-box">
      <div class="block-title">基本信息</div>
      <a-descriptions
        :column="3"
        style="padding-bottom: 16px"
        :label-style="{ marginBottom: '20px' }"
        :value-style="listItemStyle"
      >
        <a-descriptions-item label="项目"
          >{{ detail.projectName }}
        </a-descriptions-item>
        <a-descriptions-item label="日结单号">
          {{ detail.billNo }}
        </a-descriptions-item>
        <a-descriptions-item label="店铺名称"
          >{{ detail.storeName }}
        </a-descriptions-item>
        <a-descriptions-item label="店铺编号">
          {{ detail.storeCode }}</a-descriptions-item
        >
        <a-descriptions-item label="时间">
          {{ detail.billDate }}</a-descriptions-item
        >
      </a-descriptions>
      <div class="split-bg"></div>
      <i-table
        v-model="search"
        :options="options"
        :api="svcWebStoreStatementInfoGet"
      >
        <template #header>
          <div class="flex justify-between align-center">
            <div class="block-title">流水明细</div>
            <a-button type="primary" @click="onExport">导出</a-button>
          </div>
        </template>
        <template #typeCell="{ record }">
          {{ valueFindLabel(tradeTypeList, record.type) }}
        </template>
      </i-table>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { reactive, computed, PropType } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { listItemStyle, tradeTypeList } from '@/utils/dic';
  import { download, formatPrice, valueFindLabel } from '@/utils';
  import type { DetailType } from '../DetailType';
  import {
    svcWebStoreStatementInfoGet,
    type SvcWebStoreStatementInfoGetRequest,
    type SvcWebStoreStatementPageGetResponse
  } from '@/api/svc-web';

  import useToken from '@/composables/useToken';
  import axios from 'axios';

  type RowData = Required<SvcWebStoreStatementPageGetResponse>['rows'][0];
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    query: {
      type: Object as PropType<SvcWebStoreStatementInfoGetRequest>,
      default: () => {}
    },
    detail: {
      type: Object as PropType<DetailType>,
      default: () => {}
    }
  });
  const emits = defineEmits(['update:modelValue']);
  const search = computed(() => {
    return {
      ...props.query
    };
  });
  const options = reactive({
    index: true,
    indexTitle: '序号',
    tableCard: false,
    menu: false,
    columns: [
      {
        label: '时间',
        prop: 'tradeTime'
      },
      {
        label: '流水号',
        prop: 'serialNo'
      },
      {
        label: '卡名',
        prop: 'cardName'
      },
      {
        label: '卡号',
        prop: 'memberCardCode'
      },
      {
        label: '交易类型',
        prop: 'type'
      },
      {
        label: '发生金额（¥）',
        prop: 'amount',
        formatter: (el: RowData) => formatPrice(el.amount!)
      }
    ]
  });
  const { getToken } = useToken();
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const onExport = async () => {
    try {
      const d: any = await axios({
        method: 'get',
        url: `/svc-web/store_statement/export`,
        params: {
          ...search.value
        },
        headers: {
          Authorization: getToken()
        },
        responseType: 'blob'
      });
      const blob = new Blob([d.data], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      download(url, '店铺对账单');
    } catch (e) {
      console.error(e);
    }
  };
</script>
<style scoped lang="less">
  .detail-box {
    width: 100%;
    padding: 0 16px 16px;
    background-color: #fff;
  }
</style>
