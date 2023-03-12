<script>
import hotkeys from "hotkeys-js";
import {
  getCompanyFundAccounts,
  updateCompanyFundAccount
} from "@/api/finance/basicSetting";
import { FINANCE_FUND_ACCOUNT_LIST } from "@/views/finance/constans";

export default {
  name: "AccountList",
  props: {
    loading: Boolean,
    seletion: {
      type: Object,
      required: true
    },
    keyScope: {
      type: [String, Symbol],
      default: Symbol("companyFundAccountsList")
    }
  },
  data() {
    return {
      tableName: FINANCE_FUND_ACCOUNT_LIST.name,
      tableData: [],
      selectedRows: []
    };
  },
  computed: {
    relLoading: {
      get() {
        return this.loading;
      },
      set(val) {
        this.$emit("update:loading", val);
      }
    },
    tableColumns() {
      return FINANCE_FUND_ACCOUNT_LIST.columns.map(item => {
        if (item.prop === "controls") {
          return {
            ...item,
            render: (value, row) => (
              <div>
                {row.isDisable ? (
                  <el-tooltip enterable={false} placement="top" content="启用">
                    <span
                      v-show={this.canEnableDisable(row) && !row.isDefault}
                      on-click={e => this.enableHandle(row, e)}
                      class="icon operation-icon icon-enable-info"
                    />
                  </el-tooltip>
                ) : (
                  <el-tooltip enterable={false} placement="top" content="停用">
                    <span
                      v-show={this.canEnableDisable(row) && !row.isDefault}
                      on-click={e => this.disableHandle(row, e)}
                      class="icon operation-icon icon-disable-info"
                    />
                  </el-tooltip>
                )}
                <el-tooltip
                  enterable={false}
                  placement="top"
                  content="查看资金账户出纳流水"
                >
                  <span
                    on-click={e => this.readCashierWaterHandle(row, e)}
                    class="icon operation-icon icon-view-water"
                  />
                </el-tooltip>
              </div>
            )
          };
        }
        if (item.prop === "isDefault") {
          return {
            ...item,
            render: (value, row) =>
              value ? (
                <span class="icon operation-icon icon-selected-info" />
              ) : (
                <el-tooltip
                  enterable={false}
                  placement="top"
                  content="设为默认账户"
                >
                  <span
                    v-show={this.canUpdate(row) && !row.isDisable}
                    class="icon operation-icon icon-select-info"
                    on-click={e => this.setDefaultAccount(row, e)}
                  />
                </el-tooltip>
              )
          };
        }
        if (item.prop === "isDisable") {
          return {
            ...item,
            render: value =>
              this.seletion.isOpened ? (
                <span class={value ? "text-font-danger" : "text-font-success"}>
                  {value ? "停用" : "正常"}
                </span>
              ) : (
                <span class={"text-font-warning"}>未开帐</span>
              )
          };
        }
        if (item.prop === "openingAmount") {
          return {
            ...item,
            formatter: value => (this.seletion.isOpened ? value : "--")
          };
        }
        return item;
      });
    }
  },
  watch: {
    seletion(val) {
      if (val.id) {
        this.loadData();
      } else {
        this.tableData = [];
        this.selectedRows = [];
      }
    },
    selectedRows(val) {
      this.$emit("rows-change", val);
    }
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    hotkeysUp(e, handler) {
      this.$emit("hotkeysUp", e, handler);
    },
    canEnableDisable(row) {
      return this.hasBelongsPerm("deleteDisable", row.belongs);
    },
    canUpdate(row) {
      return this.hasBelongsPerm("update", row.belongs);
    },
    loadData() {
      this.relLoading = true;
      return getCompanyFundAccounts(this.seletion.id)
        .then(res => {
          this.tableData = res || [];
          let selectedRow;
          if (this.selectedRows.length) {
            selectedRow = this.tableData.find(
              item => item.id === this.selectedRows[0].id
            );
          }
          this.selectedRows = selectedRow
            ? [selectedRow]
            : this.tableData.length
            ? [this.tableData[0]]
            : [];
          this.relLoading = false;
        })
        .catch(() => {
          this.relLoading = false;
        });
    },
    enableHandle(row, e) {
      if (e) {
        e.stopPropagation();
      }
      this.selectedRows = [row];
      if (this.canEnableDisable(row)) {
        row.isDisable = false;
        const msg = "启用账户成功！";
        this.updateList(row, msg);
      }
    },
    disableHandle(row, e) {
      if (e) {
        e.stopPropagation();
      }
      this.selectedRows = [row];
      if (row.isDefault) {
        this.$message({
          message: "默认账户不能停用！",
          type: "warning",
          showClose: true
        });
      } else if (this.canEnableDisable(row)) {
        row.isDisable = true;
        const msg = "停用账户成功！";
        this.updateList(row, msg);
      }
    },
    setDefaultAccount(row, e) {
      if (e) {
        e.stopPropagation();
      }
      this.selectedRows = [row];
      if (row.isDisable) {
        this.$message({
          message: "停用账户不能设置为默认账户！",
          type: "warning",
          showClose: true
        });
      } else if (this.canUpdate(row)) {
        row.isDefault = true;
        const msg = "设置默认账户成功！";
        this.updateList(row, msg, true);
      }
    },
    updateList(row, msg) {
      this.relLoading = true;
      updateCompanyFundAccount(row)
        .then(() => {
          this.$message({
            message: msg,
            type: "success",
            showClose: true
          });
          this.relLoading = false;
          this.loadData();
        })
        .catch(() => {
          this.relLoading = false;
          this.loadData();
        });
    },
    readCashierWaterHandle(row, e) {
      if (e) {
        e.stopPropagation();
      }
      this.$emit("readCashierWater", row);
    }
  },
  render() {
    return (
      <ht-setting-table
        loading={this.relLoading}
        tableName={this.tableName}
        columns={this.tableColumns}
        data={this.tableData}
        selectedRows={this.selectedRows}
        on={{
          "update:selectedRows": val => (this.selectedRows = val)
        }}
        keyScope={this.keyScope}
        on-hotkeysUp={this.hotkeysUp}
        on-rowOperation={this.readCashierWaterHandle}
      />
    );
  }
};
</script>
