<template>
  <drawer v-model="visible" :title="title" width="70%">
    <template #footer>
      <!-- <a-button @click="onSubmit('draft')">保存草稿</a-button> -->
      <a-button @click="onCancel">取消</a-button>
      <a-button
        type="primary"
        :loading="editForm.id ? editLoading : loading"
        @click="onSubmit"
      >
        保存
      </a-button>
    </template>
    <div class="energy-model-box">
      <a-form ref="formRef" :model="editForm" :rules="rules" layout="vertical">
        <a-card :bordered="false">
          <div class="title">铺位信息</div>
          <a-row class="flex align-center">
            <a-col :span="6">
              <a-form-item field="projectId" label="归属项目">
                <a-select
                  v-model="editForm.projectId"
                  :disabled="isRelevance"
                  placeholder="请选择项目名称"
                  @change="onProjectChange"
                >
                  <a-option
                    v-for="item in projectList"
                    :key="item.label"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="13" :offset="5">
              <a-descriptions
                title=""
                :value-style="{ 'margin-top': '8px' }"
                table-layout="fixed"
                :column="{ xs: 1, md: 2, lg: 2 }"
                layout="inline-vertical"
              >
                <a-descriptions-item label="铺位数">{{
                  selectedKeys.length || 0
                }}</a-descriptions-item>
                <a-descriptions-item label="面积"
                  >{{ allArea.toFixed(2) }}平方米</a-descriptions-item
                >
              </a-descriptions>
            </a-col>
          </a-row>
        </a-card>
        <a-card :bordered="false">
          <a-row class="flex justify-between">
            <a-col :span="6">
              <a-card
                :style="{
                  'margin-top': 0,
                  'height': '400px',
                  'display': 'flex',
                  'flex-direction': 'column'
                }"
                :body-style="{ overflow: 'auto' }"
                :header-style="{ 'text-align': 'center' }"
                title="楼宇"
              >
                <template v-if="buildingData.length > 0">
                  <a-radio-group
                    v-model="editForm.buildingId"
                    direction="vertical"
                    @change="onBuildChange"
                  >
                    <a-radio
                      v-for="(item, index) in buildingData"
                      :key="index"
                      :value="item.value"
                      >{{ item.label }}</a-radio
                    >
                  </a-radio-group>
                </template>
                <template v-else>
                  <view class="noDataBox">
                    <img src="@/assets/images/noData.png" alt="" />
                    <span>暂无数据</span>
                  </view>
                </template>
              </a-card>
            </a-col>
            <a-col :span="6">
              <a-card
                :style="{
                  'margin-top': 0,
                  'height': '400px',
                  'display': 'flex',
                  'flex-direction': 'column'
                }"
                :body-style="{ overflow: 'auto' }"
                :header-style="{ 'flex-shrink': 0, 'text-align': 'center' }"
                title="楼层"
              >
                <template v-if="floorData.length > 0">
                  <a-checkbox-group
                    v-model="editForm.floorIds"
                    direction="vertical"
                    @change="onFloorChange"
                  >
                    <a-checkbox
                      v-for="(item, index) in floorData"
                      :key="index"
                      :value="item.value"
                      >{{ item.label }}</a-checkbox
                    >
                  </a-checkbox-group>
                </template>
                <template v-else>
                  <view class="noDataBox">
                    <img src="@/assets/images/noData.png" alt="" />
                    <span>暂无数据</span>
                  </view>
                </template>
              </a-card>
            </a-col>
            <a-col :span="11">
              <a-card
                :style="{
                  'margin-top': 0,
                  'height': '400px',
                  'display': 'flex',
                  'flex-direction': 'column'
                }"
                :header-style="{ 'text-align': 'center' }"
                title="铺位"
              >
                <a-form
                  :model="editForm"
                  layout="horizontal"
                  :auto-label-width="true"
                >
                  <a-form-item label="铺位号">
                    <a-input-search
                      v-model="searchStoreId"
                      :loading="isLoading"
                      allow-clear
                      :style="{ width: '100%' }"
                      placeholder="请输入"
                      @search="querySearch"
                      @change="querySearch"
                      @clear="clear"
                    >
                      <!-- <template #button-icon>
                        <icon-search />
                      </template>
                      <template #button-default> 搜索 </template> -->
                    </a-input-search>
                  </a-form-item>
                </a-form>
                <a-table
                  v-model:selectedKeys="selectedKeys"
                  :loading="isLoading"
                  :scroll="{ y: 230 }"
                  row-key="id"
                  :columns="columns"
                  :data="berthData"
                  :pagination="false"
                  :row-selection="rowSelection"
                  @selection-change="selectionChange"
                />
              </a-card>
            </a-col>
          </a-row>
        </a-card>
        <a-card :bordered="false">
          <div class="title">设备信息</div>
          <i-form
            ref="iFormRef"
            v-model="editForm"
            class="equipment_form"
            :options="formProps"
          >
            <template #maxReadNumForm>
              <a-input-number
                v-model="editForm.maxReadNum"
                class="slorInput"
                :disabled="editForm.isIntellectDevice === 1"
                :min="0"
                :max="10000"
                :formatter="(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="(value: any) => `${value}`.replace(/\$\s?|(,*)/g, '')"
                :precision="2"
                placeholder="请输入"
                :allow-clear="true"
              >
                <template #append>
                  {{ editForm.deviceType === 2 ? 'kwh' : 'm³' }}
                </template>
              </a-input-number>
            </template>
            <template #currentReadNumForm>
              <a-input-number
                v-model="editForm.currentReadNum"
                class="slorInput"
                placeholder="请输入"
                :allow-clear="true"
              >
                <template #append>
                  {{ editForm.deviceType === 2 ? 'kwh' : 'm³' }}
                </template>
              </a-input-number>
            </template>
            <template #LossRateForm>
              <a-input-number
                v-model="editForm.LossRate"
                class="slorInput"
                placeholder="请输入"
                :min="0"
                :max="100"
                :formatter="(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="(value: any) => `${value}`.replace(/\$\s?|(,*)/g, '')"
                :precision="2"
                :allow-clear="true"
              >
                <template #append> % </template>
              </a-input-number>
            </template>
            <template #unitPriceForm>
              <a-input-number
                v-model="editForm.unitPrice"
                class="slorInput"
                placeholder="请输入"
                :min="0"
                :max="10000"
                :formatter="(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="(value: any) => `${value}`.replace(/\$\s?|(,*)/g, '')"
                :precision="2"
                :allow-clear="true"
              >
                <template #append>
                  {{ editForm.deviceType === 2 ? '元/kwh' : '元/m³' }}
                </template>
              </a-input-number>
            </template>
            <template #taxRateForm>
              <a-input-number
                v-model="editForm.taxRate"
                class="rateSelect"
                :min="0"
                :max="100"
                :formatter="(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="(value: any) => `${value}`.replace(/\$\s?|(,*)/g, '')"
                :precision="2"
                placeholder="请输入"
                :allow-clear="true"
              >
                <template #prepend>
                  <a-select
                    v-model="editForm.isCludeRate"
                    class="rateSelect"
                    :options="[
                      { label: '含税', value: 1 },
                      { label: '不含税', value: 2 }
                    ]"
                    placeholder="请选择"
                  />
                </template>
                <template #append> % </template>
              </a-input-number>
            </template>
          </i-form>
        </a-card>
      </a-form>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, onMounted, reactive, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import type { EditForm } from '../type/useAddModel';
  import IForm from '@/components/i-form/index.vue';
  import { FormOptions } from '@/components/i-form/index';
  import dayjs from 'dayjs';
  import NP from 'number-precision';
  import {
    cbdApiProjectEstateEnergyConsumeDeviceAddPost,
    CbdApiProjectEstateEnergyConsumeDeviceAddPostRequest as addParamsType,
    CbdApiProjectEstateEnergyConsumeDeviceUpdatePutRequest as updateParamsType,
    cbdApiProjectCommonMisSelectExpenseGet,
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectCommonBuildingListSelectGet,
    cbdApiProjectEstateEnergyConsumeDeviceUpdatePut,
    cbdApiProjectEstateEnergyConsumeDeviceInfoIdGet,
    CbdApiProjectEstateEnergyConsumeDeviceInfoIdGetResponse as detailDataType,
    cbdApiProjectCommonBuildingFloorListSelectGet,
    cbdApiProjectCommonEstateSelectListGet,
    CbdApiProjectCommonBuildingListSelectGetResponse,
    CbdApiProjectCommonBuildingFloorListSelectGetResponse
  } from '@/api';
  import { deviceTypeList, IntellectDeviceList } from '@/utils/dic';
  import { useEstateManageStore } from '@/store';
  const estateManageStore = useEstateManageStore();
  const formRef: Ref = ref(null);
  const iFormRef: Ref = ref(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    rowId: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: 'add'
    },
    options: {
      type: Object,
      default: () => {
        return {
          energyTypeData: [],
          usageTypeData: []
        };
      }
    }
  });
  const emits = defineEmits(['update:modelValue', 'reset']);
  const rules = {
    projectId: [{ required: true, message: '归属项目不能为空' }]
  };
  const searchStoreId = ref('');
  const clear = () => {
    searchStoreId.value = '';
  };
  const isLoading = ref(false);
  const querySearch = () => {
    if (!(editForm.value.floorIds && editForm.value.floorIds.length > 0)) {
      return Message.warning('请先选择楼层~');
    }
    isLoading.value = true;
    getBerthData();
  };
  const selectedKeys = ref<(string | number)[]>([]);
  const selectionChange = (data: any) => {
    selectedKeys.value = data;
    editForm.value.Berths = data;
  };
  const allArea = computed(() => {
    const currentArr = selectedKeys.value.map((id: string | number) => {
      return berthData.value.find((item: any) => item.id === id);
    });
    return currentArr.reduce((prev: number, item: any) => {
      return NP.plus(prev, Number(item?.floorage));
    }, 0);
  });

  const rowSelection: any = reactive({
    type: 'checkbox',
    showCheckedAll: true
  });

  const columns = [
    {
      title: '铺位号',
      dataIndex: 'berthNumber'
    },
    {
      title: '建筑面积(㎡)',
      dataIndex: 'floorage'
    },
    {
      title: '使用面积(㎡)',
      dataIndex: 'useArea'
    }
  ];
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      if (formRef.value) {
        formRef.value.resetFields();
        iFormRef.value?.resetFields();
        editForm.value.buildingId = undefined;
        editForm.value.floorIds = undefined;
        editForm.value.Berths = undefined;
        selectedKeys.value = [];
        buildingData.value = [];
      }
      emits('update:modelValue', v);
    }
  });
  const editForm = ref<EditForm>({
    id: undefined,
    projectId: undefined,
    buildingId: undefined, // 楼宇
    floorIds: undefined, // 楼层
    Berths: undefined, // 铺位
    deviceType: undefined, // 设备类型
    deviceCode: '系统自动生成', // 设备编号
    deviceName: undefined, // 设备名称
    isIntellectDevice: 1, // 是否智能设备
    costProjectId: undefined, // 费用项目
    magnification: undefined, // 倍率
    maxReadNum: undefined, // 设备最大读数
    LossRate: undefined, // 损耗率
    lastDate: new Date(), // 上期抄录日期
    currentReadNum: undefined, // 上期读数
    unitPrice: undefined, // 单价
    isCludeRate: 1, // 是否包含税
    taxRate: undefined, // 税率
    hardwareCode: undefined, // 硬件编号
    brand: undefined // 品牌
  });
  const isRelevance = ref(false); // 是否关联能耗数据
  const formProps = computed<FormOptions>(() => ({
    menuForm: false,
    layout: 'vertical',
    columns: [
      {
        label: '设备类型',
        prop: 'deviceType',
        type: 'select',
        dic: deviceTypeList,
        options: {
          disabled: isRelevance.value
        },
        placeholder: '请选择设备类型',
        rules: [{ required: true, message: '设备类型不能为空' }]
      },
      {
        label: '设备编号',
        prop: 'deviceCode',
        options: {
          disabled: true,
          placeholder: '请输入设备编号'
        }
      },
      {
        label: '设备名称',
        prop: 'deviceName',
        options: {
          disabled: false,
          placeholder: '请输入设备名称',
          maxLength: 60
        },
        rules: [{ required: true, message: '设备名称不能为空' }]
      },
      {
        label: '是否智能设备',
        prop: 'isIntellectDevice',
        type: 'select',
        dic: IntellectDeviceList,
        placeholder: '请选择',
        rules: [{ required: true, message: '请选择是否智能设备' }],
        options: {
          disabled: isRelevance.value,
          onChange(v: number) {
            editForm.value.isIntellectDevice = v;
            editForm.value.maxReadNum = undefined;
            iFormRef.value.clearValidate();
          }
        }
      },
      {
        label: '费用项目',
        prop: 'costProjectId',
        type: 'select',
        placeholder: '请选择费用项目',
        dic: costProjectList.value,
        rules: [{ required: true, message: '费用项目不能为空' }]
      },
      {
        label: '倍率',
        prop: 'magnification',
        type: 'inputNumber',
        options: {
          disabled: false,
          placeholder: '请输入',
          min: 1,
          max: 99.99,
          formatter: (value: any) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          parser: (value: any) => `${value}`.replace(/\$\s?|(,*)/g, ''),
          precision: 2
        }
      },
      {
        label: '设备最大读数',
        prop: 'maxReadNum',
        type: 'inputNumber',
        options: {
          disabled: false,
          placeholder: '请输入'
        },
        rules:
          editForm.value.isIntellectDevice === 1
            ? []
            : [{ required: true, message: '设备最大读数不能为空' }]
      },
      {
        label: '损耗率',
        prop: 'LossRate',
        type: 'inputNumber',
        options: {
          disabled: false,
          placeholder: '请输入'
        }
      },
      {
        label: '上期抄录日期',
        prop: 'lastDate',
        type: 'date',
        rules: [{ required: true, message: '上期抄录日期不能为空' }]
      },
      {
        label: '当前读数',
        prop: 'currentReadNum',
        type: 'inputNumber',
        options: {
          disabled: false,
          placeholder: '请输入'
        },
        rules: [{ required: true, message: '当前读数不能为空' }]
      },
      {
        label: '单价',
        prop: 'unitPrice',
        type: 'inputNumber',
        options: {
          disabled: false,
          placeholder: '请输入'
        },
        rules: [{ required: true, message: '单价不能为空' }]
      },
      {
        label: '税率',
        prop: 'taxRate',
        type: 'inputNumber',
        options: {
          disabled: false,
          placeholder: '请输入'
        },
        rules: [{ required: true, message: '税率不能为空' }]
      },
      {
        label: '硬件编号',
        prop: 'hardwareCode',
        options: {
          disabled: false,
          maxLength: 60,
          placeholder: '请输入硬件编号'
        }
      },
      {
        label: '品牌',
        prop: 'brand',
        options: {
          disabled: false,
          maxLength: 60,
          placeholder: '请输入品牌'
        }
      }
    ]
  }));
  const onCancel = () => {
    Modal.open({
      title: '取消确认',
      content: '取消后不保存本次编辑内容，是否取消？',
      onOk: async () => {
        visible.value = false;
      }
    });
  };
  const onSubmit = async () => {
    const res1 = await formRef.value.validate();
    if (res1) return false;
    if (!editForm.value.buildingId) return Message.warning('请选择楼宇~');
    if (!editForm.value?.floorIds || editForm.value?.floorIds?.length < 1)
      return Message.warning('请选择楼层~');
    if (!editForm.value.Berths || editForm.value.Berths?.length < 1)
      return Message.warning('请选择铺位~');
    const res2 = await iFormRef.value?.submit();
    if (!res1 && !res2) {
      try {
        // 当前读数计算规则：判断 本期（当前）和上期读数的大小，
        // 小于的话 当前读数 = 最大读数 - 上期 + 本期（当前）  大于的话：当前读数 =  本期 - 上期
        // let lastReadNumber = 0; // '接口返回的上期读数'
        // if (Number(editForm.value.currentReadNum) < Number(lastReadNumber)) {
        //   editForm.value.currentReadNum = Number(editForm.value.maxReadNum) - lastReadNumber - Number(editForm.value.currentReadNum)
        // } else {
        //   editForm.value.currentReadNum = Number(editForm.value.currentReadNum) - lastReadNumber
        // }
        console.log(editForm.value, '提交信息');
        if (editForm.value.id) {
          editDevice();
        } else {
          addDevice();
        }
      } catch (e) {
      } finally {
      }
    }
  };
  const onProjectChange = (v: any) => {
    floorData.value = [];
    berthData.value = [];
    editForm.value.buildingId = undefined;
    editForm.value.costProjectId = undefined;
    editForm.value.floorIds = [];
    selectedKeys.value = [];
    editForm.value.Berths = [];
    getBuildingData(v);
    getCostProjectList(v);
  };
  const onBuildChange = (v: any) => {
    berthData.value = [];
    editForm.value.floorIds = [];
    selectedKeys.value = [];
    editForm.value.Berths = [];
    getFloorData(v);
  };
  const onFloorChange = () => {
    berthData.value = [];
    getBerthData();
    selectedKeys.value = [];
    editForm.value.Berths = [];
  };

  const buildingData = ref<CbdApiProjectCommonBuildingListSelectGetResponse>(
    []
  );
  const floorData = ref<CbdApiProjectCommonBuildingFloorListSelectGetResponse>(
    []
  );
  const berthData = ref<any>([]);
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
  const [getBerthData] = useFuncProxy(async () => {
    const floorIds: any = editForm.value.floorIds?.map((item: any) => item);
    const res: any = await cbdApiProjectCommonEstateSelectListGet({
      floorIds,
      doorPlate: searchStoreId.value
    });
    isLoading.value = false;
    berthData.value = res.map((item: any) => {
      return {
        id: item.estate?.id,
        berthNumber: item.estate?.doorPlate,
        floorage: item.estate?.acreage,
        useArea: item.estate?.useAcreage
      };
    });
  });
  // 新增
  const [addDevice, loading] = useFuncProxy(async () => {
    const params: addParamsType = {
      projectId: Number(editForm.value.projectId),
      buildingId: Number(editForm.value.buildingId),
      buildingFloorIds: editForm.value.floorIds || [],
      estateSnapshotIds: editForm.value.Berths || [],
      deviceType: Number(editForm.value.deviceType),
      deviceName: editForm.value.deviceName || '',
      intelligentDevice: Number(editForm.value.isIntellectDevice),
      expenseItem: Number(editForm.value.costProjectId),
      rate: editForm.value.magnification,
      deviceMaxReadOut: Number(editForm.value.maxReadNum),
      lossRate: editForm.value.LossRate,
      previousMeterReadingDate: dayjs(editForm.value.lastDate || '').format(
        'YYYY-MM-DD'
      ),
      nowReadOutNum: Number(editForm.value.currentReadNum),
      price: Number(editForm.value.unitPrice),
      rateType: Number(editForm.value.isCludeRate),
      rateNum: Number(editForm.value.taxRate),
      hardwareCode: editForm.value.hardwareCode,
      brand: editForm.value.brand
    };
    await cbdApiProjectEstateEnergyConsumeDeviceAddPost(params);
    estateManageStore.setFormData(JSON.parse(JSON.stringify(editForm.value)));
    Message.success('操作成功!');
    visible.value = false;
    emits('reset');
  });
  // 编辑
  const [editDevice, editLoading] = useFuncProxy(async () => {
    const params: updateParamsType = {
      id: Number(editForm.value.id),
      projectId: Number(editForm.value.projectId),
      buildingId: Number(editForm.value.buildingId),
      buildingFloorIds: editForm.value.floorIds || [],
      estateSnapshotIds: editForm.value.Berths || [],
      deviceType: Number(editForm.value.deviceType),
      deviceName: editForm.value.deviceName || '',
      intelligentDevice: Number(editForm.value.isIntellectDevice),
      expenseItem: Number(editForm.value.costProjectId),
      rate: editForm.value.magnification,
      deviceMaxReadOut: Number(editForm.value.maxReadNum),
      lossRate: editForm.value.LossRate,
      previousMeterReadingDate: dayjs(editForm.value.lastDate || '').format(
        'YYYY-MM-DD'
      ),
      nowReadOutNum: Number(editForm.value.currentReadNum),
      price: Number(editForm.value.unitPrice),
      rateType: Number(editForm.value.isCludeRate),
      rateNum: Number(editForm.value.taxRate),
      hardwareCode: editForm.value.hardwareCode,
      brand: editForm.value.brand
    };
    await cbdApiProjectEstateEnergyConsumeDeviceUpdatePut(params);
    Message.success('操作成功!');
    visible.value = false;
    emits('reset');
  });

  type optionItem = {
    label?: string;
    value?: string | number;
  };
  const projectList = ref<optionItem[]>([]);
  const costProjectList = ref<optionItem[]>([]);
  const [getProjectList] = useFuncProxy(async () => {
    projectList.value = await cbdApiProjectCommonProjectSelectListGet({});
  });
  const [getCostProjectList] = useFuncProxy(async (projectId) => {
    const res = await cbdApiProjectCommonMisSelectExpenseGet({
      projectId
    });
    costProjectList.value = res?.map((item: any) => {
      return {
        label: item?.expenseType,
        value: item?.expenseId
      };
    });
  });

  const [initEditInfo] = useFuncProxy(async () => {
    const res: detailDataType =
      await cbdApiProjectEstateEnergyConsumeDeviceInfoIdGet({
        id: props.rowId
      });
    // 编辑回显的时候要看，有些默认值是否存在，不存在特殊 处理
    editForm.value = {
      id: res.id,
      projectId: res.projectId,
      buildingId: res.buildingId, // 楼宇
      floorIds: res.buildingFloorIds || [], // 楼层
      Berths: res.estateSnapshotIds || [], // 铺位
      deviceType: res.deviceType, // 设备类型
      deviceCode: String(res.deviceCode), // 设备编号
      deviceName: res.deviceName, // 设备名称
      isIntellectDevice: res.intelligentDevice, // 是否智能设备
      costProjectId: res.expenseItem, // 费用项目
      magnification: res.rate, // 倍率
      maxReadNum: res.deviceMaxReadOut, // 设备最大读数
      LossRate: res.lossRate, // 损耗率
      lastDate: res.previousMeterReadingDate, // 上期抄录日期
      currentReadNum: res.nowReadOutNum, // 上期读数
      unitPrice: res.price, // 单价
      isCludeRate: res.rateType, // 是否包含税
      taxRate: res.rateNum, // 税率
      hardwareCode: res.hardwareCode, // 硬件编号
      brand: res.brand, // 品牌
      ecRecordState: res.ecRecordState // 是否已关联能耗记录（1：是、2：否）
    };
    isRelevance.value = res.ecRecordState == 1;
    selectedKeys.value = res.estateSnapshotIds || []; // 铺位回显
    // selectedKeys.value = [721, 970]; // 铺位回显  测试
    // 编辑回显下拉数据 初始化
    getBuildingData(res.projectId);
    getCostProjectList(res.projectId);
    getFloorData(res.buildingId);
    getBerthData();
  });

  const initBaseInfo = () => {
    // todo: 调接口回显上一次操作的数据
    const FormData = JSON.parse(
      sessionStorage.getItem('lastTimeSubmitFormData') || '{}'
    );
    editForm.value = {
      id: undefined,
      projectId: FormData.projectId || undefined,
      buildingId: undefined, // 楼宇
      floorIds: undefined, // 楼层
      Berths: undefined, // 铺位
      deviceType: FormData.deviceType || undefined, // 设备类型
      deviceCode: '系统自动生成', // 设备编号
      deviceName: undefined, // 设备名称
      isIntellectDevice: 1, // 是否智能设备
      costProjectId: FormData.costProjectId || undefined, // 费用项目
      magnification: undefined, // 倍率
      maxReadNum: undefined, // 设备最大读数
      LossRate: undefined, // 损耗率
      lastDate: new Date(), // 上期抄录日期
      currentReadNum: undefined, // 上期读数
      unitPrice: undefined, // 单价
      isCludeRate: FormData.isCludeRate || 1, // 是否包含税
      taxRate: undefined, // 税率
      hardwareCode: undefined, // 硬件编号
      brand: undefined // 品牌
    };
    isRelevance.value = false;
    // // 新增回显上次选择项目后的费用项目下拉数据
    if (FormData.projectId) {
      floorData.value = [];
      berthData.value = [];
      selectedKeys.value = [];
      getBuildingData(FormData.projectId);
      getCostProjectList(FormData.projectId);
    }
  };
  watch(
    () => props.modelValue,
    (v) => {
      if (v && props.rowId) {
        initEditInfo();
      }
      if (v && !props.rowId) {
        // 新增
        initBaseInfo();
      }
    }
  );
  onMounted(() => {
    getProjectList();
  });
