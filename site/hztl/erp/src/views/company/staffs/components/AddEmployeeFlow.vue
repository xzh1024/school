<template>
  <ht-dialog
    v-switch-focus="focusData"
    v-bind="$attrs"
    :title="dialogTitle"
    class="dialog-body"
    :width="dialogWidth"
    append-to-body
    v-on="$listeners"
    @close="handleUpdateTable"
  >
    <section
      v-if="step === 0"
      class="container-box"
      style="height: 400px;background:#fff;padding:10px;"
    >
      <el-form
        ref="registerForm"
        :model="regRuleForm"
        :rules="regRules"
        label-width="85px"
      >
        <el-form-item label="入职公司" prop="companyId">
          <ht-select
            v-model="regRuleForm.companyId"
            :options="allCompanies"
            @change="debouncedHandleRegInputEnter(regRuleForm.companyId)"
            filterable
          />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <ht-input
            v-model="regRuleForm.realName"
            class="switch-focus focus-name"
            placeholder="请填写真实姓名"
            clearable
            maxlength="10"
            @keyup.enter.native="
              debouncedHandleRegInputEnter(regRuleForm.realName)
            "
          >
          </ht-input>
        </el-form-item>
        <div class="single-area-box">
          <el-form-item label="所在地区" prop="areaId">
            <area-select
              v-model="regRuleForm.areaId"
              placeholder="请选择所在地区"
              @change="debouncedHandleRegInputEnter(regRuleForm.areaId)"
            />
          </el-form-item>
        </div>
        <el-form-item label="登录账号" prop="phone">
          <ht-input
            v-model="regRuleForm.phone"
            class="switch-focus focus-phone"
            placeholder="请输入手机号"
            clearable
            maxlength="11"
            @keyup.enter.native="
              debouncedHandleRegInputEnter(regRuleForm.phone)
            "
            @blur="checkPhone"
          >
          </ht-input>
        </el-form-item>
        <el-form-item prop="password" label="登录密码">
          <pass-words
            v-model="regRuleForm.password"
            :readonly="readonly"
            class="switch-focus"
            @focus="readonly = false"
            @keyup.enter.native="
              debouncedHandleRegInputEnter(regRuleForm.password)
            "
          />
        </el-form-item>
        <el-form-item prop="smsCaptcha" label="短信验证码">
          <div style="width:450px">
            <captchas-sms-code
              v-model="regRuleForm.smsCaptcha"
              :phone="regRuleForm.phone"
              :showIcon="false"
              :readonly="readonly"
              :needCheck="true"
              _type="register"
              @setMsgId="setMsgId"
              @focus="readonly = false"
              @keyup.enter.native="
                debouncedHandleRegInputEnter(regRuleForm.smsCaptcha)
              "
            />
          </div>
        </el-form-item>
      </el-form>
    </section>
    <section
      v-if="step === 1"
      v-loading="dilogLoading"
      class="container-box"
      style="height: 400px"
    >
      <el-form
        ref="staffRuleForm"
        :model="ruleForm"
        :rules="staffRules"
        :show-message="false"
        :disabled="isDisabled"
        label-width="74px"
        size="mini"
        class="form-item-small-margin-bottom"
        style="height: 100%;"
      >
        <el-row :gutter="5" style="height: 100%;">
          <el-col :span="6" style="height: 100%;">
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
          <el-col :span="6" style="height: 100%;">
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
                style="background-color: #e7ebed; height: 214px; border-radius: 4px; padding-left: 4px;"
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
          <el-col :span="6" style="height: 100%;">
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
                  type="textarea"
                  placeholder="最多支持200个字符"
                />
              </el-form-item>
            </ht-card>
          </el-col>
          <el-col :span="6" style="height: 100%;">
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
        </el-row>
      </el-form>
    </section>
    <div slot="footer" class="dialog-footer-align">
      <el-button
        v-if="step == 0"
        type="primary"
        size="mini"
        :disabled="!msgId"
        plain
        @click="handleSubmitForm"
      >
        添加 (F3)
      </el-button>
      <el-button
        v-else
        type="primary"
        size="mini"
        plain
        @click="handleSubmitForm"
      >
        确定 (F3)
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
  getManageCompanies,
  getAllCreatableCompanies,
  createStaff
} from "@/api/company/company";
import { resRoles } from "@/api/base/base";
import ChangeCooperatorManager from "./ChangeCooperatorManager";
import { validatePassword } from "@/utils/validate";
import { mapActions } from "vuex";
import hotkeys from "hotkeys-js";
import { searchMixin } from "@/mixins";
import CaptchasSmsCode from "@/components/CaptchasSmsCode";
import PassWords from "@/components/PassWords";
import AreaSelect from "@/components/select/AreaSelect";
import * as store from "@/utils/store";
import { checkIsExist } from "@/api/loginregister";

let lastKeyScope;

const defaultRegForm = {
  companyId: "",
  realName: "",
  areaId: null,
  phone: "",
  smsCaptcha: "",
  password: ""
};

