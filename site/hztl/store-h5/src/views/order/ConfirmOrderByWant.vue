<template>
  <div class="confirmOrder">
    <div class="head-brand">
      <span class="backToHome" @click="backToCart()"></span>
    </div>
    <div class="order-content-address">
      <div class="content-bac">
        <p>
          <span></span>订单待提交！
        </p>
      </div>
      <div class="address" @click="toAddressChose()">
        <div class="person-phone">
          <p class="person">
            收货人：
            <span>{{address.receiver}}</span>
          </p>
          <p class="phone-p">{{address.phone}}</p>
        </div>
        <div class="order-address">
          <p
            
          >收货地址：{{address.provinceName}}{{address.cityName}}{{address.areaName}}{{address.address}}</p>
        </div>
        <div class="address-icon"></div>
        <div class="edit-address" @click="toAddressChose()"></div>
      </div>
    </div>
    <div class="content-order">
      <div
        v-if="orderList.length>0"
        class="commodity-card"
        v-for="(item,i) in orderList"
        :key="i"
      >
        <div class="order-title">
          <span class="title-name">{{item.name}}</span>
          <img
            src="../../assets/icon-tele.png"
            class="tab-info-icon"
            @click="tel(item.phone)"
            alt=""
          >
        </div>
        <div v-for="(detl,index) in item.detail" :key="index">
          <div class="image">
            <img src="../../assets/icon-product.png" alt="">
          </div>
          <div class="infomation">
            <p class="info-name">{{detl.partName}}</p>
            <p class="info-OE">
              <span>件号：</span>
              {{detl.partCode}}
            </p>
            <p>
              <span v-if="detl.productionPlace!=''" class="company">{{detl.productionPlace}}</span>
              <span v-if="detl.brand!=''" class="company">{{detl.brand}}</span>
            </p>
            <p class="info-price">¥{{detl.price}}</p>
            <p class="number">x {{detl.qty}}</p>
          </div>
          <div class="clear"></div>
        </div>
        <div class="total-price-info">
          <p class="total-price">
            合计：
            <span>¥{{item.totalPrice.toFixed(2)}}</span>
          </p>
          <p class="total-num">共{{item.totalNum}}件商品</p>
        </div>
        <div class="line"></div>
        <div class="order-detail">
          <p>
            <span>结算信息：</span>
            {{sellerInfo[i].paymentType}}
            <span
              class="shouju"
            >{{sellerInfo[i].invoiceType}}</span>
          </p>
          <p @click="deliverAction(i)">
            <span>提货方式：</span>
            <input
              style="width:5.33rem;"
              v-model="sellerInfo[i].deliveryType"
              type="text"
              placeholder="尚未选择提货方式"
              readonly
            >
            <span class="edit-icon"></span>
          </p>
          <p @click="transAction(i)">
            <span>运输方式：</span>
            <input
              style="width:5.33rem;"
              v-model="sellerInfo[i].transportType"
              type="text"
              placeholder="尚未选择运输方式"
              readonly
            >
            <span class="edit-icon"></span>
          </p>
          <p>
            <span>物流信息：</span>
            <input
              style="width:5.33rem;"
              v-model="sellerInfo[i].logistics"
              type="text"
              placeholder="选填，填写物流信息"
            >
          </p>
          <p>
            <span>买家备注：</span>
            <input
              style="width:5.33rem;"
              v-model="sellerInfo[i].remarks"
              type="text"
              placeholder="选填，填写需要备注的信息"
            >
          </p>
        </div>
      </div>
    </div>
    <div class="order-bottom-button">
      <div class="bottom-info">
        <p class="total-num">共{{totalNum}}件商品</p>
        <p class="total-price">
          合计：
          <span>¥{{totalPrice.toFixed(2)}}</span>
        </p>
      </div>
      <a type="button" class="settle-order" @click="toOrderDetail()">提交订单</a>
    </div>
    <van-action-sheet v-model="transTypeShow" :actions="transType" @select="selectTrans"/>
    <van-action-sheet v-model="deliverTypeShow" :actions="deliveryType" @select="selectDeliver"/>
  </div>
</template>

