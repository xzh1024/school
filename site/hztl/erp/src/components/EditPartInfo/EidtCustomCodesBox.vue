<script>
import { CELL_WIDTH } from "@/constants";

export default {
  name: "EidtCustomCodesBox",
  props: {
    visible: Boolean,
    customCodes: {
      type: Array,
      required: true
    }
  },
  data() {
    const validateCustomCode = (rule, value, callback) => {
      if (value) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (
            this.tableData[i + 1] &&
            this.tableData[i].customCode === this.tableData[i + 1].customCode
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
      customCode: [
        {
          required: true,
          message: "请输入图号",
          trigger: "blur"
        },
        {
          validator: validateCustomCode,
          message: "图号重复，请重新输入",
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
          <span
            class="icon operation-icon icon-delete-info"
            on-click={e => this.deleteHandle(row, e)}
          ></span>
        </el-tooltip>
      )
    };
    const isDefaultColumn = {
      label: "默认图号",
      prop: "isDefault",
      width: 70,
      render: (value, row) => {
        return value ? (
          <span class="icon operation-icon icon-selected-info" />
        ) : (
          <span
            class="icon operation-icon icon-select-info"
            on-click={e => this.setDefault(row, e)}
          />
        );
      }
    };
    const imgNoColumn = {
      label: "图号",
      prop: "customCode",
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
            <el-form-item prop="customCode">
              <ht-input v-model={row.customCode} />
            </el-form-item>
          </el-form>
        );
      }
    };

    return {
      loading: false,
      tableName: "editPartInfoEidtImgNoBoxTable",
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
        isDefaultColumn,
        imgNoColumn
      ]
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
        this.loadData();
      }
    }
  },
  methods: {
    loadData() {
      this.tableData = this.customCodes.map((item, index) => ({
        customCode: item,
        isDefault: index === 0
      }));
    },
    deleteHandle(row, e) {
      if (e) {
        e.stopPropagation();
      }
      this.tableData = this.tableData
        .filter(item => item !== row)
        .map((item, index) => ({ ...item, isDefault: index === 0 }));
    },
    setDefault(row, e) {
      if (e) {
        e.stopPropagation();
      }
      this.tableData = this.tableData.map(item => ({
        ...item,
        isDefault: item === row
      }));
    },
    addHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.tableData.push({
        isDefault: false,
        customCode: ""
      });
    },
    sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (this.tableData.length) {
        if (this.validateTableData()) {
          const parmas = this.tableData.filter(
            item => !item.isDefault && item.customCode
          );
          parmas.unshift(this.tableData.find(item => item.isDefault));
          this.$emit(
            "sure",
            parmas.map(item => item.customCode)
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
      if (this.tableData.every(item => !item.customCode)) {
        this.$message.warning({ message: "请输入图号", showClose: true });
        flag = false;
      }
      if (this.tableData.every(item => !item.isDefault)) {
        this.$message.warning({ message: "请设置默认图号", showClose: true });
        flag = false;
      }
      for (let i = 0; i < this.tableData.length; i++) {
        if (
          this.tableData[i + 1] &&
          this.tableData[i].customCode === this.tableData[i + 1].customCode
        ) {
          this.$message.warning({
            message: "图号重复，请重新输入",
            showClose: true
          });
          flag = false;
          return;
        }
      }
      return flag;
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
        visible={this.visible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        append-to-body
        title="编辑图号"
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
            <el-button
              type="primary"
              size="mini"
              style="margin: 5px 0 0 5px;"
              on-click={e => this.addHandle(e)}
            >
              添加
            </el-button>
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
