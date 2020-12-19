<template>
  <div class="ht-button" :class="[typeClass, sizeClass]">
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
  @Prop() protected disabled!: boolean;
  @Prop() protected round!: boolean;

  get typeClass() {
    return `ht-button--${this.type}`;
  }

  get sizeClass() {
    return this.size ? `ht-button--${this.size}` : "";
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
.ht-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.ht-button--mini {
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
}
.ht-button--mini.is-round {
  padding: 7px 15px;
}
</style>
