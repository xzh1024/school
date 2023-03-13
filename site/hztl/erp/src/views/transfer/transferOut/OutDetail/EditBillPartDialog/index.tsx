import { Component, Prop, Watch, Mixins } from "vue-property-decorator";
import ParsingCodes from "@/components/parsingCodes";
import { Form } from "hztl-ui";
import { pick } from "lodash";
import PrecisionsFixed from "@/mixins/PrecisionsFixedMixin";
import BillPanel from "@/components/bill-panel/BillPanel.vue";
import { LatestBillPariceDetail } from "@/views/transfer/services";
import { getSalePriceOptions } from "@/utils/tool";
import { NO_PRICE_PERM_VALUE } from "@/constants";
import { divide, multiply } from "@/utils/numberAPI";
import transferService from "../../transferService";

export interface EditFormData {
  groupId?: number;
  id?: number;
  qty?: number;
  price?: number;
  amount?: number;
  remark?: string;
  amount2Price?: boolean;
}

export interface PartBaseData {
  isNegative?: boolean;
  partId?: number;
  relatedCompanyId?: number;
  detailId?: number;
  code: string;
  name: string;
  brand: string;
  property: string;
  batchNo: string;
  warehouseId?: number;
  warehouseName?: string;
  positionId?: number;
  positionName?: string;
  stockId?: number;
}

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
  | "allocableQty"
  | "isNegative"
  | "returnableQty";

interface PartDetailItem {
  label: string;
  value: PartDetailKeys;
}

const PART_INFO_ENUM: PartDetailItem[] = [
  { label: "配件编码", value: "code" },
  { label: "配件名称", value: "name" },
  { label: "配件品牌", value: "brand" },
  { label: "配件性质", value: "property" },
  { label: "批次号", value: "batchNo" },
  { label: "仓库", value: "warehouseName" },
  { label: "货位", value: "positionName" },
  { label: "实际库存", value: "qty" },
  { label: "动态库存", value: "dynamicQty" },
  { label: "锁定数", value: "lockedQty" },
  { label: "可调拨数", value: "allocableQty" },
  { label: "可调拨退货数", value: "returnableQty" }
];

const rules = {
  qty: [
    {
      required: true,
      message: "请输入申请数量！",
      trigger: "change"
    }
  ],
  price: [
    {
      required: true,
      message: "请输入单价！",
      trigger: "change"
    }
  ],
  amount: [
    {
      required: true,
      message: "请输入金额！",
      trigger: "change"
    }
  ]
};
const defaultFormData: EditFormData = {
  qty: 1,
  amount: 0,
  remark: "",
  price: 0
};

@Component({
  components: {
    ParsingCodes,
    BillPanel
  }
})
export default class SearchPartsBox extends Mixins(PrecisionsFixed) {
  public $refs!: {
    form: Form;
  };
  @Prop() readonly mode?: number;
  @Prop() readonly isEdit!: boolean;
  @Prop() readonly editData?: EditFormData;
  @Prop() readonly visible!: boolean;
  @Prop() readonly loading!: boolean;
  @Prop() readonly partBaseInfo!: PartBaseData;
  private partPrice: LatestBillPariceDetail = {
    latestPrice: "0",
    qty: "0",
    dynamicQty: "0",
    lockedQty: "0",
    allocableQty: "0",
    salePrices: {},
    price: ""
  };
  get partInfo() {
    return {
      ...this.partBaseInfo,
      ...this.partPrice
    };
  }
  private formData = {
    ...defaultFormData
  };

  @Watch("visible")
  onVisibleChange() {
    if (this.visible) {
      this.formData = {
        ...defaultFormData,
        ...this.editData
      };
    }
  }

  @Watch("partBaseInfo")
  changePartInfo() {
    const params: any = {
      ...pick(this.partBaseInfo, [
        "isNegative",
        "partId",
        "relatedCompanyId",
        "detailId",
        "property"
      ]),
      mode: this.mode
    };
    switch (this.mode) {
      case 0:
        params.warehouseId = this.partBaseInfo.warehouseId;
        params.positionId = this.partBaseInfo.positionId;
        params.stockId = this.partBaseInfo.stockId;
        break;
      case 1:
        params.warehouseId = this.partBaseInfo.warehouseId;
        params.positionId = this.partBaseInfo.positionId;
        break;
      case 2:
        params.warehouseId = this.partBaseInfo.warehouseId;
        break;
      case 3:
        break;
      default:
        break;
    }
    this.partBaseInfo &&
      transferService.getLatestBillDetail(params).then(res => {
        this.partPrice = { ...res };
        if (!this.isEdit) {
          this.formData = {
            ...this.formData,
            price: Number(res.price || 0),
            amount: this.precisionFormat(
              multiply(Number(res.price || 0), Number(this.formData.qty || 0)),
              "money"
            )
          };
        }
      });
  }

