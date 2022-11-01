<template>
  <view
    class="base-tab-pane"
    v-if="!lazy || loaded || active"
    :class="{ 'z-hide': !active }"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: "BaseTabPane",
  props: {
    /** 与选项卡model对应的标识符，表示选项卡别名 */
    name: {
      type: String | Number,
      default: "",
    },
    /** 选项卡标题 */
    label: {
      type: String,
      default: "",
    },
    /** 是否禁用 */
    disabled: Boolean,
    /** 标签是否延迟渲染- */
    lazy: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // 序号
      index: null,
      private: false,
    };
  },
  computed: {
    snTab() {
      let parent = this.$parent;
      while (parent && parent.$options && parent.$options.name !== "BaseTab") {
        parent = parent.$parent;
      }
      return parent;
    },
    currentName() {
      return this.snTab && this.snTab.currentName;
    },
    paneName() {
      return this.name || this.index;
    },
    active() {
      let ret = this.currentName === this.paneName;
      if (ret) {
        this.loaded = true;
      }
      return ret;
    },
  },
};
</script>

<style lang="scss" scoped>
.base-tab-pane {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &.z-hide {
    z-index: -1;
    opacity: 0;
    visibility: hidden;
  }
}
</style>