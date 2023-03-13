<template>
  <div class="energyRecord">
    <!-- v-permission="['energyConsume:device:list']" -->
    <i-table
      v-model="searchFrom"
      v-model:refresh-now="isRefresh"
      :selected-keys="selectedKeys"
      :options="page.options"
      :page="initPageParams"
      :api="cbdApiProjectEstateEnergyConsumeRecordListGet"
      @reset="handleReset"
      @dataAfter="getCurrentTableData"
    >
      <template #menu="{ record }">
        <div class="flex menu_btns">
          <a-space>
            <a-button
              v-if="record.status == 1"
              v-permission="['energyConsume:record:update']"
              type="text"
              @click="handleEdit(record)"
            >
              编辑
            </a-button>
            <a-button
              v-permission="['energyConsume:record:info']"
              type="text"
              @click="handleWatch(record)"
            >
              查看
            </a-button>
            <a-button
              v-if="record.status == 1"
              v-permission="['energyConsume:record:remove']"
              type="text"
              @click="handleDelete(record.id)"
            >
              删除
            </a-button>
          </a-space>
        </div>
      </template>
      <template #header>
        <a-space>
          <a-button
            v-permission="['energyConsume:record:add']"
            type="primary"
            class="energyRecord_btn"
            @click="handleAdd"
            >添加</a-button
          >
          <a-button
            v-if="isShowBtn"
            v-permission="['energyConsume:bill:add']"
            type="primary"
            class="energyRecord_btn"
            @click="handleBill"
            >生成账单</a-button
          >
          <a-button
            v-permission="['energyConsume:record:import']"
            type="primary"
            class="energyRecord_btn"
            @click="handleImport"
            >批量导入</a-button
          >
          <a-button
            v-permission="['energyConsume:record:export']"
            type="primary"
            class="energyRecord_btn"
            @click="handleExport"
            >批量导出</a-button
          >
        </a-space>
      </template>
    </i-table>

    <add-model
      v-model="modelVisible"
      :title="modelTitle"
      :row-id="rowId"
      :source="modelSource"
      @reset="reset"
    />
    <Detail
      :id="detailId"
      v-model="detailVisible"
      :refresh="isRefresh"
      @update="handleEdit"
      @generateBill="onGenerateBill"
    ></Detail>
    <GenerateBill
      v-model="generateBillVisible"
      :ids="selectBillIds"
      @reset="reset"
    ></GenerateBill>
    <ImportModel
      v-model="importVisible"
      @confirmSuccess="isRefresh = true"
    ></ImportModel>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, computed, onMounted } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    cbdApiProjectEstateEnergyConsumeRecordListGet,
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectCommonBuildingListSelectGet,
    cbdApiProjectCommonBuildingFloorListSelectGet,
    CbdApiProjectCommonBuildingListSelectGetResponse,
    CbdApiProjectCommonBuildingFloorListSelectGetResponse,
    CbdApiProjectCommonProjectSelectListGetResponse,
    cbdApiProjectEstateEnergyConsumeRecordRemoveIdDelete,
    cbdApiProjectEstateEnergyConsumeRecordExportGet
  } from '@/api';
  import AddModel from './__components__/add.vue';
  import Detail from './__components__/detail.vue';
  import GenerateBill from './__components__/generateBill.vue';
  import ImportModel from './__components__/importModel.vue';
  import { useAddModel } from './type/useAddModel';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { deviceTypeList, energyBillStatusList } from '@/utils/dic';
  import { exportDownload } from '@/utils';
  const {
    modelVisible,
    modelSource,
    modelTitle,
    rowId,
    handleEdit,
    handleAdd
  } = useAddModel();
  function getCurrentTableData(currentPageData: any) {
    currentPageTableData.value = currentPageData.rows;
    selectedKeys.value = []; // 数据变化清空 多选数据
  }
  function handleReset() {
    searchFrom.value.meterReadingStartDate = '';
    searchFrom.value.meterReadingEndDate = '';
    // 清空时 干掉下级数据
    buildingData.value = [];
    floorData.value = [];
  }
  const currentPageTableData = ref([]);
  const initPageParams = ref({ total: 0, pageSize: 10, current: 1 });
  function handleExport() {
    Modal.open({
      title: '导出确认',
      content:
        selectedKeys.value?.length > 0
          ? '是否导出选中数据？'
          : '是否导出结果页全部数据？',
      onOk: async () => {
        // console.log(currentPageTableData.value, selectedKeys.value, 7777)
        // await cbdApiProjectEstateEnergyConsumeRecordExportGet({
        //     ...searchFrom.value,
        //     ids: selectedKeys.value.join(','),
        //     pageNum: String(initPageParams.value.current),
        //     pageSize: String(initPageParams.value.pageSize)
        // });
        // if (searchFrom.value.meterReading) delete searchFrom.value.meterReading
        const url =
          cbdApiProjectEstateEnergyConsumeRecordExportGet.requestConfig.path;
        const p = {
          ...searchFrom.value,
          ids: selectedKeys.value.join(','),
          pageNum: String(initPageParams.value.current),
          pageSize: String(initPageParams.value.pageSize)
        };
        exportDownload(url, p, '能耗记录');
      }
    });
  }
  function handleDelete(id: number) {
    Modal.open({
      title: '删除确认',
      content: '删除后数据无法恢复，是否删除？',
      onOk: async () => {
        await cbdApiProjectEstateEnergyConsumeRecordRemoveIdDelete({
          id: String(id)
        });
        Message.success('操作成功!');
        detailId.value = ''; // 用同一 refresh 清空 detail
        isRefresh.value = true;
      }
    });
  }
  type itemType = {
    label: string;
    value: string | number;
  };
  function getTableColumnLabel(key: string | number, arr: Array<itemType>) {
    const findItem = arr.find((it: itemType) => it.value === key);
    return findItem ? findItem.label : '';
  }
  type recordType = {
    id: string;
  };
  const generateBillVisible = ref(false);
  const selectBillIds = ref<number[]>([]);
  function handleBill() {
    generateBillVisible.value = true;
    // console.log(selectData.value, 'selected')
  }
  function onGenerateBill(record?: recordType) {
    generateBillVisible.value = true;
    selectBillIds.value = [Number(record?.id)];
  }
  const detailVisible = ref(false);
  const importVisible = ref(false);
  const detailId = ref<number | string>('');
  function handleWatch(record: recordType) {
    detailVisible.value = true;
    detailId.value = Number(record.id);
  }
  function handleImport() {
    importVisible.value = true;
  }
  const projectData = ref<CbdApiProjectCommonProjectSelectListGetResponse>([]);
  const buildingData = ref<CbdApiProjectCommonBuildingListSelectGetResponse>(
    []
  );
  const floorData = ref<CbdApiProjectCommonBuildingFloorListSelectGetResponse>(
    []
  );
  const [getProjectData] = useFuncProxy(async () => {
    projectData.value = await cbdApiProjectCommonProjectSelectListGet({});
  });
  const [getBuildingData] = useFuncProxy(async (v: string) => {
    buildingData.value = await cbdApiProjectCommonBuildingListSelectGet({
      projectId: v
    });
  });
  const [getFloorData] = useFuncProxy(async (v: string) => {
    floorData.value = await cbdApiProjectCommonBuildingFloorListSelectGet({
      buildingId: v
    });
  });

  const selectedKeys = ref<number[]>([]);
  const selectData = ref<any>([]);
  const isShowBtn = computed(() => {
    return selectData.value?.length > 0;
  });
  const searchFrom = ref({
    projectId: '',
    buildingId: '',
    buildingFloorId: '',
    deviceType: '',
    meterReading: [],
    meterReadingStartDate: '',
    meterReadingEndDate: '',
    status: '',
    deviceSearch: ''
  });
  const isRefresh = ref(false);
  const page = computed(() => {
    return {
      showEditModal: false,
      showConfigModal: false,
      showDetail: false,
      options: {
        indexTitle: '序号',
        index: true,
        submitText: '查询',
        submitBtnIcon: false,
        resetBtnIcon: false,
        tableCard: true,
        layout: 'vertical',
        menuSpan: 6,
        menuColClass: 'energyRecordMenuClass',
        menuOptions: {
          width: 140,
          align: 'left',
          fixed: 'right'
        },
        menuOtherOptions: {
          bordered: false,
          scroll: {
            x: '140%'
          },
          rowKey: 'id',
          rowSelection: {
            type: 'checkbox',
            showCheckedAll: true
          },
          onSelectionChange: (e: number[]) => {
            selectedKeys.value = e;
            // 生成账单按钮的控制, 未生成账单数据过滤
            const selectArr = selectedKeys.value.map((id) => {
              return currentPageTableData.value.find(
                (item: any) => item.id == id
              );
            });
            selectData.value = selectArr.filter(
              (item: any) => item.status == 1
            );
            selectBillIds.value = selectData.value.map((item: any) => item.id);
          }
        },
        columns: [
          {
            label: '项目名称',
            search: true,
            prop: 'projectId',
            type: 'select',
            dic: projectData.value,
            formatter: (record: any) => {
              return record?.projectName;
            },
            options: {
              allowSearch: true
            },
            on: {
              change(v: string) {
                searchFrom.value = {
                  ...searchFrom.value,
                  projectId: v
                };
                v && getBuildingData(v);
                // 清空时 干掉下级数据
                buildingData.value = [];
                floorData.value = [];
                searchFrom.value.buildingId = '';
                searchFrom.value.buildingFloorId = '';
              }
            }
          },
          {
            label: '楼宇',
            prop: 'buildingId',
            search: true,
            type: 'select',
            formatter: (record: any) => {
              return record?.buildingName;
            },
            dic: buildingData.value,
            on: {
              change(v: string) {
                searchFrom.value = {
                  ...searchFrom.value,
                  buildingId: v
                };
                v && getFloorData(v);
                // 清空时 干掉下级数据
                floorData.value = [];
                searchFrom.value.buildingFloorId = '';
              }
            }
          },
          {
            label: '楼层',
            prop: 'buildingFloorId',
            search: true,
            formatter: (record: any) => {
              return record?.buildingFloorName;
            },
            type: 'select',
            dic: floorData.value,
            on: {
              change(v: string) {
                searchFrom.value = {
                  ...searchFrom.value,
                  buildingFloorId: v
                };
              }
            }
          },
          {
            label: '能耗单编号',
            prop: 'recordCode'
          },
          {
            label: '设备编号',
            prop: 'deviceCode'
          },
          {
            label: '设备名称',
            prop: 'deviceName'
          },
          {
            label: '设备类型',
            search: true,
            prop: 'deviceType',
            type: 'select',
            dic: deviceTypeList,
            formatter: (record: any) => {
              return getTableColumnLabel(record?.deviceType, deviceTypeList);
            },
            on: {
              change(v: string) {
                searchFrom.value = {
                  ...searchFrom.value,
                  deviceType: v
                };
              }
            }
          },
          {
            label: '抄表日期',
            search: true,
            prop: 'meterReading',
            type: 'dateRange',
            formatter: (record: any) => {
              return record?.currentMeterReadingDate;
            },
            on: {
              change(v: string[]) {
                searchFrom.value = {
                  ...searchFrom.value,
                  meterReadingStartDate: v?.[0] || '',
                  meterReadingEndDate: v?.[1] || ''
                };
              }
            }
          },
          {
            label: '上期读数',
            prop: 'previousReadOutNum'
          },
          {
            label: '本期读数',
            prop: 'currentReadOutNum'
          },
          {
            label: '能耗',
            prop: 'currentEnergyConsumptionNum'
          },
          {
            label: '状态',
            prop: 'status',
            search: true,
            type: 'select',
            dic: energyBillStatusList,
            formatter: (record: any) => {
              return getTableColumnLabel(record?.status, energyBillStatusList);
            },
            on: {
              change(v: string) {
                searchFrom.value = {
                  ...searchFrom.value,
                  status: v
                };
              }
            }
          },
          {
            label: '设备编号/名称',
            search: true,
            hide: true,
            prop: 'deviceSearch'
          }
        ]
      }
    };
  });

  // 新增
  function reset() {
    modelVisible.value = false;
    isRefresh.value = true;
  }
  onMounted(() => {
    getProjectData();
  });
</script>

<style scoped lang="less">
  .energyRecord {
    // .energyRecord_btn {
    //   width: 80px;
    //   height: 30px;
    //   background: #4c8af7;
    //   border-radius: 4px;
    //   padding: 0;
    // }
    :deep(.i-form) {
      .arco-picker,
      .arco-select,
      .arco-input-wrapper {
        background: #fff;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
      }
      .energyRecordMenuClass {
        height: 74px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
    }
    .menu_btns {
      :deep(.arco-btn-size-medium) {
        padding: 0;
        font-size: 14px;
        color: #4c8af7;
        line-height: 22px;
      }
    }
  }
</style>
