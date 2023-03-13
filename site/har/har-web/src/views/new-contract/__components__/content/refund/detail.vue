<template>
  <div class="contract-refund-container">
    <a-spin :loading="loading" style="width: 100%">
      <a-empty
        v-if="formModel.backSaveList?.length === 0"
        style="background: #fff"
      />
      <a-form
        v-else
        ref="formRef"
        :model="formModel"
        :rules="formRules"
        layout="vertical"
        style="padding: 12px 16px; background: #fff"
      >
        <a-form-item
          :field="`backSaveList`"
          :rules="[{ required: true, message: '费用项目不能为空' }]"
          :validate-trigger="['change', 'blur']"
          class="a-form-item--hide-label a-form-item-content--height-auto"
        >
          <ul class="back-save-list" style="width: 100%">
            <li
              v-for="(item, idx) of formModel.backSaveList"
              :key="idx"
              class="back-save-item"
            >
              <div class="contract-refund-top">
                <div>
                  <a-form-item
                    :field="`backSaveList.${idx}.itemType`"
                    :rules="[{ required: true, message: '必选项' }]"
                    :validate-trigger="['change', 'blur']"
                    class="a-form-item--hide-label a-form-item--empty-margin a-form-item--text"
                  >
                    <a-cascader
                      v-model="item.itemType"
                      :style="{ width: '160px', marginLeft: '12px' }"
                      :options="options.itemType"
                      :field-names="{
                        value: 'expenseId',
                        label: 'expenseType'
                      }"
                      placeholder=""
                      :bordered="false"
                      disabled
                    />
                  </a-form-item>
                </div>
              </div>
              <div class="contract-refund-content" style="margin-top: 16px">
                <a-row :gutter="30">
                  <a-col :span="6">
                    <a-form-item label="账期（返款周期）" required>
                      <div class="contract-refund-input-box">
                        {{ item.period
                        }}{{
                          getOptionLabel(options.periodUnit, item.periodUnit)
                        }}返一次款
                      </div>
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item label="返款调整" required>
                      <div class="contract-refund-input-box">
                        {{
                          getOptionLabel(options.backUnitOne, item.backUnitOne)
                        }}{{ item.back }}个{{
                          getOptionLabel(options.backUnitTwo, item.backUnitTwo)
                        }}
                      </div>
                    </a-form-item>
                  </a-col>
                  <!--<a-col :span="6">-->
                  <!--  <a-form-item-->
                  <!--    :field="`backSaveList.${idx}.billGenDay`"-->
                  <!--    :rules="[{ required: true, message: '必填项' }]"-->
                  <!--    :validate-trigger="['change', 'blur']"-->
                  <!--    label="账单生成日"-->
                  <!--    required-->
                  <!--  >-->
                  <!--    {{item.billGenDay}}-->
                  <!--  </a-form-item>-->
                  <!--</a-col>-->
                  <a-col :span="6">
                    <a-form-item
                      :field="`backSaveList.${idx}.advancePayment`"
                      :rules="[{ required: true, message: '必选项' }]"
                      :validate-trigger="['change', 'blur']"
                      label="是否按比例转预付款"
                      required
                    >
                      {{
                        getOptionLabel(options.booleanUnit, item.advancePayment)
                      }}
                    </a-form-item>
                  </a-col>

                  <template v-if="item.advancePayment === 1">
                    <a-col :span="6">
                      <a-form-item
                        :field="`backSaveList.${idx}.proportion`"
                        :rules="[{ required: true, message: '必填项' }]"
                        :validate-trigger="['change', 'blur']"
                        label="转预付款比例"
                        required
                      >
                        <span v-if="item.proportion != null"
                          >{{ item.proportion }}%</span
                        >
                      </a-form-item>
                    </a-col>
                    <a-col :span="6">
                      <a-form-item
                        :field="`backSaveList.${idx}.intoTaxIncluded`"
                        :rules="[{ required: true, message: '必选项' }]"
                        :validate-trigger="['change', 'blur']"
                        label="转入预付款费用项目"
                        class="a-form-item--text"
                        disabled
                        required
                      >
                        <a-cascader
                          v-model="item.intoTaxIncluded"
                          :style="{ width: '100%' }"
                          :options="options.intoTaxIncluded"
                          :field-names="{
                            value: 'expenseId',
                            label: 'expenseType'
                          }"
                          disabled
                          placeholder="请选择"
                          :bordered="true"
                        />
                      </a-form-item>
                    </a-col>
                  </template>
                  <a-col :span="6">
                    <a-form-item
                      :field="`backSaveList.${idx}.serviceCharge`"
                      :rules="[{ required: true, message: '必选项' }]"
                      :validate-trigger="['change', 'blur']"
                      label="是否收取手续费"
                      required
                    >
                      {{
                        getOptionLabel(options.booleanUnit, item.serviceCharge)
                      }}
                    </a-form-item>
                  </a-col>
                </a-row>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <div>
                    <span style="font-size: 16px; color: #333">返款明细</span>
                  </div>
                </div>
                <div class="refund-table" style="margin-top: 16px">
                  <a-table :data="item.backPayment" :pagination="false">
                    <template #columns>
                      <a-table-column title="序号" :width="120">
                        <template #cell="{ rowIndex }">
                          <span>{{ rowIndex + 1 }}</span>
                        </template>
                      </a-table-column>
                      <a-table-column title="支付方式">
                        <template #cell="{ record, rowIndex }">
                          <a-form-item
                            :field="`backSaveList.${idx}.backPayment.${rowIndex}.method`"
                            :rules="[{ required: true, message: '必选项' }]"
                            :validate-trigger="['change', 'blur']"
                            class="a-form-item--hide-label"
                            required
                            no-style
                          >
                            {{
                              getOptionLabel(options.payMethod, record.method)
                            }}
                          </a-form-item>
                        </template>
                      </a-table-column>
                      <a-table-column title="手续费率（‰）">
                        <template #cell="{ record }">
                          <span v-if="record.rate != null"
                            >{{ record.rate }}‰</span
                          >
                        </template>
                      </a-table-column>
                    </template>
                  </a-table>
                </div>
              </div>
            </li>
          </ul>
        </a-form-item>
      </a-form>
    </a-spin>
    <FooterBtn
      :need-pre="true"
      :need-save="false"
      :need-left-btn="true"
      @on-pre="emit('on-pre')"
      @on-cancel="emit('on-cancel')"
      @on-update="emit('on-update')"
      @on-next="handleSave(2)"
      @on-save="handleSave(1)"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ContractRefundDetail'
  };
