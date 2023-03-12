<template>
  <template v-if="disabled && computedProps.options.accept !== 'image/*'">
    <div class="file-box">
      <div
        v-for="item in computedValue"
        :key="item.url"
        class="arco-upload-list-item-content"
        @click="downloadFile(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </template>
  <template v-else-if="computedValue">
    <i-upload
      v-if="computedProps.options.accept !== 'image/*'"
      v-model="computedValue"
      v-bind="computedProps"
    />
    <i-custom-upload v-else v-model="computedValue" v-bind="computedProps" />
  </template>
</template>

<script setup lang="ts">
  import { computed, PropType, inject } from 'vue';
  import IUpload from '@/components/i-upload/i-upload.vue';
  import ICustomUpload from '@/components/i-custom-upload/index.vue';
  import { download } from '@/utils';

  const props = defineProps({
    modelValue: {
      type: Array
    },
    formCreateInject: Object as PropType<any>
  });
  const emits = defineEmits(['update:modelValue']);
  const disabled = inject('disabled');

  const computedValue = computed({
    get() {
      return props.formCreateInject?.rule?.value || [];
    },
    set(data) {
      emits('update:modelValue', data);
    }
  });

  const computedProps = computed(() => {
    console.log(props.formCreateInject?.rule?.props.accept);

    return {
      limit: props.formCreateInject?.rule?.props?.limit,
      options: {
        isAliOss: true,
        disabled: disabled,
        ...props.formCreateInject?.rule?.props
      }
    };
  });

  function downloadFile(item: any) {
    if (item?.response?.data?.url) {
      download(item?.response?.data?.url, item.name);
    }
  }
</script>

<style lang="less" scoped>
  .file-box {
    width: 100%;
  }

  .arco-upload-list-item-content {
    width: 100%;
    cursor: pointer;

    & + .arco-upload-list-item-content {
      margin-top: 10px;
    }
  }
</style>
