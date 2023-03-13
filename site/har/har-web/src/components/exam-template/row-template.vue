<template>
  <a-row>
    <template v-for="(it, i) in list || []" :key="`${it.type}_${i}`">
      <a-col :span="it.span || 24">
        <item-template :item="it" />
      </a-col>
    </template>
  </a-row>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import ItemTemplate from './item-template.vue';
  defineProps({
    list: {
      type: Array as PropType<any>,
      required: true
    }
  });
</script>
