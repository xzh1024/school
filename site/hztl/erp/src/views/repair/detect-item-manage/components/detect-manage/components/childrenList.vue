<template>
  <div class="container-box">
    <el-card class="auto-card box-card" no-background no-padding>
      <div slot="header">
        <span class="header-tit">项目分类：</span>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>{{ nodeData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="children-list">
        <p class="tit-box">
          <span class="tit-l">检测小类</span
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
              class="item"
              :closable="tag.code != '' ? false : true"
              draggable="true"
              @close="handleClose(tag, ind)"
            >
              <el-form label-width="80px" label-position="left">
                <el-form-item label="小类名称" style="width:260px" required>
                  <el-input
                    size="small"
                    v-model="tag.name"
                    :disabled="tag.code != ''"
                    placeholder="回车添加"
                    @keyup.enter.native="editTag(tag)"
                  >
                  </el-input>
                </el-form-item>
              </el-form>
            </el-tag>
            <div v-show="addTagInputVisible" class="demo-input-suffix">
              <span style="display:inline-block;width:80px;"
                ><label style="color: #F56C6C">*&nbsp;</label>小类名称</span
              >
              <el-input
                size="small"
                v-model="addTagInputValue"
                id="addTagInput"
                placeholder="回车添加"
                @keyup.enter.native="debouncedHandleInputEnter"
              >
              </el-input>
            </div>
            <div class="addTag" v-if="btnShow" slot="footer" @click="addTags">
              +添加检测小类
            </div>
          </draggable>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import debounce from "throttle-debounce/debounce";
import draggable from "vuedraggable";
import {
  addDetect,
  delDetect,
  sortDetect,
  updateDetect,
  categoryExist
} from "@/api/basis/detect/index";

export default {
  name: "children-list",
  components: { draggable },
  props: {
    nodeData: Object
  },
  watch: {
    nodeData: {
      handler(val) {
        const nodeMsg = JSON.parse(JSON.stringify(val));
        this.tags = nodeMsg.children;
        this.btnShow = true;
      },
      deep: true
    }
  },
  data() {
    return {
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      btnShow: true,
      tags: [],
      addTagInputVisible: false,
      addTagInputValue: ""
    };
  },
  created() {
    const nodeMsg = JSON.parse(JSON.stringify(this.nodeData));
    this.tags = nodeMsg.children;
    // nodeMsg.children.forEach((item, ind) => {
    //   this.tags.splice(ind, 1, item);
    // });
    this.btnShow = true;
  },
  methods: {
    addTags() {
      this.addTagInputVisible = true;
      this.addTagInputValue = "";
      // 获取焦点
      this.$nextTick(() => {
        this.btnShow = false;
        document.getElementById("addTagInput").focus();
      });
    },
    // 排序变化
    dragChange() {
      const arr = [];
      this.tags.forEach(item => {
        if (item.id) {
          arr.push(item.id.toString());
        } else {
          arr.push(item.code);
        }
      });
      sortDetect({ ids: arr }).then(() => {
        this.$message({
          message: "排序成功！",
          type: "success"
        });
        this.$emit("updata", this.nodeData);
      });
    },
    // 修改小类
    editTag(tag) {
      if (tag.name.replace(/^\s+|\s+$/g, "")) {
        const datas = {
          id: tag.id,
          name: tag.name.replace(/^\s+|\s+$/g, "")
        };
        updateDetect(datas).then(() => {
          this.$message({
            message: "修改成功！",
            type: "success"
          });
          this.$emit("updata", this.nodeData);
        });
      } else {
        this.$message({
          message: "小类名称不能为空！",
          type: "error"
        });
      }
    },
    handleInputEnter() {
      if (this.addTagInputValue) {
        const data = {
          name: this.addTagInputValue,
          pid: this.nodeData.id,
          parentCode: this.nodeData.code
        };
        this.addDetects(data);
        this.addTagInputVisible = false;
        this.btnShow = true;
      } else {
        // document.getElementById("addTagInput").focus();
        this.addTagInputVisible = false;
        this.btnShow = true;
      }
    },
    // 添加
    addDetects(data) {
      addDetect(data).then(res => {
        if (res.id) {
          this.$message({
            message: "添加成功！",
            type: "success"
          });
          this.$emit("updata", this.nodeData);
        }
      });
    },
    // 删除小类
    handleClose(tag, ind) {
      if (tag.id) {
        categoryExist({ categoryId: tag.id }).then(res => {
          if (!res.exist) {
            this.$confirm(`确定删除该检测小类吗？`, "提示", {
              type: "warning"
            }).then(() => {
              this.delDetects({ id: tag.id });
            });
          } else {
            this.$confirm(`该检测小类存在于检测模板中，确定要删除？`, "提示", {
              type: "warning"
            }).then(() => {
              this.delDetects({ id: tag.id });
            });
          }
        });
      } else {
        this.tags.splice(ind, 1);
        this.btnShow = true;
      }
    },
    // 删除
    delDetects(data) {
      delDetect(data).then(() => {
        this.$message({
          message: "删除成功！",
          type: "success"
        });
        this.$emit("updata", this.nodeData);
      });
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
      }
    }
    .children-list {
      height: 100%;
      // padding: 10px;
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
        padding: 10px 0;
        .el-tag {
          cursor: pointer;
          position: relative;
          height: 50px;
          margin: 0 10px 10px 0;
          padding: 5px 35px 0 20px;
          background: #fff;
          border: none;
          .el-form-item__label {
            user-select: none;
            cursor: pointer;
          }
          .el-icon-close {
            position: absolute;
            right: 10px;
            top: 18px;
          }
        }
        .addTag {
          display: inline-block;
          width: 315px;
          height: 50px;
          line-height: 50px;
          margin: 0 10px 10px 0;
          text-align: center;
          background: #fff;
          border-radius: 4px;
          color: #ccc;
          cursor: pointer;
          user-select: none;
        }
        .demo-input-suffix {
          background: #fff;
          border-radius: 4px;
          display: inline-block;
          width: 315px;
          height: 50px;
          line-height: 50px;
          color: #606266;
          padding-left: 20px;
          .el-input {
            width: 180px;
          }
        }
      }
    }
  }
}
</style>
