<template>
  <div>
    <i-table
      v-model="search"
      v-model:refresh-now="page.refresh"
      :options="options"
      :api="svcWebActivityDiscountPageGet"
      @reset="onReset"
    >
      <template #header>
        <a-button type="primary" @click="onAdd()">新增活动</a-button>
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
      <template #menuCell="{ record }">
        <a-popconfirm
          v-if="[2, 3].includes(record.status)"
          :content="`确认${record.status === 2 ? '暂停' : '开始'}吗？`"
          @ok="onPause(record)"
        >
          <a-button type="text">{{
            record.status === 2 ? '暂停' : '开始'
          }}</a-button>
        </a-popconfirm>
        <a-button type="text" @click="onViewDetail(record)">查看</a-button>
      </template>
    </i-table>
    <add
      v-if="page.showAddModal"
      :id="page.id"
      v-model="page.showAddModal"
      @refresh="onRefresh"
    ></add>
    <detail
      v-if="page.showDetail"
      :id="page.id"
      v-model="page.showDetail"
      :refresh="page.detailRefresh"
      @edit="onEdit"
    />
  </div>
</template>

<script setup lang="ts">
  import ITable from '@/components/i-table/index.vue';
  import Detail from './__components__/detail.vue';
  import Add from './__components__/add.vue';
  import { reactive, ref, onMounted, computed } from 'vue';
  import {
    svcWebActivityDiscountPageGet,
    type SvcWebActivityDiscountPageGetResponse,
    svcWebActivityDiscountResumeIdGet,
    svcWebActivityDiscountSuspendIdGet,
    svcWebCommonActivitySelectCodeNamePost,
    SvcWebCommonActivitySelectCodePostResponse
  } from '@/api/svc-web';

  import {
    cardActivitySceneList,
    cardActivityTypeList,
    cardActivityStatusList
  } from '@/utils/dic';
  import { valueFindLabel } from '@/utils';
  import { svcProjectDropList, getSvcProjectDrop } from '@/utils/svcCommon';
  type RowData = Required<SvcWebActivityDiscountPageGetResponse>['rows'][0];
  const search = ref<{
    startDate?: string;
    endDate?: string;
    time?: string[];
    projectId?: number;
  }>({
    startDate: '',
    endDate: ''
    // projectId: getActiveProjectId()
  });
  const activityCodeList = ref<SvcWebCommonActivitySelectCodePostResponse>([]);
  const page = reactive<{
    id?: string;
    showDetail: boolean;
    refresh: boolean;
    detailRefresh: boolean;
    showAddModal: boolean;
  }>({
    id: undefined,
    showDetail: false,
    refresh: false,
    detailRefresh: false,
    showAddModal: false
  });
  const onReset = () => {
    search.value.time = [];
    search.value.startDate = undefined;
    search.value.endDate = undefined;
  };
  const options = computed<Recordable>(() => {
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
          ellipsis: true,
          width: 120,
          tooltip: true
        },
        // {
        //   label: '活动名称',
        //   prop: 'name',
        //   type: 'select',
        //   search: true,
        //   dic: activityList.value,
        //   options: {
        //     fieldNames: {
        //       label: 'label',
        //       value: 'label'
        //     },
        //     allowSearch: true,
        //     // multiple: true,
        //     filterOption: false,
        //     placeholder: '请输入关键字进行匹配',
        //     onSearch: async (v: any) => {
        //       activityList.value = await svcWebCommonActivitySelectNamePost({
        //         projectId: search.value.projectId,
        //         nameSearchKey: v
        //       });
        //     }
        //   }
        // },
        {
          label: '活动名称',
          prop: 'name',
          ellipsis: true,
          width: 120,
          tooltip: true
        },
        {
          label: '活动编号',
          prop: 'code',
          width: 120,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '活动名称/编号',
          prop: 'activityId',
          search: true,
          hide: true,
          type: 'select',
          dic: activityCodeList.value,
          options: {
            allowSearch: true,
            // multiple: true,
            filterOption: false,
            searchDelay: 1000,
            placeholder: '请输入活动编号搜索',
            onSearch: async (v: string) => {
              activityCodeList.value =
                await svcWebCommonActivitySelectCodeNamePost({
                  projectId: Number(search.value.projectId) || undefined,
                  codeSearchKey: v
                });
            },
            onBlur() {
              activityCodeList.value = [];
            }
          }
        },
        {
          label: '活动场景',
          prop: 'scene',
          type: 'select',
          width: 120,
          search: true,
          dic: cardActivitySceneList
        },
        {
          label: '活动类型',
          prop: 'type',
          type: 'select',
          width: 120,
          search: true,
          dic: cardActivityTypeList
        },
        {
          label: '开始时间',
          prop: 'startTime',
          width: 200,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '结束时间',
          prop: 'endTime',
          width: 200,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '状态',
          prop: 'status',
          width: 120,
          type: 'select',
          search: true,
          dic: cardActivityStatusList
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
          label: '创建人',
          width: 120,
          prop: 'createBy'
        },
        {
          label: '创建时间',
          prop: 'createTime',
          width: 200,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '更新人',
          width: 120,
          prop: 'updateBy'
        },
        {
          label: '更新时间',
          prop: 'updateTime',
          width: 180,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '操作',
          prop: 'menu',
          width: 180,
          fixed: 'right'
        }
      ]
    };
  });
  const onViewDetail = (record: RowData) => {
    page.id = String(record.id);
    page.showDetail = true;
  };
  const onRefresh = () => {
    page.refresh = true;
    page.detailRefresh = !page.detailRefresh;
  };
  const onAdd = async () => {
    page.id = undefined;
    page.showAddModal = true;
  };
  const onPause = async (record: RowData) => {
    try {
      // 进行中的
      if (record.status === 2) {
        await svcWebActivityDiscountSuspendIdGet({
          id: String(record.id!)
        });
        // 暂停的
      } else if (record.status === 3) {
        await svcWebActivityDiscountResumeIdGet({
          id: String(record.id!)
        });
      }
      page.refresh = true;
    } catch (e) {
    } finally {
    }
  };
  const onEdit = (id: string) => {
    page.id = id;
    page.showAddModal = true;
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
