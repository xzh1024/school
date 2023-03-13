<template>
  <div>
    <div class="i-card" style="padding-bottom: 0">
      <basic-form
        v-bind="formProps"
        @submit="onSubmit"
        @reset="onReset"
        @register="resetRegister"
      ></basic-form>
    </div>
    <i-card>
      <template #title>
        <div class="flex align-center justify-between">
          <a-button
            v-permission="['invest:negotiate:add']"
            type="primary"
            @click="showAddModal({})"
            >添加</a-button
          >
          <div class="flex align-center">
            <div class="each-box">
              <a-avatar
                :size="24"
                shape="square"
                style="background-color: #4c8af7"
              ></a-avatar>
              <span>今日跟进 {{ count.toadyNum || 0 }}个</span>
            </div>
            <div class="each-box">
              <a-avatar
                :size="24"
                shape="square"
                style="background-color: #ffb44c"
              ></a-avatar>
              <span>7日跟进 {{ count.sevenDayNum || 0 }}个</span>
            </div>
            <div class="each-box">
              <a-avatar
                :size="24"
                shape="square"
                style="background-color: #69af0f"
              ></a-avatar>
              <span>7日未跟进 {{ count.otherDayNum || 0 }}个</span>
            </div>
            <div class="each-box">
              <a-avatar
                :size="24"
                shape="square"
                style="background-color: #fa4e40"
              ></a-avatar>
              <span>计划预警 {{ count.warnNum || 0 }}个</span>
            </div>
          </div>
        </div>
      </template>
      <div class="card-wrapper">
        <div class="each-type">
          <div class="title"
            >初始阶段 {{ data.startList && data.startList.length }}个</div
          >
          <card
            v-for="item in data.startList"
            :key="item.planId"
            title-bg="#4C8AF7"
            :negotiate-stage="1"
            :info="item"
            @click="onDetail(item)"
          />
        </div>
        <div class="each-type">
          <div class="title"
            >意向合同谈判阶段
            {{
              (data.expectContractList && data.expectContractList.length) || 0
            }}个</div
          >
          <card
            v-for="item in data.expectContractList"
            :key="item.planId"
            title-bg="#4C8AF7"
            :negotiate-stage="2"
            :info="item"
            @click="onDetail(item)"
          />
        </div>
        <div class="each-type">
          <div class="title"
            >正式合同谈判阶段
            {{ (data.contractList && data.contractList.length) || 0 }}个</div
          >
          <card
            v-for="item in data.contractList"
            :key="item.planId"
            title-bg="#4C8AF7"
            :negotiate-stage="3"
            :info="item"
            @click="onDetail(item)"
          />
        </div>
        <div class="each-type">
          <div class="title"
            >已完成
            {{ (data.completeList && data.completeList.length) || 0 }}个</div
          >
          <card
            v-for="item in data.completeList"
            :key="item.planId"
            title-bg="#4C8AF7"
            :negotiate-stage="4"
            :info="item"
            @click="onDetail(item)"
          />
        </div>
        <div class="each-type">
          <div class="title"
            >未完成{{
              (data.uncompleteList && data.uncompleteList.length) || 0
            }}个</div
          >
          <card
            v-for="item in data.uncompleteList"
            :key="item.planId"
            title-bg="#4C8AF7"
            :negotiate-stage="5"
            :info="item"
            @click="onDetail(item)"
          />
        </div>
      </div>
    </i-card>
    <add-modal
      v-if="page.addModalVisible"
      :id="page.editId"
      v-model="page.addModalVisible"
      :plan-id="page.id"
      width="50vw"
      @refresh="onRefresh"
    />
    <detail
      v-if="page.detailVisible"
      :id="String(page.id)"
      v-model="page.detailVisible"
      :refresh="page.refresh"
      @show-add="onUpdate"
      @new="onAdd"
    ></detail>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, computed } from 'vue';
  import AddModal from './__components__/add.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import Detail from './__components__/detail.vue';
  import ICard from '@/components/i-card/i-card.vue';
  import Card from './__components__/card.vue';
  import {
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectNegotiateCountGet,
    CbdApiProjectNegotiateCountGetResponse,
    cbdApiProjectNegotiateListGet,
    CbdApiProjectNegotiateListGetRequest,
    type CbdApiProjectNegotiateListGetResponse
  } from '@/api';
  import {
    merchantDropList,
    brandDropList,
    estateDropList,
    getBrandDropList,
    getMerchantDropList,
    getEstateDropList
  } from '@/views/attract-merchant/__components__/common';
  import { BasicForm, useForm } from '@/components/IForm';
  import { getActiveProjectId, setActiveProject } from '@/utils';

  const data = ref<CbdApiProjectNegotiateListGetResponse>({});
  const [resetRegister, methods] = useForm();

  const formProps = computed(() => {
    return {
      actionSpan: 24,
      submitButtonOptions: {
        text: '搜索'
      },
      resetButtonOptions: {},
      schemas: [
        {
          label: '项目名称：',
          field: 'projectIds',
          component: 'select',
          componentProps: {
            allowClear: false,
            request: cbdApiProjectCommonProjectSelectListGet,
            onChange(v: any) {
              getBrandDropList(v);
              getMerchantDropList(v);
              setActiveProject(v);
              getEstateDropList({
                projectIds: v,
                leaseType: undefined,
                type: 1
              });
              search.value.projectIds = v;
              methods.setFieldsValue({
                projectIds: v,
                brandIds: '',
                merchantIds: ''
              });
              getPlanList();
              getStatisticsData();
            }
          },
          colProps: {
            md: 6,
            xs: 6
          }
        },
        {
          label: '品牌',
          field: 'brandIds',
          component: 'select',
          componentProps: {
            multiple: true,
            options: brandDropList.value
          },
          colProps: {
            md: 6,
            xs: 6
          }
        },
        {
          label: '商户',
          field: 'merchantIds',
          component: 'select',
          componentProps: {
            multiple: true,
            options: merchantDropList.value
          },
          colProps: {
            md: 6,
            xs: 6
          }
        },

        {
          label: '意向铺位',
          field: 'estateIds',
          component: 'select',
          componentProps: {
            multiple: true,
            options: estateDropList.value
          },
          colProps: {
            md: 6,
            xs: 6
          }
        }
      ]
    };
  });
  const page = reactive<{
    addModalVisible: boolean;
    detailVisible: boolean;
    refresh: boolean;
    title: string;
    id?: number;
    editId?: number;
  }>({
    addModalVisible: false,
    detailVisible: false,
    refresh: false,
    id: undefined,
    editId: undefined,
    title: ''
  });
  const showAddModal = (record?: any) => {
    page.addModalVisible = true;
    page.title = record?.planId ? '修改谈判记录' : '添加谈判记录';
    page.editId = record?.planId;
    page.id = undefined;
  };
  const onDetail = (record?: any) => {
    page.detailVisible = true;
    page.id = record?.planId;
  };
  const onUpdate = (id?: number) => {
    page.addModalVisible = true;
    page.editId = id;
  };
  const onAdd = (id?: number) => {
    page.addModalVisible = true;
    page.id = id;
  };
  const onRefresh = () => {
    page.refresh = !page.refresh;
    getPlanList();
    getStatisticsData();
  };
  const search = ref<CbdApiProjectNegotiateListGetRequest>({
    projectIds: String(getActiveProjectId() || '')
  });
  const [getPlanList] = useFuncProxy(async () => {
    data.value = await cbdApiProjectNegotiateListGet({ ...search.value });
  });
  function onSubmit(v: any) {
    search.value = v;
    getStatisticsData();
    getPlanList();
  }
  function onReset() {
    search.value = {
      projectIds: getActiveProjectId() + ''
    };
    methods.setFieldsValue({
      projectIds: getActiveProjectId()
    });
    getPlanList();
  }
  const count = ref<CbdApiProjectNegotiateCountGetResponse>({});
  const [getStatisticsData] = useFuncProxy(async () => {
    count.value = await cbdApiProjectNegotiateCountGet({
      projectId: getActiveProjectId() + ''
    });
  });
  onMounted(() => {
    const id: number = getActiveProjectId();
    getPlanList();
    getEstateDropList({ projectIds: id, leaseType: undefined, type: 1 });
    getStatisticsData();
    methods.setFieldsValue({
      projectIds: id
    });
    getBrandDropList(id);
    getMerchantDropList(id);
  });
</script>
<style scoped lang="less">
  .card-wrapper {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    .each-type {
      background: #f7f7f7;
      padding: 16px 16px 0;
      .title {
        color: #333333;
        font-size: 16px;
        margin-bottom: 16px;
      }
    }
  }
  .each-box {
    display: flex;
    margin-left: 20px;
    justify-content: center;
    align-items: center;
    span {
      margin-left: 10px;
      font-size: 14px;
      font-weight: bold;
      color: #333333;
    }
  }
  :deep(.arco-card-header){
    border-bottom: none;
  }
</style>
