<template>
  <div class="bond-box">
    <div v-for="(item, index) in form" :key="index" class="info-table">
      <div class="table-title">
        <div class="flex align-center">
          <div class="margin-right-24">
            <a-cascader
              v-model="form[index].itemType"
              :style="{ width: '120px' }"
              :options="optionsSelect"
              :field-names="{ value: 'expenseId', label: 'expenseType' }"
              placeholder="请选择费用项目"
              :bordered="false"
              :disabled="!form[index].isModify"
              @change="(e) => itemTypeChange(e + '', index)"
              @popup-visible-change="(e) => onItemTypeChange(e, index)"
            />
          </div>
          <!--<fee-checkbox v-model="form[index].taxIncluded" label="是否含税" />-->
          <!-- <div
            class="icon-check-box flex align-center"
            @click="onCheckChange(index)"
          >
            <icon-check-circle
              v-if="form[index].taxIncluded"
              class="icon-check icon-color-blue"
            />
            <div v-else class="i-round"></div>
            是否含税
          </div> -->
        </div>
        <div v-if="form[index].isModify" class="flex table-handle-box">
          <div
            class="btn-clear text-blue margin-right-8"
            @click="onClearItem(index)"
            >清空</div
          >
          <div class="btn-del text-red" @click="onDelItem(index)">删除</div>
        </div>
      </div>
      <div class="table-content">
        <a-form layout="vertical" :model="form[index]" :rules="rules">
          <a-row :gutter="16">
            <a-col :span="6">
              <a-form-item field="amount" label="金额">
                <i-number-input
                  v-model:input-value="item.amount"
                  :disabled="!item.isModify"
                  value-type="plus"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="receivableDate" label="账单生成日">
                <a-date-picker
                  :style="{ width: '100%' }"
                  v-model="item.receivableDate"
                  :readonly="!item.isModify"
                />
              </a-form-item>
            </a-col>
            <!-- <a-col :span="6">
              <a-form-item field="taxRate" label="税率">
                <i-number-input
                  v-model:input-value="item.taxRate"
                  max-value="100"
                  :need-append="true"
                >
                  <template #append>%</template>
                </i-number-input>
              </a-form-item>
            </a-col> -->
            <a-col :span="6">
              <a-form-item field="transfer" label="是否自动转移">
                <a-select
                  v-model="item.transfer"
                  placeholder="请选择"
                  :disabled="!item.isModify"
                  @change="(e) => onTransferChange(e + '', index)"
                >
                  <a-option :value="'1'">是</a-option>
                  <a-option :value="'0'">否</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col v-show="Number(form[index].transfer) === 1" :span="6">
              <a-form-item field="intoTaxIncluded" label="转入费用项目">
                <a-cascader
                  v-model="item.intoTaxIncluded"
                  :field-names="{ value: 'expenseId', label: 'expenseType' }"
                  :options="optionsTree"
                  placeholder="请选择"
                  :disabled="!item.isModify"
                  @popup-visible-change="(e) => onCascadeChange(e, index)"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <!-- <a-row v-show="Number(form[index].transfer) === 1" :gutter="16">
            <a-col :span="6">
              <a-form-item field="intoTaxIncluded" label="转入费用项目">
                <a-cascader
                  v-model="item.intoTaxIncluded"
                  :field-names="{ value: 'expenseId', label: 'expenseType' }"
                  :options="optionsTree"
                  placeholder="请选择"
                  @popup-visible-change="(e) => onCascadeChange(e, index)"
                />
              </a-form-item>
            </a-col>
          </a-row> -->
        </a-form>
      </div>
    </div>
    <a-button class="margin-top-16" type="primary" long @click="addNewItem"
      >新增费用项目</a-button
    >
    <div class="f-bottom">
      <footer-btn
        :btn-loading="loading"
        :need-left-btn="false"
        @on-cancel="onCancel"
        @on-save="() => onSave(false)"
        @on-pre="onPre"
        @on-next="onNext"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import FooterBtn from '@/views/new-contract/__components__/footer-btn.vue';
  import { useContractStore } from '@/store/project/contract';
  import {
    CbdApiProjectCommonMisTreeExpenseGetResponse,
    cbdApiProjectFormalContractBondInfoContractIdGet,
    cbdApiProjectFormalContractBondSavePost,
    CbdApiProjectFormalContractBondSavePostRequest,
    cbdApiProjectIntentionContractBondInfoContractIdGet
  } from '@/api';
  import { Message } from '@arco-design/web-vue';
  import INumberInput from '@/views/new-contract/__components__/i-number-input.vue';
  import { useRequest } from '@har/use';
  import { modalConfirm } from '@/utils';
  // import FeeCheckbox from '@/views/new-contract/__components__/cost-info/fee-checkbox.vue';

  const props = defineProps({
    isEdit: {
      type: Boolean,
      default: false
    }
  });

  const loading = ref(false);

  //费用项目下拉
  const optionsSelect = ref<CbdApiProjectCommonMisTreeExpenseGetResponse>([]);
  //费用项目树下拉
  const optionsTree = ref<CbdApiProjectCommonMisTreeExpenseGetResponse>([]);
  const contractStore = useContractStore();
  const contractId = computed(() => {
    return contractStore.contractInfo.contractId + '';
  });
  //合同类型
  const contractType = computed(() => {
    return contractStore.contractInfo.contractType;
  });

  onMounted(async () => {
    if (contractStore.contractInfo.contractId && props.isEdit) {
      getBondInfo({ contractId: contractId.value });
      // if (contractType.value === 1) {
      //   getIntentionBondInfo({ contractId: contractId.value });
      // } else if (contractType.value === 2) {
      //   getBondInfo({ contractId: contractId.value });
      // }
    }
    optionsSelect.value =
      (await contractStore.getExpenseTree(
        '202212270004',
        '',
        contractId.value
      )) || [];
    optionsSelect.value = connectName(optionsSelect.value);
    optionsTree.value =
      (await contractStore.getExpenseTree(
        '',
        '',
        contractId.value,
        '',
        '202212270004,202212270009'
      )) || [];
    optionsTree.value = connectName(optionsTree.value);
  });
  const connectName = (arr: CbdApiProjectCommonMisTreeExpenseGetResponse) => {
    arr.forEach((item: any) => {
      if (item.children) {
        if (item.children.length === 0) {
          delete item.children;
        } else {
          connectName(item.children);
        }
      }
    });
    return arr;
  };

  //正式
  const { run: getBondInfo } = useRequest(
    contractType.value === 2
      ? cbdApiProjectFormalContractBondInfoContractIdGet
      : cbdApiProjectIntentionContractBondInfoContractIdGet,
    {
      manual: true,
      onSuccess(d) {
        if (d.length > 0) {
          form.value = d.map((item) => {
            const {
              itemType,
              amount,
              receivableDate,
              transfer,
              intoTaxIncluded,
              isModify
            } = item;
            return {
              itemType: String(itemType),
              amount: String(amount),
              receivableDate,
              transfer: String(transfer),
              intoTaxIncluded: intoTaxIncluded,
              isModify
            };
          });
        }
      }
    }
  );

  type BondSaveList = {
    itemType: number | string;
    amount: number | string;
    receivableDate: string;
    transfer: number | string;
    intoTaxIncluded?: number | string;
    isModify: boolean | undefined;
  };

  const form = ref<Array<BondSaveList>>([]);
  const rules = {
    amount: [{ required: true, message: '金额必传' }],
    receivableDate: [{ required: true, message: '日期必传' }],
    taxRate: [{ required: true, message: '税率必传' }],
    transfer: [{ required: true, message: '是否自动转移' }],
    intoTaxIncluded: [{ required: true }]
  };
  const addNewItem = () => {
    form.value.push({
      itemType: '',
      amount: '',
      receivableDate: '',
      transfer: '0',
      intoTaxIncluded: '',
      isModify: true
    });
  };
  const onDelItem = (index: number) => {
    console.log('删除', index);
    // if (form.value.length === 1)
    //   return Message.error({ content: '当前项不能删除' });
    modalConfirm('确认删除当前项', () => {
      form.value.splice(index, 1);
    });
  };
  const onClearItem = (index: number) => {
    console.log('清空', index);
    modalConfirm('确认清空当前项', () => {
      form.value[index] = {
        itemType: '',
        amount: '',
        receivableDate: '',
        transfer: '0',
        intoTaxIncluded: '',
        isModify: true
      };
    });
  };

  const onTransferChange = (value: string, index: number) => {
    if (Number(value)) {
      form.value[index].intoTaxIncluded = '';
    }
  };

  //费用项
  const itemTypeChange = (value: string, index: number) => {
    form.value[index].intoTaxIncluded = '';
  };
  //费用项下拉
  const onItemTypeChange = (value: boolean, index: number) => {
    if (value) {
      const chooseArr = form.value
        .map((item) => item.itemType)
        .filter((item) => item !== '');
      optionsSelect.value = optionsSelect.value.map((item) => {
        return {
          ...item,
          disabled: chooseArr.some(
            (sub) => Number(sub) === Number(item.expenseId)
          )
        };
      });
    }
  };

  const onCascadeChange = (value: boolean, index: number) => {
    if (value) {
      arrConnectDisable(optionsTree.value, form.value[index].itemType + '');
    }
  };

  type TreeItem = CbdApiProjectCommonMisTreeExpenseGetResponse[0] & {
    disabled?: boolean;
  };

  const arrConnectDisable = (
    arr: CbdApiProjectCommonMisTreeExpenseGetResponse | any,
    selectVal: string
  ) => {
    arr.forEach((item: TreeItem) => {
      item.disabled =
        selectVal !== '' && Number(item.expenseId) === Number(selectVal);
      if (item.children) {
        arrConnectDisable(item?.children, selectVal);
      }
    });
    return arr;
  };

  const onCheckChange = (index: number) => {
    // form.value[index].taxIncluded = Number(!form.value[index].taxIncluded);
  };

  const emits = defineEmits(['onCancel', 'onSave', 'onNext', 'onPre']);

  const onCancel = () => {
    emits('onCancel');
  };

  const options = [
    {
      label: '费用项目',
      value: 'itemType'
    },
    {
      label: '是否含税',
      value: 'taxIncluded'
    },
    {
      label: '金额',
      value: 'amount'
    },
    {
      label: '应收日期',
      value: 'receivableDate'
    },
    {
      label: '税率',
      value: 'taxRate'
    },
    {
      label: '是否自动转移',
      value: 'transfer'
    },
    {
      label: '转移费用项',
      value: 'intoTaxIncluded'
    }
  ];

  const toNext = ref(false);
  const onSave = (isNext: boolean) => {
    toNext.value = isNext;
    if (form.value.length < 1) {
      submitServe({
        contractId: Number(contractStore.contractInfo.contractId),
        bondSaveList: []
      });
      return;
      // if (isNext) {
      //   submitServe({
      //     contractId: Number(contractStore.contractInfo.contractId),
      //     bondSaveList: []
      //   });
      //   return;
      //   // return emits('onNext');
      // } else {
      //
      //   return;
      // }
    }
    const flag = form.value.every((item, index) => {
      const valueArr = Object.values(item);
      const keyArr = Object.keys(item);
      return valueArr.every((sub, i) => {
        if (sub === '') {
          if (keyArr[i] === 'intoTaxIncluded' && Number(item.transfer) === 0)
            return true;
          const text = options.find((cur) => cur.value === keyArr[i])?.label;
          Message.error({
            content: `第${index + 1}项中${text}不能为空`
          });
          return false;
        } else {
          return true;
        }
      });
    });
    console.log(flag, '-----');
    if (flag) {
      const searchData = {
        contractId: Number(contractStore.contractInfo.contractId),
        bondSaveList: form.value.map((item) => {
          return {
            ...item,
            itemType: Number(item.itemType),
            amount: Number(item.amount),
            transfer: Number(item.transfer),
            intoTaxIncluded:
              item.intoTaxIncluded === ''
                ? undefined
                : Number(item.intoTaxIncluded)
          };
        })
      };
      console.log(searchData, '--searchData---');
      submitServe({ ...searchData });
    }
  };
  const { run: submitServe } = useRequest(
    cbdApiProjectFormalContractBondSavePost,
    {
      manual: true,
      onBefore() {
        loading.value = true;
      },
      onSuccess() {
        toNext.value ? emits('onNext') : emits('onSave');
      },
      onFinally() {
        loading.value = false;
      }
    }
  );

  const onPre = () => {
    emits('onPre');
  };

  const onNext = () => {
    onSave(true);
  };
