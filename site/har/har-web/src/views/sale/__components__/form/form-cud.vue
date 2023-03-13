<template>
  <a-form
    ref="formRef"
    :model="formModel"
    :rules="formRules"
    :disabled="currentDisabled"
    :class="{ 'a-form--detail': currentDisabled }"
    layout="vertical"
    auto-label-width
  >
    <a-card>
      <div class="har-title">基础信息</div>
      <a-row :gutter="gutter">
        <a-col :span="span">
          <a-form-item label="项目名称" field="projectName">
            {{ formModel.projectName }}
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="商户" field="merchantName">
            {{ formModel.merchantName }}
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="店铺名" field="storeName">
            {{ formModel.storeName }}
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="品牌名" field="brandName">
            {{ formModel.brandName }}
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="合同号" field="contractCode">
            {{ formModel.contractCode }}
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item label="销售日期" field="saleDate">
            {{ formModel.saleDate }}
          </a-form-item>
        </a-col>
        <a-col :span="span">
          <a-form-item
            :rules="[{ required: true, message: '必填项' }]"
            :validate-trigger="['change', 'blur']"
            label="销售笔数"
            field="saleNum"
          >
            <a-input-number
              v-model="formModel.saleNum"
              :min="1"
              :max="999999999"
              hide-button
              clearable
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="备注" field="remark">
            <template v-if="type === 'DETAIL'">
              {{ formModel.remark }}
            </template>
            <template v-else>
              <a-textarea
                v-model="formModel.remark"
                :max-length="200"
                clearable
              />
            </template>
          </a-form-item>
        </a-col>
      </a-row>
    </a-card>
    <a-card>
      <div class="har-title">
        <a-space>
          <span>货品明细</span>
          <a-button
            v-if="type !== 'DETAIL'"
            size="mini"
            @click="handleAddGoodsRow"
            >添加行</a-button
          >
        </a-space>
      </div>
      <a-table
        :data="goodsList"
        :pagination="false"
        :span-method="processGoodsListSpanMethod"
        style="width: 100%"
      >
        <template #columns>
          <a-table-column title="货品名称">
            <template #cell="{ record, rowIndex }">
              <template v-if="record.sourcePriceTotal != null">
                <div style="text-align: right">合计：</div>
              </template>
              <template v-else>
                <a-form-item
                  class="a-form-item--hide-label a-form-item--inline-error"
                  :field="`goodsList.${rowIndex}.goodsId`"
                  :rules="[{ required: true, message: '必选项' }]"
                  :validate-trigger="['change', 'blur']"
                >
                  <i-select
                    v-model="record.goodsId"
                    :style="{ width }"
                    :options="options.goodsId"
                    @event-change="handleChangeGoodsId(record)"
                  />
                </a-form-item>
              </template>
            </template>
          </a-table-column>
          <a-table-column title="单价">
            <template #cell="{ record, rowIndex }">
              <a-form-item
                class="a-form-item--hide-label a-form-item--inline-error"
                :field="`goodsList.${rowIndex}.salePrice`"
                :rules="[
                  { required: true, message: '必填项' },
                  { validator: validatorActualAmt.bind(null, record) }
                ]"
                :validate-trigger="['change', 'blur']"
              >
                <template v-if="type === 'DETAIL'">
                  {{ formatPrice(record.salePrice) }}
                </template>
                <template v-else>
                  <a-input-number
                    v-model:model-value="record.salePrice"
                    :style="{ width }"
                    hide-button
                    :min="0"
                  />
                </template>
              </a-form-item>
            </template>
          </a-table-column>
          <a-table-column title="销售数量">
            <template #cell="{ record, rowIndex }">
              <a-form-item
                class="a-form-item--hide-label a-form-item--inline-error"
                :field="`goodsList.${rowIndex}.goodsNum`"
                :rules="[
                  { required: true, message: '必填项' },
                  { validator: validatorActualAmt.bind(null, record) }
                ]"
                :validate-trigger="['change', 'blur']"
              >
                <a-input-number
                  v-model="record.goodsNum"
                  :style="{ width }"
                  hide-button
                />
              </a-form-item>
            </template>
          </a-table-column>
          <a-table-column title="原价">
            <template #cell="{ record, rowIndex }">
              <template v-if="record.sourcePriceTotal != null">{{
                formatPrice(record.sourcePriceTotal)
              }}</template>
              <template v-else>
                <a-form-item
                  class="a-form-item--hide-label a-form-item--inline-error"
                  :field="`goodsList.${rowIndex}.totalAmt`"
                >
                  {{ formatPrice(countSourcePrice(record)) }}
                </a-form-item>
              </template>
            </template>
          </a-table-column>
          <a-table-column title="实付金额" :width="180">
            <template #cell="{ record, rowIndex }">
              <template v-if="record.actualAmtTotal != null">{{
                formatPrice(record.actualAmtTotal)
              }}</template>
              <template v-else>
                <a-form-item
                  class="a-form-item--hide-label a-form-item--inline-error"
                  :field="`goodsList.${rowIndex}.actualAmt`"
                  :rules="[
                    { required: true, message: '必填项' },
                    { validator: validatorActualAmt.bind(null, record) }
                  ]"
                  :validate-trigger="['change', 'blur']"
                >
                  <template v-if="type === 'DETAIL'">
                    {{ formatPrice(record.actualAmt) }}
                  </template>
                  <template v-else>
                    <a-input-number
                      v-model="record.actualAmt"
                      :style="{ width }"
                      hide-button
                    />
                  </template>
                </a-form-item>
              </template>
            </template>
          </a-table-column>
          <a-table-column title="优惠金额">
            <template #cell="{ record, rowIndex }">
              <template v-if="record.discountPriceTotal != null">{{
                formatPrice(record.discountPriceTotal)
              }}</template>
              <template v-else>
                <a-form-item
                  class="a-form-item--hide-label a-form-item--inline-error"
                  :field="`goodsList.${rowIndex}.discountAmt`"
                >
                  {{ formatPrice(countDiscountPrice(record)) }}
                </a-form-item>
              </template>
            </template>
          </a-table-column>
          <a-table-column title="备注">
            <template #cell="{ record, rowIndex }">
              <template v-if="record.sourcePriceTotal != null"> - </template>
              <template v-else>
                <a-form-item
                  class="a-form-item--hide-label a-form-item--inline-error"
                  :field="`goodsList.${rowIndex}.remark`"
                >
                  <a-input v-model="record.remark" :max-length="200" />
                </a-form-item>
              </template>
            </template>
          </a-table-column>
          <a-table-column v-if="type !== 'DETAIL'" title="操作">
            <template #cell="{ record, rowIndex }">
              <template v-if="record.sourcePriceTotal == null">
                <a-popconfirm
                  content="确认要删除吗?"
                  @ok="
                    formModel.goodsList &&
                      formModel.goodsList.splice(rowIndex, 1)
                  "
                >
                  <a-button type="text">删除</a-button>
                </a-popconfirm>
              </template>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <a-card>
      <div class="har-title">
        <a-space>
          <span>支付明细</span>
          <a-button
            v-if="type !== 'DETAIL'"
            size="mini"
            @click="handleAddPaymentRow"
            >添加行</a-button
          >
        </a-space>
      </div>
      <a-table :data="paymentList" style="width: 100%" :pagination="false">
        <template #columns>
          <a-table-column title="支付方式">
            <template #cell="{ record, rowIndex }">
              <template v-if="record.payAmtTotal != null">
                <div style="text-align: right">合计：</div>
              </template>
              <template v-else>
                <a-form-item
                  class="a-form-item--hide-label a-form-item--inline-error"
                  :field="`paymentList.${rowIndex}.payMethodId`"
                  :rules="[{ required: true, message: '必选项' }]"
                  :validate-trigger="['change', 'blur']"
                >
                  <i-select
                    v-model="record.payMethodId"
                    :style="{ width }"
                    :options="options.payMethodId"
                    @event-change="handleChangePayMethod(record)"
                  />
                </a-form-item>
              </template>
            </template>
          </a-table-column>
          <a-table-column title="支付金额">
            <template #cell="{ record, rowIndex }">
              <template v-if="record.payAmtTotal != null">
                <div>{{ formatPrice(record.payAmtTotal) }}</div>
              </template>
              <template v-else>
                <a-form-item
                  class="a-form-item--hide-label a-form-item--inline-error"
                  :field="`paymentList.${rowIndex}.payMethodId`"
                  :rules="[{ required: true, message: '必填项' }]"
                  :validate-trigger="['change', 'blur']"
                >
                  <template v-if="type === 'DETAIL'">
                    {{ formatPrice(record.payAmt) }}
                  </template>
                  <template v-else>
                    <a-input-number
                      v-model="record.payAmt"
                      hide-button
                      :style="{ width }"
                      :min="0"
                    />
                  </template>
                </a-form-item>
              </template>
            </template>
          </a-table-column>
          <a-table-column title="备注">
            <template #cell="{ record, rowIndex }">
              <template v-if="record.payAmtTotal != null">
                <div>-</div>
              </template>
              <template v-else>
                <a-form-item
                  class="a-form-item--hide-label a-form-item--inline-error"
                  :field="`paymentList.${rowIndex}.payMethodId`"
                >
                  <a-input
                    v-model="record.remark"
                    :style="{ width }"
                    :max-length="200"
                  />
                </a-form-item>
              </template>
            </template>
          </a-table-column>
          <a-table-column v-if="type !== 'DETAIL'" title="操作">
            <template #cell="{ record, rowIndex }">
              <template v-if="record.payAmtTotal == null">
                <a-popconfirm
                  content="确认要删除吗?"
                  @ok="
                    formModel.paymentList &&
                      formModel.paymentList.splice(rowIndex, 1)
                  "
                >
                  <a-button type="text">删除</a-button>
                </a-popconfirm>
              </template>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <a-card>
      <div class="har-title">附件信息</div>
      <i-custom-upload
        v-model="formModel.annexList"
        url-key="previewAddress"
        accept-suffix-name
        :options="{
          disabled: currentDisabled,
          accept: '.doc,.docx,.xls,.xlsx,.pdf,.png,.jpg'
        }"
      />
    </a-card>
  </a-form>
