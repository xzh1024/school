<script>
import qrBg from "@/assets/images/qr-bg.svg";
import proQr from "@/assets/images/pro-qr.png";
import qaQr from "@/assets/images/qa-qr.png";
import qaQrDenso from "@/assets/images/pro-qr-denso.jpg";
import setting from "@/setting";
import { uiConfig } from "envConfigPath";

export default {
  data() {
    return {
      uiConfig,
      showQr: false
    };
  },
  mounted() {
    window.addEventListener("click", this.hideQr);
  },
  destroyed() {
    window.removeEventListener("click", this.hideQr);
  },
  methods: {
    hideQr() {
      this.showQr = false;
    },
    toggerQr(e) {
      e.stopPropagation();
      this.showQr = !this.showQr;
    },
    stopPropagation(e) {
      e.stopPropagation();
    }
  },
  render() {
    let qrImg = location.host === setting.proHost ? proQr : qaQr;
    if (uiConfig && uiConfig.uiTheme === "denso") {
      qrImg = qaQrDenso;
    }
    return (
      <div class="app-qr">
        <div class="slots-block" on-click={this.toggerQr}>
          {this.$slots.default}
        </div>
        {this.showQr && (
          <div class="dialog" on-click={this.stopPropagation}>
            <img class="qr-bg" src={qrBg} />
            <img class="qr" src={qrImg} />
            <div class="qr-text">请扫描二维码下载</div>
          </div>
        )}
      </div>
    );
  }
};
</script>
<style lang="stylus" scoped>
.app-qr {
    position: relative;
    display: inline-block;
    .dialog {
        position: absolute;
        right: 50%;
        width: 120px;
        height: 144px;
        z-index: 9999;
        transform: translateX(25%);
        .qr-bg {
            position: absolute;
            left: 0;
            top: 0;
        }
        .qr {
            position: absolute;
            left: 10px;
            top: 20px;
            width: 100px;
            height: 100px;
        }
        .qr-text {
            position: absolute;
            top: 120px;
            width: 100%;
            line-height: 16px;
            text-align: center;
            color: #6891FC;
        }
    }
}
</style>
