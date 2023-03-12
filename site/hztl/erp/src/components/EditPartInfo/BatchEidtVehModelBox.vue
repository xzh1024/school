<script>
export default {
  name: "BatchEidtVehModelBox",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    visible: Boolean,
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      textarea: ""
    };
  },
  computed: {
    relVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  watch: {
    visible() {
      if (this.value && this.value.length) {
        this.textarea = this.value.join("\n");
      } else {
        this.textarea = "";
      }
    }
  },
  methods: {
    sureHandle(e) {
      e?.stopPropagation();
      let arr = [];
      if (this.textarea) {
        arr = this.textarea.split("\n");
      }
      this.$emit("change", arr);
      this.cancelHandle();
    },
    cancelHandle(e) {
      e?.stopPropagation();
      this.relVisible = false;
    }
  },
  render() {
    return (
      <ht-dialog
        visible={this.visible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        append-to-body
        title="批量编辑车型"
        class="dialog-body"
        width="400px"
      >
        <div style="margin-left: 5px">每行表示一个车型</div>
        <el-input
          v-model={this.textarea}
          type="textarea"
          autosize={{ minRows: 15, maxRows: 50 }}
          autofocus={this.visible}
          clearable
        />
        <div style="margin-top: 5px; text-align: center;">
          <el-button
            loading={this.loading}
            type="primary"
            plain
            size="mini"
            on-click={e => this.sureHandle(e)}
          >
            确定（F3）
          </el-button>
          <el-button
            type="primary"
            plain
            size="mini"
            on-click={e => this.cancelHandle(e)}
          >
            取消（Esc）
          </el-button>
        </div>
      </ht-dialog>
    );
  }
};
</script>

<style lang="scss" scoped>
.dialog-body {
  &::v-deep .el-dialog__body {
    background-color: #e7ebed;
  }
}
</style>
