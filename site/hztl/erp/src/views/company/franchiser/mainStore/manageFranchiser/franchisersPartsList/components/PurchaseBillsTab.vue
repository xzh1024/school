<script>
import { precisionsFixed } from "@/mixins";
import {
  BILL_TYPE_OPTIONS,
  FRANCHISER_PURCHASE_BILL_LIST
} from "@/views/company/franchiser/constants";
import { mapState } from "vuex";
import { getFranchiserPurchasesBillList } from "@/api/franchiser";

const defaultSearchForm = {
  date: [],
  type: [1, 2]
};

export default {
  name: "PurchaseBillsTab",
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
      tableName: FRANCHISER_PURCHASE_BILL_LIST.name,
      tablecolumns: FRANCHISER_PURCHASE_BILL_LIST.columns,
      totalSize: 0,
      currentPage: 1,
      sumData: {
        sumQty: 0,
        sumAmount: 0
      }
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  watch: {
    id: {
      handler() {
        this.loadData();
      },
      immediate: true
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      getFranchiserPurchasesBillList({
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
            sumQty: res.sumQty || 0,
            sumAmount: res.sumAmount || 0
          };
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
          case "qty":
            sums[index] = this.sumData.sumQty;
            break;
          case "amount":
            sums[index] = this.sumData.sumAmount;
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
            <el-col span={8}>
              <el-form-item label="单据类型">
                <ht-select
                  v-model={this.searchForm.type}
                  options={BILL_TYPE_OPTIONS}
                  placeholder="单据类型"
                  clearable
                  collapse-tags
                  filterable
                  multiple
                  has-selecte-all-val
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