</script>

<style scoped lang="less">
  .energy-model-box {
    :deep(.arco-picker),
    :deep(.arco-select),
    :deep(.arco-input-wrapper) {
      background: #fff;
      border: 1px solid #dcdcdc;
      border-radius: 4px;
    }
    :deep(.arco-input-append) {
      border: 1px solid #dcdcdc;
      border-radius: 0 4px 4px 0;
    }
    :deep(.arco-input-prepend) {
      border-radius: 4px 0 0 4px;
      border: 1px solid #dcdcdc;
    }
    .slorInput {
      :deep(.arco-input-wrapper) {
        border-right: none !important;
        border-radius: 4px 0 0 4px !important;
      }
      :deep(.arco-input-append) {
        border-left: none !important;
      }
      :deep(.arco-input-prepend) {
        border: none !important;
      }
    }
    .rateSelect {
      :deep(.arco-select) {
        background: rgba(242, 243, 245) !important;
        border-radius: 4px 0 0 4px !important;
        border: none !important;
        border-left: 1px solid #dcdcdc !important;
      }
      :deep(.arco-input-wrapper) {
        border-radius: 0 !important;
        border-left: none !important;
        border-right: none !important;
      }
    }
    .noDataBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 290px;

      & > img {
        display: inline-block;
        width: 162px;
        height: 120px;
        margin-bottom: 16px;
      }

      & > span {
        font-size: 14px;
        color: #333333;
      }
    }

    .title {
      font-size: 16px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 24px;
      margin-bottom: 16px;
    }

    :deep(.equipment_form) {
      .card {
        margin-bottom: 0 !important;
        padding: 0 !important;
      }
    }
  }
</style>
