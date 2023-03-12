<template>
  <drawer v-model="visible" :title="title" width="500px">
    <template #footer>
      <!-- <a-button @click="onSubmit('draft')">保存草稿</a-button> -->
      <a-button @click="visible = false">取消</a-button>
      <a-button type="primary" :loading="loading" @click="onSubmit">
        确认
      </a-button>
    </template>
    <div class="white-detail-box">
      <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
        <a-row>
          <a-col :span="11">
            <a-form-item field="projectId" label="项目名称">
              <a-select v-model="form.projectId" placeholder="请选择项目名称" @change="handleMerchantChange">
                <a-option v-for="item in projectList" :key="item.label" :value="item.value">
                  {{ item.label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item field="name" label="设备名称">
              <a-input v-model="form.name" placeholder="请输入设备名称" maxlength="20" />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item field="configId" label="能耗类型">
              <a-select v-model="form.configId" placeholder="请选择能耗类型">
                <a-option v-for="item in typeList" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item field="initNum" label="起始读数">
              <a-input v-model="form.initNum" placeholder="请输入起始读数" maxlength="20" />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item field="usageType" label="使用类型">
              <a-select v-model="form.usageType" placeholder="请选择使用类型">
                <a-option v-for="item in options.usageTypeData" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row v-if="form.usageType === 1">
          <a-col :span="11">
            <a-form-item field="merchantId" label="商户">
              <a-select v-model="form.merchantId" placeholder="请选择商户" @change="handleMerchantChange">
                <a-option v-for="item in merchantList" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="11" :offset="2">
            <a-form-item field="storeId" label="店铺">
              <a-select v-model="form.storeId" placeholder="请选择店铺">
                <a-option v-for="item in storeList" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </drawer>
</template>

<script setup lang="ts">
import { ref, Ref, computed, onMounted } from 'vue';
import Drawer from '@/components/drawer/drawer.vue';
import { Message } from '@arco-design/web-vue';
import useFuncProxy from '@/hooks/useFuncProxy';
import {
  cbdApiProjectEnergyConsumeDeviceAddPost,
  cbdApiProjectCommonProjectSelectListGet,
  cbdApiProjectCommonMerchantSelectGet,
  cbdApiProjectCommonStoreSelectAllGet,
  cbdApiProjectCommonEnergyConsumeConfigSelectGet
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
  projectId: [{ required: true, message: '请选择能耗类型' }],
  configId: [{ required: true, message: '请选择能源类型' }],
  usageType: [{ required: true, message: '请选择使用类型' }],
  merchantId: [{ required: true, message: '请选择商户' }],
  storeId: [{ required: true, message: '请选择店铺' }],
  name: [{ required: true, message: '请填写设备名称' }],
  initNum: [{ required: true, message: '请填写起始读数' }]
};
type formType = {
  projectId: string;
  name: string;
  initNum: string;
  configId: string | number;
  usageType: number;
  merchantId?: string | undefined;
  storeId?: string | undefined;
};
const form = ref<formType>({
  projectId: '',
  name: '',
  initNum: '0',
  configId: '',
  usageType: 1,
  merchantId: '',
  storeId: ''
});

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(v) {
    if (formRef.value) {
      formRef.value.resetFields();
    }
    emits('update:modelValue', v);
  }
});

const onSubmit = () => {
  formRef.value.validate((value: any) => {
    if (!value) {
      addDevice();
    }
  });
};

type requestParams = {
  projectId: number;
  name: string;
  initNum: number;
  configId: number;
  usageType: number;
  merchantId?: number;
  storeId?: number;
};
const [addDevice, loading] = useFuncProxy(async () => {
  const params: requestParams = {
    projectId: Number(form.value.projectId),
    name: form.value.name,
    initNum: Number(form.value.initNum),
    configId: Number(form.value.configId),
    usageType: Number(form.value.usageType)
  };
  if (form.value.usageType == 1) {
    params.merchantId = Number(form.value.merchantId);
    params.storeId = Number(form.value.storeId);
  }

  await cbdApiProjectEnergyConsumeDeviceAddPost(params);
  Message.success('操作成功!');
  formRef.value.resetFields();
  visible.value = false;
  emits('reset');
});

type optionItem = {
  label?: string;
  value?: string | number;
};
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
    projectId: form.value.projectId,
    merchantId: form.value.merchantId
  });
  storeList.value = res;
});

const typeList = ref<optionItem[]>([]);
const [getTypeList] = useFuncProxy(async () => {
  const res = await cbdApiProjectCommonEnergyConsumeConfigSelectGet();
  typeList.value = res;
});

function handleMerchantChange() {
  form.value.storeId = '';
  getStoreList();
}

onMounted(() => {
  getProjectList();
  getMerchantList();
  getTypeList();
});
</script>

<style scoped lang="less">
// .
</style>
