<script>
import ImportBox from "@/components/importBox";
import { reqImportVehicles } from "@/api/importBox";
import { searchMixin } from "@/mixins";

const defaultRuleForm = {
  updateVehicle: true,
  autoSaveVehicleLevelType: true
};

export default {
  name: "ImportCustomerVehicleFileBox",
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
      ruleForm: { ...defaultRuleForm }
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
        this.initData();
      }
    }
  },
  methods: {
    initData() {
      this.ruleForm = { ...defaultRuleForm };
    },
    reqHandle(params) {
      params.forEach(item => {
        item.vehicleTypeId = item.vehicleTypeId
          ? Number(item.vehicleTypeId)
          : 0;
        item.insuranceCompanyId = item.insuranceCompanyId
          ? Number(item.insuranceCompanyId)
          : 0;
      });
      return new Promise((resolve, reject) => {
        reqImportVehicles({
          updateVehicle: this.ruleForm.updateVehicle,
          autoSaveVehicleLevelType: this.ruleForm.autoSaveVehicleLevelType,
          rows: params
        })
          .then(data => {
            resolve(data);
          })
          .catch(() => {
            reject();
          });
      });
    },
    handleOnImport() {
      this.$emit("import");
    }
  },

  render() {
    return (
      <import-box
        visible={this.relVisible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        title="客户车辆档案导入"
        remakTitle="客户车辆档案导入说明"
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
          <el-form-item label-width="215px" label="更新已存在车牌号的车辆档案">
            <el-switch v-model={this.ruleForm.updateVehicle} />
          </el-form-item>
          <el-form-item
            label-width="215px"
            label="自动存储车辆级别、车辆类型字典"
          >
            <el-switch v-model={this.ruleForm.autoSaveVehicleLevelType} />
          </el-form-item>
        </el-form>
        <div slot="remark" class="remark-container">
          数据要求：
          <br />
          1、导入数据必须包含以下字段：客户名称、车牌号
          <br />
          <br />
          数据说明：
          <br />
          1、系统中不存在的客户名称，将会自动创建。
          <br />
          <br />
          文件要求：
          <br />
          1、数据文件格式（EXCEL文件）且需选择对应工作表。
          <br />
          2、数据读取完成后，设置数据源，在下拉目标字段中选择对应字段。
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