  protected searchData(e?: MouseEvent) {
    e?.stopPropagation();
    if (this.getFormValid()) {
      this.$emit("confirm", { ...this.formData });
    }
  }

  private getFormValid() {
    let flag = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$refs.form.validate((valid, err: any) => {
      flag = valid;
      if (!flag) {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips, showClose: true });
      }
    });
    return flag;
  }

  private closeDialog() {
    this.$emit("close");
  }

  private onQtyChange() {
    if (!this.formData.amount2Price && this.formData.price) {
      if (this.formData.qty) {
        this.formData.amount = this.precisionFormat(
          multiply(this.formData.qty!, this.formData.price),
          "money"
        );
      } else {
        this.formData.amount = 0;
      }
    } else if (this.formData.amount) {
      if (this.formData.qty) {
        this.formData.price = this.precisionFormat(
          divide(this.formData.amount, this.formData.qty),
          "price"
        );
      } else {
        this.formData.price = 0;
      }
    }
  }

  private onPriceChange() {
    if (this.formData.qty && this.formData.price) {
      this.formData.amount = this.precisionFormat(
        multiply(this.formData.qty!, this.formData.price),
        "money"
      );
    } else {
      this.formData.amount = 0;
    }
    this.formData.amount2Price = false;
  }

  private onAmountChange() {
    if (this.formData.qty && this.formData.amount) {
      this.formData.price = this.precisionFormat(
        divide(this.formData.amount, this.formData.qty),
        "price"
      );
    } else {
      this.formData.price = 0;
    }
    this.formData.amount2Price = true;
  }

  private get otherPrices() {
    return getSalePriceOptions(this.partPrice.salePrices);
  }

  private otherPriceChange(id: number) {
    this.otherPrices.forEach(item => {
      if (id === item.id) {
        if (item.value === NO_PRICE_PERM_VALUE) {
          this.$message.warning({
            message: "您没有权限查看该价格",
            showClose: true
          });
        } else {
          this.formData.price = Number(item.value);
          this.onPriceChange();
        }
      }
    });
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        on-close={this.closeDialog}
        title="编辑调拨出库明细"
        top="7vh"
        width="700px"
      >
        <el-row gutter={10}>
          <el-col span={12}>
            <div class="ht-page-title page-title-divider">配件详情</div>
            <bill-panel billData={this.partInfo} billEnum={PART_INFO_ENUM} />
          </el-col>
          <el-col span={12}>
            <div class="ht-page-title page-title-divider">调拨详情</div>
            <el-form
              ref="form"
              attrs={{
                model: this.formData,
                rules
              }}
              size="mini"
              show-message={false}
              label-position="left"
              label-width="90px"
              class="form-item-small-margin-bottom"
            >
              <el-form-item prop="qty" label="上次调出价">
                <ht-format-number
                  v-model={this.partInfo.latestPrice}
                  disabled
                />
              </el-form-item>
              <el-form-item prop="qty" label="调出数量">
                {this.visible && (
                  <ht-format-number
                    v-delay-focus={this.visible}
                    v-model={this.formData.qty}
                    min={1}
                    onChange={this.onQtyChange}
                    precision-type="qty"
                  />
                )}
              </el-form-item>
              <el-form-item prop="price" label="单价">
                <ht-format-number
                  v-model={this.formData.price}
                  min={0}
                  onChange={this.onPriceChange}
                  precision-type="price"
                />
              </el-form-item>
              <el-form-item prop="amount" label="金额">
                <ht-format-number
                  v-model={this.formData.amount}
                  min={0}
                  onChange={this.onAmountChange}
                  precision-type="money"
                />
              </el-form-item>
              <el-form-item prop="remark" label="备注">
                <ht-input
                  v-model={this.formData.remark}
                  placeholder="最大支持100个字符"
                  maxlength="100"
                />
              </el-form-item>

              <el-form-item class="price-select other-price">
                <ht-select
                  value="其他售价"
                  options={this.otherPrices}
                  clearable={false}
                  default-value="其他售价"
                  on-change={this.otherPriceChange}
                />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <div class="dialog-footer-align mt-1">
          <el-button
            type="primary"
            size="mini"
            plain
            on-click={this.searchData}
            loading={this.loading}
          >
            确定（F3）
          </el-button>
          <el-button
            type="primary"
            plain
            size="mini"
            on-click={this.closeDialog}
          >
            取消（Esc）
          </el-button>
        </div>
      </ht-dialog>
    );
  }
}
