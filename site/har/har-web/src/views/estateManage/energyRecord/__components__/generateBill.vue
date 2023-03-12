<template>
  <drawer v-model="visible" title="生成账单" width="60%">
    <template #footer>
      <!-- <a-button @click="onSubmit('draft')">保存草稿</a-button> -->
      <a-button @click="onCancel">取消</a-button>
      <a-button type="primary" :loading="loading" @click="onSubmit">
        生成账单
      </a-button>
    </template>
    <div class="energy-add-box">
      <a-card :bordered="false">
        <div class="title">生成账单</div>
        <i-form
          ref="iFormRef"
          v-model="editForm"
          class="equipment_form"
          :options="formProps"
        >
          <template #menuForm>
            <a-button type="primary" @click="onAllCount">计算</a-button>
          </template>
          <template #dateMonthForm>
            <a-month-picker
              v-model="editForm.dateMonth"
              placeholder="请选择"
              :allow-clear="true"
            />
          </template>
        </i-form>
      </a-card>
      <template v-for="(item, index) in billData" :key="index">
        <DivideTemplate
          :ref="(el) => (RefDom[index] = el)"
          :data-title="`${item.infoData.deviceCode} ${item.infoData.deviceName}`"
          :info-data="item.infoData"
          :electricity-table-data="item.electricityTableData"
          :cache-electricity-table-data="item.cacheElectricityTableData"
          :columns="columns"
          :electricity-meter-data="item.electricityMeterData"
          @onReCount="onReCount"
        >
        </DivideTemplate>
      </template>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import {
    ref,
    Ref,
    computed,
    onMounted,
    reactive,
    watch,
    nextTick
  } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import type { EditForm } from '../type/useAddModel';
  import IForm from '@/components/i-form/index.vue';
  import { FormOptions } from '@/components/i-form/index';
  import DivideTemplate from './divideTemplate.vue';
  import dayjs from 'dayjs';
  import {
    cbdApiProjectEstateEnergyConsumeBillEditInitGet,
    CbdApiProjectEstateEnergyConsumeBillEditInitGetResponse as initBillDataType,
    cbdApiProjectEstateEnergyConsumeBillCalculationPut,
    cbdApiProjectEstateEnergyConsumeBillAddPost,
    CbdApiProjectEstateEnergyConsumeBillAddPostRequest as requestParams
  } from '@/api';
  import { deviceTypeList } from '@/utils/dic';
  import type { PropType } from 'vue';
  const RefDom = ref<any>([]);
  const iFormRef: Ref = ref(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    ids: {
      type: Array as PropType<number[]>,
      default: []
    }
  });
  const emits = defineEmits(['update:modelValue', 'reset']);

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      iFormRef.value?.resetFields();
      emits('update:modelValue', v);
    }
  });
  type Form = {
    currentDate?: string | Date;
    divideWay?: number;
    dateMonth?: string | Date;
  };
  const editForm = ref<Form>({
    currentDate: new Date(), // 账单生成日
    divideWay: undefined, // 分摊方式
    dateMonth: new Date() // 账期
  });
  const formProps = computed<FormOptions>(() => ({
    menuForm: true,
    menuColClass: 'generateBillCount',
    layout: 'vertical',
    columns: [
      {
        label: '账单生成日',
        prop: 'currentDate',
        type: 'date',
        placeholder: '请选择',
        rules: [{ required: true, message: '账单生成日不能为空' }],
        options: {
          valueFormat: 'YYYY-MM-DD'
        }
      },
      {
        label: '分摊方式',
        prop: 'divideWay',
        type: 'select',
        dic: [
          {
            label: '按面积分摊',
            value: 1
          },
          {
            label: '平均分摊',
            value: 2
          }
        ],
        placeholder: '请选择分摊方式',
        rules: [{ required: true, message: '分摊方式不能为空' }]
      },
      {
        label: '账期',
        prop: 'dateMonth',
        type: 'date',
        placeholder: '请选择',
        rules: [{ required: true, message: '账期不能为空' }],
        options: {
          valueFormat: 'YYYY-MM'
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
    const res1 = await iFormRef.value?.submit();
    if (res1) return false;
    const flag = RefDom.value.every((itemDom: any) => {
      console.log(itemDom.unDivideMoney);
      return itemDom.unDivideMoney == 0;
    });
    if (!flag) {
      Message.warning('请确保每个设备未分摊金额为0');
      return false;
    }
    if (!res1 && flag) {
      try {
        console.log(flag, '888dddddddddd');
        console.log(JSON.parse(JSON.stringify(editForm.value)), '提交信息');
        console.log(billData.value, 'shuj ');
        const dataArr = billData.value.map((item: any) => {
          return {
            recordId: item.infoData.id,
            billCreateDate: editForm.value.currentDate
              ? dayjs(editForm.value.currentDate).format('YYYY-MM-DD')
              : '',
            allocationMethod: editForm.value.divideWay,
            billTerm: editForm.value.dateMonth
              ? dayjs(editForm.value.dateMonth).format('YYYY-MM')
              : '',
            storeSubmitData: item.electricityTableData.map((it: any) => {
              return {
                storeId: it.storeId,
                cost: it.totalCost
              };
            })
          };
        });
        console.log(dataArr, 'dataArr');
        onAdd({ data: dataArr });
      } catch (e) {
      } finally {
      }
    }
  };
  // 计算
  const onAllCount = async () => {
    const res = await iFormRef.value?.validateFormField('divideWay');
    if (!res) {
      const responseData =
        await cbdApiProjectEstateEnergyConsumeBillCalculationPut({
          billCreateDate: editForm.value.currentDate
            ? dayjs(editForm.value.currentDate).format('YYYY-MM-DD')
            : '',
          allocationMethod: Number(editForm.value.divideWay),
          billTerm: editForm.value.dateMonth
            ? dayjs(editForm.value.dateMonth).format('YYYY-MM')
            : '',
          recordIds: props.ids
        });
      billData.value = billData.value.map((item: any) => {
        const currentObj: any = responseData.find(
          (it) => it.id === item.infoData.id
        );
        item.electricityTableData = currentObj.storeBillDetail;
        item.cacheElectricityTableData = JSON.parse(
          JSON.stringify(currentObj.storeBillDetail)
        );
        return item;
      });
      // nextTick(() => {
      //     // 数据赋值后重新开启数据变化入口，针对手动第一次输入，其他input清空
      //     RefDom.value.forEach((itemDom: any) => {
      //         itemDom.isSwitch = true;
      //     })
      // })
    }
  };
  // 每个demo的 重新计算
  const onReCount = async (recordId: number) => {
    const res = await iFormRef.value?.validateFormField('divideWay');
    if (!res) {
      const responseData =
        await cbdApiProjectEstateEnergyConsumeBillCalculationPut({
          billCreateDate: editForm.value.currentDate
            ? dayjs(editForm.value.currentDate).format('YYYY-MM-DD')
            : '',
          allocationMethod: Number(editForm.value.divideWay),
          billTerm: editForm.value.dateMonth
            ? dayjs(editForm.value.dateMonth).format('YYYY-MM')
            : '',
          recordIds: [recordId]
        });
      billData.value.forEach((item: any) => {
        const currentObj: any = responseData.find(
          (it) => it.id === item.infoData.id
        );
        if (item.infoData.id == recordId) {
          item.electricityTableData = currentObj.storeBillDetail;
          item.cacheElectricityTableData = JSON.parse(
            JSON.stringify(currentObj.storeBillDetail)
          );
        }
      });
      // nextTick(() => {
      //     // 数据赋值后重新开启数据变化入口，针对手动第一次输入，其他input清空
      //     RefDom.value.forEach((itemDom: any) => {
      //         if (itemDom.getTemplatePropsInfoData().id == recordId) {
      //             itemDom.isSwitch = true;
      //         }
      //     })
      // })
    }
  };
  type billDataType = {
    infoData: {
      totalMoney: number;
      deviceName: string;
      deviceCode: string;
      id: string;
    };
    electricityTableData: {
      billStartDate?: string;
      billEndDate?: string;
      merchantName?: string;
      merchantId?: string;
      storeName?: string;
      storeId?: string | number;
      snapshotName?: string;
      snapshotId?: string | number;
      totalCost?: string | number;
    }[];
    electricityMeterData: {
      label: string;
      value: string;
    }[];
  };
  const billData = ref([] as any);
  type columnItem = {
    title?: string;
    width?: number;
    dataIndex?: string;
    slotName?: string;
    align?: string;
    formatter?: (record: any) => void;
  };
  const columns = ref<columnItem[]>([
    {
      title: '序号',
      dataIndex: '_index',
      width: 75
    },
    {
      title: '费用期间',
      width: 220,
      dataIndex: 'billDate',
      formatter: (record) => {
        return `${record.billStartDate} - ${record.billEndDate}`;
      }
    },
    {
      title: '商户',
      dataIndex: 'merchantName'
    },
    {
      title: '店铺',
      dataIndex: 'storeName'
    },
    {
      title: '铺位号',
      dataIndex: 'estateName'
    },
    {
      title: '分摊金额(元)',
      width: 150,
      dataIndex: 'totalCost',
      slotName: 'totalCostSlot'
    }
    // {
    //     title: '操作',
    //     width: 100,
    //     align: 'center',
    //     dataIndex: 'menu',
    //     slotName: 'menuSlot'
    // },
  ]);

  const [onAdd, loading] = useFuncProxy(async (params) => {
    await cbdApiProjectEstateEnergyConsumeBillAddPost(params);
    Message.success('操作成功!');
    visible.value = false;
    emits('reset');
  });

  const [initEditInfo] = useFuncProxy(async () => {
    try {
      const res: initBillDataType =
        await cbdApiProjectEstateEnergyConsumeBillEditInitGet({
          recordIds: props.ids.join(',')
        });
      billData.value = res.map((item) => {
        return {
          infoData: {
            totalMoney: item.currentCost,
            deviceCode: item.deviceCode,
            deviceId: item.deviceId,
            deviceName: item.deviceName,
            id: item.recordId, // 用于组件添加 按钮 添加数据 记录id
            // id: index + 1, // 数据模拟
            verificationFunc: async () => {
              return await iFormRef.value?.validateFormField('divideWay');
            }
          },
          electricityTableData: item.storeList,
          cacheElectricityTableData: JSON.parse(JSON.stringify(item.storeList)),
          electricityMeterData: [
            {
              label: '设备类型',
              value: deviceTypeList.find(
                (itemDevice) => itemDevice.value == item.deviceType
              )?.label
            },
            {
              label: '费用项目',
              value: item.expenseItemName || '--'
            },
            {
              label: '单价',
              value: `${item.price || 0}元/${
                item.deviceType == 2 ? 'kwh' : 'm³'
              }`
            },
            {
              label: '税率',
              value: item.rateNum || '--'
            },
            {
              label: '上期抄表时间',
              value: item.previousMeterReadingDate || '--'
            },
            {
              label: '上期读数',
              value: `${item.previousReadOutNum || 0}${
                item.deviceType == 2 ? 'kwh' : 'm³'
              }`
            },
            {
              label: '上期总价',
              value: `￥${item.previousCost || '0'}`
            },
            {
              label: '本期抄表时间',
              value: item.currentMeterReadingDate || '--'
            },
            {
              label: '本期读数',
              value: `${item.currentReadOutNum || 0}${
                item.deviceType == 2 ? 'kwh' : 'm³'
              }`
            },
            {
              label: '本期单价',
              value: `${item.currentPrice || 0}元/${
                item.deviceType == 2 ? 'kwh' : 'm³'
              }`
            },
            {
              label: '本期总价',
              value: `￥${item.currentCost || '0'}`
            }
          ]
        };
      });
    } catch (error) {
      billData.value = [];
      console.log(error);
    }
    // nextTick(() => {
    //     // 数据赋值后重新开启数据变化入口，针对手动第一次输入，其他input清空
    //     RefDom.value.forEach((itemDom: any) => {
    //         itemDom.isSwitch = true;
    //     })
    // })
  });
  const [initBaseInfo] = useFuncProxy(async () => {
    // todo: 调接口回显上一次操作的数据
    console.log('lastTimeD');
    console.log(props.ids, 'hahaha ');
  });

  watch(
    () => props.modelValue,
    (v) => {
      if (v && props.ids) {
        // 生成账单初始化
        initEditInfo();
      }
      if (v && !props.ids) {
        // 新增
        initBaseInfo();
      }
    }
  );
  onMounted(() => {});
</script>

<style scoped lang="less">
  .energy-add-box {
    width: 100%;

    :deep(.generateBillCount) {
      height: 73px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      .arco-form-item {
        margin-bottom: 0;
        padding-right: 40%;
      }
    }

    :deep(.equipment_form) {
      .card {
        margin-bottom: 0 !important;
        padding: 0 !important;
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
  }
</style>
