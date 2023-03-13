<template>
  <ht-dialog
    v-switch-focus="focusData"
    :visible.sync="visible"
    :close-on-click-modal="false"
    title="新增往来单位"
    width="400px"
    top="7vh"
    append-to-body
    @close="handleClose"
  >
    <el-form
      ref="cooperatorForm"
      :model="formData"
      :rules="rules"
      :show-message="false"
      size="mini"
      label-width="88px"
      label-position="left"
      class="form-item-small-margin-bottom"
      style="padding-left: 10px;"
    >
      <Collapse :is-collapse.sync="isCollapse">
        <el-form-item label="单位编码" prop="number">
          <ht-input
            v-model="formData.number"
            class="switch-focus focus-number"
            @intput-enter="debouncedHandleInputEnter"
          />
        </el-form-item>
        <el-form-item label="单位名称" prop="name">
          <ht-input
            v-model="formData.name"
            class="switch-focus focus-name"
            @input="handleSetShortName"
            @intput-enter="debouncedHandleInputEnter"
          />
        </el-form-item>
        <el-form-item label="主联系人" prop="contactName">
          <ht-input
            v-model="formData.contactName"
            class="switch-focus focus-contactName"
            @intput-enter="debouncedHandleInputEnter"
          />
        </el-form-item>
        <el-form-item label="主联系人电话" prop="contactPhone">
          <ht-input
            v-model="formData.contactPhone"
            class="switch-focus focus-contactPhone"
            @intput-enter="debouncedHandleInputEnter"
          />
        </el-form-item>
        <el-form-item label="所属区域" prop="area.ids">
          <area-select v-model="formData.area.ids" />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <ht-input
            v-model="formData.address"
            class="switch-focus focus-address"
            @intput-enter="debouncedHandleInputEnter"
          />
        </el-form-item>
        <template v-slot:collapse>
          <el-form-item label="单位简称" prop="shortName">
            <ht-input
              v-model="formData.shortName"
              class="switch-focus focus-shortName"
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
          <el-form-item label="公司电话" prop="phone">
            <ht-input
              v-model="formData.phone"
              class="switch-focus focus-phone"
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
          <el-form-item label="发票抬头" prop="invoiceTitle">
            <ht-input
              v-model="formData.invoiceTitle"
              class="switch-focus focus-invoiceTitle"
              maxlength="50"
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
          <el-form-item label="税号" prop="localCreditCode">
            <ht-input
              v-model="localCreditCode"
              class="switch-focus focus-localCreditCode"
              maxlength="18"
              placeholder="统一社会信用代码"
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
          <el-form-item label="开户银行" prop="bank">
            <ht-input
              v-model="formData.bank"
              class="switch-focus focus-focus"
              maxlength="50"
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
          <el-form-item label="银行账号" prop="bankAccount">
            <ht-input
              v-model="formData.bankAccount"
              class="switch-focus focus-bankAccount"
              maxlength="50"
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
        </template>
      </Collapse>
    </el-form>

    <div class="dialog-footer-align" style="margin-top: 10px;">
      <el-button
        :disabled="loading"
        type="primary"
        size="mini"
        class="switch-focus focus-button"
        plain
        @click="submitForm"
        @keyup.right.native="cancelFocus = true"
        @keyup.left.native="cancelFocus = true"
      >
        确定（F3）
      </el-button>
      <el-button
        v-delay-focus="cancelFocus"
        type="primary"
        size="mini"
        plain
        @click="closeDialog"
        @keyup.right.native="getSureFocus"
        @keyup.left.native="getSureFocus"
      >
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>
<script>
import Vue from "vue";
import hotkeys from "hotkeys-js";
import eventBus from "@/event";
import Collapse from "@/components/collapse";
import { cacheIsCollapse, loadIsCollapse } from "@/utils/isCollapse";
import debounce from "throttle-debounce/debounce";
import AreaSelect from "@/components/select/AreaSelect";
// import { formateRules } from "@/utils/validate";
import {
  fastCooperators,
  fastCooperatorsCode
} from "@/api/communion/communion";

const defaultFocusData = {
  updateIndex: 0,
  initial: null,
  type: null
};
let oldKeyScope;
const defultData = {
  area: {
    ids: []
  },
  creditCode: "",
  email: "",
  name: "",
  shortName: "",
  number: ""
};

