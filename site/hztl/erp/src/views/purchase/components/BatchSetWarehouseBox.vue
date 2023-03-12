<script>
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { searchMixin } from "@/mixins";
import { loadSearchPosition } from "@/api/store/stocks";
import { ALL_SPACE_REG_EXP } from "@/constants";

let oldKeyScope;
const topHotkeys = new TopHotkeys();
const defaultFormData = {
  warehouseId: null,
  warehouseName: "",
  positionId: null,
  positionName: ""
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
      cachePositionId: null,
      formData: { ...defaultFormData },
      rules: {
        warehouseId: {
          required: true,
          message: "请选择仓库",
          trigger: "change"
        }
      }
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      isEasyMode: state => !!state.params.manageMode
    }),
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
      this.formData = { ...defaultFormData };
      this.cachePositionId = null;
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      });
    },
    async handleWarehouseChange(warehouseId) {
      const positions = await this.getPositions(warehouseId);
      if (positions.length) {
        const position = positions.find(
          item => item.id === this.cachePositionId
        );
        if (position) {
          this.formData.positionId = this.cachePositionId;
        } else {
          this.formData.positionId = null;
        }
      } else {
        this.formData.positionId = null;
      }
    },
    async getPositions(warehouseId, query) {
      const positions = await loadSearchPosition({
        name: query,
        warehouseId
      });
      return positions || [];
    },
    handlePositionIdChange(positionId) {
      if (!positionId) return;
      this.cachePositionId = positionId;
    },
    handlePositionNameChange(positionName) {
      if (positionName) {
        this.formData.positionName = positionName.replace(
          ALL_SPACE_REG_EXP,
          ""
        );
      } else {
        this.formData.positionName = "";
      }
    },

    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.$refs.form.validate((valid, err) => {
        if (valid) {
          this.$emit("sure", { ...this.formData });
          this.cancelHandle();
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
        title="批量设置到货仓库"
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
          <el-form-item prop="warehouseId" label="仓库">
            <ht-autoselect
              v-model={this.formData.warehouseId}
              fetch-suggestions={query =>
                this.searchLoadAllWarehouses(query, Number(this.companyId || 0))
              }
              defaultValue={this.formData.warehouseName}
              on={{
                "update:defaultValue": val =>
                  (this.formData.warehouseName = val)
              }}
              remote
              filter-zero
              trigger-on-focus={false}
              highlight-first-item
              placeholder="请选择"
              on-change={this.handleWarehouseChange}
            />
          </el-form-item>
          <el-form-item label="货位">
            {this.isEasyMode ? (
              <ht-autoselect
                v-model={this.formData.positionId}
                keepInputValue={this.formData.positionName}
                fetch-suggestions={query =>
                  this.getPositions(this.formData.warehouseId, query)
                }
                remote
                filter-zero
                keep-input
                clearable
                no-match-text=""
                trigger-on-focus={false}
                placeholder="请选择"
                on-input-change={this.handlePositionNameChange}
                on-change={this.handlePositionIdChange}
              />
            ) : (
              <ht-autoselect
                v-model={this.formData.positionId}
                fetch-suggestions={query =>
                  this.getPositions(this.formData.warehouseId, query)
                }
                defaultValue={this.formData.positionName}
                on={{
                  "update:defaultValue": val =>
                    (this.formData.positionName = val)
                }}
                remote
                filter-zero
                clearable
                trigger-on-focus={false}
                highlight-first-item
                placeholder="请选择"
                on-change={this.handlePositionIdChange}
              />
            )}
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
