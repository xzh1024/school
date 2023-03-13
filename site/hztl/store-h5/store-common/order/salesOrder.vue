<template>
    <div id="salesOrder">
        <van-nav-bar @click-left="onClickLeft">
            <img src="../img/back-icon.png" slot="left" class="Back">
            <div slot="right">
                <div class="top-bar">
                    <span
                        v-for="(item,index) in statuslist"
                        :key="index"
                        :class="{'bar-item':true,'isActive':activeindex===item.key}"
                        @click="tagget(item.key)"
                    >{{item.value}}</span>
                </div>
            </div>
        </van-nav-bar>
        <van-search
            placeholder="订单号/客户名称/客户标签/配件名称/归属员工"
            slot="right"
            class="search"
            v-model="value"
            @search="getorderlist(true)"
            @clear="getAll"
        ></van-search>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="isError"
            error-text="请求失败，点击重新加载"
            loading-text="加载中..."
            @load="getorderlist()"
        >
            <div class="order_list">
                <div
                    class="order-item"
                    v-if="orderList.length>0"
                    v-for="(item,itemIndex) in orderList"
                    :key="itemIndex"
                >
                    <van-card
                        :price="detail.price"
                        v-if="item.details"
                        v-for="(detail,index) in item.details"
                        :key="index"
                        @click="ToDetail(item.id)"
                    >
                        <div slot="num">
                            <span>x {{detail.qty}}</span>
                            <span
                                v-if="Number(detail.termQty)>0"
                                style="color:#FF4655"
                            >(供货{{Number(detail.qty)-Number(detail.termQty)}})</span>
                        </div>
                        <div slot="thumb" class="thumb-border">
                            <img
                                class="thumb-img"
                                v-if="!detail.picture"
                                src="../img/Common_goods_def_img.png"
                            >
                            <img class="thumb-img" v-else :src="detail.picture">
                            <div v-if="detail.hasAppointRepair" class="has-appintment-img"></div>
                        </div>
                        <div slot="tag" v-if="index==0">
                            <div class="tag-img">
                                <span
                                    class="tag-span-pending"
                                    v-if="item.status==1||item.status==2||item.status==3||item.status==8||item.status==9||item.status==10"
                                >
                                    {{item.statusName}}
                                    <span
                                        v-if="item.status==9&&item.paySystemStatus==1"
                                    >(财务审核中)</span>
                                    <span v-if="item.status==9&&item.paySystemStatus==2">(财务审核已通过)</span>
                                    <span v-if="item.status==9&&item.paySystemStatus==-2">(财务审核已拒绝)</span>
                                </span>
                                <span
                                    class="tag-span-cancel"
                                    v-if="item.status==5||item.status==6||item.status==7"
                                >{{item.statusName}}</span>
                                <span
                                    class="tag-span-finish"
                                    v-if="item.status==4"
                                >{{item.statusName}}</span>
                            </div>
                            <div class="order-title">
                                <span class="title-name">{{item.sellerName}}</span>
                                <img
                                    src="../img/icon-tele.png"
                                    class="tab-info-icon"
                                    @click.stop="tel(item.sellerPhone)"
                                    alt=""
                                >
                            </div>
                        </div>
                        <div slot="title" class="cell-title">
                            <span class="desc-title">{{detail.stdName}}</span>
                            <!-- <span class="info_special" v-if="detail.swSpec">{{detail.swSpec}}</span> -->
                        </div>
                        <div slot="desc" class="cell-title">
                            <div>
                                <span class="desc-no">件号：</span>
                                <span class="desc-num">{{detail.stdOeCode}}&nbsp;{{detail.swSpec}}</span>
                            </div>
                            <span class="desc-tips">{{detail.swBrand}}</span>
                            <span class="desc-tips">{{detail.swProductionPlace}}</span>
                            <div v-if="detail.swVehModel">
                              <span class="desc-no">车型：</span>
                              <span class="desc-tips" >{{detail.swVehModel}}</span>
                            </div>
                            <div v-if="detail.vehSeries" class="desc-ellipsis">
                              <span class="desc-no">适用车型：</span>
                              <span class="desc-tips" >{{detail.vehSeries}}</span>
                            </div>
                        </div>
                        <div slot="bottom" style="clear:both"></div>
                        <div slot="bottom">
                            <p class="install-cost" v-if="detail.installCost">
                                <span class="install-cost-title">安装服务费</span>
                                <span class="install-cost-qty install-cost-right">x {{detail.qty}}</span>
                                <span
                                    class="install-cost-price install-cost-right"
                                >￥{{detail.installCost}}</span>
                            </p>
                        </div>
                    </van-card>
                    <div class="van-card__footer van-card">
                        <span>共{{Number(item.totalQty)-Number(item.termQty)}}件商品</span>
                        <span class="Total" style="margin-left:20px;color: #777B87;">合计：</span>
                        <span style="color: #FF4655;font-weight:bold">¥ {{item.finalPrice}}</span>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>
