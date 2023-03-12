<template>
  <div class="container-box" style="background:#fff;">
    <div style="height: 100%;">
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-padding btns">
          <el-button
            type="primary"
            size="small"
            :disabled="!enableEdit || !editAble"
            @click="addFee"
            >添加费用</el-button
          >
        </div>
        <div class="auto-block flex-block-bg flex-block-margin table-box">
          <ht-setting-table
            :data="tableData"
            setting-all-column
            show-table-setting
            :total="totalSize"
            :current-page.sync="currentPage"
            :columns="tableColumns"
            table-name="advices-orders-service"
          />
        </div>
      </div>
    </div>
    <ht-dialog
      :visible="showOtherDialog"
      title="添加其他费用"
      width="500px"
      @close="showOtherDialog = false"
    >
      <el-form
        :model="ruleform"
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-form"
      >
        <el-form-item label="费用名称" prop="extraFeeName">
          <el-input v-model="ruleform.extraFeeName" />
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <HtFormatNumber
            :disabled="ruleform.disablePrice"
            v-model="ruleform.price"
            placeholder=""
            :min="0"
            precision-type="price"
            @change="qtyChange"
            size="small"
          />
        </el-form-item>
        <el-form-item label="数量" prop="qty">
          <el-input-number
            :disabled="ruleform.disableQty"
            v-model="ruleform.qty"
          />
        </el-form-item>
        <el-form-item label="单位" prop="extraFeeUnit">
          <el-input v-model="ruleform.extraFeeUnit" />
        </el-form-item>
      </el-form>
      <div
        class="dialog-footer-align flex-block-bg flex-block-padding flex-block-margin"
      >
        <el-button size="small" type="primary" @click="submit"
          >确定 (F3)</el-button
        >
        <el-button size="small" @click="showOtherDialog = false"
          >取消 (ESC)</el-button
        >
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import {
  listExtraFee,
  createExtraFee,
  updateExtraFee,
  deleteExtraFee
} from "@/api/repairs/otherFee";
import { mapState } from "vuex";
import { precisionsFixed } from "@/mixins";

const defaultForm = {
  extraFeeName: "",
  price: "",
  qty: "",
  extraFeeUnit: ""
};
export default {
  mixins: [precisionsFixed],

  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    },
    editAble: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    orderInfo: {
      handler(value) {
        if (value) {
          const { status } = value;
          this.enableEdit = status == "recepting" || status == "repairing";
          console.log("建议项目组件获取到更新的工单信息", value);
          this.form = { ...value };
          this.list();
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    hasEditPerm() {
      return this.hasBelongsPerm("update", ["self", "others"]);
    }
  },
  data() {
    return {
      totalSize: 0,
      currentPage: 1,
      enableEdit: false,
      ruleform: { ...defaultForm },
      rules: {
        extraFeeName: [
          {
            required: true,
            message: "请输入费用名称",
            trigger: "change"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入价格",
            trigger: "change"
          }
        ],
        qty: [
          {
            required: true,
            message: "请输入数量",
            trigger: "change"
          }
        ]
      },
      showOtherDialog: false,
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
        {
          prop: "controls",
          type: "controls",
          label: "操作",
          width: 70,
          cantExport: true,
          render: (value, row) => {
            return this.enableEdit && this.hasEditPerm ? (
              <div>
                <el-tooltip enterable={false} placement="top" content="编辑">
                  <span
                    on-click={e => this.handleEdite(row, e)}
                    class="icon operation-icon icon-edit-info"
                  />
                </el-tooltip>
                <el-tooltip enterable={false} placement="top" content="删除">
                  <span
                    on-click={e => this.handleDelete(row, e)}
                    class="icon operation-icon icon-delete-info"
                  />
                </el-tooltip>
              </div>
            ) : (
              ""
            );
          }
        },
        {
          prop: "name",
          label: "费用名称",
          width: CELL_WIDTH.date
        },
        {
          prop: "price",
          label: "单价",
          width: CELL_WIDTH.date,
          formatter: value => {
            return <span style="color:#409eff;">{value}</span>;
          }
        },
        {
          prop: "qty",
          label: "数量",
          width: CELL_WIDTH.date,
          formatter: value => {
            return <span style="color:#409eff;">{value}</span>;
          }
        },
        {
          prop: "unit",
          label: "单位",
          width: CELL_WIDTH.date
        },
        {
          prop: "amount",
          label: "收费金额",
          width: CELL_WIDTH.date,
          formatter: value => {
            return <span style="color:#409eff;">{value}</span>;
          }
        }
      ]
    };
  },
  mounted() {
    if (this.orderInfo) {
      this.form = { ...this.orderInfo };
      const { status } = this.orderInfo;
      this.enableEdit = status == "recepting" || status == "repairing";
      console.log("其他费用组件获取到工单信息", this.form);
      this.list();
    }
  },
  methods: {
    addFee() {
      this.ruleform = { ...defaultForm };
      this.showOtherDialog = true;
    },
    qtyChange(e) {
      const value = this.precisionFormat(e, "money");
      this.ruleform.price = value;
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      this.list();
    },
    list() {
      const { id: billId } = this.form;
      listExtraFee({
        billId,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (!res) {
          this.tableData = [];
          return;
        }
        res.forEach(item => {
          item.discountLabel = item.discountRate ? item.discountRate * 10 : 10;
        });
        this.tableData = res || [];
      });
    },
    handleEdite(e) {
      console.log(e);
      const { flags } = e;
      const disablePrice = flags.lockPrice;
      const disableQty = flags.notQty;
      this.ruleform = {
        ...e,
        extraFeeName: e.name,
        extraFeeUnit: e.unit,
        disablePrice,
        disableQty
      };
      this.showOtherDialog = true;
    },
    handleDelete(e) {
      this.$confirm(`确定删除此费用？`, "提示").then(() => {
        deleteExtraFee({ type: "extraFee", billExtraFeeId: e.id }).then(() => {
          this.$message.success("删除成功");
          this.list();
          this.$emit("updateCount");
        });
      });
    },
    submit() {
      if (this.ruleform.id) {
        updateExtraFee({
          ...this.ruleform,
          name: this.ruleform.extraFeeName,
          unit: this.ruleform.extraFeeUnit
        }).then(() => {
          this.showOtherDialog = false;
          this.list();
        });
      } else {
        const { id: billId } = this.form;
        createExtraFee({
          billId,
          type: "extraFee",
          ...this.ruleform,
          feeProperty: "self"
        }).then(() => {
          this.showOtherDialog = false;
          this.$message.success("添加成功");
          this.list();
          this.$emit("updateCount");
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.btns {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  background: #fff;
  margin-bottom: 10px 0;
  padding: 5px;
  border-radius: 2px;
  border-bottom: solid 1px #eee;
}
.item-wrap {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  .item {
    border-radius: 2px;
    border: solid 1px #eee;
    margin-right: 10px;
  }
  .active {
    color: blue;
    border-color: blue;
    background: grey;
  }
}
</style>
