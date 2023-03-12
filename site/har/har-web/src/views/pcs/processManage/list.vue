<template>
  <div class="process-page">
    <div class="menu">
      <a-menu v-model:selected-keys="menuActive" @menu-item-click="menuSelect">
        <a-menu-item key="all">全部</a-menu-item>
        <a-menu-item v-for="item in projectListData" :key="`${item.value}`">
          {{ item.label }}
        </a-menu-item>
      </a-menu>
    </div>

    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      v-permission="['web:project:model:list']"
      class="page-table"
      :options="options"
      :api="flowableEngineProjectModelPageGet"
      @reset="tableFormReset"
    >
      <template #menu="{ record }">
        <a-button
          v-permission="['web:project:model:info', 'web:project:model:update']"
          type="text"
          @click="handleEdit(record)"
        >
          编辑
        </a-button>
        <!-- <a-button v-permission="['web:project:model:delete']" type="text" @click="handleView(record)">删除</a-button> -->
      </template>
      <template #approvalTypeCell="{ record }">
        {{ record.approvalTypeName }}
      </template>

      <template #header>
        <a-button
          v-permission="['web:project:model:add']"
          type="primary"
          @click="onAdd"
        >
          新增
        </a-button>
      </template>
    </i-table>

    <add-process v-model="visible" :row="currentItem" @reset="reset" />
    <add-process-category
      v-model="addVisible"
      :project-list="projectListData"
      :category-list="categoryListData"
      @reset="reset"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    flowableEngineCommonApprovalTypeSelectGet,
    flowableEngineCommonProjectSelectGet,
    flowableEngineProjectModelPageGet
  } from '@/api/flowable-engine';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import AddProcess from './__components__/add-process.vue';
  import AddProcessCategory from './__components__/add-process-category.vue';
  import { useAdd } from './hooks/useAdd';
  const { visible, handleAdd, handleEdit, handleView, currentItem } = useAdd();
  // 删除
  function handleDelete(id: number) {
    Modal.open({
      title: '删除确认',
      content: '请确认是否删除已选择保修信息？',
      onOk: async () => {
        // await cbdApiProjectEnergyConsumeInvoiceRemoveIdDelete({
        //   id: String(id)
        // });
        Message.success('操作成功!');
        page.refresh = true;
      }
    });
  }

  const page = reactive({
    search: {
      projectId: '',
      categoryCode: '',
      processName: ''
    },
    refresh: false
  });

  const options = computed(() => {
    return {
      indexTitle: '序号',
      index: true,
      submitText: '查询',
      tableCard: true,
      menuSpan: 18,
      menuOptions: {
        width: 100
      },
      columns: [
        {
          label: '项目名称',
          prop: 'projectName'
        },
        // {
        //   label: '流程名称',
        //   search: true,
        //   prop: 'processName',
        //   hide: true,
        //   options: {
        //     'max-length': 20
        //   }
        // },
        {
          label: '审批类型',
          search: true,
          prop: 'approvalType',
          type: 'select',
          dic: categoryListData.value
        },
        {
          label: '流程数量',
          prop: 'modelNum'
        },
        {
          label: '最后设置时间',
          prop: 'updateTime'
        },
        {
          label: '设置人',
          prop: 'createBy'
        }
      ]
    };
  });

  function tableFormReset() {}

  const menuActive = ref(['all']);
  const projectListData = ref<{ label: string; value: string }[]>([]);

  const [getProjectList] = useFuncProxy(async () => {
    const d = await flowableEngineCommonProjectSelectGet();
    // @ts-ignore
    projectListData.value = d || [];
  });

  const categoryListData = ref<{ label: string; value: string }[]>([]);
  const [getCategoryList] = useFuncProxy(async () => {
    const d = await flowableEngineCommonApprovalTypeSelectGet();
    // @ts-ignore
    categoryListData.value = d;
  });

  function menuSelect(key: string) {
    // console.log(key, menuActive.value);
    page.search.projectId = key === 'all' ? '' : key;
    page.refresh = true;
  }

  onMounted(() => {
    getProjectList();
    getCategoryList();
  });

  // 新增
  function reset() {
    page.refresh = true;
  }

  const addVisible = ref(false);
  function onAdd() {
    addVisible.value = true;
  }
</script>

<style lang="less" scoped>
  .process-page {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
  }

  .menu {
    width: 200px;
    margin-right: 20px;
    height: 100%;
    background-color: #ffffff;
  }

  .page-table {
    flex: 1;
    height: 100%;
  }
</style>
