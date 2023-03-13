<script>
import { cloneDeep } from "lodash";
import { AreaSelect, CooperatorsSelect } from "@/components/select";
import FormMixin from "@/mixins/FormMixin";
import { validPhone } from "@/utils/validate";
import { PRINT_LABEL_MAX_EX } from "@/constants";

const formRules = {
  cooperatorName: [
    { required: true, message: "请输入客户名称", trigger: "change" }
  ],
  receiverName: [
    { required: true, message: "请输入收货人", trigger: "change" }
  ],
  receiverPhone: [
    { required: true, message: "请输入收货电话", trigger: "change" },
    { validator: validPhone, trigger: "blur" }
  ],
  receiverAreaId: [
    { required: true, message: "请选择收货区域", trigger: "change" }
  ],
  receiverAddress: [
    { required: true, message: "请输入收货详细地址", trigger: "change" }
  ],
  senderPhone: [{ validator: validPhone, trigger: "blur" }]
};

export default {
  name: "Form",
  components: {
    CooperatorsSelect,
    AreaSelect
  },
  mixins: [FormMixin],
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {}
    };
  },
  computed: {
    cooperatorType() {
      let type = "customer";
      if (this.isReturn) {
        type = "supplier";
      }
      return type;
    },
    cooperatorTips() {
      let tips = "没有查询到客户,回车新增";
      if (this.isReturn) {
        tips = "没有查询到供应商,回车新增";
      }
      return tips;
    }
  },
  watch: {
    value: {
      handler(val) {
        if (JSON.stringify(val) === JSON.stringify(this.formData)) {
          return;
        }
        this.formData = cloneDeep(val);
      },
      deep: true,
      immediate: true
    },
    formData: {
      handler(val) {
        if (JSON.stringify(val) === JSON.stringify(this.value)) {
          return;
        }
        this.$emit("change", cloneDeep(val));
      },
      deep: true
    }
  },
  methods: {
    onAreaChange(areaId, areas, type) {
      switch (type) {
        case "receiver":
          this.formData.receiverAreaNames = areas.map(item => item.label || "");
          break;
        case "sender":
          this.formData.senderAreaNames = areas.map(item => item.label || "");
          break;
        default:
          break;
      }
    },
    onSendPackagesBlur() {
      if (!this.formData.nums) {
        this.formData.nums = 1;
      }
    },
    // 父组件调用
    getValid() {
      return this.getFormValid("form");
    },
    // 父组件调用
    clearValid() {
      return this.$refs.form?.clearValidate();
    }
  },
  render() {
    return (
      <el-form
        ref="form"
        attrs={{
          model: this.formData,
          rules: formRules,
          "show-message": false
        }}
        label-position="left"
        label-width="75px"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <div class="item-title">收件人信息</div>
        <el-form-item label="客户名称" prop="cooperatorName">
          <ht-input
            v-model={this.formData.cooperatorName}
            placeholder={formRules.cooperatorName[0].message}
          />
        </el-form-item>
        <el-form-item label="收货人" prop="receiverName">
          <ht-input
            v-model={this.formData.receiverName}
            placeholder={formRules.receiverName[0].message}
          />
        </el-form-item>
        <el-form-item label="收货电话" prop="receiverPhone">
          <ht-input
            v-model={this.formData.receiverPhone}
            placeholder={formRules.receiverPhone[0].message}
          />
        </el-form-item>
        <el-form-item label="收货地址" prop="receiverAreaId">
          <AreaSelect
            v-model={this.formData.receiverAreaId}
            placeholder={formRules.receiverAreaId[0].message}
            on-change={(areaId, areas) =>
              this.onAreaChange(areaId, areas, "receiver")
            }
          />
        </el-form-item>
        <el-form-item label="" prop="receiverAddress">
          <ht-input
            v-model={this.formData.receiverAddress}
            placeholder={formRules.receiverAddress[0].message}
          />
        </el-form-item>

        <div class="item-title">寄件人信息</div>
        <el-form-item label="发货人">
          <ht-input
            v-model={this.formData.senderName}
            placeholder="请输入发货人"
          />
        </el-form-item>
        <el-form-item label="发货电话">
          <ht-input
            v-model={this.formData.senderPhone}
            placeholder="请输入发货电话"
          />
        </el-form-item>
        <el-form-item label="发货地址">
          <AreaSelect
            v-model={this.formData.senderAreaId}
            clearable
            placeholder="请输入发货区域"
            on-change={(areaId, areas) =>
              this.onAreaChange(areaId, areas, "sender")
            }
          />
        </el-form-item>
        <el-form-item label="">
          <ht-input
            v-model={this.formData.senderAddress}
            placeholder="请输入发货详细地址"
          />
        </el-form-item>

        <div class="item-title">发货商品信息</div>
        <el-form-item label="商品名称">
          <ht-input v-model={this.formData.name} placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="发货件数">
          <HtFormatNumber
            v-model={this.formData.nums}
            min={1}
            max={PRINT_LABEL_MAX_EX}
            placeholder="请输入发货件数"
            on-blur={this.onSendPackagesBlur}
          />
        </el-form-item>
        <el-form-item label="合计数量">
          <HtFormatNumber
            v-model={this.formData.qty}
            min={1}
            precision-type="qty"
            placeholder="请输入合计数量"
          />
        </el-form-item>
        <el-form-item label="合计金额">
          <HtFormatNumber
            v-model={this.formData.billAmount}
            min={0}
            precision-type="money"
            placeholder="请输入合计金额"
          />
        </el-form-item>

        <div class="item-title">备注信息</div>
        <el-form-item label="备注">
          <ht-input v-model={this.formData.remark} placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="自定义文本">
          <ht-input
            v-model={this.formData.customText}
            placeholder="请输入自定义文本"
          />
        </el-form-item>
      </el-form>
    );
  }
};
</script>

<style lang="scss" scoped>
.item-title {
  margin-top: 10px;
  font-weight: 600;

  &:first-child {
    margin-top: 0;
  }
}
</style>
