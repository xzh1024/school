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
    <div class="energy-add-box">
      <a-card :bordered="false">
        <div class="title">设备信息</div>
        <i-form
          ref="iFormRef"
          v-model="editForm"
          class="equipment_form"
          :options="formProps"
        ></i-form>
      </a-card>
      <a-card :bordered="false">
        <div class="title">设备读数</div>
        <div class="info_ul">
          <div
            v-for="(item, index) in equipmentData"
            :key="index"
            class="info_li"
          >
            <span>{{ item.label }}</span>
            <div>{{ item.value }}</div>
          </div>
        </div>
        <i-form
          ref="iFormRef2"
          v-model="editForm"
          class="equipment_form"
          :options="formProps2"
        >
          <template #currentReadNumForm>
            <a-input-number
              v-model="editForm.currentReadNum"
              class="slotInput"
              placeholder="请输入"
              :allow-clear="true"
            >
              <template #append>
                {{ editForm.deviceType === 2 ? 'kwh' : 'm³' }}
              </template>
            </a-input-number>
          </template>
          <template #unitPriceForm>
            <a-input-number
              v-model="editForm.unitPrice"
              class="slotInput"
              placeholder="请输入"
              :allow-clear="true"
            >
              <template #append>{{
                editForm.deviceType === 2 ? '元/kwh' : '元/m³'
              }}</template>
            </a-input-number>
          </template>
        </i-form>
      </a-card>
      <a-card :bordered="false">
        <div class="info_ul" style="margin-bottom: 0">
          <div class="info_li">
            <span>本期时间范围</span>
            <div>{{ timeRange }}</div>
          </div>
          <div class="info_li">
            <span>本期用量</span>
            <div
              >{{ currentConsumption }}
              {{ editForm.deviceType === 2 ? 'kwh' : 'm³' }}</div
            >
          </div>
          <div class="info_li">
            <span>本期费用</span>
            <div>￥{{ currentFree }}</div>
          </div>
        </div>
      </a-card>
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
  import {
    cbdApiProjectEstateEnergyConsumeRecordAddPost,
    CbdApiProjectEstateEnergyConsumeRecordAddPostRequest as addParamsType,
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectEstateEnergyConsumeRecordUpdatePut,
    CbdApiProjectEstateEnergyConsumeRecordUpdatePutRequest as updateParamsType,
    cbdApiProjectCommonBuildingListSelectGet,
    cbdApiProjectCommonBuildingFloorListSelectGet,
    CbdApiProjectCommonBuildingListSelectGetResponse,
    CbdApiProjectCommonBuildingFloorListSelectGetResponse,
    cbdApiProjectCommonDeviceSelectListGet,
    CbdApiProjectCommonDeviceSelectListGetResponse,
    cbdApiProjectEstateEnergyConsumeRecordEditInitIdGet,
    cbdApiProjectEstateEnergyConsumeDeviceInfoIdGet,
    CbdApiProjectEstateEnergyConsumeDeviceInfoIdGetResponse as deviceDetailDataType,
    cbdApiProjectEstateEnergyConsumeRecordInfoIdGet
  } from '@/api';
  import { deviceTypeList, IntellectDeviceList } from '@/utils/dic';
  import { useEstateManageStore } from '@/store';
  import NP from 'number-precision';
  const estateManageStore = useEstateManageStore();
  const iFormRef: Ref = ref(null);
  const iFormRef2: Ref = ref(null);
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
  const isIntellectDevice = ref(false); // 是否是智能设备
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      iFormRef.value?.resetFields();
      iFormRef2.value?.resetFields();
      emits('update:modelValue', v);
    }
  });
  const deviceDetailInfo = ref<any>({});
  const [getDeviceDetail] = useFuncProxy(async (id) => {
    const res = await cbdApiProjectEstateEnergyConsumeDeviceInfoIdGet({ id });
    deviceDetailInfo.value = { ...res };
    isIntellectDevice.value = res.intelligentDevice == 1;
    // isIntellectDevice.value = true; 测试
  });
  const dataTimeAddOne = (v: string) => {
    let dateTime: any = new Date(`${v}`);
    dateTime = dateTime.setDate(dateTime.getDate() + 1);
    return dayjs(dateTime).format('YYYY-MM-DD');
  };
  const timeRange = computed(() => {
    return `${
      editForm.value.lastDate
        ? dataTimeAddOne(editForm.value.lastDate || '')
        : ''
    } - ${dayjs(editForm.value.currentDate).format('YYYY-MM-DD')}`;
  });
  const currentConsumption = computed(() => {
    if (!isIntellectDevice.value) {
      // 非智能设备
      if (
        Number(editForm.value.currentReadNum || 0) <
        Number(editForm.value.lastReadNum || 0)
      ) {
        //（设备最大读数-上期读数+本期读数）*倍率*（1+损耗率）
        return NP.times(
          editForm.value.currentReadNum
            ? NP.plus(
                NP.minus(
                  Number(deviceDetailInfo.value.deviceMaxReadOut || 0),
                  Number(editForm.value.lastReadNum || 0)
                ),
                Number(editForm.value.currentReadNum || 0)
              )
            : 0,
          Number(deviceDetailInfo.value?.rate || 1),
          NP.plus(1, (deviceDetailInfo.value.lossRate || 0) / 100)
        ).toFixed(2);
      } else {
        // （本期读数-上期读数）*倍率*（1+损耗率）
        return NP.times(
          NP.minus(
            Number(editForm.value.currentReadNum || 0),
            Number(editForm.value.lastReadNum || 0)
          ),
          Number(deviceDetailInfo.value?.rate || 1),
          NP.plus(1, (deviceDetailInfo.value.lossRate || 0) / 100)
        ).toFixed(2);
      }
    }
    // 智能设备
    if (
      Number(editForm.value.currentReadNum || 0) <
      Number(editForm.value.lastReadNum || 0)
    ) {
      // 智能设备： 本期读数低于上期读数，存在 数据未录入或者数据记录异常
      return 0.0;
    }
    // (本期-上期) * 倍率 * (1 + 损耗率)
    return NP.times(
      NP.minus(
        Number(editForm.value.currentReadNum || 0),
        Number(editForm.value.lastReadNum || 0)
      ),
      Number(deviceDetailInfo.value?.rate || 1),
      NP.plus(1, (deviceDetailInfo.value.lossRate || 0) / 100)
    ).toFixed(2);
  });
  const currentFree = computed(() => {
    if (deviceDetailInfo.value?.rateType == 1) {
      // 含税： 本期用量*本期单价
      return NP.times(
        Number(editForm.value.unitPrice || 0),
        Number(currentConsumption.value)
      ).toFixed(2);
    }
    // 不含税：本期用量*本期单价 *（1+税率）
    return NP.times(
      Number(editForm.value.unitPrice || 0),
      Number(currentConsumption.value),
      NP.plus(1, NP.divide(deviceDetailInfo.value?.rateNum || 0, 100))
    ).toFixed(2);
  });
  const editForm = ref<EditForm>({
    id: undefined,
    projectId: undefined,
    buildingId: undefined, // 楼宇
    floorId: undefined, // 楼层
    deviceType: undefined, // 设备类型
    deviceCode: undefined, // 设备id
    lastDate: '', // 上期抄录日期
    lastReadNum: 0, // 上期读数
    lastUnitPrice: 0, // 上期单价
    currentDate: new Date(), // 本期抄录日期
    currentReadNum: undefined, // 本期读数
    unitPrice: undefined // 本期单价
  });
  const priceUnit = computed(() => {
    return editForm.value.deviceType == 2 ? 'kwh' : 'm³';
  });
  const equipmentData = computed(() => {
    return [
      {
        label: '上期抄表日期',
        value: `${editForm.value.lastDate || '--'}`
      },
      {
        label: '上期读数',
        value: `${editForm.value.lastReadNum}${priceUnit.value}`
      },
      {
        label: '上期单价',
        value: `${editForm.value.lastUnitPrice}元/${priceUnit.value}`
      }
    ];
  });
  const formProps = computed<FormOptions>(() => ({
    menuForm: false,
    layout: 'vertical',
    columns: [
      {
        label: '项目名称',
        prop: 'projectId',
        type: 'select',
        dic: projectList.value,
        placeholder: '请选择项目名称',
        rules: [{ required: true, message: '项目名称不能为空' }],
        options: {
          disabled: Boolean(editForm.value.id) // 编辑时，项目名称不能编辑
        },
        on: {
          change(v: string) {
            editForm.value = {
              ...editForm.value,
              projectId: v
            };
            getBuildingData(v);
            // 清空时 干掉下级数据
            buildingData.value = [];
            floorData.value = [];
            editForm.value.buildingId = '';
            editForm.value.floorId = '';
          }
        }
      },
      {
        label: '楼宇',
        prop: 'buildingId',
        type: 'select',
        dic: buildingData.value,
        placeholder: '请选择楼宇',
        on: {
          change(v: string) {
            editForm.value = {
              ...editForm.value,
              buildingId: v
            };
            getFloorData(v);
            // 清空时 干掉下级数据
            floorData.value = [];
            editForm.value.floorId = '';
          }
        },
        rules: [{ required: true, message: '楼宇不能为空' }]
      },
      {
        label: '楼层',
        prop: 'floorId',
        type: 'select',
        dic: floorData.value,
        placeholder: '请选择楼层',
        on: {
          change(v: string) {
            editForm.value = {
              ...editForm.value,
              floorId: v
            };
            editForm.value.deviceCode = '';
            getDeviceSelectList();
          }
        },
        rules: [{ required: true, message: '楼层不能为空' }]
      },
      {
        label: '设备类型',
        prop: 'deviceType',
        type: 'select',
        dic: deviceTypeList,
        on: {
          change(v: string) {
            editForm.value = {
              ...editForm.value,
              deviceType: v
            };
            editForm.value.deviceCode = '';
            getDeviceSelectList();
          }
        },
        placeholder: '请选择设备类型',
        rules: [{ required: true, message: '设备类型不能为空' }]
      },
      {
        label: '设备名称和编号',
        prop: 'deviceCode',
        type: 'select',
        dic: deviceData.value,
        placeholder: '请选择设备',
        options: {
          allowSearch: true
        },
        on: {
          change(v: string) {
            editForm.value = {
              ...editForm.value,
              deviceCode: v
            };
            initBaseInfo(v);
            getDeviceDetail(v);
          }
        },
        rules: [{ required: true, message: '设备名称和编号不能为空' }]
      }
    ]
  }));
  const formProps2 = computed<FormOptions>(() => ({
    menuForm: false,
    layout: 'vertical',
    columns: [
      {
        label: '本期抄表日期',
        prop: 'currentDate',
        type: 'date',
        options: {
          valueFormat: 'YYYY-MM-DD',
          disabledDate: (current: any) =>
            dayjs(current).isBefore(
              dayjs(dataTimeAddOne(editForm.value.lastDate || ''))
            )
        },
        rules: [{ required: true, message: '本期抄表日期不能为空' }]
      },
      {
        label: '本期读数',
        prop: 'currentReadNum',
        type: 'inputNumber',
        rules: [{ required: true, message: '本期读数不能为空' }]
      },
      {
        label: '本期单价',
        prop: 'unitPrice',
        type: 'inputNumber',
        rules: [{ required: true, message: '本期单价不能为空' }]
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
    const res1 = await iFormRef.value?.submit();
    const res2 = await iFormRef2.value?.submit();
    if (!res1 && !res2) {
      try {
        if (
          !dayjs(
            dayjs(editForm.value.currentDate).format('YYYY-MM-DD')
          ).isAfter(dayjs(editForm.value.lastDate))
        ) {
          return Message.warning('本期抄表日期必大于上期抄表日期!');
        }
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

  const [addDevice, loading] = useFuncProxy(async () => {
    const params: addParamsType = {
      projectId: Number(editForm.value.projectId),
      buildingId: Number(editForm.value.buildingId),
      buildingFloorId: Number(editForm.value.floorId),
      deviceType: Number(editForm.value.deviceType),
      deviceId: Number(editForm.value.deviceCode),
      currentMeterReadingDate: dayjs(editForm.value.currentDate).format(
        'YYYY-MM-DD'
      ),
      currentReadOutNum: Number(editForm.value.currentReadNum),
      currentPrice: Number(editForm.value.unitPrice)
    };
    await cbdApiProjectEstateEnergyConsumeRecordAddPost(params);
    estateManageStore.setRecordFormData(
      JSON.parse(JSON.stringify(editForm.value))
    );
    Message.success('操作成功!');
    visible.value = false;
    emits('reset');
  });
  const [editDevice, editLoading] = useFuncProxy(async () => {
    const params: updateParamsType = {
      id: Number(editForm.value.id),
      projectId: Number(editForm.value.projectId),
      buildingId: Number(editForm.value.buildingId),
      buildingFloorId: Number(editForm.value.floorId),
      deviceType: Number(editForm.value.deviceType),
      deviceId: Number(editForm.value.deviceCode),
      currentMeterReadingDate: dayjs(editForm.value.currentDate).format(
        'YYYY-MM-DD'
      ),
      currentReadOutNum: Number(editForm.value.currentReadNum),
      currentPrice: Number(editForm.value.unitPrice)
    };
    await cbdApiProjectEstateEnergyConsumeRecordUpdatePut(params);
    Message.success('操作成功!');
    visible.value = false;
    emits('reset');
  });

  type optionItem = {
    label?: string;
    value?: string | number;
    code?: string;
  };
  const projectList = ref<optionItem[]>([]);
  const [getProjectList] = useFuncProxy(async () => {
    const res = await cbdApiProjectCommonProjectSelectListGet({});
    projectList.value = res;
  });
  const buildingData = ref<CbdApiProjectCommonBuildingListSelectGetResponse>(
    []
  );
  const floorData = ref<CbdApiProjectCommonBuildingFloorListSelectGetResponse>(
    []
  );
  const deviceData = ref<CbdApiProjectCommonDeviceSelectListGetResponse>([]);
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
  const [getDeviceSelectList] = useFuncProxy(async () => {
    const res: any = await cbdApiProjectCommonDeviceSelectListGet({
      buildingId: editForm.value.buildingId,
      buildingFloorId: editForm.value.floorId,
      deviceType: editForm.value.deviceType
        ? String(editForm.value.deviceType)
        : ''
    });
    deviceData.value = res.map((item: optionItem) => {
      return {
        label: `${item.label}(${item.code})`,
        value: item.value
      };
    });
  });
  const [initEditInfo] = useFuncProxy(async () => {
    console.log(props.rowId, 'hahaha ');
    const res: any = await cbdApiProjectEstateEnergyConsumeRecordInfoIdGet({
      id: props.rowId
    });
    // 编辑回显的时候要看，有些默认值是否存在，不存在特殊 处理
    editForm.value = {
      id: res.id,
      projectId: res.projectId,
      buildingId: res.buildingId, // 楼宇
      floorId: res.buildingFloorId, // 楼层
      deviceType: res.deviceType, // 设备类型
      deviceCode: res.deviceId, // 设备id
      lastDate: res.previousMeterReadingDate, // 上期抄录日期
      lastReadNum: res.previousReadOutNum, // 上期读数
      lastUnitPrice: res.previousPrice, // 上期单价
      currentDate: res.currentMeterReadingDate, // 本期抄录日期
      currentReadNum: res.currentReadOutNum, // 本期读数
      unitPrice: res.currentPrice // 本期单价
    };
    // 回显 初始化 楼宇下拉数据
    getBuildingData(res.projectId);
    getFloorData(res.buildingId);
    getDeviceSelectList();
    getDeviceDetail(res.deviceId); // 查询设备详情（倍率、是否是智能设备等）
  });
  // 查询上次记录信息
  const [initBaseInfo] = useFuncProxy(async (id) => {
    const res: any = await cbdApiProjectEstateEnergyConsumeRecordEditInitIdGet({
      id: id || 1
    });
    editForm.value.lastDate = res.previousMeterReadingDate;
    editForm.value.lastReadNum = res.previousReadOutNum;
    editForm.value.lastUnitPrice = res.previousPrice;
  });

  watch(
    () => props.modelValue,
    (v) => {
      if (v && props.rowId) {
        // 编辑
        initEditInfo();
      }
      if (v && !props.rowId) {
        // 新增
        // todo: 调接口回显上一次操作的数据
        console.log('lastTimeD');
        const FormData = JSON.parse(
          sessionStorage.getItem('lastTimeSubmitRecordFormData') || '{}'
        );
        editForm.value = {
          id: undefined,
          projectId: FormData.projectId, // 项目
          buildingId: undefined, // 楼宇
          floorId: undefined, // 楼层
          deviceType: FormData.deviceType, // 设备类型
          deviceCode: undefined, // 设备编号
          lastDate: '', // 上期抄录日期
          lastReadNum: 0, // 上期读数
          lastUnitPrice: 0, // 上期单价
          currentDate: new Date(), // 本期抄录日期
          currentReadNum: undefined, // 本期读数
          unitPrice: undefined // 本期单价
        };
        // 根据缓存的项目id 初始化 楼宇下拉数据
        FormData.projectId && getBuildingData(FormData.projectId);
      }
    }
  );
  onMounted(() => {
    getProjectList();
  });
</script>

<style scoped lang="less">
  .energy-add-box {
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
    .slotInput {
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
    width: 100%;

    // :deep(.equipment_form) {
    //     .arco-form-item {
    //         margin-bottom: 0 !important;
    //     }
    // }

    .info_ul {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 16px;

      .info_li {
        width: 25%;
        display: flex;
        flex-direction: column;
        margin-right: 3px;

        & > span {
          font-size: 14px;
          font-family: PingFang SC-Medium, PingFang SC;
          color: #999999;
          line-height: 22px;
          margin-bottom: 8px;
        }

        & > div {
          font-size: 14px;
          font-family: PingFang SC-Medium, PingFang SC;
          color: #333333;
          line-height: 22px;
          word-break: break-all;
          padding-right: 10px;
        }
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
