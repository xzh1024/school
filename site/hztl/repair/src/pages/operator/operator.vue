<template>
  <div id="operatorPage">
    <div class="operator-container">
      <div class="banner-wrap">
        <OperatorBanner class="operator-banner"></OperatorBanner>
      </div>
      <div class="button-group">
        <button class="button" @click="gotoRepairIndex">
          <span class="button-content">
            配修社区首页
            <i class="icon-right-blue"></i>
          </span>
        </button>
        <button class="button button-primary" @click="gotoPartsManage">
          <span class="button-content">
            商品管理
            <i class="icon-right-white"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OperatorBanner from "./components/banner/index.vue";
import { BaseInfoModel } from "@/store/modules/base/interface";
import { namespace } from "vuex-class";
const BaseStore = namespace("base");

@Component({ name: "OperatorPage", components: { OperatorBanner } })
export default class OperatorPage extends Vue {
  @BaseStore.Getter("baseInfo")
  protected baseInfo!: BaseInfoModel;

  // 新窗口打开配修社区首页
  private gotoRepairIndex() {
    let url = window.location.origin;
    if (sessionStorage.token) {
      url += "/?token=" + sessionStorage.token;
    }
    const { erpType } = this.baseInfo;
    if (erpType === 1) {
      (window as any).ChromiumWebBrowser.JsOpenBrowser(url);
    } else if (erpType === 2) {
      window.open(url);
    }
  }

  // 商品管理
  private gotoPartsManage() {
    const { erpType } = this.baseInfo;
    if (erpType === 1) {
      this.m8();
    } else if (erpType === 2) {
      this.erp();
    }
  }

  private m8() {
    let url = window.location.origin + "/back";
    if (sessionStorage.token) {
      url += "/partsManage?token=" + sessionStorage.token;
    }
    window.open(url, "_self");
  }

  private erp() {
    if (window.opener) {
      window.opener.postMessage("gotoPartsManage", "*");
    } else if (top.postMessage) {
      top.postMessage("gotoPartsManage", "*");
    }
  }
}
</script>

<style lang="scss" scoped>
#operatorPage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.operator-container {
  width: 0;
  height: 0;
  padding-left: 83%;
  padding-top: 35%;
  position: relative;
  .banner-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .operator-banner {
      width: 100%;
      height: 100%;
    }
  }
  .button-group {
    position: absolute;
    left: 8%;
    bottom: 26%;
    z-index: 1;
    .button {
      outline: none;
      display: inline-block;
      line-height: 16px;
      padding: 8px 15px;
      border-radius: 20px;
      font-size: 12px;
      white-space: nowrap;
      color: #3d7bff;
      background-color: #ffffff;
      border: 2px solid #ffffff;
      cursor: pointer;
      .button-content {
        display: flex;
        align-items: center;
      }
    }
    .button.button-primary {
      margin-left: 24px;
      color: #ffffff;
      background-color: transparent;
      border: 1px solid #ffffff;
    }
  }
}
</style>
