<script>
import {
  getSystemParamsDetail,
  updateSystemParamsDetail
} from "@/api/base/base";
import ParamsList from "./ParamsList";
import Parameters from "./Parameters";
import BatchSetBox from "./BatchSetBox";

const defaultParams = {
  creditBalanceAlarmPercent: 30,
  creditLineCtrl: true,
  newCooperatorAllowOnAccount: [],
  cooperatorOnTickByOverAccount: false,
  allocSupplementMustAudit: false,
  allocOutSettleBeforeAllocIn: false,
  settleAutoReview: true
};

export default {
  name: "FinancialParams",
  components: {
    ParamsList,
    Parameters,
    BatchSetBox
  },
  props: {
    canSave: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      params: { ...defaultParams },
      cacheParams: {},
      paramsType: "",
      parametersTableData: [],
      cacheParametersTableData: [],
      parametersSelectedRows: [],
      canBatchSet: false,
      batchSetBoxVisible: false
    };
  },
  watch: {
    paramsType(val) {
      if (val) {
        this.loadParams();
      }
    }
  },
  methods: {
    loadParams() {
      this.loading = true;
      getSystemParamsDetail({ module: "financial", type: this.paramsType })
        .then(res => {
          this.params = { ...defaultParams, [this.paramsType]: res.value };
          this.cacheParams = { ...this.params };
          this.parametersTableData =
            res.companyParams && res.companyParams.length
              ? res.companyParams.map(item => ({
                  ...item,
                  ...defaultParams,
                  [this.paramsType]: item.value
                }))
              : [];
          this.cacheParametersTableData = this.parametersTableData.map(
            item => ({ ...item })
          );
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleParamsListRowsChange(val) {
      if (val && val.length) {
        this.paramsType = val[0].type;
        if (["", "billNoRule"].includes(this.paramsType)) {
          this.canBatchSet = false;
        } else if (this.parametersSelectedRows.length) {
          this.canBatchSet = true;
        }
      } else {
        this.paramsType = "";
      }
    },
    handleParametersRowsChange(val) {
      this.parametersSelectedRows = val || [];
      if (val && val.length) {
        this.canBatchSet = true;
      } else {
        this.canBatchSet = false;
      }
    },
    batchSetHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.canBatchSet) {
        return;
      }
      this.batchSetBoxVisible = true;
    },
    handleBatchSetBoxSure(params) {
      const ids = this.parametersSelectedRows.map(item => item.id);
      this.parametersTableData = this.parametersTableData.map(item => ({
        ...item,
        [this.paramsType]: ids.includes(item.id)
          ? params[this.paramsType]
          : item[this.paramsType]
      }));
    },
    saveHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.canSave) {
        return;
      }
      this.loading = true;
      updateSystemParamsDetail({
        module: "financial",
        type: this.paramsType,
        value: this.params[this.paramsType],
        companyParams: this.parametersTableData.map(item => ({
          value: item[this.paramsType],
          companyId: item.id
        }))
      })
        .then(() => {
          this.loading = false;
          this.$message.success({
            message: "保存参数设置成功！",
            showClose: true
          });
          this.loadParams();
          this.$store.dispatch("admin/systemParams/loadSystemParams");
        })
        .catch(() => {
          this.loading = false;
        });
    },
    resetHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.params = { ...this.cacheParams };
      this.parametersTableData = this.cacheParametersTableData.map(item => ({
        ...item
      }));
    }
  },
  render() {
    return (
      <el-row gutter={5} class="row-container">
        <el-col span={12} style="height: 100%;">
          <ht-card
            title="参数列表"
            style="margin: 5px 0 5px 5px; height: 100%;"
          >
            <ParamsList
              on-rows-change={val => this.handleParamsListRowsChange(val)}
            />
          </ht-card>
        </el-col>
        <el-col span={12} v-loading={this.loading} style="height: 100%;">
          <ht-card
            title="参数设置"
            style="margin: 5px 5px 5px 0; height: 100%;"
          >
            <div
              slot="after-title"
              style="margin-top: -4px; text-align: right;"
            >
              <el-button
                disabled={!this.canBatchSet}
                type="primary"
                size="mini"
                on-click={e => this.batchSetHandle(e)}
              >
                勾选公司批量设置
              </el-button>
              <el-button
                disabled={!this.canSave}
                type="primary"
                size="mini"
                on-click={e => this.saveHandle(e)}
              >
                保存（F3）
              </el-button>
              <el-button
                type="primary"
                size="mini"
                on-click={e => this.resetHandle(e)}
              >
                重置（F6）
              </el-button>
            </div>
            <Parameters
              params={this.params}
              paramsType={this.paramsType}
              paramsTableData={this.parametersTableData}
              on-rows-change={val => this.handleParametersRowsChange(val)}
            />
          </ht-card>
        </el-col>

        <BatchSetBox
          visible={this.batchSetBoxVisible}
          on={{
            "update:visible": val => (this.batchSetBoxVisible = val)
          }}
          defaultParams={defaultParams}
          paramsType={this.paramsType}
          canSave={this.canSave}
          on-sure={this.handleBatchSetBoxSure}
        />
      </el-row>
    );
  }
};
</script>

<style lang="scss" scoped>
.row-container {
  height: calc(100% - 10px);

  &::v-deep .el-card__body {
    height: calc(100% - 35px);
  }
}
</style>
