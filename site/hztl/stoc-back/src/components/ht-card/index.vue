<template>
  <el-card
    :class="{
      'no-padding': noPadding,
      'no-background': noBackground,
      'box-card': true
    }"
  >
    <div v-if="title" slot="header" class="title-box">
      <span class="title">{{ title }}</span>
      <el-popover v-if="tips" placement="top" width="500" trigger="click">
        <p v-html="tips"></p>
        <i
          slot="reference"
          style="cursor:pointer;"
          class="el-icon-question"
        ></i>
      </el-popover>
      <div class="after-title">
        <slot name="after-title" />
      </div>
    </div>
    <slot />
  </el-card>
</template>

<script>
export default {
  name: "HtCard",
  componentName: "HtCard",
  props: {
    title: {
      type: String,
      default() {
        return "";
      }
    },
    noPadding: {
      type: Boolean,
      default() {
        return false;
      }
    },
    noBackground: {
      type: Boolean,
      default() {
        return false;
      }
    },
    tips: {
      type: String,
      default() {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$color-primary: #3aa7ff;
$main-padding-size: 10px;

.box-card {
  border-radius: 5px;
  box-shadow: none;
  border: none;
  border-radius: 6px;
  flex: none;

  ::v-deep .el-card__body {
    padding: 10px;
  }

  &.no-background {
    background: transparent;
    height: 100% !important;
  }

  ::v-deep > .el-card__header {
    flex: none;
    padding: 8px;
    position: relative;
  }

  &.auto-card {
    flex: auto;
    margin-bottom: 0 !important;
    height: 100%;
    display: flex;
    flex-direction: column;

    ::v-deep > .el-card__header {
      flex: none;
      padding: 8px;
    }

    ::v-deep > .el-card__body {
      flex: auto;
      padding: $main-padding-size;
      height: 1px;
    }
  }

  &.no-padding {
    ::v-deep > .el-card__body {
      padding: 0;
    }
  }

  .title {
    position: relative;
    padding-left: 10px;
    font-size: 16px;

    &::before {
      position: absolute;
      left: 0;
      top: 5px;
      display: inline-block;
      content: "";
      width: 4px;
      background: $color-primary;
      height: 14px;
      margin-right: 5px;
      border-radius: 100px;
    }
  }
}

.title-box {
  display: flex;
  align-items: flex-end;

  .title {
    flex: none;
  }

  .after-title {
    flex: auto;
    // height: 100%;
  }
}
</style>
