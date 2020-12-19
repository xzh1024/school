<template>
  <div class="goods-item">
    <img
      class="goods-img"
      :src="info.imageUrls ? info.imageUrls[0] : ''"
      alt=""
    />
    <div class="content">
      <div :title="info.name" class="cell-double-wrap">
        <div class="cell-double">
          {{ info.name }}
          {{ info.name }}
          {{ info.name }}
          {{ info.name }}
          {{ info.name }}
          {{ info.name }}
          {{ info.name }}
        </div>
      </div>
      <div :title="info.company.name" class="cell cell-assist">
        {{ info.company.name }}
        {{ info.company.name }}
        {{ info.company.name }}
        {{ info.company.name }}
        {{ info.company.name }}
        {{ info.company.name }}
        {{ info.company.name }}
        {{ info.company.name }}
      </div>
      <div class="cell cell-flex">
        <div class="cell-price">
          ¥
          <span class="cell-price-num">{{ info.price }}</span>
          起
        </div>
        <div class="cell-btn">快速询价</div>
      </div>
      <div class="cell cell-flex">
        <div class="cell-left"></div>
        <div class="cell-qty">
          <span>库存：</span>
          <span>{{ info.qty }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { PartModel } from "@/common/interface/goodsInterface";

@Component({ name: "GoodsItem" })
export default class GoodsItem extends Vue {
  @Prop() protected info!: PartModel;
}
</script>

<style lang="scss" scoped>
.goods-item {
  display: inline-block;
  box-sizing: border-box;
  width: 240px;
  height: 354px;
  padding: 16px;
  .goods-img {
    display: inline-block;
    width: 100%;
    height: 207px;
    transition: all 0.15s ease-in 0.05s;
    &:hover {
      transform: scale(1.1);
    }
  }
  .content {
    padding: 0 8px;
    .company-name {
      @extend .lip-1;
      font-size: $font-size-12;
      color: $color-gray;
    }
    .cell-base {
      box-sizing: border-box;
      padding: 3px 0;
      line-height: 18px;
    }
    .cell {
      @extend .cell-base;
      @extend .lip-1;
    }
    .cell-double-wrap {
      @extend .cell-base;
      height: 42px;
      overflow: hidden;
      .cell-double {
        @extend .lip-2;
      }
    }
    .cell-assist {
      font-size: $font-size-12;
      color: $color-gray;
    }
    .cell-flex {
      display: flex;
      align-items: center;
      .cell-price {
        flex: 1;
        font-size: $font-size-12;
        color: $color-red;
        .cell-price-num {
          font-size: $font-size-16;
        }
      }
      .cell-btn {
        font-size: $font-size-12;
        color: $color-primary;
        padding: 2px 5px;
        background-color: rgba($color: $color-primary, $alpha: 0.1);
        border-radius: 12px 0 0 12px;
        cursor: pointer;
      }
      .cell-left {
        flex: 1;
      }
      .cell-qty {
        display: flex;
        align-items: center;
        font-size: $font-size-12;
        color: $color-gray;
      }
    }
  }
}
</style>
