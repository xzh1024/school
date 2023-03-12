<template>
  <div class="team-container">
    <div
      :class="{ departmentsActive: item.companyId === handleClickId }"
      class="team-box"
      @click="toggle"
    >
      <el-row>
        <el-col :span="1">
          <div v-if="isFolder">
            <span
              :class="[open ? 'arrow-active-up' : 'arrow-active-down']"
              class="upDownarrow"
            >
              <i class="el-icon-arrow-up" />
            </span>
          </div>
        </el-col>
        <el-col :span="16">
          <!-- <div> -->
          <span class="text-content">{{ item.companyName }}</span>
          <span
            v-show="hasBelongsPerm('create', item.belongs)"
            class="opertaion-icons"
          >
            <!-- 新增按钮 -->
            <el-tooltip
              :enterable="false"
              effect="dark"
              content="新增"
              placement="top"
            >
              <el-button
                icon="el-icon-plus"
                circle
                size="mini"
                type="success"
                @click.native="newAdd(item)"
              />
            </el-tooltip>
          </span>
          <!-- </div> -->
        </el-col>
      </el-row>
    </div>
    <el-collapse-transition>
      <ul v-show="open" v-if="isFolder">
        <div
          v-for="child in item.departments"
          :key="child.id"
          class="child-box"
        >
          <!-- <div> -->
          <span v-show="!child.isEdit" class="text-content">{{
            child.name
          }}</span>
          <span v-show="!child.isEdit" class="opertaion-icons">
            <!-- 编辑按钮 -->
            <el-tooltip
              :enterable="false"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <el-button
                v-show="hasBelongsPerm('update', item.belongs)"
                icon="el-icon-edit"
                circle
                size="mini"
                type="primary"
                @click.stop="NodeEdit(child)"
              />
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip
              :enterable="false"
              effect="dark"
              content="删除"
              placement="top"
            >
              <el-button
                v-show="hasBelongsPerm('delete', item.belongs)"
                icon="el-icon-delete"
                circle
                size="mini"
                type="danger"
                @click.stop="NodeDel(child, item.companyId)"
              />
            </el-tooltip>
            <!-- 保存按钮 -->
            <!-- <el-button size="mini">保存</el-button> -->
          </span>
          <span v-show="child.isEdit">
            <ht-input
              :ref="'itemTreeInput' + child.id"
              v-model="child.name"
              size="mini"
              autofocus
              @keyup.enter.native="NodeBlur(child)"
              @blur="editHandleBlur(child)"
            />
          </span>
          <!-- </div> -->
        </div>
      </ul>
    </el-collapse-transition>
    <div v-show="item.isEdit">
      <ht-input
        :ref="'slotTreeInput' + item.companyId"
        v-model="newDeaprtMentsName"
        size="mini"
        autofocus
        @keyup.enter.native="addBlur(newDeaprtMentsName, item)"
        @blur="addHandleBlur(newDeaprtMentsName, item)"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "TeamTree",
  props: {
    item: {
      type: Object,
      default: Object
    }
  },
  data() {
    return {
      open: true,
      handleClickId: null,
      newDeaprtMentsName: "",
      nodeId: 0,
      isCanUpdateName: ""
    };
  },
  computed: {
    isFolder() {
      return this.item.departments && this.item.departments.length;
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
    newAdd(val) {
      if (!val.isEdit) {
        this.$set(val, "isEdit", true);
      }
      this.$nextTick(() => {
        this.$refs["slotTreeInput" + val.companyId].$refs.input.value = "";
        this.$refs["slotTreeInput" + val.companyId].$refs.input.focus();
      });
      this.toggle();
    },
    NodeEdit(val) {
      // 更新部门
      if (!val.isEdit) {
        this.$set(val, "isEdit", true);
      }
      this.$nextTick(() => {
        this.$refs["itemTreeInput" + val.id][0].$refs.input.focus();
        this.isCanUpdateName = val.name;
      });
    },
    NodeBlur(val) {
      if (!val.name) {
        this.$message.warning({ message: "修改部门名称不能为空" });
      } else {
        if (val.isEdit) {
          this.$set(val, "isEdit", false);
        }
        if (this.isCanUpdateName !== val.name) {
          this.$emit("editDps", val);
        }
      }
    },
    editHandleBlur(row) {
      // 修改部门 - 名称未变，失去焦点-恢复原来的值
      if (!row.name) {
        this.$set(row, "name", this.isCanUpdateName);
      }
      if (row.isEdit) {
        this.$set(row, "isEdit", false);
      }
    },
    // handleSaveName(row) {
    //     // 获取焦点
    //     this.isCanUpdateName = row.name;
    // },
    addBlur(val, item) {
      // 新增部分
      if (item.isEdit) {
        this.$set(item, "isEdit", false);
      }
      val = val.replace(/^\s+|\s+$/g, "");
      if (val) {
        const params = {
          companyId: item.companyId,
          name: val,
          nodeId: ++this.nodeId,
          departments: []
        };
        this.$emit("newAddDps", params);
      }
    },
    NodeDel(val, item) {
      this.$emit("deleteDps", val, item);
    },
    addHandleBlur(val, item) {
      // 没有输入值 - 失去焦点输入框隐藏
      if (!val && item.isEdit) {
        this.$set(item, "isEdit", false);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.team-container {
  width: 46%;
}

.text-content {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  width: 200px;
  color: #303133;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.child-box {
  position: relative;
}

.opertaion-icons {
  display: none;
  position: absolute;
  top: 4px;
}

.team-box .el-col-16:hover,
.text-content:hover {
  color: #3aa7ff;
  @include font_color("color-primary");
}
.team-box .el-col-16:hover .opertaion-icons,
.child-box:hover .opertaion-icons {
  display: inline-block;
}

.upDownarrow {
  display: inline-block;
  width: 26px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  color: #aab2b7;
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.arrow-active-up {
  transform: rotate(0deg);
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.arrow-active-down {
  transform: rotate(-180deg);
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>
