<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      v-permission="['energyConsume:invoice:list']"
      :options="page.options"
      :api="cbdApiProjectEnergyConsumeInvoiceListGet"
      @reset="tableFormReset"
    >
      <template #storeNameCell="{ record }">
        {{ record.store?.label || record.storeNames }}
      </template>
      <template #merchantNameCell="{ record }">
        {{ record.merchant?.label }}
      </template>
      <template #projectNameCell="{ record }">
        {{ record.project?.label }}
      </template>
      <template #dateCell="{ record }">
        {{ record.startDate }}~{{ record.endDate }}
      </template>
      <template #statusCell="{ record }">
        <a-tag :color="['red', 'arcoblue'][record.status]" default-checked>
          {{ ['未出账', '已出账'][record.status] }}
        </a-tag>
      </template>
      <template #typesCell="{ record }">
        {{ getTypeText(record.types) }}
      </template>
      <template #menu="{ record }">
        <div v-if="record.status === 0">
          <a-button
            v-permission="[
              'energyConsume:invoice:info',
              'energyConsume:invoice:update'
            ]"
            type="text"
            @click="handleEdit(record)"
            >修改</a-button
          >
          <a-button
            v-permission="['energyConsume:invoice:receivable']"
            type="text"
            @click="handleReceivable(record.id)"
          >
            出账
          </a-button>
          <a-button
            v-permission="['energyConsume:invoice:remove']"
            type="text"
            @click="handleDelete(record.id)"
            >删除</a-button
          >
        </div>
        <a-button v-else type="text" @click="handleWatch(record)">
          查看
        </a-button>
      </template>
      <template #header>
        <a-button
          v-permission="['energyConsume:invoice:add']"
          type="primary"
          @click="handleAdd"
        >
          <slot name="icon">
            <icon-plus />
          </slot>
          添加
        </a-button>
      </template>
    </i-table>

    <i-loading :loading="loading" />

    <add-model
      v-model="modelVisible"
      title="能耗类型"
      :source="modelSource"
      :row-id="rowId"
      @reset="reset"
      @close="close"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  // import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectEnergyConsumeInvoiceListGet,
    cbdApiProjectEnergyConsumeInvoiceRemoveIdDelete,
    cbdApiProjectEnergyConsumeInvoiceCreateReceivableIdPost
  } from '@/api';
  import AddModel from './__components__/record-model.vue';
  import { useAddModel } from './type/useAddModel';
  import { energyTypeData } from '@/utils/dic';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import ILoading from '@/components/i-loading/index.vue';
  const {
    modelVisible,
    modelSource,
    rowId,

    handleEdit,
    handleWatch,
    handleAdd
  } = useAddModel();
  // 删除
  function handleDelete(id: number) {
    Modal.open({
      title: '删除确认',
      content: '请确认是否删除已选择保修信息？',
      onOk: async () => {
        await cbdApiProjectEnergyConsumeInvoiceRemoveIdDelete({
          id: String(id)
        });
        Message.success('操作成功!');
        page.refresh = true;
      }
    });
  }
  // 出账
  function handleReceivable(id: number) {
    Modal.open({
      title: '提示',
      content: '出账后将会生成财务收款账单，请确认是否出账',
      onOk: async () => {
        toCreateReceivable(id);
      }
    });
  }

  const [toCreateReceivable, loading] = useFuncProxy(async (id) => {
    await cbdApiProjectEnergyConsumeInvoiceCreateReceivableIdPost({
      id: String(id)
    });
    Message.success('出账成功，推送到财务账单应收账款!');
    page.refresh = true;
  });

  function getTypeText(types: number[]) {
    const arr: string[] = [];

    types.forEach((item: number) => {
      const findItem = energyTypeData.find((it) => it.value === item);
      if (findItem) {
        arr.push(findItem.label);
      }
    });

    return arr.join(',');
  }

  interface PageConfig {
    search?: any;
    options?: any;
    showEditModal?: boolean;
    showConfigModal?: boolean;
    refresh?: boolean;
    showDetail?: boolean;
    modelTitle?: string;
    menuOtherOptions?: any;
  }

  const page = reactive<PageConfig>({
    search: {
      projectName: '',
      merchantName: '',
      storeName: '',
      type: '',
      date: [],
      startDate: '',
      endDate: ''
    },
    showEditModal: false,
    showConfigModal: false,
    refresh: false,
    showDetail: false,
    modelTitle: '编辑店铺信息',
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuSpan: 18,
      menuOptions: {
        width: 230
      },
      columns: [
        {
          label: '单据号',
          prop: 'invoiceNo'
        },
        {
          label: '项目名称',
          search: true,
          prop: 'projectName'
        },
        {
          label: '商户名称',
          search: true,
          prop: 'merchantName'
        },
        {
          label: '店铺名称',
          search: true,
          prop: 'storeName'
        },
        {
          label: '录入起始时间',
          prop: 'date',
          search: true,
          type: 'dateRange',
          on: {
            change(v: string[]) {
              page.search = {
                ...page.search,
                startDate: v[0] || '',
                endDate: v[1] || ''
              };
            }
          }
        },
        {
          label: '能耗总费用',
          prop: 'totalCharge'
        },
        {
          label: '能耗类型',
          search: true,
          prop: 'types',
          type: 'select',
          dic: energyTypeData,
          on: {
            change(v: string) {
              page.search = {
                ...page.search,
                type: v
              };
            }
          }
        },
        {
          label: '状态',
          prop: 'status'
        }
      ]
    }
  });

  function tableFormReset() {
    delete page.search.startDate;
    delete page.search.endDate;
  }

  // 新增
  function reset() {
    rowId.value = '';
    modelVisible.value = false;
    page.refresh = true;
  }

  function close() {
    rowId.value = '';
    modelVisible.value = false;
  }
</script>

<style scoped></style>
