<template>
  <el-dialog
    class="return-card-dialog"
    title="退卡"
    v-loading="loading"
    :visible.sync="visible"
    :close-on-click-modal="false"
    append-to-body
    width="700px"
    @closed="closed"
  >
    <el-row :gutter="16">
      <el-col :span="8">
        <div class="item">
          <span class="label">客户名称：</span>
          <span
            class="content"
            :title="
              cardData.customerName
                ? `${cardData.customerName}-${cardData.customerContacts}(${cardData.customerPhone})`
                : `${cardData.customerContacts}(${cardData.customerPhone})`
            "
          >
            {{
              cardData.customerName
                ? `${cardData.customerName}-${cardData.customerContacts}(${cardData.customerPhone})`
                : `${cardData.customerContacts}(${cardData.customerPhone})`
            }}
          </span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <span class="label">开卡人：</span>
          <span class="content" :title="cardData.openerName">
            {{ cardData.openerName }}
          </span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <span class="label">电话：</span>
          <span class="content" :title="cardData.openerPhone">
            {{ cardData.openerPhone }}
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="8">
        <div class="item">
          <span class="label">会员卡号：</span>
          <span class="content" :title="cardData.cardNo">
            {{ cardData.cardNo }}
          </span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <span class="label">会员卡种：</span>
          <span class="content" :title="cardData.cardName">
            {{ cardData.cardName }}
          </span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <span class="label">操作人：</span>
          <span class="content" :title="cardData.createdBy">
            {{ cardData.createdBy }}
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="8" v-if="isGarage">
        <div class="item">
          <span class="label">使用车辆：</span>
          <span
            class="content"
            :title="
              cardData.limitVehicles && cardData.limitVehicles.length
                ? cardData.limitVehicles.join('、')
                : ''
            "
          >
            {{
              cardData.limitVehicles && cardData.limitVehicles.length
                ? cardData.limitVehicles.join("、")
                : "所有车辆"
            }}
          </span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item">
          <span class="label">开卡日期：</span>
          <span class="content" :title="cardData.createdAt">
            {{ cardData.createdAt }}
          </span>
        </div>
      </el-col>
    </el-row>
    <div class="border-dashed"></div>

    <el-row :gutter="16">
      <el-col :span="10">
        <div class="item">
          <span class="label">现金充值余额：</span>
          <span class="content" :title="cardData.cash && cardData.cash.amount">
            {{ cardData.cash && cardData.cash.amount }}
          </span>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="item">
          <span class="label">参考现金价值：</span>
          <span
            class="content"
            :title="cardData.cash && cardData.cash.cashValue"
          >
            {{ cardData.cash && cardData.cash.cashValue }}
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :span="10">
        <div class="item">
          <span class="label">赠送余额：</span>
          <span
            class="content"
            :title="cardData.giftCash && cardData.giftCash.amount"
          >
            {{ cardData.giftCash && cardData.giftCash.amount }}
          </span>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="item">
          <span class="label">参考现金价值：</span>
          <span
            class="content"
            :title="cardData.giftCash && cardData.giftCash.cashValue"
          >
            {{ cardData.giftCash && cardData.giftCash.cashValue }}
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16" v-if="isGarage">
      <el-col :span="10">
        <div class="item">
          <span class="label">项目充值余额：</span>
          <span
            class="content"
            v-if="cardData.projectPackage && cardData.projectPackage.details"
            :title="
              cardData.projectPackage.details
                .map(item => `${item.name}*${item.qty}`)
                .join('、')
            "
          >
            {{
              cardData.projectPackage.details
                .map(item => item.name + "*" + item.qty)
                .join("、")
            }}
          </span>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="item">
          <span class="label">参考现金价值：</span>
          <span
            class="content"
            :title="
              cardData.projectPackage && cardData.projectPackage.cashValue
            "
          >
            {{ cardData.projectPackage && cardData.projectPackage.cashValue }}
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16" v-if="isGarage">
      <el-col :span="10">
        <div class="item">
          <span class="label">赠品余额：</span>
          <span
            class="content"
            v-if="
              cardData.giftProjectPackage && cardData.giftProjectPackage.details
            "
            :title="
              cardData.giftProjectPackage.details
                .map(item => `${item.name}*${item.qty}`)
                .join('、')
            "
          >
            {{
              cardData.giftProjectPackage.details
                .map(item => item.name + "*" + item.qty)
                .join("、")
            }}
          </span>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="item">
          <span class="label">参考现金价值：</span>
          <span
            class="content"
            :title="
              cardData.giftProjectPackage &&
                cardData.giftProjectPackage.cashValue
            "
          >
            {{
              cardData.giftProjectPackage &&
                cardData.giftProjectPackage.cashValue
            }}
          </span>
        </div>
      </el-col>
    </el-row>
    <div class="button-style" @click="showInfo">查看详情 &gt;</div>
    <div class="border-dashed"></div>

    <div class="form-wrap">
      <el-tooltip
        class="form-tooltip"
        effect="dark"
        content="项目的现金价值=充值总面额-sum（当前的项目单价*已使用数量）"
        placement="bottom"
      >
        <i class="el-icon-question"></i>
      </el-tooltip>
      <el-form
        class="form-base"
        ref="ruleForm"
        :model="formData"
        :rules="rules"
        :show-message="false"
        size="small"
        label-width="80px"
      >
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="退卡金额" prop="amount">
              <el-input v-model.trim="formData.amount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退卡日期" prop="date">
              <el-date-picker
                v-model="formData.date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :clearable="false"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="退卡人" prop="returnName">
              <el-input v-model.trim="formData.returnName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退卡备注">
              <el-input
                v-model.trim="formData.remarks"
                maxlength="50"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <span slot="footer">
      <el-button size="small" @click="hide">取消</el-button>
      <el-button size="small" type="primary" @click="handleSubmit">
        确定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getReturnCardInfo, memberCardServiceReturnCard } from "../../services";
