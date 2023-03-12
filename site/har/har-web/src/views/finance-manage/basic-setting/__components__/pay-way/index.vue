<template>
  <div class="warps">
    <div class="top-btn">
      <a-button
        v-permission="['mis:payMethod:back:save']"
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
        <div class="cost-title">{{ items.scenes }}</div>
        <i-table
          :options="optionData"
          :data="items.methodDetails"
          class="tables"
        >
          <template #menu="{ record }">
            <div class="flex" style="margin-left: -15px">
              <a-button type="text" @click="view(record)">查阅</a-button>
              <a-button
                v-permission="['mis:payMethod:back:save']"
                type="text"
                @click="edit(record)"
                >编辑</a-button
              >
              <a-popconfirm
                content="数据删除后无法恢复，是否删除？"
                @ok="onDelete(record.id)"
              >
                <a-button
                  v-permission="['intention:payMethod:delete']"
                  type="text"
                  >删除</a-button
                >
              </a-popconfirm>
            </div>
          </template>

          <template #switchCell="{ record }">
            <div>
              <span v-if="record.switchs === 0" style="color: #f53f3f"
                >禁用</span
              >
              <span v-else>启用 </span>
            </div>
          </template>
        </i-table>
      </div>
    </div>

    <add-pay
      v-model:drawer-visible="addKindsVisible"
      v-model:form-data="addBrandForm"
      :drawer-type="drawType"
      :project-id="projectId"
      @submit-success="getPayList"
    />
  </div>
</template>
<script lang="ts" setup>
  import { Ref, onMounted, reactive, ref, watch } from 'vue';
  import AddPay from './add-pay.vue';
  import ITable from '@/components/i-table/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectMisPayMethodListPost,
    cbdApiProjectMisPayMethodDeleteGet
  } from '@/api/index';
  import { Message } from '@arco-design/web-vue';
  const props = defineProps({
    projectId: {
      type: [String, Number],
      default: ''
    }
  });
  type BrandForm = {
    id?: number | string;
    projectId?: number | string;
    switchs?: number;
    paymentMethod?: number | string;
    serviceRate?: string;
    sorts?: number | string;
    code?: string;
    scenes?: number | string;
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
        prop: 'code'
      },
      {
        label: '支付方式',
        prop: 'paymentMethod'
      },
      {
        label: '状态',
        prop: 'switch'
      }
      // {
      //   label: '排序',
      //   prop: 'sorts'
      // }
    ]
  });
  const itemsData: Ref = ref([]);

  const [getPayList] = useFuncProxy(async () => {
    // if (!props.projectId) return;
    const res: any = await cbdApiProjectMisPayMethodListPost({
      projectId: Number(props.projectId)
    });
    itemsData.value = res;
  });
  const drawType: Ref = ref(1);

  const addClick = () => {
    addBrandForm.value.switchs = 1;
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
      await cbdApiProjectMisPayMethodDeleteGet({ id: id });
      getPayList();
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
        getPayList();
      }
    },
    {
      deep: true
    }
  );

  onMounted(() => {
    getPayList();
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
