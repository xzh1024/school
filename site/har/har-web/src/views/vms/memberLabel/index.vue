<template>
  <div class="memberLabel">
    <i-table
      v-model="searchFrom"
      v-model:refresh-now="isRefresh"
      :selected-keys="selectedKeys"
      :options="page.options"
      :api="groundPcApiMemberLabelPageGet"
      @data-after="getCurrentTableData"
    >
      <template #menu="{ record }">
        <!-- v-permission="['energyConsume:device:remove']" -->
        <div class="flex menu_btns">
          <a-space>
            <a-button type="text" @click="handleEdit(record)"> 编辑 </a-button>
            <a-button type="text" @click="handleWatch(record)"> 查看 </a-button>
            <a-button type="text" @click="handleDelete(record)">
              删除
            </a-button>
          </a-space>
        </div>
      </template>
      <template #header>
        <a-space>
          <a-button type="primary" @click="handleAdd">添加</a-button>
        </a-space>
      </template>
    </i-table>

    <DialogCUD
      v-if="modelVisible"
      v-model="modelVisible"
      :title="modelTitle"
      :row-id="rowId"
      :row="row"
      :source="modelSource"
      @sourceChange="sourceChange"
      @reset="reset"
    />
    <!-- <Detail
      v-model="detailVisible"
      :row-id="String(detailId)"
      :row="row"
      @reset="reset"
    ></Detail> -->
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    groundPcApiMemberLabelPageGet,
    groundPcApiMemberLabelDeleteIdGet,
    groundPcApiMemberLabelAllowDeleteIdGet
  } from '@/api/ground-pc-api';
  import DialogCUD from './__components__/dialog-cud.vue';
  import { useAddModel } from './type/useAddModel';
  // import Detail from './__components__/detail.vue';
  // import useFuncProxy from '@/hooks/useFuncProxy';
  const {
    modelVisible,
    modelTitle,
    modelSource,
    rowId,
    row,
    handleAdd,
    handleEdit,
    handleWatch
  } = useAddModel();
  // type recordType = {
  //   id: string;
  // };
  // const detailVisible = ref(false);
  // const detailId = ref<number | string>('');

  async function handleDelete(record: any) {
    const isOnUse = await groundPcApiMemberLabelAllowDeleteIdGet({
      id: `${record.id}`
    });
    if (isOnUse) {
      Modal.open({
        title: '',
        content: '该标签已标记会员，不能删除',
        closable: false,
        hideCancel: true
      });
    } else {
      Modal.open({
        title: '删除确认',
        content: '删除后数据无法恢复，是否确定删除？',
        onOk: async () => {
          await groundPcApiMemberLabelDeleteIdGet({
            id: String(record.id)
          });
          Message.success('操作成功!');
          isRefresh.value = true;
        }
      });
    }
  }
  const searchFrom = ref({
    projectId: '',
    buildingId: '',
    buildingFloorId: '',
    deviceType: '',
    intelligentDevice: '',
    deviceSearch: ''
  });
  const selectedKeys = ref<number[]>([]);
  const currentPageTableData = ref([]);
  function getCurrentTableData(currentPageData: any) {
    currentPageTableData.value = currentPageData.rows;
    selectedKeys.value = []; // 数据变化清空 多选数据
  }
  const isRefresh = ref(false);
  const page = computed(() => {
    return {
      showEditModal: false,
      showConfigModal: false,
      showDetail: false,
      options: {
        indexTitle: '序号',
        index: true,
        submitText: '查询',
        tableCard: true,
        layout: 'vertical',
        submitBtnIcon: false,
        resetBtnIcon: false,
        menuSpan: 12,
        menuOtherOptions: {
          bordered: false,
          rowKey: 'id',
          rowSelection: {
            type: 'checkbox',
            showCheckedAll: true
          },
          onSelectionChange: (e: number[]) => {
            selectedKeys.value = e;
          }
        },
        menuOptions: {
          width: 140,
          align: 'left',
          fixed: 'right'
        },
        columns: [
          {
            label: '标签编号',
            prop: 'id'
          },
          {
            label: '标签名',
            prop: 'name'
          },
          {
            label: '会员数量',
            prop: 'memberNum'
          },
          {
            label: '创建人',
            prop: 'createBy'
          },
          {
            label: '创建时间',
            prop: 'createTime'
          }
        ]
      }
    };
  });
  // 新增
  function reset() {
    modelVisible.value = false;
    isRefresh.value = true;
    rowId.value = '';
  }
  function sourceChange(source: string) {
    modelSource.value = source;
  }
  watch(modelSource, (newV) => {
    console.log('111', newV);
  });
</script>

<style scoped lang="less">
  .memberLabel {
    .menu_btns {
      :deep(.arco-btn-size-medium) {
        padding: 0;
        font-size: 14px;
        color: #4c8af7;
        line-height: 22px;
      }
    }
    :deep(.i-form) {
      .arco-col-12 {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        flex: 1;
      }
    }
  }
</style>
