<template>
  <div>
    <i-modal v-model="visible" :title="title" :options="{ onBeforeOk: submit }">
      <i-form ref="refForm" v-model="form" :options="options"></i-form>
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
    cbdApiProjectFormatAddPost,
    cbdApiProjectFormatEditIdGet,
    cbdApiProjectFormatEditIdPut
  } from '@/api';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';

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
    }
  });
  const form: Ref = ref({});
  const refForm: Ref = ref(null);
  const emits = defineEmits(['update:modelValue', 'confirm']);
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue');
    }
  });
  const options = ref<any>({
    menuForm: false,
    columns: [
      {
        label: '业态名称',
        prop: 'name',
        span: 24,
        rules: [{ required: true, message: '请输入业态名称' }],
        options: {
          maxLength: 4
        }
      },
      {
        label: '业态图标',
        prop: 'iconAttachment',
        type: 'customUpload',
        rules: [{ required: true, message: '请上传业态图标' }],
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
    return props.id ? '编辑业态' : '新增业态';
  });
  const [getInfo] = useFuncProxy(async () => {
    form.value = await cbdApiProjectFormatEditIdGet({
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
      const { iconAttachment = [] } = form.value;
      const p = {
        ...form.value,
        icon: Array.isArray(iconAttachment)
          ? (iconAttachment[0] && iconAttachment[0].key) || ''
          : iconAttachment.id,
        parentId: props.parentId || undefined
      };
      if (props.id) {
        await cbdApiProjectFormatEditIdPut(p);
        Message.success('修改成功');
      } else {
        await cbdApiProjectFormatAddPost(p);
        Message.success('新增成功');
      }

      emits('confirm');
      done(true);
    } catch (e) {
      done(false);
      console.error(e);
    }
  }
</script>
