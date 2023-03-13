<template>
  <ht-dialog v-bind="$attrs" title="客户邀请码" width="400px" v-on="$listeners">
    <el-carousel :autoplay="false" trigger="click" indicator-position="outside">
      <el-carousel-item v-for="(item, index) in list" :key="index">
        <div class="custrom-code-box">
          <span class="code-title"
            >{{ item.name }}
            <span v-if="!item.sourceName"
              >( {{ index + 1 }} / {{ list.length }} )</span
            >
          </span>
          <span class="source-title">{{ item.sourceName }}</span>
          <custrom-qr-codes :key="index" :item="item" :doms="index" />
          <div class="code-and-copy-box">
            <span>{{ item.code }}</span>
            <el-button
              :class="'copy' + index"
              :data-clipboard-text="item.code"
              type="text"
              size="mini"
              @click="copyCode(index)"
            >
              复制邀请码
            </el-button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="dialog-footer-align">
      <el-button type="primary" size="mini" plain @click="cancelHandle">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>
<script>
import CustromQrCodes from "./CustromQrCodes";
import Clipboard from "clipboard";
import hotkeys from "hotkeys-js";

let oldKeyScope;

export default {
  name: "InvitationCode",
  components: { CustromQrCodes },
  props: {
    inviteCodes: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      keyScope: Symbol("InvitationCode"),
      copyBtn: null
    };
  },
  computed: {
    list() {
      if (!this.inviteCodes || !this.inviteCodes.length) return;
      const arr = this.inviteCodes.map(item => {
        return { ...item, code: item.invitationCode };
      });
      return arr;
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldVale) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          setTimeout(() => {
            hotkeys.setScope(this.keyScope);
          });
        } else if (oldVale) {
          hotkeys.setScope(oldKeyScope);
        }
      },
      immediate: true
    }
  },
  mounted() {
    hotkeys("*", { scope: this.keyScope }, (e, handler) => {
      switch (handler.key) {
        default:
          return;
      }
    });
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    cancelHandle() {
      this.$emit("update:visible", false);
    },
    copyCode(index) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this;
      const clipboard = new Clipboard(`.copy${index}`);
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
<style lang="stylus" scoped>
.custrom-code-box
    text-align center
    background #FBFBFB
    border 1px solid #D9D9D9
    border-radius 6px
    height 100%
    .code-title
        display inline-block
        padding 10px 0 4px 0
        font-size 14px
        color #171F24
        margin-top 10px
    .source-title
        display block
        font-size 12px
        color #171F24
        padding 0 0 16px 0
    .code-and-copy-box
        font-size 14px
        span
            display block
            padding 10px 0
    /deep/  img
                max-width 124px !important
                margin 0 auto
</style>
