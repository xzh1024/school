<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";

export interface SearchEpcModelsFormData {
  vehBrand?: string;
  facBrand?: string;
  vehicleGroup?: string;
  year?: string;
  displacement?: string;
  engine?: string;
  displacementEngine?: string;
  transmission?: string;
  salesModel?: string;
}

interface Props {
  visible: boolean;
  loading: boolean;
}
interface Events {
  onChange(params: SearchEpcModelsFormData): void;
}

const defaultFormData: SearchEpcModelsFormData = {
  vehBrand: "",
  facBrand: "",
  vehicleGroup: "",
  year: "",
  displacementEngine: "",
  transmission: "",
  salesModel: ""
};

@Component
export default class EpcModelsSearch extends tsc.Component<Props, Events> {
  @Prop() readonly loading!: boolean;
  @Prop() readonly visible!: boolean;
  private searchFormData = {
    ...defaultFormData
  };
  private search(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("change", {
      ...this.searchFormData
    });
  }
  private resetParams(e?: MouseEvent) {
    e?.stopPropagation();
    this.searchFormData = {
      ...defaultFormData
    };
  }
  private getEpccompleteFunc(type: string) {
    //自己做过滤
    console.log(type);
    return (query: string, cb: Function) => cb([]);
  }
  @Watch("visible", { immediate: true })
  onVisibleChange(val: boolean) {
    if (val) {
      this.$nextTick(() => {
        this.resetParams();
        this.search();
      });
    }
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
          <el-col span={6}>
            <el-form-item label="品牌" label-width="31px">
              <ht-autocomplete
                v-model={this.searchFormData.vehBrand}
                fetch-suggestions={this.getEpccompleteFunc("vehBrand")}
                placeholder="品牌"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
            <el-form-item label="厂牌" label-width="31px">
              <ht-autocomplete
                v-model={this.searchFormData.facBrand}
                fetch-suggestions={this.getEpccompleteFunc("facBrand")}
                placeholder="厂牌"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label="车型组" label-width="45px">
              <ht-autocomplete
                v-model={this.searchFormData.vehicleGroup}
                fetch-suggestions={this.getEpccompleteFunc("vehicleGroup")}
                placeholder="车型组"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
            <el-form-item label="年款" label-width="45px">
              <ht-autocomplete
                v-model={this.searchFormData.year}
                fetch-suggestions={this.getEpccompleteFunc("year")}
                placeholder="年款"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label="排量｜发动机" label-width="87px">
              <ht-autocomplete
                v-model={this.searchFormData.displacementEngine}
                fetch-suggestions={this.getEpccompleteFunc(
                  "displacementEngine"
                )}
                placeholder="排量｜发动机"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
            <el-form-item label="变速箱" label-width="87px">
              <ht-autocomplete
                v-model={this.searchFormData.transmission}
                fetch-suggestions={this.getEpccompleteFunc("transmission")}
                placeholder="变速箱"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col span={6}>
            <el-form-item label="销售版型">
              <ht-autocomplete
                v-model={this.searchFormData.salesModel}
                fetch-suggestions={this.getEpccompleteFunc("salesModel")}
                placeholder="销售版型"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
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
