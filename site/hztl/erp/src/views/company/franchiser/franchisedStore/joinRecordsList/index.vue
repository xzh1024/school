<script>
import ApplyJoiningBox from "./components/ApplyJoiningBox";
import {
  FRANCHISE_AUDIT_STATUS,
  FRANCHISE_RECORD_LIST
} from "@/views/company/franchiser/constants";
import { exitMainStore, getJoinRecordsList } from "@/api/franchiser";

export default {
  name: "JoinRecordsList",
  components: {
    ApplyJoiningBox
  },
  data() {
    return {
      loading: false,
      tableData: [],
      tableName: FRANCHISE_RECORD_LIST.name,
      baseColumns: FRANCHISE_RECORD_LIST.columns,
      selectedRows: [],
      applyJoiningBoxVisible: false,
      authCode: ""
    };
  },
  computed: {
    tableColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      const exitHandle = (row, e) => {
        e.stopPropagation();
        self.selectedRows = [row];
        self.exitHandle(row);
      };
      const cancelHandle = (row, e) => {
        e.stopPropagation();
        self.selectedRows = [row];
        self.cancelHandle(row);
      };
      const joinHandle = (row, e) => {
        e.stopPropagation();
        self.selectedRows = [row];
        self.joinHandle(row);
      };

      return this.baseColumns.map(item => {
        if (item.type === "controls") {
          return {
            ...item,
            render: (value, row) => {
              return ["加盟审核中", "退出审核中"].includes(
                FRANCHISE_AUDIT_STATUS[row.status]
              ) ? (
                <el-link
                  underline={false}
                  type="primary"
                  style="vertical-align: top;"
                  disabled={!this.hasAutoPerm("update")}
                  on-click={e => cancelHandle(row, e)}
                >
                  <span style="font-size: 12px;">取消</span>
                </el-link>
              ) : FRANCHISE_AUDIT_STATUS[row.status] === "已加盟" ? (
                <el-link
                  underline={false}
                  type="primary"
                  style="vertical-align: top;"
                  disabled={!this.hasAutoPerm("update")}
                  on-click={e => exitHandle(row, e)}
                >
                  <span style="font-size: 12px;">退出</span>
                </el-link>
              ) : ["已退出", "拒绝", "已取消"].includes(
                  FRANCHISE_AUDIT_STATUS[row.status]
                ) ? (
                <el-link
                  underline={false}
                  type="primary"
                  disabled={!this.hasAutoPerm("update")}
                  style="vertical-align: top;"
                  on-click={e => joinHandle(row, e)}
                >
                  <span style="font-size: 12px;">加盟</span>
                </el-link>
              ) : null;
            }
          };
        }
        return item;
      });
    }
  },
  watch: {
    selectedRows(val) {
      if (val.length) {
        this.$emit("row-change", val[0]);
      }
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loading = true;
      getJoinRecordsList()
        .then(res => {
          this.tableData = res.rows || [];
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
          this.loading = false;
          let mainCompanys = [];
          if (this.tableData.length) {
            mainCompanys = this.tableData
              .filter(item =>
                ["已加盟", "退出审核中"].includes(
                  FRANCHISE_AUDIT_STATUS[item.status]
                )
              )
              .map(item => {
                return {
                  id: item.headCompanyId,
                  name: item.headCompanyName
                };
              });
          }
          this.$emit("main-companys-change", [...mainCompanys]);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    joinNewHandle(e) {
      e.stopPropagation();
      this.applyJoiningBoxVisible = true;
    },
    exitHandle(row) {
      this.$confirm("确认申请退出该公司加盟？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          exitMainStore({ headCompanyId: row.headCompanyId })
            .then(() => {
              this.$message.success({
                message: "申请退出成功！",
                showClose: true
              });
              this.loadData();
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    cancelHandle(row) {
      const msg =
        FRANCHISE_AUDIT_STATUS[row.status] === "加盟审核中"
          ? "确认取消加盟申请？"
          : "确认取消退出加盟申请？";
      this.$confirm(msg, "提示", {
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          exitMainStore({ headCompanyId: row.headCompanyId })
            .then(() => {
              this.$message.success({ message: "取消成功！", showClose: true });
              this.loadData();
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    joinHandle(row) {
      this.$confirm("确认申请加盟该公司？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.authCode = row.authCode;
          this.applyJoiningBoxVisible = true;
        })
        .catch(() => {});
    },
    rowHandle(row) {
      this.selectedRows = [row];
      switch (FRANCHISE_AUDIT_STATUS[row.status]) {
        case "加盟审核中":
        case "退出审核中":
          this.cancelHandle(row);
          break;
        case "已加盟":
          this.exitHandle(row);
          break;
        case "已退出":
        case "拒绝":
        case "已取消":
          this.joinHandle(row);
          break;
      }
    }
  },

  render() {
    return (
      <ht-card no-padding title="加盟记录" class="auto-card">
        <div slot="after-title" style="margin-top: -4px;text-align: right;">
          <el-button
            size="mini"
            type="primary"
            on-click={e => this.joinNewHandle(e)}
          >
            加盟新店
          </el-button>
        </div>
        <ht-setting-table
          v-loading={this.loading}
          data={this.tableData}
          table-name={this.tableName}
          columns={this.tableColumns}
          selectedRows={this.selectedRows}
          on={{
            "update:selectedRows": val => (this.selectedRows = val)
          }}
          on-rowOperation={this.rowHandle}
        />

        <ApplyJoiningBox
          visible={this.applyJoiningBoxVisible}
          authCode={this.authCode}
          on-join={this.loadData}
          on={{
            "update:visible": val => (this.applyJoiningBoxVisible = val)
          }}
        />
      </ht-card>
    );
  }
};
</script>
