<script lang="tsx">
import { Component, Vue } from "vue-property-decorator";
import eventBus from "@/event";
import { bindAuthPlatform, getAuthPlatform } from "./services";
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import { envConfig } from "envConfigPath";

@Component({
  name: "AuthPlatform"
})
export default class AuthPlatform extends Vue {
  private authPlatformKey = "zysc";
  private url = "";
  private goFeedback() {
    const url = envConfig.feedback;
    window.open(url, "feedBack");
  }
  private loading = false;
  private bindAuthPlatform() {
    return bindAuthPlatform().catch(res => {
      if (res.code === "to-confirm") {
        this.loading = false;
        return this.$confirm(
          "当前公司已绑定其他ERP软件，继续操作将会直接绑定云配管家并清除自有商城中现有的配件信息相关数据，请谨慎操作！",
          "确认？"
        ).then(() => {
          this.loading = true;
          return bindAuthPlatform(true);
        });
      } else {
        return Promise.reject(res);
      }
    });
  }
  openManualDialog() {
    eventBus.$emit("open-manual-dialog", 46);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messageHandler(e: MessageEvent) {
    if (e.data.type === "jump-parameters") {
      this.$router.push(`/AuthPlatform/${this.authPlatformKey}`);
    }
  }
  mounted() {
    this.loading = true;
    getAuthPlatform()
      .then(res => {
        if (res.has) {
          this.url = res.loginUrl;
          (window as any).loginUrl = res.loginUrl;
        } else {
          return this.bindAuthPlatform().then(() => {
            this.loading = true;
            return getAuthPlatform().then(newRes => {
              this.url = newRes.loginUrl;
              (window as any).loginUrl = newRes.loginUrl;
            });
          });
        }
      })
      .finally(() => {
        this.loading = false;
      });
  }
  activated() {
    window.addEventListener("message", this.messageHandler);
  }
  deactivated() {
    window.removeEventListener("message", this.messageHandler);
  }
  render() {
    if (this.loading) {
      return <div v-loading={true} class="flex-container column-flex"></div>;
    }
    if (!this.url) {
      return (
        <div class="error-content">
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            class=""
            data-icon="close-circle"
            width="72px"
            height="72px"
            fill="red"
            aria-hidden="true"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
          </svg>
          <h2>商城开通异常</h2>
          <span class="ht-link" onClick={this.goFeedback}>
            联系客服&gt;&gt;
          </span>
        </div>
      );
    }
    return (
      <div class="flex-container column-flex">
        <iframe
          name="authPlatform"
          class="auto-block flex-block-margin"
          src={this.url}
        ></iframe>
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.error-content {
  margin-top: 20vh;
  text-align: center;
}
</style>
