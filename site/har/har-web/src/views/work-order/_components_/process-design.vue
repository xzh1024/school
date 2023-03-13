<template>
  <a-drawer
    :visible="visible"
    title="流程设计"
    width="100%"
    unmount-on-close
    @cancel="reset"
    @ok="onSave"
  >
    <div class="flowable-wrapper">
      <flowable-viewer
        v-if="visible && xml"
        class="flowable-design"
        :xml="xml"
        :finished-info="{}"
        @item-click="onItemClick"
      />
      <div class="flowable-panel">
        <h3>节点设置</h3>
        <process-form
          v-if="visible && xml"
          v-model:data="currentNodeData"
          :node="currentNode"
          :apply-scope="workerInfo.applyScope"
        />
      </div>
    </div>
    <i-loading :loading="loading" />
  </a-drawer>
</template>
<script setup lang="ts">
  import { FlowableViewer } from '@har/flowable';
  import '@har/flowable/lib/style.css';
  import {
    cbdApiProjectEstateWorkOrderTemplateUpdateOtherPut,
    cbdApiProjectEstateWorkOrderTemplateInfoIdGet
  } from '@/api';
  import ILoading from '@/components/i-loading/index.vue';
  import { computed, PropType, reactive, ref, watch } from 'vue';
  import ProcessForm from './process-form.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { Message } from '@arco-design/web-vue';
  import { xml2json } from 'xml-js';
  import { isStartElement, isTaskElement } from './process-dic';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object as PropType<any>,
      default: () => {}
    }
  });
  const emits = defineEmits(['update:modelValue', 'reset']);

  function reset() {
    visible.value = false;
    xml.value = '';
    xmlJson.value = {};
    formData = {};
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
  let formData = reactive<{ [key: string]: unknown }>({});
  const currentNodeData = computed(() => {
    console.log(currentNode.value);
    return currentNode.value ? formData[currentNode.value.attrs.id] || {} : {};
  });
  const xml = ref(``);

  type XmlElementItemType = {
    type: string;
    name: string;
    attributes: {
      id: string;
      name: string;
      sourceRef: string;
      targetRef: string;
    };
    elements: XmlElementItemType[];
    text: string;
  };

  type XmlJsonItemType = {
    id?: string;
    type: string;
    from: string;
    to: string;
  };

  type XmlJsonType = {
    [key: string]: XmlJsonItemType;
  };

  const xmlJson = ref<XmlJsonType>({});
  const defaultConfig = {
    nodeId: '',
    nodeEvent: '',
    startNodeProcessor: '',
    processor: '',
    processorType: '',
    assignRule: '',
    assignMsgType: '',
    nodeAging: '',
    interimNoticeTime: '',
    timeoutHandler: '',
    timeoutHandlerProcessor: ''
  };
  function getXmlObject(arr: XmlElementItemType[]) {
    const obj = {} as XmlJsonType;
    arr.forEach((item) => {
      const isLine = item.name.endsWith('sequenceFlow');
      const itemObj = {
        type: item.name,
        from: '',
        to: '',
        name: item.name,
        attrs: item.attributes,
        preEl: null
      } as {
        type: string;
        from: string;
        to: string;
        name: string;
        attrs: unknown;
      };
      if (isLine) {
        itemObj.from = item.attributes.sourceRef;
        itemObj.to = item.attributes.targetRef;
      } else {
        // console.log(item);
        if (isStartElement(item.name) || isTaskElement(item.name)) {
          const nodeName = item.name.endsWith('startEvent')
            ? '发起'
            : item.name.endsWith('endEvent')
            ? '结束'
            : '处理';
          const findItem =
            workerInfo.value.nodeData?.find(
              ({ nodeId }: { nodeId: string }) => nodeId === item.attributes?.id
            ) || {};
          formData[item.attributes.id] = {
            ...defaultConfig,
            ...findItem,
            nodeId: item.attributes.id,
            nodeName,
            nodeEvent: nodeName
          };
        }
        item.elements &&
          item.elements.forEach((sub) => {
            if (sub.name.endsWith('incoming')) {
              itemObj.from = sub.elements[0].text;
            } else {
              itemObj.to = sub.elements[0].text;
            }
          });
      }
      obj[item.attributes.id] = itemObj;
    });
    xmlJson.value = obj;
  }

  // function getPreElement(item: XmlJsonItemType) {
  //   console.log(item.from, xmlJson.value);
  //   let res = { ...item } as XmlJsonItemType | '';
  //   for (let i = 2; i >= 0; i--) {
  //     res = getPreItem(res);
  //   }

  //   function getPreItem(data: XmlJsonItemType | '') {
  //     if (!data) return '';
  //     if (data.id) {
  //       return xmlJson.value[data.id];
  //     } else {
  //       return xmlJson.value[data.from];
  //     }
  //   }
  //   return res;
  // }

  function getXmlJson() {
    // console.log(xml.value);
    const json = JSON.parse(xml2json(xml.value));
    // console.log(json);

    getXmlObject(json.elements[0].elements[0].elements);
  }

  const currentNode = ref();
  function onItemClick(event: XmlJsonItemType | null) {
    if (event) {
      console.log(event, xmlJson);

      currentNode.value = xmlJson.value[event.id || ''];

      // const res = getPreElement(event);
      // // console.log(res);

      // if (res && ['bpmn2:task', 'bpmn2:userTask'].includes(res.type)) {
      //   console.log('展示panel');
      // } else {
      //   console.log('非任务节点，不展示内容');
      // }
    }
  }

  const workerInfo = ref();
  const [getBpmn] = useFuncProxy(async () => {
    if (!props.row.id || !props.modelValue) return;
    const d = await cbdApiProjectEstateWorkOrderTemplateInfoIdGet({
      id: props.row.id
    });
    workerInfo.value = d;
    xml.value = d.bpmnXml || '';
    getXmlJson();
    // console.log(xml.value);
  });

  const [onSave, loading] = useFuncProxy(async () => {
    await cbdApiProjectEstateWorkOrderTemplateUpdateOtherPut({
      id: props.row.id,
      // @ts-ignore
      nodeData: Object.values(formData).map((item: any) => {
        console.log(item);
        return {
          id: props.row.id,
          nodeId: item.nodeId,
          nodeName: item.nodeName,
          nodeEvent: item.nodeEvent,
          startNodeProcessor: item.startNodeProcessor || [],
          processor: item.processor || [],
          processorType: item.processorType,
          assignRule: 1 || item.assignRule,
          assignMsgType: item.assignMsgType,
          nodeAging: item.nodeAgingState ? item.nodeAging : '',
          interimNoticeTime: item.interimNoticeTimeState
            ? item.interimNoticeTime
            : '',
          timeoutHandler: item.timeoutHandlerState ? item.timeoutHandler : '',
          timeoutHandlerProcessor:
            item.timeoutHandlerState && item.timeoutHandler === 3
              ? item.timeoutHandlerProcessor
              : ''
        };
      })
    });

    Message.success('操作成功!');
    visible.value = false;
    emits('reset');
  });

  watch(
    () => props.modelValue,
    (value) => {
      if (value) {
        getBpmn();
      }
    }
  );
</script>

<style lang="less">
  .flowable-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-shrink: 0;
    justify-content: space-between;
  }

  .flowable-panel {
    width: 350px;
  }

  .flowable-design {
    flex: 1;
  }
</style>
