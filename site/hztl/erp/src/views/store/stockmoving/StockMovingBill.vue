<template>
  <section class="container-box">
    <div class="header header-between">
      <div>
        <el-button
          type="primary"
          size="mini"
          :disabled="!isCanCreate"
          @click="resetOpenBill"
        >
          开单（F2）
        </el-button>
        <el-button type="primary" size="mini" @click="handleSearchParts">
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
          <part-table
            :main-table-data="mainTableData"
            :key-scope="keyScopes.partTable"
            :page="page"
            :total-size="totalSize"
            :loading="part_loading"
            :is-can-edit="isCanEdit"
            :selected-rows.sync="selectedPartRows"
            @addOrder="addOrder"
            @_handleSizeChange="_handleSizeChange"
            @handleKeyCode="handleKeyCode"
            @handleSetPartTableScope="setKeyScope(keyScopes.partTable)"
          />
        </template>
        <template v-slot:block2>
          <div class="container-box">
            <div class="header">
              <el-button
                :disabled="!isCanDelete"
                type="primary"
                size="mini"
                @click="deleteBill"
              >
                删除（F4）
              </el-button>
              <el-button
                :disabled="!isCanSubmit"
                type="primary"
                size="mini"
                @click="submitBill"
              >
                提交（F9）
              </el-button>
              <el-button
                :disabled="!isCanRecall"
                type="primary"
                size="mini"
                @click="revokeBill"
              >
                撤回（F9）
              </el-button>
              <el-button
                :disabled="!isCanAcceptAndConfrim"
                type="primary"
                size="mini"
                @click="acceptAndConfrim"
              >
                接收并确认（F7）
              </el-button>
              <el-button
                :disabled="!isCanPrint"
                type="primary"
                size="mini"
                @click="printOrders"
              >
                打印（F11）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                @click="importInternalMoveWarehouseBoxVisible = true"
              >
                导入（Alt+I）
              </el-button>
            </div>
            <ht-card style="margin: 5px 0 0 0;">
              <el-form
                ref="header"
                v-switch-focus="focusHeaderData"
                :model="header"
                :rules="rules"
                :show-message="false"
                label-width="71px"
                label-position="left"
                size="mini"
                class="form-item-small-margin-bottom"
                @click.native.stop="setKeyScope(keyScopes.form)"
              >
                <el-row :gutter="10">
                  <el-col :span="4">
                    <el-form-item label="移仓日期" prop="billDate">
                      <el-date-picker
                        v-model="header.billDate"
                        :clearable="false"
                        :editable="false"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        @change="updateBillHeaders(header.billDate)"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="备注" prop="remark" label-width="35px">
                      <ht-input
                        v-model="header.remark"
                        placeholder="请输入备注(最大支持100个字符)"
                        maxlength="100"
                        class="switch-focus focus-remark"
                        @blur="updateBillHeaders(header.remark)"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col v-if="header.billNo" :span="6">
                    <el-form-item label-width="10px">
                      <bill-status-bar
                        :bill-no="header.billNo"
                        :bill-status="billStatus"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </ht-card>
            <ht-card no-padding class="auto-card" style="margin: -5px 0 0 0;">
              <ht-table
                :columns="detailsFormatColumns"
                :data="detailTableData"
                :key-scope="keyScopes.localTable"
                :selected-rows.sync="selectedDetailRows"
                setting-all-column
                show-table-setting
                @hotkeysUp="handleKeyCode"
                @rowOperation="handleDetailEdit"
                @click.native.stop="setKeyScope(keyScopes.localTable)"
                @table-setting="handleTableSetting"
              />
            </ht-card>
          </div>
        </template>
      </resize-box>
    </ht-card>

    <edit-columns
      :base-columns="baseDetailsColumns"
      :table-name="detailsName"
      :visible.sync="editColumnsVisible"
      @columns-change="detailsColumnsChange"
    />
    <search-box
      :visible.sync="searchVisible"
      @searchParamsChange="searchParamsChange"
    />
    <edit-box
      :visible.sync="editVisible"
      :form-data="editFormData"
      @handleMovingSumbit="handleMovingSumbit"
    />
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
    <storage-stocks-locked-dialog
      :visible="storageStocksLockedVisible"
      :stockFilter="stockFilter"
      @close="storageStocksLockedVisible = false"
    />
    <ImportInternalMoveWarehouseBox
      :visible.sync="importInternalMoveWarehouseBoxVisible"
      :importInfo="importInfo"
      @update="updateTable"
    />
  </section>
