<template>
  <ht-dialog
    v-bind="$attrs"
    title="修改固定售价"
    class="dialog-body"
    append-to-body
    width="500px"
    v-on="$listeners"
  >
    <div class="container-box">
      <el-row :gutter="5" style="height: 310px;">
        <el-col :span="12" style="height: 100%">
          <ht-card title="固定售价" style="height: 100%">
            <ht-table
              :data="tableData"
              :columns="tableColumns"
              :show-header="false"
              :index-column="false"
              :selection-type="null"
            />
          </ht-card>
        </el-col>
        <el-col :span="12" style="height: 100%;">
          <ht-card title="固定售价" style="height: 100%;">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              :show-message="false"
              class="form-item-small-margin-bottom"
              size="mini"
              label-width="72px"
              label-position="left"
            >
              <el-form-item label="零售价" prop="retail">
                <HtFormatNumber
                  v-model="ruleForm.retail"
                  precision-type="price"
                  :min="0"
                />
              </el-form-item>
              <el-form-item label="平台价" prop="platform">
                <HtFormatNumber
                  v-model="ruleForm.platform"
                  precision-type="price"
                  :min="0"
                />
              </el-form-item>
              <el-form-item label="调拨价" prop="allot">
                <HtFormatNumber
                  v-model="ruleForm.allot"
                  precision-type="price"
                  :min="0"
                />
              </el-form-item>
              <el-form-item label="批发价" prop="wholesale">
                <HtFormatNumber
                  v-model="ruleForm.wholesale"
                  precision-type="price"
                  :min="0"
                />
              </el-form-item>
              <el-form-item label="批发价一" prop="wholesale1">
                <HtFormatNumber
                  v-model="ruleForm.wholesale1"
                  precision-type="price"
                  :min="0"
                />
              </el-form-item>
              <el-form-item label="批发价二" prop="wholesale2">
                <HtFormatNumber
                  v-model="ruleForm.wholesale2"
                  precision-type="price"
                  :min="0"
                />
              </el-form-item>
              <el-form-item label="批发价三" prop="wholesale3">
                <HtFormatNumber
                  v-model="ruleForm.wholesale3"
                  precision-type="price"
                  :min="0"
                />
              </el-form-item>
              <el-form-item label="批发价四" prop="wholesale4">
                <HtFormatNumber
                  v-model="ruleForm.wholesale4"
                  precision-type="price"
                  :min="0"
                />
              </el-form-item>
            </el-form>
          </ht-card>
        </el-col>
      </el-row>
      <div class="dialog-footer-align" style="margin: 5px 0">
        <el-button type="primary" size="mini" plain @click.stop="sureHandle">
          确定（F3）
        </el-button>
        <el-button type="primary" size="mini" plain @click.stop="cancelHandle">
          取消（Esc）
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>

<script>
const defaultRuleForm = {
  retail: "",
  allot: "",
  platform: "",
  wholesale: "",
  wholesale1: "",
  wholesale2: "",
  wholesale3: "",
  wholesale4: ""
};

export default {
  name: "EditFixedPriceBox",
  props: {
    editData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      tableColumns: [
        { prop: "name", label: "", width: 70 },
        {
          prop: "content",
          label: "",
          width: 140,
          classNames: "text-font-primary"
        }
      ],
      ruleForm: { ...defaultRuleForm },
      rules: {
        retail: [
          { required: true, message: "请输入零售价！", trigger: "change" }
        ],
        allot: [
          { required: true, message: "请输入调拨价！", trigger: "change" }
        ],
        platform: [
          { required: true, message: "请输入平台价！", trigger: "change" }
        ],
        wholesale: [
          { required: true, message: "请输入批发价！", trigger: "change" }
        ],
        wholesale1: [
          { required: true, message: "请输入批发价一！", trigger: "change" }
        ],
        wholesale2: [
          { required: true, message: "请输入批发价二！", trigger: "change" }
        ],
        wholesale3: [
          { required: true, message: "请输入批发价三！", trigger: "change" }
        ],
        wholesale4: [
          { required: true, message: "请输入批发价四！", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    tableData() {
      return [
        { name: "配件编码", content: this.editData.code },
        { name: "配件名称", content: this.editData.name },
        { name: "配件品牌", content: this.editData.brand },
        { name: "产地", content: this.editData.productionPlace }
      ];
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          this.ruleForm = { ...defaultRuleForm, ...this.editData.salePrices };
        }
      },
      immediate: true
    }
  },
  methods: {
    sureHandle() {
      this.$refs.ruleForm.validate((valid, err) => {
        if (valid) {
          const salePrices = { ...this.ruleForm };
          const { id, updatedBy, updatedAt } = this.editData;
          this.$emit("on-change", { salePrices, id, updatedBy, updatedAt });
          this.cancelHandle();
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
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
</style>
