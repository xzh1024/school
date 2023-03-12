<script>
import ImportBox from "@/components/importBox";
import { reqImportCooperators } from "@/api/importBox";
import convertObjects from "@/utils/convertObjects";
import { userMsg } from "@/utils/store";
const defaultRuleForm = {
  checkList: []
};
export default {
  name: "ImportCooperatorBox",
  components: { ImportBox },
  props: {
    importInfo: {
      type: Object,
      required: true
    },
    visible: Boolean
  },
  data() {
    return {
      isYunXiu: userMsg().hasYx,
      ruleForm: { ...defaultRuleForm },
      rules: {
        checkList: [{ required: true, message: "请选择单位类型" }]
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
        this.initData();
      }
    }
  },
  methods: {
    initData() {
      this.ruleForm = { ...defaultRuleForm };
    },
    isValidate() {
      let flag = true;
      this.$refs.ruleForm.validate((valid, err) => {
        if (!valid) {
          flag = false;
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
      return flag;
    },
    reqHandle(params) {
      return new Promise((resolve, reject) => {
        if (this.isValidate()) {
          const reqParams = params.map(item => {
            return { ...item };
          });
          reqImportCooperators({
            types: {
              isCustomer: this.ruleForm.checkList.includes("isCustomer"),
              isSupplier: this.ruleForm.checkList.includes("isSupplier"),
              isLogistics: this.ruleForm.checkList.includes("isLogistics"),
              isInsuranceCompany: this.ruleForm.checkList.includes(
                "isInsuranceCompany"
              ),
              isStorage: false
            },
            rows: convertObjects(reqParams)
          })
            .then(data => {
              resolve(data);
            })
            .catch(() => {
              reject();
            });
        } else {
          reject();
        }
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
        title="往来单位导入"
        remakTitle="往来单位数据导入说明"
        hasSetting={this.importInfo.hasSetting}
        offset={this.importInfo.offset}
        options={this.importInfo.options}
        isAllFileImport={this.importInfo.isAllFileImport}
        reqHandler={this.reqHandle}
        replaceData={this.ruleForm}
        on-import={this.handleOnImport}
      >
        <el-form
          ref="ruleForm"
          attrs={{
            model: this.ruleForm,
            rules: this.rules,
            "show-message": false
          }}
          size="mini"
          label-position="top"
          class="form-item-small-margin-bottom"
        >
          <el-form-item label="指定导入往来单位类型（可多选）" prop="checkList">
            <el-checkbox-group v-model={this.ruleForm.checkList} min={1}>
              <el-checkbox label="isCustomer">客户</el-checkbox>
              <el-checkbox label="isSupplier">供应商</el-checkbox>
              <el-checkbox label="isLogistics">物流公司</el-checkbox>
              <el-checkbox label="isInsuranceCompany" v-show={this.isYunXiu}>
                保险公司
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="remark" class="remark-container">
          数据要求：
          <br />
          1、导入数据必须需包含：单位名称。
          <br />
          2、必须指定导入往来单位类型，可多选。
          <br />
          <br />
          数据说明：
          <br />
          1、单位名称将与本地往来单位资料进行对比判断是否存在该往来单位。
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
          3、如果是EXCEL文件，则格式要求如下：
          <br />
          （1）第一行表示列标题，不是正式数据。
          <br />
          （2）不能存在合并单元格。
          <br />
          （3）只能有文本，数字，日期等文字信息，不能含有图形，图像等非文字信息。
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
