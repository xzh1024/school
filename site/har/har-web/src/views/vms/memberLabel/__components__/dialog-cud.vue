<template>
  <drawer v-model="visible" :title="title" width="54%" @cancel="onCancel">
    <template #footer>
      <!-- <a-button @click="onSubmit('draft')">保存草稿</a-button> -->
      <a-button @click="onCancel">取消</a-button>
      <a-button
        type="primary"
        v-if="isWatch"
        @click="onEdit"
      >
        编辑
      </a-button>
      <!-- v-if="isEdit" -->
      <a-button
        v-if="!isWatch"
        type="primary"
        :loading="editForm.id ? editLoading : loading"
        @click="onSubmit"
      >
        确认
      </a-button>
    </template>
    <div class="member-model-box">
      <a-card :bordered="false" style="height: 100%">
        <i-form
          ref="iFormRef"
          v-model="editForm"
          class="member_form"
          :options="formProps"
        >
        </i-form>
      </a-card>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, computed, watch, onMounted } from 'vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import IForm from '@/components/i-form/index.vue';
  import { FormOptions } from '@/components/i-form/index';
  import {
    groundPcApiMemberLabelAddPost,
    groundPcApiMemberLabelEditPost
  } from '@/api/ground-pc-api';

  const formRef: Ref = ref(null);
  const iFormRef: Ref = ref(null);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    rowId: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      default: () => {
        return {
          name: '',
          id: ''
        };
      }
    },
    source: {
      type: String,
      default: 'add'
    },
    options: {
      type: Object,
      default: () => {
        return {
          energyTypeData: [],
          usageTypeData: []
        };
      }
    }
  });
  const emits = defineEmits([
    'update:modelValue',
    'reset',
    'sourceChange'
  ]);

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      if (formRef.value) {
        formRef.value.resetFields();
        iFormRef.value?.resetFields();
      }
      emits('update:modelValue', v);
    }
  });
  const editForm: Ref = ref({});
  const formProps = computed<FormOptions>(() => ({
    menuForm: false,
    layout: 'vertical',
    disabled: isWatch.value,
    columns: [
      {
        label: '标签名称',
        span: 12,
        prop: 'name',
        rules: [{ required: true, message: '标签名称不能为空' }]
      }
    ]
  }));

  const isWatch = computed(() => {
    return props.source === 'watch';
  });
  const onEdit = () => {
    emits('sourceChange', 'edit');
  };
  const onCancel = () => {
    emits('reset');
  };
  const onSubmit = async () => {
    console.log(editForm.value, '提交信息');
    const res = await iFormRef.value?.submit();
    if (!res) {
      try {
        console.log(editForm.value, '提交信息');
        if (editForm.value.id) {
          editMemberLabel();
        } else {
          addMemberLabel();
        }
      } catch (e) {
      } finally {
      }
    }
  };

  // 新增
  const [addMemberLabel, loading] = useFuncProxy(async () => {
    await groundPcApiMemberLabelAddPost(editForm.value);
    Message.success('添加成功!');
    visible.value = false;
    emits('reset');
  });
  // 编辑
  const [editMemberLabel, editLoading] = useFuncProxy(async () => {
    await groundPcApiMemberLabelEditPost(editForm.value);
    Message.success('操作成功!');
    visible.value = false;
    emits('reset');
  });

  onMounted(() => {
    if (props.rowId) {
      editForm.value = props.row;
    } else {
      editForm.value = {};
    }
  });
</script>

<style scoped lang="less">
  .member-model-box {
    width: 100%;
    height: 100%;
    :deep(.member_form) {
      .card {
        padding: 0 !important;
      }
    }
  }
</style>
