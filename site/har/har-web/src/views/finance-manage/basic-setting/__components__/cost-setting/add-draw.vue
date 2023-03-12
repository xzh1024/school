<template>
  <drawer
    v-model:model-value="visible"
    :show-log="drawerType === 3"
    :log-options="{
      logUrl: cbdApiProjectSysOptPageOptListPost,
      modeId: props.formData.id,
      mode: 'cbd_expense_items'
    }"
    :title="
      drawerType === 1
        ? '添加费用明细'
        : drawerType === 2
        ? '编辑费用明细'
        : '查阅费用明细'
    "
    :width="500"
  >
    <div class="drawer-box">
      <a-form
        ref="formRef"
        :model="form"
        :rules="formRules"
        layout="vertical"
        class="i-form"
      >
        <a-row :gutter="20">
          <a-col :span="20">
            <a-form-item
              field="expenseId"
              label="费用类型"
              :disabled="drawerType === 3 || form.isUse === 1"
            >
              <a-select
                v-model="form.expenseId"
                allow-clear
                @change="selectChange"
              >
                <a-option
                  v-for="item of costTypeOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                  :disabled="item.code === '202212270005'"
                />
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-col :gutter="20">
          <a-col :span="20">
            <a-form-item field="expenseCode" label="编号" :disabled="true">
              <a-input
                v-model="form.expenseCode"
                placeholder="系统自动生成"
                allow-clear
              />
            </a-form-item>
          </a-col>
        </a-col>

        <a-col :gutter="20">
          <a-col :span="20">
            <a-form-item
              field="expenseType"
              label="费用项目"
              required
              :disabled="drawerType === 3 ? true : false"
            >
              <a-input
                v-model="form.expenseType"
                placeholder="请输入"
                allow-clear
                :max-length="20"
              />
            </a-form-item>
          </a-col>
        </a-col>

        <a-col :gutter="20">
          <a-col :span="20">
            <a-form-item
              field="print"
              label="为零是否打印"
              required
              :disabled="drawerType === 3"
            >
              <a-select v-model="form.print" allow-clear>
                <a-option :value="1">是</a-option>
                <a-option :value="2">否</a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-col>

        <a-col
          v-if="costCode === '202212270001' || costCode === '202212270002'"
          :gutter="20"
        >
          <a-col :span="20">
            <a-form-item
              field="chargingMethod"
              label="收费方式 "
              required
              :disabled="drawerType === 3 || form.isUse === 1"
            >
              <a-select v-model="form.chargingMethod" allow-clear>
                <a-option :value="2">抽成费用</a-option>
                <a-option :value="1">固定费用</a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-col>

        <a-col :span="20">
          <a-form-item
            field="taxCode"
            label="发票税收分类"
            required
            :disabled="drawerType === 3"
          >
            <a-select v-model="form.taxCode" allow-clear @change="selectChange">
              <a-option
                v-for="item of invoiceOption"
                :key="item.taxCode"
                :value="item.taxCode"
                :label="item.feeName"
              />
            </a-select>
          </a-form-item>
        </a-col>
      </a-form>
    </div>
    <template #footer>
      <a-button :disabled="cancelDisable" @click="handleCancel">取消</a-button>
      <a-button
        v-if="drawerType !== 3"
        type="primary"
        :loading="confirmLoading"
        @click="onSubmit"
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
    cbdApiProjectMisExpenseItemsSavePost,
    cbdApiProjectSysOptPageOptListPost,
    cbdApiProjectInvoiceTaxListGet,
    CbdApiProjectInvoiceTaxListGetResponse
  } from '@/api';
  import useDictData from '@/hooks/useDictData';
  import useFuncProxy from '@/hooks/useFuncProxy';

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
  const [costTypeOptions] = useDictData('00013');

  const costCode = ref<String>('');
  // 表单禁用
  const disabled = ref(false);
  // 取消禁用
  const cancelDisable = ref(false);
  // 确认loading
  const confirmLoading = ref(false);
  const formRules = {
    expenseId: [
      {
        required: true,
        message: '请选择费用类型'
      }
    ],
    expenseType: [
      {
        required: true,
        message: '费用项目不能为空'
      }
    ],
    print: [
      {
        required: true,
        message: '请选择是否打印'
      }
    ],
    chargingMethod: [
      {
        required: true,
        message: '收费方式不能为空'
      }
    ],
    taxCode: [
      {
        required: true,
        message: '发票税收分类不能为空'
      }
    ]
  };

  const onSubmit = (data: any) => {
    if (data) {
      if (props.formDataId !== '') {
        // doUpdate();
        doAdd();
      } else {
        doAdd();
      }
    }
  };

  const selectChange = (event: string | number | Record<string, any>) => {
    const reslut = costTypeOptions.value.filter(
      (items: any) => items.value === event
    );
    costCode.value = reslut[0].code;
  };
  const formRef = ref();
  //新增
  const doAdd = async () => {
    try {
      formRef.value.validate((value: any) => {
        if (!value) {
          cbdApiProjectMisExpenseItemsSavePost(form.value);
          Message.success({
            content: '操作成功'
          });
          visible.value = false;
          emits('submitSuccess');
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    visible.value = false;
    disabled.value = false;
  };

  const form: any = computed({
    get() {
      return props.formData;
    },
    set(v) {
      emits('update:formData', toRaw(v));
    }
  });

  const visible = computed({
    get() {
      return props.drawerVisible;
    },
    set(data) {
      emits('update:drawerVisible', data);
    }
  });
  const invoiceOption = ref<CbdApiProjectInvoiceTaxListGetResponse>([]);
  //获取电子发票税收分类下拉
  const [getInvoiceList] = useFuncProxy(async () => {
    invoiceOption.value = await cbdApiProjectInvoiceTaxListGet();
  });

  watch(
    () => visible.value,
    (val) => {
      if (val) {
        form.value.projectId = props.projectId;
        costCode.value = props.formData.expenseKey;
        form.value.print = props.formData.print ? props.formData.print : 2;
        getInvoiceList();
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
</style>
