import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { getSearchSysAvaVehModelsOptions } from "@/api/parts/partsModels";
import { MINGJUE } from "@/constants/platform";

export interface SearchSysFormMingJueData {
  vehBrand?: string;
  facBrand?: string;
  vehicleGroup?: string;
  year?: string;
  displacementEngine?: string;
  transmission?: string;
  salesModel?: string;
}

interface Props {
  visible: boolean;
  loading: boolean;
}
interface Events {
  onChange(params: SearchSysFormMingJueData): void;
}

const defaultFormData: SearchSysFormMingJueData = {
  vehBrand: "",
  facBrand: "",
  vehicleGroup: "",
  year: "",
  displacementEngine: "",
  transmission: "",
  salesModel: ""
};

@Component
export default class MingJue extends tsc.Component<Props, Events> {
  @Prop() readonly loading!: boolean;
  @Prop() readonly visible!: boolean;
  private formData = {
    ...defaultFormData
  };
  private search(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("change", {
      ...this.formData
    });
  }
  private resetParams(e?: MouseEvent) {
    e?.stopPropagation();
    this.formData = {
      ...defaultFormData
    };
  }
  private getSyscompleteFunc(type: string) {
    return (query: string, cb: Function) =>
      getSearchSysAvaVehModelsOptions({
        dataSource: MINGJUE,
        fieldType: type,
        ...this.formData
      }).then(res => {
        const data = res || [];
        cb(data.map(item => ({ value: item })));
      });
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
                v-model={this.formData.vehBrand}
                fetch-suggestions={this.getSyscompleteFunc("vehBrand")}
                placeholder="品牌"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
            <el-form-item label="厂牌" label-width="31px">
              <ht-autocomplete
                v-model={this.formData.facBrand}
                fetch-suggestions={this.getSyscompleteFunc("facBrand")}
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
                v-model={this.formData.vehicleGroup}
                fetch-suggestions={this.getSyscompleteFunc("vehicleGroup")}
                placeholder="车型组"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
            <el-form-item label="年款" label-width="45px">
              <ht-autocomplete
                v-model={this.formData.year}
                fetch-suggestions={this.getSyscompleteFunc("year")}
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
                v-model={this.formData.displacementEngine}
                fetch-suggestions={this.getSyscompleteFunc(
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
                v-model={this.formData.transmission}
                fetch-suggestions={this.getSyscompleteFunc("transmission")}
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
                v-model={this.formData.salesModel}
                fetch-suggestions={this.getSyscompleteFunc("salesModel")}
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
