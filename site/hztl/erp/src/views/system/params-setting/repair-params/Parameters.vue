<script>
import {
  IS_NEED_OPTIONS,
  IS_IGNORE_ACCOUNT_OPTIONS,
  SYSTEM_PARAMS_SETTING_PARAMETERS_LIST,
  CUSTOMER_REMIND_OPTIONS
} from "../constants";

import { HEALTH_PARAMETERS_LIST, AREA } from "./parameters-list";

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
  // watch: {
  //   paramsTableData: {
  //     handler(newVal) {
  //       console.log(newVal);
  //     }
  //   }
  // },
  data() {
    return {
      tableName:
        this.paramsType !== "repairHealth"
          ? `${SYSTEM_PARAMS_SETTING_PARAMETERS_LIST.name}Repaire`
          : `${HEALTH_PARAMETERS_LIST.name}Repaire`,
      AREA
    };
  },
  computed: {
    tableColumns() {
      // 对健康档案上传参数做特殊处理
      if (this.paramsType !== "repairHealth") {
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
                      <el-radio-group
                        v-show={this.paramsType === "repairDispatch"}
                        v-model={row.repairDispatch}
                      >
                        {IS_NEED_OPTIONS.map(item => (
                          <el-radio label={item.id}>{item.name}</el-radio>
                        ))}
                      </el-radio-group>
                      <el-radio-group
                        v-show={
                          this.paramsType === "repairWorkOrderStartEndStep"
                        }
                        v-model={row.repairWorkOrderStartEndStep}
                      >
                        {IS_NEED_OPTIONS.map(item => (
                          <el-radio label={item.id}>{item.name}</el-radio>
                        ))}
                      </el-radio-group>
                      <el-radio-group
                        v-show={this.paramsType === "repairCarWashDistribute"}
                        v-model={row.repairCarWashDistribute}
                      >
                        {IS_NEED_OPTIONS.map(item => (
                          <el-radio label={item.id}>{item.name}</el-radio>
                        ))}
                      </el-radio-group>
                      <el-radio-group
                        v-show={
                          this.paramsType === "repairWorkOrderAmountFloor"
                        }
                        v-model={row.repairWorkOrderAmountFloor}
                      >
                        {IS_IGNORE_ACCOUNT_OPTIONS.map(item => (
                          <el-radio label={item.id}>{item.name}</el-radio>
                        ))}
                      </el-radio-group>
                      <el-checkbox-group
                        v-show={
                          this.paramsType === "repairCustomerSituationRemind"
                        }
                        v-model={row.repairCustomerSituationRemind}
                        style="height: 28px;"
                      >
                        {CUSTOMER_REMIND_OPTIONS.map(item => (
                          <el-checkbox label={item.id}>{item.name}</el-checkbox>
                        ))}
                      </el-checkbox-group>
                    </el-form-item>
                  </el-form>
                </div>
              )
            };
          }
          return item;
        });
      } else {
        return HEALTH_PARAMETERS_LIST.columns.map(item => {
          if (
            ["维修厂编号", "用户名", "密码", "所属地区"].indexOf(item.label) >
            -1
          ) {
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
                      <el-input
                        v-show={item.prop == "factoryCode"}
                        v-model={row.repairHealth.factoryCode}
                      ></el-input>
                      <el-input
                        v-show={item.prop == "account"}
                        v-model={row.repairHealth.account}
                      ></el-input>
                      <el-input
                        v-show={item.prop == "password"}
                        v-model={row.repairHealth.password}
                      ></el-input>
                      <el-select
                        v-model={row.repairHealth.areaCode}
                        v-show={item.prop == "areaCode"}
                        placeholder="请选择"
                      >
                        {AREA.map(item => {
                          return (
                            <el-option
                              key={item.value}
                              label={item.label}
                              value={item.value}
                              disabled={item.value == 27}
                            ></el-option>
                          );
                        })}
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
              )
            };
          }
          return item;
        });
      }
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
            <el-radio-group
              v-show={this.paramsType === "repairDispatch"}
              v-model={this.ruleForm.repairDispatch}
            >
              {IS_NEED_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
            <el-radio-group
              v-show={this.paramsType === "repairWorkOrderStartEndStep"}
              v-model={this.ruleForm.repairWorkOrderStartEndStep}
            >
              {IS_NEED_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
            <el-radio-group
              v-show={this.paramsType === "repairCarWashDistribute"}
              v-model={this.ruleForm.repairCarWashDistribute}
            >
              {IS_NEED_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
            <el-radio-group
              v-show={this.paramsType === "repairWorkOrderAmountFloor"}
              v-model={this.ruleForm.repairWorkOrderAmountFloor}
            >
              {IS_IGNORE_ACCOUNT_OPTIONS.map(item => (
                <el-radio label={item.id}>{item.name}</el-radio>
              ))}
            </el-radio-group>
            <el-checkbox-group
              v-show={this.paramsType === "repairCustomerSituationRemind"}
              v-model={this.ruleForm.repairCustomerSituationRemind}
            >
              {CUSTOMER_REMIND_OPTIONS.map(item => (
                <el-checkbox label={item.id}>{item.name}</el-checkbox>
              ))}
            </el-checkbox-group>
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
