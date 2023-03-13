<template>
  <div>
    <i-table
      v-model="search"
      v-model:refresh-now="page.refresh"
      :options="options"
      :api="cbdApiProjectInvestPlanListGet"
    >
      <template #header>
        <a-button
          v-permission="['invest:plan:draft']"
          type="primary"
          @click="showAddModal()"
          >添加</a-button
        >
      </template>
      <template #statusCell="{ record }">
        {{ valueFindLabel(attractPlanStatusList, record.status) }}
      </template>
      <template #merchantNameCell="{ record }">
        {{ handleArrToString(record.merchantName) }}
      </template>
      <template #optionCell="{ record }">
        <div class="flex" style="margin-left: -15px">
          <a-button
            v-if="record.isModify && record.status !== 2"
            v-permission="['invest:plan:save']"
            type="text"
            @click="showAddModal(record)"
            >编辑</a-button
          >
          <a-button type="text" @click="onDetail(record)">查看</a-button>
          <a-popconfirm
            v-if="record.isDelete"
            content="数据删除后无法恢复，是否删除？"
            @ok="onDelete(record)"
          >
            <a-button v-permission="['invest:plan:delete']" type="text"
              >删除</a-button
            >
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
        width: '60vw',
        unmountOnClose: true,
        escToClose: false,
        closable: false,
        maskClosable: false
      }"
      @refresh="onRefresh"
    />
    <detail
      v-if="page.detailVisible"
      :id="page.id"
      v-model="page.detailVisible"
      :refresh="page.reQuery"
      @update="onUpdate"
      @refresh="onRefresh"
    ></detail>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onMounted } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import AddModal from './__components__/add.vue';
  import Detail from './__components__/detail.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    attractMerchantStatusList,
    attractPlanStatusList
  } from '@/utils/dic';
  import { projectList, getProjectListData } from '../__components__/common';
  import {
    valueFindLabel,
    handleArrToString,
    getActiveProjectId,
    setActiveProject,
    formatPrice
  } from '@/utils';
  import {
    cbdApiProjectCommonAssetsSelectListGet,
    CbdApiProjectCommonAssetsSelectListGetResponse,
    cbdApiProjectCommonInvestChannelListGet,
    CbdApiProjectCommonInvestChannelListGetResponse,
    cbdApiProjectCommonMerchantListGet,
    CbdApiProjectCommonMerchantListGetResponse,
    cbdApiProjectInvestPlanDeleteIdDelete,
    cbdApiProjectInvestPlanListGet,
    type CbdApiProjectInvestPlanListGetResponse
  } from '@/api';
  type RowData = Required<CbdApiProjectInvestPlanListGetResponse>['rows'][0];
  const treeData = ref<CbdApiProjectCommonAssetsSelectListGetResponse>([]);
  const merchantList = ref<CbdApiProjectCommonMerchantListGetResponse>([]);
  const channelList = ref<CbdApiProjectCommonInvestChannelListGetResponse>([]);
  const search = ref<Recordable>({
    projectIds: getActiveProjectId()
  });
  const options = computed(() => {
    return {
      indexTitle: '序号',
      index: true,
      menu: false,
      menuSpan: 18,
      columns: [
        {
          label: '项目名称',
          prop: 'projectIds',
          search: true,
          hide: true,
          dic: projectList.value,
          type: 'select',
          options: {
            allowClear: false,
            onChange(v: any) {
              if (v) {
                getMerchantList(v);
                getChannelList(v);
                getDefaultData(v);
                setActiveProject(v);
              } else {
                search.value.estateIds = [];
                search.value.projectIds = [];
                search.value.merchantIds = [];
                search.value.channelIds = [];
              }
            }
          }
        },
        {
          label: '项目名称',
          width: 120,
          prop: 'projectName'
        },
        {
          label: '编号',
          width: 200,
          prop: 'code'
        },
        {
          label: '计划名称',
          width: 150,
          prop: 'planName'
        },
        {
          label: '审批状态',
          prop: 'statusList',
          search: true,
          hide: true,
          type: 'select',
          dic: attractMerchantStatusList
        },
        {
          label: '审批状态',
          width: 100,
          prop: 'status'
        },
        {
          label: '铺位',
          prop: 'estateIds',
          search: true,
          hide: true,
          dic: treeData.value,
          options: {
            loadMore: async (nodeData: any, done: (a: any) => void) => {
              const { level, value } = nodeData;
              const res = await cbdApiProjectCommonAssetsSelectListGet({
                level: level + 1,
                parentValue: value
              });
              nodeData.children = res.map((el: any) => {
                return {
                  ...el,
                  isLeaf: level === 3,
                  key: `${el.level}-${el.value}`
                };
              });
              done(nodeData);
            }
          },
          type: 'cascader'
        },
        {
          label: '铺位',
          width: 150,
          prop: 'estateName'
        },
        {
          label: '商户',
          prop: 'merchantIds',
          search: true,
          hide: true,
          options: {
            multiple: true,
            allowSearch: true
          },
          dic: merchantList.value,
          type: 'select'
        },
        {
          label: '商户',
          width: 150,
          prop: 'merchantName'
        },
        {
          label: '渠道',
          prop: 'channelIds',
          options: {
            multiple: true,
            allowSearch: true
          },
          dic: channelList.value,
          search: true,
          hide: true,
          type: 'select'
        },
        {
          label: '渠道',
          prop: 'channelName',
          width: 120
        },
        {
          label: '开始时间',
          prop: 'startDate',
          width: 140
        },
        {
          label: '结束时间',
          prop: 'endDate',
          width: 140
        },
        {
          label: '操作',
          prop: 'option',
          width: 160,
          align: 'left',
          fixed: 'right'
        }
      ]
    };
  });
  const page = reactive<{
    addModalVisible: boolean;
    detailVisible: boolean;
    reQuery: boolean;
    refresh: boolean;
    title: string;
    id?: number;
  }>({
    addModalVisible: false,
    detailVisible: false,
    reQuery: false,
    refresh: false,
    id: undefined,
    title: ''
  });
  const showAddModal = (record?: RowData) => {
    page.addModalVisible = true;
    page.title = record?.id ? '修改招商计划' : '添加招商计划';
    page.id = record?.id;
  };
  const onDelete = async (record: RowData) => {
    await cbdApiProjectInvestPlanDeleteIdDelete({ id: String(record.id!) });
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
  const [getMerchantList] = useFuncProxy(async (v) => {
    merchantList.value = await cbdApiProjectCommonMerchantListGet({
      projectId: `${v}`
    });
  });
  const [getChannelList] = useFuncProxy(async (v) => {
    channelList.value = await cbdApiProjectCommonInvestChannelListGet({
      projectId: `${v}`
    });
  });
  const [getDefaultData] = useFuncProxy(async (v) => {
    const res = await cbdApiProjectCommonAssetsSelectListGet({
      level: '2',
      parentValue: v
    });
    if (res?.length) {
      treeData.value = res.map((el: any) => {
        return { ...el, key: `${el.level}-${el.value}` };
      });
    }
  });
  onMounted(() => {
    getProjectListData();
  });
  watch(
    () => search.value.projectIds,
    (v) => {
      if (v) {
        getMerchantList(v);
        getChannelList(v);
      }
      getDefaultData(v);
    },
    { immediate: true }
  );
</script>
<style scoped lang="less"></style>
