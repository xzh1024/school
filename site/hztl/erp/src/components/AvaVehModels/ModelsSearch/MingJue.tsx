import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { getSearchAvaVehOptions } from "@/api/parts/partsModels";
import { MINGJUE } from "@/constants/platform";

export interface SearchFormMingJueData {
  vehBrand?: string;
  facBrand?: string;
  vehicleGroup?: string;
  year?: string;
  displacementEngine?: string;
  transmission?: string;
  salesModel?: string;
  types: number[];
}

interface FormData
  extends Partial<
    Pick<
      SearchFormMingJueData,
      | "vehBrand"
      | "facBrand"
      | "vehicleGroup"
      | "year"
      | "displacementEngine"
      | "transmission"
      | "salesModel"
    >
  > {
  types: string[];
}

interface Props {
  visible: boolean;
  partId: number;
  loading: boolean;
}
interface Events {
  onChange(params: SearchFormMingJueData): void;
}

const defaultFormData: FormData = {
  vehBrand: "",
  facBrand: "",
  vehicleGroup: "",
  year: "",
  displacementEngine: "",
  transmission: "",
  salesModel: "",
  types: ["1", "2,3"]
};

// type选项标准是单个值"2,3"，转换成两个值"2","3"
function formateType(types: string[]) {
  return types
    .toString()
    .split(",")
    .map(item => Number(item));
}

@Component
export default class MingJue extends tsc.Component<Props, Events> {
  @Prop() readonly visible!: boolean;
  @Prop() readonly loading!: boolean;
  @Prop() readonly partId!: number;

  private formData = {
    ...defaultFormData
  };
  private search(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("change", {
      ...this.formData,
      types: formateType(this.formData.types)
    });
  }
  private resetParams(e?: MouseEvent) {
    e?.stopPropagation();
    this.formData = {
      ...defaultFormData
    };
  }
  private getAutocompleteFunc(type: string) {
    return (query: string, cb: Function) =>
      getSearchAvaVehOptions({
        dataSource: MINGJUE,
        partId: this.partId,
        fieldType: type,
        ...this.formData,
        types: formateType(this.formData.types)
      }).then(res => {
        const data = res || [];
        cb(data.map(item => ({ value: item })));
      });
  }
  @Watch("visible", { immediate: true })
  onVisibleChange(val: boolean) {
    if (val) {
      this.resetParams();
      this.$nextTick(() => {
        this.search();
      });
    }
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
            <el-form-item label="品牌" label-width="31px">
              <ht-autocomplete
                v-model={this.formData.vehBrand}
                fetch-suggestions={this.getAutocompleteFunc("vehBrand")}
                placeholder="品牌"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
            <el-form-item label="厂牌" label-width="31px">
              <ht-autocomplete
                v-model={this.formData.facBrand}
                fetch-suggestions={this.getAutocompleteFunc("facBrand")}
                placeholder="厂牌"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="车型组" label-width="45px">
              <ht-autocomplete
                v-model={this.formData.vehicleGroup}
                fetch-suggestions={this.getAutocompleteFunc("vehicleGroup")}
                placeholder="车型组"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
            <el-form-item label="年款" label-width="45px">
              <ht-autocomplete
                v-model={this.formData.year}
                fetch-suggestions={this.getAutocompleteFunc("year")}
                placeholder="年款"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="排量｜发动机" label-width="87px">
              <ht-autocomplete
                v-model={this.formData.displacementEngine}
                fetch-suggestions={this.getAutocompleteFunc(
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
                fetch-suggestions={this.getAutocompleteFunc("transmission")}
                placeholder="变速箱"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col span={5}>
            <el-form-item label="销售版型">
              <ht-autocomplete
                v-model={this.formData.salesModel}
                fetch-suggestions={this.getAutocompleteFunc("salesModel")}
                placeholder="销售版型"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
            <el-form-item label="类型">
              <el-checkbox-group v-model={this.formData.types}>
                <el-checkbox label="1">自定义</el-checkbox>
                <el-checkbox label="2,3">标准</el-checkbox>
              </el-checkbox-group>
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
