<template>
  <div class="dp-card">
    <div class="dp-card-header" v-if="title" @click="clickHead">
      <div class="dp-card-header-title">{{ title }}</div>
      <slot name="headerAfter"></slot>
    </div>
    <div class="dp-card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DpCard",
  props: {
    title: String
  },
  methods: {
    clickHead() {
      this.$emit("clickHead");
    }
  }
};
</script>

<style lang="less" scoped>
.dp-card {
  padding: 12px;
  border-radius: 8px;
  background-color: #ffffff;
  color: #333333;
  .dp-card-header {
    display: flex;
    .dp-card-header-title {
      flex: 1;
      font-size: 16px;
      font-weight: 700;
      line-height: 22px;
    }
  }
}
</style>
