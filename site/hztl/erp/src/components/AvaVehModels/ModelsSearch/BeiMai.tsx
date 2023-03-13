import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { getSearchAvaVehOptions } from "@/api/parts/partsModels";
import { BEIMAI } from "@/constants/platform";

export interface SearchFormBeiMaiData {
  vehBrand?: string;
  facBrand?: string;
  vehicleGroup?: string;
  year?: string;
  displacement?: string;
  engine?: string;
  transmission?: string;
  driverType?: string;
  chassisNo?: string;
  salesModel?: string;
  types: number[];
}

interface FormData
  extends Partial<
    Pick<
      SearchFormBeiMaiData,
      | "vehBrand"
      | "facBrand"
      | "vehicleGroup"
      | "year"
      | "displacement"
      | "engine"
      | "transmission"
      | "driverType"
      | "chassisNo"
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
  onChange(params: SearchFormBeiMaiData): void;
}

const defaultFormData: FormData = {
  vehBrand: "",
  vehicleGroup: "",
  year: "",
  displacement: "",
  engine: "",
  transmission: "",
  driverType: "",
  chassisNo: "",
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
export default class BeiMai extends tsc.Component<Props, Events> {
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
        dataSource: BEIMAI,
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
          <el-col span={4}>
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
          <el-col span={4}>
            <el-form-item label="车系" label-width="31px">
              <ht-autocomplete
                v-model={this.formData.vehicleGroup}
                fetch-suggestions={this.getAutocompleteFunc("vehicleGroup")}
                placeholder="车系"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
            <el-form-item label="年款" label-width="31px">
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
          <el-col span={4}>
            <el-form-item label="排量" label-width="73px">
              <ht-autocomplete
                v-model={this.formData.displacement}
                fetch-suggestions={this.getAutocompleteFunc("displacement")}
                placeholder="排量"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
            <el-form-item label="发动机型号" label-width="73px">
              <ht-autocomplete
                v-model={this.formData.engine}
                fetch-suggestions={this.getAutocompleteFunc("engine")}
                placeholder="发动机型号"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col span={4}>
            <el-form-item label="变速箱" label-width="73px">
              <ht-autocomplete
                v-model={this.formData.transmission}
                fetch-suggestions={this.getAutocompleteFunc("transmission")}
                placeholder="变速箱"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
            <el-form-item label="驱动形式">
              <ht-autocomplete
                v-model={this.formData.driverType}
                fetch-suggestions={this.getAutocompleteFunc("driverType")}
                placeholder="驱动形式"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
          </el-col>
          <el-col span={4}>
            <el-form-item label="底盘号">
              <ht-autocomplete
                v-model={this.formData.chassisNo}
                fetch-suggestions={this.getAutocompleteFunc("chassisNo")}
                placeholder="底盘号"
                trigger-on-focus={false}
                maxlength={50}
                highlight-first-item
              />
            </el-form-item>
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