</template>

<script setup lang="ts">
  import {
    ref,
    toRef,
    PropType,
    computed,
    defineProps,
    defineExpose,
    watch,
    watchEffect
  } from 'vue';
  import { useForm } from '@/hooks/use-form';
  import { GoodsRow, PaymentRow, SaleAddReq } from '../../interface';
  import {
    cbdApiProjectCommonMisPayMethodFrontGet,
    cbdApiProjectCommonMisPayMethodSelectProjectGet,
    CbdApiProjectSaleAddPostRequest,
    cbdApiProjectSaleGoodsListGet,
    CbdApiProjectSaleGoodsListGetRequest
  } from '@/api';
  import ISelect from '@/components/i-select/index.vue';
  import { useOptions } from '../../use-options';
  import { SelectOptions } from '@/components/i-select/interface';
  import { formatPrice } from '@/utils';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';

  type FormModelType = CbdApiProjectSaleAddPostRequest & {
    resourceList: Recordable[];
  };
  type GoodsRowType =
    Required<CbdApiProjectSaleAddPostRequest>['goodsList'][number];
  type PaymentRowType =
    Required<CbdApiProjectSaleAddPostRequest>['paymentList'][number];

  const span = ref(6);
  const gutter = ref(15);
  const currentDisabled = computed(() => props.type === 'DETAIL');
  const props = defineProps({
    data: {
      type: Object as PropType<FormModelType>,
      default: () => ({})
    },
    // ADD = '新增', EDIT = '修改'
    type: {
      type: String as PropType<'ADD' | 'EDIT' | 'DETAIL'>,
      default: 'ADD'
    },
    visible: Boolean
  });

  const width = computed(() => {
    return props.type === 'DETAIL' ? '100%' : '110px';
  });
  const useFormRes = useForm<FormModelType>(new SaleAddReq(), {
    visible: toRef(props, 'visible'),
    watchFormModel: toRef(props, 'data')
  });

  const {
    formRef,
    formModel,
    formRules,

    // 以下对外暴露的方法
    validateField,
    setFields,
    resetFields,
    getFormModel,
    setFormModel,
    clearValidate,
    getReactiveFormModel
  } = useFormRes;
  const validateExe = useFormRes.validate;

  const { options } = useOptions(
    {
      goodsId: [] as SelectOptions,
      projectId: [] as SelectOptions,
      payMethodId: [] as SelectOptions
    },
    formModel,
    false
  );

  watchEffect(() => {
    const selectedMap: Recordable = {};
    if (formModel.value.paymentList) {
      for (const itm of formModel.value.paymentList) {
        if (itm.id) {
          selectedMap[itm.id] = true;
        }
      }
    }
    options.value.payMethodId.forEach((item) => {
      item.disabled = !!selectedMap[item.value as string];
    });
  });

  watch(
    () => formModel.value.projectId,
    (val) => {
      // 支付方式-下拉数据
      cbdApiProjectCommonMisPayMethodFrontGet({
        projectId: val as unknown as string
      }).then((res) => {
        options.value.payMethodId = res;
      });
    }
  );

  watch(
    () => props.visible,
    (val) => {
      console.log(props.data);
    }
  );

  watch([() => formModel.value.storeId, () => formModel.value.saleDate], () => {
    fetchProjectSaleGoodsList();
  });

  watch(
    () => formModel.value.resourceList,
    (val) => {
      if (val) {
        formModel.value.annexList = val as unknown as string[];
      }
    }
  );

  const goodsList = computed(() => {
    const feeList = [...(formModel.value.goodsList as Array<Recordable>)];
    if (feeList.length > 0) {
      const totalMap = feeList.reduce(
        (totalMap: Recordable, item: Recordable) => {
          totalMap.sourcePriceTotal += countSourcePrice(item);
          totalMap.actualAmtTotal += item.actualAmt || 0;
          totalMap.discountPriceTotal += countDiscountPrice(item);
          return totalMap;
        },
        {
          sourcePriceTotal: 0,
          actualAmtTotal: 0,
          discountPriceTotal: 0
        }
      );
      feeList.push(totalMap);
    }
    return feeList;
  });

  const paymentList = computed(() => {
    const feeList = [...(formModel.value.paymentList as Array<Recordable>)];
    if (feeList.length > 0) {
      const totalMap = feeList.reduce(
        (totalMap: Recordable, item: Recordable) => {
          totalMap.payAmtTotal += item.payAmt ? item.payAmt : 0;
          return totalMap;
        },
        {
          payAmtTotal: 0
        }
      );
      feeList.push(totalMap);
    }
    return feeList;
  });

  function validatorActualAmt(
    record: Recordable = {},
    value: string,
    callback: Function
  ) {
    if (record.actualAmt && record.actualAmt > countSourcePrice(record)) {
      callback('实际支付金额不能大于原价');
    }
    callback();
  }

  function handleAddGoodsRow() {
    formModel.value.goodsList?.push(new GoodsRow() as unknown as GoodsRowType);
  }

  function handleAddPaymentRow() {
    formModel.value.paymentList?.push(
      new PaymentRow() as unknown as PaymentRowType
    );
  }

  function handleChangeGoodsId(record: Recordable) {
    const value = record.goodsId;
    const row = options.value.goodsId.find((itm) => itm.value === value);
    record.totalAmt = row?.totalAmt ?? '';
    record.salePrice = row?.salePrice ?? '';
  }

  function handleChangePayMethod(record: Recordable) {
    const value = record.payMethodId;
    const row = options.value.payMethodId.find((itm) => itm.value === value);
    record.payMethodName = row?.label;
  }

  function countSourcePrice(record: Recordable) {
    if (record.salePrice && record.goodsNum) {
      return record.salePrice * record.goodsNum;
    }
    return 0;
  }

  function countDiscountPrice(record: Recordable) {
    if (record.salePrice && record.goodsNum && record.actualAmt) {
      const price = countSourcePrice(record) - record.actualAmt;
      return price > 0 ? price : 0;
    }
    return 0;
  }

  function fetchProjectSaleGoodsList() {
    const params = formModel.value;
    if (!params.storeId || !params.saleDate) {
      options.value.goodsId = [];
      return;
    }
    cbdApiProjectSaleGoodsListGet(
      params as unknown as CbdApiProjectSaleGoodsListGetRequest
    ).then((res) => {
      options.value.goodsId = (res.rows?.map((itm) => ({
        ...itm,
        label: itm.goodsName,
        value: itm.goodsId
      })) ?? []) as SelectOptions;
    });
  }

  async function validate() {
    const data = await validateExe();
    data.annexList = data.annexList
      .map((itm: string | Recordable) => {
        if (typeof itm === 'string') {
          return itm;
        }
        return itm?.response?.data?.key ?? itm.id;
      })
      .filter((t: string) => t);
    data.goodsList = data.goodsList.filter(
      (item: Recordable) => item.sourcePriceTotal == null
    );
    data.paymentList = data.paymentList.filter(
      (item: Recordable) => item.payAmtTotal == null
    );
    return data;
  }

  function processGoodsListSpanMethod({ columnIndex, record }: any) {
    if (columnIndex === 0 && record.sourcePriceTotal != null) {
      return {
        colspan: 3
      };
    }
  }

  defineExpose({
    validate,
    validateField,
    setFields,
    resetFields,
    getFormModel,
    setFormModel,
    clearValidate,
    getReactiveFormModel
  });
</script>

<style lang="less" scoped></style>
