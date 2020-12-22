<template>
  <div
    class="ht-button"
    @click="handleClick"
    :disabled="disabled || loading"
    :class="[
      type ? 'ht-button--' + type : '',
      size ? 'ht-button--' + size : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <slot>
      <button></button>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "HtButton"
})
export default class HtButton extends Vue {
  @Prop({ default: "default" }) protected type!: string;
  @Prop() protected size!: string;
  // @Prop({ default: "" }) protected icon!: string;
  @Prop({ type: Boolean }) protected loading!: boolean;
  @Prop({ type: Boolean }) protected disabled!: boolean;
  @Prop({ type: Boolean }) protected plain!: boolean;
  @Prop({ type: Boolean }) protected round!: boolean;
  @Prop({ type: Boolean }) protected circle!: boolean;

  // get typeClass() {
  //   return `ht-button--${this.type}`;
  // }

  // get sizeClass() {
  //   return this.size ? `ht-button--${this.size}` : "";
  // }

  protected handleClick(evt: Event) {
    this.$emit("click", evt);
  }
}
</script>

<style lang="scss" scoped>
.ht-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
// 类型
.ht-button--primary {
  color: #fff;
  background-color: $color-primary;
  border-color: $color-primary;
  &:hover {
    background-color: #f78c75;
    border-color: #f78c75;
  }
}
// 尺寸
.ht-button--medium {
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.ht-button--small {
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
}
.ht-button--mini {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
}
// 圆角
.ht-button.is-round {
  border-radius: 20px;
  padding: 12px 23px;
}
.ht-button--medium.is-round {
  padding: 10px 20px;
}
.ht-button--small.is-round {
  padding: 9px 15px;
}
.ht-button--mini.is-round {
  padding: 7px 15px;
}
// 禁用
.ht-button.is-disabled.is-plain,
.ht-button.is-disabled.is-plain:focus,
.ht-button.is-disabled.is-plain:hover {
  background-color: #fff;
  border-color: #ebeef5;
  color: #c0c4cc;
}
.ht-button.is-disabled,
.ht-button.is-disabled:focus,
.ht-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
.ht-button--primary.is-disabled,
.ht-button--primary.is-disabled:active,
.ht-button--primary.is-disabled:focus,
.ht-button--primary.is-disabled:hover {
  color: #fff;
  background-color: #fab6a7;
  border-color: #fab6a7;
}
// 文字按钮
.ht-button.is-disabled.ht-button--text {
  background-color: transparent;
}
.ht-button--text.is-disabled,
.ht-button--text.is-disabled:focus,
.ht-button--text.is-disabled:hover,
.ht-button--text:active {
  border-color: transparent;
}
</style>
