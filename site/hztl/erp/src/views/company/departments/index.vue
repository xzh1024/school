<template>
  <div class="content-wrap">
    <ht-card
      title="账套组织架构"
      style="height:100%,padding:0;margin:10px;background:#fff;box-sizing:border-box;"
      class="auto-card is-always-shadow"
      no-padding
    >
      <div class="tree-wrap">
        <el-tree
          ref="tree"
          class="my_tree"
          :data="setTree"
          node-key="id"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          @node-drop="dragEnd"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
        >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
            @mouseover="mouseOver(data.id)"
          >
            <span>
              {{ data.name }}{{ node.level == 1 ? "(总公司)" : "" }}
            </span>
            <span v-if="data.type == 'department' && currentNodeId === data.id">
              <el-button
                v-if="hasBelongsPerm('edit', data.belongs)"
                class="el-icon-edit"
                circle
                size="mini"
                type="primary"
                @click="nodeEdit(data)"
              ></el-button>
              <el-button
                v-if="hasBelongsPerm('delete', data.belongs)"
                class="el-icon-delete"
                circle
                size="mini"
                type="danger"
                @click="nodeDelete(data)"
              ></el-button>
            </span>
            <span v-if="data.type == 'company' && currentNodeId === data.id">
              <el-button
                v-if="hasBelongsPerm('create', data.belongs)"
                class="el-icon-plus"
                circle
                size="mini"
                type="success"
                @click="addNode(data)"
              ></el-button>
            </span>
          </span>
        </el-tree>
        <div class="tips">
          <p>操作说明：</p>
          <p>1、鼠标移入显示新建部门图标，点击新增部门；</p>
          <p>
            2、部门可以删除，分公司不能删除；部门删除后，下辖分公司将隶属被删除部门上级公司；
          </p>
          <p>3、按住分公司或者部门，拖动进行组织架构调整；</p>
        </div>
      </div>
    </ht-card>
  </div>
</template>

<script>
import {
  getOrganizations,
  updateDepartments,
  addDepartments,
  deleteOrganizations,
  moveOrganizations
} from "@/api/base/base";
export default {
  name: "Teamer",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name"
      },
      temName: "",
      currentNodeId: 0,
      setTree: []
    };
  },
  watch: {
    temName: {
      handler: function(val) {
        console.log(val);
      }
    }
  },
  computed: {
    // 是否是总公司
    isRootCompany() {
      return node => {
        const { data } = node;
        return data.parentId === 0 && data.type === "company";
      };
    },
    isCompany() {
      return node => {
        const { data } = node;
        return data.parentId !== 0 && data.type === "company";
      };
    },
    isDepartment() {
      return node => {
        const { data } = node;
        return data.type === "department";
      };
    }
  },
  mounted() {
    this.getOrganizations();
  },
  methods: {
    // 总公司以外的节点允许拖拽
    allowDrag(node) {
      if (!this.hasBelongsPerm("edit", node.data.belongs)) return false;
      const { data } = node;
      return !(data.parentId === 0 && data.type === "company");
    },
    // 部门不能拖拽到部门下面
    allowDrop(draggingNode, dropNode) {
      const fromNodeIsDepartment = draggingNode.data.type === "department";
      const toNodeIsDepartment = dropNode.data.type === "department";

      return (
        !(fromNodeIsDepartment && toNodeIsDepartment) &&
        dropNode.data.parentId !== 0
      );
    },
    dragEnd(fromNode, toNode, type) {
      //TODO 连续快速拖拽会有问题，考虑添加loading
      moveOrganizations({
        toMoveId: fromNode.data.id,
        moveToId: type == "inner" ? toNode.data.id : toNode.parent.data.id
      })
        .then(() => {
          this.getOrganizations();
        })
        .catch(() => {
          this.getOrganizations();
        });
    },
    getOrganizations() {
      this.temName = "";
      getOrganizations().then(res => {
        this.setTree = [res];
      });
    },
    mouseOver(id) {
      this.currentNodeId = id;
      console.log(this.currentNodeId);
    },
    addNode(data) {
      this.$prompt(`请输入在${data.name}下新增的部门的名称`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        addDepartments({
          parentId: data.id,
          departmentName: value
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "新增成功!"
            });
            this.getOrganizations();
          })
          .catch(() => {
            this.getOrganizations();
          });
      });
    },
    nodeEdit(data) {
      this.$prompt(`请输入${data.name}修改后的名称`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        updateDepartments({
          id: data.id,
          departmentName: value
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.getOrganizations();
          })
          .catch(() => {
            this.getOrganizations();
          });
      });
    },
    resetInputFocus() {
      const inputs = document.querySelectorAll("input");
      const ps = document.getElementsByClassName("p-hide");
      inputs.forEach(item => {
        item.className = "input-hide";
      });
      ps.forEach(item => {
        item.className = "p-show";
      });
    },
    // 节点删除
    nodeDelete(data) {
      this.$confirm(
        `部门删除后，该部门员工所属部门将置空，确定删除吗？`,
        "提示",
        {
          type: "warning"
        }
      ).then(() => {
        deleteOrganizations({ id: data.id }).then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getOrganizations();
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content-wrap {
  width: 100%;
  height: 88vh;
  background-color: #f2f2f2;
  ::v-deep {
    .auto-card {
      // background-color: #f2f2f2;
    }
  }
}
.tree-wrap {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 98vh;
  padding: 10px;
  background: #fff;
  .tips {
    flex: 1;
    border: solid 1px #f2f2f2;
    margin-left: 50px;
    border-radius: 10px;
    padding: 10px;
    background: #fff;
  }
  ::v-deep {
    .el-tree {
      width: 400px;
      height: 80vh;
      overflow-y: scroll;
    }
    .custom-tree-node {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // input {
      //   background-color: #fff;
      //   background-image: none;
      //   border-radius: 4px;
      //   border: 1px solid #dcdfe6;
      //   box-sizing: border-box;
      //   color: #606266;
      // }
      // input:focus {
      //   outline: none;
      //   border-color: #409eff;
      // }
      // p {
      //   margin: 0;
      // }
      // .input-show {
      //   display: block;
      // }
      // .input-hide {
      //   display: none;
      // }
      // .p-show {
      //   display: block;
      // }
      // .p-hide {
      //   display: none;
      // }
    }
  }
}
.my_tree {
  // background: #f2f2f2;
}
</style>
