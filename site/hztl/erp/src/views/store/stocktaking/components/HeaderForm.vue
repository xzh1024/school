<template>
  <el-form
    ref="header"
    :rules="rules"
    :model="header"
    :show-message="false"
    label-width="80px"
    size="mini"
    class="form-item-small-margin-bottom"
  >
    <el-row :gutter="10">
      <el-col :span="4">
        <el-form-item label="盘点日期" prop="billDate">
          <el-date-picker
            v-model="header.billDate"
            :clearable="false"
            :disabled="!canEdit"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            @change="updateBillHeader"
          />
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label-width="45px" label="备注" prop="remark">
          <ht-input
            v-model="header.remark"
            :disabled="!canEdit"
            placeholder="最大支持100字符"
            @blur="updateBillHeader"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <template v-if="header.billNo">
          <bill-status-bar :bill-no="header.billNo" :bill-status="statusName" />
        </template>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import BillStatusBar from "@/components/billStatusBar"; // 单据状态条

import { stocktakingBillUpdate } from "@/api/store/stocktaking"; // 后端接口

import { STOCKTAKING_BILL_STATUS } from "@/views/store/billstatus"; // 盘点单据状态
import { checkTips } from "../../mixin/mixinTips";

export default {
  name: "HeaderForm",
  components: { BillStatusBar },
  props: {
    headerProp: {
      type: Object,
      required: true
    },
    canEdit: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      header: {},
      rules: {
        billDate: [
          {
            required: true,
            message: "请选择盘点日期",
            validator: checkTips,
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    statusName() {
      return STOCKTAKING_BILL_STATUS[this.header.Status] || "";
    }
  },
  watch: {
    headerProp: {
      handler(newValue) {
        this.header = { ...newValue };
      },
      immediate: true
    }
  },
  methods: {
    updateBillHeader() {
      // 更新单头信息
      if (
        !this.header.billNo ||
        (this.header.billDate === this.headerProp.billDate &&
          this.header.remark === this.headerProp.remark)
      )
        return;

      this.$refs.header.validate(valid => {
        if (valid) {
          stocktakingBillUpdate({
            TakingId: this.header.takingId,
            BillDate: this.header.billDate,
            Remark: this.header.remark
          }).then(() => {
            this.headerProp.billDate = this.header.billDate;
            this.headerProp.remark = this.header.remark;

            this.$message.success({ message: "更新成功!" });
          });
        }
      });
    },
    clearValidate() {
      this.$refs.header && this.$refs.header.clearValidate();
    }
  }
};
</script>