export default {
  name: "EmployeeInformation",
  components: {
    SrImgUpload,
    ChangeCooperatorManager,
    CaptchasSmsCode,
    PassWords,
    AreaSelect
  },
  mixins: [searchMixin],
  props: {
    type: {
      type: String,
      defualt: ""
    }
  },
  data() {
    const validatorPhone = function(rule, value, callback) {
      if (value === "") {
        callback(new Error("手机号不能为空"));
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    const validatorPassword = function(rule, value, callback) {
      if (!validatePassword(value)) {
        callback(new Error("密码格式不正确"));
      } else {
        callback();
      }
    };
    return {
      step: 0,
      staffId: "",
      readonly: true,
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      debouncedHandleRegInputEnter: debounce(100, this.handleRegInputEnter),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      keyScope: Symbol("EmployeeInformation"),
      staffsImgFileList: [],
      msgId: "",
      areaDepartsArr: [],
      departsArr: [],
      rolesArr: [],
      rolesList: [],
      manageCompanies: [],
      showChangeCooperatorManagerBox: false,
      isPurchaseMan: false,
      isSalesMan: false,
      canReg: false,
      dilogLoading: false,
      rolesOption: "",
      regRuleForm: {
        ...defaultRegForm
      },
      ruleForm: {
        realName: "",
        manageCompanyIds: [],
        roles: []
      },
      allCompanies: [],
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
      regRules: {
        companyId: [
          { required: true, trigger: "change", message: "请选择入职公司" }
        ],
        realName: [
          { required: true, trigger: "change", message: "请输入员工真实姓名" }
        ],
        areaId: [
          { required: true, trigger: "blur", message: "请选择所在地区" }
        ],
        phone: [
          {
            required: true,
            validator: validatorPhone,
            trigger: "change",
            message: "电话号码格式不正确"
          }
        ],
        password: [
          {
            required: true,
            validator: validatorPassword,
            trigger: "change",
            message: "密码格式不正确"
          }
        ],
        smsCaptcha: [
          { required: true, trigger: "change", message: "请输入短信验证码" }
        ]
      },
      rolesErrMsg: ""
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
      return this.step === 0 ? "新增员工 1/2" : "新增员工 2/2";
    },
    dialogWidth() {
      return this.step === 0 ? "600px" : "1200px";
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
          this.step = 0;
          this.regRuleForm = {
            ...defaultRegForm
          };
          this.$nextTick(() => {
            this.$refs.registerForm?.clearValidate();
          });
          lastKeyScope = hotkeys.getScope();
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
    /* 获取可以添加员工的公司列表 */
    getAllCreatableCompanies().then(res => {
      this.allCompanies = res.rows;
    });
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
    checkPhone() {
      checkIsExist({ phone: this.regRuleForm.phone });
    },
    setMsgId(e) {
      this.msgId = e;
    },
    ...mapActions("admin/staffs", ["loadAll"]),
    handleCompanyChange(value) {
      console.log(value);
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
    handleRegInputEnter() {
      this.canReg = false;
      console.log(this.regRuleForm);
      if (
        this.regRuleForm.companyId &&
        this.regRuleForm.realName &&
        this.regRuleForm.phone &&
        this.regRuleForm.password &&
        this.regRuleForm.smsCaptcha &&
        this.regRuleForm.areaId
      ) {
        this.canReg = true;
      } else {
        // if (!this.regRuleForm.realName) {
        //   this.$message.error({ message: "请填写真实姓名", showClose: true });
        //   return;
        // }
        // if (!this.regRuleForm.phone) {
        //   this.$message.error({ message: "请输入手机号", showClose: true });
        //   return;
        // }
        // if (!this.regRuleForm.smsCaptcha) {
        //   this.$message.error({ message: "请输入短信验证码", showClose: true });
        //   return;
        // }
        // if (!this.regRuleForm.password) {
        //   this.$message.error({ message: "请输入登录密码", showClose: true });
        //   return;
        // }
        // if (!validatePassword(this.regRuleForm.password)) {
        //   this.$message.error({
        //     message: "登录密码格式不正确",
        //     showClose: true
        //   });
        //   return;
        // }
      }
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
      this.ruleForm = res;
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
      console.log(this.ruleForm);
      this.rolesList.forEach(item => {
        this.ruleForm.roles.push(item.id);
      });
      if (this.staffsImgFileList.length) {
        this.ruleForm.avatarUrl = this.staffsImgFileList[0].origin;
      } else {
        this.ruleForm.avatarUrl = "";
      }
      this.ruleForm.departmentId = this.departsArr[0] || null;
      updateStaffs({ ...this.ruleForm, businessManTransfer }).then(() => {
        this.$message.success({
          message: "员工信息保存成功",
          showClose: true
        });
        this.$store.dispatch("admin/user/loadUserMsg");
        this.$emit("handleUpdateStaffInfo", true);
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
    handleSubmitForm() {
      if (this.step === 0) {
        this.$refs.registerForm.validate((valid, err) => {
          if (valid) {
            console.log(this.regRuleForm);
            createStaff({
              ...this.regRuleForm,
              msgId: this.msgId
            }).then(res => {
              const { id } = res;
              this.staffId = id;
              this.step = 1;
              this.loadRoles();
            });
          } else {
            const errTips = err[Object.keys(err)[0]][0].message;
            this.$message.warning({ message: errTips });
          }
        });
      } else {
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
      }
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
.demo-ruleForm{
  padding:10px;
}
.single-area-box {
  ::v-deep .el-cascader__label {
  }

  .area-icon {
    display: inline-block;
    position: absolute;
    z-index: 9;
    padding-left: 4px;
  }
}
</style>
