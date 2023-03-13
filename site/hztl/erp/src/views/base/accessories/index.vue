<template>
  <div class="container-box">
    <div class="header flex-container">
      <div>
        <el-button type="primary" size="mini" @click="searchVisible = true">
          查询（Ins）
        </el-button>
        <el-button
          :disabled="!canCreate"
          type="primary"
          size="mini"
          @click="handleCreatePart"
        >
          新增（F2）
        </el-button>
        <el-button
          :disabled="!canEdit"
          type="primary"
          size="mini"
          @click="handleEditPart"
        >
          编辑（F3）
        </el-button>
        <el-button
          :disabled="!canView"
          type="primary"
          size="mini"
          @click="handleViewPartDetail"
        >
          配件详情（F10）
        </el-button>
        <el-button
          :disabled="!deleteMutlBtn"
          type="primary"
          size="mini"
          @click="handleMutlDeletePart"
        >
          删除勾选配件
        </el-button>
        <el-button
          :disabled="!deleteAllBtn"
          type="primary"
          size="mini"
          @click="handleDeleteAllParts"
        >
          删除全部查询结果
        </el-button>
        <el-button
          :disabled="!canMerge"
          type="primary"
          size="mini"
          @click="handleMergeParts"
        >
          配件资料合并
        </el-button>
        <el-button
          :disabled="!canExport"
          type="primary"
          size="mini"
          @click="exportVisible = true"
        >
          导出（Alt+D）
        </el-button>
        <el-button
          :disabled="!canImport"
          type="primary"
          size="mini"
          @click="importVisible = true"
        >
          导入（Alt+I）
        </el-button>
      </div>

      <VideoPopover :videoUrl="videoUrl" :remark="videoPopoverRemark" />
    </div>
    <ht-card class="auto-card" no-padding no-background>
      <ht-table
        :columns="detailsFormatColumns"
        :loading="tableLoading"
        :data="tableData"
        :total="tableTotal"
        :selected-rows.sync="multipleSelections"
        :pagination="isShowPagination"
        :current-page.sync="currentPage"
        setting-all-column
        show-table-setting
        selection-type="multiple"
        @pageChange="partsSearch"
        @selectChange="handleMultipleSelection"
        @rowOperation="handleEditPart"
        @table-setting="handleTableSetting"
        @sort-change="handleSortChange"
      />
    </ht-card>
    <search-box
      :visible.sync="searchVisible"
      type="PC"
      @searchParamsChange="searchBoxHandle"
    />
    <edit-part-info
      ref="partInfo"
      :visible.sync="editVisible"
      :part-id.sync="partId"
      @initLoadList="initLoadList"
    />
    <batch-edit
      :visible.sync="batchVisible"
      @handleSubmit="handleEditPartsSubmit"
    />
    <ImportPartsBox
      :visible.sync="importVisible"
      :importInfo="importInfo"
      @import="searchBoxHandle"
    />
    <edit-columns
      :base-columns="baseTableColumns"
      :table-name="tableName"
      :visible.sync="editColumnsVisible"
      @columns-change="tableColumnsChange"
      @show-pagination-change="value => (isShowPagination = value)"
    />
    <export-table
      :base-columns="baseTableColumns"
      :default-data="tableData"
      :table-name="tableName"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="配件资料"
      is-end-export
    />
    <ht-dialog
      :visible.sync="mergePartDialog"
      title="配件资料合并"
      width="1320px"
      top="7vh"
      class="merge-part-box"
    >
      <merge-part :merge-part-dialog="mergePartDialog" />
    </ht-dialog>
    <ht-dialog :visible.sync="deletePartDialog" title="提示">
      <ht-card>
        <p>{{ deletePartsTips }}</p>
      </ht-card>
      <div slot="footer" class="dialog-footer-align">
        <el-button
          type="primary"
          plain
          size="mini"
          @click="deletePartDialog = false"
        >
          确 定
        </el-button>
      </div>
    </ht-dialog>
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
      disInternalHotKeys
    />
    <AvaVehModels
      :visible.sync="editAvaVehModelsVisible"
      :part="editAvaVehModelsPart"
      isEdit
      disInternalHotKeys
    />
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import SearchBox from "./components/SearchBox";
import EditPartInfo from "@/components/EditPartInfo";
import VideoPopover from "@/components/VideoPopover";
import BatchEdit from "./components/BatchEdit";
import {
  batchEditParts,
  deleteAllParts,
  deleteMultipleParts,
  exportAllParts,
  reqPartsDelete
} from "@/api/parts";
import ImportPartsBox from "@/components/importBox/ImportPartsBox";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import { partOptions } from "@/components/importBox/options";
import { PART_COUNT } from "@/constants";
import { reqImportParts } from "@/api/importBox";
import { PART_ACCESSORIES_LIST_TABLE } from "@/constants";
import { EditColumns, ExportTable } from "@/components/table";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import MergePart from "./components/MergePart";
import { getPartDetailsAndStocks } from "@/api/base/search";
import {
  setTableSort,
  setLocalTableSort,
  getLocalTableSort
} from "@/utils/tool";

