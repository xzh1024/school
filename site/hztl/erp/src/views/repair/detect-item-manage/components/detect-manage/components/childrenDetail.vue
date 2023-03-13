<template>
  <div class="container-box">
    <el-card class="auto-card box-card" no-background no-padding>
      <div slot="header">
        <span class="header-tit">项目分类：</span>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item class="parentNode" v-if="nodeData.parentName"
            ><span @click="goBack">{{
              nodeData.parentName
            }}</span></el-breadcrumb-item
          >
          <el-breadcrumb-item>{{ nodeData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="children-list" v-loading="loading">
        <p class="tit-box">
          <span class="tit-l">检测项目</span
          ><span class="tit-r"
            >按住拖动块移动排序（从左到右，从上到下顺序排列）</span
          >
        </p>
        <div class="list-box">
          <draggable
            :list="tags"
            draggable=".item"
            class="list-group"
            group="people"
            @change="dragChange"
          >
            <el-tag
              :key="ind"
              v-for="(tag, ind) in tags"
              :class="tag.id !== '' && btnShow ? 'item tag-box' : 'tag-box'"
              :closable="tag.id === 0 ? false : true"
              draggable="true"
              @close="handleClose(tag, ind)"
            >
              <el-form
                :class="[
                  tag.flags.clickInput == 1 ? 'mar-bom1' : ' ',
                  tag.flags.clickInput == 2 ? 'mar-bom2' : ''
                ]"
                label-width="90px"
                label-position="right"
              >
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="项目名称" required>
                      <el-input
                        size="small"
                        v-model="tag.name"
                        :id="'edit' + tag.id"
                        placeholder="请输入项目名称"
                        :disabled="tag.default || !tag.editStatus"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="项目类型" required>
                      <el-select
                        size="small"
                        :disabled="tag.default || !tag.editStatus"
                        v-model="tag.flags.clickInput"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in selectOptions"
                          :key="item.id"
                          :label="item.label"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="检测结果" required>
                      <div
                        class="tag-group"
                        v-if="
                          tag.flags.clickInput == 1 || tag.flags.clickInput == 3
                        "
                      >
                        <el-tag
                          class="res-tag"
                          effect="dark"
                          v-for="(item, index) in tag.options"
                          :key="index"
                          :type="item.type"
                          :closable="
                            index != 0 && !tag.default && tag.editStatus
                          "
                          @close="handleClose2(tag, index)"
                        >
                          {{ item }}
                        </el-tag>
                        <el-input
                          class="input-new-tag"
                          size="small"
                          v-if="tag.inputVisible"
                          v-model="tag.inputValue"
                          :id="'tagInput' + tag.code + tag.id"
                          placeholder="回车添加"
                          @keyup.enter.native="handleInputConfirm(tag)"
                        >
                        </el-input>
                        <el-button
                          v-else
                          class="button-new-tag"
                          :disabled="tag.default || !tag.editStatus"
                          size="small"
                          @click="showInput(tag)"
                          >+ 添加</el-button
                        >
                      </div>
                      <div
                        v-if="
                          tag.flags.clickInput == 2 || tag.flags.clickInput == 3
                        "
                      >
                        <el-input
                          class="input-unit"
                          :disabled="tag.default || !tag.editStatus"
                          v-model="tag.unit"
                          size="small"
                          placeholder="单位"
                        ></el-input>
                        <el-input
                          class="input-min"
                          :disabled="tag.default || !tag.editStatus"
                          v-model="tag.minValue"
                          size="small"
                          placeholder="下限值"
                        ></el-input>
                        <span class="input-span">~</span>
                        <el-input
                          class="input-max"
                          :disabled="tag.default || !tag.editStatus"
                          v-model="tag.maxValue"
                          size="small"
                          placeholder="上限值"
                        ></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="项目说明">
                      <el-input
                        size="small"
                        placeholder="请输入项目说明"
                        :disabled="tag.default || !tag.editStatus"
                        v-model="tag.description"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="需要备注">
                      <el-input
                        size="small"
                        placeholder="请输入备注"
                        :disabled="tag.default || !tag.editStatus"
                        v-model="tag.remark"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-checkbox
                      label="启用备注"
                      :disabled="tag.default || !tag.editStatus"
                      v-model="tag.flags.enableRemark"
                      name="type"
                    ></el-checkbox>
                  </el-col>
                </el-row>
                <el-row class="save-box" style="text-align: center">
                  <el-button
                    size="small"
                    v-if="!tag.default && !tag.editStatus && !editing"
                    type="primary"
                    @click="editProject(tag)"
                    plain
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    v-if="tag.editStatus && tag.id !== ''"
                    type="primary"
                    @click="cancelProject(tag)"
                    plain
                    >取消</el-button
                  >
                  <el-button
                    size="small"
                    v-if="tag.editStatus"
                    type="primary"
                    @click="saveProject(tag)"
                    >保存</el-button
                  >
                </el-row>
              </el-form>
            </el-tag>
            <div
              class="addTag"
              v-if="btnShow && !editing"
              slot="footer"
              @click="addTag"
            >
              +添加检测项目
            </div>
          </draggable>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import {
  addDetect,
  checkItemsList,
  checkItemsAdd,
  checkItemsDel,
  checkItemsUpdate,
  checkItemsSort
} from "@/api/basis/detect/index";
export default {
  name: "children-detail",
  components: { draggable },
  props: {
    nodeData: Object
  },
  watch: {
    nodeData: {
      handler(val) {
        this.nodeName = val.name;
        this.getItemsList();
        this.btnShow = true;
      },
      deep: true
    }
  },
  data() {
    return {
      btnShow: true,
      loading: false,
      selectOptions: [
        {
          id: 1,
          label: "点选"
        },
        {
          id: 2,
          label: "数字填写"
        },
        {
          id: 3,
          label: "点选+数字填写"
        }
      ],
      tags: [],
      editTag: {}, // 当前编辑的项目
      editing: false // 是否正在编辑
    };
  },
  created() {
    this.getItemsList();
  },
  methods: {
    getItemsList() {
      this.loading = true;
      this.editing = false;
      this.editTag = {};
      this.tags = [];
      const params = {
        categoryId: this.nodeData.id,
        categoryCode: this.nodeData.code
      };
      checkItemsList(params)
        .then(res => {
          if (res.Rows) {
            res.Rows.forEach(item => {
              item.inputVisible = false;
              item.inputValue = "";
              item.editStatus = false; // 编辑状态
              item.default = item.id === 0 ? true : false; // 添加内置数据 判断字段
            });
          }
          this.tags = res.Rows || [];
          this.loading = false;
        })
        .catch(() => {});
    },
    addTag() {
      const json = {
        id: "", // ID
        categoryId: this.nodeData.id, // 分类ID
        categoryCode: this.nodeData.code, // 分类Code
        name: "", // 项目名称
        code: "", // 内置编码
        description: "", // 项目描述
        remark: "", // 项目备注
        options: [
          // 点选按钮
          "良"
        ],
        unit: "", // 单位
        maxValue: "", // 最大值
        minValue: "", // 最小值
        sort: 0, // 顺序
        flags: {
          enableRemark: true, // 启用备注
          clickInput: 1 // 1点选，2-数字，3点选 + 数字填写
        },
        operationDescription: "", // 操作说明
        suggestDescription: "", // 建议说明
        affect: "", // 影响
        inputVisible: false, // 是否显示添加点选的输入框
        inputValue: "", // 添加点选的输入框
        editStatus: true, // 编辑状态
        default: false // 是否默认数据
      };
      this.tags.push(json);
      this.btnShow = false;
      this.editing = true;
      this.$nextTick(() => {
        document.getElementById("edit").focus();
      });
    },
    // 排序变化
    dragChange() {
      const ids = [];
      this.tags.forEach(item => {
        ids.push(item.id ? item.id : item.code);
      });
      checkItemsSort({ ids: ids })
        .then(() => {
          this.getItemsList();
        })
        .catch(() => {
          this.getItemsList();
        });
    },
    // 添加
    addDetects(ind, data) {
      addDetect(data).then(res => {
        if (res.id) {
          this.$emit("updata");
        }
      });
    },
    // 删除项目
    handleClose(tag, ind) {
      const msg = this.btnShow
        ? "确定要删除该项目吗？"
        : tag.id === ""
        ? "确定放弃新增此项目？"
        : "您正在新增项目，确定放弃新增并删除此项目？";
      this.$confirm(msg, "提示", {
        type: "warning"
      })
        .then(() => {
          if (tag.id !== "") {
            checkItemsDel({ id: tag.id }).then(() => {
              this.getItemsList();
            });
          } else {
            this.tags.splice(ind, 1);
            this.editing = false;
          }
          this.$nextTick(() => {
            this.btnShow = true;
            this.$message({
              message: "删除成功！",
              type: "success"
            });
          });
        })
        .catch(() => {
          this.$message({
            message: "取消删除！"
          });
        });
    },
    // 删除某个点选结果
    handleClose2(tag, ind) {
      tag.options.splice(ind, 1);
    },
    // 回大类
    goBack() {
      const parentMsg = {
        pId: this.nodeData.pid,
        pCode: this.nodeData.parentCode
      };
      this.$emit("goParent", parentMsg);
    },
    // 显示 添加检测结果点选 输入框
    showInput(tag) {
      tag.inputVisible = true;
      // 获取焦点
      this.$nextTick(() => {
        document.getElementById("tagInput" + tag.code + tag.id).focus();
      });
    },
    // 提交 添加-点选
    handleInputConfirm(tag) {
      const val = tag.inputValue.replace(/^\s+|\s+$/g, "");
      if (!val) {
        this.$message({
          type: "warning",
          message: "添加的检测结果不能为空!",
          showClose: true
        });
        document.getElementById("tagInput" + tag.code + tag.id).focus();
        return;
      }
      if (val.length > 20) {
        this.$message({
          type: "warning",
          message: "添加的检测结果不能超过20个字符!",
          showClose: true
        });
        document.getElementById("tagInput" + tag.code + tag.id).focus();
        return;
      }
      if (val) {
        tag.options.push(val);
        tag.inputVisible = false;
        tag.inputValue = "";
      }
    },
    // 编辑
    editProject(tag) {
      tag.editStatus = true;
      this.editing = true; // 正在编辑
      this.editTag = JSON.parse(JSON.stringify(tag)); // 备份项目数据(浅拷贝)
      this.$nextTick(() => {
        document.getElementById("edit" + tag.id).focus();
      });
    },
    // 取消编辑，回归
    cancelProject(tag) {
      if (tag.id !== "") {
        tag.name = this.editTag.name;
        tag.options = this.editTag.options;
        tag.flags = this.editTag.flags;
        tag.unit = this.editTag.unit;
        tag.minValue = this.editTag.minValue;
        tag.maxValue = this.editTag.maxValue;
        tag.description = this.editTag.description;
        tag.remark = this.editTag.remark;
        this.editing = false; // 不在编辑
        tag.editStatus = false; //状态更改
      }
    },
    // 保存
    saveProject(tag) {
      const name = tag.name.replace(/^\s+|\s+$/g, "");
      if (!name) {
        this.$message({
          type: "warning",
          message: "项目名称不能为空!",
          showClose: true
        });
        return;
      }
      if (name.length > 20) {
        this.$message({
          type: "warning",
          message: "项目名称不得超过20个字符!",
          showClose: true
        });
        return;
      }
      // 点选
      if (tag.flags.clickInput == 1 || tag.flags.clickInput == 3) {
        if (tag.options.length == 0) {
          this.$message({
            type: "warning",
            message: "请至少添加一个点选类型的检测结果!",
            showClose: true
          });
          return;
        }
      }
      // 输入框
      if (tag.flags.clickInput == 2 || tag.flags.clickInput == 3) {
        if (!tag.unit.replace(/^\s+|\s+$/g, "")) {
          this.$message({
            type: "warning",
            message: "请输入单位!",
            showClose: true
          });
          return;
        }
        if (!tag.minValue.replace(/^\s+|\s+$/g, "")) {
          this.$message({
            type: "warning",
            message: "请输入下限值!",
            showClose: true
          });
          return;
        }
        if (!tag.maxValue.replace(/^\s+|\s+$/g, "")) {
          this.$message({
            type: "warning",
            message: "请输入上限值!",
            showClose: true
          });
          return;
        }
        if (tag.minValue.replace(/^\s+|\s+$/g, "").length > 10) {
          this.$message({
            type: "warning",
            message: "下限值最长10个字符!",
            showClose: true
          });
          return;
        }
        if (tag.maxValue.replace(/^\s+|\s+$/g, "").length > 10) {
          this.$message({
            type: "warning",
            message: "上限值最长10个字符!",
            showClose: true
          });
          return;
        }
        if (
          parseFloat(tag.maxValue.replace(/^\s+|\s+$/g, "")) <=
          parseFloat(tag.minValue.replace(/^\s+|\s+$/g, ""))
        ) {
          this.$message({
            type: "warning",
            message: "请注意上限值必须大于下限值!",
            showClose: true
          });
          return;
        }
      }
      if (tag.description.replace(/^\s+|\s+$/g, "").length > 200) {
        this.$message({
          type: "warning",
          message: "项目描述最长200个字符!",
          showClose: true
        });
        return;
      }
      if (tag.remark.replace(/^\s+|\s+$/g, "").length > 200) {
        this.$message({
          type: "warning",
          message: "项目备注最长200个字符!",
          showClose: true
        });
        return;
      }
      if (tag.flags.clickInput == 1) {
        tag.unit = "";
        tag.minValue = "";
        tag.maxValue = "";
      }
      if (tag.flags.clickInput == 2) {
        tag.options = [];
      }
      if (tag.id === "") {
        // 新增
        checkItemsAdd(tag).then(() => {
          this.getItemsList();
          this.$message({
            message: "添加成功！",
            type: "success"
          });
          this.$nextTick(() => {
            this.editTag = {};
            this.editing = false;
            this.btnShow = true;
          });
        });
      } else {
        // 编辑
        checkItemsUpdate(tag).then(() => {
          this.getItemsList();
          this.$message({
            message: "保存成功！",
            type: "success"
          });
          this.$nextTick(() => {
            this.editTag = {};
            this.editing = false;
            this.btnShow = true;
          });
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.container-box {
  ::v-deep {
    .box-card {
      background: #f5f5f5;
      margin: 0 !important;
      .el-card__header {
        padding: 8px;
        background: #fff;
        .header-tit {
          position: relative;
          padding-left: 10px;
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
        .el-breadcrumb {
          position: relative;
          top: 1px;
          display: inline-block;
        }
        .parentNode {
          .el-breadcrumb__inner {
            cursor: pointer;
            color: $color-primary;
            @include font_color("color-primary");
            // &:hover {
            //   color: $color-primary;
            //   @include font_color("color-primary");
            // }
          }
        }
      }
    }
    .children-list {
      height: 100%;
      background: #f5f5f5;
      border-radius: 4px;
      .topForm {
        padding: 10px 17px 0;
        .el-form-item {
          margin-bottom: 0;
        }
      }
      .tit-box {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        margin: 0;
        border-bottom: 1px dotted #ccc;
        .tit-l {
          float: left;
        }
        .tit-r {
          float: right;
        }
      }
      .list-box {
        height: calc(100% - 35px);
        padding: 10px 0;
        overflow: auto;
        .tag-box {
          float: left;
          cursor: pointer;
          position: relative;
          width: 620px;
          height: 312px;
          margin: 0 10px 10px 0;
          padding: 10px;
          background: #fff;
          border: none;
          user-select: none;
          .el-form-item {
            margin-bottom: 5px;
          }
          .el-checkbox {
            margin: 5px 10px;
          }
          .el-form-item__label {
            user-select: none;
            cursor: pointer;
            padding-right: 10px;
          }
          > .el-icon-close {
            position: absolute;
            right: 20px;
            top: 18px;
          }
          .button-new-tag {
            float: left;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
          }
          .input-new-tag {
            float: left;
            width: 90px;
            height: 32px;
            line-height: 32px;
          }
          .tag-group {
            overflow: hidden;
            overflow-y: auto;
            max-height: 80px;
            padding-top: 5px;
            .res-tag {
              float: left;
              margin: 0 5px 5px 0;
            }
          }
          .input-unit {
            width: 60px;
            margin-right: 5px;
          }
          .input-min,
          .input-max {
            width: 80px;
          }
          .input-span {
            display: inline-block;
            width: 20px;
            text-align: center;
            color: #333;
          }
          .mar-bom1 {
            margin-top: 20px;
            .el-row {
              margin-bottom: 6px;
            }
          }
          .mar-bom2 {
            margin-top: 20px;
            .el-row {
              margin-bottom: 6px;
            }
          }
          .save-box {
            position: absolute;
            bottom: 10px;
            left: 0;
            width: 100%;
            margin-bottom: 0;
          }
        }
        .addTag {
          display: inline-block;
          width: 620px;
          height: 312px;
          line-height: 312px;
          margin: 0 10px 10px 0;
          text-align: center;
          background: #fff;
          border-radius: 4px;
          color: #ccc;
          cursor: pointer;
          user-select: none;
        }
      }
    }
  }
}
</style>
