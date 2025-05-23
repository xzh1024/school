<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { Form } from "hztl-ui";
import {
  BaseFeesData,
  changeFeesStatus,
  createData,
  deleteFees,
  updateFees
} from "@/api/finance/fees";
import PrecisionsFixedMixin from "@/mixins/PrecisionsFixedMixin";
import BillStatusBar from "@/components/billStatusBar";
import { getFeesDetail } from "@/api/finance/fees";
import { BILL_STATUS, FEES_BILL_STATUS } from "./constants";
import BtnDisableMixin from "./BtnDisableMixin";

export interface AdvanceFeesFormData extends BaseFeesData {
  id?: number;
  rejectReason?: string;
  status?: number;
  belongs?: string[];
  billNo?: string;
  advanceBillNo: string;
  advanceAmount: string;
}

interface Props {
  visible: boolean;
  data?: AdvanceFeesFormData;
}
interface Event {
  onVisibleChange: (value: boolean) => void;
}

const defaultFormData: AdvanceFeesFormData = {
  billType: "YBX",
  applyAt: "",
  applyAmount: "",
  applyReason: "",
  advanceAmount: "",
  advanceBillNo: "",
  remark: ""
};

const rules = {
  billType: [
    {
      required: true,
      message: "请选择费用类型！",
      trigger: "change"
    }
  ],
  applyAt: [
    {
      required: true,
      message: "请选择申请时间！",
      trigger: "change"
    }
  ],
  applyAmount: [
    {
      required: true,
      message: "请填写申请金额！",
      trigger: "change"
    }
  ],
  applyReason: [
    {
      required: true,
      message: "请填写申请原因！",
      trigger: "change"
    }
  ]
};

