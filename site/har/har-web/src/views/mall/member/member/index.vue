<template>
  <a-tabs
    default-active-key="0"
    style="background-color: #fff"
    @change="changeTab"
  >
    <a-tab-pane key="0" title="会员等级管理">
      <i-table
        v-model:refresh-now="page.refresh"
        :options="page.levelOptions"
        :api="cbdApiProjectMembersLevelListGet"
      >
        <template #header>
          <a-button
            v-permission="['members:level:save']"
            type="outline"
            @click="onEditLevel({})"
            >新增会员等级</a-button
          >
        </template>
        <template #rightsCell="{ record }">
          {{ record.rights.join('、') }}
        </template>
        <template #menu="{ record }">
          <div class="flex" style="margin-left: -15px">
            <a-button
              v-permission="['members:level:save']"
              type="text"
              @click="onEditLevel(record)"
              >编辑</a-button
            >
            <a-button
              v-permission="['members:level:detail']"
              type="text"
              @click="onViewLevelDetail(record)"
              >查看</a-button
            >
          </div>
        </template>
      </i-table>
      <detail
        v-if="page.showDetail"
        :id="page.currentId"
        v-model="page.showDetail"
        @edit="showEditModal"
      />
      <edit-level
        v-if="page.showAddModal"
        :id="page.currentId"
        v-model="page.showAddModal"
        :level="data.total"
        @refresh="onRefreshLevel"
      />
    </a-tab-pane>
    <a-tab-pane key="1" title="等级豆管理">
      <i-table :options="page.beanOptions" :data="data.bean">
        <template #header>
          <a-button
            v-permission="['members:level:bean:rule:save']"
            type="outline"
            @click="onSetBeanRule"
            >设置等级豆获取规则</a-button
          >
        </template>
        <template #ruleCell="{ record }">
          每消费{{ record.amount }}元，赠送{{ record.levelBean }}等级豆
        </template>
      </i-table>
      <bean-rule
        v-if="page.showSetRuleModal"
        v-model="page.showSetRuleModal"
        @refresh="handleRefreshRule"
      />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    cbdApiProjectMembersLevelListGet,
    cbdApiProjectMembersLevelBeanRuleListGet
  } from '@/api';
  import type {
    CbdApiProjectMembersLevelListGetResponse,
    CbdApiProjectMembersLevelBeanRuleListGetResponse
  } from '@/api';
  import Detail from './__components__/detail.vue';
  import BeanRule from './__components__/bean-rule.vue';
  import EditLevel from './__components__/edit-level.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  type RowData = Required<CbdApiProjectMembersLevelListGetResponse>['rows'][0];
  type BeanItem = Required<CbdApiProjectMembersLevelBeanRuleListGetResponse>[0];
  type DataConfig = {
    bean: Array<BeanItem>;
    total: number;
  };
  type PageConfig = {
    showDetail: boolean;
    showSetRuleModal: boolean;
    showAddModal: boolean;
    refresh: boolean;
    currentId: number | undefined;
    levelOptions: any;
    beanOptions: any;
  };

  const page = reactive<PageConfig>({
    currentId: undefined,
    showDetail: false,
    refresh: false,
    showSetRuleModal: false,
    showAddModal: false,
    levelOptions: {
      tableCard: true,
      indexTitle: '序号',
      index: true,
      menuOptions: {
        align: 'left'
      },
      columns: [
        {
          label: '会员等级',
          prop: 'defaultName'
        },
        {
          label: '等级名称',
          prop: 'name'
        },
        {
          label: '获取条件（等级豆）',
          prop: 'levelBean'
        },
        {
          label: '会员权益',
          prop: 'rights'
        }
      ]
    },
    beanOptions: {
      tableCard: true,
      indexTitle: '序号',
      index: true,
      menu: false,
      pageShow: false,
      columns: [
        {
          label: '获取规则',
          prop: 'rule'
        }
      ]
    }
  });
  const data = reactive<DataConfig>({
    bean: [],
    total: 0
  });
  function changeTab(e: string | number | undefined) {
    if (e === '1') {
      getData();
    }
  }
  function onEditLevel(record: any) {
    page.showAddModal = true;
    page.currentId = record.id;
  }
  function showEditModal() {
    page.showAddModal = true;
  }

  function onRefreshLevel() {
    page.refresh = true;
    getTotal();
  }
  function onViewLevelDetail(record: RowData) {
    page.showDetail = true;
    page.currentId = record.id;
  }
  const [getData] = useFuncProxy(async () => {
    data.bean = await cbdApiProjectMembersLevelBeanRuleListGet({});
  });
  const [getTotal] = useFuncProxy(async () => {
    const { total } = await cbdApiProjectMembersLevelListGet({});
    data.total = total || 0;
    console.log(total);
  });
  function onSetBeanRule() {
    page.showSetRuleModal = true;
  }
  function handleRefreshRule() {
    getData();
  }
  getTotal();
</script>
<style scoped lang="less">
  .tab-card {
    :deep(.arco-card-body) {
      padding-bottom: 5px;
    }
  }

  :deep(.arco-tabs-nav) {
    padding-bottom: 5px;
    background-color: #fff;
  }

  :deep(.arco-tabs-content) {
    padding-top: 0;
  }
</style>
