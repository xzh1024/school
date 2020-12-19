<template>
  <div class="ht-card">
    <div class="card-title">
      <i :class="icon"></i>
      <div class="card-title-text">
        {{ title }}
        <span class="card-title-describe">{{ describe }}</span>
      </div>
      <!-- <div class="card-title-describe">{{ describe }}</div> -->
      <div class="after-title">
        <slot name="after-title" />
      </div>
    </div>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "HtCard"
})
export default class HtCard extends Vue {
  @Prop() title!: string;
  @Prop({ required: false }) describe!: string;
  @Prop({ required: false, default: "logo-20" }) icon!: string;
}
</script>

<style lang="scss" scoped>
.ht-card {
  // width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  .card-title {
    box-sizing: border-box;
    height: 60px;
    padding: 0 16px;
    border-bottom: $border-primary;
    display: flex;
    align-items: center;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
    .card-title-text {
      flex: 1;
      margin-left: 4px;
      font-size: $font-size-20;
      font-weight: 600;
      color: $color-primary;
      .card-title-describe {
        margin-left: 4px;
        font-size: $font-size-12;
        color: $color-gray;
      }
    }
    .after-title {
      // overflow: hidden;
      // align-self: flex-end;
    }
  }
  .card-content {
    flex: 1;
  }
}
</style>