</template>
<script>
import {
  stockmovingAudit,
  stockmovingAvailableqty,
  stockmovingCommit,
  stockmovingCreate,
  stockmovingDelete,
  stockmovingDetailCreate,
  stockmovingDetailUpdate,
  stockmovingDetailsDelete,
  stockmovingDetailsList,
  stockmovingRevoke,
  stockmovingUpdate,
  stocksListOfMoving
} from "@/api/store/stockmovings";
import { mapState } from "vuex";
import resizeBox from "@/components/resizeBox";
import hotkeys from "hotkeys-js";
import PartTable from "./components/partTable";
import { TABLE_MOVING_PART_DETAIL_TABLE } from "@/constants";
import { EditColumns } from "@/components/table";
import SearchBox from "./dialog/SearchBox";
import EditBox from "./dialog/EditBox";
import BillStatusBar from "@/components/billStatusBar";
import { dateFormat, dateFormatFull } from "@/utils/date";
import { precisionsFixed } from "@/mixins";
import { MOVEING_BILL_STATUS } from "@/views/store/billstatus";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog";
import { openNewWindow } from "@/utils/tool";
import VideoPopover from "@/components/VideoPopover";

import ImportInternalMoveWarehouseBox from "@/components/importBox/ImportInternalMoveWarehouse";
import {
  internalMoveWarehouseOptions1,
  internalMoveWarehouseOptions2
} from "./options";
import { UNIT_COUNT } from "@/constants";
import { getSystemParamsDetail } from "@/api/base/base";

const defaultHeader = {
  billDate: dateFormat(new Date())
};
const focusData = {
  updateIndex: 0,
  initial: null,
  type: null
};

