<template>
    <div class="search-result">
        <div class="head-brand">
            <span class="backToHome" @click="backHome()"></span>
            <div class="cart" @click="toCart()">
                <span class="cart-num">{{cartNum}}</span>
            </div>
            <van-search
                v-if="type=='brand'"
                v-model="searchStr"
                left-icon
                :placeholder="icon"
                input-align="center"
                shape="round"
                @search="onSearch"
                background="#ffffff"
                class="search-input"
                show-action
            >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
            <div class="filter" v-if="type=='code'" @click="filterBrand()">
                <img src="../../assets/filter-icon.png" alt="">
                <span>筛选</span>
            </div>
        </div>
        <div class="search-content">
            <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
            >
                <div
                    class="commodity-card"
                    v-for="item in serachList"
                    :key="item.id"
                    style="overflow: hidden; width: 9.5rem; margin:15px auto 0; background: #FFFFFF; border-radius: 6px;position:relative;"
                >
                    <div class="image" @click="ToDetail(item.id)">
                        <img :src="item.image | skuImage">
                    </div>
                    <div class="infomation" @click="ToDetail(item.id)">
                        <p class="info-name">
                          {{item.stdName}}
                          <span class="tag">{{item.swProductionPlace}} {{item.swBrand}}</span>
                        </p>
                        <p class="info-OE">
                            <span class="label">编号：</span>
                            <span class="value">{{item.stdOeCode}}</span>
                        </p>
                        <p class="info-OE">
                            <span class="label">现货库：</span>
                            <span class="value" v-if="item.stockEnough">有货</span>
                            <span class="value" v-else>{{item.spotQty}}</span>
                            <span class="label" style="margin-left:28px">订货库：</span>
                            <span class="value">{{item.bookQty}}</span>
                        </p>
                        <p class="info-price">
                            <span class="label">价格：</span>
                            <span class="value font-14 price">¥{{item.price}}</span>
                            <span class="remark" v-if="parseInt(item.cartQty)>0">（已加购{{parseInt(item.cartQty)}}件）</span>
                        </p>
                    </div>
                    <div class="changeNum">
                        <van-stepper
                            v-model="item.qty"
                            min="0"
                            :max="item.stockQty"
                            :disable-input="true"
                            :integer="true"
                            button-size="0.533rem"
                            input-width="1rem"
                            style="color: #333;"
                            @change="setTotalFee"
                        />
                    </div>
                </div>
            </van-list>
            <div class="no-result-hint" v-if="searchListNull">
                <img src="../../assets/icon-noresult.png" class="empty-car">
                <p style="color: #777B87;font-size:0.43rem;">没有搜索结果</p>
            </div>
        </div>
        <div class="bottom-brand" v-if="serachList.length>0">
            <div class="total-fee">合计：¥{{totalFee | priceFilter}}</div>
            <van-button class="button" plain color="#00a8ea" type="primary" @click="addCart">加入购物车</van-button>
            <van-button class="button" color="#00a8ea" type="primary" @click="confirmOrder">提交订单</van-button>
        </div>
        <div class="popup" v-show="show">
            <p
                style="font-size:0.43rem;text-align:left;margin:0.2667rem 0 0 0.4267rem;color: #171C24;"
            >品牌</p>
            <div class="pop-content">
                <span
                    v-for="(value,index) in brandList"
                    :key="index"
                    class="brand-span"
                    @click="choseBrand($event,value)"
                >{{value}}</span>
            </div>
            <div class="bottom-button">
                <a type="button" class="reset" @click="resetChoseBrand()">重置</a>
                <a type="button" class="confirm" @click="confirlComiitChose()">确认</a>
            </div>
        </div>
        <div class="overlay" v-if="show" @click="closePop()"></div>
    </div>
</template>
<script>
import Vue from "vue";
import { Icon, Search, Toast, Stepper, List, Button } from "vant";
import request, { URL_MODULE } from "@/request";
Vue.use(Icon)
  .use(Search)
  .use(Toast)
  .use(Stepper)
  .use(List)
  .use(Button);
