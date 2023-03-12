<template>
    <div id="salesOrderDetail" class="order-content">
        <van-nav-bar @click-left="onClickLeft">
            <img src="../img/back-icon.png" slot="left" class="Back">
        </van-nav-bar>
        <div class="content-bac">
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
                    <van-col span="1" class="flex">
                        <img class="icon-next" src="../img/icon-next.png" alt="">
                    </van-col>
                    <van-col
                        :class="{'selected':orderList.status==10||orderList.status==8||orderList.status==9}"
                        span="4"
                    >待付款</van-col>
                    <van-col span="1" class="flex">
                        <img class="icon-next" src="../img/icon-next.png" alt="">
                    </van-col>
                    <van-col :class="{'selected':orderList.status==2}" span="4">待发货</van-col>
                    <van-col span="1" class="flex">
                        <img class="icon-next" src="../img/icon-next.png" alt="">
                    </van-col>
                    <van-col :class="{'selected':orderList.status==3}" span="4">待收货</van-col>
                    <van-col span="1" class="flex">
                        <img class="icon-next" src="../img/icon-next.png" alt="">
                    </van-col>
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
            </div>
            <div class="orderItem">
                <div id="order_list">
                    <div class="order-title">
                        <span class="title-name">{{orderList.sellerName}}</span>
                        <img
                            src="../img/icon-tele.png"
                            class="tab-info-icon"
                            @click="tel(orderList.sellerPhone)"
                            alt=""
                        >
                    </div>
                    <div class="order-item">
                        <van-card
                            :price="detail.price"
                            v-if="orderList.details"
                            v-for="(detail,index) in orderList.details"
                            :key="index"
                        >
                            <div slot="num">
                                <span v-if="orderList.status==1" style="color:#FF6700">可供货：</span>
                                <van-stepper
                                    v-if="orderList.status==1"
                                    @change="onChange"
                                    v-model="detail.supplyQty"
                                    min="0"
                                    :max="detail.qty"
                                    integer
                                    button-size="0.586666667rem"
                                ></van-stepper>
                                <span v-else style="color:#AAACB7">x {{detail.qty}}</span>
                                <span
                                    v-if="Number(detail.termQty)>0&&orderList.status!=1"
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
                                    <span
                                        class="install-cost-qty install-cost-right"
                                    >x {{detail.qty}}</span>
                                    <span
                                        class="install-cost-price install-cost-right"
                                    >￥{{detail.installCost}}</span>
                                </p>
                            </div>
                        </van-card>
                        <div class="van-card__footer van-card">
                            <span v-if="orderList.status!=1">
                                <label>订货:</label>
                                {{orderList.totalQty}}
                            </span>
                            <span v-if="orderList.status!=1">
                                <label>供货:</label>
                                {{orderList.supplyQty}}
                            </span>
                            <span v-if="orderList.status==3||orderList.status==4">
                                <label>发货:</label>
                                {{orderList.deliverQty}}
                            </span>
                            <span v-if="orderList.status==4">
                                <label>收货:</label>
                                {{orderList.receiveQty}}
                            </span>
                            <p>
                                <span v-if="orderList.status==1">共{{orderList.supplyQty}}件商品</span>
                                <span style="color: #777B87;">合计：</span>
                                <label
                                    style="color: #FF4655;font-weight:600"
                                >¥ {{Number(orderList.finalPrice).toFixed(2)}}</label>
                            </p>
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
                    <span class="msg_title">创建时间：</span>
                    <span>{{timeFormat(orderList.createdAt)}}</span>
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
                    <span class="msg_title">物流信息：</span>
                    <input
                        v-if="orderList.status==2"
                        style="width:5.33rem;"
                        placeholder="选填，填写物流信息"
                        type="text"
                        v-model="orderList.logistics"
                    >
                    <span v-else>{{orderList.logistics}}</span>
                </p>
                <p>
                    <span class="msg_title">买家备注：</span>
                    <span>{{orderList.remarks}}</span>
                </p>
            </div>
            <div
                class="order-bottom-btn"
                v-if="orderList.status!=3&&orderList.status!=4&&orderList.status!=5&&orderList.status!=6&&orderList.status!=7"
            >
                <button
                    v-if="orderList.status==10||orderList.status==1||orderList.status==8||orderList.status==9"
                    class="bottom-btn-cancle"
                    @click="OrderCancle"
                >取消订单</button>
                <button v-if="orderList.status==1" class="bottom-btn-pay" @click="OrderConfirm">确认接单</button>
                <button
                    v-if="orderList.paySystemStatus==1"
                    @click="FinancialAudit"
                    class="bottom-btn-pay"
                >财务审核</button>
                <button
                    v-if="orderList.status==2"
                    class="bottom-btn-pay"
                    @click="Confirmdelivery"
                >确认发货</button>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import {
  NavBar,
  Row,
  Col,
  Card,
  Button,
  Dialog,
  Toast,
  Popup,
  Stepper
} from "vant";
import Clipboard from "clipboard";
import request, { URL_MODULE } from "@/request";
Vue.use(NavBar)
  .use(Row)
  .use(Col)
  .use(Card)
  .use(Button)
  .use(Toast)
  .use(Popup)
  .use(Stepper);
