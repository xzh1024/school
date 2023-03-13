<template>
  <ht-dialog
    class="ignore-top-hotkeys"
    v-bind="$attrs"
    width="30%"
    title="添加适用车型-自定义（每行一个车型）"
    append-to-body
    v-on="$listeners"
    @closed="closeHandle"
  >
    <ht-input v-model="inputValue" type="textarea" rows="10" />
    <div slot="footer" class="dialog-footer-align">
      <el-button type="primary" size="mini" @click="cancleHandle">
        取消
      </el-button>
      <el-button type="primary" size="mini" @click="addHandle">
        添加
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
export default {
  name: "CostomVehModelBox",
  data() {
    return {
      inputValue: null
    };
  },
  methods: {
    addHandle() {
      let arr = this.inputValue.split("\n").filter(item => {
        return item && item.trim();
      });
      arr = arr.map(item => String(item).trim());
      this.$emit("on-add", arr);
      this.cancleHandle();
    },
    cancleHandle() {
      this.$emit("update:visible", false);
    },
    closeHandle() {
      this.inputValue = null;
    }
  }
};
</script>
