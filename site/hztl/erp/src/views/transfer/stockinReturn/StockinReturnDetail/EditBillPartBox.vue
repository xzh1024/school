<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { Form } from "hztl-ui";
import { pick } from "lodash";
import { getKeys } from "@/utils/tool";
import SearchMixin from "@/mixins/searchMixin";
import PrecisionsFixed from "@/mixins/PrecisionsFixedMixin";
import { multiply, divide } from "@/utils/numberAPI";
import { validMoney } from "@/utils/validate";
import BillPanel from "@/components/bill-panel/BillPanel.vue";
import { EditPartFormData, EditPartInfoData } from "./constants";
import transferService from "../transferService";
import { ReturnablePartPrams } from "../../interface";

type PartDetailKeys =
  | "code"
  | "name"
  | "brand"
  | "property"
  | "batchNo"
  | "warehouseName"
  | "positionName"
  | "qty"
  | "dynamicQty"
  | "lockedQty"
  | "inQty"
  | "returnedQty"
  | "returnableQty"
  | "returnQty"
  | "price"
  | "amount";
interface PartDetailItem {
  label: string;
  value: PartDetailKeys;
}

const PART_INFO_ENUM1: PartDetailItem[] = [
  { label: "配件编码", value: "code" },
  { label: "配件名称", value: "name" },
  { label: "配件品牌", value: "brand" },
  { label: "配件性质", value: "property" },
  { label: "批次号", value: "batchNo" },
  { label: "实际库存", value: "qty" },
  { label: "动态库存", value: "dynamicQty" },
  { label: "锁定数", value: "lockedQty" }
];
const PART_INFO_ENUM2: PartDetailItem[] = [
  { label: "调入数", value: "returnedQty" },
  { label: "已退数", value: "returnableQty" },
  { label: "可退数", value: "property" },
  { label: "退货数", value: "returnQty" },
  { label: "退货价", value: "price" },
  { label: "退货金额", value: "amount" }
];

const defaultFormData: EditPartFormData = {
  qty: 1,
  price: undefined,
  amount: undefined,
  amount2Price: false,
  reason: "",
  remark: ""
};

