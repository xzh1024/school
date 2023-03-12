<template>
  <div class="dialog-wrap">
    <ht-dialog
      v-bind="$attrs"
      title="编辑领料明细"
      width="750px"
      v-on="$listeners"
    >
      <el-row style="height:100%" :gutter="10">
        <el-col :span="12" style="height: 420px;">
          <ht-card title="配件信息" style="height: 100%;">
            <ht-setting-table
              tableName="stock-editor"
              :columns="tableColumns"
              :data="tableData"
              :show-header="false"
              :index-column="false"
              :selection-type="null"
              :cell-class-name="cellClassName"
              disabled-hotkeys
            />
          </ht-card>
        </el-col>
        <el-col :span="12" style="height: 420px;">
          <ht-card title="领料信息" style="height: 100%;">
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              :show-message="false"
              inline
              size="mini"
              label-width="80px"
            >
              <el-form-item label="领料数量" prop="qty">
                <ht-format-number
                  v-model="form.qty"
                  size="mini"
                  :max="maxPickQty"
                  style="width:220px;"
                  precision-type="qty"
                />
              </el-form-item>
              <el-form-item label="领料单价" prop="price">
                <el-row :gutter="10">
                  <el-col :span="12">
                    <ht-format-number
                      size="mini"
                      v-model="form.price"
                      precision-type="money"
                    />
                  </el-col>
                  <el-col :span="12"
                    >工单价
                    <span style="color:#3AA7FF;">{{
                      this.currentBillPart.price
                    }}</span></el-col
                  >
                </el-row>
              </el-form-item>
              <el-form-item label="维修工" prop="technicianId">
                <ht-autocomplete
                  v-model="technician"
                  :fetch-suggestions="listAllReceptionMan()"
                  placeholder="请选择维修工"
                  :trigger-on-focus="false"
                  size="mini"
                  :maxlength="50"
                  style="width:220px;"
                  @select="technicianChange"
                  highlight-first-item
                />
              </el-form-item>
              <el-form-item label="备注"
                ><el-input
                  v-model="form.remark"
                  style="width:220px;"
                  size="mini"
                  place-holder="备注"
              /></el-form-item>
            </el-form>
          </ht-card>
        </el-col>
      </el-row>
      <div style="margin: 10px 0 5px 0; text-align: center;">
        <el-button type="primary" size="mini" plain @click="confirm">
          确 定（F3）
        </el-button>
        <el-button type="primary" size="mini" plain @click="$emit('close')">
          取 消（Esc）
        </el-button>
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import { FEE_PROPERTY } from "@/views/repair/workOrder/const/columns";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
const defaultForm = {
  qty: 1,
  price: "",
  technicianId: null,
  remark: ""
};
export default {
  name: "StockEditor",
  props: {
    currentBillPart: {
      type: Object,
      default: () => {}
    },
    stock: {
      type: Object,
      default: () => {}
    },
    maxPickQty: {
      type: Number,
      default: 0
    },
    billPartId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          console.log("maxPickQty", this.maxPickQty);
        }
      },
      immediate: true
    },
    stock: {
      handler(value) {
        if (value) {
          console.log("接收到的库存信息", value);
          const { qty, technicianId, technicianName } = value;
          this.form = {
            qty: qty || 1,
            price: this.currentBillPart.price,
            technicianId
          };
          this.technician = technicianName;
        } else {
          this.technician = null;
        }
      },
      deep: true
    }
  },
  data() {
    return {
      tableColumns: [
        { prop: "name", label: "", width: "100" },
        { prop: "content", label: "", width: "120" }
      ],
      technician: "",
      form: {
        ...defaultForm
      },
      rules: {
        qty: [{ required: true, message: "请输入数量", trigger: "change" }],
        price: [{ required: true, message: "请输入价格", trigger: "change" }],
        technicianId: [
          { required: true, message: "请选择维修工", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    tableData() {
      return [
        {
          name: "配件编码",
          content: this.stock.partInfoCode
            ? this.stock.partInfoCode
            : this.currentBillPart?.part?.code
        },
        {
          name: "配件名称",
          content: this.stock.partInfoName
            ? this.stock.partInfoName
            : this.currentBillPart?.part?.name
        },
        {
          name: "品牌",
          content: this.stock.partInfoBrand
            ? this.stock.partInfoBrand
            : this.currentBillPart?.part?.brand
        },
        {
          name: "产地",
          content: this.stock.partInfoProductionPlace
            ? this.stock.partInfoProductionPlace
            : this.currentBillPart?.part?.productionPlace
        },
        {
          name: "收费性质",
          content: this.currentBillPart.feeProperty
            ? FEE_PROPERTY[this.currentBillPart.feeProperty]
            : ""
        },
        { name: "需求数量", content: this.currentBillPart.qty },
        { name: "已领数量", content: this.currentBillPart.pickedQty },
        {
          name: "仓位",
          content: this.stock.warehouseName
            ? this.stock.warehouseName + "-" + this.stock.positionName
            : ""
        },
        { name: "实际数", content: this.stock.realQty },
        { name: "动态数", content: this.stock.dynaQty },
        { name: "上次领料价", content: this.currentBillPart.lastPickPrice },
        { name: "原维修工", content: this.currentBillPart.chargeManName },
        {
          name: "进货价",
          content: getNoPricePermTips(this.stock?.costPrices?.taxed)
        }
      ];
    }
  },
  activated() {
    this.form = {
      ...defaultForm,
      price: this.currentBillPart.price
    };
  },
  mounted() {
    this.form = {
      ...defaultForm,
      price: this.currentBillPart.price
    };
  },
  methods: {
    listAllReceptionMan() {
      const { receptionMan } = this;
      const params = {
        company: "self",
        name: receptionMan,
        roles: ["technicianLeader", "technician"]
      };
      return (query, callback) => {
        searchTypeStaffs(params).then(res => {
          const data = res || [];
          callback(data.map(item => ({ id: item.id, value: item.name })));
        });
      };
    },
    cellClassName({ columnIndex }) {
      if (columnIndex % 2 === 1) {
        return "text-font-primary";
      }
    },
    technicianChange(e) {
      this.form.technicianId = e.id;
      this.$forceUpdate();
    },
    confirm() {
      this.$refs.form.validate((valid, err) => {
        if (!valid) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          this.$emit("submit", {
            billPartId: this.billPartId,
            ...this.form
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.time-line-wrap {
  height: 60vh;
}
</style>
