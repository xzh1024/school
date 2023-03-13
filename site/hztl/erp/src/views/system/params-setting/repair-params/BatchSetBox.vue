<script>
import {
  IS_NEED_OPTIONS,
  IS_IGNORE_ACCOUNT_OPTIONS,
  CUSTOMER_REMIND_OPTIONS
} from "../constants";
import { AREA } from "./parameters-list";
export default {
  name: "BatchSetBox",
  props: {
    visible: Boolean,
    paramsType: {
      type: String,
      required: true
    },
    defaultParams: {
      type: Object,
      required: true
    },
    canSave: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      ruleForm: { ...this.defaultParams },
      healthForm: {
        areaCode: 0
      },
      AREA,
      healthRules: {
        factoryCode: [
          { required: true, message: "请输入维修厂编号", trigger: "change" }
        ],
        account: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" }
        ],
        areaCode: [
          { required: true, message: "请选择所属地区", trigger: "change" }
        ]
      }
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
    visible(val) {
      if (val) {
        this.ruleForm = { ...this.defaultParams };
      }
    }
  },
  methods: {
    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.canSave) {
        return;
      }
      if (this.paramsType == "repairHealth") {
        this.$refs.form.validate((valid, err) => {
          if (!valid) {
            const errTips = err[Object.keys(err)[0]][0].message;
            this.$message.warning({ message: errTips, showClose: true });
          } else {
            this.$emit("sure", {
              ...this.ruleForm,
              repairHealth: this.healthForm
              // repairHealth: [
              //   this.healthForm.factoryCode,
              //   this.healthForm.account,
              //   this.healthForm.password,
              //   this.healthForm.areaCode
              // ]
            });
            this.cancelHandle();
          }
        });
      } else {
        this.$emit("sure", this.ruleForm);
        this.cancelHandle();
      }
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
        title="批量设置参数"
        width="450px"
      >
        {this.paramsType == "repairHealth" ? (
          <el-form
            attrs={{
              model: this.healthForm,
              rules: this.healthRules,
              showMessage: false,
              ref: "form"
            }}
            label-width="90px"
            ref="form"
            label-position="left"
            size="mini"
            class="form-item-small-margin-bottom"
          >
            <el-form-item label="维修厂编号" prop="factoryCode">
              <el-input v-model={this.healthForm.factoryCode}></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="account">
              <el-input v-model={this.healthForm.account}></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model={this.healthForm.password}></el-input>
            </el-form-item>
            <el-form-item label="所属地区" prop="areaCode">
              <el-select
                v-model={this.healthForm.areaCode}
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
        ) : (
          <el-form
            attrs={{
              model: this.ruleForm
            }}
            size="mini"
            label-width="60px"
            label-position="left"
            size="mini"
            class="form-item-small-margin-bottom"
          >
            <el-form-item label="参数值">
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
        )}

        <div style="margin-top: 10px; text-align: center;">
          <el-button
            disabled={!this.canSave}
            plain
            type="primary"
            size="mini"
            on-click={e => this.sureHandle(e)}
          >
            确定（F3）
          </el-button>
          <el-button
            plain
            type="primary"
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
.slider-container {
  display: flex;
  align-items: top;

  &::v-deep .el-slider__runway {
    margin: 11px 0;
    width: 300px;
  }
}
</style>
