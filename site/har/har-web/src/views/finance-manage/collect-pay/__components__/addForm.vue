<template>
  <div>
    <i-form ref="refForm" v-model="editForm" :options="formProps">
      <template #line1Form>
        <div class="split-bg"></div>
      </template>
      <template #payAccountIdForm>
        <a-row style="width: 100%" :gutter="8">
          <a-col :span="6">
            <a-select
              v-model="editForm.payAccountId"
              style="width: 100%"
              placeholder="请选择账户名称"
              :field-names="{
                label: 'accountName',
                value: 'id'
              }"
              :options="payAccountList"
              @change="onPayAccountChange"
            >
            </a-select>
          </a-col>
        </a-row>
      </template>
      <template #payAccountNameForm>
        <div class="input-box">
          <a-input
            v-model="editForm.payAccountName"
            placeholder="请选择账户名称"
          ></a-input>
          <a-button
            v-permission="[
              'mis:payment:save_merchant_account',
              'mis:collectionAccount:back:save'
            ]"
            class="btn-pos"
            type="text"
            @click="addAccount(0)"
            >新增</a-button
          >
        </div>
      </template>
      <template #receiptAccountIdForm>
        <a-row style="width: 100%" :gutter="8">
          <a-col :span="6">
            <a-select
              v-model="editForm.receiptAccountId"
              style="width: 100%"
              placeholder="请选择账户名称"
              :field-names="{
                label: 'accountName',
                value: 'id'
              }"
              :options="receiptAccountList"
              @change="onReceiptAccountChange"
            >
            </a-select>
          </a-col>
        </a-row>
      </template>
      <template #receiptAccountNameForm>
        <div class="input-box">
          <a-input
            v-model="editForm.receiptAccountName"
            placeholder="请选择账户名称"
          ></a-input>
          <a-button
            v-permission="[
              'mis:payment:save_merchant_account',
              'mis:collectionAccount:back:save'
            ]"
            class="btn-pos"
            type="text"
            @click="addAccount(1)"
            >新增</a-button
          >
        </div>
      </template>
    </i-form>
    <modal-form
      v-bind="addAccountForm"
      :mask-closable="false"
      closable
      @register="resetRegister"
      @submit="onSubmit"
    >
    </modal-form>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'AddForm'
  });
