<template>
  <div class="parts-search bg-color-white">
    <el-form
      :model="searchForm"
      size="mini"
      label-width="100px"
      class="form-item-small-margin-bottom "
    >
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="配件名称：">
            <el-input
              v-model="searchForm.name"
              clearable
              placeholder="ERP/原厂/标准名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="配件品牌：">
            <el-input
              v-model="searchForm.brand"
              clearable
              placeholder="配件品牌"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="配件编码：">
            <el-input
              v-model="searchForm.code"
              clearable
              placeholder="配件编码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div>
            <el-button type="primary" size="mini" @click="handleQuery">
              查询
            </el-button>
            <el-button type="primary" size="mini" @click="resetSearchForm">
              清空条件
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    searchForm: {
      type: Object,
      required: true
    }
  },
  methods: {
    resetSearchForm() {
      this.$emit("resetSearchForm");
    },
    handleQuery() {
      this.$emit("handleQuery");
    }
  }
};
</script>

<style lang="less" scoped>
.parts-search {
  margin: 4px 0;
  padding: 8px 8px 0;
  border-radius: 4px;
}
</style>
