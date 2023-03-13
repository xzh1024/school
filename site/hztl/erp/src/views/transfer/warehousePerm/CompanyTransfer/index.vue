<template>
  <section class="container-box">
    <ht-card>
      <el-form
        v-loading="loading"
        class="form-item-small-margin-bottom"
        label-width="143px"
        label-position="left"
        size="mini"
      >
        <el-form-item label="是否允许分公司间调拨">
          <div style="display: flex;">
            <ht-select
              v-model="allowBranchAlloc"
              :disabled="showEditBtn"
              :options="searchBaseData.booleanMap"
              :clearable="false"
              style="width: 100px;"
            />
            <el-button
              v-show="showEditBtn"
              :disabled="!canEditAllowBranchAllot"
              type="primary"
              style="margin-left: 10px;"
              @click="eidtHandle"
            >
              编辑
            </el-button>
            <el-button v-show="!showEditBtn" type="primary" @click="saveHandle">
              保存
            </el-button>
            <el-button
              v-show="!showEditBtn"
              type="primary"
              size="mini"
              @click="cancelHandle"
            >
              取消
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </ht-card>
    <ht-card class="auto-card" no-padding>
      <el-row class="full-container" :gutter="5">
        <el-col :span="16" class="full-container">
          <ht-card title="分公司" class="auto-card">
            <ht-setting-table
              v-loading="loading"
              :tableName="tableName"
              :data="tableData"
              :selectedRows.sync="selectedRows"
              :columns="tableColumns"
              @rowOperation="editRowHandle"
            />
          </ht-card>
        </el-col>
        <el-col :span="8" class="full-container">
          <ht-card title="权限分配" class="full-container">
            <div
              slot="after-title"
              style="text-align: right; margin-top: -4px;"
            >
              <el-button
                :disabled="!canEdit || !selectedRows.length"
                type="primary"
                size="mini"
                plain
                @click="saveTreeHandle"
              >
                保存
              </el-button>
              <el-button
                :disabled="!canEdit || !selectedRows.length"
                type="primary"
                size="mini"
                plain
                @click="resetTreeHandle"
              >
                重置
              </el-button>
            </div>
            <div class="selet-container">
              <div>享受价格类型：</div>
              <ht-autoselect
                v-model="priceType"
                :options="PRICE_TYPES"
                :trigger-on-focus="false"
                highlight-first-item
                clearable
                placeholder="请选择"
                size="mini"
                style="width: 200px;"
              />
            </div>
            <div class="tree-container">
              <div>仓库权限：</div>
              <el-tree
                ref="trees"
                v-loading="storeLoading"
                :data="treeData"
                :props="defaultProps"
                :disabled="!canEdit"
                show-checkbox
                node-key="id"
                highlight-current
              />
            </div>
          </ht-card>
        </el-col>
      </el-row>
    </ht-card>
    <EditAllocsDialog
      :visible.sync="showEditDialog"
      @refeshData="initList"
      :EditObj="EditObj"
    />
  </section>
</template>

<script>
import { updateSystemParamsDetail } from "@/api/base/base";
import {
  getTansferWarehouse,
  getCompanyList,
  getCompanyStore,
  changeCompanyTransferPerm
} from "@/api/transfer/warehousePerm";
import { searchMixin } from "@/mixins";
import { CELL_WIDTH } from "@/constants";
import EditAllocsDialog from "./EditAllocsDialog";
const PRICE_TYPES = [
  { id: "调拨价", name: "调拨价" },
  { id: "平台价", name: "平台价" },
  { id: "零售价", name: "零售价" },
  { id: "批发价", name: "批发价" },
  { id: "批发价一", name: "批发价一" },
  { id: "批发价二", name: "批发价二" },
  { id: "批发价三", name: "批发价三" },
  { id: "批发价四", name: "批发价四" }
];

