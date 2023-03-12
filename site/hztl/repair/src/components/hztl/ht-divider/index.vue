<template>
  <div class="ht-divider" :class="isDirection">
    <div class="ht-divider-text" :class="isContentPosition">
      <slot v-if="direction === 'horizontal'" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "HtDivider"
})
export default class HtCard extends Vue {
  @Prop({ default: "horizontal" }) protected direction!: string;
  @Prop({ default: "center" }) protected contentPosition!: string;

  get isDirection() {
    return `ht-divider-${this.direction}`;
  }
  get isContentPosition() {
    return `is-${this.contentPosition}`;
  }
}
</script>

<style lang="scss" scoped>
.ht-divider {
  background-color: $border-color-gray;
  position: relative;
  .ht-divider-text {
    position: absolute;
    background-color: $bg-color-gray;
    padding: 0 20px;
    font-weight: 500;
    color: $color-gray;
    font-size: 14px;
  }
  .ht-divider-text.is-center {
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .ht-divider-text.is-letf {
    left: 20px;
    transform: translateY(-50%);
  }
  .ht-divider-text.is-right {
    right: 20px;
    transform: translateY(-50%);
  }
}
.ht-divider-horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 24px 0;
}
.ht-divider-vertical {
  display: inline-block;
  width: 1px;
  height: 1em;
  margin: 0 8px;
  vertical-align: middle;
  position: relative;
}
</style>
