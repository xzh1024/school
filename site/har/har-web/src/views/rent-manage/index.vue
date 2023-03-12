<template>
  <div class="rent">
    <a-row :gutter="24" style="margin: 0">
      <a-col
        :span="3"
        style="
          height: 80vh;
          padding-top: 20px;
          overflow-y: auto;
          background-color: #fff;
        "
      >
        <a-tree
          :data="treeData"
          :load-more="loadMore"
          :field-names="{
            key: 'value',
            title: 'label'
          }"
          check-strictly
          @select="handleCheck"
        />
      </a-col>
      <a-col :span="21">
        <a-tabs
          justify
          style="background-color: #fff"
          @change="handleChangeStatus"
        >
          <a-tab-pane key="-1" title="全部"></a-tab-pane>
          <a-tab-pane key="2" title="已出租"></a-tab-pane>
          <a-tab-pane key="3" title="正常运行"></a-tab-pane>
          <a-tab-pane key="4" title="已欠费"></a-tab-pane>
          <a-tab-pane key="0" title="未出租"></a-tab-pane>
        </a-tabs>
        <i-table
          v-model="page.search"
          v-model:refresh-now="isReload"
          :options="page.options"
          :page="page.pageOptions"
          :api="cbdApiProjectLeaseRecordListGet"
        >
          <template #statusCell="{ record }">
            {{ houseStatusHash[record.status] }}
          </template>
          <template #menu="{ record }">
            <a-button
              v-permission="['lease:record:detail']"
              type="text"
              @click="showDrawer(record)"
              >查看</a-button
            >
          </template>
        </i-table>
      </a-col>
    </a-row>
    <drawer v-model="page.drawerVisible" title="租赁详情" :footer="false">
      <div class="white-detail-box">
        <detail :house-status="Number(houseStatus)" />
      </div>
    </drawer>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, provide, readonly } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { houseStatusList, houseStatusHash } from '@/utils/dic';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import useDictData from '@/hooks/useDictData';
  import {
    cbdApiProjectLeaseRecordListGet,
    CbdApiProjectCommonAssetsSelectListGetRequest,
    cbdApiProjectCommonAssetsSelectListGet
  } from '@/api';
  import type {
    CbdApiProjectLeaseRecordListGetResponse,
    CbdApiProjectCommonAssetsSelectListGetResponse
  } from '@/api';
  import Detail from './__components__/index.vue';
  import useGetCompanyData from '@/hooks/useGetCompanyData';
  type RowData = Required<CbdApiProjectLeaseRecordListGetResponse>['rows'][0];
  type AssetsItem = Required<CbdApiProjectCommonAssetsSelectListGetResponse>[0];

  interface paramsType {
    level: string;
    parentValue: string;
  }
  type PageConfig = {
    search: {
      status: string | number;
      buildingId: string;
    };
    pageOptions: any;
    options: any;
    drawerVisible: boolean;
  };
  const [contractPartA] = useGetCompanyData();
  const [areaList] = useDictData('00002');
  const treeDataParams = ref<paramsType>({
    level: '1',
    parentValue: ''
  });
  const treeData = ref<Array<AssetsItem>>([]);
  const isReload = ref<boolean>(false);
  const houseId = ref<number>();
  const houseStatus = ref<number>();
  const contractId = ref<number>();
  const page = reactive<PageConfig>({
    search: {
      status: '',
      buildingId: ''
    },
    pageOptions: {
      current: 1
    },
    drawerVisible: false,
    options: {
      index: true,
      indexTitle: '序号',
      submitText: '搜索',
      tableCard: true,
      menuSpan: 18,
      columns: [
        {
          label: '房源编号',
          prop: 'code'
        },
        {
          label: '归属楼宇',
          prop: 'buildingName'
        },
        {
          label: '资产门牌号',
          prop: 'doorPlate'
        },
        {
          label: '合同编号',
          prop: 'contractCode',
          align: 'center',
          formatter: (i: RowData) => i.contractCode || '--'
        },
        {
          label: '房源信息',
          prop: 'key',
          placeholder: '请输入合同编号 / 房源编号 / 资产门牌号',
          search: true,
          hide: true,
          span: 8
        },
        {
          label: '合同甲方',
          prop: 'ascriptionCompanyId',
          type: 'treeSelect',
          search: true,
          hide: true,
          span: 8,
          dic: contractPartA.value,
          props: {
            key: 'value',
            title: 'label',
            children: 'children'
          }
        },
        {
          label: '合同甲方',
          prop: 'ascriptionCompanyName',
          align: 'center',
          formatter: (i: RowData) => i.ascriptionCompanyName || '--'
        },
        {
          label: '归属片区',
          prop: 'areaId',
          type: 'select',
          search: true,
          hide: true,
          span: 8,
          dic: areaList.value
        },
        {
          label: '归属片区',
          prop: 'areaName'
        },
        {
          label: '状态',
          prop: 'status',
          type: 'select',
          search: true,
          span: 6,
          dic: houseStatusList
        },
        {
          label: '待收款',
          prop: 'received',
          align: 'center',
          formatter: (i: RowData) => i.received || '--'
        }
      ]
    }
  });
  const handleChangeStatus = (v: string | number | boolean) => {
    page.search.status = v === '-1' ? '' : Number(v);
    page.pageOptions.current = 1;
    isReload.value = true;
  };
  function showDrawer(v: RowData) {
    page.drawerVisible = !page.drawerVisible;
    houseId.value = v.id;
    contractId.value = v.contractId!;
    houseStatus.value = v.status!;
  }
  function handleCheck(v: Array<string | number>, data: any): void {
    const BUILDING_LEVEL = 2;
    if (data.node.level === BUILDING_LEVEL) {
      page.search.buildingId = data.node.value;
      page.pageOptions.current = 1;
      isReload.value = true;
    }
  }

  const loadMore = async (nodeData: any) => {
    if (nodeData.level === 1) {
      const children: Array<AssetsItem> = [];
      const res = await cbdApiProjectCommonAssetsSelectListGet({
        level: nodeData.level + 1,
        parentValue: nodeData.value
      });
      res.forEach((el: AssetsItem) => {
        children.push({
          ...el,
          isLeaf: true
        });
      });
      nodeData.children = children;
    }
  };
  const [getFirstLevelData] = useFuncProxy(async () => {
    treeData.value = await cbdApiProjectCommonAssetsSelectListGet(
      treeDataParams.value as CbdApiProjectCommonAssetsSelectListGetRequest
    );
  });
  getFirstLevelData();
  provide('houseId', readonly(houseId));
  provide('contractId', readonly(contractId));
</script>
