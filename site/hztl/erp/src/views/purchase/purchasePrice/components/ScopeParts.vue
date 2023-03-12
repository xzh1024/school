<template>
  <div class="border-container">
    <div class="border-title">
      <span class="border-title-text">
        选择作用配件
      </span>
    </div>
    <div
      v-if="ruleForm.scopeType !== 0 && !ruleForm.scopeType && !isBatch"
      class="text-container"
    >
      <div class="text-content">
        请选择公式类型
      </div>
    </div>
    <div v-if="ruleForm.scopeType === 0" class="text-container">
      <div class="text-content">
        全部配件
      </div>
    </div>
    <el-form
      v-if="[1, 2].includes(ruleForm.scopeType)"
      ref="ruleForm"
      :model="ruleForm"
      :show-message="false"
      size="mini"
      label-width="71px"
      label-position="left"
      class="form-item-small-margin-bottom col-height"
    >
      <el-form-item
        v-if="ruleForm.scopeType === 1"
        label="选择分类"
        style="width: 300px;"
      >
        <ht-autoselect
          v-model="categoryName"
          :fetch-suggestions="searchLoadCategory"
          remote
          filter-zero
          clearable
          :trigger-on-focus="false"
          highlight-first-item
          @change="handleCategoryChange"
        />
      </el-form-item>
      <el-form-item
        v-if="ruleForm.scopeType === 1"
        label="已选分类"
        prop="categorySet"
      >
        <div
          v-for="(item, index) in ruleForm.categorySet"
          :key="item.id"
          class="list-view-item inline"
        >
          {{ item.name }}
          <i
            class="el-icon el-icon-close"
            @click.stop="deleteSelectedCategorys(index)"
          />
        </div>
      </el-form-item>
      <el-form-item
        v-if="ruleForm.scopeType === 2"
        label="选择品牌"
        style="width: 300px;"
      >
        <ht-autocomplete
          v-model="brand"
          :fetch-suggestions="autocompleteSearchPartBrand"
          :trigger-on-focus="false"
          placeholder="请选择"
          clearable
          highlight-first-item
          @change="handleBrandChange"
        />
      </el-form-item>
      <el-form-item
        v-if="ruleForm.scopeType === 2"
        label="已选品牌"
        prop="brandSet"
      >
        <div
          v-for="(item, index) in ruleForm.brandSet"
          :key="item.id"
          class="list-view-item inline"
        >
          {{ item.name }}
          <i
            class="el-icon el-icon-close"
            @click.stop="deleteSelectedBrands(index)"
          />
        </div>
      </el-form-item>
    </el-form>
    <div v-if="ruleForm.scopeType === 3 || isBatch" style="height: 100%">
      <el-button type="primary" size="mini" @click.stop="addParts">
        添加配件（F2）
      </el-button>
      <ht-table
        :data="ruleForm.partSet"
        :columns="tableColumns"
        :selected-rows.sync="selectedRows"
        setting-all-column
        show-table-setting
        style="margin-top: 10px; height: calc(100% - 50px)"
        @table-setting="editColumnsVisible = true"
        v-on="$listeners"
      />
      <edit-columns
        :base-columns="baseTableColumns"
        :table-name="tableName"
        :visible.sync="editColumnsVisible"
        @columns-change="tableColumnsChange"
      />
    </div>
    <AddPartsDialog
      :visible.sync="showAddPartsBox"
      :filter-ids="ruleForm.partIds"
      @get-add-data="addTableData"
    />
  </div>
</template>

<script>
import { EditColumns } from "@/components/table";
import AddPartsDialog from "./AddPartsDialog";
import { CELL_WIDTH } from "@/constants";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";

