<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      v-permission="['web:deployment:page']"
      :options="options"
      :api="flowableEngineDeploymentPageGet"
    >
      <template #versionCell="{ record }">
        <a-tag bordered color="blue">V{{ record.version }}</a-tag>
      </template>

      <template #categoryCell="{ record }">
        {{ processGroupObj[record.category] || record.category }}
      </template>

      <template #deploymentTimeCell="{ record }">
        {{ formatTime(record.deploymentTime) }}
      </template>

      <template #statusCell="{ record }">
        <a-tag bordered color="green">
          {{ modelStatusDic[record.status] }}
        </a-tag>
      </template>

      <template #menu="{ record }">
        <a-button
          v-permission="['web:deployment:page:publish']"
          type="text"
          @click="onVersionManage(record.key)"
        >
          版本管理
        </a-button>
        <a-button
          v-permission="['web:deployment:delete']"
          type="text"
          @click="handleDelete(record.deploymentId)"
        >
          删除
        </a-button>
      </template>
    </i-table>

    <version-manage v-model="visible" :table-key="tableKey" @reset="reset" />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { formatTime } from '@/utils';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    flowableEngineDeploymentPageGet,
    flowableEngineDeploymentDeletePost
  } from '@/api/flowable-engine';
  import VersionManage from './__components__/version-manage.vue';
  import { modelStatusDic } from './dic/index';
  import { useProcessGroup } from './hooks/useProcessGroup';
  const { processGroupList, processGroupObj, getProcessGroupList } =
    useProcessGroup();

  // 删除
  function handleDelete(id: number) {
    Modal.open({
      title: '删除确认',
      content: '请确认是否删除？',
      onOk: async () => {
        await flowableEngineDeploymentDeletePost({
          deployIds: [String(id)]
        });
        Message.success('操作成功!');
        page.refresh = true;
      }
    });
  }

  interface PageConfig {
    search?: any;
    options?: any;
    showEditModal?: boolean;
    showConfigModal?: boolean;
    refresh?: boolean;
    showDetail?: boolean;
    modelTitle?: string;
    menuOtherOptions?: any;
  }

  const page = reactive<PageConfig>({
    search: {
      projectName: '',
      merchantName: '',
      storeName: '',
      type: '',
      date: [],
      startDate: '',
      endDate: ''
    },
    refresh: false
  });

  const options = computed(() => {
    return {
      indexTitle: '序号',
      index: true,
      submitText: '查询',
      tableCard: true,
      menuSpan: 6,
      menuOptions: {
        width: 230
      },
      columns: [
        {
          label: '流程名称',
          search: true,
          prop: 'name',
          options: {
            'max-length': 20
          }
        },
        {
          label: '流程分类',
          search: true,
          prop: 'category',
          type: 'select',
          dic: processGroupList.value
        },
        {
          label: '流程版本',
          prop: 'version'
        },
        {
          label: '状态',
          search: true,
          prop: 'status',
          type: 'select',
          dic: Object.keys(modelStatusDic).map((key) => {
            return {
              label: modelStatusDic[key],
              value: key
            };
          })
        },
        {
          label: '部署时间',
          prop: 'deploymentTime'
        }
      ]
    };
  });

  function reset() {
    page.refresh = true;
  }

  const visible = ref(false);
  const tableKey = ref('');
  function onVersionManage(key: string) {
    tableKey.value = String(key);
    visible.value = true;
  }

  onMounted(() => {
    getProcessGroupList();
  });
</script>

<style scoped></style>
