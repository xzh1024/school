<template>
  <div class="product-address">
    <div class="head-brand">
      <span class="backToHome" @click="backHome()"></span>
      <span class="word">收货地址</span>
      <a class="add-address" @click="toEditAddress()">添加地址</a>
    </div>
    <div class="content">
      <van-radio-group
        v-model="radio"
        class="address-card"
        v-for="(item, index) in addressList"
        :key="index"
      >
        <div class="card-info" @click="choseAddress(item)">
          <p class="person-name">
            收货人：<span>{{ item.receiver }}</span>
          </p>
          <p class="person-phone">{{ item.phone }}</p>
          <p class="clearfix">
            收货地址：{{ item.provinceName }}{{ item.cityName
            }}{{ item.areaName }}{{ item.address }}
          </p>
        </div>
        <div class="card-line"></div>
        <div class="card-edit">
          <van-radio
            @click="changeDefaultAddress(item.id)"
            :name="item.id"
            class="default-address-radio"
            :class="{ checked: item.id == radio }"
            icon-size="0.3733rem"
            checked-color="#00A8EA"
          >
            默认地址
            <!-- <img
              slot="icon"
              slot-scope="props"
              :src="props.checked ? activeIcon : inactiveIcon"
            > -->
          </van-radio>
          <p class="edit" @click="toEditAddress(item.id)">
            <span class="icon"></span>编辑
          </p>
          <p class="delete" @click="deleteAddress(item.id)">
            <span class="icon"></span>删除
          </p>
        </div>
      </van-radio-group>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import request, { URL_MODULE } from "@/request";
import { RadioGroup, Radio, Dialog, Toast } from "vant";
Vue.use(RadioGroup)
  .use(Radio)
  .use(Toast);

export default {
  name: "address",
  data() {
    return {
      addressList: [],
      radio: 0,
      propRadio: 0, //用来判断默认地址时候改变点击
      // activeIcon: "",
      // inactiveIcon: "",
      fromOrder: false,
      Orderchose: false //是否修改订单地址
    };
  },
  methods: {
    toEditAddress(id) {
      if (id) {
        this.$router.push(`/upsertAddress?${id}`);
      } else {
        this.$router.push("/upsertAddress");
      }
    },
    deleteAddress(id) {
      Dialog.confirm({
        title: "提示",
        message: "确定要删除该地址吗？",
        confirmButtonText: "确定"
      })
        .then(() => {
          // on confirm
          request({
            method: "delete",
            url: "/addresses/" + id
          })
            .then(() => {
              this.getAddressList();
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
    backHome() {
      if (this.fromOrder) {
        this.historyBack(-1);
      } else {
        this.$router.push("/mine");
      }
    },
    changeDefaultAddress(id) {
      //更换默认地址
      if (id == this.propRadio) {
        return;
      } else {
        this.propRadio = id;
        request({
          method: "post",
          url: "/addresses/" + id + "/set-default"
        }).then(() => {
          this.getAddressList();
        });
      }
    },
    getAddressList() {
      //请求地址列表
      request({
        url: "/addresses"
      }).then(data => {
        this.addressList = data || [];
        //判断默认地址
        for (let item of this.addressList) {
          if (item.isDefault) {
            this.radio = item.id;
            this.propRadio = item.id;
          }
        }
      });
    },
    GetQueryString: function(name) {
      //获取URL传参
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return encodeURI(r[2]);
      return null; //返回参数值
    },
    choseAddress(item) {
      //选中之后返回订单页面并且把值给订单页面
      //判断非确认订单页面过来的，不做任何操作
      if (this.fromOrder) {
        this.$router.push("confirmOrder?" + item.id);
      } else if (this.Orderchose) {
        let status = this.GetQueryString("status");
        let id = this.GetQueryString("id");
        let params = {
          status: Number(status),
          addressId: item.id // 订单状态，必需
        };
        let _this = this;
        require({
          method: "post",
          url: URL_MODULE.accounts + "/orders/" + id,
          data: params
        })
          .then(() => {
            Toast.success("操作成功！");
            _this.$router.push(`/orderDetail?${id}`);
          })
          .catch(err => {
            if (err && err.message) {
              Toast.fail(err.message);
            }
            _this.$router.push("error");
          });
      }
    }
  },
  mounted: function() {
    this.getAddressList();
    if (window.location.href.indexOf("chose") != -1) {
      this.fromOrder = true;
    } else if (this.GetQueryString("Order")) {
      this.Orderchose = true;
    }
  }
};
</script>
<style lang="less" scoped>
.product-address {
  overflow: hidden;
  background: #f8f8f8;
  min-height: 100%;
  .content {
    margin: 44px 0 0 0;
    border-top-left-radius: 13px;
    border-top-right-radius: 13px;
    overflow: hidden;
    .address-card {
      height: 155px;
      background: #ffffff;
      margin: 16px 16px 0;
      border-radius: 6px;
      .card-info {
        width: 100%;
        height: 103px;
        p {
          margin: 0;
        }
        .person-name {
          font-size: 14px;
          color: #aaacb7;
          letter-spacing: -0.38px;
          float: left;
          margin: 16px 0 0 8px;

          span {
            color: #171c24;
          }
        }
        .person-phone {
          font-size: 14px;
          color: #171c24;
          letter-spacing: -0.38px;
          text-align: right;
          float: right;
          margin: 16px 8px 0 0;
        }
        .clearfix {
          clear: both;
          font-size: 12px;
          color: #171c24;
          text-align: left;
          margin: 0 8px;
          padding-top: 16px;
          word-break: break-all;
        }
      }
      .card-line {
        width: 100%;
        height: 1px;
        background: #edeff1;
        box-shadow: 0 0 0 0 #edeff1;
      }
      .card-edit {
        width: 100%;
        height: 51px;
        .default-address-radio {
          float: left;
          font-size: 12px;
          letter-spacing: -0.29px;
          margin: 19px 0 0 8px;
          /deep/ .van-radio__label {
            color: #aaacb7;
          }
        }
        .checked {
          /deep/ .van-radio__label {
            color: #00a8ea;
          }
        }
        p {
          font-size: 12px;
          color: #aaacb7;
          letter-spacing: -0.29px;
          float: right;
          position: relative;
        }
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-size: 100% 100%;
          margin-right: 4px;
          position: relative;
          top: 2px;
        }
        .edit {
          margin: 19px 8px 0 20px;
          span {
            background-image: url("../../../assets/edit-icon-nocolor.png");
            background-size: 100% 100%;
          }
        }
        .delete {
          margin-top: 19px;
          span {
            background-image: url("../../../assets/delete-icon.png");
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
/deep/ .van-radio__icon--checked > i {
  background-image: url("../../../assets/cart-chose.png");
  background-size: 100% 100%;
}
/deep/ .van-radio__icon--checked > i::before {
  content: "";
}
</style>