export default {
  name: "ScopeParts",
  components: {
    EditColumns,
    AddPartsDialog
  },
  mixins: [searchMixin],
  props: {
    formulaData: {
      type: Object,
      required: true
    },
    isBatch: Boolean
  },
  data() {
    const handleDelete = (row, e) => {
      e.stopPropagation();
      this.deleteTableData(row);
    };
    const indexColumn = {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    };
    const controlsDeleteColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 60,
      cantExport: true,
      render: (value, row) => (
        <el-tooltip enterable={false} placement="top" content="删除">
          <span
            on-click={e => handleDelete(row, e)}
            class="icon operation-icon icon-delete-info"
          />
        </el-tooltip>
      )
    };

    return {
      showAddPartsBox: false,
      editColumnsVisible: false,
      tableName: "purchasePriceScopePartsList",
      selectedRows: [],
      tableColumns: [],
      baseTableColumns: [
        indexColumn,
        controlsDeleteColumn,
        { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
        { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
        { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
        {
          prop: "productionPlace",
          label: "产地",
          width: CELL_WIDTH.productionPlace
        }
      ],
      rules: [],
      brand: null,
      categoryName: ""
    };
  },
  computed: {
    ruleForm: {
      get() {
        return this.formulaData;
      },
      set() {}
    }
  },
  watch: {
    formulaData: {
      handler(value) {
        if (!value) return;
        this.ruleForm = { ...value };
      },
      immediate: true
    },
    "ruleForm.scopeType"(value) {
      if ([1, 2].includes(value)) {
        setTimeout(() => {
          this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
        }, 100);
      }
    }
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
    handleRowSelected(isDelete = false) {
      if (isDelete) {
        this.selectedRows = this.ruleForm.partSet.length
          ? [this.ruleForm.partSet[0]]
          : [];
      } else {
        this.selectedRows = this.ruleForm.partSet.length
          ? [this.ruleForm.partSet[this.ruleForm.partSet.length - 1]]
          : [];
      }
    },
    addParts() {
      if (this.ruleForm.scopeType === 3 || this.isBatch) {
        this.showAddPartsBox = true;
      }
    },
    deleteTableData(row) {
      this.ruleForm.partIds = this.ruleForm.partIds.filter(
        item => row.id !== item
      );
      this.ruleForm.partSet = this.ruleForm.partSet.filter(
        item => row.id !== item.id
      );
      this.handleRowSelected(true);
    },
    addTableData(data) {
      data.forEach(item => {
        if (!this.ruleForm.partIds.includes(item.id)) {
          this.ruleForm.partIds.push(item.id);
          this.ruleForm.partSet.push(item);
        }
      });
      this.handleRowSelected();
    },
    handleBrandChange(id) {
      setTimeout(() => {
        this.brand = null;
      });
      if (!this.ruleForm.brands.includes(id)) {
        this.ruleForm.brands.push(id);
        this.ruleForm.brandSet.push({
          id: id,
          name: id
        });
      } else {
        this.$message({
          type: "warning",
          message: "该选项已存在",
          showClose: true
        });
      }
    },
    deleteSelectedBrands(index) {
      this.ruleForm.brands = this.ruleForm.brands.filter(
        item => item !== this.ruleForm.brandSet[index].id
      );
      this.ruleForm.brandSet.splice(index, 1);
    },
    handleCategoryChange(categoryName) {
      if (!this.ruleForm.categoryIds.includes(categoryName)) {
        if (categoryName) {
          this.ruleForm.categoryIds.push(categoryName);
          this.ruleForm.categorySet.push({
            id: categoryName,
            name: categoryName
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "该选项已存在",
          showClose: true
        });
      }
    },
    deleteSelectedCategorys(index) {
      this.ruleForm.categoryIds = this.ruleForm.categoryIds.filter(
        item => item !== this.ruleForm.categorySet[index].id
      );
      this.ruleForm.categorySet.splice(index, 1);
    },
    getValidate() {
      let validate = true;
      if (this.ruleForm.scopeType === 1 && !this.ruleForm.categoryIds.length) {
        this.$message.warning({ message: "请选择分类！", showClose: true });
        validate = false;
      } else if (
        this.ruleForm.scopeType === 2 &&
        !this.ruleForm.brands.length
      ) {
        this.$message.warning({ message: "请添输入品牌！", showClose: true });
        validate = false;
      } else if (
        (this.ruleForm.scopeType === 3 || this.isBatch) &&
        !this.ruleForm.partIds.length
      ) {
        this.$message.warning({ message: "请添加配件！", showClose: true });
        validate = false;
      }
      return validate;
    }
  }
};
</script>

<style lang="scss" scoped>
.text-container {
  height: calc(100% - 50px);
  .text-content {
    position: relative;
    top: 50%;
    text-align: center;
  }
}
.col-height {
  height: 100%;
  overflow-y: auto;
}
</style>
