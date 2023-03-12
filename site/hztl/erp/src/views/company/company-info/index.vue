<template>
  <section class="container-box">
    <ht-card
      v-switch-focus="focusData"
      no-padding
      class="auto-card"
      style="overflow: auto;"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        :disabled="!canEdit()"
        :show-message="false"
        label-position="left"
        label-width="75px"
        size="mini"
        class="form-item-small-margin-bottom header-form-width-small"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <ht-card title="基本信息" class="container-space">
              <el-form-item label="公司名称" prop="name">
                <ht-input
                  v-model.trim="ruleForm.name"
                  :disabled="!canEdit()"
                  class="switch-focus focus-name"
                  maxlength="50"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item label="公司简称">
                <ht-input
                  v-model.trim="ruleForm.shortName"
                  :disabled="!canEdit()"
                  class="switch-focus focus-shortName"
                  maxlength="10"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item label="公司类型" prop="type">
                <el-radio-group v-model="ruleForm.type" class="company-types">
                  <el-radio
                    v-for="(companyType,
                    index) in store().companyTypeDictionary()"
                    :key="index"
                    :label="companyType.name"
                  />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="公司标识" prop="ident">
                <ht-input
                  v-model.trim="Abbreviation"
                  :disabled="!canEdit()"
                  class="switch-focus focus-ident"
                  placeholder="账套内公司单据前缀标识"
                  maxlength="5"
                  @intput-enter="debouncedHandleInputEnter"
                >
                  <el-popover
                    placement="top"
                    slot="append"
                    trigger="hover"
                    content="用于ERP中所有业务单据前缀标识，仅能使用英文。"
                  >
                    <el-button
                      slot="reference"
                      icon="el-icon-question"
                    ></el-button>
                  </el-popover>
                </ht-input>
              </el-form-item>
              <el-form-item label="所属区域" prop="areaIds">
                <area-select
                  v-model="ruleForm.areaIds"
                  :disabled="!canEdit()"
                />
              </el-form-item>
            </ht-card>
            <ht-card title="开票信息" class="container-space">
              <el-form-item label="发票抬头">
                <ht-input
                  v-model="ruleForm.invoiceTitle"
                  :disabled="!canEdit()"
                  class="switch-focus focus-invoiceTitle"
                  maxlength="50"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item label="税号">
                <ht-input
                  v-model="changeSocialCreditCode"
                  :disabled="!canEdit()"
                  class="switch-focus focus-bizLicenceCode"
                  placeholder="统一社会信用代码"
                  maxlength="18"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <ht-input
                  v-model="ruleForm.address"
                  :disabled="!canEdit()"
                  class="switch-focus focus-address"
                  maxlength="50"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item label="开户银行">
                <ht-input
                  v-model="ruleForm.bankName"
                  :disabled="!canEdit()"
                  class="switch-focus focus-bankName"
                  maxlength="50"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item label="银行账户">
                <ht-input
                  v-model="ruleForm.bankAccount"
                  :disabled="!canEdit()"
                  class="switch-focus focus-bankAccount"
                  maxlength="50"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item label="公司电话">
                <ht-input
                  v-model="ruleForm.invoicePhone"
                  :disabled="!canEdit()"
                  class="switch-focus focus-invoicePhone"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
            </ht-card>
            <ht-card title="联系方式">
              <div style="display: flex;">
                <el-form-item label="联系人" prop="contacts">
                  <ht-input
                    v-model="ruleForm.contacts"
                    :disabled="!canEdit()"
                    class="switch-focus focus-contacts"
                    placeholder="联系人姓名"
                    maxlength="10"
                    @intput-enter="debouncedHandleInputEnter"
                  />
                </el-form-item>
                <el-form-item
                  label
                  label-width="0px"
                  prop="phone"
                  style="flex: auto;"
                >
                  <ht-input
                    v-model="ruleForm.phone"
                    :disabled="!canEdit()"
                    class="switch-focus focus-phone"
                    placeholder="联系人电话"
                    @intput-enter="debouncedHandleInputEnter"
                  />
                </el-form-item>
              </div>
              <div style="display: flex;">
                <el-form-item label="联系人1">
                  <ht-input
                    v-model="ruleForm.contacts1"
                    :disabled="!canEdit()"
                    class="switch-focus focus-contacts1"
                    placeholder="联系人姓名"
                    maxlength="10"
                    @intput-enter="debouncedHandleInputEnter"
                  />
                </el-form-item>
                <el-form-item label label-width="0px" style="flex: auto;">
                  <ht-input
                    v-model="ruleForm.phone1"
                    :disabled="!canEdit()"
                    class="switch-focus focus-phone1"
                    placeholder="联系人电话"
                    @intput-enter="debouncedHandleInputEnter"
                  />
                </el-form-item>
              </div>
              <div style="display: flex;">
                <el-form-item label="联系人2">
                  <ht-input
                    v-model="ruleForm.contacts2"
                    class="switch-focus focus-contacts2"
                    placeholder="联系人姓名"
                    maxlength="10"
                    @intput-enter="debouncedHandleInputEnter"
                  />
                </el-form-item>
                <el-form-item label label-width="0px" style="flex: auto;">
                  <ht-input
                    v-model="ruleForm.phone2"
                    class="switch-focus focus-phone2"
                    placeholder="联系人电话"
                    @intput-enter="debouncedHandleInputEnter"
                  />
                </el-form-item>
              </div>
              <div style="display: flex;">
                <el-form-item label="联系人3">
                  <ht-input
                    v-model="ruleForm.contacts3"
                    class="switch-focus focus-contacts3"
                    placeholder="联系人姓名"
                    maxlength="10"
                    @intput-enter="debouncedHandleInputEnter"
                  />
                </el-form-item>
                <el-form-item label label-width="0px" style="flex: auto;">
                  <ht-input
                    v-model="ruleForm.phone3"
                    class="switch-focus focus-phone3"
                    placeholder="联系人电话"
                    @intput-enter="debouncedHandleInputEnter"
                  />
                </el-form-item>
              </div>
            </ht-card>
          </el-col>
          <el-col :span="12">
            <ht-card title="其他信息" class="container-space">
              <el-form-item label="企业网站">
                <ht-input
                  v-model="ruleForm.website"
                  :disabled="!canEdit()"
                  class="switch-focus focus-website"
                  maxlength="100"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item label="企业公众号">
                <ht-input
                  v-model="ruleForm.wechatPa"
                  :disabled="!canEdit()"
                  class="switch-focus focus-wechatPa"
                  maxlength="50"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item label="备注">
                <ht-input
                  v-model="ruleForm.remarks"
                  :disabled="!canEdit()"
                  class="switch-focus focus-remarks"
                  maxlength="200"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
            </ht-card>
            <!-- <ht-card
              v-if="!isRegister && !isAddType"
              title="邀请码"
              class="container-space"
            >
              <el-form-item label="员工邀请码">
                <div style="display: flex;">
                  <ht-input
                    v-model="ruleForm.staffInviteCode"
                    class="invite-code"
                    readonly
                  />
                  <el-button
                    :data-clipboard-text="ruleForm.staffInviteCode"
                    class="copy-staff"
                    type="text"
                    size="mini"
                    @click="copyCode('copy-staff')"
                  >
                    复制
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item label="客户邀请码">
                <div style="display: flex;">
                  <ht-input
                    v-model="ruleForm.customerInviteCode"
                    class="invite-code"
                    readonly
                  />
                  <el-button
                    :data-clipboard-text="ruleForm.customerInviteCode"
                    class="copy-customer"
                    type="text"
                    size="mini"
                    @click="copyCode('copy-customer')"
                  >
                    复制
                  </el-button>
                </div>
              </el-form-item> 
            </ht-card> -->
            <ht-card title="公司徽章" class="container-space">
              <span
                slot="after-title"
                class="img-tips"
                style="margin-left: 10px"
              >
                支持jpg、png格式，不能大于2MB。
              </span>
              <el-form-item label label-width="0px">
                <srimg-upload
                  v-if="showImg"
                  :disabled="!canEdit()"
                  :file-list="companyImgFileList"
                  :limit="1"
                  :max-size="2"
                  class="payment-voucher-img"
                  @get-file-list="getFileList"
                />
              </el-form-item>
            </ht-card>
            <ht-card title="营业执照">
              <span
                slot="after-title"
                class="img-tips"
                style="margin-left: 10px"
              >
                支持jpg、png格式，不能大于2MB。
              </span>
              <el-form-item label label-width="0px">
                <srimg-upload
                  v-if="showImg"
                  :disabled="!canEdit()"
                  :file-list="bussinessImgFileList"
                  :limit="1"
                  :max-size="2"
                  class="payment-voucher-img"
                  @get-file-list="getBusFileList"
                />
              </el-form-item>
            </ht-card>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <div class="footer" style="text-align: center; height: 38px;">
      <el-button
        v-show="canEdit()"
        :loading="isSuccess"
        type="primary"
        size="mini"
        plain
        @click="submitForm"
      >
        {{ btnText }}
      </el-button>
      <el-button
        v-show="isDialog"
        type="primary"
        size="mini"
        plain
        @click="hideBox"
      >
        取消（Ecs）
      </el-button>
    </div>
  </section>
