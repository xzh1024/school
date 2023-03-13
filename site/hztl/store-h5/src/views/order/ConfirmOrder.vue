<template>
    <div class="confirmOrder">
        <div class="head-brand">
            <span class="backToHome" @click="back()"></span>
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
                <div class="edit-address top_1" @click="toAddressChose()"></div>
                <div class="edit-address top_2" @click="toAddressChose()"></div>
            </div>
        </div>
        <div
            class="seller-cart-group"
            v-for="(sellerCart, selectCartIndex) in sellerCarts"
            :key="selectCartIndex"
        >
            <div class="order-title">
                <span class="title-name">{{sellerCart.sellerName}}</span>
                <i class="iconfont icon-home_phone tab-info-icon" @click="tel(sellerCart.sellerPhone)"></i>
            </div>
            <div class="check-repair" v-if="sellerCart.hasRepairFactory">
                <span class="text">预约修理厂</span>
                <div
                    class="edit-address"
                    style="top:0.0533rem"
                    @click="checkRepair(selectCartIndex,sellerCart)"
                ></div>
            </div>
            <div class="content-order">
              <template v-if="sellerCart.carts">
                <div class="card-item" v-for="(sku, index) in sellerCart.carts" :key="index">
                  <SkuCard type="order" :sku="sku">
                    <div slot="plus" class="clearfix m-t-4 font-size-12">
                      <div class="fl color-danger">
                        <span>¥</span>
                        <span class="font-size-14">{{ sku.rtPrice }}</span>
                        <span v-if="sku.errorToOrder" style="margin-left: 8px;">
                          {{sku.errorToOrder}}
                        </span>
                      </div>
                      <div class="fr color-bye">
                        x{{ sku.qty }}
                      </div>
                    </div>
                  </SkuCard>
                </div>
              </template>
            </div>
            <div class="total-price-info">
                <p class="total-price">
                    合计：
                    <span>¥{{sellerCart | selectCartTotalFee}}</span>
                </p>
                <p class="total-num">{{sellerCart | selectCartTotalNum}}</p>
            </div>
            <div class="line"></div>
            <div class="order-detail">
                <p>
                    <span>结算方式：</span>
                    <span>
                        <span
                            v-for="(paymentType, index) in sellerCart.paymentType"
                            :key="index"
                            class="payment-type-span"
                            :class="{'checkedPayment': sellerCart.paymentTypeChecked == paymentType}"
                            @click="sellerCart.paymentTypeChecked = paymentType"
                        >{{paymentType}}</span>
                    </span>
                </p>
                <!-- <p @click="loadNameChecker(selectCartIndex, 'invoiceType')"> -->
                <p >
                    <span>发票类型：</span>
                    <input
                        style="width:5.33rem;"
                        v-model="sellerCart.invoiceTypeChecked"
                        type="text"
                        placeholder="尚未选择发票类型"
                        readonly
                    >
                    <!-- <span class="edit-icon"></span> -->
                </p>
                <p @click="loadNameChecker(selectCartIndex, 'deliveryType')">
                    <span>提货方式：</span>
                    <input
                        style="width:5.33rem;"
                        v-model="sellerCart.deliveryTypeChecked"
                        type="text"
                        placeholder="尚未选择提货方式"
                        readonly
                    >
                    <span class="edit-icon"></span>
                </p>
                <p @click="loadNameChecker(selectCartIndex, 'transportType')">
                    <span>运输方式：</span>
                    <input
                        style="width:5.33rem;"
                        v-model="sellerCart.transportTypeChecked"
                        type="text"
                        placeholder="尚未选择运输方式"
                        readonly
                    >
                    <span class="edit-icon"></span>
                </p>
                <p>
                    <span>买家备注：</span>
                    <input
                        style="width:5.33rem;"
                        v-model="sellerCart.remarks"
                        type="text"
                        placeholder="选填，填写需要备注的信息"
                    >
                </p>
            </div>
            <div class="order-bottom-button">
                <div class="bottom-info">
                    <p class="total-num">{{sellerCarts | selectsCartTotalNum}}</p>
                    <p class="total-price">
                        合计：
                        <span>¥{{sellerCarts | selectsCartTotalFee}}</span>
                    </p>
                </div>
                <a type="button" class="settle-order" @click="createOrderData()">提交订单</a>
            </div>
        </div>
        <van-overlay :show="show">
            <div class="wrapper" @click.stop>
                <div class="block">
                    <van-loading size="0.64rem" vertical>加载中...</van-loading>
                </div>
            </div>
        </van-overlay>
        <RepairPopup v-model="postRepairObj" @chosedRepair="chosedRepairList"></RepairPopup>
        <van-action-sheet
            v-model="nameCheckerShow"
            :actions="nameCheckerData"
            @select="nameCheck"
            @close="clearNameChecker"
        />
    </div>
