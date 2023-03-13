<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { Form } from "hztl-ui";
import SearchMixin from "@/mixins/searchMixin";
import ParsingCodes from "@/components/parsingCodes";
import { PART_CODE_WAY } from "@/constants";
import SetDefaultFoucusBox from "@/components/SetDefaultFoucusBox/index.vue";
import SetDefaultWarehousesBox from "@/components/SetDefaultWarehousesBox/index.vue";
import { getStaffSystemParamsDetail } from "@/api/base/base";
import { Company } from "@/views/transfer/interface";
import { SelectOptions } from "@/constants/interface";
import { ApplySearchParams } from "./services";
import { TYPE } from "../../constants";

export type SearchFormData = Partial<
  Pick<
    ApplySearchParams,
    | "allocOutCompanyId"
    | "code"
    | "codePattern"
    | "customCode"
    | "customCodePattern"
    | "name"
    | "vehModel"
    | "brand"
    | "productionPlace"
    | "property"
    | "warehouseIds"
    | "categoryName"
    | "category"
    | "model"
    | "filterZero"
    | "codes"
    | "demandQties"
    | "sort"
  >
>;

const RULES = {
  allocOutCompanyId: [
    { required: true, message: "请选择调出分公司", trigger: "change" }
  ]
};

const defaultFormData: SearchFormData = {
  allocOutCompanyId: 0,
  code: "",
  codePattern: 0,
  customCode: "",
  customCodePattern: 0,
  name: "",
  vehModel: "",
  brand: "",
  productionPlace: "",
  property: "",
  warehouseIds: [],
  categoryName: "",
  model: "",
  codes: [],
  demandQties: []
};

const TABS = [
  { id: "accurate", name: "精确查询" },
  { id: "batch", name: "批量查询" }
];

const SET_DEFAULT_FOCUS_OPTIONS = [
  { id: "allocOutCompanyId", name: "调出分公司" },
  { id: "code", name: "配件编码" },
  { id: "customCode", name: "图号" },
  { id: "name", name: "配件名称" },
  { id: "vehModel", name: "车型/适用车型" },
  { id: "brand", name: "配件品牌" },
  { id: "productionPlace", name: "产地" },
  { id: "property", name: "配件性质" },
  { id: "categoryName", name: "配件分类" },
  { id: "model", name: "规格" }
];

@Component({
  components: {
    ParsingCodes,
    SetDefaultFoucusBox,
    SetDefaultWarehousesBox
  }
})
export default class SearchPartsBox extends Mixins(SearchMixin) {
  public $refs!: {
    form: Form;
  };

  @Prop() readonly disabledRelatedCompany!: boolean;
  @Prop() readonly relatedCompanies!: Company[];
  @Prop() readonly companyId!: number;
  @Prop() readonly relatedCompanyId!: number;
  @Prop() readonly visible!: boolean;
  @Prop() readonly loading!: boolean;

  private batchData: { code: string; num: string }[] = [];
  private activeTab = TABS[0].id;
  private formData = {
    ...defaultFormData
  };

  get isBatch() {
    return this.activeTab === TABS[1].id;
  }

  get defaultTab0Focus() {
    return this.disabledRelatedCompany ? "code" : "allocOutCompanyId";
  }