export default Vue.extend({
  name: "QuickCreateCooperator",
  components: {
    Collapse,
    AreaSelect
  },
  data() {
    return {
      loading: false,
      componentId: "",
      keyScope: Symbol("quickCreateCooperator"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter), // 解决回车导致两个切换问题
      focusData: {
        ...defaultFocusData
      },
      visible: false,
      createCooperatorInfo: {
        cooperatorName: "",
        cooperatorType: ""
      },
      formData: {
        ...defultData
      },
      rules: {
        number: [
          {
            required: true,
            message: "请输入单位编码",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入单位名称",
            trigger: "change"
          }
        ]
      },
      isCollapse: false,
      cancelFocus: false
    };
  },
  computed: {
    localCreditCode: {
      get: function() {
        return this.formData.creditCode;
      },
      set: function(value) {
        this.formData.creditCode = value.toUpperCase();
      }
    }
  },
  watch: {
    visible: {
      handler(val, oldVal) {
        if (val) {
          oldKeyScope = hotkeys.getScope();
          setTimeout(() => {
            this.updateFocusData({
              initial: "focus-number"
            });
            hotkeys.setScope(this.keyScope);
          }, 300);
          this.loadCooperatorNumber();
        } else if (oldVal) {
          hotkeys.setScope(oldKeyScope);
        }
      },
      immediate: true
    },
    isCollapse() {
      cacheIsCollapse(this.isCollapse, "QuickCreateCooperator");
    }
  },
  mounted() {
    this.isCollapse = loadIsCollapse(this.isCollapse, "QuickCreateCooperator");
    eventBus.$on("showQuickCreateCooperator", this.createCooperator);
    this.bindKeyboard();
  },
  beforeDestroy() {
    eventBus.$off("showQuickCreateCooperator", this.createCooperator);
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    loadCooperatorNumber() {
      fastCooperatorsCode().then(data => {
        this.formData.number = data;
      });
    },
    handleInputEnter() {
      // TODO 判断数据 搜索还是下一个
      this.updateFocusData({ type: "down" });
    },
    bindKeyboard() {
      hotkeys("f3,up,down", { scope: this.keyScope }, (e, handler) => {
        switch (handler.key) {
          case "f3":
            this.submitForm();
            break;
          case "up":
          case "down":
            e.preventDefault();
            this.updateFocusData({ type: handler.key });
            this.cancelFocus = false;
            break;
          default:
            return;
        }
      });
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    handleClose() {
      this.$refs.cooperatorForm.resetFields();
      this.localCreditCode = "";
      this.formData.area.ids = [];
    },
    closeDialog() {
      this.visible = false;
    },

    submitForm() {
      this.$refs.cooperatorForm.validate((valid, err) => {
        if (valid) {
          this.submitHandle();
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips });
        }
      });
    },
    submitHandle() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let params = { ...this.formData };
      if (this.createCooperatorInfo.cooperatorType === "logistics") {
        params = {
          ...this.formData,
          flags: { isLogistics: true, isCompany: true }
        };
      } else if (this.createCooperatorInfo.cooperatorType === "customer") {
        params = {
          ...this.formData,
          flags: { isCustomer: true, isCompany: true }
        };
      } else if (this.createCooperatorInfo.cooperatorType === "supplier") {
        params = {
          ...this.formData,
          flags: { isSupplier: true, isCompany: true }
        };
      }
      fastCooperators(params)
        .then(data => {
          const params = {
            cooperatorId: data,
            cooperatorName: this.formData.name
          };
          this.newCooperator(params);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    newCooperator(value) {
      eventBus.$emit("createCooperatorSuccess", {
        ...value,
        componentId: this.componentId
      });
      this.visible = false;
    },
    createCooperator(info) {
      this.visible = true;
      this.formData = {
        ...defultData,
        name: info.name,
        shortName: info.shortName
      };
      this.createCooperatorInfo.cooperatorType = info.type;
      this.componentId = info.componentId;
    },
    handleSetShortName() {
      this.formData.shortName = JSON.parse(JSON.stringify(this.formData.name));
    },
    getSureFocus() {
      this.cancelFocus = false;
      this.updateFocusData({ initial: "focus-button" });
    }
  }
});
</script>
