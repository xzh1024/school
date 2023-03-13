<template>
    <div class="list">
      <SkuSortList :sorts="sorts" @changeSort="changeSort"></SkuSortList>
      <div class="list-body">
        <van-list v-model="loading" :finished="finished" :offset="400" @load="loadData">
          <SkuCard v-for="(sku, index) in skus" :key="index" :sku="sku" @change="changeSku"></SkuCard>
        </van-list>
        <div class="no-result-hint" v-if="skus.length==0 && loadedData">
            <img src="../../img/icon-noresult.png" class="empty-car">
            <p style="color: #777B87;font-size:0.43rem;">没有搜索结果</p>
        </div>
      </div>
    </div>
</template>

<script>
import Vue from "vue";
import SkuCard from "./Card.vue";
import SkuSortList from "@/components/skuSortList";
import { skuSorts } from "@/common/datas.js";
import request, { URL_MODULE } from "@/request";
import { List, Stepper, Toast } from "vant";
Vue.use(List)
  .use(Stepper)
  .use(Toast);

/*
  query change is reload data
  */
export default {
  name: "skuList",
  components: {
    SkuCard,
    SkuSortList
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    query: String,
    value: {
      type: Object,
      default: () => {
        return {
          hasData: false,
          totalFee: 0.0,
          discountFee: 0.0,
          selectedMap: {}
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
      skus: [],
      loadedData: false,
      sorts: JSON.parse(JSON.stringify(skuSorts)),
      flag: true
    };
  },
  methods: {
    changeSort(sort) {
      let change = false;
      if(!sort.active) {
        this.sorts.forEach(item => {
          item.active = false;
        })
        sort.active = true;
        change = true;
      }
      if(sort.switchable) {
        sort.sort = !sort.sort;
        change = true;
      }
      if(change) {
        this.reload();
      }
    },
    reload() {
      let _this = this;
      _this.page = 1;
      _this.skus = [];
      // _this.loading = true;
      _this.finished = false;
      _this.loadedData = false;
      _this.initValue();
      _this.value.totalFee = 0.0;
      _this.value.discountFee = 0.0;
      _this.value.selectedMap = {};
      _this.loadData();
    },
    loadData() {
      if(!this.flag) return;
      this.flag = false;
      let _this = this;
      let postUrl = "/company-skus/search";
      if (_this.query) {
        if (!this.hasCookie && this.needVisitor) {
          postUrl = "/open/company-skus/search";
        }
        const activeSort = this.sorts.find(item => item.active);
        const order = `${activeSort.value}-${activeSort.sort ? "asc" : "desc"}`;
        request({
            method: "post",
            baseURL: URL_MODULE.united,
            url: postUrl,
            data: `${_this.query}&cartQty=true&page=${_this.page}&perPage=${_this.perPage}&order=${order}`
          })
          .then(res => {
            let data = res || {};
            // 处理返回的rows
            const rows = this.pickSkus(data.rows || []);
            if(_this.page === 1) {
              _this.skus = rows;
            } else {
              _this.skus = [..._this.skus, ...rows];
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
            _this.flag = true;
          })
          .catch(err => {
            if(err && err.message) {
              Toast.fail(err.message);
            }
            _this.finished = true;
            _this.loading = false;
            _this.updateValue();
            _this.flag = true;
          });
      } else {
        _this.loading = false;
        _this.finished = true;
        _this.skus = [];
        _this.updateValue();
        _this.flag = true;
      }
      _this.loadedData = true;
    },
    loadDataQuery() {
      let _this = this;
      return `${_this.query}&cartQty=${true}&page=${_this.page}&perPage=${
        _this.perPage
      }`;
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
        }
      })
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
  display: flex;
  flex-direction: column;
  .list-body {
    flex: 1;
    overflow-y: auto;
    border-top: 10px solid #F4F4F4;
    .card {
      &:last-child {
        border-bottom: none;
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
}
</style>
