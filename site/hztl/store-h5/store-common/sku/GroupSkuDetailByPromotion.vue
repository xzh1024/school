<template>
  <div class="page">
    <van-nav-bar class="nav-bar" fixed :title="groupSku.name" @click-left="historyBack(-1)">
      <img slot="left" class="back" src="../img/back-icon.png" />
    </van-nav-bar>
    <div class="content">
      <van-swipe class="van-swipe" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in groupSku.images" :key="index">
          <img class="van-swipe-item-img" :src="image | skuImage" />
        </van-swipe-item>
      </van-swipe>

      <div class="plant-1">
        <img class="left" src="../img/icon-part.png" />
        <div class="right">
          <div class="name">{{groupSku.name}}</div>
        </div>
      </div>

      <div class="plant-2">
        <div class="tag" v-if="groupSku.vehModels.length > 0">{{groupSku.vehModels[0]}}</div>
        <div
          class="more-extra-info"
          v-if="groupSku.vehModels.length > 1"
          @click="moreExtraInfo=true"
        >
          更多
          <van-icon name="play" :size="14" />
        </div>
      </div>

      <div class="plant-3">
        <div class="left">
          <div class="min-price">
            <span class="price-symbol">¥</span>
            <span class="price">{{groupSku.discountPrice | priceFilter}}</span>
          </div>
          <div class="price-compire" v-if="groupSku.originalPrice > groupSku.discountPrice">
            <div class="original-price">
              <div class="price-title">原价</div>
              <span class="price delete-line">¥{{groupSku.originalPrice | priceFilter}}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <van-stepper
            class="stepper"
            v-if="groupSku.hasStockQty"
            min="1"
            :max="groupSku.maxStockQty"
            v-model="num"
            @change="setFeeInfo"
          />
        </div>
      </div>

      <div class="plant-5">
        <div class="stock">
          <span class="label">配件库存</span>
          <span class="value">{{groupSku.stockQtyTxt}}</span>
        </div>
        <div class="cart" v-if="groupSku.cartQty>0">
          <span class="label">已加购</span>
          <span class="value">{{groupSku.cartQty}}件</span>
        </div>
      </div>

      <div class="plant-4">
        <div class="title" @click="skusFold=!skusFold">
          <div class="label">包内商品</div>
          <div class="count">{{groupSku.skus.length}}种</div>
          <div class="fold">
            <van-icon name="arrow-up" :size="18" v-if="skusFold" />
            <van-icon name="arrow-down" :size="18" v-if="!skusFold" />
          </div>
        </div>
      </div>

      <div class="plant-7" v-if="skusFold">
        <div class="part-item" v-for="(sku, index) in groupSku.skus" :key="index">
          <div class="line1">
            <div class="name">{{sku.name}}</div>
            <div class="tag" v-if="sku.brand">{{sku.brand}}</div>
            <div class="tag" v-if="sku.productionPlace">{{sku.productionPlace}}</div>
            <div class="qty">x{{sku.qty}}</div>
          </div>
          <div class="line2">{{sku.oeCode}}</div>
        </div>
      </div>

      <div class="plant-6" v-if="groupSku.infoImages.length > 0">
        <img
          class="info-image"
          v-for="(image, index) in groupSku.infoImages"
          :key="index"
          :src="image"
        />
      </div>
    </div>

    <div class="bottom-brand" v-if="groupSku.hasStockQty">
      <CartIcon ref="CartIcon"/>
      <div class="fee-info">
        <div class="total-fee">
          <span class="fee-symbol">¥</span>
          <span class="fee">{{totalFee | priceFilter}}</span>
        </div>
      </div>
      <van-button class="button" plain round color="#ff6e4c" type="primary" @click="addCart">加入购物车</van-button>
      <van-button class="button" round color="#ff6e4c" type="primary" @click="confirmOrder">提交订单</van-button>
    </div>

    <van-popup
      class="more-extra-info-pop"
      v-model="moreExtraInfo"
      position="bottom"
      :style="{ maxHeight: '70%', minHeight: '40%' }"
    >
      <van-cell-group title="适用车型">
        <van-cell v-for="(vehModel, index) in groupSku.vehModels" :key="index" :value="vehModel" />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import CartIcon from "../component/Cart/Icon";
