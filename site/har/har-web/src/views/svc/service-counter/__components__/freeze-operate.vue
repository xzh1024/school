<template>
  <drawer
    v-model="visible"
    title="新增冻结/解冻"
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
          <template #freezeForm>
            <div class="operation-pre">
              <div class="operation">
                <a-input
                  class="input"
                  :model-value="statusText"
                  :disabled="true"
                />
                <div class="pos">
                  <span v-if="page.form.status === 3" class="msg"
                    >温馨提示：当前卡片已退卡不能进行退卡操作</span
                  >
                  <a-checkbox v-else :value="1" @change="refundChange">{{
                    checkboxText
                  }}</a-checkbox>
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
    svcWebMemberCardFreezePost,
    svcWebServiceCounterInfoMemberCardIdGet
  } from '@/api/svc-web';
  import { Message } from '@arco-design/web-vue';
  import { useRequest } from '@har/use';
  import { valueCardStatusList } from '@/utils/dic';

  const emits = defineEmits(['update:modelValue', 'update']);
  const isLoading = ref(false);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number]
    }
  });
  //定义form表单
  const page = reactive<any>({
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
          // rules: [{ required: true, message: '请上传卡背景' }],

          options: {
            disabled: true
          },
          span: 6
        },
        {
          label: '冻结操作',
          type: 'groupTitle'
        },
        {
          label: '状态',
          prop: 'freeze',
          rules: [{ required: true, message: '请勾选' }],
          options: {
            disabled: true
          },
          span: 12
        }
      ]
    };
  });

  const BasicForm: Ref = ref(null);
  onMounted(() => {
    getInfo({
      memberCardId: props.id + ''
    });
  });
  const { run: getInfo } = useRequest(svcWebServiceCounterInfoMemberCardIdGet, {
    manual: true,
    onSuccess: (data) => {
      page.form = data;
    }
  });

  const statusText = computed(() => {
    return valueCardStatusList.find((i) => i.value === page.form.status)?.label;
  });

  const checkboxText = computed(() => {
    const status = page.form.status;
    if (status === 1) return '点我冻结';
    return '点我解冻';
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
      const status = page.form.status;
      const type = status === 1 ? 2 : status === 2 ? 1 : null;
      const dates: any = {
        type,
        memberCardId: props.id
      };
      try {
        await svcWebMemberCardFreezePost(dates);
        visible.value = false;
        Message.success('操作成功！');
        emits('update');
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        console.log(error);
      }
    }
  };

  function refundChange(v: boolean | Array<string | number | boolean>) {
    page.form.freeze = v ? v : '';
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
    .freeCheck {
      width: 100px;
      margin-left: 12px;
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