<script>
import Vue from "vue";
import request, { URL_MODULE } from "@/request";
import {
  Tabbar,
  TabbarItem,
  NavBar,
  Search,
  Card,
  Toast,
  List
} from "vant";
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(NavBar)
  .use(Search)
  .use(Card)
  .use(Toast)
  .use(List);
import { GetQueryString } from "../../src/request/http";
export default {
  name: "salesOrder",
  data() {
    return {
      value: "",
      currentPage: 0,
      activeindex: "0",
      isActive: false,
      statuslist: [
        {
          key: "0",
          value: "全部"
        },
        {
          key: "1",
          value: "待确认"
        },
        {
          key: "2",
          value: "待发货"
        },
        {
          key: "3,4,5,6,7,8,9,10",
          value: "其他状态"
        }
      ],
      orderList: [],
      loading: false,
      finished: false,
      isError: false
    };
  },
  created() {
    this.value = GetQueryString("wantCode");
  },
  methods: {
    tel(phone) {
      window.location.href = "tel:" + phone;
    },
    ToDetail: function(id) {
      this.$router.push(`/salesOrderDetail?${id}`);
    },
    onClickLeft() {
      this.$router.push("mine");
    },
    getAll() {
      this.orderList = [];
      this.currentPage = 0;
      this.getorderlist(false);
    },
    tagget(key) {
      this.orderList = [];
      this.currentPage = 0;
      this.activeindex = key;
      this.getorderlist(false);
    },
    getorderlist(isSearch) {
      let params = {};
      if (isSearch) {
        this.currentPage = 0;
        this.orderList = [];
      }
      params = {
        page: ++this.currentPage,
        pageSize: 20,
        keyword: this.value,
        status: this.activeindex == "0" ? null : this.activeindex,
        type: "seller"
      };
      this.getOrder("/orders/erp", params);
    },
    getOrder: function(url, params) {
      request({
        baseURL: URL_MODULE.united,
        url,
        params
      })
        .then(res => {
          let data = res.rows;
          if (data.length != 0) {
            this.orderList = this.orderList.concat(res.rows);
            this.loading = false;
            if (this.orderList.length >= res.totalSize) {
              this.finished = true;
              this.loading = false;
            }
          } else {
            this.finished = true;
            this.loading = false;
          }
        })
        .catch(error => {
          this.isError = true;
          this.loading = false;
          this.finished = true;
          if(error && error.message) {
            Toast.fail(error.message);
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
#salesOrder {
  font-family: PingFang-SC-Medium;
  color: #1a2231;
  min-height: 100vh;
  overflow: auto;
  background: #f1f3f6;
  .search{
    input::-webkit-input-placeholder {
      font-size: 10px;
    }
  }
  .top-bar {
    background: #ffffff;
    height: 44px;
    width: 320px;
    overflow-x: auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    .bar-item {
      display: inline-block;
      width: 80px;
      font-size: 16px;
      font-weight: normal;
      color: #aaacb7;
      padding: 0 10px;
      line-height: 44px;
      word-break: keep-all;
      white-space: nowrap;
    }
    .isActive {
      font-size: 16px;
      font-weight: bold;
      color: #21bdc2;
      position: relative;
      &::after {
        content: "";
        display: inline-block;
        width: 6px;
        height: 6px;
        background: url("../img/icon-sanjiaoxing-b.png") no-repeat;
        background-size: 100% 100%;
        background-size: 100% 100%;
        position: absolute;
        left: calc(50% - 3px);
        top: 33px;
      }
    }
  }
  .order_list {
    background: #f1f3f6;
    .order-item {
      margin: 16px 16px 0 16px;
      border-radius: 6px;
      &:not(:first-child) {
        margin-top: 20px;
      }
      .tag-img {
        position: relative;
        top: -67px;
        left: -16px;
        text-align: left;
        .tag-span-pending,
        .tag-span-cancel,
        .tag-span-finish {
          display: inline-block;
          padding: 3px 10px;
          border-top-left-radius: 4px;
          border-bottom-right-radius: 10px;
          line-height: 20px;
          color: #ffffff;
          font-size: 12px;
        }
        .tag-span-pending {
          background: #ff6700;
        }
        .tag-span-cancel {
          background: #ccced4;
        }
        .tag-span-finish {
          background: #10b187;
        }
      }
      .order-title {
        width: 307px;
        height: 20px;
        position: relative;
        top: -60px;
        margin-left: 8px;
        margin-right: 8px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .title-name {
          font-size: 14px;
          color: #1a2231;
          font-weight: bold;
        }
        .tab-info-icon {
          width: 20px;
          height: 20px;
          margin-left: auto;
        }
      }
      .thumb-border {
        position: relative;
        border: 0.6px solid #e8eaef;
        box-sizing: border-box;
        width: 76px;
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .thumb-img {
        width: 44px;
        height: 44px;
      }
      .cell-title {
        text-align: left;
        margin-left: 10px;
        color: #1a2231;
        .desc-title {
          font-size: 14px;
          line-height: 20px;
        }
        .info_special{
          color: #e98b11;
          font-size: 12px;
          margin-left: 6px;
          border: 1px solid #e98b11;
          border-radius: 4px;
        }
        .desc-no {
          color: #777b87;
          font-size: 12px;
          line-height: 17px;
        }
        .desc-tips {
          margin-right: 14px;
          color: #777b87;
          font-size: 12px;
          line-height: 17px;
        }
        .desc-ellipsis {
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
  }
}
/deep/.van-nav-bar__right {
  width: 320px !important;
}
/deep/ .van-card:not(:first-child) {
  margin-top: 0;
}
/deep/ .van-card:not(:first-child) .van-card__content {
  border-bottom: 1px solid #edeff1;
}
/deep/ .van-card {
  background: #ffffff;
  font-size: 14px;
  color: #1a2231;
}
/deep/ .van-card__price {
  float: left;
  margin-left: 10px;
}
/deep/ .van-card__content:not(:first-child) {
  border-bottom: 1px solid #edeff1;
}
/deep/ .van-card:first-child .van-card__header {
  margin-top: 56px;
}
/deep/ .van-hairline--top-bottom::after {
  border-width: 0;
}
/deep/ .van-search--show-action {
  border-bottom: 0.5px solid #edeff1;
}
/deep/ .van-card__price {
  color: #ff4655 !important;
}
/deep/ .van-hairline--top-bottom::after {
  border: none;
}
/deep/ .van-card {
  background: #fff;
}
/deep/.van-card__num {
  color: #777b87;
}
/deep/.van-icon-search:before {
  content: "";
  background: url("../img/icon-serch.png") no-repeat;
  display: inline-block;
  opacity: 0.4;
  background-size: 100% 100%;
  width: 16px;
  height: 16px;
  margin-left: 4.6px;
  background-color: #ffffff;
}
/deep/.van-field__control {
  text-indent: 0;
  background-color: #ffffff;
}
/deep/.van-cell {
  background-color: #ffffff;
}
/deep/.van-search {
  background-color: transparent !important;
}
/deep/.van-search {
  padding: 0.26667rem 0.32rem 0 0.32rem;
}
/deep/.van-search__content {
  padding: 6px 0;
  width: 200px;
  border-radius: 6px;
  background-color: #ffffff;
}
/deep/ .van-search__content .van-field__control::-webkit-input-placeholder {
  color: #777b87;
}

/deep/ .van-search__content .van-field__control::-moz-placeholder {
  color: #777b87;
}

/deep/ .van-search__content .van-field__control:-ms-input-placeholder {
  color: #777b87;
}
/deep/ .van-cell {
  padding: 0 !important;
}
.has-appintment-img {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 0;
  top: 0;
  background-image: url("../img/has-order-tag.jpg");
  background-size: 100% 100%;
}
.install-cost {
  text-align: left;
  margin: 0;
  padding-left: 10px;
  .install-cost-title {
    font-size: 13px;
    color: #515151 !important;
  }
  .install-cost-right {
    float: right;
  }
  .install-cost-qty {
    color: #9d9c9b;
  }
  .install-cost-price {
    margin-right: 10px;
    color: #ee7d04;
  }
  .install-cost-checkbox {
    margin: 3px 8px 0 11px;
    overflow: auto;
  }
}
</style>


