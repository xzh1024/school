<template>
    <div class="search-result">
        <van-nav-bar class="nav-bar" fixed>
            <div slot="title" class="title">
                <img class="back" src="../img/back-icon.png" @click="historyBack(-1)">
                <CartIcon ref="CartIcon"/>
                <div class="select-con">
                  <select v-model="searchKey" class="selectInput">
                      <option
                          v-for="(item,index) in searchTypeList"
                          :key="index"
                          :value="item.val"
                      >{{item.name}}</option>
                  </select>
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
          <p v-if="querySearchType == 'vehicle'" class="search-remark">{{searchRemark}}</p>
            <van-list v-model="loading" :finished="finished" :offset="400" @load="load">
                <div v-for="(sku, index) in skus" :key="index" @click="toSkuDetail(sku)">
                    <div class="card-each">
                        <div class="img-div">
                            <img class="card-image" :src="sku.image | skuImage">
                        </div>
                        <div class="info">
                            <p class="title">{{sku.oeName}}</p>
                            <p class="info-word">件号：{{sku.oeCode}}</p>
                            <p class="info-word">4S价：{{sku.price4s}}</p>
                            <p class="supplier">
                                <span class="supplier-span">供应商</span>
                                <span class="count">x{{sku.sellersCount}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </van-list>
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
  List
} from "vant";
Vue.use(NavBar)
  .use(List)
  .use(Tag)
  .use(Search)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Icon)
  .use(Toast)
  .use(Button)
  .use(Popup);
