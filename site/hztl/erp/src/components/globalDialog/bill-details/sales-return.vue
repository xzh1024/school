<template>
  <ht-dialog
    title="销售退货单"
    :visible.sync="relVisible"
    append-to-body
    width="1200px"
    top="7vh"
    class="ht-dialog-box"
  >
    <div class="flex-container">
      <div
        class="ht-detail-form flex-block-margin flex-block-bg flex-block-padding"
      >
        <div class="ht-page-title page-title-divider">
          单据信息
        </div>
        <el-form
          ref="header"
          v-model="header"
          :show-message="false"
          size="mini"
          label-position="left"
          label-width="100px"
          class="search-box compact-form"
        >
          <el-form-item label="单据号" prop="cooperatorName">
            <span :title="header.billNo" class="form-value">{{
              header.billNo
            }}</span>
          </el-form-item>
          <el-form-item label="状态" prop="statusTxt">
            <span :title="statusTxt" class="form-value">{{ statusTxt }}</span>
          </el-form-item>
          <el-form-item label="客户" prop="cooperatorName">
            <span :title="header.cooperatorName" class="form-value">{{
              header.cooperatorName
            }}</span>
          </el-form-item>
          <el-form-item label="支付方式" prop="enhancedSettlementType">
            <span class="form-value">{{ header.enhancedSettlementType }}</span>
          </el-form-item>
          <el-form-item label="发票类型" prop="invoiceType">
            <span class="form-value">{{
              getFormatInvoiceType(header.invoiceType, header.taxRate)
            }}</span>
          </el-form-item>
          <el-form-item label="业务日期" prop="billDate">
            <span class="form-value">{{ header.billDate }}</span>
          </el-form-item>
          <el-form-item label="业务员" prop="businessManName">
            <span :title="header.businessManName" class="form-value">{{
              header.businessManName
            }}</span>
          </el-form-item>
          <el-form-item label="备注">
            <span :title="header.remark" class="form-value">{{
              header.remark
            }}</span>
          </el-form-item>
          <el-form-item label="收货人">
            <span :title="header.receiverName" class="form-value">{{
              header.receiverName
            }}</span>
          </el-form-item>
          <el-form-item label="收货地址" prop="cooperatorName">
            <span class="form-value">{{ formateAddress(header) }}</span>
          </el-form-item>
          <el-form-item label="提货方式" prop="pickMethod">
            <span class="form-value">{{ header.pickMethod }}</span>
          </el-form-item>
          <el-form-item label="运输方式" prop="transportMethod">
            <span class="form-value">{{ header.transportMethod }}</span>
          </el-form-item>
          <el-form-item label="包装方式" prop="packMethod">
            <span class="form-value">{{ header.packMethod }}</span>
          </el-form-item>
          <el-form-item label="运费付款方" prop="freightPayer">
            <span class="form-value">{{ header.freightPayer }}</span>
          </el-form-item>
          <el-form-item label="物流公司" prop="logisticsCompanyId">
            <span class="form-value">{{ logisticsCompanyName }}</span>
          </el-form-item>
        </el-form>
      </div>
      <div
        class="flex-block-margin flex-block-bg flex-block-padding auto-block flex-container column-flex"
      >
        <div class="ht-page-title page-title-divider">
          配件明细
        </div>
        <ht-setting-table
          class="auto-block"
          :loading="loading"
          :data="details"
          :summary-method="setTotals"
          :columns="baseDetailsColumns"
          :table-name="tableName"
          :key-scope="keyScope"
          show-summary
        />

        <div class="container-box">
          <div v-show="header.createdName">
            制单人：
            <span class="text-font">
              {{ header.createdName }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </ht-dialog>
</template>

<script>
import { salesReturnDetails } from "@/api/sales/salesReturn";
import { SALES_RETURN_STATUS } from "@/constants/states/sales";
import { baseDataMixin, searchMixin, setTotals } from "@/mixins";
import { dateFormat } from "@/utils/date";
import { formateAddress } from "@/utils/formateAddress";
import { reduce } from "lodash";
import hotkeys from "hotkeys-js";
import { DETAIL_SALES_RETURN } from "./constants";
import * as store from "@/utils/store";

let oldKeyScope;
export default {
  name: "PurchaseReturnDialog",
  mixins: [setTotals, baseDataMixin, searchMixin],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    billId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      keyScope: Symbol(DETAIL_SALES_RETURN.name),
      baseDetailsColumns: DETAIL_SALES_RETURN.columns.filter(
        item => item.type !== "controls"
      ),
      tableName: DETAIL_SALES_RETURN.name,
      loading: false,
      header: {},
      details: [],
      dateFormat,
      formateAddress,
      editColumnsVisible: false
    };
  },
  computed: {
    logisticsCompanyName() {
      const logisticsCompany = store
        .logisticsTypes()
        .find(item => item.id === this.header.logisticsCompanyId);
      return logisticsCompany ? logisticsCompany.name : "";
    },
    relVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    },
    statusTxt() {
      return SALES_RETURN_STATUS[this.header.status];
    },
    totoalQty() {
      return this.precisionFormat(
        reduce(this.details, (sum, item) => sum + Number(item.bookQty), 0),
        "qty"
      );
    },
    totoalAmount() {
      return this.precisionFormat(
        reduce(
          this.details,
          (sum, item) =>
            sum +
            Number(
              this.header.invoiceType == "收据"
                ? item.untaxedAmount
                : item.taxedAmount
            ),
          0
        ),
        "money"
      );
    }
  },
  watch: {
    visible: {
      handler(val, oldVal) {
        if (val) {
          oldKeyScope = hotkeys.getScope();
          this.loadData();
          // 未绑定快捷键，设置为全局
          hotkeys.setScope(this.keyScope);
        } else if (oldVal) {
          hotkeys.setScope(oldKeyScope);
        }
      }
    }
  },
  methods: {
    loadData() {
      if (!this.billId) {
        return;
      }
      this.loading = true;
      salesReturnDetails(this.billId)
        .then(data => {
          this.loading = false;
          this.header = data.header;
          this.details = data.rows;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
