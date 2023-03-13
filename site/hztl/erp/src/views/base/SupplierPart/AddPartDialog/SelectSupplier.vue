<script lang="tsx">
import { Component, Mixins, Model, Watch } from "vue-property-decorator";
import SearchMixin from "@/mixins/searchMixin";
import { SupplierSelectItem } from "../interface";

@Component
export default class SelectSupplier extends Mixins(SearchMixin) {
  @Model("change") readonly value!: SupplierSelectItem[];
  private supplierList: SupplierSelectItem[] = [];

  private selectChange(supplier: SupplierSelectItem) {
    if (this.supplierList.every(item => item.id !== supplier.id)) {
      this.supplierList.push(supplier);
    }
  }

  private removeSupplier(id: number) {
    this.supplierList = this.supplierList.filter(item => item.id !== id);
  }
  private hasDifferentData() {
    return (
      this.value.length !== this.supplierList.length ||
      !this.supplierList.every(item => this.value.find(it => it.id === item.id))
    );
  }
  @Watch("value", { immediate: true })
  onValueChange() {
    if (this.hasDifferentData()) {
      this.supplierList = [...this.value];
    }
  }

  @Watch("supplierList")
  onSupplierListChange() {
    if (this.hasDifferentData()) {
      this.$emit("change", this.supplierList);
    }
  }

  render() {
    return (
      <el-form
        label-position="left"
        size="mini"
        label-width="100px"
        class="form-item-small-margin-bottom"
      >
        <el-row gutter={10}>
          <el-col span={8}>
            <el-form-item label="供应商">
              <ht-autoselect
                value=""
                remote
                fetch-suggestions={this.searchLoadAllSupplierCooperators}
                trigger-on-focus={false}
                onSelectObjChange={this.selectChange}
                placeholder="选择添加供应商"
                highlight-first-item
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col span={16}>
            <div class="selected-container">
              {this.supplierList.map(item => (
                <div
                  class="selected-block"
                  onClick={() => this.removeSupplier(item.id)}
                >
                  {item.name}&emsp;
                  <i class="el-icon-close" />
                </div>
              ))}
            </div>
          </el-col>
        </el-row>
      </el-form>
    );
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.selected-container {
  display: flex;
  flex-wrap: wrap;
}
.selected-block {
  display: inline-block;
  margin: 0 5px 5px;
  padding: 5px 10px;
  background-color: $color-primary;
  @include background_color("color-primary");
  color: #fff;
  cursor: pointer;
}
</style>
