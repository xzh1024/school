<template>
  <section class="container-box">
    <div class="header header-between">
      <div>
        <el-button
          :disabled="!canCreate"
          type="primary"
          size="mini"
          @click="resetPage"
        >
          开单（F2）
        </el-button>
        <el-button type="primary" size="mini" @click="showSearchBox">
          查询（Ins）
        </el-button>
        <el-button
          :disabled="!canShowPartDetailBox"
          type="primary"
          size="mini"
          @click="showPartDetailBox"
        >
          配件详情（F10）
        </el-button>
        <el-button
          :disabled="!canShowStocksLockedBox"
          type="primary"
          size="mini"
          @click="showStocksLockedBox"
        >
          锁定数明细
        </el-button>
        <el-checkbox v-model="filterNoStock" style="margin-left: 10px;">
          过滤无库存记录配件（Alt+O）
        </el-checkbox>
      </div>
      <div>
        <el-link
          :underline="false"
          style="margin-right: 10px"
          @click="backList"
        >
          返回列表
          <span class="el-icon-arrow-right" />
        </el-link>
        <VideoPopover :videoUrl="videoUrl" :remark="videoPopoverRemark" />
      </div>
    </div>
    <ht-card class="auto-card" no-padding>
      <resize-box :default-len="250" is-column>
        <template v-slot:block1>
          <!-- 配件查询列表 -->
          <parts-search
            ref="partsSearch"
            :can-edit="canEdit"
            :filterNoStock="filterNoStock"
            :type="TYPE"
            @rows-change="handlePartsSearchRowsChange"
            @detailAdd="handleDetailAdd"
          />
        </template>

        <template v-slot:block2>
          <div class="container-box">
            <operations-bar
              :header="header"
              :refresh-page="refreshPage"
              @resetPage="resetPage"
              @export="exportVisible = true"
            />
            <ht-card style="margin: 5px 0 0 0;">
              <!-- 单据头部表单 -->
              <header-form
                ref="headerForm"
                :header-prop="header"
                :can-edit="canEdit"
              />
            </ht-card>
            <ht-card no-padding class="auto-card" style="margin: -5px 0 0 0;">
              <!-- 单据明细列表 -->
              <ht-setting-table
                ref="details"
                :loading="detailsLoading"
                :data="details"
                :columns="tableColumns"
                :table-name="tableName"
                :selected-rows.sync="selectedRows"
                :summary-method="setTotals"
                show-summary
                @rowOperation="handleDetailEdit"
                @sort-change="handleSortChange"
              />
            </ht-card>
          </div>
        </template>
      </resize-box>
    </ht-card>

    <SubsBox
      :visible.sync="showSubsBox"
      :infoData="subsInfo"
      :takingId="takingId"
    />
    <edit-box
      :edit="editBoxIsEditMode"
      :info="editBoxDetailInfo"
      :infoData="subsInfo"
      :visible.sync="editBoxVisible"
      @addOrEditComfirm="billRenew"
    />
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
      disInternalHotKeys
    />
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
    <storage-stocks-locked-dialog
      :visible="storageStocksLockedVisible"
      :stockFilter="stockFilter"
      @close="storageStocksLockedVisible = false"
    />
    <export-table
      :base-columns="tableColumns"
      :default-data="details"
      table-name="stocktaking-bill-export"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="盘点单"
      is-end-export
      :defaultNoExportList="['vehModel', 'avaVehModel', 'avaVehModels']"
      @sortChange="handleExportSortChange"
    />
  </section>
</template>

<script>
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog";
import OperationsBar from "./components/OperationsBar"; // 操作按钮行
import resizeBox from "@/components/resizeBox"; // 上下窗口大小调整（拖拽）
import PartsSearch from "./components/PartsSearch"; // 配件搜索
import HeaderForm from "./components/HeaderForm"; // 头部表单
import SubsBox from "./components/SubsBox";
import EditBox from "./components/EditBox"; // 编辑弹框
import CanDo from "./mixins/CanDo";
import { hotkeyMixin, precisionsFixed } from "@/mixins";
import {
  stocktakingBillCreate,
  stocktakingBillDetailCreate,
  stocktakingBillDetailUpdate,
  stocktakingBillQuery,
  stocktakingDetailDelete,
  stocktakingBillExport
} from "@/api/store/stocktaking"; // 后端接口
import { mapState } from "vuex";
import { dateFormat } from "@/utils/date"; // 时间格式化
import { CELL_WIDTH } from "@/constants";
import { reduce } from "lodash";
import {
  setTableSort,
  setLocalTableSort,
  getLocalTableSort
} from "@/utils/tool";
import VideoPopover from "@/components/VideoPopover";
import { ExportTable } from "@/components/table";
import { NO_PRICE_PERM_VALUE } from "@/constants/store";
const TYPE = "PD";

