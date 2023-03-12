<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { FeesData, getFeesDetail } from "@/api/finance/fees";
import PrecisionsFixedMixin from "@/mixins/PrecisionsFixedMixin";

const BILL_STATUS = [
  "待提交",
  "待审核",
  "审核驳回",
  "待报销(预支)",
  "报销中(预支)",
  "待结算",
  "部分结算",
  "完成"
];

enum FEES_BILL_STATUS {
  unSubmit,
  submited,
  rejected,
  audited,
  advance,
  unSettlement,
  hasSettlement,
  complete
}

interface Props {
  visible: boolean;
  billId: number;
}

@Component
export default class FeesDialog extends Mixins(PrecisionsFixedMixin) {
  @Prop() readonly visible!: boolean;
  @Prop() readonly billId!: number;
  private curData: FeesData | null = null;

  @Watch("visible")
  onVisibleChange(newVal: boolean) {
    if (newVal) {
      this.loading = true;
      getFeesDetail(this.billId)
        .then(res => {
          this.curData = res;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
  private loading = false;
  private get amount() {
    return this.precisionFormat(
      Number(this.curData?.applyAmount) - Number(this.curData?.advanceAmount) ||
        0,
      "money"
    );
  }

  private visibleChange(visible = false) {
    this.$emit("update:visible", visible);
    this.$emit("visibleChange", visible);
  }

  render() {
    return (
      <ht-dialog
        title="费用详情"
        visible={this.visible}
        attrs={this.$attrs}
        append-to-body
        width="400px"
        class="feeds-detail"
        on={{
          "update:visible": (value: boolean) => this.visibleChange(value),
          ...this.$listeners
        }}
      >
        <div class="flex-container column-flex">
          <div class="flex-block-bg margin-block flex-block-padding">
            <el-form
              ref="form"
              label-position="left"
              size="mini"
              label-width="80px"
              class="form-item-small-margin-bottom"
              show-message={false}
              attrs={{
                model: this.curData,
                disabled: true
              }}
              v-loading={this.loading}
            >
              {this.curData?.status === FEES_BILL_STATUS.rejected && (
                <el-form-item label-width="0">
                  <div class="status-tips">
                    {this.curData.billNo}•{BILL_STATUS[this.curData.status!]}
                    <br />
                    驳回原因:
                    {this.curData.rejectReason}
                  </div>
                </el-form-item>
              )}
              <el-form-item label="费用类型" prop="billType">
                <el-radio-group value={this.curData?.billType} size="mini">
                  <el-radio label="YBX" border>
                    预支费用报销申请
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="预支单号" prop="advanceBillNo">
                <ht-input disabled value={this.curData?.advanceBillNo} />
              </el-form-item>
              <el-form-item label="报销单号" prop="billNo">
                <ht-input disabled value={this.curData?.billNo} />
              </el-form-item>
              <el-form-item label="报销时间" prop="applyAt">
                <el-date-picker
                  value={this.curData?.applyAt}
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
              <el-form-item label="申请金额" prop="applyAmount">
                <ht-format-number
                  value={this.curData?.applyAmount}
                  min={0}
                  precision-type="money"
                />
              </el-form-item>
              <el-form-item label="应结金额">
                <ht-format-number value={this.amount} disabled />
              </el-form-item>
              <el-form-item label="申请原因" prop="applyReason">
                <ht-input
                  rows={2}
                  type="textarea"
                  value={this.curData?.applyReason}
                />
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <ht-input
                  rows={2}
                  type="textarea"
                  value={this.curData?.remark}
                />
              </el-form-item>
            </el-form>
          </div>
        </div>
      </ht-dialog>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.status-tips {
  color: $color-warning;
  padding: 5px;
  border-radius: 5px;
  line-height: 16px;
  font-size: 12px;
}
.feeds-detail {
  ::v-deep {
    .el-dialog__body {
      padding: 0;
      background: #e7ebed;
    }
    .el-radio-group {
      .el-radio {
        margin-right: 0;
      }
      .el-radio__input {
        display: none;
      }
    }
  }
}
</style>
