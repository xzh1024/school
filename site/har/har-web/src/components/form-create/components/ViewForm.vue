<template>
  <view-form ref="viewFormRef" v-bind="attrs" />
</template>

<script setup lang="ts">
  import { formCreate } from '@/components/form-create';
  import { Textarea, Modal } from '@arco-design/web-vue';
  import { ref, useAttrs, provide } from 'vue';
  import FormSys from '@/components/sys/formSys.vue';
  import FormTreeSys from '@/components/sys/formTreeSys.vue';
  import iUpload from './Upload.vue';
  const ViewForm = formCreate.$form();
  formCreate.component(`ATextarea`, Textarea);
  formCreate.component(`AModal`, Modal);
  formCreate.component(`FormSys`, FormSys);
  formCreate.component(`FormTreeSys`, FormTreeSys);
  formCreate.component(`IUpload`, iUpload);

  const attrs = useAttrs();
  provide('disabled', attrs.disabled);
  // console.log(attrs);
  const viewFormRef = ref();
  defineExpose({
    viewFormRef
  });
</script>
