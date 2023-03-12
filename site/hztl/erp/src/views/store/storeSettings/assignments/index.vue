<template>
  <section class="container-box">
    <ht-card class="auto-card" no-padding>
      <el-row class="full-container" :gutter="5">
        <el-col :span="8" class="full-container">
          <ht-card title="分公司列表" class="full-container">
            <ht-table
              v-loading="loading"
              :data="ruleForm.tableData"
              @selectChange="handleCurrentChange"
              style="height: calc(100% - 37px)"
            >
              <el-table-column
                label="公司名称"
                prop="name"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column label="可使用仓库" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{
                    scope.row.warehouseNames &&
                      scope.row.warehouseNames.join(",")
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="可使用货位数"
                prop="positionCount"
              ></el-table-column>
            </ht-table>
          </ht-card>
        </el-col>
        <el-col :span="16" class="full-container">
          <ht-card title="仓库分配" style="height: 100%;">
            <div slot="after-title" class="after-title-container">
              <el-button
                :disabled="!seletcRow.id || !hasAutoPerm('assignment.assign')"
                type="primary"
                size="mini"
                plain
                @click="saveStore"
              >
                保存
              </el-button>
              <el-button
                :disabled="!seletcRow.id || !hasAutoPerm('assignment.assign')"
                type="primary"
                size="mini"
                plain
                @click="reloadTree"
              >
                重置
              </el-button>
            </div>
            <div class="el-tree-no-background" style="overflow: auto">
              <store-tree
                ref="trees"
                v-loading="storeLoading"
                lazy
                :load="loadNode"
                :props="defaultProps"
                :default-expanded-keys="expandedArr"
                show-checkbox
                node-key="id"
                @check="nodeCheackChange"
                highlight-current
              />
            </div>
          </ht-card>
        </el-col>
      </el-row>
    </ht-card>
  </section>
</template>
<script>
import {
  getStoreTree,
  reqStoreHouses,
  reqStoreHousesDispatch,
  resetStoreHouses
} from "@/api/store/assignments";
import { searchMixin } from "@/mixins";
import storeTree from "../components/storeTree";
import hotkeys from "hotkeys-js";
import { mapState } from "vuex";

export default {
  name: "StoreDispatch",
  components: {
    storeTree
  },
  mixins: [searchMixin],
  computed: {
    ...mapState("admin/systemParams", {
      isEasyMode: state => !!state.params.manageMode
    })
  },
  data() {
    return {
      keyScope: Symbol("StoreDispatch"),
      defaultProps: {
        children: "next",
        label: "name",
        isLeaf: "leaf"
      },
      expandedArr: [],
      allSuccess: true,
      loading: true,
      storeLoading: false,
      seletcRow: {},
      ruleForm: {
        tableData: []
      },
      rules: {
        check: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: "change"
          }
        ]
      },
      currentNode: {},
      checkData: {}
    };
  },
  mounted() {
    this.initList();
  },
  activated() {
    hotkeys.setScope(this.keyScope);
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    initList() {
      reqStoreHousesDispatch()
        .then(data => {
          this.ruleForm.tableData = data;
          this.loading = false;
        })
        .catch(err => {
          this.$message.error(err);
          this.loading = false;
        });
    },
    setNodeCheck(key, value) {
      const node = this.$refs.trees.$refs.tree.getNode(key);
      if (node) {
        switch (value) {
          case null:
            this.$refs.trees.$refs.tree.setChecked(key, true, true);
            break;
          default:
            node.indeterminate = true;
            break;
        }
      }
    },
    checkDataForeach() {
      for (const i in this.checkData) {
        this.setNodeCheck(i, this.checkData[i]);
        for (const j in this.checkData[i]) {
          this.setNodeCheck(i + "-" + j, this.checkData[i][j]);
          for (const k in this.checkData[i][j]) {
            this.setNodeCheck(i + "-" + j + "-" + k, this.checkData[i][j][k]);
            for (const l in this.checkData[i][j][k]) {
              this.setNodeCheck(
                i + "-" + j + "-" + k + "-",
                this.checkData[i][j][k][l]
              );
            }
          }
        }
      }
    },
    setChecked() {
      this.$nextTick(() => {
        this.checkDataForeach();
      });
    },
    loadNode(node, resolve) {
      this.currentNode = node;
      if (node.level === 0) {
        getStoreTree({ type: 0 }).then(res => {
          const nodeArr = [];
          if (res && res.length > 0) {
            res.forEach(item => {
              nodeArr.push({
                id: item.id,
                key: item.id,
                name: item.name,
                leaf: !item.hasChildren || this.isEasyMode,
                status: item.status,
                type: "warehouse"
              });
            });
          }
          this.setChecked();
          return resolve(nodeArr);
        });
      } else if (node.level === 1) {
        getStoreTree({ type: 1, parentId: node.data.key }).then(res => {
          const nodeArr = [];
          if (res && res.length > 0) {
            res.forEach(item => {
              nodeArr.push({
                id: node.data.id + "-" + item.id,
                key: item.id,
                name: item.name,
                leaf: !item.hasChildren,
                status: item.status,
                parentId: node.data.key,
                type: "wareareas"
              });
            });
          }
          this.setChecked();
          return resolve(nodeArr);
        });
      } else if (node.level === 2) {
        getStoreTree({ type: 2, parentId: node.data.key }).then(res => {
          const nodeArr = [];
          if (res && res.length > 0) {
            res.forEach(item => {
              nodeArr.push({
                id: node.data.id + "-" + item.id,
                key: item.id,
                name: item.name,
                leaf: !item.hasChildren,
                status: item.status,
                parentId: node.data.parentId,
                parentId1: node.data.key,
                type: "shelves"
              });
            });
          }
          this.setChecked();
          return resolve(nodeArr);
        });
      } else if (node.level === 3) {
        getStoreTree({ type: 3, parentId: node.data.key }).then(res => {
          const nodeArr = [];
          if (res && res.length > 0) {
            res.forEach(item => {
              nodeArr.push({
                id: node.data.id + "-" + item.id,
                key: item.id,
                name: item.name,
                leaf: true,
                status: item.status,
                parentId: node.data.parentId,
                parentId1: node.data.parentId1,
                parentId2: node.data.key,
                type: "layers"
              });
            });
          }
          this.setChecked();
          return resolve(nodeArr);
        });
      }
    },
    allowDrop(draggingNode, dropNode, type) {
      if (type === "inner") {
        return false;
      } else {
        return true;
      }
      // return type !== "inner";
    },
    handleCurrentChange(nowVal, row) {
      if (!row) return;
      this.seletcRow = row;
      if (!row.id) {
        this.allSuccess = true;
        this.$refs.trees.$refs.tree.setCheckedKeys([]);
        return;
      }
      this.ToClose();
      this.$refs.trees.$refs.tree.setCheckedKeys([]);
      this.storeLoading = true;
      this.accountStore(row.id, row);
    },
    //收起树
    ToClose() {
      const elsopen = this.$el.getElementsByClassName("is-expanded");
      if (this.$el.getElementsByClassName("is-expanded")) {
        for (let i = 0; i < elsopen.length; i++) {
          elsopen[i].click();
        }
      }
    },
    reloadTree() {
      this.$refs.trees.$refs.tree.setCheckedKeys([]);
      this.accountStore(this.seletcRow.id);
    },
    accountStore(id) {
      reqStoreHouses({ businessCompanyId: id })
        .then(data => {
          this.storeLoading = false;
          this.checkData = data;
          this.setChecked();
        })
        .catch(() => {
          this.storeLoading = false;
        });
    },
    saveStore() {
      const data = {
        businessCompanyId: this.seletcRow.id,
        storehouseTree: this.checkData
      };
      resetStoreHouses(data).then(() => {
        this.$message.success({ message: "保存成功!" });
        // 保存之后刷新出库顺序列表
        this.accountStore(this.seletcRow.id);
        this.initList();
      });
    },
    nodeCheackChange(data) {
      const nodeId = data.id;
      const isChecked = this.$refs.trees.$refs.tree.getNode(nodeId).checked;
      let parentIdNode,
        parentId1Node,
        parentId2Node = {};
      let parentIdCheaked,
        parentIdHalf,
        parentId1Cheaked,
        parentId1Half,
        parentId2Cheaked,
        parentId2Half = false;
      if (data.parentId) {
        parentIdNode = this.$refs.trees.$refs.tree.getNode(data.parentId);
        parentIdCheaked = this.$refs.trees.$refs.tree.getNode(data.parentId)
          .checked;
        parentIdHalf = this.$refs.trees.$refs.tree.getNode(data.parentId)
          .indeterminate;
      }
      if (data.parentId1) {
        parentId1Node = this.$refs.trees.$refs.tree.getNode(
          data.parentId + "-" + data.parentId1
        );
        parentId1Cheaked = this.$refs.trees.$refs.tree.getNode(
          data.parentId + "-" + data.parentId1
        ).checked;
        parentId1Half = this.$refs.trees.$refs.tree.getNode(
          data.parentId + "-" + data.parentId1
        ).indeterminate;
      }
      if (data.parentId2) {
        parentId2Node = this.$refs.trees.$refs.tree.getNode(
          data.parentId + "-" + data.parentId1 + "-" + data.parentId2
        );
        parentId2Cheaked = this.$refs.trees.$refs.tree.getNode(
          data.parentId + "-" + data.parentId1 + "-" + data.parentId2
        ).checked;
        parentId2Half = this.$refs.trees.$refs.tree.getNode(
          data.parentId + "-" + data.parentId1 + "-" + data.parentId2
        ).indeterminate;
      }
      //最外层
      if (!data.parentId) {
        if (isChecked) {
          this.checkData[nodeId] = null;
        } else {
          delete this.checkData[nodeId];
        }
      }
      if (data.parentId) {
        //有第二层
        if (parentIdCheaked) {
          this.checkData[data.parentId] = null;
        } else if (parentIdHalf) {
          if (!this.checkData[data.parentId]) {
            this.checkData[data.parentId] = {};
          }
          if (parentIdNode.childNodes) {
            parentIdNode.childNodes.forEach(item => {
              if (
                item.checked &&
                !this.checkData[data.parentId][item.data.key]
              ) {
                this.checkData[data.parentId][item.data.key] = null;
              }
            });
          }
          if (!data.parentId1 && !data.parentId2) {
            if (isChecked) {
              this.checkData[data.parentId][data.key] = null;
            } else {
              delete this.checkData[data.parentId][data.key];
            }
          }
        } else {
          delete this.checkData[data.parentId];
        }
      }
      if (data.parentId1) {
        //有第三层
        if (parentId1Cheaked) {
          this.checkData[data.parentId][data.parentId1] = null;
        } else if (parentId1Half) {
          if (!this.checkData[data.parentId][data.parentId1]) {
            this.checkData[data.parentId][data.parentId1] = {};
          }
          if (parentId1Node.childNodes) {
            parentId1Node.childNodes.forEach(item => {
              if (
                item.checked &&
                !this.checkData[data.parentId][data.parentId1][item.data.key]
              ) {
                this.checkData[data.parentId][data.parentId1][
                  item.data.key
                ] = null;
              }
            });
          }
          if (!data.parentId2) {
            if (isChecked) {
              this.checkData[data.parentId][data.parentId1][data.key] = null;
            } else {
              delete this.checkData[data.parentId][data.parentId1][data.key];
            }
          }
        } else {
          delete this.checkData[data.parentId][data.parentId1];
        }
      }
      if (data.parentId2) {
        //有第四层
        if (parentId2Cheaked) {
          this.checkData[data.parentId][data.parentId1][data.parentId2] = null;
        } else if (parentId2Half) {
          if (!this.checkData[data.parentId][data.parentId1][data.parentId2]) {
            this.checkData[data.parentId][data.parentId1][data.parentId2] = {};
          }
          parentId2Node.childNodes.forEach(item => {
            if (
              item.checked &&
              !this.checkData[data.parentId][data.parentId1][data.parentId2][
                item.data.key
              ]
            ) {
              this.checkData[data.parentId][data.parentId1][data.parentId2][
                item.data.key
              ] = null;
            }
          });
        } else {
          delete this.checkData[data.parentId][data.parentId1][data.parentId2];
        }
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~@/assets/base.styl';
/deep/.after-title {
    flex: unset !important;
    margin-left: auto;
}
/deep/.el-card__body{
    height 100%
}
.full-container
    height 100%
    /deep/.el-tabs__content
            height calc(100% - 40px)
            .el-tab-pane
                height 100%
                display flex
                flex-direction column
                .tip-header
                    text-align left
                    font-size 14px
                .el-tree-no-background
                    flex auto
                    overflow auto
                    background #FBFBFB
                .confirm-btns
                    flex none
                    text-align right
/deep/.el-tree-no-background
        height calc(100% - 37px)
        .el-tree
            background transparent

.halving-left-line
    border-left 1px solid #D9D9D9

.dispatch-store-tree-container
    height 100%
    padding 10px
</style>
