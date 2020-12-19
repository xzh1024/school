<template>
  <div class="brand-double">
    <img class="brand-img" :src="info.pic || ''" alt="" />
    <div class="content">
      <div title="品牌" class="cell">
        {{ info.name }}
      </div>
      <div class="cell cell-assist">
        商家:
        {{ info.companyCount || 0 }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { BrandModel } from "@/common/interface/brandInterface";

@Component({ name: "BrandDouble" })
export default class BrandDouble extends Vue {
  @Prop() protected info!: BrandModel;
}
</script>

<style lang="scss" scoped>
.brand-double {
  display: inline-block;
  box-sizing: border-box;
  width: 192px;
  height: 264px;
  .brand-img {
    display: block;
    width: 160px;
    height: 160px;
    margin: 16px auto;
    transition: all 0.15s ease-in 0.05s;
    &:hover {
      transform: scale(1.1);
    }
  }
  .content {
    padding: 0 8px;
    .cell {
      box-sizing: border-box;
      padding: 5px 0;
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
