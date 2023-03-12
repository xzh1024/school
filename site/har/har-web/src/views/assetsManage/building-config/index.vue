<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="cbdApiProjectBuildingPageGet"
    >
      <template #header>
        <a-button type="primary" @click="showAddModal({})">新建楼宇</a-button>
      </template>
      <template #menuCell="{ record }">
        <div class="flex" style="margin-left: -15px;">
          <a-button type="text" @click="showAddModal(record)">编辑</a-button>
          <a-button type="text" @click="onDetail(record)">查看</a-button>
          <a-popconfirm
            v-if="record.canDelete"
            content="数据删除后无法恢复，是否删除？"
            @ok="onDelete(record)"
          >
            <a-button type="text">删除</a-button>
          </a-popconfirm>
        </div>
      </template>
    </i-table>
    <add-modal
      v-if="page.addModalVisible"
      :id="page.id"
      v-model="page.addModalVisible"
      :options="{
        title: page.title,
        width: '70vw'
      }"
      @refresh="onRefresh"
    />
    <detail
      v-if="page.detailVisible"
      :id="page.id"
      v-model="page.detailVisible"
      :refresh="page.reQuery"
      @update="onUpdate"
    ></detail>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import useGetCompanyData from '@/hooks/useGetCompanyData';
  import AddModal from './__components__/add.vue';
  import Detail from './__components__/detail.vue';
  import { Message } from '@arco-design/web-vue';
  import {
    cbdApiProjectBuildingDeleteIdPost,
    cbdApiProjectBuildingPageGet,
    type CbdApiProjectBuildingPageGetResponse,
    cbdApiProjectCommonProjectSelectListGet
  } from '@/api';
  import { getActiveProjectId, setActiveProject } from '@/utils';
  import useDataDictionary from '@/hooks/useDataDictionary';
  type RowData = Required<CbdApiProjectBuildingPageGetResponse>['rows'][0];

  const [companyList] = useGetCompanyData();
  const projectTypeList = useDataDictionary('00003');
  const page = reactive<{
    addModalVisible: boolean;
    detailVisible: boolean;
    reQuery: boolean;
    options: Recordable;
    refresh: boolean;
    search: Recordable;
    title: string;
    id?: number;
  }>({
    addModalVisible: false,
    detailVisible: false,
    reQuery: false,
    refresh: false,
    id: undefined,
    search: {
      projectIdList: getActiveProjectId()
    },
    title: '',
    options: {
      indexTitle: '序号',
      index: true,
      menu: false,
      columns: [
        {
          label: '项目名称',
          prop: 'projectIdList',
          search: true,
          hide: true,
          type: 'select',
          options: {
            allowSearch: true,
            allowClear: false,
            onChange(v: any) {
              setActiveProject(v);
            }
          },
          dicRequest: cbdApiProjectCommonProjectSelectListGet
        },
        {
          label: '项目名称',
          prop: 'projectName'
        },
        {
          label: '归属公司',
          prop: 'companyId',
          search: true,
          hide: true,
          type: 'treeSelect',
          dic: companyList.value,
          props: {
            key: 'value',
            title: 'label',
            children: 'children'
          }
        },
        {
          label: '归属公司',
          prop: 'projectCompany'
        },
        {
          label: '项目类型',
          prop: 'projectType',
          search: true,
          hide: true,
          type: 'select',
          dic: projectTypeList
        },
        {
          label: '项目类型',
          prop: 'projectType'
        },
        {
          label: '楼宇编号',
          prop: 'code'
        },
        {
          label: '楼宇名称',
          prop: 'name'
        },
        {
          label: '房源⾯积(㎡)',
          prop: 'area'
        },
        {
          label: '操作',
          prop: 'menu',
          width:150
        }
      ]
    }
  });
  const showAddModal = (record?: RowData) => {
    page.addModalVisible = true;
    page.title = record?.id ? '修改楼宇' : '新建楼宇';
    page.id = record?.id;
  };
  const onDelete = async (record: RowData) => {
    await cbdApiProjectBuildingDeleteIdPost({ id: record.id! + '' });
    Message.success('操作成功');
    page.refresh = true;
  };
  const onDetail = (record?: RowData) => {
    page.detailVisible = true;
    page.id = record?.id;
  };
  const onUpdate = () => {
    page.addModalVisible = true;
  };
  const onRefresh = () => {
    page.refresh = true;
    page.reQuery = !page.reQuery;
  };
</script>
