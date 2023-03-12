<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { Form } from "hztl-ui";
import { pick } from "lodash";
import { getKeys } from "@/utils/tool";
import SearchMixin from "@/mixins/searchMixin";
import PrecisionsFixed from "@/mixins/PrecisionsFixedMixin";
import { loadSearchPosition } from "@/api/store/stocks";
import { ALL_SPACE_REG_EXP, QUICK_ADD_POSITION_LEN } from "@/constants";
import quickGetPositions from "@/utils/quickGetPositions";
import { EditPartFormData, EditPartInfoData } from "./constants";
import transferService from "../transferService";
import { ReturnablePartPrams } from "../../interface";

const defaultFormData: EditPartFormData = {
  qty: 1,
  price: undefined,
  amount: undefined,
  amount2Price: false,
  warehouseId: undefined,
  positionId: undefined,
  positionName: "",
  reason: "",
  remark: ""
};

@Component
export default class EditBillPartBox extends Mixins(
  SearchMixin,
  PrecisionsFixed
) {
  public $refs!: {
    form: Form;
  };

  @Prop() readonly visible!: boolean;
  @Prop() readonly editData!: EditPartFormData;
  @Prop() readonly paramsData!: ReturnablePartPrams;
  @Prop() readonly companyId?: string | number;

  private loading = false;
  private infoData: EditPartInfoData = {};
  private formData: EditPartFormData = { ...defaultFormData };
  private cachePositionId: number | undefined = undefined;

  @Watch("visible")
  private onVisibleChange() {
    this.formData = { ...pick(this.editData, getKeys(defaultFormData)) };
    this.cachePositionId = this.formData.positionId;

    this.loading = true;
    transferService
      .getReturnablePartDetail(this.paramsData)
      .then(res => {
        this.infoData = { ...res };
      })
      .finally(() => {
        this.loading = false;
        this.$nextTick(() => {
          this.$refs.form && this.$refs.form.clearValidate();
        });
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

  private async editChange(e?: MouseEvent) {
    e?.stopPropagation();
    if (this.loading || !this.getFormValid()) {
      return;
    }

    if (
      this.isEasyMode &&
      !this.formData.positionId &&
      this.formData.positionName
    ) {
      this.loading = true;
      if (
        this.formData.positionName &&
        this.formData.positionName.length > QUICK_ADD_POSITION_LEN
      ) {
        this.$message.warning({
          message: `货位名称字数需小于等于${QUICK_ADD_POSITION_LEN}`,
          showClose: true
        });
        this.loading = false;
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const positionIds: any = await quickGetPositions([
        {
          warehouseId: this.formData.warehouseId || 0,
          name: this.formData.positionName || ""
        }
      ]);
      this.loading = false;
      if (!positionIds) {
        return;
      }

      this.formData.positionId = positionIds[0];
    }

    this.$emit("editChange", {
      id: this.paramsData.detailId,
      warehouseId: this.formData.warehouseId,
      positionId: this.formData.positionId,
      remark: this.formData.remark
    });
    this.closeDialog();
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

  rules = {
    warehouseId: [
      {
        required: true,
        message: "请选择退回仓库！",
        trigger: "change"
      }
    ]
  };

  private tableName = "StockoutReturnDetailEditDetailBoxPartInofList";
  private tableColumns = [
    { prop: "name", label: "", width: "100" },
    { prop: "content", label: "", width: "120" },
    { prop: "name1", label: "", width: "100" },
    { prop: "content1", label: "", width: "120" }
  ];
  private get tableData() {
    return [
      {
        name: "配件编码",
        content: this.infoData.code,
        name1: "调入数",
        content1: this.infoData.inQty
      },
      {
        name: "配件名称",
        content: this.infoData.name,
        name1: "已退数",
        content1: this.infoData.returnedQty
      },
      {
        name: "配件品牌",
        content: this.infoData.brand,
        name1: "可退数",
        content1: this.infoData.returnableQty
      },
      {
        name: "配件性质",
        content: this.infoData.property,
        name1: "退货数",
        content1: this.formData.qty
      },
      {
        name: "批次号",
        content: this.infoData.batchNo,
        name1: "退货价",
        content1: this.formData.price
      },
      {
        name: "实际库存",
        content: this.infoData.qty,
        name1: "退货金额",
        content1: this.formData.amount
      },
      {
        name: "动态库存",
        content: this.infoData.dynamicQty
      },
      {
        name: "锁定数",
        content: this.infoData.lockedQty
      }
    ];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private cellClassName({ columnIndex }: any) {
    if (columnIndex % 2 === 1) {
      return "text-font-primary";
    }
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        on-close={this.closeDialog}
        title="编辑调拨出库退货明细"
        append-to-body
        width="820px"
        class="dialog-body ignore-top-hotkeys"
      >
        <el-row v-loading={this.loading} gutter={10} style="height: 285px;">
          <el-col span={14} style="height: 100%;">
            <div class="ht-page-title page-title-divide">配件详情</div>
            <ht-setting-table
              tableName={this.tableName}
              columns={this.tableColumns}
              data={this.tableData}
              show-header={false}
              index-column={false}
              selection-type={null}
              cell-class-name={this.cellClassName}
              disabled-hotkeys
              style="height: calc(100% - 34px);"
            />
          </el-col>
          <el-col span={10} style="height: 100%;">
            <div class="ht-page-title page-title-divide">调拨详情</div>
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
                <ht-format-number
                  disabled
                  value={this.formData.qty}
                  precision-type="qty"
                />
              </el-form-item>
              <el-form-item label="退货价" prop="price">
                <ht-format-number
                  disabled
                  value={this.formData.price}
                  precision-type="price"
                />
              </el-form-item>
              <el-form-item label="退货金额" prop="taxAmount">
                <ht-format-number
                  disabled
                  value={this.formData.amount}
                  precision-type="money"
                />
              </el-form-item>
              <el-form-item label="退货原因" prop="reason">
                <ht-input disabled value={this.formData.reason} />
              </el-form-item>
              <el-form-item prop="warehouseId" label="退回仓库">
                <ht-autoselect
                  v-model={this.formData.warehouseId}
                  fetch-suggestions={(query: string) =>
                    this.searchLoadAssignWarehouses({
                      name: query,
                      status: 0,
                      assignCompanyId: Number(this.companyId || 0)
                    })
                  }
                  defaultValue={this.editData?.warehouseName}
                  trigger-on-focus={false}
                  remote
                  filter-zero
                  highlight-first-item
                  placeholder="请选择"
                  on-change={this.handleWarehouseChange}
                />
              </el-form-item>
              <el-form-item label="退回货位" prop="positionId">
                {this.isEasyMode ? (
                  <ht-autoselect
                    v-model={this.formData.positionId}
                    keepInputValue={this.formData.positionName}
                    fetch-suggestions={(query: string) =>
                      this.getPositions(this.formData.warehouseId, query)
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
                      this.getPositions(this.formData.warehouseId, query)
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
            v-loading={this.loading}
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
