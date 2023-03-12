<script>
import { FRANCHISERS_PENDING_INFO_LIST } from "@/views/company/franchiser/constants";
import AuditBox from "./components/AuditBox";
import { getPendingFranchisersList } from "@/api/franchiser";
import { mapState } from "vuex";
import baseIndexJump from "@/utils/baseIndexJump";

const defaultSearchForm = {
  name: "",
  contactName: "",
  phone: ""
};

export default {
  name: "PendingFranchisersList",
  components: {
    AuditBox
  },
  data() {
    return {
      searchForm: { ...defaultSearchForm },
      loading: false,
      tableData: [],
      tableName: FRANCHISERS_PENDING_INFO_LIST.name,
      baseColumns: FRANCHISERS_PENDING_INFO_LIST.columns,
      selectedRows: [],
      totalSize: 0,
      currentPage: 1,
      auditBoxVisible: false,
      auditInfoData: {},
      name: ""
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    tableColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      const auditHandle = (row, e) => {
        e.stopPropagation();
        self.auditHandle(row);
      };

      return this.baseColumns.map(item => {
        if (item.type === "controls") {
          return {
            ...item,
            render: (value, row) => (
              <el-link
                underline={false}
                type="primary"
                style="vertical-align: top;"
                on-click={e => auditHandle(row, e)}
              >
                <span style="font-size: 12px;">审核</span>
              </el-link>
            )
          };
        }
        return item;
      });
    }
  },
  watch: {
    $route(to, from) {
      if (
        to.path === "/Franchiser" &&
        to.query.tabName === "MainStore" &&
        to.query.childTabName === "AuditFranchiser" &&
        to.query.time &&
        to.query.time !== from.query.time
      ) {
        this.toDoHandle();
      }
    }
  },
  mounted() {
    this.toDoHandle();
  },
  methods: {
    toDoHandle() {
      const { jumpId, jumpData } = baseIndexJump.getInfo();
      if (jumpId === "auditFranchiser" && jumpData) {
        this.name = jumpData;
        baseIndexJump.clearInfo();
        this.searchHandle();
      } else {
        this.searchHandle();
      }
    },
    loadData() {
      if (this.name) {
        this.searchForm.name = this.name;
      }
      this.loading = true;
      return getPendingFranchisersList({
        ...this.searchForm,
        page: this.currentPage,
        pageSize: this.pageSize
      })
        .then(res => {
          this.totalSize = res.totalSize;
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
        })
        .catch(() => {
          this.loading = false;
        });
    },
    pageChange(page) {
      this.currentPage = page;
      return this.loadData();
    },
    async searchHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      await this.pageChange(1);
      if (this.name && this.selectedRows.length) {
        this.auditHandle(this.selectedRows[0]);
        this.name = "";
      }
    },
    resetHandle(e) {
      e.stopPropagation();
      this.searchForm = { ...defaultSearchForm };
    },
    auditHandle(row) {
      this.selectedRows = [row];
      this.auditInfoData = {
        id: row.id,
        name: row.name,
        status: row.status,
        subCompanyId: row.subCompanyId
      };
      this.auditBoxVisible = true;
    },
    handleAuditChange() {
      this.loadData();
      this.$emit("audit");
    }
  },

  render() {
    return (
      <ht-card no-padding class="pending-container">
        <div class="flex-container column-flex">
          <el-form
            size="mini"
            label-position="left"
            class="form-item-small-margin-bottom"
            style="margin: 10px;"
          >
            <el-row gutter={10}>
              <el-col span={6}>
                <el-form-item label="加盟店名称" label-width="73px">
                  <ht-input v-model={this.searchForm.name} />
                </el-form-item>
              </el-col>
              <el-col span={6}>
                <el-form-item label="联系人" label-width="45px">
                  <ht-input v-model={this.searchForm.contactName} />
                </el-form-item>
              </el-col>
              <el-col span={6}>
                <el-form-item label="联系电话" label-width="60px">
                  <ht-input v-model={this.searchForm.phone} />
                </el-form-item>
              </el-col>
              <el-col span={5}>
                <div style="text-align: left;">
                  <el-button
                    type="primary"
                    size="mini"
                    on-click={e => this.searchHandle(e)}
                  >
                    查询（F5）
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    on-click={e => this.resetHandle(e)}
                  >
                    重置（F6）
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <ht-setting-table
            v-loading={this.loading}
            data={this.tableData}
            tableName={this.tableName}
            columns={this.tableColumns}
            total={this.totalSize}
            current-page={this.currentPage}
            selectedRows={this.selectedRows}
            on={{
              "update:selectedRows": val => (this.selectedRows = val)
            }}
            on-pageChange={this.pageChange}
            on-rowOperation={this.auditHandle}
            pagination
            class="ht-flex-height-table"
          />
        </div>

        <AuditBox
          visible={this.auditBoxVisible}
          infoData={this.auditInfoData}
          on={{
            "update:visible": val => (this.auditBoxVisible = val)
          }}
          on-audit={this.handleAuditChange}
        />
      </ht-card>
    );
  }
};
</script>

<style lang="scss" scoped>
.pending-container {
  margin-top: 5px;
  &::v-deep .el-card__body {
    height: calc(100% - 40px);
  }
}
</style>
