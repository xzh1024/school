<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { Fragment } from "vue-fragment";
import Clipboard from "clipboard";
import { Form } from "hztl-ui";
import { Platform } from "@/constants/platform";
import { PlatformLicense, getPlatformLicense } from "@/api/platform";
import { validateCellPhone, validateCellPhoneTips } from "@/utils/validate";
import {
  FormData,
  LOCAL_AUTH_PLAT_FORMS,
  NO_CHECK_PLATFORMS,
  NO_CHECK_NO_ID_PLATFORMS,
  ACCOUNT_WAREHOUSE_CHECK_PLATFORMS,
  PHONE_CAPTCHA_CHECK_PLATFORMS,
  PLATFORM_MAP,
  BEIMAI_PLATFORM
} from "../constants";
import {
  bindAuthPlatformId,
  getPlatformSmsCaptcha,
  getPlatformWarehouses
} from "../AuthPlatform/services";
import * as store from "@/utils/store";

interface DialogProps {
  platformData: Platform;
  visible: boolean;
}

interface Events {
  onUpdateDate: () => void;
  onVisibleUpdate: (visible: boolean) => void;
}

interface Warehouses {
  id: string;
  name: string;
}

const defaultFormData: FormData = {
  dealerId: "",
  warehouse: "",
  phone: "",
  smsCaptcha: "",
  appKey: "",
  appSecret: ""
};

const LIMIT_TIME = 60;

@Component
export default class AuthorizationDialog extends tsc.Component<
  DialogProps,
  Events
