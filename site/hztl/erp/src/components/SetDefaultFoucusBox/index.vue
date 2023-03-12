<script lang="tsx">
import { Component, Vue, Prop, Model, Watch } from "vue-property-decorator";
import hotkeys from "hotkeys-js";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { KeyStatusEmun } from "@/constants/interface";
import { updateStaffSystemParamsPartDetail } from "@/api/base/base";

const topHotkeys = new TopHotkeys();
let lastKeyscope: symbol | string;

@Component
export default class SetDefaultFoucusBox extends Vue {
  @Model("change") readonly value!: string | number | null;
  @Prop() readonly visible!: boolean;
  @Prop() readonly options!: KeyStatusEmun[];
  @Prop() readonly type!: string;

  @Watch("visible")
  private onVisibleChange(newVal: boolean, oldVal: boolean) {
    if (newVal) {
      this.relValue = this.value;
      lastKeyscope = hotkeys.getScope();
      topHotkeys.bindHotkeys(this.$el as HTMLElement);
    } else if (oldVal) {
      topHotkeys.unbindHotkeys(this.$el as HTMLElement);
      hotkeys.setScope(lastKeyscope);
    }
  }

  private relValue: string | number | null = null;
  private loading = false;

  private sureHandle(e?: MouseEvent) {
    e?.stopPropagation();
    this.loading = true;
    updateStaffSystemParamsPartDetail({
      module: "common",
      type: "focuse",
      value: {
        [this.type]: this.relValue
      }
    })
      .then(() => {
        this.$message.success({
          message: "光标默认锁定设置成功！",
          showClose: true
        });
        this.$emit("change", this.relValue);
        this.closeHandle();
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private cancelHandle(e?: MouseEvent) {
    e?.stopPropagation();
    this.closeHandle();
  }

  private closeHandle() {
    this.$emit("update:visible", false);
    this.$emit("close", false);
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        onClose={this.closeHandle}
        append-to-body
        title="光标默认锁定设置"
        width="400px"
        class="ignore-top-hotkeys"
      >
        <div style="margin: 10px; width: 250px;">
          <div style="margin-bottom: 5px;">请选择光标默认锁定参数</div>
          {this.visible ? (
            <ht-autoselect
              v-model={this.relValue}
              options={this.options}
              v-delay-focus={this.visible}
              trigger-on-focus={false}
              highlight-first-item
              clearable
              size="mini"
            />
          ) : null}
        </div>

        <div style="margin-top: 20px; text-align: center;">
          <el-button
            v-loading={this.loading}
            type="primary"
            plain
            size="mini"
            onClick={this.sureHandle}
          >
            确定（F3）
          </el-button>
          <el-button
            type="primary"
            plain
            size="mini"
            onClick={this.cancelHandle}
          >
            取消（Esc）
          </el-button>
        </div>
      </ht-dialog>
    );
  }
}
</script>