</script>

<style scoped lang="less">
  .text-blue {
    color: #4c8af7;
  }
  .icon-color-blue {
    color: #6ea0f8;
  }
  .text-red {
    color: #fa4e40;
  }
  .margin-right-24 {
    margin-right: 24px;
  }
  .margin-right-8 {
    margin-right: 8px;
  }
  .margin-top-16 {
    margin-top: 16px;
  }
  .i-round {
    width: 16px;
    height: 16px;
    margin-right: 6px;
    background: #fff;
    border: 1px solid #dcdcdc;
    border-radius: 50%;
  }
  .bond-box {
    padding: 16px;
    .info-table {
      margin-bottom: 16px;
      padding: 12px 16px;
      background: #fff;
      .table-title {
        display: flex;
        justify-content: space-between;
        padding: 8px 12px;
        color: #333;
        font-size: 14px;
        background: #f2f2f4;
        border-bottom: 1px solid #d3d3d3;
        .icon-check-box {
          cursor: pointer;
          user-select: none;
          .icon-check {
            //width: 20px;
            //height: 20px;
            margin-right: 6px;
            font-size: 16px;
          }
        }
        .table-handle-box {
          user-select: none;
          .btn-clear {
            cursor: pointer;
          }
          .btn-del {
            cursor: pointer;
          }
        }
      }
      .table-content {
        margin-top: 16px;
      }
    }
  }
</style>
