<template>
  <drawer v-model="visible" :title="title" :footer="isEdit" @close="onClose">
    <template #footer>
      <!-- <a-button @click="onSubmit('draft')">保存草稿</a-button> -->
      <a-button @click="onClose">取消</a-button>
      <a-button type="primary" :loading="loading" @click="onSubmit">
        确认
      </a-button>
    </template>
    <div class="white-detail-box">
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        layout="vertical"
        :disabled="!isEdit"
      >
        <a-divider orientation="left">基本信息</a-divider>
        <a-row>
          <a-col :span="6">
            <a-form-item field="projectId" label="项目名称">
              <a-select
                v-model="form.projectId"
                placeholder="请选择项目名称"
                @change="handleProjectChange"
              >
                <a-option
                  v-for="item in projectList"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6" :offset="2">
            <a-form-item field="date" label="记录时间">
              <a-range-picker v-model="form.date" @change="getActionList" />
            </a-form-item>
          </a-col>
          <a-col :span="6" :offset="2">
            <a-form-item field="merchant" label="商户名称">
              <a-select
                v-model="form.merchant"
                placeholder="请选择商户名称"
                @change="handleMerchantChange"
              >
                <a-option
                  v-for="item in merchantList"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider v-show="!!form.deviceInfos.length" orientation="left">
          自用能耗
        </a-divider>
        <template v-for="(item, index) in form.deviceInfos" :key="index">
          <div v-if="item.usageType === 1">
            <h3>
              {{ item.storeName }}-【{{ item.name }}】({{
                getEnergyTypeLabel(item.type)
              }})
            </h3>
            <a-row>
              <a-row>
                <a-col :span="6">
                  <a-form-item field="lastNum" label="上期度数">
                    <a-input-number
                      :model-value="item.lastNum"
                      placeholder="上期度数"
                      hide-button
                      readonly
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="6" :offset="2">
                  <a-form-item field="latestNum" label="本期度数">
                    <a-input-number
                      v-model="item.latestNum"
                      :min="item.lastNum"
                      placeholder="本期度数"
                      hide-button
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="6" :offset="2">
                  <a-form-item field="derateNum" label="减免度数">
                    <a-input-number
                      v-model="item.derateNum"
                      placeholder="减免度数"
                      hide-button
                      :min="0"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="6">
                  <a-form-item field="curNum" label="本期用量">
                    <a-input-number
                      :model-value="
                        item.latestNum - item.lastNum - item.derateNum
                      "
                      placeholder="本期用量"
                      readonly
                      hide-button
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="6" :offset="2">
                  <a-form-item field="curCharge" label="自用费用">
                    <a-input-number
                      :model-value="
                        +(
                          (item.latestNum - item.lastNum - item.derateNum) *
                          item.unitPrice
                        ).toFixed(2)
                      "
                      placeholder="自用费用"
                      readonly
                      hide-button
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </a-row>
          </div>
        </template>
        <template v-if="!!form.deviceInfos.length">
          <a-divider orientation="left">公共能耗</a-divider>
          <a-row>
            <a-col :span="6">
              <a-form-item field="type" label="设备">
                <a-select
                  v-model="form.device"
                  placeholder="请选择设备"
                  multiple
                  @change="handleDeviceChange"
                >
                  <template v-for="it in commonDeviceData" :key="it.deviceId">
                    <a-option :value="it.deviceId">
                      {{ it.name }}
                    </a-option>
                  </template>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <template v-for="item in form.deviceInfos" :key="item.deviceId">
            <div v-if="item.usageType === 2">
              <h3>
                【{{ item.name }}-{{ getEnergyTypeLabel(item.type) }}表】
              </h3>
              <a-row>
                <a-col :span="6">
                  <a-form-item field="type" label="本期用量">
                    <a-input-number
                      v-model="item.curNum"
                      placeholder="本期用量"
                      hide-button
                      :min="0"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="6" :offset="2">
                  <a-form-item field="type" label="公摊费用">
                    <a-input-number
                      :model-value="item.curNum * item.unitPrice"
                      placeholder="公摊费用"
                      readonly
                      hide-button
                    />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </template>
        </template>
      </a-form>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, onMounted, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { energyTypeData } from '@/utils/dic';
  import {
    cbdApiProjectCommonMerchantSelectGet,
    cbdApiProjectCommonProjectSelectListGet,
    cbdApiProjectCommonStoreSelectAllGet,
    cbdApiProjectEnergyConsumeInvoiceInfoIdGet,
    cbdApiProjectCommonEnergyConsumeDeviceSelectGet,
    cbdApiProjectEnergyConsumeInvoiceAddPost,
    cbdApiProjectEnergyConsumeInvoiceUpdatePut
  } from '@/api';
  const formRef: Ref = ref(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: 'add'
    },
    rowId: {
      type: String,
      default: ''
    }
  });

  function getEnergyTypeLabel(id: number) {
    const findItem = energyTypeData.find((item) => item.value == id);
    return findItem?.label;
  }

  const emits = defineEmits(['update:modelValue', 'reset', 'close']);
  const rules = {
    projectId: [{ required: true, message: '请选择项目名称' }],
    date: [{ required: true, message: '请选择记录时间' }],
    merchant: [{ required: true, message: '请选择商户名称' }]
  };
  type FormType = {
    date: string[];
    projectId: string | number;
    merchant: string | number;
    deviceInfos: any[];

    type?: string;
    device?: any[];
  };

  type optionItem = {
    label?: string;
    value?: string | number;
  };
  const form = ref<FormType>({
    projectId: '',
    date: [],
    merchant: '',
    // 设备读数信息
    deviceInfos: [],
    type: '',
    device: []
  });

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      form.value = {
        projectId: '',
        date: [],
        merchant: '',
        // 设备读数信息
        deviceInfos: [],
        type: '',
        device: []
      };
      formRef.value.resetFields();
      emits('update:modelValue', v);
    }
  });

  const isEdit: Ref = computed(
    () => props.source === 'edit' || props.source === 'add'
  );

  const projectList = ref<optionItem[]>([]);
  const [getProjectList] = useFuncProxy(async () => {
    const res = await cbdApiProjectCommonProjectSelectListGet({});
    projectList.value = res;
  });

  const merchantList = ref<optionItem[]>([]);
  const [getMerchantList] = useFuncProxy(async () => {
    const res = await cbdApiProjectCommonMerchantSelectGet({});
    merchantList.value = res;
  });

  const storeList = ref<optionItem[]>([]);
  const [getStoreList] = useFuncProxy(async () => {
    const res = await cbdApiProjectCommonStoreSelectAllGet({
      projectId: String(form.value.projectId),
      merchantId: String(form.value.merchant)
    });
    storeList.value = res;
  });

  function handleProjectChange() {
    form.value.merchant = '';
    form.value.deviceInfos = [];
    form.value.device = [];
    commonDeviceData.value = [];
  }

  function handleMerchantChange() {
    form.value.deviceInfos = [];
    form.value.device = [];
    commonDeviceData.value = [];
    getStoreList();
    getActionList();
  }

  function onSubmit() {
    formRef.value.validate((value: any) => {
      if (!value) {
        if (props.source === 'add') {
          toSaveAdd();
        } else {
          toSaveEdit();
        }
      }
    });
  }

  const [toSaveAdd, loading] = useFuncProxy(async () => {
    const deviceInfos = form.value.deviceInfos.map((item) => {
      return {
        deviceId: Number(item.deviceId),
        lastNum: item.lastNum,
        latestNum: item.latestNum,
        curNum:
          item.usageType === 2
            ? item.curNum
            : item.latestNum - item.lastNum - item.derateNum,
        derateNum: item.derateNum,
        curActNum: item.curNum - item.lastNum,
        curCharge:
          item.usageType === 2
            ? item.curNum * item.unitPrice
            : (item.latestNum - item.lastNum - item.derateNum) * item.unitPrice
      };
    });
    await cbdApiProjectEnergyConsumeInvoiceAddPost({
      projectId: Number(form.value.projectId),
      merchantId: Number(form.value.merchant),
      startDate: form.value.date[0],
      endDate: form.value.date[1],
      deviceInfos
    });
    Message.success('操作成功!');
    formRef.value.resetFields();
    visible.value = false;
    emits('reset');
  });

  const [toSaveEdit] = useFuncProxy(async () => {
    if (props.source === 'watch') {
      formRef.value.resetFields();
      visible.value = false;
      return;
    }
    const deviceInfos = form.value.deviceInfos.map((item) => {
      return {
        deviceId: Number(item.deviceId),
        lastNum: item.lastNum,
        latestNum: item.latestNum,
        curNum:
          item.usageType === 2
            ? item.curNum
            : item.latestNum - item.lastNum - item.derateNum,
        derateNum: item.derateNum,
        curActNum: item.curNum - item.lastNum,
        curCharge:
          item.usageType === 2
            ? item.curNum * item.unitPrice
            : (item.latestNum - item.lastNum - item.derateNum) * item.unitPrice
      };
    });
    await cbdApiProjectEnergyConsumeInvoiceUpdatePut({
      id: Number(props.rowId),
      projectId: Number(form.value.projectId),
      merchantId: Number(form.value.merchant),
      startDate: form.value.date[0],
      endDate: form.value.date[1],
      // @ts-ignore
      deviceInfos
    });
    Message.success('操作成功!');
    formRef.value.resetFields();
    visible.value = false;
    emits('reset');
  });

  const commonDeviceData = ref<any[]>([]);
  const [getDetail] = useFuncProxy(async () => {
    const res = await cbdApiProjectEnergyConsumeInvoiceInfoIdGet({
      id: String(props.rowId)
    });
    form.value.device = [];
    res.deviceInfos.forEach((item: any) => {
      item.name = item.deviceName;
      item.storeName = item.store?.label;
      if (item.usageType === 2) {
        form.value.device?.push(item.deviceId);
      }
    });
    form.value = {
      ...form.value,
      projectId: res.project?.value,
      date: [res.startDate, res.endDate],
      merchant: res.merchant?.value,
      // @ts-ignore
      deviceInfos: res.deviceInfos
    };
    getActionList();
  });

  const [getActionList] = useFuncProxy(async () => {
    if (form.value.projectId && form.value.merchant && form.value.date.length) {
      const deviceInfos: any = [];
      commonDeviceData.value = [];
      form.value.device = [];
      const res = await cbdApiProjectCommonEnergyConsumeDeviceSelectGet({
        projectId: String(form.value.projectId),
        merchantId: String(form.value.merchant),
        forceUsageType: '2',
        startDate: String(form.value.date[0]),
        endDate: form.value.date[1]
      });
      res.forEach((item) => {
        if (item.usageType === 2) {
          if (props.rowId) {
            if (
              form.value.deviceInfos.some((it) => it.deviceId === item.deviceId)
            ) {
              deviceInfos.push({ ...item });
              form.value.device?.push(item.deviceId);
            }
          }
          commonDeviceData.value.push({ ...item });
        } else {
          deviceInfos.push({ ...item });
        }
      });
      // console.log(commonDeviceData.value);

      if (!props.rowId) {
        form.value = {
          ...form.value,
          // @ts-ignore
          deviceInfos: deviceInfos
        };
      }
    }
  });

  function handleDeviceChange() {
    for (let index = form.value.deviceInfos.length - 1; index >= 0; index--) {
      const item = form.value.deviceInfos[index];
      if (item.usageType === 2) {
        form.value.deviceInfos.splice(index, 1);
      }
    }
    form.value.device?.forEach((item) => {
      const findItem = commonDeviceData.value.find(
        (it) => it.deviceId === item
      );
      findItem && form.value.deviceInfos.push(findItem);
    });
  }

  function onClose() {
    visible.value = false;
    emits('close');
  }

  watch(
    () => props.rowId,
    () => {
      if (props.rowId) {
        getDetail();
      }
    }
  );

  onMounted(() => {
    getProjectList();
    getMerchantList();
    // getAssetsSelectList();
    if (props.rowId) {
      getDetail();
    }
  });
</script>

<style scoped lang="less">
  // .
</style>
