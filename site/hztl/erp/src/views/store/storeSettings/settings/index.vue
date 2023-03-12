<template>
  <div class="settings-container">
    <resize-box :default-len="330" is-column>
      <template v-slot:block1>
        <div class="container-box">
          <ht-card>
            <el-form
              :model="searchForm"
              class="form-item-small-margin-bottom"
              label-width="60px"
              label-position="left"
              size="mini"
            >
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item label="仓库名称">
                    <ht-autocomplete
                      v-model="searchForm.name"
                      :fetch-suggestions="autocompleteLoadAllWarehouses"
                      :trigger-on-focus="false"
                      clearable
                      highlight-first-item
                      placeholder="仓库名称"
                      @change="searchFormChange"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="仓储公司">
                    <ht-select
                      v-model="searchForm.storageCompanyIds"
                      :options="storageCompanyOptins"
                      placeholder="仓储公司"
                      filterZero
                      clearable
                      collapse-tags
                      filterable
                      multiple
                      has-selecte-all-val
                      @change="searchFormChange"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </ht-card>
          <ht-card
            class="auto-card"
            style="margin-top: -15px;"
            title="仓库列表"
          >
            <div slot="after-title" class="after-title-container">
              <el-button
                @click="addWarehouses"
                type="primary"
                size="mini"
                :disabled="!hasAutoPerm('setting.create')"
              >
                新增仓库（F2）
              </el-button>
              <el-button
                @click="addBatchSettings"
                type="primary"
                size="mini"
                :disabled="!hasAutoPerm('setting.create')"
              >
                批量新增仓位
              </el-button>
            </div>
            <ht-setting-table
              :loading="loading"
              :table-name="tableName"
              :data="tableData"
              :columns="tableColumns"
              :selected-rows.sync="selectedRows"
              :key-scope="keyScope"
              pagination
              :current-page="page"
              :total="totalSize"
              @pageChange="pageChange"
              @hotkeysUp="handleKeyCode"
              @rowOperation="handleRowEdit"
            />
          </ht-card>
        </div>
      </template>
      <template v-slot:block2>
        <div class="container-box">
          <store-info v-if="!isEasyMode" ref="storeInfo" />
          <easyIndex v-else></easyIndex>
        </div>
      </template>
    </resize-box>
    <addWarehouse
      :visible.sync="showWarehousesBox"
      :editId="editId"
      @success="handleAddWarehouseSuccess"
    />
    <batchSettings :visible.sync="showBatchSettings" />
  </div>
</template>

<script>
import { reqStoreDelete, reqStoreList, reqStoreStop } from "@/api/store";
import { CELL_WIDTH } from "@/constants";
import addWarehouse from "@/views/store/storeSettings/settings/dialogs/addWarehouse";
import batchSettings from "@/views/store/storeSettings/settings/dialogs/batchSettings";
import hotkeys from "hotkeys-js";
import { mapState } from "vuex";
import storeInfo from "@/views/store/storeSettings/settings/storeInfo";
import easyIndex from "@/views/store/storeSettings/settings/storeInfo/easyIndex";
import resizeBox from "@/components/resizeBox";
import { searchMixin } from "@/mixins";
import { loadSearchStorageCompanys } from "@/api/store/stocks/index";
import * as store from "@/utils/store";

