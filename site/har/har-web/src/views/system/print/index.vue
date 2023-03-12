<template>
  <div>
    <i-table
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="cbdApiProjectPrintTemplateListGet"
    >
      <template #menu="{ record }">
        <a-button
          v-permission="['print:modify']"
          type="text"
          @click="onConfigPrint(record)"
          >设置</a-button
        >
      </template>
    </i-table>
    <detail
      v-if="page.showDetail"
      :id="page.id"
      v-model="page.showDetail"
      @refresh="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Detail from './__components__/detail.vue';
  import {
    cbdApiProjectPrintTemplateListGet,
    CbdApiProjectPrintTemplateListGetResponse
  } from '@/api';

  type RowData = Required<CbdApiProjectPrintTemplateListGetResponse>['rows'][0];
  interface Page {
    options: Recordable;
    refresh: boolean;
    showDetail: boolean;
    id: string;
  }
  const page = reactive<Page>({
    refresh: false,
    showDetail: false,
    id: '',
    options: {
      index: true,
      indexTitle: '序号',
      indexWidth: 150,
      columns: [
        {
          label: '打印单类型',
          prop: 'name'
        }
      ]
    }
  });
  const onConfigPrint = (e: RowData) => {
    page.showDetail = true;
    page.id = String(e.id!);
  };
  const onSubmit = () => {
    page.refresh = true;
    page.showDetail = false;
  };
</script>
<style scoped lang="less"></style>