export default {
  name: "skuGroupList",
  components: { CartIcon },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
      skus: [],
      loadedData: false,
      skuQuery: "",
      level1: {},
      searchKey: "keyword",
      searchTypeList: [],
      searchkeyword: "",
      matchMethod: "any",
      firstKey: "",
      showFilter: false,
      filterBrands: [],
      filterVehBrand: "",
      querySearchType:"",
      searchRemark:"",
      filter: {}
    };
  },
  props: {
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    borderRadius: {
      type: String,
      default: "6px"
    }
  },
  mounted() {
    let query = this.formDataString(this.skuListData());
    this.querySearchType = this.$route.query.searchType;
    this.searchRemark = this.$route.query.remark;
    let _this = this;
    let dataStr = location.href.split("?")[1];
    let dataArr = dataStr.split("&");
    if (dataArr.indexOf("searchType=keyword") != -1) {
      _this.searchKey = "oe";
      _this.searchTypeList = [
        {
          val: "oe",
          name: "OE"
        }
      ];
    } else if (dataArr.indexOf("searchType=oe") != -1) {
      _this.searchTypeList = [
        {
          val: "keyword",
          name: "关键字"
        }
      ];
    } else {
      _this.searchTypeList = [
        {
          val: "oe",
          name: "OE"
        },
        {
          val: "keyword",
          name: "关键字"
        }
      ];
    }
    if (dataArr && dataArr.length) {
      for (let data of dataArr) {
        let objStr = data.split("=");
        if (objStr[0] == "keyWord") {
          this.firstKey = objStr[1];
        }
        query += `&${objStr[0]}=${objStr[1]}`;
      }
    }
    this.skuQuery = query;
    this.loadFilter();
  },
  methods: {
    searchByKey() {
      this.load("second");
    },
    toSkuDetail(sku) {
      this.$router.push(
        `skuList?searchType=oe&oe=${sku.oeCode}&remark=${sku.oeCode}&name=${
          sku.oeName
        }`
      );
    },
    // 加载筛选项
    loadFilter() {
      let _this = this;
      let postUrl = "/company-skus/filters";
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
    onSearch() {
      //拼接搜索字段
      this.page = 1;
      this.skus=[];
      this.loadData();
    },
    load(times) {
      let _this = this;
      setTimeout(() => {
        _this.loadData(times);
      }, 800);
    },
    loadData(times) {
      let _this = this;
      let postUrl = "/company-skus/search";
      if (_this.skuQuery) {
        if (!this.hasCookie && this.needVisitor) {
          postUrl = "/open/company-skus/search";
        }
        request({
          method: "post",
          baseURL: URL_MODULE.united,
          url: postUrl,
          data: _this.loadDataQuery(times)
        })
        .then(res => {
          let data = res;
          // 处理返回的rows
          if (data.rows && data.rows.length > 0 && data.rows != null) {
            for (let item of data.rows) {
              _this.skus.push(item);
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
        })
        .catch(err => {
          if(err && err.message) {
            Toast.fail(err.message);
          }
          _this.finished = true;
          _this.loading = false;
        });
      } else {
        _this.loading = false;
        _this.finished = true;
        _this.skus = [];
      }
      _this.loadedData = true;
    },
    // 配件查询参数
    skuListData() {
      let _this = this;
      let data = new Map();
      data.set("matchSw", true);
      data.set("relations", "sm");
      data.set("cartQty", true);
      return data;
    },
    loadDataQuery(times) {
      let _this = this;
      let brandQuery=`&brands=${this.filterBrands.join(",")}&vehBrand=${this.filterVehBrand}`;
      if (times == "second") {
        _this.page = 1;
        _this.skus = [];
        let searchStr = "";
        if (_this.searchKey == "keyword") {
          return `keyword=${_this.searchkeyword}&searchType=keyword&codes=${
            this.firstKey
          }&page=${_this.page}&perPage=${
            _this.perPage
          }&onlyParts=true&matchMethod=${
            _this.matchMethod
          }${searchStr}&relations=sm&cartQty=true${brandQuery}`;
        } else {
          searchStr = `&codes=${_this.searchkeyword}`;
        }
        return `${_this.skuQuery}&page=${_this.page}&perPage=${
          _this.perPage
        }&onlyParts=true&matchMethod=${_this.matchMethod}${searchStr}${brandQuery}`;
      } else {
        return `${_this.skuQuery}&page=${_this.page}&perPage=${
          _this.perPage
        }&onlyParts=true${brandQuery}`;
      }
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
    skuToShowObj(sku) {
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
          stockQtyTxt = stockQty.toFixed(0);
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
        minPrice: parseFloat(sku.minPrice),
        originalPrice: parseFloat(sku.originalPrice),
        pricePromotions: sku.pricePromotions ? sku.pricePromotions : [],
        giftPromotions: sku.giftPromotions ? sku.giftPromotions : [],
        promotionTags: sku.promotionTags ? sku.promotionTags : 0,
        hasStockQty: hasStockQty,
        stockQtyTxt: stockQtyTxt,
        maxStockQty: maxStockQty,
        cartQty: parseInt(sku.cartQty),
        companyId: sku.companyId,
        areaId: 0
      };
    }
  },
  filters: {
    skuImage(image) {
      let result = require("../img/Common_goods_def_img.png");
      if (location.hostname == "jndm.hztl3.com") {
        result = require("../img/Common_goods_def_img.png");
      }
      if (image) {
        result = image + "&imageView2/1/w/100/h/100";
      }
      return result;
    }
  }
};
</script>
<style lang="less" scoped>
.search-result {
  background: #f8f8f8;
  overflow: hidden;
  min-height: 100%;
  .nav-bar {
    /deep/ .van-nav-bar__title {
      max-width: 100%;
    }
    .title {
      position: relative;
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
.card-each {
  width: 348px;
  height: 105px;
  border: 1px solod #f6f6f6;
  border-radius: 10px;
  margin: 7px auto 0;
  background: #ffffff;
  .img-div {
    float: left;
    width: 96px;
    height: 100%;
    img {
      width: 76px;
      height: 76px;
      display: block;
      border-radius: 10px;
      margin: 12px auto 0;
    }
  }
  .info {
    float: right;
    width: 250px;
    height: 100%;
    p {
      margin: 5px 0 0;
      font-size: 12px;
      color: #9a9a9a;
      text-align: left;
      padding-right: 10px;
    }
    p:first-child {
      margin-top: 7px;
    }
    .title {
      font-size: 13px;
      color: #333333;
    }
    .supplier {
      color: #f28d21;
      .supplier-span {
        border: 1px solid #fbc682;
        border-radius: 5px;
        padding: 2px 3px;
        background: #fdefdf;
        transform: scale(0.8);
        display: inline-block;
      }
      .count {
        float: right;
      }
    }
  }
}
.select-con{
  background: rgba(244,244,244,0.47);
  border: 1px solid #999999;
  border-radius: 18px;
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
    margin-left: 10px;
    margin-right: 5px;
    appearance: none;
    -webkit-appearance: none;   /*去除chrome浏览器的默认下拉图片*/
    -moz-appearance: none;  /*去除Firefox浏览器的默认下拉图片*/
    background:url('../img/icon-sanjiao.png') no-repeat right center; 
    background-size: 12px 9px;
    text-indent:0.01px;
    text-overflow:"";
    option {
      color: #999999;
    }
  }
  .keywordInput {
    border:none;
    background: #ffffff;
    width: 140px;
    height: 27px;
    line-height: 27px;
    font-size: 12px;
    border-left: 1px solid #CCCCCC;
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
