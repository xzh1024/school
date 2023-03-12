<template>
  <ht-dialog
    title="洗车结算"
    v-bind="$attrs"
    width="720px"
    top="10vh"
    @close="cancelHandle"
  >
    <div>
      <div class="repair-order-content" style="height: 520px">
        <el-row :gutter="10" style="height:100%">
          <el-col :span="12" style="height:100%">
            <ht-card title="洗车单信息" style="height: 100%">
              <table class="order-table" cellspacing="0">
                <tr>
                  <td>客户名称</td>
                  <td>{{ EditObj.customerName }}</td>
                </tr>
                <tr>
                  <td>洗车单号</td>
                  <td>{{ EditObj.billNo }}</td>
                </tr>
                <tr>
                  <td>金额</td>
                  <td>30.00</td>
                </tr>
                <!-- <tr>
                  <td>会员卡余额</td>
                  <td>300.00</td>
                </tr>
                <tr>
                  <td>剩余洗车次数</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>客户欠款</td>
                  <td>0.00</td>
                </tr>
                <tr>
                  <td>客户信用额度</td>
                  <td>10000.00</td>
                </tr> -->
              </table>
            </ht-card>
          </el-col>
          <el-col :span="12" style="height:100%">
            <ht-card title="结算信息" style="height:100%">
              <el-form
                class="dialig-form"
                ref="form"
                :rules="rules"
                :model="dialigForm"
                label-width="100px"
              >
                <el-form-item label="结算时间" prop="confirmDate">
                  <el-date-picker
                    v-model="dialigForm.confirmDate"
                    type="datetime"
                    placeholder="请选择结算时间"
                    size="small"
                  >
                  </el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="洗车工" prop="aaa">
                  <ht-select
                    filterable
                    v-model="dialigForm.aaa"
                    :options="employeesData"
                    :trigger-on-focus="false"
                    class="switch-focus focus-number"
                    placeholder="洗车工"
                    highlight-first-item
                    has-selecte-all-val
                  />
                </el-form-item> -->
                <!-- <el-form-item label="会员卡/已购">
                </el-form-item> -->
                <el-form-item label="支付方式" prop="enhancedSettlementType">
                  <ht-select
                    filterable
                    v-model="dialigForm.enhancedSettlementType"
                    :options="store().enhancedSettlementTypeDictionary()"
                    :trigger-on-focus="false"
                    class="switch-focus focus-number"
                    placeholder="支付方式"
                    size="small"
                    highlight-first-item
                    has-selecte-all-val
                  />
                </el-form-item>
                <el-form-item label="账户">
                  <el-select
                    v-model="dialigForm.a"
                    size="small"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in repairBusinessCategoryList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="结算金额" prop="money">
                  <el-input
                    v-model="dialigForm.money"
                    placeholder="请输入结算金额"
                    size="small"
                  />
                </el-form-item>
                <el-form-item>
                  <el-checkbox
                    slot="label"
                    v-model="dialigForm.prepayedAmountStatus"
                  >
                    预付结算
                  </el-checkbox>
                  <el-input
                    v-model="dialigForm.oilDegree"
                    placeholder="请输入金额"
                    :disabled="!dialigForm.prepayedAmountStatus"
                    size="small"
                  />
                </el-form-item>
                <el-form-item label="预付账户余额" prop="prepayedAmount">
                  <el-input
                    v-model="dialigForm.prepayedAmount"
                    placeholder="请输入金额"
                    :disabled="true"
                    size="small"
                  />
                </el-form-item>
                <el-form-item>
                  <el-checkbox
                    slot="label"
                    v-model="dialigForm.transPrepayedAmountStatus"
                  >
                    转结预付
                  </el-checkbox>
                  <el-input
                    v-model="dialigForm.transPrepayedAmount"
                    placeholder="请输入金额"
                    :disabled="!dialigForm.transPrepayedAmountStatus"
                    size="small"
                  />
                </el-form-item>
                <el-form-item label="收款人">
                  <el-input
                    v-model="dialigForm.paymentBy"
                    placeholder="请输入收款人名称"
                    size="small"
                  />
                </el-form-item>
                <el-form-item label="备注">
                  <el-input
                    v-model="dialigForm.remark"
                    placeholder="请输入备注"
                    size="small"
                  />
                </el-form-item>
              </el-form>
            </ht-card>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer-align">
        <el-button type="primary" size="mini" @click="savetHandle">
          确定（F3）
        </el-button>
        <el-button type="primary" size="mini" plain @click="cancelHandle">
          取消（Esc）
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>
<script>
import * as store from "@/utils/store";

export default {
  name: "addEditAppointmentDialog",
  props: {
    EditObj: {
      type: Object
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          setTimeout(() => {
            console.log(this.EditObj);
            if (this.EditObj.id) {
              this.load();
            }
            this.$refs.form.clearValidate();
          }, 100);
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      userOptions: [], // 接待用户
      employeesData: [], // 洗车工
      userLists: {},
      repairBusinessCategoryList: [], // 预约项目类型列表
      businessTypes: {},
      dialigForm: {}, // 弹窗表单
      rules: {
        confirmDate: [
          {
            required: true,
            message: "请选择结算日期!",
            trigger: "change"
          }
        ],
        enhancedSettlementType: [
          {
            required: true,
            message: "请选择支付方式！"
          }
        ],
        money: [
          {
            required: true,
            message: "请输入金额！"
          }
        ]
      }
    };
  },
  methods: {
    store() {
      return store;
    },
    // 关闭弹窗
    cancelHandle() {
      this.$emit("update:visible", false);
      this.resetForm();
      this.$refs.form.clearValidate();
    },
    // 重置信息
    resetForm() {
      this.dialigForm = {};
    },
    // 编辑信息
    load() {
      this.dialigForm = {};
      // eslint-disable-next-line prettier/prettier
      const { id } = this.EditObj;
      this.$set(this.dialigForm, "id", id);
    },
    // 提交
    savetHandle() {
      console.log(this.dialigForm);
      this.$refs["form"].validate((valid, err) => {
        if (!valid) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          // 12
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
::v-deep {
  .el-dialog__body {
    background: #e4e7ed;
  }
  .repair-order-content {
    .order-table {
      width: 100%;
      border: 1px solid #eee;
      border-width: 0 1px 1px 0;
      border-radius: 3px;
      td {
        border: 1px solid #eee;
        border-width: 1px 0 0 1px;
        height: 38px;
        padding: 0 10px;
        &:first-child {
          background: #f5f7fa;
          color: #606266;
        }
        &:last-child {
          color: $color-primary;
          @include font_color("color-primary");
        }
      }
    }
    .dialig-form {
      .el-form-item {
        margin-bottom: 10px;
        .el-form-item__error {
          padding-top: 0;
        }
      }
    }
  }
  .dialog-footer-align {
    margin-top: 20px;
  }
}
</style>
