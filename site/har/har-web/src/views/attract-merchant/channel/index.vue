<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="options"
      :api="cbdApiProjectInvestChannelPageGet"
    >
      <template #header>
        <a-button
          v-permission="['invest:channel:save']"
          type="primary"
          @click="showAddModal({})"
          >添加</a-button
        >
      </template>
      <template #typeCell="{ record }">{{
        valueFindLabel(channelTypeList, record.type)
      }}</template>
      <template #menu="{ record }">
        <div class="flex" style="margin-left: -15px">
          <a-button
            v-permission="['invest:channel:update']"
            type="text"
            @click="showAddModal(record)"
            >编辑</a-button
          >
          <a-button
            v-permission="['invest:channel:info']"
            type="text"
            @click="onDetail(record)"
            >查看</a-button
          >
          <a-popconfirm
            v-permission="['invest:channel:delete']"
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
        width: '60vw'
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
  import { ref, reactive, computed, watch, onMounted } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import AddModal from './__components__/add.vue';
  import Detail from './__components__/detail.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    type CbdApiProjectBuildingPageGetResponse,
    cbdApiProjectCommonInvestChannelListGet,
    CbdApiProjectCommonInvestChannelListGetResponse,
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectInvestChannelDeleteIdGet,
    cbdApiProjectInvestChannelPageGet
  } from '@/api';
  import { channelTypeList } from '@/utils/dic';
  import {
    getActiveProjectId,
    setActiveProject,
    valueFindLabel
  } from '@/utils';
  type RowData = Required<CbdApiProjectBuildingPageGetResponse>['rows'][0];
  const channelList = ref<CbdApiProjectCommonInvestChannelListGetResponse>([]);
  const page = reactive<{
    addModalVisible: boolean;
    detailVisible: boolean;
    reQuery: boolean;
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
      projectIdList: ''
    },
    title: ''
  });
  const options = computed(() => {
    return {
      indexTitle: '序号',
      index: true,
      menuOptions: {
        align: 'left'
      },
      columns: [
        {
          label: '项目名称',
          prop: 'projectIdList',
          search: true,
          hide: true,
          type: 'select',
          options: {
            allowClear: false,
            onChange(v: any) {
              setActiveProject(v);
              getChannelData(v);
            }
          },
          dicRequest: cbdApiProjectCommonProjectSelectListGet
        },
        {
          label: '项目名称',
          prop: 'projectName'
        },
        {
          label: '渠道类型',
          prop: 'type',
          search: true,
          type: 'select',
          dic: channelTypeList
        },
        {
          label: '渠道编号',
          prop: 'code'
        },
        {
          label: '渠道名称',
          prop: 'name',
          type: 'select',
          search: true,
          dic: channelList,
          options: {
            allowSearch: true,
            maxLength: 100
          }
        },
        {
          label: '主要负责人',
          prop: 'principalName'
        },
        {
          label: '联系⽅式',
          prop: 'principalPhone'
        }
      ]
    };
  });
  const showAddModal = (record?: RowData) => {
    page.addModalVisible = true;
    page.title = record?.id ? '编辑渠道' : '新增渠道';
    page.id = record?.id;
  };
  const onDelete = async (record: RowData) => {
    await cbdApiProjectInvestChannelDeleteIdGet({ id: record.id! + '' });
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
  const [getChannelData] = useFuncProxy(async (v: string) => {
    channelList.value = await cbdApiProjectCommonInvestChannelListGet({
      projectId: v
    });
  });
  onMounted(() => {
    page.search.projectIdList = getActiveProjectId();
  });
  watch(
    () => page.search.projectIdList,
    (v) => {
      getChannelData(v);
    },
    { immediate: true }
  );
</script>
<style scoped lang="less"></style>
