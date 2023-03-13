<script>
import {
  getSystemParamsDetail,
  updateSystemParamsDetail
} from "@/api/base/base";
import ParamsList from "./ParamsList";
import Parameters from "./Parameters";

const defaultParams = {
  allocApply2OutAudit: true
};

export default {
  name: "StorageParams",
  components: {
    ParamsList,
    Parameters
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
      paramsType: ""
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
      getSystemParamsDetail({ module: "allocation", type: this.paramsType })
        .then(res => {
          this.params = { ...defaultParams, [this.paramsType]: res.value };
          this.cacheParams = { ...this.params };
          this.loading = false;
        })
        .catch(() => {
          this.cacheParams = { ...this.params };
          this.loading = false;
        });
    },
    handleParamsListRowsChange(val) {
      if (val && val.length) {
        this.paramsType = val[0].type;
      } else {
        this.paramsType = "";
      }
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
        module: "allocation",
        type: this.paramsType,
        value: this.params[this.paramsType]
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
            <Parameters params={this.params} paramsType={this.paramsType} />
          </ht-card>
        </el-col>
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
