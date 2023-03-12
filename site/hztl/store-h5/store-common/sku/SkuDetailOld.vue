<template>
  <div class="page">
    <van-nav-bar class="nav-bar" fixed :title="sku.stdName" @click-left="back">
      <img slot="left" class="back" src="../img/back-icon.png" />
    </van-nav-bar>
    <div class="content">
      <van-swipe class="van-swipe" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in sku.images" :key="index">
          <img class="van-swipe-item-img" :src="image" />
        </van-swipe-item>
      </van-swipe>
      <div class="info-plant">
        <div class="title pd">
          <div class="name">{{sku.stdName}}</div>
          <div v-if="sku.swBrand" class="tag">{{sku.swBrand}}</div>
          <div v-if="sku.vehBrand" class="tag">{{sku.vehBrand}}</div>
        </div>
        <div class="info pd inner-pd">
          <div class="line">
            <!-- <div class="key">编号：</div> -->
            <div class="value oe-code">{{sku.stdOeCode}}</div>
          </div>
          <div class="line">
            <!-- <div class="key">价格：</div> -->
            <div class="value price">
              <span class="price-unit">¥</span>
              <span>{{sku.minPrice | priceFilter}}</span>
              <span
                v-if="(sku.promotionTags&promotionTagDicts[0].key)==promotionTagDicts[0].key || (sku.promotionTags&promotionTagDicts[1].key)==promotionTagDicts[1].key"
                class="price-discount"
              >起</span>
            </div>
          </div>
          <div class="line" v-if="sku.originalPrice > sku.price">
            <!-- <div class="key">原价：</div> -->
            <div
              class="value price-normal"
              v-if="(sku.promotionTags&promotionTagDicts[0].key)==promotionTagDicts[0].key || (sku.promotionTags&promotionTagDicts[1].key)==promotionTagDicts[1].key"
            >订货价 ¥{{sku.price | priceFilter}}</div>
            <div class="value price-original">¥{{sku.originalPrice | priceFilter}}</div>
          </div>
          <div class="line" v-for="(promotionTagDict, index) in promotionTagDicts" :key="index">
            <template v-if="(sku.promotionTags&promotionTagDict.key)==promotionTagDict.key">
              <div class="promotion-group">
                <img :src="promotionTagDict.image" />
                <div class="promotion-items">
                  <div
                    class="promotion-item"
                    v-for="(promotion, index) in getPromotionTexts(promotionTagDict.key)"
                    :key="index"
                  >{{promotion}}</div>
                </div>
              </div>
            </template>
          </div>
          <div class="line">
            <div class="key">配件库存：</div>
            <div class="value stock">
              {{sku.stockQtyTxt}}
              <span
                class="cart-qty"
                v-if="sku.cartQty>0"
              >（已加购 {{sku.cartQty | numFilter}} 件）</span>
            </div>
          </div>
          <div class="line">
            <div class="key">配件性质：</div>
            <div class="value">{{sku.property}}</div>
          </div>
          <div class="line">
            <div class="key">配件产地：</div>
            <div class="value">{{sku.swProductionPlace}}</div>
          </div>
          <div class="line" @click="vehSerieFunc">
            <div class="key">适用车型：</div>
            <div class="value veh-serie">{{sku.vehSeries | vehSerieFilter}}</div>
            <div class="veh-serie-more" v-if="sku.vehSeries.length>1">更多</div>
          </div>
        </div>
        <van-stepper
          class="stepper"
          v-if="sku.hasStockQty"
          min="1"
          :max="sku.maxStockQty"
          v-model="num"
          @change="setFeeInfo"
        />
      </div>
      <div class="info-plant">
        <div class="title pd" @click="specArrowFunc">
          <div class="name">规格</div>
          <van-icon class="arrow" size="14px" :name="specArrow | arrowFilter" />
        </div>
        <div class="info pd inner-pd" v-if="specArrow">
          <div class="line">
            <div class="key">计量单位：</div>
            <div class="value">{{sku.swUnitName}}</div>
          </div>
          <div class="line">
            <div class="key">长度：</div>
            <div class="value">{{sku.swLength}}</div>
          </div>
          <div class="line">
            <div class="key">宽度：</div>
            <div class="value">{{sku.swWidth}}</div>
          </div>
          <div class="line">
            <div class="key">高度：</div>
            <div class="value">{{sku.swHeight}}</div>
          </div>
          <div class="line">
            <div class="key">体积：</div>
            <div class="value">{{sku.swVolume}}</div>
          </div>
          <div class="line">
            <div class="key">重量：</div>
            <div class="value">{{sku.swWeight}}</div>
          </div>
        </div>
      </div>
      <div class="info-plant">
        <div class="title pd" @click="infoArrowFunc">
          <div class="name">商品详情</div>
          <van-icon class="arrow" size="14px" :name="infoArrow | arrowFilter" />
        </div>
        <div class="info pd img" v-if="infoArrow">
          <block v-if="sku.infoImages.length > 0">
            <img
              class="info-image"
              v-for="(image, index) in sku.infoImages"
              :key="index"
              :src="image"
            />
          </block>
          <p class="info-image-none" v-if="sku.infoImages.length == 0">暂无商品详情</p>
        </div>
      </div>
    </div>
    <div class="bottom-brand" v-if="sku.hasStockQty">
      <div class="fee-info">
        <div class="total-fee">合计：¥{{totalFee | priceFilter}}</div>
        <div class="discount-fee" v-if="discountFee>0">已优惠：¥{{discountFee | priceFilter}}</div>
      </div>
      <van-button class="button" plain color="#ff6e4c" type="primary" @click="addCart">加入购物车</van-button>
      <van-button class="button" color="#ff6e4c" type="primary" @click="confirmOrder">提交订单</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import request, { URL_MODULE } from "@/request";
