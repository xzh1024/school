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
      ref="iFloorTableRef"
      has-action
      :config="tableConfig"
      :data="tableData"
      @reset="getTableList"
    />
  </div>
</template>

<script setup lang="ts">
  import { cbdApiProjectEstateReviewBoardGet } from '@/api';
  import IFloorTable from '@/components/i-floor-table/index.vue';
  import {
    ConfigItemType,
    TableItemType
  } from '@/components/i-floor-table/types';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { randomColor } from '@/utils/print';
  import { computed, onMounted, reactive, ref } from 'vue';
  import { useFilter } from './hooks/common';
  import {getActiveProjectId, setActiveProject} from "@/utils";

  const iFloorTableRef = ref();
  const form = reactive<{
    projectId: string | number;
    buildingId: string;
    floorId: string;
    categoryId: string[];
    doorPlate: string;
  }>({
    projectId: '',
    buildingId: '',
    floorId: '',
    categoryId: [],
    doorPlate: ''
  });
  const {
    projectList,
    getProjectList,

    buildingList,
    getBuildingList,

    floorList,
    getFloorList,

    shopTypeList,

    shopStatusData
  } = useFilter(() => {
    form.projectId = getActiveProjectId();
  });
  const formOptions = computed(() => {
    return {
      submitText: '搜索',
      menuSpan: 24,
      columns: [
        {
          label: '项目名称：',
          prop: 'projectId',
          type: 'select',
          dic: projectList.value,
          options: {
            allowClear: false,
            allowSearch: true
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
                form.floorId = '';
              }
            }
          }
        },
        {
          label: '楼层：',
          prop: 'floorId',
          type: 'select',
          dic: floorList.value,
          options: {
            allowSearch: true,
          },
        },
        {
          label: '铺位类型：',
          prop: 'categoryId',
          type: 'select',
          options: {
            'multiple': true,
            'max-tag-count': 3,
            allowSearch: true
          },
          dic: shopTypeList
        },
        // {
        //   label: '状态：',
        //   prop: 'status',
        //   type: 'select',
        //   dic: shopStatusData,
        //   options: {
        //     allowSearch: true
        //   },
        // },
        // {
        //   label: '铺位号：',
        //   prop: 'doorPlate'
        // }
      ]
    };
  });

  function submit(data: any) {
    if (!data.errors) {
      form.projectId = data.values.projectId;
      form.buildingId = data.values.buildingId;
      form.floorId = data.values.floorId;
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
      buildFloorId: form.floorId,
      categoryIds: form.categoryId.join(','),
      source: '1'
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
    iFloorTableRef.value.clearChecked();
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
</style>
