<template>
  <a-modal
    v-model:visible="IVisible"
    title-align="start"
    title="修改小程序介绍"
    :mask-closable="false"
  >
    <template #footer>
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" :loading="loading" @click="submitUnionProject"
        >确定</a-button
      >
    </template>
    <a-form :model="form" size="large">
      <a-form-item field="name" label="项目名称">
        <a-textarea
          v-model="form.signature"
          show-word-limit
          :max-length="200"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
  export default {
    name: 'Introduction'
  };
</script>

<script setup lang="ts">
  import { computed, onMounted, Ref, ref } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  // import { cbdApiClientWechatThirdAppletModifySignaturePost } from '@/api';
  import { Message } from '@arco-design/web-vue';

  const props = defineProps({
    id: Number,
    visible: {
      type: Boolean,
      default: false
    },
    signature: {
      type: String,
      default: ''
    }
  });
  const form: any = ref({});
  const emits = defineEmits(['getData', 'update:visible']);
  onMounted(() => {
    form.value = {
      id: props.id as number,
      signature: props.signature
    };
  });

  // 提交关联项目修改
  const [submitUnionProject, loading] = useFuncProxy(async () => {
    /* await cbdApiClientWechatThirdAppletModifySignaturePost({
      ...form.value,
      id: props.id
    }); */
    Message.success('修改成功');
    IVisible.value = false;
    emits('getData');
  });

  // 弹窗处理
  function handleCancel() {
    IVisible.value = false;
  }

  const IVisible: Ref<boolean> = computed({
    get() {
      return props.visible;
    },
    set(v) {
      emits('update:visible', v);
    }
  });
</script>
