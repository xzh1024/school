<template>
  <div class="container-box">
    <ht-card class="auto-card" no-background no-padding>
      <el-row :gutter="5" class="detect-manage-box">
        <el-col :span="5" style="height: 100%;">
          <ht-card title="检测项目分类" no-padding style="background:#fff">
            <div class="left-box">
              <el-tree
                class="tree-box"
                ref="tree"
                v-loading="loading"
                :data="treeData"
                :props="defaultProps"
                :default-expanded-keys="defaultExpandedKeys"
                :expand-on-click-node="false"
                check-strictly
                node-key="nodeId"
              >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span
                    v-show="!data.edit"
                    class="tree-name"
                    @click="handleNodeClick(node, data)"
                  >
                    {{ node.label }}
                  </span>
                  <el-input
                    class="mini-input"
                    v-model="newLabel"
                    v-if="data.edit"
                    :id="'edit' + data.nodeId"
                    placeholder="回车保存"
                    @keyup.enter.native="debouncedHandleEditEnter"
                    @blur="editReset(data)"
                  >
                  </el-input>
                  <span v-if="!data.edit" class="tree-btn">
                    <i
                      class="el-icon-edit"
                      v-if="data.code == ''"
                      @click="edit(node, data)"
                    ></i>
                    <i
                      class="el-icon-delete"
                      v-if="data.code == ''"
                      @click="remove(node, data)"
                    ></i>
                  </span>
                </span>
              </el-tree>
              <el-button
                type="text"
                v-if="!addClassVisibility"
                class="addClass"
                @click="addClass"
                >+新增大类</el-button
              >
              <el-input
                v-model="addClassValue"
                ref="addClassInput"
                v-if="addClassVisibility"
                class="addClassValue"
                placeholder="新增大类"
                @keyup.enter.native="debouncedHandleInputEnter"
                @blur="debouncedHandleInputEnter"
              >
              </el-input>
            </div>
          </ht-card>
        </el-col>
        <el-col :span="19" v-loading="loading" style="height: 100%;">
          <childrenList
            v-if="goListStatus(checkData)"
            :nodeData="checkData"
            @updata="updataList"
          />
          <childrenDetail
            v-if="goDetailStatus(checkData)"
            :nodeData="checkData"
            @updata="getTree"
            @goParent="goBackParent"
          />
          <!-- 灯光检查 -->
          <lightCheck
            v-if="checkData.code === 'LightCheck'"
            :nodeData="checkData"
          />
          <!-- 仪表盘警示灯 -->
          <dashboardWarningLight
            v-if="checkData.code === 'DashboardWarningLight'"
            :nodeData="checkData"
          />
          <!-- 车辆健康检查 -->
          <ht-card
            :title="'项目分类：' + checkData.name"
            v-if="checkData.code === 'VehicleHealth'"
          >
            <p class="tit-box">检测项目</p>
            <div class="diagnosis-box">
              <p>
                此项目需要去
                <el-link type="primary" :underline="false"
                  >「基础」》「外部设备管理」</el-link
                >页面绑定诊断仪。
              </p>
              <el-button size="small" type="primary" plain @click="goBind">
                去绑定
              </el-button>
            </div>
          </ht-card>
          <!-- 环车检查 -->
          <ht-card
            :title="'项目分类：' + checkData.name"
            v-if="checkData.code === 'CheckAllCar'"
          >
            <p class="tit-box">检测项目</p>
            <div class="car-box"></div>
          </ht-card>
          <!-- 专业空调检测 -->
          <ht-card
            :title="'项目分类：' + checkData.name"
            v-if="checkData.code === 'CheckAirConditioning'"
          >
            <p class="tit-box">检测项目</p>
            <el-table
              ref="table"
              :data="airConditioningData"
              :span-method="objectSpanMethod"
              v-loading="airConditioningLoading"
              border
              class="air-conditioning-table"
              style="width: 100%;height:calc(100% - 40px);overflow:auto"
            >
              <el-table-column prop="pName" label="小类名称" width="180">
              </el-table-column>
              <el-table-column prop="name" label="项目" width="200">
              </el-table-column>
              <el-table-column prop="description" label="项目说明" width="240">
              </el-table-column>
              <el-table-column label="点检选项/输入值">
                <template slot-scope="scope">
                  <span v-if="scope.row.flags">
                    <span
                      v-if="
                        scope.row.flags.clickInput == 1 ||
                          scope.row.flags.clickInput == 3
                      "
                    >
                      <span
                        style="border:1px solid #ccc;border-radius:3px;margin-right: 5px;padding: 2px 5px;"
                        v-for="(list, ind) in scope.row.options"
                        :key="list + ind"
                      >
                        {{ list }}
                      </span>
                    </span>
                    <span
                      v-if="
                        scope.row.flags.clickInput == 2 ||
                          scope.row.flags.clickInput == 3
                      "
                    >
                      <el-input
                        size="mini"
                        style="width:150px;margin: 5px 0;"
                        :value="
                          scope.row.minValue && scope.row.maxValue
                            ? scope.row.minValue + '~' + scope.row.maxValue
                            : ''
                        "
                        :disabled="true"
                      ></el-input>
                      {{ scope.row.unit }}
                    </span>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </ht-card>
        </el-col>
      </el-row>
    </ht-card>
  </div>
