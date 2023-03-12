<template>
  <iframe
    ref="repairIframe"
    class="whsc-box"
    frameborder="0"
    v-if="iframeSrc"
    :src="iframeSrc"
  ></iframe>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  HasWhscModel,
  BindWhscModel,
  BindWhscParams
} from "./constants/interfaces";
import RepairService from "./constants/services";
const repairService = new RepairService();

@Component({ name: "Repair" })
export default class Repair extends Vue {
  private iframeSrc = "";

  private skipWhsc() {
    repairService.getWhsc().then((res: HasWhscModel) => {
      const { has, loginUrl } = res;
      if (has) {
        if (loginUrl) {
          this.openWhsc(loginUrl);
        }
      } else {
        this.bindWhsc();
      }
    });
  }

  private bindWhsc(params: BindWhscParams = { forceUpdate: false }) {
    repairService.bindWhsc(params).then((res: BindWhscModel) => {
      const { needForceUpdate, loginUrl } = res;
      if (needForceUpdate) {
        this.forceUpdateCheck();
      } else if (loginUrl) {
        this.openWhsc(loginUrl);
      }
    });
  }

  private openWhsc(loginUrl: string) {
    if (!loginUrl) return;
    let url = "";
    if (process.env.NODE_ENV === "development") {
      // url = "http://localhost:8020/";
      // url = "http://192.168.3.41:8020/";
      url = "http://192.168.3.41:8020/operator.html/";
      const arr = loginUrl.split("token=");
      if (Array.isArray(arr) && arr.length > 1) {
        url += "?token=" + arr[1];
      }
    } else {
      url = loginUrl;
    }
    this.iframeSrc = url;
    this.initIframeMessage();
  }

  private initIframeMessage() {
    const _this = this as any;
    window.addEventListener("message", function(e) {
      if (e.data === "gotoPartsManage") {
        _this.gotoPartsManage();
      }
    });
  }

  //打开配修社区-商品管理
  private gotoPartsManage() {
    this.$router.push({ path: "/RepairAuthPlatformManagement" });
  }

  private forceUpdateCheck() {
    this.$alert(
      "账号已绑定其他ERP软件，若继续操作将会清除当前已上架的配件！",
      "提示",
      {
        showClose: false,
        lockScroll: false,
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        callback: action => {
          if (action === "confirm") {
            this.bindWhsc({
              forceUpdate: true
            });
          }
        }
      }
    );
  }

  mounted() {
    this.skipWhsc();
  }
}
</script>

<style lang="scss" scoped>
.whsc-box {
  width: 100%;
  height: 100%;
}
</style>
