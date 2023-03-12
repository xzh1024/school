<template>
  <div>
    <h4 class="title">{{ info.columnName }}</h4>
    <div class="item-box flex align-center justify-between">
      <div
        v-for="item in info.children"
        :key="item.id"
        class="each flex align-center"
      >
        <a-checkbox
          v-if="item.requireState === 2"
          v-model="item.checked"
          style="margin-right: 10px"
        />
        <span class="label" :class="{ required: item.requireState === 1 }">{{
          item.columnName
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  defineProps({
    info: {
      type: Object as PropType<Recordable>,
      default: () => {}
    },
    tempType: {
      type: Number,
      default: 1
    }
  });
</script>

<style scoped lang="less">
  .title {
    margin: 5px 0;
  }
  .item-box {
    flex-wrap: wrap;
  }
  .each {
    margin: 5px 0;
    width: 50%;
    color: #666666;
    .label {
      &.required {
        &::before {
          content: '*';
          margin-right: 3px;
          color: rgba(244, 121, 121);
        }
      }
    }
  }
</style>
