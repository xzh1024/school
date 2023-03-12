<template>
  <!-- 客情提醒-提醒设置 -->
  <div class="container-box" style="height:100%;padding: 5px;">
    <ht-card
      style="background:#fff;margin: 0"
      v-if="hasBelongsPermWithoutRoute('update', 'repairs.remind.setting')"
    >
      <el-button type="primary" size="small" @click="update">
        保存（F3）
      </el-button>
    </ht-card>
    <el-row
      :gutter="5"
      v-loading="loading"
      :style="
        hasBelongsPermWithoutRoute('update', 'repairs.remind.setting')
          ? 'height: calc(100% - 57px);'
          : 'height: 100%;'
      "
    >
      <el-col :span="8">
        <ht-card title="保养提醒" style="background:#fff;">
          <div class="days">
            生成时间：到期前
            <!-- <el-input
              style="width: 150px"
              v-model="expireRemindDay1"
              size="mini"
              :disabled="!hasBelongsPerm('setting')"
            >
              <template slot="append">天</template>
            </el-input> -->
            <el-input-number
              v-model="expireRemindDay1"
              :precision="0"
              :disabled="!hasBelongsPerm('setting')"
              controls-position="right"
              size="small"
              :min="0"
              :max="90"
            ></el-input-number>
            <span style="display:inline-block;padding: 0 10px;">天</span>
          </div>
          <span class="remind-ts">
            工单开单时，若在客户/车辆信息中记录了下次保养日期，
            则在车辆出厂后系统进行相应记录，在您设置的到期天数前生成相应保养提醒
          </span>
        </ht-card>
      </el-col>
      <el-col :span="8">
        <ht-card title="续保提醒" style="background:#fff;">
          <div class="days">
            生成时间：到期前
            <!-- <el-input
              style="width: 150px"
              v-model="expireRemindDay2"
              size="mini"
              :disabled="!hasBelongsPerm('setting')"
            >
              <template slot="append">天</template>
            </el-input> -->
            <el-input-number
              v-model="expireRemindDay2"
              :precision="0"
              :disabled="!hasBelongsPerm('setting')"
              controls-position="right"
              size="small"
              :min="0"
              :max="90"
            ></el-input-number>
            <span style="display:inline-block;padding: 0 10px;">天</span>
          </div>
          <span class="remind-ts">
            新建/修改客户车辆档案时，若在高级属性中添加/修改了保单到期日期，
            则在保存档案时进行相应记录，在您设置的到期天数前生成相应保养提醒
          </span>
        </ht-card>
      </el-col>
      <el-col :span="8">
        <ht-card title="年审提醒" style="background:#fff;">
          <div class="days">
            生成时间：到期前
            <!-- <el-input
              style="width: 150px"
              v-model="expireRemindDay3"
              size="mini"
              :disabled="!hasBelongsPerm('setting')"
            >
              <template slot="append">天</template>
            </el-input> -->
            <el-input-number
              v-model="expireRemindDay3"
              :precision="0"
              :disabled="!hasBelongsPerm('setting')"
              controls-position="right"
              size="small"
              :min="0"
              :max="90"
            ></el-input-number>
            <span style="display:inline-block;padding: 0 10px;">天</span>
          </div>
          <span class="remind-ts">
            新建/修改客户车辆档案时，若在高级属性中添加/修改了年审月份与购车日期，
            则在保存档案时进行相应记录，在您设置的到期天数前生成相应保养提醒
          </span>
        </ht-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getSettings, updateSettings } from "@/api/repairs/remind";
export default {
  name: "visit-setting",
  data() {
    return {
      loading: false,
      expireRemindDay1: 0,
      expireRemindDay2: 0,
      expireRemindDay3: 0,
      oldDay1: 0,
      oldDay2: 0,
      oldDay3: 0,
      message: false
    };
  },
  activated() {
    this.load();
  },
  methods: {
    load() {
      this.message = true;
      this.getSetting("maintainRemind");
      this.getSetting("renewalInsuranceRemind");
      this.getSetting("annualReviewRemind");
    },
    update() {
      if (Number(this.oldDay1) != Number(this.expireRemindDay1)) {
        this.updateSetting("maintainRemind", this.expireRemindDay1);
      }
      if (Number(this.oldDay2) != Number(this.expireRemindDay2)) {
        this.updateSetting("renewalInsuranceRemind", this.expireRemindDay2);
      }
      if (Number(this.oldDay3) != Number(this.expireRemindDay3)) {
        this.updateSetting("annualReviewRemind", this.expireRemindDay3);
      }
      this.message = false;
    },
    getSetting(type) {
      this.loading = true;
      const params = {
        module: "repair",
        type: type
      };
      getSettings(params)
        .then(res => {
          if (type == "maintainRemind") {
            this.expireRemindDay1 = res.value.expireRemindDay;
            this.oldDay1 = res.value.expireRemindDay;
          }
          if (type == "renewalInsuranceRemind") {
            this.expireRemindDay2 = res.value.expireRemindDay;
            this.oldDay2 = res.value.expireRemindDay;
          }
          if (type == "annualReviewRemind") {
            this.expireRemindDay3 = res.value.expireRemindDay;
            this.oldDay3 = res.value.expireRemindDay;
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    updateSetting(type, day) {
      const data = {
        module: "repair",
        type: type,
        value: {
          expireRemindDay: Number(day)
        }
      };
      updateSettings(data).then(() => {
        if (!this.message) {
          this.message = true;
          this.$message.success("保存成功！");
          this.getSetting(type);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
::v-deep {
  .el-row {
    margin: 5px 0 0 0;
    // height: calc(100% - 57px);
    .el-col {
      height: 100%;
      .el-card {
        height: 100%;
      }
    }
  }
  .days {
    margin: 20px 0 10px;
  }
  .remind-ts {
    font-size: 12px;
    color: #909399;
  }
  .box-card .title::before {
    top: 3px;
  }
}
</style>
