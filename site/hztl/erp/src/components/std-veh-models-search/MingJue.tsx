import { Component, Prop } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { getSearchAutoAvaVehModelsOptions } from "@/api/parts/partsModels";
import { MINGJUE } from "@/constants/platform";

export interface FormMingJueData {
  vehBrand?: string;
  facBrand?: string;
  vehicleGroup?: string;
  year?: string;
  displacementEngine?: string;
  transmission?: string;
  salesModel?: string;
  existedInStock?: boolean;
}

interface Props {
  delayFocus: boolean;
  existedInStock?: boolean;
}

interface Events {
  onChange(params: FormMingJueData): void;
  onClose(): void;
}

const defaultFormData: FormMingJueData = {
  vehBrand: "",
  facBrand: "",
  vehicleGroup: "",
  year: "",
  displacementEngine: "",
  transmission: "",
  salesModel: "",
  existedInStock: true
};

@Component
export default class MingJue extends tsc.Component<Props, Events> {
  @Prop() readonly delayFocus!: boolean;
  @Prop() readonly existedInStock?: boolean;
  @Prop() readonly hasImage?: boolean;
  private formData = {
    ...defaultFormData,
    existedInStock: this.existedInStock,
    hasImage: this.hasImage
  };
  private searchHandle(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("change", {
      ...this.formData
    });
  }
  private cancelHandle(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("close");
  }
  private localSave() {
    this.$emit("localSave", { ...this.formData });
  }
  private getAutocompleteFunc(type: string) {
    return (query: string, cb: Function) =>
      getSearchAutoAvaVehModelsOptions({
        dataSource: MINGJUE,
        fieldType: type,
        ...this.formData
      }).then(res => {
        const data = res || [];
        cb(data.map(item => ({ value: item })));
      });
  }

  render() {
    return (
      <el-form
        size="mini"
        label-width="100px"
        class="form-item-small-margin-bottom mt-1"
        submit-on-enter
      >
        <el-form-item label="品牌">
          <ht-autocomplete
            v-delay-focus={this.delayFocus}
            v-model={this.formData.vehBrand}
            fetch-suggestions={this.getAutocompleteFunc("vehBrand")}
            placeholder="品牌"
            trigger-on-focus={false}
            maxlength={50}
            highlight-first-item
            clearable
          />
        </el-form-item>
        <el-form-item label="厂牌">
          <ht-autocomplete
            v-model={this.formData.facBrand}
            fetch-suggestions={this.getAutocompleteFunc("facBrand")}
            placeholder="厂牌"
            trigger-on-focus={false}
            maxlength={50}
            highlight-first-item
            clearable
          />
        </el-form-item>
        <el-form-item label="车型组">
          <ht-autocomplete
            v-model={this.formData.vehicleGroup}
            fetch-suggestions={this.getAutocompleteFunc("vehicleGroup")}
            placeholder="车型组"
            trigger-on-focus={false}
            maxlength={50}
            highlight-first-item
            clearable
          />
        </el-form-item>
        <el-form-item label="年款">
          <ht-autocomplete
            v-model={this.formData.year}
            fetch-suggestions={this.getAutocompleteFunc("year")}
            placeholder="年款"
            trigger-on-focus={false}
            maxlength={50}
            highlight-first-item
            clearable
          />
        </el-form-item>
        <el-form-item label="排量｜发动机">
          <ht-autocomplete
            v-model={this.formData.displacementEngine}
            fetch-suggestions={this.getAutocompleteFunc("displacementEngine")}
            placeholder="排量｜发动机"
            trigger-on-focus={false}
            maxlength={50}
            highlight-first-item
            clearable
          />
        </el-form-item>
        <el-form-item label="变速箱">
          <ht-autocomplete
            v-model={this.formData.transmission}
            fetch-suggestions={this.getAutocompleteFunc("transmission")}
            placeholder="变速箱"
            trigger-on-focus={false}
            maxlength={50}
            highlight-first-item
            clearable
          />
        </el-form-item>
        <el-form-item label="销售版型">
          <ht-input
            v-model={this.formData.salesModel}
            maxlength={50}
            placeholder="销售版型"
          />
        </el-form-item>
        {this.hasImage !== undefined ? (
          <el-checkbox
            class="m-l-27"
            label="仅查询无配件图片的配件"
            v-model={this.formData.hasImage}
            on-change={this.localSave}
          />
        ) : null}
        {this.existedInStock !== undefined ? (
          <el-checkbox
            class="m-l-27"
            label="仅查询有库存记录的商品"
            v-model={this.formData.existedInStock}
            on-change={this.localSave}
          />
        ) : null}
        {this.$slots.default}
        <el-form-item
          label-width="0"
          style="margin-top: 10px; text-align: center;"
        >
          <el-button
            type="primary"
            size="mini"
            plain
            on-click={this.searchHandle}
          >
            确定（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            plain
            on-click={this.cancelHandle}
          >
            取消（Esc）
          </el-button>
        </el-form-item>
      </el-form>
    );
  }
}
