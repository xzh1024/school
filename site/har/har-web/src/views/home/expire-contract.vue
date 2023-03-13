<template>
  <a-card>
    <h4 style="margin-top: 5px"
      >{{ contractExpireHash[page.search.dataType] }}
      <span style="color: red">{{ route.query.num }}</span> 份</h4
    >
    <i-table
      v-model="page.search"
      :options="page.options"
      :api="cbdApiProjectContractExpireWarningListGet"
    >
    </i-table>
  </a-card>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import ITable from '@/components/i-table/index.vue';
  import { cbdApiProjectContractExpireWarningListGet } from '@/api';
  import { contractExpireHash } from '@/utils/dic';

  interface Page {
    search: {
      dataType: string;
    };
    options: Recordable;
  }
  const route = useRoute();
  const page = reactive<Page>({
    search: {
      dataType: route.query.type as string
    },
    options: {
      menu: false,
      index: true,
      tableCard: false,
      indexTitle: '序号',
      columns: [
        {
          label: '合同号',
          prop: 'contractCode'
        },
        {
          label: '合同到期时间',
          prop: 'periodEnd'
        },
        {
          label: '剩余天数（天）',
          prop: 'availableDays'
        },
        {
          label: '商户编号',
          prop: 'merchantCode'
        },
        {
          label: '商户/ 企业名称',
          prop: 'merchantName'
        },
        {
          label: '联系人',
          prop: 'linkman'
        },
        {
          label: '联系电话',
          prop: 'linkTel'
        },
        {
          label: '房源编号',
          prop: 'estateCodes'
        },
        {
          label: '房源类型',
          prop: 'estateCategories'
        },
        {
          label: '房源⾯积（㎡）',
          prop: 'totalAcreage'
        }
      ]
    }
  });
</script>
<style scoped lang="less"></style>
