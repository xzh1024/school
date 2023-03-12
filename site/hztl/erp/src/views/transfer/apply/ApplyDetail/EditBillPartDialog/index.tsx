import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import SearchMixin from "@/mixins/searchMixin";
import ParsingCodes from "@/components/parsingCodes";
import BillPanel from "@/components/bill-panel/BillPanel.vue";
import { Form } from "hztl-ui";
import transferService from "../../transferService";
import { pick } from "lodash";

export interface EditFormData {
  groupId?: number;
  id?: number;
  qty?: number;
  warehouseId?: number;
  warehouseName?: string;
  remark?: string;
}

export interface PartBaseData {
  partId?: number;
  relatedCompanyId?: number;
  detailId?: number;
  code: string;
  name: string;
  brand: string;
  property: string;
  batchNo: string;
  warehouseName: string;
  positionName: string;
  outWarehouseId?: number;
  outWarehouseName?: string;
  stockId?: number;
  positionId?: number;
  warehouseId?: number;
}

type PartDetailKeys =
  | "code"
  | "name"
  | "brand"
  | "qty"
  | "dynamicQty"
  | "lockedQty"
  | "allocableQty"
  | "latestPrice";

interface PartDetailItem {
  label: string;
  value: PartDetailKeys;
}

const PART_INFO_ENUM: PartDetailItem[] = [
  { label: "配件编码", value: "code" },
  { label: "配件名称", value: "name" },
  { label: "配件品牌", value: "brand" },
  { label: "调出方实际数", value: "qty" },
  { label: "调出方动态数", value: "dynamicQty" },
  { label: "上次调拨价", value: "latestPrice" }
];

const rules = {
  qty: [
    {
      required: true,
      message: "请输入申请数量！",
      trigger: "change"
    }
  ],
  warehouseId: [
    {
      validator: (rule: any, value: any, callback: Function) => {
        if (!value || Number(value) === 0 || value === "undefined")
          return callback(new Error("请选择到货仓库！"));
        callback();
      },
      trigger: "change"
    }
  ]
};

const defaultFormData: EditFormData = {
  qty: 0,
  warehouseId: undefined,
  remark: ""
};

@Component({
  components: {
    ParsingCodes,
    BillPanel
  }
})
export default class SearchPartsBox extends Mixins(SearchMixin) {
  public $refs!: {
    form: Form;
  };
  @Prop() readonly editData?: EditFormData;
  @Prop() readonly visible!: boolean;
  @Prop() readonly loading!: boolean;
  @Prop() readonly partBaseInfo!: PartBaseData;
  @Prop() readonly relatedCompanyId!: number;
  @Prop() readonly companyId?: string | number;
  @Prop() readonly mode?: number;
  @Prop() readonly isEdit = false;
  private partPrice = {
    latestPrice: "0",
    qty: "0",
    dynamicQty: "0",
    lockedQty: "0",
    allocableQty: "0"
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
    if (!this.formData.warehouseId) {
      this.formData.warehouseId = undefined;
    }
  }

  @Watch("partBaseInfo")
  changePartInfo() {
    const mode = this.mode;
    const params: any = {
      ...pick(this.partBaseInfo, ["partId", "detailId"]),
      relatedCompanyId: this.relatedCompanyId
    };
    if (!this.isEdit) {
      params.mode = this.mode;
    }
    switch (mode) {
      case 2: {
        params.property = this.partBaseInfo.property || null;
        params.outWarehouseId = this.partBaseInfo.outWarehouseId || null;
        params.warehouseId = this.partBaseInfo.outWarehouseId || null;
        break;
      }
      case 3: {
        params.property = this.partBaseInfo.property || null;
        break;
      }
      default:
        break;
    }
    this.partBaseInfo &&
      transferService.getLatestBillDetail(params).then(res => {
        this.partPrice = { ...res };
        if (!this.partBaseInfo.detailId) {
          this.formData = {
            ...this.formData,
            warehouseId: res.warehouseId,
            warehouseName: res.warehouseName
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

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        on-close={this.closeDialog}
        title="编辑请调申请单明细"
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
              label-width="75px"
              class="form-item-small-margin-bottom"
            >
              <el-form-item prop="qty" label="申请数量">
                {this.visible && (
                  <ht-format-number
                    v-delay-focus={this.visible}
                    v-model={this.formData.qty}
                    min={1}
                    precision-type="qty"
                  />
                )}
              </el-form-item>
              <el-form-item prop="warehouseId" label="到货仓库">
                <ht-autoselect
                  v-model={this.formData.warehouseId}
                  defaultValue={this.formData.warehouseName}
                  fetch-suggestions={(query: string) =>
                    this.searchLoadAssignWarehouses({
                      name: query,
                      status: 0,
                      assignCompanyId: Number(this.companyId || 0)
                    })
                  }
                  clearable={false}
                  trigger-on-focus={false}
                  remote
                  filter-zero
                  highlight-first-item
                  placeholder="请选择"
                />
              </el-form-item>
              <el-form-item prop="remark" label="备注">
                <ht-input
                  v-model={this.formData.remark}
                  placeholder="最大支持100个字符"
                  maxlength="100"
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
