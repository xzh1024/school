<template>
  <a-card v-bind="cardOption">
    <template #actions>
      <slot name="actions"></slot>
    </template>
    <template #cover>
      <slot name="cover"></slot>
    </template>
    <template #extra>
      <slot name="extra"></slot>
    </template>
    <template #title>
      <slot name="title">{{ props.title }}</slot>
    </template>
    <slot></slot>
  </a-card>
</template>

<script lang="ts">
  export default {
    name: 'ICard'
  };
</script>

<script setup lang="ts">
  import cardJson from '@/config/card.json';
  import { computed } from 'vue';

  const props = defineProps({
    title: String
  });
  const cardOption = computed(() => {
    return cardJson;
  });
</script>
