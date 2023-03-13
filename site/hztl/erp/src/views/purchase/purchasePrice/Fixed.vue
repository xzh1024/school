<template>
  <div class="fixedprice container-box">
    <ht-card>
      <el-form
        :model="searchForm"
        size="mini"
        label-width="60px"
        label-position="left"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="配件编码" prop="code">
              <ht-input v-model="searchForm.code" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="配件名称" prop="name">
              <ht-autocomplete
                v-model="searchForm.name"
                :fetch-suggestions="autocompleteSearchPartName"
                :trigger-on-focus="false"
                :maxlength="50"
                clearable
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
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
          <el-col :span="3">
            <el-form-item
              prop="productionPlace"
              label-width="35px"
              label="产地"
            >
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
          <el-col :span="6">
            <el-form-item label="公司名称" prop="companyIds">
              <ht-select
                v-model="searchForm.companyIds"
                :options="store().allCompanies()"
                placeholder="请选择"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
              />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: right;">
            <el-button type="primary" size="mini" @click.stop="searchInit">
              查询（F5）
            </el-button>
            <el-button type="primary" size="mini" @click.stop="resetHandle">
              重置（F6）
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card class="auto-card" no-padding>
      <div class="flex-container column-flex auto-block">
        <ht-table
          ref="fixedTable"
          :loading="tableLoading"
          :data="tableData"
          :current-page="page"
          :columns="tableColumns"
          :total="total"
          :selected-rows.sync="selectedRows"
          :pagination="isShowPagination"
          selection-type="multiple"
          setting-all-column
          show-table-setting
          class="auto-block"
          @pageChange="searchHandle"
          @rowOperation="handleRowEdit"
          @table-setting="handleTableSetting"
        />
        <div
          :style="isShowPagination ? 'margin-top: -32px' : ''"
          style="margin: 2px 0 4px 4px; width: 380px;"
        >
          <el-button
            :disabled="!canCreate"
            type="primary"
            size="mini"
            @click.stop="addHandle"
          >
            新增固定价格（F2）
          </el-button>
          <el-button
            :disabled="!canImport"
            type="primary"
            size="mini"
            @click="importHandle"
          >
            导入（Alt+I）
          </el-button>
          <el-button
            :disabled="!canExport"
            type="primary"
            size="mini"
            @click="exportHandle"
          >
            导出（Alt+D）
          </el-button>
        </div>
      </div>
    </ht-card>
    <edit-columns
      :base-columns="baseTableColumns"
      :table-name="tableName"
      :visible.sync="editColumnsVisible"
      @columns-change="tableColumnsChange"
      @show-pagination-change="value => (isShowPagination = value)"
    />
    <SetPartsPrice
      :visible.sync="showEditFixedPriceBox"
      :edit-data="editData"
      :isEdit="isEdit"
      @on-change="updatePartFixedPrice"
    />
    <EditSellingPriceFormulaBox
      :visible.sync="editSellingPriceFormulaVisible"
      isBatch
      isAdd
      @on-success="searchInit"
    />
    <import-box
      :visible.sync="importVisible"
      :has-setting="importInfo.hasSetting"
      :options="importInfo.options"
      :req-handler="importFixedPrice"
      remakTitle="导入说明"
      title="批量导入配件固定售价"
    >
      <template>
        <el-form
          ref="importForm"
          :rules="importRules"
          :model="importInfo"
          :show-message="false"
          size="mini"
          label-position="left"
        >
          <el-form-item label-width="0" label=" " prop="companyId">
            <el-row class="m-l-12">
              <el-col :span="8">
                <el-checkbox
                  v-model="importCompanyIdFlags"
                  label="统一作用分公司"
                ></el-checkbox>
              </el-col>
              <el-col :span="10">
                <ht-autoselect
                  :disabled="!importCompanyIdFlags"
                  v-model="importInfo.companyId"
                  :options="store().allCompanies()"
                  :trigger-on-focus="false"
                  placeholder="作用公司"
                  highlight-first-item
                  filter-zero
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            style="text-indent:12px"
            label-width="190px"
            label="自动创建不存在的配件资料"
          >
            <el-switch v-model="importInfo.isAutoCreatePart" />
          </el-form-item>
          <el-form-item
            style="text-indent:12px"
            label-width="190px"
            label="自动覆盖已存在的配置"
          >
            <el-switch v-model="importInfo.isCover" />
          </el-form-item>
          <el-form-item
            style="text-indent:12px"
            label-width="190px"
            label="导入后自动更新库存售价"
          >
            <el-switch v-model="importInfo.isSync" />
          </el-form-item>
        </el-form>
        <div
          slot="remark"
          class="remark-container"
          style="padding:10px;font-size:13px;"
        >
          数据要求：
          <br />
          1、导入数据必须需包含：配件编码、配件名称、至少一个售价，若不设置统一作用分公司，则需在导入字段填写分公司；
          <br />
          数据说明：
          <br />
          1、配件编码、品牌、产地，将与本地配件资料数据进行对比判断是否存在该配件。
          <br />
          2、某行出错不影响其他正确数据更新。
          <br />
          文件要求：
          <br />
          1、数据文件格式（EXCEL文件）且需选择对应工作表。
          <br />
          2、数据读取完成后，设置数据源，在下拉目标字段中选择对应字段。
          <br />
          要求：必须一一对应且不重复。
          <br />
          3、如果是EXCEL文件，则格式要求如下：
          <br />
          （1）第一行表示列标题，不是正式数据。
          <br />
          （2）不能存在合并单元格。
          <br />
          （3）只能有文本，数字，日期等文字信息，不能含有图形，图像等非文字信息。
        </div>
      </template>
    </import-box>
    <ht-dialog
      title="新增固定价格"
      class="dialog-body"
      append-to-body
      width="1248px"
      @close="add.visibile = false"
      :visible="add.visibile"
    >
      <div class="container-box">
        <el-form label-width="70px" size="mini">
          <el-row>
            <el-col :span="4">
              <el-form-item label="配件编码" prop="code">
                <ht-input
                  v-model="add.searchForm.code"
                  class="input-with-select"
                  placeholder="配件编码"
                  size="mini"
                >
                </ht-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="name" label="配件名称">
                <ht-input
                  v-model="add.searchForm.name"
                  placeholder="输入配件名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="配件品牌" prop="brand">
                <ht-autocomplete
                  v-model="add.searchForm.brand"
                  :fetch-suggestions="autocompleteSearchPartBrand"
                  :trigger-on-focus="false"
                  placeholder="配件品牌"
                  highlight-first-item
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="产地" prop="productionPlace">
                <ht-autocomplete
                  v-model="add.searchForm.productionPlace"
                  :fetch-suggestions="autocompleteSearchProductionPlace"
                  :trigger-on-focus="false"
                  placeholder="产地"
                  highlight-first-item
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="model" label="规格">
                <ht-input v-model="add.searchForm.model" placeholder="规格" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button
                style="margin-left:6px;"
                type="primary"
                size="mini"
                @click="
                  () => {
                    loadPartsData(1);
                  }
                "
              >
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" @click="addResetHandle">
                重置（F6）
              </el-button>
            </el-col>
          </el-row>
        </el-form>
        <div class="add-container">
          <ht-setting-table
            table-name="parts-table"
            :set-height="false"
            :loading="add.tableLoading"
            :data="add.tableData"
            :columns="add.tableColumns"
            :selected-rows.sync="add.selectedRows"
            @table-setting="addHandleTableSetting"
            selection-type="multiple"
            height="359"
            :selectable="selectable"
            @selectChange="partsSimpleChange"
            setting-all-column
            show-table-setting
          />
          <el-pagination
            style="margin-top: 6px;"
            @current-change="addPageChange"
            :current-page.sync="add.currentPage"
            :page-size="20"
            small
            layout="total, prev, pager, next"
            :total="add.total"
          >
          </el-pagination>
        </div>
        <div style="margin-top: 10px;" class="dialog-footer-align">
          <el-button
            :disabled="!add.selection.length"
            type="primary"
            size="mini"
            plain
            @click.stop="batchAddHandle"
          >
            勾选配件设置相同价格（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            plain
            @click.stop="add.visibile = false"
          >
            取消（Esc）
          </el-button>
        </div>
      </div>
    </ht-dialog>
    <edit-columns
      :base-columns="add.baseTableColumns"
      :table-name="add.tableName"
      :visible.sync="add.editColumnsVisible"
      @columns-change="addTableColumnsChange"
      @show-pagination-change="value => (add.isShowPagination = value)"
    />
    <export-table
      :base-columns="baseTableColumns"
      :default-data="tableData"
      table-name="renewal-sales-fixedprice-export"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="固定价格"
      is-end-export
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { uniq } from "lodash";
import {
  SetPartsPrice,
  EditSellingPriceFormulaBox,
  permMixin
} from "./components";
import { ExportTable } from "@/components/table";
import {
  reqPurchasePriceFixedDelete,
  reqPurchasePriceFixedList,
  reqPurchasePriceFixedSync,
  reqPartsSimple,
  reqPurchasePriceFixedUpdate,
  reqPurchasePriceFixedCreate
} from "@/api/purchase/purchasePrice";
import { CELL_WIDTH, OTHER_PIRCE_LIST } from "@/constants";
import { partsFixedOptions } from "@/components/importBox/options";
import { searchMixin } from "@/mixins";
import { EditColumns } from "@/components/table";
import ImportBox from "@/components/importBox";
import { reqImportPurchasesFixedPrice } from "@/api/importBox";
import { priceSettingFixedPriceExport } from "@/api/repairs/purchase";
import * as store from "@/utils/store";
const defaultImportInfo = {
  options: partsFixedOptions,
  hasSetting: true,
  companyId: null,
  isAutoCreatePart: false,
  isSync: false,
  isCover: true
};
const defaultSearchForm = {
  name: "",
  code: "",
  brand: "",
  productionPlace: "",
  companyIds: []
};
const defaultAddSearchForm = {
  name: "",
  code: "",
  brand: "",
  productionPlace: ""
};
export default {
  name: "Fixed",
  components: {
    ExportTable,
    EditColumns,
    EditSellingPriceFormulaBox,
    SetPartsPrice,
    ImportBox
  },
  mixins: [searchMixin, permMixin],
  data() {
    const editPartsHandle = (row, e) => {
      e.stopPropagation();
      this.editPartsHandle(row);
    };
    const addPartsHandle = (row, e) => {
      e.stopPropagation();
      this.addPartsHandle(row);
    };
    const syncPartsHandle = (row, e) => {
      e.stopPropagation();
      this.syncPartsHandle(row);
    };
    const deletePartsHandle = (row, e) => {
      e.stopPropagation();
      this.deletePartsHandle(row);
    };
    const indexColumn = {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    };
    const controlsColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 120,
      cantExport: true,
      render: (value, row) => (
        <div>
          <el-tooltip enterable={false} placement="top" content="编辑">
            <span
              v-show={this.hasBelongsPerm("update", row.belongs)}
              on-click={e => editPartsHandle(row, e)}
              class="icon operation-icon icon-edit-info"
            />
          </el-tooltip>
          <el-tooltip
            enterable={false}
            placement="top"
            content="同步修改库存价格"
          >
            <span
              v-show={this.hasBelongsPerm("updateStocks", row.belongs)}
              on-click={e => syncPartsHandle(row, e)}
              class="icon operation-icon icon-update-info"
            />
          </el-tooltip>
          <el-tooltip enterable={false} placement="top" content="删除">
            <span
              v-show={this.hasBelongsPerm("delete", row.belongs)}
              on-click={e => deletePartsHandle(row, e)}
              class="icon operation-icon icon-delete-info"
            />
          </el-tooltip>
        </div>
      )
    };

    return {
      exportVisible: false,
      page: 1,
      searchForm: {
        ...defaultSearchForm
      },
      tableLoading: false,
      baseTableColumns: [
        indexColumn,
        controlsColumn,
        {
          prop: "companyName",
          label: "公司名称",
          width: CELL_WIDTH.companyName
        },
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
        },
        ...OTHER_PIRCE_LIST
      ],
      isShowPagination: true,
      editColumnsVisible: false,
      tableName: "fixePrice",
      tableColumns: [],
      tableData: [],
      selectedRows: [],
      total: 0,
      showEditFixedPriceBox: false,
      editData: [],
      sureEditLoading: false,
      editSellingPriceFormulaVisible: false,
      isPrioritySetting: false,
      importInfo: { ...defaultImportInfo },
      importCompanyIdFlags: false,
      importRules: {},
      importVisible: false,
      addVisible: false,
      add: {
        searchForm: {
          ...defaultAddSearchForm
        },
        tableName: "addfixeprice",
        tableColumns: [],
        baseTableColumns: [
          indexColumn,
          {
            prop: "multiple",
            label: "选择",
            type: "multiple",
            width: CELL_WIDTH.multiple,
            cantExport: true
          },
          {
            prop: "controls",
            type: "controls",
            label: "操作",
            width: 40,
            cantExport: true,
            render: (value, row) =>
              row.disabled ? (
                <div style="display:flex;justify-content:center;">
                  <span class="icon operation-icon icon-add-info text-link disabled" />
                </div>
              ) : (
                <div style="display:flex;justify-content:center;">
                  <el-tooltip enterable={false} placement="top" content="添加">
                    <span
                      v-show={this.hasBelongsPerm("create", row.belongs)}
                      on-click={e => addPartsHandle(row, e)}
                      class="icon operation-icon icon-add-info"
                    />
                  </el-tooltip>
                </div>
              )
          },
          {
            prop: "companyName",
            label: "公司名称",
            width: CELL_WIDTH.companyName
          },
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
        selection: [],
        visibile: false,
        tableData: [],
        selectedRows: [],
        editColumnsVisible: false,
        total: 0,
        pageSize: 20,
        currentPage: 1,
        isShowPagination: true
      },
      filterIds: [],
      isEdit: false
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    canHandleRowEdit() {
      return this.selectedRows.length === 1;
    },
    canCreate() {
      return this.hasBelongsPerm("create");
    },
    canImport() {
      return this.hasBelongsPerm("import");
    },
    canExport() {
      return this.tableData.length && this.hasBelongsPerm("export");
    }
  },
  watch: {
    importCompanyIdFlags(val) {
      //未选择作用分公司，表格里有作用分公司,用表格里的分公司；
      this.importInfo.options.forEach(item => {
        if (item.value === "companyName") {
          item.required = !val;
        }
      });
    }
  },
  mounted() {
    this.searchInit();
    this.importInfo.options.forEach(item => {
      if (item.value === "companyName") {
        item.required = true;
      }
    });
  },
  methods: {
    store() {
      return store;
    },
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    addHandleTableSetting() {
      this.add.editColumnsVisible = true;
    },
    tableColumnsChange(columns) {
      this.tableColumns = [];
      this.$nextTick(() => {
        this.tableColumns = columns;
      });
    },
    handleRowEdit(row) {
      if (!this.canHandleRowEdit) return;
      this.editPartsHandle(row);
    },
    searchInit() {
      this.searchHandle(1);
    },
    searchHandle(page = this.page) {
      this.page = page;
      this.tableLoading = true;
      return reqPurchasePriceFixedList({
        ...this.searchForm,
        page: this.page,
        pageSize: this.pageSize
      })
        .then(data => {
          this.tableLoading = false;
          this.filterIds = uniq(
            this.filterIds.concat(data.rows.map(r => r.partId))
          );
          this.tableData = data.rows || [];
          this.total = data.totalSize;
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
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    deletePartsHandle(row) {
      this.$confirm(`确定要删除 ${row.name}（${row.code}） 的固定价格配置？`, {
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          reqPurchasePriceFixedDelete([row.id])
            .then(() => {
              this.searchHandle();
              this.filterIds.splice(this.filterIds.indexOf(row.partId), 1);
              this.loading = false;
              this.$message({
                type: "success",
                message: "删除成功！",
                showClose: true
              });
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    editPartsHandle(row) {
      this.isEdit = true;
      this.selectedRows = [row];
      this.editData = [{ ...row }];
      this.$nextTick(() => {
        this.showEditFixedPriceBox = true;
      });
    },
    addPartsHandle(row) {
      this.isEdit = false;
      this.selectedRows = [row];
      this.editData = [{ ...row }];
      this.$nextTick(() => {
        this.showEditFixedPriceBox = true;
      });
    },
    async updatePartFixedPrice(row, selection, setting) {
      this.loading = true;
      const partIds = selection.map(s => s.id);
      const formData = {
        brandSet: [],
        brands: [],
        categoryIds: [],
        categorySet: [],
        companyId: setting.companyId ?? this.store().userInfoMsg()?.companyId,
        formulas: row,
        isCover: setting.isCover,
        isSync: setting.isSync,
        name: "",
        partIds,
        partSet: selection,
        scopeType: null
      };
      const editData = {
        id: this.editData[0]?.id,
        salePrices: {
          retail: row.retailPrice,
          platform: row.platformPrice,
          allot: row.transferPrice,
          wholesale: row.wholeSalePrice,
          wholesale1: row.wholeSalePrice1,
          wholesale2: row.wholeSalePrice2,
          wholesale3: row.wholeSalePrice3,
          wholesale4: row.wholeSalePrice4
        },
        updatedBy: this.editData[0]?.accountSetId,
        updatedAt: new Date()
      };
      this.loading = true;
      const res = this.isEdit
        ? await reqPurchasePriceFixedUpdate(editData).catch(
            () => (this.loading = false)
          )
        : await reqPurchasePriceFixedCreate(formData).catch(
            () => (this.loading = false)
          );
      if (!res) return;
      this.filterIds = uniq(this.filterIds.concat(partIds));
      this.loadPartsData();
      this.searchHandle();
      this.loading = false;
      this.$message({
        type: "success",
        message: "更新成功！",
        showClose: true
      });
      // reqPurchasePriceFixedUpdate(row)
      //   .then(() => {
      //     this.searchHandle();
      //     this.loading = false;
      //     this.$message({
      //       type: "success",
      //       message: "更新成功！",
      //       showClose: true
      //     });
      //   })
      //   .catch(() => {
      //     this.loading = false;
      //   });
    },
    syncPartsHandle(row) {
      this.selectedRows = [row];
      if (this.loading) return;
      this.loading = true;
      reqPurchasePriceFixedSync(row.id)
        .then(() => {
          this.searchHandle();
          this.loading = false;
          this.$message({
            type: "success",
            message: "同步价格成功！",
            showClose: true
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    addHandle() {
      if (!this.canCreate) return;
      //this.editSellingPriceFormulaVisible = true;
      this.add.visibile = true;
      this.$nextTick(() => {
        this.loadPartsData();
      });
    },
    resetHandle() {
      this.searchForm = { ...defaultSearchForm };
    },
    addResetHandle() {
      this.add.searchForm = { ...defaultAddSearchForm };
    },
    importHandle() {
      if (!this.canImport) return;
      this.importInfo = { ...defaultImportInfo };
      this.importVisible = true;
      this.$nextTick(() => {
        this.$refs.importForm && this.$refs.importForm.clearValidate();
      });
    },
    importFixedPrice(rows) {
      return new Promise((resolve, reject) => {
        this.$refs.importForm.validate((valid, err) => {
          if (valid) {
            const ImportData = {
              companyId: this.importInfo.companyId,
              isAutoCreatePart: this.importInfo.isAutoCreatePart,
              isSync: this.importInfo.isSync,
              isCover: this.importInfo.isCover,
              rows: rows.map(row => {
                return {
                  brand: row.brand,
                  code: row.code,
                  companyName: row.companyName,
                  name: row.name,
                  productionPlace: row.productionPlace,
                  formulas: {
                    retailPrice: row.retailPrice,
                    platformPrice: row.platformPrice,
                    transferPrice: row.transferPrice,
                    wholeSalePrice: row.wholeSalePrice,
                    wholeSalePrice1: row.wholeSalePrice1,
                    wholeSalePrice2: row.wholeSalePrice2,
                    wholeSalePrice3: row.wholeSalePrice3,
                    wholeSalePrice4: row.wholeSalePrice4
                  }
                };
              })
            };
            if (!this.importCompanyIdFlags) {
              delete ImportData.companyId;
            }
            reqImportPurchasesFixedPrice(ImportData)
              .then(data => {
                this.searchHandle(1);
                resolve(data);
              })
              .catch(() => {
                reject();
              });
          } else {
            reject();
            const errTips = err[Object.keys(err)[0]][0].message;
            this.$message.warning({ message: errTips, showClose: true });
          }
        });
      });
    },
    addTableColumnsChange(columns) {
      this.add.tableColumns = [];
      this.$nextTick(() => {
        this.add.tableColumns = columns;
      });
    },
    addPageChange(page) {
      this.loadPartsData(page);
    },
    loadPartsData(page = 1) {
      this.add.selection = [];
      this.add.currentPage = page;
      this.add.tableLoading = true;
      reqPartsSimple({
        ...this.add.searchForm,
        page: this.add.currentPage,
        pageSize: this.add.pageSize
      })
        .then(data => {
          this.add.tableLoading = false;
          this.add.tableData = data.rows || [];
          this.add.total = data.totalSize;
          this.checkSelectionDisabled();
        })
        .catch(() => {
          this.add.tableLoading = false;
        });
    },
    partsSimpleChange(selection) {
      this.add.selection = selection;
    },
    batchAddHandle() {
      if (this.add.selection.length) {
        this.editData = this.add.selection;
        this.showEditFixedPriceBox = true;
      }
    },
    selectable(row) {
      return !row.disabled;
    },
    checkSelectionDisabled() {
      this.add.tableData.forEach(item => {
        if (this.filterIds.indexOf(item.id) != -1) {
          item.disabled = true;
        }
      });
    },
    exportHandle() {
      if (this.canExport) {
        this.exportVisible = true;
      }
    },
    outExoportHandle(sampleColums) {
      const data = { ...this.searchForm };
      data.accountSetId = this.tableData[0]?.accountSetId;
      data.page = this.page;
      data.pageSize = this.pageSize;
      return priceSettingFixedPriceExport({
        ...data,
        columnsSettings: sampleColums.map(item => {
          return {
            ...item,
            prop: !/价/.test(item.label) ? item.prop : "salePrices." + item.prop
          };
        })
      });
    }
  }
};
</script>
<style scoped lang="scss">
.add-container {
  border: none;
  border-radius: 6px;
  background: #fbfbfb;
}
</style>
