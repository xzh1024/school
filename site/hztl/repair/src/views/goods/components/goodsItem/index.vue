<template>
  <div class="goods-item">
    <img
      class="goods-img"
      :src="info.imageUrls && info.imageUrls.length ? info.imageUrls[0] : ''"
      @error="defaultImgFn"
    />
    <div class="content">
      <div :title="info.name" class="cell-double-wrap">
        <div class="cell-double">
          <span title="配件名称">{{ info.name }}</span>
          &nbsp;
          <span title="配件品牌">{{ info.brand }}</span>
          &nbsp;
          <span title="产地">{{ info.productionPlace }}</span>
          &nbsp;
          <span title="配件编码">{{ info.code }}</span>
          &nbsp;
          <span title="车型">{{ info.vehModel }}</span>
        </div>
      </div>
      <div :title="info.company.name" class="cell cell-assist">
        {{ info.company.name }}
      </div>
      <div class="cell cell-flex">
        <div class="cell-price" v-if="info.price">
          ¥
          <span class="cell-price-num">{{ info.price }}</span>
          起
        </div>
        <div class="cell-price" v-if="info.price === null">
          请询价
        </div>
        <el-button
          slot="reference"
          type="primary"
          size="mini"
          round
          class="gradients-button"
          @click="showPartInfo"
        >
          查看详情
        </el-button>
      </div>
      <div class="cell cell-flex">
        <div class="cell-left"></div>
        <div class="cell-qty">
          <span>库存：</span>
          <span>{{ info.qty === null ? "—" : info.qty }}</span>
        </div>
      </div>
    </div>

    <GoodsInfoDialog
      v-if="goodsInfoVisible"
      :info="info"
      @hide="hidePartInfo"
    ></GoodsInfoDialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { PartModel } from "@/common/interface/goodsInterface";
import GoodsInfoDialog from "../goodsInfoDialog/index.vue";
import { defaultImgSquare } from "@/common/utils/defaultImg";

@Component({
  name: "GoodsItem",
  components: {
    GoodsInfoDialog
  }
})
export default class GoodsItem extends Vue {
  @Prop() private info!: PartModel;
  private goodsInfoVisible = false;

  private defaultImgFn = defaultImgSquare;

  private showPartInfo() {
    this.goodsInfoVisible = true;
  }
  private hidePartInfo() {
    this.goodsInfoVisible = false;
  }
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
      margin-bottom: 3px;
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
        font-weight: 500;
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
