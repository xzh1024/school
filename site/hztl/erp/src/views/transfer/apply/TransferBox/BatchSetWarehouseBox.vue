<script lang="tsx">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Form } from "hztl-ui";
import { Warehouse } from "./index.vue";

interface FormData {
  warehouseIds?: number[];
}
const defaultFormData: FormData = {
  warehouseIds: []
};

@Component({})
export default class BatchSetWarehouseBox extends Vue {
  public $refs!: {
    form: Form;
  };
  @Prop() readonly visible!: boolean;
  @Prop() readonly allocOutWarehouses!: Warehouse[];

  private formData: FormData = { ...defaultFormData };
  private rules = {
    warehouseIds: {
      required: true,
      message: "请选择仓库",
      trigger: "change"
    }
  };

  private get relVisible() {
    return this.visible;
  }
  private set relVisible(val: boolean) {
    this.$emit("update:visible", val);
  }

  @Watch("visible")
  private onVisibleChange(val: boolean) {
    if (val) {
      this.formData = { ...defaultFormData };
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
    }
  }

  private sureHandle(e?: MouseEvent) {
    if (e) {
      e.stopPropagation();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$refs.form.validate((valid: boolean, err: any) => {
      if (valid) {
        if (this.formData.warehouseIds && this.formData.warehouseIds.length) {
          this.$emit("sure", { ...this.formData });
          this.cancelHandle();
        } else {
          this.$message.warning({
            message: this.rules.warehouseIds.message,
            showClose: true
          });
        }
      } else {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips, showClose: true });
      }
    });
  }
  private cancelHandle(e?: MouseEvent) {
    if (e) {
      e.stopPropagation();
    }
    this.relVisible = false;
  }

  render() {
    return (
      <ht-dialog
        visible={this.relVisible}
        on={{
          "update:visible": (val: boolean) => (this.relVisible = val)
        }}
        append-to-body
        title="批量设置出库仓库"
        width="350px"
      >
        <el-form
          ref="form"
          attrs={{
            model: this.formData,
            rules: this.rules,
            "show-message": false
          }}
          size="mini"
          label-width="50px"
          class="form-item-small-margin-bottom"
        >
          <el-form-item prop="warehouseIds" label="仓库">
            <ht-select
              v-model={this.formData.warehouseIds}
              options={this.allocOutWarehouses}
              clearable
              collapse-tags
              filterable
              multiple
              has-selecte-all-val
              placeholder="请选择"
            />
          </el-form-item>
        </el-form>
        <div style="margin: 10px 0 5px 0; text-align: center;">
          <el-button
            type="primary"
            size="mini"
            plain
            on-click={(e?: MouseEvent) => this.sureHandle(e)}
          >
            确定（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            plain
            on-click={(e?: MouseEvent) => this.cancelHandle(e)}
          >
            取消（Esc）
          </el-button>
        </div>
      </ht-dialog>
    );
  }
}
</script>
