<template>
  <div class="collapse-box">
    <div class="collapse-content">
      <slot />
      <el-collapse-transition>
        <div v-if="relIsCollapse">
          <slot name="collapse" />
        </div>
      </el-collapse-transition>
    </div>
    <div class="collapse-append">
      <div class="collapse-slot-state">
        <slot name="state" />
      </div>
      <div class="collapse-text" type="text" @click="toggleCollapse">
        {{ relIsCollapse ? "收起" : "展开" }}更多
        <span
          :class="relIsCollapse ? 'arrow-active-up' : 'arrow-active-down'"
          class="upDownarrow"
        >
          <i class="el-icon-caret-top" />
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Collapse",
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      relIsCollapse: this.isCollapse
    };
  },
  watch: {
    isCollapse(value) {
      this.relIsCollapse = value;
    }
  },
  methods: {
    toggleCollapse() {
      this.relIsCollapse = !this.relIsCollapse;
      this.$emit("update:isCollapse", this.relIsCollapse);
      this.$emit("collapseChange", this.relIsCollapse);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.collapse-box {
  display: flex;

  .collapse-content {
    flex: 1;
  }

  .collapse-append {
    margin-left: 5px;
    text-align: left;
    display: flex;
    flex-direction: column;
    overflow-x: visible;

    .collapse-slot-state {
      flex-grow: 1;
      margin-top: 0;
    }

    .collapse-text {
      margin: -7px 0 0 4px;
      font-size: 14px;
      color: #3aa7ff;
      @include font_color("color-primary");
      cursor: pointer;
      width: 75px;
      height: 32px;
      line-height: 32px;

      .upDownarrow {
        display: inline-block;
        width: 10px;
        transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
      }

      .arrow-active-up {
        transform: rotate(0deg);
        transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
      }

      .arrow-active-down {
        transform: rotate(-180deg);
        transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
      }
    }
  }
}
</style>
