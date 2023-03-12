<template>
  <div class="energyEquipment">
    <!-- v-permission="['energyConsume:device:list']" -->
    <i-table
      v-model="searchFrom"
      v-model:refresh-now="isRefresh"
      :options="page.options"
      :api="cbdApiProjectEstateEnergyConsumeDeviceListGet"
      @reset="handleReset"
    >
      <!-- <template #statusCell="{ record }">
                <a-tag :color="['red', 'arcoblue'][record.status]" default-checked>
                    {{ ['未使用', '使用中'][record.status] }}
                </a-tag>
            </template> -->
      <template #menu="{ record }">
        <!-- v-permission="['energyConsume:device:remove']" -->
        <div class="menu_btns">
          <a-space>
            <a-button
              v-permission="['energyConsume:device:update']"
              type="text"
              @click="handleEdit(record)"
            >
              编辑
            </a-button>
            <a-button
              v-permission="['energyConsume:device:info']"
              type="text"
              @click="handleWatch(record)"
            >
              查看
            </a-button>
            <!-- v-if="record.status === 0" -->
            <a-button
              v-if="record?.ecRecordState == 2"
              v-permission="['energyConsume:device:remove']"
              type="text"
              @click="handleDelete(record.id)"
            >
              删除
            </a-button>
          </a-space>
        </div>
      </template>
      <template #header>
        <!-- v-permission="['energyConsume:device:add']" -->
        <a-button
          v-permission="['energyConsume:device:add']"
          type="primary"
          @click="handleAdd"
          >添加</a-button
        >
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
    ></Detail>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, onMounted, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import {
    cbdApiProjectEstateEnergyConsumeDeviceListGet,
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectCommonBuildingListSelectGet,
    cbdApiProjectCommonBuildingFloorListSelectGet,
    cbdApiProjectEstateEnergyConsumeDeviceRemoveIdDelete,
    CbdApiProjectCommonBuildingListSelectGetResponse,
    CbdApiProjectCommonProjectSelectListGetResponse,
    CbdApiProjectCommonBuildingFloorListSelectGetResponse
  } from '@/api';
  import AddModel from './__components__/energy-model.vue';
  import Detail from './__components__/detail.vue';
  import { useAddModel } from './type/useAddModel';
  import useFuncProxy from '@/hooks/useFuncProxy';
  const {
    modelVisible,
    modelSource,
    modelTitle,
    rowId,
    handleEdit,
    handleAdd
  } = useAddModel();
  function handleReset() {
    // 清空时 干掉下级数据
    buildingData.value = [];
    floorData.value = [];
  }
  function handleDelete(id: number) {
    Modal.open({
      title: '删除确认',
      content: '删除后数据无法恢复，是否删除？',
      onOk: async () => {
        await cbdApiProjectEstateEnergyConsumeDeviceRemoveIdDelete({
          id: String(id)
        });
        Message.success('操作成功!');
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
  const detailVisible = ref(false);
  const detailId = ref<number | string>('');
  function handleWatch(record: recordType) {
    detailVisible.value = true;
    detailId.value = Number(record.id);
  }
  const equipmentTypeData = [
    { label: '水表', value: 1 },
    { label: '电表', value: 2 },
    { label: '燃气表', value: 3 }
  ];
  const intellectData = ref([
    { label: '是', value: 1 },
    { label: '否', value: 2 }
  ]);
  const projectData = ref<CbdApiProjectCommonProjectSelectListGetResponse>([]);
  const buildingData = ref<CbdApiProjectCommonBuildingListSelectGetResponse>(
    []
  );
  const floorData = ref<CbdApiProjectCommonBuildingFloorListSelectGetResponse>(
    []
  );
  const [getProjectData] = useFuncProxy(async (v: string) => {
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
  const searchFrom = ref({
    projectId: '',
    buildingId: '',
    buildingFloorId: '',
    deviceType: '',
    intelligentDevice: '',
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
        tableCard: true,
        layout: 'vertical',
        submitBtnIcon: false,
        resetBtnIcon: false,
        menuSpan: 12,
        menuOtherOptions: {
          bordered: false
        },
        menuOptions: {
          width: 150,
          align: 'left'
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
            options: {
              allowSearch: true
            },
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
            options: {
              allowSearch: true
            },
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
            formatter: (record: any) => {
              return getTableColumnLabel(record?.deviceType, equipmentTypeData);
            },
            dic: equipmentTypeData,
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
            label: '是否智能设备',
            search: true,
            prop: 'intelligentDevice',
            type: 'select',
            formatter: (record: any) => {
              return getTableColumnLabel(
                record?.intelligentDevice,
                intellectData.value
              );
            },
            dic: intellectData.value,
            on: {
              change(v: string) {
                searchFrom.value = {
                  ...searchFrom.value,
                  intelligentDevice: v
                };
              }
            }
          },
          {
            label: '设备名称/名称',
            search: true,
            hide: true,
            prop: 'deviceSearch'
          },
          {
            label: '铺位',
            prop: 'estateSnapshotName'
          }
        ]
      }
    };
  });
  onMounted(() => {
    getProjectData();
  });
  // 新增
  function reset() {
    modelVisible.value = false;
    isRefresh.value = true;
  }
</script>

<style scoped lang="less">
  .energyEquipment {
    :deep(.i-form) {
      .arco-col-12 {
        height: 74px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      .arco-picker,
      .arco-select,
      .arco-input-wrapper {
        background: #fff;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
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
