<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      v-permission="['energyConsume:device:list']"
      :options="page.options"
      :api="cbdApiProjectEnergyConsumeDeviceListGet"
    >
      <template #projectNameCell="{ record }">
        {{ record.project?.label }}
      </template>
      <template #deviceNameCell="{ record }">
        {{ record.name }}
      </template>
      <template #merchantNameCell="{ record }">
        {{ record.merchant?.label }}
      </template>
      <template #storeNameCell="{ record }">
        {{ record.store?.label }}
      </template>
      <template #statusCell="{ record }">
        <a-tag :color="['red', 'arcoblue'][record.status]" default-checked>
          {{ ['未使用', '使用中'][record.status] }}
        </a-tag>
      </template>
      <template #typeCell="{ record }">
        {{ getTableColumnLabel(record.type, energyTypeData) }}
      </template>
      <template #usageTypeCell="{ record }">
        {{ getTableColumnLabel(record.usageType, usageTypeData) }}
      </template>
      <template #menu="{ record }">
        <a-button
          v-if="record.status === 0"
          v-permission="['energyConsume:device:remove']"
          type="text"
          @click="handleDelete(record.id)"
        >
          删除
        </a-button>
      </template>
      <template #header>
        <a-button
          v-permission="['energyConsume:device:add']"
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

    <add-model
      v-model="modelVisible"
      :title="page.modelTitle"
      :source="modelSource"
      :options="{
        usageTypeData: usageTypeData
      }"
      @reset="reset"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    cbdApiProjectEnergyConsumeDeviceListGet,
    cbdApiProjectEnergyConsumeDeviceRemoveIdDelete
  } from '@/api';
  import AddModel from './__components__/device-model.vue';
  import { useAddModel } from './type/useAddModel';
  import { energyTypeData } from '@/utils/dic';
  const {
    modelVisible,
    modelSource,

    handleAdd
  } = useAddModel();

  function handleDelete(id: number) {
    Modal.open({
      title: '删除确认',
      content: '请确认是否删除该设备？',
      onOk: async () => {
        await cbdApiProjectEnergyConsumeDeviceRemoveIdDelete({
          id: String(id)
        });
        Message.success('操作成功!');
        page.refresh = true;
      }
    });
  }

  type itemType = {
    label: string;
    value: string | number;
  };
  function getTableColumnLabel(key: string | number, arr: Array<itemType>) {
    const findItem = arr.find((it: itemType) => it.value === key);
    return findItem ? findItem.label : '';
  }

  const usageTypeData = [
    { label: '自用', value: 1 },
    { label: '公用', value: 2 }
  ];

  const page = reactive({
    search: {
      projectName: '',
      deviceName: '',
      merchantName: '',
      storeName: '',
      type: '',
      usageType: ''
    },
    showEditModal: false,
    showConfigModal: false,
    refresh: false,
    showDetail: false,
    modelTitle: '能耗类型',
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuSpan: 12,
      menuOptions: {
        width: 150
      },
      columns: [
        {
          label: '项目名称',
          search: true,
          prop: 'projectName'
        },
        {
          label: '编号',
          prop: 'code'
        },
        {
          label: '设备名称',
          search: true,
          prop: 'deviceName'
        },
        {
          label: '状态',
          prop: 'status'
        },
        {
          label: '使用类型',
          search: true,
          prop: 'usageType',
          type: 'select',
          dic: usageTypeData,
          on: {
            change(v: string) {
              page.search = {
                ...page.search,
                usageType: v
              };
            }
          }
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
          label: '能耗类型',
          search: true,
          prop: 'type',
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
          label: '能耗单位',
          prop: 'unit'
        },
        {
          label: '单价（元）',
          prop: 'unitPrice'
        },
        {
          label: '起始读数',
          prop: 'initNum'
        }
      ]
    }
  });

  // 新增
  function reset() {
    modelVisible.value = false;
    page.refresh = true;
  }
</script>

<style scoped></style>
