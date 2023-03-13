<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="options"
      :api="cbdApiProjectEstateListGet"
    >
      <template #header>
        <a-space>
          <a-button type="primary" @click="showAddModal({})">添加铺位</a-button>
          <a-button type="primary" @click="showUploadModal">批量添加</a-button>
        </a-space>
      </template>
      <template #statusCell="{ record }">
        {{ valueFindLabel(locationStatusList, record.status) }}
      </template>
      <template #assetsStatusCell="{ record }">
        {{ valueFindLabel(locationAssetsStatusList, record.assetsStatus) }}
      </template>
      <template #menuCell="{ record }">
        <div class="flex" style="margin-left: -15px;">
          <a-button
            v-if="record.assetsStatus !== 3"
            type="text"
            @click="showAddModal(record)"
            >编辑</a-button
          >
          <a-button type="text" @click="onDetail(record)">查看</a-button>
          <a-popconfirm
            v-if="!record.change && record.assetsStatus !== 3"
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
    />
    <upload
      v-if="page.uploadVisible"
      v-model="page.uploadVisible"
      title="批量导入"
      :options="{
        width: '50vw',
        escToClose: false,
        maskClosable: false
      }"
      @refresh="page.refresh = true"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Detail from './__components__/detail.vue';
  import AddModal from './__components__/add.vue';
  import Upload from './__components__/upload.vue';
  import {
    getActiveProjectId,
    setActiveProject,
    valueFindLabel
  } from '@/utils';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectEstateListGet,
    type CbdApiProjectBuildingPageGetResponse,
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectCommonBuildingListSelectGet,
    cbdApiProjectCommonBuildingFloorListSelectGet,
    CbdApiProjectCommonBuildingListSelectGetResponse,
    CbdApiProjectCommonBuildingFloorListSelectGetResponse,
    cbdApiProjectEstateDelEstateIdPut
  } from '@/api';
  import { locationAssetsStatusList, locationStatusList } from '@/utils/dic';
  import useDictData from '@/hooks/useDictData';
  type RowData = Required<CbdApiProjectBuildingPageGetResponse>['rows'][0];

  const buildingData = ref<CbdApiProjectCommonBuildingListSelectGetResponse>(
    []
  );
  const floorData = ref<CbdApiProjectCommonBuildingFloorListSelectGetResponse>(
    []
  );
  const [locationTypes] = useDictData('00005');
  const page = reactive<{
    addModalVisible: boolean;
    detailVisible: boolean;
    uploadVisible: boolean;
    reQuery: boolean;
    refresh: boolean;
    search: Recordable;
    title: string;
    id?: number;
  }>({
    addModalVisible: false,
    detailVisible: false,
    uploadVisible: false,
    reQuery: false,
    refresh: false,
    id: undefined,
    search: {
      projectId: getActiveProjectId()
    },
    title: ''
  });
  const options = computed(() => {
    return {
      indexTitle: '序号',
      index: true,
      menu: false,
      menuOtherOptions: {},
      menuSpan: 6,
      columns: [
        {
          label: '项目名称',
          width: 140,
          prop: 'projectName'
        },
        {
          label: '项目名称',
          prop: 'projectId',
          search: true,
          hide: true,
          type: 'select',

          dicRequest: cbdApiProjectCommonProjectSelectListGet,
          options: {
            allowSearch: true,
            allowClear: false,
            onChange: async (v: any) => {
              if (v) {
                getBuildingData(v);
                setActiveProject(v);
              } else {
                // 清空时 干掉下级数据
                buildingData.value = [];
                floorData.value = [];
              }
            }
          }
        },
        {
          label: '铺位号',
          width: 150,
          prop: 'doorPlate'
        },
        {
          label: '业务状态',
          width: 120,
          prop: 'status'
        },
        {
          label: '资产状态',
          width: 120,
          prop: 'assetsStatus'
        },
        {
          label: '楼宇',
          prop: 'buildingId',
          search: true,
          hide: true,
          dic: buildingData.value,
          type: 'select',
          options: {
            allowClear: false,
            onChange: async (v: any) => {
              if (v) {
                getFloorData(v);
              } else {
                // 清空时 干掉下级数据
                floorData.value = [];
              }
            }
          }
        },
        {
          label: '楼层',
          prop: 'floorId',
          search: true,
          hide: true,
          type: 'select',
          dic: floorData.value
        },
        {
          label: '铺位类型',
          width: 130,
          prop: 'categoryName'
        },
        {
          label: '铺位类型',
          prop: 'categoryIds',
          search: true,
          hide: true,
          type: 'select',
          dic: locationTypes,
          options: {
            multiple: true
          }
        },
        {
          label: '业务状态',
          prop: 'statusList',
          search: true,
          hide: true,
          type: 'select',
          dic: locationStatusList,
          options: {
            multiple: true
          }
        },
        {
          label: '资产状态',
          prop: 'assetsStatusList',
          search: true,
          hide: true,
          type: 'select',
          dic: locationAssetsStatusList,
          options: {
            multiple: true
          }
        },
        {
          label: '楼宇',
          width: 120,
          prop: 'buildingName'
        },
        {
          label: '楼层',
          width: 100,
          prop: 'floorName'
        },
        {
          label: '铺位号',
          prop: 'doorPlate',
          search: true,
          hide: true
        },
        {
          label: '建筑⾯积(㎡)',
          prop: 'acreage',
          width: 120
        },
        {
          label: '使⽤⾯积(㎡)',
          prop: 'useAcreage',
          width: 120
        },
        {
          label: '操作',
          prop: 'menu',
          width: 130
        }
      ]
    };
  });
  const showAddModal = (record?: RowData) => {
    page.addModalVisible = true;
    page.id = record?.id;
  };
  const showUploadModal = () => {
    page.uploadVisible = true;
  };
  const onDelete = async (record: RowData) => {
    await cbdApiProjectEstateDelEstateIdPut({ estateId: `${record.id!}` });
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
  const [getBuildingData] = useFuncProxy(async (v: string) => {
    buildingData.value = await cbdApiProjectCommonBuildingListSelectGet({
      projectId: v
    });
  });
  const [getFloorData] = useFuncProxy(async (v: string) => {
    floorData.value = await cbdApiProjectCommonBuildingFloorListSelectGet({
      buildingId: v
    });
  });
  watch(
    () => page.search.projectId,
    (v) => {
      buildingData.value = [];
      page.search.buildingId = '';
      page.search.floorId = '';
      getBuildingData(v);
    },
    { immediate: true }
  );
  watch(
    () => page.search.buildingId,
    (v) => {
      page.search.floorId = '';
      floorData.value = [];
      if (v) {
        getFloorData(v);
      }
    }
  );
</script>
<style scoped lang="less"></style>
