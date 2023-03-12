<script lang="tsx">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Form } from "hztl-ui";
import { updateStaffSystemParamsDetail } from "@/api/base/base";

interface FormData {
  mode: number;
}
const defaultRuleForm: FormData = {
  mode: 2
};
const MODE_OPTIONS = [
  { id: 2, name: "按配件+仓库" },
  { id: 4, name: "按配件" }
];
const rules = {
  mode: [
    {
      required: true,
      message: "请选择开单方式！",
      trigger: "change"
    }
  ]
};

@Component
export default class ModeSetBox extends Vue {
  public $refs!: {
    form: Form;
  };

  @Prop() readonly visible!: boolean;
  @Prop() readonly mode!: number | null;

  private loading = false;
  private formData: FormData = { ...defaultRuleForm };

  @Watch("visible")
  private onVisibleChange(val: boolean) {
    if (!val) {
      return;
    }
    this.formData.mode = this.mode || defaultRuleForm.mode;
    this.$nextTick(() => {
      this.$refs.form && this.$refs.form.clearValidate();
    });
  }

  private sureHandle(e?: MouseEvent) {
    e?.stopPropagation();
    this.$refs.form.validate((valid, err) => {
      if (valid) {
        if (this.loading) return;
        this.loading = true;
        updateStaffSystemParamsDetail({
          module: "allocation",
          type: "allocApplyMode",
          value: this.formData.mode
        })
          .then(() => {
            this.loading = false;
            this.$message.success({
              message: "申请模式设置成功！",
              showClose: true
            });
            this.$emit("change", this.formData.mode);
            this.cancelHandle();
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips, showClose: true });
      }
    });
  }
  private cancelHandle(e?: MouseEvent) {
    e?.stopPropagation();
    if (this.loading) return;
    this.$emit("close");
  }

  private closeDialog() {
    this.$emit("close");
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        onClose={this.closeDialog}
        title="申请模式设置"
        width="350px"
      >
        <el-form
          ref="form"
          attrs={{
            model: this.formData,
            rules: rules
          }}
          show-message={false}
          label-width="71px"
          label-position="left"
          size="mini"
        >
          <el-form-item label="申请模式" prop="mode">
            <ht-autoselect
              v-model={this.formData.mode}
              options={MODE_OPTIONS}
              clearable={false}
              trigger-on-focus={false}
              placeholder="请选择"
              highlight-first-item
            />
          </el-form-item>
          <div style="margin-top: 10px;text-align: center">
            <el-button
              loading={this.loading}
              type="primary"
              plain
              size="mini"
              onClick={this.sureHandle}
            >
              确定（F3）
            </el-button>
            <el-button
              disabled={this.loading}
              type="primary"
              plain
              size="mini"
              onClick={this.cancelHandle}
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