</template>

<script>
import Vue from "vue";
import request, { URL_MODULE } from "@/request";
import SkuCard from "../../../store-common/component/Sku/Card";
import { ActionSheet, Toast, Loading, Overlay, Checkbox, Dialog } from "vant";
import RepairPopup from "../../../store-common/component/RepairPopup/RepairPopup";
Vue.use(ActionSheet)
  .use(Toast)
  .use(Loading)
  .use(Overlay)
  .use(Checkbox)
  .use(Dialog);
export default {
  name: "confirmOrder",
  components: { RepairPopup, SkuCard },
  data() {
    return {
      show: false,
      address: {},
      addressId: "",
      nameCheckerSellerCartIndex: -1,
      nameCheckerData: [],
      nameCheckerType: "",
      nameCheckerShow: false,
      postRepairObj: {
        show: false,
        concatPostRepair: "", //用于拼接传入组件
        fromConfirm: true
      },
      sellers: {},
      ids: [],
      sellerCarts: [],
      searchTime: 0,
      chosedRepairs: [],
      activeIcon: require("../../../store-common/img/icon.jpg"),
      inactiveIcon: require("../../../store-common/img/un-checked.png"),
      sellersToResult: {},
      repairSellerIndex: 0
    };
  },
  created: function() {
    // 获取storage中的ids,sellers
    let _this = this;
    let param = JSON.parse(localStorage.getItem("confirmOrderParam"));
    _this.ids = param.ids;
    _this.sellers = param.sellers;
    //根据ids,sellers获取初始化获取商品列表
    _this.confirmOrderData();
  },
  mounted: function() {
    //初始获取默认地址
    this.getDefaultAddress(true);
  },
  methods: {
    chosedRepairList(value) {
      this.chosedRepairs[this.repairSellerIndex] = value;
      this.postRepairObj = {
        show: false,
        concatPostRepair: "", //用于拼接传入组件
        fromConfirm: true
      };
    },
    confirmOrder() {
      let _this = this;
      request({
        method: "post",
        baseURL: URL_MODULE.united,
        url: "/carts/app",
        params: {
          ids: _this.ids ? _this.ids.join(",") : "",
          group: "seller",
          dict: true
        },
        data: this.sellersToResult
      })
      .then(res => {
        if (res && res.length > 0) {
          res.forEach(sellerCart => {
            _this.chosedRepairs.push({});
            if (
              sellerCart.paymentType &&
              sellerCart.paymentType.length > 0
            ) {
              sellerCart.paymentType = _this.paymentTypeExchange(
                sellerCart.paymentType
              );
              sellerCart.paymentTypeChecked = sellerCart.paymentType[0];
            }
            if (
              sellerCart.invoiceType &&
              sellerCart.invoiceType.length > 0
            ) {
              sellerCart.invoiceTypeChecked = sellerCart.invoiceType[0];
              sellerCart.invoiceTypeShow = false;
            }
            if (
              sellerCart.transportType &&
              sellerCart.transportType.length > 0
            ) {
              sellerCart.transportTypeChecked = sellerCart.transportType[0];
              sellerCart.transportTypeShow = false;
            }
            if (
              sellerCart.deliveryType &&
              sellerCart.deliveryType.length > 0
            ) {
              sellerCart.deliveryTypeChecked = sellerCart.deliveryType[0];
              sellerCart.deliveryTypeShow = false;
            }
            //拼接判断当前cart是否必须安装，是的话默认选中且不可更改
            if (sellerCart && sellerCart.carts && sellerCart.carts.length) {
              for (let cart of sellerCart.carts) {
                if (cart.mustInstallService) {
                  cart.checkedInstall = true;
                } else {
                  cart.checkedInstall = false;
                }
              }
            }
            sellerCart.remarks = "";
            _this.sellerCarts.push(sellerCart);
          });
        }
      });
    },
    confirmOrderData() {
      let _this = this;
      let result = {};
      let sellersToResult = [];
      for (let sellerId in _this.sellers) {
        sellersToResult.push({
          sellerId: parseInt(sellerId),
          skus: _this.sellers[sellerId].skus
        });
      }
      this.sellersToResult.sellers = sellersToResult;
      this.confirmOrder();
    },
    createOrder(postSellers) {
      let _this = this;
      if (!_this.addressId) {
        Toast("请选择地址！");
        return false;
      }
      if (postSellers) {
        let postData = {
          addressId: _this.addressId,
          offiAccount: true,
          sellers: postSellers
        };
        request({
          method: "post",
          baseURL: URL_MODULE.united,
          url: "/orders",
          data: postData
        })
        .then(res => {
          if (res && res.length > 1) {
            //拆单了的跳转到orderList
            this.$router.push("/orderList");
          } else {
            let resp = res[0];
            if (resp.code == "ok") {
              _this.show = true;
              _this.getOrder(resp.id);
            } else {
              let carts = _this.sellerCarts.carts || [];
              if (resp.details && resp.details.length) {
                resp.details.forEach((detail, index1) => {
                  carts.forEach((cart, index2) => {
                    if (
                      detail.sellerId == cart.companyId &&
                      detail.skuId == cart.skuId
                    ) {
                      carts[index2]["errorToOrder"] = resp.message;
                    }
                  });
                });
              }
              _this.sellerCarts.carts = carts;
              _this.$forceUpdate();
              Toast.fail(resp.message);
            }
          }
        }).catch(err => {
          if(err && err.message) {
            Toast.fail(err.message);
          }
        });
      }
    },
    createOrderData() {
      let that = this;
      let hasDeliverToRepair = false;
      let installNoRepairB = false;
      let sellersToResult = [];
      this.sellerCarts.forEach((sellerCart, sellerCartIndex) => {
        let carts = [];
        let skus = [];
        sellerCart.carts.forEach((cart, index) => {
          if (
            that.chosedRepairs[sellerCartIndex] &&
            that.chosedRepairs[sellerCartIndex].details &&
            that.chosedRepairs[sellerCartIndex].details.length
          ) {
            //若有数据，传入修理厂数据进入传参
            that.chosedRepairs[sellerCartIndex].details.forEach(
              (detail, detailIndex) => {
                //先判断是否必须安装，且必须安装下是否预约了修理厂
                if (
                  cart.checkedInstall &&
                  !detail.appointRepairId &&
                  index == detailIndex
                ) {
                  installNoRepairB = true;
                  that.installNoRepair(sellerCartIndex, sellerCart);
                }
                //判断已预约安装但是选择了发货到修理厂
                if (detail.appointRepairId && detail.deliverToRepair) {
                  hasDeliverToRepair = true;
                }
                if (cart.id && cart.id > 0 && index == detailIndex) {
                  carts.push({
                    id: cart.id,
                    checkedInstall: cart.checkedInstall,
                    appointRepairId: detail.appointRepairId,
                    appointTime: detail.appointTime,
                    deliverToRepair: detail.deliverToRepair
                  });
                } else if (!(cart.id && cart.id > 0) && index == detailIndex) {
                  skus.push({
                    id: cart.skuId,
                    qty: cart.qty,
                    promotionCombine: cart.type == 2,
                    checkedInstall: cart.checkedInstall,
                    appointRepairId: detail.appointRepairId,
                    appointTime: detail.appointTime,
                    deliverToRepair: detail.deliverToRepair
                  });
                }
              }
            );
          } else if (
            cart.checkedInstall &&
            !(
              that.chosedRepairs[sellerCartIndex] &&
              that.chosedRepairs[sellerCartIndex].details &&
              that.chosedRepairs[sellerCartIndex].details.length
            )
          ) {
            installNoRepairB = true;
            that.installNoRepair(sellerCartIndex, sellerCart);
          } else {
            if (cart.id && cart.id > 0) {
              carts.push({
                id: cart.id,
                checkedInstall: cart.checkedInstall
              });
            } else {
              skus.push({
                id: cart.skuId,
                qty: cart.qty,
                promotionCombine: cart.type == 2,
                checkedInstall: cart.checkedInstall
              });
            }
          }
        });
        sellersToResult.push({
          carts: carts,
          skus: skus,
          sellerCompanyId: sellerCart.sellerId,
          paymentType: sellerCart.paymentTypeChecked,
          invoiceType: sellerCart.invoiceTypeChecked,
          deliveryType: sellerCart.deliveryTypeChecked,
          transportType: sellerCart.transportTypeChecked,
          remarks: sellerCart.remarks
        });
      });
      if (installNoRepairB) {
        return false;
      }
      //有预约修理厂且发货到修理厂
      if (hasDeliverToRepair) {
        Dialog.confirm({
          title: "温馨提示",
          message:
            "您已预约修理厂，安装前可先联系修理厂确认好时间，若您未进行安装，平台将不会退还您的安装服务费！",
          confirmButtonText: "确认提交订单"
        })
          .then(() => {
            that.createOrder(sellersToResult);
          })
          .catch(() => {});
      } else {
        that.createOrder(sellersToResult);
      }
    },
    installNoRepair(index, sellerCart) {
      let that = this;
      Dialog.confirm({
        title: "温馨提示",
        message: "您已选购安装服务，请预约修理厂！",
        confirmButtonText: "去预约修理厂",
        showCancelButton: false
      }).then(() => {
        that.checkRepair(index, sellerCart);
      });
      return false;
    },
    getOrder(id) {
      request({
        baseURL: URL_MODULE.united,
        url: "/orders/app/" + id
      }).then(data => {
        //判断订单当前状态是否已确认，确认直接跳转详情，未确认隔5秒再次请求
        if (this.searchTime >= 3) {
          this.show = false;
          this.$router.push(`/orderDetail?${id}`);
        } else if (data.status != 1) {
          this.show = false;
          this.$router.push(`/orderDetail?${id}`);
        } else {
          setTimeout(() => {
            this.getOrder(id);
          }, 5000);
          this.searchTime += 1;
        }
      }).catch(err => {
        if(err && err.message) {
          Toast(err.message);
        }
      });
    },
    getDefaultAddress() {
      //请求地址列表
      request({
        url: "/addresses"
      }).then(data => {
        this.addressList = data || [];
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
      });
    },
    paymentTypeExchange(paymentTypes) {
      let paymentTypesToResult = [];
      paymentTypes.forEach(typ => {
        paymentTypesToResult.push(typ);
        if (typ == "现付") {
          paymentTypesToResult.push("物流代收");
        }
      });
      return paymentTypesToResult;
    },
    back() {
      this.historyBack(-1);
    },
    toAddressChose() {
      this.$router.push("/address?chose");
    },
    checkRepair(index, sellerCart) {
      let postIds = [];
      let postSellers = {};
      this.repairSellerIndex = index;
      //判断是购物车过来还是直接结算过来
      if (
        index >= 0 &&
        this.ids.length &&
        sellerCart &&
        sellerCart.carts &&
        sellerCart.carts.length
      ) {
        for (let cart of sellerCart.carts) {
          postIds.push(cart.id);
        }
      } else if (
        index >= 0 &&
        this.sellersToResult &&
        this.sellersToResult.sellers &&
        this.sellersToResult.sellers.length
      ) {
        let objKey = this.sellersToResult.sellers[index].sellerId;
        postSellers[objKey] = this.sellers[objKey];
      } else {
        postIds = this.ids;
        postSellers = this.sellers;
      }
      this.postRepairObj = {
        show: true,
        concatPostRepair: postIds.join(","),
        fromConfirm: true,
        sellers: postSellers,
        showData: index >= 0 ? this.chosedRepairs[index] : {}
      };
    },
    loadNameChecker(sellerCartIndex, checkerType) {
      this.nameCheckerSellerCartIndex = sellerCartIndex;
      this.sellerCarts[sellerCartIndex][checkerType].forEach(typ => {
        this.nameCheckerData.push({ name: typ });
      });
      this.nameCheckerType = checkerType;
      this.nameCheckerShow = true;
    },
    clearNameChecker() {
      this.nameCheckerSellerCartIndex = -1;
      this.nameCheckerData = [];
      this.nameCheckerType = "";
    },
    nameCheck(item) {
      this.sellerCarts[this.nameCheckerSellerCartIndex][
        this.nameCheckerType + "Checked"
      ] = item.name;
      this.nameCheckerShow = false;
    },
    tel(phone) {
      window.location.href = "tel:" + phone;
    }
  },
  filters: {
    skuImage(image) {
      let result = require("../../assets/icon-product-ls.png");
      if (location.hostname == "jndm.hztl3.com") {
        result = require("../../assets/icon-product.png");
      }
      if (image) {
        result = image + "&imageView2/1/w/100/h/100";
      }
      return result;
    },
    selectCartTotalFee(sellerCart) {
      let totalFee = 0.0;
      sellerCart.carts.forEach(cart => {
        totalFee += parseFloat(cart.rtPrice) * parseInt(cart.qty);
        if (cart.checkedInstall) {
          totalFee += parseFloat(cart.installCost) * parseInt(cart.qty);
        }
      });
      return totalFee.toFixed(2);
    },
    selectCartTotalNum(sellerCart) {
      const skuIds = new Set();
      let totalNum = 0;
      sellerCart.carts.forEach(cart => {
        skuIds.add(cart.skuId);
        totalNum += parseInt(cart.qty);
      });
      return `共${skuIds.size}种，共${totalNum}件`;
    },
    selectsCartTotalFee(sellerCarts) {
      let totalFee = 0.0;
      sellerCarts.forEach(sellerCart => {
        sellerCart.carts.forEach(cart => {
          totalFee += parseFloat(cart.rtPrice) * parseInt(cart.qty);
          if (cart.checkedInstall) {
            totalFee += parseFloat(cart.installCost) * parseInt(cart.qty);
          }
        });
      });
      return totalFee.toFixed(2);
    },
    selectsCartTotalNum(sellerCarts) {
      const skuIds = new Set();
      let totalNum = 0;
      sellerCarts.forEach(sellerCart => {
        sellerCart.carts.forEach(cart => {
          skuIds.add(cart.skuId);
          totalNum += parseInt(cart.qty);
        });
      });
      return `共${skuIds.size}种，共${totalNum}件`;
    }
  }
};
</script>
<style lang="less" scoped>
.confirmOrder {
  background: #f8f8f8;
  padding-bottom: 49px;
  min-height: 100%;
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
      .top_1{
        top:-4px;
      }
      .top_2{
        top:39px;
      }
    }
  }
  .order-title {
    border-bottom: 0.5px solid #e8eaef;
    height: 51px;
    margin: 8px auto 0;
    width: 343px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title-name {
      font-size: 14px;
      color: #1a2231;
      font-weight: bold;
    }
    .tab-info-icon {
      margin-left: auto;
      font-size: 20px;
      color: #FF6E4C;
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
  .content-order {
    margin: 8px auto 0;
    width: 343px;
    background: #ffffff;
    // border-radius: 8px;
    // overflow: hidden;
    // .card-item {
    //   border-top: 1px solid #E6E6E6;
    //   &:first-child {
    //     border-top: none;
    //   }
    // }
    .commodity-card:first-child {
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
        width: 90px;
        height: 90px;
        margin: 16px 0 0 8px;
        border: 1px solid #f2f3f5;
        box-sizing: border-box;
        border-radius: 4px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .infomation {
        float: left;
        width: 236px;
        text-align: left;
        margin: 16px 8px 0 0;
        border-bottom: 1px solid #edeff1;
        position: relative;
        padding-bottom: 15px;
        p {
          margin: 0 0 4px 8px;
          letter-spacing: -0.29px;
          font-size: 14px;
          color: #171c24;
          span {
            color: #aaacb7;
            font-size: 12px;
          }
        }
        .info-name {
          font-size: 14px;
          color: #171c24;
          letter-spacing: -0.34px;
        }
        .info-price {
          color: #ff424d;
        }
        .number {
          font-size: 12px;
          color: #aaacb7;
          letter-spacing: -0.33px;
          text-align: right;
          position: absolute;
          right: 8px;
          top: 70px;
        }
        .tag-group {
          height: 20px;
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
      }
    }
  }
  .total-price-info {
    width: 343px;
    margin: auto;
    background: #ffffff;
    overflow: hidden;
    // padding-bottom: 16px;
    padding: 8px 0;
    p {
      font-size: 14px;
      margin: 0;
      text-align: right;
      float: right;
      color: #aaacb7;
      span {
        font-size: 14px;
        color: #ff424d;
        letter-spacing: -0.38px;
        text-align: right;
        line-height: 14px;
        padding-right: 8px;
      }
    }
    .total-num {
      color: #171c24;
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
      input::placeholder {
        font-size: 12px;
      }
      .shouju {
        color: #171c24;
        padding-left: 20px;
      }
      span {
        color: #777b87;
      }
      font-size: 12px;
      letter-spacing: -0.29px;
      color: #171c24;
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
    .payment-type-span {
      display: inline-block;
      border-radius: 3px;
      background: #ededed;
      padding: 2px 15px;
      margin-right: 7px;
      color: #5b5b5b;
    }
    .checkedPayment {
      background: #e3f7ff;
      color: #01a7e9;
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
        color: #aaacb7;
        letter-spacing: -0.29px;
      }
      .total-price {
        font-size: 14px;
        color: #777b87;
        letter-spacing: -0.34px;
        span {
          font-size: 14px;
          color: #ff424d;
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
      background: #FF6E4C;
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
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 80px;
  height: 80px;
  background-color: #fff;
}
/deep/ .van-loading {
  margin-top: 15px;
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
.img-icon {
  height: 13px;
}
</style>
