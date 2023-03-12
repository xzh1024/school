<template>
  <a-modal
    :visible="modelValue"
    :title="title"
    :width="width"
    unmount-on-close
    :mask-closable="false"
    :footer="false"
    @cancel="handleCancel"
  >
    <div class="top-box flex align-center">
      <div class="amount-mark">￥</div>
      <div class="amount-right flex">
        <div class="amount-each"
          >应收总金额（¥）：{{ showAmount.actualAmount }}</div
        >
        <div class="amount-each"
          >已收总金额（¥）：{{ showAmount.amountReceived }}</div
        >
      </div>
    </div>
    <a-form
      ref="receiveForm"
      :model="comp.form"
      layout="vertical"
      @submit="handleClickSub"
    >
      <a-row>
        <a-col :span="11">
          <a-form-item
            field="paymentMethod"
            label="收款方式"
            :rules="[{ required: true, message: '请选择收款方式' }]"
          >
            <a-select
              v-model="comp.form.paymentMethod"
              placeholder="请选择收款方式"
            >
              <a-option
                v-for="(item, idx) in paymentMethodList"
                :key="idx"
                :value="item.value"
                >{{ item.label }}</a-option
              >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="11" :offset="1">
          <a-form-item
            field="collectionDate"
            label="收款时间"
            :rules="[{ required: true, message: '请选择收款时间' }]"
          >
            <a-date-picker
              v-model="comp.form.collectionDate"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item
        field="amountReceived"
        label="收款金额（¥）"
        :rules="[{ required: true, message: '请填写收款金额' }]"
      >
        <a-input
          v-model="comp.form.amountReceived"
          auto-size
          max-length="18"
          placeholder="请输入收款金额"
          allow-clear
          @input="
            comp.form.amountReceived = comp.form.amountReceived.replace(
              /^\D*(\d*(?:\.\d{0,2})?).*$/g,
              '$1'
            )
          "
        />
      </a-form-item>
      <a-form-item
        field="attachmentList"
        label="支付凭证"
        :rules="[{ required: true, message: '请上传支付凭证' }]"
      >
        <i-custom-upload
          v-model="comp.form.attachmentList"
          list-type="picture-card"
          :options="{ accept: 'image/*' }"
        ></i-custom-upload>
      </a-form-item>
      <a-form-item field="remark" label="备注">
        <a-textarea
          v-model="comp.form.remark"
          placeholder="请填写备注信息"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <div class="flex justify-end" style="width: 100%">
          <a-button style="margin-right: 15px" @click="handleCancel"
            >取消</a-button
          >
          <a-button html-type="submit" type="primary">提交</a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  /**
   * @params amountInfo<Object> 显示【应收金额】和【已收金额】，不传则根据id请求
   * @params id<string> required
   * @params auto<boolean> 是否再组件内自动提交数据
   * */
  import { ref, reactive, watch, computed } from 'vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectAccountReceivableAmountInfoIdGet,
    cbdApiProjectReceiptAddPost,
    cbdApiProjectBondCollectionPost,
    type CbdApiProjectReceiptAddPostRequest
  } from '@/api';
  import type { StatusListType } from '@/utils/dic';
  import type { ValidatedError } from '@arco-design/web-vue';

  const paymentMethodList: Array<StatusListType> = [
    {
      label: '线下支付',
      value: 1
    }
  ];
  const emits = defineEmits(['submit', 'update:modelValue']);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      required: true,
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: ''
    },
    auto: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '收款'
    },
    width: {
      type: [String, Number],
      default: '45vw'
    },
    amountInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isBond: {
      type: Boolean,
      default: false
    }
  });
  const billId = computed(() => props.id);
  const showAmount = Object.keys(props.amountInfo).length
    ? props.amountInfo
    : ref({});
  const receiveForm = ref<any>(null);
  const comp = reactive<{
    isOkLoading: boolean;
    form: any;
  }>({
    isOkLoading: false,
    form: {
      collectionDate: '',
      paymentMethod: '',
      amountReceived: '',
      remark: '',
      attachmentList: []
    }
  });
  function reset() {
    receiveForm.value?.resetFields();
  }
  const handleCancel = () => {
    emits('update:modelValue', false);
    reset();
  };
  const [handleSubmitData] = useFuncProxy(async () => {
    const {
      collectionDate,
      paymentMethod,
      amountReceived,
      remark,
      attachmentList
    } = comp.form;
    const arrTemp: string[] = [];
    attachmentList.forEach((el: any) => {
      if (el.response.data.key) {
        arrTemp.push(el.response.data.key);
      }
      return arrTemp;
    });
    if (props.isBond) {
      await cbdApiProjectBondCollectionPost({
        id: Number(billId.value),
        paymentMethod: Number(paymentMethod),
        amountReceived: Number(amountReceived),
        remark,
        collectionDate,
        attachmentList: arrTemp
      });
    } else {
      await cbdApiProjectReceiptAddPost({
        accountReceivableCode: props.code,
        paymentMethod: Number(paymentMethod),
        amountReceived: Number(amountReceived),
        remark,
        collectionDate,
        attachmentList: arrTemp
      } as CbdApiProjectReceiptAddPostRequest);
    }
    emits('submit');
    handleCancel();
  });
  async function handleClickSub(e: {
    values: Record<string, any>;
    errors: Record<string, ValidatedError> | undefined;
  }) {
    const { errors } = e;
    if (!errors) {
      if (props.auto) {
        await handleSubmitData();
      } else {
        emits('submit', comp.form);
      }
    }
  }
  const [getAmountInfo] = useFuncProxy(async () => {
    showAmount.value = await cbdApiProjectAccountReceivableAmountInfoIdGet({
      id: billId.value
    });
  });
  watch(
    billId,
    (v) => {
      if (v && !Object.keys(props.amountInfo).length) {
        getAmountInfo();
      }
    },
    { immediate: true }
  );
  // watch(
  //   () => comp.form,
  //   (v) => {
  //     console.log(v.attachmentList);
  //   },
  //   { deep: true }
  // );
</script>

<style scoped lang="less">
  .top-box {
    box-sizing: border-box;
    height: 90px;
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 5px;

    .amount-mark {
      display: flex;
      align-items: center;
      width: 10%;
      font-size: 50px;
    }

    .amount-right {
      flex-wrap: wrap;
      justify-content: space-between;
      width: 90%;

      .amount-each {
        width: 48%;

        &.current {
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
</style>
