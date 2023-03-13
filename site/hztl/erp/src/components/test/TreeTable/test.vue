<template>
  <div>
    <tree-table
      :data="list.listData"
      :columns="authorizedMenu"
      :cell-style="cellStyle"
      height="650"
      size="mini"
      class="selectData-table mar-t-20"
      @selection-change-="handleSelectionChange"
    >
      <el-table-column type="index" width="60" />
      <el-table-column label=" " width="50">
        <template slot-scope="scope">
          <el-radio
            v-model="radio"
            :label="scope.$index"
            class="textRadio"
            @click.native="handleSelectionChange(scope.row)"
          >
            &nbsp;
          </el-radio>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>
<script>
import treeTable from "@/components/TreeTable";

export default {
  name: "DicData",
  components: { treeTable },
  data() {
    return {
      list: {
        id: "",
        params: {
          typeName: "",
          isCreated: ""
        },
        listData: []
      },
      authorizedMenu: [
        {
          text: "字典分类层次",
          value: "typeName"
        },
        {
          text: "是字典条目",
          value: "isItem"
        },
        {
          text: "表名",
          value: "tableName"
        },
        {
          text: "已生成表",
          value: "isCreatedCn"
        },
        {
          text: "生成时间",
          value: "tabletime"
        },
        {
          text: "备注",
          value: "remark"
        }
      ],
      connForm: {
        id: "",
        sign: ""
      },
      sign: null
    };
  },
  mounted() {
    this.getDictTypeTree();
  },
  methods: {
    //首页list
    getDictTypeTree() {
      let data = {};
      if (this.optionTreeNode) {
        if (this.optionTreeNode.sign === true) {
          this.optionTreeNode.sign = 1;
        } else {
          this.optionTreeNode.sign = 2;
        }
        data = {
          nodeId: this.optionTreeNode.nodeId,
          sign: this.optionTreeNode.sign
        };
      } else {
        data = {
          nodeId: 1,
          sign: ""
        };
      }
      this.Api.getDictTypeTree(this.qs.stringify(data)).then(res => {
        this.list.listData = res.data.data;
      });
    },
    //新增
    addEvent(nodeSign, add) {
      if (!add) {
        if (this.list.id.length <= 0) {
          this.$message({
            type: "warning",
            message: "请选择需要添加的记录"
          });
        } else {
          this.$router.push({
            path: "/dictionaries/add",
            query: {
              id: this.list.id,
              dictTypeId: this.optionTreeNode.dictTypeId,
              nodeSign: nodeSign
            }
          });
        }
      } else {
        this.$router.push({
          path: "/dictionaries/add",
          query: {
            id: this.list.id,
            dictTypeId: this.optionTreeNode.dictTypeId,
            nodeSign: nodeSign
          }
        });
      }
    },
    // 查看
    detailViewEvent(row) {
      this.$router.push({ path: "/company/detail", query: { id: row.id } });
    },
    //删除字典条目表
    deleteTableEvent() {
      if (this.list.id.length !== 0) {
        this.$confirm("是否删除字典条目表记录?", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.Api.deleteTable(
              this.qs.stringify({
                id: this.list.id
              })
            ).then(res => {
              if (res.data.code === 0) {
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
                this.radio = [];
                this.getDictTypeTree();
                this.$router.push({ name: "字典分类列表" });
                this.$emit("updataTreeNode", 0);
              } else {
                this.$message.error({
                  message: res.data.msg
                });
              }
            });
          })
          .catch(() => {});
      } else {
        this.$message({
          type: "warning",
          message: "请选择需要删除的字典条目表记录"
        });
      }
    },
    //删除
    delData() {
      if (this.list.id.length !== 0) {
        this.$confirm("是否删除此条记录?", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.Api.deleteDictType(
              this.qs.stringify({
                id: this.list.id
              })
            ).then(res => {
              if (res.data.code === 0) {
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
                this.radio = [];
                this.getDictTypeTree();
              } else {
                this.$message.error({
                  message: res.data.msg
                });
              }
            });
          })
          .catch(() => {});
      } else {
        this.$message({
          type: "warning",
          message: "请选择需要删除的记录"
        });
      }
    },
    //生成表
    generateEvent() {
      if (this.list.id.length <= 0) {
        this.$message({
          type: "warning",
          message: "请选择需要的记录"
        });
      } else {
        this.Api.generateTable(
          this.qs.stringify({
            id: this.list.id
          })
        ).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg
            });
            this.radio = [];
            this.list.id = [];
            this.getDictTypeTree();
          } else {
            this.$message.error({
              message: res.data.msg
            });
          }
        });
      }
    },
    // 上移 下移 升级 降级
    connEvent(sign) {
      this.connForm.sign = sign;
      if (this.list.id.length <= 0) {
        this.$message({
          type: "warning",
          message: "请选择需要的记录"
        });
      } else {
        this.Api.moveAndUDDictType(this.qs.stringify(this.connForm)).then(
          res => {
            if (res.data.code === 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.radio = [];
              this.list.id = [];
              this.getDictTypeTree();
            } else {
              this.$message.error({
                message: res.data.msg
              });
            }
          }
        );
      }
    },

    // 批量选择
    handleSelectionChange(val) {
      this.dictTypeId = val.dictTypeId;
      this.connForm.id = val.id;
      this.list.id = val.id;
    },
    //重置
    resetData() {
      this.list.params = {};
      this.getDictTypeTree();
    },
    //编辑
    editorEvent() {
      if (this.list.id.length <= 0) {
        this.$message({
          type: "warning",
          message: "请选择需要删除的记录"
        });
      } else {
        this.$router.push({
          path: "/dictionaries/editor",
          query: { id: this.list.id }
        });
      }
    },
    //查询
    selectDictTypeTree() {
      this.Api.selectDictTypeTree(this.qs.stringify(this.list.params)).then(
        res => {
          this.list.listData = res.data.data;
        }
      );
    },
    //第一列样式
    cellStyle(row) {
      if (row.column.label === "字典分类层次") {
        return "color:#0f87d8;cursor: pointer;";
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped></style>
