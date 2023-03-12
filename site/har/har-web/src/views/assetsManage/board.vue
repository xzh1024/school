<template>
  <div class="bulletin-board">
    <i-form
      v-model="form"
      :options="formOptions"
      class="single-form"
      @submit="submit"
      @reset="reset"
    >
      <template #submitIcon>
        <slot name="submitIcon">
          <icon-search />
        </slot>
      </template>
    </i-form>
    <i-floor-table
      ref="floorTableRef"
      has-detail
      :config="tableConfig"
      :data="tableData"
      @detail="handleDetail"
    />
    <i-drawer
      v-model="visible"
      show-log
      :title="currentItem.doorPlate"
      :log-options="{
        modeId: currentItem.estateId,
        logUrl: cbdApiProjectSysOptPageOptListPost,
        mode: 'cbd_assets_estate_change_detail'
      }"
    >
      <a-card title="基本信息" class="w100">
        <i-detail-item :data="shopBaseInfo" />
      </a-card>
      <card-table
        class="w100"
        title="正式合同列表"
        :contract-type="2"
        :estate-id="shopBaseInfo.id"
        :options="contractTableOptions"
        :table-data="cbdApiProjectEstateContractListGet"
      />
      <card-table
        class="w100"
        title="意向合同列表"
        :contract-type="1"
        :estate-id="shopBaseInfo.id"
        :options="contractTableOptions"
        :table-data="cbdApiProjectEstateContractListGet"
      />
      <card-table
        class="w100"
        title="铺位调整单"
        :options="shopTableOptions"
        :table-data="shopTableData"
      />
      <template #footer>
        <a-space>
<!--          <a-button type="primary">添加正式合同</a-button>-->
<!--          <a-button type="primary">添加意向合同</a-button>-->
<!--          <a-button type="primary">添加招商计划</a-button>-->
          <a-button type="primary" @click="visible = false">返回</a-button>
        </a-space>
      </template>
    </i-drawer>
  </div>
</template>

<script setup lang="ts">
  import IDrawer from '@/components/drawer/drawer.vue';
  import IFloorTable from '@/components/i-floor-table/index.vue';
  import { computed, onMounted, reactive, ref } from 'vue';
  import IDetailItem from './location-config/__components__/detail-item.vue';
  import CardTable from './__components__/CardTable.vue';
  import { useFilter } from './hooks/common';
  import {
    cbdApiProjectEstateReviewBoardGet,
    cbdApiProjectSysOptPageOptListPost,
    cbdApiProjectEstateDetailEstateIdGet,
    cbdApiProjectEstateContractListGet
  } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import type {
    ConfigItemType,
    TableItemType
  } from '@/components/i-floor-table/types';
  import { useTable } from './hooks/useTable';
  import { randomColor } from '@/utils/print';
  import { getActiveProjectId, setActiveProject } from '@/utils';
  const { contractTableOptions, shopTableOptions } = useTable();

  const form = reactive<{
    projectId: string | number;
    buildingId: string;
    buildFloorId: string;
    categoryId: string[];
  }>({
    projectId: '',
    buildingId: '',
    buildFloorId: '',
    categoryId: []
  });
  const {
    projectList,
    getProjectList,

    buildingList,
    getBuildingList,

    floorList,
    getFloorList,

    shopTypeList
  } = useFilter(() => {
    form.projectId = getActiveProjectId();
  });

  const formOptions = computed(() => {
    const config = {
      search: {
        projectId: '',
        buildingId: '',
        buildFloorId: '',
        categoryId: ''
      },
      submitText: '搜索',
      menuSpan: 24,
      columns: [
        {
          label: '项目名称：',
          prop: 'projectId',
          type: 'select',
          dic: projectList.value,
          options: {
            allowSearch: true,
            allowClear: false
          },
          on: {
            change(v: string) {
              form.projectId = v;
              getBuildingList(v);
              if (v) {
                setActiveProject(v);
              }
            }
          }
        },
        {
          label: '楼宇：',
          prop: 'buildingId',
          type: 'select',
          dic: buildingList.value,
          options: {
            allowSearch: true
          },
          on: {
            change(v: string) {
              form.buildingId = v;
              getFloorList(v);
              if (!v) {
                form.buildFloorId = '';
              }
            }
          }
        },
        {
          label: '楼层：',
          prop: 'buildFloorId',
          type: 'select',
          dic: floorList.value,
          options: {
            allowSearch: true
          }
        },
        {
          label: '铺位类型：',
          prop: 'categoryId',
          type: 'select',
          options: {
            'multiple': true,
            'max-tag-count': 3,
            'allowSearch': true
          },
          dic: shopTypeList
        }
      ]
    };
    return config;
  });

  const visible = ref(false);
  const currentItem = ref<{
    doorPlate?: string;
    estateId?: string;
  }>({});
  const shopBaseInfo = ref<any>({
    id: '',
    projectName: '',
    buildingName: '',
    floorName: '',
    doorPlate: '',
    categoryName: '',
    acreage: '',
    useAcreage: '',
    bottomDayRent: '',
    bottomMonthRent: '',
    datumDayRent: '',
    datumMonthRent: '',
    remark: '',
    attachments: []
  });
  const shopTableData = ref<any>([]);
  const [getDetail] = useFuncProxy(async (id: string) => {
    const d = await cbdApiProjectEstateDetailEstateIdGet({
      estateId: id
    });
    shopBaseInfo.value = d.basic;
    shopTableData.value = d.changeRecord;
    visible.value = true;
    console.log('shopBaseInfo: ', shopBaseInfo);
  });

  async function handleDetail(item: any) {
    currentItem.value = item;
    getDetail(item.estateId);
    getTableList();
  }

  function submit(data: any) {
    if (!data.errors) {
      form.projectId = data.values.projectId;
      form.buildingId = data.values.buildingId;
      form.buildFloorId = data.values.buildFloorId;
      form.categoryId = data.values.categoryId;
      getTableList();
    }
  }
  async function reset(done: (bool: boolean) => void) {
    done(true);
    initSearch();
    await getFloorList();
    await getTableList();
  }

  const tableData = ref<TableItemType>([]);
  const tableConfig = ref<ConfigItemType[]>([]);

  const [getTableList] = useFuncProxy(async () => {
    const d = await cbdApiProjectEstateReviewBoardGet({
      projectId: form.projectId as string,
      buildingId: form.buildingId,
      buildFloorId: form.buildFloorId,
      categoryIds: form.categoryId.join(','),
      source: '2'
    });
    tableConfig.value =
      d.categoryStatistics?.map((item) => {
        return {
          symbol: item.symbol,
          label: item.categoryName,
          value: item.count,
          color: item.color || randomColor()
        };
      }) || [];
    tableData.value = d.floors || [];
  });

  function initSearch() {
    if (!form.projectId) {
      // @ts-ignore
      form.projectId = projectList.value[0]?.value || '';
    }
    getBuildingList(form.projectId);
  }

  onMounted(async () => {
    await getProjectList();
    initSearch();
    getTableList();
  });
</script>

<style lang="less" scoped>
  .single-form {
    :deep(.card) {
      margin-bottom: 0;
    }
  }

  .w100 {
    width: 100%;

    & + .w100 {
      margin-top: 16px;
    }

    :deep(.margin-bottom-xs) {
      display: none;
    }
  }
</style>
