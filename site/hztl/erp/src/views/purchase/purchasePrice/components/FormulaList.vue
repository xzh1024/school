<template>
  <div class="container-box" style="margin-bottom: 5px;">
    <ht-card>
      <el-form
        ref="searchForm"
        :model="searchForm"
        size="mini"
        label-width="60px"
        label-position="left"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="公式名称" prop="formulaName">
              <ht-input
                v-model="searchForm.formulaName"
                placeholder="公式名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="公式类型" prop="scopeType">
              <ht-autoselect
                v-model="searchForm.scopeType"
                :options="scopeTypes"
                :trigger-on-focus="false"
                placeholder="公式类型"
                clearable
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="作用公司" prop="companyIds">
              <ht-select
                v-model="searchForm.companyIds"
                :options="store().allCompanies()"
                placeholder="作用公司"
                clearable
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="mini" @click.stop="searchHandle">
              查询（F5）
            </el-button>
            <el-button type="primary" size="mini" @click.stop="resetHandle">
              重置（F6）
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card no-padding title="公式列表" class="auto-card">
      <ht-table
        :loading="tableLoading"
        :data="tableData"
        :columns="tableColumns"
        :selected-rows.sync="selectedRows"
        setting-all-column
        show-table-setting
        v-on="$listeners"
        @table-setting="editColumnsVisible = true"
      />
    </ht-card>
    <edit-columns
      :base-columns="baseTableColumns"
      :table-name="tableName"
      :visible.sync="editColumnsVisible"
      @columns-change="tableColumnsChange"
    />
  </div>
</template>

<script>
import { EditColumns } from "@/components/table";
import { SCOPETYPES } from "@/constants";
import { reqPurchasePriceDefineList } from "@/api/purchase/purchasePrice";
import permMixin from "./permMixin";
import { searchMixin } from "@/mixins";
import { PURCHASE_PRICE_FORMULA_LIST } from "../../constants";
import * as store from "@/utils/store";

const defaultSearchForm = {
  formulaName: "",
  scopeType: undefined,
  companyIds: []
};

export default {
  name: "FormulaList",
  components: {
    EditColumns
  },
  mixins: [searchMixin, permMixin],
  data() {
    return {
      searchForm: { ...defaultSearchForm },
      scopeTypes: SCOPETYPES,
      editColumnsVisible: false,
      tableName: PURCHASE_PRICE_FORMULA_LIST.name,
      tableLoading: false,
      tableData: [],
      selectedRows: [],
      tableColumns: [],
      baseTableColumns: PURCHASE_PRICE_FORMULA_LIST.columns
    };
  },
  watch: {
    selectedRows(value) {
      this.$emit("rows-change", value);
    }
  },
  mounted() {
    this.searchHandle();
  },
  methods: {
    store() {
      return store;
    },
    tableColumnsChange(columns) {
      this.tableColumns = [];
      this.$nextTick(() => {
        this.tableColumns = columns;
      });
    },
    searchHandle(isAdd = false) {
      if (this.tableLoading) return;
      this.tableLoading = true;
      return reqPurchasePriceDefineList(this.searchForm)
        .then(data => {
          this.tableData = data || [];
          if (isAdd) {
            this.selectedRows = this.tableData.length
              ? [this.tableData[0]]
              : [];
          } else {
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
          }
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    resetHandle() {
      this.searchForm = { ...defaultSearchForm };
    }
  }
};
</script>
