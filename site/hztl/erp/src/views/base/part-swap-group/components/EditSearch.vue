<script lang="tsx">
import { Component, Model, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { SearchSwapGroupParams } from "@/api/parts/swapGroup";

export interface EditSearchParams {
  code: string;
  codePattern: number;
  name: string;
  brand: string;
  productionPlace: string;
}

interface Props {
  loading: boolean;
  value?: EditSearchParams;
}
interface Events {
  onChange(params: SearchSwapGroupParams): void;
}

export const defaultFormData = {
  code: "",
  codePattern: 0,
  name: "",
  brand: "",
  productionPlace: ""
};

@Component
export default class EditSearch extends tsc.Component<Props, Events> {
  @Prop() readonly loading!: boolean;
  @Model("change") readonly value!: EditSearchParams;
  @Watch("value")
  onValueChange(val: EditSearchParams) {
    this.searchFormData = { ...val };
  }
  private searchFormData = {
    ...defaultFormData
  };
  private search(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("change", { ...this.searchFormData });
  }
  private resetParams(e?: MouseEvent) {
    e?.stopPropagation();
    this.searchFormData = {
      ...defaultFormData
    };
  }
  mounted() {
    this.search();
  }
  render() {
    return (
      <el-form
        label-position="left"
        size="mini"
        class="form-item-small-margin-bottom"
        label-width="60px"
      >
        <el-row gutter={10}>
          <el-col span={5}>
            <el-form-item label="配件编码">
              <ht-input
                placeholder="请输入内容"
                v-model={this.searchFormData.code}
              />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label="配件名称">
              <ht-input
                placeholder="配件名称"
                v-model={this.searchFormData.name}
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="配件品牌">
              <ht-input
                placeholder="配件品牌"
                v-model={this.searchFormData.brand}
              />
            </el-form-item>
          </el-col>
          <el-col span={4}>
            <el-form-item label="产地" label-width="31px">
              <ht-input
                placeholder="产地"
                v-model={this.searchFormData.productionPlace}
              />
            </el-form-item>
          </el-col>
          <el-col span={4}>
            <div style="text-align: right;">
              <el-button
                type="primary"
                size="mini"
                on-click={this.search}
                loading={this.loading}
              >
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" on-click={this.resetParams}>
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    );
  }
}
</script>
