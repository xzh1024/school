<template>
  <div>
    <i-table
      v-model="search"
      :options="options"
      :api="svcWebActivityStatPagePost"
      @reset="onReset"
    >
      <template #menuCell="{ record }">
        <a-button type="text" @click="onViewDetail(record)">查看</a-button>
      </template>
      <template #sceneCell="{ record }">
        {{ valueFindLabel(cardActivitySceneList, record.scene) }}
      </template>
      <template #statusCell="{ record }">
        <div :class="{ red: record.status === 2 }">
          {{ valueFindLabel(cardActivityStatusList, record.status) }}
        </div>
      </template>
      <template #typeCell="{ record }">
        {{ valueFindLabel(cardActivityTypeList, record.type) }}
      </template>
    </i-table>
    <detail
      v-if="page.showDetail"
      :id="String(page.id)"
      v-model="page.showDetail"
    />
  </div>
</template>

<script setup lang="ts">
  import ITable from '@/components/i-table/index.vue';
  import Detail from './__components__/detail.vue';
  import { computed, onMounted, reactive, ref } from 'vue';
  import {
    svcWebActivityStatPagePost,
    type SvcWebActivityStatPagePostRequest,
    type SvcWebActivityStatPagePostResponse,
    // SvcWebCommonActivitySelectNamePostResponse,
    // svcWebCommonActivitySelectNamePost,
    // svcWebCommonActivitySelectCodePost,
    // SvcWebCommonActivitySelectCodePostResponse,
    svcWebCommonActivitySelectCodeNamePost,
    SvcWebCommonActivitySelectCodeNamePostResponse
  } from '@/api/svc-web';
  import {
    cardActivitySceneList,
    cardActivityTypeList,
    cardActivityStatusList
  } from '@/utils/dic';
  import { svcProjectDropList, getSvcProjectDrop } from '@/utils/svcCommon';
  import { valueFindLabel, formatPrice } from '@/utils';

  type RowData = Required<SvcWebActivityStatPagePostResponse>['rows'][0];
  const search = ref<Partial<SvcWebActivityStatPagePostRequest>>({
    // projectId: getActiveProjectId() as unknown as string,
    projectId: undefined,
    activityId: undefined,
    scene: '',
    type: '',
    startDate: '',
    endDate: '',
    status: undefined
  });
  const activityList = ref<SvcWebCommonActivitySelectCodeNamePostResponse>([]);
  // const activityCodeList = ref<SvcWebCommonActivitySelectCodePostResponse>([]);
  const page = reactive<{
    id?: number;
    showDetail: boolean;
  }>({
    id: undefined,
    showDetail: false
    // projectId: getActiveProjectId()
  });
  const onReset = () => {
    search.value.startDate = undefined;
    search.value.endDate = undefined;
  };
  const options = computed(() => {
    return {
      indexTitle: '序号',
      index: true,
      menu: false,
      menuSpan: 12,
      menuOtherOptions: {
        scroll: {
          x: '140%'
        }
      },
      columns: [
        {
          label: '项目',
          prop: 'projectId',
          search: true,
          hide: true,
          type: 'select',
          dic: svcProjectDropList,
          options: {
            allowSearch: true,
            onChange(v: any) {
              search.value.projectId = v;
            }
          }
        },
        {
          label: '项目名称',
          prop: 'projectName',
          width: 120,
          align: 'center',
          ellipsis: true,
          tooltip: true
        },
        // {
        //   label: '活动编号',
        //   prop: 'code',
        //   search: true,
        //   type: 'select',
        //   dic: activityCodeList.value,
        //   options: {
        //     allowSearch: true,
        //     // multiple: true,
        //     filterOption: false,
        //     placeholder: '请输入活动编号搜索',
        //     onSearch: async (v: any) => {
        //       activityCodeList.value = await svcWebCommonActivitySelectCodePost(
        //         {
        //           projectId: Number(search.value.projectId) || undefined,
        //           codeSearchKey: v
        //         }
        //       );
        //     }
        //   }
        // },
        {
          label: '活动名称',
          prop: 'name',
          width: 120,
          align: 'center',
          ellipsis: true,
          tooltip: true
        },
        {
          label: '活动编号',
          prop: 'code',
          width: 120,
          align: 'center',
          ellipsis: true,
          tooltip: true
        },
        {
          label: '活动名称/编号',
          prop: 'activityId',
          type: 'select',
          search: true,
          hide: true,
          dic: activityList.value,
          options: {
            allowSearch: true,
            // multiple: true,
            filterOption: false,
            searchDelay: 1000,
            placeholder: '请输入关键字进行匹配',
            onSearch: async (v: string) => {
              activityList.value = await svcWebCommonActivitySelectCodeNamePost(
                {
                  projectId: Number(search.value.projectId) || undefined,
                  codeSearchKey: v?.trim()
                }
              );
            },
            onBlur() {
              activityList.value = [];
            }
          }
        },
        {
          label: '活动场景',
          prop: 'scene',
          width: 120,
          align: 'center',
          type: 'select',
          search: true,
          dic: cardActivitySceneList
        },
        {
          label: '活动类型',
          prop: 'type',
          type: 'select',
          width: 120,
          align: 'center',
          dic: cardActivityTypeList,
          search: true
        },
        {
          label: '活动时间',
          prop: 'time',
          search: true,
          hide: true,
          type: 'dateRange',
          options: {
            showTime: true,
            onChange(v: any) {
              const [startDate = '', endDate = ''] = v;
              search.value = { ...search.value, startDate, endDate };
            }
          }
        },
        {
          label: '开始时间',
          prop: 'startTime',
          width: 200,
          align: 'center',
          ellipsis: true,
          tooltip: true
        },
        {
          label: '结束时间',
          prop: 'endTime',
          width: 200,
          align: 'center',
          ellipsis: true,
          tooltip: true
        },
        {
          label: '状态',
          prop: 'status',
          type: 'select',
          width: 120,
          align: 'center',
          search: true,
          dic: cardActivityStatusList
        },
        {
          label: '活动预算（¥）',
          width: 120,
          align: 'center',
          formatter: (el: RowData) => formatPrice(el.budget),
          prop: 'budget'
        },
        {
          label: '已用预算（¥）',
          width: 120,
          align: 'center',
          formatter: (el: RowData) => formatPrice(el.usedBudget),
          prop: 'usedBudget'
        },
        {
          label: '剩余预算（¥）',
          width: 120,
          align: 'center',
          formatter: (el: RowData) => formatPrice(el.balance),
          prop: 'balance'
        },
        {
          label: '活动参与次数',
          width: 120,
          align: 'center',
          prop: 'number'
        },
        {
          label: '操作',
          prop: 'menu',
          width: 120,
          align: 'center',
          fixed: 'right'
        }
      ]
    };
  });
  const onViewDetail = (record: RowData) => {
    page.id = record.id;
    page.showDetail = true;
  };
  onMounted(() => {
    getSvcProjectDrop();
  });
</script>

<style lang="less" scoped>
  .red {
    color: #69af0f;
  }
</style>
