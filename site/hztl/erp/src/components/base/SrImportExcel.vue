<template>
  <ht-dialog v-bind="$attrs" title="导入" v-on="$listeners">
    <el-button type="primary" size="mini" @click="sureHandle">
      确定
    </el-button>
  </ht-dialog>
</template>
<script>
export default {
  name: "SrImportExcel",
  props: {},
  data() {
    return {};
  },
  methods: {
    hide() {
      this.$emit("update:visible", false);
    },
    sureHandle() {
      this.hide();
      this.$emit("on-sure", { test: "import" });
    }
  }
};
</script>
