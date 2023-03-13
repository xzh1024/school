<template>
  <div class="container-box">
    <ht-card padding class="auto-card">
      <el-row>
        <el-button
          type="primary"
          size="mini"
          :disabled="!enableAppend || isNew"
          @click="generateChild"
        >
          新增下级（Ins)
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="save"
          :disabled="!enableSave && !enableUpdate"
        >
          保存（F3)
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="reset"
          :disabled="!enableSave && !enableUpdate"
        >
          放弃
        </el-button>
        <el-button
          type="primary"
          size="mini"
          :disabled="!endableDelete || isNew"
          @click="deleteRecord"
        >
          删除（F4)
        </el-button>
        <el-button
          type="primary"
          size="mini"
          :disabled="!enableStop || isNew"
          @click="updateStatus"
        >
          停用/启用
        </el-button>
      </el-row>

      <ht-card padding>
        <el-form
          :model="displayFormData"
          label-position="left"
          label-width="60px"
          size="mini"
          class="form-item-small-margin-bottom"
        >
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item label="收支类目代码" label-width="100px">
                {{ displayFormData.showParentCode }}
                <ht-input
                  style="width:80px"
                  v-model="displayFormData.code"
                  @input="handleCodeChange"
                  placeholder="请输入收支类目代码"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="类目级别" label-width="100px">
                <ht-input
                  disabled
                  v-model="displayFormData.level"
                  placeholder="请输入类目级别"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="收支类目名称" label-width="100px">
                <ht-input
                  v-model="displayFormData.name"
                  placeholder="请输入收支类目名称"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="!isNew">
            <el-col :span="8">
              <el-form-item label="助记符" label-width="100px">
                <ht-input
                  disabled
                  v-model="displayFormData.mnemonic"
                  placeholder="请输入助记符"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="备注" label-width="100px">
                <ht-input
                  v-model="displayFormData.remark"
                  placeholder="请输入备注"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </ht-card>
    </ht-card>
  </div>
</template>

