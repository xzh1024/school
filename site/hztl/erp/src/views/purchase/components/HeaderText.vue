<script>
import { Fragment } from "vue-fragment";
import BillStatusBar from "@/components/billStatusBar";
import { baseDataMixin } from "@/mixins";

export default {
  name: "HeaderText",
  components: { BillStatusBar },
  mixins: [baseDataMixin],
  props: {
    headerData: {
      type: Object,
      required: true
    }
  },
  render() {
    return (
      <Fragment>
        <el-row gutter={10}>
          <el-col
            span={6}
            class="ellipsis-text"
            title={this.headerData.cooperatorName}
          >
            供应商：
            <span class="text-font-primary">
              {this.headerData.cooperatorName}
            </span>
          </el-col>
          <el-col
            span={4}
            class="ellipsis-text"
            title={this.headerData.enhancedSettlementType}
          >
            支付方式：
            <span class="text-font-primary">
              {this.headerData.enhancedSettlementType}
            </span>
          </el-col>
          <el-col
            span={4}
            class="ellipsis-text"
            title={this.getFormatInvoiceType(
              this.headerData.invoiceType,
              this.headerData.taxRate
            )}
          >
            发票类型：
            <span class="text-font-primary">
              {this.getFormatInvoiceType(
                this.headerData.invoiceType,
                this.headerData.taxRate
              )}
            </span>
          </el-col>
          <el-col span={10}>
            <div style="display: flex;">
              <BillStatusBar
                billNo={this.headerData.billNo}
                billStatus={this.headerData.statusTxt}
              />
              <small class="text-font-danger remark-container">
                {this.headerData.tips}
              </small>
            </div>
          </el-col>
        </el-row>

        <el-row gutter={10} style="margin-top: 5px;">
          <el-col
            span={4}
            class="ellipsis-text"
            title={this.headerData.billDate}
          >
            业务日期：
            <span class="text-font-primary">{this.headerData.billDate}</span>
          </el-col>
          <el-col
            span={6}
            class="ellipsis-text"
            title={this.headerData.businessManName}
          >
            业务员：
            <span class="text-font-primary">
              {this.headerData.businessManName}
            </span>
          </el-col>
          <el-col
            span={14}
            class="ellipsis-text"
            title={this.headerData.remark}
          >
            备注：
            <span class="text-font-primary">{this.headerData.remark}</span>
          </el-col>
        </el-row>
      </Fragment>
    );
  }
};
</script>
