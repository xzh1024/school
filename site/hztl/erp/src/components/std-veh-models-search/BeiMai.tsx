import { Component, Prop } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { getSearchAutoAvaVehModelsOptions } from "@/api/parts/partsModels";
import { BEIMAI } from "@/constants/platform";

export interface FormBeiMaiData {
  vehBrand?: string;
  vehicleGroup?: string;
  year?: string;
  displacement?: string;
  engine?: string;
  transmission?: string;
  driverType?: string;
  chassisNo?: string;
  salesModel?: string;
  existedInStock?: boolean;
}

interface Props {
  delayFocus: boolean;
  existedInStock?: boolean;
}

interface Events {
  onChange(params: FormBeiMaiData): void;
  onClose(): void;
}

const defaultFormData: FormBeiMaiData = {
  vehBrand: "",
  vehicleGroup: "",
  year: "",
  displacement: "",
  engine: "",
  transmission: "",
  driverType: "",
  chassisNo: "",
  salesModel: "",
  existedInStock: true
};

@Component
export default class BeiMai extends tsc.Component<Props, Events> {
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
        dataSource: BEIMAI,
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
        <el-form-item label="车系">
          <ht-autocomplete
            v-model={this.formData.vehicleGroup}
            fetch-suggestions={this.getAutocompleteFunc("vehicleGroup")}
            placeholder="车系"
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
        <el-form-item label="排量">
          <ht-autocomplete
            v-model={this.formData.displacement}
            fetch-suggestions={this.getAutocompleteFunc("displacement")}
            placeholder="排量"
            trigger-on-focus={false}
            maxlength={50}
            highlight-first-item
            clearable
          />
        </el-form-item>
        <el-form-item label="发动机型号">
          <ht-autocomplete
            v-model={this.formData.engine}
            fetch-suggestions={this.getAutocompleteFunc("engine")}
            placeholder="发动机型号"
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
        <el-form-item label="驱动形式">
          <ht-autocomplete
            v-model={this.formData.driverType}
            fetch-suggestions={this.getAutocompleteFunc("driverType")}
            placeholder="驱动形式"
            trigger-on-focus={false}
            maxlength={50}
            highlight-first-item
            clearable
          />
        </el-form-item>
        <el-form-item label="底盘号">
          <ht-autocomplete
            v-model={this.formData.chassisNo}
            fetch-suggestions={this.getAutocompleteFunc("chassisNo")}
            placeholder="底盘号"
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
