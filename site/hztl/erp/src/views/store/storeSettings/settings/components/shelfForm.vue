<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    :disabled="formDisabled"
    :show-message="false"
    label-position="left"
    label-width="71px"
    size="mini"
    class="form-item-small-margin-bottom warehouse-edit "
  >
    <el-form-item label="货架编号" prop="name">
      <ht-input ref="inputRef" v-model="formData.name" maxlength="10" />
    </el-form-item>
  </el-form>
</template>
<script>
import { reqGetStoreShelve } from "@/api/store/settings";
import eventBus from "@/event";
export default {
  name: "ShelfForm",
  props: {
    id: {
      type: Number,
      default: 0
    },
    showDisableReason: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formDisabled: false,
      formData: {},
      rules: {
        name: [{ required: true, message: "请输入货区名称", trigger: "blur" }]
      }
    };
  },
  watch: {
    id(val) {
      this.updateFormData(val);
    }
  },
  mounted() {
    this.updateFormData(this.id);
    eventBus.$on("infoFormFocus", this.focus);
  },
  destroyed() {
    eventBus.$off("infoFormFocus", this.focus);
  },
  methods: {
    focus() {
      this.$refs.inputRef.focus();
    },
    updateFormData(id) {
      if (id == 0) {
        return;
      }
      this.formDisabled = true;
      this.$refs["formRef"].clearValidate();

      reqGetStoreShelve(id).then(baseData => {
        this.formData = baseData;
        this.formDisabled = baseData.isBuiltin;
        this.$emit("canHandleDelete", baseData.isBuiltin);
        this.$nextTick(() => {
          this.$refs["formRef"] && this.$refs["formRef"].clearValidate();
        });
      });
    },
    validate(cb) {
      this.$refs["formRef"].validate(cb);
    }
  }
};
</script>
<style lang="stylus" scoped>
.warehouse-edit
    width 300px
</style>
