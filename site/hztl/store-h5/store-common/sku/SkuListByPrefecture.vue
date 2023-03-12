<template>
    <div class="search-result">
        <van-nav-bar class="nav-bar" fixed>
            <div slot="title" class="title">
                <img class="back" src="../img/back-icon.png" @click="historyBack(-1)">
                <CartIcon ref="CartIcon"/>
                <!-- <span class="titleName">{{name}}</span> -->
                <span class="filter" @click="showFilter=true">筛选</span>
            </div>
        </van-nav-bar>
        <div class="search-content">
            <div class="list">
                <van-list v-model="loading" :finished="finished" :offset="400" @load="load">
                    <div v-for="(sku, index) in skus" :key="index">
                        <SkuCard class="sku-card" v-model="skus[index]" @change="changeSku"/>
                    </div>
                </van-list>
                <div class="no-result-hint" v-if="skus.length==0 && loadedData">
                    <img src="../img/icon-noresult.png" class="empty-car">
                    <p style="color: #777B87;font-size:0.43rem;">没有搜索结果</p>
                </div>
            </div>
        </div>
        <div class="bottom-brand" v-if="skuInfo.hasData">
            <div class="fee-info">
                <div class="total-fee">
                    <span class="fee-symbol">¥</span>
                    <span class="fee">{{skuInfo.totalFee | priceFilter}}</span>
                </div>
                <div class="discount-fee" v-if="skuInfo.discountFee>0">
                    <span class="title">优惠</span>
                    <span class="fee-symbol">¥</span>
                    <span class="fee">{{skuInfo.discountFee | priceFilter}}</span>
                </div>
            </div>
            <van-button
                class="button"
                plain
                round
                color="#ff6e4c"
                type="primary"
                @click="addCart"
            >加入购物车</van-button>
            <van-button class="button" round color="#ff6e4c" type="primary" @click="confirmOrder">提交订单</van-button>
        </div>
        <van-popup
            class="filter-pop"
            v-model="showFilter"
            position="right"
            :style="{ width: '70%' }"
        >
            <div class="filter">
                <div class="filter-group">
                    <p class="label">汽车品牌</p>
                    <div class="content">
                        <template v-if="filter.vehBrands && filter.vehBrands.length>0">
                            <van-button
                                class="button"
                                size="small"
                                round
                                v-for="(label, index) in filter.vehBrands"
                                :key="index"
                                :class="[filterVehBrand == label ? 'active' : '']"
                                @click="filterVehBrand = label"
                            >{{label}}</van-button>
                        </template>
                        <p
                            class="none-content"
                            v-if="!filter.vehBrands || filter.vehBrands.length==0"
                        >暂无可选汽车品牌</p>
                    </div>
                </div>
                <div class="filter-group">
                    <p class="label">配件品牌</p>
                    <div class="content">
                        <template v-if="filter.brands && filter.brands.length>0">
                            <van-button
                                class="button"
                                size="small"
                                round
                                v-for="(label, index) in filter.brands"
                                :key="index"
                                :class="[filterBrandsContain(label) ? 'active' : '']"
                                @click="filterBrandsChoise(label)"
                            >{{label}}</van-button>
                        </template>
                        <p
                            class="none-content"
                            v-if="!filter.brands || filter.brands.length==0"
                        >暂无可选配件品牌</p>
                    </div>
                </div>
            </div>
            <div class="operation">
                <van-button class="reset" @click="filterReset">重置</van-button>
                <van-button class="confirm" @click="filterConfirm">确认</van-button>
            </div>
        </van-popup>
    </div>
</template>
<script>
import Vue from "vue";
import SkuCard from "../component/Sku/Card";
import CartIcon from "../component/Cart/Icon";
import { GetQueryString } from "../request/http";
import request, { URL_MODULE } from "@/request";
import {
  NavBar,
  Tag,
  Search,
  DropdownMenu,
  DropdownItem,
  Icon,
  Toast,
  Button,
  Popup
} from "vant";
Vue.use(NavBar)
  .use(Tag)
  .use(Search)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Icon)
  .use(Toast)
  .use(Button)
  .use(Popup);
