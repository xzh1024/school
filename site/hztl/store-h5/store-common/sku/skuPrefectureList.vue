<template>
    <div class="search-result">
        <van-nav-bar class="nav-bar" fixed>
            <div slot="title" class="title">
                <img class="back" src="../img/back-icon.png" @click="historyBack(-1)">
                <CartIcon ref="CartIcon"/>
                <select v-model="searchKey" class="selectInput">
                    <option
                        v-for="(item,index) in searchTypeList"
                        :key="index"
                        :value="item.val"
                    >{{item.name}}</option>
                </select>
                <input
                    type="text"
                    class="selectInput keywordInput"
                    v-model="searchkeyword"
                    placeholder="请输入配件名称等关键字"
                >
                <van-icon name="search" class="searchIcon" @click="searchByKey"/>
            </div>
        </van-nav-bar>
        <div class="search-content">
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
                                <span
                                    class="count"
                                    v-if="sku.sellersCount!==null&&sku.sellersCount!==''"
                                >x{{sku.sellersCount}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </van-list>
            <div class="no-result-hint" v-if="skus.length==0 && loadedData">
                <img src="../img/icon-noresult.png" class="empty-car">
                <p style="color: #777B87;font-size:0.43rem;">没有搜索结果</p>
            </div>
        </div>
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
  Popup
} from "vant";
import { GetQueryString } from "../request/http";
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
  name: "skuPrefectureList",
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
      searchKey: "keyword",
      searchTypeList: [
        {
          val: "oe",
          name: "OE"
        },
        {
          val: "keyword",
          name: "关键字"
        }
      ],
      searchkeyword: "",
      matchMethod: "any",
      firstKey: "",
      areaId: ""
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
  created() {
    this.areaId = GetQueryString("areaId");
  },
  methods: {
    searchByKey() {
      this.skus = [];
      this.load();
    },
    toSkuDetail(sku) {
      this.$router.push(
        `skuList?searchType=oe&oe=${sku.oeCode}&remark=${sku.oeCode}&name=${
          sku.oeName
        }`
      );
    },
    load(times) {
      let _this = this;
      setTimeout(() => {
        _this.loadData();
      }, 800);
    },
    loadData() {
      let _this = this;
      let postUrl = "/alliances/stores/list-by-area-id";
      let postData = {
        areaId: this.areaId,
        onlyParts: true,
        oe: this.searchKey == "oe" ? this.searchkeyword : "",
        keyword: this.searchKey == "keyword" ? this.searchkeyword : ""
      };
      request({
        baseURL: URL_MODULE.united,
        url: postUrl,
        params: postData
      })
      .then(res => {
        let data = res;
        // 处理返回的rows
        if (data.rows && data.rows.length) {
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
      _this.loadedData = true;
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
        areaId: 0,
        sellersCount: sku.sellersCount
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
.selectInput {
  border: 1px solid #999999;
  color: #999999;
  width: 64px;
  height: 27px;
  border-radius: 0;
  background: #ffffff;
  option {
    color: #999999;
  }
}
.keywordInput {
  line-height: 20px;
  width: 200px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  font-size: 12px;
}
.keywordInput::placeholder {
  line-height: 20px;
}
.searchIcon {
  position: absolute;
  top: 16px;
  right: 40px;
  color: #999999;
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
