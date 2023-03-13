<script>
import { CELL_WIDTH } from "@/constants";
import { searchMixin } from "@/mixins";
import BatchEidtVehModelBox from "./BatchEidtVehModelBox";

export default {
  name: "EidtVehModelBox",
  components: { BatchEidtVehModelBox },
  mixins: [searchMixin],
  props: {
    visible: Boolean,
    vehModels: {
      type: Array,
      required: true
    }
  },
  data() {
    const validateVehModel = (rule, value, callback) => {
      if (value) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (
            this.tableData[i + 1] &&
            this.tableData[i].vehModel === this.tableData[i + 1].vehModel
          ) {
            this.$message.warning({ message: rule.message, showClose: true });
            callback(new Error(rule.message));
          } else {
            callback();
          }
          return;
        }
      } else {
        callback();
      }
    };
    const rules = {
      vehModel: [
        {
          required: true,
          message: "请选择车型",
          trigger: "blur"
        },
        {
          validator: validateVehModel,
          message: "车型重复，请重新选择",
          trigger: "blur"
        }
      ]
    };
    const controlsColumn = {
      label: "操作",
      prop: "controls",
      width: 50,
      cantExport: true,
      render: (value, row) => (
        <el-tooltip placement="top" content="删除" enterable={false}>
          <i
            class="icon operation-icon icon-delete-info"
            on-click={e => this.deleteHandle(row, e)}
          />
        </el-tooltip>
      )
    };
    const vehModelColumn = {
      label: "车型",
      prop: "vehModel",
      width: 400,
      render: (value, row) => {
        return (
          <el-form
            attrs={{
              model: row,
              rules: rules,
              "show-message": false
            }}
            size="mini"
            label-width="0"
            class="form-item-small-margin-bottom"
            on-click={e => e.stopPropagation()}
          >
            <el-form-item prop="vehModel">
              <ht-autocomplete
                v-model={row.vehModel}
                maxlength={50}
                fetch-suggestions={this.autocompleteSearchVehModel}
                trigger-on-focus={false}
                placeholder="请选择"
                highlight-first-item
              />
            </el-form-item>
          </el-form>
        );
      }
    };

    return {
      loading: false,
      tableName: "editPartInfoEidtVehModelBoxTable",
      tableData: [],
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        controlsColumn,
        vehModelColumn
      ],
      batchEidtVehModelBoxVisible: false
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
    },
    strTableData: {
      get() {
        return this.tableData?.length
          ? this.tableData.map(item => item.vehModel)
          : [];
      },
      set(val) {
        if (val.length) {
          this.tableData = val.map(item => ({ vehModel: item }));
        } else {
          this.tableData = [];
        }
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.loadData();
      }
    }
  },
  methods: {
    loadData() {
      this.tableData = this.vehModels.map(item => ({ vehModel: item }));
    },
    deleteHandle(row, e) {
      e?.stopPropagation();
      this.tableData = this.tableData.filter(item => item !== row);
    },
    addHandle(e) {
      e?.stopPropagation();
      this.tableData.push({ vehModel: "" });
    },
    batchHandle(e) {
      e?.stopPropagation();
      this.batchEidtVehModelBoxVisible = true;
    },
    sureHandle(e) {
      e?.stopPropagation();
      if (this.tableData.length) {
        if (this.validateTableData()) {
          this.$emit(
            "sure",
            this.tableData.map(item => item.vehModel)
          );
          this.cancelHandle();
        }
      } else {
        this.$emit("sure", []);
        this.cancelHandle();
      }
    },
    validateTableData() {
      let flag = true;
      if (this.tableData.every(item => !item.vehModel)) {
        this.$message.warning({ message: "请选择车型", showClose: true });
        flag = false;
      }
      for (let i = 0; i < this.tableData.length; i++) {
        if (
          this.tableData[i + 1] &&
          this.tableData[i].vehModel === this.tableData[i + 1].vehModel
        ) {
          this.$message.warning({
            message: "车型重复，请重新选择",
            showClose: true
          });
          flag = false;
          return;
        }
      }
      return flag;
    },
    cancelHandle(e) {
      e?.stopPropagation();
      this.relVisible = false;
    }
  },

  render() {
    return (
      <ht-dialog
        visible={this.visible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        append-to-body
        title="编辑车型"
        class="dialog-body"
        width="600px"
      >
        <div class="container-box">
          <ht-card
            no-padding
            class="table-container el-form"
            style="height: 400px;"
          >
            <ht-setting-table
              loading={this.loading}
              data={this.tableData}
              columns={this.tableColumns}
              tableName={this.tableName}
              disabledHotkeys
              style="height: calc(100% - 40px);"
            />
            <div style="margin: 5px 0 0 5px;">
              <el-button
                type="primary"
                size="mini"
                on-click={e => this.addHandle(e)}
              >
                添加
              </el-button>
              <el-button
                type="primary"
                size="mini"
                on-click={e => this.batchHandle(e)}
              >
                批量编辑
              </el-button>
            </div>
          </ht-card>

          <div style="margin: 10px 0 5px 0; text-align: center;">
            <el-button
              loading={this.loading}
              type="primary"
              plain
              size="mini"
              on-click={e => this.sureHandle(e)}
            >
              确定（F3）
            </el-button>
            <el-button
              type="primary"
              plain
              size="mini"
              on-click={e => this.cancelHandle(e)}
            >
              取消（Esc）
            </el-button>
          </div>
        </div>

        <BatchEidtVehModelBox
          v-model={this.strTableData}
          visible={this.batchEidtVehModelBoxVisible}
          on={{
            "update:visible": val => (this.batchEidtVehModelBoxVisible = val)
          }}
        />
      </ht-dialog>
    );
  }
};
</script>

<style lang="scss" scoped>
.dialog-body {
  &::v-deep .el-dialog__body {
    padding: 5px;
    background-color: #e7ebed;
  }
}
.table-container {
  &::v-deep .el-card__body {
    height: 100%;
  }
}
</style>
