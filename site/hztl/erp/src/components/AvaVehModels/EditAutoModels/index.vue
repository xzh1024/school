<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { getSearchAutoAvaVehModelsOptions } from "@/api/parts/partsModels";
import { Form } from "hztl-ui";
import { MINGJUE } from "@/constants/platform";

export interface EditAutoModelData {
  vehBrand: string;
  facBrand: string;
  vehicleGroup?: string;
  year: string;
  displacement: string;
  engine: string;
  transmission: string;
  salesModel: string;
}

interface Props {
  loading?: boolean;
  visible: boolean;
  autoModelData?: EditAutoModelData;
}

interface Event {
  onVisibleChange(visible: boolean): void;
  onConfirm(data: EditAutoModelData): void;
}

const rules = {
  vehBrand: [
    {
      required: true,
      message: "品牌必填!",
      trigger: "change"
    }
  ],
  facBrand: [
    {
      required: true,
      message: "厂牌必填!",
      trigger: "change"
    }
  ],
  vehicleGroup: [
    {
      required: true,
      message: "车型组必填!",
      trigger: "change"
    }
  ],
  year: [
    {
      required: true,
      message: "年款必填!",
      trigger: "change"
    }
  ],
  displacement: [
    {
      required: true,
      message: "排量必填!",
      trigger: "change"
    }
  ],
  engine: [
    {
      required: true,
      message: "发动机必填!",
      trigger: "change"
    }
  ],
  transmission: [
    {
      required: true,
      message: "变速箱必填!",
      trigger: "change"
    }
  ],
  salesModel: [
    {
      required: true,
      message: "销售版型必填!",
      trigger: "change"
    }
  ]
};

const defuleFormData: EditAutoModelData = {
  vehBrand: "",
  facBrand: "",
  vehicleGroup: "",
  year: "",
  displacement: "",
  engine: "",
  transmission: "",
  salesModel: ""
};

@Component
export default class EditAutoModels extends tsc.Component<Props, Event> {
  $refs!: {
    form: Form;
  };
  @Prop() readonly loading!: boolean;
  @Prop() readonly visible!: boolean;
  @Prop() readonly autoModelData?: EditAutoModelData;

  private formData: EditAutoModelData = { ...defuleFormData };

  private get formRef() {
    return this.$refs.form;
  }

  @Watch("visible", { immediate: true })
  onVisibleChange(val: boolean) {
    if (val) {
      this.formRef?.clearValidate();
      this.formData = {
        ...defuleFormData,
        ...this.autoModelData
      };
    }
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
  private changeVisible(visible: boolean) {
    this.$emit("visibleChange", visible);
    this.$emit("update:visible", visible);
  }
  private confirm() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$refs.form.validate((valid, err: any) => {
      if (!valid) {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips, showClose: true });
      } else {
        this.$emit("confirm", this.formData);
      }
    });
  }
  render() {
    return (
      <ht-dialog
        title="自定义车型新增"
        width="400px"
        visible={this.visible}
        on-close={() => this.changeVisible(false)}
      >
        <el-form
          ref="form"
          label-position="left"
          size="mini"
          class="form-item-small-margin-bottom"
          label-width="60px"
          attrs={{
            model: this.formData,
            rules
          }}
          show-message={false}
        >
          <el-form-item label="品牌" prop="vehBrand">
            <ht-autocomplete
              v-model={this.formData.vehBrand}
              fetch-suggestions={this.getAutocompleteFunc("vehBrand")}
              placeholder="品牌"
              trigger-on-focus={false}
              maxlength={50}
              highlight-first-item
            />
          </el-form-item>
          <el-form-item label="厂牌" prop="facBrand">
            <ht-autocomplete
              v-model={this.formData.facBrand}
              fetch-suggestions={this.getAutocompleteFunc("facBrand")}
              placeholder="厂牌"
              trigger-on-focus={false}
              maxlength={50}
              highlight-first-item
            />
          </el-form-item>
          <el-form-item label="车型组" prop="vehicleGroup">
            <ht-autocomplete
              v-model={this.formData.vehicleGroup}
              fetch-suggestions={this.getAutocompleteFunc("vehicleGroup")}
              placeholder="车型组"
              trigger-on-focus={false}
              maxlength={50}
              highlight-first-item
            />
          </el-form-item>
          <el-form-item label="年款" prop="year">
            <ht-autocomplete
              v-model={this.formData.year}
              fetch-suggestions={this.getAutocompleteFunc("year")}
              placeholder="年款"
              trigger-on-focus={false}
              maxlength={50}
              highlight-first-item
            />
          </el-form-item>
          <el-form-item label="排量" prop="displacement">
            <ht-autocomplete
              v-model={this.formData.displacement}
              fetch-suggestions={this.getAutocompleteFunc("displacement")}
              placeholder="排量"
              trigger-on-focus={false}
              maxlength={50}
              highlight-first-item
            />
          </el-form-item>
          <el-form-item label="发动机" prop="engine">
            <ht-autocomplete
              v-model={this.formData.engine}
              fetch-suggestions={this.getAutocompleteFunc("engine")}
              placeholder="发动机"
              trigger-on-focus={false}
              maxlength={50}
              highlight-first-item
            />
          </el-form-item>
          <el-form-item label="变速箱" prop="transmission">
            <ht-autocomplete
              v-model={this.formData.transmission}
              fetch-suggestions={this.getAutocompleteFunc("transmission")}
              placeholder="变速箱"
              trigger-on-focus={false}
              maxlength={50}
              highlight-first-item
            />
          </el-form-item>
          <el-form-item label="销售版型" prop="salesModel">
            <ht-input v-model={this.formData.salesModel} maxlength={50} />
          </el-form-item>
          <div class="dialog-footer-align flex-block-bg flex-block-padding flex-block-margin">
            <el-button
              ref="confirm"
              type="primary"
              plain
              size="mini"
              loading={this.loading}
              on-click={() => this.confirm()}
            >
              确定（F3）
            </el-button>
            <el-button
              ref="confirm"
              type="primary"
              plain
              size="mini"
              on-click={() => this.changeVisible(false)}
            >
              取消（Esc）
            </el-button>
          </div>
        </el-form>
      </ht-dialog>
    );
  }
}
</script>
