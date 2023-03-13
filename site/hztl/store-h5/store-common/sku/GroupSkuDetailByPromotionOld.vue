<template>
  <div class="page">
    <van-nav-bar class="nav-bar" fixed :title="groupSku.name" @click-left="back">
      <img slot="left" class="back" src="../img/back-icon.png" />
    </van-nav-bar>
    <div class="content">
      <van-swipe class="van-swipe" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in groupSku.images" :key="index">
          <img class="van-swipe-item-img" :src="image" />
        </van-swipe-item>
      </van-swipe>
      <div class="info-plant">
        <div class="title pd">
          <div class="name">{{groupSku.name}}</div>
        </div>
        <div class="info pd inner-pd">
          <div class="line">
            <!-- <div class="key">打包价：</div> -->
            <div class="value price">
              <span class="price-unit">¥</span>
              <span>{{groupSku.discountPrice | priceFilter}}</span>
            </div>
          </div>
          <div class="line">
            <!-- <div class="key">原价：</div> -->
            <div class="value price-original">¥{{groupSku.originalPrice | priceFilter}}</div>
          </div>
          <div class="line">
            <div class="key">库存：</div>
            <div class="value stock">
              {{groupSku.stockQtyTxt}}
              <span
                class="cart-qty"
                v-if="groupSku.cartQty>0"
              >（已加购 {{groupSku.cartQty | numFilter}} 件）</span>
            </div>
          </div>
          <div class="line" @click="vehModelFunc(groupSku.vehModels)">
            <div class="key">适配车型：</div>
            <div class="value veh-serie">{{groupSku.vehModels | vehModelFilter}}</div>
            <div class="veh-serie-more" v-if="groupSku.vehModels.length>1">更多</div>
          </div>
        </div>
        <van-stepper
          class="stepper"
          v-if="groupSku.hasStockQty"
          min="1"
          :max="groupSku.maxStockQty"
          v-model="num"
          @change="setTotalFee"
        />
      </div>
      <div class="info-plant">
        <div class="title pd" @click="groupSkuArrowFunc">
          <div class="name">
            <span>包内配件</span>
            <span class="normal-name">（配件种类：{{groupSku.skus.length}}）</span>
          </div>
          <van-icon class="arrow" size="14px" :name="groupSkuArrow | arrowFilter" />
        </div>
        <div class="info" v-if="groupSkuArrow">
          <div class="info-plant" v-for="(sku, index) in groupSku.skus" :key="index">
            <div class="title pd" @click="skuArrowFunc(index)">
              <div class="name normal-name">
                {{sku.name}}
                <span v-if="sku.brand" class="tag">{{sku.brand}}</span>
              </div>
              <span class="right">
                <span class="qty">x {{sku.qty}}</span>
                <van-icon class="arrow" size="14px" :name="sku.arrow | arrowFilter" />
              </span>
            </div>
            <div class="info pd inner-pd" v-if="sku.arrow">
              <div class="line">
                <div class="key">编号：</div>
                <div class="value">{{sku.oeCode}}</div>
              </div>
              <div class="line">
                <div class="key">价格：</div>
                <div class="value">¥{{sku.price | priceFilter}}</div>
              </div>
              <div class="line">
                <div class="key">产地：</div>
                <div class="value">{{sku.productionPlace}}</div>
              </div>
              <div class="line" @click="vehModelFunc(sku.vehModels)">
                <div class="key">适配车型：</div>
                <div class="value veh-serie">{{sku.vehModels | vehModelFilter}}</div>
                <div class="veh-serie-more" v-if="sku.vehModels.length>1">更多</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-plant">
        <div class="title pd" @click="infoArrowFunc">
          <div class="name">商品详情</div>
          <van-icon class="arrow" size="14px" :name="infoArrow | arrowFilter" />
        </div>
        <div class="info pd img" v-if="infoArrow">
          <block v-if="groupSku.infoImages.length > 0">
            <img
              class="info-image"
              v-for="(image, index) in groupSku.infoImages"
              :key="index"
              :src="image"
            />
          </block>
          <p class="info-image-none" v-if="groupSku.infoImages.length == 0">暂无商品详情</p>
        </div>
      </div>
    </div>
    <div class="bottom-brand" v-if="groupSku.hasStockQty">
      <div class="total-fee">合计：¥{{totalFee | priceFilter}}</div>
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
  name: "groupSkuDetailByPromotion",
  data() {
    return {
      groupSkuArrow: true,
      infoArrow: true,
      groupSku: {
        id: 0,
        sellerCompanyId: 0,
        name: "",
        originalPrice: 0.0,
        discountPrice: 0.0,
        vehModels: [],
        images: [],
        infoImages: [],
        cartQty: 0,
        stockQtyTxt: "",
        hasStockQty: false,
        maxStockQty: 0,
        skus: []
      },
      num: 1,
      totalFee: 0
    };
  },
  beforeMount: function() {
    this.getGroupSku();
  },
  methods: {
    getGroupSku() {
      let _this = this;
      request({
        baseURL: URL_MODULE.united,
        url: `/company-skus/promotions/combine-detail?id=${_this.$route.query.id}`
      })
      .then(function(res) {
        let groupSku = res;
        let hasStockQty = false;
        let stockQtyTxt = "";
        let maxStockQty = null;
        if (groupSku.qty == null) {
          hasStockQty = true;
          maxStockQty = 999999;
          stockQtyTxt = "有货";
        } else {
          let stockQty = parseFloat(groupSku.qty);
          if (stockQty <= 0) {
            hasStockQty = false;
            maxStockQty = 0;
            stockQtyTxt = "无货";
          } else {
            hasStockQty = true;
            maxStockQty = stockQty;
            stockQtyTxt = stockQty.toFixed(0);
          }
        }
        let skus = [];
        groupSku.details.forEach((detail, index) => {
          skus.push({
            name: detail.partName,
            oeCode: detail.partCode,
            vehModels:
              detail.vehModel != "" ? detail.vehModel.split("|") : [],
            brand: detail.brand,
            productionPlace: detail.productionPlace,
            price: parseFloat(detail.price),
            qty: parseFloat(detail.qty),
            arrow: false
          });
        });
        _this.groupSku = {
          id: groupSku.id,
          sellerCompanyId: groupSku.companyId,
          name: groupSku.name,
          originalPrice: parseFloat(groupSku.originalPrice),
          discountPrice: parseFloat(groupSku.discountPrice),
          vehModels:
            groupSku.vehModel != "" ? groupSku.vehModel.split("|") : [],
          images: [],
          infoImages: [],
          cartQty: parseFloat(groupSku.cartQty),
          hasStockQty: hasStockQty,
          stockQtyTxt: stockQtyTxt,
          maxStockQty: maxStockQty,
          skus: skus
        };
        _this.setTotalFee();
      });
    },
    setTotalFee() {
      let _this = this;
      _this.totalFee = _this.groupSku.discountPrice * _this.num;
    },
    addCart() {
      let _this = this;
      let data = {
        skuId: _this.groupSku.id,
        sellerCompanyId: _this.groupSku.sellerCompanyId,
        price: _this.groupSku.discountPrice,
        qty: _this.num,
        promotionCombine: true,
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
        _this.groupSku.cartQty += _this.num;
      }).catch(err => {
        if(err && err.message) {
          Toast.fail(err.message);
        }
      });
    },
    confirmOrder() {
      let _this = this;
      let sellers = {};
      sellers[_this.groupSku.sellerCompanyId] = {
        skus: [
          {
            id: _this.groupSku.id,
            qty: _this.num,
            promotionCombine: true
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
    groupSkuArrowFunc() {
      this.groupSkuArrow = !this.groupSkuArrow;
    },
    skuArrowFunc(index) {
      this.groupSku.skus[index].arrow = !this.groupSku.skus[index].arrow;
    },
    infoArrowFunc() {
      this.infoArrow = !this.infoArrow;
    },
    vehModelFunc(vehModels) {
      Dialog.alert({
        title: "适配车型",
        message: vehModels.length > 0 ? vehModels.join("\n") : "暂无适配车型"
      });
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
    vehModelFilter(value) {
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
        color: #6e93fb;
        border: 1px solid #6e93fb;
        padding: 0 6px;
        border-radius: 6px;
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
          flex: 1;
          font-size: 17px;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
        }
        .normal-name {
          font-weight: 500;
          font-size: 14px;
        }
        .tag {
          margin-left: 6px;
        }
        .right {
          margin-left: auto;
          display: flex;
          align-items: center;
          .qty {
            font-size: 12px;
          }
          .arrow {
            margin-left: 16px;
          }
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
          }
          .price-original {
            text-decoration: line-through;
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
        top: 52px;
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
    .total-fee {
      flex: 1;
      font-size: 16px;
      color: #ff424d;
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