<template>
  <section class="container-box">
    <ht-card class="auto-card" no-padding>
      <el-row class="full-container" :gutter="5">
        <el-col :span="16" class="full-container">
          <el-form
            :model="searchForm"
            submit-on-enter
            :show-message="false"
            label-width="35px"
            size="mini"
            class="form-item-small-margin-bottom mt-1"
            style="margin-left: 10px;"
          >
            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item
                  prop="companyId"
                  label="分公司"
                  label-width="45px"
                >
                  <ht-select
                    v-model="searchForm.companyId"
                    :options="companyOptions"
                    @change="loadStaff"
                    placeholder="请选择分公司"
                  >
                  </ht-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="staffId" label="员工">
                  <ht-select
                    v-model="searchForm.staffId"
                    :options="staffOptions"
                    placeholder="请选择员工"
                  >
                  </ht-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="roleId" label="角色">
                  <ht-select
                    v-model="searchForm.roleCodes"
                    :options="roleOptions"
                    placeholder="请选择角色"
                    filterable
                    multiple
                    collapse-tags
                  >
                  </ht-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <div>
                  <el-button type="primary" size="mini" @click="initList(1)">
                    查询（F5）
                  </el-button>
                  <el-button type="primary" size="mini" @click="reset">
                    重置（F6）
                  </el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
          <ht-card title="仓储人员" class="full-container">
            <ht-table
              v-loading="loading"
              :data="tableData"
              :total="tableTotal"
              :pagination="true"
              :current-page.sync="currentPage"
              @selectChange="handleCurrentChange"
              @pageChange="initList"
            >
              <el-table-column
                label="分公司"
                prop="companyName"
              ></el-table-column>
              <el-table-column label="员工" prop="staffName"></el-table-column>
              <el-table-column label="角色" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{
                    scope.row.roleNames && scope.row.roleNames.join(",")
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column label="已分配仓库" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{
                    scope.row.warehouseNames &&
                      scope.row.warehouseNames.join(",")
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="管理货架数"
                prop="shelfCount"
              ></el-table-column>
            </ht-table>
          </ht-card>
        </el-col>
        <el-col :span="8" class="full-container">
          <ht-card title="仓库权限" style="height: 100%;">
            <div slot="after-title" class="after-title-container">
              <el-button
                v-show="hasBelongsPerm('update')"
                :disabled="!seletcRow.staffId || Nothandle"
                type="primary"
                size="mini"
                plain
                @click="saveStore"
              >
                保存
              </el-button>
              <el-button
                v-show="hasBelongsPerm('update')"
                :disabled="!seletcRow.staffId || Nothandle"
                type="primary"
                size="mini"
                plain
                @click="reloadTree"
              >
                重置
              </el-button>
            </div>
            <div class="el-tree-no-background" style="overflow: auto;">
              <el-tree
                ref="trees"
                v-loading="storeLoading"
                lazy
                :load="loadNode"
                :props="defaultProps"
                :show-checkbox="!Nothandle"
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
import { getStoreTree } from "@/api/store/assignments";
import {
  ChangeStaffsStore,
  branchCompany,
  getStaffs,
  getStaffsList,
  getStaffsStore
} from "@/api/store/storePerms";
import { searchMixin } from "@/mixins";
import hotkeys from "hotkeys-js";
import { mapState } from "vuex";

const defaultSearchData = {
  roleCodes: [
    "warehouseLogistics",
    "warehouseManager",
    "warehousePartManager",
    "companyAdmin",
    "companyManager"
  ]
};
export default {
  name: "StoreDispatch",
  mixins: [searchMixin],
  computed: {
    ...mapState("admin/systemParams", {
      isEasyMode: state => !!state.params.manageMode
    }),
    ...mapState("admin", {
      pageSizes: state => state.table.pageSize
    }),
    Nothandle() {
      //角色是否不能操作
      if (this.seletcRow?.builtinRoles) {
        return (
          this.seletcRow?.builtinRoles.includes("systemAdmin") ||
          this.seletcRow?.builtinRoles.includes("generalManager")
        );
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      keyScope: Symbol("StoreDispatch"),
      defaultProps: {
        children: "next",
        label: "name",
        isLeaf: "leaf"
      },
      allSuccess: true,
      loading: true,
      storeLoading: false,
      seletcRow: {},
      searchForm: { ...defaultSearchData },
      tableData: [],
      roleOptions: [
        { id: "warehouseManager", name: "仓储物流经理" },
        { id: "warehousePartManager", name: "配件库管员" },
        { id: "warehouseLogistics", name: "收发货专员" },
        { id: "companyAdmin", name: "分公司管理员" },
        { id: "companyManager", name: "分公司经理" }
      ],
      companyOptions: [],
      staffOptions: [],
      tableTotal: 0,
      currentPage: 1,
      checkData: {}
    };
  },
  mounted() {
    this.innitOptions();
    this.initList(1);
  },
  activated() {
    hotkeys.setScope(this.keyScope);
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    reset() {
      this.searchForm = { ...defaultSearchData };
      this.initList(1);
    },
    innitOptions() {
      branchCompany("storehouse-manager")
        .then(data => {
          this.companyOptions = data;
        })
        .catch(err => {
          this.$message.error(err);
        });
      this.loadStaff();
    },
    loadStaff() {
      getStaffs("storehouse-manager", {
        companyId: this.searchForm.companyId,
        roleCodes: this.searchForm.roleCodes
      })
        .then(data => {
          this.staffOptions = data;
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    initList(page) {
      getStaffsList({
        ...this.searchForm,
        page: page ? page : this.currentPage,
        pageSize: this.pageSizes
      })
        .then(data => {
          this.tableData = data?.rows || [];
          this.tableTotal = data?.totalSize || 0;
          this.loading = false;
        })
        .catch(err => {
          this.$message.error(err);
          this.loading = false;
        });
    },
    setNodeCheck(key, value) {
      const node = this.$refs.trees.getNode(key);
      if (node) {
        switch (value) {
          case null:
            this.$refs.trees.setChecked(key, true, true);
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
            this.setNodeCheck(this.checkData[i][j][k], null);
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
                leaf: true,
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
      this.$refs.trees.setCheckedKeys([]);
      if (!row.staffId) {
        this.allSuccess = true;
        return;
      }
      this.ToClose();
      this.storeLoading = true;
      this.accountStore();
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
      this.$refs.trees.setCheckedKeys([]);
      this.accountStore();
    },
    accountStore() {
      getStaffsStore({
        companyId: this.seletcRow.companyId,
        staffId: this.seletcRow.staffId
      })
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
        companyId: this.seletcRow.companyId,
        staffId: this.seletcRow.staffId,
        storehouseTree: this.checkData
      };
      ChangeStaffsStore(data).then(() => {
        this.$message.success({ message: "保存成功!" });
        // 保存之后刷新出库顺序列表
        this.accountStore(this.seletcRow.staffId);
        this.initList();
      });
    },
    nodeCheackChange(data) {
      const nodeId = data.id;
      const isChecked = this.$refs.trees.getNode(nodeId).checked;
      let parentIdNode,
        parentId1Node = {};
      let parentIdCheaked,
        parentIdHalf,
        parentId1Cheaked,
        parentId1Half = false;
      if (data.parentId) {
        parentIdNode = this.$refs.trees.getNode(data.parentId);
        parentIdCheaked = this.$refs.trees.getNode(data.parentId).checked;
        parentIdHalf = this.$refs.trees.getNode(data.parentId).indeterminate;
      }
      if (data.parentId1) {
        parentId1Node = this.$refs.trees.getNode(
          data.parentId + "-" + data.parentId1
        );
        parentId1Cheaked = this.$refs.trees.getNode(
          data.parentId + "-" + data.parentId1
        ).checked;
        parentId1Half = this.$refs.trees.getNode(
          data.parentId + "-" + data.parentId1
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
          if (!data.parentId1) {
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
          this.checkData[data.parentId][data.parentId1] = [];
          if (parentId1Node.childNodes) {
            parentId1Node.childNodes.forEach(item => {
              if (item.checked) {
                this.checkData[data.parentId][data.parentId1].push(
                  item.data.key
                );
              }
            });
          }
        } else {
          delete this.checkData[data.parentId][data.parentId1];
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
/deep/.el-table
  height: calc(100% - 103px) !important;
.halving-left-line
    border-left 1px solid #D9D9D9

.dispatch-store-tree-container
    height 100%
    padding 10px
</style>