export default {
  name: "salesOrderDetail",
  data() {
    return {
      active: 1,
      orderList: [],
      status: [
        {
          id: 1,
          name: "等待商家接单 !",
          imgUrl: require("../img/icon-pendSumit.png")
        },
        {
          id: 2,
          name: "待发货 !",
          imgUrl: require("../img/icon-pendReceipt.png")
        },
        {
          id: 3,
          name: "待收货 !",
          imgUrl: require("../img/icon-undelivered.png")
        },
        {
          id: 4,
          name: "交易完成 !",
          imgUrl: require("../img/icon-finished.png")
        },
        {
          id: 5,
          name: "订单已取消 !",
          imgUrl: require("../img/icon-canled.png")
        },
        {
          id: 6,
          name: "订单已取消 !",
          imgUrl: require("../img/icon-canled.png")
        },
        {
          id: 7,
          name: "订单已取消 !",
          imgUrl: require("../img/icon-canled.png")
        },
        {
          id: 8,
          name: "待付款 !",
          imgUrl: require("../img/icon-pendPay.png")
        },
        {
          id: 9,
          name: "待付款 !",
          imgUrl: require("../img/icon-pendPay.png")
        },
        {
          id: 10,
          name: "待付款 !",
          imgUrl: require("../img/icon-pendPay.png")
        }
      ],
      note: "",
      name: "",
      url: "",
      paystatus: null,
      id: ""
    };
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickLeft, false);
  },
  beforeMount() {
    if (location.href.split("?")) {
      this.id = location.href.split("?")[1];
    }
    this.onload();
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickLeft, false);
    }
  },
  methods: {
    tel(phone) {
      window.location.href = "tel:" + phone;
    },
    onClickLeft() {
      this.$router.push("salesOrder");
    },
    onChange() {
      let totalQty = 0;
      let totalPrice = 0;
      this.orderList.details.forEach(detail => {
        totalQty += Number(detail.supplyQty);
        totalPrice += Number(detail.supplyQty) * Number(detail.price);
      });
      this.orderList.supplyQty = totalQty;
      this.orderList.totalPrice = totalPrice;
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
    OrderCancle() {
      //取消订单
      Dialog.confirm({
        title: "",
        message: "确认要取消整笔订单？"
      })
        .then(() => {
          let params = {
            status: 6, // 订单状态，必需
            notErpOpt: true
          };
          request({
            method: "post",
            baseURL: URL_MODULE.united,
            url: "/orders/" + this.id,
            data: params
          })
            .then(() => {
              Toast.success("操作成功！");
              this.$router.push("salesOrder");
            })
            .catch(err => {
              if(err && err.message) {
                Toast.fail(err.message);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    OrderConfirm() {
      //确认订单
      let details = [];
      this.orderList.details.forEach(detail => {
        details.push({
          id: detail.id,
          termQty: detail.qty - detail.supplyQty
        });
      });
      let params = {
        status: 2, // 订单状态，必需
        details: details,
        notErpOpt: true
      };
      request({
        methos: "post",
        baseURL: URL_MODULE.united,
        url: "/orders/" + this.id,
        data: params
      })
        .then(() => {
          Toast.success("操作成功！");
          this.$router.push("salesOrder");
        })
        .catch(err => {
          if(err && err.message) {
            Toast.fail(err.message);
          }
        });
    },
    Confirmdelivery() {
      //确认发货
      let data = {
        logistics: this.orderList.logistics
      };
      request({
        methos: "post",
        baseURL: URL_MODULE.united,
        url: "/orders/logistics/" + this.id,
        data
      })
        .then(() => {
          let details = [];
          this.orderList.details.forEach(detail => {
            details.push({
              id: detail.id,
              outQty: detail.qty - detail.termQty
            });
          });
          let params = {
            status: 3, // 订单状态，必需
            details: details,
            notErpOpt: true
          };
          request({
            methos: "post",
            baseURL: URL_MODULE.united,
            url: "/orders/" + this.id,
            data: params
          })
            .then(() => {
              Toast.success("操作成功！");
              this.$router.push("salesOrder");
            })
            .catch(err => {
              if(err && err.message) {
                Toast.fail(err.message); 
              }
            });
        })
        .catch(err => {
          if(err && err.message) {
            Toast.fail(err.message); 
          }
        });
    },
    FinancialAudit() {
      this.$router.push("FinancialAudit?orderCode=" + this.orderList.orderCode);
    },
    onload() {
      request({
        baseURL: URL_MODULE.united,
        url: "/orders/erp/" + this.id,
        params: { type: "seller" }
      })
        .then(data => {
          if (data && data.length) {
            this.orderList = data;
            this.orderList.details.forEach(detail => {
              detail.supplyQty = detail.qty;
            });
          }
        })
        .catch(() => {
          this.isError = true;
        });
    },
    timeFormat(time, type) {
      if (!time) {
        return "";
      }
      type = (type ? type : "") + "";
      time = new Date(time);
      var year = time.getFullYear(),
        month = time.getMonth() + 1,
        date = time.getDate(),
        hour = time.getHours(),
        minute = time.getMinutes(),
        second = time.getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (date < 10) {
        date = "0" + date;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      var timeStr = " " + hour + ":" + minute + ":" + second;
      if (type.search("notime") != -1) {
        timeStr = "";
      } else if (type.search("nosecond") != -1) {
        timeStr = " " + hour + ":" + minute;
      }
      var separatorYear = "/";
      var separatorMonth = "/";
      var separatorDay = "";
      if (type.search("zh-cn") != -1) {
        separatorYear = "年";
        separatorMonth = "月";
        separatorDay = "日";
      }
      if (type == 1) {
        separatorYear = ".";
        separatorMonth = ".";
        timeStr = "";
      }
      if (type.search("noyear") != -1) {
        return month + separatorMonth + date + separatorDay + timeStr;
      } else {
        return (
          year +
          separatorYear +
          month +
          separatorMonth +
          date +
          separatorDay +
          timeStr
        );
      }
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.van-col {
  color: #fefc02;
  font-weight: normal;
}
.icon-phone {
  width: 28px;
  height: 28px;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-next {
  width: 8px;
  height: 8px;
  margin-top: -2px;
}
.selected {
  color: #fefc02;
  font-weight: bold;
  position: relative;
  &::after {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    background: url("../img/icon-sanjiaoxing-o.png") no-repeat;
    background-size: 100% 100%;
    background-size: 100% 100%;
    position: absolute;
    left: calc(50% - 3px);
    top: 23px;
  }
}
.white-color {
  color: #ffffff;
  font-weight: bold;
}
.order-content {
  background: #f8f8f8;
  min-height: 100vh;
  overflow: scroll;
}
.content-bac {
  width: 100%;
  height: 140px;
  background-image: url("../img/order-bac.png");
  letter-spacing: -0.38px;
  background-size: 100% 100%;
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
      color: #777b87;
      span {
        color: #1a2231;
      }
    }
    .phone-p {
      float: right;
    }
  }
  .order-address {
    text-align: justify;
    p {
      font-size: 12px;
    }
  }
  .address-icon {
    width: 18px;
    height: 18px;
    background-image: url("../img/address-icon.png");
    background-size: 100% 100%;
    margin-left: 8px;
    margin-top: -40px;
  }
  .edit-address {
    width: 28px;
    height: 28px;
    background-image: url("../img/address-edit.png");
    background-size: 100% 100%;
    margin-right: 8px;
    margin-top: -32px;
    cursor: pointer;
  }
}
.orderItem {
  width: 343px;
  margin-left: 16px;
  margin-top: 16px;
  background: #ffffff;
  border-radius: 8px;
  .order-title {
    border-bottom: 0.5px solid #e8eaef;
    height: 51px;
    margin: 0 8px 0 8px;
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

  .order-item:not(:first-child) {
    margin-top: 20px;
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
    .price {
      color: #ff4655;
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
  p {
    text-align: left;
    margin-left: 8px;
    margin-right: 8px;
    line-height: 27px;
    span {
      font-size: 12px;
    }
    input {
      font-size: 12px;
    }
    .msg_title {
      color: #777b87;
    }
    .msg_title_tip {
      margin-left: 20px;
    }
    .msg_copy {
      color: #21bdc2;
      position: relative;
      left: 124px;
      cursor: pointer;
    }
  }
}
.order-bottom-btn {
  width: 100%;
  height: 49px;
  margin: 16px 16px 0 0;
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
    color: #ffffff;
    background: #23c6cb;
    border-radius: 8px;
    margin-left: 16px;
    margin-right: 16px;
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
    color: #32c6cb;
  }
  .DownPay-buton {
    color: #32c6cb;
    border: 1px solid #32c6cb;
    margin: 16px auto;
    font-size: 14px;
    line-height: 40px;
    width: 104px;
    height: 40px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.4);
  }
}
/deep/.van-nav-bar__right {
  top: 8px;
}
/deep/.van-card:not(:first-child) {
  margin-top: 0;
}
/deep/.van-card {
  background: #ffffff;
}
/deep/.van-card:first-child .van-card__header {
  margin-top: 0;
}
/deep/.van-card__price {
  float: left;
  margin-left: 10px;
}
/deep/.van-card__content:not(:first-child) {
  border-bottom: 1px solid #edeff1;
}
/deep/.van-card__footer {
  font-size: 14px;
  padding-top: 0;
  span {
    margin-left: 20px;
  }
  label {
    font-size: 14px;
    color: #aaacb7;
  }
}
/deep/.van-stepper {
  display: inline-block;
}
/deep/.van-stepper__input {
  background: #ffffff;
  border-top: 0.5px solid #edeff1;
  border-bottom: 0.5px solid #edeff1;
}
/deep/.van-card__num {
  div {
    display: flex;
  }
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