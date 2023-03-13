<template>
    <div class="search-result">
        <van-nav-bar class="nav-bar" fixed>
            <div slot="title" class="title">
                <img class="back" src="../img/back-icon.png" @click="historyBack(-1)">
                <CartIcon ref="CartIcon"/>
                <!-- <span class="titleName">{{name}}</span> -->
                <div class="select-con">
                  <van-dropdown-menu active-color="#1989fa" class="selectInput">
                    <van-dropdown-item 
                        v-model="searchKey" 
                        :options="searchTypeList" 
                        @change="selectChange"/>
                  </van-dropdown-menu>
                  <!-- <select v-model="searchKey" class="selectInput">
                      <option
                          v-for="(item,index) in searchTypeList"
                          :key="index"
                          :value="item.val"
                      >{{item.name}}</option>
                  </select> -->
                  <span class="border_right"></span>
                  <input
                      type="text"
                      class="keywordInput"
                      v-model="searchkeyword"
                      placeholder="请输入配件名称等关键字"
                  >
                  <span class="searchIcon" @click="searchByKey"></span>
                </div>
                <span class="filter" @click="showFilter=true">筛选</span>
            </div>
        </van-nav-bar>
        <div class="search-content">
            <div class="totalInfo" v-if="oe&&price4s&&count">
                <div class="img"></div>
                <div class="info">
                    <p>件号：{{oe}}</p>
                    <p>4S价：{{price4s}}</p>
                    <span>商品：{{count}}种</span>
                </div>
            </div>
            <p v-if="querySearchType == 'vehicle'" class="search-remark">
              {{searchRemark}}
              <van-icon name="cross" class="clear_icon" @click="clearVehicle"/>
            </p>
            <SkuList ref="SkuList" class="list" :query="skuQuery" v-model="skuInfo"/>
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
import SkuList from "../component/Sku/List";
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
  name: "skuList",
  components: {
    SkuList,
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
      skuInfo: {
        hasData: false,
        totalFee: 0.0,
        discountFee: 0.0,
        selectedMap: {}
      },
      showFilter: false,
      filter: {},
      filterBrands: [],
      filterVehBrand: "",
      showSearchRemark: false,
      searchRemark: "",
      // searchTypeList: [{
      //   val: "oe",
      //   name: "OE"
      // },
      // {
      //   val: "keyword",
      //   name: "关键字"
      // }],
      searchTypeList:[
        {
          value: "oe",
          text: "OE"
        },
        {
          value: "keyword",
          text: "关键字"
        }
      ],
      searchKey:"keyword",
      querySearchType: "",
      searchkeyword: "",
      level1: {},
      name: "",
      count: "",
      price4s: "",
      oe: "",
      brands:'',
      swCategory:'',
      priceGreaterThanZero:false,
      isClick: false
    };
  },

  mounted: function() {
    let _this = this;
    let query = _this.$route.query;
    _this.searchRemark = query.remark ? query.remark : _this.vinShow(query);
    _this.name = query.name;
    _this.count = query.count;
    _this.price4s = query.price;
    _this.oe = query.oe;
    _this.brands = query.brands;
    _this.swCategory = query.swCategory;//配件类别
    _this.querySearchType = query.searchType;
    _this.priceGreaterThanZero = query.priceGreaterThanZero;
    switch (query.searchType) {
      case "vehicle":
        _this.showSearchRemark = true;
        _this.level1.brand = query.brand;
        _this.level1.subBrand = query.subBrand;
        _this.level1.vehSeries = query.vehSeries;
        _this.level1.year = query.year;
        _this.level1.transmission = query.transmission;
        _this.level1.displacement = query.displacement;
        _this.level1.chassisNo = query.chassisNo;
        _this.level1.driverType = query.driverType;
        break;
      case "oe":
        _this.level1.searchType = "oe";
        _this.level1.keyWord = query.oe;
        break;
      case "keyword":
        _this.level1.keyWord = query.keyword;
        break;
      case "skuIds":
        _this.level1.ids = query.ids;
        break;
      default:
        break;
    }
    // if (!(_this.isXfs && !this.hasCookie)) {
    //   _this.loadCartNumber();
    // }
    _this.onSearch();
    _this.loadFilter();
  },
  methods: {
    selectChange(val){
      this.searchKey = val;
    },
    clearVehicle(){
      this.querySearchType = '';
      this.level1.subBrand = '';
      this.level1.vehSeries = '';
      this.level1.year = '';
      this.level1.displacement = '';
    },
    searchByKey(){
      this.isClick = true;
      this.onSearch();
      this.loadFilter();
    },
    // 搜索
    onSearch() {
      let _this = this;
      if (_this.needLoadPageData()) {
        _this.skuQuery = _this.formDataString(_this.skuListData());
      } else {
        _this.skuQuery = "";
      }
    },
    // 加载筛选项
    loadFilter() {
      let _this = this;
      let postUrl = "/company-skus/filters";
      if (_this.needLoadPageData()) {
        if (!this.hasCookie && this.needVisitor) {
          postUrl = "/open/company-skus/filters";
        }
        request({
          method: "post",
          baseURL: URL_MODULE.united,
          url: postUrl,
          data: _this.skuQuery
        })
        .then(res => {
          _this.filter = res;
        })
        .catch(() => {
          _this.filter = {};
        });
      } else {
        _this.filter = {};
      }
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
        }).then(() => {
          _this.$refs.CartIcon.reloadCartNumber();
          _this.$refs.SkuList.addCartAfter();
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
    // 是否需要查询
    needLoadPageData() {
      let _this = this;
      let needLoadPageData = true;
      if (_this.querySearchType == "skuIds" && !_this.level1.ids) {
        needLoadPageData = false;
      }
      return needLoadPageData;
    },
    // filter查询参数
    filterData() {
      let _this = this;
      let data = new Map();
      _this.appendLevel1QueryData(data);
      data.set("targets", "brands,vehBrands");
      return data;
    },
    // 配件查询参数
    skuListData() {
      let _this = this;
      let data = new Map();
      _this.appendLevel1QueryData(data);
      _this.appendLevel2QueryData(data);
      data.set("cartQty", true);
      data.set("swCategory", _this.swCategory);
      data.set('brands',_this.brands);
      data.set('priceGreaterThanZero',_this.priceGreaterThanZero);
      return data;
    },
    // 一级查询参数
    appendLevel1QueryData(data) {
      let _this = this;
      let level1 = _this.level1;
      data.set("matchSw", true);
      data.set("vehModel", level1.vehModel); // 兼容以前
      data.set("brand", level1.brand);
      data.set("subBrand", level1.subBrand);
      data.set("vehSeries", level1.vehSeries);
      data.set("year", level1.year);
      data.set("transmission", level1.transmission);
      data.set("displacement", level1.displacement);
      data.set("chassisNo", level1.chassisNo);
      data.set("driverType", level1.driverType);
      data.set("searchType", level1.searchType);
      data.set("keyWord", level1.keyWord);
      data.set("ids", level1.ids);
      if (!this.hasCookie && this.needVisitor) {
        data.set("allianceId", _this.axios.prototype.allianceId);
      }
      data.set("relations", "sm");
    },
    // 二级查询参数
    appendLevel2QueryData(data) {
      let _this = this;
      switch (_this.querySearchType) {
        case "vehicle":
          switch (_this.searchKey) {
            case "keyword":
              if (_this.searchkeyword) {
                data.set("keyWord", _this.searchkeyword);
              }
              break;
            case "oe":
              if (_this.searchkeyword) {
                data.set("searchType", "oe");
                data.set("keyWord", _this.searchkeyword);
              }
              break;
          }
          break;
        case "oe":
          if (this.isClick) {
            if(_this.searchKey === "oe") {
              data.set("searchType", "oe");
            } else {
              data.set("searchType", "keyword");
            }
            data.set("keyWord", _this.searchkeyword);
          }
          break;
        case "keyword":
          if (this.isClick) {
            if(_this.searchKey === "oe") {
              data.set("searchType", "oe");
            } else {
              data.set("searchType", "keyword");
            }
            data.set("keyWord", _this.searchkeyword);
          } else {
            data.set("codes", _this.searchkeyword);
            data.set("matchMethod", "any");
          }
          break;
        case "skuIds":
          switch (_this.searchKey) {
            case "keyword":
              if (_this.searchkeyword) {
                data.set("keyWord", _this.searchkeyword);
              }
              break;
            case "oe":
              if (_this.searchkeyword) {
                data.set("searchType", "oe");
                data.set("keyWord", _this.searchkeyword);
              }
              break;
          }
          break;
          default:
            switch (_this.searchKey) {
              case "keyword":
                if (_this.searchkeyword) {
                  data.set("keyWord", _this.searchkeyword);
                }
                break;
              case "oe":
                if (_this.searchkeyword) {
                  data.set("searchType", "oe");
                  data.set("keyWord", _this.searchkeyword);
                }
                break;
            }
          break;
      }
      if(_this.filterBrands&&_this.filterBrands.length>0){
        data.set("brands", _this.filterBrands.join(","));
      }
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
    },
    // vin定型后展示车型信息
    vinShow(value) {
        let text = "";
        if (value.brand) {
            text += value.brand;
        }
        if (value.subBrand) {
            text += " " + value.subBrand;
        }
        if (value.vehSeries) {
            text += " " + value.vehSeries;
        }
        if (value.year) {
            text += " " + value.year;
        }
        if (value.displacement) {
            text += " " + value.displacement;
        }
        if (value.transmission) {
            text += " " + value.transmission;
        }
        if (value.chassisNo) {
            text += " " + value.chassisNo;
        }
        if (value.driverType) {
            text += " " + value.driverType;
        }
        return text;
    },
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
      .clear_icon{
        float: right;
        line-height: 30px;
        margin-right: 12px;
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
.select-con{
  background: rgba(244,244,244,0.47);
  border: 1px solid #999999;
  border-radius: 18px;
  background: #ffffff;
  // width: 260px;
  height: 35px;
  display: flex;
  align-items: center;
  .selectInput {
    color: #999999;
    width: 60px;
    height: 27px;
    border:none;
    background: #ffffff;
    margin-left: 6px;
    margin-right: 5px;
    appearance: none;
    -webkit-appearance: none;   /*去除chrome浏览器的默认下拉图片*/
    -moz-appearance: none;  /*去除Firefox浏览器的默认下拉图片*/
    // background:url('../img/icon-sanjiao.png') no-repeat right center;
    // background-size: 12px 9px;
    text-indent:0.01px;
    text-overflow:"";
    option {
      color: #999999;
    }
    /deep/.van-dropdown-menu__bar{
      height: 27px;
      box-shadow: none;
    }
    /deep/.van-ellipsis{
      font-size: 14px;
    }
    /deep/.van-dropdown-item--down {
      top:1.1rem!important;
    }
    /deep/.van-dropdown-menu__title::after{
      border-color: transparent transparent #999999 #999999;
    }
    /deep/.van-dropdown-menu__title--active::after {
        border-color: transparent transparent currentColor currentColor;
    }
  }
  .border_right{
    width:1px;
    height:24px;
    display: inline-block;
    background: #999;
  }
  .keywordInput {
    border:none;
    background: #ffffff;
    width: 140px;
    height: 27px;
    line-height: 27px;
    font-size: 12px;
  }
  .searchIcon {
    margin-left: auto;
    margin-right: 13px;
    background: url('../img/icon-search-1.png');
    background-size: 100% 100%;
    display: inline-block;
    width: 20px;
    height: 20px;
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