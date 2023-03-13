<template>
  <div>
    <i-table
      v-model:search="search"
      :options="options"
      :api="cbdApiProjectMerchantListGet"
    >
      <template #menu="{ record }">
        <a-button type="text" @click="choice(record)">选择</a-button>
      </template>
    </i-table>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ChoiceList'
  };
</script>

<script lang="ts" setup>
  import ITable from '@/components/i-table/index.vue';
  import { ref } from 'vue';
  import {
    cbdApiProjectMerchantInfoMerchantIdGet,
    cbdApiProjectMerchantListGet
  } from '@/api';

  const search = ref({
    status: 1
  });
  const emits = defineEmits(['change']);
  const options = ref({
    tableCard: false,
    columns: [
      {
        label: '商户名称',
        prop: 'searchKey',
        hide: true
      },
      {
        label: '商户编号',
        prop: 'code'
      },
      {
        label: '商户/企业名称',
        prop: 'name'
      },
      {
        label: '联系人',
        prop: 'linkman'
      },
      {
        label: '承租人',
        prop: 'principal'
      },
      {
        label: '法人',
        prop: 'legalPerson'
      }
    ]
  });
  async function choice(record: any) {
    try {
      const { id } = record;
      const res = await cbdApiProjectMerchantInfoMerchantIdGet({
        merchantId: id
      });
      emits('change', res);
    } catch (e) {
      console.error(e);
    }
  }
</script>

<style scoped></style>
