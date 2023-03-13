<script lang="tsx">
import { Component, Vue } from "vue-property-decorator";
import { Fragment } from "vue-fragment";
import { Platform, PlatformAuthEnum, PlatformEnum } from "@/constants/platform";
import { namespace } from "vuex-class";
import PlatformComponent from "./platform.vue";
import AuthorizationDialog from "./authorization-dialog.vue";

const PlatformStore = namespace("platform");

@Component
export default class Ecommerce extends Vue {
  @PlatformStore.State("platformList") private platformList!: Platform[];
  @PlatformStore.Action("loadPlatformList")
  public loadPlatformList!: (isReload?: boolean) => Promise<void>;
  reloadData() {
    this.loadPlatformList(true);
  }
  private authVisible = false;
  private authPlatform!: Platform;
  private get ownList() {
    return this.platformList.filter(item => item.type === PlatformEnum.own);
  }
  private get authedList() {
    return this.platformList.filter(
      item =>
        item.type !== PlatformEnum.own && item.status === PlatformAuthEnum.auth
    );
  }
  private get unauthedList() {
    return this.platformList.filter(
      item =>
        item.type !== PlatformEnum.own &&
        item.status === PlatformAuthEnum.unauth
    );
  }
  private get qqAdmin() {
    const hasAuthPerm = this.hasPerm("transaction.platforms.author");
    const hasSettingPerm = this.hasPerm("transaction.platforms.paramsSettings");
    const hasCooperatorPerm = this.hasPerm("transaction.platforms.cooperator");
    return hasAuthPerm || hasSettingPerm || hasCooperatorPerm;
  }
  goManagement(platform: Platform) {
    if (platform.key === "qeqp") {
      return this.$router.push("platformManagementQQ");
    }
    if (
      !this.hasAutoPerm("paramsSettings") &&
      !this.hasAutoPerm("partsUpDown")
    ) {
      this.$message.error("您暂无权限查看平台管理！");
    } else {
      this.$router.push(`platform/${platform.key}`);
    }
  }
  authorization(platform: Platform) {
    if (!this.hasAutoPerm("author")) {
      this.$message.error("您暂无权限授权！");
    } else {
      this.authPlatform = platform;
      this.authVisible = true;
    }
  }
  updateAuthVisible(visible: boolean) {
    this.authVisible = visible;
  }
  mounted() {
    this.reloadData();
  }
  render() {
    return (
      <div class="page-box">
        {this.ownList.length ? (
          <Fragment>
            <div class="title primary-title">自有商城</div>
            <div class="platform-box">
              {this.ownList.map(item => (
                <PlatformComponent platformData={item}>
                  {item.needParams ? (
                    <div
                      class="ht-link"
                      onClick={() => this.goManagement(item)}
                    >
                      进入管理
                    </div>
                  ) : null}
                </PlatformComponent>
              ))}
            </div>
          </Fragment>
        ) : null}
        {this.authedList.length ? (
          <Fragment>
            <div class="title success-title">已授权平台</div>
            <div class="platform-box">
              {this.authedList.map(item => (
                <PlatformComponent platformData={item}>
                  {(item.needParams && item.key !== "qeqp") ||
                  (item.key === "qeqp" && this.qqAdmin) ? (
                    <div
                      class="ht-link"
                      onClick={() => this.goManagement(item)}
                    >
                      进入管理
                    </div>
                  ) : null}
                </PlatformComponent>
              ))}
            </div>
          </Fragment>
        ) : null}
        {this.unauthedList.length ? (
          <Fragment>
            <div class="title warning-title">未授权平台</div>
            <div class="platform-box">
              {this.unauthedList.map(item => (
                <PlatformComponent platformData={item}>
                  {item.key === "qeqp" ? (
                    <div
                      class="ht-link"
                      onClick={() => this.goManagement(item)}
                    >
                      进入管理
                    </div>
                  ) : (
                    <div
                      class="ht-link"
                      onClick={() => this.authorization(item)}
                    >
                      点击授权
                    </div>
                  )}
                </PlatformComponent>
              ))}
            </div>
          </Fragment>
        ) : null}

        <AuthorizationDialog
          platformData={this.authPlatform}
          visible={this.authVisible}
          onUpdateDate={this.reloadData}
          onVisibleUpdate={this.updateAuthVisible}
        />
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.page-box {
  padding: 10px;
  .title {
    margin-top: 10px;
    &.primary-title {
      color: $color-primary;
      @include font_color("color-primary");
    }
    &.success-title {
      color: $color-success;
    }
    &.warning-title {
      color: $color-warning;
    }
  }
  .platform-box {
    display: flex;
    flex-wrap: wrap;
    .ht-link {
      padding: 50% 0;
      text-align: center;
      &:hover {
        box-shadow: 0px 0px 5px rgba(0, 165, 255, 1);
      }
    }
  }
}
</style>
