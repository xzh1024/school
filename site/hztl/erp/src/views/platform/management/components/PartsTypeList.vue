<template>
  <section class="container-box">
    <ht-card>
      <el-form
        ref="searchForm"
        :model="searchForm"
        class="form-item-small-margin-bottom"
        label-width="70px"
        label-position="left"
        size="mini"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="配件编码" prop="code">
              <ht-input
                v-model="searchForm.code"
                class="input-with-select"
                placeholder="配件编码"
                size="mini"
              >
                <ht-select
                  slot="append"
                  v-model="searchForm.codePattern"
                  :clearable="false"
                  :options="PART_CODE_WAY"
                  placeholder
                  style="width: 100px"
                />
              </ht-input>
            </el-form-item>
            <el-form-item label="配件品牌" prop="brand">
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
          <el-col :span="6">
            <el-form-item prop="info" label="配件信息">
              <ht-input
                v-model="searchForm.info"
                placeholder="输入配件名称、规格、车型等"
              />
            </el-form-item>
            <el-form-item label="产地" prop="productionPlace">
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
          <el-col :span="6">
            <el-form-item label="配件分类" prop="categoryName">
              <ht-autoselect
                v-model="searchForm.categoryName"
                :fetch-suggestions="searchLoadCategory"
                remote
                filter-zero
                clearable
                :trigger-on-focus="false"
                highlight-first-item
                placeholder="配件分类"
              />
            </el-form-item>
            <el-form-item prop="stock_status" label="库存状态">
              <ht-autoselect
                v-model="searchForm.stock_status"
                :options="allStockStatus"
                :trigger-on-focus="false"
                placeholder="库存状态"
                highlight-first-item
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" style="text-align: left;">
            <el-button type="primary" size="mini" @click="searchHandle">
              查询（F5）
            </el-button>
            <el-button type="primary" size="mini" @click="resetForm">
              重置（F6）
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card no-padding class="auto-card">
      <ht-table
        :data="tableData"
        :total="totalSize"
        :current-page="currentPage"
        :selected-rows.sync="selectedRows"
        :key-scope="keyScope"
        selection-type="multiple"
        pagination
        @pageChange="pageChange"
        @hotkeysUp="hotkeysUpHandle"
      >
        <el-table-column
          v-for="(column, index) in tableColumns"
          :key="index"
          :min-width="column.width"
          :prop="column.prop"
          :label="column.label"
          :label-class-name="
            ['qty', 'dynamicQty', 'canOnQty'].includes(column.prop)
              ? 'text-right'
              : ''
          "
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <template v-if="column.prop === 'control'">
              <el-tooltip
                v-show="isHasOn"
                :enterable="false"
                placement="top"
                content="下架"
              >
                <span
                  class="icon operation-icon icon-off-shelves"
                  @click="selectOffClick(scope.row)"
                />
              </el-tooltip>
              <el-tooltip
                v-show="isUncleant || isHasOff"
                :enterable="false"
                placement="top"
                content="上架"
              >
                <span
                  class="icon operation-icon icon-on-shelves"
                  @click="handleCleanOnClick(scope.row)"
                />
              </el-tooltip>
              <el-tooltip :enterable="false" placement="top" content="编辑">
                <span
                  class="icon operation-icon icon-edit-info"
                  @click="editClick(scope.row)"
                />
              </el-tooltip>
            </template>
            <template v-else-if="column.prop === 'qty'">
              <span class="number-font">{{ scope.row[column.prop] }}</span>
            </template>
            <template v-else>
              {{ scope.row[column.prop] }}
            </template>
          </template>
        </el-table-column>
      </ht-table>
      <div v-show="isUncleant" class="buttons">
        <el-button
          :disabled="cantBatchHandle"
          class="first-button"
          type="primary"
          size="mini"
          @click="handleCleanBatchOnClick"
        >
          选中配件清洗上架
        </el-button>
        <el-button
          :disabled="cantAllHandle"
          class="second-button"
          type="primary"
          size="mini"
          @click="handleCleanAllOnClick"
        >
          查询结果全部清洗上架
        </el-button>
      </div>
      <div v-show="isHasOn" class="buttons">
        <el-button
          :disabled="cantBatchHandle"
          class="first-button"
          type="primary"
          size="mini"
          @click="selectBatchOffClick"
        >
          选中配件下架
        </el-button>
        <el-button
          :disabled="cantAllHandle"
          class="second-button"
          style="left: 118px"
          type="primary"
          size="mini"
          @click="selectAllOffClick"
        >
          查询结果全部下架
        </el-button>
      </div>
      <div v-show="isHasOff" class="buttons">
        <el-button
          :disabled="cantBatchHandle"
          class="first-button"
          type="primary"
          size="mini"
          @click="handleCleanBatchOnClick"
        >
          选中配件重新上架
        </el-button>
        <el-button
          :disabled="cantAllHandle"
          class="second-button"
          type="primary"
          size="mini"
          @click="handleCleanAllOnClick"
        >
          查询结果全部重新上架
        </el-button>
      </div>
    </ht-card>

    <edit-part-info
      :visible.sync="showEditPartInfoBox"
      :part-id.sync="partId"
      @initLoadList="initLoadList"
    />
  </section>
