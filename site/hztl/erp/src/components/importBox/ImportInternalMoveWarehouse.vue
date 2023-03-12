<script>
import ImportBox from "@/components/importBox";
import { reqImportStockMoving } from "@/api/importBox";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";
import { loadSearchPosition } from "@/api/store/stocks";
import { getSystemParamsDetail } from "@/api/base/base";

const defaultRuleForm = {
  targetWarehouseCheck: false,
  targetWarehouseId: null,
  targetWarehouseName: "",
  targetPositionCheck: false,
  targetPositionId: null,
  targetPositionName: ""
};

export default {
  name: "ImportInternalMoveWarehouse",
  components: { ImportBox },
  mixins: [searchMixin],
  props: {
    importInfo: {
      type: Object,
      required: true
    },
    visible: Boolean
  },
  data() {
    return {
      ruleForm: { ...defaultRuleForm },
      models: 1
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
        this.loadParams();
        this.initData();
      }
    },
    ruleForm: {
      handler: function(val) {
        if (!val.targetWarehouseCheck) {
          this.ruleForm.targetPositionCheck = false;
          this.ruleForm.targetPositionId = 0;
          this.ruleForm.targetWarehouseId = 0;
        }
        if (!val.targetPositionCheck) {
          this.ruleForm.targetPositionId = 0;
        }
        this.importInfo.options.forEach(item => {
          if (item.value == "targetWarehouseName") {
            if (val.targetWarehouseId) {
              // console.log("选了仓库");
              item.required = false;
            } else {
              // console.log("无仓库");
              item.required = true;
            }
          }
          if (item.value == "targetPositionName") {
            if (val.targetPositionId) {
              // console.log("选了货位");
              item.required = false;
            } else {
              // console.log("无货位");
              item.required = true;
            }
          }
        });
      },
      deep: true
    }
  },
  created() {
    this.loadParams();
    this.initData();
  },
  methods: {
    store() {
      return store;
    },
    initData() {
      this.ruleForm = { ...defaultRuleForm };
    },
    loadParams() {
      getSystemParamsDetail({ module: "storage", type: "manageMode" }).then(
        res => {
          if (res.value) {
            // 简易模式
            this.models = 1;
          } else {
            // 标准模式
            this.models = 0;
          }
        }
      );
    },
    reqHandle(params) {
      return new Promise((resolve, reject) => {
        reqImportStockMoving({
          header: {
            targetWarehouseId: this.ruleForm.targetWarehouseId || 0,
            targetPositionId: this.ruleForm.targetPositionId || 0
          },
          rows: params
        })
          .then(data => {
            if (data.id > 0) {
              this.$emit("update", data.id);
            }
            resolve(data);
          })
          .catch(() => {
            reject();
          });
      });
    },
    handleOnImport() {
      this.$emit("import");
    },
    async handleWarehouseChange() {
      const positions = await this.getPositions(
        this.ruleForm.targetWarehouseId
      );
      console.log(positions);
      if (positions.length) {
        const position = positions.find(
          item => item.id === this.ruleForm.targetPositionId
        );
        console.log(position);
        if (position) {
          this.ruleForm.targetPositionId = this.targetPositionId;
        } else {
          this.ruleForm.targetPositionId = null;
        }
      } else {
        this.ruleForm.targetPositionId = null;
      }
    },
    async getPositions(warehouseId, query) {
      const positions = await loadSearchPosition({
        name: query,
        warehouseId
      });
      return positions || [];
    }
  },

  render() {
    return (
      <import-box
        visible={this.relVisible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        title="内部移仓明细导入"
        remakTitle="内部移仓明细导入说明"
        hasSetting={this.importInfo.hasSetting}
        offset={this.importInfo.offset}
        options={this.importInfo.options}
        isAllFileImport={this.importInfo.isAllFileImport}
        reqHandler={this.reqHandle}
        replaceData={this.ruleForm}
        on-import={this.handleOnImport}
      >
        <el-form
          size="mini"
          label-position="left"
          class="form-item-small-margin-bottom"
        >
          <el-form-item label-width="140px">
            <el-checkbox
              slot="label"
              style="padding: 0 10px"
              v-model={this.ruleForm.targetWarehouseCheck}
            >
              指定目标仓库
            </el-checkbox>

            <ht-autoselect
              v-model={this.ruleForm.targetWarehouseId}
              default-value={this.ruleForm.targetWarehouseName}
              fetch-suggestions={query =>
                this.searchLoadManageWarehouses({
                  status: 0,
                  name: query,
                  managerCompanyId: this.store().userInfoMsg().companyId,
                  managerStaffId: this.store().userInfoMsg().staffId
                })
              }
              disabled={!this.ruleForm.targetWarehouseCheck ? true : false}
              remote
              filter-zero
              trigger-on-focus={false}
              highlight-first-item
              class="switch-focus focus-toWarehouseId"
              placeholder="目标仓库"
              on-change={this.handleWarehouseChange}
            />
          </el-form-item>
          <el-form-item label-width="140px">
            <el-checkbox
              slot="label"
              style="padding: 0 10px"
              v-model={this.ruleForm.targetPositionCheck}
              disabled={!this.ruleForm.targetWarehouseCheck ? true : false}
            >
              指定目标货位
            </el-checkbox>
            <ht-autoselect
              v-model={this.ruleForm.targetPositionId}
              default-value={this.ruleForm.targetPositionName}
              fetch-suggestions={query =>
                this.getPositions(this.ruleForm.targetWarehouseId, query)
              }
              disabled={
                !this.ruleForm.targetPositionCheck ||
                !this.ruleForm.targetWarehouseId
                  ? true
                  : false
              }
              remote
              filter-zero
              trigger-on-focus={false}
              highlight-first-item
              class="switch-focus focus-toPositionId"
              placeholder="目标货位"
              // on-change={this.handlePositionIdChange}
            />
          </el-form-item>
        </el-form>
        <div slot="remark" class="remark-container">
          数据要求：
          <br />
          1、
          {this.models == 0
            ? "配件编码、配件名称、批次号、移动数量、原仓库、原货位、原货区名称、原货层名称、原货架名称、目标仓库、目标货位、目标货区名称、目标货层名称、目标货架名称；"
            : "导入数据必须包含：配件编码、配件名称、批次号、移动数量、原仓库、原货位、目标仓库、目标货位；"}
          <br />
          <br />
          数据说明：
          <br />
          1、某条导入数据报错，不影响其他数据导入；
          <br />
          2、导入前请确认移仓权限是否满足；
          <br />
          3、配件性质为空时，默认“完好”；
          <br />
          <br />
          文件要求：
          <br />
          1、数据文件格式（EXCEL文件）且需选择对应工作表。
          <br />
          2、数据读取完成后，设置数据源，在下拉目标字段中选择对应字段。
          <br />
          要求：必须一一对应且不重复。
          <br />
          3、第一行表示列标题，不是正式数据。
          <br />
          4、不能存在合并单元格。
          <br />
          5、只能有文本，数字，日期等文字信息，不能含有图形，图像等非文字信息。
          <br />
        </div>
      </import-box>
    );
  }
};
</script>

<style lang="scss" scoped>
.item-container {
  display: flex;
  &::v-deep .el-checkbox {
    margin-right: 10px;
  }
}
.item-content {
  flex: 1;
}
.remark-container {
  font-size: 13px;
  padding: 10px;
}
</style>