export default {
  name: "searchResult",
  data() {
    return {
      type: "", //判断进入方式
      info: "",
      icon: "\ue63c 请输入商品编码",
      searchStr: "",
      cartNum: 0,
      show: false,
      serachList: [],
      brandList: [],
      choseBrandList: [],
      searchTypeAndOE: "searchType=oe",
      showQty: false,
      searchListNull: false,
      historyList: [],
      page: 1,
      finished: false,
      loading: false,
      totalFee: 0.00
    };
  },
  methods: {
    ToDetail(id){
      this.$router.push({
        name: `skuDetail`,
        query: {
          id: id
        }
      });
    },
    onLoad() {
      this.page += 1;
      this.getGoods();
    },
    onSearch() {
      //当前列表搜索
      this.page = 1;
      request({
        method: "post",
        baseURL: URL_MODULE.united,
        url: "/company-skus/search",
        data: `${this.searchTypeAndOE}&brands=${this.info}&keyword=${this.searchStr}&relations=asm&page=${
          this.page
        }&cartQty=true`
      }).then(res => {
        if (res.rows && res.rows.length) {
          for (let item of res.rows) {
            item.qty = 0;
          }
          this.serachList = res.rows;
          this.searchListNull = false;
        } else {
          this.serachList = [];
          this.searchListNull = true;
          this.finished = true;
        }
        this.loading = false;
        if (this.page == res.totalPage) {
          this.finished = true;
        }
        this.setTotalFee();
      }).catch(() => this.finished = true);
    },
    filterBrand() {
      this.show = true;
      //不保存上次的筛选
      // for(let item of this.choseBrandList){
      //   for(let span of $(".pop-content").find(".brand-span")){
      //     if(span.innerText == item){
      //       span.classList.add("chosed");
      //     }
      //   }
      // }
    },
    closePop() {
      this.show = false;
    },
    choseBrand(e, value) {
      let target = e.target;
      let index = this.choseBrandList.indexOf(value);
      if (index == -1) {
        this.choseBrandList.push(value);
        $(target).addClass("chosed");
      } else {
        this.choseBrandList.splice(index, 1);
        $(target).removeClass("chosed");
      }
    },
    confirlComiitChose() {
      this.page = 1;
      request({
        method: "post",
        url: "/company-skus/search",
        baseURL: URL_MODULE.united,
        data: `${this.searchTypeAndOE}&keyword=${this.info}&brands=${this.choseBrandList.join(",")}&relations=asm&page=${
          this.page
        }&cartQty=true`
      }).then(res => {
        if (res.rows && res.rows.length) {
          for (let item of res.rows) {
            item.qty = 0;
          }
          this.serachList = res.rows;
          this.searchListNull = false;
        } else {
          this.serachList = [];
          this.searchListNull = true;
          this.finished = true;
        }
        this.loading = false;
        if (this.page == res.totalPage) {
          this.finished = true;
        }
        this.show = false;
        this.setTotalFee();
        this.choseBrandList = [];
        $(".pop-content")
          .find(".brand-span")
          .removeClass("chosed");
      }).catch(() => {
        this.finished = true;
        this.choseBrandList = [];
        $(".pop-content")
          .find(".brand-span")
          .removeClass("chosed");
      });
    },
    resetChoseBrand() {
      this.choseBrandList = [];
      $(".pop-content")
        .find(".brand-span")
        .removeClass("chosed");
    },
    backHome() {
      this.$router.push("/home");
    },
    toCart() {
      this.$router.push("/cart");
    },
    setNumberOfCart() {
      //请求购物车列表，获取购物车数量
      request({
        url: "/carts/app",
        baseURL: URL_MODULE.united
      }).then(res => {
        this.cartNum = res.length;
      });
    },
    getGoods() {
      let postData = "";
      if (this.type == "brand") {
        postData += `brands=${
          this.info
        }&keyword=${this.searchStr}`;
      } else {
        postData += `${this.searchTypeAndOE}&keyword=${this.info}&brands=${this.choseBrandList.join(",")}`;
        if (this.page == 1) {
          this.getBrandList(postData);
        }
      }
      request({
        method: "post",
        url: "/company-skus/search",
        baseURL: URL_MODULE.united,
        data: postData + `&relations=asm&page=${this.page}&cartQty=true`
      }).then(res => {
        if (res.rows && res.rows.length) {
          for (let item of res.rows) {
            item.qty = 0;
            this.serachList.push(item);
          }
          this.searchListNull = false;
          if (this.type == "code") {
            //如果时通过搜索oe码进入，搜索有值才将搜索码放入历史记录
            this.setLocal();
          }
        } else {
          this.serachList = [];
          this.searchListNull = true;
          this.finished = true;
        }
        this.loading = false;
        if (this.page == res.totalPage) {
          this.finished = true;
        }
        this.setTotalFee();
      }).catch(() => this.finished = true);
    },
    getBrandList(postData) {
      request({
        method: "post",
        baseURL: URL_MODULE.united,
        url: "/company-skus/filters",
        data: postData
      }).then(res => {
        this.brandList = res.brands;
      });
    },
    setInCart(item) {
      request({
        method: "post",
        baseURL: URL_MODULE.united,
        url: "/carts/create",
        data: {
          skuId: item.id,
          price: item.price,
          qty: item.qty,
          remarks: "",
          offiAccount: true
        }
      }).then(() => this.setNumberOfCart());
    },
    setLocal() {
      let historyIndex = this.historyList.indexOf(this.info);
      //判断是否已有重复的搜索项，没有的话判断条数注入，有的话替换
      if (historyIndex == -1) {
        if (this.historyList.length <= 8) {
          this.historyList.unshift(this.info);
        } else {
          this.historyList.pop().unshift(this.info);
        }
      } else {
        this.historyList.splice(historyIndex, 1);
        this.historyList.unshift(this.info);
      }
      localStorage.setItem(
        "searchHistoryList",
        JSON.stringify(this.historyList)
      );
    },
    setTotalFee(){
      let _this = this;
      let totalFee = 0.00;
      for (let item of _this.serachList) {
        totalFee += parseInt(item.qty) * parseFloat(item.price);
      }
      _this.totalFee = totalFee;
    },
    addCart(){
      let _this = this;
      let toCartParams = [];
      for (let item of _this.serachList){
        if (parseInt(item.qty)>0){
          toCartParams.push({
            skuId: item.id,
            price: item.price,
            qty: item.qty,
            remarks: "",
            offiAccount: true
          })
        }
      }
      if (toCartParams.length<=0){
        Toast.fail("请选择加入购物车数量");
      }else{
        request({
          method: "post",
          baseURL: URL_MODULE.united,
          url: "/carts",
          data: {data:toCartParams}
        }).then(() => {
          _this.setNumberOfCart();
          for (let item of _this.serachList){
            item.cartQty = parseInt(item.cartQty)+parseInt(item.qty);
            item.qty = 0;
          }
          Toast.success("加入购物车成功");
        }).catch(err => {
          if(err && err.message) {
            Toast.fail(err.message);
          }
        });
      }
    },
    confirmOrder(){
      let _this = this;
      let skuIds = [];
      let skuQtys = [];
      let skuSellerIds = [];
      for (let item of _this.serachList){
        if (parseInt(item.qty)>0){
          skuIds.push(parseInt(item.id));
          skuQtys.push(parseInt(item.qty));
          skuSellerIds.push(parseInt(item.companyId));
        }
      }
      if (skuIds.length<=0){
        Toast.fail("请选择提交订单配件");
      }else{
        _this.inSettle = {
          skuIds: skuIds,
          skuQtys: skuQtys,
          skuSellerIds: skuSellerIds
        }
        localStorage.removeItem("settle");
        localStorage.setItem("settle", JSON.stringify(_this.inSettle));
        _this.$router.push({
          name: "confirmOrder"
        });
      }
    }
  },
  mounted: function() {
    //初始化根据进来的页面地址判断页面展示
    let pageHash = window.location.href.split("?")[1];
    this.type = pageHash.split("=")[0];
    this.info = pageHash
      .split("=")[1]
      .split("%20")
      .join(" "); //空格被浏览器解析成%20
    //请求购物车数量
    this.setNumberOfCart();
    this.getGoods();
    //获取localStorage中的数据，前端储存搜索历史
    if (JSON.parse(localStorage.getItem("searchHistoryList"))) {
      this.historyList = JSON.parse(localStorage.getItem("searchHistoryList"));
    }
  },
  filters: {
    priceFilter (value) {
      let realVal = ''
      if (!isNaN(value) && value!== '') {
        realVal = parseFloat(value).toFixed(2)
      } else {
        realVal = '--'
      }
      return realVal
    },
    skuImage(image){
      let result = require("../../assets/icon-product-ls.png");
      if(location.hostname == "jndm.hztl3.com"){
        result = require("../../assets/icon-product.png")
      }
      if (image){
        result = image+"&imageView2/1/w/100/h/100";
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
  .head-brand {
    .cart {
      float: left;
      width: 24px;
      height: 24px;
      margin: 12px 0 0 12px;
      background-image: url("../../assets/cart-icon.png");
      background-size: 100% 100%;
      position: relative;
      cursor: pointer;
      .cart-num {
        position: absolute;
        top: -6px;
        left: 14px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #ff424d;
        font-size: 10px;
        color: #ffffff;
        letter-spacing: -0.2px;
        text-align: center;
        line-height: 20px;
      }
    }
    .search-input {
      width: 300px;
      float: right;
      height: 43px;
    }
    .filter {
      float: right;
      height: 44px;
      cursor: pointer;
      span {
        float: right;
        font-size: 14px;
        color: #aaacb7;
        letter-spacing: -0.34px;
        margin: 13px 0 0 0;
      }
      img {
        width: 24px;
        height: 24px;
        float: right;
        margin: 12px 12px 0 0;
      }
    }
  }
  .search-content {
    width: 10rem;
    padding-top: 44px;
    padding-bottom: 59px;
    .commodity-card {
      .image {
        float: left;
        width: 90px;
        height: 90px;
        margin: 16px 0 0 8px;
        border: 1px solid #f2f3f5;
        border-radius: 4px;
        box-sizing: border-box;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .infomation {
        float: left;
        width: 249px;
        text-align: left;
        margin: 16px 8px 0 0;
        border-bottom: 0.5px solid #edeff1;
        padding-bottom: 8px;
        p {
          margin: 0 0 6px 8px;
          letter-spacing: -0.29px;
          font-size: 12px;
          color: #171c24;
          span {
            color: #aaacb7;
            letter-spacing: -0.29px;
          }
        }
        .label {
          font-size: 10px;
          color: #aaacb7;
          letter-spacing: -0.24px;
        }
        .value {
          color: #171c24;
          font-size: 12px;
          letter-spacing: -0.29px;
        }
        .info-repertory span:nth-child(3) {
          margin-left: 28px;
        }
        .info-price {
          display: flex;
          line-height: 20px;
          .price {
            font-size: 14px;
            color: #ff424d;
            letter-spacing: -0.34px;
          }
          .remark {
            font-size: 10px;
            color: #ff424d;
            letter-spacing: -0.24px;
          }
        }
        .info-name {
          font-size: 14px;
          color: #171c24;
          letter-spacing: -0.34px;
          font-weight: 500;
        }
        .price {
          color: #ff424d;
        }
        .tag {
          padding: 0 5px;
          border: 1px solid #aaacb7;
          font-size: 10px;
          color: #6e93fb;
          letter-spacing: -0.24px;
          text-align: center;
          border: 1px solid rgba(110, 147, 251, 0.3);
          border-radius: 4px;
          margin-right: 8px;
        }
      }
      .set-in-cart {
        height: 52px;
        float: right;
        font-size: 14px;
        span {
          float: left;
        }
        img {
          width: 40px;
          height: 40px;
          margin-top: 6px;
        }
      }
      .changeNum {
        position: absolute;
        bottom: 0;
        right: 10px;
        line-height: 1.38667rem;
      }
    }
  }
}
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
.popup {
  width: 276px;
  height: 100%;
  background: #ffffff;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 2;
  .bottom-button {
    height: 50px;
    background: #f2f2f2;
    position: absolute;
    bottom: 0;
    width: 100%;
    a {
      display: inline-block;
      margin: 0 16px 0 0;
      font-size: 14px;
      letter-spacing: -0.34px;
      width: 104px;
      height: 40px;
      line-height: 40px;
      border-radius: 8px;
      text-align: center;
      position: relative;
      top: 5px;
    }
    .reset {
      background: #ffffff;
      border: 1px solid #ccced4;
      color: #777b87;
    }
    .confirm {
      background-color: #00a8ea;
      color: #ffffff;
    }
  }
  .brand-span {
    border-radius: 13px;
    background: #f8f8f8;
    padding: 3px 12px;
    font-size: 14px;
    float: left;
    margin: 6px;
    color: #171c24;
    letter-spacing: 0;
  }
  .chosed {
    background-color: #00a8ea;
    color: #ffffff;
  }
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  z-index: 1;
}
/deep/ .van-field__control--center {
  font-family: "iconfont";
}
.pop-content {
  overflow: hidden;
  margin: 13px 10px 0;
}
/deep/ .van-stepper {
  button {
    background-size: 100% 100%;
    color: rgba(110, 147, 251, 0);
    border-radius: 50%;
  }
  input {
    // font-size: 14px;
    letter-spacing: -0.34px;
    background: #ffffff;
    position: relative;
    font: normal normal 14px/20px arial;
    color: black !important;
  }
}
/deep/ .van-stepper__minus {
  background-image: url("../../assets/cart-cut.png");
}
/deep/ .van-stepper__plus {
  background-image: url("../../assets/cart-add.png");
}
/deep/ .van-stepper button {
  background-color: #ffffff;
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
  .total-fee {
    flex: 1;
    font-size: 16px;
    color: #ff424d;
  }
  .button {
    margin-right: 8px;
    width: 90px;
  }
  /deep/ .van-button {
    border-radius: 6px;
    font-size: 12px;
  }
  /deep/ .van-button--normal {
    padding: 0;
  }
}
</style>