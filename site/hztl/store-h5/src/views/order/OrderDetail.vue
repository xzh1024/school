<template>
    <div id="orderDetail" class="order-content">
        <van-nav-bar
            left-text="返回"
            right-text
            left-arrow
            @click-right="onClickRight"
            @click-left="onClickLeft"
        >
            <a v-if="defaultPhone" :href="'tel:'+defaultPhone" slot="right">
                <i class="iconfont icon-home_phone icon-phone"></i>
            </a>
        </van-nav-bar>
        <div class="content-bac">
            <div class="content-body">
              <img class="content-bg" src="../../assets/order-bac.png">
                <div
                    class="Detail-head mar-left"
                    v-if="orderList.status===item.id"
                    v-for="(item,index) in status"
                    :key="index"
                >
                    <img :src="item.imgUrl" class="Detail-img">
                    <span class="white-color">{{item.name}}</span>
                    <span class="head-paytime" v-if="orderList.status==10">请在 23:59:59 内完成支付</span>
                </div>
                <div class="mar-left">
                    <van-row
                        gutter="0"
                        type="flex"
                        justify="center"
                        v-if="orderList.status==1||orderList.status==2
                    ||orderList.status==3||orderList.status==4||orderList.status==8||orderList.status==9||orderList.status==10"
                        class="tips-content white-color"
                    >
                        <van-col :class="{'selected':orderList.status==1}" span="4">待确认</van-col>
                        <van-col span="1">></van-col>
                        <van-col
                            :class="{'selected':orderList.status==10||orderList.status==8||orderList.status==9}"
                            span="4"
                        >待付款</van-col>
                        <van-col span="1">></van-col>
                        <van-col :class="{'selected':orderList.status==2}" span="4">待发货</van-col>
                        <van-col span="1">></van-col>
                        <van-col :class="{'selected':orderList.status==3}" span="4">待收货</van-col>
                        <van-col span="1">></van-col>
                        <van-col :class="{'selected':orderList.status==4}" span="4">已完成</van-col>
                    </van-row>
                </div>
                <div class="address">
                    <div class="person-phone">
                        <p class="person">
                            收货人：
                            <span>{{orderList.receiver}}</span>
                        </p>
                        <p class="phone-p">{{orderList.receiverPhone}}</p>
                    </div>
                    <div class="order-address">
                        <p>收货地址：{{orderList.receiverAreaName+orderList.receiverAddress}}</p>
                    </div>
                    <div class="address-icon"></div>
                    <div class="edit-address" v-if="orderList.status==1" @click="toAddressChose()"></div>
                </div>
                <div class="check-repair" v-if="orderList.hasRepairFactory">
                    <span class="text">预约修理厂</span>
                    <div class="edit-address" style="top:0.0533rem" @click="checkRepair()"></div>
                </div>
                <div class="orderItem">
                    <div id="order_list">
                        <div class="order-item">
                            <template v-if="orderList.details">
                                <div class="card-item" v-for="(sku, index) in orderList.details" :key="index">
                                    <SkuCard type="order" :sku="sku">
                                      <div slot="plus" class="clearfix m-t-4 font-size-12">
                                        <div class="fl strong">
                                          <span>¥</span>
                                          <span class="font-size-16">{{ sku.price }}</span>
                                        </div>
                                        <div class="fr">
                                          <span class="color-bye">{{ sku.qty }}</span>
                                          <span v-if="Number(sku.termQty)" class="color-danger">
                                            (终止{{ sku.termQty }})
                                          </span>
                                        </div>
                                      </div>
                                    </SkuCard>
                                </div>
                            </template>
                            <div class="van-card__footer van-card">
                                <span>共{{orderList.finalQty}}件商品</span>
                                <span style="margin-left:20px;color: #AAACB7;">订单合计：</span>
                                <span style="color: #FF424D;">¥ {{orderList.finalPrice}}</span>
                                <span style="margin-left:20px;color: #AAACB7;">付款金额：</span>
                                <span style="color: #FF424D;">¥ {{orderList.finalAmount}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="order_msg">
                    <p class="order_msg_title">订单信息</p>
                    <p>
                        <span class="msg_title">订单编号：</span>
                        <span>{{orderList.orderCode}}</span>
                        <span @click="copyActiveCode($event,orderList.orderCode)" class="msg_copy">复制</span>
                    </p>
                    <p>
                        <span class="msg_title">结算信息：</span>
                        <span>{{orderList.paymentType}}</span>
                        <span class="msg_title_tip">收据</span>
                    </p>
                    <p>
                        <span class="msg_title">发票类型：</span>
                        <span>{{orderList.invoiceType}}</span>
                    </p>
                    <p>
                        <span class="msg_title">创建时间：</span>
                        <span>{{orderList.createdAt}}</span>
                    </p>
                    <p>
                        <span class="msg_title">提货方式：</span>
                        <span>{{orderList.deliveryType}}</span>
                    </p>
                    <p>
                        <span class="msg_title">运输方式：</span>
                        <span>{{orderList.transportType}}</span>
                    </p>
                    <p>
                        <span class="msg_title">买家备注：</span>
                        <span>{{orderList.remarks}}</span>
                    </p>
                </div>
            </div>
            <div class="order-bottom-btn">
                <button
                    v-if="orderList.status==10||orderList.status==1||orderList.status==2||orderList.status==8||orderList.status==9"
                    class="bottom-btn-cancle"
                    @click="OrderCancle"
                >取消订单</button>
                <button
                    v-if="(orderList.status==10||orderList.status==8||orderList.status==9)&&(hasSaoma||hasWxPay)"
                    @click="toPayment"
                    class="bottom-btn-pay"
                >去付款</button>
                <!-- <button
                    v-if="(orderList.status==10||orderList.status==8||orderList.status==9)&&hasSaoma"
                    @click="DownPay"
                    class="bottom-btn-pay"
                >扫码付款</button>
                <button
                    v-if="(orderList.status==10||orderList.status==8||orderList.status==9)&&hasWxPay"
                    class="bottom-btn-pay"
                    @click="wxPay"
                >微信支付</button> -->
                <button
                    v-if="orderList.status==3"
                    @click="Confirmreceipt"
                    class="bottom-btn-pay"
                >确认收货</button>
            </div>
        </div>
        <van-popup v-model="Downpay" closeable position="bottom" :style="{ height: '80%' }">
            <div class="DownPay-con">
                <p class="DownPay-title">线下支付</p>
                <div class="providerItem">
                    <div class="provider-tips">
                        <img v-if="paystatus==1" src="../../assets/tips_cooperation.png">
                        <img v-if="paystatus==2" src="../../assets/tips_Suspendcooperation.png">
                    </div>
                    <!-- <div class="provider-company">
                    <span class="name">{{name}}</span>
                    </div>-->
                    <div class="provider-pic">
                        <img :src="url">
                        <p class="provider-pic-bottom">长按保存图片</p>
                    </div>
                    <div class="proder-msg">
                        <p>* 注意: 转账前请与商家核对身份及账单信息，</p>
                        <p>转账时请谨慎操作</p>
                    </div>
                </div>
                <div class="DownPay-text">
                    <span>备注：</span>
                    <input
                        type="text"
                        v-model="note"
                        style="width:6rem;border:0.5px solid #EDEFF1"
                        placeholder="给卖家嘱咐两句"
                    >
                    <!-- <textarea name="" id="" v-model="note" cols="10" rows="5"></textarea> -->
                </div>
                <!-- <div class="DownPay-link" @click="checkPayment">查看商家收款信息</div> -->
                <div class="DownPay-buton" @click="DownPayOK">确认</div>
            </div>
        </van-popup>
        <RepairPopup v-model="postRepairObj" @chosedRepair="chosedRepairList"></RepairPopup>
    </div>
</template>
<script>
import Vue from "vue";
import Clipboard from "clipboard";
import SkuCard from "../../../store-common/component/Sku/Card";
import request, { URL_MODULE } from "@/request";
import RepairPopup from "../../../store-common/component/RepairPopup/RepairPopup";
import { NavBar, Row, Col, Card, Button, Dialog, Toast, Popup } from "vant";
Vue.use(NavBar)
  .use(Row)
  .use(Col)
  .use(Card)
  .use(Button)
  .use(Toast)
  .use(Popup)
  .use(Dialog);
export default {
  name: "orderDetail",
  components: { RepairPopup, SkuCard },
  data() {
    return {
      defaultPhone: "",
      active: 1,
      orderList: [],
      hasSaoma: true,
      status: [
        {
          id: 1,
          name: "等待商家接单 !",
          imgUrl: require("../../assets/icon-pendSumit.png")
        },
        {
          id: 2,
          name: "待发货 !",
          imgUrl: require("../../assets/icon-pendReceipt.png")
        },
        {
          id: 3,
          name: "待收货 !",
          imgUrl: require("../../assets/icon-undelivered.png")
        },
        {
          id: 4,
          name: "交易完成 !",
          imgUrl: require("../../assets/icon-finished.png")
        },
        {
          id: 5,
          name: "订单已取消 !",
          imgUrl: require("../../assets/icon-canled.png")
        },
        {
          id: 6,
          name: "订单已取消 !",
          imgUrl: require("../../assets/icon-canled.png")
        },
        {
          id: 7,
          name: "订单已取消 !",
          imgUrl: require("../../assets/icon-canled.png")
        },
        {
          id: 8,
          name: "待付款 !",
          imgUrl: require("../../assets/icon-pendPay.png")
        },
        {
          id: 9,
          name: "待付款 !",
          imgUrl: require("../../assets/icon-pendPay.png")
        },
        {
          id: 10,
          name: "待付款 !",
          imgUrl: require("../../assets/icon-pendPay.png")
        }
      ],
      Downpay: false,
      note: "",
      name: "",
      url: "",
      paystatus: null,
      id: "",
      postRepairObj: {
        show: false,
        concatPostRepair: "", //用于拼接传入组件
        fromConfirm: false,
        showData: {}
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    //路由导航钩子，通过页面路由标记是否需要清空页面数据重新加载
    to.meta["fromPath"] = from.path;
    if (
      from.path == "/index" ||
      from.path == "/orderList" ||
      from.path == "/confirmOrder" ||
      from.path == "/address" ||
      from.path == "/payment"
    ) {
      to.meta["needFresh"] = true;
    } else {
      to.meta["needFresh"] = false;
    }
    next();
  },
  activated() {
    //此方法在页面缓存时会被调用，根据路由元信息决定是否重新加载数据。不加载则是上次填写完的数据
    if (this.$route.meta["needFresh"]) {
      if (location.href.split("?")) {
        this.id = location.href.split("?")[1];
      }
      this.onload();
      this.loadList();
    }
    // } else {
    // this.Downpay = true;
    // }
  },
  beforeMount: function() {
    if (location.href.split("?")) {
      this.id = location.href.split("?")[1];
    }
    if (location.hostname == "jndm.hztl3.com") {
      this.hasSaoma = false;
    }
    this.onload();
    this.loadList();
  },
  mounted: function() {
    this.loadDefaultPhone();
  },
  methods: {
    toPayment(){//去付款
      let obj={
        path:'/payment',
        query:{
          id:this.id,
          billType:1,
          amount:this.orderList.finalPrice
        }
      }
      this.$router.push(obj);
    },
    chosedRepairList(value) {
      this.postRepairObj = {
        show: false,
        concatPostRepair: "", //用于拼接传入组件
        fromConfirm: false,
        showData: {}
      };
      //去预约修理厂
      if (value && value.details && value.details.length) {
        //拼接数据
        let postData = [];
        for (let detail of value.details) {
          if (!detail.hasAppointRepair && detail.appointRepairId) {
            postData.push({
              orderDetailId: detail.id,
              appointTime: detail.appointTime,
              appointRepairId: detail.appointRepairId
            });
          }
        }
        if (postData.length > 0) {
          //请求接口
          request({
            method: "post",
            url: "/appointments/install",
            baseURL: URL_MODULE.united,
            data: postData
          }).then(res => {
            this.onload();
            this.loadList();
            Toast("预约成功！");
          });
        }
      }
    },
    checkRepair() {
      this.postRepairObj = {
        show: true,
        concatPostRepair: this.id,
        fromConfirm: false,
        showData: {}
      };
    },
    onClickLeft: function() {
      this.$router.push("/orderList");
    },
    onClickRight: function() {},

    loadList: function() {
      let _this = this;
      const params = {
        page: ++_this.pageCount,
        pageSize: 10
      }
      request({
        url: "/suppliers",
        params
      }).then(function(res) {
        if (res.rows && res.rows.length) {
          const data = res.rows[0];
          _this.name = data.supplierName;
          _this.url = data.paymentCode;
          _this.paystatus = data.status;
        }
      });
    },
    checkPayment: function() {
      this.$router.push({
        name: "supplierPayment",
        params: { name: this.name, url: this.url, status: this.paystatus }
      });
    },
    toAddressChose: function() {
      this.$router.push(
        "address?Order=true&id=" + this.id + "&status=" + this.orderList.status
      );
    },
    copyActiveCode(e, text) {
      const clipboard = new Clipboard(e.target, { text: () => text });
      clipboard.on("success", e => {
        Toast.success("复制成功");
        // 释放内存
        clipboard.off("error");
        clipboard.off("success");
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        Toast.fail("该浏览器不支持自动复制");
        // 释放内存
        clipboard.off("error");
        clipboard.off("success");
        clipboard.destroy();
      });
      clipboard.onClick(e);
    },
    OrderCancle: function() {
      //取消订单
      Dialog.confirm({
        title: "",
        message: "确认要取消整笔订单？"
      })
        .then(() => {
          let params = {
            status: 5 // 订单状态，必需
          };
          let _this = this;
          request({
            method: "post",
            baseURL: URL_MODULE.united,
            url: "/orders/" + _this.id,
            data: params
          }).then(
            function() {
              Toast.success("操作成功！");
              _this.$router.push("orderList");
            },
            function(err) {
              if(err && err.message) {
                Toast.fail(err.message);
              }
              _this.$router.push("error");
            }
          );
        })
        .catch(() => {
          // on cancel
        });
    },
    DownPayOK: function() {
      let _this = this;
      let params = {
        remarks: _this.note
      };
      request({
        method: "post",
        url: "/orders/" + _this.id + "/pay?type=financial",
        params
      }).then(res => {
        // let url = res.url;
        request({
          method: "post",
          baseURL: URL_MODULE.pay,
          url: "/token-sign/pay/financial",
          data: res.dataString
        })
          .then(() => {
            Toast.success("操作成功！");
            _this.$router.push("orderList");
            _this.note = "";
          }).catch(err => {
            if(err && err.message) {
              Toast.fail(err.message);
            }
          });
      }).catch(err => {
        if(err && err.message) {
          Toast.fail(err.message);
        }
      });
    },
    DownPay: function() {
      //线下支付
      this.Downpay = true;
    },
    wxPay: function() {
      let _this = this;
      let params = {
        remarks: _this.note
      };
      // 先调用之前的支付，上传type为微信方式，再调用获取微信支付参数接口，最后微信支付
      request({
        method: "post",
        url: "/orders/" + _this.id + "/pay?type=weixin-jsapi",
        data: params
      }).then(res => {
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            appId: res.appId,
            timeStamp: res.timeStamp,
            nonceStr: res.nonceStr,
            package: res.package,
            signType: res.signType,
            paySign: res.paySign
          },
          function(resp) {
            if (resp.err_msg == "get_brand_wcpay_request:ok") {
              _this.$router.go(0);
            }
          }
        );
      }).catch(err => {
        if(err && err.message) {
          Toast.fail(err.message);
        }
      });
    },
    Confirmreceipt: function() {
      //确认收货
      let params = {
        status: 4 // 订单状态，必需
      };
      let _this = this;
      request({
        method: "post",
        baseURL: URL_MODULE.united,
        url: "/orders/" + _this.id,
        data: params
      }).then(() => {
        Toast.success("操作成功！");
        _this.note = "";
        _this.Downpay = false;
        _this.$router.push("orderList");
      }).catch(err => {
        if(err && err.message) {
          Toast.fail(error.data.message);
        }
        _this.$router.push("error");
      });
    },
    onload: function() {
      let _this = this;
      request({
        url: "/orders/app/" + _this.id,
        baseURL: URL_MODULE.united,
      }).then(res => {
        _this.orderList = res || [];
      }).catch(err => {
        _this.isError = true;
        if(err && err.message) {
          Toast.fail(err.message);
        }
      });
    },
    loadDefaultPhone() {
      let _this = this;
      request({
        url: `/companies/phone`
      })
      .then(res => {
        _this.defaultPhone = res;
      });
    }
  },
  filters: {
    skuImage(images) {
      let result = require("../../assets/icon-product-ls.png");
      if (location.hostname == "jndm.hztl3.com") {
        result = require("../../assets/icon-product.png");
      }
      if (images && images.length > 0) {
        result = images[0] + "&imageView2/1/w/100/h/100";
      }
      return result;
    }
  }
};
</script>
<style lang="less">
.order-content {
  .icon-phone {
    display: inline-block;
    margin-top: 1px;
    width: 28px;
    height: 28px;
    line-height: 28px;
    border-radius: 50%;
    background-image: linear-gradient(224deg, #ffb12d 0%, #ff6e4c 100%);
    font-size: 20px;
    color: #ffffff;
  }
  .van-nav-bar__right {
    align-items: flex-start;
  }
}
.selected {
  color: #fefc02;
  font-weight: bold;
}
.van-nav-bar__right {
  top: 8px;
}
.white-color {
  color: #ffffff;
}
.order-content {
  background: #f8f8f8;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content-bac {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .content-body {
    position: relative;
    z-index: 2;
    flex: 1;
    overflow-y: auto;
    padding-bottom: 16px;
    .content-bg {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
    }
  }
  .Detail-head {
    width: calc(100% - 20px);
    font-size: 17px;
    line-height: 40px;
    display: flex;
    align-items: center;
    padding: 12px 0 0 16px;
    box-sizing: border-box;
    .Detail-img {
      width: 40px;
      height: 40px;
    }
    .head-paytime {
      font-size: 12px;
      color: #ffffff;
      margin-left: auto;
    }
  }
  .tips-content {
    font-size: 16px;
    line-height: 22px;
    margin: 10px 16px 0 16px !important;
  }
}
.address {
  width: 343px;
  height: 102px;
  margin-left: 16px;
  margin-top: 16px;
  background: #ffffff;
  border-radius: 8px;
  position: relative;
  div {
    width: 271px;
    margin: 16px auto;
  }
  p {
    font-size: 14px;
    margin: 0;
  }
  .person-phone {
    overflow: hidden;
    padding-top: 16px;
    line-height: 20px;
    .person {
      float: left;
      color: #aaacb7;
      span {
        color: #171c24;
      }
    }
    .phone-p {
      float: right;
    }
  }
  .order-address {
    text-align: justify;
    position: relative;
    p {
      font-size: 12px;
    }
  }
  .edit-address {
    top: 29px;
  }
  .address-icon {
    width: 18px;
    height: 18px;
    background-image: url("../../assets/address-icon.png");
    background-size: 100% 100%;
    margin-left: 8px;
    margin-top: -40px;
  }
}
.orderItem {
  width: 343px;
  margin-left: 16px;
  margin-top: 8px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  .van-card:not(:first-child) {
    margin-top: 0;
  }
  .van-card {
    background: #ffffff;
  }
  .order-item {
    margin: 0;
  }
  .van-card:first-child .van-card__header {
    margin-top: 0;
  }
  .van-card__price {
    float: left;
    margin-left: 10px;
  }
  .van-card__content:not(:first-child) {
    border-bottom: 1px solid #edeff1;
  }
  .van-card__footer {
    font-size: 12px;
  }
  .thumb-border {
    position: relative;
    border: 0.6px solid #f2f3f5;
    box-sizing: border-box;
    width: 90px;
    height: 90px;
  }
  .thumb-img {
    width: 90px;
    height: 90px;
  }
  .cell-title {
    text-align: left;
    margin-left: 10px;
    color: #171c24;
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
      color: #aaacb7;
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
    .price {
      color: #ff424d;
      vertical-align: left;
    }
  }
}
.order_msg {
  width: 343px;
  margin-left: 16px;
  margin-top: 16px;
  padding-bottom: 16px;
  background: #ffffff;
  border-radius: 8px;
  font-size: 14px;
  .order_msg_title {
    font-size: 14px;
    font-weight: bold;
    line-height: 50px;
    border-bottom: 0.5px solid #edeff1;
  }
  /* .order_msg_title:first-child{
            position: relative;
        } */
  p {
    text-align: left;
    margin-left: 8px;
    margin-right: 8px;
    span {
      font-size: 12px;
    }
    .msg_title {
      color: #777b87;
    }
    .msg_title_tip {
      margin-left: 20px;
    }
    .msg_copy {
      color: #ff6700;
      position: relative;
      left: 124px;
      cursor: pointer;
    }
  }
}
.order-bottom-btn {
  width: 100%;
  height: 49px;
  margin: 0 16px 0 0;
  border-top: 0.5px solid #edeff1;
  background: #ffffff;
  display: flex;
  justify-content: flex-end;
  button {
    width: 104px;
    height: 40px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.4);
    font-size: 14px;
    color: #777b87;
    border: 1px solid #ccced4;
    margin-top: 6px;
    &:last-child {
      margin-right: 16px;
    }
  }
  .bottom-btn-pay {
    color: #00a8ea;
    border: 1px solid #00a8ea;
    margin-left: 16px;
  }
}
.DownPay-con {
  .DownPay-title {
    font-size: 14px;
    line-height: 30px;
    border-bottom: 0.5px solid #edeff1;
  }
  .DownPay-text {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 16px;
    span {
      width: 60px;
    }
    textarea {
      flex: 1;
      border: 1px solid #edeff1;
    }
  }
  .DownPay-link {
    margin-top: 16px;
    font-size: 12px;
    color: #00a8ea;
  }
  .DownPay-buton {
    color: #00a8ea;
    border: 1px solid #00a8ea;
    margin: 16px auto;
    font-size: 14px;
    line-height: 40px;
    width: 104px;
    height: 40px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.4);
  }
}
.provider-company {
  height: 35px;
  margin: 0 8px;
  border-bottom: 0.5px solid #edeff1;
  font-size: 14px;
  .name {
    color: #171c24;
    position: absolute;
    left: 24px;
    line-height: 20px;
    font-weight: bold;
  }
}
.provider-pic {
  height: 6.35rem;
  margin: 0 8px;
  border-bottom: 0.5px solid #edeff1;
  .provider-pic-top {
    font-size: 14px;
    margin-bottom: 35px;
  }
  .provider-pic-bottom {
    font-size: 12px;
    color: #aaacb7;
    letter-spacing: -0.29px;
  }
  img {
    width: 188px;
    height: 188px;
  }
  // .provider-pic-border{
  //     border: 0.5px solid #EDEFF1;
  //     width: 188px;
  //     height: 188px;
  //     margin: 0 auto;
  // }
}
.proder-msg {
  font-size: 14px;
  color: #171c24;
  letter-spacing: -0.34px;
  text-align: center;
  line-height: 17px;
  padding: 20px 0;
  p {
    margin-block-start: 0;
    margin-block-end: 0;
  }
}
.check-repair {
  position: relative;
  margin: 8px auto 0;
  width: 343px;
  background: #ffffff;
  overflow: hidden;
  .text {
    float: left;
    padding-left: 10px;
    line-height: 32px;
    font-size: 12px;
  }
  button {
    float: right;
    margin: 3px 10px 0 0;
    font-size: 14px;
    color: #e8e54a;
    border: 1px solid #e8e54a;
    border-radius: 15px;
    background: #ffffff;
  }
}
.edit-address {
  width: 28px !important;
  height: 28px !important;
  position: absolute;
  background-image: url("../../assets/address-edit.png");
  background-size: 100% 100%;
  right: 8px;
  top: 56px;
  margin: 0;
  cursor: pointer;
}
.install-cost {
  margin: 0 0 0 10px;
  text-align: left;
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
  }
}
.has-appintment-img {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 0;
  top: 0;
  background-image: url("../../../store-common/img/has-order-tag.jpg");
  background-size: 100% 100%;
}
</style>