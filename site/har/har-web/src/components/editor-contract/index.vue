<template>
  <div class="editor-contract">
    <Toolbar
      v-if="!hideToolbar"
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
    />
    <Editor
      v-model="currentValue"
      :default-config="editorConfig"
      :style="{ height: bindPX(height) }"
      class="editor-contract__content"
      @on-created="onCreatedEditor"
      @on-change="onChangeEditor"
    />
    <a-modal
      v-model:visible="visible"
      title="修改字段"
      @cancel="visible = false"
      @before-ok="handleOk"
    >
      <a-form :model="editFormModel">
        <a-form-item field="field" label="字段Key">
          <a-input v-model="editFormModel.field" max-length="64" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
  export default {
    name: 'EditorContract'
  };
</script>
<script setup lang="ts">
  import {
    ref,
    watch,
    PropType,
    shallowRef,
    defineProps,
    onBeforeUnmount
  } from 'vue';
  import { NodeEntry } from 'slate';
  import { cloneDeep } from 'lodash';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import '@wangeditor/editor/dist/css/style.css'; // 引入 css
  import { Boot, IDomEditor } from '@wangeditor/editor';

  import { Field } from './interface';
  import { bindPX } from './utils/util';
  import registerModule from './utils/register-module';
  import { genEditorConfig, genToolbarConfig } from './config';

  import harTableModule from './elements/har-table';
  import harFieldModule from './elements/har-field';
  import harAddTextModule from './elements/har-add-text';
  import harDelTextModule from './elements/har-del-text';

  const emit = defineEmits(['update:value', 'change']);

  const props = defineProps({
    value: {
      type: String as PropType<string>,
      default: ''
    },
    // TPL
    mode: {
      type: String as PropType<string>,
      default: ''
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: 400
    },
    disabled: Boolean,
    hideToolbar: Boolean
  });

  const visible = ref(false);
  const toolbarConfig = genToolbarConfig(props.mode);
  const editorConfig = genEditorConfig(props.mode);
  const editFormModel = ref<Field>(new Field());
  const editEntry = ref();

  // @ts-ignore 全局应用只注册一次
  if (!Boot.registerContractTemplateConf) {
    // @ts-ignore
    Boot.registerContractTemplateConf = true;
    registerModule(harTableModule);
    registerModule(harFieldModule);
    registerModule(harAddTextModule);
    registerModule(harDelTextModule);
  }

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();

  // 内容 HTML
  const currentValue = ref('');

  watch(
    () => props.value,
    (v) => {
      currentValue.value = v;
    },
    { immediate: true }
  );

  watch(
    () => props.disabled,
    () => {
      if (props.disabled) {
        editorRef.value?.disable?.();
      } else {
        editorRef.value?.enable?.();
      }
    },
    { immediate: true }
  );

  watch(
    () => props.mode,
    () => {
      if (editorRef.value) {
        editorRef.value.mode = props.mode;
      }
    }
  );

  // 更新字段
  function handleOk(done: Function) {
    const update = editEntry.value?.[2];
    update?.(cloneDeep(editFormModel.value));
    done();
  }

  function handleEditField(entry: NodeEntry) {
    const [node] = entry;
    // @ts-ignore
    const info = cloneDeep(node.props.dataset.info);
    visible.value = true;
    editFormModel.value = info;
    editEntry.value = entry;
  }

  function onChangeEditor() {
    const value = editorRef.value.getHtml();
    emit('change', value);
    emit('update:value', value);
  }

  // 实例创建成功
  function onCreatedEditor(editor: IDomEditor & { mode: string }) {
    editorRef.value = editor;

    editor.setHtml(props.value);

    if (props.disabled) {
      editorRef.value?.disable?.();
    } else {
      editorRef.value?.enable?.();
    }

    editor.on('edit-field', handleEditField);
    editor.mode = props.mode;
  }

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;

    // const editorEl: HTMLDivElement = document.querySelector(
    //   `#` + `w-e-textarea-${editor.id.substr(editor.id.lastIndexOf('-') + 1)}`
    // );

    try {
      editor?.off?.('insert-module');
      editor?.destroy?.();
    } catch {}
  });
</script>

<style lang="less" scoped>
  .editor-contract {
    border: 1px solid #ccc;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .editor-contract--diff-mode {
    border-color: transparent;
    ::v-deep .w-e-text-container [data-slate-editor] {
      table {
        border-collapse: collapse;
        tbody {
          .har-table-cell {
            display: table-cell;
            > span {
              display: inline;
              > span {
                display: inline;
                > span {
                  display: inline;
                }
              }
            }
          }
        }
      }
    }
  }
  .editor-contract__content {
    flex-grow: 1;
    overflow-y: auto;
  }
</style>
