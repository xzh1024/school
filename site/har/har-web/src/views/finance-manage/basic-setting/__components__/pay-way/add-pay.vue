<template>
  <drawer
    v-model:model-value="visible"
    :title="
      drawerType === 1
        ? '添加支付方式'
        : drawerType === 2
        ? '编辑支付方式'
        : '查阅支付方式'
    "
    :show-log="drawerType === 3"
    :log-options="{
      logUrl: cbdApiProjectSysOptPageOptListPost,
      modeId: props.formData.id,
      mode: 'cbd_pay_method'
    }"
    :width="600"
  >
    <div class="drawer-box">
      <a-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        layout="vertical"
        class="i-form"
        @click.stop
      >
        <a-row :gutter="16">
          <a-col :span="16">
            <a-form-item
              field="switchs"
              label="状态"
              :disabled="drawerType === 3"
            >
              <a-switch
                v-model="form.switchs"
                :checked-value="1"
                :unchecked-value="0"
              >
                <template #checked>启用 </template>
                <template #unchecked> 禁用 </template>
              </a-switch>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="16">
            <a-form-item
              field="scenes"
              label="使用场景"
              :disabled="drawerType === 3 || form.isUse === 1"
            >
              <a-select
                v-model="form.scenes"
                allow-clear
                @change="selectChange"
              >
                <a-option
                  v-for="item of usageScenarioList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-col :gutter="16">
          <a-col :span="16">
            <a-form-item label="编号" :disabled="true">
              <a-input
                v-model="form.code"
                placeholder="系统自动生成"
                allow-clear
              />
            </a-form-item>
          </a-col>
        </a-col>
        <a-col :gutter="16">
          <a-col :span="16">
            <a-form-item
              field="paymentMethod"
              label="支付方式"
              required
              :disabled="drawerType === 3"
            >
              <a-input
                v-model.trim="form.paymentMethod"
                placeholder="请输入"
                allow-clear
                :max-length="20"
              />
            </a-form-item>
          </a-col>
        </a-col>

        <a-col v-if="form.scenes === 0" :gutter="16">
          <a-col :span="16">
            <a-form-item
              field="serviceRate"
              label="默认手续费率"
              required
              :disabled="drawerType === 3"
            >
              <a-input-number
                v-model="form.serviceRate"
                placeholder="请输入"
                :hide-button="true"
                :step="999.99"
                :precision="0"
                :max="999.99"
                :min="0"
              >
                <template #append> ‰ </template></a-input-number
              >
            </a-form-item>
          </a-col>
        </a-col>

        <a-col v-if="form.scenes === 0" :gutter="16">
          <a-col :span="16">
            <a-form-item
              field="sorts"
              label="排序"
              required
              :disabled="drawerType === 3"
            >
              <a-input
                v-model="form.sorts"
                placeholder="请输入"
                :max-length="3"
                @input="checkShorts"
              />
            </a-form-item>
          </a-col>
        </a-col>
      </a-form>
    </div>
    <template #footer>
      <a-button
        class="i-drawer-btn border-r margin-right-11"
        :disabled="cancelDisable"
        @click="handleCancel"
        >取消</a-button
      >
      <a-button
        v-if="drawerType !== 3"
        class="i-drawer-btn border-r"
        type="primary"
        :loading="confirmLoading"
        @click="doAdd"
        >确认</a-button
      >
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message } from '@arco-design/web-vue';
  import { computed, ref, toRaw, watch } from 'vue';
  import {
    cbdApiProjectMisPayMethodSavePost,
    cbdApiProjectSysOptPageOptListPost
  } from '@/api';
  import { usageScenarioList } from '@/utils/dic';

  const emits = defineEmits([
    'update:formData',
    'update:drawerVisible',
    'update:modalTitle',
    'update:formDataId',
    'submitSuccess'
  ]);

  const props = defineProps({
    drawerVisible: {
      type: Boolean,
      default: false
    },
    drawerType: {
      type: Number
    },
    formDataId: {
      type: String,
      default: ''
    },
    projectId: {
      type: [Number, String],
      default: null
    },
    formData: {
      type: Object,
      default: () => {}
    }
  });

  // 表单禁用
  const disabled = ref(false);
  // 取消禁用
  const cancelDisable = ref(false);
  // 确认loading
  const confirmLoading = ref(false);
  const formRules = {
    switchs: [
      {
        required: true,
        message: '请选择费用类型'
      }
    ],
    scenes: [
      {
        required: true,
        message: '请选择使用场景'
      }
    ],
    paymentMethod: [
      {
        required: true,
        message: '支付方式不能为空'
      }
    ],
    serviceRate: [
      {
        required: true,
        message: '手续费率不能为空'
      }
    ],
    sorts: [
      {
        required: true,
        message: '排序不能为空'
      }
    ]
  };

  const onSubmit = (data: any) => {
    if (data) {
      doAdd();
    }
  };
  const formRef = ref();
  //新增
  const doAdd = async () => {
    formRef.value.validate((value: any) => {
      if (!value) {
        try {
          const dates = {
            projectId: Number(props.projectId),
            switchs: form.value.switchs,
            paymentMethod: form.value.paymentMethod,
            serviceRate: form.value.serviceRate,
            sorts: form.value.sorts,
            code: form.value.code,
            scenes: form.value.scenes,
            id: form.value.id
          };
          cbdApiProjectMisPayMethodSavePost(dates);
          Message.success({
            content: '操作成功'
          });
          visible.value = false;
          emits('submitSuccess');
        } catch (e) {
          console.error(e);
        }
      }
    });
  };
  const selectChange = () => {
    form.value.serviceRate = null;
    form.value.sorts = '';
    form.value.paymentMethod = '';
  };

  const handleCancel = () => {
    visible.value = false;
    disabled.value = false;
  };

  const form = computed({
    get() {
      return props.formData;
    },
    set(v) {
      emits('update:formData', toRaw(v));
    }
  });

  const checkShorts = () => {
    //只能输入0-999数字 不能包含小数 负数
    form.value.sorts = (form.value.sorts.match(/^[1-9][0-9]*$/) || [''])[0];
  };

  const visible = computed({
    get() {
      return props.drawerVisible;
    },
    set(data) {
      emits('update:drawerVisible', data);
    }
  });

  watch(
    () => visible.value,
    (val) => {
      if (val) {
        form.value.projectId = props.projectId;
        form.value.serviceRate = Number(props.formData.serviceRate);
      } else {
        form.value = {};
        emits('update:formDataId', '');
      }
    }
  );
</script>

<style scoped lang="less">
  .drawer-box {
    width: 100%;
    padding: 16px;
    background: #fff;
    .title-box {
      margin-bottom: 16px;
    }
  }
  .footer-box {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 0 25px 34px 25px;
    background: #fff;
  }
  .margin-right-11 {
    margin-right: 11px;
  }
  .border-r {
    border-radius: 5px;
  }
  .i-drawer-btn {
    width: 90px;
    height: 40px;
  }
  .tags {
    margin-right: 12px;
    cursor: pointer;
    .tags-items {
      height: 30px;
      border-radius: 4px;
    }
    .tags-items:hover {
      opacity: 0.8;
      font-weight: bold;
    }
  }
  .syllable_ul {
    display: flex;
  }
</style>