<script>
import Vue from "vue";
import { ActionSheet, Toast } from "vant";
Vue.use(ActionSheet).use(Toast);
import request, { URL_MODULE } from "@/request";
export default {
  name: "confirmOrder",
  data() {
    return {
      totalNum: 0,
      totalPrice: 0,
      orderList: [],
      transTypeShow: false,
      deliverTypeShow: false,
      deliveryType: [],
      transType: [],
      address: {},
      addressId: "",
      wantCode: "",
      details: [],
      sellerInfo: [],
      num: 0
    };
  },
  methods: {
    tel(phone) {
      window.location.href = "tel:" + phone;
    },
    backToCart() {
      this.$router.push("/Inquiry");
    },
    toAddressChose() {
      this.$router.push("/address?chose");
    },
    toOrderDetail() {
      if (!this.addressId) {
        Toast.fail("请选择地址！");
        return false;
      }
      let postData = {
        addressId: this.addressId,
        wantCode: this.wantCode,
        sellerInfo: this.sellerInfo
      };
      request({
        method: "post",
        baseURL: URL_MODULE.united,
        url: "/wants-v2/wants/order",
        data: postData
      })
        .then(() => {
          this.$router.push("/orderList");
        })
        .catch(err => {
          if(err && err.message) {
            Toast.fail(err.message);
          }
        });
    },
    selectTrans(item) {
      this.sellerInfo[this.num].transportType = item.name;
      this.transTypeShow = false;
    },
    selectDeliver(item) {
      this.sellerInfo[this.num].deliveryType = item.name;
      this.deliverTypeShow = false;
    },
    deliverAction(index) {
      this.deliverTypeShow = true;
      this.num = index;
    },
    transAction(index) {
      this.transTypeShow = true;
      this.num = index;
    },
    getAddress() {
      //请求地址列表
      request({
        url: "/addresses"
      })
        .then(data => {
          this.addressList = data || [];
          if(this.addressList&&this.addressList.length>0){
            //判断默认地址
            for (let item of this.addressList) {
              if (
                window.location.href.indexOf("?") != -1 &&
                window.location.href.split("?")[1] == item.id
              ) {
                this.address = item;
                this.addressId = item.id;
              } else if (item.isDefault) {
                this.address = item;
                this.addressId = item.id;
              }
            }
          }else{
            Toast.fail('请新建收货地址！');
          }
        })
        .catch(err => {
          if(err && err.message) {
            Toast.fail(err.message);
          }
        });
    },
    getGoodList() {
      request({
        method: "post",
        baseURL: URL_MODULE.united,
        url: "/wants-v2/wants/order-params",
        data: {
          wantCode: this.wantCode,
          details: this.details
        }
      })
        .then(res => {
          this.orderList = res || [];
          //计算总价
          this.orderList.forEach(company => {
            company.totalPrice = 0;
            company.totalNum = 0;
            let partInfo = [];
            company.detail.forEach(detail => {
              if (detail.qty && detail.price) {
                company.totalPrice += detail.qty * Number(detail.price);
                company.totalNum += detail.qty;
              }
              partInfo.push({
                receiptDetailId: detail.receiptDetailId,
                qty: detail.qty
              });
            });
            let paymentType = company.paymentType.join(",");
            let invoiceType = company.invoiceType.join(",");
            this.sellerInfo.push({
              receiptId: company.receiptId,
              paymentType: paymentType,
              invoiceType: invoiceType,
              deliveryType: "",
              transportType: "",
              remarks: "",
              logistics: "",
              partInfo: partInfo
            });
            this.totalNum += company.totalNum;
            this.totalPrice += company.totalPrice;
          });
          //拼接提货方式及运输方式
          if (
            this.orderList[0] &&
            this.orderList[0].transportType &&
            this.orderList[0].transportType.length > 0
          ) {
            for (let item of this.orderList[0].transportType) {
              this.transType.push({ name: item });
            }
          }
          if (
            this.orderList[0] &&
            this.orderList[0].deliveryType &&
            this.orderList[0].deliveryType.length > 0
          ) {
            for (let item of this.orderList[0].deliveryType) {
              this.deliveryType.push({ name: item });
            }
          }
        })
        .catch(err => {
          if(err && err.message) {
            Toast.fail(err.message);
          }
        });
    },
    scrollToTop() {
      scrollTo(0, 0);
    }
  },
  created: function() {
    //获取URL中的ids
    this.wantCode = sessionStorage.getItem("wantCode");
    this.details = JSON.parse(sessionStorage.getItem("details"));
    //根据ids获取初始化获取商品列表
    this.getGoodList();
  },
  mounted: function() {
    //初始获取默认地址
    this.getAddress(true);
  }
};
</script>
<style lang="less" scoped>
.confirmOrder {
  background: #f8f8f8;
  margin-bottom: 49px;
  min-height: 100%;
  overflow: auto;
  .clear{
    clear:both;
  }
  .head-brand {
    background: #ffffff;
    height: 44px;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
    .backToHome {
      float: left;
      width: 8px;
      height: 14px;
      background-image: url("../../assets/back-icon.png");
      background-size: 100% 100%;
      margin: 15px 0 0 16px;
    }
  }
  .order-content-address {
    width: 100%;
    height: 164px;
    margin: 44px 0 0 0;
    position: relative;
    .content-bac {
      width: 100%;
      height: 96px;
      background-image: url("../../assets/order-bac.png");
      background-size: 100% 100%;
      overflow: hidden;
      p {
        font-size: 17px;
        color: #ffffff;
        letter-spacing: -0.41px;
        text-align: left;
        margin: 12px 0 0 16px;
        line-height: 40px;
        span {
          float: left;
          width: 40px;
          height: 40px;
          background-image: url("../../assets/confirm-order-icon.png");
          background-size: 100% 100%;
        }
      }
    }
    .address {
      position: absolute;
      width: 343px;
      height: 102px;
      left: 16px;
      top: 62px;
      background: #ffffff;
      border-radius: 8px;
      margin: 0;
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
        letter-spacing: -0.38px;
        padding-top: 0;
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
        height: 34px;
        line-height: 34px;
        p {
          font-size: 12px;
          display: inline-block;
          line-height: 15px;
          vertical-align: middle;
        }
      }
      .address-icon {
        width: 18px;
        height: 18px;
        position: absolute;
        background-image: url("../../assets/address-icon.png");
        background-size: 100% 100%;
        left: 8px;
        top: 60px;
        margin: 0;
      }
      .edit-address {
        width: 28px;
        height: 28px;
        position: absolute;
        background-image: url("../../assets/address-edit.png");
        background-size: 100% 100%;
        right: 8px;
        top: 56px;
        margin: 0;
        cursor: pointer;
      }
    }
  }
  .content-order {
    margin: 16px auto 0;
    width: 343px;
    padding-bottom: 42px;
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
    .commodity-card {
      background: #ffffff;
      margin-top: 15px;
    }
    .commodity-card:last-child {
      .infomation {
        border: 0;
      }
    }
    .commodity-card {
      overflow: hidden;
      .image {
        float: left;
        width: 76px;
        height: 90px;
        margin: 16px 0 0 8px;
        border: 1px solid #e8eaef;
        box-sizing: border-box;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 44px;
          height: 44px;
        }
      }
      .infomation {
        float: left;
        width: 250px;
        text-align: left;
        margin: 16px 8px 0 0;
        border-bottom: 1px solid #edeff1;
        position: relative;
        padding-bottom: 15px;
        p {
          margin: 0 0 4px 8px;
          letter-spacing: -0.29px;
          font-size: 14px;
          color: #1a2231;
          span {
            color: #777b87;
            font-size: 12px;
          }
        }
        .info-name {
          font-size: 14px;
          color: #1a2231;
          letter-spacing: -0.34px;
        }
        .info-price {
          color: #ff4655;
        }
        .number {
          font-size: 12px;
          color: #777b87;
          letter-spacing: -0.33px;
          text-align: right;
          position: absolute;
          right: 8px;
          top: 70px;
        }
        .company {
          padding: 0 5px;
          border: 1px solid #777b87;
          font-size: 10px;
          color: #21bdc2;
          letter-spacing: -0.24px;
          text-align: center;
          border: 1px solid rgba(33, 189, 194, 0.3);
          border-radius: 4px;
          margin-right: 8px;
        }
      }
    }
  }
  .total-price-info {
    width: 343px;
    margin: auto;
    background: #ffffff;
    overflow: hidden;
    padding-bottom: 16px;
    p {
      font-size: 14px;
      margin: 0;
      text-align: right;
      float: right;
      color: #777b87;
      span {
        font-size: 14px;
        color: #ff4655;
        letter-spacing: -0.38px;
        text-align: right;
        line-height: 14px;
        padding-right: 8px;
      }
    }
    .total-num {
      color: #1a2231;
      margin-right: 20.1px;
    }
  }
  .line {
    width: 327px;
    height: 1px;
    margin: auto;
    background-image: url("../../assets/order-line.png");
    background-size: 100% 100%;
  }
  .order-detail {
    overflow: hidden;
    width: 343px;
    margin: auto;
    background: #ffffff;
    padding-bottom: 17px;
    p {
      cursor: pointer;
      position: relative;
      input {
        border: 0;
        padding: 0;
        display: inline-block;
        height: 19px;
      }
      .shouju {
        color: #1a2231;
        padding-left: 20px;
      }
      span {
        color: #777b87;
      }
      font-size: 12px;
      letter-spacing: -0.29px;
      color: #1a2231;
      margin: 10px 0 0 8px;
      text-align: left;
      .edit-icon {
        width: 28px;
        height: 28px;
        position: absolute;
        right: 8px;
        top: -3px;
        background-image: url("../../assets/address-edit.png");
        background-size: 100% 100%;
      }
    }
  }
  .order-bottom-button {
    height: 49px;
    position: fixed;
    width: 100%;
    bottom: -1px;
    background-image: url("../../assets/tabbar_bottom.png");
    background-size: 100% 100%;
    .bottom-info {
      float: left;
      width: 50%;
      text-align: left;
      margin: 5px 0 0 16px;
      p {
        margin: 0;
      }
      .total-num {
        font-size: 12px;
        color: #777b87;
        letter-spacing: -0.29px;
      }
      .total-price {
        font-size: 14px;
        color: #777b87;
        letter-spacing: -0.34px;
        span {
          font-size: 14px;
          color: #ff4655;
          letter-spacing: -0.38px;
          line-height: 14px;
        }
      }
    }
    .settle-order {
      float: right;
      margin: 5px 16px 0 0;
      width: 104px;
      height: 40px;
      background: #32c6cb;
      border-radius: 8px;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: -0.34px;
      text-align: center;
      line-height: 40px;
    }
  }
}
input::placeholder {
  color: #ccced4;
}
</style>
