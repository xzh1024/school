<template>
  <ht-dialog
    title="入库单"
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
        <bill-panel
          v-loading="loading"
          :billData="header"
          :billEnum="billEnum"
        ></bill-panel>
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
          <div v-show="header.createdByName">
            制单人：
            <span class="text-font">
              {{ header.createdByName }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </ht-dialog>
</template>

<script>
import { storageOutEnterBillDetails } from "@/api/storage";
import { baseDataMixin, searchMixin, setTotals } from "@/mixins";
import { dateFormat } from "@/utils/date";
import { formateAddress } from "@/utils/formateAddress";
import hotkeys from "hotkeys-js";
import { DETAIL_STORAGE_ENTER } from "./constants";
import { ENTER_BILL_ENUM } from "./constants/storage/enum";
import BillPanel from "@/components/bill-panel/BillPanel";
import * as store from "@/utils/store";

let oldKeyScope;
export default {
  name: "StorageEnterDialog",
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
  components: { BillPanel },
  data() {
    return {
      keyScope: Symbol(DETAIL_STORAGE_ENTER.name),
      tableName: DETAIL_STORAGE_ENTER.name,
      loading: false,
      header: {},
      details: [],
      dateFormat,
      formateAddress,
      billEnum: ENTER_BILL_ENUM
    };
  },
  computed: {
    baseDetailsColumns() {
      const baseDetailsColumns = [...DETAIL_STORAGE_ENTER.columns];
      return baseDetailsColumns.filter(item => item.type !== "controls");
    },
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
      storageOutEnterBillDetails({
        billId: this.billId,
        billType: "RK"
      })
        .then(data => {
          this.loading = false;
          this.header = data.header;
          this.details = data.details || [];
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
