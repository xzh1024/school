<template>
  <ht-dialog
    v-bind="$attrs"
    :title="title"
    width="1100px"
    top="7vh"
    v-on="$listeners"
  >
    <div class="prompt">
      <div>注：1、出纳未开账前，所有收付款都不能处理。</div>
      <div style="margin-top: 5px; text-indent: 25px;">
        2、出纳正式开单后，期初余额数据将不允许修改，因此在开账前，请用户务必谨慎核对无误后，在点击【开账】按钮。
      </div>
    </div>
    <ht-setting-table
      v-switch-focus="focusData"
      :loading="loading"
      :tableName="tableName"
      :columns="tableColumns"
      :data="tableData"
      :selected-rows.sync="selectedRows"
      height="430px"
      @hotkeysUp="e => handleKeyCode(e, keyScopes.table)"
    />
    <div style="margin-top: 10px; text-align: center;">
      <el-button type="primary" size="mini" plain @click="openAccount">
        开账（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="cancelHandle">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import {
  getCompanyFundAccounts,
  openCompanyFundAccounts
} from "@/api/finance/basicSetting";
import { searchMixin } from "@/mixins";
import { FINANCE_FUND_ACCOUNT_OPEN_LIST } from "@/views/finance/constans";

let oldKeyScope;

export default {
  name: "AccountOpeningBox",
  mixins: [searchMixin],
  props: {
    companyData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      keyScopes: {
        table: Symbol("table"),
        amountInput: Symbol("amountInput")
      },
      focusData: {
        updateIndex: null,
        initial: null,
        type: null
      },
      tableName: FINANCE_FUND_ACCOUNT_OPEN_LIST.name,
      loading: false,
      tableData: [],
      selectedRows: [],
      amountInput: "focus-amount-0"
    };
  },
  computed: {
    title() {
      return `${this.companyData.companyName}开帐`;
    },
    tableColumns() {
      return FINANCE_FUND_ACCOUNT_OPEN_LIST.columns.map(item => {
        if (item.prop === "openingAmount") {
          return {
            ...item,
            render: (value, row, index) => (
              <div on-click={e => e.stopPropagation()}>
                <ht-format-number
                  class={`switch-focus focus-amount-${index}`}
                  v-model={row.openingAmount}
                  precisionType="money"
                  size="mini"
                  nativeOn-keyup={e => this.debouncedHandleInputEnter(e)}
                  on-focus={() =>
                    this.setAmountKeyScope(`focus-amount-${index}`)
                  }
                />
              </div>
            )
          };
        }
        return item;
      });
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldValue) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          this.loadData();
        } else if (oldValue) {
          hotkeys.setScope(oldKeyScope);
          this.amountInput = "focus-amount-0";
        }
      },
      immediate: true
    }
  },
  mounted() {
    hotkeys("*", { scope: this.keyScopes.amountInput }, e => {
      this.handleKeyCode(e, this.keyScopes.amountInput);
    });
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScopes.table);
    hotkeys.deleteScope(this.keyScopes.amountInput);
  },
  methods: {
    handleKeyCode(e, keyScope) {
      switch (e.code) {
        case "F3":
          this.openAccount();
          break;
        case "ArrowUp":
          e.stopPropagation();
          if (keyScope == this.keyScopes.amountInput) {
            this.updateFocusData({ type: "up" });
          }
          break;
        case "ArrowDown":
          e.stopPropagation();
          if (keyScope == this.keyScopes.amountInput) {
            this.updateFocusData({ type: "down" });
          }
          break;
        default:
      }
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    setAmountKeyScope(amountInput) {
      this.selectedRows = [];
      hotkeys.setScope(this.keyScopes.amountInput);
      this.amountInput = amountInput;
    },
    debouncedHandleInputEnter(e) {
      e.stopPropagation();
      if (e.keyCode == 13) {
        debounce(100, this.handleInputEnter)();
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
    loadData() {
      this.loading = true;
      getCompanyFundAccounts(this.companyData.companyId)
        .then(res => {
          this.tableData = res || [];
          if (this.tableData.length) {
            this.tableData = this.tableData.mao(item => ({
              ...item,
              openingAmount: 0
            }));
          }
          this.setKeyScope(this.keyScopes.amountInput);
          this.$nextTick(() => {
            this.updateFocusData({ initial: this.amountInput });
          });
          this.loading = false;
        })
        .catch(() => {
          this.setKeyScope(this.keyScopes.table);
          this.loading = false;
        });
    },
    openAccount() {
      const openAccounts = this.tableData.map(item => {
        return {
          fundAccountId: item.id,
          openingAmount: item.openingAmount
        };
      });
      openCompanyFundAccounts({
        openAccounts,
        companyId: this.companyData.companyId
      })
        .then(() => {
          this.$emit("on-success");
          this.$message({
            message: "开账成功!",
            type: "success",
            showClose: true
          });
          this.cancelHandle();
        })
        .catch(() => {});
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
<style lang="stylus" scoped>
.prompt {
    color: red;
    font-size: 13px;
    margin-bottom: 10px;
}

.max-width {
    width: 100%;
}
</style>
