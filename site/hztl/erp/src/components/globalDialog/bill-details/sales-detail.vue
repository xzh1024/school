<template>
  <ht-dialog
    title="客户订单"
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
          <el-form-item label="收货地址">
            <span class="form-value">{{ formateAddress(header) }}</span>
          </el-form-item>
          <el-form-item label="预计到货日期">
            <span class="form-value">{{ dateFormat(header.arrivalDate) }}</span>
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
          height="calc(100% - 20px)"
        />
        <div class="footer">
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
    </div>
  </ht-dialog>
</template>

<script>
import { resSalesBillDeatils } from "@/api/sales/salesHome";
import { SALES_ORDER_STATUS } from "@/constants/states/sales";
import { baseDataMixin, searchMixin, setTotals } from "@/mixins";
import { dateFormat } from "@/utils/date";
import { formateAddress } from "@/utils/formateAddress";
import hotkeys from "hotkeys-js";
import * as store from "@/utils/store";

import { SALES_ORDER_DETAIL } from "./constants";

let oldKeyScope;
export default {
  name: "PurchaseReceiveDialog",
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
      keyScope: Symbol(SALES_ORDER_DETAIL.name),
      baseDetailsColumns: SALES_ORDER_DETAIL.columns.filter(
        item => item.type !== "controls"
      ),
      tableName: SALES_ORDER_DETAIL.name,
      loading: false,
      header: {},
      details: [],
      dateFormat,
      formateAddress
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
      return SALES_ORDER_STATUS[this.header.status];
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
          this.clearData();
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
      resSalesBillDeatils(this.billId)
        .then(data => {
          this.loading = false;
          this.header = data.header;
          this.details = data.rows || [];
        })
        .catch(() => {
          this.clearData();
          this.loading = false;
        });
    },
    clearData() {
      this.header = {};
      this.details = [];
    }
  }
};
</script>
