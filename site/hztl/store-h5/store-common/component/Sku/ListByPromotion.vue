<template>
    <div class="list">
        <van-list v-model="loading" :finished="finished" :offset="400" @load="load">
            <div v-for="(sku, index) in skus" :key="index">
                <SkuCard :sku="sku" @change="changeSku"></SkuCard>
            </div>
        </van-list>
        <div class="no-result-hint" v-if="skus.length==0 && loadedData">
            <img src="../../img/icon-noresult.png" class="empty-car">
            <p style="color: #777B87;font-size:0.43rem;">没有搜索结果</p>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import SkuCard from "./Card";
import request, { URL_MODULE } from "@/request";
import { List, Stepper, Toast } from "vant";
Vue.use(List)
  .use(Stepper)
  .use(Toast);

/*
query change is reload data
*/
export default {
  name: "skuListByPromotion",
  components: {
    SkuCard
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    query: String,
    value: {
      type: Object,
      default: {
        hasData: false,
        totalFee: 0.0,
        discountFee: 0.0,
        selectedMap: {}
      }
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      pageSize: 10,
      skus: [],
      loadedData: false
    };
  },
  methods: {
    load() {
      let _this = this;
      _this.loadData();
    },
    reload() {
      let _this = this;
      _this.page = 1;
      _this.skus = [];
      _this.loading = true;
      _this.finished = false;
      _this.loadedData = false;
      _this.initValue();
      _this.value.totalFee = 0.0;
      _this.value.discountFee = 0.0;
      _this.value.selectedMap = {};
      _this.loadData();
    },
    loadData() {
      let _this = this;
      if (_this.query) {
        request({
          url: `/company-skus/promotions/list-by-area-id?${_this.loadDataQuery()}`,
          baseURL: URL_MODULE.united
        })
        .then(data => {
          // 处理返回的rows
          _this.skus = data.rows || [];
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
      } else {
        _this.loading = false;
        _this.finished = true;
        _this.skus = [];
        _this.updateValue();
      }
      _this.loadedData = true;
    },
    loadDataQuery() {
      let _this = this;
      return `${_this.query}&page=${_this.page}&pageSize=${_this.pageSize}`;
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
          storeAreaDetailId: _this.getAreaId()
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
        _this.value.selectedMap[sku.id] = toSelectedMap;
      } else {
        delete _this.value.selectedMap[sku.id];
      }
      let totalFee = 0.0;
      let discountFee = 0.0;
      for (let id in _this.value.selectedMap) {
        totalFee +=
          parseInt(_this.value.selectedMap[id].selectedQty) *
          parseFloat(_this.value.selectedMap[id].price);
        discountFee +=
          parseInt(_this.value.selectedMap[id].selectedQty) *
          (parseFloat(_this.value.selectedMap[id].originalPrice) -
            parseFloat(_this.value.selectedMap[id].price));
      }
      _this.value.totalFee = totalFee;
      _this.value.discountFee = discountFee;
      _this.updateValue();
    },
    addCartAfter() {
      let _this = this;
      for (let sku of _this.skus) {
        sku.cartQty =
          parseInt(sku.cartQty ? sku.cartQty : 0) + parseInt(sku.selectedQty);
        sku.selectedQty = 0;
      }
      _this.value.totalFee = 0.0;
      _this.value.discountFee = 0.0;
      _this.value.selectedMap = {};
      _this.updateValue();
    },
    updateValue() {
      let _this = this;
      _this.value.hasData = _this.skus.length > 0;
      _this.$emit("change", _this.value);
    },
    initValue() {
      let _this = this;
      if (!_this.value) {
        _this.value["hasData"] = false;
        _this.value["totalFee"] = 0.0;
        _this.value["discountFee"] = 0.0;
        _this.value["selectedMap"] = {};
      } else {
        if (_this.value.hasData === undefined) {
          _this.value.hasData = false;
        }
        if (!_this.value.totalFee) {
          _this.value.totalFee = 0.0;
        }
        if (!_this.value.discountFee) {
          _this.value.discountFee = 0.0;
        }
        if (!_this.value.selectedMap) {
          _this.value.selectedMap = {};
        }
      }
    },
    getAreaId() {
      let _this = this;
      let queries = _this.query.split("&");
      for (let i = 0; i < queries.length; i++) {
        let keyValue = queries[i].split("=");
        for (let j = 0; j < keyValue.length; j++) {
          if (keyValue[0] == "areaId") {
            if (keyValue[1]) {
              return parseInt(keyValue[1]);
            }
          }
        }
      }
      return 0;
    }
  },
  watch: {
    query: function(val) {
      this.reload();
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  width: 100%;
  box-sizing: border-box;
  .sku-card {
    margin-top: 10px;
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
}
</style>