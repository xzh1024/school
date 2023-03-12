import { Component, Mixins, Prop } from "vue-property-decorator";
import SearchMixin from "@/mixins/searchMixin";
import { BasePartSeacrch, SeacrchMatchText } from "@/constants/part";

const defaultSearchFormData: BasePartSeacrch = {
  code: "",
  codeMatch: "fuzzy",
  vehModel: "",
  categoryName: "",
  customCode: "",
  customCodeMatch: "fuzzy",
  brand: "",
  name: "",
  productionPlace: ""
};

@Component
export default class SearchFrom extends Mixins(SearchMixin) {
  @Prop() readonly loading!: boolean;
  private searchFormData: BasePartSeacrch = { ...defaultSearchFormData };

  private searchChange(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("searchChange", { ...this.searchFormData });
  }

  private resetForm(e?: MouseEvent) {
    e?.stopPropagation();
    this.searchFormData = {
      ...defaultSearchFormData
    };
  }

  mounted() {
    this.searchChange();
  }

  render() {
    return (
      <el-form
        label-position="left"
        size="mini"
        label-width="80px"
        class="form-item-small-margin-bottom"
      >
        <el-row gutter={10}>
          <el-col span={8}>
            <el-form-item label="配件编码" prop="code" label-width="100px">
              <ht-input
                v-model={this.searchFormData.code}
                placeholder="配件编码"
                size="mini"
              >
                <ht-select
                  slot="append"
                  v-model={this.searchFormData.codeMatch}
                  clearable={false}
                  options={SeacrchMatchText}
                  style="width: 100px"
                />
              </ht-input>
            </el-form-item>
            <el-form-item label="配件品牌" prop="brand" label-width="100px">
              <ht-autocomplete
                v-model={this.searchFormData.brand}
                fetch-suggestions={this.autocompleteSearchPartBrand}
                trigger-on-focus={false}
                placeholder="配件品牌"
                highlight-first-item
                clearable
              />
            </el-form-item>
            <el-form-item
              label="车型/适用车型"
              prop="vehModel"
              label-width="100px"
            >
              <ht-autocomplete
                v-model={this.searchFormData.vehModel}
                fetch-suggestions={this.autocompleteSearchVehModel}
                trigger-on-focus={false}
                placeholder="车型/适用车型"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col span={8}>
            <el-form-item label="图号" prop="customCode" label-width="60px">
              <ht-input
                v-model={this.searchFormData.customCode}
                placeholder="图号"
                size="mini"
              >
                <ht-select
                  slot="append"
                  v-model={this.searchFormData.customCodeMatch}
                  clearable={false}
                  options={SeacrchMatchText}
                  style="width: 100px"
                />
              </ht-input>
            </el-form-item>
            <el-form-item
              label="产地"
              prop="productionPlace"
              label-width="60px"
            >
              <ht-autocomplete
                v-model={this.searchFormData.productionPlace}
                fetch-suggestions={this.autocompleteSearchProductionPlace}
                trigger-on-focus={false}
                placeholder="产地"
                highlight-first-item
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col span={8}>
            <el-form-item label="配件名称" prop="name">
              <ht-autocomplete
                v-model={this.searchFormData.name}
                fetch-suggestions={this.autocompleteSearchPartName}
                trigger-on-focus={false}
                placeholder="配件名称"
                highlight-first-item
                clearable
              />
            </el-form-item>
            <el-form-item label="配件分类" prop="categoryName">
              <ht-autoselect
                v-model={this.searchFormData.categoryName}
                fetch-suggestions={this.searchLoadCategory}
                remote
                filter-zero
                clearable
                trigger-on-focus={false}
                highlight-first-item
                placeholder="配件分类"
              />
            </el-form-item>
            <div style="text-align: right;">
              <el-button
                type="primary"
                size="mini"
                onClick={this.searchChange}
                loading={this.loading}
              >
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" onClick={this.resetForm}>
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    );
  }
}