import { dateFormat } from "@/utils/format";

export default {
  name: "ReturnCardDialog",
  props: {
    isGarage: Boolean
  },
  data() {
    return {
      cardData: {},
      visible: false,
      loading: false,
      formData: {
        amount: "", // 退卡金额
        date: "", // 退卡日期
        // operatorId: "", // 操作人用户ID
        returnName: "", // 退卡人名称
        remarks: "" // 退卡备注
      },
      rules: {
        amount: [
          {
            required: true,
            message: "请输入退卡金额",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            message: "请选择退卡日期",
            trigger: "change"
          }
        ],
        operatorId: [
          {
            required: true,
            message: "请选择操作人",
            trigger: "change"
          }
        ],
        returnName: [
          {
            required: true,
            message: "请输入退卡人",
            trigger: "change"
          }
        ]
      },
      row: null
    };
  },
  methods: {
    show(row) {
      this.row = row;
      this.formData.date = dateFormat("YYYY-mm-dd");
      this.getReturnCardInfo(row.id);
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    closed() {
      this.row = null;
      this.cardData = {};
      this.formData.amount = ""; // 退卡金额
      this.formData.returnName = ""; // 退卡人
      this.$refs.ruleForm.clearValidate(); // 清除表单验证结果
    },
    showInfo() {
      if (!this.row) return;
      this.$emit("showInfo", this.row);
    },
    getReturnCardInfo(id) {
      this.loading = true;
      getReturnCardInfo(id)
        .then(res => {
          this.cardData = res || {};
          this.formData.amount = this.cardData.cashValue || ""; // 退卡金额
          this.formData.returnName = this.cardData.openerName || ""; // 退卡人
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleSubmit() {
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          let message = "你确认要进行退卡操作吗？";
          const cashValue = this.cardData.cashValue || 0;
          if (Number(this.formData.amount) > Number(cashValue)) {
            message = "退卡金额大于会员卡当前的现金价值，你确定要按此退卡吗？";
          }
          this.$confirm(message, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            showClose: false
          })
            .then(() => {
              this.memberCardServiceReturnCard();
            })
            .catch(() => {});
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    memberCardServiceReturnCard() {
      memberCardServiceReturnCard(this.formData, this.cardData.id).then(() => {
        this.$message.success("退卡操作成功");
        this.$emit("update");
        this.hide();
      }).catch(err => {
        if(err && err.message) {
          this.$message.error(err.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.return-card-dialog {
  /deep/ .el-dialog__body {
    background-color: #ffffff;
    .item {
      display: flex;
      align-items: center;
      line-height: 28px;
      .label {
        color: @text-color-secondary;
      }
      .content {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: @text-color-base;
      }
    }
    .border-dashed {
      height: 0;
      margin: 12px 0;
      border: 1px dashed @border-color-base;
    }
    .button-style {
      display: inline-block;
      line-height: 28px;
      color: @color-link;
      text-decoration: underline;
      cursor: pointer;
    }
    .form-wrap {
      display: flex;
      .form-tooltip {
        font-size: 16px;
        color: @color-warning;
        margin-top: 6px;
        cursor: pointer;
        position: relative;
        z-index: 1;
        width: 16px;
        height: 16px;
      }
      .form-base {
        flex: 1;
        .el-date-editor {
          width: 100%;
        }
      }
    }
  }
}
</style>
