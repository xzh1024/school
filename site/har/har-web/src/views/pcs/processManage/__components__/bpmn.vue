<template>
  <a-drawer
    :visible="visible"
    title="流程设计"
    width="100%"
    :footer="false"
    @cancel="reset"
  >
    <work-flowable
      v-if="visible"
      ref="refNode"
      :user-options="userOptionsList"
      :role-options="roleOptionsList"
      :dept-options="deptOptionsList"
      :process-id="row.key"
      :process-name="row.name"
      :xml="xml"
      @on-save="onSave"
      @on-svg="onSvg"
    />
    <i-loading :loading="loading" />
  </a-drawer>
</template>
<script setup lang="ts">
  import { WorkFlowable } from '@har/flowable';
  import '@har/flowable/lib/style.css';
  import ILoading from '@/components/i-loading/index.vue';
  import { computed, onMounted, PropType, ref, watch } from 'vue';
  import {
    flowableEngineModelSaveBpmnPost,
    flowableEngineModelBpmnIdGet
  } from '@/api/flowable-engine';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { Message, Modal } from '@arco-design/web-vue';
  import { useOptions } from '../hooks/useOptions';
  const {
    userOptionsList,
    roleOptionsList,
    deptOptionsList,
    getUserOptionList,
    getRoleOptionList,
    getDeptOptionList
  } = useOptions();

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object as PropType<{ id: string; key: string; name: string }>,
      default: () => {}
    }
  });
  const emits = defineEmits(['update:modelValue', 'reset']);

  function reset() {
    visible.value = false;
    xml.value = '';
    emits('reset');
  }

  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });

  const xml = ref('');

  function onSave(str: string) {
    // console.log(props.rowId, xml);
    // console.log(xml.value);
    // if (str.indexOf('startEvent') !== str.lastIndexOf('startEvent')) {
    //   Message.error('一个流程只能有一个开始任务');
    //   return;
    // }
    // if (str.indexOf('endEvent') !== str.lastIndexOf('endEvent')) {
    //   Message.error('一个流程只能有一个结束任务');
    //   return;
    // }

    if (xml.value === '') {
      onSaveBpmn({ xml: str });
    } else {
      Modal.open({
        title: '确认',
        content: '是否保存为新版本？',
        onOk: () => {
          onSaveBpmn({ xml: str, newVersion: true });
        },
        onCancel: () => {
          onSaveBpmn({ xml: str, newVersion: false });
        }
      });
    }
  }

  function onSvg(path: string) {
    const box = document.querySelector('#wrapper');

    if (box) {
      box.innerHTML = '';
      const img = document.createElement('img');
      img.src = path;
      img.classList.add('img');
      img.alt = 'xmlSVG';
      box.appendChild(img);
    }
  }

  const [getBpmn] = useFuncProxy(async () => {
    // console.log(props.row);
    if (!props.row.id || !props.modelValue) return;
    const d = await flowableEngineModelBpmnIdGet({
      id: props.row.id
    });
    xml.value = d || '';
    console.log(xml.value);
  });

  const [onSaveBpmn, loading] = useFuncProxy(
    async (params: { xml: string; newVersion: boolean }) => {
      const d = await flowableEngineModelSaveBpmnPost({
        id: props.row.id,
        ...params
      });

      Message.success('操作成功!');
      visible.value = false;
      emits('reset');
    }
  );

  watch(
    () => props.modelValue,
    () => {
      getBpmn();
    }
  );

  onMounted(() => {
    getUserOptionList();
    getRoleOptionList();
    getDeptOptionList();
  });
</script>

<style lang="less">
  .img {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 10000;
  }

  .test-bpmn {
    width: 100%;
    height: 100%;
  }
</style>
