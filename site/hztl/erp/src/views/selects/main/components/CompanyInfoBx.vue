<template>
  <ht-dialog
    v-bind="$attrs"
    title="公司资料"
    width="400px"
    append-to-body
    v-on="$listeners"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      :show-message="false"
      label-width="72px"
      label-position="left"
      size="mini"
      class="form-item-small-margin-bottom"
    >
      <ht-card title="基本信息" no-background>
        <!-- <el-form-item v-if="!hideOptions" label="账号类型" prop="projectType">
          <el-radio-group v-model="ruleForm.projectType" class="company-types">
            <el-radio label="yp">云配</el-radio>
            <el-radio label="yx">云修</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="公司名称" prop="name">
          <ht-input
            v-model.trim="ruleForm.name"
            v-delay-focus="nameFocus"
            maxlength="50"
          />
        </el-form-item>
        <el-form-item v-if="!hideOptions" label="公司类型" prop="type">
          <el-radio-group v-model="ruleForm.type" class="company-types">
            <el-radio
              v-for="(companyType, index) in store().companyTypeDictionary()"
              :key="index"
              :label="companyType.name"
            />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属区域" prop="areaIds">
          <area-select v-model="ruleForm.areaIds" />
        </el-form-item>
        <el-form-item label="公司地址" prop="address">
          <ht-input v-model="ruleForm.address" maxlength="50" />
        </el-form-item>
      </ht-card>
      <ht-card title="联系方式" no-background>
        <div style="display: flex;">
          <el-form-item label="联系人" prop="contacts">
            <ht-input
              v-model="ruleForm.contacts"
              placeholder="联系人姓名"
              maxlength="10"
            />
          </el-form-item>
          <el-form-item
            label
            label-width="0px"
            prop="phone"
            style="flex: auto;"
          >
            <ht-input v-model="ruleForm.phone" placeholder="联系人电话" />
          </el-form-item>
        </div>
      </ht-card>
    </el-form>
    <div style="margin-top: 10px; text-align: center;">
      <el-button
        v-loading="sureLoading"
        type="primary"
        size="mini"
        plain
        @click.stop="sureHandle"
      >
        提交（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click.stop="cancelHandle">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import AreaSelect from "@/components/select/AreaSelect";
import { createMyCompany, noLoginPath } from "@/api/company/company";
import { searchMixin } from "@/mixins";
import { mapState, mapActions } from "vuex";
import { getUserInfoMsg } from "@/api/userinfo/userinfo";
import { uiConfig } from "envConfigPath";
import * as store from "@/utils/store";

const defaultRuleForm = {
  name: "",
  type: "",
  projectType: "yp",
  areaIds: [],
  contacts: "",
  phone: ""
};

export default {
  name: "CompanyInfoBx",
  props: {
    projectType: {
      type: String,
      default: "yp"
    }
  },
  mixins: [searchMixin],
  components: {
    AreaSelect
  },
  data() {
    const rules = {
      name: [{ required: true, message: "请输入公司名称！" }],
      type: [{ required: true, message: "请选择公司类型！" }],
      areaIds: [{ required: true, message: "请选择区域！" }],
      address: [{ required: true, message: "请输入公司地址！" }],
      contacts: [{ required: true, message: "请输入联系人姓名！" }],
      phone: [{ required: true, message: "请输入联系人电话号码！" }]
    };

    return {
      uiConfig,
      ruleForm: { ...defaultRuleForm },
      sureLoading: false,
      rules: rules,
      nameFocus: false
    };
  },
  computed: {
    ...mapState("admin/user", ["userInfoMsg"]),
    hideOptions() {
      if (uiConfig && uiConfig.uiTheme === "denso") return true;
      return false;
    }
  },
  watch: {
    "$attrs.visible"(value) {
      if (value) {
        this.initData();
        setTimeout(() => {
          this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
          this.nameFocus = true;
        }, 100);
      } else {
        this.nameFocus = false;
      }
    }
  },
  mounted() {},
  methods: {
    store() {
      return store;
    },
    ...mapActions("baseData/dictionary", ["loadDictionary"]),
    initData() {
      getUserInfoMsg()
        .then(res => {
          this.userInfo = res;
          this.ruleForm = {
            ...defaultRuleForm,
            projectType: this.projectType,
            phone: res.phone,
            contacts: res.name
          };
        })
        .catch(() => {});
    },
    sureHandle() {
      if (this.sureLoading) return;
      // 电装的账号类型默认为云修
      const projectType =
        uiConfig && uiConfig.uiTheme === "denso"
          ? "yx"
          : this.ruleForm.projectType;
      const type =
        uiConfig && uiConfig.uiTheme === "denso"
          ? "汽修厂"
          : this.ruleForm.type;
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          this.sureLoading = true;
          const utmSource = localStorage.getItem("utmSource") || "";
          this.ruleForm = {
            ...this.ruleForm,
            projectType,
            type,
            utmSource,
            areaId: this.ruleForm.areaIds[2],
            projects: [projectType]
          };
          createMyCompany(this.ruleForm)
            .then(res => {
              this.sureLoading = false;
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
                localStorage.setItem("utmSource", "");
                this.$emit("on-sure");
                this.sureLoading = true;
                return noLoginPath();
              }
            })
            .then(() => {
              this.sureLoading = false;
              this.cancelHandle();
            })
            .catch(() => {
              this.sureLoading = false;
            });
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
