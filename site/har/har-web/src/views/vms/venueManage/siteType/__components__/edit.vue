<template>
  <div>
    <i-modal v-model="visible" :title="title" :options="{ onBeforeOk: submit }">
      <i-form ref="refForm" v-model="form" :options="options"> </i-form>
    </i-modal>
  </div>
</template>

<script setup lang="ts">
  import useFuncProxy from '@/hooks/useFuncProxy';
  import IModal from '@/components/i-modal/index.vue';
  import IForm from '@/components/i-form/index.vue';
  import { computed, onMounted, ref, Ref } from 'vue';
  import {
    groundPcApiVenueClassifyAddPost,
    groundPcApiVenueClassifyUpdatePost,
    groundPcApiVenueClassifyInfoIdGet
  } from '@/api/ground-pc-api';
  import { Message } from '@arco-design/web-vue';
  import { useProjectOptions } from '@/views/vms/hooks/usePorject';
  import { useStoreOptions } from '@/views/vms/hooks/useStore';
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
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
  const { getProjectOptions, projectOptions } = useProjectOptions();
  const { getStoreOptions, storeOptions } = useStoreOptions();
  const options: Ref = ref({
    menuForm: false,
    columns: [
      {
        label: '分类名称',
        prop: 'name',
        span: 24,
        rules: [{ required: true, message: '单位名称' }],
        options: {
          maxLength: 50
        }
      },
      {
        label: '项目名称',
        prop: 'projectId',
        span: 24,
        search: true,
        hide: true,
        type: 'select',
        dic: projectOptions,
        options: {
          onChange: (val: string) => {
            console.log('getStoreOptions', val);
            getStoreOptions({ projectId: val });
          }
        }
      },
      {
        label: '店铺',
        prop: 'storeId',
        span: 24,
        type: 'select',
        dic: storeOptions
      },
      {
        label: '排序',
        prop: 'sort',
        span: 24
      }
    ]
  });

  const title: Ref<string> = computed(() => {
    return props.id ? '编辑名称' : '新增名称';
  });
  const [getInfo] = useFuncProxy(async () => {
    form.value = await groundPcApiVenueClassifyInfoIdGet({
      id: `${props.id}`
    });
  });
  onMounted(async() => {
    if (props.id) {
      await getInfo();
      getStoreOptions({ projectId: form.value.projectId });
    }
    getProjectOptions();
  });
  // eslint-disable-next-line consistent-return
  async function submit(done: (closed: boolean) => void) {
    try {
      const res = await refForm.value.submit();
      if (res) return done(false);
      if (props.id) {
        await groundPcApiVenueClassifyUpdatePost(form.value);
        Message.success('修改成功');
      } else {
        await groundPcApiVenueClassifyAddPost(form.value);
        Message.success('新增成功');
      }
      // todo 增加更新字典
      emits('confirm');
      props.refresh?.();
      done(true);
    } catch (e) {
      done(false);
      console.error(e);
    }
  }
</script>
