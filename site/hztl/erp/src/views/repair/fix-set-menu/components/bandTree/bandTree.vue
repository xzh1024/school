<template>
  <ht-card padding title="套餐列表" class="auto-card set-menu-form">
    <div class="company-tree">
      <el-tree
        ref="tree"
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
      >
        <div
          class="custom-tree-node"
          slot-scope="{ node, data }"
          @mouseover="setHover(node)"
          @mouseleave="currentHoverLabel = ''"
        >
          <!-- 普通节点 -->
          <div
            class="top-level"
            v-if="data.type !== 'new'"
            @click="editeNode(node)"
          >
            {{ node.label }}
          </div>
          <!-- 具体套餐 -->
          <div v-if="data.type === 'new' && node.level === 3" class="sub-level">
            <el-input
              :id="'new-sub'"
              :ref="'input' + '-' + node.parent.data.id"
              v-model="newGroupName"
              placeholder="保养里程"
              size="mini"
              @input="inputChange"
              @blur="sureNewGroup(node.level, node.parent.data.id)"
              @keydown.enter="sureNewGroup(node.level, node.parent.data.id)"
            />
          </div>
          <!-- 品牌 -->
          <div v-if="data.type === 'new' && node.level == 2" class="sub-level">
            <ht-autoselect
              :id="'new-sub'"
              :ref="'input' + '-' + node.parent.data.id"
              v-model="newGroupName"
              remote
              :fetch-suggestions="
                (query, name) =>
                  getSyscompleteFunc('vehicleGroup', query, node.parent.data)
              "
              size="small"
              placeholder="车型"
              :trigger-on-focus="false"
              :maxlength="50"
              @blur="createVehicleGroup(node.parent.data.id)"
              highlight-first-item
            />
          </div>
          <div
            class="tree_node_op"
            v-if="
              currentHoverLabel === node.data.id &&
                data.type !== 'new' &&
                node.level < 3
            "
          >
            <span
              v-if="hasAutoPerm('delete')"
              @click="deleteGroup(node.data)"
              class="icon operation-icon icon-delete-info"
            />
            <span
              v-if="hasAutoPerm('create')"
              @click="addSub(node)"
              class="icon operation-icon icon-add-info"
            />
          </div>
          <div
            class="tree_node_op"
            v-if="
              currentHoverLabel === node.data.id &&
                data.type !== 'new' &&
                node.level == 3
            "
          >
            <span
              v-if="hasAutoPerm('delete')"
              @click="deleteGroup(node.data)"
              class="icon operation-icon icon-delete-info"
            />
          </div>
        </div>
      </el-tree>
      <!-- 新增厂牌 -->
      <div v-if="showNewBand" class="add-input">
        <ht-autoselect
          v-model="facBrand"
          remote
          size="mini"
          :fetch-suggestions="query => getSyscompleteFunc('facBrand', query)"
          placeholder="厂牌"
          style="marginTop:10px"
          :trigger-on-focus="false"
          :maxlength="50"
          @blur="createBand"
          highlight-first-item
        />
      </div>
    </div>
    <div class="addBrand" v-if="hasAutoPerm('create')" @click="addNewBand">
      +新增厂牌
    </div>
  </ht-card>
</template>

