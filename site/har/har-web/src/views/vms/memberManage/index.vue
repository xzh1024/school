<template>
  <div class="memberManage">
    <i-table
      v-model="searchFrom"
      v-model:refresh-now="isRefresh"
      :selected-keys="selectedKeys"
      :options="page.options"
      :api="groundPcApiMemberPagePost"
      :page="initPageParams"
      @data-after="getCurrentTableData"
    >
      <template #avatarUrlCell="{ record }">
        <a-avatar>
          <img alt="avatar" :src="record.avatarUrl" />
        </a-avatar>
      </template>
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
          <a-button type="primary" @click="handleExport">导出</a-button>
        </a-space>
      </template>
    </i-table>

    <add-model
      v-model="modelVisible"
      :title="modelTitle"
      :row-id="rowId"
      :source="modelSource"
      @reset="reset"
    />
    <Detail
      v-model="detailVisible"
      :row-id="String(detailId)"
      @reset="reset"
    ></Detail>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    groundPcApiMemberPagePost,
    groundPcApiMemberLabelSelectListGet,
    GroundPcApiMemberLabelSelectListGetResponse,
    groundPcApiMemberExportPost,
    groundPcApiMemberDeleteIdGet
  } from '@/api/ground-pc-api';
  import AddModel from './__components__/addMember.vue';
  import Detail from './__components__/detail.vue';
  import { useAddModel } from './type/useAddModel';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { exportDownload } from '@/utils';
  import { useProjectOptions } from '@/views/vms/hooks/usePorject';
  const {
    modelVisible,
    modelSource,
    modelTitle,
    rowId,
    handleEdit,
    handleAdd
  } = useAddModel();
  const initPageParams = ref({ total: 0, pageSize: 10, current: 1 });
  // async function handleExport() {
  //   const hasSelected = selectedKeys.value.length > 0;
  //   const tableIds = tableData.value.map((itm) => itm.recordId);
  //   const exportIds = hasSelected ? selectedKeys.value : tableIds;
  //   if (exportIds.length === 0) {
  //     return Message.warning('没有可以导出的数据');
  //   }
  //   await modalConfirm(
  //     hasSelected ? '是否导出选中数据？' : '是否导出结果页全部数据？'
  //   );
  //   const url = cbdApiProjectSaleExportGet.requestConfig.path;
  //   await exportDownload(
  //     url,
  //     {
  //       ...searchFrom.value,
  //       ids: exportIds
  //     },
  //     '销售列表.xlsx'
  //   );
  //   selectedKeys.value = [];
  // }
  function handleExport() {
    Modal.open({
      title: '导出确认',
      content:
        selectedKeys.value?.length > 0
          ? '是否导出选中数据？'
          : '是否导出结果页全部数据？',
      onOk: async () => {
        const url = groundPcApiMemberExportPost.requestConfig.path;
        const p = {
          ...searchFrom.value,
          ids: selectedKeys.value,
          pageNum: String(initPageParams.value.current),
          pageSize: String(initPageParams.value.pageSize)
        };
        exportDownload(url, p, '会员列表', 'application/vnd.ms-excel', 'post');
      }
    });
  }
  function handleDelete(record: any) {
    if (record.status == 1) {
      Modal.open({
        title: '删除确认',
        content: '删除后数据无法恢复，是否确定删除？',
        onOk: async () => {
          await groundPcApiMemberDeleteIdGet({
            id: String(record.id)
          });
          Message.success('操作成功!');
          isRefresh.value = true;
        }
      });
    } else {
      Modal.open({
        title: '',
        content:
          '该会员存在有效期内的限期卡/次卡、或储值卡/积分还有余额、或有未使用的优惠券，暂不可删除',
        closable: false,
        hideCancel: true
      });
    }
  }
  type itemType = {
    label: string;
    value: string | number;
  };
  function getTableColumnLabel(key: string | number, arr: Array<itemType>) {
    const findItem = arr.find((it: itemType) => it.value === key);
    return findItem ? findItem.label : '';
  }
  type recordType = {
    id: string;
  };
  const detailVisible = ref(false);
  const detailId = ref<number | string>('');
  function handleWatch(record: recordType) {
    detailVisible.value = true;
    detailId.value = Number(record.id);
  }
  // 项目名称--下拉列表
  const { getProjectOptions, projectOptions } = useProjectOptions();

  // 会员来源--下拉列表
  const sourceTypeData = [
    { label: '小程序注册', value: 1 },
    { label: '老带新', value: 2 },
    { label: '顾问推荐', value: 3 },
    { label: '客户自到店', value: 4 },
    { label: '自主发掘', value: 5 }
  ];
  // 会员标签--下拉列表
  const memberLabelData = ref<GroundPcApiMemberLabelSelectListGetResponse>([]);
  const [getMemberLabelData] = useFuncProxy(async (v: string) => {
    memberLabelData.value = await groundPcApiMemberLabelSelectListGet({});
  });
  const intellectData = ref([
    { label: '是', value: 1 },
    { label: '否', value: 2 }
  ]);
  const searchFrom = ref({
    projectId: '',
    sourceType: '',
    labelIds: []
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
          scroll: {
            x: '140%'
          },
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
            label: '项目名称',
            search: true,
            prop: 'projectId',
            type: 'select',
            width: 120,
            ellipsis: true,
            tooltip: true,
            dic: projectOptions,
            formatter: (record: any) => {
              return record?.projectName;
            },
            options: {
              allowSearch: true
            }
          },
          {
            label: '会员编号',
            prop: 'code',
            width: 150
          },
          {
            label: '头像',
            prop: 'avatarUrl',
            width: 100
          },
          {
            label: '姓名',
            prop: 'name',
            width: 100
          },
          {
            label: '电话',
            prop: 'phone',
            width: 150
          },
          {
            label: '昵称',
            prop: 'nickName',
            width: 100
          },
          {
            label: '会员来源',
            search: true,
            prop: 'sourceType',
            type: 'select',
            formatter: (record: any) => {
              return getTableColumnLabel(record?.sourceType, sourceTypeData);
            },
            dic: sourceTypeData,
            width: 120
          },
          {
            label: '会员标签',
            search: true,
            hide: true,
            options: {
              multiple: true,
              maxTagCount: 2
            },
            prop: 'labelIds',
            type: 'select',
            formatter: (record: any) => {
              return record?.name;
            },
            dic: memberLabelData.value,
            width: 120,
            ellipsis: true,
            tooltip: true
          },
          {
            label: '会员标签',
            prop: 'labelNames',
            formatter: (record: any) => {
              return record?.labelNames.replace('/', '、');
            },
            width: 120
          },
          {
            label: '注册时间',
            prop: 'createTime',
            width: 180
          }
        ]
      }
    };
  });
  onMounted(() => {
    getProjectOptions();
    getMemberLabelData();
  });
  // 新增
  function reset() {
    modelVisible.value = false;
    detailVisible.value = false;
    isRefresh.value = true;
  }
</script>

<style scoped lang="less">
  .memberManage {
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
