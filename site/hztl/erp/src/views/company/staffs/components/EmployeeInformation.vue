<template>
  <ht-dialog
    v-switch-focus="focusData"
    v-bind="$attrs"
    :title="dialogTitle"
    class="dialog-body"
    width="1200px"
    append-to-body
    v-on="$listeners"
    @close="handleUpdateTable"
  >
    <section v-loading="dilogLoading" class="container-box">
      <ht-tabs v-model="activeTab" :tabs="TABS" class="tabs-regular" />
      <el-form
        v-show="activeTab === 'BaseInfo'"
        ref="staffRuleForm"
        :model="ruleForm"
        :rules="staffRules"
        :show-message="false"
        :disabled="isDisabled"
        label-width="74px"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="5" style="margin-top: 8px">
          <el-col :span="8" style="height: 399px;">
            <ht-card title="基本信息" class="staff-box-card">
              <el-form-item label="编号" prop="staffNumber">
                <ht-input v-model="ruleForm.staffNumber" disabled />
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <ht-input v-model="ruleForm.phone" disabled />
              </el-form-item>
              <el-form-item label="真实姓名" prop="realName">
                <ht-input
                  v-model="ruleForm.realName"
                  maxlength="10"
                  class="switch-focus focus-realName"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item label="显示姓名" prop="staffName">
                <ht-input
                  v-model="ruleForm.staffName"
                  class="switch-focus focus-staffName"
                  maxlength="10"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item prop="certType" label="证件类型">
                <ht-autoselect
                  v-model="ruleForm.certType"
                  :trigger-on-focus="false"
                  :options="store().credentialsDictionary()"
                  class="switch-focus focus-certType"
                  placeholder="请选择"
                  mnemonic
                  highlight-first-item
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item label="证件号码" prop="certNumber">
                <ht-input
                  v-model="ruleForm.certNumber"
                  class="switch-focus focus-certNumber"
                  maxlength="30"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item label="出生日期" prop="birthday">
                <el-date-picker
                  v-model="ruleForm.birthday"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                />
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <div style="line-height: 28px;">
                  <el-radio-group v-model="ruleForm.gender">
                    <el-radio :label="1">
                      男
                    </el-radio>
                    <el-radio :label="2">
                      女
                    </el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
              <el-form-item prop="diploma" label="学历">
                <ht-autoselect
                  v-model="ruleForm.diploma"
                  :trigger-on-focus="false"
                  :options="store().educationDictionary()"
                  class="switch-focus focus-certType"
                  placeholder="请选择"
                  mnemonic
                  highlight-first-item
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
              <el-form-item label="联系地址" prop="address">
                <ht-input
                  v-model="ruleForm.address"
                  class="switch-focus focus-address"
                  maxlength="200"
                  @intput-enter="debouncedHandleInputEnter"
                />
              </el-form-item>
            </ht-card>
          </el-col>
          <el-col :span="8" style="height: 399px;">
            <ht-card title="职位信息" class="staff-box-card">
              <el-form-item label="状态" prop="staffStatus">
                <ht-input v-model="staffStatus" disabled />
              </el-form-item>
              <el-form-item label="入职日期" prop="joinedDay">
                <ht-input v-model="ruleForm.joinedDay" disabled />
              </el-form-item>
              <el-form-item label="部门" prop="departsArr">
                <el-cascader
                  v-model="departsArr"
                  :options="areaDepartsArr"
                  :props="{ value: 'id', label: 'name' }"
                />
              </el-form-item>
              <el-form-item :error="rolesErrMsg" label="角色" required>
                <ht-autoselect
                  v-model="rolesOption"
                  :options="rolesArr"
                  :trigger-on-focus="false"
                  class="switch-focus focus-rolesOption"
                  placeholder="请选择"
                  highlight-first-item
                  @intput-enter="debouncedHandleInputEnter"
                  @change="addRoles"
                />
              </el-form-item>
              <div
                style="background-color: #e7ebed; height: 214px; border-radius: 4px; padding-left: 4px; overflow-y:auto"
              >
                <el-tag
                  v-for="(tag, index) in rolesList"
                  :key="index"
                  :closable="tag.closable"
                  @close="handleClose(tag)"
                  style="margin-top: 4px; margin-right: 4px;"
                >
                  {{ tag.name }}
                </el-tag>
              </div>
            </ht-card>
          </el-col>
          <el-col :span="8" style="height: 399px;">
            <ht-card title="其他信息" class="staff-box-card">
              <span>头像</span>
              <el-form-item label-width="0px">
                <sr-img-upload
                  :file-list="staffsImgFileList"
                  :limit="1"
                  :tip="'支持jpg、png，不能大于   2MB'"
                  :max-size="2"
                  :disabled="isDisabled"
                  @get-file-list="getFileList"
                />
              </el-form-item>
              <span>备注</span>
              <el-form-item label-width="0" prop="remark">
                <ht-input
                  v-model="ruleForm.remark"
                  :autosize="{ minRows: 6, maxRows: 8 }"
                  maxlength="200"
                  resize="none"
                  show-word-limit
                  type="textarea"
                  placeholder="最多支持200个字符"
                />
              </el-form-item>
            </ht-card>
          </el-col>
        </el-row>
      </el-form>
      <el-form
        v-show="activeTab === 'AdvancedProperty'"
        :model="ruleForm"
        :rules="advancedPropertyRule"
        label-width="92px"
        :disabled="isDisabled"
        size="mini"
        ref="advancedPropertyForm"
        class="form-item-small-margin-bottom advancedPropertyFrom"
      >
        <el-row :gutter="5" style="margin-top: 8px">
          <el-col :span="9" style="height: 399px;">
            <ht-card title="管辖分公司" class="staff-box-card">
              <div class="company-list">
                <el-checkbox-group
                  :disabled="isSystemAdmin"
                  v-model="ruleForm.manageCompanyIds"
                  @change="handleCompanyChange"
                >
                  <p v-for="company in manageCompanies" :key="company.id">
                    <el-checkbox :label="company.id">{{
                      company.name
                    }}</el-checkbox>
                  </p>
                </el-checkbox-group>
              </div>
            </ht-card>
          </el-col>
          <el-col :span="15" style="height: 399px;">
            <ht-card title="价格权限" class="staff-box-card">
              <div style="width:350px">
                <el-form-item label="销售价格底线" prop="salePriceType">
                  <div class="flex flex-center">
                    <ht-autoselect
                      style="width:130px"
                      v-model="ruleForm.salePriceType"
                      :options="defaultPriceType"
                      :trigger-on-focus="false"
                      class="switch-focus focus-customerForm-priceType"
                      placeholder="请选择"
                      clearable
                      highlight-first-item
                      @intput-enter="debouncedHandleInputEnter"
                    />
                    <el-tooltip :enterable="false" placement="bottom">
                      <div slot="content">
                        设置销售价格底线，销售时将会检查销售价格是否在员工销售价格底线上下限范围内。
                        <br />
                        上限价格 = 销售价格底线价格 * （1+上限系数）
                        <br />
                        下限价格 = 销售价格底线价格 * （1+下限系数）
                        <br />
                        注：未设置销售价格底线价格类型，不检查。
                        <br />
                        未启用上限，将不检查上限。
                      </div>
                      <i class="el-icon-question text-font-primary font-16"></i>
                    </el-tooltip>
                    <div class="text-font-primary m-l--6">享受价格使用</div>
                  </div>
                </el-form-item>
                <el-form-item label=" " prop="bargainUpperRate" class="m-t-6">
                  <el-row>
                    <el-col :span="10">
                      <el-checkbox
                        size="small"
                        :disabled="!ruleForm.salePriceType"
                        v-model="ruleForm.flags.allowBargainUpper"
                        >议价上限</el-checkbox
                      >
                    </el-col>
                    <el-col :span="14">
                      <ht-format-number
                        v-model="ruleForm.bargainUpperRate"
                        placeholder="0"
                        :max="1000"
                        :min="-100"
                        precision-type="qty"
                        :disabled="
                          !ruleForm.salePriceType ||
                            !ruleForm.flags.allowBargainUpper
                        "
                        @blur="validateForm"
                      >
                        <template slot="append">%</template>
                      </ht-format-number>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label=" " prop="bargainLowerRate">
                  <el-row>
                    <el-col :span="10">
                      <el-checkbox size="small" disabled :value="true"
                        >议价下限</el-checkbox
                      >
                    </el-col>
                    <el-col :span="14">
                      <ht-format-number
                        v-model="ruleForm.bargainLowerRate"
                        :disabled="!ruleForm.salePriceType"
                        :max="1000"
                        :min="-100"
                        clearable
                        placeholder="0"
                        precision-type="qty"
                        @blur="validateForm"
                      >
                        <template slot="append">%</template>
                      </ht-format-number>
                      <!-- <ht-input
                        
                        class="switch-focus focus-customerForm-bargainLowerRate"
                        placeholder="0"
                        type="number"
                        onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                        
                      >
                        
                      </ht-input> -->
                    </el-col>
                  </el-row>
                </el-form-item>
              </div>
            </ht-card>
          </el-col>
        </el-row>
      </el-form>
    </section>
    <div slot="footer" class="dialog-footer-align">
      <el-button
        :disabled="!isPreSave"
        type="primary"
        size="mini"
        plain
        @click="handleSubmitForm"
      >
        保存(F3)
      </el-button>
      <el-button type="primary" size="mini" plain @click="handleCloseDialog">
        取消(Esc)
      </el-button>
    </div>
    <ChangeCooperatorManager
      :visible.sync="showChangeCooperatorManagerBox"
      :is-purchase-man="isPurchaseMan"
      :is-sales-man="isSalesMan"
      :staff-id="staffId"
      @on-change="handleRoleChange"
    />
  </ht-dialog>
