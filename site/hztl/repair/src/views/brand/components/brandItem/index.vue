<template>
  <div class="brand-item" @click="handlePathCompany(info.name)">
    <img class="brand-img" :src="info.pic || ''" @error="defaultImg" />
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
import { defaultImgSquare } from "@/common/utils/defaultImg";

@Component({ name: "BrandItem" })
export default class BrandItem extends Vue {
  @Prop() private info!: BrandModel;

  private defaultImg = defaultImgSquare;

  private handlePathCompany(vehBrand: string) {
    this.$router.push({ path: "/company", query: { vehBrand } });
  }
}
</script>

<style lang="scss" scoped>
.brand-item {
  display: inline-block;
  box-sizing: border-box;
  width: 150px;
  height: 132px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: border 0.15s ease-in 0.05s;
  &:hover {
    border-color: $color-primary;
  }
  .brand-img {
    display: block;
    width: 66px;
    height: 66px;
    margin: 8px auto;
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