</template>

<script>
import SrImgUpload from "@/components/base/SrImgUpload"; // 公司资料导入图片
import AreaSelect from "@/components/select/AreaSelect";
import {
  createBranchCompany,
  createMyCompany,
  getCompanyInfo,
  getMyCompanyInfo,
  getMyCreateCompanyInfo,
  updateCompnayInfo,
  updateMyCreateCompnayInfo
} from "@/api/company/company";
import { commonValidator } from "../mixin";
import { mapActions } from "vuex";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";
import Clipboard from "clipboard";
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import { mapState } from "vuex";

let oldKeyScope;
const defaultForm = {
  name: "",
  shortName: "",
  type: "",
  ident: "",
  areaIds: [],
  webside: "",
  wechatPa: "",
  remarks: "",
  staffInviteCode: "",
  customerInviteCode: "",
  id: null,
  invoiceTitle: "",
  bizLicenceCode: "",
  bankName: "",
  bankAccount: "",
  address: "",
  invoicePhone: "",
  contacts: "",
  phone: "",
  contacts1: "",
  phone1: ""
};

export default {
  name: "CompanyInfo",
  components: {
    "srimg-upload": SrImgUpload,
    AreaSelect
  },
  mixins: [commonValidator, searchMixin],
  props: {
    isRegister: Boolean,
    isAddType: Boolean,
    isDialog: Boolean,
    visible: Boolean,
    companyId: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      keyScope: Symbol("CompanyInfo"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      ruleForm: {
        ...defaultForm
      },
      companyImgFileList: [],
      bussinessImgFileList: [],
      isSuccess: false,
      contactsArr: [],
      showImg: true
    };
  },
  computed: {
    ...mapState("admin/myCompnayInfo", ["myCompnayInfoData"]),
    Abbreviation: {
      get: function() {
        return this.ruleForm.ident;
      },
      set: function(value) {
        this.ruleForm.ident = value.toUpperCase();
      }
    },
    changeSocialCreditCode: {
      get: function() {
        return this.ruleForm.bizLicenceCode;
      },
      set: function(value) {
        this.ruleForm.bizLicenceCode = value.toUpperCase();
      }
    },
    btnText() {
      return this.isAddType ? "提交（F3）" : "保存（F3）";
    }
  },
  watch: {
    visible: {
      handler(value, oldValue) {
        if (value) {
          this.ruleForm = { ...defaultForm };
          this.showImg = true;
          this.companyImgFileList = [];
          this.bussinessImgFileList = [];
          oldKeyScope = hotkeys.getScope();
          setTimeout(() => {
            this.updateFocusData({ initial: "focus-name" });
            hotkeys.setScope(this.keyScope);
            this.$refs.ruleForm.clearValidate();
          }, 100);
          if (this.isAddType && !this.isRegister) {
            this.ruleForm.type = "经销商";
          } else {
            this.initFormData();
          }
        } else if (oldValue) {
          hotkeys.setScope(oldKeyScope);
          this.showImg = false;
        }
      },
      immediate: true
    }
  },
  mounted() {
    hotkeys("f3,up,down", { scope: this.keyScope }, (e, handler) => {
      switch (handler.key) {
        case "f3":
          this.submitForm();
          break;
        case "up":
        case "down":
          e.preventDefault();
          this.updateFocusData({ type: handler.key });
          break;
        default:
      }
    });
  },
  async activated() {
    if (!this.isDialog && !this.isRegister) {
      await this.$store.dispatch("admin/myCompnayInfo/loadAll");
      const parmas = this.myCompnayInfoData;
      this.ruleForm = {
        ...defaultForm,
        ...parmas,
        areaIds: parmas.areaIds || []
      };
      this.localData(parmas);
    }
    if (!this.isDialog) {
      if (!this.showImg) {
        this.showImg = true;
      }
      this.$refs.ruleForm.clearValidate();
      hotkeys.setScope(this.keyScope);
      this.$nextTick(() => {
        this.updateFocusData({ initial: "focus-name" });
      });
    }
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    store() {
      return store;
    },
    ...mapActions("admin/baseData", ["loadAllCompanies"]),
    handleInputEnter() {
      this.updateFocusData({ type: "down" });
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    async initFormData() {
      this.companyImgFileList = [];
      this.bussinessImgFileList = [];
      if (this.isRegister) {
        getMyCreateCompanyInfo()
          .then(res => {
            this.ruleForm = {
              ...defaultForm,
              ...res,
              areaIds: res.areaIds || []
            };
            this.localData(res);
          })
          .catch(() => {});
      } else {
        if (!this.myCompnayInfoData) {
          await this.$store.dispatch("admin/myCompnayInfo/loadAll");
        }
        if (this.ruleForm.id === this.myCompnayInfoData.id) {
          getMyCompanyInfo()
            .then(res => {
              this.ruleForm = {
                ...defaultForm,
                ...res,
                areaIds: res.areaIds || []
              };
              this.localData(res);
            })
            .catch(() => {});
        } else {
          getCompanyInfo(this.companyId)
            .then(res => {
              this.ruleForm = {
                ...defaultForm,
                ...res,
                areaIds: res.areaIds || []
              };
              this.localData(res);
            })
            .catch(() => {});
        }
      }
    },
    async localData(data) {
      if (data.emblem) {
        this.companyImgFileList = [
          {
            name: "",
            url: data.emblem,
            origin: data.emblem
          }
        ];
      } else {
        this.companyImgFileList = [];
      }
      if (data.licencesPic) {
        this.bussinessImgFileList = [
          {
            name: "",
            url: data.licencesPic,
            origin: data.licencesPic
          }
        ];
      } else {
        this.bussinessImgFileList = [];
      }
      setTimeout(() => {
        this.$refs.ruleForm.clearValidate();
      }, 100);
    },
    canEdit() {
      if (this.isAddType) {
        return this.hasAutoPerm("create");
      } else {
        return this.hasAutoPerm("write") || this.hasAutoPerm("update");
      }
    },
    getFileList(fileList) {
      this.companyImgFileList = fileList;
    },
    getBusFileList(fileList) {
      this.bussinessImgFileList = fileList;
    },
    handleAdd(arr) {
      this.ruleForm.vehBrands = [...arr];
    },
    handleAddBrands(arr) {
      this.ruleForm.brands = [...arr];
    },
    copyCode(codeType) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this = this;
      const clipboard = new Clipboard(`.${codeType}`);
      clipboard.on("success", function() {
        _this.$message.success({ message: "复制成功！", showClose: true });
        clipboard.destroy();
      });
      clipboard.on("error", function() {
        _this.$message.error({
          message: "复制失败，请手动复制。",
          showClose: true
        });
        clipboard.destroy();
      });
    },
    submitForm() {
      if (this.isSuccess) return;
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          this.isSuccess = true;
          if (this.companyImgFileList.length) {
            this.ruleForm.emblem = this.companyImgFileList[0].origin;
          } else {
            this.ruleForm.emblem = "";
          }
          if (this.bussinessImgFileList.length) {
            this.ruleForm.licencesPic = this.bussinessImgFileList[0].origin;
          } else {
            this.ruleForm.licencesPic = "";
          }
          this.ruleForm = {
            ...this.ruleForm,
            areaId: this.ruleForm.areaIds[2],
            isWeb: true
          };
          if (this.isRegister) {
            if (this.isAddType && !this.ruleForm.id) {
              createMyCompany({ ...this.ruleForm })
                .then(res => {
                  this.isSuccess = false;
                  if (res && res.bizCode && res.bizCode.repeat) {
                    this.$alert(
                      `税号与公司「${res.bizCode.repeatCompanyName}」重复，请修改！`,
                      "提示"
                    );
                  } else {
                    this.$message.success({
                      message: "提交申请成功！",
                      showClose: true
                    });
                    this.$emit("on-success");
                    if (this.isDialog) {
                      this.hideBox();
                    }
                  }
                })
                .catch(() => {
                  this.isSuccess = false;
                });
            } else {
              updateMyCreateCompnayInfo({ ...this.ruleForm })
                .then(res => {
                  this.isSuccess = false;
                  if (res && res.repeat) {
                    this.$alert(
                      `税号与公司「${res.repeatCompanyName}」重复，请修改！`,
                      "提示"
                    );
                  } else {
                    const msg = this.isAddType
                      ? "提交申请成功！"
                      : "保存成功！";
                    this.$message.success({
                      message: msg,
                      showClose: true
                    });
                    this.$emit("on-success");
                    if (this.isDialog) {
                      this.hideBox();
                    }
                  }
                })
                .catch(() => {
                  this.isSuccess = false;
                });
            }
          } else {
            if (this.isAddType) {
              createBranchCompany({ ...this.ruleForm })
                .then(res => {
                  if (res && res.repeat) {
                    this.$alert(
                      `税号与公司「${res.repeatCompanyName}」重复，请修改！`,
                      "提示"
                    );
                  } else {
                    this.isSuccess = false;
                    this.$message.success({
                      message: "提交成功！",
                      showClose: true
                    });
                    // 需要更新本地账套公司列表
                    this.loadAllCompanies(true);
                    this.$emit("on-success");
                    if (this.isDialog) {
                      this.hideBox();
                    }
                  }
                })
                .catch(() => {
                  this.isSuccess = false;
                });
            } else {
              updateCompnayInfo({ ...this.ruleForm })
                .then(res => {
                  if (res && res.repeat) {
                    this.$alert(
                      `税号与公司「${res.repeatCompanyName}」重复，请修改！`,
                      "提示"
                    );
                  } else {
                    this.$message.success({
                      message: "保存成功！",
                      showClose: true
                    });
                    this.isSuccess = false;
                    // 更新公司信息后，需要更新本地公司列表
                    this.loadAllCompanies(true);
                    this.$emit("on-success");
                    if (this.isDialog) {
                      this.hideBox();
                    }
                  }
                })
                .catch(() => {
                  this.isSuccess = false;
                });
            }
          }
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    hideBox() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
<style lang="stylus" scoped>
.container-space {
  margin-bottom: -10px;
}

.invite-code {
  /deep/.el-input__inner {
    color: #409fff;
    border: none;
    background-color: #FBFBFB;
  }
}

.company-types {
  /deep/.el-radio {
    margin-right: 15px;

    .el-radio__label {
      padding: 0;
      margin-left: 5px;
    }
  }
}

.payment-voucher-img {
  width: 120px;
  height: 120px;
  overflow: hidden;
}
</style>
