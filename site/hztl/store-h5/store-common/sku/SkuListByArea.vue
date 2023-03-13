<template>
  <div class="search-result">
    <div class="search-header">
      <div class="search-back" @click="historyBack(-1)"></div>
      <div class="search-box">
        <van-dropdown-menu active-color="#1989fa" class="search-select">
          <van-dropdown-item
            v-model="searchKey"
            :options="searchTypeList"
            @change="selectChange"
          />
        </van-dropdown-menu>
        <i class="border-right"></i>
        <input
          class="search-input"
          type="text"
          v-model="searchkeyword"
          :placeholder="placeholder"
          @focus="handleFocus"
        />
        <span class="search-icon" @click="searchByKey"></span>
      </div>
      <div class="search-button" @click="showFilter = true">筛选</div>
    </div>
    <div class="search-content">
      <SkuSortList :sorts="sorts" @changeSort="changeSort"></SkuSortList>
      <div class="list">
        <van-list
          v-model="loading"
          :finished="finished"
          :offset="400"
          @load="loadData"
        >
          <div v-for="(sku, index) in skus" :key="index">
            <SkuCard :sku="sku" @change="changeSku"></SkuCard>
          </div>
        </van-list>
        <div class="no-result-hint" v-if="skus.length == 0 && loadedData">
          <img src="../img/icon-noresult.png" class="empty-car" />
          <p style="color: #777B87;font-size:0.43rem;">没有搜索结果</p>
        </div>
      </div>
    </div>
    <div class="search-footer" v-if="skuInfo.hasData">
      <div class="footer-top">
        <div class="total-fee">
          <span class="label">合计：</span>
          <span class="fee-symbol">¥</span>
          <span class="fee">{{ skuInfo.totalFee | priceFilter }}</span>
        </div>
        <div class="discount-fee" v-if="skuInfo.discountFee > 0">
          <span class="title">优惠</span>
          <span class="fee-symbol">¥</span>
          <span class="fee">{{ skuInfo.discountFee | priceFilter }}</span>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-left">
          <IconPhone></IconPhone>
          <CartIcon ref="CartIcon"/>
        </div>
        <div class="footer-right">
          <div class="footer-button" @click="addCart">
            加购物车
          </div>
          <div class="footer-button" @click="confirmOrder">
            提交订单
          </div>
        </div>
      </div>
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
            <template v-if="filter.vehBrands && filter.vehBrands.length > 0">
              <van-button
                class="button"
                size="small"
                round
                v-for="(label, index) in filter.vehBrands"
                :key="index"
                :class="[filterVehBrand == label ? 'active' : '']"
                @click="filterVehBrand = label"
                >{{ label }}</van-button
              >
            </template>
            <p
              class="none-content"
              v-if="!filter.vehBrands || filter.vehBrands.length == 0"
            >
              暂无可选汽车品牌
            </p>
          </div>
        </div>
        <div class="filter-group">
          <p class="label">配件品牌</p>
          <div class="content">
            <template v-if="filter.brands && filter.brands.length > 0">
              <van-button
                class="button"
                size="small"
                round
                v-for="(label, index) in filter.brands"
                :key="index"
                :class="[filterBrandsContain(label) ? 'active' : '']"
                @click="filterBrandsChoise(label)"
                >{{ label }}</van-button
              >
            </template>
            <p
              class="none-content"
              v-if="!filter.brands || filter.brands.length == 0"
            >
              暂无可选配件品牌
            </p>
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
import VehicleTypeSelector from "../component/VehicleTypeSelector/index";
import Load from "../component/overlayLoad/load";
import SkuCard from "../component/Sku/Card";
import SkuSortList from "@/components/skuSortList";
import { skuSorts } from "@/common/datas";
import CartIcon from "../component/Cart/Icon";
import IconPhone from "../component/Cart/IconPhone";
import { GetQueryString } from "../request/http";
import request, { URL_MODULE } from "@/request";
import { cartsVerifyInventory } from "@/api/common";
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
  .use(Tag)
  .use(Search)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Icon)
  .use(Toast)
  .use(Button)
  .use(Popup)
  .use(List);
