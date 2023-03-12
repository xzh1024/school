<template>
  <ht-dialog
    title="配件授权（仅显示未授权配件）"
    width="1270px"
    :visible="relVisible"
    @close="handleClose"
    append-to-body
  >
    <div class="flex-container column-flex" style="height: 550px;">
      <el-form
        size="mini"
        label-position="left"
        label-width="60px"
        class="form-item-small-margin-bottom"
        style="margin: 0 0 10px 0;"
      >
        <el-row :gutter="10">
          <el-col :span="6">
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
          </el-col>
          <el-col :span="5">
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
          <el-col :span="5">
            <el-form-item label="配件品牌">
              <ht-autocomplete
                v-model="searchForm.brand"
                :fetch-suggestions="autocompleteSearchPartBrand"
                :trigger-on-focus="false"
                placeholder="配件品牌"
                highlight-first-item
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="产地" label-width="32px">
              <ht-autocomplete
                v-model="searchForm.productionPlace"
                :fetch-suggestions="autocompleteSearchProductionPlace"
                :trigger-on-focus="false"
                placeholder="产地"
                highlight-first-item
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <div style="text-align: left;">
              <el-button type="primary" size="mini" @click.stop="searchHandle">
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
        v-loading="loading"
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
      />
      <div style="margin: -24px 0 0 10px; width: 110px;">
        已选中 {{ selectedRows.length }} 条配件
      </div>
      <div style="margin-top: 10px; text-align: center;">
        <el-button
          v-loading="loading"
          type="primary"
          size="mini"
          plain
          @click.stop="authorizeSeletedHandle"
        >
          授权选中配件
        </el-button>
        <el-button
          v-loading="loading"
          type="primary"
          size="mini"
          plain
          @click.stop="authorizeAllHandle"
        >
          授权全部查询结果配件
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>

<script>
import { FRANCHISERS_AUTHORIZE_PATS_LIST } from "@/views/company/franchiser/constants";
import { searchMixin } from "@/mixins";
import { PART_CODE_WAY } from "@/constants";
import { mapState } from "vuex";
import { authorizParts, getUnauthorizedPartsList } from "@/api/franchiser";

const defaultSearchForm = {
  codePattern: 0,
  code: "",
  name: "",
  brand: "",
  productionPlace: ""
};

export default {
  name: "AuthorizePartsBox",
  mixins: [searchMixin],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    subCompanyId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      searchForm: { ...defaultSearchForm },
      PART_CODE_WAY,
      loading: false,
      tableData: [],
      tableName: FRANCHISERS_AUTHORIZE_PATS_LIST.name,
      tableColumns: FRANCHISERS_AUTHORIZE_PATS_LIST.columns,
      selectedRows: [],
      totalSize: 0,
      currentPage: 1
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    relVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.searchForm = { ...defaultSearchForm };
        this.loadData();
      }
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      getUnauthorizedPartsList({
        ...this.searchForm,
        subCompanyId: this.subCompanyId,
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
    searchHandle() {
      this.pageChange(1);
    },
    resetHandle() {
      this.searchForm = { ...defaultSearchForm };
    },
    authorizPartsHandle(type, ids) {
      if (this.loading) return;
      this.loading = true;
      authorizParts({
        subCompanyId: this.subCompanyId,
        type,
        ids,
        searchParams: this.searchForm
      })
        .then(() => {
          this.$message.success({ message: "授权配件成功！", showClose: true });
          this.$emit("authoriz");
          this.loadData();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    authorizeSeletedHandle() {
      const ids =
        this.selectedRows.map(item => {
          return item.id;
        }) || [];
      this.authorizPartsHandle(0, ids);
    },
    authorizeAllHandle() {
      this.authorizPartsHandle(1);
    },
    handleClose() {
      this.relVisible = false;
    }
  }
};
</script>