</template>

<script>
import debounce from "throttle-debounce/debounce";
import SrImgUpload from "@/components/base/SrImgUpload"; // 员工管理-头像上传
import {
  checkStaffs,
  getAllDepartments,
  staffsInformation,
  updateStaffs,
  getManageCompanies
} from "@/api/company/company";
import { resRoles } from "@/api/base/base";
import ChangeCooperatorManager from "./ChangeCooperatorManager";
import { mapActions } from "vuex";
import hotkeys from "hotkeys-js";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";

let lastKeyScope;

export default {
  name: "EmployeeInformation",
  components: {
    SrImgUpload,
    ChangeCooperatorManager
  },
  mixins: [searchMixin],
  props: {
    staffId: {
      type: [String, Number],
      defualt: null
    },
    type: {
      type: String,
      defualt: ""
    }
  },
  data() {
    const lowerRateValidater = (rule, value, callback) => {
      if (!this.ruleForm.flags.allowBargainLower || Number(value) === 0) {
        return callback();
      }
      //上限必须大于下限
      if (Number(this.ruleForm.bargainUpperRate || 0) < Number(value || 0)) {
        return callback(new Error("议价下限必须小于等于议价上限"));
      }
      return callback();
    };
    const upperRateValidater = (rule, value, callback) => {
      if (!this.ruleForm.flags.allowBargainUpper || Number(value) === 0) {
        return callback();
      }
      //上限必须大于下限
      if (Number(value || 0) < Number(this.ruleForm.bargainLowerRate || 0)) {
        return callback(new Error("议价上限必须大于等于议价下限"));
      }
      return callback();
    };
    return {
      defaultPriceType: [
        { id: "调拨价", name: "调拨价" },
        { id: "平台价", name: "平台价" },
        { id: "零售价", name: "零售价" },
        { id: "批发价", name: "批发价" },
        { id: "批发价一", name: "批发价一" },
        { id: "批发价二", name: "批发价二" },
        { id: "批发价三", name: "批发价三" },
        { id: "批发价四", name: "批发价四" }
      ],
      TABS: [
        { name: "基本信息", id: "BaseInfo" },
        { name: "高级属性", id: "AdvancedProperty" }
      ],
      activeTab: "BaseInfo",
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      keyScope: Symbol("EmployeeInformation"),
      staffsImgFileList: [],
      areaDepartsArr: [],
      departsArr: [],
      rolesArr: [],
      rolesList: [],
      manageCompanies: [],
      showChangeCooperatorManagerBox: false,
      isPurchaseMan: false,
      isSalesMan: false,
      dilogLoading: false,
      rolesOption: "",
      ruleForm: {
        realName: "",
        manageCompanyIds: [],
        roles: [],
        flags: {
          allowBargainUpper: false,
          allowBargainLower: true
        }
      },
      localStaffStatus: {
        0: "在职",
        1: "在职",
        2: "已离职",
        3: "已拒绝"
      },
      staffRules: {
        "staff.staffNumber": [
          { required: true, trigger: "change", message: "请输入员工编号" }
        ],
        "staff.staffName": [
          { required: true, trigger: "change", message: "请输入姓名" }
        ],
        "staff.realName": [
          { required: true, trigger: "change", message: "请输入真实姓名" }
        ],
        "staff.phone": [
          { required: true, trigger: "change", message: "请输入手机号" }
        ]
      },
      rolesErrMsg: "",
      advancedPropertyRule: {
        bargainLowerRate: [
          {
            validator: lowerRateValidater,
            trigger: ["change"]
          }
        ],
        bargainUpperRate: [
          {
            validator: upperRateValidater,
            trigger: ["change"]
          }
        ]
      }
    };
  },
  computed: {
    staffStatus() {
      return this.localStaffStatus[this.ruleForm.status];
    },
    isDisabled() {
      return (
        this.ruleForm.status === 2 ||
        !this.hasBelongsPerm("update", this.ruleForm.belongs)
      );
    },
    isPreSave() {
      return this.type === "staffsTable"
        ? this.ruleForm.status === 1 &&
            this.hasBelongsPerm("update", this.ruleForm.belongs)
        : true;
    },
    dialogTitle() {
      return this.type === "staffsTable" ? "编辑员工" : "审核通过-新员工设置";
    },
    isSystemAdmin() {
      let isAdmin = false;
      this.rolesList.forEach(role => {
        if (role.id == "systemAdmin") {
          isAdmin = true;
        }
      });
      return isAdmin;
    }
  },
  watch: {
    "$attrs.visible": {
      handler(val, oldVal) {
        if (val) {
          lastKeyScope = hotkeys.getScope();
          this.loadRoles();
        } else if (oldVal) {
          this.resetForm();
          hotkeys.setScope(lastKeyScope);
        }
      },
      immediate: true
    },
    rolesList: {
      handler() {
        if (this.isSystemAdmin) {
          this.ruleForm.manageCompanyIds = this.manageCompanies
            ? this.manageCompanies.map(item => item.id)
            : [];
        }
      },
      deep: true
    }
  },
  mounted() {
    hotkeys("f3,up,down", { scope: this.keyScope }, (e, handler) => {
      if (!e.ctrlKey) {
        switch (handler.key) {
          case "f3":
            this.handleSubmitForm();
            break;
          case "up":
          case "down":
            e.preventDefault();
            this.updateFocusData({
              type: handler.key
            });
            break;
        }
      }
    });
  },
  methods: {
    store() {
      return store;
    },
    ...mapActions("admin/staffs", ["loadAll"]),
    handleCompanyChange(value) {
      console.log(value);
    },
    validateForm() {
      this.$refs.advancedPropertyForm.validate();
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    handleInputEnter() {
      this.updateFocusData({ type: "down" });
    },
    async loadRoles() {
      this.dilogLoading = true;
      const res = await resRoles();
      this.rolesArr = res;
      const res2 = await staffsInformation(this.staffId);
      const res3 = await getAllDepartments({ companyId: res2.companyId });
      const res4 = await getManageCompanies({ companyId: res2.companyId });
      this.loadStaffInformation(res, res2, res3, res4);
    },
    async loadStaffInformation(res, res2, res3, res4) {
      // this.rolesArr = res
      // this.rolesArr = res.map(item => {
      //     return {...item, disabled: false}
      // })
      // const res = await staffsInformation(this.staffId)
      // const res2 = await getAllDepartments()
      this.loadCompanyDepartments(res2, res3, res4);
    },
    async loadCompanyDepartments(res, res2, res3) {
      res.bargainUpperRate = parseFloat(res.bargainUpperRate || 0) * 100;
      res.bargainLowerRate = parseFloat(res.bargainLowerRate || 0) * 100;
      this.ruleForm = res;
      this.ruleForm.flags.allowBargainLower = true;
      if (res && !res.realName) {
        this.$set(this.ruleForm, "realName", res.staffName);
      }
      if (res.departmentId) {
        this.departsArr = []; //初始化一次
        this.departsArr.push(res.departmentId);
      }
      if (res.avatarUrl) {
        this.staffsImgFileList = []; //初始化一次
        this.staffsImgFileList.push({
          name: "staffs",
          url: res.avatarUrl,
          origin: res.avatarUrl
        });
      }
      if (!this.ruleForm.manageCompanyIds) {
        this.ruleForm.manageCompanyIds = [];
      }
      if (res.roles && res.roles.length) {
        this.rolesList = []; // 初始化一次
        res.roles.forEach(item => {
          const _item = this.rolesArr.find(child => child.id == item);
          if (_item) {
            if (_item.id === "companyAdmin" || this.isDisabled) {
              _item.closable = false;
            } else {
              _item.closable = true;
            }
            this.rolesList.push({ ..._item });

            const _index = this.rolesArr.findIndex(
              item => item.id === _item.id
            );
            this.rolesArr.splice(_index, 1);
          }
          // _item.disabled = true;
        });
      }
      const staffDepartment = res2;
      this.areaDepartsArr = staffDepartment || [];
      this.manageCompanies = res3;
      this.dilogLoading = false;
      this.updateFocusData({ initial: "focus-realName" });
      hotkeys.setScope(this.keyScope);
    },
    getFileList(fileList) {
      this.staffsImgFileList = fileList;
    },
    addRoles(val) {
      if (!val) return;
      this.rolesErrMsg = "";
      let flag;
      for (let i = 0; i < this.rolesList.length; i++) {
        if (this.rolesList[i].id === val) {
          flag = true;
        }
      }
      if (!flag) {
        const _item = this.rolesArr.find(child => child.id == val);
        const _index = this.rolesArr.findIndex(item => item.id === val);
        this.rolesArr.splice(_index, 1);
        if (_item.id === "companyAdmin") {
          _item.closable = false;
          this.$confirm(
            "该操作会替换当前公司已有的公司管理员（如果有），是否继续?",
            "提示",
            { type: "warning" }
          )
            .then(() => {
              // _item.disabled = true;
              this.rolesList.push(_item);
              this.rolesOption = "";
            })
            .catch(() => {
              this.rolesOption = "";
            });
        } else {
          _item.closable = true;
          // _item.disabled = true;
          this.rolesList.push(_item);
          this.rolesOption = "";
        }
      }
    },
    handleClose(tag) {
      const _index = this.rolesList.findIndex(child => child.id == tag.id);
      // let _item = this.rolesArr.find(child => child.id == tag.id);
      // _item.disabled = false;
      this.rolesList.splice(_index, 1);
      this.rolesArr.push(tag);
    },
    handleCloseDialog() {
      this.$emit("update:visible", false);
      this.handleUpdateTable();
    },
    handleUpdateTable() {
      if (this.type === "staffsTable") return;
      this.$emit("handleUpdateTable");
    },
    handleRoleChange(businessManTransfer) {
      this.ruleForm.roles = [];
      this.rolesList.forEach(item => {
        this.ruleForm.roles.push(item.id);
      });
      if (this.staffsImgFileList.length) {
        this.ruleForm.avatarUrl = this.staffsImgFileList[0].origin;
      } else {
        this.ruleForm.avatarUrl = "";
      }
      this.ruleForm.departmentId = this.departsArr[0] || null;
      const updateData = { ...this.ruleForm, businessManTransfer };
      updateData.bargainLowerRate =
        parseFloat(updateData.bargainLowerRate || 0) / 100;
      updateData.bargainUpperRate =
        parseFloat(updateData.bargainUpperRate || 0) / 100;
      updateStaffs(updateData).then(() => {
        this.$message.success({
          message: "员工信息保存成功",
          showClose: true
        });
        this.$store.dispatch("admin/user/loadUserMsg");
        this.$emit("handleUpdateStaffInfo", this.type === "staffsTable");
      });
    },
    resetForm() {
      this.$refs.staffRuleForm.resetFields();
      this.areaDepartsArr = [];
      this.departsArr = [];
      this.rolesOption = "";
      this.rolesArr = [];
      this.rolesList = [];
      this.staffsImgFileList = [];
    },
    async handleSubmitForm() {
      this.$refs.advancedPropertyForm.validate((valdate, error) => {
        if (!valdate) {
          const errTips = error[Object.keys(error)[0]][0]?.message;
          this.$message.warning({ message: errTips });
          return;
        }
        this.$refs.staffRuleForm.validate((valid, err) => {
          if (valid) {
            if (this.rolesList.length === 0) {
              this.rolesErrMsg = "请选择角色";
              this.$message.warning({ message: this.rolesErrMsg });
              return;
            }
            const rolesIds = this.rolesList.map(item => item.id);
            if (
              (this.ruleForm.roles &&
                this.ruleForm.roles.includes("salesMan") &&
                !rolesIds.includes("salesMan")) ||
              (this.ruleForm.roles &&
                this.ruleForm.roles.includes("purchaseMan") &&
                !rolesIds.includes("purchaseMan"))
            ) {
              checkStaffs({
                staffId: this.ruleForm.id,
                businessMan: true
              }).then(data => {
                if (!data.isPurchaseMan && !data.isSalesMan) {
                  this.handleRoleChange({});
                } else {
                  this.isPurchaseMan = data.isPurchaseMan;
                  this.isSalesMan = data.isSalesMan;
                  this.showChangeCooperatorManagerBox = true;
                }
              });
            } else {
              this.handleRoleChange({});
            }
          } else {
            const errTips = err[Object.keys(err)[0]][0].message;
            this.$message.warning({ message: errTips });
          }
        });
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.dialog-body {
    /deep/.el-dialog__body {
        padding: 5px;
        background-color: #E7EBED;
    }
    /deep/.advancedPropertyFrom .el-form-item__error{
      top: 26%;
      left: 104%;
      width: 100%;
    }
}

.staff-box-card {
    height: 100%;
    /deep/.el-dialog__body {
        height: 100%;
    }
}
.company-list{
  height: 350px;
    overflow-y:scroll;
}
</style>