</template>

<script>
import debounce from "throttle-debounce/debounce";
import childrenList from "./components/childrenList";
import childrenDetail from "./components/childrenDetail";
import lightCheck from "./components/lightCheck";
import dashboardWarningLight from "./components/dashboardWarningLight";
import {
  getDetectTree,
  addDetect,
  delDetect,
  updateDetect,
  checkItemsList,
  categoryExist
} from "@/api/basis/detect/index";
import hotkeys from "hotkeys-js";

export default {
  name: "detect-manage",
  components: {
    childrenList,
    childrenDetail,
    lightCheck,
    dashboardWarningLight
  },
  data() {
    return {
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter), // 解决回车导致两个切换问题
      debouncedHandleEditEnter: debounce(100, this.handleEditEnter),
      treeData: [], // 项目分类树
      defaultProps: {
        children: "children",
        label: "name"
      }, // 树默认配置
      codeArr: [
        "CheckAllCar",
        "VehicleHealth",
        "DashboardWarningLight",
        "LightCheck",
        "CheckAirConditioning"
      ], // 特有页面对应code
      addClassValue: "", // 新增大类值
      addClassVisibility: false, // 控制输入框显示隐藏
      checkData: {}, // 选中的节点
      defaultExpandedKeys: [], // 默认展开的节点
      newId: "", // 新id
      goNode: {}, // 执行删除后 去往的节点
      oldLabel: "",
      newLabel: "",
      editData: {},
      loading: true,
      airConditioning: [], // 空调检测
      airConditioningData: [], // 表格数据
      rowArr: [],
      indexArr: [],
      airConditioningLoading: false
    };
  },
  watch: {
    checkData: {
      handler(val) {
        this.$nextTick(() => {
          this.defaultExpandedKeys = [val.code + val.id];
          if (val.code == "CheckAirConditioning") {
            this.getAirConditioningData();
          }
        });
      },
      deep: true
    }
  },
  created() {
    this.getTree();
  },
  activated() {
    hotkeys.setScope("detect-manage");
    this.getTree();
  },
  methods: {
    // 获取树
    getTree() {
      this.loading = true;
      this.checkData = {};
      getDetectTree()
        .then(res => {
          const data = res.Tree || [];
          this.treeData = this.addNodeAttr(data);
          this.$nextTick(() => {
            this.treeData.forEach(item => {
              // 录入空调数据
              if (item.code == "CheckAirConditioning") {
                this.airConditioning = JSON.parse(
                  JSON.stringify(item.children)
                );
                item.children = [];
              }
            });
            if (this.treeData) {
              const go = this.goNode.code + this.goNode.id;
              if (go) {
                this.$refs.tree.setCheckedKeys([go]);
                if (this.$refs.tree.getCheckedNodes()[0]) {
                  this.checkData = JSON.parse(
                    JSON.stringify(this.$refs.tree.getCheckedNodes()[0])
                  );
                }
              } else if (this.newId) {
                this.treeData.forEach(item => {
                  if (item.id == this.newId) {
                    this.$refs.tree.setCheckedKeys([item.nodeId]);
                    this.checkData = item;
                  }
                });
              } else {
                this.$refs.tree.setCheckedKeys([this.treeData[0].nodeId]);
                this.checkData = this.treeData[0];
              }
              this.loading = false;
            }
          }, 500);
        })
        .catch(() => {});
    },
    // 添加大类
    addDetects(data) {
      addDetect(data).then(res => {
        if (res.id) {
          this.newId = res.id;
          this.$message({
            message: "添加成功！",
            type: "success"
          });
          this.getTree();
        }
      });
    },
    // 删除节点
    delDetects(data) {
      delDetect(data).then(() => {
        this.$message({
          message: "删除成功！",
          type: "success"
        });

        this.getTree();
      });
    },
    // 删除节点
    remove(node, data) {
      let str = "确定要删除该大类吗？";
      let type = "大类";
      if (data.pid === 0 && data.parentCode != "") {
        // 小类
        str = "确定要删除该小类吗？";
        type = "小类";
      } else if (data.pid > 0 && data.parentCode == "") {
        // 小类
        str = "确定要删除该小类吗？";
        type = "小类";
      }
      categoryExist({ categoryId: data.id }).then(res => {
        if (res.exist) {
          str = `该检测${type}存在于检测模板中，确定要删除？`;
        }
        this.$confirm(str, "提示", {
          type: "warning"
        })
          .then(() => {
            // 删除当前大类
            if (this.checkData.id == data.id) {
              // 删除当前选择的小类-选中应该回到大类
              if (data.parentCode != "" || data.pid > 0) {
                this.goNode = {
                  code: data.parentCode,
                  id: data.pid
                };
              }
              // 删除当前大类回到第一项
              if (data.parentCode == "" && data.pid == 0) {
                this.goNode = {
                  code: this.treeData[0].code,
                  id: this.treeData[0].id
                };
              }
            }
            this.delDetects({ id: data.id });
          })
          .catch(() => {
            // 取消
            this.$message("取消删除！");
          });
      });
    },
    // 编辑树节点
    edit(node, data) {
      if (data.edit) {
        data.edit = false;
      } else {
        data.edit = true;
        this.editData = data;
        this.oldLabel = data.name;
        this.newLabel = data.name;
        this.goNode = {
          code: data.code,
          id: data.id
        };
        this.$nextTick(() => {
          document.getElementById("edit" + data.nodeId).focus();
        });
      }
    },
    // 编辑提交
    handleEditEnter() {
      this.editData.edit = false;
      if (
        this.newLabel.replace(/^\s+|\s+$/g, "") &&
        this.newLabel.replace(/^\s+|\s+$/g, "") != this.oldLabel
      ) {
        const datas = {
          id: this.editData.id,
          name: this.newLabel.replace(/^\s+|\s+$/g, "")
        };
        updateDetect(datas).then(() => {
          this.$message({
            message: "修改成功！",
            type: "success"
          });
          this.getTree();
        });
      }
    },
    editReset(data) {
      data.edit = false;
      data.name = this.oldLabel;
    },
    // 选中树节点
    handleNodeClick(node, data) {
      this.checkData = data;
      this.goNode = {
        code: data.code,
        id: data.id
      };
      this.$refs.tree.setCheckedKeys([data.nodeId]);
    },
    // 添加大类触发
    addClass() {
      this.addClassVisibility = true;
      this.addClassValue = "";
      // 获取焦点
      this.$nextTick(() => {
        this.$refs.addClassInput.$refs.input.focus();
      });
    },
    // 请求添加大类
    handleInputEnter() {
      const val = this.addClassValue.replace(/^\s+|\s+$/g, "");
      if (val.length == 0) {
        this.addClassVisibility = false;
        this.addClassValue = "";
      }
      if (val.length > 20) {
        this.$message({
          type: "warning",
          message: "大类名称长度最多支持20个字符!",
          showClose: true
        });
        this.$refs.addClassInput.$refs.input.focus();
      }
      if (val.length > 0 && val.length <= 20) {
        const data = {
          name: this.addClassValue,
          pid: 0,
          parentCode: ""
        };
        this.addDetects(data);
        this.addClassVisibility = false;
        this.addClassValue = "";
      }
    },
    // setFormKeyScope() {
    //   hotkeys.setScope(this.keyFormScope);
    // },
    goBackParent(parentMsg) {
      if (parentMsg) {
        this.$refs.tree.setCheckedKeys([parentMsg.pCode + parentMsg.pId]);
        if (this.$refs.tree.getCheckedNodes()[0]) {
          this.checkData = this.$refs.tree.getCheckedNodes()[0];
        }
      }
    },
    // 因为id重复，所以递归添加新字段
    addNodeAttr(data) {
      const item = [];
      data.map(list => {
        const newData = list;
        newData.nodeId = list.code + list.id;
        newData.edit = false;
        newData.children = list.children ? this.addNodeAttr(list.children) : []; //如果还有子集，就再次调用自己
        item.push(newData);
      });
      return item;
    },
    // 组合判断去列表页
    goListStatus(data) {
      if (
        data.pid == 0 &&
        data.parentCode === "" &&
        !this.codeArr.includes(data.code)
      ) {
        return true;
      }
    },
    // 组合判断前往详情页
    goDetailStatus(data) {
      if (data.pid === 0 && data.parentCode != "") {
        return true;
      } else if (data.pid > 0 && data.parentCode == "") {
        return true;
      } else {
        return false;
      }
    },
    getAirConditioningData() {
      this.airConditioningLoading = true;
      this.airConditioningData = [];
      const arr = [];
      for (let i = 0; i < this.airConditioning.length; i++) {
        const item = this.airConditioning[i];
        const params = {
          categoryId: item.id,
          categoryCode: item.code
        };
        arr.push(checkItemsList(params));
      }
      Promise.all(arr)
        .then(result => {
          // console.log(result);
          let num = 0;
          result.forEach((res, ind) => {
            const ln = res.Rows.length;
            const item = this.airConditioning[ind];
            this.rowArr.push({ index: num, length: ln });
            this.indexArr.push(num);
            num += ln == 0 ? 1 : 0;
            num += ln;
            if (ln == 0) {
              this.airConditioningData.push({
                pName: item.name,
                name: "-",
                description: "-",
                operationDescription: "-",
                flags: {
                  clickInput: 2
                },
                minValue: "",
                maxValue: ""
              });
            } else {
              res.Rows.forEach(item2 => {
                item2.pName = item.name;
              });
              this.airConditioningData = this.airConditioningData.concat(
                res.Rows
              );
            }
          });
          this.airConditioningLoading = false;
        })
        .catch(() => {
          this.airConditioningLoading = false;
        });
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (this.indexArr.includes(rowIndex)) {
          for (let i = 0; i < this.rowArr.length; i++) {
            const item = this.rowArr[i];
            if (rowIndex == item.index) {
              return {
                rowspan: item.length == 0 ? 1 : item.length,
                colspan: 1
              };
            }
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    updataList(node) {
      this.$nextTick(() => {
        this.goNode = {
          code: node.code,
          id: node.id
        };
        this.getTree();
      }, 100);
    },
    goBind() {
      this.$router.push({ path: "/Equipment" });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.container-box {
  ::v-deep {
    .detect-manage-box {
      height: 100%;
      .detect-btns {
        padding: 0 0 10px;
        border-bottom: 1px solid #ccc;
      }
      .left-box {
        height: 100%;
        overflow: auto;
        padding-bottom: 50px;
        .is-checked > .el-tree-node__content {
          background-color: #f0f7ff;
          color: $color-primary;
          @include font_color("color-primary");
        }
      }
      .tree-box {
        .el-tree-node__content {
          height: auto;
          padding: 5px 20px;
          .custom-tree-node {
            position: relative;
            width: calc(100% - 20px);
            .tree-name {
              display: inline-block;
              width: calc(100% - 50px);
              padding: 5px 0;
              word-break: break-all;
              white-space: normal;
            }
            .mini-input {
              .el-input__inner {
                display: inline-block;
                width: calc(100% - 50px);
                height: 30px !important;
                line-height: 30px !important;
                margin: 5px 0;
              }
            }
            .tree-btn {
              display: none;
              position: absolute;
              right: 0;
              top: 5px;
              i {
                font-size: 14px;
                color: $color-danger;
                @include font_color("color-danger");
                &:first-child {
                  margin-right: 10px;
                  color: $color-primary;
                  @include font_color("color-primary");
                }
              }
            }
          }
          &:hover {
            .tree-btn {
              display: inline-block;
            }
          }
        }
      }
      .addClass {
        width: 100%;
        padding: 12px 24px;
        text-align: left;
      }
      .addClassValue {
        width: calc(100% - 48px);
        margin-left: 24px;
        box-sizing: border-box;
      }
      .box-card {
        height: 100%;
        .el-card__body {
          height: calc(100% - 40px);
        }
      }
      .tit-box {
        height: 30px;
        line-height: 30px;
        margin: 0 0 10px 0;
        border-bottom: 1px dotted #ccc;
      }
      .car-box {
        height: 100%;
        background: #fff url("~@/assets/images/car.png") no-repeat center center;
        background-size: auto 80%;
      }
      .diagnosis-box {
        min-height: 100px;
        background: url("~@/assets/images/diagnosis.png") no-repeat left top;
        padding-left: 100px;
        p {
          margin: 0;
          padding: 10px 0;
        }
      }
      .el-table,
      .el-table.is-hotkey-active,
      .ht-list.is-hotkey-active,
      .ht-tree.is-hotkey-active,
      .ht-hotkeys-block.is-hotkey-active {
        border-top-color: #ebeaef;
      }
      .el-table--border::after,
      .el-table--group::after,
      .el-table::before {
        display: none;
      }
      .el-table--enable-row-hover .el-table__body tr:hover > td {
        background: #fff;
      }
    }
  }
}
</style>
