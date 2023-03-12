<script lang="tsx">
import { Component, Prop } from "vue-property-decorator";
import { Fragment } from "vue-fragment";
import * as tsc from "vue-tsx-support";
import BillStatusBar from "@/components/billStatusBar";
import { TransferBillItem } from "@/views/transfer/interface";

interface Props {
  headerData: TransferBillItem;
}

@Component({
  components: { BillStatusBar }
})
export default class HeaderText extends tsc.Component<Props, Event> {
  @Prop() readonly headerData!: TransferBillItem;

  render() {
    return (
      <Fragment>
        <el-row gutter={10}>
          <el-col
            span={7}
            class="ellipsis-text"
            title={this.headerData.inCompanyName}
          >
            调入分公司：
            <span class="text-font-primary">
              {this.headerData.inCompanyName}
            </span>
          </el-col>
          <el-col
            span={7}
            class="ellipsis-text"
            title={this.headerData.outCompanyName}
          >
            调出分公司：
            <span class="text-font-primary">
              {this.headerData.outCompanyName}
            </span>
          </el-col>
          <el-col span={10}>
            <div style="display: flex;">
              <BillStatusBar
                billNo={this.headerData.billNo}
                billStatus={this.headerData.statusName}
              />
              <small class="text-font-danger remark-container">
                {this.headerData.reason}
              </small>
            </div>
          </el-col>
        </el-row>

        <el-row gutter={10} style="margin-top: 5px;">
          <el-col
            span={5}
            class="ellipsis-text"
            title={this.headerData.businessManName}
          >
            请调人：
            <span class="text-font-primary">
              {this.headerData.businessManName}
            </span>
          </el-col>
          <el-col
            span={4}
            class="ellipsis-text"
            title={this.headerData.billDate}
          >
            申请日期：
            <span class="text-font-primary">{this.headerData.billDate}</span>
          </el-col>
          <el-col
            span={5}
            class="ellipsis-text"
            title={this.headerData.planDate}
          >
            预期出库日期：
            <span class="text-font-primary">{this.headerData.planDate}</span>
          </el-col>
          <el-col
            span={10}
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
}
</script>
