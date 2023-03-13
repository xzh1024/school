<template>
  <div>
    <ht-dialog
      :visible.sync="relVisible"
      :title="title"
      class="dialog-body"
      width="1000px"
      top="5%"
      append-to-body
    >
      <div>
        <div class="ticket-content">
          <ht-card style="margin-bottom: 5px">
            往来单位：
            <span
              class="main-color"
              v-if="isWaiting && list"
              style="padding: 0 20px 0 0"
            >
              {{ list[0] ? list[0].cooperatorName : "" }}
            </span>
            <span
              class="main-color"
              v-if="!isWaiting && detail"
              style="padding: 0 20px 0 0"
            >
              {{ detail.header ? detail.header.cooperatorName : "" }}
            </span>
            联系人：
            <span class="main-color" v-if="isWaiting && list">
              {{ list[0] ? list[0].cooperatorContactName : "" }}
              {{
                list[0]
                  ? list[0].cooperatorContactPhone
                    ? "（" + list[0].cooperatorContactPhone + "）"
                    : ""
                  : ""
              }}
            </span>
            <span class="main-color" v-if="!isWaiting && detail">
              {{ detail.header ? detail.header.cooperatorContactName : "" }}
              {{
                detail.header
                  ? detail.header.cooperatorContactPhone
                    ? "（" + detail.header.cooperatorContactPhone + "）"
                    : ""
                  : ""
              }}
            </span>
            <span
              class="main-color"
              v-if="isWaiting"
              style="float: right;padding-right: 10px;"
            >
              {{ type == 1 ? "·待收票" : "·待开票" }}
            </span>
            <span
              class="main-color"
              v-if="
                !isWaiting &&
                  detail &&
                  detail.header &&
                  detail.header.status != 'invalid'
              "
              style="float: right;padding-right: 10px;"
            >
              ·有效
            </span>
            <span
              class="error-color"
              v-if="
                !isWaiting &&
                  detail &&
                  detail.header &&
                  detail.header.status == 'invalid'
              "
              style="float: right;padding-right: 10px;"
            >
              ·无效
            </span>
          </ht-card>
          <ht-card>
            <div class="form-box">
              <el-form size="mini" inline label-position="left">
                <el-form-item :label="type == 1 ? '收票日期' : '开票日期'">
                  <el-date-picker
                    v-model="form.invoiceDate"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    :disabled="!isWaiting"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="发票类型">
                  <ht-select
                    collapse-tags
                    filterable
                    v-model="form.invoiceType"
                    :options="store().formatInvoiceTypeDictionary()"
                    @change="invoiceTypeChange"
                    :trigger-on-focus="false"
                    :disabled="!isWaiting"
                    class="switch-focus focus-number"
                    placeholder="发票类型"
                    highlight-first-item
                    has-selecte-all-val
                  />
                </el-form-item>
                <el-form-item label="发票号码">
                  <ht-input
                    v-model="form.invoiceNo"
                    placeholder="发票号码"
                    style="width: 160px"
                    :disabled="!isWaiting"
                  />
                </el-form-item>
                <el-form-item label="备注">
                  <ht-input
                    v-model="form.remark"
                    :placeholder="type == 1 ? '收票备注' : '开票备注'"
                    style="width: 250px"
                    :disabled="!isWaiting"
                  />
                </el-form-item>
              </el-form>
            </div>
            <div class="form-box2" v-if="false">
              <el-form
                size="mini"
                inline
                label-width="80px"
                label-position="left"
              >
                <el-form-item label="开票日期">
                  <el-date-picker
                    v-model="form.invoiceDate"
                    type="date"
                    :disabled="!isWaiting"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="发票类型">
                  <ht-select
                    collapse-tags
                    filterable
                    :disabled="!isWaiting"
                    v-model="form.invoiceType"
                    :options="store().formatInvoiceTypeDictionary()"
                    :trigger-on-focus="false"
                    class="switch-focus focus-number"
                    placeholder="发票类型"
                    highlight-first-item
                    has-selecte-all-val
                    style="width: 159px"
                  />
                </el-form-item>
                <el-form-item label="发票号码">
                  <ht-input
                    v-model="form.invoiceNo"
                    :disabled="!isWaiting"
                    placeholder="发票号码"
                  />
                </el-form-item>
                <el-form-item label="车牌号">
                  <ht-input
                    :disabled="!isWaiting"
                    v-model="form.outExtraInfo.plateNumber"
                    placeholder="车牌号"
                  />
                </el-form-item>
                <el-form-item label="车型">
                  <ht-input
                    v-model="form.outExtraInfo.vehModel"
                    :disabled="!isWaiting"
                    placeholder="车型"
                  />
                </el-form-item>
                <el-form-item label="备注">
                  <ht-input
                    v-model="form.remark"
                    :disabled="!isWaiting"
                    placeholder="开票备注"
                  />
                </el-form-item>
              </el-form>
            </div>
          </ht-card>
          <ht-table
            class="ticket-box-tabs"
            :data="tableData"
            show-summary
            :summary-method="getSummaries"
            table-name="ticket-box-tab"
            height="360px"
          >
            <el-table-column
              v-if="isWaiting"
              label="操作"
              width="50"
              align="center"
            >
              <template slot-scope="scope">
                <span class="del-icon" @click="remove(scope.$index)">
                  <i class="el-icon-delete"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="业务日期" width="95">
              <template slot-scope="scope">
                <span v-if="isWaiting">
                  {{ scope.row.billDate }}
                </span>
                <span v-if="!isWaiting">
                  {{ scope.row.sourceBillDate }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="业务单号" width="168">
              <template slot-scope="scope">
                <span class="main-color" v-if="isWaiting">
                  {{ scope.row.billNo }}
                </span>
                <span class="main-color" v-if="!isWaiting">
                  {{ scope.row.sourceBillNo }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="companyName" label="分公司" width="120">
            </el-table-column>
            <el-table-column
              v-if="isWaiting"
              prop="unInvoiceAmount"
              :label="type == 1 ? '未收票金额' : '未开票金额'"
              width="90"
              align="right"
            >
              <template slot-scope="scope">
                <span class="main-color">
                  {{ scope.row.unInvoiceAmount }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="!isWaiting"
              prop="toInvoiceAmount"
              :label="type == 1 ? '应收票金额' : '应开票金额'"
              width="90"
              align="right"
            >
              <template slot-scope="scope">
                <span class="main-color">
                  {{ scope.row.toInvoiceAmount }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              :label="type == 1 ? '收票金额' : '开票金额'"
              prop="amount"
              :width="isWaiting ? 185 : 100"
              :align="isWaiting ? 'left' : 'right'"
            >
              <template slot-scope="scope">
                <ht-format-number
                  v-if="
                    isWaiting &&
                      precisionFormat(scope.row.unInvoiceAmount, 'money') < 0
                  "
                  v-model="scope.row.amount"
                  precision-type="money"
                  size="mini"
                  style="width: 90px"
                  :max="
                    precisionFormat(scope.row.unInvoiceAmount, 'money') < 0
                      ? 0
                      : ''
                  "
                  :class="
                    Math.abs(scope.row.amount) !=
                    Math.abs(scope.row.unInvoiceAmount)
                      ? 'error-input'
                      : ''
                  "
                />
                <ht-format-number
                  v-if="
                    isWaiting &&
                      precisionFormat(scope.row.unInvoiceAmount, 'money') > 0
                  "
                  v-model="scope.row.amount"
                  precision-type="money"
                  size="mini"
                  style="width: 90px"
                  :min="
                    precisionFormat(scope.row.unInvoiceAmount, 'money') > 0
                      ? 0
                      : ''
                  "
                  :class="
                    Math.abs(scope.row.amount) !=
                    Math.abs(scope.row.unInvoiceAmount)
                      ? 'error-input'
                      : ''
                  "
                />
                <el-checkbox
                  v-if="
                    isWaiting &&
                      Math.abs(scope.row.amount) <
                        Math.abs(scope.row.unInvoiceAmount)
                  "
                  class="ticket-checkbox"
                  v-model="scope.row.forceCompleted"
                >
                  强制完成
                </el-checkbox>
                <span v-if="!isWaiting" class="main-color">
                  {{ scope.row.amount }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="税额"
              prop="taxAmount"
              width="80"
              align="right"
            >
              <template slot-scope="scope">
                <span class="main-color">
                  {{ Number(scope.row.taxAmount).toFixed(2) }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="业务备注">
              <template slot-scope="scope">
                {{ scope.row.remark || "-" }}
              </template>
            </el-table-column>
          </ht-table>
        </div>
        <div class="dialog-footer-align" style="margin: 10px 0 5px 0">
          <div class="footer-left">
            {{ type == 1 ? "收" : "开" }}票金额：
            <span class="main-color" style="margin-right: 10px">
              {{ precisionFormat(totalAmout, "money") }}
            </span>
            {{ type == 1 ? "收" : "开" }}票税额：
            <span class="main-color">
              {{ precisionFormat(totalTax, "money") }}
            </span>
          </div>
          <el-button
            type="primary"
            v-if="
              !isWaiting &&
                detail &&
                detail.header &&
                detail.header.status == 'valid' &&
                type == 1 &&
                hasBelongsPermWithoutRoute(
                  'invalid',
                  'financials.invoiceIn',
                  detail.header.belongs
                )
            "
            size="mini"
            @click="invalidHandle"
          >
            作废（F4）
          </el-button>
          <el-button
            type="primary"
            v-if="
              !isWaiting &&
                detail &&
                detail.header &&
                detail.header.status == 'valid' &&
                type == 2 &&
                hasBelongsPermWithoutRoute(
                  'invalid',
                  'financials.invoiceOut',
                  detail.header.belongs
                )
            "
            size="mini"
            @click="invalidHandle"
          >
            作废（F4）
          </el-button>
          <el-button
            type="primary"
            v-if="!isWaiting"
            size="mini"
            @click="exportVisible = true"
          >
            导出（Alt+D）
          </el-button>
          <el-button
            type="primary"
            v-if="isWaiting"
            size="mini"
            @click="submit"
            :disabled="tableData.length == 0"
          >
            {{ type == 1 ? "收票（F3）" : "开票（F3）" }}
          </el-button>
          <el-button
            type="primary"
            size="mini"
            plain
            @click="relVisible = false"
          >
            取消（Esc）
          </el-button>
        </div>
      </div>
    </ht-dialog>
    <export-table
      :base-columns="tableColumns"
      :default-data="tableData"
      table-name="finance-bill-export"
      :visible.sync="exportVisible"
      :end-export-func="outExoportHandle"
      file-name="开票单"
      is-end-export
    />
  </div>
</template>
<script>
import * as store from "@/utils/store";
import { dateFormat } from "@/utils/date";
import {
  invoicesInCreate,
  invoicesInvalid,
  invoicesInDetailExport,
  invoicesOutCreate,
  invoicesOutvalid,
  invoicesOutDetailExport
} from "@/api/finance/invoices";
import { precisionsFixed } from "@/mixins";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { ExportTable } from "@/components/table";

export default {
  name: "ticketBox",
  mixins: [precisionsFixed],
  components: { ExportTable },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 1
    }, // 1：收票 2：开票
    isWaiting: {
      type: Boolean,
      default: false
    }, // true：待收票/开票 false：收票/开票
    list: {
      type: Array,
      default: () => []
    }, // 单据列表
    detail: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    relVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    }
  },
  watch: {
    relVisible: {
      handler(value) {
        if (value) {
          if (this.type == 1) {
            this.title = this.isWaiting ? "收票管理" : "收票单";
          } else {
            this.title = this.isWaiting ? "开票管理" : "开票单";
          }
          if (this.isWaiting) {
            // 待收票/待开票
            console.log("待收/开票列表：", this.list);
            // 当前日期
            this.$set(this.form, "invoiceDate", dateFormat(new Date()));
            this.$set(this.form, "invoiceNo", "");
            this.$set(this.form, "remark", "");
            // 车牌号-车型  本期不支持
            // if (this.type == 2) {
            //   this.$set(this.form.outExtraInfo, "plateNumber", "");
            //   this.$set(this.form.outExtraInfo, "vehModel", "");
            // }
            this.invoiceTypeArr = [];
            this.list.forEach(item => {
              item.forceCompleted = false;
              item.amount = item.unInvoiceAmount; // 价格
              item.taxAmount = 0; // 税额
              if (!this.invoiceTypeArr.includes(item.invoiceType)) {
                //统计列表发票
                this.invoiceTypeArr.push(item.invoiceType);
              }
            });
            if (store.formatInvoiceTypeDictionary()) {
              const types = store.formatInvoiceTypeDictionary();
              if (this.invoiceTypeArr.length == 1) {
                // 同发票列表
                types.forEach(item => {
                  if (item.id == this.invoiceTypeArr[0]) {
                    this.$set(this.form, "invoiceType", item.id);
                    this.list.forEach(item2 => {
                      item2.taxAmount = this.precisionFormat(
                        Number(
                          (item2.amount * item.specialValue) /
                            (1 + item.specialValue)
                        ),
                        "money"
                      );
                    });
                  }
                });
              } else {
                // 默认发票
                types.forEach(item => {
                  if (item.isDefault) {
                    this.$set(this.form, "invoiceType", item.id);
                    this.list.forEach(item2 => {
                      item2.taxAmount = this.precisionFormat(
                        Number(
                          (item2.amount * item.specialValue) /
                            (1 + item.specialValue)
                        ),
                        "money"
                      );
                    });
                  }
                });
              }
            }
            this.tableData = JSON.parse(JSON.stringify(this.list));
          } else {
            // 收票单/开票单
            if (this.detail) {
              console.log("收/开票详情：", this.detail);
              this.tableData = this.detail.rows || [];
              this.form = this.detail.header || {};
            }
          }
        }
      }
    },
    tableData: {
      handler(value) {
        if (this.isWaiting) {
          this.taxRate = 0;
          if (store.formatInvoiceTypeDictionary()) {
            const types = store.formatInvoiceTypeDictionary();
            types.forEach(item => {
              if (item.id == this.form.invoiceType) {
                this.taxRate = item.specialValue;
              }
            });
          }
          value.forEach(item => {
            item.taxAmount = Number(
              item.amount
                ? this.precisionFormat(
                    item.amount - item.amount / (1 + Number(this.taxRate)),
                    "money"
                  )
                : 0
            );
          });
          this.totalAmout = 0;
          this.totalTax = 0;
          this.totalUnInvoiceAmount = 0;
          value.forEach(item => {
            //金额为0 必须强制完成
            if (item.amount == 0) {
              item.forceCompleted = true;
            }
            if (Math.abs(item.amount) >= Math.abs(item.unInvoiceAmount)) {
              item.forceCompleted = false;
            }
            this.totalUnInvoiceAmount += Number(
              item.unInvoiceAmount ? item.unInvoiceAmount : 0
            );
            this.totalAmout += Number(item.amount ? item.amount : 0);
            this.totalTax += Number(item.taxAmount ? item.taxAmount : 0);
          });
        } else {
          if (this.detail) {
            this.totalAmout = this.precisionFormat(
              this.detail.totalAmount,
              "money"
            );
            this.totalTax = this.precisionFormat(
              this.detail.totalTaxAmount,
              "money"
            );
          }
        }
      },
      deep: true
    }
  },
  data() {
    return {
      loading: false,
      exportVisible: false,
      title: "",
      invoiceTypeArr: [],
      form: {
        outExtraInfo: {
          plateNumber: "",
          vehModel: ""
        }
      },
      tableColumns: [
        {
          prop: "sourceBillDate",
          label: "业务日期",
          width: CELL_WIDTH.date
        },
        {
          prop: "sourceBillNo",
          label: this.type == 1 ? "收票单号" : "开票单号",
          width: CELL_WIDTH.date
        },
        {
          prop: "companyName",
          label: "分公司",
          width: CELL_WIDTH.date
        },
        {
          prop: "toInvoiceAmount",
          label: this.type == 1 ? "应收票金额" : "应开票金额",
          width: CELL_WIDTH.date
        },
        {
          prop: "amount",
          label: this.type == 1 ? "收票金额" : "开票金额",
          width: CELL_WIDTH.date
        },
        {
          prop: "taxAmount",
          label: "税额",
          width: CELL_WIDTH.date
        },
        {
          prop: "sourceBillRemark",
          label: "业务备注",
          width: CELL_WIDTH.date
        }
      ],
      tableData: [],
      totalUnInvoiceAmount: 0,
      totalAmout: 0,
      totalTax: 0,
      taxRate: 0
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {},
    store() {
      return store;
    },
    // 发票类型切换
    invoiceTypeChange() {
      this.taxRate = 0;
      if (store.formatInvoiceTypeDictionary()) {
        const types = store.formatInvoiceTypeDictionary();
        types.forEach(item => {
          if (item.id == this.form.invoiceType) {
            this.taxRate = item.specialValue;
          }
        });
      }
      this.tableData.forEach(item => {
        item.taxAmount = (
          item.amount -
          item.amount / (1 + Number(this.taxRate))
        ).toFixed(2);
      });
    },
    // 删除
    remove(ind) {
      this.tableData.splice(ind, 1);
    },
    // 作废
    invalidHandle() {
      if (this.detail && this.detail.header) {
        this.$confirm(
          `确定要作废${this.type == 1 ? "收" : "开"}票单[${
            this.detail.header.billNo
          }]吗？`,
          "作废",
          {
            type: "warning"
          }
        )
          .then(() => {
            // 作废操作
            if (this.type == 1) {
              invoicesInvalid({ id: this.detail.header.id }).then(() => {
                this.relVisible = false;
                this.$emit("update");
              });
            }
            if (this.type == 2) {
              invoicesOutvalid({ id: this.detail.header.id }).then(() => {
                this.relVisible = false;
                this.$emit("update");
              });
            }
          })
          .catch(() => {});
      }
    },
    // 提交
    submit() {
      console.log(this.form);
      if (!this.form.invoiceDate) {
        this.$message.error("请选择收票日期！");
        return;
      }
      if (!this.form.invoiceType) {
        this.$message.error("请选择发票类型！");
        return;
      }
      const reg = /^\w{0,50}$/;
      if (this.form.invoiceNo && !reg.test(this.form.invoiceNo)) {
        this.$message.error("发票号码只能填写50个字符内的字母或者数字！");
        return;
      }
      if (this.form.remark.length > 200) {
        this.$message.error("备注不能超过200个字符！");
        return;
      }
      for (let i = 0; i < this.tableData.length; i++) {
        if (!this.tableData[i].amount && this.tableData[i].amount != 0) {
          this.$message.error("请输入收票金额！");
          return;
        }
      }
      if (this.tableData) {
        const data = {};
        data.header = this.form;
        data.header.taxRate = this.taxRate; // 税率
        data.header.cooperatorId = this.tableData[0].cooperatorId; // 往来单位ID
        data.header.inExtraInfo = {}; // 收票信息
        data.details = []; // 收票列表
        this.tableData.forEach(item => {
          const json = {
            sourceBillId: item.billId,
            sourceBillNo: item.billNo,
            sourceBillType: item.billType,
            amount: item.amount,
            forceCompleted: item.forceCompleted,
            remark: item.remark
          };
          data.details.push(json);
        });
        if (this.type == 1) {
          invoicesInCreate(data).then(() => {
            this.$message.success("收票成功！");
            this.relVisible = false;
            this.$emit("update");
          });
        }
        if (this.type == 2) {
          invoicesOutCreate(data).then(() => {
            this.$message.success("开票成功！");
            this.relVisible = false;
            this.$emit("update");
          });
        }
      }
    },
    // 合计
    getSummaries(param) {
      const { columns } = param;
      // const data = this.totalData || {};
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "toInvoiceAmount":
            sums[index] = this.precisionFormat(
              this.detail.totalToInvoiceAmount,
              "money"
            );
            break;
          case "unInvoiceAmount":
            sums[index] = this.precisionFormat(
              this.totalUnInvoiceAmount,
              "money"
            );
            break;
          case "amount":
            sums[index] = this.precisionFormat(this.totalAmout, "money");
            break;
          case "taxAmount":
            sums[index] = this.precisionFormat(this.totalTax, "money");
            break;
          default:
            break;
        }
      });
      return sums;
    },
    outExoportHandle(sampleColums) {
      const data = { billId: this.detail.header.id };
      if (this.type == 1) {
        return invoicesInDetailExport({
          ...data,
          columnsSettings: sampleColums
        });
      }
      if (this.type == 2) {
        return invoicesOutDetailExport({
          ...data,
          columnsSettings: sampleColums
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";
.dialog-body {
  ::v-deep .el-dialog__body {
    padding: 0 !important;
    background-color: #e7ebed !important;
    .ticket-content {
      padding: 5px;
      .form-box {
        .el-form-item--mini.el-form-item,
        .el-form-item--small.el-form-item {
          margin-bottom: 0;
        }
        .el-form-item__label {
          text-indent: 0;
        }
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 136px !important;
        }
      }
      .form-box2 {
        width: 800px;
        margin-bottom: -5px;
        .el-form-item--mini.el-form-item,
        .el-form-item--small.el-form-item {
          margin-bottom: 5px;
        }
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 159px !important;
        }
      }
    }
    .dialog-footer-align {
      background: #fff;
      padding-top: 5px;
      .footer-left {
        position: absolute;
        left: 0;
        padding-top: 5px;
        padding-left: 15px;
      }
    }
    .ticket-box-tabs {
      margin-top: 5px;
      .caret-wrapper {
        height: 23px;
        .ascending {
          top: -2px;
        }
        .descending {
          bottom: 3px;
        }
      }
      .del-icon {
        display: inline-block;
        width: 18px;
        height: 18px;
        line-height: 17px;
        background: rgba(242, 136, 65, 1);
        border-radius: 9px;
        color: #fff;
        text-align: center;
        cursor: pointer;
      }
      .error-input {
        .el-input__inner {
          border: 1px solid #e6a23c;
        }
      }
      .ticket-checkbox {
        margin-left: 5px;
        .el-checkbox__inner {
          width: 14px;
          height: 14px;
          border-radius: 0;
        }
        .el-checkbox__label {
          font-size: 12px;
          padding-left: 5px;
          color: #909399;
        }
      }
    }
    .main-color {
      color: $color-primary;
      @include font_color("color-primary");
    }
    .error-color {
      color: #d9001b;
    }
  }
}
</style>
