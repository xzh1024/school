<script>
import { searchMixin } from "@/mixins";

export default {
  name: "BoxSearchForm",
  mixins: [searchMixin],
  props: {
    defaultFormData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: { ...this.defaultFormData }
    };
  },
  methods: {
    searchHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.$emit("search", this.formData);
    },
    resetHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.formData = { ...this.defaultFormData };
    }
  },

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
          <el-col span={4}>
            <el-form-item label="配件性质">
              <ht-autocomplete
                v-model={this.formData.property}
                fetch-suggestions={this.autocompleteSearchProperty}
                trigger-on-focus={false}
                placeholder="配件性质"
                highlight-first-item
                clearable
              />
            </el-form-item>
            <el-form-item label="产地">
              <ht-autocomplete
                v-model={this.formData.productionPlace}
                fetch-suggestions={this.autocompleteSearchProductionPlace}
                trigger-on-focus={false}
                placeholder="产地"
                highlight-first-item
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label="车型/适用车型" label-width="95px">
              <ht-autocomplete
                v-model={this.formData.vehModel}
                fetch-suggestions={this.autocompleteSearchVehModel}
                trigger-on-focus={false}
                placeholder="车型/适用车型"
                clearable
              />
            </el-form-item>
            <el-form-item label="仅看待转采购的配件" label-width="130px">
              <el-switch v-model={this.formData.onlyWaitPurchase} />
            </el-form-item>
          </el-col>
          <el-col span={4}>
            <el-form-item class="placeholder-form-item">
              <br class="placeholder-form-item" />
            </el-form-item>
            <div style="text-align: right;">
              <el-button
                type="primary"
                size="mini"
                onClick={e => this.searchHandle(e)}
              >
                查询（F5）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                onClick={e => this.resetHandle(e)}
              >
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    );
  }
};
</script>