import {
  NavBar,
  Swipe,
  SwipeItem,
  Stepper,
  Button,
  Toast,
  Icon,
  Dialog
} from "vant";
Vue.use(NavBar)
  .use(Swipe)
  .use(SwipeItem)
  .use(Stepper)
  .use(Button)
  .use(Toast)
  .use(Icon)
  .use(Dialog);

export default {
  name: "skuDetail",
  data() {
    return {
      // 促销标签字典
      promotionTagDicts: [
        {
          // 第一位低价
          key: 1 << 0,
          image: require("../img/low-price.png")
        },
        {
          // 第二位折扣
          key: 1 << 1,
          image: require("../img/discount.png")
        },
        {
          // 第三位买赠
          key: 1 << 2,
          image: require("../img/gift.png")
        }
      ],
      specArrow: false,
      infoArrow: true,
      sku: {
        id: 0,
        stdName: "",
        stdOeCode: "",
        originalPrice: 0.0,
        price: 0.0,
        minPrice: 0.0,
        cartQty: 0,
        property: "",
        swBrand: "",
        vehBrand: "",
        swProductionPlace: "",
        vehSeries: [],
        swUnitName: "",
        swLength: "",
        swWidth: "",
        swHeight: "",
        swVolume: "",
        swWeight: "",
        images: [],
        infoImages: [],
        hasStockQty: false,
        maxStockQty: null,
        stockQtyTxt: "",
        sellerCompanyId: 0,
        promotionTags: 0,
        pricePromotions: [],
        giftPromotions: []
      },
      num: 1,
      totalFee: 0,
      discountFee: 0
    };
  },
  beforeMount: function() {
    this.getSku();
  },
  methods: {
    getSku() {
      let _this = this;
      // let skuUrl = `${location.origin}/mock/sku.json`;
      let skuUrl = `/company-skus/${_this.$route.query.id}`;
      request({
        baseURL: URL_MODULE.united,
        url: skuUrl,
        params: {
          relation: "smx"
        }
      })
      .then(res => {
        let sku = res;
        let hasStockQty = false;
        let stockQtyTxt = "";
        let maxStockQty = null;
        if (sku.stockEnough) {
          hasStockQty = true;
          maxStockQty = 999999;
          stockQtyTxt = "有货";
        } else {
          let stockQty = parseFloat(sku.stockQty);
          if (stockQty <= 0) {
            hasStockQty = false;
            maxStockQty = 0;
            stockQtyTxt = "无货";
          } else {
            hasStockQty = true;
            maxStockQty = stockQty;
            stockQtyTxt = stockQty.toFixed(0) + sku.swUnitName;
          }
        }
        _this.sku = {
          id: sku.id,
          stdName: sku.stdName,
          stdOeCode: sku.stdOeCode,
          originalPrice: parseFloat(sku.originalPrice),
          price: parseFloat(sku.price),
          minPrice: parseFloat(sku.minPrice),
          cartQty: parseFloat(sku.cartQty),
          property: sku.property,
          swBrand: sku.swBrand,
          vehBrand: sku.vehBrand,
          swProductionPlace: sku.swProductionPlace,
          vehSeries: sku.vehSeries != "" ? sku.vehSeries.split("|") : [],
          swUnitName: sku.swUnitName,
          swLength: sku.swLength,
          swWidth: sku.swWidth,
          swHeight: sku.swHeight,
          swVolume: sku.swVolume,
          swWeight: sku.swWeight,
          images: sku.images ? sku.images : [],
          infoImages: sku.infoImages ? sku.infoImages : [],
          hasStockQty: hasStockQty,
          maxStockQty: maxStockQty,
          stockQtyTxt: stockQtyTxt,
          sellerCompanyId: sku.companyId,
          promotionTags: sku.promotionTags,
          pricePromotions: sku.pricePromotions,
          giftPromotions: sku.giftPromotions
        };
        _this.setFeeInfo();
      });
    },
    setFeeInfo() {
      let _this = this;
      let price = _this.sku.price;
      let originalPrice = _this.sku.price;
      if (_this.sku.pricePromotions && _this.sku.pricePromotions.length > 0) {
        let len = _this.sku.pricePromotions.length;
        for (let i = 0; i < len; i++) {
          let pricePromotion = _this.sku.pricePromotions[len - 1 - i];
          if (parseFloat(pricePromotion.qty) <= _this.num) {
            price = parseFloat(pricePromotion.discountPrice);
            originalPrice = parseFloat(pricePromotion.originalPrice);
            break;
          }
        }
      }
      _this.totalFee = price * _this.num;
      _this.discountFee = (originalPrice - price) * _this.num;
    },
    addCart() {
      let _this = this;
      let data = {
        skuId: _this.sku.id,
        sellerCompanyId: _this.sku.sellerCompanyId,
        price: _this.sku.price,
        qty: _this.num,
        promotionCombine: false,
        offiAccount: true
      };
      request({
        method: "post",
        baseURL: URL_MODULE.united,
        url: "/carts/create",
        data: data
      })
      .then(() => {
        Toast.success("加入购物车成功");
        _this.sku.cartQty += _this.num;
      }).catch(err => {
        if(err && err.message) {
          Toast.fail(err.message);
        }
      });
    },
    confirmOrder() {
      let _this = this;
      let sellers = {};
      sellers[_this.sku.sellerCompanyId] = {
        skus: [
          {
            id: _this.sku.id,
            qty: _this.num,
            promotionCombine: false
          }
        ]
      };
      localStorage.removeItem("confirmOrderParam");
      localStorage.setItem(
        "confirmOrderParam",
        JSON.stringify({
          ids: [],
          sellers: sellers
        })
      );
      _this.$router.push({
        name: "confirmOrder"
      });
    },
    back() {
      this.historyBack(-1);
    },
    specArrowFunc() {
      this.specArrow = !this.specArrow;
    },
    infoArrowFunc() {
      this.infoArrow = !this.infoArrow;
    },
    vehSerieFunc() {
      Dialog.alert({
        title: "适配车型",
        message:
          this.sku.vehSeries.length > 0
            ? this.sku.vehSeries.join("\n")
            : "暂无适配车型"
      });
    },
    getPromotionTexts(promotionTag) {
      let _this = this;
      let toResult = [];
      switch (promotionTag) {
        case _this.promotionTagDicts[0].key:
          // 低价
          _this.sku.pricePromotions.forEach((promotion, index) => {
            if (parseFloat(promotion.discount) <= "0") {
              toResult.push(
                `满${promotion.qty}件促销价¥${promotion.discountPrice}`
              );
            }
          });
          break;
        case _this.promotionTagDicts[1].key:
          // 折扣
          _this.sku.pricePromotions.forEach((promotion, index) => {
            if (parseFloat(promotion.discount) > "0") {
              toResult.push(`满${promotion.qty}件促销价${promotion.discount}`);
            }
          });
          break;
        case _this.promotionTagDicts[2].key:
          // 买赠
          _this.sku.giftPromotions.forEach((promotion, index) => {
            if (promotion.discount) {
              toResult.push(`满${promotion.qty}件赠${promotion.remarks}`);
            }
          });
          break;
      }
      return toResult;
    }
  },
  filters: {
    priceFilter(value) {
      let realVal = "";
      if (!isNaN(value) && value !== "") {
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = "--";
      }
      return realVal;
    },
    numFilter(value) {
      let realVal = "";
      if (!isNaN(value) && value !== "") {
        realVal = parseFloat(value).toFixed(0);
      } else {
        realVal = "--";
      }
      return realVal;
    },
    vehSerieFilter(value) {
      if (value.length > 0) {
        return value[0];
      }
      return "";
    },
    arrowFilter(value) {
      let result = "arrow-up";
      if (!value) {
        result = "arrow-down";
      }
      return result;
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  background: #f8f8f8;
  margin-bottom: 49px;
  min-height: 100%;
  .nav-bar {
    .back {
      width: 8px;
      height: 14px;
    }
  }
  .content {
    margin-top: 44px;
    margin-bottom: 59px;
    width: 100%;
    .van-swipe {
      background: #fff;
      .van-swipe-item-img {
        height: 220px;
      }
    }
    .info-plant {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      box-sizing: border-box;
      .pd {
        padding: 0 20px;
      }
      .inner-pd {
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .img {
        padding: 0;
      }
      .tag {
        font-size: 10px;
        color: #f7a017;
        border: 1px solid #f7a017;
        padding: 0 6px;
        border-radius: 3px;
        word-break: keep-all; /* 不换行 */
        white-space: nowrap; /* 不换行 */
      }
      .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: rgba(248, 248, 250, 0.5);
        height: 40px;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5;
        .name {
          font-size: 17px;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tag {
          margin-left: 6px;
        }
        .arrow {
          margin-left: auto;
        }
      }
      .info {
        background: #fff;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        .line {
          display: flex;
          align-items: baseline;
          box-sizing: border-box;
          min-height: 18px;
          .key {
            text-align: left;
            font-size: 14px;
            color: rgba(170, 170, 170);
          }
          .value {
            flex: 1;
            text-align: left;
            word-break: break-all;
            font-size: 14px;
            color: rgba(170, 170, 170);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .promotion-group {
            display: flex;
            align-items: center;
            margin: 2px 0;
            img {
              margin-bottom: auto;
              height: 18px;
              width: auto;
            }
            .promotion-items {
              margin-left: 5px;
              display: flex;
              flex-direction: column;
              .promotion-item {
                margin-right: auto;
                margin-right: auto;
                font-size: 14px;
                color: #2c3e50;
              }
            }
          }
          .price {
            color: #ff424d;
            display: flex;
            align-items: center;
            font-size: 18px;
            .price-unit {
              font-size: 12px;
              font-weight: 500;
              margin-right: 2px;
            }
            .price-discount {
              font-size: 12px;
              font-weight: 500;
              margin-left: 2px;
            }
          }
          .price-normal {
            color: #f7a017;
            margin-right: 6px;
            flex: none;
          }
          .price-original {
            text-decoration: line-through;
            flex: none;
          }
          .price-contrast {
            color: #ff424d;
          }
          .stock {
            color: #ff424d;
          }
          .veh-serie-more {
            font-size: 14px;
          }
          .oe-code {
            color: #2c3e50;
          }
        }
      }
      .info-image {
        width: 100%;
        height: auto;
      }
      .info-image-none {
        font-size: 14px;
        color: rgba(170, 170, 170);
      }
      .stepper {
        position: absolute;
        right: 20px;
        top: 72px;
      }
    }
  }
  .bottom-brand {
    left: 0;
    bottom: 0;
    position: fixed;
    width: 100%;
    height: 59px;
    background: #fff;
    display: flex;
    align-items: center;
    // justify-content: space-around;
    .fee-info {
      display: flex;
      align-items: center;
      flex-direction: column;
      flex: 1;
      .total-fee {
        font-size: 16px;
        color: #ff424d;
      }
      .discount-fee {
        font-size: 12px;
        color: #f7a017;
      }
    }
    .button {
      margin-right: 8px;
      width: 90px;
      // width: 46%;
    }
    /deep/ .van-button {
      border-radius: 6px;
      font-size: 12px;
    }
    /deep/ .van-button--normal {
      padding: 0;
    }
  }
}
.line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/deep/ .van-stepper {
  button {
    background-size: 100% 100%;
    color: rgba(110, 147, 251, 0);
    border-radius: 50%;
  }
  input {
    font-size: 14px;
    color: #777b87;
    letter-spacing: -0.34px;
    background: #ffffff;
  }
}
/deep/ .van-stepper__input {
  width: 34px;
}
/deep/ .van-stepper__minus {
  background-image: url("../img/cart-cut.png");
  width: 20px;
  height: 20px;
}
/deep/ .van-stepper__plus {
  background-image: url("../img/cart-add.png");
  width: 20px;
  height: 20px;
}
</style>