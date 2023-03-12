<template>
  <div class="set-card">
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
  name: 'SettingCard',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="less" scoped>
.set-card {
  .width-114 { width: 114px; }
  .width-166 { width: 166px; }
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
    .input-item {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: @margin-size-main;
      line-height: 32px;
      .input-label {
        margin-right: @margin-size-secondary;
      }
      .input-content {
        flex: 1;
        overflow-x: hidden;

        .el-input {
          max-width: 460px;
        }
        .el-date-editor {
          max-width: 256px;
        }
        .input-textarea {
          max-width: 460px;
          /deep/ .el-input__count {
            height: 29px;
            bottom: 2px;
            right: 10px;
          }
        }
        .el-radio {
          margin: 9px 24px 0 0;
          &:last-child {
            margin-left: 0;
          }
          /deep/ .el-radio__label {
            padding-left: 4px;
          }
        }
        .input-assist {
          display: inline-block;
          line-height: 20px;
          font-size: 12px;
          color: #999999;
        }
      }
    }
  }
}
</style>
