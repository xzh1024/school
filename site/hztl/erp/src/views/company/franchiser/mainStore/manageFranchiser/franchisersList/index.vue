<script>
import AuthorizePartsBox from "../../components/AuthorizePartsBox";
import { FRANCHISERS_INFO_LIST } from "@/views/company/franchiser/constants";
import { mapState } from "vuex";
import { getFranchisersList } from "@/api/franchiser";

const defaultSearchForm = {
  name: "",
  contactName: "",
  phone: ""
};

export default {
  name: "FranchisersList",
  components: {
    AuthorizePartsBox
  },
  data() {
    return {
      searchForm: { ...defaultSearchForm },
      loading: false,
      tableData: [],
      tableName: FRANCHISERS_INFO_LIST.name,
      baseColumns: FRANCHISERS_INFO_LIST.columns,
      selectedRows: [],
      totalSize: 0,
      currentPage: 1,
      authorizePartsBoxVisible: false,
      subCompanyId: 0
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    tableColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      const authorizeHandle = (row, e) => {
        e.stopPropagation();
        self.authorizeHandle(row);
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
                disabled={!this.hasAutoPerm("update")}
                on-click={e => authorizeHandle(row, e)}
              >
                <span style="font-size: 12px;">配件授权</span>
              </el-link>
            )
          };
        }
        return item;
      });
    }
  },
  watch: {
    selectedRows(val) {
      this.$emit("row-change", val);
    }
  },
  mounted() {
    this.searchHandle();
  },
  methods: {
    loadData() {
      this.loading = true;
      getFranchisersList({
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
      this.loadData();
    },
    searchHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.pageChange(1);
    },
    resetHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.searchForm = { ...defaultSearchForm };
    },
    authorizeHandle(row) {
      this.selectedRows = [row];
      this.subCompanyId = row.subCompanyId;
      this.authorizePartsBoxVisible = true;
    },
    handlePartsAuthorizd() {
      this.$emit("authoriz");
    }
  },

  render() {
    return (
      <div class="flex-container column-flex">
        <el-form
          size="mini"
          label-position="left"
          class="form-item-small-margin-bottom"
          style="margin: 0 10px 10px 10px;"
        >
          <el-row gutter={10}>
            <el-col span={5}>
              <el-form-item label="加盟店名称" label-width="73px">
                <ht-input v-model={this.searchForm.name} />
              </el-form-item>
            </el-col>
            <el-col span={5}>
              <el-form-item label="联系人" label-width="45px">
                <ht-input v-model={this.searchForm.contactName} />
              </el-form-item>
            </el-col>
            <el-col span={5}>
              <el-form-item label="联系电话" label-width="60px">
                <ht-input v-model={this.searchForm.phone} />
              </el-form-item>
            </el-col>
            <el-col span={4}>
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
          table-name={this.tableName}
          columns={this.tableColumns}
          total={this.totalSize}
          current-page={this.currentPage}
          selectedRows={this.selectedRows}
          on-pageChange={this.pageChange}
          on-rowOperation={this.authorizeHandle}
          on={{
            "update:selectedRows": val => (this.selectedRows = val)
          }}
          pagination
          class="ht-flex-height-table"
        />

        <AuthorizePartsBox
          visible={this.authorizePartsBoxVisible}
          subCompanyId={this.subCompanyId}
          on={{
            "update:visible": val => (this.authorizePartsBoxVisible = val)
          }}
          on-authoriz={this.handlePartsAuthorizd}
        />
      </div>
    );
  }
};
</script>