export default {
  name: "StockMovingBill",
  components: {
    resizeBox,
    PartTable,
    EditColumns,
    SearchBox,
    EditBox,
    BillStatusBar,
    PartsDetailBox,
    StorageStocksLockedDialog,
    VideoPopover,
    ImportInternalMoveWarehouseBox
  },
  mixins: [precisionsFixed],
  data() {
    return {
      importInternalMoveWarehouseBoxVisible: false,
      models: 1, // 0 标准模式 1 简易模式
      internalMoveWarehouseOptions1: internalMoveWarehouseOptions1,
      internalMoveWarehouseOptions2: internalMoveWarehouseOptions2,
      importInfo: {
        name: "内部移仓",
        id: "internalMoveWarehouse",
        perm: "internalMoveWarehouse",
        hasSetting: true,
        options: [],
        offset: UNIT_COUNT,
        isAllFileImport: false,
        className: "icon-img-workbench-cashier-white"
      },
      keyScopes: {
        partTable: Symbol("stockMovingPartTable"),
        localTable: Symbol("stockMovingLocalTable"),
        form: Symbol("stockMovingHeader")
      },
      dateFormatFull,
      header: {
        ...defaultHeader
      },
      rules: {
        billDate: [
          {
            required: true,
            message: "请选择移仓日期",
            trigger: "change"
          }
        ]
      },
      detailTableData: [],
      detailsColumns: [],

      detailsName: TABLE_MOVING_PART_DETAIL_TABLE.name,
      editColumnsVisible: false,
      searchVisible: false,

      mainTableData: [],
      page: 1,
      totalSize: 0,
      // eslint-disable-next-line @typescript-eslint/camelcase
      part_loading: false,

      editVisible: false,
      editFormData: {},

      selectedPartRows: [],
      selectedDetailRows: [],
      movingId: null,

      focusHeaderData: {
        ...focusData
      },

      isReplaceRouter: null,
      addType: "add",
      partDetailBoxVisible: false,
      partId: null,
      storageStocksLockedVisible: false,
      stockFilter: {},
      videoUrl: "https://dl.hztl3.com/videos/yp_videos/parts_move.mp4",
      videoPopoverRemark:
        "内部移仓页面，用于商品移库操作，仅限有权限使用仓库内移仓。"
    };
  },
  computed: {
    ...mapState("admin", {
      pageSizes: state => state.table.pageSize,
      userInfoMsg: state => state.user.userInfoMsg
    }),
    ...mapState("admin/systemParams", {
      autoSubmitWhenClose: state => state.params.autoSubmitWhenClose
    }),
    detailsFormatColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function addOrder(row, e) {
        e.stopPropagation();
        self.addOrder("edit", row);
      }
      function handleDelete(row, e) {
        e.stopPropagation();
        self.handleDelete(row);
      }
      return this.detailsColumns
        .filter(item => this.isCanEdit || item.type !== "controls")
        .map(item => {
          if (item.type === "controls") {
            return {
              ...item,
              render: (value, row) => (
                <div>
                  <el-tooltip placement="top" content="编辑" enterable={false}>
                    <i
                      class="icon operation-icon icon-edit-info"
                      on-click={e => addOrder(row, e)}
                    ></i>
                  </el-tooltip>
                  <el-tooltip placement="top" content="删除" enterable={false}>
                    <i
                      class="icon operation-icon icon-delete-info"
                      on-click={e => handleDelete(row, e)}
                    ></i>
                  </el-tooltip>
                </div>
              )
            };
          }
          return item;
        });
    },
    baseDetailsColumns() {
      return TABLE_MOVING_PART_DETAIL_TABLE.columns;
    },
    canShowPartDetailBox() {
      return this.selectedPartRows.length || this.selectedDetailRows.length;
    },
    canShowStocksLockedBox() {
      return this.selectedPartRows.length || this.selectedDetailRows.length;
    },
    isCanCreate() {
      return this.hasAutoPerm("create");
    },
    isCanUpdate() {
      return this.header.status === 0 && this.hasAutoPerm("update");
    },
    isCanEdit() {
      return (
        (this.header.movingId && this.isCanUpdate) ||
        (!this.header.movingId && this.isCanCreate)
      );
    },
    isCanDelete() {
      return this.header.status === 0 && this.hasAutoPerm("delete");
    },
    isCanSubmit() {
      return this.header.status === 0 && this.hasAutoPerm("commit");
    },
    isCanRecall() {
      return this.header.status === 1 && this.hasAutoPerm("revoke");
    },
    isCanAcceptAndConfrim() {
      return this.header.status === 1 && this.hasAutoPerm("confirm");
    },
    isCanPrint() {
      return this.header.status && this.hasAutoPerm("print");
    },
    billStatus() {
      return MOVEING_BILL_STATUS[this.header.status] || "";
    }
  },
  watch: {
    selectedPartRows(val) {
      if (val && val.length) {
        this.selectedDetailRows = [];
        this.partId = val[0].partId;
      }
    },
    selectedDetailRows(val) {
      if (val && val.length) {
        this.selectedPartRows = [];
        this.partId = val[0].partId;
      }
    },
    movingId(val, oldVal) {
      if (!val && oldVal) {
        this.setDefaultData();
      }
    }
  },
  mounted() {
    this.loadParams();
    this.bindSwitchScope();
    this.setDefaultData();
  },
  activated() {
    this.loadParams();
    if (this.$route.query.movingId) {
      this.movingId = Number(this.$route.query.movingId);
      this.loadStockDeatils();
    } else {
      this.movingId = null;
      if (this.mainTableData.length) {
        this.setKeyScope(this.keyScopes.partTable);
      } else {
        hotkeys.setScope(this.keyScopes.form);
        this.updateFocusData({ initial: "focus-remark" });
      }
      this.$nextTick(() => {
        this.$refs.header.clearValidate();
      });
    }
  },
  async deactivated() {
    if (this.autoSubmitWhenClose) {
      await this.submitBill();
    }
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScopes.partTable);
    hotkeys.deleteScope(this.keyScopes.localTable);
    hotkeys.deleteScope(this.keyScopes.form);
  },
  methods: {
    loadParams() {
      getSystemParamsDetail({ module: "storage", type: "manageMode" }).then(
        res => {
          if (res.value) {
            // 简易模式
            this.models = 1;
            this.$set(
              this.importInfo,
              "options",
              this.internalMoveWarehouseOptions1
            );
          } else {
            // 标准模式
            this.models = 0;
            this.$set(
              this.importInfo,
              "options",
              this.internalMoveWarehouseOptions2
            );
          }
        }
      );
    },
    updateTable(id) {
      // console.log("导入成功！");
      if (!id) return;
      this.$router.push({
        path: "/StockMovingBill",
        query: { movingId: id }
      });
      this.movingId = id;
      this.loadStockDeatils();
    },
    /*表格设置start*/

    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    detailsColumnsChange(columns) {
      this.detailsColumns = [];
      this.$nextTick(() => {
        this.detailsColumns = columns;
      });
    },
    /*end*/
    handleSearchParts() {
      this.searchVisible = true;
    },
    /*查询ins*/

    searchParamsChange(params) {
      this.searchData = { ...params };
      this.page = 1;
      this.loadPartList({ page: this.page });
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    /*表格快捷键*/

    handleKeyCode(e) {
      switch (e.code) {
        case "F2":
          if (this.isCanCreate) {
            this.resetOpenBill();
          }
          break;
        case "F4":
          this.deleteBill();
          break;
        case "F11":
          this.printOrders();
          break;
        case "F7":
          this.acceptAndConfrim();
          break;
        case "F9":
          this.submitBill();
          this.revokeBill();
          break;
        case "F10":
          this.showPartDetailBox();
          break;
        case "Insert":
        case "Numpad0":
          this.handleSearchParts();
          break;
      }
    },
    bindSwitchScope() {
      hotkeys("alt+down", { scope: this.keyScopes.partTable }, e => {
        switch (e.code) {
          case "ArrowDown":
            if (e.altKey) {
              if (this.detailTableData.length) {
                this.setKeyScope(this.keyScopes.localTable);
                this.selectedDetailRows = [this.detailTableData[0]];
                this.selectedPartRows = [];
              }
            }
            break;
        }
      });
      hotkeys(
        "f2,insert,ins,f4,f9,f7,f11",
        { scope: this.keyScopes.form },
        e => {
          switch (e.code) {
            case "F2":
              if (this.isCanCreate) {
                this.resetOpenBill();
              }
              break;
            case "F4":
              this.deleteBill();
              break;
            case "F11":
              this.printOrders();
              break;
            case "F7":
              this.acceptAndConfrim();
              break;
            case "F9":
              this.submitBill();
              this.revokeBill();
              break;
            case "Insert":
            case "Numpad0":
              this.handleSearchParts();
              break;
          }
        }
      );
      hotkeys("alt+up", { scope: this.keyScopes.localTable }, e => {
        switch (e.code) {
          case "ArrowUp":
            if (e.altKey) {
              if (this.mainTableData.length) {
                this.setKeyScope(this.keyScopes.partTable);
                this.selectedDetailRows = [];
                this.selectedPartRows = [this.mainTableData[0]];
              }
            }
            break;
        }
      });
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusHeaderData.updateIndex++;
      this.focusHeaderData = {
        updateIndex,
        initial,
        type
      };
    },

    loadStockDeatils() {
      // 移仓单据明细列表
      stockmovingDetailsList({
        movingId: this.movingId
      }).then(data => {
        this.header = data.header;
        this.detailTableData = data.details || [];
        if (this.mainTableData.length) {
          this.setKeyScope(this.keyScopes.partTable);
          this.selectedDetailRows = [];
        } else if (this.detailTableData.length) {
          this.setKeyScope(this.keyScopes.localTable);
          this.selectedDetailRows = [this.detailTableData[0]];
          this.selectedPartRows = [];
        }
        this.$nextTick(() => {
          this.$refs.header.clearValidate();
        });
      });
    },
    _message(msg) {
      this.$message.success({
        message: msg
      });
      this.loadStockDeatils();
    },
    storeClose() {
      this.$refs["storeForm"].resetFields();
    },
    loadPartList(page) {
      // eslint-disable-next-line @typescript-eslint/camelcase
      this.part_loading = true;
      stocksListOfMoving({
        ...this.searchData,
        pageSize: this.pageSizes,
        ...page
      })
        .then(data => {
          this.mainTableData = data.rows;
          this.totalSize = data.totalSize;
          if (data.rows.length) {
            this.setKeyScope(this.keyScopes.partTable);
            this.selectedDetailRows = [];
            this.selectedPartRows = [data.rows[0]];
          }
          // eslint-disable-next-line @typescript-eslint/camelcase
          this.part_loading = false;
        })
        .catch(() => {
          // eslint-disable-next-line @typescript-eslint/camelcase
          this.part_loading = false;
        });
    },
    _handleSizeChange(page) {
      // 分页操作
      this.currentPage = page;
      this.loadPartList({ page: page });
    },
    handleDelete(row) {
      this.selectedDetailRows = [row];
      this.$confirm("确定要删除该条订单明细?", "提示", {
        type: "warning"
      }).then(() => {
        stockmovingDetailsDelete({
          movingDetailId: row.movingDetailId,
          movingId: this.movingId
        }).then(() => {
          if (this.detailTableData.length < 2) {
            this.detailTableData = [];
            this.$confirm(`删除单据${this.header.billNo}成功, 是否重新开单?`, {
              type: "warning"
            })
              .then(() => {
                this.resetOpenBill();
              })
              .catch(() => {
                this.closePage();
                this.backList();
              });
          } else {
            this._message("删除订单明细成功!");
          }
        });
      });
    },
    backList() {
      // 返回主列表
      this.$router.push({ path: "/StockMovingLists" });
    },
    deleteBill() {
      if (!this.isCanDelete) return;
      this.$confirm(`您确定删除 ${this.header.billNo} 单据?`, "提示", {
        type: "warning"
      }).then(() => {
        stockmovingDelete({
          movingId: this.movingId
        }).then(() => {
          this.detailTableData = [];
          this.$confirm(`删除单据 ${this.header.billNo} 成功, 是否重新开单?`, {
            type: "warning"
          })
            .then(() => {
              this.resetOpenBill();
            })
            .catch(() => {
              this.closePage();
              this.backList();
            });
        });
      });
    },
    submitBill() {
      // 提交单据
      if (!this.isCanSubmit) return;
      return stockmovingCommit({
        movingId: this.movingId
      }).then(() => {
        this._message("提交成功!");
      });
    },
    revokeBill() {
      // 撤回单据
      if (!this.isCanRecall) return;
      stockmovingRevoke({ movingId: this.movingId }).then(() => {
        this._message("撤回成功!");
      });
    },
    acceptAndConfrim() {
      // 接收并确认单据
      if (!this.isCanAcceptAndConfrim) return;
      stockmovingAudit({ movingId: this.movingId }).then(() => {
        this._message("审核成功!");
      });
    },
    handleMovingSumbit(params) {
      if (!this.$route.query || !this.$route.query.movingId) {
        stockmovingCreate({
          header: {
            ...this.header,
            movingId: this.movingId || 0
          },
          detail: {
            ...params,
            stockId: params.stockId || null,
            toWarehouseId: params.toWarehouseId || null,
            toPositionId: params.toPositionId || null,
            movingDetailId: params.movingDetailId || 0,
            remark: params.remark || null
          }
        }).then(data => {
          this.loadPartList({ page: this.page });
          if (this.isReplaceRouter !== data.movingId) {
            this.$router.replace({
              path: "/StockMovingBill",
              query: { movingId: data.movingId }
            });
            this.movingId = Number(data.movingId);
            this.isReplaceRouter = data.movingId;
          }
          this._message("新增成功!");
        });
      } else if (this.addType === "add" && this.$route.query.movingId) {
        stockmovingDetailCreate({
          billId: this.movingId,
          detail: {
            ...params,
            stockId: params.stockId || null,
            toWarehouseId: params.toWarehouseId || null,
            toPositionId: params.toPositionId || null,
            movingDetailId: 0,
            remark: params.remark || null
          }
        }).then(() => {
          this._message("新增成功!");
        });
      } else if (this.addType === "edit" && this.$route.query.movingId) {
        stockmovingDetailUpdate({
          billId: this.movingId,
          detail: {
            ...params,
            stockId: params.stockId || null,
            toWarehouseId: params.toWarehouseId || null,
            toPositionId: params.toPositionId || null,
            movingDetailId: params.movingDetailId || 0,
            remark: params.remark || null
          }
        }).then(() => {
          this._message("修改成功!");
        });
      }
    },
    addOrder(type, row) {
      this.addType = type;
      stockmovingAvailableqty({
        stockId: row.stockId || 0,
        movingId: this.movingId || 0,
        movingDetailId: row.movingDetailId || 0
      }).then(data => {
        let movingQty;
        if (type === "add") {
          movingQty = data.availableQty;
          this.selectedPartRows = [row];
        } else if (type === "edit") {
          movingQty = row.movingQty;
          this.selectedDetailRows = [row];
        }
        this.editFormData = {
          ...row,
          movingQty: movingQty,
          availableQty: data.availableQty
        };
        this.editVisible = true;
      });
    },
    setDefaultDate() {
      this.header.billDate = dateFormat(new Date());
    },
    setDefaultData() {
      this.header = { ...defaultHeader };
      this.setDefaultDate();
      this.detailTableData = [];
    },
    resetOpenBill() {
      if (this.$route.query.movingId) {
        this.$router.replace({ path: "/StockMovingBill" });
      }
      this.movingId = null;
      this.setDefaultData();
      hotkeys.setScope(this.keyScopes.form);
      this.updateFocusData({ initial: "focus-remark" });
      this.$nextTick(() => {
        this.$refs.header.clearValidate();
      });
    },
    updateBillHeaders(val) {
      // 更新明细单头信息
      if (!this.header.billNo || !val) return;
      this.$refs["header"].validate((valid, err) => {
        if (valid) {
          stockmovingUpdate({
            movingId: this.header.movingId,
            receiverId: this.header.receiverId,
            billDate: this.header.billDate,
            remark: this.header.remark
          }).then(() => {
            this.$message.success({
              message: "更新成功!"
            });
          });
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips });
        }
      });
    },
    printOrders() {
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Store/Move/" + this.$route.query.movingId
        }).href,
        "print"
      );
    },
    handleDetailEdit(row) {
      if (this.isCanEdit) {
        this.addOrder("edit", row);
      } else {
        this.$message({
          type: "warning",
          message: "当前状态不能修改",
          showClose: true
        });
        return;
      }
    },
    showPartDetailBox() {
      if (!this.canShowPartDetailBox) {
        return;
      }
      this.partDetailBoxVisible = true;
    },
    showStocksLockedBox() {
      if (!this.canShowStocksLockedBox) {
        return;
      }
      this.stockFilter = this.getModeData();
      this.storageStocksLockedVisible = true;
    },
    getModeData() {
      const partData = this.selectedPartRows[0] || this.selectedDetailRows[0];
      //点击下面，默认不带批次；
      const mode = this.selectedPartRows[0] ? 0 : 1;
      const modeData = {
        partId: partData.partId,
        ownerCompanyId: partData.ownerCompanyId,
        property: partData.property || undefined
      };
      switch (mode) {
        case 0: {
          modeData.warehouseId = partData.warehouseId || undefined;
          modeData.positionId = partData.positionId || undefined;
          modeData.batchNo = partData.batchNo || undefined;
          break;
        }
        case 1: {
          modeData.warehouseId = partData.warehouseId || undefined;
          modeData.positionId = partData.positionId || undefined;
          break;
        }
        case 2: {
          modeData.warehouseId = partData.warehouseId || undefined;
          break;
        }
        default:
          break;
      }
      return modeData;
    }
  }
};
</script>
