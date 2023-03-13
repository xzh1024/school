<template>
  <ht-dialog
    v-bind="$attrs"
    title="新增配件"
    width="1270px"
    top="7vh"
    append-to-body
    v-on="$listeners"
    @opened="openHandle"
    @closed="closeHandle"
  >
    <el-form
      ref="addForm"
      :model="searchForm"
      size="mini"
      label-width="60px"
      label-position="left"
    >
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item label="配件名称" prop="name">
            <ht-autocomplete
              v-model="searchForm.name"
              :fetch-suggestions="autocompleteSearchPartName"
              :trigger-on-focus="false"
              clearable
              highlight-first-item
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="配件编码" prop="code">
            <ht-input v-model="searchForm.code" />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="配件品牌" prop="brand">
            <ht-autocomplete
              v-model="searchForm.brand"
              :fetch-suggestions="autocompleteSearchPartBrand"
              :trigger-on-focus="false"
              placeholder="请选择"
              clearable
              highlight-first-item
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="产地" prop="productionPlace">
            <ht-autocomplete
              v-model="searchForm.productionPlace"
              :fetch-suggestions="autocompleteSearchProductionPlace"
              :trigger-on-focus="false"
              placeholder="请选择"
              clearable
              highlight-first-item
            />
          </el-form-item>
        </el-col>
        <el-col :span="4" style="text-align: right;">
          <el-button type="primary" size="mini" @click.stop="searchHandle">
            查询（F5）
          </el-button>
          <el-button type="primary" size="mini" @click.stop="resetForm">
            重置（F6）
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <ht-table
      ref="addTable"
      :set-height="false"
      :loading="partsSimpleLoading"
      :data="partsSimpleData"
      :selected-rows="selection"
      pagination
      :total="partsSimpleTotal"
      :current-page="page"
      :selectable="selectable"
      :columns="partsTableColumn"
      height="359"
      selection-type="multiple"
      @selectChange="partsSimpleChange"
      @pageChange="pageChange"
    >
      <el-table-column :width="60" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="table-button">
            <el-tooltip :enterable="false" content="添加" placement="top">
              <span
                v-show="!scope.row.disabled"
                class="operation-icon icon-add-info"
                @click.stop="addHandle([scope.row])"
              />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </ht-table>
    <div style="margin-top: 10px;" class="dialog-footer-align">
      <el-button
        :disabled="!selection.length"
        type="primary"
        size="mini"
        plain
        @click.stop="batchAddHandle"
      >
        批量添加（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click.stop="cancelHandle">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { CELL_WIDTH } from "@/constants";
import { mapState } from "vuex";
import { reqPartsSimple } from "@/api/purchase/purchasePrice";
import { searchMixin } from "@/mixins";

const defaultSearchForm = {
  name: "",
  code: "",
  brand: "",
  productionPlace: ""
};

export default {
  name: "AddPartsDialog",
  mixins: [searchMixin],
  props: {
    filterIds: Array
  },
  data() {
    return {
      page: 1,
      searchForm: { ...defaultSearchForm },
      partsSimpleLoading: false,
      partsTableColumn: [
        { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
        { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
        {
          prop: "brand",
          label: "配件品牌",
          width: CELL_WIDTH.brand
        },
        {
          prop: "productionPlace",
          label: "产地",
          width: CELL_WIDTH.productionPlace
        }
      ],
      partsSimpleData: [],
      partsSimpleTotal: 0,
      selection: []
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  methods: {
    openHandle() {
      this.searchHandle();
    },
    closeHandle() {
      this.resetForm();
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    },
    searchHandle() {
      this.pageChange();
    },
    pageChange(page = 1) {
      this.selection = [];
      this.page = page;
      this.partsSimpleLoading = true;
      reqPartsSimple({
        ...this.searchForm,
        page: this.page,
        pageSize: this.pageSize
      })
        .then(data => {
          this.partsSimpleLoading = false;
          this.partsSimpleData = data.rows;
          this.partsSimpleTotal = data.totalSize;
          this.checkSelectionDisabled();
        })
        .catch(() => {
          this.partsSimpleLoading = false;
        });
    },
    checkSelectionDisabled() {
      this.partsSimpleData.forEach(item => {
        if (this.filterIds.indexOf(item.id) != -1) {
          item.disabled = true;
        }
      });
    },
    partsSimpleChange(selection) {
      this.selection = selection;
    },
    resetForm() {
      this.$refs["addForm"].resetFields();
    },
    batchAddHandle() {
      if (this.selection.length) {
        this.addHandle(this.selection, true);
      }
    },
    addHandle(data, isBatch) {
      const changeData = data.map(item => {
        this.partsSimpleData.forEach(listItem => {
          if (item.id == listItem.id) {
            listItem.disabled = true;
          }
        });
        return { ...item, disabled: false };
      });
      this.selection = this.selection.filter(
        item => !data.some(it => it.id === item.id)
      );
      isBatch && (this.selection = []);
      this.$emit("get-add-data", changeData);
    },
    getTable() {
      return this.$refs.addTable.$refs.datatable;
    },
    selectable(row) {
      return !row.disabled;
    }
  }
};
</script>
