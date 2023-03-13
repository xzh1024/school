<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      v-permission="['energyConsume:config:list']"
      :options="page.options"
      :api="cbdApiProjectEnergyConsumeConfigListGet"
    >
      <template #statusCell="{ record }">
        <a-tag :color="['red', 'arcoblue'][record.status]" default-checked>
          {{ ['未使用', '使用中'][record.status] }}
        </a-tag>
      </template>
      <template #typeCell="{ record }">
        {{ getEnergyTypeName(record.type) }}
      </template>
      <template #categoryCell="{ record }">
        {{ getEnergyFeeName(record.category) }}
      </template>
      <template #menu="{ record }">
        <a-button
          v-if="record.status == 0"
          v-permission="['energyConsume:config:remove']"
          type="text"
          @click="handleDelete(record)"
        >
          删除
        </a-button>
      </template>
      <template #header>
        <a-button
          v-permission="['energyConsume:config:add']"
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
      @reset="reset"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message } from '@arco-design/web-vue';
  import { Modal } from '@arco-design/web-vue';
  import {
    cbdApiProjectEnergyConsumeConfigListGet,
    cbdApiProjectEnergyConsumeConfigRemoveIdDelete
  } from '@/api';
  import AddModel from './__components__/type-model.vue';
  import { useAddModel } from './type/useAddModel';
  import { energyTypeData, energyFeeData } from '@/utils/dic';
  const {
    modelVisible,
    modelSource,

    handleAdd
  } = useAddModel();

  // 删除
  async function handleDelete(id: number) {
    Modal.open({
      title: '删除确认',
      content: '请确认是否删除该能耗类型？',
      onOk: async () => {
        // @ts-ignore
        await cbdApiProjectEnergyConsumeConfigRemoveIdDelete(id);
        Message.success('操作成功!');
        page.refresh = true;
      }
    });
  }

  // 新增
  function reset() {
    modelVisible.value = false;
    page.refresh = true;
  }

  function getEnergyTypeName(id: number) {
    const findItem = energyTypeData.find((it) => it.value == id);
    return findItem?.label;
  }

  function getEnergyFeeName(id: number) {
    const findItem = energyFeeData.find((it) => it.value == id);
    return findItem?.label;
  }

  const page = reactive({
    search: {},
    refresh: false,
    showDetail: false,
    modelTitle: '能耗类型',
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuOptions: {
        width: 150
      },
      columns: [
        {
          label: '编号',
          prop: 'code'
        },
        {
          label: '能耗类型',
          prop: 'type'
        },
        {
          label: '能耗单价（元）',
          prop: 'unitPrice'
        },
        {
          label: '能耗单位',
          prop: 'unit'
        },
        {
          label: '费用项目',
          prop: 'category'
        },
        {
          label: '状态',
          prop: 'status'
        }
      ]
    },
    config: {
      phone: ''
    }
  });
</script>

<style scoped></style>
