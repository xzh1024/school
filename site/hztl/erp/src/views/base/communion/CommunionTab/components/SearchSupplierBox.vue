<template>
  <ht-dialog
    v-switch-focus="focusData"
    v-bind="$attrs"
    width="350px"
    title="往来单位查询"
    v-on="$listeners"
  >
    <el-form
      ref="ruleForm"
      :model="searchForm"
      class="form-item-small-margin-bottom"
      size="mini"
      label-width="60px"
      label-position="left"
    >
      <el-form-item label="单位名称" prop="name">
        <ht-autocomplete
          v-model="searchForm.name"
          :fetch-suggestions="autocompleteSearchAllCooperators"
          :trigger-on-focus="false"
          class="switch-focus focus-name"
          highlight-first-item
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="单位编号" prop="number">
        <ht-input
          v-model="searchForm.number"
          class="switch-focus focus-number"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="主联系人" prop="contactsPhoneOrName">
        <ht-input
          v-model="searchForm.contactsPhoneOrName"
          class="switch-focus focus-contactsPhoneOrName"
          placeholder="姓名/电话"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="单位类型" prop="type">
        <ht-autoselect
          v-model="searchForm.type"
          :options="typeOptions"
          :trigger-on-focus="false"
          class="switch-focus focus-type"
          clearable
          highlight-first-item
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="单位来源" prop="source">
        <ht-autoselect
          v-model="searchForm.source"
          :options="sourceOptions"
          :trigger-on-focus="false"
          class="switch-focus focus-type"
          clearable
          highlight-first-item
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="单位状态" prop="isDisabled">
        <ht-autoselect
          v-model="searchForm.isDisabled"
          :options="statusOptions"
          :trigger-on-focus="false"
          class="switch-focus focus-type"
          clearable
          highlight-first-item
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="公司电话" prop="companyPhone">
        <ht-input
          v-model="searchForm.companyPhone"
          class="switch-focus focus-companyPhone"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="公司地址" prop="companyAddress">
        <ht-input
          v-model="searchForm.companyAddress"
          class="switch-focus focus-companyAddress"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
    </el-form>
    <div class="dialog-footer-align" style="margin-top: 10px;">
      <el-button type="primary" size="mini" plain @click="sureHandle">
        确定（F3）
      </el-button>
      <el-button type="primary" plain size="mini" @click="cancelHandle">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { searchMixin } from "@/mixins";
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import { userMsg } from "@/utils/store";

let oldKeyScope;
const defaultSearchData = {
  number: "",
  id: null,
  contactsPhoneOrName: "",
  type: "all",
  source: "all",
  isDisabled: "2",
  companyPhone: "",
  companyAddress: ""
};
const options = [
  { id: "all", name: "全部" },
  { id: "customer", name: "客户" },
  { id: "supplier", name: "供应商" },
  { id: "logistics", name: "物流公司" }
];
if (userMsg().hasYx) {
  options.push({ id: "insuranceCompany", name: "保险公司" });
}

export default {
  name: "SearchSupplierBox",
  mixins: [searchMixin],
  data() {
    return {
      keyScope: Symbol("SearchSupplierBox"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      focusData: {
        updateIndex: null,
        initial: null,
        type: null
      },
      searchForm: {
        ...defaultSearchData
      },
      typeOptions: [...options],
      sourceOptions: [
        { id: "all", name: "全部" },
        { id: "offline", name: "线下" },
        { id: "platform", name: "平台" }
      ],
      statusOptions: [
        { id: "2", name: "全部" },
        { id: "0", name: "启用" },
        { id: "1", name: "停用" }
      ]
    };
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldVale) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          setTimeout(() => {
            this.updateFocusData({ initial: "focus-name" });
            hotkeys.setScope(this.keyScope);
          });
        } else if (oldVale) {
          hotkeys.setScope(oldKeyScope);
          this.searchForm = { ...defaultSearchData };
        }
      },
      immediate: true
    }
  },
  mounted() {
    hotkeys("f3,up,down", { scope: this.keyScope }, (e, handler) => {
      switch (handler.key) {
        case "f3":
          this.sureHandle();
          break;
        case "up":
        case "down":
          e.preventDefault();
          this.updateFocusData({ type: handler.key });
          break;
        default:
          return;
      }
    });
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    ergodicSearchForm() {
      const keys = Object.keys(this.searchForm);
      return keys.some(item => {
        if (item != "type" && item != "source" && item != "isDisabled") {
          if (this.searchForm[item] instanceof Array) {
            return this.searchForm[item].length;
          } else {
            return this.searchForm[item];
          }
        }
      });
    },
    handleInputEnter() {
      if (this.ergodicSearchForm()) {
        this.sureHandle();
      } else {
        this.updateFocusData({ type: "down" });
      }
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    sureHandle() {
      const params = {
        ...this.searchForm,
        type: this.searchForm.type === "all" ? "" : this.searchForm.type
      };
      this.$emit("on-search", { ...params });
      this.cancelHandle();
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
