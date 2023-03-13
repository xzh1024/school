<template>
  <ht-dialog
    v-bind="$attrs"
    title="删除0库存"
    width="300px"
    class="dialog-set"
    v-on="$listeners"
  >
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      size="mini"
      label-position="top"
      style="margin: 10px;"
    >
      <el-form-item label="0库存保留设置" prop="keepZero" class="form-item-set">
        <ht-autoselect
          v-model="ruleForm.keepZero"
          :options="keepZeroOptions"
          :trigger-on-focus="false"
          placeholder="请选择"
          highlight-first-item
        />
      </el-form-item>
      <div class="checkbox-content">
        <el-checkbox
          v-model="ruleForm.checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
      </div>
      <el-form-item label="删除分公司设置" class="form-item-set" required>
        <el-checkbox-group
          v-model="ruleForm.companyIds"
          :min="1"
          class="checkbox-group-set"
          @change="handleCheckedOptionsChange"
        >
          <div v-for="item in companies" :key="item.id">
            <el-checkbox :label="item.id">
              {{ item.name }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div class="dialog-footer-align" style="margin-top: -5px;">
      <el-button
        :loading="sureLoading"
        type="primary"
        plain
        size="mini"
        @click="sureHandle"
      >
        确定（F3）
      </el-button>
      <el-button
        :disabled="sureLoading"
        type="primary"
        plain
        size="mini"
        @click="cancelHandle"
      >
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
import * as store from "@/utils/store";

const defaultRuleForm = {
  keepZero: "不保留",
  checkAll: false,
  companyIds: []
};
let oldKeyScope;

export default {
  name: "DeletZeroBox",
  data() {
    return {
      keyScope: Symbol("stocksSearchDeletZeroBox"),
      ruleForm: { ...defaultRuleForm },
      keepZeroOptions: [
        { id: "不保留", name: "不保留" },
        { id: "每公司保留一条", name: "每公司保留一条" },
        { id: "每公司+每仓保留一条", name: "每公司+每仓保留一条" },
        { id: "每公司+每货位保留一条", name: "每公司+每货位保留一条" }
      ],
      isIndeterminate: true,
      sureLoading: false,
      rules: {
        keepZero: [
          { required: true, message: "请选择0库存保留设置!", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapState("admin/user", ["userInfoMsg"]),
    ...mapState("admin/baseData", ["companies"]),
    defaultcompanyIds() {
      return store.userInfoMsg().companyId
        ? [store.userInfoMsg().companyId]
        : [];
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldVal) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          this.initData();
          setTimeout(() => {
            hotkeys.setScope(this.keyScope);
            this.$refs.ruleForm.clearValidate();
          }, 100);
        } else if (oldVal) {
          hotkeys.setScope(oldKeyScope);
          this.ruleForm = { ...defaultRuleForm };
        }
      },
      immediate: true
    }
  },
  mounted() {
    hotkeys("f3", { scope: this.keyScope }, (e, handler) => {
      switch (handler.key) {
        case "f3":
          this.sureHandle();
          break;
        default:
          break;
      }
    });
  },
  methods: {
    initData() {
      this.ruleForm = {
        ...defaultRuleForm,
        companyIds: this.defaultcompanyIds
      };
    },
    handleCheckAllChange(val) {
      this.ruleForm.companyIds = val
        ? this.companies.map(item => item.id)
        : this.defaultcompanyIds;
      this.isIndeterminate = val ? false : true;
    },
    handleCheckedOptionsChange(value) {
      const checkedCount = value.length;
      this.ruleForm.checkAll = checkedCount === this.companies.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.companies.length;
    },
    sureHandle() {
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          if (this.ruleForm.companyIds.length) {
            this.cancelHandle();
          } else {
            this.$message.warning({
              message: "请选择分公司！",
              showClose: true
            });
          }
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

<style lang="stylus" scoped>
.dialog-set
    /deep/.el-dialog__body
        padding: 0
        height: 350px
.checkbox-content
    margin-bottom: -24px
    text-align: right
.form-item-set
    /deep/.el-form-item__label
        padding: 0
        text-align: left
    .checkbox-group-set
        padding: 0 10px
        border: 1px solid #E8EAEF
        height: 200px
        overflow: auto
</style>
