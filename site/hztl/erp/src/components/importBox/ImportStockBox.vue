<script>
import ImportBox from "@/components/importBox";
import { reqImportStocks } from "@/api/importBox";
import { searchMixin } from "@/mixins";

const defaultRuleForm = {
  createPartsIfNotExist: false,
  isAssignBrand: false,
  assignBrand: "",
  isAssignProductionPlace: false,
  assignProductionPlace: "",
  isAssignWarehouse: false,
  assignWarehouseId: 0,
  assignWarehouse: ""
};

export default {
  name: "ImportStockBox",
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
        reqImportStocks({
          appendNotExistPart: this.ruleForm.createPartsIfNotExist,
          allowZeroQty: this.ruleForm.allowZeroQty,
          assignBrand:
            this.ruleForm.isAssignBrand && this.ruleForm.assignBrand
              ? this.ruleForm.assignBrand
              : undefined,
          assignProductionPlace:
            this.ruleForm.isAssignProductionPlace &&
            this.ruleForm.assignProductionPlace
              ? this.ruleForm.assignProductionPlace
              : undefined,
          assignWarehouseId:
            this.ruleForm.isAssignWarehouse && this.ruleForm.assignWarehouseId
              ? this.ruleForm.assignWarehouseId
              : undefined,
          assignWarehouse:
            this.ruleForm.isAssignWarehouse && this.ruleForm.assignWarehouse
              ? this.ruleForm.assignWarehouse
              : undefined,
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
        title="期初库存导入"
        remakTitle="期初库存数据导入说明"
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
          <el-form-item label-width="175px" label="自动创建不存在的配件资料">
            <el-switch v-model={this.ruleForm.createPartsIfNotExist} />
          </el-form-item>
          <el-form-item label-width="175px" label="数量为零允许导入">
            <el-switch v-model={this.ruleForm.allowZeroQty} />
          </el-form-item>
          <el-form-item label-width="0">
            <div class="item-container">
              <el-checkbox v-model={this.ruleForm.isAssignBrand} />
              <el-form-item
                label="指定品牌"
                label-width="60px"
                class="item-content"
              >
                <ht-autocomplete
                  v-model={this.ruleForm.assignBrand}
                  disabled={!this.ruleForm.isAssignBrand}
                  fetch-suggestions={this.autocompleteSearchPartBrand}
                  trigger-on-focus={false}
                  placeholder="请选择"
                  highlight-first-item
                  clearable
                />
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label-width="0">
            <div class="item-container">
              <el-checkbox v-model={this.ruleForm.isAssignProductionPlace} />
              <el-form-item
                label="指定产地"
                label-width="60px"
                class="item-content"
              >
                <ht-autocomplete
                  v-model={this.ruleForm.assignProductionPlace}
                  fetch-suggestions={this.autocompleteSearchProductionPlace}
                  disabled={!this.ruleForm.isAssignProductionPlace}
                  trigger-on-focus={false}
                  placeholder="请选择"
                  highlight-first-item
                  clearable
                />
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label-width="0">
            <div class="item-container">
              <el-checkbox v-model={this.ruleForm.isAssignWarehouse} />
              <el-form-item
                label="指定仓库"
                label-width="60px"
                class="item-content"
              >
                <ht-autoselect
                  v-model={this.ruleForm.assignWarehouseId}
                  disabled={!this.ruleForm.isAssignWarehouse}
                  defaultValue={this.ruleForm.assignWarehouse}
                  on={{
                    "update:defaultValue": val =>
                      (this.ruleForm.assignWarehouse = val)
                  }}
                  fetch-suggestions={query =>
                    this.searchLoadAllWarehouses(query)
                  }
                  trigger-on-focus={false}
                  placeholder="请选择"
                  remote
                  clearable
                  filter-zero
                  highlight-first-item
                />
              </el-form-item>
            </div>
          </el-form-item>
        </el-form>
        <div slot="remark" class="remark-container">
          数据要求：
          <br />
          1、导入数据必须需包含：配件编码、配件名称、仓库、库存数量、进价、未税进价。
          <br />
          <br />
          数据说明：
          <br />
          1、导入前须要先在基础-仓库设置里新增加要导入的仓库。
          <br />
          2、若本地已有此配件库存信息，将追加导入配件库存到已有库存信息中。
          <br />
          3、若未指定配件性质，默认导入库存性质为完好。
          <br />
          4、在导入时每一行数据都将按照配件编码、品牌和产地这3个字段与系统所存储的配件数据进行匹配，3个字段完全一致才会匹配成功。如果您的配件资料中有使用品牌和产地这两个字段，请在导入时也要加上这两个字段的数据。
          <br />
          售价设置优先级说明：
          <br />
          1、导入值。
          <br />
          2、导入为空或者0，按售价制定公式。
          <br />
          3、公式未匹配，按现有库存最高价。
          <br />
          4、以上都未取到值，设置为0。
          <br />
          <br />
          导入设置说明：
          <br />
          1、若开启“自动创建不存在的配件资料”则会根据配件编码，品牌，产地匹配本地配件资料，若无此配件信息则自动新增。
          <br />
          2、若开启数量为零允许导入”则能够导入0库存信息。
          <br />
          3、若勾选指定产地\品牌\仓库，则导入资料品牌将设置为该指定产地\品牌\仓库信息。若仅仅勾选未指定数据，则信息将以右侧导入对应字段数据为准。。
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
