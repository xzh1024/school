<template>
    <div class="popup-div" v-if="value.show">
        <van-nav-bar left-text="修理厂" left-arrow @click-left="cancle" :fixed="true"/>
        <div class="content">
            <div
                class="recommend-list"
                v-if="showData.recommendRepairFactories && showData.recommendRepairFactories.length"
            >
                <p class="recommend-text">
                    智能推荐:
                    <span>（以下推荐的修理厂可以安装此订单中的所有配件）</span>
                </p>
                <div
                    class="recommend"
                    v-for="recommend in showData.recommendRepairFactories"
                    :key="recommend.name"
                >
                    <van-icon name="location" class="position-icon"/>
                    <p class="company-name">
                        {{recommend.name}}
                        <a
                            class="repair-phone"
                            :href="'tel:'+recommend.phone"
                            v-if="recommend.phone"
                        ></a>
                    </p>
                    <p class="company-address">{{recommend.address}}</p>
                    <span
                        class="icon-reserve"
                        @click="reserveRepair(recommend)"
                        v-if="allRepairId!=recommend.id&&!recommend.appointed"
                    ></span>
                    <span
                        class="icon-chosed-repair icon-reserve"
                        v-if="allRepairId==recommend.id||recommend.appointed"
                    ></span>
                </div>
            </div>
            <div class="details">
                <div v-for="part in showData.details" :key="part.oeCode" class="part-card">
                    <img :src="part.image|defaultImage">
                    <p class="part-name">{{part.stdName}}</p>
                    <p class="part-code">编号：{{part.oeCode}}</p>
                    <br>
                    <span class="brand">{{part.swBrand}}</span>
                    <span class="vehBrand" v-if="part.swProductionPlace">{{part.swProductionPlace}}</span>
                    <button
                        type="button"
                        @click="checkRepair(part)"
                    >查看修理厂({{part.repairFactories.length||0}})</button>
                    <span
                        class="chosedRepair"
                        v-if="part.appointedRepairName||part.hasAppointRepair"
                    >已预约：{{part.appointedRepairName}}</span>
                </div>
            </div>
        </div>
        <div class="order-bottom-button">
            <a type="button" class="settle-order cancle-button" @click="cancle">取消</a>
            <a type="button" class="settle-order" @click="toOrderDetail">确定</a>
        </div>
        <a :href="'tel:'+phone" id="phone-num"></a>
        <van-popup v-model="showRepair" position="right" :style="{ width: '90%',height:'100%' }">
            <div class="content" style="margin:0;width:100%;">
                <div class="recommend-list">
                    <p
                        class="recommend-text"
                        style="font-size:12px;padding-left:10px;"
                    >修理厂列表({{repairPart.repairFactories.length || 0}}家)</p>
                    <div
                        class="recommend"
                        v-for="(recommend,index) in repairPart.repairFactories"
                        :key="index"
                        style="padding-left:10px;margin-top:15px;"
                    >
                        <van-icon name="location" class="position-icon"/>
                        <p class="company-name">
                            {{recommend.name}}
                            <a
                                class="repair-phone"
                                :href="'tel:'+recommend.phone"
                                v-if="recommend.phone"
                            ></a>
                        </p>
                        <p class="company-address">{{recommend.address}}</p>
                        <span
                            class="icon-reserve"
                            v-if="repairPart.appointRepairId!=recommend.id&&!repairPart.hasAppointRepair"
                            @click="choseRepair(repairPart,recommend)"
                        ></span>
                        <span
                            class="icon-chosed-repair icon-reserve"
                            v-if="repairPart.appointRepairId==recommend.id&&!repairPart.hasAppointRepair"
                        ></span>
                    </div>
                </div>
            </div>
        </van-popup>
        <van-dialog
            v-model="showPreOrder.show"
            title="预约安装"
            show-cancel-button
            @confirm="confirmInstall"
        >
            <van-field
                readonly
                clickable
                name="datetimePicker"
                :value="currentDate"
                label="预计到店时间："
                placeholder="点击选择时间"
                class="font-size-12"
                @click="showPicker = true"
            />
            <van-checkbox
                v-model="toRepair"
                shape="square"
                icon-size="13px"
                style="padding-left:17.6px;"
                v-if="this.value.fromConfirm"
            >当前配件是否直接发货到修理厂</van-checkbox>
        </van-dialog>
        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
                v-model="currentDateSelect"
                type="datetime"
                class="font-size-12"
                @confirm="onConfirm"
                :min-date="minDate"
                title="预约到店时间"
                @cancel="showPicker = false"
                :formatter="formatter"
            />
        </van-popup>
    </div>
