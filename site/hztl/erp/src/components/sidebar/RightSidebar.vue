<template>
  <div
    :style="{
      width: width,
      transform: useVisible
        ? 'translateY(-50%) translateX(0px)'
        : `translateY(-50%) translateX(${width})`
    }"
    class="sidebar-content"
  >
    <div class="sidebar-main">
      <slot />
    </div>
    <div class="sidebar-button-warp">
      <el-badge
        v-if="showSidebarNumber"
        :value="sidebarNumber"
        class="item siderbar-number"
      >
        <div class="sidebar-button" @click="toggleOpen">
          {{ sidebarName }}
        </div>
      </el-badge>
      <div v-else class="sidebar-button" @click="toggleOpen">
        {{ sidebarName }}
      </div>
    </div>
  </div>
</template>
<script>
import { isNumber } from "lodash";

export default {
  name: "RightSidebar",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "280px"
    },
    sidebarName: {
      type: String,
      required: true
    },
    sidebarNumber: {
      type: Number
    }
  },
  data() {
    return {
      useVisible: false
    };
  },
  computed: {
    showSidebarNumber() {
      return isNumber(this.sidebarNumber) && this.sidebarNumber;
    }
  },
  watch: {
    visible: {
      handler(value) {
        this.useVisible = value;
      },
      immediate: true
    }
  },
  methods: {
    toggleOpen() {
      this.useVisible = !this.useVisible;
      this.$emit("update:visible", this.useVisible);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.sidebar-content {
  height: 80vh;
  position: fixed;
  top: 52.5%;
  right: 0;
  background-color: $color-content-bg;
  @include background_color("color-content-bg");
  border: 1px solid $border-color-base;
  transition: transform 0.5s;
  width: 0;
  z-index: 2002;

  .sidebar-main {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: #f9f9f9;
  }

  .sidebar-button-warp {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%) translateX(-100%);
    overflow: hidden;

    .siderbar-number {
      ::v-deep .is-fixed {
        right: 2.5em;
        top: 1.2em;
      }
    }

    .sidebar-button {
      cursor: pointer;
      position: relative;
      font-size: 16px;
      color: #fff;
      width: 2em;
      padding: 0.5em;
      margin: 2em 0;

      &::before {
        content: "";
        width: 0;
        height: 100%;
        border: 2em solid;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        border-color: transparent rgba(23, 31, 36, 0.54) transparent transparent;
        z-index: -1;
      }
    }
  }

  .sidebar-card {
    ::v-deep .el-tabs__item {
      padding: 0 10px;
    }

    ::v-deep .el-tabs__active-bar {
      height: 1px;
    }
  }
}
</style>