@Component({
  components: {
    BillStatusBar
  }
})
export default class FeesDialog extends Mixins(
  BtnDisableMixin,
  PrecisionsFixedMixin
) {
  @Prop() readonly visible!: boolean;
  @Prop() readonly billId!: number;
  private cacheData: AdvanceFeesFormData | null = null;
  public get curData() {
    return this.cacheData || this.formData;
  }

  $refs!: {
    form: Form;
  };

  @Watch("visible")
  onVisibleChange(newVal: boolean) {
    if (newVal) {
      this.loading = true;
      getFeesDetail(this.billId)
        .then(res => {
          this.cacheData = res;
          this.formData = {
            ...this.cacheData
          };
        })
        .finally(() => {
          this.loading = false;
        });

      this.$refs.form?.clearValidate();
    }
  }
  private loading = false;
  private formData = {
    ...defaultFormData
  };
  private get amount() {
    return this.precisionFormat(
      Number(this.formData.applyAmount) - Number(this.formData.advanceAmount) ||
        0,
      "money"
    );
  }

  private saveData() {
    if (this.curData?.id) {
      this.updateFeesData().then(() => {
        this.visibleChange();
      });
    } else {
      this.visibleChange();
    }
  }

  private updateFeesData() {
    if (!this.curData) {
      return Promise.reject();
    }
    this.loading = true;
    return updateFees({
      id: this.curData.id!,
      ...this.formData
    }).finally(() => {
      this.loading = false;
    });
  }

  private visibleChange(visible = false) {
    this.$emit("visibleChange", visible);
  }

  private createData() {
    if (this.loading) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$refs.form.validate((valid, err: any) => {
      if (valid) {
        this.loading = true;
        createData(this.formData)
          .then(() => {
            this.loading = false;
            this.visibleChange();
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips, showClose: true });
      }
    });
  }

  private deleteFees() {
    if (this.curData) {
      this.$confirm("确认删除当前费用？", "提示")
        .then(() => {
          this.loading = false;
          return deleteFees(this.curData!.id!);
        })
        .then(() => {
          this.visibleChange();
        })
        .finally(() => {
          this.loading = true;
        });
    }
  }

  private submit() {
    if (!this.curData) {
      return;
    }
    this.updateFeesData()
      .then(() => {
        this.loading = true;
        return changeFeesStatus({
          id: this.curData!.id!,
          status: FEES_BILL_STATUS.submited
        });
      })
      .then(() => {
        this.cacheData = {
          ...this.curData!,
          status: FEES_BILL_STATUS.submited
        };
        this.$message.success({
          message: "提交成功!",
          showClose: true
        });
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private recall() {
    if (!this.curData) {
      return;
    }
    this.loading = true;
    changeFeesStatus({
      id: this.curData.id!,
      status: FEES_BILL_STATUS.unSubmit
    })
      .then(() => {
        this.cacheData = {
          ...this.curData!,
          status: FEES_BILL_STATUS.unSubmit
        };
        this.$message.success({
          message: "撤回成功!",
          showClose: true
        });
      })
      .finally(() => {
        this.loading = false;
      });
  }

  render() {
    return (
      <ht-dialog
        title="费用申请"
        visible={this.visible}
        attrs={this.$attrs}
        width="400px"
        class="feeds-edit"
        on={{
          "update:visible": (value: boolean) => this.visibleChange(value),
          ...this.$listeners
        }}
      >
        <div class="flex-container column-flex">
          <div class="flex-block-bg flex-block-padding">
            <el-button
              type="primary"
              disabled={this.delDisabled}
              loading={this.loading}
              onClick={this.deleteFees}
              size="mini"
            >
              删除（F4）
            </el-button>
            <el-button
              type="primary"
              disabled={this.submitDisabled}
              loading={this.loading}
              onClick={this.submit}
              size="mini"
            >
              提交（F9）
            </el-button>
            <el-button
              type="primary"
              disabled={this.recallDisabled}
              loading={this.loading}
              size="mini"
              onClick={this.recall}
            >
              撤回（F9）
            </el-button>
          </div>
          <div class="flex-block-bg margin-block flex-block-padding">
            <el-form
              ref="form"
              label-position="left"
              size="mini"
              label-width="80px"
              class="form-item-small-margin-bottom"
              show-message={false}
              disabled
              attrs={{
                model: this.formData,
                rules
              }}
            >
              {this.curData && (
                <el-form-item label-width="0">
                  <bill-status-bar
                    bill-no={this.curData.billNo}
                    bill-status={BILL_STATUS[this.curData.status!]}
                  />
                  {this.curData?.rejectReason && (
                    <div class="status-tips">
                      驳回原因:
                      {this.curData.rejectReason}
                    </div>
                  )}
                </el-form-item>
              )}
              <el-form-item label="费用类型" prop="billType">
                <el-radio-group v-model={this.formData.billType} size="mini">
                  <el-radio label="YBX" border>
                    预支费用报销申请
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="预支单号" prop="advanceBillNo">
                <ht-input disabled v-model={this.formData.advanceBillNo} />
              </el-form-item>
              <el-form-item label="报销时间" prop="applyAt">
                <el-date-picker
                  v-model={this.formData.applyAt}
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
              <el-form-item label="申请金额" prop="applyAmount">
                <ht-format-number
                  v-model={this.formData.applyAmount}
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
                  v-model={this.formData.applyReason}
                />
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <ht-input
                  rows={2}
                  type="textarea"
                  v-model={this.formData.remark}
                />
              </el-form-item>
            </el-form>
          </div>
          <div class="dialog-footer-align flex-block-bg flex-block-padding">
            {this.updateDisabled || (
              <el-button
                type="primary"
                plain
                size="mini"
                loading={this.loading}
                onClick={this.saveData}
              >
                保存（F3）
              </el-button>
            )}
            <el-button
              type="primary"
              plain
              size="mini"
              onClick={() => this.visibleChange()}
            >
              取消（Esc）
            </el-button>
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
.feeds-edit {
  ::v-deep {
    .el-dialog__body {
      padding: 0;
      background: #e7ebed;
      .btn-group {
        margin-top: 5px;
      }
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
