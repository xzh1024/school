<template>
  <div class="contract-refund-container">
    <a-spin :loading="loading" style="width: 100%">
      <a-form
        ref="formRef"
        :model="formModel"
        :rules="formRules"
        layout="vertical"
        class="a-form--inline-error"
        style="padding: 12px 16px; background: #fff"
      >
        <a-form-item
          field="backSaveList"
          :rules="
            operatMode === 2
              ? [
                  {
                    type: 'array',
                    required: true,
                    minLength: 1,
                    message: '费用项目不能为空'
                  }
                ]
              : []
          "
          :validate-trigger="['change', 'blur']"
          class="a-form-item--block-error a-form-item--hide-label a-form-item-content--height-auto"
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
                    class="a-form-item--hide-label"
                  >
                    <a-cascader
                      v-model="item.itemType"
                      :style="{ width: '160px' }"
                      :options="options.itemType"
                      :field-names="{
                        value: 'expenseId',
                        label: 'expenseType'
                      }"
                      placeholder="请选择费用项目"
                      :bordered="false"
                    />
                  </a-form-item>
                </div>
                <div>
                  <a-button type="text" @click="handleClear(item)"
                    >清空</a-button
                  >
                  <a-popconfirm
                    content="确定要删除？"
                    @ok="formModel.backSaveList?.splice(idx, 1)"
                  >
                    <a-button status="danger" type="text"> 删除</a-button>
                  </a-popconfirm>
                </div>
              </div>
              <div style="margin-top: 16px">
                <a-row :gutter="30">
                  <a-col :span="6">
                    <a-form-item
                      label="账期（返款周期）"
                      class="a-form-item--empty-margin"
                      style="padding: 0"
                      required
                    >
                      <div class="contract-refund-input-box">
                        <a-form-item
                          :field="`backSaveList.${idx}.periodUnit`"
                          :rules="[{ required: true, message: '必选项' }]"
                          :validate-trigger="['change', 'blur']"
                          style="width: auto"
                          class="a-form-item--hide-label"
                        >
                          <i-select
                            v-model="item.periodUnit"
                            :options="options.periodUnit"
                            style="width: 80px"
                            @change="
                              handleChangePeriodUnit(item.periodUnit, [
                                `backSaveList.${idx}.billGenDay`
                              ])
                            "
                          />
                        </a-form-item>
                        <a-form-item
                          :field="`backSaveList.${idx}.period`"
                          :rules="[{ required: true, message: '必填项' }]"
                          :validate-trigger="['change', 'blur']"
                          class="a-form-item--hide-label"
                        >
                          <a-input-number
                            v-model="item.period"
                            :min="1"
                            :max="366"
                            placeholder="请输入"
                            hide-button
                          />
                        </a-form-item>
                      </div>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="返款调整"
                      class="a-form-item--empty-margin"
                      style="padding: 0"
                      required
                    >
                      <div class="contract-refund-input-box">
                        <a-form-item
                          :field="`backSaveList.${idx}.backUnitOne`"
                          :rules="[{ required: true, message: '必选项' }]"
                          :validate-trigger="['change', 'blur']"
                          style="width: auto"
                          class="a-form-item--hide-label"
                        >
                          <i-select
                            v-model="item.backUnitOne"
                            :options="options.backUnitOne"
                            style="width: 80px"
                            disabled=""
                          />
                        </a-form-item>
                        <a-form-item
                          :field="`backSaveList.${idx}.backUnitTwo`"
                          :rules="[{ required: true, message: '必选项' }]"
                          :validate-trigger="['change', 'blur']"
                          style="width: auto"
                          class="a-form-item--hide-label"
                        >
                          <i-select
                            v-model="item.backUnitTwo"
                            :options="options.backUnitTwo"
                            style="width: 92px"
                          />
                        </a-form-item>
                        <a-form-item
                          :field="`backSaveList.${idx}.back`"
                          :rules="[{ required: true, message: '必填项' }]"
                          :validate-trigger="['change', 'blur']"
                          class="a-form-item--hide-label"
                        >
                          <a-input-number
                            v-model="item.back"
                            :min="1"
                            :max="366"
                            placeholder="请输入"
                            hide-button
                          />
                        </a-form-item>
                      </div>
                    </a-form-item>
                  </a-col>
                  <a-col v-if="item.backUnitTwo === 1" :span="6">
                    <a-form-item
                      :field="`backSaveList.${idx}.billGenDay`"
                      :rules="
                        item.backUnitTwo === 1
                          ? [{ required: true, message: '必填项' }]
                          : []
                      "
                      :validate-trigger="['change', 'blur']"
                      class="a-form-item--empty-margin"
                      label="账单生成日"
                      required
                    >
                      <a-input-number
                        v-model="item.billGenDay"
                        :min="1"
                        :max="31"
                        :disabled="item.periodUnit !== 1"
                        placeholder="请输入"
                        hide-button
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item
                      :field="`backSaveList.${idx}.advancePayment`"
                      :rules="[{ required: true, message: '必选项' }]"
                      :validate-trigger="['change', 'blur']"
                      label="是否按比例转预付款"
                      required
                    >
                      <i-select
                        v-model="item.advancePayment"
                        :options="options.booleanUnit"
                      />
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
                        <a-input-number
                          v-model="item.proportion"
                          :min="0"
                          :max="100"
                          placeholder="请输入"
                          hide-button
                        >
                          <template #suffix>%</template>
                        </a-input-number>
                      </a-form-item>
                    </a-col>
                    <a-col :span="6">
                      <a-form-item
                        :field="`backSaveList.${idx}.intoTaxIncluded`"
                        :rules="[{ required: true, message: '必选项' }]"
                        :validate-trigger="['change', 'blur']"
                        label="转入预付款费用项目"
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
                      <i-select
                        v-model="item.serviceCharge"
                        :options="options.booleanUnit"
                        @event-change="handleChangeServiceCharge(item)"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 20px;
                  "
                >
                  <div>
                    <span style="font-size: 16px; color: #333">返款明细</span>
                  </div>
                  <div>
                    <a-button @click="handleAddRow(item)"> 添加行</a-button>
                  </div>
                </div>
                <div style="margin-top: 16px">
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
                          >
                            <i-select
                              v-model="record.method"
                              style="width: 200px"
                              :options="processPayMethod(item.backPayment)"
                              @event-change="handleChangePayMethod(record, item)"
                            />
                          </a-form-item>
                        </template>
                      </a-table-column>
                      <a-table-column title="手续费率（‰）">
                        <template #cell="{ record, rowIndex }">
                          <a-form-item
                            :field="`backSaveList.${idx}.backPayment.${rowIndex}.rate`"
                            :rules="item.serviceCharge === 0 ? [] : [{ required: true, message: '必填项' }]"
                            :validate-trigger="['change', 'blur']"
                            class="a-form-item--hide-label"
                            required
                          >
                            <a-input-number
                              v-model="record.rate"
                              :min="0"
                              :max="1000"
                              :disabled="item.serviceCharge === 0"
                              style="width: 200px"
                              hide-button
                            >
                              <template #suffix>‰</template>
                            </a-input-number>
                          </a-form-item>
                        </template>
                      </a-table-column>
                      <a-table-column title="操作" :width="120">
                        <template #cell="{ rowIndex }">
                          <a-popconfirm
                            content="确定要删除？"
                            @ok="
                              item.backPayment &&
                                item.backPayment.splice(rowIndex, 1)
                            "
                          >
                            <a-button type="text">删除</a-button>
                          </a-popconfirm>
                        </template>
                      </a-table-column>
                    </template>
                  </a-table>
                </div>
              </div>
            </li>
          </ul>
        </a-form-item>
        <div>
          <a-button type="primary" long @click="handleAdd"
            >新增费用项目</a-button
          >
        </div>
      </a-form>
    </a-spin>
    <FooterBtn
      :need-pre="true"
      :need-left-btn="false"
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
    name: 'ContractRefund'
  };
