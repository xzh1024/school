<template>
  <flowable-viewer :xml="xml" :finished-info="flowViewer" />
</template>

<script setup lang="ts">
  import { FlowableViewer } from '@har/flowable';
  import '@har/flowable/lib/style.css';

  defineProps({
    xml: {
      type: String,
      default: ''
    },
    flowViewer: {
      type: Object
    }
  });
</script>