export default {
  name: "Settings",
  components: {
    addWarehouse,
    resizeBox,
    storeInfo,
    easyIndex,
    batchSettings
  },
  mixins: [searchMixin],
  props: {
    keyScope: {
      type: [Symbol, String],
      default() {
        return Symbol("StoreSettings");
      }
    }
  },
  provide() {
    return {
      laodData: this.laodData,
      isEasyMode: this.isEasyMode
    };
  },
  data() {
    const controlsColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 100,
      cantExport: true,
      render: (value, row) => (
        <div>
          {this.hasAutoPerm("setting.updateWarehouse") ? (
            <el-tooltip enterable={false} placement="top" content="编辑">
              <span
                on-click={e => this.handleEdit(row, e)}
                class="icon operation-icon icon-edit-info"
              />
            </el-tooltip>
          ) : null}
          {this.hasAutoPerm("setting.delete") ? (
            <el-tooltip enterable={false} placement="top" content="删除">
              <span
                on-click={e => this.handleDelete(row, e)}
                class="icon operation-icon icon-delete-info"
              />
            </el-tooltip>
          ) : null}
          {this.hasAutoPerm("setting.disableEnable") ? (
            <el-tooltip enterable={false} placement="top" content="启用">
              <span
                v-show={row.status === 1}
                on-click={e => this.storeEnable(row, e)}
                class="icon operation-icon icon-enable-info"
              />
            </el-tooltip>
          ) : null}
          {this.hasAutoPerm("setting.disableEnable") ? (
            <el-tooltip enterable={false} placement="top" content="停用">
              <span
                v-show={row.status === 0}
                on-click={e => this.storeDisable(row, e)}
                class="icon operation-icon icon-disable-info"
              />
            </el-tooltip>
          ) : null}
        </div>
      )
    };
    return {
      showWarehousesBox: false,
      showBatchSettings: false,
      loading: false,
      editId: 0,
      searchForm: { name: "", storageCompanyIds: [] },
      storageCompanyOptins: [],
      selectedRows: [],
      tableData: [],
      page: 1,
      totalSize: 0,
      tableName: "BaseStoreList",
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
        { prop: "name", label: "仓库名称", width: CELL_WIDTH.name },
        {
          prop: "isOuterWarehouse",
          label: "仓库类型",
          width: CELL_WIDTH.type,
          formatter: value => (value ? "外部仓库" : "自有仓库")
        },
        {
          prop: "storageCompanyName",
          label: "仓储公司",
          width: CELL_WIDTH.companyName
        },
        {
          prop: "status",
          label: "状态",
          width: CELL_WIDTH.type,
          formatter: value => (value == 0 ? "正常" : "停用")
        },
        { prop: "wareareaCount", label: "货区数", width: CELL_WIDTH.number },
        { prop: "shelfCount", label: "货架数", width: CELL_WIDTH.number },
        { prop: "layerCount", label: "货层数", width: CELL_WIDTH.number },
        { prop: "positionCount", label: "货位数", width: CELL_WIDTH.number },
        { prop: "areaName", label: "所属区域", width: CELL_WIDTH.address },
        { prop: "address", label: "详细地址", width: CELL_WIDTH.address },
        { prop: "remark", label: "备注", width: CELL_WIDTH.remark },
        { prop: "reason", label: "停用原因", width: CELL_WIDTH.reason }
      ]
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    ...mapState("admin/systemParams", {
      isEasyMode: state => !!state.params.manageMode
    }),
    ...mapState("admin/warehouseSettings", ["warehousesInfo"])
  },
  watch: {
    isEasyMode() {
      this.laodData();
    },
    selectedRows() {
      if (
        this.selectedRows[0] &&
        this.selectedRows[0].id &&
        this.selectedRows[0].id != this.warehousesInfo.warehouseId
      ) {
        this.$store.commit(
          "admin/warehouseSettings/changewarehouseId",
          this.selectedRows[0].id
        );
      }
    }
  },
  created() {
    loadSearchStorageCompanys()
      .then(res => {
        this.storageCompanyOptins = res || [];
        if (this.storageCompanyOptins.length) {
          const storageCompany = this.storageCompanyOptins.find(
            item => item.id === store.userInfoMsg().companyId
          );
          if (storageCompany) {
            this.searchForm.storageCompanyIds = [store.userInfoMsg().companyId];
          }
        }
      })
      .finally(() => {
        this.laodData();
      });
  },
  activated() {
    hotkeys.setScope(this.keyScope);
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    handleKeyCode(e) {
      switch (e.code) {
        case "F2":
          this.addWarehouses();
          break;
        default:
          break;
      }
    },
    laodData() {
      this.loading = true;
      reqStoreList({
        ...this.searchForm,
        page: this.page,
        pageSize: this.pageSize
      })
        .then(data => {
          this.totalSize = data.totalSize;
          this.tableData = data.rows || [];
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
      this.page = page;
      this.laodData();
    },
    searchFormChange() {
      this.page = 1;
      this.laodData();
    },
    handleRowEdit(row) {
      this.handleEdit(row);
    },
    addWarehouses() {
      this.editId = 0;
      this.showWarehousesBox = true;
    },
    handleAddWarehouseSuccess(formData) {
      this.searchForm.name = formData.name;
      this.searchFormChange();
    },
    addBatchSettings() {
      if (this.selectedRows.length === 0) {
        this.$message.error("请选择一条数据！");
      } else {
        this.showBatchSettings = true;
      }
    },
    handleEdit(row, e) {
      if (e) {
        e.stopPropagation();
      }
      this.editId = row.id;
      this.showWarehousesBox = true;
    },
    handleDelete(row, e) {
      if (e) {
        e.stopPropagation();
      }
      this.$confirm(`确定要删除仓库 ${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          reqStoreDelete(row.id)
            .then(() => {
              this.$message.success("删除成功！");
              this.$store.commit(
                "admin/warehouseSettings/changewarehouseId",
                0
              );
              this.laodData();
            })
            .catch(err => {
              this.$message.error(err);
            });
        })
        .catch(() => {});
    },
    storeEnable(row, e) {
      if (e) {
        e.stopPropagation();
      }
      this.$confirm(`确定要启用仓库 ${row.name}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          reqStoreStop({
            id: row.id,
            status: 0
          })
            .then(() => {
              this.$message.success({ message: "启用成功", showClose: true });
              this.laodData();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    storeDisable(row, e) {
      if (e) {
        e.stopPropagation();
      }
      this.$prompt("请输入停用原因", "提示", {
        inputType: "textarea",
        inputValidator: val => {
          if (!val) {
            return "请输入停用原因";
          } else {
            return true;
          }
        }
      })
        .then(({ value }) => {
          reqStoreStop({
            id: row.id,
            reason: value,
            status: 1
          })
            .then(() => {
              this.$message.success({ message: "停用成功", showClose: true });
              this.laodData();
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="stylus" scoped>
.settings-container
    height 100%
    padding 5px
    .list-card
        width 400px
        flex none
        .store-tree
            overflow auto
    .detail-card
        margin-left 5px
    /deep/.after-title {
        flex: unset;
        margin-left: auto;
    }
    /deep/.el-card__body {
      height 100%
    }
</style>
