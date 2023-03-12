<script>
import hotkeys from "hotkeys-js";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { searchMixin } from "@/mixins";

let oldKeyScope;
const topHotkeys = new TopHotkeys();
const defaultFormData = {
  warehouseIds: []
};

export default {
  name: "BatchSetWarehouseBox",
  mixins: [searchMixin],
  props: {
    visible: Boolean,
    companyId: [String, Number]
  },
  data() {
    return {
      formData: { ...defaultFormData },
      rules: {
        warehouseIds: {
          required: true,
          message: "请选择仓库",
          trigger: "change"
        }
      },
      warehouseOptions: []
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
    visible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.initData();
      } else if (oldVal) {
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
      }
    }
  },
  methods: {
    initData() {
      this.searchLoadAllWarehouses("", Number(this.companyId || 0)).then(
        res => {
          this.warehouseOptions = res || [];
        }
      );
      this.formData = { ...defaultFormData };
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
    },

    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.$refs.form.validate(async (valid, err) => {
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
    },
    cancelHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.relVisible = false;
    }
  },

  render() {
    return (
      <ht-dialog
        visible={this.relVisible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        append-to-body
        title="批量设置出库仓库"
        width="350px"
        class="ignore-top-hotkeys"
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
              options={this.warehouseOptions}
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
};
</script>