> {
  public $refs!: {
    form: Form;
  };
  license: PlatformLicense | null = null;
  msg!: string;
  licenseReady = false;
  formData: FormData = { ...defaultFormData };
  cacheWarehouse: string | null = null;
  countdownTime = 0;
  loading = false;

  @Prop() platformData!: Platform;
  @Prop() visible!: boolean;

  @Watch("visible")
  onVisibleChanged(val: boolean, oldVal: boolean) {
    if (val && !oldVal) {
      this.formData = { ...defaultFormData };
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
      this.licenseReady = false;
      this.license = null;
      this.msg = "";
      this.cacheWarehouse = "";
      this.countdownTime = 0;
      this.loading = false;
      getPlatformLicense({
        platformKey: this.platformData?.key
      })
        .then(res => {
          this.license = res;
        })
        .catch(res => {
          this.msg = res.message;
        })
        .finally(() => {
          this.licenseReady = true;
        });
    }
  }

  get userInfoMsg() {
    return this.$store.state.admin.user.userInfoMsg;
  }
  get isLocalAuthPlatForms() {
    return LOCAL_AUTH_PLAT_FORMS.includes(this.platformData?.key);
  }
  get isNoCheckPlatForms() {
    return NO_CHECK_PLATFORMS.includes(this.platformData?.key);
  }
  get isNoCheckNoIdPlatForms() {
    return NO_CHECK_NO_ID_PLATFORMS.includes(this.platformData?.key);
  }
  get isAccountWarehouseCheckPlatForms() {
    return ACCOUNT_WAREHOUSE_CHECK_PLATFORMS.includes(this.platformData?.key);
  }
  get isPhoneCaptchaCheckPlatForms() {
    return PHONE_CAPTCHA_CHECK_PLATFORMS.includes(this.platformData?.key);
  }
  get isBeiMai() {
    return BEIMAI_PLATFORM === this.platformData?.key;
  }

  onSureClick() {
    if (this.isLocalAuthPlatForms) {
      this.authPlatform();
    } else {
      this.goPlatform();
    }
  }
  authPlatform() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$refs.form.validate((valid, err: any) => {
      if (valid) {
        bindAuthPlatformId({
          platformKey: this.platformData?.key,
          ...this.formData
        }).then(() => {
          this.$message.success({ message: "授权成功！", showClose: true });
          this.refresh();
        });
      } else {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips });
        setTimeout(() => {
          const input: HTMLElement | null = this.$refs.form.$el.querySelector(
            ".is-error input"
          );
          input?.focus();
        });
      }
    });
  }
  goPlatform() {
    const urlAuth = this.license?.urlAuth;
    if (urlAuth) {
      window.open(urlAuth, "platform");
    }
  }

  copyLicenseCode() {
    const clipboard = new Clipboard(".copy-inline-btn");
    clipboard.on("success", () => {
      this.$message.success({ message: "复制成功！", showClose: true });
      clipboard.destroy();
    });
    clipboard.on("error", () => {
      this.$message.error({
        message: "复制失败，请手动复制。",
        showClose: true
      });
      clipboard.destroy();
    });
  }

  async onDealerIdBlur() {
    const warehouses: Warehouses[] = await this.getWarehouses();
    if (warehouses.length) {
      const position = warehouses.find(
        (item: Warehouses) => item.id === this.cacheWarehouse
      );
      if (position) {
        this.formData.warehouse = this.cacheWarehouse;
      } else {
        this.formData.warehouse = null;
      }
    } else {
      this.formData.warehouse = null;
    }
  }
  async getWarehouses() {
    let warehouses: Warehouses[] = [];
    try {
      if (this.formData.dealerId) {
        const res = await getPlatformWarehouses({
          platformKey: this.platformData?.key,
          dealerId: this.formData.dealerId
        });
        if (res && res.length) {
          warehouses = res.map(item => ({
            id: item.facilityId,
            name: item.facilityName
          }));
        }
      }
      return warehouses;
    } catch (e) {
      return warehouses;
    }
  }
  onWarehouseChange(warehouse?: string) {
    if (!warehouse) return;
    this.cacheWarehouse = warehouse;
  }

  getSmsCaptcha() {
    if (!this.formData.phone) {
      this.$message.warning({
        message: `请输入${PLATFORM_MAP[this.platformData?.key]}平台手机号`,
        showClose: true
      });
      return;
    }
    if (validateCellPhone(this.formData.phone)) {
      this.loading = true;
      getPlatformSmsCaptcha({
        platformKey: this.platformData?.key,
        phone: this.formData.phone
      })
        .then(() => {
          this.countdownTime = LIMIT_TIME;
          this.countdown();
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      this.$message.warning({
        message: validateCellPhoneTips,
        showClose: true
      });
    }
  }
  countdown() {
    setTimeout(() => {
      if (this.countdownTime > 0) {
        this.countdownTime--;
        this.countdown();
      }
    }, 1000);
  }

  refresh() {
    this.$emit("updateDate");
    this.updateVisible(false);
  }

  updateVisible(value: boolean) {
    this.$emit("visibleUpdate", value);
  }

  get rules() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validateDisPhone = (rule: any, value: any, callback: Function) => {
      if (validateCellPhone(value)) {
        callback();
      } else {
        callback(new Error(validateCellPhoneTips));
        this.$message.warning({
          message: validateCellPhoneTips,
          showClose: true
        });
      }
    };
    return {
      dealerId: [
        {
          required: true,
          message: `请输入${PLATFORM_MAP[this.platformData?.key]}平台账号ID`,
          trigger: "blur"
        }
      ],
      warehouse: [
        {
          required: true,
          message: `请选择${PLATFORM_MAP[this.platformData?.key]}平台仓库`,
          trigger: "blur"
        }
      ],
      phone: [
        {
          required: true,
          message: `请输入${PLATFORM_MAP[this.platformData?.key]}平台手机号`,
          trigger: "blur"
        },
        {
          validator: validateDisPhone,
          trigger: "blur"
        }
      ],
      smsCaptcha: [
        {
          required: true,
          message: "请输入验证码",
          trigger: "blur"
        }
      ],
      appKey: [
        {
          required: true,
          message: "请输入北迈提供的Appkey",
          trigger: "blur"
        }
      ],
      appSecret: [
        {
          required: true,
          message: "请输入北迈提供的AppSecret",
          trigger: "blur"
        }
      ]
    };
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        title="平台授权"
        on={{ "update:visible": this.updateVisible }}
        close-on-click-modal={false}
        width="600px"
      >
        {this.msg ? (
          <div class="content-box" v-loading={!this.licenseReady}>
            <div class="msg-content"> {this.msg}</div>
            <div class="dialog-footer-align" style="margin: 10px 0 5px 0">
              <el-button
                disabled={!this.licenseReady}
                type="primary"
                size="mini"
                plain
                onClick={this.refresh}
              >
                刷新
              </el-button>
            </div>
          </div>
        ) : (
          <div class="content-box" v-loading={!this.licenseReady}>
            <img class="platform-logo" src={this.platformData?.logo} />
            <el-divider />

            <el-form
              ref="form"
              rules={this.rules}
              show-message={false}
              attrs={{
                model: this.formData
              }}
              class="form-item-small-margin-bottom"
              label-position="right"
              label-width="100px"
              size="mini"
              style="width: 428px; margin: 10px auto;"
            >
              {this.isLocalAuthPlatForms || (
                <Fragment>
                  <el-form-item label="授权码：" label-width="60px">
                    <div style="display: flex;">
                      <ht-input
                        class="copy-inline-input"
                        size="mini"
                        readonly
                        value={this.license?.licenseCode}
                      />
                      <el-button
                        type="primary"
                        size="mini"
                        plain
                        class="copy-inline-btn"
                        data-clipboard-target=".copy-inline-input"
                        disabled={!this.licenseReady}
                        onClick={this.copyLicenseCode}
                      >
                        <i class="el-icon-document-copy" />
                        复制
                      </el-button>
                    </div>
                  </el-form-item>
                  <div class="copy-tips">
                    授权码有效时间为24小时，如超过24小时请重新获取授权码授权
                  </div>
                </Fragment>
              )}

              {this.isNoCheckPlatForms && (
                <Fragment>
                  <el-form-item label="云配管家ID：">
                    <div style="display: flex;">
                      <ht-input
                        size="mini"
                        readonly
                        value={store.userInfoMsg().companyId}
                      />
                      <el-button
                        type="primary"
                        size="mini"
                        plain
                        class="copy-inline-btn"
                        data-clipboard-target=".copy-inline-input"
                        disabled={!this.licenseReady}
                        onClick={this.copyLicenseCode}
                      >
                        <i class="el-icon-document-copy" />
                        复制
                      </el-button>
                    </div>
                  </el-form-item>
                  <el-form-item prop="dealerId" label="平台账号ID：">
                    <ht-input
                      v-model={this.formData.dealerId}
                      v-delay-focus={this.visible}
                      placeholder={this.rules.dealerId[0].message}
                    />
                  </el-form-item>
                </Fragment>
              )}

              {this.isNoCheckNoIdPlatForms && (
                <el-form-item prop="dealerId" label="平台账号ID：">
                  <ht-input
                    v-model={this.formData.dealerId}
                    v-delay-focus={this.visible}
                    placeholder={this.rules.dealerId[0].message}
                  />
                </el-form-item>
              )}

              {this.isAccountWarehouseCheckPlatForms && (
                <Fragment>
                  <el-form-item prop="dealerId" label="平台账号ID：">
                    <ht-input
                      v-model={this.formData.dealerId}
                      v-delay-focus={this.visible}
                      placeholder={this.rules.dealerId[0].message}
                      onBlur={() => this.onDealerIdBlur()}
                    />
                  </el-form-item>
                  <el-form-item prop="warehouse" label="平台仓库：">
                    <ht-autoselect
                      disabled={!this.formData.dealerId}
                      v-model={this.formData.warehouse}
                      fetch-suggestions={() => this.getWarehouses()}
                      remote
                      filter-zero
                      trigger-on-focus={false}
                      highlight-first-item
                      placeholder={this.rules.warehouse[0].message}
                      onChange={this.onWarehouseChange}
                    />
                  </el-form-item>
                </Fragment>
              )}

              {this.isPhoneCaptchaCheckPlatForms && (
                <Fragment>
                  <el-form-item prop="phone" label="平台手机号：">
                    <ht-input
                      v-model={this.formData.phone}
                      v-delay-focus={this.visible}
                      placeholder={this.rules.phone[0].message}
                    />
                  </el-form-item>
                  <el-form-item prop="smsCaptcha" label="验证码：">
                    <div style="display: flex;">
                      <ht-input
                        v-model={this.formData.smsCaptcha}
                        placeholder={this.rules.smsCaptcha[0].message}
                      />
                      <el-button
                        disabled={!!this.countdownTime}
                        v-loading={this.loading}
                        type="primary"
                        size="mini"
                        plain
                        onClick={this.getSmsCaptcha}
                      >
                        {this.countdownTime === 0
                          ? "获取验证码"
                          : `${this.countdownTime}S`}
                      </el-button>
                    </div>
                  </el-form-item>
                </Fragment>
              )}

              {this.isBeiMai && (
                <Fragment>
                  <el-form-item prop="appKey" label="Appkey：">
                    <ht-input
                      v-model={this.formData.appKey}
                      v-delay-focus={this.visible}
                      placeholder={this.rules.appKey[0].message}
                    />
                  </el-form-item>
                  <el-form-item prop="appSecret" label="AppSecret：">
                    <ht-input
                      v-model={this.formData.appSecret}
                      placeholder={this.rules.appSecret[0].message}
                    />
                  </el-form-item>
                </Fragment>
              )}
            </el-form>

            <pre class="tips">{this.platformData?.manual}</pre>
            <div class="dialog-footer-align" style="margin: 10px 0 5px 0">
              <el-button
                disabled={!this.licenseReady}
                type="primary"
                size="mini"
                plain
                onClick={this.onSureClick}
              >
                {this.isLocalAuthPlatForms ? "授权" : "去授权"}
                （F3）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                plain
                onClick={() => this.updateVisible(false)}
              >
                取消（Esc）
              </el-button>
            </div>
          </div>
        )}
      </ht-dialog>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.msg-content {
  line-height: 100px;
}

.content-box {
  text-align: center;
  .platform-logo {
    margin: auto;
    display: block;
  }
  ::v-deep.el-divider {
    margin: 15px auto;
    width: 440px;
  }
  .copy-tips {
    margin-top: 10px;
    color: $color-text-secondary;
  }
}

.tips {
  text-align: left;
  white-space: pre-wrap;
  width: 440px;
  margin: 20px auto 0 auto;
  font-size: 12px;
}
</style>
