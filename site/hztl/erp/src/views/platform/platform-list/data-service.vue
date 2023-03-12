<script lang="tsx">
import { Component, Vue } from "vue-property-decorator";
import { Fragment } from "vue-fragment";
import { Platform, PlatformAuthEnum } from "@/constants/platform";
import { namespace } from "vuex-class";
import PlatformComponent from "./platform.vue";
import AuthorizationDialog from "./authorization-dialog.vue";
import { toggleDataService } from "@/api/platform";

const PlatformStore = namespace("platform");

@Component
export default class DataService extends Vue {
  @PlatformStore.State("dataServiceList") private dataServiceList!: Platform[];
  @PlatformStore.Action("loadDataServiceList")
  public loadDataServiceList!: (isReload?: boolean) => Promise<void>;
  reloadData() {
    return this.loadDataServiceList(true);
  }
  private authVisible = false;
  private authPlatform!: Platform;
  authorization(platform: Platform) {
    if (!this.hasAutoPerm("author")) {
      this.$message.error("您暂无权限授权！");
    } else {
      this.authPlatform = platform;
      this.authVisible = true;
    }
  }

  private loading = false;
  toggleHanlde(platform: Platform) {
    if (!this.hasAutoPerm("author")) {
      this.$message.error("您暂无权限切换数据服务！");
    } else if (platform.status === PlatformAuthEnum.unauth) {
      this.$confirm(
        "当前数据服务平台未授权，确认去授权？",
        "数据服务切换提示",
        {
          type: "warning"
        }
      ).then(() => {
        this.authorization(platform);
      });
    } else {
      this.$confirm(
        "您正在切换数据服务。\n切换后之前数据服务平台的数据将保留且不可使用，需要按新数据服务平台规则重新整理。\n确定要继续切换吗？",
        "数据服务切换提示",
        {
          type: "warning"
        }
      ).then(() => {
        this.loading = true;
        toggleDataService({ platformKey: platform.key })
          .then(() => {
            this.$message.success("切换成功！");
            this.reloadData()
              .then(() => {
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          })
          .catch(() => {
            this.loading = false;
          });
      });
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
        {this.dataServiceList.length ? (
          <Fragment>
            <div class="title warning-title">
              每账套仅支持使用唯一一个数据服务，请根据您的需要进行选择。使用过程中切换数据服务需要按照新服务平台的规则重新整理数据，切换前请慎重考虑！
            </div>
            <div v-loading={this.loading} class="platform-box">
              {this.dataServiceList.map(item => (
                <PlatformComponent platformData={item}>
                  <div class="btn-box">
                    {item.status === PlatformAuthEnum.unauth && (
                      <div
                        class="ht-link author-btn"
                        onClick={() => this.authorization(item)}
                      >
                        点击授权
                      </div>
                    )}
                    {item.used ? (
                      <div class="select-btn is-active">
                        <span class="el-icon-check select-btn-icon"></span>
                      </div>
                    ) : (
                      <div
                        class="select-btn"
                        onClick={() => this.toggleHanlde(item)}
                      >
                        <span class="el-icon-check select-btn-icon"></span>
                      </div>
                    )}
                  </div>
                </PlatformComponent>
              ))}
              <div class="platform">
                <div class="platform-content">更多数据服务</div>
                <div class="platform-tips">
                  联系客服或者销售人员，推荐您中意的数据服务平台，我们来对接。
                </div>
              </div>
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
    &.warning-title {
      color: $color-warning;
    }
  }
  .platform-box {
    display: flex;
    flex-wrap: wrap;
    .btn-box {
      height: 100%;
      position: relative;
      text-align: center;
      .author-btn {
        padding-top: 50%;
        &:hover {
          box-shadow: 0px 0px 5px rgba(0, 165, 255, 1);
        }
      }
      .select-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-bottom: 35px solid #f4f4f5;
        border-left: 35px solid transparent;
        cursor: pointer;

        .select-btn-icon {
          position: absolute;
          right: 0;
          top: 15px;
          font-size: 20px;
          color: #fff;
        }

        &:hover {
          border-bottom: 35px solid #3aa7ff;
          border-left: 35px solid transparent;
        }
      }

      .is-active {
        border-bottom: 35px solid #3aa7ff;
        border-left: 35px solid transparent;
        cursor: default;
      }
    }

    .platform {
      width: 444px;
      height: 100px;
      background: #fff;
      border-radius: 5px;
      margin: 10px 10px 0 0;
      box-shadow: 0px 0px 5px rgba(232, 235, 238, 1);

      .platform-content {
        margin: 0 15px;
        margin-top: 10px;
        font-size: 35px;
        color: #999999;
      }

      .platform-tips {
        margin: 0 15px;
        margin-top: 10px;
        font-size: 13px;
        color: #999999;
      }
    }
  }
}
</style>
