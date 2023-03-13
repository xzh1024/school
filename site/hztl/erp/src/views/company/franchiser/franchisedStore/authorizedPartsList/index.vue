<template>
  <div class="container-box">
    <ht-card>
      <el-button
        :disabled="!tableData.length || !hasAutoPerm('update')"
        type="primary"
        size="mini"
        @click.stop="purchaseZeroHandle"
      >
        零库存配件补货
      </el-button>
      <el-button
        :disabled="!tableData.length || !hasAutoPerm('update')"
        type="primary"
        size="mini"
        @click.stop="purchaseRemindHandle"
      >
        总店提醒补货
      </el-button>
      <el-button
        :disabled="
          !this.selectedRows || !selectedRows.length || !hasAutoPerm('update')
        "
        type="primary"
        size="mini"
        @click.stop="purchaseSelectedHandle"
      >
        选择配件补货
      </el-button>
    </ht-card>
    <ht-card no-padding class="auto-card">
      <div class="flex-container column-flex">
        <el-form
          size="mini"
          label-position="left"
          label-width="60px"
          class="form-item-small-margin-bottom"
          style="margin: 10px;"
        >
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="总店名称">
                <ht-autoselect
                  v-model="searchForm.headCompanyId"
                  :options="mainCompanys"
                  :trigger-on-focus="false"
                  placeholder="总店名称"
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item label="配件编码">
                <ht-input
                  v-model="searchForm.code"
                  class="input-with-select"
                  placeholder="配件编码"
                  clearable
                >
                  <ht-select
                    slot="append"
                    v-model="searchForm.codePattern"
                    :clearable="false"
                    :options="PART_CODE_WAY"
                    style="width: 100px"
                  />
                </ht-input>
              </el-form-item>
              <el-form-item label="配件名称">
                <ht-autocomplete
                  v-model="searchForm.name"
                  :fetch-suggestions="autocompleteSearchPartName"
                  :trigger-on-focus="false"
                  placeholder="配件名称"
                  highlight-first-item
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配件品牌" label-width="74px">
                <ht-autocomplete
                  v-model="searchForm.brand"
                  :fetch-suggestions="autocompleteSearchPartBrand"
                  :trigger-on-focus="false"
                  placeholder="配件品牌"
                  highlight-first-item
                  clearable
                />
              </el-form-item>
              <el-form-item label="产地" label-width="74px">
                <ht-autocomplete
                  v-model="searchForm.productionPlace"
                  :fetch-suggestions="autocompleteSearchProductionPlace"
                  :trigger-on-focus="false"
                  placeholder="产地"
                  highlight-first-item
                  clearable
                />
              </el-form-item>
              <el-form-item label="零库存配件" label-width="74px">
                <ht-autoselect
                  v-model="searchForm.zeroStockPart"
                  :options="ZERO_STOCK_OPTIONS"
                  :trigger-on-focus="false"
                  placeholder="零库存配件"
                  clearable
                  highlight-first-item
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总店提醒补货" label-width="88px">
                <ht-autoselect
                  v-model="searchForm.headRemind"
                  :options="HEAD_REMIND_OPTIONS"
                  :trigger-on-focus="false"
                  placeholder="总店提醒补货"
                  clearable
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item label="是否有在途" label-width="88px">
                <ht-autoselect
                  v-model="searchForm.transitStatus"
                  :options="TRANSIT_STATUS_OPTIONS"
                  :trigger-on-focus="false"
                  placeholder="是否有在途"
                  clearable
                  highlight-first-item
                />
              </el-form-item>
              <div style="text-align: right;">
                <el-button
                  type="primary"
                  size="mini"
                  @click.stop="searchHandle"
                >
                  查询（F5）
                </el-button>
                <el-button type="primary" size="mini" @click.stop="resetHandle">
                  重置（F6）
                </el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <ht-setting-table
          :data="tableData"
          :table-name="tableName"
          :columns="tableColumns"
          :total="totalSize"
          :current-page="currentPage"
          :selectedRows.sync="selectedRows"
          pagination
          selection-type="multiple"
          class="ht-flex-height-table"
          @pageChange="pageChange"
          @rowOperation="purchaseHandle"
        />
      </div>

      <EidtPurchaseBox
        :visible.sync="eidtStockInBoxVisible"
        :infoData="purchaseData"
        :headCompanyId="searchForm.headCompanyId"
        :headRemind="headRemind"
        :zeroStockPart="zeroStockPart"
        @success="loadData"
      />
    </ht-card>
  </div>
