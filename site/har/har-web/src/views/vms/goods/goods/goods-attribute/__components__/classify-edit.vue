<template>
  <div>
    <i-modal v-model="visible" :title="title" :options="{ onBeforeOk: submit }">
      <i-form ref="refForm" v-model="form" :options="options"></i-form>
    </i-modal>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ClassifyEdit'
  };
</script>

<script setup lang="ts">
  import IModal from '@/components/i-modal/index.vue';
  import IForm from '@/components/i-form/index.vue';
  import { computed, onMounted, ref, Ref } from 'vue';
  import {
    groundPcApiProductAttributeClassifyAddPost,
    groundPcApiProductAttributeClassifyInfoIdGet,
    groundPcApiProductAttributeClassifyUpdatePost
  } from '@/api/ground-pc-api';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { getClassifyDic } from '@/utils/getDic';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    },
    parentId: {
      type: Number
    },
    // 刷新list
    refresh: {
      type: Function
    }
  });
  const form: Ref = ref({});
  const refForm: Ref = ref(null);
  const emits = defineEmits(['update:modelValue', 'confirm']);
  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue');
    }
  });
  const options: Ref = ref({
    menuForm: false,
    columns: [
      {
        label: '分类名称',
        prop: 'name',
        span: 24,
        rules: [{ required: true, message: '请填写分类名称' }],
        options: {
          maxLength: 50
        }
      },
      {
        label: '排序',
        prop: 'sort',
        type: 'inputNumber',
        span: 24
      },
      {
        label: '备注',
        type: 'textarea',
        span: 24,
        prop: 'remark',
        options: {
          maxLength: 100,
          showWordLimit: true
        }
      }
    ]
  });

  const title: Ref<string> = computed(() => {
    return props.id ? '编辑分类' : '新增分类';
  });
  const [getInfo] = useFuncProxy(async () => {
    form.value = await groundPcApiProductAttributeClassifyInfoIdGet({
      id: `${props.id}`
    });
  });
  onMounted(() => {
    if (props.id) getInfo();
  });
  // eslint-disable-next-line consistent-return
  async function submit(done: (closed: boolean) => void) {
    try {
      const res = await refForm.value.submit();
      if (res) return done(false);
      if (props.id) {
        await groundPcApiProductAttributeClassifyUpdatePost(form.value);
        Message.success('修改成功');
      } else {
        await groundPcApiProductAttributeClassifyAddPost({
          ...form.value,
          pid: props.parentId
        });
        Message.success('新增成功');
      }
      props.refresh?.();
      await getClassifyDic(true);
      emits('confirm');
      refForm.value.resetFields();
      done(true);
    } catch (e) {
      done(false);
      console.error(e);
    }
  }
</script>
