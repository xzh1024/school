<script lang="tsx">
import { Component, Mixins, Watch } from "vue-property-decorator";
import HotkeyMixin from "@/mixins/hotkeyMixin";
import SearchMixin from "@/mixins/searchMixin";
import { ResetParam, Options } from "./interface";
import SelectBlock from "./SelectBlock.vue";
import LogTable from "./LogTable/index.vue";
import IdentifyBox from "./IdentifyBox/index.vue";
import { resetSettingsData } from "./services";
import * as store from "@/utils/store";

@Component({
  name: "ResetData",
  components: {
    SelectBlock,
    LogTable,
    IdentifyBox
  }
})
export default class ResetData extends Mixins(SearchMixin, HotkeyMixin) {
  public $refs!: {
    logTable: LogTable;
  };

  private loading = false;
  private identifyBoxVisible = false;
  private resetParams: ResetParam[] = [
    {
      isSeleted: false,
      resetType: 1,
      title: "全部初始化",
      tips: "保留公司资料+员工账号+打印模板+平台授权+加盟授权"
    },
    {
      isSeleted: false,
      resetType: 2,
      title: "初始化配件资料",
      tips:
        "会同时删除：配件资料、配件互换组、供应商配件管理、售价制定、业务单据、仓库单据、出入库登记、结算日志"
    },
    {
      isSeleted: false,
      resetType: 3,
      title: "初始化往来单位",
      tips:
        "会同时删除：往来单位、供应商配件管理、业务单据、收发货登记、库存供应商、往来账、对账单、结算单、出纳账、结算日志、佣金"
    },
    {
      isSeleted: false,
      resetType: 4,
      title: "初始化库存",
      tips: "会同时删除：库存，采购单数据，销售单数据，盘点单和移仓单数据",
      companyIds: [],
      options: store.allCompanies(),
      prop: "companyIds",
      label: "初始化分公司",
      width: "400px",
      labelWidth: "100px",
      rules: {
        companyIds: {
          required: true,
          message: "请选择初始化分公司",
          trigger: "change"
        }
      }
    },
    {
      isSeleted: false,
      resetType: 5,
      title: "初始化出纳数据",
      tips:
        "会同时删除：资金账户、还原资金账户设置、往来账、对账单、结算单、结算日志、佣金、费用、对方公司关联调拨对账单、预收/付款、开票单、收票单",
      companyIds: [],
      options: store.allCompanies(),
      prop: "companyIds",
      label: "初始化分公司",
      width: "400px",
      labelWidth: "100px",
      rules: {
        companyIds: {
          required: true,
          message: "请选择初始化分公司",
          trigger: "change"
        }
      }
    },
    {
      isSeleted: false,
      resetType: 6,
      title: "初始化业务单据",
      tips:
        "会同时删除：采购单数据，销售单数据，盘点单和移仓单数据，对方公司关联调拨单",
      companyIds: [],
      options: store.allCompanies(),
      prop: "companyIds",
      label: "初始化分公司",
      width: "400px",
      labelWidth: "100px",
      rules: {
        companyIds: {
          required: true,
          message: "请选择初始化分公司",
          trigger: "change"
        }
      }
    },
    {
      isSeleted: false,
      resetType: 7,
      title: "初始化库房数据",
      tips:
        "会同时删除：库存，采购单数据，销售单数据，盘点单和移仓单数据，仓库权限分配，出入库登记单，仓库单据，收发货登记单，调拨仓库权限分配"
    }
  ];

  get allCompanies() {
    return this.searchBaseData && store.allCompanies()
      ? store.allCompanies()
      : [];
  }
  @Watch("allCompanies", { immediate: true })
  onAllCompaniesChange(val: Options[]) {
    this.resetParams = this.resetParams.map(item => {
      if (item.companyIds && item.options) {
        return { ...item, options: val };
      } else {
        return item;
      }
    });
  }

  private resetHandle(e?: MouseEvent) {
    e?.stopPropagation();
    const resetParams = this.resetParams.filter(item => item.isSeleted);
    if (!resetParams.length) {
      this.$message.warning({ message: "请选择初始化类型", showClose: true });
      return;
    }
    if (!this.validateParams(resetParams)) {
      return;
    }
    this.identifyBoxVisible = true;
  }

  private resetData(data: { captcha: { toString: () => any }; msgId: string }) {
    // captcha: string | number
    this.loading = true;
    const resetParams = this.resetParams.filter(item => item.isSeleted);
    resetSettingsData({
      resetParams: resetParams.map(item => ({
        resetType: item.resetType,
        companyIds: item.companyIds
      })),
      captcha: data.captcha.toString(),
      msgId: data.msgId
    })
      .then(() => {
        this.$refs.logTable?.loadData();
        this.loadEnableAccountList();
      })
      .finally(() => {
        this.loading = false;
      });
  }

  validateParams(params: ResetParam[]) {
    let flag = true;

    const errItem = params.find(
      item => item.companyIds && !item.companyIds.length
    );
    if (errItem) {
      this.$message.warning({
        message: errItem.rules.companyIds.message,
        showClose: true
      });
      flag = false;
    }

    return flag;
  }

  render() {
    return (
      <div class="container-box" style="overflow: hidden;">
        <div class="header">
          <el-button
            disabled={this.loading}
            type="primary"
            size="mini"
            onClick={(e: MouseEvent) => this.resetHandle(e)}
          >
            开始执行
          </el-button>
        </div>

        <el-row style="margin: 5px; height: calc(100% - 55px)">
          <el-col style="height: 100%;" span={12}>
            <ht-card title="系统数据初始化设置" class="full-height">
              <div slot="after-title" class="text-font-danger">
                （请选择您想初始化的数据类型，初始化后无法恢复，请谨慎操作！）
              </div>

              {this.resetParams.map(item => (
                <select-block
                  v-loading={this.loading}
                  v-model={item.isSeleted}
                  title={item.title}
                  tips={item.tips}
                >
                  {item.companyIds ? (
                    <el-form
                      attrs={{
                        model: item
                      }}
                      rules={item.isSeleted ? item.rules : {}}
                      label-position="left"
                      size="mini"
                      class="form-item-small-margin-bottom ignore-hotkeys"
                    >
                      <el-form-item
                        show-message={false}
                        prop={item.prop}
                        label={item.label}
                        label-width={item.labelWidth}
                        style={`max-width: ${item.width}`}
                      >
                        <ht-select
                          v-model={item.companyIds}
                          options={item.options}
                          collapse-tags
                          filterable
                          multiple
                          has-selecte-all-val
                          placeholder="请选择"
                        />
                      </el-form-item>
                    </el-form>
                  ) : null}
                </select-block>
              ))}
            </ht-card>
          </el-col>

          <el-col span={12} style="height: 100%;">
            <ht-card
              title="系统数据初始化日志"
              class="full-height"
              style="margin-left: 5px"
            >
              <LogTable ref="logTable" />
            </ht-card>
          </el-col>
        </el-row>

        <identify-box
          visible={this.identifyBoxVisible}
          on={{
            "update:visible": (val: boolean) => (this.identifyBoxVisible = val)
          }}
          onSuccess={this.resetData}
        />
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
.full-height {
  height: 100%;

  &::v-deep .el-card__body {
    padding-bottom: 0;
    height: calc(100% - 47px);
    overflow: auto;
  }
}
</style>
