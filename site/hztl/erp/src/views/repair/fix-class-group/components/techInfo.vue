<template>
  <div class="tech-info">
    <div v-if="staffInfo.name">
      <el-button
        v-if="staffInfo && staffInfo.enableUpdate"
        type="primary"
        size="small"
        @click="save"
        >保存（F3）</el-button
      >
    </div>
    <div class="info-group" v-if="staffInfo.name">
      <span class="item">
        <span class="item-label">员工编号:</span>
        <span class="item-value">{{ staffInfo.staffCode }}</span>
      </span>
      <span class="item">
        <span class="item-label">姓名:</span>
        <span class="item-value">{{ staffInfo.name }}</span>
      </span>
      <span class="item">
        <span class="item-label">电话:</span>
        <span class="item-value">{{ staffInfo.staffPhone }}</span>
      </span>
      <span class="item">
        <span class="item-label">入职日期:</span>
        <span class="item-value">{{
          dateFormat(staffInfo.staffJoinedAt)
        }}</span>
      </span>
      <span class="item">
        <span class="item-label">所属部门:</span>
        <span class="item-value">{{ staffInfo.departmentName }}</span>
      </span>
    </div>
    <div class="tech-setting" v-if="staffInfo.name">
      <el-form
        ref="form"
        :model="staffInfo"
        :disabled="!(staffInfo && staffInfo.enableUpdate)"
        :rules="rules"
        size="mini"
        label-width="80px"
      >
        <el-form-item label="技师工种" prop="categories">
          <ht-select
            v-model="staffInfo.categories"
            :disabled="!hasBelongsPerm('edit', ['our', 'rests'])"
            multiple
            filterable
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="item in technicianCategoryList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </ht-select>
        </el-form-item>
        <el-form-item label="技师级别" prop="level">
          <el-select
            :disabled="!hasBelongsPerm('edit', ['our', 'rests'])"
            v-model="staffInfo.level"
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="item in technicianLevelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            :disabled="!hasBelongsPerm('edit', ['our', 'rests'])"
            v-model="staffInfo.remark"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="组长">
          <el-switch
            :disabled="!hasBelongsPerm('edit', ['our', 'rests'])"
            v-model="staffInfo.isLeader"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "@/utils/date";
import { updateTechnicians } from "@/api/repairs";
import {
  technicianLevelDictionary,
  technicianCategoryDictionary
} from "@/utils/store";
import { hotkeyMixin } from "@/mixins";
export default {
  props: {
    techInfo: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    techInfo: {
      handler(newVal) {
        if (!newVal) {
          this.staffInfo = {};
          return;
        }
        if (!newVal.level) {
          newVal.level = null;
        }
        this.staffInfo = { ...newVal };
      }
    }
  },
  data() {
    return {
      dateFormat,
      staffInfo: {},
      rules: {
        categories: [
          { required: true, message: "请选择技师工种", trigger: "blur" }
        ],
        level: [
          { required: true, message: "请选择技师工种级别", trigger: "blur" }
        ]
      }
    };
  },
  mixins: [hotkeyMixin],
  computed: {
    technicianLevelList() {
      return technicianLevelDictionary();
    },
    technicianCategoryList() {
      return technicianCategoryDictionary();
    }
  },
  methods: {
    save() {
      this.$refs.form.validate((valid, err) => {
        if (!valid) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          const {
            staffId,
            level,
            categories,
            isLeader,
            remark
          } = this.staffInfo;
          updateTechnicians({
            staffId,
            level: level ? level : 0,
            categories,
            isLeader,
            remark
          }).then(() => {
            this.$emit("techInfoChange");
            this.$message({
              type: "success",
              message: "修改成功"
            });
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.info-group {
  width: 100%;
  padding: 5px;
  border: solid 1px #eee;
  border-radius: 5px;
  margin: 10px 0;
  .item {
    margin-right: 15px;
    .item-label {
      margin-right: 5px;
    }
    .item-value {
      color: #409eff;
    }
  }
}
.tech-setting {
  width: 50%;
}
</style>