export default {
  name: "skuListByPrefecture",
  components: {
    CartIcon,
    SkuCard
  },
  data() {
    return {
      areaId: "",
      skuInfo: {
        hasData: false,
        totalFee: 0.0,
        discountFee: 0.0,
        selectedMap: {}
      },
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
      loadedData: false,
      showFilter: false,
      filterBrands: [],
      filterVehBrand: "",
      skus: [],
      filter: {}
    };
  },
  created() {
    this.areaId = GetQueryString("id");
  },
  mounted: function() {
    let _this = this;
    _this.page = 1;
    _this.skus = [];
    _this.loading = true;
    _this.finished = false;
    _this.loadedData = false;
    _this.initValue();
    _this.skuInfo.totalFee = 0.0;
    _this.skuInfo.discountFee = 0.0;
    _this.skuInfo.selectedMap = {};
    _this.loadData();
    _this.skuInfo.totalFee = 0.0;
    _this.skuInfo.discountFee = 0.0;
    _this.skuInfo.selectedMap = {};
    _this.loadFilter();
  },
  methods: {
    load() {
      let _this = this;
      _this.loadData();
    },
    onSearch() {
      //拼接搜索字段
      this.page = 1;
      this.loadData();
    },
    filterReset() {
      let _this = this;
      _this.filterBrands = [];
      _this.filterVehBrand = "";
    },
    filterConfirm() {
      let _this = this;
      _this.showFilter = false;
      _this.onSearch();
    },
    changeSku(sku) {
      let _this = this;
      _this.initValue();
      if (sku.selectedQty > 0) {
        let toSelectedMap = {
          id: sku.id,
          price: sku.price,
          originalPrice: sku.price,
          selectedQty: sku.selectedQty,
          companyId: sku.companyId,
          promotionCombine: false,
          storeAreaDetailId: 0
        };
        // 存在促销，判断定购量大于等于促销起购量时，重新设置价格及原价
        if (sku.pricePromotions && sku.pricePromotions.length > 0) {
          let len = sku.pricePromotions.length;
          for (let i = 0; i < len; i++) {
            let pricePromotion = sku.pricePromotions[len - 1 - i];
            if (parseFloat(pricePromotion.qty) <= sku.selectedQty) {
              toSelectedMap.price = pricePromotion.discountPrice;
              toSelectedMap.originalPrice = pricePromotion.originalPrice;
              break;
            }
          }
        }
        _this.skuInfo.selectedMap[sku.id] = toSelectedMap;
      } else {
        delete _this.skuInfo.selectedMap[sku.id];
      }
      let totalFee = 0.0;
      let discountFee = 0.0;
      for (let id in _this.skuInfo.selectedMap) {
        totalFee +=
          parseInt(_this.skuInfo.selectedMap[id].selectedQty) *
          parseFloat(_this.skuInfo.selectedMap[id].price);
        discountFee +=
          parseInt(_this.skuInfo.selectedMap[id].selectedQty) *
          (parseFloat(_this.skuInfo.selectedMap[id].originalPrice) -
            parseFloat(_this.skuInfo.selectedMap[id].price));
      }
      _this.skuInfo.totalFee = totalFee;
      _this.skuInfo.discountFee = discountFee;
      _this.updateValue();
    },
    updateValue() {
      let _this = this;
      _this.skuInfo.hasData = _this.skus.length > 0;
      _this.$emit("change", _this.skuInfo);
    },
    initValue() {
      let _this = this;
      if (!_this.skuInfo) {
        _this.skuInfo["hasData"] = false;
        _this.skuInfo["totalFee"] = 0.0;
        _this.skuInfo["discountFee"] = 0.0;
        _this.skuInfo["selectedMap"] = {};
      } else {
        if (_this.skuInfo.hasData === undefined) {
          _this.skuInfo.hasData = false;
        }
        if (!_this.skuInfo.totalFee) {
          _this.skuInfo.totalFee = 0.0;
        }
        if (!_this.skuInfo.discountFee) {
          _this.skuInfo.discountFee = 0.0;
        }
        if (!_this.skuInfo.selectedMap) {
          _this.skuInfo.selectedMap = {};
        }
      }
    },
    // 加载筛选项
    loadFilter() {
      let _this = this;
      let postUrl = "/alliances/stores/filter-by-area-id";
      request({
        baseURL: URL_MODULE.united,
        url: postUrl,
        params: {
          areaId: parseInt(this.areaId)
        }
      })
      .then(res => {
        _this.filter = res;
      })
      .catch(() => {
        _this.filter = {};
      });
    },
    // 加入购物车
    addCart() {
      let _this = this;
      _this.unlogin();
      let toCartParams = [];
      for (let id in _this.skuInfo.selectedMap) {
        let selected = _this.skuInfo.selectedMap[id];
        toCartParams.push({
          skuId: selected.id,
          price: selected.price,
          qty: selected.selectedQty,
          sellerCompanyId: selected.companyId,
          promotionCombine: selected.promotionCombine,
          storeAreaDetailId: selected.storeAreaDetailId,
          remarks: "",
          offiAccount: true
        });
      }
      if (toCartParams.length <= 0) {
        Toast.fail("请选择加入购物车数量");
      } else {
        let url = "";
        let data = {};
        if (toCartParams.length > 1) {
          url = "/carts";
          data = { data: toCartParams };
        } else {
          url = "/carts/create";
          data = toCartParams[0];
        }
        request({
          method: "post",
          baseURL: URL_MODULE.united,
          url,
          data
        })
        .then(() => {
          _this.$refs.CartIcon.reloadCartNumber();
          _this.addCartAfter();
          Toast.success("加入购物车成功");
        }).catch(err => {
          if(err && err.message) {
            Toast.fail(err.message);
          }
        });
      }
    },
    addCartAfter() {
      let _this = this;
      for (let sku of _this.skus) {
        sku.cartQty =
          parseInt(sku.cartQty ? sku.cartQty : 0) + parseInt(sku.selectedQty);
        sku.selectedQty = 0;
      }
      _this.skuInfo.totalFee = 0.0;
      _this.skuInfo.discountFee = 0.0;
      _this.skuInfo.selectedMap = {};
      _this.updateValue();
    },
    // 结算
    confirmOrder() {
      let _this = this;
      _this.unlogin();
      let sellers = {};
      let sellerCount = 0;
      for (let id in _this.skuInfo.selectedMap) {
        let selected = _this.skuInfo.selectedMap[id];
        let seller = { skus: [] };
        if (sellers[selected.companyId] !== undefined) {
          seller = sellers[selected.companyId];
        }
        seller.skus.push({
          id: parseInt(selected.id),
          qty: parseInt(selected.selectedQty),
          promotionCombine: selected.promotionCombine
        });
        sellers[selected.companyId] = seller;
        sellerCount++;
      }
      if (sellerCount <= 0) {
        Toast.fail("请选择结算配件");
      } else {
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
      }
    },
    // 筛选相关
    filterBrandsContain(str) {
      let _this = this;
      var i = _this.filterBrands.length;
      while (i--) {
        if (_this.filterBrands[i] === str) {
          return true;
        }
      }
      return false;
    },
    filterBrandsChoise(str) {
      let _this = this;
      if (_this.filterBrandsContain(str)) {
        let len = _this.filterBrands.length;
        let newArr = [];
        for (var i = 0; i < len; i++) {
          if (_this.filterBrands[i] !== str) {
            newArr.push(_this.filterBrands[i]);
          }
        }
        _this.filterBrands = newArr;
      } else {
        let newArr = _this.filterBrands;
        newArr.push(str);
        _this.filterBrands = newArr;
      }
    },
    loadData() {
      this.skus = [];
      let _this = this;
      let postUrl = "/alliances/stores/list-by-area-id";
      request({
        baseURL: URL_MODULE.united,
        url: postUrl,
        params: {
          areaId: this.areaId,
          page: this.page,
          pageSize: this.pageSize,
          brand: this.filterBrands.join(","),
          vehBrand: this.filterVehBrand
        }
      })
      .then(res => {
        let data = res;
        // 处理返回的rows
        if (data.rows && data.rows.length) {
          for (let sku of data.rows) {
            _this.skus.push(_this.skuToShowObj(sku));
          }
        }
        // 处理分页器
        _this.loading = false;
        if (data.totalPage) {
          if (_this.page >= data.totalPage) {
            _this.finished = true;
          } else {
            _this.page += 1;
          }
        } else {
          _this.finished = true;
        }
        _this.updateValue();
      })
      .catch(err => {
        if(err && err.message) {
          Toast.fail(err.message);
        }
        _this.finished = true;
        _this.loading = false;
        _this.updateValue();
      });
      _this.loadedData = true;
    },
    skuToShowObj(sku) {
      let hasStockQty = false;
      let stockQtyTxt = "";
      let maxStockQty = null;
      let priceTxt = null;
      if (sku.relation && sku.relation != "") {
        priceTxt = parseFloat(sku.minPrice);
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
            stockQtyTxt = stockQty.toFixed(0);
          }
        }
      } else {
        hasStockQty = false;
        maxStockQty = 0;
        if (sku.stockEnough) {
          stockQtyTxt = "有货";
        } else {
          stockQtyTxt = "无货";
        }
      }
      return {
        skuType: "NORMAL",
        id: sku.id,
        image: sku.image,
        name: sku.stdName,
        productionPlace: sku.swProductionPlace,
        brand: sku.swBrand,
        oeCode: sku.stdOeCode,
        selectedQty: 0,
        price: parseFloat(sku.price),
        priceTxt: priceTxt,
        originalPrice: parseFloat(sku.originalPrice),
        pricePromotions: sku.pricePromotions ? sku.pricePromotions : [],
        giftPromotions: sku.giftPromotions ? sku.giftPromotions : [],
        promotionTags: sku.promotionTags ? sku.promotionTags : 0,
        hasStockQty: hasStockQty,
        stockQtyTxt: stockQtyTxt,
        maxStockQty: maxStockQty,
        cartQty: parseInt(sku.cartQty),
        companyId: sku.companyId,
        areaId: this.areaId,
        phone: sku.phone,
        companyName: sku.companyName,
        provideInstall: sku.provideInstall
      };
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
    }
  }
};
</script>

