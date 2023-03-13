<template>
  <div class="header-aside">
    <div class="header-left">
      <div class="header-title">
        配修社区-商家后台
        <el-button
          type="primary"
          size="mini"
          round
          class="gradients-button"
          @click="backRepairIndex"
        >
          <i class="icon-house"></i>
          返回首页
        </el-button>
      </div>
      <div class="header-hint">
        <!-- * 这里是一排提示语这里是一排提示语 -->
      </div>
    </div>
    <div class="header-right">
      <div class="header-company">
        {{ baseInfo.companyName }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseInfoModel } from "@/store/modules/base/interface";
import { namespace } from "vuex-class";
const BaseStore = namespace("base");

@Component({ name: "HeaderAside" })
export default class HeaderAside extends Vue {
  @BaseStore.Getter("baseInfo")
  protected baseInfo!: BaseInfoModel;

  private backRepairIndex() {
    if (sessionStorage.token) {
      let url = "";
      if (process.env.NODE_ENV === "development") {
        url = "http://192.168.3.41:8020/?token=" + sessionStorage.token;
      } else {
        url = location.origin;
      }
      window.open(url, "_self");
    }
  }
}
</script>

<style lang="scss" scoped>
.header-aside {
  width: 100%;
  height: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  background: #fff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3),
    0px 0px 20px rgba(0, 0, 0, 0.1) inset;
  &::before,
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 15px;
    left: 10px;
    width: 50%;
    height: 20%;
  }
  .header-left {
    flex: 1;
    .header-title {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 12px;
      color: $color-primary;
      .gradients-button {
        position: relative;
        margin-left: 16px;
        padding-left: 32px;
        .icon-house {
          position: absolute;
          left: 14px;
          top: 4px;
        }
      }
    }
    .header-hint {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 4px;
      font-size: 12px;
      color: $color-warning;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
  }
}
</style>
