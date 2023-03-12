<script lang="tsx">
import { Component, Prop, Watch } from "vue-property-decorator";
import * as tsc from "vue-tsx-support";
import { SelectOptions } from "@/constants/interface";
import { ableDicts } from "@/api/base/base";

interface Props {
  visible: boolean;
  dict: SelectOptions[];
  dictionaryKey: string;
}
interface Events {
  onSuccess: () => void;
  onClose: () => void;
}

@Component
export default class DisableEnableDialog extends tsc.Component<Props, Events> {
  @Prop() readonly visible!: boolean;
  @Prop() readonly dictionaryKey!: string;
  @Prop() readonly dict!: SelectOptions[];

  @Watch("visible")
  onVisibleChange(val: boolean) {
    if (val) {
      this.disable = true;
    }
  }

  private loading = false;
  private disable = true;

  handleSure(e?: MouseEvent) {
    e?.stopPropagation();
    this.loading = true;
    ableDicts({
      type: this.dictionaryKey,
      disable: this.disable,
      dict: this.dict
    })
      .then(() => {
        this.$message.success({
          message: `${this.disable ? "停" : "启"}用成功！`,
          showClose: true
        });
        this.$emit("success");
        this.handleClose();
      })
      .finally(() => {
        this.loading = false;
      });
  }
  handleClose(e?: MouseEvent) {
    e?.stopPropagation();
    this.$emit("update:visible", false);
    this.$emit("close", false);
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        onClose={this.handleClose}
        title="批量设置停用/启用"
        width="400px"
      >
        <div style="text-align: center;">
          <div style="margin: 10px 0;">
            已选择 {this.dict.length} 条字典状态变更为：
          </div>
          <el-radio-group loading={this.loading} v-model={this.disable}>
            <el-radio label={true}>停用</el-radio>
            <el-radio label={false}>启用</el-radio>
          </el-radio-group>
        </div>

        <div style="margin-top: 20px; text-align: center;">
          <el-button
            loading={this.loading}
            plain
            type="primary"
            size="mini"
            onClick={this.handleSure}
          >
            确定（F3）
          </el-button>
          <el-button
            loading={this.loading}
            plain
            type="primary"
            size="mini"
            onClick={this.handleClose}
          >
            取消（Esc）
          </el-button>
        </div>
      </ht-dialog>
    );
  }
}
</script>
