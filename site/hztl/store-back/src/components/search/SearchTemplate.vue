<template>
  <el-form
    class="form-search"
    size="small"
    :model="formData"
    :label-width="labelWidth"
  >
    <div class="search-layout">
      <div class="search-layout-left">
        <el-form-item
          label="关键字"
          label-width="56px"
          style="width: 330px; margin-right: 24px;"
        >
          <el-input
            v-model="formData.keyword"
            :placeholder="placeholderText"
          ></el-input>
        </el-form-item>
        <slot name="query">
          <el-button size="small" type="primary" @click="handleQuery">
            查询
          </el-button>
        </slot>
        <slot name="reset">
          <el-button size="small" @click="handleReset">重置</el-button>
        </slot>
        <el-button
          size="small"
          @click="searchSwitch = !searchSwitch"
          v-if="moreVisible"
        >
          更多筛选
          <i
            :class="searchSwitch ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
          ></i>
        </el-button>
      </div>
      <slot name="right"></slot>
    </div>
    <div class="search-box" v-show="searchSwitch">
      <slot name="more"></slot>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'SearchTemplate',
  props: {
    formData: Object,
    labelWidth: String,
    placeholderText: {
      type: String,
      default: '客户/办卡人名称/电话/卡号',
    },
    moreVisible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      searchSwitch: false,
    };
  },
  methods: {
    handleQuery() {
      this.$emit('handleQuery');
    },
    handleReset() {
      this.$emit('handleReset');
    },
  },
};
</script>

<style lang="less" scoped>
.form-search {
  background-color: #ffffff;
  /deep/ .el-form-item {
    display: inline-block;
    margin-bottom: 8px;
  }
  /deep/ .el-date-editor {
    max-width: 240px;
    .el-range-separator {
      padding: 0 2px;
      width: auto;
    }
    .el-range__close-icon {
      width: 16px;
    }
  }
  .search-layout {
    display: flex;
    align-items: center;
    .search-layout-left {
      flex: 1;
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .search-box {
    margin-top: @margin-size-main;
    padding: @padding-size-main @padding-size-main @padding-size-secondary;
    background-color: @bg-color-base;
    /deep/ .el-input {
      width: 204px;
    }
    /deep/ .clear-input-width {
      & > .el-input-group__prepend {
        .el-input {
          width: 100%;
        }
      }
    }
    /deep/ .el-date-editor {
      width: 204px;
    }
    /deep/ .el-form-item {
      .el-form-item__label {
        padding-right: 2px;
      }
    }
    /deep/ .input-with-select {
      width: 310px;
      display: flex;
      & > .el-input-group__prepend {
        // width: 196px;
        width: 196px;
        padding: 0;
        & > .el-select {
          width: 98px;
          // width: 68px;
          margin: 0;
          box-sizing: border-box;
          border-right: 1px solid #dcdfe6;
          &:last-child {
            border-right: none;
          }
          .el-input {
            width: auto;
          }
          .el-input--small .el-input__inner {
            height: 30px;
            line-height: 30px;
          }
        }
      }
      & > .el-input__inner {
        flex: 1;
      }
    }
  }
}
</style>
