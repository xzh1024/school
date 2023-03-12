import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import SearchMixin from "@/mixins/searchMixin";
import Collapse from "@/components/collapse";
import { PricesItem, SalePricesMapRes } from "@/constants/interface/part";
import { reqPurchasePriceSettings } from "@/api/purchase/purchasePrice";
import { ALL_SPACE_REG_EXP, QUICK_ADD_POSITION_LEN } from "@/constants";
import quickGetPositions from "@/utils/quickGetPositions";
import transferService from "../../transferService";
import { Form } from "hztl-ui";
import { loadSearchPosition } from "@/api/store/stocks";
import { PRIORITY_CATEGORYS } from "@/constants/states/purchase";

export interface EditFormData {
  salePrices: PricesItem;
  warehouseId?: number;
  warehouseName?: string;
  positionId?: number;
  positionName?: string;
  remark?: string;
}
type PartDetailKeys =
  | "code"
  | "name"
  | "brand"
  | "qty"
  | "property"
  | "batchNo"
  | "dynamicQty"
  | "lockedQty";

interface PartDetailItem {
  name: string;
  prop: PartDetailKeys;
}
export interface InfoData {
  code?: string;
  name?: string;
  brand?: string;
  property?: string;
  batchNo?: string;
  qty?: string;
  price?: string;
  amount?: string;
  latestPrice?: string;
  dynamicQty?: string;
  lockedQty?: string;
  allocableQty?: string;
}
const partDetailList: PartDetailItem[] = [
  {
    name: "配件编码",
    prop: "code"
  },
  {
    name: "配件名称",
    prop: "name"
  },
  {
    name: "配件品牌",
    prop: "brand"
  },
  {
    name: "配件性质",
    prop: "property"
  },
  {
    name: "批次号",
    prop: "batchNo"
  },
  {
    name: "实际库存",
    prop: "qty"
  },
  {
    name: "动态库存",
    prop: "dynamicQty"
  },
  {
    name: "锁定数",
    prop: "lockedQty"
  }
];

const rules = {
  warehouseId: [
    {
      required: true,
      message: "请选择到货仓库！",
      trigger: "change"
    }
  ]
};

const defaultFormData: EditFormData = {
  warehouseId: undefined,
  positionId: undefined,
  positionName: "",
  remark: "",
  salePrices: {
    retail: "0",
    platform: "0",
    allot: "0",
    wholesale: "0",
    wholesale1: "0",
    wholesale2: "0",
    wholesale3: "0",
    wholesale4: "0"
  }
};

@Component({
  components: {
    Collapse
  }
})
export default class SearchPartsBox extends Mixins(SearchMixin) {
  public $refs!: {
    form: Form;
  };
  @Prop() readonly editData?: EditFormData;
  @Prop() readonly visible!: boolean;
  @Prop() readonly detailId!: number;
  @Prop() readonly partId!: number;
  @Prop() readonly loading!: boolean;
  @Prop() readonly infoData!: InfoData;
  @Prop() readonly companyId?: number;

  @Prop() readonly billId?: number;
  @Prop() readonly groupId?: number;

  private btnLoading = false;
  private cachePositionId: number | undefined = undefined;
  private displayPriorityCategory = "售价取值方式";
  private priorityCategorys = PRIORITY_CATEGORYS;
  private priorityCategory = 0;
  private partInfo = {
    latestPrice: "",
    qty: "",
    dynamicQty: "",
    lockedQty: "",
    allocableQty: ""
  };
  private formData = {
    ...defaultFormData
  };

  @Watch("visible")
  onVisibleChange() {
    if (this.visible) {
      this.displayPriorityCategory = "售价取值方式";
      this.priorityCategory = 0;
      this.formData = {
        ...defaultFormData,
        ...this.editData
      };
      this.cachePositionId = this.formData.positionId;
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
    }
  }

  protected get InfoDataAll() {
    return { ...this.infoData, ...this.partInfo };
  }
  protected priorityCategoryChange(id: number) {
    if (id) {
      this.priorityCategory = id;
      const option = this.priorityCategorys.find(item => id == item.id);
      if (option) {
        this.displayPriorityCategory = `售价取值方式（${option.name}）`;
      } else {
        this.displayPriorityCategory = "售价取值方式";
      }
    } else {
      this.displayPriorityCategory = "售价取值方式";
      this.priorityCategory = 0;
    }
    this.setSalePrices(this.infoData.price);
  }
  protected setSalePrices(price?: string) {
    if (price || [0, "0"].includes(price!)) {
      reqPurchasePriceSettings({
        companyId: this.companyId,
        partId: this.partId,
        taxedPurchasePrice: price,
        priorityCategory: this.priorityCategory
      }).then((res: SalePricesMapRes) => {
        if (res) {
          this.formData.salePrices = {
            retail: res.salePrices?.retail || "0",
            platform: res.salePrices?.platform || "0",
            allot: res.salePrices?.allot || "0",
            wholesale: res.salePrices?.wholesale || "0",
            wholesale1: res.salePrices?.wholesale1 || "0",
            wholesale2: res.salePrices?.wholesale2 || "0",
            wholesale3: res.salePrices?.wholesale3 || "0",
            wholesale4: res.salePrices?.wholesale4 || "0"
          };
        }
      });
    } else {
      this.clearSalePrices();
    }
  }
  protected clearSalePrices() {
    this.formData.salePrices = defaultFormData.salePrices;
  }
  @Watch("detailId")
  changePartInfo() {
    transferService
      .getLatestBillDetail({ billId: this.billId, groupId: this.groupId })
      .then(res => {
        this.partInfo = res;
      });
  }