</script>
<script setup lang="ts">
  import { ref, onMounted, computed, Ref, watch } from 'vue';
  import IForm from '@/components/i-form/index.vue';
  import {
    ModalForm,
    type ModalFormProps,
    useModalForm
  } from '@/components/IForm';
  import { useRequest } from '@har/use';
  import {
    cbdApiProjectMisCollectionListPost,
    CbdApiProjectMisCollectionListPostResponse,
    cbdApiProjectMisCollectionSavePost,
    cbdApiProjectMisPaymentGetMerchantAccountGet,
    CbdApiProjectMisPaymentGetMerchantAccountGetResponse,
    cbdApiProjectMisPaymentSaveMerchantAccountPost
  } from '@/api';
  type SystemItem = {
    backName?: string;
    id?: number;
    code?: string;
    accountName?: string;
    backAccount?: string;
    expenseTypeName?: string;
    switchs?: number;
  };
  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => {}
    },
    source: {
      type: String,
      required: true //  pay  collect
    },
    projectId: {
      type: Number
    },
    merchantId: {
      type: String,
      default: ''
    },
    billList: {
      type: Array,
      default: () => []
    }
  });
  const expenseItems = computed(() => {
    console.log(props.billList);
    const expenseTypeList: any = [];
    props.billList?.forEach((e: any) => {
      expenseTypeList.push({
        expenseKey: e.expenseKey,
        expenseId: e.expenseId,
        expenseTypeId: [e.expenseItemsId]
      });
    });
    return expenseTypeList;
  });
  const emits = defineEmits(['update:modelValue']);
  const editForm = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emits('update:modelValue', value);
    }
  });
  const addAccountType = ref(1); // 添加时区别添加的是收款方还是付款方 0 pay 1 collect

  const refForm: Ref = ref(null);
  const [resetRegister, methods] = useModalForm<ModalFormProps>();
  const onSubmit = (v: any) => {
    if (
      (props.source === 'pay' && addAccountType.value === 1) ||
      (props.source === 'collect' && addAccountType.value === 0)
    ) {
      addMerchantAccount({
        merchantId: Number(props.merchantId),
        accountName: v.accountName,
        accountNum: v.backName,
        accountBank: v.backAccount
      });
    } else if (
      (props.source === 'collect' && addAccountType.value === 1) ||
      (props.source === 'pay' && addAccountType.value === 0)
    ) {
      addSystemAccount({
        ...v,
        expenseTypeList: expenseItems.value,
        switchs: 1,
        projectId: props.projectId
      });
    }
  };
  const { run: addSystemAccount } = useRequest(
    cbdApiProjectMisCollectionSavePost,
    {
      manual: true,
      onSuccess() {
        getAccountList({
          projectId: props.projectId!
        });
        methods.hide();
      }
    }
  );
  const { run: addMerchantAccount } = useRequest(
    cbdApiProjectMisPaymentSaveMerchantAccountPost,
    {
      manual: true,
      onSuccess() {
        getMerchantAccountList({
          merchantId: props.merchantId
        });
        methods.hide();
      }
    }
  );
  const addAccount = (type: number) => {
    addAccountType.value = type;
    methods.show();
  };
  const onPayAccountChange = (e: any) => {
    if (props.source === 'collect') {
      const item = merchantAccountList.value.find(
        (a: SystemItem) => a.id === e
      );
      editForm.value.payAccountName = item!.accountName;
      editForm.value.payBankName = item!.accountNum;
      editForm.value.payAccountNum = item!.accountBank;
    } else {
      const item = systemAccountList.value.find((a: SystemItem) => a.id === e);
      editForm.value.payAccountName = item!.accountName;
      editForm.value.payBankName = item!.backName;
      editForm.value.payAccountNum = item!.backAccount;
    }
    editForm.value.payAccountId = e;
    refForm.value.clearValidate([
      'payAccountName',
      'payBankName',
      'payAccountNum'
    ]);
  };
  const onReceiptAccountChange = (e: any) => {
    if (props.source === 'collect') {
      const item = systemAccountList.value.find(
        (a: SystemItem) => a.id === Number(e)
      );
      editForm.value.receiptAccountName = item!.accountName;
      editForm.value.receiptBankName = item!.backName;
      editForm.value.receiptAccountNum = item!.backAccount;
    } else {
      const item = merchantAccountList.value.find(
        (a: SystemItem) => a.id === Number(e)
      );
      editForm.value.receiptAccountName = item!.accountName;
      editForm.value.receiptBankName = item!.accountNum;
      editForm.value.receiptAccountNum = item!.accountBank;
    }
    editForm.value.receiptAccountId = Number(e);
    refForm.value.clearValidate([
      'receiptAccountName',
      'receiptBankName',
      'receiptAccountNum'
    ]);
  };
  const systemAccountList = ref<SystemItem[]>([]);
  const merchantAccountList =
    ref<CbdApiProjectMisPaymentGetMerchantAccountGetResponse>([]);
  type EachAccount = CbdApiProjectMisCollectionListPostResponse[0];
  const { run: getAccountList } = useRequest(
    cbdApiProjectMisCollectionListPost,
    {
      manual: true,
      onSuccess(res) {
        systemAccountList.value = [];
        res.forEach((el: EachAccount) => {
          el.accountListVos!.forEach((a: SystemItem) => {
            if (a.switchs === 1) {
              a.backName = el.backName;
              systemAccountList.value.push(a);
            }
          });
        });
      }
    }
  );
  const { run: getMerchantAccountList } = useRequest(
    cbdApiProjectMisPaymentGetMerchantAccountGet,
    {
      manual: true,
      onSuccess(res) {
        merchantAccountList.value = res || [];
      }
    }
  );
  const payAccountList: Ref = computed(() => {
    return props.source === 'pay'
      ? systemAccountList.value
      : merchantAccountList.value;
  });
  const receiptAccountList: Ref = computed(() => {
    return props.source === 'collect'
      ? systemAccountList.value
      : merchantAccountList.value;
  });
  watch(
    () => props.projectId,
    (v) => {
      if (v) {
        getAccountList({
          projectId: props.projectId!
        });
      }
    },
    { immediate: true }
  );
  watch(
    () => props.merchantId,
    (v) => {
      if (v) {
        getMerchantAccountList({
          merchantId: props.merchantId
        });
      }
    },
    { immediate: true }
  );
  const formProps: Ref = computed(() => {
    return {
      layout: 'vertical',
      menuSpan: 12,
      menuForm: false,
      columns: [
        {
          label: '付款方信息',
          type: 'groupTitle'
        },
        {
          label: '账户',
          type: 'select',
          prop: 'payAccountId',
          span: 24
        },
        {
          label: '账户名称',
          prop: 'payAccountName',
          options: {
            allowClear: true
          },
          rules: [{ required: true, message: '账户名称不能为空' }]
        },
        {
          label: '银行',
          prop: 'payBankName',
          rules: [{ required: true, message: '银行不能为空' }]
        },
        {
          label: '账户号',
          prop: 'payAccountNum',
          span: 12,
          rules: [{ required: true, message: '账户号不能为空' }]
        },
        {
          label: '支付凭证号',
          prop: 'payNum'
        },
        {
          label: '备注',
          prop: 'payRemark',
          type: 'textarea',
          span: 18,
          options: {
            maxLength: 200,
            showWordLimit: true,
            autoSize: true
          }
        },
        {
          label: '',
          prop: 'line1',
          type: 'groupTitle'
        },
        {
          label: '收款方信息',
          type: 'groupTitle'
        },
        {
          label: '账户',
          type: 'select',
          span: 24,
          prop: 'receiptAccountId'
        },
        {
          label: '账户名称',
          prop: 'receiptAccountName',
          options: {
            allowClear: true
          },
          rules: [{ required: true, message: '账户名称不能为空' }]
        },
        {
          label: '银行',
          prop: 'receiptBankName',
          rules: [{ required: true, message: '银行不能为空' }]
        },
        {
          label: '账户号',
          prop: 'receiptAccountNum',
          span: 12,
          rules: [{ required: true, message: '账户号不能为空' }]
        },
        {
          label: '收款凭证号',
          prop: 'receiptNum'
        },
        {
          label: '备注',
          prop: 'receiptRemark',
          type: 'textarea',
          span: 18,
          options: {
            maxLength: 200,
            autoSize: true,
            showWordLimit: true
          }
        },
        {
          label: '',
          prop: 'line1',
          type: 'groupTitle'
        },
        {
          label: '附件信息',
          type: 'groupTitle'
        },
        {
          label: '',
          type: 'customUpload',
          prop: 'resourceList',
          options: {
            urlKey: 'previewAddress'
          },
          span: 24
        }
      ]
    };
  });
  const addAccountForm = computed(() => {
    return {
      title: `添加${props.source === 'pay' ? '付' : '收'}款方信息`,
      submitLoading: false,
      schemas: [
        {
          label: '账户名称',
          field: 'accountName',
          componentProps: {
            maxLength: 100
          },
          rules: [{ required: true, message: '账户名称不能为空' }]
        },
        {
          label: '银行',
          field: 'backName',
          componentProps: {
            maxLength: 100
          },
          rules: [{ required: true, message: '银行不能为空' }]
        },
        {
          label: '账户号',
          field: 'backAccount',
          componentProps: {
            maxLength: 30
          },
          rules: [
            { required: true, message: '账户号不能为空' },
            { minLength: 11, message: '账户号不能少于11位' }
          ]
        }
      ]
    };
  });
  const submit = () => {
    return refForm.value.submit();
  };
  defineExpose({ submit });
</script>

<style scoped lang="less">
  .input-box {
    position: relative;
    width: 100%;

    .btn-pos {
      position: absolute;
      top: -35px;
      right: 0;
      z-index: 1;
      padding: 0;

      &:hover {
        background: transparent;
      }
    }
  }
</style>
