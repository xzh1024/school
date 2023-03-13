<script>
import hotkeys from "hotkeys-js";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { searchMixin } from "@/mixins";
import { mapState } from "vuex";
let oldKeyScope;
const topHotkeys = new TopHotkeys();
const defaultFormData = {
  way: "urgent",
  urgentWarehouseId: undefined,
  urgentWarehouseName: "",
  urgentSupplierId: undefined,
  urgentSupplierName: "",
  urgentPrice: undefined,
  negativeWarehouseId: undefined,
  negativeWarehouseName: ""
};
const WAYS = [
  { id: "urgent", name: "急件销售" },
  { id: "terminate", name: "配件取消" },
  { id: "negative", name: "负库存销售" }
];

export default {
  name: "BatchEditStockLackBox",
  mixins: [searchMixin],
  props: {
    visible: Boolean,
    companyId: [String, Number]
  },
  data() {
    return {
      formData: { ...defaultFormData },
      rules: {
        way: {
          required: true,
          message: "请选择配件缺货处理方式",
          trigger: "change"
        },
        urgentWarehouseId: {
          required: true,
          message: "请选择急件到货仓库",
          trigger: "change"
        },
        negativeWarehouseId: {
          required: true,
          message: "请选择负库存仓库",
          trigger: "change"
        }
      }
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      isAllowNegativeStock: state => state.params.negativeStockOut
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
  mounted() {
    if (!this.isAllowNegativeStock) {
      WAYS.splice(2, 1);
    }
  },
  methods: {
    initData() {
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
          this.$emit("sure", {
            ...this.formData
          });
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
        title="批量缺货处理"
        width="800px"
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
          label-position="left"
          class="form-item-small-margin-bottom"
        >
          <el-form-item label="配件缺货处理方式" prop="way" label-width="130px">
            <el-radio-group v-model={this.formData.way}>
              {WAYS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
          </el-form-item>

          {this.formData.way === "urgent" ? (
            <el-row gutter={10}>
              <el-col span={9}>
                <el-form-item
                  label="急件到货仓库"
                  prop="urgentWarehouseId"
                  label-width="99px"
                >
                  <ht-autoselect
                    v-model={this.formData.urgentWarehouseId}
                    fetch-suggestions={query =>
                      this.searchLoadAllWarehouses(
                        query,
                        Number(this.companyId || 0)
                      )
                    }
                    defaultValue={this.formData.urgentWarehouseName}
                    on={{
                      "update:defaultValue": val =>
                        (this.formData.urgentWarehouseName = val)
                    }}
                    trigger-on-focus={false}
                    remote
                    filter-zero
                    highlight-first-item
                    placeholder="请选择"
                  />
                </el-form-item>
              </el-col>
              <el-col span={9}>
                <el-form-item label="供应商" label-width="45px">
                  <ht-autoselect
                    v-model={this.formData.urgentSupplierId}
                    fetch-suggestions={this.searchLoadAllSupplierCooperators}
                    defaultValue={this.formData.urgentSupplierName}
                    on={{
                      "update:defaultValue": val =>
                        (this.formData.urgentSupplierName = val)
                    }}
                    trigger-on-focus={false}
                    remote
                    highlight-first-item
                    clearable
                    placeholder="请选择"
                  />
                </el-form-item>
              </el-col>
              <el-col span={6}>
                <el-form-item label="急件进价" label-width="60px">
                  <ht-format-number
                    v-model={this.formData.urgentPrice}
                    min={0}
                    precision-type="price"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          ) : null}

          {this.formData.way === "negative" ? (
            <el-form-item
              label="负库存仓库"
              prop="negativeWarehouseId"
              label-width="85px"
              style="width: 300px"
            >
              <ht-autoselect
                v-model={this.formData.negativeWarehouseId}
                fetch-suggestions={query =>
                  this.searchLoadAllWarehouses(
                    query,
                    Number(this.companyId || 0)
                  )
                }
                defaultValue={this.formData.negativeWarehouseName}
                on={{
                  "update:defaultValue": val =>
                    (this.formData.negativeWarehouseName = val)
                }}
                trigger-on-focus={false}
                remote
                filter-zero
                highlight-first-item
                placeholder="请选择"
              />
            </el-form-item>
          ) : null}
        </el-form>
        <div class="tips-container">
          <div style="margin-bottom: 5px;">批量缺货处理说明：</div>
          <div>急件销售：配件缺货数量全部转急件，请选择急件到货仓库</div>
          <div>
            负库存销售：配件缺货数量全部负库存销售，请选择负库存到货仓库
          </div>
          <div>终止销售：配件缺货数量全部取消</div>
        </div>
        <div style="margin-top: 10px; text-align: center;">
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

<style lang="scss" scoped>
.tips-container {
  margin-top: 20px;
  color: rgb(132, 132, 132);
}
</style>
