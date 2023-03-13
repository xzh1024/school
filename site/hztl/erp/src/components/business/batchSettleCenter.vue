<template>
  <div v-switch-focus="focusData" class="batch-settle">
    <ht-setting-table
      v-if="visible"
      :key-scope="tableKeyScope"
      :tableName="tableName"
      :data="batchSettle"
      :columns="columns"
      :summary-method="getSummaries"
      show-summary
      style="height: 500px"
      @hotkeysUp="handleKeyCode"
    />
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      :show-message="false"
      class="mt-1"
      label-width="71px"
      label-position="left"
      size="mini"
    >
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item prop="confirmDate" label="结算日期">
            <el-date-picker
              v-model="formData.confirmDate"
              :clearable="false"
              :editable="false"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收/付款人" prop="paymentBy">
            <ht-autocomplete
              v-model="formData.paymentBy"
              :show-suffix="false"
              :fetch-suggestions="autocompleteSearchStaffs"
              :trigger-on-focus="false"
              highlight-first-item
              @intput-enter="debouncedHandleInputEnter"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer-align">
      <el-button
        class="switch-focus focus-button"
        type="primary"
        size="mini"
        plain
        @click="submit()"
      >
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="cancel()">
        取消（Esc）
      </el-button>
    </div>
  </div>
</template>

<script>
import * as _ from "lodash";
import hotkeys from "hotkeys-js";
import { dateFormat } from "@/utils/date";
import { CELL_WIDTH } from "@/constants";
import { billSettle } from "@/api/finance/billSettle";
import { baseDataMixin, precisionsFixed, searchMixin } from "@/mixins";
import debounce from "throttle-debounce/debounce";

const defaultFormData = {
  paymentBy: null,
  confirmDate: new Date()
};

export default {
  name: "BatchSettle",
  mixins: [baseDataMixin, precisionsFixed, searchMixin],
  props: {
    visible: Boolean,
    keyScope: {
      type: Symbol,
      default: Symbol("BatchSettle")
    },
    batchSettle: Array
  },
  data() {
    const rules = {
      confirmDate: [
        {
          required: true,
          message: "请选择结算日期!",
          trigger: "change"
        }
      ]
    };
    return {
      tableKeyScope: Symbol("BatchSettleDialogtable"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      focusData: {
        updateIndex: 0,
        initial: "focus-button",
        type: null
      },
      tableName: "globalBatchSettleTable",
      columns: [
        {
          label: "序号",
          prop: "index",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          label: "往来单位",
          prop: "cooperatorName",
          width: CELL_WIDTH.companyName
        },
        {
          label: "单据号",
          prop: "billNo",
          width: CELL_WIDTH.no
        },
        {
          prop: "enhancedSettlementType",
          label: "支付方式",
          width: CELL_WIDTH.type
        },
        {
          label: "账户名称",
          prop: "fundAccountName",
          width: CELL_WIDTH.fundAccountName
        },
        {
          prop: "amount",
          label: "结算金额",
          width: CELL_WIDTH.money,
          classNames: "number-font"
        }
      ],
      formData: {
        ...defaultFormData
      },
      rules: rules
    };
  },
  mounted() {
    hotkeys("f3,up,down", { scope: this.keyScope }, (e, handler) => {
      switch (handler.key) {
        case "f3":
          this.submit();
          break;
        case "up":
        case "down":
          e.preventDefault();
          this.updateFocusData({ type: handler.key });
          break;
        default:
          return;
      }
    });
    this.$store.dispatch("admin/baseData/loadAll");
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
    hotkeys.deleteScope(this.tableKeyScope);
  },
  methods: {
    setDefaultDate() {
      this.formData.confirmDate = dateFormat(new Date());
    },
    handleKeyCode(e) {
      switch (e.code) {
        case "F3":
          this.submit();
          break;
        default:
          return;
      }
    },
    handleInputEnter() {
      this.updateFocusData({ type: "down" });
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = ["合计"];
      const index = columns.findIndex(item => item.property === "amount");
      sums[index] = this.precisionFormat(
        _.reduce(data, (sum, item) => sum + Number(item.amount), 0),
        "money"
      );
      return sums;
    },
    cancel() {
      this.$emit("dialog-close", false);
    },
    submit() {
      if (this.isDataValidate()) {
        const data = this.batchSettle.map(item => {
          const row = {
            ..._.pick(item, [
              "enhancedSettlementType",
              "billNo",
              "billType",
              "billId",
              "invoiceType",
              "isUnsettle"
            ]),
            confirmDate: dateFormat(this.formData.confirmDate, "YYYY-MM-DD"),
            paymentBy: this.formData.paymentBy,
            remark: item.remark
          };

          if (row.enhancedSettlementType.substring(0, 2) === "现付") {
            row.details = [
              {
                paymentMethod: item.paymentMethod,
                fundAccountId: item.fundAccountId,
                amount: item.amount,
                checkNumber: item.checkNumber
              }
            ];
          }
          return row;
        });

        billSettle({
          billSettles: data
        }).then(() => {
          this.$message.success("结算成功！");
          this.$emit("dialog-close", true);
        });
      }
    },
    isDataValidate() {
      if (!this.$refs.form) return;
      let flag = true;
      this.$refs.form.validate((valid, err) => {
        if (!valid) {
          flag = false;
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
      return flag;
    }
  }
};
</script>
<style lang="scss" scoped>
.box .box-content {
  float: left;
  width: 50%;

  &:nth-child(2n) {
    text-align: right;
  }
}

.dialog-footer {
  text-align: center;
}
</style>