</script>
<script lang="ts" setup>
  import { onMounted, PropType, ref } from 'vue';
  import {
    cbdApiProjectCommonMisPayMethodSelectContractGet,
    CbdApiProjectCommonMisTreeExpenseGetResponse,
    cbdApiProjectFormalContractBackInfoContractIdGet,
    CbdApiProjectFormalContractBackSavePostRequest
  } from '@/api';
  import FooterBtn from '../../footer-btn.vue';
  import { getOptionLabel } from '@/utils';
  import { useContractStore } from '@/store/project/contract';
  import {
    Dict,
    BackSaveReq,
    BackSaveItem,
    BackPaymentItem
  } from './interface';
  import { useOptions } from './use-options';
  import { SelectOptions } from '@/components/i-select/interface';
  import { useApi } from './use-api';
  import { useAsyncTasks } from '@/hooks/use-async-tasks';

  const emit = defineEmits([
    'on-update',
    'on-pre',
    'on-save',
    'on-cancel',
    'on-next'
  ]);
  const props = defineProps({
    contractId: [String, Number] as PropType<string | number>
  });
  const { contractInfo, drawerVisible, tableRefresh, getExpenseTree } =
    useContractStore();
  const { saveApi, detailApi } = useApi(contractInfo.contractType);
  const { loading, execAsyncTasks } = useAsyncTasks();

  const formRef = ref();
  const formModel = ref<CbdApiProjectFormalContractBackSavePostRequest>(
    new BackSaveReq()
  );
  const formRules = ref({});
  const { options } = useOptions({
    itemType: [],
    intoTaxIncluded: []
  });

  function connectName(arr: CbdApiProjectCommonMisTreeExpenseGetResponse) {
    arr.forEach(
      (item: CbdApiProjectCommonMisTreeExpenseGetResponse[number]) => {
        if ('children' in item && item.children) {
          if (item.children.length === 0) {
            delete item.children;
          } else {
            connectName(
              item.children as CbdApiProjectCommonMisTreeExpenseGetResponse,
            );
          }
        }
      }
    );
    return arr;
  }

  function handleClear(item: BackSaveItem) {
    const filterKeys = ['backPayment', 'intoTaxIncluded'];
    for (const [k, v] of Object.entries(item)) {
      if (typeof v !== 'object' && !filterKeys.includes(k)) {
        // @ts-ignore
        item[k] = null;
      }
    }
  }

  function handleChangePayMethod(row: BackPaymentItem) {
    const item = options.value.payMethod.find(
      (itm) => itm.value === row.method
    );
    row.rate = (item?.feeRate ?? null) as number;
  }

  async function handleSave(type = 1) {
    type === 1 ? emit('on-save') : emit('on-next');
  }

  onMounted(async () => {
    const contractId = contractInfo.contractId as unknown as string;

    formModel.value.contractId = contractId as unknown as number;
    const tasks = [];

    // 详情
    tasks.push(
      cbdApiProjectFormalContractBackInfoContractIdGet({
        contractId
      }).then((res) => {
        formModel.value.backSaveList = res;
      })
    );

    // 下拉数据-支付方式
    tasks.push(
      cbdApiProjectCommonMisPayMethodSelectContractGet({
        contractId
      }).then((res) => {
        options.value.payMethod = res;
      })
    );
    // 下拉数据-费用项目
    tasks.push(
      getExpenseTree(
        Dict.itemType,
        '',
        contractId,
        undefined,
        undefined,
        '1'
      ).then((res) => {
        // @ts-ignore
        options.value.itemType = connectName(
          res || []
        ) as unknown as SelectOptions;
      })
    );
    // 下拉数据-预付款费用项目
    tasks.push(
      getExpenseTree(
        Dict.intoTaxIncluded,
        '',
        contractId,
        undefined,
        undefined,
        '1'
      ).then((res) => {
        // @ts-ignore
        options.value.intoTaxIncluded = connectName(
          res || []
        ) as unknown as SelectOptions;
      })
    );

    await execAsyncTasks(tasks);
  });
</script>

<style lang="less" scoped>
  .contract-refund-container {
    margin: 16px;
  }
  .contract-refund-top {
    min-height: 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f2f2f4;
    border-bottom: 1px solid #d3d3d3;
    > :first-child {
      ::v-deep .arco-form-item-wrapper-col {
        flex-direction: row;
        align-items: center;
        .arco-form-item-message {
          margin-left: 6px;
          white-space: nowrap;
        }
      }
    }
  }
  .contract-refund-input-box {
    display: flex;
    width: 100%;
    > :last-child {
      flex-grow: 1;
    }
  }
  .back-save-list {
    margin: 0;
    padding: 0;
    list-style: none;
    > li {
      margin-bottom: 30px;
      &:last-child {
        margin-bottom: 16px;
      }
    }
  }
  .contract-refund-content {
    > div:first-child {
      ::v-deep .arco-form-item-content {
        padding-left: 12px;
      }
    }
  }
</style>
