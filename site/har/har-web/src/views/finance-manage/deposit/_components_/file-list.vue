<template>
  <div class="file-container">
    <div class="title flex align-center justify-between">
      <div>附件信息</div>
    </div>
    <div class="table-box">
      <i-custom-upload
        v-model="attachment"
        url-key="previewAddress"
        :options="{
          accept: 'image/png,image/jpg,image/jpeg',
          showRemoveButton: needEdit,
          showUploadButton: needEdit
        }"
        :limit="10"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';

  const emits = defineEmits(['update:fileData']);

  const props = defineProps({
    fileData: {
      type: Array<any>
    },
    needEdit: {
      type: Boolean,
      default: true
    }
  });

  const attachment = computed({
    get() {
      return props.fileData || [];
    },
    set(v) {
      console.log(v);
      emits('update:fileData', v);
    }
  });
</script>
<style scoped lang="less">
  .file-container {
    //margin: 0 16px 16px 16px;
    padding: 16px;
    background: #fff;
    .title {
      margin-bottom: 16px;
      font-size: 16px;
    }
  }
</style>
