<script>
import { MANAGE_MODE_OPTIONS, NEGATIVE_STOCK_OUT_OPTIONS } from "../constants";

export default {
  name: "Parameters",
  props: {
    paramsType: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      required: true
    }
  },
  computed: {
    ruleForm: {
      get() {
        return this.params;
      },
      set() {}
    }
  },
  render() {
    return (
      <div style="height: 100%;">
        <el-form
          attrs={{
            model: this.ruleForm
          }}
          size="mini"
          label-width="0"
          label-position="left"
          size="mini"
          class="form-item-small-margin-bottom"
        >
          <el-form-item label="">
            <el-radio-group
              v-show={this.paramsType === "manageMode"}
              v-model={this.ruleForm.manageMode}
            >
              {MANAGE_MODE_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
            <el-radio-group
              v-show={this.paramsType === "negativeStockOut"}
              v-model={this.ruleForm.negativeStockOut}
            >
              {NEGATIVE_STOCK_OUT_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
.radio-container {
  & + .radio-container {
    margin-top: 10px;
  }
}
.slider-container {
  display: flex;
  align-items: top;

  &::v-deep .el-slider__runway {
    margin: 11px 0;
    width: 300px;
  }
}
</style>