@Component({
  components: { BillPanel }
})
export default class EditBillPartBox extends Mixins(
  SearchMixin,
  PrecisionsFixed
) {
  public $refs!: {
    form: Form;
  };

  @Prop() readonly visible!: boolean;
  @Prop() readonly isEdit?: boolean;
  @Prop() readonly editData!: EditPartFormData;
  @Prop() readonly paramsData!: ReturnablePartPrams;

  private loading = false;
  private infoData: EditPartInfoData = {};
  private formData: EditPartFormData = { ...defaultFormData };

  private get partInfo() {
    return {
      ...this.infoData,
      ...this.formData,
      returnQty: this.formData.qty
    };
  }

  @Watch("visible")
  onVisibleChange(val: boolean) {
    if (!val) {
      return;
    }
    this.formData = { ...pick(this.editData, getKeys(defaultFormData)) };
    this.loading = true;
    transferService
      .getReturnablePartDetail(this.paramsData)
      .then(res => {
        this.infoData = { ...res };
        if (!this.isEdit) {
          this.formData.price = Number(res.price) || defaultFormData.price;
          this.formData.qty = defaultFormData.qty;
          this.priceChange(this.formData.price);
        }
      })
      .finally(() => {
        this.loading = false;
        this.$nextTick(() => {
          this.$refs.form && this.$refs.form.clearValidate();
        });
      });
  }

  private qtyChange(qty?: number) {
    this.formData.amount = this.precisionFormat(
      multiply(Number(qty || 0), Number(this.formData.price || 0)),
      "money"
    );
    this.formData.amount2Price = false;
  }

  private priceChange(price?: number) {
    this.formData.amount = this.precisionFormat(
      multiply(Number(price || 0), Number(this.formData.qty || 0)),
      "money"
    );
    this.formData.amount2Price = false;
  }

  private amountChange(amout?: number) {
    this.formData.price = this.precisionFormat(
      divide(Number(amout || 0), Number(this.formData.qty || 0)),
      "price"
    );
    this.formData.amount2Price = true;
  }

  private async editChange(e?: MouseEvent) {
    e?.stopPropagation();
    if (this.getFormValid()) {
      this.$emit("editChange", {
        ...this.formData,
        ...this.paramsData,
        qty: this.formData.qty?.toString(),
        price: this.formData.price?.toString(),
        amount: this.formData.amount?.toString()
      });
      this.closeDialog();
    }
  }

  private closeDialog(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("close");
  }

  public getFormValid() {
    let flag = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$refs.form.validate((valid, err: any) => {
      flag = valid;
      if (!valid) {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips });
        setTimeout(() => {
          const input: HTMLElement | null = this.$refs.form.$el.querySelector(
            ".is-error input"
          );
          input?.focus();
        });
      }
    });
    return flag;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validReturnQty(rule: any, value: number, callback: Function) {
    if (Number(value) > 0) {
      if (Number(value) > Number(this.infoData.returnableQty)) {
        callback(new Error("退货数量需小于等于可退数量"));
      } else {
        callback();
      }
    } else if (Number(value) <= 0) {
      callback(new Error("退货数量需大于0"));
    } else {
      callback(new Error(rule.message));
    }
  }
  rules = {
    qty: [
      {
        required: true,
        validator: this.validReturnQty,
        message: "请输入退货数量！",
        trigger: "change"
      }
    ],
    price: [
      {
        required: true,
        validator: validMoney,
        message: "请输入退货价！",
        trigger: "change"
      }
    ],
    amount: [
      {
        required: true,
        validator: validMoney,
        message: "请输入退货金额！",
        trigger: "change"
      }
    ]
  };

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        on-close={this.closeDialog}
        title="编辑调拨入库退货明细"
        width="1000px"
        class="dialog-body"
      >
        <el-row v-loading={this.loading} gutter={10}>
          <el-col span={16}>
            <div class="ht-page-title page-title-divider">配件详情</div>
            <div class="flex-container">
              <bill-panel billData={this.partInfo} billEnum={PART_INFO_ENUM1} />
              <bill-panel billData={this.partInfo} billEnum={PART_INFO_ENUM2} />
            </div>
          </el-col>
          <el-col span={8}>
            <div class="ht-page-title page-title-divider">调拨详情</div>
            <el-form
              ref="form"
              attrs={{
                model: this.formData,
                rules: this.rules
              }}
              size="mini"
              show-message={false}
              label-position="left"
              label-width="75px"
              class="form-item-small-margin-bottom"
            >
              <el-form-item label="退货数量" prop="qty">
                {this.visible && (
                  <ht-format-number
                    v-delay-focus={this.visible}
                    v-model={this.formData.qty}
                    min={1}
                    max={Number(this.infoData.returnableQty)}
                    precision-type="qty"
                    on-change={this.qtyChange}
                  />
                )}
              </el-form-item>
              <el-form-item label="退货价" prop="price">
                <ht-format-number
                  v-model={this.formData.price}
                  min={0}
                  precision-type="price"
                  on-change={this.priceChange}
                />
              </el-form-item>
              <el-form-item label="退货金额" prop="taxAmount">
                <ht-format-number
                  v-model={this.formData.amount}
                  min={0}
                  precision-type="money"
                />
              </el-form-item>
              <el-form-item label="退货原因" prop="reason">
                <ht-autocomplete
                  v-model={this.formData.reason}
                  fetch-suggestions={this.autocompleteSearchReturnReasons}
                  trigger-on-focus={false}
                  mnemonic
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <ht-input
                  v-model={this.formData.remark}
                  placeholder="最大支持100个字符"
                  maxlength="100"
                />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <div style="margin: 10px 0 0 0; text-align: center;">
          <el-button
            type="primary"
            size="mini"
            plain
            on-click={this.editChange}
          >
            确定（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            plain
            on-click={this.closeDialog}
          >
            取消（Esc）
          </el-button>
        </div>
      </ht-dialog>
    );
  }
}
</script>

<style lang="scss" scoped>
.dialog-body {
  &::v-deep .el-dialog__body {
    margin: 0 5px;
  }
}
</style>
