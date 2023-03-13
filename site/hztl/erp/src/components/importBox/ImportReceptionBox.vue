<script>
import ImportBox from "@/components/importBox";
import { reqImportPaymentsOrReceptions } from "@/api/importBox";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";

const defaultRuleForm = {
  isAssignCompany: false,
  assignCompanyId: 0
};

export default {
  name: "ImportReceptionBox",
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
      return new Promise((resolve, reject) => {
        reqImportPaymentsOrReceptions({
          paymentType: 0,
          assignCompanyId: this.ruleForm.isAssignCompany
            ? this.ruleForm.assignCompanyId
            : undefined,
          importRows: params
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
        title="应收历史导入"
        remakTitle="应收历史导入说明"
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
          <el-form-item label-width="0">
            <div class="item-container">
              <el-checkbox v-model={this.ruleForm.isAssignCompany} />
              <el-form-item
                label="指定来源分公司"
                label-width="101px"
                class="item-content"
              >
                <ht-autoselect
                  v-model={this.ruleForm.assignCompanyId}
                  options={store.allCompanies()}
                  disabled={!this.ruleForm.isAssignCompany}
                  trigger-on-focus={false}
                  placeholder="请选择"
                  highlight-first-item
                  filter-zero
                  clearable
                />
              </el-form-item>
            </div>
          </el-form-item>
        </el-form>
        <div slot="remark" class="remark-container">
          数据要求：
          <br />
          1、导入数据必须需包含：单位名称、应收金额、来源分公司。
          <br />
          <br />
          导入设置说明：
          <br />
          1、若勾选“指定来源分公司”则导入数据均为该分公司产生应收数据。
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