import request, { URL_MODULE } from "@/request";
import {
  Tag,
  NavBar,
  Swipe,
  SwipeItem,
  Stepper,
  Button,
  Toast,
  Icon,
  Popup
} from "vant";
Vue.use(NavBar)
  .use(Tag)
  .use(Swipe)
  .use(SwipeItem)
  .use(Stepper)
  .use(Button)
  .use(Toast)
  .use(Icon)
  .use(Popup);

export default {
  name: "groupSkuDetailByPromotion",
  components: {
    CartIcon
  },
  data() {
    return {
      moreExtraInfo: false,
      skusFold: true,
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
      totalFee: 0,
      areaId: 0
    };
  },
  beforeMount: function() {
    let _this = this;
    if (_this.$route.query.areaId) {
      _this.areaId = parseInt(_this.$route.query.areaId);
    }
    _this.getGroupSku();
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
        _this.setFeeInfo();
      });
    },
    setFeeInfo() {
      let _this = this;
      _this.totalFee = _this.groupSku.discountPrice * _this.num;
    },
    addCart() {
      let _this = this;
      _this.unlogin();
      let data = {
        skuId: _this.groupSku.id,
        sellerCompanyId: _this.groupSku.sellerCompanyId,
        price: _this.groupSku.discountPrice,
        qty: _this.num,
        promotionCombine: true,
        storeAreaDetailId: _this.areaId,
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
        _this.$refs.CartIcon.reloadCartNumber();
      }).catch(err => {
        if(err && err.message) {
          Toast.fail(err.message);
        }
      });
    },
    confirmOrder() {
      let _this = this;
      _this.unlogin();
      let sellers = {};
      sellers[_this.groupSku.sellerCompanyId] = {
        skus: [
          {
            id: _this.groupSku.id,
            qty: _this.num,
            promotionCombine: true,
            storeAreaDetailId: _this.areaId
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
      _this.routerPushWithLogin({
        name: "confirmOrder"
      });
    },
    toCart() {
      let _this = this;
      _this.$router.push({
        name: `cart`
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
    skuImage(image) {
      return image + "&imageView2/1/w/200/h/150";
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
    .cart {
      width: 24px;
      height: auto;
    }
  }
  .content {
    margin-top: 44px;
    margin-bottom: 59px;
    width: 100%;
    display: flex;
    flex-direction: column;

    .van-swipe {
      background: #fff;
      .van-swipe-item-img {
        width: 100%;
      }
    }

    .plant-1 {
      display: flex;
      align-items: center;
      background: #fff;
      padding: 10px 20px;
      .left {
        height: 44px;
        width: auto;
      }
      .right {
        height: 44px;
        flex: 1;
        margin-left: 10px;
        display: flex;
        align-items: center;
        .name {
          margin-right: auto;
          font-size: 16px;
          font-weight: 700;
          color: #2c3e50;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          text-align: left;
        }
      }
    }

    .plant-2 {
      background: #fff;
      display: flex;
      align-items: center;
      padding: 0 20px 10px;
      .tag {
        background-color: #f7f7f7;
        font-size: 12px;
        color: #535353;
        padding: 2px 4px;
        border-radius: 4px;
      }
      .tag:not(:first-child) {
        margin-left: 10px;
      }
      .more-extra-info {
        margin-left: auto;
        font-size: 12px;
        color: #FF6E4C;
        display: flex;
        align-items: center;
      }
    }

    .plant-3 {
      padding: 0 20px 10px 20px;
      display: flex;
      align-items: center;
      background: #fff;
      .left {
        display: flex;
        flex: 1;
        flex-direction: column;
        .min-price {
          display: flex;
          align-items: baseline;
          color: #ff424d;
          .price-symbol {
            font-size: 12px;
            font-weight: 500;
            margin-right: 4px;
          }
          .price {
            font-size: 18px;
            font-weight: 700;
          }
          .price-rise {
            font-size: 12px;
            font-weight: 500;
            margin-left: 4px;
          }
        }
        .price-compire {
          display: flex;
          .normal-price {
            display: flex;
            align-items: center;
            color: #f7a017;
            margin-right: 6px;
            .price-title {
              font-size: 12px;
              margin-right: 4px;
            }
            .price {
              font-size: 12px;
            }
          }
          .original-price {
            display: flex;
            align-items: center;
            color: #aaa;
            margin-right: 6px;
            .price-title {
              font-size: 12px;
              margin-right: 4px;
            }
            .price {
              font-size: 12px;
            }
          }
        }
        .delete-line {
          text-decoration: line-through;
        }
      }
      .right {
        margin-left: auto;
        display: flex;
        flex-direction: column;
        .stock {
          display: flex;
          align-items: center;
          font-size: 12px;
          margin-right: auto;
          .label {
            color: #2c3e50;
          }
          .value {
            margin-left: 4px;
            color: rgb(88, 184, 247);
          }
        }
      }
    }

    .plant-4 {
      border-top: 1px solid #f8f8f8;
      padding: 10px 20px;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      .title {
        display: flex;
        align-items: center;
        .label {
          color: #2c3e50;
          font-size: 12px;
        }
        .count {
          color: rgb(88, 184, 247);
          font-size: 12px;
          margin-left: 4px;
        }
        .fold {
          margin-left: auto;
        }
      }
    }

    .plant-7 {
      padding: 10px 10px;
      display: flex;
      flex-direction: column;
      .part-item {
        background-color: #fff;
        margin-top: 10px;
        padding: 5px 10px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        .line1 {
          display: flex;
          align-items: center;
          .name {
            font-size: 12px;
            color: #2c3e50;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            text-align: left;
            flex: 1;
          }
          .tag {
            background-color: #f7f7f7;
            font-size: 12px;
            color: #535353;
            padding: 2px 4px;
            border-radius: 4px;
            margin-right: 10px;
          }
          .qty {
            font-size: 12px;
            color: #535353;
            margin-left: auto;
          }
        }
        .line2 {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #535353;
          margin-right: auto;
        }
      }
      .part-item:first-child {
        margin-top: 0;
      }
    }

    .plant-5 {
      display: flex;
      background-color: #fff;
      border-top: 1px solid #f8f8f8;
      padding: 10px 20px;
      .stock {
        display: flex;
        align-items: center;
        font-size: 12px;
        margin-right: auto;
        .label {
          color: #2c3e50;
        }
        .value {
          margin-left: 4px;
          color: rgb(88, 184, 247);
        }
      }
      .cart {
        display: flex;
        align-items: center;
        font-size: 12px;
        margin-left: auto;
        .label {
          color: #2c3e50;
        }
        .value {
          margin-left: 4px;
          color: rgb(88, 184, 247);
        }
      }
    }

    .plant-6 {
      margin-top: 10px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .info-image {
        width: 100%;
        height: auto;
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
    .cart {
      margin-left: 15px;
    }
    .fee-info {
      display: flex;
      align-items: center;
      flex-direction: column;
      flex: 1;
      margin-right: 20px;
      .total-fee {
        display: flex;
        align-items: baseline;
        margin-left: auto;
        color: #ff424d;
        .title {
          font-size: 14px;
          font-weight: 500;
          margin-right: 6px;
        }
        .fee-symbol {
          margin-right: 1px;
          font-size: 14px;
          font-weight: 500;
        }
        .fee {
          font-size: 18px;
          font-weight: 700;
        }
      }
      .discount-fee {
        display: flex;
        align-items: baseline;
        margin-left: auto;
        color: #f7a017;
        .title {
          font-size: 14px;
          font-weight: 500;
          margin-right: 6px;
        }
        .fee-symbol {
          margin-right: 1px;
          font-size: 14px;
          font-weight: 500;
        }
        .fee {
          font-size: 16px;
          font-weight: 700;
        }
      }
    }
    .button {
      margin-right: 8px;
      width: 90px;
      height: 36px;
      line-height: 36px;
    }
    /deep/ .van-button {
      font-size: 12px;
    }
    /deep/ .van-button--normal {
      padding: 0;
    }
  }

  .more-extra-info-pop {
    border-radius: 20px 20px 0 0;
  }

  /deep/ .more-extra-info-pop .van-cell__title {
    text-align: left;
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
}
</style>