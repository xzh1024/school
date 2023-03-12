<template>
  <ht-dialog
    width="850px"
    title="可合并急件到货单提示"
    append-to-body
    v-bind="$attrs"
    v-on="$listeners"
    @close="closeHandle"
  >
    <p>
      现有急件到货单可合并，请选择将要合并的单据并点击确定。点击取消或关闭弹框将不执行合并单据操作，并继续执行之前的操作。
    </p>
    <ht-setting-table
      :tableName="tableName"
      :columns="tableColumns"
      :data="billList"
    />
    <div slot="footer" class="dialog-footer-align">
      <el-button
        :loading="loading"
        :disabled="!mergedBillId"
        type="primary"
        plain
        size="small"
        @click.stop="sureHandle"
      >
        确定（F3）
      </el-button>
      <el-button
        :loading="loading"
        type="primary"
        plain
        size="small"
        @click.stop="cancelHandle"
      >
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { baseDataMixin } from "@/mixins";
import { CELL_WIDTH } from "@/constants";
import {
  splitPurchaseDispatch,
  updatePurchaseDispatch
} from "@/api/purchase/purchaseDispatch";
import {
  batchCreatePurchaseDispatch,
  createPurchaseDispatch
} from "@/api/purchase/purchaseDispatch/pending";

export default {
  name: "MergeDialog",
  mixins: [baseDataMixin],
  props: {
    reqType: {
      type: String,
      default: "create" // create / update
    },
    reqBody: {
      type: Object,
      default() {
        return {};
      }
    },
    billList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      mergedBillId: 0,
      hasReq: false,
      tableName: "purchaseDispatchMergeDialogList",
      loading: false,
      columns: [
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
          label: "操作",
          type: "controls",
          width: 50,
          cantExport: true
        },
        {
          label: "急件到货单号",
          prop: "billNo",
          width: CELL_WIDTH.no
        },
        {
          label: "供应商",
          prop: "cooperatorName",
          width: CELL_WIDTH.companyName
        },
        {
          prop: "billDate",
          label: "业务日期",
          width: CELL_WIDTH.date,
          type: "date"
        },
        {
          prop: "enhancedSettlementType",
          label: "支付方式",
          width: CELL_WIDTH.type
        },
        {
          prop: "invoiceType",
          label: "发票类型",
          width: CELL_WIDTH.type
        }
      ]
    };
  },
  computed: {
    tableColumns() {
      return this.columns.map(item => {
        if (item.prop === "controls") {
          return {
            ...item,
            render: (value, row) => (
              <el-radio v-model={this.mergedBillId} label={row.id}>
                <div></div>
              </el-radio>
            )
          };
        }
        return item;
      });
    }
  },
  watch: {
    "$attrs.visible"(val) {
      if (val) {
        this.mergedBillId = 0;
        this.hasReq = false;
      }
    }
  },
  methods: {
    closeDialog() {
      this.hasReq = true;
      this.$emit("update:visible", false);
    },
    closeHandle() {
      if (this.hasReq) {
        return;
      }
      this.reqHandle(false);
    },
    sureHandle() {
      if (!this.mergedBillId) {
        return;
      }
      this.hasReq = false;
      this.reqHandle(true);
    },
    cancelHandle() {
      this.hasReq = false;
      this.reqHandle(false);
    },
    reqHandle(isMerge) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let reqApi = createPurchaseDispatch;
      if (this.reqType == "create") {
        reqApi = createPurchaseDispatch;
      } else if (this.reqType == "batchCreate") {
        reqApi = batchCreatePurchaseDispatch;
      } else if (this.reqType == "update") {
        reqApi = updatePurchaseDispatch;
      } else if (this.reqType == "split") {
        reqApi = splitPurchaseDispatch;
      } else {
        this.$message({
          type: "error",
          message: "未知类型接口"
        });
        return;
      }

      const req = { ...this.reqBody };
      if (isMerge) {
        req.mergedBillId = this.mergedBillId;
      } else {
        req.mergedBillId = 0;
      }

      reqApi(req)
        .then(res => {
          this.loading = false;
          if (res.code == "ok") {
            this.closeDialog();
            this.$emit("done", isMerge);
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