export default {
  name: "StocktakingBill",
  components: {
    OperationsBar,
    resizeBox,
    PartsSearch,
    HeaderForm,
    SubsBox,
    EditBox,
    AvaVehModels,
    PartsDetailBox,
    StorageStocksLockedDialog,
    VideoPopover,
    ExportTable
  },
  mixins: [CanDo, hotkeyMixin, precisionsFixed],
  data() {
    const handleShowSubsBox = (row, e) => {
      e.stopPropagation();
      this.selectedRows = [row];
      this.handleShowSubsBox(row);
    };
    const handleDetailEdit = (row, e) => {
      e.stopPropagation();
      this.selectedRows = [row];
      this.handleDetailEdit(row);
    };
    const handleDelete = (row, e) => {
      e.stopPropagation();
      this.selectedRows = [row];
      this.handleDelete(row);
    };
    const controlsColumn = {
      label: "操作",
      prop: "controls",
      width: 130,
      cantExport: true,
      render: (value, row) => (
        <div>
          <el-link
            underline={false}
            type="primary"
            on-click={e => handleShowSubsBox(row, e)}
            class="text-link"
          >
            <span style="font-size: 12px;">查看明细</span>
          </el-link>
          {this.canEdit ? (
            <el-tooltip placement="top" content="编辑" enterable={false}>
              <i
                class="icon operation-icon icon-edit-info"
                on-click={e => handleDetailEdit(row, e)}
              />
            </el-tooltip>
          ) : null}
          {this.canEdit ? (
            <el-tooltip placement="top" content="删除" enterable={false}>
              <i
                class="icon operation-icon icon-delete-info"
                on-click={e => handleDelete(row, e)}
              />
            </el-tooltip>
          ) : null}
        </div>
      )
    };

    const viewAvaVehModels = (row, e) => {
      e.stopPropagation();
      this.avaVehModelsVisible = true;
      this.avaVehModelsPart = {
        id: row.partId,
        code: row.code
      };
    };

    return {
      header: {
        billDate: dateFormat(new Date())
      },
      takingId: null,
      details: [],
      tableName: "StocktakingBillDetailList",
      selectedRows: [],
      detailsLoading: false,
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        controlsColumn,
        {
          prop: "code",
          label: "配件编码",
          width: CELL_WIDTH.code,
          attrs: {
            sortable: "custom"
          }
        },
        {
          prop: "name",
          label: "配件名称",
          width: CELL_WIDTH.name,
          attrs: {
            sortable: "custom"
          }
        },
        {
          prop: "brand",
          label: "配件品牌",
          width: CELL_WIDTH.brand,
          attrs: {
            sortable: "custom"
          }
        },
        {
          prop: "productionPlace",
          label: "产地",
          width: CELL_WIDTH.productionPlace,
          attrs: {
            sortable: "custom"
          }
        },
        { prop: "property", label: "配件性质", width: CELL_WIDTH.property },
        {
          label: "规格",
          prop: "model",
          width: CELL_WIDTH.model,
          isHide: true
        },
        {
          prop: "ownerCompanyName",
          label: "货主",
          width: CELL_WIDTH.companyName
        },
        {
          prop: "profitLossQty",
          label: "盈亏数",
          width: CELL_WIDTH.qty,
          type: "number"
        },
        {
          prop: "profitLossTaxedAmount",
          label: "盈亏额",
          width: CELL_WIDTH.money,
          type: "number",
          render: (value, row) => (
            <div class="text-right number-font">
              {row.profitLossTaxedAmount == NO_PRICE_PERM_VALUE
                ? "无权查看"
                : row.profitLossTaxedAmount}
            </div>
          )
        },
        {
          prop: "bookQty",
          label: "账面数",
          width: CELL_WIDTH.qty,
          type: "number"
        },
        {
          prop: "realQty",
          label: "盘点数",
          width: CELL_WIDTH.qty,
          type: "number"
        },
        {
          prop: "bookTaxedAmount",
          label: "库存金额",
          width: CELL_WIDTH.money,
          type: "number",
          render: (value, row) => (
            <div class="text-right number-font">
              {row.bookTaxedAmount == NO_PRICE_PERM_VALUE
                ? "无权查看"
                : row.bookTaxedAmount}
            </div>
          )
        },
        {
          prop: "realTaxedAmount",
          label: "调整金额",
          width: CELL_WIDTH.money,
          type: "number",
          render: (value, row) => (
            <div class="text-right number-font">
              {row.realTaxedAmount == NO_PRICE_PERM_VALUE
                ? "无权查看"
                : row.realTaxedAmount}
            </div>
          )
        },
        {
          prop: "warehouseName",
          label: "盘点仓库",
          width: CELL_WIDTH.warehouseName,
          attrs: {
            sortable: "custom"
          }
        },
        {
          prop: "positionName",
          label: "盘前货位",
          width: CELL_WIDTH.positionName,
          attrs: {
            sortable: "custom"
          }
        },
        {
          prop: "vehModel",
          label: "车型",
          width: CELL_WIDTH.vehModel,
          attrs: {
            sortable: "custom"
          }
        },
        {
          label: "适用车型",
          prop: "avaVehModel",
          width: CELL_WIDTH.vehModel,
          attrs: {
            sortable: "custom"
          }
        },
        {
          prop: "avaVehModels",
          label: "标准适用车型",
          width: CELL_WIDTH.avaVehModels,
          defaultShow: true,
          render: (value, row) => (
            <a onClick={e => viewAvaVehModels(row, e)} class="ht-link">
              查看
            </a>
          )
        }
      ],
      showSubsBox: false,
      subsInfo: {},
      // 编辑弹窗
      editBoxIsEditMode: false,
      editBoxDetailInfo: {},
      editBoxVisible: false,
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      partsSearchRows: [],
      partDetailBoxVisible: false,
      partId: null,
      storageStocksLockedVisible: false,
      stockFilter: {},
      filterNoStock: true,
      sort: "",
      TYPE,
      videoUrl: "https://dl.hztl3.com/videos/yp_videos/parts_inventory.mp4",
      videoPopoverRemark:
        "配件盘点页面，用户商品库存盘点，支持盘数量、金额、货位。",
      exportVisible: false,
      exportSort: "",
      currentRow: null
    };
  },
  computed: {
    ...mapState("admin", {
      pageSizes: state => state.table.pageSize,
      userInfoMsg: state => state.user.userInfoMsg
    }),
    canShowPartDetailBox() {
      return this.partsSearchRows.length || this.selectedRows.length;
    },
    canShowStocksLockedBox() {
      return this.partsSearchRows.length || this.selectedRows.length;
    }
  },
  watch: {
    takingId(val, oldVal) {
      if (!val && oldVal) {
        this.setDefaultData();
      }
    },
    selectedRows(val) {
      if (
        val &&
        val.length &&
        this.$refs.details?.$el.querySelector(".is-hotkey-active")
      ) {
        this.partId = val[0].partId;
      }
    },
    filterNoStock(val) {
      if (
        !localStorage[TYPE] ||
        JSON.parse(localStorage[TYPE]).filterNoStock !== val
      ) {
        localStorage[TYPE] = JSON.stringify({ filterNoStock: val });
      }
    }
  },
  mounted() {
    this.sort = getLocalTableSort(TYPE);
    this.setDefaultData();
    try {
      if (localStorage[TYPE]) {
        this.filterNoStock = JSON.parse(localStorage[TYPE]).filterNoStock;
      }
    } catch (e) {
      console.log(e);
    }
  },
  activated() {
    if (this.$route.query.takingId) {
      this.takingId = Number(this.$route.query.takingId);
      this.refreshPage();
    } else {
      this.takingId = null;
      this.$nextTick(() => {
        this.$refs.headerForm.clearValidate();
      });
    }
  },
  methods: {
    handleExportSortChange(sort) {
      this.exportSort = setTableSort(sort);
    },
    outExoportHandle(sampleColums) {
      const data = {};
      data.takingId = this.header.takingId;
      data.sort = this.exportSort;
      return stocktakingBillExport({
        ...data,
        columnsSettings: sampleColums.map(item => {
          return {
            ...item
          };
        })
      });
    },
    backList() {
      // 返回盘点单列表
      this.$router.push({ path: "/StocktakingList" });
    },
    refreshPage(from) {
      // CommonOperations在做完操作后会调用
      if (!this.takingId) return;
      if (from === "Delete") {
        this.closePage();
        return;
      }
      // 查询单头、明细
      this.detailsLoading = true;
      return stocktakingBillQuery({ takingId: this.takingId, sort: this.sort })
        .then(data => {
          this.header = data.header;
          this.details = data.details || [];
          let selectedRow;
          if (this.selectedRows.length) {
            selectedRow = this.details.find(
              item => item.id === this.selectedRows[0].id
            );
          }
          this.selectedRows = selectedRow
            ? [selectedRow]
            : this.details.length
            ? [this.details[0]]
            : [];
          this.$nextTick(() => {
            this.$refs.headerForm.clearValidate();
          });
          this.detailsLoading = false;
        })
        .catch(() => {
          this.detailsLoading = false;
        });
    },
    handleSortChange(sort) {
      if (!this.details.length) {
        return;
      }
      this.sort = setTableSort(sort);
      setLocalTableSort(this.sort, TYPE);
      this.refreshPage();
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
          case "profitLossQty":
            sums[index] = this.precisionFormat(
              reduce(
                this.details,
                (sum, item) => sum + parseFloat(item.profitLossQty),
                0
              ),
              "qty"
            );
            break;
          case "profitLossTaxedAmount":
            sums[index] = this.precisionFormat(
              reduce(
                this.details,
                (sum, item) => sum + parseFloat(item.profitLossTaxedAmount),
                0
              ),
              "money"
            );
            break;
          case "bookQty":
            sums[index] = sums[index] = this.precisionFormat(
              reduce(
                this.details,
                (sum, item) => sum + parseFloat(item.bookQty),
                0
              ),
              "qty"
            );
            break;
          case "realQty":
            sums[index] = sums[index] = this.precisionFormat(
              reduce(
                this.details,
                (sum, item) => sum + parseFloat(item.realQty),
                0
              ),
              "qty"
            );
            break;
          case "bookTaxedAmount":
            sums[index] = this.precisionFormat(
              reduce(
                this.details,
                (sum, item) => sum + parseFloat(item.bookTaxedAmount),
                0
              ),
              "money"
            );
            break;
          case "realTaxedAmount":
            sums[index] = this.precisionFormat(
              reduce(
                this.details,
                (sum, item) => sum + parseFloat(item.realTaxedAmount),
                0
              ),
              "money"
            );
            break;
          default:
            break;
        }
      });
      return sums;
    },
    showSearchBox() {
      this.$refs.partsSearch && this.$refs.partsSearch.showSearchBox();
    },

    handlePartsSearchRowsChange(rows) {
      this.partsSearchRows = rows || [];
      if (this.partsSearchRows.length) {
        this.partId = this.partsSearchRows[0].partId;
      }
    },
    setDefaultData() {
      this.header = { billDate: dateFormat(new Date()) };
      this.details = [];
    },
    resetPage() {
      // 重新开单
      if (!this.canCreate) {
        return false;
      }
      if (this.header.takingId > 0) {
        this.$router.replace({ path: "/StocktakingBill" });
      }
      this.takingId = null;
      this.setDefaultData();
      this.$nextTick(() => {
        this.$refs.headerForm.clearValidate();
      });
    },

    handleShowSubsBox(row) {
      this.showSubsBox = true;
      this.subsInfo = row;
    },
    handleDetailAdd(row) {
      console.log(row);
      this.subsInfo = {
        bookQty: row.qty,
        bookTaxedAmount: row.taxedAmount
      };
      this.openDialog("add", row);
    },
    handleDetailEdit(row) {
      this.subsInfo = row;
      this.openDialog("edit", row);
    },
    openDialog(type, row) {
      if (!this.canEdit) return;

      this.$refs.headerForm.$refs.header.validateField("billDate", error => {
        if (!error) {
          this.editBoxIsEditMode = type === "edit" ? true : false;
          this.editBoxDetailInfo = { ...row };
          this.editBoxVisible = true;
        }
      });
    },
    handleDelete(row) {
      let tips = "";
      if (this.details.length <= 1) {
        tips = "该订单只有一条明细，删除后订单也将删除，确定继续删除？";
      } else {
        tips = "确定要删除该条订单明细？";
      }
      this.$confirm(tips, "提示", {
        type: "warning"
      }).then(() => {
        stocktakingDetailDelete({
          takingId: this.takingId,
          takingDetailId: row.takingDetailId
        })
          .then(() => {
            if (this.details.length <= 1) {
              this.$confirm(
                `单据 ${this.header.billNo} 已删除，是否重新开单？`,
                "提示",
                {
                  type: "warning"
                }
              )
                .then(() => {
                  this.resetPage();
                })
                .catch(() => {
                  this.closePage();
                });
            } else {
              this.$message.success({
                message: "删除订单明细成功",
                showClose: true
              });
              this.refreshPage();
            }
          })
          .catch(err => {
            this.$alert(err.message, "错误");
          });
      });
    },
    billRenew(params) {
      if (!this.$route.query || !this.$route.query.takingId) {
        const _params = {
          header: {
            takingId: this.takingId || 0,
            billDate: this.header.billDate,
            remark: this.header.remark
          },
          ...params
        };
        stocktakingBillCreate(_params).then(res => {
          this.$message.success({ message: "保存成功!", showClose: true });
          if (this.takingId !== res.takingId) {
            this.takingId = res.takingId;
            this.$router.replace({
              path: "/StocktakingBill",
              query: { takingId: res.takingId }
            });
          }
          this.editBoxVisible = false;
          this.refreshPage();
        });
      } else {
        const _params = {
          takingId: this.takingId || 0,
          takingDetailId: this.editBoxDetailInfo.takingDetailId || 0,
          ...params
        };
        if (!this.editBoxIsEditMode) {
          //新增
          stocktakingBillDetailCreate(_params).then(res => {
            this.$message.success({ message: "保存成功!", showClose: true });
            if (this.takingId !== res.takingId) {
              this.takingId = res.takingId;
              this.$router.replace({
                path: "/StocktakingBill",
                query: { takingId: res.takingId }
              });
            }
            this.editBoxVisible = false;
            this.refreshPage();
          });
        } else {
          stocktakingBillDetailUpdate(_params).then(() => {
            this.$message.success({ message: "保存成功!", showClose: true });
            this.editBoxVisible = false;
            this.refreshPage();
          });
        }
      }
    },
    setPartId() {
      if (this.selectedRows.length && this.partsSearchRows.length) {
        if (this.$refs.details?.$el.querySelector(".is-hotkey-active")) {
          this.partId = this.selectedRows[0].partId;
          this.currentRow = this.selectedRows[0];
        } else {
          this.partId = this.partsSearchRows[0].partId;
          this.currentRow = this.partsSearchRows[0];
        }
      } else if (this.selectedRows.length) {
        this.partId = this.selectedRows[0].partId;
        this.currentRow = this.selectedRows[0];
      } else if (this.partsSearchRows.length) {
        this.partId = this.partsSearchRows[0].partId;
        this.currentRow = this.partsSearchRows[0];
      }
    },
    showPartDetailBox() {
      if (!this.canShowPartDetailBox) {
        return;
      }
      this.setPartId();
      this.partDetailBoxVisible = true;
    },
    showStocksLockedBox() {
      if (!this.canShowStocksLockedBox) {
        return;
      }
      this.setPartId();
      this.stockFilter = {
        partId: this.partId,
        ownerCompanyId: this.currentRow?.ownerCompanyId ?? null,
        property: this.currentRow?.property ?? null,
        warehouseId: this.currentRow?.warehouseId ?? null,
        positionId: this.currentRow?.positionId ?? null
      };
      this.storageStocksLockedVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.text-link {
  display: inline-block;
  margin-right: 10px;
  vertical-align: top;
}
</style>