</template>

<script>
import EidtPurchaseBox from "./components/EidtPurchaseBox";
import {
  FRANCHISER_PARTS_STORE_LIST,
  HEAD_REMIND_OPTIONS,
  TRANSIT_STATUS_OPTIONS,
  ZERO_STOCK_OPTIONS
} from "@/views/company/franchiser/constants";
import { PART_CODE_WAY } from "@/constants";
import { searchMixin } from "@/mixins";
import { mapState } from "vuex";
import { getAuthorizedPartsList } from "@/api/franchiser";

const defaultSearchForm = {
  codePattern: 0,
  code: "",
  name: "",
  brand: "",
  productionPlace: "",
  transitStatus: 0,
  zeroStockPart: 0,
  headRemind: 0,
  headCompanyId: 0
};

export default {
  name: "AuthorizedPartsList",
  mixins: [searchMixin],
  components: {
    EidtPurchaseBox
  },
  props: {
    mainCompanys: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      searchForm: { ...defaultSearchForm },
      TRANSIT_STATUS_OPTIONS,
      HEAD_REMIND_OPTIONS,
      ZERO_STOCK_OPTIONS,
      PART_CODE_WAY,
      tableData: [],
      tableName: FRANCHISER_PARTS_STORE_LIST.name,
      baseColumns: FRANCHISER_PARTS_STORE_LIST.columns,
      selectedRows: [],
      totalSize: 0,
      currentPage: 1,
      eidtStockInBoxVisible: false,
      purchaseData: [],
      headRemind: 0,
      zeroStockPart: 0
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    tableColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      const purchaseHandle = (row, e) => {
        e.stopPropagation();
        self.purchaseHandle(row);
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
                on-click={e => purchaseHandle(row, e)}
              >
                <span style="font-size: 12px;">一键进货</span>
              </el-link>
            )
          };
        }
        if (item.prop === "label") {
          return {
            ...item,
            render: (value, row) => (
              <div>
                {row.isRemind === 1 ? (
                  <el-tooltip
                    placement="top"
                    content="总店提醒补货"
                    enterable={false}
                  >
                    <i class="text-font-warning el-icon-message-solid icon-style" />
                  </el-tooltip>
                ) : null}
                {!Number(row.dynaQty || 0) ? (
                  <el-tooltip
                    placement="top"
                    content="零库存配件"
                    enterable={false}
                  >
                    <i class="text-font-warning el-icon-s-opportunity icon-style" />
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
    mainCompanys(val) {
      if (val.length) {
        this.searchForm = { ...defaultSearchForm, headCompanyId: val[0].id };
        this.loadData();
      }
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      getAuthorizedPartsList({
        ...this.searchForm,
        page: this.currentPage,
        pageSize: this.pageSize,
        hasPage: true
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
    pageChange(page = 1) {
      this.currentPage = page;
      this.loadData();
    },
    searchHandle() {
      this.pageChange(1);
    },
    resetHandle() {
      this.searchForm = {
        ...defaultSearchForm,
        headCompanyId: this.mainCompanys[0].id
      };
    },
    purchaseZeroHandle() {
      this.purchaseData = [];
      this.headRemind = 0;
      this.zeroStockPart = 1;
      this.eidtStockInBoxVisible = true;
    },
    purchaseRemindHandle() {
      this.purchaseData = [];
      this.headRemind = 1;
      this.zeroStockPart = 0;
      this.eidtStockInBoxVisible = true;
    },
    purchaseSelectedHandle() {
      this.purchaseData = [...this.selectedRows];
      this.eidtStockInBoxVisible = true;
    },
    purchaseHandle(row) {
      this.selectedRows = [row];
      this.purchaseData = [...this.selectedRows];
      this.eidtStockInBoxVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.auto-card {
  margin: 0;
  &::v-deep .box-card {
    margin: 0;
  }
  &::v-deep .el-card {
    margin: 0;
  }
}
.icon-style {
  display: inline-block;
  margin-bottom: 2px;
  vertical-align: middle;
  font-size: 14px;
  cursor: pointer;
}
</style>
