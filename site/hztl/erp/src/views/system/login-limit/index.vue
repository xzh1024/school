<template>
  <div class="container-box flex-container column-flex">
    <div v-if="canWirte" class="header">
      <el-button
        type="primary"
        size="mini"
        @click="updateData"
        :disabled="!hasAutoPerm('write')"
      >
        保存
      </el-button>
      <span
        class="text-danger"
        style="cursor:pointer;float:right"
        @click="openManualDialog"
      >
        <i class="el-icon-question"></i>如何使用登录策略设置
      </span>
    </div>
    <div class="flex-container auto-block">
      <div
        class="auto-block flex-block-padding flex-block-margin flex-block-bg "
      >
        <div class="ht-page-title page-title-divider">登录时间设置</div>
        <el-form
          ref="form"
          :model="formData"
          :rules="rules"
          :disabled="!canWirte"
          label-position="left"
          label-width="158px"
          size="mini"
        >
          <el-form-item label="是否限制员工登录时间：">
            <el-switch v-model="formData.isLimited" @change="rulesChange" />
          </el-form-item>
          <el-form-item label="允许登录时间范围：" prop="startedAt">
            <el-time-select
              v-model="displayStartedAt"
              :disabled="!formData.isLimited"
              :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '24:00'
              }"
              placeholder="起始时间"
              @change="startedAtChange"
            />
          </el-form-item>
          <el-form-item label prop="finishedAt">
            <el-time-select
              v-model="displayFinishedAt"
              :disabled="!formData.isLimited"
              :picker-options="{
                start: '00:00',
                step: '01:00',
                end: '24:00',
                minTime: displayStartedAt
              }"
              placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item label="员工白名单：">
            <ht-select
              v-show="loadingStaffs"
              v-model="formData.whitelist"
              :options="store().allStaffs()"
              :disabled="!formData.isLimited"
              multiple
              filter-zero
              filterable
            />
          </el-form-item>
        </el-form>
      </div>
      <div
        class="auto-block flex-block-padding flex-block-margin flex-block-bg"
      >
        <div class="ht-page-title page-title-divider">新设备登录验证设置</div>
        <el-form
          ref="form2"
          :model="formData"
          :rules="rules"
          :disabled="!canWirte"
          label-position="left"
          label-width="120px"
          size="mini"
        >
          <el-form-item label="验证码接收人：">
            <ht-radio-group v-model="formData.authMode">
              <ht-radio :label="1">管理员手机</ht-radio>
              <ht-radio :label="2">员工手机</ht-radio>
            </ht-radio-group>
          </el-form-item>
        </el-form>
        <div class="ht-page-title page-title-divider">登录设置</div>
        <el-form
          ref="form2"
          :model="formData"
          :rules="rules"
          :disabled="!canWirte"
          label-position="left"
          label-width="200px"
          size="mini"
        >
          <el-form-item label="关闭浏览器后自动退出登录：">
            <ht-radio-group v-model="formData.autoLogout">
              <ht-radio :label="2">自动退出登录</ht-radio>
              <ht-radio :label="1">手动退出登录</ht-radio>
            </ht-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getLoginLimit, updateLoginLimit } from "@/api/loginLimit";
import eventBus from "@/event";
import * as store from "@/utils/store";

const defaultData = {
  isLimited: false,
  startedAt: null,
  finishedAt: null,
  whitelist: [],
  whitelistNames: [],
  authMode: 1,
  autoLogout: 1
};

const defaultRules = {
  startedAt: [
    {
      required: true,
      message: "请输入开始时间",
      trigger: "blur"
    }
  ],
  finishedAt: [
    {
      required: true,
      message: "请输入结束时间",
      trigger: "blur"
    }
  ]
};
export default {
  name: "LoginLimit",
  data() {
    return {
      isUpdate: false,
      formData: { ...defaultData },
      rules: {}
    };
  },
  computed: {
    ...mapState("admin/staffs", ["allStaffs"]),

    loadingStaffs() {
      if (this.formData.whitelist && this.formData.whitelist.length > 0) {
        if (store.allStaffs().length == 0) {
          return false;
        }
      }
      return true;
    },
    canWirte() {
      return this.hasAutoPerm("write");
    },
    displayStartedAt: {
      get() {
        if (!this.formData.startedAt) {
          return null;
        }
        const array = this.formData.startedAt.split(":");
        return `${array[0]}:${array[1]}`;
      },
      set(val) {
        this.formData.startedAt = val ? `${val}:00` : null;
      }
    },
    displayFinishedAt: {
      get() {
        if (!this.formData.finishedAt) {
          return null;
        }
        const array = this.formData.finishedAt.split(":");
        return `${array[0]}:${array[1]}`;
      },
      set(val) {
        this.formData.finishedAt = val ? `${val}:00` : null;
      }
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    store() {
      return store;
    },
    openManualDialog() {
      //传入角色管理对应id，打开dialog
      eventBus.$emit("open-manual-dialog", 8);
    },
    rulesChange() {
      this.rules = this.formData.isLimited ? defaultRules : {};
      this.$refs.form.clearValidate();
    },
    loadData() {
      getLoginLimit().then(res => {
        this.refreshData(res);
      });
    },
    refreshData(data) {
      this.isUpdate = !!data.id;
      this.formData = data
        ? {
            ...data,
            whitelist: data.whitelist || [],
            whitelistNames: data.whitelistNames || [],
            authMode: data.authMode || 1,
            autoLogout: data.autoLogout || 1
          }
        : defaultData;
      this.rulesChange();
    },
    updateData() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            id: this.isUpdate ? this.formData.id : undefined,
            isLimited: this.formData.isLimited,
            whitelist: this.formData.whitelist,
            startedAt: this.formData.startedAt,
            finishedAt: this.formData.finishedAt,
            authMode: this.formData.authMode,
            autoLogout: this.formData.autoLogout
          };
          updateLoginLimit(params).then(res => {
            this.refreshData(res);
            this.$message.success("更新成功！");
          });
        }
      });
    },
    startedAtChange() {
      const startedArray = this.displayStartedAt.split(":");
      const finishedArray = this.displayFinishedAt.split(":");
      if (startedArray[0] && finishedArray[0]) {
        if (Number(startedArray[0]) > Number(finishedArray[0])) {
          this.displayFinishedAt = null;
        } else if (Number(startedArray[0]) === Number(finishedArray[0])) {
          if (Number(startedArray[1]) > Number(finishedArray[1])) {
            this.displayFinishedAt = null;
          }
        }
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.halving-left-line {
    border-left: 1px solid #D9D9D9;
}
</style>
