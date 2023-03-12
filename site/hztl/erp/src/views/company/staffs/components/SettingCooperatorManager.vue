<template>
  <ht-dialog
    v-switch-focus="focusData"
    v-bind="$attrs"
    class="dialog-body"
    title="业务员绑定提示"
    width="700px"
    top="7vh"
    v-on="$listeners"
  >
    <ht-card
      title="该员工绑定篮往来单位业务员，可选择其他业务员替换绑定。"
      style="height: 100%; margin-bottom: 5px;"
      no-padding
    >
      <ht-table
        :data="tableData"
        :columns="tabelColumns"
        :key-scope="keyScopes.table"
        :selected-rows.sync="selectedRows"
        height="410px"
        @hotkeysUp="bindKeyCode"
        @click.native.stop="setKeyScope(keyScopes.table)"
      />
    </ht-card>
    <ht-card title="批量设置" style="height: 100%;">
      <el-form
        ref="headerForm"
        :model="header"
        :show-message="false"
        class="form-item-small-margin-bottom"
        label-position="left"
        label-width="73px"
        size="mini"
        style="margin-top: 10px;"
        @click.stop="setKeyScope(keyScopes.form)"
      >
        <el-row :gutter="10">
          <el-col :span="11">
            <el-form-item prop="purchaseManId" label="采购业务员">
              <ht-autoselect
                v-model="header.purchaseManId"
                :options="store().purchaseMen()"
                :trigger-on-focus="false"
                placeholder="请选择"
                filter-zero
                clearable
                highlight-first-item
                class="switch-focus focus-purchaseManId"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="salesManId" label="销售业务员">
              <ht-autoselect
                v-model="header.salesManId"
                :options="store().salesMen()"
                :trigger-on-focus="false"
                placeholder="请选择"
                filter-zero
                clearable
                highlight-first-item
                class="switch-focus focus-salesManId"
                @intput-enter="debouncedHandleInputEnter"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <div class="dialog-footer-align" style="margin: 10px 0 5px 0;">
      <el-button
        class="switch-focus focus-button"
        type="primary"
        size="mini"
        plain
        @click="sureHandle"
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
        @click="hideHandle"
        @keyup.right.native="getSureFocus"
        @keyup.left.native="getSureFocus"
      >
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import * as store from "@/utils/store";

let oldKeyScope;

export default {
  name: "SettingCooperatorManager",
  props: {
    staffId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      keyScopes: {
        form: Symbol("settingCooperatorManagerForm"),
        table: Symbol("settingCooperatorManagerTable")
      },
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter), // 解决回车导致两个切换问题
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      header: {
        purchaseManId: null,
        salesManId: null
      },
      purchaseMen: [],
      salesMen: [],
      tableData: [],
      selectedRows: [],
      tabelColumns: [
        { prop: "cooperatorId", label: "往来单位", width: 200 },
        {
          prop: "purchaseManId",
          label: "采购业务员",
          width: 200,
          render: (value, row) => {
            return (
              <ht-autoselect
                size="mini"
                placeholder="采购业务员"
                v-model={row.purchaseManId}
                filterZero
                options={store.purchaseMen()}
                highlight-first-item
                triggerOnFocus={false}
              />
            );
          }
        },
        {
          prop: "salesManId",
          label: "销售业务员",
          width: 200,
          render: (value, row) => {
            return (
              <ht-autoselect
                size="mini"
                placeholder="销售业务员"
                v-model={row.salesManId}
                filterZero
                options={store.salesMen()}
                highlight-first-item
                triggerOnFocus={false}
              />
            );
          }
        }
      ],
      cancelFocus: false
    };
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldValue) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          setTimeout(() => {
            this.updateFocusData({ initial: "focus-purchaseManId" });
            this.setKeyScope(this.keyScopes.form);
          }, 100);
        } else if (oldValue) {
          hotkeys.setScope(oldKeyScope);
          this.$refs.headerForm.resetField();
        }
      },
      immediate: true
    }
  },
  mounted() {
    hotkeys("f3,up,down", { scope: this.keyScopes.form }, (e, handler) => {
      switch (handler.key) {
        case "f3":
          this.sureHandle();
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
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScopes.form);
    hotkeys.deleteScope(this.keyScopes.table);
  },
  methods: {
    store() {
      return store;
    },
    bindKeyCode(e) {
      switch (e.code) {
        case "F3":
          this.sureHandle();
          break;
        default:
          return;
      }
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
      if (keyScope == this.keyScopes.form) {
        this.selectedRows = [];
      }
    },
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
    getSureFocus() {
      this.cancelFocus = false;
      this.updateFocusData({ initial: "focus-button" });
    },
    sureHandle() {
      this.$emit("update:visible", false);
    },
    hideHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="stylus" scoped>
.dialog-body {
    /deep/ .el-dialog__body {
        padding: 5px;
        background-color: #E7EBED;
    }
}
</style>
