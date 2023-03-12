<script lang="tsx">
import { Component, Mixins, Prop } from "vue-property-decorator";
import SearchMixin from "@/mixins/searchMixin";
import { BoxSearchFormData } from "./constants";

const LACK_STATUSES = {
  0: "全部满足",
  1: "缺货"
};

@Component({})
export default class SearchForm extends Mixins(SearchMixin) {
  @Prop() readonly defaultFormData!: BoxSearchFormData;
  @Prop() readonly isTransfer?: boolean;

  private formData: BoxSearchFormData = { ...this.defaultFormData };

  private searchHandle(e: MouseEvent) {
    if (e) {
      e.stopPropagation();
    }
    this.$emit("search", this.formData);
  }
  private resetHandle(e: MouseEvent) {
    if (e) {
      e.stopPropagation();
    }
    this.formData = { ...this.defaultFormData };
  }

  render() {
    return (
      <el-form
        class="form-item-small-margin-bottom"
        label-width="60px"
        label-position="left"
        size="mini"
      >
        <el-row gutter={10}>
          <el-col span={5}>
            <el-form-item label="配件编码">
              <ht-input
                v-model={this.formData.code}
                class="input-with-select"
                placeholder="配件编码"
                size="mini"
              />
            </el-form-item>
            <el-form-item label="配件名称">
              <ht-autocomplete
                v-model={this.formData.name}
                fetch-suggestions={this.autocompleteSearchPartName}
                trigger-on-focus={false}
                placeholder="配件名称"
                highlight-first-item
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="配件品牌">
              <ht-autocomplete
                v-model={this.formData.brand}
                fetch-suggestions={this.autocompleteSearchPartBrand}
                trigger-on-focus={false}
                placeholder="配件品牌"
                highlight-first-item
                clearable
              />
            </el-form-item>
            <el-form-item label="配件分类">
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
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="产地" label-width="95px">
              <ht-autocomplete
                v-model={this.formData.productionPlace}
                fetch-suggestions={this.autocompleteSearchProductionPlace}
                trigger-on-focus={false}
                placeholder="产地"
                highlight-first-item
                clearable
              />
            </el-form-item>
            <el-form-item label="车型/适用车型" label-width="95px">
              <ht-autocomplete
                v-model={this.formData.vehModel}
                fetch-suggestions={this.autocompleteSearchVehModel}
                trigger-on-focus={false}
                placeholder="车型/适用车型"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            {this.isTransfer && (
              <el-form-item label="库存情况">
                <ht-select
                  v-model={this.formData.lackStatus}
                  options={LACK_STATUSES}
                  clearable
                  collapse-tags
                  filterable
                  multiple
                  has-selecte-all-val
                  placeholder="请选择"
                />
              </el-form-item>
            )}
            <el-form-item label="仅看待转调拨出库的配件" label-width="160px">
              <el-switch v-model={this.formData.onlyWaitAlloc} />
            </el-form-item>
            {this.isTransfer || (
              <div style="text-align: left;">
                <el-button
                  type="primary"
                  size="mini"
                  onClick={(e: MouseEvent) => this.searchHandle(e)}
                >
                  查询（F5）
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  onClick={(e: MouseEvent) => this.resetHandle(e)}
                >
                  重置（F6）
                </el-button>
              </div>
            )}
          </el-col>
          {this.isTransfer && (
            <el-col span={4}>
              <div style="text-align: left;">
                <el-button
                  type="primary"
                  size="mini"
                  onClick={(e: MouseEvent) => this.searchHandle(e)}
                >
                  查询（F5）
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  onClick={(e: MouseEvent) => this.resetHandle(e)}
                >
                  重置（F6）
                </el-button>
              </div>
            </el-col>
          )}
        </el-row>
      </el-form>
    );
  }
}
</script>
