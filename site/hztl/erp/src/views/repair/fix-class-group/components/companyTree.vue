<template>
  <div class="company-tree">
    <el-tree
      ref="company-tree"
      :data="structure"
      :highlight-current="true"
      :expand-on-click-node="false"
      node-key="id"
      :load="loadNode"
      lazy
      :default-expand-all="true"
      :current-node-key="currentNodeKey"
      :props="defaultProps"
      @node-click="handleNodeClick"
      draggable
      :allow-drag="allowDrag"
      :allow-drop="allowDrop"
      @node-drop="dragEnd"
    >
      <div
        class="custom-tree-node"
        slot-scope="{ node, data }"
        @mouseover="setHover(node)"
        @mouseleave="currentHoverLabel = ''"
      >
        <div v-if="node.level === 1 && !data.type" class="top-level">
          {{ node.label }}
        </div>
        <div v-show="node.level !== 1 && !data.type" class="sub-level">
          <input
            :ref="'editeInput' + '-' + node.data.id"
            v-if="currentEditeInput === node.data.id"
            v-model="temNodeName"
            @keydown.enter="sureEditeGroup($event, node.data.id)"
          />
          <span v-else
            >{{ node.label
            }}{{ node.data.staffCount ? ` (${node.data.staffCount}人)` : ""
            }}{{ node.data.levelName ? ` (${node.data.levelName})` : "" }}</span
          >
        </div>
        <div v-if="hasBelongsPerm('create', ['our', 'rests'])">
          <div v-if="data.type === 'new'" class="sub-level">
            <input
              :ref="'input' + '-' + node.parent.data.id"
              v-if="currentInputId == node.parent.data.id"
              v-model="newGroupName"
              placeholder="新增班组"
              @keydown.enter="sureNewGroup(node.parent.data.id)"
            />
            <span v-else @click="showInput(node.parent.data.id)"
              >+新增班组</span
            >
          </div>
        </div>
        <div
          class="tree_node_op"
          v-if="currentHoverLabel === node.data.id && currentHoverLabel != '0'"
        >
          <span
            v-if="node.data.enableUpdate"
            @click="edite(node.data)"
            class="icon operation-icon icon-edit-info"
          />
          <span
            v-if="node.data.enableDelete"
            @click="deleteGroup(node.data)"
            class="icon operation-icon icon-delete-info"
          />
        </div>
      </div>
    </el-tree>
  </div>
</template>

