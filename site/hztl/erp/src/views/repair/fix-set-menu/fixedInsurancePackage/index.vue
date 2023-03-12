<template>
  <div class="auto-card set-menu-group">
    <BandTree
      ref="bandTree"
      :defaultInputName="treeNodeLevel3Name"
      @handleSave="handleSave"
      @createSet="newSet"
      @editSet="editSet"
      @nameChange="nameChange"
    />
    <ht-card padding class="auto-card set-menu-detail" title="套餐详情">
      <div
        v-if="setName"
        slot="after-title"
        style="text-align: left;padding-left;20px;color:#66b1ff;"
      >
        （{{ setName }}）
      </div>
      <SetMenuDetail
        :type="2"
        :defaultName="defaultName"
        ref="setDetail"
        :detail="currentSet"
        :parentNode="parentNode"
        :grandNode="grandNode"
        @copy="copy"
        @save="saveNormalSet"
        @nameChange="detailNameChange"
      />
    </ht-card>
  </div>
</template>

<script>
import BandTree from "../components/bandTree/bandTree";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import SetMenuDetail from "../components/setMenuDetail";
import { createFixSets, updateFixSets } from "@/api/repairs/sets";
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
        </div>
      )
    };
    return {
      parentNode: {},
      grandNode: {},
      setName: "",
      defaultName: "",
      parentId: 0,
      isEdit: false,
      form: {
        name: ""
      },
      treeNodeLevel3Name: "",
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
      ]
    };
  },
  components: {
    BandTree,
    SetMenuDetail
  },
  methods: {
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
            updateFixSets(data).then(() => {
              this.$message.success({ message: "更新成功" });
              this.$refs.bandTree.listBandTree();
            });
          });
        } else {
          updateFixSets(data).then(() => {
            this.$message.success({ message: "更新成功" });
            this.$refs.bandTree.listBandTree();
          });
        }
      } else {
        createFixSets({ ...data, parentId: this.parentId }).then(() => {
          this.$message.success({ message: "创建成功" });
          this.$refs.bandTree.listBandTree();
        });
      }
    },
    handleEdit(e) {
      this.isEdit = true;
      this.currentSet = e;
    },
    nameChange(e) {
      this.defaultName = e;
      console.log(this.defaultName);
    },
    detailNameChange(e) {
      this.treeNodeLevel3Name = e;
    },
    handleSave() {
      this.$confirm(`"是否要保存当前编辑的内容？"`, "提示", {
        type: "warning"
      })
        .then(() => {
          this.$refs.setDetail.save();
        })
        .catch(() => {
          this.$refs.bandTree.listBandTree();
          this.$refs.setDetail.resetForm();
        });
    },
    newSet(id, node, parentNode) {
      this.parentNode = node;
      this.grandNode = parentNode;
      this.parentId = id;
      this.setName = "";
      this.isEdit = false;
      this.$refs.setDetail.resetForm();
    },
    editSet(node, parentNode, grandNode) {
      this.currentSet = { ...node.data };
      this.parentNode = parentNode.data;
      this.grandNode = grandNode.data;
      if (this.currentSet && this.currentSet.name) {
        this.setName = `${this.grandNode.name}-${this.parentNode.name}-${this.currentSet.name}`;
      }
      this.isEdit = true;
    },
    copy(e) {
      createFixSets({ ...this.currentSet, name: e }).then(() => {
        this.$message.success({ message: "创建成功" });
        this.$refs.bandTree.listBandTree();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.set-menu-group {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background: #fff;

  .set-menu-detail {
    width: 57%;
    margin-left: 10px;
    overflow-y: scroll;
  }
}
</style>
