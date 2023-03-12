<template>
  <div class="content">
    <van-search
      placeholder="输入订单号 / 配件编码 / 配件名称"
      v-model="searchStr"
      shape="round"
      @search="loadList(true)"
      show-action
    >
      <div slot="action" @click="loadList(true)">搜索</div>
      <img slot="left-icon" src="../img/icon-Search.png" class="icon-Search" />
    </van-search>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="isError"
      error-text="请求失败，点击重新加载"
      loading-text="加载中..."
      @load="loadList()"
    >
      <div id="order_list">
        <div
          class="order-item"
          v-for="(item, itemIndex) in orderList"
          :key="itemIndex"
          @click="ToDetail(item.id)"
        >
          <template v-if="item.details">
            <div
              class="card-item"
              v-for="(sku, index) in item.details"
              :key="index"
            >
              <SkuCard type="order" :sku="sku">
                <div class="order-tag" slot="tag" v-if="index === 0">
                  <span
                    class="tag-span-pending"
                    v-if="[1, 2, 3, 8, 9, 10].includes(item.status)"
                  >
                    {{ item.statusName }}
                  </span>
                  <span
                    class="tag-span-cancel"
                    v-if="[5, 6, 7].includes(item.status)"
                  >
                    {{ item.statusName }}
                  </span>
                  <span class="tag-span-finish" v-if="item.status == 4">
                    {{ item.statusName }}
                  </span>
                </div>
                <div slot="plus" class="clearfix m-t-4 font-size-12">
                  <!-- <div class="fl">
                    <span class="color-danger">¥</span>
                    <span class="font-size-16 strong color-danger">{{ sku.price - sku.concessionsAmount }}</span>
                    <span class="">{{ sku.price }}</span>
                  </div> -->
                  <div class="fr">
                    <span class="strong">¥</span>
                    <span class="font-size-16 strong">
                      {{
                        (
                          parseFloat(sku.price) -
                          parseFloat(sku.concessionsPrice || 0)
                        ).toFixed(2)
                      }}
                    </span>
                    <span class="line-price color-assist m-l-4"
                      >¥{{ sku.price }}</span
                    >
                    <span class="color-bye m-l-12">{{ sku.qty }}</span>
                    <span v-if="Number(sku.termQty)" class="color-danger">
                      (终止{{ sku.termQty }})
                    </span>
                  </div>
                </div>
              </SkuCard>
            </div>
          </template>
          <div class="order-footer">
            <div class="board-row">
              <div class="total-num">
                共{{ item.categories || 0 }}种，共{{ item.finalQty || 0 }}件 ，
              </div>
              <div class="total-price">
                <span class="total-price-label">合计:</span>
                <span class="total-price-value">
                  <span class="f-s-12">¥</span>
                  {{
                    (
                      parseFloat(item.finalPrice) -
                      parseFloat(item.concessionsAmount)
                    ).toFixed(2)
                  }}
                </span>
              </div>
            </div>
            <div class="board-row">
              <div class="original-price">
                <span class="original-price-label">原价:</span>
                <span class="original-price-value">
                  ¥{{ item.finalPrice }}
                </span>
              </div>
              <div class="discount-amount">
                <span class="discount-amount-label">已优惠:</span>
                <span class="discount-amount-value">
                  ￥{{ item.concessionsAmount }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import Vue from 'vue';
import SkuCard from './Sku/Card';
import { Search, Card, List, Toast } from 'vant';
import request, { URL_MODULE } from '@/request';
Vue.use(Search)
  .use(Card)
  .use(List)
  .use(Toast);
export default {
  name: 'orderItem',
  props: ['type', 'wantCode'],
  components: { SkuCard },
  data() {
    return {
      searchStr: '',
      orderList: [],
      isError: false,
      loading: false,
      finished: false,
      pageNum: 0,
      isSearch: false,
      activeIcon: require('../img/icon.jpg'),
      inactiveIcon: require('../img/un-checked.png'),
    };
  },
  created() {
    if (this.wantCode) {
      this.searchStr = this.wantCode;
      this.loadList(true);
    }
  },
  methods: {
    ToDetail: function(id) {
      this.$router.push(`/orderDetail?${id}`);
    },
    getOrder: function(url, params, isSearch) {
      let _this = this;
      request({
        baseURL: URL_MODULE.united,
        url: url,
        params: params,
      })
        .then(res => {
          let data = res.rows;
          if (isSearch) {
            //如果回车查询，清空列表重新加载
            _this.orderList = [];
          }
          if (data && data.length) {
            // if(_this.type!=0&&isSearch){
            //   _this.orderList=_this.orderList.concat(data.filter(item => { item.status=_this.type.toString()}));
            // }else{
            // }
            _this.orderList = _this.orderList.concat(data);
            _this.loading = false;
            if (_this.orderList.length >= res.totalSize) {
              _this.finished = true;
            }
          } else {
            _this.finished = true;
            _this.loading = false;
          }
        })
        .catch(err => {
          _this.isError = true;
          if (err && err.message) {
            Toast.fail(err.message);
          }
        });
    },
    loadList(isSearch) {
      var _this = this;
      let params = {};
      if (isSearch) {
        _this.pageNum = 0;
        _this.orderList = [];
      }
      if (_this.searchStr == '' || !isSearch) {
        //直接加载
        if (this.type != 0) {
          params = {
            page: ++this.pageNum,
            pageSize: 20,
            status: this.type,
          };
        } else {
          params = {
            page: ++this.pageNum,
            pageSize: 20,
          };
        }
        this.getOrder('/orders/app', params, false);
      } else {
        //关建字查找
        params = {
          page: ++_this.pageNum,
          pageSize: 20,
          keyWord: _this.searchStr,
          status: _this.type == 0 ? null : _this.type,
        };
        _this.getOrder('/orders/keyWord-search', params, true);
      }
    },
  },
  filters: {
    skuImage(images) {
      let result = require('../img/Common_goods_def_img.png');
      if (location.hostname == 'jndm.hztl3.com') {
        result = require('../img/Common_goods_def_img.png');
      }
      if (images && images.length > 0) {
        result = images[0] + '&imageView2/1/w/100/h/100';
      }
      return result;
    },
  },
};
</script>
<style lang="less" scope>
.f-s-12 {
  font-size: 12px;
}
.van-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .footer-right {
    display: flex;
    align-items: center;
    .cell-label {
      color: #aaacb7;
    }
  }
}
.icon-Search {
  width: 14px;
  height: 14px;
}
.van-tabs__line {
  width: 6px !important;
  height: 6px;
  background-image: url('../img/seleted-up.png');
  background-size: 100% 100%;
  background-color: transparent;
}
.van-card:not(:first-child) {
  margin-top: 0;
}
.van-card:not(:first-child) .van-card__content {
  border-bottom: 1px solid #edeff1;
}
.order-list {
  background: #f8f8f8;
}
.order-item {
  margin: 16px 16px 0 16px;
  border-radius: 8px;
  background: #ffffff;
  overflow: hidden;
  .order-tag {
    position: relative;
    margin-bottom: 16px;
    .tag-span-pending,
    .tag-span-cancel,
    .tag-span-finish {
      display: inline-block;
      min-width: 99px;
      height: 20px;
      line-height: 20px;
      color: #ffffff;
      font-size: 10px;
      position: absolute;
      top: -10px;
      text-align: center;
    }
    .tag-span-pending {
      background: url('../img/pending.png') 100% 100%;
    }
    .tag-span-cancel {
      background: url('../img/cancel.png') 100% 100%;
    }
    .tag-span-finish {
      background: url('../img/finish.png') 100% 100%;
    }
  }
  .order-footer {
    padding: 12px;
    .board-row {
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: #666666;
      font-weight: 400;
      .total-price {
        margin-left: 8px;
        display: flex;
        align-items: center;
        color: #e1251b;
        font-weight: 700;
        .total-price-value {
          font-size: 16px;
        }
      }
      .original-price {
        display: flex;
        align-items: center;
        .original-price-value {
          text-decoration: line-through;
        }
      }
      .discount-amount {
        margin-left: 8px;
        display: flex;
        align-items: center;
        color: #e1251b;
      }
    }
  }
}
.order-item:not(:first-child) {
  margin-top: 20px;
}
</style>