<script>
import {
  getTechniciansGroupStructure,
  getTechniciansGroupDetail,
  createTechniciansGroup,
  updateTechniciansGroup,
  deleteTechniciansGroup,
  moveTechnicians
} from "@/api/repairs";
export default {
  data() {
    return {
      showEditInput: false,
      currentEditeInput: null,
      temNodeName: "",
      structure: [],
      currentNodeKey: "",
      currentInputId: "",
      newGroupName: "",
      currentHoverLabel: "",
      defaultProps: {
        children: "groups",
        label: "name",
        isLeaf: "leaf"
      }
    };
  },
  mounted() {
    this.getTechniciansGroupStructure();
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 1) {
        return resolve([...node.data.groups]);
      }
      // 懒加载维修组下的成员
      // 新增班组目录需要为空
      if (node.data.leaf) {
        return resolve([]);
      }
      if (node.level === 2) {
        const { id: companyId } = node.parent.data;
        const { id } = node.data;
        getTechniciansGroupDetail({ companyId, id }).then(res => {
          const { technicianCommissions, technicians, totalWeight } = res;
          if (!technicians) {
            this.$emit("commissionsChange", []);
            resolve([]);
            return;
          }
          technicians.forEach(technician => {
            technician.name = technician.staffName;
            technician.leaf = true;
          });
          this.$emit("commissionsChange", technicianCommissions, totalWeight);
          resolve(technicians);
        });
      }

      if (node.level === 3) {
        return resolve([]);
      }
    },
    getTechniciansGroupStructure() {
      getTechniciansGroupStructure().then(res => {
        res.forEach(company => {
          if (company.groups && company.groups.length) {
            company.groups.forEach(group => {
              group.enableUpdate = this.hasBelongsPerm(
                "update",
                company.belongs
              );
              group.enableDelete = this.hasBelongsPerm(
                "delete",
                company.belongs
              );
            });
          }
          if (this.hasBelongsPerm("create", company.belongs)) {
            company.groups.push({
              type: "new",
              leaf: true
            });
          }
        });
        this.structure = res;
      });
    },
    handleNodeClick(data, node) {
      this.currentNodeKey = data.label;
      const { enableUpdate, enableDelete } = node.parent.data;
      this.$emit("nodeChange", {
        ...data,
        enableUpdate,
        enableDelete
      });
      if (node.level === 3) {
        const { id: companyId } = node.parent.parent.data;
        const { id } = node.parent.data;
        getTechniciansGroupDetail({ companyId, id }).then(res => {
          const { technicianCommissions, technicians, totalWeight } = res;
          if (!technicians) {
            this.$emit("commissionsChange", []);
            return;
          }
          technicians.forEach(technician => {
            technician.name = technician.staffName;
            technician.leaf = true;
          });
          this.$emit("commissionsChange", technicianCommissions, totalWeight);
        });
      }
    },
    allowDrag(node) {
      const { level } = node;
      return level === 3 && node.parent.data.enableUpdate;
    },
    // 控制是否可以拖进来
    allowDrop(draggingNode, dropNode, type) {
      const isSameCompany =
        draggingNode.parent.parent.id === dropNode.parent.id;
      const isGroup = dropNode.level === 2;
      const isNewBtn = dropNode.data.type == "new";
      return isSameCompany && isGroup && !isNewBtn && type === "inner";
    },
    dragEnd(fromNode, toNode) {
      moveTechnicians({
        staffId: fromNode.data.staffId,
        groupId: toNode.data.id
      })
        .then(() => {
          this.getTechniciansGroupStructure();
        })
        .catch(() => {
          this.getTechniciansGroupStructure();
        });
    },
    sureNewGroup(companyId) {
      if (!this.newGroupName) {
        this.currentInputId = "";
        this.newGroupName = "";
        return;
      }
      this.$confirm(`确定要新增部门: ${this.newGroupName}  吗？`, "提示", {
        type: "warning"
      })
        .then(() => {
          createTechniciansGroup({ companyId, name: this.newGroupName }).then(
            () => {
              this.currentInputId = "";
              this.newGroupName = "";
              this.getTechniciansGroupStructure();
            }
          );
        })
        .catch(() => {
          this.showInput(companyId);
        });
    },
    sureEditeGroup(e, id) {
      e.preventDefault();
      this.$confirm(`确定要修改部门名称为: ${this.temNodeName}  吗？`, "提示", {
        type: "warning"
      })
        .then(() => {
          updateTechniciansGroup({ id, name: this.temNodeName }).then(() => {
            this.currentEditeInput = null;
            this.getTechniciansGroupStructure();
          });
        })
        .catch(() => {
          this.currentEditeInput = null;
        });
    },
    setHover(node) {
      if (node.level == 2 && !node.data.leaf) {
        this.currentHoverLabel = node.data.id;
      }
    },
    edite(data) {
      const { id, name } = data;
      this.temNodeName = name;
      // this.showEditInput = true;
      this.currentEditeInput = id;
      this.$forceUpdate();
      this.$nextTick(() => {
        this.$refs["editeInput" + "-" + id].focus();
      });
    },
    deleteGroup(data) {
      const { id, name } = data;
      this.$confirm(`确定要删除部门: ${name}  吗？`, "提示", {
        type: "warning"
      })
        .then(() => {
          deleteTechniciansGroup({ id }).then(() => {
            this.getTechniciansGroupStructure();
          });
        })
        .catch(() => {});
    },
    showInput(id) {
      this.newGroupName = "";
      this.currentInputId = id;
      this.$forceUpdate();
      this.$nextTick(() => {
        this.$refs["input" + "-" + id].focus();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.company-tree {
  height: 80vh;
  overflow-y: scroll;
  &::v-deep {
    .el-tree {
      padding: 0;
    }
    .el-tree-node__children {
      background-color: #f5f7fa;
    }
    input {
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
    }
    input:focus {
      outline: none;
      border-color: #409eff;
    }
  }
}

.custom-tree-node {
  width: 100%;
  // height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .top-level {
    font-size: 16px;
  }
}
.input-hide {
  display: none;
}
</style>
