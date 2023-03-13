<template>
  <ht-dialog
    :visible.sync="relVisible"
    title="批量结算"
    width="950px"
    top="7vh"
    append-to-body
    class="ignore-top-hotkeys"
  >
    <batch-settle-center
      ref="refBatchSettle"
      :key-scope="keyScope"
      :visible="visible"
      v-bind="$attrs"
      v-on="$listeners"
      @dialog-close="handlerSettleRes"
    />
  </ht-dialog>
</template>
<script>
import hotkeys from "hotkeys-js";
import batchSettleCenter from "./batchSettleCenter";

let lastKeyScope;

export default {
  name: "BatchSettleCenterDialog",
  components: {
    batchSettleCenter
  },
  props: {
    visible: Boolean
  },
  data() {
    return {
      keyScope: Symbol("BatchSettleCenterDialog")
    };
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
    relVisible: {
      handler(value) {
        if (value) {
          lastKeyScope = hotkeys.getScope();
          setTimeout(() => {
            hotkeys.setScope(this.keyScope);
            this.$refs.refBatchSettle.updateFocusData({
              initial: "focus-button"
            });
            this.$refs.refBatchSettle.setDefaultDate();
          }, 100);
        } else {
          if (lastKeyScope) {
            hotkeys.setScope(lastKeyScope);
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    handlerSettleRes(res) {
      this.relVisible = false;
      this.$emit("settle-res", res);
    }
  }
};
</script>