  protected get isEasyMode() {
    return this.$store.state?.admin?.systemParams?.params?.manageMode;
  }

  private async handleWarehouseChange(warehouseId?: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const positions: any = await this.getPositions(warehouseId);
    if (positions.length) {
      const position = positions.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item.id === this.cachePositionId
      );
      if (position) {
        this.formData.positionId = this.cachePositionId;
      } else {
        this.formData.positionId = undefined;
      }
    } else {
      this.formData.positionId = undefined;
    }
  }
  private async getPositions(warehouseId?: number, query?: string) {
    const positions = await loadSearchPosition({
      name: query,
      warehouseId
    });
    return positions || [];
  }
  private handlePositionIdChange(positionId?: number) {
    if (!positionId) return;
    this.cachePositionId = positionId;
  }
  private handlePositionNameChange(positionName?: string) {
    if (positionName) {
      this.formData.positionName = positionName.replace(ALL_SPACE_REG_EXP, "");
    } else {
      this.formData.positionName = "";
    }
  }

  protected async searchData(e?: MouseEvent) {
    e?.stopPropagation();
    if (this.btnLoading || this.loading || !this.getFormValid()) {
      return;
    }

    if (
      this.isEasyMode &&
      !this.formData.positionId &&
      this.formData.positionName
    ) {
      this.btnLoading = true;
      if (
        this.formData.positionName &&
        this.formData.positionName.length > QUICK_ADD_POSITION_LEN
      ) {
        this.$message.warning({
          message: `货位名称字数需小于等于${QUICK_ADD_POSITION_LEN}`,
          showClose: true
        });
        this.btnLoading = false;
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const positionIds: any = await quickGetPositions([
        {
          warehouseId: this.formData.warehouseId || 0,
          name: this.formData.positionName || ""
        }
      ]);
      this.btnLoading = false;
      if (!positionIds) {
        return;
      }

      this.formData.positionId = positionIds[0];
    }

    this.$emit("confirm", { ...this.formData });
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
        title="编辑调拨入库明细"
        top="7vh"
        width="820px"
      >
        <el-row gutter={5} style="height: 310px;">
          <el-col span={11} style="height: 100%;">
            <ht-card title="配件详情" style="height: 100%;">
              <el-form
                value={this.InfoDataAll}
                size="mini"
                ref="form"
                label-position="left"
                label-width="100px"
                class="search-box compact-form ignore-hotkeys"
              >
                {partDetailList.map(item => (
                  <el-form-item label={item.name} prop={item.prop}>
                    <span
                      class="form-value"
                      title={this.InfoDataAll[item.prop]}
                    >
                      {this.InfoDataAll[item.prop]}
                    </span>
                  </el-form-item>
                ))}
              </el-form>
            </ht-card>
          </el-col>
          <el-col span={13} style="height: 100%;">
            <ht-card title="调拨详情" style="height: 100%;overflow:auto">
              <div slot="after-title" style="text-align: right;">
                <ht-select
                  v-model={this.displayPriorityCategory}
                  options={this.priorityCategorys}
                  clearable={false}
                  class="set-price-type"
                  default-value="售价取值方式"
                  on-change={this.priorityCategoryChange}
                />
              </div>
              <el-form
                ref="form"
                attrs={{
                  model: this.formData,
                  rules: rules
                }}
                show-message={false}
                label-position="left"
                label-width="75px"
                size="mini"
                class="form-item-small-margin-bottom"
              >
                <Collapse
                  scopedSlots={{
                    default: () => (
                      <div>
                        <el-form-item prop="latestPrice" label="上次调入价">
                          <ht-format-number
                            disabled={true}
                            v-model={this.partInfo.latestPrice}
                            precision-type="price"
                          />
                        </el-form-item>
                        <el-form-item prop="qty" label="调入数量">
                          <ht-format-number
                            disabled={true}
                            v-model={this.infoData.qty}
                            min={1}
                            precision-type="qty"
                          />
                        </el-form-item>
                        <el-form-item prop="price" label="调入单价">
                          <ht-format-number
                            disabled={true}
                            v-model={this.infoData.price}
                            precision-type="price"
                            placeholder="请输入内容"
                          />
                        </el-form-item>
                        <el-form-item prop="salePrices.retail" label="零售价">
                          <ht-format-number
                            v-model={this.formData.salePrices.retail}
                            v-delay-focus={this.visible}
                            precision-type="price"
                            placeholder="请输入内容"
                          />
                        </el-form-item>
                        <el-form-item prop="amount" label="金额">
                          <ht-format-number
                            disabled={true}
                            v-model={this.infoData.amount}
                            precision-type="money"
                            placeholder="请输入内容"
                          />
                        </el-form-item>
                        <el-form-item prop="warehouseId" label="到货仓库">
                          <ht-autoselect
                            v-model={this.formData.warehouseId}
                            defaultValue={this.editData?.warehouseName}
                            fetch-suggestions={(query: string) =>
                              this.searchLoadAssignWarehouses({
                                name: query,
                                status: 0,
                                assignCompanyId: Number(this.companyId || 0)
                              })
                            }
                            trigger-on-focus={false}
                            remote
                            filter-zero
                            highlight-first-item
                            placeholder="请选择"
                            on-change={this.handleWarehouseChange}
                          />
                        </el-form-item>
                        <el-form-item label="货位" prop="positionId">
                          {this.isEasyMode ? (
                            <ht-autoselect
                              v-model={this.formData.positionId}
                              keepInputValue={this.formData.positionName}
                              fetch-suggestions={(query: string) =>
                                this.getPositions(
                                  this.formData.warehouseId,
                                  query
                                )
                              }
                              defaultValue={this.formData.positionName}
                              remote
                              filter-zero
                              keep-input
                              clearable
                              no-match-text=""
                              trigger-on-focus={false}
                              placeholder="请选择"
                              on-input-change={this.handlePositionNameChange}
                              on-change={this.handlePositionIdChange}
                            />
                          ) : (
                            <ht-autoselect
                              v-model={this.formData.positionId}
                              fetch-suggestions={(query: string) =>
                                this.getPositions(
                                  this.formData.warehouseId,
                                  query
                                )
                              }
                              defaultValue={this.formData.positionName}
                              remote
                              filter-zero
                              clearable
                              trigger-on-focus={false}
                              highlight-first-item
                              placeholder="请选择"
                              on-change={this.handlePositionIdChange}
                            />
                          )}
                        </el-form-item>
                      </div>
                    ),
                    collapse: () => (
                      <div>
                        <el-form-item prop="remark" label="备注">
                          <ht-input
                            v-model={this.formData.remark}
                            placeholder="最大支持100个字符"
                            maxlength="100"
                          />
                        </el-form-item>
                        <el-form-item prop="allot" label="调拨价">
                          <ht-input
                            v-model={this.formData.salePrices.allot}
                            placeholder="最大支持100个字符"
                            maxlength="100"
                          />
                        </el-form-item>
                        <el-form-item prop="platform" label="平台价">
                          <ht-input
                            v-model={this.formData.salePrices.platform}
                            placeholder="最大支持100个字符"
                            maxlength="100"
                          />
                        </el-form-item>
                        <el-form-item prop="wholesale" label="批发价">
                          <ht-input
                            v-model={this.formData.salePrices.wholesale}
                            placeholder="最大支持100个字符"
                            maxlength="100"
                          />
                        </el-form-item>
                        <el-form-item prop="wholesale1" label="批发价一">
                          <ht-input
                            v-model={this.formData.salePrices.wholesale1}
                            placeholder="最大支持100个字符"
                            maxlength="100"
                          />
                        </el-form-item>
                        <el-form-item prop="wholesale2" label="批发价二">
                          <ht-input
                            v-model={this.formData.salePrices.wholesale2}
                            placeholder="最大支持100个字符"
                            maxlength="100"
                          />
                        </el-form-item>
                        <el-form-item prop="wholesale3" label="批发价三">
                          <ht-input
                            v-model={this.formData.salePrices.wholesale3}
                            placeholder="最大支持100个字符"
                            maxlength="100"
                          />
                        </el-form-item>
                        <el-form-item prop="wholesale4" label="批发价四">
                          <ht-input
                            v-model={this.formData.salePrices.wholesale4}
                            placeholder="最大支持100个字符"
                            maxlength="100"
                          />
                        </el-form-item>
                      </div>
                    )
                  }}
                />
              </el-form>
            </ht-card>
          </el-col>
        </el-row>
        <div class="dialog-footer-align mt-1">
          <el-button
            type="primary"
            size="mini"
            plain
            on-click={this.searchData}
            loading={this.loading || this.btnLoading}
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
