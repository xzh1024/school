<template>
  <div class="brandManage">
    <van-nav-bar
      title=""
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    >
      <img src="../../../assets/back-icon.png" slot="left" class="Back" />
      <img
        src="../../../assets/icon-Add.png"
        class="nav-right-button"
        @click="brandAdd"
        v-if="!isEdit && isManager"
        slot="right"
      />
      <img
        src="../../../assets/icon-brand-del.png"
        @click="brandDel"
        v-if="!isEdit && isManager"
        class="nav-right-button"
        slot="right"
      />
      <span
        class="right-button-finish"
        v-if="isEdit && isManager"
        slot="right"
        @click="brandDelFinsh"
        >完成</span
      >
    </van-nav-bar>
    <div class="brand-list">
      <van-checkbox-group v-model="result">
        <div
          class="brand-item"
          v-for="(item, index) in vehBrandsList"
          :key="index"
        >
          <van-checkbox
            :name="item"
            :title="item"
            v-if="isEdit"
            ref="checkboxes"
            slot="icon"
          >
            <img
              slot="icon"
              slot-scope="props"
              class="icon-18"
              :src="props.checked ? activeIcon : inactiveIcon"
            />
          </van-checkbox>
          <span class="brand-item-span">{{ item }}</span>
        </div>
      </van-checkbox-group>
    </div>
    <div class="brand-bottom" v-if="isEdit">
      <!-- <van-checkbox ref="checkboxes" class="bottom-select" v-model="allSelect" >
                    <img slot="icon" slot-scope="props" width="18px" height="18px"
                        :src="props.checked ? activeIcon : inactiveIcon"
                        >全选
                </van-checkbox> -->
      <span class="bottom-to-manage" @click="brandDelSure">删除</span>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Row, Col, Button, Toast, CheckboxGroup, Checkbox } from "vant";
import request from "@/request";
Vue.use(NavBar)
  .use(Row)
  .use(Col)
  .use(Button)
  .use(Toast)
  .use(CheckboxGroup)
  .use(Checkbox);
export default {
  name: "brandManage",
  data() {
    return {
      vehBrandsList: [],
      isEdit: false,
      activeIcon: require("../../../assets/icon-select.png"),
      inactiveIcon: require("../../../assets/icon-noselect.png"),
      result: [],
      allSelect: false,
      isManager: false
    };
  },
  watch: {
    allSelect: {
      handler(newVal) {
        if (newVal == true) {
          this.result = this.vehBrandsList;
        } else {
          this.result = [];
        }
      },
      immediate: true
    }
  },
  created() {
    this.load();
  },
  methods: {
    load: function() {
      //加载
      let _this = this;
      _this.result = [];
      request({
        url: "/companies"
      })
        .then(res => {
          if (res.vehBrands) {
            _this.vehBrandsList = res.vehBrands;
          }
        })
        .catch(err => {
          if (err && err.message) {
            Toast.fail(err.message);
          }
        });
      request({
        url: "/base"
      })
        .then(res => {
          if (res.staffType == "manager") {
            this.isManager = true;
          }
        })
        .catch(err => {
          if (err && err.message) {
            Toast.fail(err.message);
          }
        });
    },
    brandDel: function() {
      //删除
      this.isEdit = true;
    },
    brandDelSure: function() {
      //确认删除
      let _this = this;
      let subscribeVehBrands = [];
      for (let item of _this.vehBrandsList) {
        if (!_this.result.includes(item)) {
          subscribeVehBrands.push(item);
        }
      }
      let param = {
        subscribeVehBrands: subscribeVehBrands
      };
      request({
        method: "post",
        url: "/alliance-members/subscribe-veh-brands",
        data: param
      })
        .then(() => {
          Toast.success("操作成功！");
          _this.load();
        })
        .catch(err => {
          if (err && err.message) {
            Toast.fail(err.message);
          }
        });
    },
    brandDelFinsh: function() {
      //完成
      this.isEdit = false;
    },
    brandAdd: function() {
      //新增品牌
      this.$router.push("/brandManageAdd");
    },
    onClickLeft: function() {
      //返回
      this.$router.push("mine");
    }
  }
};
</script>
<style lang="less">
.brandManage {
  height: 100vh;
  font-family: PingFangSC-Semibold;
  background: #ffffff;
  .nav-right-button {
    margin-top: 10px;
    width: 24px;
    height: 24px;
    margin-left: 20px;
  }
  .right-button-finish {
    margin-left: 20px;
    display: inline-block;
    width: 48px;
    height: 30px;
    opacity: 0.6;
    border: 1px solid #ccced4;
    border-radius: 8px;
    font-size: 14px;
    color: #1a2231;
    letter-spacing: -0.34px;
    text-align: center;
    line-height: 30px;
    margin-bottom: 7px;
  }
  .van-hairline--bottom {
    border-bottom: 0.5px solid #edeff1;
  }
  .brand-list {
    display: flex;
    margin: 0 16px;
    min-height: 100vh;
    overflow: auto;
    justify-content: space-between;
    flex-wrap: wrap;
    flex-direction: row;
    .van-checkbox-group {
      width: 100%;
      .brand-item {
        height: 52px;
        font-size: 14px;
        color: #1a2231;
        letter-spacing: 0;
        font-weight: lighter;
        text-align: left;
        line-height: 52px;
        border-bottom: 0.5px solid #edeff1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .brand-item-span {
        margin-left: 10px;
      }
      .van-checkbox {
        display: inline-flex;
      }
    }
  }
  .brand-bottom {
    width: 343px;
    height: 49px;
    margin: 0 16px;
    position: fixed;
    background: #ffffff;
    bottom: 0;
    border-top: 0.5px solid #edeff1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .van-checkbox__label {
      font-size: 12px;
      color: #777b87;
    }
    .bottom-to-manage {
      background: #00a8ea;
      color: #ffffff;
      margin-left: auto;
      width: 84px;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      font-size: 14px;
      border-radius: 8px;
    }
  }
}
</style>