</template>
<script>
import Vue from "vue";
import request, { URL_MODULE } from "@/request";
import { Popup, NavBar, Icon, DatetimePicker, Field } from "vant";
Vue.use(Popup)
  .use(NavBar)
  .use(Icon)
  .use(DatetimePicker)
  .use(Field);
export default {
  name: "RepairPopup",
  data() {
    return {
      showData: {},
      phone: "",
      showRepair: false,
      repairPart: {
        repairFactories: []
      },
      allRepairId: "",
      showPreOrder: {
        show: false,
        isAll: false,
        chosedDetail: {}, //用作单个更改预约修理厂的记录
        recommend: {}
      },
      minDate: new Date(),
      currentDate: "",
      currentDateSelect: "",
      showPicker: false,
      toRepair: true
    };
  },
  props: ["value"],
  model: {
    prop: "value",
    //这个事件名可以随意写，它实际上是规定了子组件要更新父组件值需要注册的方法
    event: "change"
  },
  watch: {
    value: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal.show) {
          //展开时请求接口
          this.allRepairId = "";
          //判断是否有传入数据，如果有的话，则不请求数据
          let data = {};
          let arr = Object.keys(newVal.showData);
          if (arr.length) {
            this.showData = newVal.showData;
          } else {
            this.getRepairList();
          }
        }
      }
    }
  },
  filters: {
    defaultImage(image) {
      let result = require("../../img/Common_goods_def_img.png");
      if (location.hostname == "jndm.hztl3.com") {
        result = require("../../img/Common_goods_def_img.png");
      }
      if (image) {
        result = image + "&imageView2/1/w/200/h/200";
      }
      return result;
    }
  },
  methods: {
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "date") {
        return `${val}日`;
      } else if (type === "hour") {
        return `${val}时`;
      } else if (type === "minute") {
        return `${val}分`;
      }
      return val;
    },
    confirmInstall() {
      if (this.showPreOrder.isAll) {
        for (let part of this.showData.details) {
          //   判断，是否已预约修理厂，已预约的不更改
          if (!part.hasAppointRepair) {
            part.deliverToRepair = this.toRepair;
            part.appointTime = this.currentDate;
            part.appointRepairId = this.showPreOrder.recommend.id;
            part.appointedRepairName = this.showPreOrder.recommend.name;
          }
        }
        this.allRepairId = this.showPreOrder.recommend.id;
      } else {
        if (!this.showPreOrder.chosedDetail.hasAppointRepair) {
          //如果不是改变全部，则获取保存的detail，更改里面的修理厂
          this.showPreOrder.chosedDetail.deliverToRepair = this.toRepair;
          this.showPreOrder.chosedDetail.appointTime = this.currentDate;
          this.showPreOrder.chosedDetail.appointRepairId = this.showPreOrder.recommend.id;
          this.showPreOrder.chosedDetail.appointedRepairName = this.showPreOrder.recommend.name;
        }
      }
      this.showPreOrder = {
        show: false,
        isAll: false,
        chosedDetail: {},
        recommend: {}
      };
      this.showRepair = false;
    },
    onConfirm(time) {
      this.currentDate = time
        .toLocaleString("chinese", { hour12: false })
        .replace(/\//g, "-");
      this.currentDateSelect = time;
      this.showPicker = false;
    },
    choseRepair(repairPart, recommend) {
      //已预约的不能再预约
      if (repairPart.hasAppointRepair) {
        return;
      }
      //弹框选择预约时间及是否发货到修理厂
      this.showPreOrder.show = true;
      this.showPreOrder.isAll = false;
      this.showPreOrder.chosedDetail = repairPart;
      this.showPreOrder.recommend = recommend;
    },
    reserveRepair(recommend) {
      let canRecommendRepair = false;
      if (
        this.showData.recommendRepairFactories &&
        this.showData.recommendRepairFactories.length
      ) {
        for (let repair of this.showData.recommendRepairFactories) {
          if (repair.appointed) {
            //有一个已预约的，后面不能预约
            return false;
          }
        }
      }
      //判断，若所有配件都已预约修理厂，则点击只能推荐无效
      if (this.showData.details && this.showData.details.length) {
        for (let detail of this.showData.details) {
          if (!detail.hasAppointRepair) {
            canRecommendRepair = true;
          }
        }
      }
      if (canRecommendRepair) {
        //弹框选择所有的预约时间及是否发货到修理厂
        this.showPreOrder.show = true;
        this.showPreOrder.isAll = true;
        this.showPreOrder.recommend = recommend;
      }
    },
    checkRepair(part) {
      this.repairPart = part;
      this.showRepair = true;
    },
    getRepairList() {
      let method = "post";
      let postUrl = "";
      let data = {};
      let param = {};
      if (this.value.fromConfirm) {
        postUrl = "/carts/app";
        data = this.getCartListData();
        param = {
          ids: this.value.concatPostRepair,
          group: "part",
          dict: true
        };
      } else {
        method = "get";
        postUrl = `/orders/factories/${this.value.concatPostRepair}`;
      }
      request({
        method: method,
        url: postUrl,
        baseURL: URL_MODULE.united,
        params: param,
        data: data
      }).then(data => {
        if (
          !(
            data.recommendRepairFactories &&
            data.recommendRepairFactories.length > 0
          )
        ) {
          data.recommendRepairFactories = [];
        }
        if (!(data.details && data.details.length)) {
          data.details = [];
        }
        this.showData = data;
      });
    },
    toOrderDetail() {
      //拼接数据，已选中的数据拼接到value中
      this.$emit("chosedRepair", this.showData);
    },
    cancle() {
      this.value.show = false;
    },
    getCartListData() {
      let result = {};
      let sellersToResult = [];
      for (let sellerId in this.value.sellers) {
        sellersToResult.push({
          sellerId: parseInt(sellerId),
          skus: this.value.sellers[sellerId].skus
        });
      }
      result.sellers = sellersToResult;
      return result;
    }
  }
};
</script>
<style lang="less" scoped>
.popup-div {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2012;
  top: 0;
  left: 0;
  overflow-y: scroll;
}
.content {
  height: 100%;
  padding: 46px 0 110px;
  background: #ffffff;
  .recommend-list {
    width: 355px;
    margin: 5px auto 10px;
    .recommend-text {
      text-align: left;
      font-size: 14px;
      margin: 10px 0 0;
      span {
        font-size: 12px;
        color: #979595;
      }
    }
    .recommend {
      position: relative;
      overflow: hidden;
      margin-top: 5px;
      .icon-reserve {
        position: absolute;
        right: 40px;
        top: 0;
        width: 23px;
        height: 23px;
        display: inline-block;
        background-size: 100% 100%;
        background-image: url("../../img/un-checked.png");
      }
      .icon-chosed-repair {
        background-image: url("../../img/icon.jpg");
      }
      .position-icon {
        float: left;
        color: red;
        margin-top: 5px;
      }
      p {
        font-size: 14px;
        text-align: left;
        margin: 0;
      }
      .company-name {
        .phone-icon {
          background: #7bc167;
          color: #ffffff;
          border-radius: 5px;
          vertical-align: middle;
          font-size: 16px;
          cursor: pointer;
        }
      }
      .company-address {
        font-size: 12px;
        color: #929292;
        width: 200px;
      }
    }
  }
  .details {
    width: 355px;
    margin: 5px auto 0;
    .part-card {
      position: relative;
      border-bottom: 1px solid #eeeeee;
      padding-top: 10px;
      overflow: hidden;
      padding-bottom: 10px;
      img {
        width: 75px;
        height: 75px;
        border: 1px solid #eeeeee;
        float: left;
      }
      p {
        margin: 0;
        text-align: left;
        float: left;
        width: 250px;
        padding-left: 15px;
      }
      span {
        padding: 1px 7px;
        border-radius: 20px;
        color: #ffffff;
        font-size: 12px;
        float: left;
      }
      .part-name {
        font-size: 14px;
      }
      .part-code {
        font-size: 12px;
        color: #aeaeae;
        margin-bottom: 5px;
      }
      .brand {
        background: #cfd0a3;
        margin-left: 15px;
      }
      .vehBrand {
        background: #aeaeae;
        margin-left: 5px;
      }
      button {
        font-size: 12px;
        border: 1px solid #5b92f7;
        color: #5b92f7;
        padding: 3px 10px;
        position: absolute;
        right: 0;
        top: 29px;
        background: #ffffff;
        border-radius: 5px;
      }
    }
  }
}
.order-bottom-button {
  height: 49px;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: -1px;
  background-image: url("../../img/tabbar_bottom.png");
  background-size: 100% 100%;
  .settle-order {
    float: right;
    margin: 5px 16px 0 0;
    width: 104px;
    height: 40px;
    background: #ff6e4c;
    border-radius: 8px;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: -0.34px;
    text-align: center;
    line-height: 40px;
  }
  .cancle-button {
    background: #ffffff;
    color: #ff6e4c;
    border: 1px solid #ff6e4c;
  }
}
.chosedRepair {
  font-size: 12px;
  color: #f48d13 !important;
  float: right !important;
  margin-top: 13px;
}
.font-size-12 {
  font-size: 12px;
  text-align: left;
}
/deep/ .van-checkbox__label {
  font-size: 12px;
}
.repair-phone {
  position: relative;
  bottom: 3px;
  display: inline-block;
  width: 15px;
  height: 15px;
  background-image: url("../../img/Common_phone_icon.png");
  background-size: 100% 100%;
}
</style>
