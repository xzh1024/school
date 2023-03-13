<template>
  <drawer v-model="visible" title="充值" @before="submit">
    <div>
      <div class="basic">
        <div class="basic-title">基本信息</div>
        <i-form v-model="form" :options="options"></i-form>
      </div>
      <div class="basic">
        <div class="basic-title">充值明细</div>
        <div class="activity">
          <i-form v-model="upForm" :options="upOptions"></i-form>
        </div>
        <div class="table-c">
          <div class="flex justify-between align-center margin-bottom-xs">
            <div class="table-c-title">充值详情</div>
            <a-button
              type="primary"
              :disabled="data.length >= 3"
              @click="addRow"
              >添加行</a-button
            >
          </div>
          <a-table
            :columns="tableOptions.columns"
            :data="data"
            row-key="key"
            :summary="summary"
            summary-text="合计"
            :pagination="false"
          >
            <template #payment="{ record }">
              <a-select v-model="record.payment" placeholder="请选择输入方式">
                <a-option
                  v-for="(item, index) in payWayList"
                  :key="index"
                  :value="item.value"
                  >{{ item.label }}</a-option
                >
              </a-select>
            </template>
            <template #amount="{ record, rowIndex }">
              <a-input
                placeholder="请输入金额"
                :model-value="record.amount"
                :max-length="11"
                @input="(v) => inputChange(v, rowIndex)"
              ></a-input>
            </template>
            <template #summary-cell="{ column, record }">
              <div>{{ record[column.dataIndex] }}</div>
            </template>
            <template #menu="{ rowIndex }">
              <a-button
                class="btn-no-padding"
                type="text"
                :disabled="data.length === 1"
                @click="deleteRow(rowIndex)"
                >删除</a-button
              >
            </template>
          </a-table>
        </div>
      </div>
    </div>
    <template #footer>
      <a-space>
        <a-button @click="visible = false">取消</a-button>
        <a-button
          type="primary"
          :loading="submitLoading"
          :disabled="!Number(couponItem.totalAmount)"
          @click="submit"
          >确认</a-button
        >
      </a-space>
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import { useRequest } from '@har/use';
  import Drawer from '@/components/drawer/drawer.vue';
  import IForm from '@/components/i-form/index.vue';
  import {
    svcWebCommonActivitySelectCodePost,
    svcWebMemberCardInfoGet,
    svcWebMemberCardRechargeActivitySectionListGet,
    SvcWebMemberCardRechargeActivitySectionListGetResponse,
    svcWebMemberCardRechargePost
  } from '@/api/svc-web';
  import { formatPrice } from '@/utils';
  import { payWayList } from '@/utils/dic';
  import NP from 'number-precision';
  import { Message, TableColumnData, TableData } from '@arco-design/web-vue';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number]
    },
    projectId: {
      type: [String, Number]
    }
  });
  const emits = defineEmits(['update:modelValue', 'success']);
  const form = ref({});
  const upForm = ref<{ activityId?: number; cActivityId?: number }>({});
  const data = ref([{ key: getMathRandom(), payment: '', amount: '' }]);
  // const consumeList = ref<SvcWebCommonActivitySelectCodePostResponse>([]);
  const couponList =
    ref<SvcWebMemberCardRechargeActivitySectionListGetResponse>([]);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  // const activityList = ref<SvcWebCommonActivitySelectCodePostResponse>([]);
  onMounted(() => {
    run({ memberCardId: props.id + '' });
    getActivitySelect({
      projectId: props.projectId as number,
      statuses: [2],
      scene: 'recharge'
    });
    getActivitySelectConsume({
      projectId: props.projectId as number,
      statuses: [2],
      scene: 'consume'
    });
  });
  const { run } = useRequest(svcWebMemberCardInfoGet, {
    manual: true,
    onSuccess(data) {
      const res = data?.[0] || {};
      form.value = {
        ...res,
        balance: formatPrice(res.balance)
      };
    }
  });
  const options = reactive<any>({
    menuForm: false,
    layout: 'vertical',
    span: 6,
    columns: [
      {
        prop: 'cardName',
        label: '卡名',
        placeholder: '卡名',
        options: {
          disabled: true
        }
      },
      {
        prop: 'memberCardCode',
        label: '卡号',
        placeholder: '卡号',
        options: {
          disabled: true
        }
      },
      {
        prop: 'projectName',
        label: '项目',
        placeholder: '项目',
        options: {
          disabled: true
        }
      },
      {
        prop: 'memberName',
        label: '姓名',
        placeholder: '姓名',
        options: {
          disabled: true
        }
      },
      {
        prop: 'memberPhone',
        label: '电话',
        placeholder: '电话',
        options: {
          disabled: true
        }
      },
      {
        prop: 'balance',
        label: '卡内余额（¥）',
        placeholder: '卡内余额（¥）',
        options: {
          disabled: true
        }
      }
    ]
  });
  const upOptions = computed<any>(() => {
    return {
      menuForm: false,
      layout: 'vertical',
      columns: [
        {
          prop: 'activityId',
          label: '活动名称',
          type: 'select',
          dic: activityList.value,
          options: {
            allowSearch: true
          },
          on: {
            clear: () => {
              couponList.value = [];
              resetCoupon();
            }
          }
        },
        {
          prop: 'cActivityId',
          label: '消费活动名称',
          type: 'select',
          options: {
            allowSearch: true
          },
          dic: consumeList.value
        }
      ]
    };
  });

  function useList() {
    return useRequest(svcWebCommonActivitySelectCodePost, {
      manual: true
    });
  }
  const { data: consumeList, run: getActivitySelectConsume } = useList();
  const { data: activityList, run: getActivitySelect } = useList();

  interface couponItemType {
    id: number;
    type: string;
    startAmount: number;
    endAmount: number;
    amount: number;
    totalAmount: number | string;
    discountAmount: number | string;
  }
  const couponItem = ref<Partial<couponItemType>>({ totalAmount: 0 });

  // 过滤不符合条件优惠
  function filterCoupon() {
    const totalAmount = data.value.reduce((prev, next) => {
      return NP.plus(prev, next.amount || 0);
    }, 0);
    // 优惠金额
    let discount = 0;
    couponItem.value =
      couponList.value?.find((i) => {
        const { startAmount, type, amount } = i;
        let { endAmount } = i;
        if (!endAmount) endAmount = Math.pow(9, 100);
        let discountTotalAmount = 0;
        discount = amount;
        switch (type) {
          case 'gift':
            discountTotalAmount = totalAmount;
            break;
          case 'decrement':
            discountTotalAmount = NP.plus(totalAmount, amount);
            break;
          case 'discount':
            discountTotalAmount = NP.divide(totalAmount, amount);
            // discountTotalAmount = NP.times(totalAmount, NP.plus(ratio, 1));
            discount = NP.minus(discountTotalAmount, totalAmount);
            break;
        }
        const res =
          startAmount <= discountTotalAmount && discountTotalAmount < endAmount;
        if (!res || totalAmount === 0) discount = 0;
        return res;
      }) || {};
    couponItem.value.totalAmount = formatPrice(totalAmount);
    couponItem.value.discountAmount = formatPrice(discount);
  }

  //获取优惠信息
  const { run: getActivityInfo } = useRequest(
    svcWebMemberCardRechargeActivitySectionListGet,
    {
      manual: true,
      onSuccess: (data) => {
        couponList.value = data;
        resetCoupon();
      }
    }
  );

  function resetCoupon() {
    filterCoupon();
    data.value = data.value.map((v) => {
      return { ...v, key: getMathRandom() };
    });
  }

  watch(
    data,
    () => {
      filterCoupon();
    },
    { deep: true }
  );
  watch(
    () => upForm.value.activityId,
    (v: number | undefined) => {
      console.log('id 更改');
      v && getActivityInfo({ id: v + '' });
    }
  );

  interface countDataType {
    payment: string;
    amount: string | number;
    discount: string | number;
    real: string | number;
    menu: string | Number;
  }
  const tableOptions = reactive({
    columns: [
      {
        prop: 'payment',
        label: '支付方式',
        width: 200,
        title: '支付方式',
        dataIndex: 'payment',
        slotName: 'payment'
      },
      {
        prop: 'amount',
        label: '充值金额',
        width: 200,
        title: '充值金额',
        dataIndex: 'amount',
        slotName: 'amount'
      },
      {
        prop: 'discount',
        label: '优惠金额',
        title: '优惠金额',
        width: 200,
        dataIndex: 'discount'
      },
      {
        prop: 'real',
        label: '实际到账',
        width: 200,
        title: '实际到账',
        dataIndex: 'real'
      },
      {
        dataIndex: 'menu',
        title: '操作',
        slotName: 'menu'
      }
    ]
  });
  const summary = ({
    data
  }: {
    columns: TableColumnData[];
    data: TableData[];
  }) => {
    const { discountAmount = 0 } = couponItem.value;
    const countData: countDataType = {
      payment: '合计',
      amount: 0,
      discount: discountAmount,
      real: 0,
      menu: '--'
    };
    data.forEach((i: countDataType & TableData[0]) => {
      countData.amount = NP.plus(countData.amount, i.amount);
    });
    countData.amount = formatPrice(countData.amount);
    countData.real = formatPrice(NP.plus(countData.amount, discountAmount));
    return [countData];
  };

  function inputChange(v: string, index: number) {
    if (/^\d{1,5}$/.test(v) || !v) {
      data.value[index].amount = v;
    }
  }

  const { run: runSubmit, loading: submitLoading } = useRequest(
    svcWebMemberCardRechargePost,
    {
      manual: true,
      onSuccess() {
        Message.success('充值成功');
        visible.value = false;
        emits('success');
      }
    }
  );

  function submit() {
    const { id, discountAmount = 0, totalAmount = 0 } = couponItem.value;
    runSubmit({
      memberCardId: props.id as number,
      activityId: upForm.value.activityId,
      activityRangeId: id,
      caActivityId: upForm.value.cActivityId,
      discountAmount: Number(discountAmount),
      receivedAmount: NP.plus(discountAmount, totalAmount),
      modeList: data.value.map((i) => {
        return {
          payment: Number(i.payment),
          amount: Number(i.amount)
        };
      })
    });
  }

  function addRow() {
    data.value.push({
      key: getMathRandom(),
      payment: '',
      amount: ''
    });
  }
  function deleteRow(index: number) {
    data.value.splice(index, 1);
  }

  function getMathRandom(n = 8) {
    return Math.floor(Math.random() * Math.pow(10, n)) + '';
  }
</script>

<style scoped lang="less">
  .btn-no-padding {
    padding: 0;
  }

  .margin-bottom-xs {
    margin-bottom: 16px;
  }

  .table-c {
    padding: 0 16px 16px;

    .table-c-title {
      font-size: 14px;
      color: #333;
      line-height: 22px;
    }
  }

  .basic {
    background-color: #fff;
  }

  .basic-title {
    font-size: 16px;
    color: #333;
    font-weight: 500;
    line-height: 24px;
    padding: 16px 16px 0 16px;
  }

  :deep(.arco-form-item) {
    margin-bottom: 4px;
  }

  .activity {
    :deep(.i-form) {
      .card {
        margin-bottom: 0;
      }
    }
  }
</style>
