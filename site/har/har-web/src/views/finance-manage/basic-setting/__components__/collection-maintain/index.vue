<template>
  <div class="warps">
    <div class="top-btn">
      <a-button
        type="primary"
        :pagination="false"
        table-layout-fixed
        sticky-header
        @click="addClick"
        >添加</a-button
      >
    </div>
    <div v-if="itemsData && itemsData.length" class="lists">
      <div v-for="(items, idx) in itemsData" :key="idx" class="list-warp">
        <div class="cost-title">{{ items.backName }}</div>
        <i-table
          :options="optionData"
          :data="items.accountListVos"
          class="tables"
        >
          <template #statusCell="{ record }">
            <div> {{ record.switchs === 0 ? '已停用' : '已启用' }} </div>
          </template>
          <template #menu="{ record }">
            <div class="flex" style="margin-left: -15px;">
              <a-button type="text" @click="view(record)">查阅</a-button>
              <a-button type="text" @click="edit(record)">编辑</a-button>
              <a-popconfirm
                content="数据删除后无法恢复，是否删除？"
                @ok="onDelete(record.id)"
              >
                <a-button type="text">删除</a-button>
              </a-popconfirm>
            </div>
          </template>
        </i-table>
      </div>
    </div>
    <a-empty v-else></a-empty>
    <add-draw
      v-if="addKindsVisible"
      :id="activeId"
      v-model:drawer-visible="addKindsVisible"
      :drawer-type="drawType"
      :project-id="Number(projectId)"
      @submit-success="getSettingList"
    />
  </div>
</template>
<script lang="ts" setup>
  import { Ref, reactive, ref, watch } from 'vue';
  import AddDraw from './add-draw.vue';
  import ITable from '@/components/i-table/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectMisCollectionListPost,
    CbdApiProjectMisCollectionListPostResponse,
    cbdApiProjectMisCollectionDeleteGet
  } from '@/api';
  import { Message } from '@arco-design/web-vue';
  type RowData = Required<
    Required<CbdApiProjectMisCollectionListPostResponse>[0]
  >['accountListVos'][0];
  const props = defineProps({
    projectId: {
      type: String,
      default: ''
    }
  });
  const activeId = ref('');
  const addKindsVisible = ref(false);
  const optionData = reactive({
    indexTitle: '序号',
    index: true,
    submitText: '搜索',
    tableCard: true,
    pageShow: false,
    menuOptions: {
      align: 'left'
    },
    columns: [
      {
        label: '编号',
        prop: 'code'
      },
      {
        label: '账户名称',
        prop: 'accountName'
      },
      {
        label: '账户号',
        prop: 'backAccount',
      },
      {
        label: '费用项目',
        prop: 'expenseTypeName',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '状态',
        prop: 'status'
      }
    ]
  });
  const itemsData = ref<CbdApiProjectMisCollectionListPostResponse>([]);

  const [getSettingList] = useFuncProxy(async () => {
    itemsData.value = await cbdApiProjectMisCollectionListPost({
      projectId: Number(props.projectId)
    });

    // projectList.value = await cbdApiProjectCommonProjectSelectListGet({});
    // selectProjectId.value = projectList.value[0].value;
  });
  const drawType: Ref = ref(1);

  const addClick = () => {
    drawType.value = 1;
    activeId.value = '';
    addKindsVisible.value = true;
  };
  const view = (value: RowData) => {
    activeId.value = String(value.id!);
    drawType.value = 3;
    addKindsVisible.value = true;
  };
  const edit = (value: RowData) => {
    activeId.value = String(value.id!);
    drawType.value = 2;
    addKindsVisible.value = true;
  };
  const onDelete = async (id: string) => {
    try {
      await cbdApiProjectMisCollectionDeleteGet({ id: id });
      getSettingList();
      Message.success('操作成功');
    } catch (error) {
      console.log(error);
    }
  };
  watch(
    () => props.projectId,
    (v) => {
      if (v) getSettingList();
    },
    { immediate: true }
  );
</script>
<style lang="less" scoped>
  .warps {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .top-btn {
      margin: 16px;
    }
    .lists {
      max-height: 700px;
      overflow: auto;
      background: #f7f7f7;
    }
  }
  .list-warp {
    margin-bottom: 16px;
    width: 100%;
    background: #fff;
    :deep(.i-card) {
      padding: 0px;
    }
    .cost-title {
      padding: 16px;
      font-size: 16px;
      font-weight: 500;
    }
    .tables {
      padding: 16px;
      padding-top: 0px;
    }
  }
</style>
