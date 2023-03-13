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
              @popup-visible-change="(e) => onItemTypeChange(e, index)"
            />
          </div>
          <div
            class="icon-check-box flex align-center"
            @click="onCheckChange(index)"
          >
            <icon-check-circle
              v-if="form[index].taxIncluded"
              class="icon-check icon-color-blue"
            />
            <div v-else class="i-round"></div>
            是否含税
          </div>
        </div>
        <div class="flex table-handle-box">
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
              <a-form-item field="startDatum" label="滞纳金起算基准">
                <a-select v-model="item.startDatum" placeholder="请选择">
                  <a-option value="1">账单生成日期</a-option>
                  <a-option value="2">账单确认日期</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="sectionUnit" label="免滞纳金区间">
                <a-select v-model="item.sectionUnit" placeholder="请选择">
                  <a-option value="1">月</a-option>
                  <a-option value="2">天</a-option>
                </a-select>
                <i-number-input
                  v-model:input-value="item.section"
                  value-type="plusNumber"
                  max-value="999999999"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item field="calculationMethod" label="滞纳金计算方式">
                <a-select v-model="item.calculationMethod" placeholder="请选择">
                  <a-option value="1">按比例</a-option>
                  <a-option value="2">按金额</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item
                v-if="Number(item.calculationMethod) === 1"
                field="amount"
                label="比例"
              >
                <i-number-input
                  v-model:input-value="item.amount"
                  max-value="1000"
                  :need-append="true"
                >
                  <template #append>‰</template>
                </i-number-input>
              </a-form-item>
              <a-form-item v-else field="amount" label="金额">
                <i-number-input
                  v-model:input-value="item.amount"
                  value-type="plus"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="6">
              <a-form-item field="taxRate" label="税率">
                <i-number-input
                  v-model:input-value="item.taxRate"
                  max-value="100"
                  :need-append="true"
                >
                  <template #append>%</template>
                </i-number-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <a-button class="margin-top-16" type="primary" long @click="addNewItem"
      >新增费用项目</a-button
    >
    <div class="f-bottom">
      <footer-btn
        @on-cancel="onCancel"
        @on-pre="onPre"
        @on-save="() => onSave(false)"
        @on-next="onNext"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import FooterBtn from '@/views/new-contract/__components__/footer-btn.vue';
  import {
    CbdApiProjectCommonMisTreeExpenseGetResponse,
    cbdApiProjectFormalContractLateFeeInfoContractIdGet,
    cbdApiProjectFormalContractLateFeeSavePost,
    cbdApiProjectIntentionContractLateFeeInfoContractIdGet,
    cbdApiProjectIntentionContractLateFeeSavePost
  } from '@/api';
  import { useContractStore } from '@/store/project/contract';
  import { Message } from '@arco-design/web-vue';
  import INumberInput from '@/views/new-contract/__components__/i-number-input.vue';
  import { useRequest } from '@har/use';
  import { modalConfirm } from '@/utils';

  const props = defineProps({
    isEdit: {
      type: Boolean,
      default: false
    }
  });

  const loading = ref(false);

  //费用项目下拉
  const optionsSelect = ref<CbdApiProjectCommonMisTreeExpenseGetResponse>([]);
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
      getLateFeeInfo({
        contractId: contractId.value
      });
    }
    optionsSelect.value =
      (await contractStore.getExpenseTree(
        '202212270005',
        '',
        contractId.value,
        '',
        '',
        '1',
        '1'
      )) || [];
    optionsSelect.value = connectName(optionsSelect.value);
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

  const { run: getLateFeeInfo } = useRequest(
    contractType.value === 2
      ? cbdApiProjectFormalContractLateFeeInfoContractIdGet
      : cbdApiProjectIntentionContractLateFeeInfoContractIdGet,
    {
      manual: true,
      onSuccess(d) {
        if (d.length > 0) {
          form.value = d.map((item) => {
            const {
              itemType,
              taxIncluded,
              startDatum,
              sectionUnit,
              section,
              calculationMethod,
              amount,
              taxRate
            } = item;
            return {
              itemType: String(itemType),
              taxIncluded,
              startDatum: String(startDatum),
              sectionUnit: String(sectionUnit),
              section: String(section),
              calculationMethod: String(calculationMethod),
              amount: String(amount),
              taxRate: String(taxRate)
            };
          });
        }
      }
    }
  );

  type lateFeeSaveList = {
    itemType: number | string;
    taxIncluded: number;
    startDatum: number | string;
    sectionUnit: number | string;
    section: number | string;
    calculationMethod: number | string;
    amount: number | string;
    taxRate: number | string;
  };

  const form = ref<Array<lateFeeSaveList>>([]);
  const rules = {
    startDatum: [{ required: true, message: '滞纳金起算基准必传' }],
    sectionUnit: [{ required: true, message: '免滞纳金区间必传' }],
    section: [{ required: true, message: '免滞纳金区间必传' }],
    calculationMethod: [{ required: true, message: '滞纳金计算方式必传' }],
    amount: [{ required: true, message: '比例/金额必传' }],
    taxRate: [{ required: true, message: '税率必传' }]
  };
  const addNewItem = () => {
    form.value.push({
      itemType: '',
      taxIncluded: 1,
      startDatum: '',
      sectionUnit: '',
      section: '',
      calculationMethod: '',
      amount: '',
      taxRate: ''
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
        taxIncluded: 1,
        startDatum: '',
        sectionUnit: '',
        section: '',
        calculationMethod: '',
        amount: '',
        taxRate: ''
      };
    });
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

  const onCheckChange = (index: number) => {
    form.value[index].taxIncluded = Number(!form.value[index].taxIncluded);
  };

  const emits = defineEmits(['onCancel', 'onSave', 'onNext', 'onPre']);

  const onPre = () => {
    emits('onPre');
  };

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
      label: '滞纳金起算基准',
      value: 'startDatum'
    },
    {
      label: '免滞纳金区间单位',
      value: 'sectionUnit'
    },
    {
      label: '免滞纳金区间',
      value: 'section'
    },
    {
      label: '滞纳金计算方式',
      value: 'calculationMethod'
    },
    {
      label: '比例/金额',
      value: 'amount'
    },
    {
      label: '税率',
      value: 'taxRate'
    }
  ];

  const toNext = ref(false);
  const onSave = (isNext: boolean) => {
    toNext.value = isNext;
    if (form.value.length < 1) {
      submitServe({
        contractId: Number(contractStore.contractInfo.contractId),
        lateFeeSaveList: []
      });
      return;
      // if (isNext) {
      //   submitServe({
      //     contractId: Number(contractStore.contractInfo.contractId),
      //     lateFeeSaveList: []
      //   });
      //   return;
      //   // return emits('onNext');
      // } else {
      //   return Message.error({ content: '保存时，费用项目不能为空' });
      // }
    }
    const flag = form.value.every((item, index) => {
      const valueArr = Object.values(item);
      const keyArr = Object.keys(item);
      return valueArr.every((sub, i) => {
        if (sub === '') {
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
        lateFeeSaveList: form.value.map((item) => {
          return {
            ...item,
            itemType: Number(item.itemType),
            startDatum: Number(item.startDatum),
            sectionUnit: Number(item.sectionUnit),
            section: Number(item.section),
            calculationMethod: Number(item.calculationMethod),
            amount: Number(item.amount),
            taxRate: Number(item.taxRate)
          };
        })
      };
      console.log(searchData, '--searchData---');
      submitServe({ ...searchData });
    }
  };

  const { run: submitServe } = useRequest(
    contractType.value === 2
      ? cbdApiProjectFormalContractLateFeeSavePost
      : cbdApiProjectIntentionContractLateFeeSavePost,
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
