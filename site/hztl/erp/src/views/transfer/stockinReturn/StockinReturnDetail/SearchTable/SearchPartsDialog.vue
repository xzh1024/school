<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import SearchMixin from "@/mixins/searchMixin";
import { PART_CODE_WAY } from "@/constants";
import { Company } from "@/views/transfer/interface";
import SetDefaultFoucusBox from "@/components/SetDefaultFoucusBox/index.vue";
import SetDefaultWarehousesBox from "@/components/SetDefaultWarehousesBox/index.vue";
import { getStaffSystemParamsDetail } from "@/api/base/base";
import { SelectOptions } from "@/constants/interface";
import { SearchPartData } from "./constants";
import { TYPE } from "../../constants";

const defaultFormData: SearchPartData = {
  billNo: "",
  relatedCompanyId: 0,
  codePattern: 0,
  code: "",
  customCodePattern: 0,
  customCode: "",
  name: "",
  brand: "",
  productionPlace: "",
  vehModel: "",
  property: "",
  model: "",
  warehouseIds: []
};
const SET_DEFAULT_FOCUS_OPTIONS = [
  { id: "billNo", name: "单据号" },
  { id: "relatedCompanyId", name: "调出分公司" },
  { id: "code", name: "配件编码" },
  { id: "customCode", name: "图号" },
  { id: "name", name: "配件名称" },
  { id: "vehModel", name: "车型/适用车型" },
  { id: "brand", name: "配件品牌" },
  { id: "productionPlace", name: "产地" },
  { id: "property", name: "配件性质" },
  { id: "model", name: "规格" }
];
const defaultTab0Focus = "billNo";

@Component({
  components: {
    SetDefaultFoucusBox,
    SetDefaultWarehousesBox
  }
})
export default class SearchPartsBox extends Mixins(SearchMixin) {
  @Prop() readonly visible!: boolean;
  @Prop() readonly relatedCompany!: Company;
  @Prop() readonly relatedCompanies!: Company[];
  @Prop() readonly companyId!: number;

  private formData: SearchPartData = { ...defaultFormData };
  private timeRange: [string, string] | [] = [];

  @Watch("visible")
  onVisibleChange(val: boolean) {
    if (!val) {
      return;
    }
    let localFormData = {};
    try {
      if (localStorage.search) {
        localFormData = JSON.parse(localStorage.search)[TYPE] || {};
      }
    } catch (e) {
      console.log(e);
    }
    this.formData = {
      ...defaultFormData,
      ...localFormData,
      relatedCompanyId: this.relatedCompany?.id
    };
    this.timeRange = [];
  }

  protected searchData(e?: MouseEvent) {
    e?.stopPropagation();
    const localParams = {
      codePattern: this.formData.codePattern,
      customCodePattern: this.formData.customCodePattern
    };
    localStorage.search = JSON.stringify({
      ...(localStorage.search ? JSON.parse(localStorage.search) : {}),
      [TYPE]: localParams
    });
    this.$emit("searchChange", { ...this.getSearchParams() });
  }

  private getSearchParams() {
    const searchParams = {
      ...this.formData,
      billDateStart: this.timeRange.length ? this.timeRange[0] : "",
      billDateEnd: this.timeRange.length ? this.timeRange[1] : ""
    };
    return { ...searchParams };
  }

  private closeDialog(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("close");
  }

  private tab0Focus: string | number | null = "";
  private focusItem: string | number | null = "";
  private setDefaultFoucusBoxVisible = false;

  @Watch("tab0Focus")
  private onTab0FocusChange() {
    if (this.tab0Focus) {
      this.focusItem = this.tab0Focus;
    } else {
      this.focusItem = defaultTab0Focus;
    }
  }

