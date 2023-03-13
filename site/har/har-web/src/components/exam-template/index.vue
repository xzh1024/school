<template>
  <div class="i-card">
    <template v-for="(item, idx) in list" :key="idx">
      <item-template :item="item" :detail-data="props.data">
        <template v-for="slot in Object.keys(slots)" #[slot]="row">
          <slot
            :name="slot"
            :record="row.record"
            :row-index="row.rowIndex"
            :column="row.column"
          />
        </template>
      </item-template>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed, getCurrentInstance, PropType, Ref } from 'vue';
  import ItemTemplate from './item-template.vue';
  const props = defineProps({
    list: {
      type: Array as PropType<any>,
      default: () => []
    },
    data: {
      type: Object as PropType<any>,
      default: () => {}
    }
  });
  const instance = getCurrentInstance();
  const slots: Ref = computed(() => {
    return instance?.slots;
  });
</script>

<style scoped lang="less"></style>
