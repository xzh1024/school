<template>
  <div>
    <i-modal v-model="visible" :title="title" :options="{ onBeforeOk: submit }">
      <i-form ref="refForm" v-model="form" :options="options"> </i-form>
    </i-modal>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'BrandEdit'
  };
</script>

<script setup lang="ts">
  import IModal from '@/components/i-modal/index.vue';
  import IForm from '@/components/i-form/index.vue';
  import { computed, onMounted, ref, Ref } from 'vue';
  import {
    groundPcApiProductAttributeBrandAddPost,
    groundPcApiProductAttributeBrandUpdatePost,
    groundPcApiProductAttributeBrandInfoIdGet
  } from '@/api/ground-pc-api';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { getBrandDic } from '@/utils/getDic';

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
        label: '品牌名称',
        prop: 'name',
        span: 24,
        rules: [{ required: true, message: '品牌名称' }],
        options: {
          maxLength: 50
        }
      },
      {
        label: '品牌logo',
        prop: 'file',
        type: 'customUpload',
        limit: 1,
        options: {
          urlKey: 'previewAddress'
        },
        span: 24
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
    return props.id ? '编辑品牌' : '新增品牌';
  });
  const [getInfo] = useFuncProxy(async () => {
    form.value = await groundPcApiProductAttributeBrandInfoIdGet({
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
      const { file = {} } = form.value;
      const temp = Object.keys(file).length ? [file] : [];
      const p = {
        ...form.value,
        file: temp.map((i: any) => i.key)?.join(',')
      };
      if (props.id) {
        await groundPcApiProductAttributeBrandUpdatePost(p);
        Message.success('修改成功');
      } else {
        await groundPcApiProductAttributeBrandAddPost(p);
        Message.success('新增成功');
      }
      props.refresh?.();
      await getBrandDic(true);
      emits('confirm');
      refForm.value.resetFields();
      done(true);
    } catch (e) {
      done(false);
      console.error(e);
    }
  }
</script>