</template>

<script>
import {
  handleAllPartsOffShelves,
  handlePartsOffShelves,
  searchPartsForShelvesOn
} from "@/api/bussiness/partsOnShelves";
import { CELL_WIDTH } from "@/constants";
import { mapState } from "vuex";
import EditPartInfo from "@/components/EditPartInfo";
import { searchMixin } from "@/mixins";
import { PART_CODE_WAY } from "@/constants";
import * as store from "@/utils/store";

const UNCLEANT = 0;
const HASON = 1;
const HASOFF = 2;

export default {
  name: "PartsTypeList",
  components: {
    EditPartInfo
  },
  mixins: [searchMixin],
  props: {
    platformKey: String,
    keyScope: {
      type: [Symbol, String],
      default: Symbol("PartsTypeList")
    },
    type: {
      type: [Array, String],
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isUncleant: true,
      isHasOn: false,
      isHasOff: false,
      PART_CODE_WAY,
      allStockStatus: [
        { name: "全部", id: 0 },
        { name: "有可上架库存", id: 1 },
        { name: "无可上架库存", id: 2 }
      ],
      searchForm: {
        searchType: UNCLEANT,
        codePattern: 0
      },
      tableData: [],
      totalSize: 0,
      currentPage: 1,
      selectedRows: [],
      selectRow: {},
      offOffsetId: 0,
      onOffsetId: 0,
      onFailedIds: [],
      onSuccessIds: [],
      showEditPartInfoBox: false,
      partId: null
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    tabLoading: {
      get() {
        return this.loading;
      },
      set(value) {
        this.$emit("update:loading", value);
      }
    },
    cantBatchHandle() {
      return !this.selectedRows.length;
    },
    cantAllHandle() {
      return !this.tableData.length;
    },
    tableColumns() {
      if (this.type == "未清洗配件") {
        return [
          { prop: "control", label: "操作", width: "100", cantExport: true },
          { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
          { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
          { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
          {
            prop: "productionPlace",
            label: "产地",
            width: CELL_WIDTH.productionPlace
          },
          { prop: "qty", label: "实际库存数", width: 120 },
          { prop: "dynamicQty", label: "动态库存数", width: 120 },
          { prop: "canOnQty", label: "可上架库存数", width: 120 },
          {
            prop: "categoryName",
            label: "配件分类",
            width: CELL_WIDTH.categoryName
          },
          {
            prop: "model",
            label: "规格",
            width: CELL_WIDTH.code
          },
          { prop: "productionCode", label: "生产码", width: CELL_WIDTH.code },
          { prop: "posCode", label: "部位码", width: CELL_WIDTH.code },
          { prop: "unit", label: "计量单位", width: CELL_WIDTH.unit }
        ];
      } else {
        return [
          { prop: "control", label: "操作", width: "100", cantExport: true },
          { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
          { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
          { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
          { prop: "oeBrand", label: "清洗品牌", width: CELL_WIDTH.brand },
          {
            prop: "productionPlace",
            label: "产地",
            width: CELL_WIDTH.productionPlace
          },
          { prop: "qty", label: "实际库存数", width: 120 },
          { prop: "dynamicQty", label: "动态库存数", width: 120 },
          { prop: "canOnQty", label: "可上架库存数", width: 120 },
          {
            prop: "categoryName",
            label: "配件分类",
            width: CELL_WIDTH.categoryName
          },
          {
            prop: "model",
            label: "规格",
            width: CELL_WIDTH.code
          },
          { prop: "productionCode", label: "生产码", width: CELL_WIDTH.code },
          { prop: "posCode", label: "部位码", width: CELL_WIDTH.code },
          { prop: "unit", label: "计量单位", width: CELL_WIDTH.unit }
        ];
      }
    }
  },
  watch: {
    type: {
      handler(val) {
        if (val == "未清洗配件") {
          this.isUncleant = true;
          this.isHasOn = false;
          this.isHasOff = false;
          this.initTable(UNCLEANT);
        } else if (val == "已上架配件") {
          this.isUncleant = false;
          this.isHasOn = true;
          this.isHasOff = false;
          this.initTable(HASON);
        } else if (val == "已下架配件") {
          this.isUncleant = false;
          this.isHasOn = false;
          this.isHasOff = true;
          this.initTable(HASOFF);
        }
      },
      immediate: true
    }
  },
  methods: {
    store() {
      return store;
    },
    hotkeysUpHandle(e) {
      this.$emit("hotkeysUp", e);
    },
    _msgbox(mes) {
      this.$message.success({
        message: mes,
        showClose: true
      });
      this.searchHandle();
    },
    resetForm() {
      this.$refs.searchForm.resetFields();
    },
    initTable(val) {
      if (this.tabLoading) return;
      this.searchForm.searchType = val;
      this.searchHandle();
    },
    searchHandle() {
      this.pageChange(1);
    },
    initLoadList() {
      this.pageChange(this.currentPage);
    },
    pageChange(page) {
      this.tabLoading = true;
      this.currentPage = page;
      this.searchForm.page = this.currentPage;
      this.searchForm.pageSize = this.pageSize;
      searchPartsForShelvesOn({
        ...this.searchForm,
        platformKey: this.platformKey
      })
        .then(data => {
          this.tableData = data.rows || [];
          this.totalSize = data.totalSize;
          this.selectedRows = this.tableData.length ? [this.tableData[0]] : [];
          this.tabLoading = false;
        })
        .catch(() => {
          this.tabLoading = false;
        });
    },
    handleCleanOnClick(row) {
      const ids = row.id ? [row.id] : [];
      const isOnAll = false;
      this.$emit("handle-ids", ids, isOnAll, { ...this.searchForm });
    },
    handleCleanBatchOnClick() {
      const ids = this.selectedRows.map(item => item.id) || [];
      const isOnAll = false;
      this.$emit("handle-ids", ids, isOnAll, { ...this.searchForm });
    },
    handleCleanAllOnClick() {
      this.searchForm.pageSize = this.totalSize;
      searchPartsForShelvesOn({
        ...this.searchForm,
        platformKey: this.platformKey
      })
        .then(data => {
          const isOnAll = true;
          let ids = [];
          if (data.rows && data.rows.length) {
            ids = data.rows.map(item => item.id) || [];
          }
          this.$emit("handle-ids", ids, isOnAll, { ...this.searchForm });
        })
        .catch(() => {});
    },
    selectOffClick(row) {
      this.$confirm("确认下架配件？", "下架配件", { type: "warning" })
        .then(() => {
          const ids = [row.id];
          this.handleSelectionOffShelves(ids);
        })
        .catch(() => {});
    },
    selectBatchOffClick() {
      this.$confirm("确认下架配件？", "下架配件", { type: "warning" })
        .then(() => {
          const ids = this.selectedRows.map(item => item.id) || [];
          this.handleSelectionOffShelves(ids);
        })
        .catch(() => {});
    },
    handleSelectionOffShelves(ids) {
      this.tabLoading = true;
      handlePartsOffShelves({ key: this.platformKey, ids })
        .then(() => {
          this._msgbox("配件下架成功！");
        })
        .catch(() => {
          this.tabLoading = false;
        });
    },
    selectAllOffClick() {
      this.$confirm("确认下架配件？", "下架配件", { type: "warning" })
        .then(() => {
          this.tabLoading = true;
          this.getAllOffData();
        })
        .catch(() => {});
    },
    async getAllOffData() {
      try {
        const data = await handleAllPartsOffShelves({
          key: this.platformKey,
          searchCondition: this.searchForm,
          offsetId: this.offOffsetId
        });
        this.offOffsetId = data.offsetId;
        if (data.offNum > 0) {
          this.getAllOffData();
        } else {
          this._msgbox("配件下架成功！");
        }
      } catch (e) {
        this.searchHandle();
      }
    },
    resRepeatOnMes() {
      if (this.onFailedIds.length) {
        this.$msgbox({
          message: `${this.onSuccessIds.length}条配件上架成功，${this.onFailedIds.length}条配件上架失败！`,
          showClose: true
        });
        this.searchHandle();
      } else {
        this._msgbox("配件上架成功！");
      }
    },
    editClick(row) {
      this.partId = row.id;
      this.showEditPartInfoBox = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.buttons
    position: relative
    .first-button
        position: absolute
        top: -30px
        left: 13px
    .second-button
        position: absolute
        top: -30px
        left: 143px
</style>
