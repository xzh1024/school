<template>
  <a-modal
    :visible="visible"
    width="500px"
    :title="id ? '编辑类型' : '新增类型'"
    @cancel="visible = false"
    @ok="onOk"
  >
    <div style="max-height: 70vh">
      <i-form ref="typeForm" v-model="page.form" :options="page.options">
      </i-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { ref, Ref, reactive, computed, watch, PropType } from 'vue';
  import IForm from '@/components/i-form/index.vue';
  import {
    cbdApiProjectActivityTypeAddPost,
    cbdApiProjectActivityTypeEditPost
  } from '@/api';
  import { Message } from '@arco-design/web-vue';
  import type { CbdApiProjectActivityTypeListGetResponse } from '@/api';
  type ActivityType = CbdApiProjectActivityTypeListGetResponse[0];

  interface PageConfig {
    form: { name: string; sort: number | undefined };
    options: any;
  }

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    projectId: {
      type: String,
      default: ''
    },
    currentItem: {
      type: Object as PropType<ActivityType>,
      default: () => {}
    }
  });
  const emits = defineEmits(['update:modelValue', 'refresh']);
  const visible: Ref = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const page = reactive<PageConfig>({
    form: {
      name: '',
      sort: undefined
    },
    options: {
      menuForm: false,
      formCard: false,
      layout: 'vertical',
      columns: [
        {
          label: '类型名称',
          prop: 'name',
          rules: [{ required: true, message: '请选择所属类型' }],
          span: 24
        },
        {
          label: '展示顺序',
          prop: 'sort',
          span: 24
        }
      ]
    }
  });
  const typeForm: Ref = ref(null);
  async function onOk() {
    const v = await typeForm.value.submit();
    if (!v) {
      if (!props.id) {
        await cbdApiProjectActivityTypeAddPost({
          ...page.form,
          sort: page.form.sort || undefined,
          projectId: Number(props.projectId)
        });
      } else {
        await cbdApiProjectActivityTypeEditPost({
          ...page.form,
          sort: page.form.sort || undefined,
          id: Number(props.id)
        });
      }
      Message.success('操作成功');
      visible.value = false;
      emits('refresh');
    }
  }
  watch(
    () => props.currentItem,
    (v) => {
      page.form.name = v.name || '';
      page.form.sort = v.sort;
    },
    { deep: true, immediate: true }
  );
</script>
<style scoped></style>
