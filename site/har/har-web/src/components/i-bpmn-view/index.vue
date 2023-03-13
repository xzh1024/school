<template>
  <work-flowable
    v-if="xml"
    ref="refNode"
    :xml="xml"
    style="width: 0; height: 0; opacity: 0"
    @on-svg="onSvg"
  />
  <div id="wrapper"></div>
</template>

<script setup lang="ts">
  import { nextTick, onMounted, ref, watch } from 'vue';
  import { WorkFlowable } from '@har/flowable';
  const props = defineProps({
    xml: {
      type: String,
      default: ''
    }
  });

  const refNode = ref();
  function initXmlSvg() {
    if (props.xml) {
      nextTick(() => {
        refNode.value?.saveSVG();
      });
    }
  }

  function onSvg(path: string) {
    const box = document.querySelector('#wrapper');

    if (box) {
      box.innerHTML = '';
      const img = document.createElement('img');
      img.src = path;
      img.style.maxWidth = '100%';
      img.alt = 'xmlSVG';
      img.onload = function () {
        box.appendChild(img);
      };
    }
  }

  onMounted(() => {
    initXmlSvg();
  });

  watch(
    () => props.xml,
    () => {
      initXmlSvg();
    }
  );
</script>