<script>
import { cloneDeep } from "lodash";
import {
  listBandTree,
  listFixSets,
  createFixSets,
  deleteFixSets
} from "@/api/repairs/sets";
import { getSearchSysAvaVehModelsOptions } from "@/api/parts/partsModels";
export default {
  name: "BandTree",
  props: {
    defaultInputName: {
      type: String,
      default: ""
    }
  },
  watch: {
    defaultInputName: {
      handler(newVal) {
        this.newGroupName = newVal;
      }
    }
  },
  data() {
    return {
      facBrand: "",
      vehicleGroup: "",
      creatingNewSet: false,
      showNewBand: false,
      showEditInput: false,
      showNewSubInput: false,
      currentEditeInput: null,
      temNodeName: "",
      structure: [],
      currentNodeKey: "",
      currentInputId: "",
      newGroupName: "",
      currentHoverLabel: "",
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: "leaf"
      }
    };
  },
  mounted() {
    this.listBandTree();
  },
  methods: {
    addNewBand() {
      if (!this.hasAutoPerm("create")) {
        this.$message.warning("您没有新增套餐的权限");
        return;
      }
      this.facBrand = null;
      this.showNewBand = true;
    },
    createBand() {
      if (!this.facBrand) return;
      createFixSets({ name: this.facBrand, parentId: 0 })
        .then(() => {
          this.showNewBand = false;
          this.listBandTree();
        })
        .catch(() => {
          this.showNewBand = false;
        });
    },
    createVehicleGroup(pid) {
      if (!this.newGroupName) {
        return;
      }
      createFixSets({ name: this.newGroupName, parentId: pid })
        .then(() => {
          this.showNewBand = false;
          this.listBandTree();
        })
        .catch(() => {
          this.showNewBand = false;
        });
    },
    async getSyscompleteFunc(type, query, node) {
      const queryForm = { dataSource: "mj", fieldType: type };
      if (type === "facBrand") {
        queryForm.facBrand = query;
      }
      if (type === "vehicleGroup") {
        queryForm.facBrand = node.name;
        queryForm.vehicleGroup = query;
      }
      const res = await getSearchSysAvaVehModelsOptions(queryForm);
      let arr = [];
      if (res) {
        arr = res.map(item => ({ id: item, name: item }));
      }
      return arr;
    },
    loadNode(node, resolve) {
      if (node.data.type && node.data.type === "new") {
        resolve([]);
        return;
      }
      if (node.level === 1) {
        if (!node.data.children) {
          return resolve([]);
        }
        return resolve([...node.data.children]);
      }
      if (node.level === 2) {
        const { id: parentId } = node.data;
        listFixSets({ parentId }).then(res => {
          if (!res) {
            resolve([]);
            return;
          }
          res.forEach(item => {
            item.leaf = true;
          });
          resolve(res);
        });
      }
      if (node.level === 3) resolve([]);
    },
    listBandTree() {
      this.newGroupName = "";
      this.creatingNewSet = false;
      listBandTree().then(res => {
        this.structure = res;
      });
    },
    handleNodeClick(data, node) {
      this.currentNodeKey = data.label;
      // 点击不是新建框的套餐，需要把新建框的都干掉
      if (data.type != "new" && data.level == 3 && this.creatingNewSet) {
        const tem = [...this.structure];
        console.log(tem);
        this.structure = tem.map(brand => {
          return {
            ...brand,
            children: brand.children
              ? brand.children.map(model => {
                  return {
                    ...model,
                    children: model.children
                      ? model.children.map(set => set.type != "new")
                      : []
                  };
                })
              : []
          };
        });
        this.creatingNewSet = false;
        console.log(node);
        this.$emit("editSet", node, node.parent, node.parent.parent);
      }
    },
    addSub(node) {
      this.showNewBand = false;
      // 如果当前正在编辑
      if (this.creatingNewSet) {
        console.log("正在编辑新的里程套餐");
        this.$emit("handleSave");
        return;
      }
      if (this.newGroupName) {
        console.log("正在编辑");
        return;
      }
      const { data, childNodes, level } = node;
      const children = [];
      childNodes.forEach(item => {
        children.push(item.data);
      });
      const { id } = data;
      let isNewExist = false;
      if (children) {
        isNewExist = children.find(item => {
          return item.type && item.type === "new";
        });
      }
      if (isNewExist) return;
      children.push({ type: "new" });
      const newArr = cloneDeep(children);
      this.showNewSubInput = true;
      // 如果是新增的第三级，相当于点击了新建按钮
      if (level == 2) {
        this.creatingNewSet = true;
        this.$emit("createSet", id, node, node.parent);
      }
      this.$nextTick(() => {
        this.$refs.tree.updateKeyChildren(id, newArr);

        this.$nextTick(() => {
          document.getElementById("new-sub").focus();
        });
      });
    },
    deleteSet(e) {
      console.log(e);
    },
    editeNode(node) {
      const { isLeaf } = node;
      if (!isLeaf) return;
      this.$emit("editSet", node, node.parent, node.parent.parent);
    },
    sureNewGroup(level, parentId) {
      if (level == 3) return;
      if (!this.newGroupName) {
        this.currentInputId = "";
        this.newGroupName = "";
        // structure.forEach(item=>{
        // })
        return;
      }
      this.$confirm(`"确定要新增车型": ${this.newGroupName}  吗？`, "提示", {
        type: "warning"
      })
        .then(() => {
          createFixSets({ name: this.newGroupName, parentId: parentId }).then(
            () => {
              this.newGroupName = "";
              this.listBandTree();
            }
          );
        })
        .catch(() => {
          this.listBandTree();
          this.newGroupName = "";
          // this.showInput(companyId);
        });
    },
    sureEditeGroup(e, id) {
      console.log(id);
      e.preventDefault();
      this.$confirm(
        `"确定要修改部门名称为": ${this.temNodeName}  吗？`,
        "提示",
        {
          type: "warning"
        }
      )
        .then(() => {
          // updateTechniciansGroup({ id, name: this.temNodeName }).then(() => {
          //   this.currentEditeInput = null;
          //   this.listBandTree();
          // });
        })
        .catch(() => {
          this.listBandTree();
          this.currentEditeInput = null;
        });
    },
    setHover(node) {
      this.currentHoverLabel = node.data.id;
      if (!node.data.leaf) {
        this.currentHoverLabel = node.data.id;
      }
    },
    inputChange(e) {
      console.log(e);
      this.$emit("nameChange", e);
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
      const { id, name, hasStore } = data;
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
          deleteFixSets({ id }).then(() => {
            this.listBandTree();
          });
        });
      } else {
        this.$confirm(`"确定要删除": ${name}  吗？`, "提示", {
          type: "warning"
        })
          .then(() => {
            deleteFixSets({ id }).then(() => {
              this.listBandTree();
            });
          })
          .catch(() => {});
      }
    },
    showInput(id) {
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
.set-menu-form {
  position: relative;
  width: 25%;
  height: 80vh;
  background: #fff;
  ::v-deep {
    .el-card__body {
      overflow: hidden;
      margin-bottom: 50px;
    }
  }
}
.company-tree {
  min-width: 200px;
  height: 96%;
  background: #fff;
  overflow-y: scroll;
  &::v-deep {
    .el-tree {
      padding: 0;
      height: 100%;
      // overflow-y: scroll;
    }
    .el-input--small .el-input__inner {
      height: 26px;
      line-height: 26px;
    }
    .el-tree-node__children {
      // background-color: #f5f7fa;
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
    .is-current {
      .top-level {
        color: rgb(102, 177, 255);
      }
    }
  }
}

.custom-tree-node {
  width: 100%;
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  .top-level {
    font-size: 14px;
  }
}
.input-hide {
  display: none;
}
.add-input {
  position: absolute;
  line-height: 35px;
  height: 35px;
  left: 0;
  right: 0;
  bottom: 40px;
  cursor: pointer;
  background: #fff;
  padding-left: 5px;
  ::v-deep {
    .el-autocomplete {
      margin-top: 0 !important;
    }
  }
}
.addBrand {
  position: absolute;
  text-align: center;
  line-height: 40px;
  height: 40px;
  left: 0;
  right: 0;
  bottom: 0px;
  border-top: solid 1px #eee;
  cursor: pointer;
  background: #fff;
}
</style>
