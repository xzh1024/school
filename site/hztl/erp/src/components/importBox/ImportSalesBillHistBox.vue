<script>
import ImportBox from "@/components/importBox";
import { reqImportBillHis } from "@/api/importBox";
import * as store from "@/utils/store";

const defaultRuleForm = {
  isAssignCompany: false,
  assignCompanyId: 0,
  createPartsIfNotExist: true,
  createCooperator: true
};

export default {
  name: "ImportSalesBillHistBox",
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
        reqImportBillHis({
          type: "XS",
          assignCompanyId: this.ruleForm.isAssignCompany
            ? this.ruleForm.assignCompanyId
            : undefined,
          createPartsIfNotExist: this.ruleForm.createPartsIfNotExist,
          createCooperator: this.ruleForm.createCooperator,
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
        title="历史销售单导入"
        remakTitle="历史销售单数据导入说明"
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
                label="指定单据所属公司"
                label-width="115px"
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
          <el-form-item label-width="215px" label="自动创建不存在的配件资料">
            <el-switch v-model={this.ruleForm.createPartsIfNotExist} />
          </el-form-item>
          <el-form-item label-width="215px" label="自动创建不存在的客户">
            <el-switch v-model={this.ruleForm.createCooperator} />
          </el-form-item>
        </el-form>
        <div slot="remark" class="remark-container">
          数据要求：
          <br />
          1、导入数据必须包含：分公司名称、销售单号、客户、支付方式、发票类型、业务日期、配件编码、配件名称、仓库、销售数量、销售价（含税）、成本价（含税）、成本价（未税）。
          <br />
          <br />
          数据说明：
          <br />
          1、每一行数据表示一条单据明细，单头部分每行重复。
          <br />
          2、导入前必须先在基础-仓库设置里新增需要导入的仓库和货位，并设置好仓库管理模式。
          <br />
          3、导入前必须先设置好支付方式、发票类型字典项，否则导入时匹配不到会报错。
          <br />
          4、若未指定配件性质，默认导入性质为完好。
          <br />
          5、仅支持导入已完成单据。
          <br />
          6、在导入时每一行数据都将按照配件编码、品牌和产地这3个字段与系统所存储的配件数据进行匹配，3个字段完全一致才会匹配成功。如果您的配件资料中有使用品牌和产地这两个字段，请在导入时也要加上这两个字段的数据。
          <br />
          <br />
          导入设置说明：
          <br />
          1、若勾选“指定单据所属公司”则导入数据均为该公司产生单据数据。
          <br />
          2、若开启“自动创建不存在的配件资料”则会根据配件编码，品牌，产地匹配本地配件资料，若无此配件信息则自动新增。
          <br />
          3、若开启“自动创建不存在的客户”则会匹配本地客户，若无此客户则自动新增。
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