<script>
import {
  add,
  update,
  updateStatus,
  deleteRecord
} from "@/api/finance/fundCategory";
import { mapState } from "vuex";
import { cloneDeep } from "lodash";
export default {
  props: {
    currentRow: {
      type: Object,
      default: () => {}
    },
    maxLevel: {
      type: Number,
      default: 3
    },
    maxCode: {
      type: Number,
      default: 0
    },
    enableAdd: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    currentRow(val) {
      this.isNew = false;
      this.formData = cloneDeep(val);
      this.displayFormData = cloneDeep(this.formData);
    }
  },
  data() {
    return {
      isNew: false,
      formData: {},
      newFormData: {},
      displayFormData: {}
    };
  },
  computed: {
    ...mapState("admin/user", ["perm"]),
    enableAppend() {
      const { flags, level } = this.formData;
      if (!flags) return false;
      const { notAppend } = flags;
      return (
        !notAppend &&
        level < this.maxLevel &&
        this.hasPermission("financials.fundCategory.create")
      );
    },
    enableSave() {
      const { flags } = this.formData;
      if (!flags) return false;
      const { notAppend } = flags;
      return !notAppend && this.hasPermission("financials.fundCategory.create");
    },
    enableUpdate() {
      const { flags } = this.formData;
      if (!flags) return false;
      const { notUpdate, used } = flags;
      return (
        !notUpdate &&
        !used &&
        this.hasPermission("financials.fundCategory.update")
      );
    },
    endableDelete() {
      const { flags } = this.formData;
      if (!flags) return false;
      const { notDelete } = flags;
      return !notDelete && this.hasPermission("financials.fundCategory.delete");
    },
    enableStop() {
      const { flags } = this.formData;
      if (!flags) return false;
      const { notStop } = flags;
      return (
        !notStop && this.hasPermission("financials.fundCategory.updateStatus")
      );
    }
  },
  mounted() {
    this.formData = { ...this.currentRow };
    this.displayFormData = cloneDeep(this.formData);
  },
  methods: {
    hasPermission(permKey) {
      return (
        this.loginHasPerm("financials") ||
        this.loginHasPerm("financials.fundCategory") ||
        this.loginHasPerm(permKey)
      );
    },
    loginHasPerm(permKey) {
      if (!permKey) {
        return true;
      }
      const { perms, hasRootPerm } = this.perm;
      return hasRootPerm || (perms && perms.some(item => permKey === item));
    },
    handleCodeChange(e) {
      const num = parseInt(e);
      if (num > 99) {
        this.displayFormData.code = this.getCodeStr(e.slice(0, 2));
      } else if (1 < num <= 99) {
        this.displayFormData.code = this.getCodeStr(num);
      } else {
        this.displayFormData.code = this.getCodeStr(1);
      }
    },
    generateBrother() {
      this.isNew = true;
      const newBrother = cloneDeep(this.formData);
      // code根据当前的children中code最大的一个来+1
      newBrother.code = this.getCodeStr(this.maxCode + 1);
      newBrother.children = [];
      newBrother.level = this.formData.level;
      newBrother.flags.notAppend = newBrother.level > this.maxLevel - 1; // 子等级为maxLevel时，不允许再添加子集了
      newBrother.name = "";
      newBrother.mnemonic = "";
      newBrother.remark = "";
      newBrother.parentCode = this.formData.parentCode;
      newBrother.parentId = this.formData.parentId;
      newBrother.showCode = newBrother.code;
      newBrother.showParentCode = this.formData.showParentCode;
      delete newBrother.id;
      this.newFormData = cloneDeep(newBrother);
      this.displayFormData = cloneDeep(this.newFormData);
    },
    generateChild() {
      this.isNew = true;
      const newChild = cloneDeep(this.formData);
      // code根据当前的children中code最大的一个来+1
      const childMaxCode = this.findMax(this.formData.children) + 1;
      newChild.code = this.getCodeStr(childMaxCode);
      newChild.children = [];
      newChild.level = this.formData.level + 1; // 子等级为父等级+1
      newChild.flags.notAppend = newChild.level > this.maxLevel - 1; // 子等级为maxLevel时，不允许再添加子集了
      newChild.name = "";
      newChild.mnemonic = "";
      newChild.remark = "";
      newChild.parentCode = this.formData.code;
      newChild.parentId = this.formData.id;
      newChild.showCode = newChild.code;
      newChild.showParentCode = this.formData.showCode;
      delete newChild.id;
      this.newFormData = cloneDeep(newChild);
      this.displayFormData = cloneDeep(this.newFormData);
    },
    findMax(arr) {
      let max = 0;
      if (!arr || arr.length == 0) return 0;
      arr.forEach(item => {
        max = +item.code > max ? +item.code : max;
      });
      return max;
    },
    getCodeStr(codeNumber) {
      if (codeNumber < 10) {
        return `0${codeNumber}`;
      }
      return `${codeNumber}`;
    },
    reset() {
      this.isNew = false;
      this.displayFormData = cloneDeep(this.formData);
    },
    save() {
      const pathObj = {
        path: this.displayFormData.path,
        code: this.displayFormData.showParentCode + this.displayFormData.code
      };
      if (this.isNew) {
        add(this.displayFormData).then(() => {
          this.$emit("needUpdateList", pathObj);
        });
      } else {
        update(this.displayFormData).then(() => {
          this.$emit("needUpdateList", pathObj);
        });
      }
    },
    deleteRecord() {
      const ids = [this.displayFormData.id];
      deleteRecord({
        ids
      }).then(() => {
        this.$emit(
          "needUpdateList",
          { path: this.displayFormData.path },
          "remove"
        );
      });
    },
    updateStatus() {
      const ids = [this.displayFormData.id];
      const name = this.displayFormData.name;
      const status =
        this.displayFormData.flags.status == "enable" ? "disable" : "enable";
      this.$confirm(
        `是否确认 ${status == "enable" ? "启用" : "停用"} ${name} ？`,
        "提示",
        {
          type: "warning"
        }
      ).then(() => {
        updateStatus({
          ids,
          status
        }).then(() => {
          this.$emit("needUpdateList");
        });
      });
    }
  }
};
</script>

<style></style>
