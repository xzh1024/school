<template>
  <view
    class="har-timeaxis__wrap"
    :style="{
      paddingTop: padding[0] || 0,
      paddingRight: padding[1] || 0,
      paddingBottom: padding[2] || padding[0] || 0,
      paddingLeft: padding[3] || padding[1] || 0,
      background: background
    }"
  >
    <slot></slot>
  </view>
</template>

<script>
  export default {
    name: "HarTimeaxis",
    provide() {
      return {
        timeaxis: this
      };
    },
    props: {
      padding: {
        type: Array,
        default() {
          return [];
        }
      },
      background: {
        type: String,
        default: "transparent"
      },
      leftWidth: {
        type: [Number, String],
        default: 0
      },
      width: {
        type: [Number, String],
        default: 48
      },
      lineWidth: {
        type: [Number, String],
        // #ifdef APP-NVUE
        default: 0.5,
        // #endif
        // #ifndef APP-NVUE
        default: 1
        // #endif
      }
    },
    watch: {
      width(val) {
        this.children.forEach((item) => {
          item.width = val;
        });
      },
      lineWidth(val) {
        this.children.forEach((item) => {
          item.lineWidth = val;
        });
      },
      leftWidth(val) {
        this.children.forEach((item) => {
          item.leftWidth = val;
        });
      }
    },
    created() {
      this.children = [];
    }
  };
</script>

<style scoped>
  .har-timeaxis__wrap {
    /* #ifndef APP-NVUE */
    width: 100%;
    box-sizing: border-box;
    /* #endif */
  }
</style>