</script>
<script lang="ts" setup>
  import { cloneDeep } from 'lodash';
  import { onMounted, PropType, ref } from 'vue';
  import ISelect from '@/components/i-select/index.vue';
  import {
    cbdApiProjectCommonMisPayMethodSelectContractGet,
    CbdApiProjectCommonMisTreeExpenseGetResponse,
    CbdApiProjectFormalContractBackSavePostRequest
  } from '@/api';

  import {
    Dict,
    BackSave,
    BackPayment,
    BackSaveReq,
    BackSaveItem,
    BackPaymentItem
  } from './interface';
  import { useApi } from './use-api';
  import { useOptions } from './use-options';
  import FooterBtn from '../../footer-btn.vue';
  import { useContractStore } from '@/store/project/contract';
  import { Message } from '@arco-design/web-vue';
  import { useAsyncTasks } from '@/hooks/use-async-tasks';
  import {
    FORM_VALIDATE_ERROR_TEXT,
    WAIT_LOADING_TEXT
  } from '@/config/message';

  const emit = defineEmits([
    'on-update',
    'on-pre',
    'on-save',
    'on-cancel',
    'on-next'
  ]);
  const props = defineProps({
    isEdit: Boolean as PropType<boolean>,
    contractId: [String, Number] as PropType<string | number>
  });

  const { contractInfo, drawerVisible, tableRefresh, getExpenseTree } =
    useContractStore();
  const { saveApi, detailApi, contractDetailApi } = useApi(
    contractInfo.contractType
  );
  const { loading, execAsyncTasks } = useAsyncTasks();

  const formRef = ref();
  const formModel = ref<CbdApiProjectFormalContractBackSavePostRequest>(
    new BackSaveReq()
  );
  const formRules = ref({});
  const { options } = useOptions({
    itemType: [] as CbdApiProjectCommonMisTreeExpenseGetResponse,
    intoTaxIncluded: [] as CbdApiProjectCommonMisTreeExpenseGetResponse
  });
  // 经营方式1、自营2、联营
  const operatMode = ref(-1);
  const saveKeysMap = ref<{ [key: number]: Array<number> }>({});

  function connectName(arr: CbdApiProjectCommonMisTreeExpenseGetResponse) {
    arr.forEach(
      (item: CbdApiProjectCommonMisTreeExpenseGetResponse[number]) => {
        if ('children' in item && item.children) {
          if (item.children.length === 0) {
            delete item.children;
          } else {
            connectName(
              item.children as CbdApiProjectCommonMisTreeExpenseGetResponse
            );
          }
        }
      }
    );
    return arr;
  }

  function handleAdd() {
    const backSave = new BackSave();
    formModel.value.backSaveList?.push(backSave);
    options.value.payMethod.forEach((payMethod) => {
      const backPayment = new BackPayment();
      backPayment.method = payMethod.value;
      backPayment.rate = !backSave.serviceCharge ? 0 : payMethod.feeRate;
      // @ts-ignore
      backSave.backPayment && backSave.backPayment.push(backPayment);
    });
    formRef.value?.clearValidate?.();
  }

  function handleAddRow(item: BackSaveItem) {
    item.backPayment && item.backPayment.push(new BackPayment());
  }

  function handleChangePeriodUnit(value: number, fields: Array<string>) {
    if (value === 2) {
      formRef.value?.clearValidate(fields);
    }
  }

  function handleClear(item: BackSaveItem) {
    const filterKeys = ['backPayment', 'itemType'];
    for (const [k, v] of Object.entries(item)) {
      if (typeof v !== 'object' && !filterKeys.includes(k)) {
        // @ts-ignore
        item[k] = null;
      }
    }
  }

  function handleChangeServiceCharge(item: BackSave | Recordable) {
    item.backPayment.forEach((pay: BackPayment) => {
      const payMethod = options.value.payMethod.find(
        (itm) => itm.value === pay.method
      );
      // 恢复默认值
      if (item.serviceCharge === 1) {
        if (payMethod) {
          pay.rate = payMethod.feeRate;
        }
      } else {
        pay.rate = 0;
      }
    });
  }

  function handleChangePayMethod(row: BackPaymentItem, itm: BackSave | Recordable) {
    const item = options.value.payMethod.find(
      (itm) => itm.value === row.method
    );
    row.rate = checkDisabledRate(itm, row)
      ? 0
      : ((item?.feeRate ?? null) as number);
  }

  async function handleSave(type = 1) {
    switch (type) {
      case 1:
      case 2:
        if (loading.value) {
          Message.warning(WAIT_LOADING_TEXT);
          return;
        }
        break;
    }
    const error = await formRef.value.validate();
    if (error) {
      Message.error(FORM_VALIDATE_ERROR_TEXT);
      return;
    }
    const entity = cloneDeep(formModel.value);
    entity.contractId = contractInfo.contractId as number;
    // 提交类型1、保存2、下一步
    // entity.type = type;
    await execAsyncTasks([saveApi(entity)]);
    type === 1 ? emit('on-save', entity) : emit('on-next', entity);
  }

  function processPayMethod(backPayment: BackPayment[] | undefined) {
    if (!backPayment) {
      return [];
    }
    const payMethod = [...options.value.payMethod];
    const selectedKeys = backPayment.map((itm) => itm.method);
    return payMethod.map((itm) => {
      itm = {...itm};
      itm.disabled = selectedKeys.includes(itm.value);
      return itm;
    });
  }

  function checkDisabledRate(backSave: any, backPayment: BackPayment | Recordable) {
    const id = backSave.id;
    const keys = saveKeysMap.value[id];
    return (
      !backSave.serviceCharge &&
      !(Array.isArray(keys) && keys.includes(backPayment.method))
    );
  }

  onMounted(async () => {
    const contractId = contractInfo.contractId as unknown as string;

    formModel.value.contractId = contractId as unknown as number;
    const tasks = [];

    if (props.isEdit) {
      // 详情
      tasks.push(
        detailApi({
          contractId
        }).then((res) => {
          res.forEach((item) => {
            // @ts-ignore
            saveKeysMap.value[item.id] =
              item?.backPayment?.map((itm) => itm.method) ?? [];
          });
          formModel.value.backSaveList = res;
        })
      );
    }

    // 查询经营方式1、自营2、联营
    tasks.push(
      contractDetailApi({
        contractId
      }).then((res) => {
        operatMode.value = res.operatMode;
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
        options.value.itemType = connectName(res || []);
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
        options.value.intoTaxIncluded = connectName(res || []);
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
          position: static;
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
</style>
