<template>
  <drawer
    v-model="visible"
    title="新增冻结/解冻单"
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
          <template #statusLessForm>
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
  import { ref, Ref, computed, reactive } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import {
    svcWebMemberCardFreezePost,
    svcWebMemberCardInfoGet
  } from '@/api/svc-web';
  import { Message } from '@arco-design/web-vue';
  import { valueCardStatusList } from '@/utils/dic';

  const loading: Ref = ref(false);
  const emits = defineEmits(['update:modelValue', 'update']);
  const searchData: Ref = ref(null);
  const isLoading = ref(false);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  });

  //定义form表单
  const page = reactive<any>({
    options: [],

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
          rules: [{ required: true, message: '卡内余额（¥）不能为空' }],

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
          prop: 'statusLess',
          rules: [
            {
              required: true,
              message:
                page.form.status === 3
                  ? '当前卡片已退卡不能进行退卡操作'
                  : '请勾选'
            }
          ],
          options: {
            disabled: true
          },
          span: 12
        }
      ]
    };
  });

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
          status: [1, 2, 3].join(',')
        });
      } catch (error) {
        console.log(error);
      }
      loading.value = false;
    }, 1000);
    searchData.value = event;
  }
  const statusText = computed(() => {
    return valueCardStatusList.find((i) => i.value === page.form.status)?.label;
  });

  function refundChange(v: boolean | Array<string | number | boolean>) {
    page.form.statusLess = v ? v : '';
  }

  const checkboxText = computed(() => {
    const status = page.form.status;
    if (status === 1) return '点我冻结';
    return '点我解冻';
  });

  //选择后赋值
  const changeVal = (event: Object) => {
    const must = page.options.filter((items: any) => {
      return items.memberCardId == event;
    });

    page.form = must[0];
    BasicForm.value.resetFields();
  };
  const selectVisible = (event: Boolean) => {
    if (!event) {
      handleSearch(searchData.value);
    }
  };

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
      if (page.form.status === 3) {
        Message.warning('当前卡片已退卡，不能进行冻结或解冻操作');
        return false;
      }
      isLoading.value = true;
      const dates: any = {
        type: page.form.status === 1 ? 2 : page.form.status === 2 ? 1 : null,
        memberCardId: page.form.memberCardId
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
