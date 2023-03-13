<template>
  <div class="card" @click="toDetail">
    <template>
      <slot name="tag"></slot>
    </template>
    <div class="card-main">
      <slot name="left"></slot>
      <div class="card-img">
        <img :src="sku.image | skuImage" />
      </div>
      <div class="card-content">
        <div class="card-cell">
          <!-- 商品名称(标准名称) -->
          <span class="cell-tag strong">{{ `【${sku.stdName}】` }}</span>
          <!-- 编码 -->
          <span class="cell-tag" v-if="sku.oeCode">{{ sku.oeCode }}</span>
          <!-- 配件分类 -->
          <span class="cell-tag" v-if="sku.swCategory">
            {{ sku.swCategory }}
          </span>
          <!-- 品牌 -->
          <span class="cell-tag" v-if="sku.swBrand">
            {{ sku.swBrand }}
          </span>
          <!-- 产地 -->
          <span class="cell-tag" v-if="sku.swProductionPlace">
            {{ sku.swProductionPlace }}
          </span>
          <!-- 性质 -->
          <span class="cell-tag" v-if="sku.property">
            {{ sku.property }}
          </span>
          <!-- 规格 -->
          <span class="cell-tag" v-if="sku.swSpec">{{ sku.swSpec }}</span>
          <!-- 车型 -->
          <span class="cell-tag" v-if="sku.swVehModel">
            {{ sku.swVehModel }}
          </span>
          <!-- 适用车型 -->
          <span class="cell-tag" v-if="sku.vehSeries">
            {{ sku.vehSeries }}
          </span>
        </div>
        <!-- 卖点 -->
        <div class="card-description m-t-4" v-if="sku.description">
          {{ sku.description }}
        </div>
        <!-- 优惠券 -->
        <GoodsCoupon
          class="m-t-4"
          v-if="sku.coupons"
          :list="sku.coupons"
        ></GoodsCoupon>
        <template v-if="!isOrder">
          <div class="clearfix m-t-4 font-size-12">
            <div class="fl" v-if="Number(sku.swMinBuyQty)">
              <span>起订量：</span>
              <span>{{ sku.swMinBuyQty }}</span>
            </div>
            <div class="fr" v-if="sku.purchaseLimit">
              <span>可订货数：</span>
              <span>{{ sku.canOrderQty }}</span>
            </div>
          </div>
          <div class="clearfix m-t-4">
            <div v-if="isCart && !sku.companyId" class="color-danger">
              --
            </div>
            <div v-else class="fl font-size-12 strong">
              <span class="color-danger">¥</span>
              <span class="color-danger font-size-16">
                {{ sku.originalPrice | priceFilter }}
              </span>
              <span class="original-price" v-if="sku.linePrice">
                ¥{{ sku.linePrice }}
              </span>
            </div>
          </div>
          <div class="card-num m-t-4" v-if="isCart">
            <!-- 区分商品类型 -->
            <template v-if="itemOrSet">
              <div class="card-cart" v-if="sku.cartQty">
                <span>已加购{{ sku.cartQty }}件</span>
              </div>
              <div class="card-stepper" @click.stop>
                <van-stepper
                  v-model="sku.qty"
                  theme="round"
                  button-size="16"
                  input-width="40"
                  min="1"
                  :max="9999"
                  disable-input
                  integer
                  @change="changeNum()"
                />
              </div>
            </template>
            <template v-else>
              <div class="card-stepper" @click.stop v-if="stepperMax()">
                <van-stepper
                  v-model="sku.qty"
                  theme="round"
                  button-size="16"
                  input-width="40"
                  min="1"
                  :max="stepperMax()"
                  disable-input
                  integer
                  @change="changeNum()"
                />
              </div>
            </template>
          </div>
          <div class="card-num m-t-4" v-if="!isCart">
            <!-- 区分商品类型 -->
            <template v-if="itemOrSet">
              <div class="card-cart" v-if="sku.cartQty">
                <span>已加购{{ sku.cartQty }}件</span>
              </div>
              <div class="card-stepper" @click.stop>
                <van-stepper
                  v-model="sku.selectedQty"
                  theme="round"
                  button-size="16"
                  input-width="40"
                  min="0"
                  :max="9999"
                  disable-input
                  integer
                  @change="changeNum()"
                />
              </div>
            </template>
            <template v-else>
              <div class="card-cart" v-if="sku.cartQty">
                <span>已加购{{ sku.cartQty }}件</span>
              </div>
              <div class="card-stepper" @click.stop v-if="sku.hasStockQty">
                <van-stepper
                  v-model="sku.selectedQty"
                  theme="round"
                  button-size="16"
                  input-width="40"
                  min="0"
                  :max="sku.maxStockQty"
                  disable-input
                  integer
                  @change="changeNum()"
                />
              </div>
            </template>
          </div>
          <template v-if="!itemOrSet">
            <div v-if="isCart && !sku.companyId">
              <span>库存：</span>
              <span class="color-warning">
                --
              </span>
            </div>
            <div v-if="!(isCart && !sku.companyId)" class="font-size-12">
              <!-- sku来源，s、a、m、x之一 -->
              <template v-if="sku.relation">
                <template v-if="sku.stockShows && sku.stockShows.length">
                  <template v-for="(stock, index) in sku.stockShows">
                    <div :key="index" v-if="index < 5">
                      <span class="color-bye"
                        >{{
                          stock.groupName ? stock.groupName : '库存'
                        }}：</span
                      >
                      <span class="color-primary">{{ stock.stockShow }}</span>
                    </div>
                  </template>
                  <div v-if="sku.stockShows.length > 5" class="color-warning">
                    更多库存信息 >
                  </div>
                </template>
                <!-- 不校验库存 -->
                <template v-else-if="sku.companyId || sku.stockEnough">
                  <span>库存：</span>
                  <span class="color-warning">有货</span>
                </template>
                <!-- 实时库存 -->
                <template v-else>
                  <span>库存：</span>
                  <span class="color-warning">
                    {{ Number(sku.stockQty) ? `${sku.stockQty}件` : '无货' }}
                  </span>
                </template>
              </template>
              <template v-else>
                <template v-if="sku.stockShows && sku.stockShows.length">
                  <div v-for="(stock, index) in sku.stockShows" :key="index">
                    <span
                      >{{ stock.groupName ? stock.groupName : '库存' }}：</span
                    >
                    <span class="color-warning">无货</span>
                  </div>
                </template>
                <!-- 不校验库存 -->
                <template v-else>
                  <span>库存：</span>
                  <span class="color-warning">无货</span>
                </template>
              </template>
            </div>
          </template>
          <div
            v-if="isCart && !sku.companyId"
            class="font-size-12 color-danger"
          >
            商品已下架或不可购买！
          </div>
        </template>
        <slot name="plus"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import GoodsDefaultImg from '../../img/Common_goods_def_img.png';
