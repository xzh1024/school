<template>
  <a-form
    ref="formRef"
    :model="formModel"
    :rules="formRules"
    layout="vertical"
    class="form-vertical"
  >
    <div>
      <a-divider orientation="left">基本信息</a-divider>
      <a-row>
        <a-col :span="8">
          <a-form-item field="name" label="模板名称">
            <a-input
              v-model="formModel.name"
              placeholder="请输入模板名称"
              max-length="64"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </div>
    <div>
      <a-divider orientation="left">
        <a-space>
          <span>模板内容</span>
          <a-button size="mini" @click="handleImport">上传</a-button>
        </a-space>
      </a-divider>
      <div>
        <editor-contract
          ref="editorContractRef"
          v-model:value="formModel.content"
          mode="TPL"
        />
      </div>
    </div>
  </a-form>
</template>

<script setup lang="ts">
  import { ref, watch, PropType, defineProps, defineExpose } from 'vue';
  import { cloneDeep } from 'lodash';
  import { Message, FieldRule } from '@arco-design/web-vue';
  // @ts-ignore
  import mammoth from 'mammoth/mammoth.browser.min.js';

  import { assignDeep } from '@/utils';
  import { IFormModel, FormModel } from '../interface';
  import EditorContract from '@/components/editor-contract/index.vue';

  const emit = defineEmits(['update:modelValue', 'reset', 'close']);

  const props = defineProps({
    data: {
      type: Object as PropType<IFormModel>,
      default: () => ({})
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    // ADD = '新增', EDIT = '修改'
    type: {
      type: String as PropType<'ADD' | 'EDIT'>,
      default: 'ADD'
    }
  });

  const formRef = ref();
  const formModel = ref<IFormModel>(new FormModel());
  const formRules = {
    name: [{ required: true }]
  };

  watch(
    () => props.data,
    (data: IFormModel) => {
      assignDeep(formModel, data);
    }
  );

  function handleImport() {
    const accept = ['.doc', '.docx'];
    const inputEl = document.createElement('input');
    inputEl.type = 'file';
    inputEl.accept = accept.join(',');
    inputEl.click();
    inputEl.addEventListener('change', function (event: Event) {
      const file = this.files?.[0];
      if (!file) {
        return;
      }
      //判断文件类型代码
      const { name } = file;
      const nameLen = name.length;
      const hzIndex = name.lastIndexOf('.');
      //获取后缀名
      const hz = name.substring(hzIndex, nameLen);
      if (!accept.includes(hz)) {
        Message.warning('只支持doc|docx格式的文档');
        return;
      }
      const reader = new FileReader();
      reader.onload = function (loadEvent) {
        if (loadEvent.target) {
          const arrayBuffer = loadEvent.target.result;
          mammoth
            .convertToHtml({ arrayBuffer: arrayBuffer as ArrayBuffer })
            .then(function (res?: { value: string }) {
              if (res) {
                formModel.value.content = res.value;
              }
            })
            .done();
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  function getFormModel() {
    return cloneDeep(formModel.value);
  }
  function resetFields() {
    formRef.value.resetFields();
  }
  async function validate() {
    const error = await formRef.value.validate();
    if (error) {
      return Promise.reject(error);
    }
    return getFormModel();
  }
  defineExpose({
    validate,
    resetFields,
    getFormModel
  });
</script>

<style lang="less"></style>
