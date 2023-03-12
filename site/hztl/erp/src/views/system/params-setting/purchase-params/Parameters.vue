<script>
import {
  LAST_PRICE_FROM_ALL_COMPANIES_OPTIONS,
  SYSTEM_PARAMS_SETTING_PARAMETERS_LIST
} from "../constants";

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
    },
    paramsTableData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tableName: `${SYSTEM_PARAMS_SETTING_PARAMETERS_LIST.name}Purchase`
    };
  },
  computed: {
    tableColumns() {
      return SYSTEM_PARAMS_SETTING_PARAMETERS_LIST.columns.map(item => {
        if (item.label === "参数值") {
          return {
            ...item,
            render: (value, row) => (
              <div on-click={e => e.stopPropagation()}>
                <el-form
                  attrs={{
                    model: row
                  }}
                  size="mini"
                  label-width="0"
                  size="mini"
                  class="form-item-small-margin-bottom"
                >
                  <el-form-item>
                    <el-radio-group v-model={row.lastPriceFromAllCompanies}>
                      {LAST_PRICE_FROM_ALL_COMPANIES_OPTIONS.map(item => (
                        <el-radio label={item.id}>{item.name}</el-radio>
                      ))}
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
            )
          };
        }
        return item;
      });
    },
    ruleForm: {
      get() {
        return this.params;
      },
      set() {}
    },
    tableData: {
      get() {
        return this.paramsTableData;
      },
      set() {}
    }
  },
  methods: {
    handleSelectChange(val) {
      this.$emit("rows-change", val);
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
          label-width="110px"
          label-position="left"
          size="mini"
          class="form-item-small-margin-bottom"
        >
          <el-form-item label="新增公司默认值">
            <el-radio-group v-model={this.ruleForm.lastPriceFromAllCompanies}>
              {LAST_PRICE_FROM_ALL_COMPANIES_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
          </el-form-item>
        </el-form>

        <ht-setting-table
          tableName={this.tableName}
          columns={this.tableColumns}
          data={this.tableData}
          on-selectChange={this.handleSelectChange}
          selectionType="multiple"
          style="height: calc(100% - 30px);"
        />
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
