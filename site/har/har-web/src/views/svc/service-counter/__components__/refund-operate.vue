<template>
  <drawer
    v-model="visible"
    title="退卡"
    :footer="true"
    :show-log="false"
    :options="{
      okLoading: isLoading
    }"
    @cancel="onCancel"
    @before-ok="onBeforeOk"
  >
    <div class="warp">
      <div>
        <!-- 查出信息回填的表单 -->
        <i-form ref="BasicForm" v-model="page.form" :options="formOptions">
          <template #putListForm>
            <i-table
              :options="listOptions"
              :data="page.data"
              style="width: 100%"
            >
            </i-table>
          </template>
          <template #refundForm>
            <!-- 状态使用中 -->
            <div class="operation-pre">
              <div class="operation">
                <a-input
                  class="input"
                  :model-value="statusText"
                  :disabled="true"
                />
                <div class="pos">
                  <span v-if="page.form.status !== 1" class="msg"
                    >温馨提示：当前卡片已冻结、已退卡、不能进行退卡操作</span
                  >
                  <a-checkbox v-else :value="1" @change="refundChange"
                    >点我退卡</a-checkbox
                  >
                </div>
              </div>
            </div>
          </template>
        </i-form>
      </div>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, reactive, onMounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import {
    svcWebMemberCardCancelPost,
    // svcWebMemberCardCancelDetailIdGet,
    svcWebServiceCounterInfoMemberCardIdGet
  } from '@/api/svc-web';
  import { Message } from '@arco-design/web-vue';
  import { useRequest } from '@har/use';
  import { payWayList, valueCardStatusList } from '@/utils/dic';
  import { formatPrice } from '@/utils';

  const emits = defineEmits(['update:modelValue', 'update']);
  const isLoading = ref(false);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String]
    },
    projectId: {
      type: [Number, String]
    }
  });

  //定义form表单
  const page = reactive<any>({
    options: [],
    checkData: '',
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

  const BasicForm: Ref = ref(null);

  //记录表格定义
  const listOptions = computed(() => {
    return {
      index: true,
      indexTitle: '序号',
      tableCard: false,
      menu: false,
      pageShow: false,
      columns: [
        {
          label: '退款方式',
          prop: 'payment',
          formatter: (record: { payment: number; amount: number }) => {
            return payWayList.find((i) => i.value === record.payment)?.label;
          }
        },
        {
          label: '退款金额（¥）',
          prop: 'amount'
        }
      ]
    };
  });
  //记录表格数据
  // const listData = ref<PushObj[] | null>([]);

  //定义formlabel
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
          // rules: [{ required: true, message: '请选择卡名' }],
          options: {
            disabled: true
          },
          span: 6
        },
        {
          label: '卡号',
          prop: 'memberCardCode',
          // rules: [{ required: true, message: '请填写卡号' }],
          options: {
            disabled: true
          },
          span: 6
        },
        {
          label: '项目',
          prop: 'projectName',
          // rules: [{ required: true, message: '请填写项目' }],
          options: {
            disabled: true
          },
          span: 6
        },
        {
          label: '姓名',
          prop: 'memberName',
          // rules: [{ required: true, message: '请填写参考购卡及充值金额' }],
          options: {
            disabled: true
          },
          span: 6
        },
        {
          label: '电话',
          prop: 'memberPhone',
          // rules: [{ required: true, message: '请上传商场LOGO' }],
          options: {
            disabled: true
          },
          span: 6
        },
        {
          label: '卡内余额（¥）',
          prop: 'balance',
          type: 'inputNumber',
          // rules: [{ required: true, message: '请输入卡内余额（¥）' }],

          options: {
            disabled: true
          },
          span: 6
        },
        {
          label: '可退余额（¥）',
          prop: 'canReturnBalance',
          type: 'inputNumber',
          // rules: [{ required: true, message: '请输入可退余额（¥）' }],

          options: {
            disabled: true
          },
          span: 6
        },
        {
          label: '',
          prop: 'putList',
          span: 24
        },
        {
          label: '退卡操作',
          type: 'groupTitle'
        },
        {
          label: '状态',
          prop: 'refund',
          rules: [{ required: true, message: '请勾选' }],
          options: {
            disabled: true
          },
          span: 12
        }
      ]
    };
  });

  onMounted(() => {
    getInfo({
      memberCardId: props.id + ''
    });
  });

  const statusText = computed(() => {
    return valueCardStatusList.find((i) => i.value === page.form.status)?.label;
  });

  const { run: getInfo } = useRequest(svcWebServiceCounterInfoMemberCardIdGet, {
    manual: true,
    onSuccess(data) {
      page.form = data;
      const { canReturnBalance = 0 } = data;
      page.data = [
        {
          payment: 1,
          amount: formatPrice(canReturnBalance)
        }
      ];
    }
  });

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const onCancel = () => {};
  //确认提交
  const onBeforeOk = async (done: (closed: boolean) => void) => {
    done(false);
    const res = await BasicForm.value.submit();
    if (!res) {
      isLoading.value = true;
      const dates: any = {
        // type: page.checkData ? page.checkData : 3,
        memberCardId: page.form.memberCardId,
        modeList: page.data
      };
      try {
        await svcWebMemberCardCancelPost(dates);
        visible.value = false;
        Message.success('操作成功！');
        emits('update');
      } catch (error) {
        console.log(error);
      } finally {
        isLoading.value = false;
      }
    }
  };

  function refundChange(v: boolean | Array<string | number | boolean>) {
    page.form.refund = v ? v : '';
  }
</script>
<style scoped lang="less">
  .operation-pre {
    position: relative;
    flex: 1;
    .input {
      width: 100%;
    }
    .pos {
      position: absolute;
      top: -30px;
      right: 0;
      z-index: 10;
    }
  }
  .warp {
    background: #fff;
    width: 100%;
    height: 100%;
    padding: 16px;
    .operation {
      display: flex;
      align-items: center;
      justify-content: center;
      .cliks {
        color: #165dff;
      }
      .msg {
        color: #77797e;
        margin-left: 12px;
      }
    }
  }
  .right-item {
    width: 100%;
    height: 100%;
    border-left: 1px dashed #333;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