export default {
  name: "skuListByPrefecture",
  components: {
    CartIcon,
    IconPhone,
    SkuCard,
    SkuSortList,
    Load
  },
  data() {
    return {
      areaId: "",
      type: "",
      show: false,
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
      searchKey: "keyword",
      searchkeyword: "",
      searchTypeList: [
        // {
        //   value: "oe",
        //   text: "OE"
        // },
        // {
        //   value: "keyword",
        //   text: "关键字"
        // }
      ],
      contentList: [],
      placeholder: "",
      skus: [],
      filter: {},
      activeIndex: 0,
      sorts: JSON.parse(JSON.stringify(skuSorts))
    };
  },
  created() {
    this.searchTypeList = [];
    this.contentList = JSON.parse(sessionStorage.getItem("searchOptions"));
    this.contentList.forEach(p => {
      if (p.content.indexOf("关键") > -1 || p.content.indexOf("OE") > -1) {
        this.searchTypeList.push({
          text: p.content1,
          value: p.content
        });
      }
    });
    this.searchKey = this.searchTypeList[0].value;
    this.placeholder = this.contentList[0].content2;
    this.areaId = GetQueryString("id");
    this.type = GetQueryString("type");
    this.show = true;
  },
  mounted: function() {
    let _this = this;
    _this.page = 1;
    _this.skus = [];
    // _this.loading = true;
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
    changeSort(sort) {
      let change = false;
      if (!sort.active) {
        this.sorts.forEach(item => {
          item.active = false;
        });
        sort.active = true;
        change = true;
      }
      if (sort.switchable) {
        sort.sort = !sort.sort;
        change = true;
      }
      if (change) {
        this.onSearch();
      }
    },
    selectChange(val) {
      this.searchkeyword = "";
      this.filterBrands = [];
      this.filterVehBrand = "";
      this.searchKey = val;
      this.contentList.forEach((p, index) => {
        if (val == p.content) {
          this.placeholder = p.content2;
          this.activeIndex = index;
        }
      });
      if (val === "车型") {
        this.selectVehicleType();
      }
    },
    selectVehicleType() {
      VehicleTypeSelector.select(this.axios.prototype.dataService)
        .then(res => {
          this.vehicleTypeSearch = { ...res, combine: { ...res.combine } };
          this.searchkeyword = this.vehicleTypeFormatter(res);
        })
        .catch(res => {
          if (res.type == "fail") {
            Toast.fail(res.error);
          }
        });
    },
    vehicleTypeFormatter(value) {
      let text = "";
      let factoryBrand = value.factoryBrand || value.brand;
      let series = value.series;
      let year = value.year || value.model;
      let combine = value.combine;
      if (factoryBrand) {
        text += factoryBrand;
      }
      if (series) {
        text += " " + series;
      }
      if (year) {
        text += " " + year;
      }
      if (combine) {
        if (this.axios.prototype.dataService === "bmy") {
          text += " " + combine.name;
        } else {
          text += " " + combine.displacement + " " + combine.gearbox;
        }
      }
      return text;
    },
    handleFocus() {
      const currentSearchType = this.contentList[this.activeIndex].content;
      if (currentSearchType === "车型") {
        this.selectVehicleType();
      }
    },
    onSearch() {
      //拼接搜索字段
      this.page = 1;
      this.skus = [];
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
    searchByKey() {
      this.loadFilter();
      this.onSearch();
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
      let postUrl = "/companies/stores/filter";
      let params = {};
      if (this.areaId) {
        params = {
          areaId: this.areaId,
          type: this.type,
          oe:
            _this.searchKey.indexOf("OE") > -1 ? this.searchkeyword : undefined,
          keyword:
            _this.searchKey.indexOf("关键字") > -1
              ? this.searchkeyword
              : undefined
        };
      } else {
        params = {
          allSku: true,
          oe:
            _this.searchKey.indexOf("OE") > -1 ? this.searchkeyword : undefined,
          keyword:
            _this.searchKey.indexOf("关键字") > -1
              ? this.searchkeyword
              : undefined
        };
      }
      request({
        baseURL: URL_MODULE.united,
        url: postUrl,
        params: params
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
          })
          .catch(err => {
            if (err && err.message) {
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
    async confirmOrder() {
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
        // 校验库存
        const params = {
          sellers: []
        };
        Object.keys(sellers).forEach(key => {
          params.sellers.push({
            sellerId: Number(key),
            skus: sellers[key].skus
          });
        });
        try {
          await cartsVerifyInventory(params);
        } catch (error) {
          if (error.message) {
            Toast.fail(error.message);
          }
          return;
        }

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
      let _this = this;
      let postUrl = "/companies/stores/list-by-area-id";
      let params = {};
      const activeSort = this.sorts.find(item => item.active);
      const order = `${activeSort.value}-${activeSort.sort ? "asc" : "desc"}`;
      if (this.areaId) {
        params = {
          areaId: this.areaId,
          type: this.type,
          page: this.page,
          pageSize: this.pageSize,
          brands: this.filterBrands.join(","),
          vehBrand: this.filterVehBrand,
          oe:
            _this.searchKey.indexOf("OE") > -1 ? this.searchkeyword : undefined,
          keyword:
            _this.searchKey.indexOf("关键字") > -1
              ? this.searchkeyword
              : undefined,
          order: order
        };
      } else {
        params = {
          allSku: true,
          page: this.page,
          pageSize: this.pageSize,
          brands: this.filterBrands.join(","),
          vehBrand: this.filterVehBrand,
          oe:
            _this.searchKey.indexOf("OE") > -1 ? this.searchkeyword : undefined,
          keyword:
            _this.searchKey.indexOf("关键字") > -1
              ? this.searchkeyword
              : undefined,
          order: order
        };
      }
      request({
        baseURL: URL_MODULE.united,
        url: postUrl,
        params: params
      })
        .then(res => {
          const data = res || {};
          // 处理返回的rows
          const rows = this.pickSkus(data.rows || []);
          if (_this.page === 1) {
            _this.skus = rows;
          } else {
            _this.skus = [..._this.skus, ...rows];
          }
          // 处理分页器
          _this.loading = false;
          _this.show = false;
          if (data && data.totalPage) {
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
          if (err && err.message) {
            Toast.fail(err.message);
          }
          _this.finished = true;
          _this.loading = false;
          _this.show = false;
          _this.updateValue();
        });
      _this.loadedData = true;
    },
    pickSkus(skus) {
      return skus.map(sku => {
        let hasStockQty = false;
        let maxStockQty = null;
        if (sku.relation) {
          if (sku.companyId) {
            hasStockQty = true;
            maxStockQty = 999999;
          } else {
            let stockQty = parseFloat(sku.stockQty);
            if (stockQty <= 0) {
              hasStockQty = false;
              maxStockQty = 0;
            } else {
              hasStockQty = true;
              maxStockQty = stockQty;
            }
          }
        } else {
          hasStockQty = false;
          maxStockQty = 0;
        }
        return {
          ...sku,
          selectedQty: 0,
          hasStockQty: hasStockQty,
          maxStockQty: maxStockQty
        };
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
  // background: #f8f8f8;
  overflow: hidden;
  // min-height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .search-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 52px;
    padding: 0 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .search-back {
      display: inline-block;
      width: 8px;
      height: 14px;
      background: url("../img/back-icon.png") no-repeat;
      background-size: 100% 100%;
    }
    .search-box {
      flex: 1;
      height: 36px;
      margin: 0 10px;
      border-radius: 20px;
      background-color: #f4f4f4;
      display: flex;
      align-items: center;
      .search-select {
        color: #999999;
        width: 70px;
        line-height: 27px;
        border: none;
        margin-left: 6px;
        margin-right: 5px;
        appearance: none;
        -webkit-appearance: none; /*去除chrome浏览器的默认下拉图片*/
        -moz-appearance: none; /*去除Firefox浏览器的默认下拉图片*/
        text-indent: 0.01px;
        text-overflow: "";
        option {
          color: #999999;
        }
        /deep/.van-dropdown-menu__bar {
          height: 27px;
          box-shadow: none;
          background-color: transparent;
        }
        /deep/.van-ellipsis {
          font-size: 14px;
          color: #999999;
        }
        /deep/.van-dropdown-item--down {
          top: 1.3rem !important;
        }
        /deep/.van-dropdown-menu__title::after {
          border-color: transparent transparent #999999 #999999;
        }
        /deep/.van-dropdown-menu__title--active::after {
          border-color: transparent transparent currentColor currentColor;
        }
      }
      .border-right {
        width: 0;
        height: 18px;
        border-right: 0.5px solid #999;
      }
      .search-input {
        flex: 1;
        border: none;
        font-size: 12px;
        background-color: transparent;
        &::-webkit-input-placeholder {
          color: #999;
          font-weight: 400;
          font-size: 14px;
        }
      }
      .search-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 13px;
        background: url(~@/assets/svg/search.svg) no-repeat;
        background-size: 100% 100%;
      }
    }
    .search-button {
      font-size: 15px;
      color: #FF6E4C;
      text-align: center;
      // padding: 0 12px;
    }
  }
  .search-content {
    flex: 1;
    padding-top: 52px;
    padding-bottom: 95px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
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
      // padding: 0 10px;
      border-top: 10px solid #f4f4f4;
      flex: 1;
      overflow-y: auto;
    }
  }
  .search-footer {
    left: 0;
    bottom: 0;
    position: fixed;
    width: 100%;
    height: 94px;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: 0px -3px 16px -9px rgba(43,43,43,0.2);
    .footer-top {
      height: 44px;
      padding: 0 12px;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      .total-fee {
        display: flex;
        align-items: baseline;
        color: #e1251b;
        .label {
          font-size: 14px;
          font-weight: 500;
        }
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
    .footer-bottom {
      flex: 1;
      padding: 0 12px;
      display: flex;
      align-items: center;
      .footer-left {
        flex: 1;
        display: flex;
        align-items: center;
      }
      .footer-right {
        display: flex;
        align-items: center;
        .footer-button {
          width: 100px;
          height: 36px;
          line-height: 36px;
          font-size: 15px;
          font-weight: 700;
          text-align: center;
          color: #fff;
          &:first-child {
            border-radius: 20px 0 0 20px;
            background-image: linear-gradient(224deg, #FFB12D 0%, #FF6E4C 100%);
          }
          &:last-child {
            border-radius: 0 20px 20px 0;
            background-image: linear-gradient(224deg, #FFB12D 0%, #FF6E4C 100%);
          }
        }
      }
    }
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

// 无结果样式
.no-result-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
