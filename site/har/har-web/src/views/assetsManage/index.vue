<template>
  <div class="assetsManage">
    <a-card>
      <a-form ref="queryFormRef" :model="queryForm" auto-label-width>
        <a-row :gutter="12">
          <a-col :span="6">
            <a-form-item field="key" label="房源信息:">
              <a-input
                v-model="queryForm.key"
                placeholder="请输入房源编号/资产门牌号搜索"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item field="categoryId" label="房源类型:">
              <a-select
                v-model="queryForm.categoryId"
                placeholder="请选择房源类型"
              >
                <a-option
                  v-for="(item, index) in categoryList"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.dataName }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item field="areaId" label="归属片区:">
              <a-select v-model="queryForm.areaId" placeholder="请选择归属片区">
                <a-option
                  v-for="(item, index) in areaList"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.dataName }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item field="lease" label="是否有出租:">
              <a-select
                v-model="queryForm.lease"
                placeholder="请选择出租状态"
                @change="handleLeaseClick"
              >
                <a-option :value="1">是</a-option>
                <a-option :value="2">否</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :sapn="24" style="text-align: right">
            <a-space>
              <a-button type="primary" @click="queryFormQuery">
                <template #icon>
                  <slot name="submitIcon"><icon-search /></slot> </template
                >搜索</a-button
              >
              <a-button
                type="primary"
                @click="queryFormReset($refs.queryFormRef)"
              >
                <template #icon>
                  <slot name="resetIcon"><icon-refresh /></slot> </template
                >重置</a-button
              >
            </a-space>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <a-card class="margin-top">
      <a-row :gutter="20">
        <a-col :span="4">
          <building-tree @get-building-id="queryByBuildingId" />
        </a-col>
        <a-col :span="20">
          <a-table
            :columns="columns"
            :data="tableData"
            :loading="tableLoading"
            :pagination="tablePage"
            @page-change="tablePageChange"
            @page-size-change="tableSizeChange"
          >
            <template #index="{ rowIndex }">
              {{ rowIndex + 1 }}
            </template>
            <template #placeName="{ record }">
              {{
                `${record.projectName}/${record.buildingName}/${record.floorName}`
              }}
            </template>
            <template #operation="{ record }">
              <a-button
                v-permission="['asset:info']"
                type="text"
                @click="handleAssetsMotal(record.id)"
              >
                查看
              </a-button>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>

    <a-drawer
      v-model:visible="drawerVisible"
      :footer="false"
      :width="1000"
      title="资产详情"
      unmount-on-close
    >
      <a-tabs v-model="tabsValue">
        <a-tab-pane :key="1" title="经营情况">
          <assets-condition :estate-id="currentId" />
        </a-tab-pane>
        <a-tab-pane :key="2" title="缴费记录">
          <payment-records :estate-id="currentId" />
        </a-tab-pane>
        <a-tab-pane :key="3" title="基本信息">
          <basic-information :estate-id="currentId"></basic-information>
        </a-tab-pane>
        <a-tab-pane :key="4" title="合同信息">
          <contract-info :estate-id="currentId" />
        </a-tab-pane>
      </a-tabs>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { ref, Ref, reactive, onMounted } from 'vue';
  import BuildingTree from '@/components/buildingTree/index.vue';
  import { getPublicDic } from '@/utils/getDic';
  import { cbdApiProjectAssetPageGet } from '@/api';
  import AssetsCondition from './__components__/assetsCondition.vue';
  import PaymentRecords from './__components__/paymentRecords.vue';
  import ContractInfo from './__components__/contractInfo.vue';
  import BasicInformation from './__components__/basicInformation.vue';

  onMounted(() => {
    // eslint-disable-next-line no-use-before-define
    getDic();
    // eslint-disable-next-line no-use-before-define
    getList();
  });

  const categoryList: Ref<Array<any>> = ref([]);
  const areaList: Ref<Array<any>> = ref([]);
  // 获取房源类型、归属片区 数据
  const getDic = async () => {
    categoryList.value = await getPublicDic('00005');
    areaList.value = await getPublicDic('00002');
  };

  // 定义表单
  const queryForm: Ref = ref({
    buildingId: '',
    key: '',
    areaId: '',
    categoryId: '',
    lease: ''
  });
  // 定义分页
  const tablePage = reactive({
    current: 1,
    pageSize: 10,
    showPageSize: true,
    showTotal: true,
    total: 0
  });
  // 表格头部
  const columns = [
    {
      title: '序号',
      slotName: 'index'
    },
    {
      title: '房源编号',
      dataIndex: 'code'
    },
    {
      title: '项目 / 楼宇 / 楼层',
      slotName: 'placeName'
    },
    {
      title: '房源门牌号',
      dataIndex: 'doorPlate'
    },
    {
      title: '房源类型',
      dataIndex: 'categoryName'
    },
    {
      title: '房源面积(㎡)',
      dataIndex: 'acreage'
    },
    {
      title: '归属片区',
      dataIndex: 'areaName'
    },
    {
      title: '操作',
      slotName: 'operation'
    }
  ];
  // 表格数据
  const tableData: Ref<Array<any>> = ref([]);
  // 表格动画
  const tableLoading: Ref<boolean> = ref(false);
  // 第一次进入页面获取默认表格数据
  const getList = async () => {
    const params = {
      ...queryForm.value,
      pageSize: String(tablePage.pageSize),
      pageNum: String(tablePage.current)
    };
    const { rows, total } = await cbdApiProjectAssetPageGet(params);
    tableData.value = rows!;
    tablePage.total = total!;
  };
  // 根据树形菜单的选择  传输不同表格数据
  const queryByBuildingId = (buildingId: any) => {
    queryForm.value.buildingId = buildingId;
    console.log(buildingId);
    getList();
  };

  const tablePageChange = (e: number) => {
    tablePage.current = e;
    getList();
  };

  const tableSizeChange = (e: number) => {
    tablePage.pageSize = e;
    getList();
  };
  // 表单查询
  const queryFormQuery = () => {
    tablePage.current = 1;
    tablePage.pageSize = 10;
    getList();
  };
  // 表单重置
  const queryFormReset = (el: any) => {
    el.resetFields();
    getList();
  };

  /**
   * @param 是否有出租
   */
  const handleLeaseClick = (e: any) => {
    console.log(e);
    queryForm.value.lease = e;
  };

  // 模态框
  const drawerVisible: Ref<boolean> = ref(false);
  const tabsValue: Ref<number> = ref(1);
  const currentId: Ref<number | null> = ref(null);

  const handleAssetsMotal = (id: number) => {
    drawerVisible.value = true;
    currentId.value = id;
  };
</script>
