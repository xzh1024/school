<template>
  <drawer v-model="visible" title="新增充值单" :footer="true" :show-log="false">
    <div class="warp">
      <div>
        <!-- 模糊搜索匹配 -->
        <a-select
          :loading="loading"
          allow-search
          :filter-option="false"
          :show-extra-options="false"
          placeholder="请输入卡号/电话/姓名搜索"
          @search="handleSearch($event)"
          @change="changeVal($event)"
          @popup-visible-change="selectVisible"
        >
          <div v-if="page.options.length === 0" class="no-data"
            ><a-empty
          /></div>
          <div v-else>
            <a-option
              v-for="items in page.options"
              :key="items.memberCardCode"
              :value="items.memberCardId"
              >{{
                items.memberCardCode +
                '-' +
                items.memberName +
                '-' +
                items.memberPhone
              }}</a-option
            >
          </div>
        </a-select>

        <a-divider orientation="left"></a-divider>
        <!-- 查出信息回填的表单 -->
        <i-form ref="BasicForm" v-model="page.form" :options="formOptions">
          <template #putListForm>
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
                :summary="summary"
                summary-text="合计"
                row-key="key"
                :pagination="false"
              >
                <template #payment="{ record }">
                  <a-select
                    v-model="record.payment"
                    placeholder="请选择输入方式"
                  >
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
                    v-model="record.amount"
                    placeholder="请输入金额"
                    :max-length="5"
                    @input="inputChange(record.amount, rowIndex)"
                  ></a-input>
                </template>
                <template #summary-cell="{ column, record }">
                  <div>{{ record[column.dataIndex] }}</div>
                </template>
                <template #menu="{ rowIndex }">
                  <a-button
                    type="text"
                    :disabled="data.length === 1"
                    @click="deleteRow(rowIndex)"
                    >删除</a-button
                  >
                </template>
              </a-table>
            </div>
          </template>
        </i-form>
      </div>
    </div>
    <template #footer>
      <a-space>
        <a-button @click="visible = false">取消</a-button>
        <a-button
          type="primary"
          :disabled="!couponItem.totalAmount"
          :loading="isLoading"
          @click="onBeforeOk"
          >确认</a-button
        >
      </a-space>
    </template>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, reactive, onMounted, watch } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { payWayList } from '@/utils/dic';
  import { useRequest } from '@har/use';
  import NP from 'number-precision';
  import {
    svcWebCommonActivitySelectCodePost,
    SvcWebCommonActivitySelectCodePostResponse,
    svcWebMemberCardInfoGet,
    svcWebMemberCardRechargeActivitySectionListGet,
    SvcWebMemberCardRechargeActivitySectionListGetResponse,
    svcWebMemberCardRechargePost
  } from '@/api/svc-web';
  import { formatPrice } from '@/utils';
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
  interface countDataType {
    payment: string;
    amount: string | number;
    discount: string | number;
    real: string | number;
    menu: string | Number;
  }
  interface couponItemType {
    id: number;
    type: string;
    startAmount: number;
    endAmount: number;
    amount: number;
    totalAmount: number | string;
    discountAmount: number | string;
  }
  const searchData: Ref = ref(null);
  const loading: Ref = ref(false);
  const emits = defineEmits(['update:modelValue', 'update']);
  const isLoading = ref(false);
  const couponList =
    ref<SvcWebMemberCardRechargeActivitySectionListGetResponse>([]);
  const activityList = ref<SvcWebCommonActivitySelectCodePostResponse>([]);
  const consumeList = ref<SvcWebCommonActivitySelectCodePostResponse>([]);
  const couponItem = ref<Partial<couponItemType>>({});
  const BasicForm: Ref = ref(null);

  const data = ref([{ payment: '', amount: '' }]);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  //定义form表单
  const page = reactive<any>({
    options: [],
    checkData: '',
    memberCardId: null,
    form: {
      cardName: '',
      memberCardCode: '',
      projectName: '',
      memberName: '',
      memberPhone: '',
      balance: null,
      status: null
    }
  });
  //记录表格定义
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
        width: 180,
        title: '充值金额',
        dataIndex: 'amount',
        slotName: 'amount'
      },
      {
        prop: 'discount',
        label: '优惠金额',
        title: '优惠金额',
        width: 180,
        dataIndex: 'discount'
      },
      {
        prop: 'real',
        label: '实际到账',
        width: 180,
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
    data.forEach((i: TableData[0] & countDataType) => {
      countData.amount = NP.plus(countData.amount, i.amount);
    });
    countData.amount = formatPrice(countData.amount);
    countData.real = formatPrice(NP.plus(countData.amount, discountAmount));
    return [countData];
  };

  function inputChange(v: string, index: number) {
    //只能输入正整数
    data.value[index].amount = (v.match(/^\d{1,5}$/) || [''])[0];
  }

  const { run: runSubmit } = useRequest(svcWebMemberCardRechargePost, {
    manual: true,
    onSuccess() {
      emits('update');
      Message.success('充值成功');
      visible.value = false;
    },
    onFinally() {
      isLoading.value = false;
    }
  });

  //定义formable
  const formOptions: Ref = computed(() => {
    return {
      menuForm: false,
      formCard: false,
      layout: 'vertical',
      columns: [
        {
          label: '基本信息',
          type: 'groupTitle'
        },
        {
          label: '卡名',
          prop: 'cardName',
          rules: [{ required: true, message: '卡名不能为空' }],
          options: {
            disabled: true
          },
          span: 6
        },
        {
          label: '卡号',
          prop: 'memberCardCode',
          rules: [{ required: true, message: '卡号不能为空' }],
          options: {
            disabled: true
          },
          span: 6
        },
        {
          label: '项目',
          prop: 'projectName',
          rules: [{ required: true, message: '项目不能为空' }],
          options: {
            disabled: true
          },
          span: 6
        },
        {
          label: '姓名',
          prop: 'memberName',
          rules: [{ required: true, message: '姓名不能为空' }],
          options: {
            disabled: true
          },
          span: 6
        },
        {
          label: '电话',
          prop: 'memberPhone',
          rules: [{ required: true, message: '电话不能为空' }],
          options: {
            disabled: true
          },
          span: 6
        },
        {
          label: '卡内余额（¥）',
          prop: 'balance',
          type: 'inputNumber',
          rules: [{ required: true, message: '卡内余额不能为空' }],

          options: {
            disabled: true
          },
          span: 6
        },
        {
          label: '充值明细',
          type: 'groupTitle'
        },
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
        },
        {
          label: '',
          prop: 'putList',
          span: 24
        }
      ]
    };
  });

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

  const timer: Ref = ref(null);
  //模糊搜索（防抖处理）
  function handleSearch(event: string) {
    if (!event) {
      return;
    }
    loading.value = true;

    if (timer.value) {
      clearTimeout(timer.value);
    }
    timer.value = setTimeout(async () => {
      try {
        page.options = await svcWebMemberCardInfoGet({
          searchKey: event,
          status: [1].join(',')
        });
      } catch (error) {
        console.log(error);
      }
      loading.value = false;
    }, 1000);
    searchData.value = event;
  }
  function addRow() {
    data.value.push({
      payment: '',
      amount: ''
    });
  }
  function deleteRow(index: number) {
    data.value.splice(index, 1);
  }

  //选择后赋值
  const changeVal = (event: Object) => {
    const must = page.options.filter((items: any) => {
      return items.memberCardId == event;
    });
    page.memberCardId = event;
    page.form = must[0];
    BasicForm.value.resetFields();
    //查询项目活动
    getActivitySelect({
      projectId: must[0].projectId as number,
      statuses: [2],
      scene: 'recharge'
    });
    //查询优惠下拉
    getActivitySelectConsume({
      projectId: must[0].projectId as number,
      statuses: [2],
      scene: 'consume'
    });
  };
  //
  const selectVisible = (event: Boolean) => {
    if (event) {
      handleSearch(searchData.value);
    }
  };

  // 活动下拉
  const { run: getActivitySelect } = useRequest(
    svcWebCommonActivitySelectCodePost,
    {
      manual: true,
      onSuccess: (data) => {
        activityList.value = data;
      }
    }
  );

  //优惠下拉
  const { run: getActivitySelectConsume } = useRequest(
    svcWebCommonActivitySelectCodePost,
    {
      manual: true,
      onSuccess: (data) => {
        consumeList.value = data;
      }
    }
  );

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

  function getMathRandom(n = 8) {
    return Math.floor(Math.random() * Math.pow(10, n)) + '';
  }

  //确认提交
  const onBeforeOk = async () => {
    const res = await BasicForm.value.submit();
    if (!res) {
      isLoading.value = true;
      for (let index = 0; index < data.value.length; index++) {
        const element = data.value[index];
        if (!element.amount || !element.payment) {
          Message.warning('支付方式，充值金额不能为空！');
          return false;
        }
      }
      const { id, discountAmount = 0, totalAmount = 0 } = couponItem.value;
      runSubmit({
        memberCardId: page.memberCardId as number,
        activityId: page.form.activityId,
        activityRangeId: id,
        caActivityId: page.form.cActivityId,
        discountAmount: Number(discountAmount),
        receivedAmount: NP.plus(totalAmount, discountAmount),
        modeList: data.value.map((i) => {
          return {
            payment: Number(i.payment),
            amount: Number(i.amount)
          };
        })
      });
    }
  };

  onMounted(() => {
    // run({ memberCardId: props.id + '' });
    // getActivitySelect({ projectId: props.projectId as number, statuses: [2] });
  });

  watch(
    data,
    () => {
      filterCoupon();
    },
    { deep: true }
  );
  watch(
    () => page.form.activityId,
    (v: number | undefined) => {
      v && getActivityInfo({ id: v + '' });
    }
  );
</script>
<style scoped lang="less">
  .warp {
    background: #fff;
    width: 100%;
    height: 100%;
    padding: 16px;
    overflow: auto;

    .operation {
      display: flex;
      align-items: center;
      justify-content: center;
      .clios {
        color: #165dff;
      }
      .msg {
        color: #77797e;
        margin-left: 12px;
      }
    }
    .margin-bottom-xs {
      margin-bottom: 16px;
    }
    .table-c {
      width: 100%;
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
  }
</style>
