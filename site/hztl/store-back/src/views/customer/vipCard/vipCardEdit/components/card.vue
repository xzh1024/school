<template>
  <div class="card">
    <div class="card-title" v-if="title">
      {{ title }}
      <div class="card-title-line"></div>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  .card-title {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: @strong;
    margin-bottom: @margin-size-main;
    .card-title-line {
      flex: 1;
      height: 0;
      border-bottom: 1px dashed @border-color-base;
      margin-left: @margin-size-secondary;
    }
  }
  .card-body {
    margin-bottom: @margin-size-main;
  }
}
</style>
