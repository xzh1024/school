<template>
  <div class="outer-container flex-container">
    <div class="header">
      <div class="header-breadcrumb">
        <i class="el-icon-s-home home-icon" />
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item v-for="(item, key) in breadcrumbList" :key="key">
            {{ item }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="header-options">
        <slot name="options" />
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "StoreTpl",
  props: {
    nodeData: {
      type: Object,
      default: () => {
        return {
          data: {
            id: 0
          }
        };
      }
    }
  },
  computed: {
    breadcrumbList() {
      const list = [];
      this.traverseTreeGetPath(this.nodeData, list);
      if (this.nodeData.data && this.nodeData.data.name) {
        list.push(this.nodeData.data.name);
      }
      return list;
    },
    currentId() {
      let id = 0;
      if (this.nodeData.data) {
        id = this.nodeData.data.id;
      }
      return id;
    }
  },
  methods: {
    traverseTreeGetPath(obj, list) {
      if (obj.parent && obj.parent.data) {
        list.unshift(obj.parent.data.name);
        this.traverseTreeGetPath(obj.parent, list);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.outer-container {
  height: 100%;
  flex-direction: column;
  .content {
    padding: 10px;
    height: 1px;
    flex: auto;
    overflow: auto;
  }
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    background-color: $color-base-background;
    @include background_color("color-base-background");
    .header-breadcrumb {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: $color-primary;
      @include font_color("color-primary");
      .home-icon {
        font-size: 16px;
        padding: 0 10px;
      }
      .breadcrumb {
        display: inline-block;
        ::v-deep.el-breadcrumb__inner,
        ::v-deep.el-breadcrumb__separator {
          color: inherit;
        }
      }
    }
  }
}
</style>
