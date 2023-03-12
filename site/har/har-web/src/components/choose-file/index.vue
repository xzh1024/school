<template>
  <template v-if="$slots.default">
    <slot></slot>
  </template>
  <template v-else>
    <div
      class="choose-file"
      :class="[className, mergedDisabled ? 'choose-file--disabled' : '']"
      @click="handleClick"
      @dragenter="handleDrop"
      @dragover="handleDrop"
      @drop="handleDrop"
      @dragleave="handleDrop"
    >
      <img class="choose-file__log" src="@/assets/images/frame.png" alt="" />
      <span class="choose-file__note">将文件拖拽到此处，或点击上传</span>
      <span v-if="acceptList.length || maxSize" class="choose-file__accept">
        <template v-if="acceptList.length"
          >支持格式：{{ acceptList.join('、') }}</template
        >
        <template v-if="maxSize"> ≤{{ maxSize / 1024 }}MB </template>
      </span>
    </div>
  </template>
</template>
<script lang="ts">
  export default {
    name: 'ChooseFile'
  };
</script>
<script setup lang="ts">
  import {ref, computed, toRef, PropType} from 'vue';
  import { chooseFile } from '@/utils/oss-upload';
  import { useFormItem } from '@arco-design/web-vue/es/_hooks/use-form-item';

  const emit = defineEmits(['choose-files']);
  const props = defineProps({
    // 接收的上传文件类型，具体参考 HTML标准
    accept: {
      type: String as PropType<string>,
      default: '.doc,.docx,.xls,.xlsx,.pdf,.png,.jpg'
    },
    // 文件最大数，单位kb，默认：102400kb
    maxSize: {
      type: Number as PropType<number>,
      default: 102400
    },
    disabled: Boolean
  });
  const className = ref('');

  const { mergedDisabled } = useFormItem({
    disabled: toRef(props, 'disabled')
  });

  const acceptList = computed<Array<string>>(() =>
    props.accept
      ?.split(',')
      .map((itm: string) => {
        itm = itm.trim();
        if (itm.startsWith('.')) {
          itm = itm.slice(1);
        }
        return itm;
      })
      .filter((t) => t)
  );

  async function handleClick() {
    if (mergedDisabled.value) {
      return;
    }
    const file = await chooseFile({
      accept: props.accept,
      maxSize: props.maxSize
    });
    const files = [];
    if (file) {
      files.push(file);
    }
    emit('choose-files', files);
  }

  async function handleDrop(event: DragEvent) {
    // 阻止事件的默认行为
    event.preventDefault();
    if (mergedDisabled.value) {
      return;
    }
    const type = event.type;
    switch (type) {
      case 'drop':
        // 文件进入并松开鼠标,文件边框恢复正常
        className.value = '';
        emit('choose-files', Array.from(event?.dataTransfer?.files ?? []));
        break;
      case 'dragleave':
        // 离开时边框恢复
        className.value = '';
        break;
      case 'dragenter':
        // 进入边框变为红色
        className.value = 'choose-file--dragenter';
        break;
    }
  }
</script>

<style lang="less" scoped>
  .choose-file {
    width: 100%;
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #dcdcdc;
    transition: background-color 0.3s;
    cursor: pointer;
    background: #fff;
  }
  .choose-file:hover, .choose-file--dragenter {
    background: #f3f2f4;
  }
  .choose-file--disabled{
    background: #fff!important;
    cursor: not-allowed;
  }
  .choose-file__log {
    width: 50px;
  }
  .choose-file__note {
    color: #333333;
    font-size: 14px;
    font-weight: bold;
  }
  .choose-file__accept {
    color: #333333;
    font-size: 14px;
    margin-top: 8px;
  }
</style>
