<template>
  <div class="search-result">
    <van-nav-bar class="nav-bar" fixed :z-index="999">
      <div slot="title" class="title">
        <img class="back" src="../img/back-icon.png" @click="historyBack(-1)" />
        <CartIcon ref="CartIcon"/>
        <template v-if="wantSearchTypes && wantSearchTypes.length>0">
          <van-search
            class="search selector-search"
            :class="[wantSearchTypes.length>1 ? 'selector-search' : 'normal-search']"
            v-model="inputSearch"
            shape="round"
            @search="onSearch"
            :placeholder="getCurrentSearchTypePlaceholder()"
          >
            <van-dropdown-menu
              v-if="wantSearchTypes.length>1"
              slot="left-icon"
              :overlay="false"
              class="selector"
            >
              <van-dropdown-item v-model="currentSearchType" :options="selectorSearchOptions" />
            </van-dropdown-menu>
          </van-search>
        </template>
        <span class="filter" @click="showFilter=true">筛选</span>
      </div>
    </van-nav-bar>
    <div class="search-content">
      <ListGroupSkuByPromotion
            ref="ListGroupSkuByPromotion"
            class="list"
            :query="groupSkuQuery"
            v-model="groupSkuInfo"
          />
    </div>

    <div class="bottom-brand" v-if="skuInfo.hasData || groupSkuInfo.hasData">
      <div class="fee-info">
        <div class="total-fee">
          <span class="fee-symbol">¥</span>
          <span class="fee">{{(skuInfo.totalFee + groupSkuInfo.totalFee) | priceFilter}}</span>
        </div>
        <div class="discount-fee" v-if="(skuInfo.discountFee + groupSkuInfo.discountFee)>0">
          <span class="title">优惠</span>
          <span class="fee-symbol">¥</span>
          <span class="fee">{{(skuInfo.discountFee + groupSkuInfo.discountFee) | priceFilter}}</span>
        </div>
      </div>
      <van-button class="button" plain round color="#ff6e4c" type="primary" @click="addCart">加入购物车</van-button>
      <van-button class="button" round color="#ff6e4c" type="primary" @click="confirmOrder">提交订单</van-button>
    </div>

    <van-popup class="filter-pop" v-model="showFilter" position="right" :style="{ width: '70%' }">
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
            <p class="none-content" v-if="!filter.vehBrands || filter.vehBrands.length==0">暂无可选汽车品牌</p>
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
            <p class="none-content" v-if="!filter.brands || filter.brands.length==0">暂无可选配件品牌</p>
          </div>
        </div>
      </div>
      <div class="operation">
        <van-button class="reset" @click="filterReset">重置</van-button>
        <van-button class="confirm" @click="filterConfirm">确认</van-button>
      </div>
    </van-popup>
    <Load :show="show" />
  </div>
</template>
<script>
import Vue from "vue";
import ListSkuByPromotion from "../component/Sku/ListByPromotion";
import ListGroupSkuByPromotion from "../component/Sku/ListGroupByPromotion";
import CartIcon from "../component/Cart/Icon";
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
  Popup,
  Tab,
  Tabs
} from "vant";
Vue.use(NavBar)
  .use(Tag)
  .use(Search)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Icon)
  .use(Toast)
  .use(Button)
  .use(Popup)
  .use(Tab)
  .use(Tabs);
