<template>
  <div class="auto-card set-menu-group">
    <ht-card padding title="套餐列表" class="set-menu-form">
      <el-form ref="form" :model="form" size="mini" label-width="70px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="套餐名称">
              <el-input
                v-model="form.keyword"
                placeHolder="套餐名称"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="13" :offset="1">
            <el-button
              type="primary"
              size="small"
              @click="listSets"
              style="marginRight:20px;"
              >查询（F5）</el-button
            >
            <el-button
              v-if="allowCreate"
              type="primary"
              size="small"
              @click="newSet"
              >新建（F2）</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <ht-setting-table
        :data="tableData"
        :enable-table-setting="false"
        :columns="tableColumns"
        pagination
        @selectChange="selectChange"
        @row-dblclick="handleEdit"
        :total="totalSize"
        :selected-rows.sync="selectedRows"
        :current-page.sync="currentPage"
        @pageChange="_handleSizeChange"
        height="670px"
        table-name="kpi"
      />
    </ht-card>
    <ht-card
      padding
      class="auto-card set-menu-detail"
      title="套餐详情"
      v-if="currentSet"
    >
      <SetMenuDetail
        ref="setDetail"
        :detail="currentSet"
        @save="saveNormalSet"
      />
    </ht-card>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import SetMenuDetail from "../components/setMenuDetail";
import {
  listSets,
  createSets,
  updateSets,
  deleteSets
} from "@/api/repairs/sets";
import { mapState } from "vuex";
export default {
  data() {
    const controlsColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 30,
      cantExport: true,
      render: (value, row) => (
        <div>
          {this.hasAutoPerm("update") ? (
            <el-tooltip enterable={false} placement="top" content="编辑">
              <span
                on-click={e => this.handleEdit(row, e)}
                class="icon operation-icon icon-edit-info"
              />
            </el-tooltip>
          ) : null}
          {this.hasAutoPerm("delete") ? (
            <el-tooltip enterable={false} placement="top" content="删除">
              <span
                on-click={e => this.handleDelete(row, e)}
                class="icon operation-icon icon-delete-info"
              />
            </el-tooltip>
          ) : null}
        </div>
      )
    };
    return {
      selectedRows: [],
      currentPage: 1,
      totalSize: 0,
      isEdit: false,
      form: {
        name: ""
      },
      currentSet: {},
      tableData: [],
      tableColumns: [
        controlsColumn,
        {
          prop: "name",
          label: "名称",
          width: CELL_WIDTH.index
        },
        {
          prop: "amount",
          label: "套餐价",
          width: CELL_WIDTH.multiple
        }
      ],
      currentSetId: null,
      showConfirm: false
    };
  },
  components: {
    SetMenuDetail
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    allowCreate() {
      return this.hasAutoPerm("create");
    }
  },
  created() {
    document.onkeydown = () => {
      const key = window.event.keyCode;
      if (key === 13 && this.showConfirm) {
        this.showConfirm = false;
        deleteSets({ id: this.currentSetId }).then(() => {
          this.$message.success({ message: "删除套餐成功!" });
          this.listSets();
          this.$msgbox.close();
        });
      }
    };
  },
  mounted() {
    this.$store.commit("admin/table/changePageSize", 20);
    this.listSets();
  },
  methods: {
    listSets() {
      listSets({
        ...this.form,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        this.tableData = rows || [];
        this.totalSize = totalSize;
        if (this.tableData.length) {
          this.selectedRows = [this.tableData[0]];
          this.handleEdit(this.tableData[0]);
        }
      });
    },
    saveNormalSet(data) {
      if (this.isEdit) {
        const { hasStore } = data;
        if (hasStore) {
          this.$confirm(
            `删除/修改该套餐后，会导致店铺中该套餐无法正常使用，请谨慎操作！`,
            "提示",
            {
              confirmButtonText: "确认（Enter）",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).then(() => {
            updateSets(data).then(() => {
              this.$message.success({ message: "更新成功" });
              this.listSets();
            });
          });
        } else {
          updateSets(data).then(() => {
            this.$message.success({ message: "更新成功" });
            this.listSets();
          });
        }
      } else {
        createSets(data).then(() => {
          this.$message.success({ message: "创建成功" });
          this.listSets();
        });
      }
    },
    selectChange(e) {
      if (e && e.length) {
        this.isEdit = true;
        this.currentSet = e[0];
      }
    },
    handleDelete(e) {
      this.showConfirm = true;
      const { id, hasStore } = e;
      this.currentSetId = id;
      if (hasStore) {
        this.$confirm(
          `删除/修改该套餐后，会导致店铺中该套餐无法正常使用，请谨慎操作！`,
          "提示",
          {
            confirmButtonText: "确认（Enter）",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          deleteSets({ id }).then(() => {
            this.$message.success({ message: "删除套餐成功!" });
            this.listSets();
          });
        });
      } else {
        this.$confirm(`确定要删除此套餐吗？`, "提示", {
          confirmButtonText: "确定（Enter）",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          deleteSets({ id }).then(() => {
            this.$message.success({ message: "删除套餐成功!" });
            this.listSets();
          });
        });
      }
    },
    handleEdit(e) {
      this.isEdit = true;
      this.currentSet = e;
    },
    newSet() {
      this.isEdit = false;
      this.currentSet = {
        vehicleLevels: []
      };
      this.$refs.setDetail.resetForm();
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      // 查询列表
      this.listSets();
    }
  }
};
</script>

<style lang="scss" scoped>
.set-menu-group {
  display: flex;
  justify-content: space-between;
  height: 85vh;
  .set-menu-form {
    width: 35%;
    height: 85vh;
    overflow-y: scroll;
  }
  .set-menu-detail {
    width: 57%;
    margin-left: 10px;
    overflow-y: scroll;
  }
}
</style>
