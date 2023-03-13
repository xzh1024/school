<template>
  <drawer v-model="visible" :title="id ? '编辑账单' : '添加账单'">
    <i-form ref="refForm" v-model="editForm" :options="formProps">
      <template #taxRateForm>
        <a-input-number
          v-model="editForm.taxRate"
          hide-button
          allow-clear
          :disabled="isBIP"
        >
          <template #suffix>%</template>
        </a-input-number>
      </template>
    </i-form>
    <template #footer>
      <a-button @click="visible = false">取消</a-button>
      <a-button
        v-permission="['mis:bill:back:save']"
        type="primary"
        :loading="isLoading"
        @click="saveDraft"
        >存为草稿</a-button
      >
      <a-button
        v-permission="['mis:bill:back:save']"
        type="primary"
        :loading="isLoading"
        @click="onSubmit"
        >保存</a-button
      >
      <a-button
        v-permission="['formal:bill:confirm']"
        :loading="cerLoading"
        type="primary"
        @click="onCertain"
        >确认</a-button
      >
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, computed, watch, onMounted, Ref } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import IForm from '@/components/i-form/index.vue';
  import { getActiveProjectId, setActiveProject, formatPrice } from '@/utils';
  import NP from 'number-precision';
  import { type EditForm } from './Add';
  import {
    cbdApiProjectMisBillInfoGet,
    cbdApiProjectMisBillIntentionContractPost,
    CbdApiProjectMisBillIntentionContractPostResponse,
    cbdApiProjectMisBillSaveAndConfirmPost,
    CbdApiProjectMisBillSaveAndConfirmPostRequest,
    cbdApiProjectMisBillSavePost,
    CbdApiProjectMisBillSavePostRequest
  } from '@/api';
  import {
    projectList,
    merchantDropList,
    expenseList,
    storeSelectList,
    getExpenseList,
    getProjectListData,
    getMerchantDropList,
    getStoreSelectList
  } from '@/views/finance-manage/useGetCommonData';
  import { Message } from '@arco-design/web-vue';
  import lsStore from '@/utils/ls-store';
  import { useRequest } from '@har/use';
  import { billTypeList } from '@/utils/dic';

  const refForm: Ref = ref(null);
  const isLoading = ref(false);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  });
  // 类型是保证金202212270004,意向金202212270003,预付款202212270009
  const expenseTypeCode = ref('');
  const INTENTION_CODE = '202212270003';
  const isBIP = computed(() =>
    ['202212270004', '202212270003', '202212270009'].includes(
      expenseTypeCode.value
    )
  );
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const editForm = ref<EditForm>({
    id: undefined,
    projectId: undefined,
    projectName: '',
    merchantId: undefined,
    merchantName: '',
    storeId: undefined,
    storeName: '',
    billType: undefined,
    expenseKey: '',
    expenseItemsId:
      Number(lsStore.getItem('mis_finance_add_bill_expense_id')) || undefined,
    expenseItemsName: '',
    chargingMethod: 1,
    billCreateAt: '',
    paymentDays: undefined,
    startAt: undefined,
    endAt: '',
    amount: undefined,
    hasTax: isBIP.value
      ? undefined
      : Number(lsStore.getItem('mis_finance_hasTax')) || undefined,
    taxRate: undefined,
    taxAmount: undefined,
    taxExclusiveAmount: undefined,
    receivableAmount: undefined,
    businessStat: undefined
  });

  // 保存草稿 // 不填必填项也可以提交
  const saveDraft = async () => {
    // 这个为0,是告诉后端当前操作是存草稿
    editForm.value.businessStat = 0;
    try {
      isLoading.value = true;
      await cbdApiProjectMisBillSavePost({
        ...editForm.value,
        taxRate: Number(editForm.value.taxRate)
      } as CbdApiProjectMisBillSavePostRequest);
      Message.success('保存成功');
      emits('refresh');
      visible.value = false;
    } catch (e) {
    } finally {
      isLoading.value = false;
    }
  };
  // 保存
  const onSubmit = async () => {
    const res = await refForm.value?.submit();
    console.log(editForm.value.hasTax)
    if (!res) {
      editForm.value.businessStat = undefined;
      try {
        await cbdApiProjectMisBillSavePost({
          ...editForm.value,
          taxRate: editForm.value.taxRate || 0,
          taxExclusiveAmount: editForm.value.taxExclusiveAmount || 0,
          taxAmount: editForm.value.taxAmount || 0,
          hasTax: editForm.value.hasTax ? 1 : 0
        } as CbdApiProjectMisBillSavePostRequest);
        isLoading.value = true;
        Message.success('保存成功');
        emits('refresh');
        visible.value = false;
      } catch (e) {
      } finally {
        isLoading.value = false;
      }
    }
  };
  // 确认
  const { run: onCertainSubmit, loading: cerLoading } = useRequest(
    cbdApiProjectMisBillSaveAndConfirmPost,
    {
      manual: true,
      onSuccess() {
        Message.success('保存成功!');
        visible.value = false;
        emits('refresh');
      }
    }
  );
  const onCertain = async () => {
    const res = await refForm.value?.submit();
    if (res) return false;
    editForm.value.businessStat = undefined;
    onCertainSubmit({
      ...editForm.value,
      taxRate: editForm.value.taxRate || 0,
      taxExclusiveAmount: editForm.value.taxExclusiveAmount || 0,
      taxAmount: editForm.value.taxAmount || 0,
      hasTax: editForm.value.hasTax ? 1 : 0
    } as CbdApiProjectMisBillSaveAndConfirmPostRequest);
  };
  const { run: initInfo } = useRequest(cbdApiProjectMisBillInfoGet, {
    manual: true,
    onSuccess(res) {
      editForm.value = res as unknown as any;
      editForm.value.taxRate = Number(res.taxRate);
      editForm.value.amount = Number(res.amount);
      editForm.value.expenseKey = res.expenseKey || '';
      editForm.value.amount = res.amount;
    }
  });

  const chargingMethodList = [
    {
      label: '固定费用',
      value: 1
    }
  ];
  onMounted(async () => {
    editForm.value.projectId = getActiveProjectId();
    getProjectListData();
    if (editForm.value.projectId) {
      getProjectName(editForm.value.projectId);
      getMerchantDropList(editForm.value.projectId);
      getStoreSelectList({ projectId: editForm.value.projectId });
    }
    await getExpenseList({
      parentExpenseCodes:
        '202212270001,202212270002,202212270003,202212270004,202212270005,202212270006,202212270007,202212270008,202212270009,202212270010',
      projectId: editForm.value.projectId
    });
    initExpenseCode();
    if (props.id) {
      initInfo({ id: props.id });
    }
  });
  const intentionContractList =
    ref<CbdApiProjectMisBillIntentionContractPostResponse>();
  const { run: getContractList } = useRequest(
    cbdApiProjectMisBillIntentionContractPost,
    {
      manual: true,
      onSuccess(res) {
        intentionContractList.value = res;
      }
    }
  );
  const calcTaxAmount = () => {
    const m = editForm.value.amount || 0;
    const n = Number(editForm.value.taxRate) || 0;
    const hasTax = editForm.value.hasTax === 1;
    // if (m && n) {
    editForm.value.taxAmount = NP.times(m, n / 100);
    if (hasTax) {
      editForm.value.taxExclusiveAmount = NP.minus(
        m - editForm.value.taxAmount
      );
      editForm.value.receivableAmount = m;
    } else {
      editForm.value.taxExclusiveAmount = m;
      editForm.value.receivableAmount = NP.plus(m, editForm.value.taxAmount);
    }
    // }
    refForm.value.clearValidate([
      'taxExclusiveAmount',
      'taxAmount',
      'receivableAmount'
    ]);
  };
  const getProjectName = (id: number) => {
    const item = projectList.value.find((a) => a.value === Number(id)) || {
      label: ''
    };
    editForm.value.projectName = item!.label;
  };
  const initExpenseCode = () => {
    const expenseId = Number(
      lsStore.getItem('mis_finance_add_bill_expense_id')
    );
    const item = expenseList.value.find(
      (el: any) => el.expenseId === expenseId
    );
    if (item) {
      editForm.value.expenseKey = item!.parentExpenseCode || '';
      editForm.value.expenseItemsId = expenseId;
      editForm.value.expenseItemsName = item!.expenseType || '';
      expenseTypeCode.value = item!.parentExpenseCode || '';
    } else {
      editForm.value.expenseItemsId = undefined;
    }
  };
  watch(
    () => editForm.value.taxRate,
    (v) => {
      calcTaxAmount();
    }
  );
  watch(
    () => editForm.value,
    (v) => {
      const { projectId, merchantId, storeId, startAt, endAt, expenseKey } = v;
      const flag =
        projectId &&
        merchantId &&
        storeId &&
        startAt &&
        endAt &&
        expenseKey === INTENTION_CODE;
      if (flag) {
        getContractList({
          projectId: editForm.value.projectId!,
          merchantId: editForm.value.merchantId!,
          storeId: editForm.value.storeId!,
          startDate: editForm.value.startAt!,
          endDate: editForm.value.endAt!
        });
      }
    },
    { immediate: true, deep: true }
  );
  const formProps = computed<Recordable>(() => ({
    menuForm: false,
    layout: 'vertical',
    columns: [
      {
        label: '基本信息',
        prop: 'basicInfo',
        type: 'groupTitle'
      },
      {
        label: '账单编号：',
        prop: 'code',
        span: 24,
        options: {
          disabled: true,
          placeholder: '系统自动生成'
        }
      },
      {
        label: '项目名称：',
        prop: 'projectId',
        type: 'select',
        dic: projectList.value,
        options: {
          onChange(e: string) {
            editForm.value.expenseItemsId = undefined;
            setActiveProject(e);
            getMerchantDropList(e);
            getStoreSelectList({ projectId: e });
            getProjectName(Number(e));
            getExpenseList({
              parentExpenseCodes:
                '202212270001,202212270002,202212270003,202212270004,202212270005,202212270006,202212270007,202212270008,202212270009,202212270010',
              projectId: e
            });
          }
        },
        rules: [{ required: true, message: '归属项目不能为空' }]
      },
      {
        label: '商户名称：',
        type: 'select',
        options: {
          allowSearch: true,
          onChange(e: number) {
            const item = merchantDropList.value.find((a: any) => a.value === e);
            if (item) {
              editForm.value.merchantName = item!.label;
            }
            editForm.value.storeId = undefined;
            editForm.value.startAt = undefined;
            editForm.value.endAt = undefined;
            editForm.value.billCreateAt = undefined;
            editForm.value.paymentDays = undefined;
            getStoreSelectList({
              projectId: editForm.value.projectId,
              merchantId: e
            });
          }
        },
        prop: 'merchantId',
        dic: merchantDropList.value,
        rules: [{ required: true, message: '商户名称不能为空' }]
      },
      {
        label: '店铺名称：',
        type: 'select',
        prop: 'storeId',
        options: {
          allowSearch: true,
          onChange(e: number) {
            const item = storeSelectList.value.find(
              (a: any) => a.value === e
            ) || { label: '' };
            editForm.value.storeName = item!.label;
            editForm.value.startAt = undefined;
            editForm.value.endAt = undefined;
            editForm.value.billCreateAt = undefined;
            editForm.value.paymentDays = undefined;
          }
        },
        dic: storeSelectList.value,
        rules: [{ required: true, message: '店铺名称不能为空' }]
      },
      {
        label: '账单类型：',
        type: 'select',
        prop: 'billType',
        dic: billTypeList,
        options: {},
        rules: [{ required: true, message: '账单类型不能为空' }]
      },
      {
        label: '费用项目：',
        type: 'select',
        prop: 'expenseItemsId',
        dic: expenseList.value,
        options: {
          allowSearch: true,
          fieldNames: {
            label: 'expenseType',
            value: 'expenseId'
          },
          onChange: async (e: number) => {
            const item = expenseList.value.find(
              (el: any) => el.expenseId === e
            );
            if (item) {
              expenseTypeCode.value = item!.parentExpenseCode || '';
              editForm.value.expenseKey = item!.parentExpenseCode || '';
              editForm.value.expenseItemsId = e;
              editForm.value.expenseItemsName = item!.expenseType || '';
            }
            if (
              ['202212270004', '202212270003', '202212270009'].includes(
                expenseTypeCode.value
              )
            ) {
              editForm.value.hasTax = undefined;
              lsStore.setItem('mis_finance_hasTax', undefined);
            }
            lsStore.setItem('mis_finance_add_bill_expense_id', String(e));
          }
        },
        rules: [{ required: true, message: '费用项目不能为空' }]
      },
      {
        label: '收费方式：',
        type: 'select',
        prop: 'chargingMethod',
        options: {
          disabled: true
        },
        dic: chargingMethodList,
        rules: [{ required: true, message: '收费方式不能为空' }]
      },
      {
        label: '账单生成日(应收日)：',
        prop: 'billCreateAt',
        type: 'date',
        span: 6,
        options: {
          onChange() {
            editForm.value.paymentDays = undefined;
          }
        },
        rules: [{ required: true, message: '账单生成日不能为空' }]
      },
      {
        label: '账期：',
        prop: 'paymentDays',
        type: 'singleMonth',
        options: {
          format: 'YYYYMM',
          onChange(e: number) {
            console.log(e);
          }
        },
        span: 6,
        rules: [{ required: true, message: '账期不能为空' }]
      },
      {
        label: '费用开始日期：',
        prop: 'startAt',
        type: 'date',
        span: 6,
        rules: [{ required: true, message: '费用开始日期不能为空' }]
      },
      {
        label: '费用结束日期：',
        prop: 'endAt',
        type: 'date',
        span: 6,
        rules: [{ required: true, message: '费用结束日期不能为空' }]
      },
      {
        display: editForm.value.expenseKey === '202212270003',
        label: '意向合同：',
        type: 'select',
        prop: 'contractId',
        options: {
          fieldNames: {
            label: 'contractCode',
            value: 'contractId'
          }
        },
        dic: intentionContractList,
        rules: [{ required: true, message: '账单类型不能为空' }]
      },
      {
        label: '金额：',
        prop: 'amount',
        type: 'inputNumber',
        span: 6,
        options: {
          hideButton: true,
          onChange(e: number) {
            if (!isBIP.value) {
              calcTaxAmount();
            } else {
              editForm.value.receivableAmount = e;
            }
          }
        },
        rules: [
          { required: true, message: '金额不能为空' },
          {
            match: /^\d+\.?\d{1,2}$|^\d{1,2}$/,
            message: '金额输入有误,请检查'
          },
          {
            validator: (value: number, callback: Function) => {
              if (value >= 999999999.99) {
                callback('金额不能大于999999999.99');
              }
              callback();
            }
          }
        ]
      },
      {
        label: '是否含税：',
        type: 'select',
        prop: 'hasTax',
        dic: [
          { label: '是', value: 1 },
          { label: '否', value: 0 }
        ],
        options: {
          onChange(e: number) {
            editForm.value.hasTax = e;
            calcTaxAmount();
            lsStore.setItem('mis_finance_hasTax', String(e));
          },
          disabled: isBIP.value
        },
        rules: [{ required: !isBIP.value, message: '是否含税不能为空' }]
      },
      {
        label: '税率：',
        prop: 'taxRate',
        span: 6,
        options: {
          hideButton: true
        },
        rules: [
          { required: !isBIP.value, message: '税率不能为空' },
          {
            match: /^\d{1,2}\.?\d{1,2}$|^\d{1,2}$/,
            message: '输入有误,请检查'
          },
          {
            validator: (value: number, callback: Function) => {
              if (value < 0) {
                callback('税率必须大于0%');
              } else if (value >= 100) {
                callback('税率不能大于100%');
              }
              callback();
            }
          }
        ]
      },
      {
        label: '不含税金额：',
        prop: 'taxExclusiveAmount',
        options: {
          disabled: true
        },
        display: !isBIP.value,
        span: 6,
        rules: [{ required: true, message: '不含税金额不能为空' }]
      },
      {
        label: '税额：',
        prop: 'taxAmount',
        display: !isBIP.value,
        options: {
          disabled: true
        },
        span: 6,
        rules: [{ required: true, message: '税额不能为空' }]
      },
      {
        label: editForm.value.billType === 1 ? '应收金额：' : '应付金额：',
        prop: 'receivableAmount',
        options: {
          disabled: true
        },
        span: 6,
        rules: [{ required: true, message: '应收金额不能为空' }]
      }
    ]
  }));
</script>
<style scoped lang="less"></style>
