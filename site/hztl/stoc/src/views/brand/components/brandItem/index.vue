<template>
  <div class="brand-item">
    <img class="brand-img" :src="info.pic || ''" alt="" />
    <div class="content">
      <div title="品牌" class="cell">
        {{ info.name }}
      </div>
      <div class="cell cell-assist">
        商家:
        {{ info.companyCount }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { BrandModel } from "@/common/interface/brandInterface";

@Component({ name: "BrandItem" })
export default class BrandItem extends Vue {
  @Prop() protected info!: BrandModel;
}
</script>

<style lang="scss" scoped>
.brand-item {
  display: inline-block;
  box-sizing: border-box;
  width: 144px;
  height: 132px;
  .brand-img {
    display: block;
    width: 66px;
    height: 66px;
    margin: 8px auto;
    transition: all 0.15s ease-in 0.05s;
    &:hover {
      transform: scale(1.1);
    }
  }
  .content {
    padding: 0 8px;
    .cell {
      box-sizing: border-box;
      margin: 5px 0;
      line-height: 18px;
      text-align: center;
      @extend .lip-1;
    }
    .cell-assist {
      font-size: $font-size-12;
      color: $color-gray;
    }
  }
}
</style>
