<template>
  <div class="page layout-wrap">
    <van-nav-bar
      class="nav-bar"
      :title="sku.stdName"
      @click-left="historyBack(-1)"
    >
      <img slot="left" class="back" src="../img/back-icon.png" />
    </van-nav-bar>
    <div class="not-data" v-if="sku.id === 0">
      <img class="not-img" src="@sub/img/icon-noresult.png">
      <div class="not-text">商品已下架或不可购买</div>
    </div>
    <template v-else>
      <div class="content layout-content">
        <div class="swipe-box" v-if="sku.images && sku.images.length">
          <van-swipe class="van-swipe" :autoplay="3000">
            <van-swipe-item v-for="(image, index) in sku.images" :key="index">
              <img class="van-swipe-item-img" :src="image | skuImage" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- <div class="plant-1">
                <img class="left" src="../img/icon-part.png">
                <div class="right">
                    <div class="name">{{sku.stdName}}</div>
                    <div class="code">{{sku.stdOeCode}} &nbsp;{{sku.swSpec}}</div>
                </div>
            </div> -->
        <div class="plant-1">
          <span class="m-r-4 strong" title="商品名称">{{
            `【${sku.stdName}】`
          }}</span>
          <span class="m-r-4" title="编码" v-if="sku.stdOeCode">{{
            sku.stdOeCode
          }}</span>
          <span class="m-r-4" title="配件分类" v-if="sku.swCategory">{{
            sku.swCategory
          }}</span>
          <span class="m-r-4" title="品牌" v-if="sku.swBrand">{{
            sku.swBrand
          }}</span>
          <span class="m-r-4" title="产地" v-if="sku.swProductionPlace">{{
            sku.swProductionPlace
          }}</span>
          <span class="m-r-4" title="性质" v-if="sku.property">{{
            sku.property
          }}</span>
          <span class="m-r-4" title="规格" v-if="sku.swSpec">{{
            sku.swSpec
          }}</span>
          <span class="m-r-4" title="车型" v-if="sku.swVehModel">{{
            sku.swVehModel
          }}</span>
          <span class="m-r-4" title="适用车型" v-if="sku.vehSeries">{{
            sku.vehSeries
          }}</span>
        </div>
        <div class="plant-2">
          <!-- <div class="tag" v-if="sku.swBrand">{{sku.swBrand}}</div>
                <div class="tag" v-if="sku.vehBrand">{{sku.vehBrand}}</div>
                <div class="tag" v-if="sku.swProductionPlace">{{sku.swProductionPlace}}</div> -->
          <div class="more-extra-info" @click="moreExtraInfo = true">
            更多信息
            <van-icon name="play" :size="14" />
          </div>
        </div>
        <div class="plant-description" title="卖点" v-if="sku.description">
          {{ sku.description }}
        </div>
        <div class="plant-least" title="起订量" v-if="sku.swMinBuyQty">
          <span>起订量：</span>
          <span>{{ sku.swMinBuyQty }}</span>
        </div>
        <div class="plant-3">
          <div class="left">
            <div class="min-price">
              <span class="price-symbol">¥</span>
              <span class="price">{{ sku.minPrice | priceFilter }}</span>
              <span
                class="price-rise"
                v-if="
                  (sku.promotionTags & promotionTagDicts[0].key) ==
                    promotionTagDicts[0].key ||
                    (sku.promotionTags & promotionTagDicts[1].key) ==
                      promotionTagDicts[1].key
                "
                >起</span
              >
              <span class="original-price" v-if="sku.linePrice"
                >¥{{ sku.linePrice }}</span
              >
            </div>
          </div>
          <div class="right">
            <!-- A商城使用，满减推销展示 -->
            <div class="cart" v-if="sku.cartQty > 0">
              <span class="label">已加购</span>
              <span class="value">{{
                sku.cartQty | unitFilter(sku.swUnitName)
              }}</span>
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
        </div>
        <div class="plant-4" v-if="sku.promotionTags > 0">
          <div
            class="promotion-plant"
            v-for="(promotionTagDict, index) in promotionTagDicts"
            :key="index"
          >
            <div
              class="promotion-group"
              v-if="
                (sku.promotionTags & promotionTagDict.key) ==
                  promotionTagDict.key
              "
            >
              <img :src="promotionTagDict.image" />
              <div class="promotion-item-group">
                <div
                  class="promotion-item"
                  v-for="(promotion, index) in getPromotionTexts(
                    promotionTagDict.key,
                  )"
                  :key="index"
                >
                  {{ promotion }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="plant-stock">
          <!-- sku来源，s、a、m、x之一 -->
          <template v-if="sku.relation">
            <template v-if="sku.stockShows && sku.stockShows.length">
              <div v-for="(stock, index) in sku.stockShows" :key="index">
                <span class="color-bye"
                  >{{ stock.groupName ? stock.groupName : '库存' }}：</span
                >
                <span class="color-primary">{{ stock.stockShow }}</span>
              </div>
            </template>
            <template v-else>
              <span>库存：</span>
              <span>{{ sku.stockQtyTxt }}</span>
            </template>
            <!-- 不校验库存 -->
            <!-- <template v-else-if="sku.companyId || sku.stockEnough">
                  <span>库存：</span>
                  <span class="color-blue">有货</span>
                </template> -->
            <!-- 实时库存 -->
            <!-- <template v-else>
                  <span>库存：</span>
                  <span class="color-blue">
                    {{ Number(sku.stockQty) ? `${sku.stockQty}件` : "无货" }}
                  </span>
                </template> -->
          </template>
          <template v-else>
            <template v-if="sku.stockShows && sku.stockShows.length">
              <div v-for="(stock, index) in sku.stockShows" :key="index">
                <span>{{ stock.groupName ? stock.groupName : '库存' }}：</span>
                <span class="color-blue">无货</span>
              </div>
            </template>
            <!-- 不校验库存 -->
            <template v-else>
              <span>库存：</span>
              <span class="color-blue">无货</span>
            </template>
          </template>
        </div>
        <div v-if="sku.purchaseLimit" class="plant-5-2">
          <van-tag type="warning" style="flex: none">限购</van-tag>
          <div style="margin-left: 10px">{{ sku.purchaseLimit }}</div>
        </div>
        <!-- 优惠券 -->
        <!-- <GoodsDetailsCoupon :list="sku.coupons"></GoodsDetailsCoupon> -->
        <!-- 优惠券 -->
        <GoodsDetailsCoupon
          v-if="sku.coupons"
          :list="sku.coupons"
          class="m-t-8"
        ></GoodsDetailsCoupon>
        <!-- 相关套餐 -->
        <RelatedGoods
          v-if="sku.sets"
          title="相关套餐"
          describe="以下套餐包含当前商品，购买套餐更省钱！"
          :list="sku.sets"
          class="m-t-8"
        ></RelatedGoods>
        <!-- 商家信息 -->
        <CompanyContainer
          class="m-t-8 m-b-8"
          style="border-radius: 0;"
        ></CompanyContainer>
        <div class="plant-6" v-if="sku.infoImages.length > 0">
          <img
            class="info-image"
            v-for="(image, index) in sku.infoImages"
            :key="index"
            :src="image"
          />
        </div>
        <div class="plant-remark" title="商品详情" v-if="sku.remarks">
          <div class="plant-title">商品详情</div>
          <div class="plant-pre" v-html="sku.remarks"></div>
        </div>
      </div>
      <div class="bottom-brand layout-footer" v-if="sku.hasStockQty">
        <PhoneIcon />
        <CartIcon ref="CartIcon" />
        <div class="fee-info">
          <div class="total-fee">
            <span class="fee-symbol">¥</span>
            <span class="fee">{{ totalFee | priceFilter }}</span>
          </div>
          <div class="discount-fee" v-if="discountFee > 0">
            <span class="title">优惠</span>
            <span class="fee-symbol">¥</span>
            <span class="fee">{{ discountFee | priceFilter }}</span>
          </div>
        </div>
        <van-button
          class="button"
          plain
          round
          color="#FF6E4C"
          type="primary"
          @click="addCart"
          >加入购物车</van-button
        >
        <van-button
          class="button"
          round
          color="#FF6E4C"
          type="primary"
          @click="confirmOrder"
          >提交订单</van-button
        >
      </div>
    </template>
    <van-popup
      class="more-extra-info-pop"
      v-model="moreExtraInfo"
      position="bottom"
      :style="{ maxHeight: '70%', minHeight: '40%' }"
    >
      <van-cell-group title="基本信息">
        <van-cell title="配件分类" :value="sku.swCategory" />
        <van-cell title="配件性质" :value="sku.property" />
        <van-cell title="配件产地" :value="sku.swProductionPlace" />
        <div class="van-cell">车型</div>
        <template v-if="sku.swVehModel">
          <van-cell
            class="cell-item"
            v-for="(item, index) in sku.swVehModel.split('|')"
            :key="index"
            :value="item"
          />
        </template>
        <div v-else class="van-cell cell-item">暂无数据</div>
        <div class="van-cell">适用车型</div>
        <template v-if="sku.vehSeriesList && sku.vehSeriesList.length">
          <van-cell
            class="cell-item"
            v-for="(vehSerie, index) in sku.vehSeriesList"
            :key="index"
            :value="vehSerie"
          />
        </template>
        <div v-else class="van-cell cell-item">暂无数据</div>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="规格" :value="sku.swModel" />
        <van-cell title="计量单位" :value="sku.swUnitName" />
        <van-cell title="长度" :value="sku.swLength" />
        <van-cell title="宽度" :value="sku.swWidth" />
        <van-cell title="高度" :value="sku.swHeight" />
        <van-cell title="体积" :value="sku.swVolume" />
        <van-cell title="重量" :value="sku.swWeight" />
      </van-cell-group>
    </van-popup>

    <van-overlay
      z-index="3000"
      class-name="overlay-loading"
      :show="overlayLoading"
    >
      <van-loading size="24px"></van-loading>
    </van-overlay>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import CartIcon from '../component/Cart/Icon';
import PhoneIcon from '../component/DefaultPhone/Icon';
import CompanyContainer from '@/components/home_components/company_con';
import GoodsDetailsCoupon from '@/views/goods/components/goodsDetailsCoupon';
import RelatedGoods from '@/views/goods/components/relatedGoods';
import request, { URL_MODULE } from '@/request';
import {
  Tag,
  NavBar,
  Swipe,
  SwipeItem,
  Stepper,
  Button,
  Toast,
  Icon,
  Popup,
  Dialog,
} from 'vant';
Vue.use(NavBar)
  .use(Tag)
  .use(Swipe)
  .use(SwipeItem)
  .use(Stepper)
  .use(Button)
  .use(Toast)
  .use(Icon)
  .use(Popup)
  .use(Dialog);

export default {
  name: 'skuDetail',
  components: {
    CartIcon,
    PhoneIcon,
    CompanyContainer,
    GoodsDetailsCoupon,
    RelatedGoods,
  },
  data() {
    return {
      // 促销标签字典
      promotionTagDicts: [
        {
          // 第一位低价
          key: 1 << 0,
          image: require('../img/low-price.png'),
        },
        {
          // 第二位折扣
          key: 1 << 1,
          image: require('../img/discount.png'),
        },
        {
          // 第三位买赠
          key: 1 << 2,
          image: require('../img/gift.png'),
        },
      ],
      moreExtraInfo: false,
      sku: {
        id: 0,
        stdName: '',
        stdOeCode: '',
        originalPrice: 0.0,
        price: 0.0,
        priceTxt: null,
        minPrice: 0.0,
        cartQty: 0,
        property: '',
        swBrand: '',
        vehBrand: '',
        swProductionPlace: '',
        vehSeries: '',
        vehSeriesList: [],
        swUnitName: '',
        swLength: '',
        swWidth: '',
        swHeight: '',
        swVolume: '',
        swWeight: '',
        images: [],
        infoImages: [],
        hasStockQty: false,
        maxStockQty: null,
        stockQtyTxt: '',
        sellerCompanyId: 0,
        promotionTags: 0,
        pricePromotions: [],
        giftPromotions: [],
        isPromotion: false,
        vehBrands: [],
        businessCard: '',
        description: '', // 卖点
        swMinBuyQty: '', // 起订量
        linePrice: '', // 划线价格
        remarks: '', // 商品详情
      },
      num: 1,
      totalFee: 0,
      discountFee: 0,
      areaId: 0,
      isShowStock: false,
      // stockshow:[],//库存展示
      overlayLoading: false, // 遮罩
    };
  },
  computed: {
    ...mapState({
      baseInfo: state => state.base,
    }),
  },
  beforeMount: function() {
    let _this = this;
    if (_this.$route.query.areaId) {
      _this.areaId = parseInt(_this.$route.query.areaId);
    }
    _this.getSku();
    // if(_this.isXfs && !this.hasCookie){
    // }else{
    //     _this.loadCartNumber();
    // }
  },
  methods: {
    stockRender(sku) {
      let stockShows = sku.stockShows;
      var text = '';
      if (stockShows && stockShows.length) {
        let itemTxt = stockShows[0];
        text =
          itemTxt.groupName + '  ' + itemTxt.stockShow.replace('库存：', '');
      } else if (sku.stockEnough) {
        text = '有货';
      } else {
        if (parseInt(sku.rtQty) > 0) {
          text = `${sku.rtQty}件`;
        } else {
          text = '无货';
        }
      }

      return text;
    },
    initListFn() {
      this.getSku();
    },
    onClose(val) {
      this.isShowStock = false;
    },
    getSku() {
      let _this = this;
      // let skuUrl = `${location.origin}/mock/sku.json`;
      let skuUrl = `/company-skus/${_this.$route.query.id}`;
      if (!_this.hasCookie && _this.needVisitor) {
        skuUrl = `/open/company-skus/${_this.$route.query.id}`;
      }
      request({
        url: skuUrl,
        baseURL: URL_MODULE.united,
        params: {
          relation: 'sm',
          allianceStoreAreaDetailId: _this.$route.query.areaId,
        },
      }).then(res => {
        let sku = res;
        let hasStockQty = false;
        let stockQtyTxt = '';
        let maxStockQty = 0;
        let isPromotion = sku.promotionTags > 0;
        let priceTxt = null;
        if (sku.relation) {
          if (sku.stockShows && sku.stockShows.length) {
            hasStockQty = true;
            maxStockQty = 999999;
          } else if (sku.companyId || sku.stockEnough) {
            hasStockQty = true;
            maxStockQty = 999999;
            stockQtyTxt = '有货';
          } else {
            if (Number(sku.stockQty)) {
              hasStockQty = true;
              stockQtyTxt = sku.stockQty + '件';
            } else {
              hasStockQty = false;
              stockQtyTxt = '无货';
            }
          }

          priceTxt = parseFloat(sku.price);
        } else {
          if (sku.stockShows && sku.stockShows.length) {
            hasStockQty = true;
            stockQtyTxt = '有货';
          } else {
            hasStockQty = false;
            stockQtyTxt = '无货';
          }
        }
        _this.sku = {
          ...sku,
          id: sku.id,
          stdName: sku.stdName,
          stdOeCode: sku.stdOeCode,
          originalPrice: parseFloat(sku.originalPrice),
          price: parseFloat(sku.price),
          priceTxt: priceTxt,
          minPrice: parseFloat(sku.minPrice),
          cartQty: parseFloat(sku.cartQty),
          property: sku.property,
          swBrand: sku.swBrand,
          vehBrand: sku.vehBrand,
          swProductionPlace: sku.swProductionPlace,
          vehSeries: sku.vehSeries,
          vehSeriesList: sku.vehSeries ? sku.vehSeries.split('|') : [],
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
          giftPromotions: sku.giftPromotions,
          sellerName: sku.sellerName,
          sellerPhone: sku.sellerPhone,
          isPromotion: isPromotion,
          vehBrands: sku.vehBrands,
          businessCard: sku.businessCard,
          swSpec: sku.swSpec,
          swVehModel: sku.swVehModel,
          canOrderQty: sku.canOrderQty,
          purchaseLimit: sku.purchaseLimit,
          stockShows: sku.stockShows,
          stockEnough: sku.stockEnough,
          description: sku.description,
          swMinBuyQty: sku.swMinBuyQty,
          linePrice: sku.linePrice,
          remarks: sku.remarks,
        };
        // _this.stockshow = _this.sku.stockShows;
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
      _this.unlogin();
      let data = {
        skuId: _this.sku.id,
        sellerCompanyId: _this.sku.sellerCompanyId,
        price: _this.sku.price,
        qty: _this.num,
        promotionCombine: false,
        storeAreaDetailId: _this.areaId,
        offiAccount: true,
      };
      request({
        method: 'post',
        baseURL: URL_MODULE.united,
        url: '/carts/create',
        data: data,
      })
        .then(() => {
          Toast.success('加入购物车成功');
          _this.sku.cartQty += _this.num;
          _this.$refs.CartIcon.reloadCartNumber();
        })
        .catch(err => {
          if (err && err.message) {
            Toast.fail(err.message);
          }
        });
    },
    confirmOrder() {
      let _this = this;
      _this.unlogin();
      let sellers = {};
      sellers[_this.sku.sellerCompanyId] = {
        skus: [
          {
            id: _this.sku.id,
            qty: _this.num,
            promotionCombine: false,
            storeAreaDetailId: _this.areaId,
          },
        ],
      };
      localStorage.removeItem('confirmOrderParam');
      localStorage.setItem(
        'confirmOrderParam',
        JSON.stringify({
          ids: [],
          sellers: sellers,
        }),
      );
      _this.routerPushWithLogin({
        name: 'confirmOrder',
      });
    },
    getPromotionTexts(promotionTag) {
      let _this = this;
      let toResult = [];
      switch (promotionTag) {
        case _this.promotionTagDicts[0].key:
          // 低价
          _this.sku.pricePromotions.forEach((promotion, index) => {
            if (parseFloat(promotion.discount) <= '0') {
              toResult.push(
                `满${promotion.qty}件促销价¥${promotion.discountPrice}`,
              );
            }
          });
          break;
        case _this.promotionTagDicts[1].key:
          // 折扣
          _this.sku.pricePromotions.forEach((promotion, index) => {
            if (parseFloat(promotion.discount) > '0') {
              toResult.push(`满${promotion.qty}件${promotion.discount}折`);
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
    },
    showMoreExtraInfo() {
      let _this = this;
    },
    toCart() {
      let _this = this;
      _this.$router.push({
        name: `cart`,
      });
    },
  },
  filters: {
    priceFilter(value) {
      let realVal = '--';
      if (value !== null && !isNaN(value) && value !== '') {
        realVal = parseFloat(value).toFixed(2);
      }
      return realVal;
    },
    unitFilter(value, unit) {
      return value + unit;
    },
    skuImage(image) {
      return (
        image + (image.includes('?') ? '&' : '?') + 'imageView2/1/w/400/h/300'
      );
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  background: #f8f8f8;
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
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    // 轮播图
    .swipe-box {
      width: 100%;
      height: 0;
      padding-top: 100%;
      position: relative;
      .van-swipe {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        .van-swipe-item-img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .plant-1 {
      padding: 0 12px;
      color: #333;
      padding-top: 6px;
      background: #fff;
      font-size: 15px;
      text-align: left;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      .strong {
        font-weight: 700;
      }
    }

    .plant-2 {
      background: #fff;
      display: flex;
      align-items: center;
      padding: 8px 12px 0;
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
        font-size: 12px;
        color: #ff6e4c;
        display: flex;
        align-items: center;
      }
    }

    .plant-description {
      padding: 8px 12px;
      background: #fff;
      text-align: left;
      font-size: 13px;
      color: #666666;
      font-weight: 400;
      border-bottom: 1px solid #e6e6e6;
    }
    .plant-least {
      padding: 8px 12px 0;
      background: #fff;
      text-align: left;
      font-size: 13px;
      color: #666666;
    }

    .plant-3 {
      padding: 8px 12px;
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
          color: #e1251b;
          .price-symbol {
            font-size: 12px;
            font-weight: 500;
            margin-right: 4px;
          }
          .price {
            font-size: 20px;
            font-weight: 700;
          }
          .price-rise {
            font-size: 12px;
            font-weight: 500;
            margin-left: 4px;
          }
          .original-price {
            margin-left: 8px;
            font-size: 11px;
            font-weight: 400;
            color: #999999;
            text-decoration: line-through;
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
            margin-right: 8px;
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
        align-items: center;
        .cart {
          color: #999999;
          font-size: 11px;
          margin-right: 8px;
        }
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
      background-color: #fff;
      padding: 8px 12px 0;
      display: flex;
      flex-direction: column;
      .promotion-plant {
        margin-bottom: 4px;
        .promotion-group {
          display: flex;
          align-items: flex-start;
          img {
            height: 18px;
            width: auto;
          }
          .promotion-item-group {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            .promotion-item {
              line-height: 16px;
              font-size: 14px;
              color: #2c3e50;
            }
            .promotion-item:not(:first-child) {
              margin-top: 6px;
            }
          }
        }
      }
      .promotion-plant:last-child {
        margin-bottom: 0;
      }
    }
    .plant-5 {
      display: flex;
      background-color: #fff;
      border-top: 1px solid #f8f8f8;
      padding: 8px 12px;
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
    .plant-stock {
      // display: flex;
      text-align: left;
      background-color: #fff;
      border-top: 1px solid #f8f8f8;
      padding: 8px 12px;
      font-size: 12px;
      .color-blue {
        color: #58b8f7;
      }
    }
    .plant-5-1 {
      padding: 10px 20px;
      text-align: left;
      font-size: 12px;
      border-top: 1px solid #f8f8f8;
      background-color: #fff;
    }
    .info-canOrderQty {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .plant-5-2 {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      text-align: left;
      font-size: 12px;
      border-top: 1px solid #f8f8f8;
      background-color: #fff;
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
    .plant-remark {
      margin-top: 8px;
      padding: 8px 12px;
      text-align: left;
      background: #fff;
      .plant-title {
        font-size: 16px;
        font-weight: bold;
        color: #ff6e4c;
        line-height: 36px;
      }
      .plant-pre {
        font-size: 12px;
        color: #666666;
        /deep/ p {
          margin: 0 !important;
        }
      }
    }
  }

  .bottom-brand {
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
    .cell-item {
      color: #969799;
      .van-cell__value--alone {
        color: #969799;
      }
    }
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
    background-image: url('../img/cart-cut.png');
    width: 20px;
    height: 20px;
  }
  /deep/ .van-stepper__plus {
    background-image: url('../img/cart-add.png');
    width: 20px;
    height: 20px;
  }
}
.item-con {
  padding: 10px 10px 0 0;
  font-size: 12px;
  color: #777b87;
  line-height: 17px;
  height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
