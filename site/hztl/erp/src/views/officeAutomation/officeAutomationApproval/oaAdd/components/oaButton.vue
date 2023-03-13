<template>
  <button
    class="oa-button"
    @click="handleClick"
    :disabled="disabled"
    :style="buttonStyle"
  >
    <i class="iconfont" :class="[iconClass]" :style="iconStyle"></i>
    <span class="oa-button-text">{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({ name: "PaymentReceivedDialog" })
export default class PaymentReceivedDialog extends Vue {
  @Prop() protected iconClass!: string;
  @Prop() protected text!: string;
  @Prop({ type: Boolean }) protected disabled!: boolean;
  @Emit("click") handleClick(evt: Event) {
    return evt;
  }

  get buttonStyle() {
    let cursor = "pointer";
    if (this.disabled) {
      cursor = "not-allowed";
    }
    return {
      cursor
    };
  }

  get iconStyle() {
    let style = {};
    if (this.disabled) {
      style = {
        color: "#AAB2B7",
        backgroundColor: "#F5F5F5"
      };
    }
    return style;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.oa-button {
  display: block;
  width: 212px;
  height: 80px;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  user-select: none;
  &:hover {
    border-color: $color-primary;
    @include border_color("color-primary");
  }
  .iconfont {
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    margin-right: 10px;
    border-radius: 50% 50%;
    font-size: 32px;
    color: $color-primary;
    @include font_color("color-primary");
    background-color: rgba($color-primary, 0.1);
    @include background_color("color-primary", 0.1);
  }
  .oa-button-text {
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
