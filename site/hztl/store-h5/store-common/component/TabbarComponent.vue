<template>
    <van-tabbar route class="bottom-bac">
        <van-tabbar-item replace :to="isYczl?'/homeYczl':'/home'">
            <span :class="{'yczlSpan':isYczl}">首页</span>
            <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? iconImg.homeActive : iconImg.homeInactive"
            >
        </van-tabbar-item>
        <van-tabbar-item replace to="/friendCircle">
            <span :class="{'yczlSpan':isYczl}">朋友圈</span>
            <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? iconImg.friendCircleActive : iconImg.friendCircleInactive"
            >
        </van-tabbar-item>
        <van-tabbar-item replace to="/post_Inquiry">
            <span :class="{'yczlSpan':isYczl}">发布询价</span>
            <img
                slot="icon"
                class="post-Inquiry"
                slot-scope="props"
                :src="props.active ? iconImg.InquiryActive : iconImg.InquiryInactive"
            >
        </van-tabbar-item>
        <van-tabbar-item replace :to="isYczl?'/cart':'/receipt'">
            <span v-if="!isYczl">报价</span>
            <span v-if="isYczl" :class="{'yczlSpan':isYczl}">购物车</span>
            <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? iconImg.receiptActive : iconImg.receiptInactive"
            >
        </van-tabbar-item>
        <van-tabbar-item replace to="/mine">
            <span :class="{'yczlSpan':isYczl}">我的</span>
            <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? iconImg.mineActive : iconImg.mineInactive"
            >
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar).use(TabbarItem);
export default {
  name: "TabbarComponent",
  data() {
    return {
      iconImg: {
        homeActive: require("../img/icon_home-sel.png"),
        homeInactive: require("../img/icon_home.png"),
        friendCircleActive: require("../img/friend-active.png"),
        friendCircleInactive: require("../img/friend.png"),
        InquiryActive: require("../img/icon-push-tobar.png"),
        InquiryInactive: require("../img/icon-push-tobar.png"),
        mineActive: require("../img/mine-active.png"),
        mineInactive: require("../img/mine.png"),
        receiptActive: require("../img/receipt-active.png"),
        receiptInactive: require("../img/receipt.png")
      },
      isYczl: false
    };
  },
  created() {
    this.isYczl = this.axios.prototype.isYczl;
    if (this.isYczl) {
      this.iconImg = {
        homeActive: require("../img/yczl/home-active.png"),
        homeInactive: require("../img/yczl/home.png"),
        friendCircleActive: require("../img/yczl/friendCircle-active.png"),
        friendCircleInactive: require("../img/yczl/friendCircle.png"),
        InquiryActive: require("../img/yczl/icon-push-tobar.png"),
        InquiryInactive: require("../img/yczl/icon-push-tobar.png"),
        mineActive: require("../img/yczl/mine-active.png"),
        mineInactive: require("../img/yczl/mine.png"),
        receiptActive: require("../img/yczl/cart-active.png"),
        receiptInactive: require("../img/yczl/cart-icon.png")
      };
    }
  }
};
</script>

<style lang="less" scoped>
.post-Inquiry {
  width: 50px;
  height: 50px;
  margin-top: -30px;
  position: inherit;
  z-index: 999999999;
}
.van-tabbar-item--active {
  font-size: 12px !important;
  color: #21bdc2 !important;
  .yczlSpan {
    color: #06c160!important;
  }
}
</style>