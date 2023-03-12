import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { EditPartData, SupplierPartItem } from "../interface";

const defaultFormData: EditPartData = {
  partType: 1,
  partCode: undefined,
  partName: undefined,
  purchasePrice: undefined,
  retailPrice: undefined,
  wholeSalePrice: undefined,
  platformPrice: undefined,
  transferPrice: undefined,
  wholeSalePrice1: undefined,
  wholeSalePrice2: undefined,
  wholeSalePrice3: undefined,
  wholeSalePrice4: undefined
};

@Component
export default class EditSinglePartDialog extends Vue {
  @Prop() readonly visible!: boolean;
  @Prop() readonly loading!: boolean;
  @Prop() readonly editPart!: SupplierPartItem | null;

  @Watch("visible")
  onVisibleChange() {
    if (this.visible) {
      this.formData = {
        partType: this.editPart?.partType || 0,
        partCode: this.editPart?.supplierPartCode,
        partName: this.editPart?.supplierPartName,
        purchasePrice: this.editPart?.purchasePrice,
        retailPrice: this.editPart?.salePrices?.retail,
        wholeSalePrice: this.editPart?.salePrices?.wholesale,
        platformPrice: this.editPart?.salePrices?.platform,
        transferPrice: this.editPart?.salePrices?.allot,
        wholeSalePrice1: this.editPart?.salePrices?.wholesale1,
        wholeSalePrice2: this.editPart?.salePrices?.wholesale2,
        wholeSalePrice3: this.editPart?.salePrices?.wholesale3,
        wholeSalePrice4: this.editPart?.salePrices?.wholesale4
      };
    }
  }

  private formData = {
    ...defaultFormData
  };

  private closeDialog() {
    this.$emit("close");
  }

  private changePartData() {
    this.$emit("changePartData", [this.editPart!.id], this.formData);
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        on-close={this.closeDialog}
        title="配件编辑"
        top="7vh"
        width="600px"
      >
        <el-form
          label-position="left"
          size="mini"
          label-width="110px"
          class="form-item-small-margin-bottom"
        >
          <el-row gutter={10}>
            <el-col span={12}>
              <el-form-item label="签约配件">
                <el-radio-group
                  loading={this.loading}
                  v-model={this.formData.partType}
                >
                  <el-radio label={1}>是</el-radio>
                  <el-radio label={0}>否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="供应商配件编码">
                <ht-input v-model={this.formData.partCode} />
              </el-form-item>
              <el-form-item label="供应商配件名称">
                <ht-input v-model={this.formData.partName} />
              </el-form-item>
              <el-form-item label="采购价">
                <ht-format-number
                  v-model={this.formData.purchasePrice}
                  min={0}
                  precision-type="price"
                />
              </el-form-item>
              <el-form-item label="配件编码">
                <ht-input value={this.editPart?.partCode} disabled />
              </el-form-item>
              <el-form-item label="配件名称">
                <ht-input value={this.editPart?.partName} disabled />
              </el-form-item>
              <el-form-item label="配件品牌">
                <ht-input value={this.editPart?.brand} disabled />
              </el-form-item>
              <el-form-item label="产地">
                <ht-input value={this.editPart?.productionPlace} disabled />
              </el-form-item>
              <el-form-item label="图号">
                <ht-input value={this.editPart?.customCodes[0]} disabled />
              </el-form-item>
            </el-col>
            <el-col span={12}>
              <el-form-item label="零售价" label-width="70px">
                <ht-format-number
                  v-model={this.formData.retailPrice}
                  min={0}
                  precision-type="price"
                />
              </el-form-item>
              <el-form-item label="平台价" label-width="70px">
                <ht-format-number
                  v-model={this.formData.platformPrice}
                  min={0}
                  precision-type="price"
                />
              </el-form-item>
              <el-form-item label="调拨价" label-width="70px">
                <ht-format-number
                  v-model={this.formData.transferPrice}
                  min={0}
                  precision-type="price"
                />
              </el-form-item>
              <el-form-item label="批发价" label-width="70px">
                <ht-format-number
                  v-model={this.formData.wholeSalePrice}
                  min={0}
                  precision-type="price"
                />
              </el-form-item>
              <el-form-item label="批发价一" label-width="70px">
                <ht-format-number
                  v-model={this.formData.wholeSalePrice1}
                  min={0}
                  precision-type="price"
                />
              </el-form-item>
              <el-form-item label="批发价二" label-width="70px">
                <ht-format-number
                  v-model={this.formData.wholeSalePrice2}
                  min={0}
                  precision-type="price"
                />
              </el-form-item>
              <el-form-item label="批发价三" label-width="70px">
                <ht-format-number
                  v-model={this.formData.wholeSalePrice3}
                  min={0}
                  precision-type="price"
                />
              </el-form-item>
              <el-form-item label="批发价四" label-width="70px">
                <ht-format-number
                  v-model={this.formData.wholeSalePrice4}
                  min={0}
                  precision-type="price"
                />
              </el-form-item>
            </el-col>
            <el-col span={24}>
              <div class="dialog-footer-align mt-1">
                <el-button
                  type="primary"
                  size="mini"
                  plain
                  on-click={this.changePartData}
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
            </el-col>
          </el-row>
        </el-form>
      </ht-dialog>
    );
  }
}
