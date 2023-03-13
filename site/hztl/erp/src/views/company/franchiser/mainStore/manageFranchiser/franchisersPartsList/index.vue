<script>
import PartsBusinessCaseBox from "./components/PartsBusinessCaseBox";
import {
  FRANCHISERS_PARTS_INFO_LIST,
  ZERO_STOCK_OPTIONS,
  UNDISPOSED_OPTIONS
  // TRANSIT_STATUS_OPTIONS
} from "@/views/company/franchiser/constants";
import { searchMixin } from "@/mixins";
import { PART_CODE_WAY } from "@/constants";
import { mapState } from "vuex";
import {
  getFranchiserPartsList,
  remindFranchiserPurchase,
  revokeParts
} from "@/api/franchiser";

const defaultSearchForm = {
  codePattern: 0,
  code: "",
  name: "",
  brand: "",
  productionPlace: "",
  lastPurchaseDate: [],
  zeroStock: 0,
  undisposed: 0,
  transitStatus: 0
};

export default {
  name: "FranchisersPartsList",
  components: {
    PartsBusinessCaseBox
  },
  props: {
    subCompanyId: {
      type: Number,
      required: true
    }
  },
  mixins: [searchMixin],
  data() {
    return {
      searchForm: { ...defaultSearchForm },
      loading: false,
      tableData: [],
      tableName: FRANCHISERS_PARTS_INFO_LIST.name,
      baseColumns: FRANCHISERS_PARTS_INFO_LIST.columns,
      selectedRows: [],
      totalSize: 0,
      currentPage: 1,
      sumData: {
        sumDynaQty: 0,
        sumTransitQty: 0
      },
      partsBusinessCaseBoxVisible: false,
      partsInfoData: {}
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    tableColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      const remindHandle = (row, e) => {
        e.stopPropagation();
        self.selectedRows = [row];
        self.remindHandle(row);
      };
      const lookUpHandle = (row, e) => {
        e.stopPropagation();
        self.lookUpHandle(row);
      };
      const cancelHandle = (row, e) => {
        e.stopPropagation();
        self.selectedRows = [row];
        self.cancelHandle(row);
      };

      return this.baseColumns.map(item => {
        if (item.type === "controls") {
          return {
            ...item,
            render: (value, row) => (
              <div>
                <el-link
                  underline={false}
                  type="primary"
                  style="vertical-align: top; margin-right: 10px;"
                  disabled={!this.hasAutoPerm("update")}
                  on-click={e => remindHandle(row, e)}
                >
                  <span style="font-size: 12px;">提醒补货</span>
                </el-link>
                <el-link
                  underline={false}
                  disabled={!row.isPurchased || !this.hasAutoPerm("update")}
                  type="primary"
                  style="vertical-align: top; margin-right: 10px;"
                  on-click={e => lookUpHandle(row, e)}
                >
                  <span style="font-size: 12px;">查看明细</span>
                </el-link>
                <el-link
                  underline={false}
                  type="primary"
                  disabled={!this.hasAutoPerm("update")}
                  style="vertical-align: top;"
                  on-click={e => cancelHandle(row, e)}
                >
                  <span style="font-size: 12px;">取消授权</span>
                </el-link>
              </div>
            )
          };
        }

        if (item.prop === "label") {
          return {
            ...item,
            render: (value, row) => (
              <div>
                {!row.isPurchased ? (
                  <el-tooltip
                    placement="top"
                    content="该客户未采购过该配件，不能查看对方经营情况"
                    enterable={false}
                  >
                    <i class="text-font-warning el-icon-warning icon-style" />
                  </el-tooltip>
                ) : !Number(row.dynaQty || 0) ? (
                  <el-tooltip
                    placement="top"
                    content="零库存配件"
                    enterable={false}
                  >
                    <i class="text-font-warning el-icon-s-opportunity icon-style" />
                  </el-tooltip>
                ) : null}
                {row.hasUndisposed ? (
                  <el-tooltip
                    placement="top"
                    content="客户新提交订单待处理"
                    enterable={false}
                  >
                    <i class="text-font-danger el-icon-message-solid icon-style" />
                  </el-tooltip>
                ) : null}
              </div>
            )
          };
        }
        return item;
      });
    }
  },
  watch: {
    subCompanyId() {
      this.loadData();
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      if (this.subCompanyId) {
        getFranchiserPartsList({
          ...this.searchForm,
          lastPurchaseDateStart:
            this.searchForm.lastPurchaseDate &&
            this.searchForm.lastPurchaseDate.length
              ? this.searchForm.lastPurchaseDate[0]
              : undefined,
          lastPurchaseDateEnd:
            this.searchForm.lastPurchaseDate &&
            this.searchForm.lastPurchaseDate.length
              ? this.searchForm.lastPurchaseDate[1]
              : undefined,
          subCompanyId: this.subCompanyId,
          page: this.currentPage,
          pageSize: this.pageSize
        })
          .then(res => {
            this.sumData = { ...res.totalInfo };
            this.totalSize = res.totalSize;
            this.tableData =
              res.rows && res.rows.length
                ? res.rows.map(item => ({
                    ...item,
                    canViewStorage: res.canViewStorage
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
      } else {
        this.tableData = [];
        this.selectedRows = [];
        this.loading = false;
      }
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
    remindHandle(row) {
      this.$confirm("确认提醒该加盟店给该配件补货？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          remindFranchiserPurchase({
            id: row.id
          })
            .then(() => {
              this.loading = false;
              this.$message.success({
                message: "提醒补货成功！",
                showClose: true
              });
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    lookUpHandle(row) {
      this.selectedRows = [row];
      if (!row.isPurchased) {
        return;
      }
      this.partsInfoData = row;
      this.partsBusinessCaseBoxVisible = true;
    },
    cancelHandle(row) {
      this.$confirm("确认取消给该加盟店授权该配件？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          revokeParts({
            subCompanyId: this.subCompanyId,
            ids: [row.id]
          })
            .then(() => {
              this.$message.success({
                message: "取消授权成功！",
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
    setTotals(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "dynaQty":
            sums[index] = this.sumData.sumDynaQty;
            break;
          case "transitQty":
            sums[index] = this.sumData.sumTransitQty;
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
      <div class="flex-container column-flex" style="height: calc(100% - 45px)">
        <el-form
          size="mini"
          label-position="left"
          label-width="60px"
          class="form-item-small-margin-bottom"
          style="margin: 10px;"
        >
          <el-row gutter={10}>
            <el-col span={6}>
              <el-form-item label="配件编码">
                <ht-input
                  v-model={this.searchForm.code}
                  class="input-with-select"
                  placeholder="配件编码"
                  clearable
                >
                  <ht-select
                    slot="append"
                    v-model={this.searchForm.codePattern}
                    clearable={false}
                    options={PART_CODE_WAY}
                    style="width: 100px"
                  />
                </ht-input>
              </el-form-item>
              <el-form-item label="配件名称">
                <ht-autocomplete
                  v-model={this.searchForm.name}
                  fetch-suggestions={this.autocompleteSearchPartName}
                  trigger-on-focus={false}
                  placeholder="配件名称"
                  highlight-first-item
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col span={5}>
              <el-form-item label="配件品牌">
                <ht-autocomplete
                  v-model={this.searchForm.brand}
                  fetch-suggestions={this.autocompleteSearchPartBrand}
                  trigger-on-focus={false}
                  placeholder="配件品牌"
                  highlight-first-item
                  clearable
                />
              </el-form-item>
              <el-form-item label="产地">
                <ht-autocomplete
                  v-model={this.searchForm.productionPlace}
                  fetch-suggestions={this.autocompleteSearchProductionPlace}
                  trigger-on-focus={false}
                  placeholder="产地"
                  highlight-first-item
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col span={6}>
              <el-form-item label="上次进货时间" label-width="88px">
                <ht-date-range
                  v-model={this.searchForm.lastPurchaseDate}
                  shortcuts-type="all"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
              <el-form-item label="零库存配件" label-width="88px">
                <ht-autoselect
                  v-model={this.searchForm.zeroStock}
                  options={ZERO_STOCK_OPTIONS}
                  trigger-on-focus={false}
                  placeholder="零库存配件"
                  clearable
                  highlight-first-item
                />
              </el-form-item>
            </el-col>
            <el-col span={4}>
              <el-form-item label="有未处理订单" label-width="88px">
                <ht-autoselect
                  v-model={this.searchForm.undisposed}
                  options={UNDISPOSED_OPTIONS}
                  trigger-on-focus={false}
                  placeholder="有未处理订单"
                  clearable
                  highlight-first-item
                />
              </el-form-item>
              {
                //   <el-form-item label="是否有在途" label-width="88px">
                //   <ht-autoselect
                //     v-model={this.searchForm.transitStatus}
                //     options={TRANSIT_STATUS_OPTIONS}
                //     trigger-on-focus={false}
                //     placeholder="是否有在途"
                //     clearable
                //     highlight-first-item
                //   />
                // </el-form-item>
              }
              <div style="text-align: right;">
                <el-button
                  type="primary"
                  size="mini"
                  on-click={e => this.searchHandle(e)}
                >
                  查询
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  on-click={e => this.resetHandle(e)}
                >
                  重置
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
          on-rowOperation={this.lookUpHandle}
          on={{
            "update:selectedRows": val => (this.selectedRows = val)
          }}
          summary-method={this.setTotals}
          show-summary
          pagination
          class="ht-flex-height-table"
        />

        <PartsBusinessCaseBox
          visible={this.partsBusinessCaseBoxVisible}
          infoData={this.partsInfoData}
          on={{
            "update:visible": val => (this.partsBusinessCaseBoxVisible = val)
          }}
        />
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
.icon-style {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 2px;
  vertical-align: middle;
  font-size: 14px;
  cursor: pointer;
}
</style>