export default {
  name: "StoreDispatch",
  mixins: [searchMixin],
  components: {
    EditAllocsDialog
  },
  data() {
    return {
      defaultProps: {
        children: "next",
        label: "name",
        isLeaf: "leaf"
      },
      loading: false,
      storeLoading: false,
      showEditDialog: false,
      selectedRows: [],
      tableData: [],
      tableName: "transferStoreDispatchTable",
      treeData: [],
      storeIds: [],
      defaultColumns: [
        {
          prop: "name",
          label: "调入分公司",
          width: CELL_WIDTH.companyName
        },
        {
          prop: "priorityWarehousesName",
          label: "调拨出库优先级",
          width: CELL_WIDTH.companyName,
          formatter: (value, row) => {
            let cont = "";
            if (row.priorityWarehouses?.length) {
              row.priorityWarehouses?.forEach((item, index) => {
                cont += (index === 0 ? "" : " -> ") + item.name;
              });
              return cont;
            } else {
              return "";
            }
          }
        },
        {
          prop: "priceType",
          label: "享受价格",
          width: CELL_WIDTH.type
        }
      ],
      priceType: "调拨价",
      PRICE_TYPES,
      allowBranchAlloc: false,
      canEditAllowBranchAllot: false,
      showEditBtn: true
    };
  },
  computed: {
    EditObj() {
      return {
        businessCompanyId: this.selectedRows.length && this.selectedRows[0].id,
        storehouseTree:
          this.selectedRows.length && this.selectedRows[0].priorityWarehouses,
        storeIds: this.storeIds
      };
    },
    canEdit() {
      return this.hasAutoPerm("update");
    },
    tableColumns() {
      const indexColumn = {
        label: "序号",
        prop: "index",
        type: "index",
        width: CELL_WIDTH.index,
        cantHide: true,
        cantExport: true
      };
      const editRowHandle = row => {
        this.editRowHandle(row);
      };
      const controlsColumn = {
        label: "编辑",
        prop: "controls",
        width: 70,
        render: (value, row) => (
          <el-tooltip
            enterable={false}
            effect="dark"
            content="编辑"
            placement="top"
          >
            <i
              class="icon operation-icon icon-edit-info"
              on-click={() => editRowHandle(row)}
            />
          </el-tooltip>
        )
      };
      return this.canEdit
        ? [indexColumn, controlsColumn, ...this.defaultColumns]
        : [indexColumn, ...this.defaultColumns];
    }
  },
  watch: {
    selectedRows() {
      this.handleCurrentChange();
    }
  },
  mounted() {
    this.initList();
    this.initTree();
  },
  methods: {
    eidtHandle() {
      this.showEditBtn = false;
    },
    cancelHandle() {
      this.showEditBtn = true;
    },
    saveHandle() {
      if (!this.canEditAllowBranchAllot) {
        return;
      }
      this.loading = true;
      updateSystemParamsDetail({
        module: "allocation",
        type: "allowBranchAlloc",
        value: this.allowBranchAlloc
      })
        .then(() => {
          this.$message.success("保存成功！");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    editRowHandle() {
      if (!this.canEdit) {
        this.$message.warning({
          message: "您没有权限分配调拨仓库",
          showClose: true
        });
        return;
      }
      getCompanyStore({
        businessCompanyId: this.selectedRows[0].id
      }).then(data => {
        if (data.length === 0) {
          this.$message.error("请先设置仓库权限，才能编辑优先级！");
        } else {
          this.storeIds = data;
          this.showEditDialog = true;
        }
      });
    },
    initList() {
      this.loading = true;
      getCompanyList()
        .then(data => {
          const { value, canEdit } = data.allowBranchAlloc;
          this.allowBranchAlloc = value;
          this.canEditAllowBranchAllot = canEdit;
          this.tableData = data.companies || [];
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
        .catch(err => {
          this.$message.error(err);
          this.loading = false;
        });
    },
    initTree() {
      this.storeLoading = true;
      getTansferWarehouse()
        .then(res => {
          this.treeData =
            res && res.length
              ? res.map(item => ({ ...item, disabled: !this.canEdit }))
              : [];
          this.storeLoading = false;
        })
        .catch(err => {
          this.storeLoading = false;
          this.$message.error(err);
        });
    },
    handleCurrentChange() {
      this.$refs.trees.setCheckedKeys([]);
      this.storeLoading = true;
      this.priceType = this.selectedRows.length
        ? this.selectedRows[0].priceType
        : "";
      this.accountStore();
    },
    resetTreeHandle() {
      this.priceType = "平台价";
      this.$refs.trees.setCheckedKeys([]);
      this.accountStore();
    },
    accountStore() {
      getCompanyStore({
        businessCompanyId: this.selectedRows.length && this.selectedRows[0].id
      })
        .then(data => {
          this.storeLoading = false;
          this.storeIds = data;
          this.$refs.trees.setCheckedKeys(data);
        })
        .catch(() => {
          this.storeLoading = false;
        });
    },
    saveTreeHandle() {
      const data = {
        businessCompanyId: this.selectedRows[0].id,
        storehouseTree: this.$refs.trees.getCheckedKeys(),
        priceType: this.priceType,
        allowBranchAlloc: this.allowBranchAlloc
      };
      changeCompanyTransferPerm(data).then(() => {
        this.$message.success({ message: "保存成功！" });
        // 保存之后刷新出库顺序列表
        this.accountStore(this.selectedRows[0].id);
        this.initList();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.full-container {
  height: 100%;
  &::v-deep .el-card__body {
    height: 100%;
  }
}

.selet-container {
  display: flex;
  align-items: center;
}

.tree-container {
  margin-top: 10px;
  display: flex;
  background: #fbfbfb;
  height: 100%;

  &::v-deep .el-tree {
    flex: auto;
    height: calc(100% - 75px);
    overflow: auto;
    background: transparent;
  }
}
</style>
