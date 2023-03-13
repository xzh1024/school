import { getKeys } from "@/utils/tool";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { EditPartData } from "../interface";

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

const defaultDataFlag = {
  partType: false,
  partCode: false,
  partName: false,
  purchasePrice: false,
  retailPrice: false,
  wholeSalePrice: false,
  platformPrice: false,
  transferPrice: false,
  wholeSalePrice1: false,
  wholeSalePrice2: false,
  wholeSalePrice3: false,
  wholeSalePrice4: false
};

@Component
export default class EditMultiplePartDialog extends Vue {
  @Prop() readonly visible!: boolean;
  @Prop() readonly loading!: boolean;
  @Prop() readonly partIds!: number[];

  @Watch("visible")
  onVisibleChange() {
    if (this.visible) {
      this.formData = {
        ...defaultFormData
      };
      this.dataFlag = {
        ...defaultDataFlag
      };
    }
  }

  private formData = {
    ...defaultFormData
  };
  private dataFlag = {
    ...defaultDataFlag
  };

  private closeDialog() {
    this.$emit("close");
  }

  private changePartData() {
    const params: EditPartData = {
      ...defaultFormData
    };
    getKeys(defaultDataFlag).forEach(item => {
      if (this.dataFlag[item]) {
        // ts类型判断，不同类型单独处理
        if (item === "partType") {
          params[item] = this.formData[item];
        } else {
          params[item] = this.formData[item];
        }
      }
    });
    this.$emit("changePartData", this.partIds, params);
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        on-close={this.closeDialog}
        title="配件编辑"
        top="7vh"
        width="700px"
      >
        <el-form
          label-position="left"
          size="mini"
          label-width="110px"
          class="form-item-small-margin-bottom"
        >
          <el-row gutter={10}>
            <el-col span={12}>
              <el-row gutter={10}>
                <el-col span={2}>
                  <el-checkbox v-model={this.dataFlag.partType} />
                </el-col>
                <el-col span={22}>
                  <el-form-item label="签约配件">
                    <el-radio-group
                      loading={this.loading}
                      v-model={this.formData.partType}
                      disabled={!this.dataFlag.partType}
                    >
                      <el-radio label={1}>是</el-radio>
                      <el-radio label={0}>否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row gutter={10}>
                <el-col span={2}>
                  <el-checkbox v-model={this.dataFlag.partCode} />
                </el-col>
                <el-col span={22}>
                  <el-form-item label="供应商配件编码">
                    <ht-input
                      v-model={this.formData.partCode}
                      disabled={!this.dataFlag.partCode}
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row gutter={10}>
                <el-col span={2}>
                  <el-checkbox v-model={this.dataFlag.partName} />
                </el-col>
                <el-col span={22}>
                  <el-form-item label="供应商配件名称">
                    <ht-input
                      v-model={this.formData.partName}
                      disabled={!this.dataFlag.partName}
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row gutter={10}>
                <el-col span={2}>
                  <el-checkbox v-model={this.dataFlag.purchasePrice} />
                </el-col>
                <el-col span={22}>
                  <el-form-item label="采购价">
                    <ht-format-number
                      v-model={this.formData.purchasePrice}
                      min={0}
                      precision-type="price"
                      disabled={!this.dataFlag.purchasePrice}
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row gutter={10}>
                <el-col span={2}>
                  <el-checkbox v-model={this.dataFlag.retailPrice} />
                </el-col>
                <el-col span={22}>
                  <el-form-item label="零售价">
                    <ht-format-number
                      v-model={this.formData.retailPrice}
                      min={0}
                      precision-type="price"
                      disabled={!this.dataFlag.retailPrice}
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row gutter={10}>
                <el-col span={2}>
                  <el-checkbox v-model={this.dataFlag.platformPrice} />
                </el-col>
                <el-col span={22}>
                  <el-form-item label="平台价">
                    <ht-format-number
                      v-model={this.formData.platformPrice}
                      min={0}
                      precision-type="price"
                      disabled={!this.dataFlag.platformPrice}
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col span={12}>
              <el-row gutter={10}>
                <el-col span={2}>
                  <el-checkbox v-model={this.dataFlag.transferPrice} />
                </el-col>
                <el-col span={22}>
                  <el-form-item label="调拨价" label-width="70px">
                    <ht-format-number
                      v-model={this.formData.transferPrice}
                      min={0}
                      precision-type="price"
                      disabled={!this.dataFlag.transferPrice}
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row gutter={10}>
                <el-col span={2}>
                  <el-checkbox v-model={this.dataFlag.wholeSalePrice} />
                </el-col>
                <el-col span={22}>
                  <el-form-item label="批发价" label-width="70px">
                    <ht-format-number
                      v-model={this.formData.wholeSalePrice}
                      min={0}
                      precision-type="price"
                      disabled={!this.dataFlag.wholeSalePrice}
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row gutter={10}>
                <el-col span={2}>
                  <el-checkbox v-model={this.dataFlag.wholeSalePrice1} />
                </el-col>
                <el-col span={22}>
                  <el-form-item label="批发价一" label-width="70px">
                    <ht-format-number
                      v-model={this.formData.wholeSalePrice1}
                      min={0}
                      precision-type="price"
                      disabled={!this.dataFlag.wholeSalePrice1}
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row gutter={10}>
                <el-col span={2}>
                  <el-checkbox v-model={this.dataFlag.wholeSalePrice2} />
                </el-col>
                <el-col span={22}>
                  <el-form-item label="批发价二" label-width="70px">
                    <ht-format-number
                      v-model={this.formData.wholeSalePrice2}
                      min={0}
                      precision-type="price"
                      disabled={!this.dataFlag.wholeSalePrice2}
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row gutter={10}>
                <el-col span={2}>
                  <el-checkbox v-model={this.dataFlag.wholeSalePrice3} />
                </el-col>
                <el-col span={22}>
                  <el-form-item label="批发价三" label-width="70px">
                    <ht-format-number
                      v-model={this.formData.wholeSalePrice3}
                      min={0}
                      precision-type="price"
                      disabled={!this.dataFlag.wholeSalePrice3}
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row gutter={10}>
                <el-col span={2}>
                  <el-checkbox v-model={this.dataFlag.wholeSalePrice4} />
                </el-col>
                <el-col span={22}>
                  <el-form-item label="批发价四" label-width="70px">
                    <ht-format-number
                      v-model={this.formData.wholeSalePrice4}
                      min={0}
                      precision-type="price"
                      disabled={!this.dataFlag.wholeSalePrice4}
                    />
                  </el-form-item>
                </el-col>
              </el-row>
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
