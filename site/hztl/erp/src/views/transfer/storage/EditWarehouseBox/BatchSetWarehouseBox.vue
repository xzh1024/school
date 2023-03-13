<script lang="tsx">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import { Form } from "hztl-ui";
import SearchMixin from "@/mixins/searchMixin";
import { loadSearchPosition } from "@/api/store/stocks";
import { ALL_SPACE_REG_EXP } from "@/constants";
import { Position } from "./constants";

interface FormData {
  warehouseId?: number;
  warehouseName?: string;
  positionId?: number;
  positionName?: string;
}
const defaultFormData: FormData = {
  warehouseId: undefined,
  warehouseName: "",
  positionId: undefined,
  positionName: ""
};
const rules = {
  warehouseId: {
    required: true,
    message: "请选择仓库",
    trigger: "change"
  }
};

@Component({})
export default class BatchSetWarehouseBox extends Mixins(SearchMixin) {
  public $refs!: {
    form: Form;
  };

  @Prop() private visible!: boolean;
  @Prop() private companyId!: number;

  private formData: FormData = { ...defaultFormData };
  private cachePositionId: number | undefined = undefined;

  private get isEasyMode() {
    return this.$store.state?.admin?.systemParams?.params?.manageMode;
  }

  @Watch("visible")
  onVisibleChange(val: boolean) {
    if (!val) {
      return;
    }
    this.formData = { ...defaultFormData };
    this.cachePositionId = undefined;
    this.$nextTick(() => {
      this.$refs.form && this.$refs.form.clearValidate();
    });
  }

  async handleWarehouseChange(warehouseId: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const positions: any = await this.getPositions(warehouseId);
    if (positions.length) {
      const position = positions.find(
        (item: Position) => item.id === this.cachePositionId
      );
      if (position) {
        this.formData.positionId = this.cachePositionId;
      } else {
        this.formData.positionId = undefined;
      }
    } else {
      this.formData.positionId = undefined;
    }
  }
  async getPositions(warehouseId: number, query?: string) {
    const positions = await loadSearchPosition({
      name: query,
      warehouseId
    });
    return positions || [];
  }
  private handlePositionIdChange(positionId?: number) {
    if (!positionId) return;
    this.cachePositionId = positionId;
  }
  handlePositionNameChange(positionName: string) {
    if (positionName) {
      this.formData.positionName = positionName.replace(ALL_SPACE_REG_EXP, "");
    } else {
      this.formData.positionName = "";
    }
  }

  sureHandle(e?: MouseEvent) {
    e?.stopPropagation();
    this.$refs.form.validate((valid, err) => {
      if (valid) {
        this.$emit("sure", { ...this.formData });
        this.cancelHandle();
      } else {
        const errTips = err[Object.keys(err)[0]][0].message;
        this.$message.warning({ message: errTips, showClose: true });
      }
    });
  }
  cancelHandle(e?: MouseEvent) {
    e?.stopPropagation();
    this.closeDialog();
  }

  private closeDialog() {
    this.$emit("close");
  }

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        onClose={this.closeDialog}
        append-to-body
        title="批量设置到货仓库"
        width="350px"
      >
        <el-form
          ref="form"
          attrs={{
            model: this.formData,
            rules: rules,
            "show-message": false
          }}
          size="mini"
          label-width="50px"
          class="form-item-small-margin-bottom"
        >
          <el-form-item prop="warehouseId" label="仓库">
            <ht-autoselect
              v-model={this.formData.warehouseId}
              fetch-suggestions={(query: string) =>
                this.searchLoadAllWarehouses(query, Number(this.companyId || 0))
              }
              defaultValue={this.formData.warehouseName}
              on={{
                "update:defaultValue": (val: string) =>
                  (this.formData.warehouseName = val)
              }}
              trigger-on-focus={false}
              remote
              filter-zero
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
                fetch-suggestions={(query: string) =>
                  this.getPositions(this.formData.warehouseId || 0, query)
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
                fetch-suggestions={(query: string) =>
                  this.getPositions(this.formData.warehouseId || 0, query)
                }
                defaultValue={this.formData.positionName}
                on={{
                  "update:defaultValue": (val: string) =>
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
          <el-button type="primary" size="mini" plain onClick={this.sureHandle}>
            确定（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            plain
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