  @Watch("visible")
  onVisibleChange() {
    if (this.visible) {
      this.batchData = [];
      this.activeTab = TABS[0].id;
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
        allocOutCompanyId: this.relatedCompanyId
      };
      this.warehouseOptions = [];
      this.handleAllocOutCompanyIdChange(this.formData.allocOutCompanyId);
      this.cacheWarehouseIds = this.formData.warehouseIds;
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
    }
  }

  protected searchData(e?: MouseEvent) {
    e?.stopPropagation();
    if (this.getFormValid()) {
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
  }

  private getFormValid() {
    let flag = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$refs.form.validate((valid, err: any) => {
      if (!valid) {
        flag = false;
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips, showClose: true });
      }
    });
    return flag;
  }

  private getSearchParams() {
    const searchParams = {
      ...this.formData,
      code: this.isBatch ? undefined : this.formData.code,
      codes: this.isBatch ? this.batchData.map(item => item.code) : undefined,
      demandQties: this.isBatch
        ? this.batchData.map(item => item.num)
        : undefined
    };
    return {
      ...searchParams
    };
  }

  private cacheWarehouseIds: number[] | undefined = [];
  private warehouseOptions: SelectOptions[] = [];
  private setDefaultWarehouseBoxVisible = false;
  private async handleAllocOutCompanyIdChange(allocOutCompanyId?: number) {
    this.warehouseOptions = (await this.getWarehouseOptions(
      allocOutCompanyId
    )) as SelectOptions[];
    this.formData.warehouseIds = [];
    if (this.warehouseOptions.length && this.cacheWarehouseIds?.length) {
      this.cacheWarehouseIds.forEach(warehouseId => {
        const warehouse = this.warehouseOptions.find(
          item => warehouseId === item.id
        );
        if (warehouse) {
          this.formData.warehouseIds?.push(warehouseId);
        }
      });
    }
    defaultFormData.warehouseIds = (await this.getDefualtWarehouses(
      allocOutCompanyId
    )) as number[];
    if (!this.formData.warehouseIds.length) {
      this.formData.warehouseIds = [...defaultFormData.warehouseIds];
    }
  }
  private getWarehouseOptions(allocOutCompanyId?: number) {
    return new Promise((resolve: Function) => {
      if (allocOutCompanyId) {
        this.searchLoadAllocWarehouses({
          status: 0,
          inCompanyId: Number(this.companyId || 0),
          outCompanyId: Number(allocOutCompanyId || 0)
        })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((res: any) => {
            resolve(res || []);
          })
          .catch(() => {
            resolve([]);
          });
      } else {
        resolve([]);
      }
    });
  }
  private getDefualtWarehouses(allocOutCompanyId?: number) {
    return new Promise((resolve: Function) => {
      if (allocOutCompanyId) {
        getStaffSystemParamsDetail({
          module: "webSetting",
          type: "defaultQueryWarehouse"
        })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((res: any) => {
            if (res.value && res.value[`${TYPE}${allocOutCompanyId}`]) {
              resolve(res.value[`${TYPE}${allocOutCompanyId}`]);
            } else {
              resolve([]);
            }
          })
          .catch(() => {
            resolve([]);
          });
      } else {
        resolve([]);
      }
    });
  }
  private shwoDefaultWarehouseBox() {
    this.setDefaultWarehouseBoxVisible = true;
  }
  private handleDefaultWarehouseIdsChange(warehouseIds: number[]) {
    this.formData.warehouseIds = [...warehouseIds];
  }
  private handlewarehouseIdChange(warehouseIds?: number[]) {
    if (!warehouseIds) return;
    this.cacheWarehouseIds = [...warehouseIds];
  }

  private closeDialog(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("close");
  }

  private tab0Focus: string | number | null = "";
  private focusItem: string | number | null = "";
  private setDefaultFoucusBoxVisible = false;

  @Watch("activeTab")
  private onActiveTabChange() {
    if (this.activeTab === TABS[0].id) {
      this.focusItem = this.tab0Focus || this.defaultTab0Focus;
    } else {
      this.focusItem = "";
    }
  }
  @Watch("tab0Focus")
  private onTab0FocusChange() {
    if (this.tab0Focus) {
      this.focusItem = this.tab0Focus;
    } else {
      this.focusItem = this.defaultTab0Focus;
    }
  }

  private getTab0Focus() {
    getStaffSystemParamsDetail({ module: "common", type: "focuse" })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        if (res.value && res.value[TYPE]) {
          this.tab0Focus = res.value[TYPE];
        } else {
          this.focusItem = this.defaultTab0Focus;
        }
      })
      .catch(() => {
        this.focusItem = this.defaultTab0Focus;
      });
  }
  private setFoucs(name: string | number | null) {
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

  mounted() {
    this.getTab0Focus();
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
        <ht-tabs
          v-model={this.activeTab}
          tabs={TABS}
          class="tabs-regular"
          style="margin: 0"
        />

        <el-form
          ref="form"
          submit-on-enter
          label-width="100px"
          class="form-item-small-margin-bottom mt-1"
          size="mini"
          attrs={{
            model: this.formData
          }}
          rules={RULES}
          show-message={false}
        >
          <el-form-item prop="allocOutCompanyId" label="调出分公司">
            {this.isBatch ? (
              <ht-autoselect
                key={this.isBatch}
                v-delay-focus={this.isBatch}
                v-model={this.formData.allocOutCompanyId}
                options={this.relatedCompanies}
                clearable={false}
                trigger-on-focus={false}
                placeholder="调出分公司"
                highlight-first-item
                disabled={!!this.disabledRelatedCompany}
                onChange={this.handleAllocOutCompanyIdChange}
              />
            ) : this.setFoucs("allocOutCompanyId") ? (
              <ht-autoselect
                v-delay-focus={this.setFoucs("allocOutCompanyId")}
                v-model={this.formData.allocOutCompanyId}
                options={this.relatedCompanies}
                clearable={false}
                trigger-on-focus={false}
                placeholder="调出分公司"
                highlight-first-item
                disabled={!!this.disabledRelatedCompany}
                onChange={this.handleAllocOutCompanyIdChange}
              />
            ) : (
              <ht-autoselect
                v-model={this.formData.allocOutCompanyId}
                options={this.relatedCompanies}
                clearable={false}
                trigger-on-focus={false}
                placeholder="调出分公司"
                highlight-first-item
                disabled={!!this.disabledRelatedCompany}
                onChange={this.handleAllocOutCompanyIdChange}
              />
            )}
          </el-form-item>
          {this.isBatch || (
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
          )}
          <el-form-item label="图号">
            {!this.isBatch && this.setFoucs("customCode") ? (
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
            {!this.isBatch && this.setFoucs("name") ? (
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
            {!this.isBatch && this.setFoucs("vehModel") ? (
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
            {!this.isBatch && this.setFoucs("brand") ? (
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
            {!this.isBatch && this.setFoucs("productionPlace") ? (
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
            {!this.isBatch && this.setFoucs("property") ? (
              <ht-autocomplete
                v-delay-focus={this.setFoucs("property")}
                v-model={this.formData.property}
                fetch-suggestions={this.autocompleteSearchProperty}
                trigger-on-focus={false}
                placeholder="配件性质"
                clearable
              />
            ) : (
              <ht-autocomplete
                v-model={this.formData.property}
                fetch-suggestions={this.autocompleteSearchProperty}
                trigger-on-focus={false}
                placeholder="配件性质"
                clearable
              />
            )}
          </el-form-item>
          <el-form-item label="所属仓库">
            <div class="flex-container">
              <ht-select
                disabled={!this.formData.allocOutCompanyId}
                v-model={this.formData.warehouseIds}
                options={this.warehouseOptions}
                filterZero
                clearable
                collapse-tags
                filterable
                multiple
                has-selecte-all-val
                placeholder="所属仓库"
                onChange={this.handlewarehouseIdChange}
              />
              <el-button
                disabled={!this.formData.allocOutCompanyId}
                type="text"
                on-click={this.shwoDefaultWarehouseBox}
              >
                默认值设置
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="配件分类">
            {!this.isBatch && this.setFoucs("categoryName") ? (
              <ht-autoselect
                v-delay-focus={this.setFoucs("categoryName")}
                v-model={this.formData.categoryName}
                fetch-suggestions={this.searchLoadCategory}
                remote
                filter-zero
                clearable
                trigger-on-focus={false}
                highlight-first-item
                placeholder="配件分类"
              />
            ) : (
              <ht-autoselect
                v-model={this.formData.categoryName}
                fetch-suggestions={this.searchLoadCategory}
                remote
                filter-zero
                clearable
                trigger-on-focus={false}
                highlight-first-item
                placeholder="配件分类"
              />
            )}
          </el-form-item>
          {!this.isBatch ? (
            <el-form-item label="规格">
              {!this.isBatch && this.setFoucs("model") ? (
                <ht-input
                  v-delay-focus={this.setFoucs("model")}
                  v-model={this.formData.model}
                  placeholder="规格"
                />
              ) : (
                <ht-input v-model={this.formData.model} placeholder="规格" />
              )}
            </el-form-item>
          ) : null}
          {this.isBatch ? (
            <el-form-item label="批量查询">
              <parsing-codes v-model={this.batchData} />
            </el-form-item>
          ) : null}

          {!this.isBatch ? (
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
          ) : null}
          <el-form-item label-width="0" class="dialog-footer-align mt-1">
            <el-button
              type="primary"
              size="mini"
              plain
              on-click={this.searchData}
              loading={this.loading}
            >
              查询（F3）
            </el-button>
            <el-button
              type="primary"
              plain
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
          type={`${TYPE}${this.formData.allocOutCompanyId}`}
          on-change={this.handleDefaultWarehouseIdsChange}
        />
      </ht-dialog>
    );
  }
}
</script>
