<template>
  <div class="stage-form">
    <i-form ref="formRef" v-model="form" :options="options">
      <!--费用金额-->
      <template #fixedPriceForm>
        <a-input
          v-model="form.fixedPrice"
          :max-length="14"
          placeholder="请填写费用金额"
        >
          <template #append>{{ initPriceText }}</template>
        </a-input>
      </template>
      <!--计租面积-->
      <template #calculateAreaMethodForm>
        <a-row class="width-100">
          <a-col :span="12">
            <a-form-item hide-label field="calculateAreaMethod">
              <a-select
                v-model="form.calculateAreaMethod"
                class="border-radius-right-no"
                placeholder="请选择"
                :options="contractCalculateAreaList"
                @change="calculateChange"
              >
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-input
              v-model="form.calculateArea"
              class="border-radius-left-no"
              disabled
              hide-button
            >
              <template #append>m²</template>
            </a-input>
          </a-col>
        </a-row>
      </template>
      <!---账期--->
      <template #paymentTypeForm>
        <a-row class="width-100">
          <a-col :span="8">
            <a-select
              v-model="form.paymentType"
              class="bg-grey border-radius-right-no"
              placeholder="请选择"
              :disabled="isPaymentSwitch"
              :options="contractPaymentDaysDate"
            >
            </a-select>
          </a-col>
          <a-col :span="16">
            <a-form-item
              hide-label
              field="paymentScheme"
              :rules="[
                { required: true, message: '请输入' },
                { match: regularInteger, message: '请填写正整数' }
              ]"
            >
              <a-input-number
                v-model="form.paymentScheme"
                class="border-radius-left-no"
                hide-button
                placeholder="请输入账期"
              >
                <template #append>{{
                  form.paymentType === 1 ? '天' : '个月'
                }}</template>
              </a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <!---收款调整--->
      <template #repaymentTypeForm>
        <a-row class="width-100">
          <a-col :span="5">
            <a-select
              v-model="form.repaymentType"
              placeholder="请选择"
              class="bg-grey border-radius-right-no"
              :options="payAdjustDelayList"
            ></a-select>
          </a-col>
          <a-col :span="5">
            <a-form-item
              hide-label
              field="repaymentMethod"
              :rules="[{ required: true, message: '请选择收款调整类型' }]"
            >
              <a-select
                v-model="form.repaymentMethod"
                class="bg-grey border-radius-no"
                placeholder="请选择"
                :disabled="isAlgMethodMonth"
                :options="repaymentMethodDic"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="14">
            <a-form-item
              hide-label
              field="repaymentScheme"
              :rules="[
                { required: true, message: '请填写收款调整' },
                { match: regularIntegerZero, message: '请填写正确的数值' },
                {
                  validator: repaymentValidator
                }
              ]"
            >
              <a-input-number
                v-model="form.repaymentScheme"
                class="border-radius-left-no"
                hide-button
                placeholder="请输入收款调整"
              >
                <template #append>
                  {{ form.repaymentMethod === 1 ? '个月' : '天' }}
                </template>
              </a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <!---基础阶段及租金单价--->
      <template #initPeriodForm>
        <a-row class="width-100">
          <a-col :span="8">
            <a-input-number
              v-model="form.initPeriod"
              class="border-radius-right-no"
              hide-button
              placeholder="请填写"
            ></a-input-number>
          </a-col>
          <a-col :span="4">
            <a-form-item
              hide-label
              field="initPeriodMethod"
              :rules="[{ required: true, message: '请选择单位' }]"
            >
              <a-select
                v-model="form.initPeriodMethod"
                class="border-radius-no"
                placeholder="请选择"
                :options="contractIncreaseTimeList"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              hide-label
              field="initPrice"
              :rules="[
                { required: true, message: '请填写数值' },
                {
                  match: regularDecimalAndInteger,
                  message: regularDecimalAndIntegerMessage
                }
              ]"
            >
              <a-input
                v-model="form.initPrice"
                class="border-radius-left-no"
                :max-length="11"
                placeholder="请填写"
              >
                <template #append>{{ initPriceText }}</template>
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <!---租期--->
      <template #leaseMethodForm>
        <a-row class="width-100">
          <a-col :span="10">
            <a-select
              v-model="form.leaseMethod"
              placeholder="请选择"
              class="bg-grey border-radius-right-no"
              :disabled="isPaymentTypeMonth"
              :options="contractLeaseTermList"
            ></a-select>
          </a-col>
          <a-col :span="14">
            <a-input
              placeholder="请选择租期类型"
              class="border-radius-left-no"
              disabled
              :model-value="leaseMethodText"
            ></a-input>
          </a-col>
        </a-row>
      </template>
      <!---费用递增规则--->
      <template #increasePeriodForm>
        <a-row class="width-100">
          <a-col :span="6">
            <a-input-number
              v-model="form.increasePeriod"
              class="border-radius-right-no"
              hide-button
              placeholder="请填写"
            ></a-input-number>
          </a-col>
          <a-col :span="4">
            <a-form-item
              hide-label
              field="increasePeriodMethod"
              :rules="[{ required: true, message: '请选择时间类型' }]"
            >
              <a-select
                v-model="form.increasePeriodMethod"
                placeholder="请选择"
                class="bg-grey border-radius-no"
                :options="contractIncreasePeriodTimeList"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item
              class="margin-bottom-0"
              field="increaseValue"
              hide-label
              :rules="[{ required: true, message: '请填写' }]"
            >
              <a-input
                v-model="form.increaseValue"
                class="border-radius-no"
                hide-button
                placeholder="请填写"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item
              hide-label
              field="increaseMethod"
              :rules="[{ required: true, message: '请选择单位' }]"
            >
              <a-select
                v-model="form.increaseMethod"
                placeholder="请选择"
                class="border-radius-left-no"
                :default-value="1"
                :options="contractIncreaseMethodList"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </template>
      <!--税率-->
      <template #taxRatioForm>
        <a-input v-model="form.taxRatio" placeholder="请输入税率">
          <template #append>%</template>
        </a-input>
      </template>
      <!--抽成比例-->
      <template #commissionRatioForm>
        <a-input
          v-model="form.commissionRatio"
          hide-button
          placeholder="请填写抽成比例"
        >
          <template #append>%</template>
        </a-input>
      </template>
      <!--表格 分段抽成-->
      <template #tableContentForm>
        <template v-if="[25, 26].includes(form.algMethod || 0)">
          <!--表格 货品组别分段、分段递增抽成-->
          <div v-if="form.commissionList" class="width-100">
            <div
              v-for="(item, index) in form.commissionList"
              :key="index"
              class="width-100 stage-table-box"
            >
              <stage-table
                v-model="form.commissionList[index].subCommissionList"
                :name="item.groupName"
                is-children
                :parent-index="index"
                :alg-method="form.algMethod"
              ></stage-table>
            </div>
          </div>
        </template>
        <template v-else>
          <stage-table
            v-model="form.commissionList"
            :alg-method="form.algMethod"
          ></stage-table>
        </template>
      </template>
    </i-form>
    <div v-if="rentFree">
      <!--      <div v-if="!form.freeList?.length" class="stage-head">-->
      <!--        <div class="stage-title">免租条款1</div>-->
      <!--        <a-space>-->
      <!--          <div @click="addRentFree"-->
      <!--            ><img class="stage-icon" src="~@/assets/images/add-blue.png" alt=""-->
      <!--          /></div>-->
      <!--        </a-space>-->
      <!--      </div>-->
      <!--      <template v-else>-->
      <div v-for="(free, freeIndex) in form.freeList" :key="freeIndex">
        <div class="stage-head">
          <div class="stage-title">免租条款 {{ freeIndex + 1 }}</div>
          <a-space>
            <div @click="addRentFree"
              ><img
                class="stage-icon"
                src="~@/assets/images/add-blue.png"
                alt=""
            /></div>
            <div
              v-if="form.freeList?.length > 1"
              @click="deleteRentFree(freeIndex)"
              ><img
                class="stage-icon"
                src="~@/assets/images/del-red.png"
                alt=""
            /></div>
          </a-space>
        </div>
        <div>
          <free-form
            ref="freeRef"
            v-model="form.freeList[freeIndex]"
            :free-list="rentFreeList"
            :every-all-true="everyAllTrue"
          ></free-form>
        </div>
      </div>
      <!--      </template>-->
    </div>
  </div>
