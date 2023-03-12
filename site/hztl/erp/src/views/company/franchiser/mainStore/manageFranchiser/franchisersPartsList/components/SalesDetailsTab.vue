<script>
import { precisionsFixed } from "@/mixins";
import { FRANCHISER_SALES_BUSINESS_CASE_LIST } from "@/views/company/franchiser/constants";
import { mapState } from "vuex";
import { getFranchiserSalesDetailsList } from "@/api/franchiser";

const defaultSearchForm = {
  date: []
};

export default {
  name: "SalesDetailsTab",
  mixins: [precisionsFixed],
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      searchForm: { ...defaultSearchForm },
      loading: false,
      tableData: [],
      selectedRows: [],
      tableName: FRANCHISER_SALES_BUSINESS_CASE_LIST.name,
      tablecolumns: FRANCHISER_SALES_BUSINESS_CASE_LIST.columns,
      totalSize: 0,
      currentPage: 1,
      sumData: {
        sumSaleQty: 0,
        sumReturnQty: 0
      }
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  methods: {
    loadData() {
      this.loading = true;
      getFranchiserSalesDetailsList({
        ...this.searchForm,
        id: this.id,
        dateStart:
          this.searchForm.date && this.searchForm.date.length
            ? this.searchForm.date[0]
            : undefined,
        dateEnd:
          this.searchForm.date && this.searchForm.date.length
            ? this.searchForm.date[1]
            : undefined,
        page: this.currentPage,
        pageSize: this.pageSize
      })
        .then(res => {
          this.sumData = {
            sumSaleQty: res.sumSaleQty || 0,
            sumReturnQty: res.sumReturnQty || 0
          };
          this.totalSize = res.totalSize;
          this.tableData =
            res.rows && res.rows.length
              ? res.rows.map(item => ({
                  ...item,
                  canViewSale: res.canViewSale
                }))
              : [];
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
      e.stopPropagation();
      this.pageChange(1);
    },
    resetHandle(e) {
      e.stopPropagation();
      this.searchForm = { ...defaultSearchForm };
    },
    setTotals(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "saleQty":
            sums[index] = this.sumData.sumSaleQty;
            break;
          case "returnQty":
            sums[index] = this.sumData.sumReturnQty;
            break;
          default:
            break;
        }
      });
      return sums;
    }
  },

  render() {
    return (
      <div class="flex-container column-flex" style="height: 100%;">
        <el-form
          size="mini"
          label-position="left"
          label-width="60px"
          class="form-item-small-margin-bottom"
          style="margin: 5px;"
        >
          <el-row gutter={10}>
            <el-col span={9}>
              <el-form-item label="日期范围" prop="date">
                <ht-date-range
                  v-model={this.searchForm.date}
                  shortcuts-type="all"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col span={7}>
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
          class="auto-block"
          v-loading={this.loading}
          data={this.tableData}
          columns={this.tablecolumns}
          table-name={this.tableName}
          selected-rows={this.selectedRows}
          current-page={this.currentPage}
          on-pageChange={this.pageChange}
          on={{
            "update:selectedRows": val => (this.selectedRows = val)
          }}
          summary-method={this.setTotals}
          show-summary
          pagination
          class="ht-flex-height-table"
        />
      </div>
    );
  }
};
</script>
