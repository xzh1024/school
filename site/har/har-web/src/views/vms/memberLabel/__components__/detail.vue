<template>
  <drawer
    v-model="visible"
    show-log
    :mask-close="false"
    :log-options="{
      modeId: props.rowId,
      logUrl: cbdApiProjectSysOptPageOptListPost,
      mode: 'cbd_mis_energy_consumption_device'
    }"
    title="查看标签"
    width="54%"
  >
    <template #footer>
      <a-button @click="onCancel">取消</a-button>
      <a-button type="primary" @click="handleEdit({} as any)"> 编辑 </a-button>
    </template>
    <div class="member-model-box">
      <a-card :bordered="false" style="height: 100%">
        <i-form
          ref="iFormRef"
          v-model="editForm"
          class="member_form"
          :options="formProps"
        >
          <template #labelNameForm>
            <div class="form_item_value">13666666666</div>
          </template>
        </i-form>
      </a-card>
    </div>
    <add-model
      v-model="modelVisible"
      :title="modelTitle"
      :row-id="rowId"
      :source="modelSource"
      @reset="reset"
    />
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  // import type { EditForm } from '../type/useAddModel';
  import IForm from '@/components/i-form/index.vue';
  import { FormOptions } from '@/components/i-form/index';
  import AddModel from './dialog-cud.vue';
  import {
    cbdApiProjectSysOptPageOptListPost,
    cbdApiProjectEstateEnergyConsumeDeviceInfoIdGet,
    CbdApiProjectEstateEnergyConsumeDeviceInfoIdGetResponse as detailDataType
  } from '@/api';
  import { useAddModel } from '../type/useAddModel';
  const { modelVisible, modelSource, modelTitle, handleEdit } = useAddModel();
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
  // 刷新详情
  function reset() {
    modelVisible.value = false;
    initEditInfo();
    emits('reset');
  }
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      if (formRef.value) {
        formRef.value.resetFields();
        iFormRef.value?.resetFields();
      }
      emits('update:modelValue', v);
    }
  });
  const editForm = ref<Recordable>({
    id: undefined,
    labelName: undefined
  });
  const formProps = computed<FormOptions>(() => ({
    menuForm: false,
    layout: 'vertical',
    columns: [
      {
        label: '标签名称',
        span: 12,
        prop: 'labelName'
      }
    ]
  }));
  const onCancel = () => {
    visible.value = false;
  };

  const [initEditInfo] = useFuncProxy(async () => {
    const res: detailDataType =
      await cbdApiProjectEstateEnergyConsumeDeviceInfoIdGet({
        id: props.rowId
      });
    // 编辑回显的时候要看，有些默认值是否存在，不存在特殊 处理
    editForm.value = {
      id: undefined,
      projectId: undefined,
      name: '', // 姓名
      nameType: 1, // 1 成年人 2 未成年人
      phone: '', // 手机号
      phonePre: '86', //
      idCard: '', // 身份证号
      remark: '', // 备注
      sourceId: undefined, // 会员来源
      labelId: '', // 会员标签
      sex: undefined, // 性别
      brithDate: '', // 生日
      personHeight: undefined, // 身高
      weight: undefined, // 体重
      level: undefined, // 健身等级
      goal: '' // 健身目标
    };
  });

  watch(
    () => props.modelValue,
    (v) => {
      if (v && props.rowId) {
        initEditInfo();
      }
    }
  );
</script>

<style scoped lang="less">
  .member-model-box {
    width: 100%;
    height: 100%;
    :deep(.arco-form-item-label) {
      font-size: 14px;
      color: #999999;
      line-height: 22px;
    }
    .form_item_value {
      font-size: 14px;
      color: #333333;
      line-height: 22px;
    }
    :deep(.member_form) {
      .card {
        padding: 0 !important;
      }
    }
  }
</style>
