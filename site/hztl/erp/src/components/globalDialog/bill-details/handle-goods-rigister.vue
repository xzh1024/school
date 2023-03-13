<template>
  <HandleRigisterBox
    :visible.sync="relVisible"
    :register-id="registerId"
    append-to-body
    is-check
  />
</template>

<script>
import { HandleRigisterBox } from "@/views/store/logistics-register/handleTab/components";

export default {
  name: "HandleGoodsRigisterDialog",
  components: { HandleRigisterBox },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    registerId: {
      type: Number,
      required: true
    }
  },
  computed: {
    relVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    }
  },
  watch: {
    visible: {
      handler(val, oldVal) {
        if (val) {
          this.loadData();
        } else if (oldVal) {
          this.clearData();
        }
      }
    }
  }
};
</script>
