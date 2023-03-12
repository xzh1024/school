<template>
  <div class="container-box">
    <ht-card
      class="auto-card"
      no-background
      no-padding
      @click.stop.native="setKeyScope(keyScopes.definition)"
    >
      <el-row :gutter="5" class="template-definition-box">
        <el-col :span="4" style="height: 100%;">
          <ht-card title="车辆检测模板" no-padding>
            <div class="left-box">
              <ul class="template-info-list" v-loading="loading">
                <li
                  v-for="(item, index) in templateList"
                  ref="refList"
                  :key="index"
                >
                  <div
                    :class="{
                      'is-active': item.code + item.id === templateDetail.codeId
                    }"
                    class="item-box"
                    @click="seletionChange(item)"
                  >
                    <div class="template-name ellipsis-text">
                      {{ item.name }}
                    </div>
                  </div>
                </li>
              </ul>
              <div class="add-template" @click="addTemplate">
                +&nbsp;新建模板
              </div>
            </div>
          </ht-card>
        </el-col>
        <el-col :span="20" v-loading="loading" style="height: 100%;">
          <ht-card no-padding>
            <div class="template-top-tit">
              <el-button type="primary" @click="templateSave" size="small"
                >保存（F3）</el-button
              >
              <el-button
                type="primary"
                v-if="!templateDetail.builtin"
                @click="templateDels"
                size="small"
                >删除（F4）</el-button
              >
              <span style="float:right">
                选择检测大类
                <el-select
                  v-model="detectList"
                  @change="detectChange"
                  multiple
                  collapse-tags
                  placeholder="请选择"
                  size="small"
                  style="width:200px"
                >
                  <el-option
                    v-for="(item, ind) in detectTree"
                    :key="ind"
                    :label="item.name"
                    :disabled="builtinList.includes(item.codeId)"
                    :value="item.codeId"
                  >
                  </el-option>
                </el-select>
              </span>
            </div>
            <p style="padding-left: 20px">
              <span style="color:#F56C6C">*</span>模板名称
              <el-input
                size="small"
                v-model="templateDetail.name"
                :disabled="templateDetail.builtin"
                style="width:200px;margin-left: 10px"
              >
              </el-input>
            </p>
            <div class="template-detail">
              <el-card
                class="box-card"
                v-for="(list, ind) in templateDetail.tpl"
                :key="ind"
              >
                <div slot="header" class="clearfix" v-if="templateDetail.tpl">
                  <span class="header-tit"
                    >{{ list.name }}
                    {{
                      [
                        "CheckAllCar",
                        "DashboardWarningLight",
                        "VehicleHealth",
                        "LightCheck"
                      ].includes(list.categoryCode)
                        ? ""
                        : "（鼠标按住小类拖动排序）"
                    }}
                  </span>
                  <el-link
                    type="primary"
                    style="float: right;"
                    @click="templateDel(ind)"
                    v-if="!list.builtin"
                    :underline="false"
                    >删除</el-link
                  >
                  <el-link
                    type="primary"
                    style="float: right;"
                    @click="templateDown(ind)"
                    v-if="ind < templateDetail.tpl.length - 1"
                    :underline="false"
                    >向下</el-link
                  >
                  <el-link
                    type="primary"
                    style="float: right;"
                    @click="templateUp(ind)"
                    v-if="ind > 0"
                    :underline="false"
                    >向上</el-link
                  >
                </div>
                <!-- 环车点检 -->
                <div
                  class="car-box"
                  v-if="list.categoryCode == 'CheckAllCar'"
                ></div>
                <!-- 仪表警示灯 -->
                <div
                  class="warning-light-box"
                  v-if="list.categoryCode == 'DashboardWarningLight'"
                ></div>
                <!-- 云诊车 -->
                <div
                  class="vehicle-health-box"
                  v-if="list.categoryCode == 'VehicleHealth'"
                ></div>
                <!-- 灯光检查 -->
                <div
                  class="light-check-box"
                  v-if="list.categoryCode == 'LightCheck'"
                >
                  <!-- <span v-for="sub in lightCheckList" :key="sub">
                    {{ sub }}
                  </span> -->
                  <!-- <ul class="sub-ul">
                    <draggable
                      :list="list.subId"
                      draggable=".item"
                      class="list-group"
                      group="people"
                    >
                      <li
                        class="active"
                        v-for="sub in lightCheckList"
                        :key="sub"
                      >
                        <el-button type="primary" plain disabled>
                          {{ sub }}
                        </el-button>
                        <span class="active-box">
                          <i class="el-icon-check"></i>
                        </span>
                      </li>
                    </draggable>
                  </ul> -->
                </div>
                <!-- 其他 -->
                <div
                  v-if="
                    list.categoryCode != 'CheckAllCar' &&
                      list.categoryCode != 'DashboardWarningLight' &&
                      list.categoryCode != 'VehicleHealth' &&
                      list.categoryCode != 'LightCheck'
                  "
                >
                  <ul class="sub-ul">
                    <draggable
                      :list="list.subId"
                      draggable=".item"
                      class="list-group"
                      group="people"
                    >
                      <li
                        :class="sub.active ? 'active item' : ''"
                        @click="subClik(sub)"
                        v-show="sub.name"
                        v-for="sub in list.subId"
                        :key="sub.codeId + ind"
                      >
                        <el-button
                          :type="sub.active ? 'primary' : ''"
                          plain
                          :disabled="sub.builtin ? true : false"
                        >
                          {{ sub.name }}
                        </el-button>
                        <span class="active-box">
                          <i class="el-icon-check"></i>
                        </span>
                        <el-tooltip
                          effect="dark"
                          v-if="sub.tipMsg"
                          placement="top"
                          :open-delay="200"
                        >
                          <div slot="content" v-if="sub.tipMsg">
                            <span>
                              检测项目：
                            </span>
                            <br />
                            {{ sub.tipMsg.length == 0 ? "无" : "" }}
                            <span
                              style="line-height:20px;"
                              v-show="sub.tipMsg.length != 0"
                              v-for="(msg, i) in sub.tipMsg"
                              :key="i"
                            >
                              {{ i + 1 + "、" + msg.name }}
                              <span
                                v-if="
                                  msg.flags.clickInput == 1 ||
                                    msg.flags.clickInput == 3
                                "
                              >
                                <span v-if="msg.options.length > 0">
                                  （
                                  <span
                                    v-for="(txt, a) in msg.options"
                                    :key="a"
                                  >
                                    {{ txt }}
                                    {{
                                      a == msg.options.length - 1 ? "" : "、"
                                    }}
                                  </span>
                                  ）
                                </span>
                              </span>
                              <span
                                v-if="
                                  msg.flags.clickInput == 2 ||
                                    msg.flags.clickInput == 3
                                "
                              >
                                （填写）
                              </span>
                              <br />
                            </span>
                          </div>
                          <span class="tip-box"></span>
                        </el-tooltip>
                      </li>
                    </draggable>
                  </ul>
                </div>
              </el-card>
              <!-- 空项目提示 -->
              <div
                class="null-box"
                v-if="!templateDetail.tpl || templateDetail.tpl.length == 0"
              >
                <span>还没有检测项目哦，请从右上角下拉选择~</span>
              </div>
            </div>
          </ht-card>
        </el-col>
      </el-row>
      <ht-dialog
        title="新增检测模板"
        :visible.sync="addDialogVisible"
        custom-class="add-template-dialog"
        width="30%"
      >
        <el-form class="add-template" label-width="80px" label-position="left">
          <el-form-item label="模板名称" style="width:300px" required>
            <el-input
              size="small"
              id="templateName"
              v-model="addTemplateData.name"
              placeholder="模板名称"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="" style="width:300px" required>
            <el-checkbox v-model="addTemplateData.copyChecke"
              >复制模板</el-checkbox
            >
            <el-select
              placeholder="请选择"
              v-model="addTemplateData.copy"
              :disabled="!addTemplateData.copyChecke"
              size="small"
              style="width:120px"
            >
              <el-option
                v-for="item in templateList"
                :key="item.codeId"
                :label="item.name"
                :value="item.codeId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="submitAddTemplate"
            >确 定（F3）</el-button
          >
          <el-button size="small" @click="addDialogVisible = false"
            >取 消（Esc）</el-button
          >
        </span>
      </ht-dialog>
    </ht-card>
  </div>
