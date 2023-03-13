<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
    />
    <Editor
      v-model="valueHtml"
      style="height: 500px; overflow-y: hidden"
      :default-config="editorConfig"
      @on-created="handleCreated"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'IEditor'
  };
</script>

<script lang="ts" setup>
  import '@wangeditor/editor/dist/css/style.css'; // 引入 css

  import { onBeforeUnmount, shallowRef, Ref, computed } from 'vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import { customOssRequest } from '@/utils/oss-upload';

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue']);
  // 内容 HTML
  const valueHtml: Ref<string> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const toolbarConfig = {
    excludeKeys: ['group-video']
  };
  const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        // 自定义上传
        async customUpload(file: File, insertFn: any) {
          // file 即选中的文件
          // 自己实现上传，并得到图片 url alt href
          // 最后插入图片
          console.log(file, 'file');
          try {
            const res = await customOssRequest(file);
            insertFn(res?.url);
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  };

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });

  const handleCreated = (editor: any) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };
</script>
