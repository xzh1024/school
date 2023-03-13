<script>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import AuthCode from "@/components/AuthCode/index.vue";
import { sendSettingsResetDatasms } from "./services";

const rules = {
  captcha: { required: true, message: "请输入短信验证码", trigger: "change" }
};
const defaultFormData = {
  captcha: ""
};

@Component({
  components: { AuthCode }
})
export default class IdentifyBox extends Vue {
  @Prop(Boolean) visible;
  @Watch("visible")
  onVisibleChange(val) {
    if (val) {
      this.formData = { ...defaultFormData };
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
    }
  }

  get relVisible() {
    return this.visible;
  }
  set relVisible(val) {
    this.$emit("update:visible", val);
  }

  formData = { ...defaultFormData };

  sendCode() {
    sendSettingsResetDatasms()
      .then(res => {
        console.log(res);
        this.formData.msgId = res || "";
      })
      .catch(() => {
        this.$refs.authCode.clearCountdown();
      });
  }

  sureHandle(e) {
    if (e) {
      e.stopPropagation();
    }
    this.$refs.form.validate((valid, err) => {
      if (valid) {
        this.formData.msgId = this.formData.msgId || "";
        this.$emit("success", this.formData);
        this.cancelHandle();
      } else {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips, showClose: true });
      }
    });
  }
  cancelHandle(e) {
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
          "update:visible": val => (this.relVisible = val)
        }}
        title="初始化权限认证"
        width="550px"
      >
        <div class="text-font-danger" style="margin-bottom: 20px">
          初始化后，数据不可恢复，请谨慎操作！为了数据安全，需要超级管理员短信授权。
        </div>

        <el-form
          ref="form"
          rules={rules}
          show-message={false}
          attrs={{
            model: this.formData
          }}
          size="mini"
          label-position="left"
          label-width="85px"
        >
          <el-form-item label="短信验证码" prop="captcha">
            <auth-code
              ref="authCode"
              v-model={this.formData.captcha}
              style="width: 220px"
              onSendCode={this.sendCode}
            />
          </el-form-item>
        </el-form>

        <div style="margin-top: 20px; text-align: center;">
          <el-button
            type="primary"
            size="mini"
            plain
            on-click={e => this.sureHandle(e)}
          >
            确定（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            plain
            on-click={e => this.cancelHandle(e)}
          >
            取消（Esc）
          </el-button>
        </div>
      </ht-dialog>
    );
  }
}
</script>