</template>

<script>
import hotkeys from "hotkeys-js";
import draggable from "vuedraggable";
import {
  getDetectTree,
  templateList,
  templateAdd,
  templateDelete,
  templateUpdate,
  checkItemsList
} from "@/api/basis/detect/index";
export default {
  name: "template-definition",
  components: { draggable },
  mixins: [],
  data() {
    return {
      keyScopes: {
        definition: Symbol("definition")
      },
      loading: false,
      addDialogVisible: false,
      addTemplateData: {
        name: "",
        copy: "",
        copyChecke: false
      },
      detectList: [], // 已选项目列表
      builtinList: [], // 内置项目列表
      detectTree: [], // 项目树
      detectTrees: [],
      templateList: [], // 模板列表
      templateDetail: {}, // 当前模板详情
      tipMsg: [], // 提示信息
      tipStatus: false,
      thisIndex: 0, // 当前停留模板
      thisCodeId: "" // 当前停留模板
      // lightCheckList: [] // 灯光检查
    };
  },
  activated() {
    this.tipStatus = true;
    this.thisIndex = 0;
    this.thisCodeId = "";
    this.templateDetail = {};
    this.init();
    this.update();
    this.setKeyScope(this.keyScopes.definition);
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScopes.definition);
  },
  methods: {
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    // 切换模板
    seletionChange(item) {
      if (this.templateDetail.codeId != item.codeId) {
        this.detectList = [];
        this.builtinList = [];
        this.thisCodeId = item.codeId;
        this.templateDetail = JSON.parse(JSON.stringify(item));
        this.update();
      }
    },
    init() {
      this.loading = true;
      // 获取模板树
      getDetectTree()
        .then(res1 => {
          if (this.tipStatus) {
            for (let i = 0; i < res1.Tree.length; i++) {
              const item = res1.Tree[i];
              item.codeId = item.code + item.id;
              if (item.children && item.children.length > 0) {
                item.children.forEach(tag => {
                  checkItemsList({
                    categoryId: tag.id,
                    categoryCode: tag.code
                  }).then(res => {
                    tag.tipMsg = res.Rows;
                  });
                });
              }
            }
            this.detectTrees = res1.Tree || [];
            this.detectTrees.forEach((item, ind) => {
              if (item.id > 0 && !item.children) {
                this.detectTrees.splice(ind, 1);
              }
            });
            this.tipStatus = false;
          }
          // 模板定义列表
          templateList()
            .then(res2 => {
              res2.Rows.forEach(item2 => {
                item2.codeId = item2.code + item2.id;
              });
              this.templateList = res2.Rows || [];
              this.templateList.forEach((item, ind) => {
                if (item.code + item.id == this.thisCodeId) {
                  this.thisIndex = ind;
                }
              });
              this.seletionChange(this.templateList[this.thisIndex]);
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    update() {
      if (this.detectTrees) {
        this.detectTree = JSON.parse(JSON.stringify(this.detectTrees));
      }
      let tplInfo = [];
      if (
        this.templateDetail &&
        this.templateDetail.tpl &&
        this.templateDetail.tpl.length > 0
      ) {
        tplInfo = JSON.parse(JSON.stringify(this.templateDetail.tpl));
      }
      this.templateDetail.tpl = [];
      if (tplInfo && tplInfo.length > 0) {
        // 大类比对
        this.builtinList = [];
        tplInfo.forEach(item => {
          item.codeId = item.categoryCode + item.categoryId;
          // 遍历树
          this.detectTree.forEach(item2 => {
            if (item.codeId == item2.codeId) {
              this.detectList.push(item.codeId);
              if (item.builtin) {
                this.builtinList.push(item.codeId);
              }
              item.name = item2.name;
              const arr = [];
              // 小类比对
              item.subId.forEach(list => {
                arr.push(list.categoryCode + list.categoryId);
                list.codeId = list.categoryCode + list.categoryId;
                item2.children.forEach(list2 => {
                  list2.codeId = list2.code + list2.id;
                  if (list.codeId == list2.codeId) {
                    list.name = list2.name;
                    list.tipMsg = list2.tipMsg;
                    list.active = true;
                  }
                });
              });
              if (item2.children) {
                // 补全数据
                if (arr.length > 0) {
                  item2.children.forEach(list3 => {
                    if (!arr.includes(list3.code + list3.id)) {
                      const json = {
                        active: false,
                        builtin: false,
                        categoryCode: list3.code,
                        categoryId: list3.id,
                        codeId: list3.code + list3.id,
                        name: list3.name,
                        tipMsg: list3.tipMsg
                      };
                      item.subId.push(json);
                    }
                  });
                } else {
                  item2.children.forEach(list3 => {
                    const json = {
                      active: false,
                      builtin: false,
                      categoryCode: list3.code,
                      categoryId: list3.id,
                      codeId: list3.code + list3.id,
                      name: list3.name,
                      tipMsg: list3.tipMsg
                    };
                    item.subId.push(json);
                  });
                }
              }
              this.templateDetail.tpl.push(item);
            }
            // 删除小类为空的大类数据
            // if (item.categoryId) {
            // }
          });
        });
      }
    },
    subClik(sub) {
      if (!sub.builtin) {
        sub.active = sub.active ? false : true;
      }
    },
    // 大类切换
    detectChange() {
      if (
        this.templateDetail.tpl == null ||
        this.templateDetail.tpl.length < this.detectList.length
      ) {
        // 新加
        const arr = [];
        if (this.templateDetail.tpl) {
          this.templateDetail.tpl.forEach(item => {
            arr.push(item.codeId);
          });
        } else {
          this.templateDetail.tpl = [];
        }
        this.detectList.forEach(item => {
          if (!arr.includes(item)) {
            this.detectTree.forEach(item2 => {
              if (item2.codeId == item) {
                const json = {
                  categoryId: item2.id,
                  categoryCode: item2.code,
                  codeId: item2.codeId,
                  builtin: false,
                  name: item2.name
                };
                json.subId = [];
                if (item2.children) {
                  item2.children.forEach(list => {
                    const sub = {
                      active: false,
                      builtin: list.builtin,
                      categoryCode: list.code,
                      categoryId: list.id,
                      codeId: list.code + list.id,
                      name: list.name,
                      tipMsg: list.tipMsg || []
                    };
                    json.subId.push(sub);
                  });
                }
                this.templateDetail.tpl.push(json);
              }
            });
          }
        });
      } else {
        // 去除
        this.templateDetail.tpl.forEach((item, ind) => {
          if (!this.detectList.includes(item.codeId)) {
            this.templateDetail.tpl.splice(ind, 1);
          }
        });
      }
    },
    // 向上移动
    templateUp(ind) {
      this.swapArr(this.templateDetail.tpl, ind, ind - 1);
      this.swapArr(this.detectList, ind, ind - 1);
    },
    // 向下移动
    templateDown(ind) {
      this.swapArr(this.templateDetail.tpl, ind, ind + 1);
      this.swapArr(this.detectList, ind, ind + 1);
    },
    swapArr(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    // 删除大类
    templateDel(ind) {
      this.templateDetail.tpl.splice(ind, 1);
      this.detectList.splice(ind, 1);
    },
    // 删除模板
    templateDels() {
      this.$confirm(`确定删除该检测模板吗？`, "提示", {
        type: "warning"
      })
        .then(() => {
          templateDelete({ id: this.templateDetail.id }).then(() => {
            this.templateList.forEach((item, ind) => {
              if (item.codeId == this.thisCodeId) {
                this.thisCodeId =
                  ind >= 1
                    ? this.templateList[ind - 1].codeId
                    : this.templateList[0].codeId;
              }
            });
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.init();
          });
        })
        .catch(() => {
          // 取消
        });
    },
    // 更新模板
    templateSave() {
      const name = this.templateDetail.name;
      if (!name) {
        this.$message({
          message: "模板名称不能为空！",
          type: "error"
        });
        return;
      }
      const data = JSON.parse(JSON.stringify(this.templateDetail));
      if (data.tpl) {
        data.tpl.forEach(item => {
          item.subId = item.subId.filter(item => item.active == true);
        });
      }
      templateUpdate(data).then(() => {
        this.init();
        this.$message({
          message: "保存成功！",
          type: "success"
        });
      });
    },
    // 新建模板
    addTemplate() {
      this.addDialogVisible = true;
      this.addTemplateData.name = "";
      this.addTemplateData.copy = "";
      this.addTemplateData.copyChecke = false;
      this.$nextTick(() => {
        document.getElementById("templateName").focus();
      });
    },
    // 提交模板定义
    submitAddTemplate() {
      if (
        !this.addTemplateData.name ||
        this.addTemplateData.name.replace(/^\s+|\s+$/g, "") == ""
      ) {
        this.$message({
          message: "模板名称不能为空！",
          type: "error"
        });
        document.getElementById("templateName").focus();
        return false;
      }
      const data = {
        name: this.addTemplateData.name.replace(/^\s+|\s+$/g, "")
      };
      if (this.addTemplateData.copyChecke) {
        if (this.addTemplateData.copy == "") {
          this.$message({
            message: "请选择复制的模板！",
            type: "error"
          });
          return false;
        } else {
          this.templateList.forEach(item => {
            if (item.codeId == this.addTemplateData.copy) {
              data.id = item.id;
              data.code = item.code;
            }
          });
        }
      }
      templateAdd(data)
        .then(res => {
          console.log(res);
          this.addDialogVisible = false;
          this.$message({
            message: "添加成功！",
            type: "success"
          });
          // 新增必定无code，所以直接指向id
          this.thisCodeId = res.id;
          this.init();
        })
        .catch(() => {
          this.addDialogVisible = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";
.container-box {
  ::v-deep {
    .template-definition-box {
      height: 100%;
      .box-card {
        height: 100%;
        margin: 0 !important;
        .el-card__body {
          height: calc(100% - 37px);
        }
        .left-box {
          position: relative;
          height: 100%;
          background: #f5f5f5;
          .template-info-list {
            margin: 0;
            padding: 0;
            color: #778087;
            font-size: 14px;
            height: calc(100% - 40px);
            overflow: auto;
            li {
              position: relative;
              margin: 0;
              padding: 0;
              &::before {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 1px;
              }
              .item-box {
                margin: 0;
                width: 100%;
                padding: 12px 10px;
                background: #fff;
                border-bottom: 1px solid #eee;
                cursor: pointer;
                .template-name {
                  text-align: left;
                  max-width: 100%;
                }
              }
              .item-box.is-active {
                position: relative;
                color: #3aa7ff;
                border: 0;
                @include font_color("color-primary");
                background: #c0e3ff;
                @include background_color("color-primary", 0.16);
                &::before {
                  content: "";
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 4px;
                  height: 100%;
                  background: #3aa7ff;
                  @include background_color("color-primary");
                }
              }
            }
          }
          .add-template {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #fff;
            cursor: pointer;
          }
        }
        .template-top-tit {
          background: #f5f5f5;
          padding: 10px;
        }
        .template-detail {
          height: calc(100% - 75px);
          background: #fff;
          overflow-y: auto;
          .box-card {
            border: 0;
            height: auto;
            .el-card__header {
              padding: 8px;
              background: #fff;
              .header-tit {
                position: relative;
                padding: 0 10px;
                &::before {
                  position: absolute;
                  left: 0;
                  top: 3px;
                  display: inline-block;
                  content: "";
                  width: 4px;
                  background: $color-primary;
                  @include background_color("color-primary");
                  height: 14px;
                  margin-right: 5px;
                  border-radius: 100px;
                }
              }
              .el-link {
                margin-right: 10px;
              }
            }
            .el-card__body {
              height: auto !important;
              .car-box {
                height: 450px;
                background: #fff url("~@/assets/images/car.png") no-repeat 10%
                  center;
                background-size: auto 95%;
              }
              .warning-light-box {
                height: 155px;
                background: #fff url("~@/assets/images/ybd.png") no-repeat left
                  center;
                background-size: auto 100%;
              }
              .vehicle-health-box {
                height: 100px;
                background: #fff url("~@/assets/images/yzc.png") no-repeat left
                  center;
                background-size: auto 100%;
              }
              .light-check-box {
                height: 230px;
                background: #fff url("~@/assets/images/light.png") no-repeat
                  left center;
                background-size: auto 100%;
                // .list-box {
                //   padding: 10px 0;
                //   div {
                //     float: left;
                //     width: 120px;
                //     height: 60px;
                //     line-height: 60px;
                //     border: 1px solid #ccc;
                //     border-radius: 5px;
                //     margin: 0 10px 10px 0;
                //     background: #fff;
                //     text-align: center;
                //     user-select: none;
                //   }
                // }
              }
            }
          }
          .el-card.is-always-shadow,
          .el-card.is-hover-shadow:focus,
          .el-card.is-hover-shadow:hover {
            box-shadow: 0 0 0 0 !important;
          }
          .sub-ul {
            overflow: hidden;
            margin: 0;
            padding: 0;
            li {
              position: relative;
              overflow: hidden;
              float: left;
              height: 60px;
              line-height: 60px;
              margin: 0 10px 10px 0;
              border-radius: 4px;
              cursor: pointer;
              button {
                height: 100%;
                padding: 0 30px;
              }
              &.active {
                .active-box {
                  display: inline-block;
                }
              }
              .active-box {
                display: none;
                position: absolute;
                right: 0;
                bottom: 0;
                width: 0;
                height: 0;
                border-bottom: 30px solid $color-primary;
                border-left: 30px solid transparent;
                @include border_bottom_color("color-primary");
                i {
                  position: absolute;
                  right: 3px;
                  bottom: -28px;
                  color: #fff;
                }
              }
              .tip-box {
                display: inline-block;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
              }
            }
          }
          .null-box {
            width: 100%;
            height: 100%;
            text-align: center;
            color: #999;
            display: table;
            user-select: none;
            span {
              display: table-cell;
              vertical-align: middle;
            }
          }
        }
      }
      .el-tag--mini .el-icon-close {
        display: none;
      }
    }
    .add-template-dialog {
      width: 420px !important;
      .add-template {
        text-align: center;
        margin-top: 20px;
        .el-form-item {
          display: inline-block;
          margin-bottom: 10px;
          .el-checkbox {
            float: left;
            margin-right: 10px;
            color: #777;
          }
          .el-select {
            float: right;
          }
        }
      }
      .el-dialog__footer {
        text-align: center;
      }
    }
  }
}
</style>