const TYPE = "PC";

export default {
  name: "Accessories",
  components: {
    SearchBox,
    ImportPartsBox,
    BatchEdit,
    EditColumns,
    ExportTable,
    MergePart,
    EditPartInfo,
    AvaVehModels,
    PartsDetailBox,
    VideoPopover
  },
  mixins: [HotkeyMixin],
  data() {
    return {
      detailsColumns: [],
      tableName: PART_ACCESSORIES_LIST_TABLE.name,
      searchForm: {},
      searchVisible: false,
      tableLoading: false,
      isShowPagination: true,
      tableData: [],
      tableTotal: 0,
      currentPage: 1,
      importVisible: false,
      exportVisible: false,
      batchVisible: false,
      importInfo: {
        hasSetting: true,
        options: partOptions,
        offset: PART_COUNT
      },
      multipleSelections: [],
      editColumnsVisible: false,
      mergePartDialog: false,
      editVisible: false,
      partId: null,
      deletePartDialog: false,
      deletePartsTips: null,
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      editAvaVehModelsVisible: false,
      editAvaVehModelsPart: null,
      partDetailBoxVisible: false,
      sort: "",
      videoUrl: "https://dl.hztl3.com/videos/yp_videos/parts.mp4",
      videoPopoverRemark:
        "配件资料管理页面，用于管理账套内的配件资料信息，包括增删改查、合并及导入导出等基本功能外，还支持对接第三放数据平台的标准车型数据。",
      currdelIndex: 0
    };
  },
  computed: {
    baseTableColumns() {
      return PART_ACCESSORIES_LIST_TABLE.columns;
    },
    detailsFormatColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function gotoUpdate(row, e) {
        e.stopPropagation();
        self.handleEditPartInfo(row.partId);
      }
      function deletePartsHandle(row, e) {
        e.stopPropagation();
        self.deletePartsHandle(row, e);
      }
      function handleUpdateAndDelPem(type) {
        return self.handleUpdateAndDelPem(type);
      }
      const editAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.editAvaVehModelsVisible = true;
        this.editAvaVehModelsPart = { ...row, id: row.partId };
      };
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = { ...row, id: row.partId };
      };
      return this.detailsColumns.map(item => {
        if (item.type === "controls") {
          return {
            ...item,
            render: (value, row) => (
              <div>
                {handleUpdateAndDelPem("update") && row.canEdit ? (
                  <el-tooltip placement="top" content="编辑" enterable={false}>
                    <i
                      class="icon operation-icon icon-edit-info"
                      on-click={e => gotoUpdate(row, e)}
                    />
                  </el-tooltip>
                ) : null}
                {handleUpdateAndDelPem("update") && row.canEdit ? (
                  <el-tooltip
                    placement="top"
                    content="编辑标准适用车型"
                    enterable={false}
                  >
                    <i
                      onClick={e => editAvaVehModels(row, e)}
                      class="icon operation-icon avavehmodel-icon"
                    />
                  </el-tooltip>
                ) : null}
                {handleUpdateAndDelPem("delete") && row.canEdit ? (
                  <el-tooltip placement="top" content="删除" enterable={false}>
                    <i
                      class="icon operation-icon icon-delete-info"
                      on-click={e => deletePartsHandle(row, e)}
                    />
                  </el-tooltip>
                ) : null}
              </div>
            )
          };
        } else if (item.type === "avaVehModels") {
          return {
            ...item,
            render: (value, row) =>
              Number(row.avaVehModelCount || 0) ? (
                <a onClick={e => viewAvaVehModels(row, e)} class="ht-link">
                  查看（{Number(row.avaVehModelCount || 0)}）
                </a>
              ) : null
          };
        }
        return item;
      });
    },
    ...mapState("admin", {
      pageSize: state => state.table.pageSize
    }),
    canCreate() {
      return this.hasAutoPerm("create");
    },
    canEdit() {
      return (
        this.hasAutoPerm("update") &&
        this.multipleSelections.length &&
        this.multipleSelections.every(item => item.canEdit)
      );
    },
    canView() {
      return this.multipleSelections.length === 1;
    },
    deleteMutlBtn() {
      return (
        this.hasAutoPerm("delete") &&
        this.multipleSelections.length &&
        this.multipleSelections.every(item => item.canEdit)
      );
    },
    deleteAllBtn() {
      return (
        this.hasAutoPerm("delete") &&
        this.tableData.length &&
        this.tableData.every(item => item.canEdit)
      );
    },
    canMerge() {
      return this.hasCompletePerm("basics.parts.merge");
    },
    canExport() {
      return this.hasAutoPerm("export") && this.tableData.length;
    },
    canImport() {
      return this.hasAutoPerm("import");
    }
  },
  mounted() {
    this.sort = getLocalTableSort(TYPE);
  },
  methods: {
    ...mapActions("baseData/dictionary", ["loadDictionary"]),
    handleUpdateAndDelPem(type) {
      return this.hasAutoPerm(type);
    },
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    tableColumnsChange(columns) {
      this.detailsColumns = [];
      this.$nextTick(() => {
        this.detailsColumns = columns;
      });
    },
    loadData(page, remove = false) {
      this.tableLoading = true;
      return getPartDetailsAndStocks({
        ...page,
        pageSize: this.pageSize,
        ...this.searchForm,
        type: TYPE,
        sort: this.sort
      })
        .then(res => {
          this.tableLoading = false;
          this.tableData =
            res.rows && res.rows.length
              ? res.rows.map(item => ({
                  ...item.part,
                  ...item.stock,
                  ...item.bill
                }))
              : [];
          this.tableTotal = res.totalSize;

          let selectedRow;
          if (this.multipleSelections.length === 1) {
            selectedRow = this.tableData.find(
              item => item.partId === this.multipleSelections[0].partId
            );
          }
          this.multipleSelections = selectedRow ? [selectedRow] : [];

          if (remove) {
            this.$nextTick(() => {
              const trList = Array.from(
                document.querySelectorAll("tbody tr.el-table__row")
              );
              trList[
                Math.min(Math.max(0, this.currdelIndex), trList.length - 1)
              ]?.click();
            });
          }
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    handleSortChange(sort) {
      if (!this.tableData.length) {
        return;
      }
      this.currentPage = 1;
      this.sort = setTableSort(sort);
      setLocalTableSort(this.sort, TYPE);
      this.loadData({ page: this.currentPage });
    },
    partsSearch(page) {
      this.currentPage = page;
      this.loadData({ page: page });
    },
    searchBoxHandle(searchData) {
      this.searchForm = searchData;
      this.currentPage = 1;
      this.loadData({ page: this.currentPage });
    },
    deletePartsHandle(row, e) {
      this.$confirm(`确定要删除配件 ${row.code} ${row.name} 吗？`, "提示", {
        type: "warning"
      })
        .then(() => {
          reqPartsDelete(row.partId).then(() => {
            this.loadData({ page: this.currentPage }, true);
            this.$message.success({ message: "删除配件成功!" });
          });
        })
        .catch(() => {});
      const trList = Array.from(
        document.querySelectorAll("tbody tr.el-table__row")
      );
      this.currdelIndex = trList.indexOf(
        e.target.parentNode.parentNode.parentNode.parentNode
      );
    },
    importParts(params) {
      return new Promise((resolve, reject) => {
        reqImportParts({ rows: params })
          .then(data => {
            resolve(data);
          })
          .catch(() => {
            reject();
          });
      });
    },
    outExoportHandle(sampleColums) {
      return exportAllParts({
        ...this.searchForm,
        columnsSettings: sampleColums
      });
    },
    handleMultipleSelection(rows) {
      this.multipleSelections = [...rows];
    },
    // 批量修改
    handleEditPartsSubmit(partInfo) {
      const ids = [];
      this.multipleSelections.forEach(item => {
        ids.push(item.partId);
      });
      batchEditParts({ ids: ids, ...partInfo })
        .then(() => {
          this.$message.success({ message: "批量修改成功" });
          this.loadData({ page: this.currentPage });
          this.multipleSelections = [];
        })
        .catch(() => {});
    },
    handleMergeParts() {
      this.mergePartDialog = true;
    },
    handleCreatePart() {
      if (!this.hasAutoPerm("create")) return;
      this.partId = null;
      this.editVisible = true;
    },
    initLoadList(val) {
      this.currentPage = 1;
      this.loadData({ page: this.currentPage });
      if (val) {
        this.multipleSelections = [{ partId: val }];
      }
      // 新增或修改成功后更新字典
      this.loadDictionary({ type: "partBrand", isReload: true });
      this.loadDictionary({ type: "productionPlace", isReload: true });
    },
    handleEditPartInfo(partId) {
      this.partId = partId;
      this.editVisible = true;
    },
    handleEditPart() {
      if (!this.canEdit) return;
      if (this.multipleSelections.length === 1) {
        this.handleEditPartInfo(this.multipleSelections[0].partId);
      } else if (this.multipleSelections.length >= 2) {
        this.batchVisible = true;
      }
    },
    handleMutlDeletePart() {
      this.$confirm("确定要批量删除勾选的配件吗？", "提示", {
        type: "warning"
      }).then(() => {
        this.tableLoading = true;
        const partIds = this.multipleSelections.map(item => {
          return item.partId;
        });
        deleteMultipleParts({ partIds: partIds })
          .then(res => {
            if (res.failedCnt) {
              this.deletePartsTips = `「成功删除配件资料${res.successCnt}条, 
                                    ${res.failedCnt}条因为有使用记录, 无法删除, 请单独处理。」`;
              this.deletePartDialog = true;
              this.loadData({ page: this.currentPage });
            } else {
              this.deletePartsTips = `「成功删除配件资料${res.successCnt}条。」`;
              this.deletePartDialog = true;
              this.loadData({ page: this.currentPage });
            }
          })
          .catch(() => {
            this.tableLoading = false;
          });
      });
    },
    handleDeleteAllParts() {
      this.$confirm("确定要删除所有配件吗？", "提示", { type: "warning" }).then(
        () => {
          this.tableLoading = true;
          deleteAllParts({ ...this.searchForm })
            .then(res => {
              if (res.failedCnt) {
                this.deletePartsTips = `「成功删除配件资料${res.successCnt}条, 
                                    ${res.failedCnt}条因为有使用记录, 无法删除, 请单独处理。」`;
                this.deletePartDialog = true;
                this.loadData({ page: this.currentPage });
              } else {
                this.deletePartsTips = `「成功删除配件资料${res.successCnt}条。」`;
                this.deletePartDialog = true;
                this.loadData({ page: this.currentPage });
              }
            })
            .catch(() => {
              this.tableLoading = false;
            });
        }
      );
    },
    handleViewPartDetail() {
      if (!this.canView) return;
      this.partId = this.multipleSelections[0].partId;
      this.partDetailBoxVisible = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.merge-part-box {
  &::v-deep {
    .ht-dialog .el-dialog__body {
      padding: 0px;
    }
  }
}
.container-box {
  &::v-deep {
    .avavehmodel-icon {
      margin-left: 7px;
    }
  }
}
</style>