</template>

<script setup lang="ts">
  import IForm from '@/components/i-form/index.vue';
  import {
    computed,
    inject,
    ref,
    Ref,
    watch,
    PropType,
    nextTick,
    onUpdated
  } from 'vue';
  import {
    contractCostCalcTypeList,
    contractMothRentTypeList,
    contractPaymentDaysDate,
    contractPayAdjustDelayList,
    contractPayAdjustDateList,
    contractLeaseTermList,
    contractIncreaseMethodList,
    contractIncreaseTimeList,
    contractSchemeTypeList,
    contractSchemeAlgMethodsList,
    contractCalculateAreaList,
    contractIncreasePeriodTimeList
  } from '@/utils/dic';
  import StageTable from '@/views/new-contract/__components__/cost-info/stage-table.vue';
  import {
    regularDecimalAndInteger,
    regularInteger,
    regularIntegerZero,
    regularDecimalAndIntegerMessage
  } from '@/utils/regularDic';
  import dayjs from 'dayjs';
  import { FormOptions } from '@/components/i-form/index';
  import FreeForm from './free-form.vue';
  import { contractPaySchemeStagesItem } from '@/views/new-contract/__components__/cost-info/index';
  import {
    cbdApiProjectFormalContractPayGetPeriodsByPaySchemePost,
    CbdApiProjectFormalContractPayGetPeriodsByPaySchemePostResponse,
    cbdApiProjectFormalContractPayPreviewPaymentInfosBySchemePost,
    CbdApiProjectFormalContractPayPreviewPaymentInfosBySchemePostRequest,
    CbdApiProjectFormalContractPayPreviewPaymentInfosPostResponse,
    cbdApiProjectIntentionContractPayGetPeriodsByPaySchemePost,
    cbdApiProjectIntentionContractPayPreviewPaymentInfosBySchemePost
  } from '@/api';
  import { useContractStore } from '@/store/project/contract';
  import { useRequest } from '@har/use';
  import { modalConfirm } from '@/utils';

  const props = defineProps({
    modelValue: {
      type: Object as PropType<contractPaySchemeStagesItem>,
      default: () => {
        return {};
      }
    },
    type: {
      type: [String, Number],
      default: ''
    },
    hasIncrease: {
      type: Number,
      default: 0
    },
    expenseId: {
      type: [Number, String],
      required: true,
      default: ''
    },
    rentFree: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(['update:modelValue']);
  interface groupListType {
    label: string;
    value: number;
  }
  const goodsGroupList = inject<Ref<groupListType[]>>('goodsGroup');
  const formRef = ref<InstanceType<any>>();
  const freeRef = ref<InstanceType<typeof FreeForm>[]>();
  const initEnd = ref(false);

  const form = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emits('update:modelValue', value);
    }
  });

  interface areaInfoType {
    area: string;
    usageArea: string;
  }
  const areaInfo = inject<Ref<areaInfoType>>('areaInfo');

  function calculateChange(
    e:
      | string
      | number
      | Record<string, any>
      | (string | number | Record<string, any>)[]
  ) {
    if (!e) return;
    if (e === 1) {
      form.value.calculateArea = areaInfo?.value.usageArea;
    } else {
      form.value.calculateArea = areaInfo?.value.area;
    }
  }

  // 是否递增
  const isIncrease = computed(() => {
    return props.type === 1 && props.hasIncrease;
  });
  // 是否固定租金
  const isFixed = computed(() => {
    if (props.type === '') return true;
    return props.type === 1;
  });

  //账期 是否可切换
  const isPaymentSwitch = computed(() => {
    const { algMethod = 0 } = form.value;
    return [12, 14].includes(algMethod);
  });

  // 费用类型是否为月
  const isAlgMethodMonth = computed(() => {
    const { algMethod = 0 } = form.value;
    return [12, 14].includes(algMethod);
  });

  //账期是否为月
  const isPaymentTypeMonth = computed(() => {
    const { paymentType } = form.value;
    return !!(paymentType && paymentType === 1);
  });

  //收款调整 字典
  const repaymentMethodDic = computed(() => {
    if (isPaymentSchemeDay.value) {
      return contractPayAdjustDateList;
    }
    return contractPayAdjustDateList.filter((i) => i.value === 1);
  });

  //租期展示文字
  const leaseMethodText = computed(() => {
    const { leaseMethod, startDate } = form.value;
    return leaseMethod === 1 ? '自然日/月/年' : startDate;
  });

  // 账期是否为日
  const isPaymentSchemeDay = computed(() => {
    return form.value.paymentType === 1;
  });

  // 是否为平方
  const isSquareType = computed(() => {
    return [13, 14].includes(form.value.algMethod || 0);
  });

  //抽成  抽成方式是否为固定
  const isAlgMethodFixed = computed(() => {
    const { algMethod } = form.value;
    return algMethod === 21;
  });

  //抽成 收款方式字典
  const payAdjustDelayList = computed(() => {
    const ids = contractSchemeAlgMethodsList.map((i) => i.value);
    const { algMethod = 0 } = form.value;
    if (ids.includes(algMethod)) return [contractPayAdjustDelayList[1]];
    return contractPayAdjustDelayList;
  });

  //抽成类型ids
  const algMethodListIds = computed(() => {
    return contractSchemeAlgMethodsList.map((i) => i.value);
  });

  // 表格展示
  const isTableShow = computed(() => {
    const { algMethod = 0 } = form.value;
    return props.type === 2 && [22, 23, 24, 25, 26].includes(algMethod);
  });

  //抽成  抽成类型是否为比较、合并
  const isSchemeTypeNo = computed(() => {
    const { schemeType } = form.value;
    return schemeType && schemeType !== 1;
  });

  // 日期区间
  const dateRange = computed(() => {
    const { startDate = '', endDate = '' } = form.value;
    if (startDate && endDate) {
      return dayjs(endDate).diff(dayjs(startDate), 'month');
    }
    return 0;
  });

  //基础阶段展示文字
  const initPriceText = computed(() => {
    const { algMethod = 0 } = form.value;
    if (algMethod === 11) return '元/日';
    if (algMethod === 12) return '元/月';
    if (algMethod === 13) return '元/日/㎡';
    return '元/月/㎡';
  });

  //  表单配置项
  const options = computed(() => {
    return {
      menuForm: false,
      layout: 'vertical',
      formCard: false,
      span: 6,
      columns: [
        {
          label: '开始日期',
          prop: 'startDate',
          type: 'date',
          rules: [{ required: true, message: '请选择开始日期' }]
        },
        {
          label: '结束日期',
          prop: 'endDate',
          type: 'date',
          rules: [{ required: true, message: '请选择结束日期' }]
        },
        {
          label: '费用计算方式',
          prop: 'algMethod',
          type: 'select',
          dic: contractCostCalcTypeList,
          display: isFixed.value,
          rules: [{ required: true, message: '请选择费用计算方式' }]
        },
        {
          label: '计租面积',
          prop: 'calculateAreaMethod',
          display: isSquareType.value,
          rules: [
            { required: true, message: '请选择计租类型' }
            // {
            //   match: regularDecimalAndIntegerFour,
            //   message: '填写正确的数值'
            // }
          ]
        },
        {
          label: '费用金额',
          prop: 'fixedPrice',
          display: isFixed.value && !props.hasIncrease,
          options: {
            maxLength: 14
          },
          rules: [
            { required: true, message: '请填写费用金额' },
            {
              match: regularDecimalAndInteger,
              message: regularDecimalAndIntegerMessage
            }
          ]
        },
        {
          label: '抽成类型',
          prop: 'schemeType',
          dic: contractSchemeTypeList,
          type: 'select',
          display: !isFixed.value,
          rules: [{ required: true, message: '请选择抽成类型' }]
        },
        {
          label: '抽成方式',
          prop: 'algMethod',
          type: 'select',
          display: !isFixed.value,
          dic: contractSchemeAlgMethodsList,
          rules: [{ required: true, message: '请选择抽成方式' }]
        },
        {
          label: '基础阶段及租金单价',
          prop: 'initPeriod',
          span: 12,
          display: isIncrease.value,
          rules: [
            { required: true, message: '请选择并填写' },
            { match: regularIntegerZero, message: '请输入正整数' },
            {
              validator(
                v: string | undefined,
                callback: (error?: string) => void
              ) {
                if (dateRange.value > -1) {
                  if (Number(v) > dateRange.value + 1) {
                    callback('不能超过当前阶段月份数');
                  } else {
                    callback();
                  }
                } else {
                  callback('请先选择开始结束日期再填写');
                }

                if (v && Number(v) > 99) callback('输入数值不能大于99');
                callback();
              }
            }
          ]
        },
        {
          label: '不足月租金计算方式',
          prop: 'repairAlgMethod',
          type: 'select',
          dic: contractMothRentTypeList,
          display: isAlgMethodMonth.value,
          rules: [{ required: true, message: '请选择不足月租金计算方式' }]
        },
        {
          label: '账期（支付方式）',
          prop: 'paymentType',
          rules: [
            { required: true, message: '请选择' }
            // { match: regularInteger, message: '请填写正整数' }
          ]
        },
        {
          label: '收款调整(提前或延后)',
          prop: 'repaymentType',
          span: 12,
          rules: [{ required: true, message: '请选择提前或延后' }]
        },
        {
          label: '账单生成日',
          prop: 'statementDay',
          type: 'inputNumber',
          display: !!form.value.paymentType && !isPaymentSchemeDay.value,
          options: {
            hideButton: true
          },
          rules: [
            { required: true, message: '请填写账单生成日' },
            {
              validator(
                v: string | undefined,
                callback: (error?: string) => void
              ) {
                if (v && (Number(v) < 1 || Number(v) > 31)) {
                  callback('请填写正确的账单生成日');
                }
                callback();
              }
            }
          ]
        },
        {
          label: '租期（划分规则）',
          prop: 'leaseMethod',
          span: 12,
          rules: [{ required: true, message: '请选择并填写租期' }]
        },
        {
          label: '税率',
          prop: 'taxRatio',
          rules: [
            { required: true, message: '请填写税率' },
            {
              match: regularDecimalAndInteger,
              message: regularDecimalAndIntegerMessage
            },
            {
              validator(
                v: string | undefined,
                callback: (error?: string) => void
              ) {
                if (v && Number(v) > 1000) callback('输入税率不能大于1000‰');
                callback();
              }
            }
          ]
        },
        {
          label: '费用递增规则',
          prop: 'increasePeriod',
          display: isIncrease.value,
          span: 12,
          rules: [
            { required: true, message: '请选择并填写费用递增规则' },
            { match: regularIntegerZero, message: '请输入正整数' }
          ]
        },
        {
          label: '抽成比例',
          prop: 'commissionRatio',
          display: isAlgMethodFixed.value,
          rules: [
            { required: true, message: '请填写抽成比例' },
            {
              match: regularDecimalAndInteger,
              message: regularDecimalAndIntegerMessage
            },
            {
              validator(
                v: string | undefined,
                callback: (error?: string) => void
              ) {
                if (v && Number(v) > 100) callback('输入比例不能大于100%');
                callback();
              }
            }
          ]
        },
        {
          label: '保底租金',
          prop: 'guaranteePrice',
          options: {
            maxLength: 11
          },
          display: !!isSchemeTypeNo.value,
          rules: [
            { required: true, message: '请填写保底租金' },
            {
              match: regularDecimalAndInteger,
              message: regularDecimalAndIntegerMessage
            }
          ]
        },
        {
          label: '保底租金不足月计算方式',
          prop: 'repairAlgMethod',
          type: 'select',
          dic: contractIncreaseTimeList,
          display: !!isSchemeTypeNo.value,
          rules: [{ required: true, message: '请选择计算方式' }]
        },
        {
          prop: 'tableContent',
          span: 24,
          display: isTableShow.value && form.value.commissionList,
          options: {
            hideLabel: true
          }
        }
      ]
    } as FormOptions;
  });

  function repaymentValidator(
    v: string | undefined,
    callback: (error?: string) => void
  ) {
    if (v && Number(v) > 99) callback('输入数值不能大于99');
    callback();
  }

  interface commissionListType {
    id?: number;
    groupId?: number;
    groupName?: string;
    subCommissionList?: {
      id?: number;
      startVolume?: string;
      endVolume?: string;
      commissionRatio: string;
    }[];
    startVolume?: string;
    endVolume?: string;
    commissionRatio?: string;
  }

  function resetCommissionList() {
    if (form.value.commissionList?.length) form.value.commissionList = [];
  }

  // 选择费用计算方式   联动影响账期 收款调整
  watch(
    () => form.value.algMethod,
    (e, oldE) => {
      // console.log(e, oldE, '费用类型');
      if (!e) return;
      if (algMethodListIds.value.includes(e)) form.value.repaymentType = 2;
      if ([11, 13].includes(e)) {
        // 租期只能为起始日顺延
        form.value.leaseMethod = 2;
        resetCommissionList();
      } else if ([12, 14].includes(e)) {
        // 当费用类型为月时  账期只能为月
        if (form.value.paymentType !== 2) form.value.paymentType = 2;
      } else if ([22, 23, 24].includes(e)) {
        if (oldE || !form.value.commissionList) form.value.commissionList = [];
      } else if ([25, 26].includes(e)) {
        //货品组别分类
        const arr: commissionListType[] = [];
        goodsGroupList &&
          goodsGroupList.value.forEach((i) => {
            const { value, label } = i;
            arr.push({
              groupId: value,
              groupName: label,
              subCommissionList: []
            });
          });
        // console.log(arr, 'arr内容');
        if (oldE || !form.value.id) form.value.commissionList = arr;
        // commissionFilter(arr);
      } else {
        resetCommissionList();
      }
      //重置表单校验
      formRef.value?.clearValidate();
    }
  );

  watch(
    () => form.value.paymentType,
    (e) => {
      if (!e) return;
      if (e === 1) {
        // 收款调整如果为月  设为自然日
        // if (form.value.repaymentMethod === 1) form.value.repaymentMethod = 2;
        form.value.leaseMethod = 2;
      } else {
        if (!form.value.leaseMethod) form.value.leaseMethod = 1;
        //账单为月  则收款调整只能为月
        form.value.repaymentMethod = 1;
      }
      //重置表单校验
      formRef.value?.clearValidate();
    }
  );

  function submit() {
    const arr: any[] = [];
    freeRef.value?.forEach((i) => {
      arr.push(i.submit());
    });
    arr.push(formRef.value?.submit());
    return arr;
  }
  defineExpose({ submit });

  //免租
  const listenSize = computed(() => {
    const {
      startDate,
      endDate,
      algMethod,
      paymentType,
      paymentScheme,
      leaseMethod,
      repaymentType,
      repaymentMethod,
      repaymentScheme,
      taxRatio,
      initPeriod,
      initPeriodMethod,
      initPrice,
      increasePeriod,
      increasePeriodMethod,
      increaseValue,
      increaseMethod,
      commissionRatio,
      guaranteePrice,
      repairAlgMethod,
      schemeType,
      calculateAreaMethod
    } = form.value;
    // any后续处理
    let p: any = {
      startDate,
      endDate,
      algMethod,
      paymentType,
      paymentScheme,
      leaseMethod,
      repaymentType,
      repaymentMethod,
      repaymentScheme,
      taxRatio
    };
    // 递增
    if (props.hasIncrease) {
      p = Object.assign(p, {
        initPeriod,
        initPeriodMethod,
        initPrice,
        increasePeriod,
        increasePeriodMethod,
        increaseValue,
        increaseMethod
      });
    }
    if (algMethod === 21) p.commissionRatio = commissionRatio;
    if ([2, 3].includes(schemeType || 0)) {
      p = Object.assign(p, {
        guaranteePrice,
        repairAlgMethod
      });
    }
    if ([13, 14].includes(algMethod || 0)) {
      p.calculateAreaMethod = calculateAreaMethod;
    }
    return p;
  });

  const everyAllTrue = computed(() => {
    return Object.values(listenSize.value).every(
      (i) => !!i || i === '0' || i === 0
    );
  });

  onUpdated(() => {
    nextTick(() => {
      //编辑数据更新完成
      initEnd.value = true;
    });
  });

  watch(
    () => props.expenseId,
    () => {
      //重置表单校验
      formRef.value?.clearValidate();
    }
  );

  watch(
    () => props.rentFree,
    (e) => {
      if (e && !form.value?.freeList.length) {
        form.value.freeList = [{}];
        getRentFreeListDic();
      }
    }
  );
  watch(listenSize, () => {
    getRentFreeListDic();
    //编辑等待视图更新
    if (form.value?.freeList.length && initEnd.value) {
      form.value.freeList = [{}];
    }
  });

  type rentFreeListType =
    CbdApiProjectFormalContractPayGetPeriodsByPaySchemePostResponse[number];
  const contractStore = useContractStore();
  const rentFreeList = ref<rentFreeListType[]>([]);

  const contractType = computed(() => {
    return contractStore.contractInfo.contractType || 2;
  });
  const freeListApi =
    contractType.value === 1
      ? cbdApiProjectIntentionContractPayGetPeriodsByPaySchemePost
      : cbdApiProjectFormalContractPayGetPeriodsByPaySchemePost;

  const { run: getRentFreeList } = useRequest(freeListApi, {
    manual: true,
    onSuccess(data) {
      rentFreeList.value = data;
    },
    onError(e) {
      console.log(e);
      rentFreeList.value = [];
    }
  });

  // 获取免租账期
  function getRentFreeListDic() {
    if (everyAllTrue.value && props.rentFree) {
      getRentFreeList(rentRequest.value);
    }
  }

  const rentRequest = computed(() => {
    return {
      ...form.value,
      hasIncrease: isIncrease.value ? 1 : 0,
      expenseId: Number(props.expenseId),
      contractId: Number(contractStore.getContractId())
    } as CbdApiProjectFormalContractPayPreviewPaymentInfosBySchemePostRequest;
  });

  async function addRentFree() {
    const arr = form.value.freeList;
    if (arr.length) {
      const prevIndex = arr.length - 1;
      form.value.freeList.push({ ...arr[prevIndex] });
    } else {
      form.value.freeList.push({});
    }
  }

  function deleteRentFree(freeIndex: number) {
    modalConfirm('确认删除当前内容？', () => {
      form.value.freeList?.splice(freeIndex, 1);
    });
  }
</script>
<style scoped lang="less">
  .stage-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    .stage-title {
      font-size: 16px;
      color: #333;
      font-weight: 500;
      line-height: 24px;
    }
    .stage-icon {
      cursor: pointer;
      width: 16px;
      height: 16px;
      display: block;
    }
  }
  .stage-table-box {
    padding-top: 24px;
    &:first-child {
      padding-top: 0;
    }
  }
  .width-100 {
    width: 100%;
  }

  .margin-bottom-0 {
    margin-bottom: 0;
  }
  .stage-form {
    :deep(.bg-grey) {
      background: #f7f7f7;
    }
    :deep(.border-radius-right-no) {
      border-radius: 4px 0 0 4px;
      border-right: none;
      .arco-input-wrapper {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    :deep(.border-radius-no) {
      border-radius: 0;
      border-right: none;
      .arco-input-wrapper {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    :deep(.border-radius-left-no) {
      border-radius: 0 4px 4px 0;
      .arco-input-wrapper {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
</style>
