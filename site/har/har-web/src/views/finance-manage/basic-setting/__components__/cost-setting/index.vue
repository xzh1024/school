<template>
  <div class="warps">
    <div class="top-btn">
      <a-button
        v-permission="['mis:expenseItems:back:save']"
        type="primary"
        :pagination="false"
        table-layout-fixed
        sticky-header
        @click="addClick"
        >添加</a-button
      >
    </div>
    <div class="lists">
      <div v-for="items in itemsData" :key="items.expenseKey" class="list-warp">
        <div class="cost-title">{{ items.expenseKeyName }}</div>
        <i-table :options="optionData" :data="items.details" class="tables">
          <template #menu="{ record }">
            <div
              v-if="record.expenseKey !== '202212270005'"
              class="flex"
              style="margin-left: -15px"
            >
              <a-button type="text" @click="view(record)">查阅</a-button>
              <a-button
                v-permission="['mis:expenseItems:back:save']"
                type="text"
                @click="edit(record)"
                >编辑</a-button
              >
              <a-popconfirm
                content="数据删除后无法恢复，是否删除？"
                @ok="onDelete(record.id)"
              >
                <a-button
                  v-permission="['mis:expenseItems:back:delete']"
                  type="text"
                  >删除</a-button
                >
              </a-popconfirm>
            </div>
          </template>
          <template #printCell="{ record }">
            <div>
              {{ record.print === 1 ? '是' : '否' }}
            </div>
          </template>

          <template #chargingMethodCell="{ record }">
            <div>
              {{
                record.chargingMethod === 1
                  ? '固定费用'
                  : record.chargingMethod === 2
                  ? '抽成费用'
                  : '--'
              }}
            </div>
          </template>
        </i-table>
      </div>
    </div>

    <add-draw
      v-model:drawer-visible="addKindsVisible"
      v-model:form-data="addBrandForm"
      :drawer-type="drawType"
      :project-id="projectId"
      @submit-success="getSettingList"
    />
  </div>
</template>
<script lang="ts" setup>
  import { Ref, onMounted, reactive, ref, watch } from 'vue';
  import AddDraw from './add-draw.vue';
  import ITable from '@/components/i-table/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectMisExpenseItemsListPost,
    cbdApiProjectMisExpenseItemsDeleteGet
  } from '@/api/index';
  import { Message } from '@arco-design/web-vue';
  const props = defineProps({
    projectId: {
      type: [Number, String],
      default: null
    }
  });
  type BrandForm = {
    id?: number | string;
    projectId?: number | string;
    expenseKey?: string;
    expenseCode?: string;
    expenseType?: string;
    print?: number | string;
    chargingMethod?: string;
    // taxCode?: string;
  };
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
        prop: 'expenseCode',
      },
      {
        label: '费用项目',
        prop: 'expenseType',
      },
      {
        label: '收费方式',
        prop: 'chargingMethod',
      },
      {
        label: '是否打印',
        prop: 'print',
      }
    ]
  });
  const itemsData: Ref = ref([]);

  const [getSettingList] = useFuncProxy(async () => {
    if (!props.projectId) return;
    const res: any = await cbdApiProjectMisExpenseItemsListPost({
      projectId: Number(props.projectId)
    });
    itemsData.value = res;
  });
  const drawType: Ref = ref(1);

  const addClick = () => {
    drawType.value = 1;
    addKindsVisible.value = true;
  };
  const view = (value: object) => {
    drawType.value = 3;
    addBrandForm.value = JSON.parse(JSON.stringify(value));
    addKindsVisible.value = true;
  };
  const edit = (value: object) => {
    console.log(value);

    drawType.value = 2;
    addBrandForm.value = JSON.parse(JSON.stringify(value));
    addKindsVisible.value = true;
  };
  const onDelete = async (id: string) => {
    try {
      await cbdApiProjectMisExpenseItemsDeleteGet({ id: id });
      getSettingList();
      Message.success('操作成功');
    } catch (error) {
      console.log(error);
    }
  };

  const addBrandForm = ref<BrandForm>({});

  watch(
    () => props.projectId,
    (v) => {
      if (v) {
        getSettingList();
      }
    },
    {
      deep: true
    }
  );
  onMounted(() => {
    getSettingList();
  });
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