<style lang="less" scoped>
// 查询结果样式
.search-result {
  background: #f8f8f8;
  overflow: hidden;
  min-height: 100%;
  .nav-bar {
    /deep/ .van-nav-bar__title {
      max-width: 100%;
    }
    .title {
      display: flex;
      align-items: center;
      padding-left: 10px;
      padding-right: 10px;
      .back {
        width: 8px;
        height: 14px;
      }
      .cart {
        margin-left: 10px;
      }
      .search {
        height: 46px;
        padding-left: 0;
        padding-right: 0;
        margin-left: 0;
        margin-right: 10px;
        flex: 1;
        /deep/ .van-field__control::-webkit-input-placeholder {
          color: #aaacb7;
        }
        /deep/ .van-field__control::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #aaacb7;
        }
        /deep/ .van-field__control:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #aaacb7;
        }
        /deep/ .van-field__control:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #aaacb7;
        }
      }
      .normal-search {
        /deep/ .van-field__left-icon {
          i.van-icon-search {
            color: #aaacb7;
          }
        }
      }
      .selector-search {
        .selector {
          height: 25px;
          width: 56px;
          background: none;
          margin-right: 8px;
          /deep/ .van-dropdown-menu__title {
            font-size: 14px;
            color: #aaacb7;
            padding: 0 10px 0 0;
          }
          /deep/ .van-dropdown-item--down {
            top: 46px !important;
            width: 30%;
            left: 88px;
          }
          /deep/ .van-dropdown-item__content {
            border-radius: 5px;
          }
          /deep/ .van-cell__title {
            margin-left: 10px;
          }
          /deep/ .van-cell__value {
            margin-right: 10px;
          }
        }
        .selector::after {
          border: none;
        }
      }
      .filter {
        color: #aaacb7;
        font-size: 14px;
        margin-left: auto;
      }
    }
  }
  .search-content {
    padding-top: 44px;
    padding-bottom: 64px;
    .search-remark {
      margin: 0;
      padding: 0;
      height: 30px;
      background: #FF6E4C;
      line-height: 30px;
      color: #fff;
      font-size: 14px;
    }
    .list {
      padding: 0 10px;
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
    display: flex;
    align-items: center;
    height: 46px;
    .icon {
      width: 24px;
      height: 24px;
    }
    .cart-num {
      position: absolute;
      top: 3px;
      left: 30px;
      padding-left: 0.8em;
      padding-right: 0.8em;
      font-size: 10px;
    }
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

// 筛选弹出样式
.filter-pop {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .filter {
    width: 100%;
    height: 100%;
    margin-bottom: 50px;
    overflow: auto;
    .filter-group {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      width: 100%;
      padding: 0 10px 10px;
      .label {
        align-self: flex-start;
        font-size: 14px;
        color: rgb(51, 51, 51);
      }
      .content {
        // align-self: center;
        display: flex;
        // align-items: center;
        justify-content: space-between;
        // display: -webkit-flex;
        flex-wrap: wrap;
        width: 100%;
        .button {
          margin-bottom: 10px;
          width: 30%;
          color: #171c24;
          background: #f8f8f8;
          border: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .button.active {
          background-color: #ff6e4c;
          color: #fff;
        }
      }
      .content:after {
        display: block;
        content: "";
        width: 30%;
        height: 0px;
      }
    }
    .none-content {
      font-size: 14px;
      margin: 0;
    }
  }
  .operation {
    height: 50px;
    width: 100%;
    background: #f2f2f2;
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .reset {
      background: #fff;
      border: 0.02667rem solid #ccced4;
      color: #777b87;
      border-radius: 6px;
      width: 100px;
      height: 40px;
      line-height: 40px;
    }
    .confirm {
      background-color: #ff6e4c;
      color: #fff;
      border-radius: 6px;
      width: 100px;
      height: 40px;
      line-height: 40px;
    }
  }
}
.titleName {
  margin-left: 55px;
}
.totalInfo {
  height: 55px;
  width: 100%;
  margin: 10px 0;
  background: #ffffff;
  .img {
    width: 35px;
    height: 35px;
    margin: 10px 15px 0;
    float: left;
    background-image: url("../img/Common_goods_def_img.png");
    background-size: 100% 100%;
  }
  .info {
    float: left;
    width: 310px;
    position: relative;
    font-size: 12px;
    text-align: left;
    padding-top: 10px;
    p {
      color: #949494;
    }
    span {
      position: absolute;
      right: 17px;
      top: 15px;
      color: #ea9e44;
    }
  }
}
// 无结果样式
.no-result-hint {
  margin-top: 50%;
  transform: translateY(-50%);
  .empty-car {
    width: 180px;
    height: 180px;
  }
  p {
    font-size: 14px;
    color: #777b87;
    letter-spacing: 1.07px;
    text-align: center;
    line-height: 20px;
  }
}
</style>