export default {
  name: "skuListByPromotion",
  components: {
    ListSkuByPromotion,
    ListGroupSkuByPromotion,
    CartIcon
  },
  data() {
    return {
      searchTypes: {
        keyword: {
          text: "关键字",
          value: "keyword",
          placeholder: "请输入配件名称等关键字"
        },
        oe: {
          text: "OE号",
          value: "oe",
          placeholder: "请输入OE号"
        }
      },
      skuQuery: "",
      groupSkuQuery: "",
      skuInfo: {
        hasData: false,
        totalFee: 0.0,
        discountFee: 0.0,
        selectedMap: {}
      },
      groupSkuInfo: {
        hasData: false,
        totalFee: 0.0,
        discountFee: 0.0,
        selectedMap: {}
      },
      showFilter: false,
      filter: {},
      filterBrands: [],
      filterVehBrand: "",
      wantSearchTypes: [],
      currentSearchType: "",
      selectorSearchOptions: [],
      inputSearch: "",
      level1: {},
      show:false
    };
  },
  mounted: function() {
    let _this = this;
    let query = _this.$route.query;
    _this.wantSearchTypes = ["keyword", "oe"];
    _this.level1.areaId = query.areaId;
    _this.initSearch();
    _this.loadFilter();
    _this.onSearch();
    _this.show=true;
  },
  methods: {
    // 获取当前搜索方式
    getCurrentSearchTypePlaceholder() {
      let _this = this;
      let result = "";
      if (_this.searchTypes[_this.currentSearchType]) {
        result = _this.searchTypes[_this.currentSearchType].placeholder;
      }
      return result;
    },
    // 初始化搜索方式
    initSearch() {
      let _this = this;
      let wantSearchTypeLen = _this.wantSearchTypes.length;
      if (wantSearchTypeLen > 0 && !_this.currentSearchType) {
        _this.currentSearchType = _this.wantSearchTypes[0];
      }
      if (wantSearchTypeLen > 1) {
        let selectorSearchOptions = [];
        _this.wantSearchTypes.forEach((wantSearchType, index) => {
          selectorSearchOptions.push(_this.searchTypes[wantSearchType]);
        });
        _this.selectorSearchOptions = selectorSearchOptions;
      }
    },
    // 搜索
    onSearch() {
      let _this = this;
      _this.skuQuery = _this.formDataString(_this.skuListData());
      _this.groupSkuQuery = _this.formDataString(_this.groupSkuListData());
      _this.show=false;
    },
    // 加载筛选项
    loadFilter() {
      let _this = this;
      request({
        baseURL: URL_MODULE.united,
        url: `/companies/stores/filter?${_this.loadFilterQuery()}`
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
          allianceId: _this.axios.prototype.allianceId,
          promotionCombine: selected.promotionCombine,
          storeAreaDetailId: selected.storeAreaDetailId,
          remarks: "",
          offiAccount: true
        });
      }
      for (let id in _this.groupSkuInfo.selectedMap) {
        let selected = _this.groupSkuInfo.selectedMap[id];
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
          _this.$refs.ListSkuByPromotion.addCartAfter();
          _this.$refs.ListGroupSkuByPromotion.addCartAfter();
          Toast.success("加入购物车成功");
        }).catch(err => {
          if(err && err.message) {
            Toast.fail(err.message);
          }
        });
      }
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
          promotionCombine: selected.promotionCombine,
          storeAreaDetailId: selected.storeAreaDetailId
        });
        sellers[selected.companyId] = seller;
        sellerCount++;
      }
      for (let id in _this.groupSkuInfo.selectedMap) {
        let selected = _this.groupSkuInfo.selectedMap[id];
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
    // 查询参数
    // filter查询参数
    loadFilterQuery() {
      let _this = this;
      return `areaId=${_this.level1.areaId}`;
    },
    // 单品查询参数
    skuListData() {
      let _this = this;
      let data = new Map();
      _this.appendLevel1QueryData(data);
      _this.appendLevel2QueryData(data);
      data.set("type", 0);
      return data;
    },
    // 组合商品查询参数
    groupSkuListData() {
      let _this = this;
      let data = new Map();
      _this.appendLevel1QueryData(data);
      _this.appendLevel2QueryData(data);
      data.set("type", 1);
      return data;
    },
    // 一级查询参数
    appendLevel1QueryData(data) {
      let _this = this;
      let level1 = _this.level1;
      data.set("areaId", level1.areaId);
    },
    // 二级查询参数
    appendLevel2QueryData(data) {
      let _this = this;
      switch (_this.currentSearchType) {
        case "keyword":
          if (_this.inputSearch) {
            data.set("keyword", _this.inputSearch);
          }
          break;
        case "oe":
          if (_this.inputSearch) {
            data.set("oe", _this.inputSearch);
          }
          break;
      }
      data.set("brands", _this.filterBrands.join(","));
      data.set("vehBrand", _this.filterVehBrand);
    },
    formDataString(data) {
      let items = [];
      data.forEach(function(value, key) {
        if (value !== undefined) {
          items.push(`${key}=${value}`);
        }
      });
      return items.join("&");
    },
    // 跳转
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
  // 查询页样式
  .search-content {
    padding-top: 44px;
    padding-bottom: 64px;
    .tabs {
      /deep/ .van-tabs__line {
        background: rgb(0, 168, 234);
      }
    }
    .list {
      padding: 0 10px;
    }
  }
}
// 底部按钮样式
// .bottom-brand {
//   left: 0;
//   bottom: 0;
//   position: fixed;
//   width: 100%;
//   height: 59px;
//   background: #fff;
//   display: flex;
//   align-items: center;
//   // justify-content: space-around;
//   .fee-info {
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//     flex: 1;
//     .total-fee {
//       font-size: 16px;
//       color: #ff424d;
//     }
//     .discount-fee {
//       font-size: 12px;
//       color: #f7a017;
//     }
//   }
//   .button {
//     margin-right: 8px;
//     width: 90px;
//     // width: 46%;
//   }
//   /deep/ .van-button {
//     border-radius: 6px;
//     font-size: 12px;
//   }
//   /deep/ .van-button--normal {
//     padding: 0;
//   }
// }

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
</style>