  private getTab0Focus() {
    getStaffSystemParamsDetail({ module: "common", type: "focuse" })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        if (res.value && res.value[TYPE]) {
          this.tab0Focus = res.value[TYPE];
        } else {
          this.focusItem = defaultTab0Focus;
        }
      })
      .catch(() => {
        this.focusItem = defaultTab0Focus;
      });
  }
  private setFoucs(name?: string | number | null) {
    return (
      this.focusItem === name &&
      !this.setDefaultFoucusBoxVisible &&
      !this.setDefaultWarehouseBoxVisible &&
      this.visible
    );
  }
  private showSetDefaultFoucusBox(e?: MouseEvent) {
    e?.stopPropagation();
    this.setDefaultFoucusBoxVisible = true;
  }

  private setDefaultWarehouseBoxVisible = false;
  private warehouseOptions: SelectOptions[] = [];
  private getWarehouseOptions() {
    this.searchLoadAssignWarehouses({
      status: 0,
      assignCompanyId: this.companyId
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then((res: any) => {
      this.warehouseOptions = res || [];
    });
  }
  private getDefualtWarehouses() {
    getStaffSystemParamsDetail({
      module: "webSetting",
      type: "defaultQueryWarehouse"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then((res: any) => {
      if (res.value && res.value[TYPE]) {
        defaultFormData.warehouseIds = res.value[TYPE];
      }
    });
  }
  private shwoDefaultWarehouseBox() {
    this.setDefaultWarehouseBoxVisible = true;
  }
  private handleDefaultWarehouseIdsChange(warehouseIds: number[]) {
    this.formData.warehouseIds = [...warehouseIds];
  }

  mounted() {
    this.getTab0Focus();
    this.getWarehouseOptions();
    this.getDefualtWarehouses();
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        on-close={this.closeDialog}
        title="配件查询"
        top="7vh"
        width="400px"
      >
        <el-form
          submit-on-enter
          size="mini"
          label-width="100px"
          class="form-item-small-margin-bottom"
          style="margin: 10px 10px 0 10px;"
        >
          <el-form-item label="业务日期">
            <ht-date-range
              v-model={this.timeRange}
              shortcuts-type="all"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item label="单据号">
            {this.setFoucs("billNo") ? (
              <ht-input
                v-delay-focus={this.setFoucs("billNo")}
                v-model={this.formData.billNo}
                placeholder="单据号"
              />
            ) : (
              <ht-input v-model={this.formData.billNo} placeholder="单据号" />
            )}
          </el-form-item>
          <el-form-item label="调出分公司">
            {this.setFoucs("relatedCompanyId") ? (
              <ht-autoselect
                v-delay-focus={this.setFoucs("relatedCompanyId")}
                v-model={this.formData.relatedCompanyId}
                options={this.relatedCompanies}
                defaultValue={this.relatedCompany?.name}
                trigger-on-focus={false}
                clearable
                highlight-first-item
                placeholder="调出分公司"
                filterZero
              />
            ) : (
              <ht-autoselect
                v-model={this.formData.relatedCompanyId}
                options={this.relatedCompanies}
                defaultValue={this.relatedCompany?.name}
                trigger-on-focus={false}
                clearable
                highlight-first-item
                placeholder="调出分公司"
                filterZero
              />
            )}
          </el-form-item>
          <el-form-item label="配件编码">
            {this.setFoucs("code") ? (
              <ht-input
                v-delay-focus={this.setFoucs("code")}
                v-model={this.formData.code}
                placeholder="配件编码"
                class="input-with-select"
              >
                <ht-select
                  slot="append"
                  v-model={this.formData.codePattern}
                  clearable={false}
                  options={PART_CODE_WAY}
                  style="width: 100px"
                />
              </ht-input>
            ) : (
              <ht-input
                v-model={this.formData.code}
                placeholder="配件编码"
                class="input-with-select"
              >
                <ht-select
                  slot="append"
                  v-model={this.formData.codePattern}
                  clearable={false}
                  options={PART_CODE_WAY}
                  style="width: 100px"
                />
              </ht-input>
            )}
          </el-form-item>
          <el-form-item label="图号">
            {this.setFoucs("customCode") ? (
              <ht-input
                v-delay-focus={this.setFoucs("customCode")}
                v-model={this.formData.customCode}
                placeholder="图号"
                class="input-with-select"
              >
                <ht-select
                  slot="append"
                  v-model={this.formData.customCodePattern}
                  clearable={false}
                  options={PART_CODE_WAY}
                  style="width: 100px"
                />
              </ht-input>
            ) : (
              <ht-input
                v-model={this.formData.customCode}
                placeholder="图号"
                class="input-with-select"
              >
                <ht-select
                  slot="append"
                  v-model={this.formData.customCodePattern}
                  clearable={false}
                  options={PART_CODE_WAY}
                  style="width: 100px"
                />
              </ht-input>
            )}
          </el-form-item>
          <el-form-item label="配件名称">
            {this.setFoucs("name") ? (
              <ht-autocomplete
                v-delay-focus={this.setFoucs("name")}
                v-model={this.formData.name}
                fetch-suggestions={this.autocompleteSearchPartName}
                trigger-on-focus={false}
                placeholder="配件名称"
                highlight-first-item
                clearable
              />
            ) : (
              <ht-autocomplete
                v-model={this.formData.name}
                fetch-suggestions={this.autocompleteSearchPartName}
                trigger-on-focus={false}
                placeholder="配件名称"
                highlight-first-item
                clearable
              />
            )}
          </el-form-item>
          <el-form-item label="车型/适用车型">
            {this.setFoucs("vehModel") ? (
              <ht-autocomplete
                v-delay-focus={this.setFoucs("vehModel")}
                v-model={this.formData.vehModel}
                fetch-suggestions={this.autocompleteSearchVehModel}
                trigger-on-focus={false}
                placeholder="车型/适用车型"
                clearable
              />
            ) : (
              <ht-autocomplete
                v-model={this.formData.vehModel}
                fetch-suggestions={this.autocompleteSearchVehModel}
                trigger-on-focus={false}
                placeholder="车型/适用车型"
                clearable
              />
            )}
          </el-form-item>
          <el-form-item label="配件品牌">
            {this.setFoucs("brand") ? (
              <ht-autocomplete
                v-delay-focus={this.setFoucs("brand")}
                v-model={this.formData.brand}
                fetch-suggestions={this.autocompleteSearchPartBrand}
                trigger-on-focus={false}
                placeholder="配件品牌"
                highlight-first-item
                clearable
              />
            ) : (
              <ht-autocomplete
                v-model={this.formData.brand}
                fetch-suggestions={this.autocompleteSearchPartBrand}
                trigger-on-focus={false}
                placeholder="配件品牌"
                highlight-first-item
                clearable
              />
            )}
          </el-form-item>
          <el-form-item label="产地">
            {this.setFoucs("productionPlace") ? (
              <ht-autocomplete
                v-delay-focus={this.setFoucs("productionPlace")}
                v-model={this.formData.productionPlace}
                fetch-suggestions={this.autocompleteSearchProductionPlace}
                trigger-on-focus={false}
                placeholder="产地"
                highlight-first-item
                clearable
              />
            ) : (
              <ht-autocomplete
                v-model={this.formData.productionPlace}
                fetch-suggestions={this.autocompleteSearchProductionPlace}
                trigger-on-focus={false}
                placeholder="产地"
                highlight-first-item
                clearable
              />
            )}
          </el-form-item>
          <el-form-item label="配件性质">
            {this.setFoucs("property") ? (
              <ht-autocomplete
                v-delay-focus={this.setFoucs("property")}
                v-model={this.formData.property}
                fetch-suggestions={this.autocompleteSearchProperty}
                trigger-on-focus={false}
                placeholder="配件性质"
                highlight-first-item
                clearable
              />
            ) : (
              <ht-autocomplete
                v-model={this.formData.property}
                fetch-suggestions={this.autocompleteSearchProperty}
                trigger-on-focus={false}
                placeholder="配件性质"
                highlight-first-item
                clearable
              />
            )}
          </el-form-item>
          <el-form-item label="所属仓库">
            <div class="flex-container">
              <ht-select
                v-model={this.formData.warehouseIds}
                options={this.warehouseOptions}
                filterZero
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
                placeholder="所属仓库"
              />
              <el-button type="text" on-click={this.shwoDefaultWarehouseBox}>
                默认值设置
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="规格">
            {this.setFoucs("model") ? (
              <ht-input
                v-delay-focus={this.setFoucs("model")}
                v-model={this.formData.model}
                placeholder="规格"
              />
            ) : (
              <ht-input v-model={this.formData.model} placeholder="规格" />
            )}
          </el-form-item>
          <el-form-item
            label-width="0"
            style="margin-top: 10px; text-align: right"
          >
            <el-button
              type="text"
              size="mini"
              on-click={this.showSetDefaultFoucusBox}
            >
              光标默认锁定设置
            </el-button>
          </el-form-item>
          <el-form-item
            label-width="0"
            style="margin-top: 10px; text-align: center;"
          >
            <el-button
              plain
              type="primary"
              size="mini"
              on-click={this.searchData}
            >
              确定（F3）
            </el-button>
            <el-button
              plain
              type="primary"
              size="mini"
              on-click={this.closeDialog}
            >
              取消（Esc）
            </el-button>
          </el-form-item>
        </el-form>

        <set-default-foucus-box
          visible={this.setDefaultFoucusBoxVisible}
          on={{
            "update:visible": (val: boolean) =>
              (this.setDefaultFoucusBoxVisible = val)
          }}
          v-model={this.tab0Focus}
          options={SET_DEFAULT_FOCUS_OPTIONS}
          type={TYPE}
        />
        <set-default-warehouses-box
          visible={this.setDefaultWarehouseBoxVisible}
          on={{
            "update:visible": (val: boolean) =>
              (this.setDefaultWarehouseBoxVisible = val)
          }}
          v-model={defaultFormData.warehouseIds}
          options={this.warehouseOptions}
          type={TYPE}
          on-change={this.handleDefaultWarehouseIdsChange}
        />
      </ht-dialog>
    );
  }
}
</script>