import GoodsCoupon from '@/views/goods/components/goodsCoupon.vue';

import { Stepper } from 'vant';
Vue.use(Stepper);

export default {
  components: {
    GoodsCoupon,
  },
  props: {
    sku: Object,
    type: String, // 使用场景 cart:购物车；order:订单
    skuType: String,
  },
  created() {
    const sku = this.sku;
    if (!sku.image && sku.images && sku.images.length) {
      sku.image = sku.images[0];
    }
  },
  computed: {
    isCart() {
      return this.type === 'cart';
    },
    isOrder() {
      return this.type === 'order';
    },
    // 项目或者套餐
    itemOrSet() {
      const sku = this.sku;
      return [1, 2].includes(sku.goodsType || sku.type);
    },
  },
  methods: {
    stepperMax() {
      const sku = this.sku;
      let maxQty = 99999;
      if (!sku.companyId) {
        if (parseInt(sku.rtQty) > 0) {
          maxQty = parseInt(sku.rtQty);
        } else {
          maxQty = 0;
        }
      }
      return maxQty;
    },
    // 更新数量
    changeNum() {
      this.$emit('change', this.sku);
    },
    toDetail() {
      if (this.isOrder) return;
      const sku = this.sku;
      if (sku.id && sku.companyId) {
        /*
          type：
            0:零配件 1:促销组合商品 2:项目 3:套餐
          goodsType：
            0:零配件 1:项目 2:套餐
          商品的type在购物车中使用的goodsType记录，type与goodsType的0都为零配件
        */
        const goodsType = sku.goodsType || sku.type;
        switch (goodsType) {
          // 服务项目
          case 1:
            this.$router.push({
              path: '/projectDetail',
              query: {
                id: sku.skuId || sku.id,
                goodsType,
              },
            });
            break;
          // 套餐
          case 2:
            this.$router.push({
              path: '/packageDetail',
              query: {
                id: sku.skuId || sku.id,
                goodsType,
              },
            });
            break;
          // 零配件
          default:
            this.$router.push({
              name: 'skuDetail',
              query: {
                id: sku.skuId || sku.id,
                areaId: sku.areaId,
              },
            });
            break;
        }
      }
    },
  },
  filters: {
    skuImage(image) {
      let result = GoodsDefaultImg;
      if (location.hostname == 'jndm.hztl3.com') {
        result = GoodsDefaultImg;
      }
      if (image) {
        result = image + '&imageView2/1/w/100/h/100';
      }
      return result;
    },
    priceFilter(value) {
      let parse = '--';
      if (value === '0') {
        parse = value;
      } else if (Number(value)) {
        parse = parseFloat(value).toFixed(2);
      }
      return parse;
    },
  },
};
</script>

<style lang="less" scoped>
@size: 12px;
.card-tag {
  display: inline-block;
  height: 14px;
  line-height: 14px;
  color: #ffffff;
  background: #ff6e4c;
  border-radius: 2px;
  display: flex;
  align-items: center;
  .card-tag-text {
    font-size: 12px;
    line-height: 14px;
    transform: scale(0.8);
  }
}
.card {
  padding: @size 0 0 @size;
  font-size: 14px;
  text-align: left;
  background: #ffffff;
  .card-main {
    display: flex;
    align-items: flex-start;

    .card-checkbox {
      margin-top: 22px;
      margin-right: @size;
    }
    .card-img {
      margin-right: @size;
      width: 60px;
      height: 60px;
      img {
        width: 100%;
        height: 100%;
        border: 0 solid #f2f3f5;
        border-radius: 4px;
      }
    }
    .card-content {
      flex: 1;
      padding-right: @size;
      min-height: 60px;
      padding-bottom: @size;
      border-bottom: 1px solid #e6e6e6;
      overflow: hidden;
      .card-cell {
        font-size: 13px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        .cell-tag {
          margin-right: 4px;
        }
      }
      .card-order {
        display: flex;
        align-items: center;
        .card-order-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }
      }
      .card-description {
        font-size: 12px;
        color: #666666;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .card-num {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .card-cart {
          margin-right: 8px;
          font-size: 12px;
          color: #bbbbbb;
        }
      }
      .original-price {
        margin-left: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #999999;
        text-decoration: line-through;
      }
    }
  }
}
</style>
