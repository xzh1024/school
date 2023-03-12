<template>
  <span
    :class="codeDomName"
    :data-clipboard-text="staffInviteCode"
    style="color: #00A7FB; cursor: pointer;"
    class="ml-1"
    @click="copyCode"
    >{{ staffInviteCode }} 复制</span
  >
</template>

<script>
import Clipboard from "clipboard";

export default {
  name: "ClipboardCode",
  props: {
    staffInviteCode: {
      type: [String, Number],
      defualt: null
    },
    codeDomName: {
      type: String,
      defualt: null
    }
  },
  methods: {
    copyCode() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this;
      const clipboard = new Clipboard(`.${this.codeDomName}`);
      clipboard.on("success", function() {
        _this.$message.success({ message: "复制成功" });
        clipboard.destroy();
      });
      clipboard.on("error", function() {
        _this.$message.error({ message: "复制失败，请手动复制" });
        clipboard.destroy();
      });
    }
  }
};
</script>
