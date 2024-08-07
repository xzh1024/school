<template>
  <ht-card title="货架" style="margin: 5px 0 0 5px;" class="auto-card">
    <div slot="after-title" class="after-title-container">
      <el-button
        type="text"
        @click="addHandle"
        v-if="!warehousesInfo.isBuiltin"
        :disabled="!hasAutoPerm('setting.manageChildren')"
      >
        + 新增货架
      </el-button>
    </div>
    <div class="search-input">
      <el-input placeholder="输入内容查询" v-model="name">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="loadData"
        ></el-button>
      </el-input>
    </div>
    <ht-table
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
      :selected-rows.sync="selectedRows"
    />
    <el-pagination
      @current-change="pageChange"
      :current-page.sync="currentPage"
      :page-size="20"
      small
      layout="total, prev, pager, next"
      :total="tableTotal"
    >
    </el-pagination>
    <add-shelf :visible.sync="addShow" @reload="reload" :editId="editId" />
  </ht-card>
</template>

<script>
import addShelf from "@/views/store/storeSettings/settings/dialogs/addShelf";
import {
  reqStoreShelvesDelete,
  reqStoreShelvesList
} from "@/api/store/settings";
import { mapState } from "vuex";

export default {
  name: "shelfInfo",
  components: {
    addShelf
  },
  inject: ["laodData"],

  data() {
    const controlsColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 100,
      cantExport: true,
      render: (value, row) =>
        this.hasAutoPerm("setting.updateWarehouse") ? (
          <div>
            <el-tooltip enterable={false} placement="top" content="编辑">
              <span
                on-click={e => this.handleEdit(row, e)}
                class="icon operation-icon icon-edit-info"
              />
            </el-tooltip>
            <el-tooltip enterable={false} placement="top" content="删除">
              <span
                on-click={e => this.handleDelete(row, e)}
                class="icon operation-icon icon-delete-info"
              />
            </el-tooltip>
          </div>
        ) : null
    };
    return {
      name: "",
      editId: 0,
      addShow: false,
      tableLoading: false,
      selectedRows: [],
      tableData: [],
      currentPage: 1,
      tableTotal: 0,
      tableColumns: [
        controlsColumn,
        { prop: "name", label: "货架名称", width: 100 }
      ]
    };
  },
  watch: {
    selectedRows() {
      if (
        this.selectedRows[0] &&
        this.selectedRows[0].id &&
        this.selectedRows[0].id != this.warehousesInfo.shelfId
      ) {
        this.$store.commit(
          "admin/warehouseSettings/changeshelfId",
          this.selectedRows[0].id
        );
      }
    },
    "warehousesInfo.wareareaId"() {
      if (this.warehousesInfo.wareareaId) {
        this.loadData();
      }
    }
  },
  computed: {
    ...mapState("admin/warehouseSettings", ["warehousesInfo"]),
    ...mapState("admin", {
      pageSizes: state => state.table.pageSize
    })
  },
  created() {
    this.loadData();
  },
  methods: {
    reload() {
      this.loadData({ page: this.currentPage });
    },
    handleDelete(row, e) {
      e.stopPropagation();
      this.$confirm(`确定要删除货架 ${row.name} ？`, "提示", {
        type: "warning"
      })
        .then(() => {
          reqStoreShelvesDelete(row.id)
            .then(() => {
              this.$message.success({ message: `成功删除货架 ${row.name}` });
              this.$store.commit("admin/warehouseSettings/changeshelfId", 0);
              this.loadData();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    pageChange(page) {
      this.currentPage = page;
      this.loadData({ page: page });
    },
    loadData(page) {
      this.tableLoading = true;
      reqStoreShelvesList({
        warehouseId: this.warehousesInfo.warehouseId,
        wareareaId: this.warehousesInfo.wareareaId,
        name: this.name,
        ...page,
        pageSize: this.pageSizes
      })
        .then(res => {
          this.tableData = res.rows || [];
          this.tableTotal = res.totalSize;
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
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableData = [];
          this.tableTotal = 0;
          this.tableLoading = false;
        });
    },
    handleEdit(row, e) {
      e.stopPropagation();
      this.editId = row.id;
      this.addShow = true;
    },
    addHandle() {
      this.editId = 0;
      this.addShow = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.search-input
  padding 5px 10px;
  width 100%;
/deep/.ht-table{
  height: calc(100% - 73px) !important;
}
/deep/ .el-table {
  height: 100% !important;
}
</style>
