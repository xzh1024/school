<template>
  <section class="container-box">
    <ht-card title="选择期初数据导入项" class="auto-card">
      <ul class="collect-box">
        <li v-for="(item, index) in collectList" :key="index">
          <div
            :class="{
              'icon-img-main-1': index % 1 == 0,
              'icon-img-main-2': index % 2 == 0,
              'icon-img-main-3': index % 3 == 0,
              'icon-img-main-4': index % 4 == 0,
              disabled: !hasImportPerm(item.perm)
            }"
            class="icon-main-box"
            @click="importData(item)"
            :title="item.name.length > 5 ? item.name : ''"
          >
            <i
              :class="item.className ? item.className : ''"
              class="menu-icon"
            />
            <div class="collect-name">
              {{ item.name }}
            </div>
          </div>
        </li>
      </ul>
    </ht-card>

    <ImportPartsBox
      :visible.sync="importPartsBoxVisible"
      :importInfo="importInfo"
    />
    <ImportCooperatorBox
      :visible.sync="importCooperatorBoxVisible"
      :importInfo="importInfo"
    />
    <ImportPurchaseBillHistBox
      :visible.sync="importPurchaseBillHistBoxVisible"
      :importInfo="importInfo"
    />
    <ImportPurchaseRetHistBox
      :visible.sync="importPurchaseRetHistBoxVisible"
      :importInfo="importInfo"
    />
    <ImportSalesBillHistBox
      :visible.sync="importSalesBillHistBoxVisible"
      :importInfo="importInfo"
    />
    <ImportSalesRetHistBox
      :visible.sync="importSalesRetHistBoxVisible"
      :importInfo="importInfo"
    />
    <ImportStockBox
      :visible.sync="importStockBoxVisible"
      :importInfo="importInfo"
    />
    <ImportReceptionBox
      :visible.sync="importReceptionBoxVisible"
      :importInfo="importInfo"
    />
    <ImportPaymentBox
      :visible.sync="importPaymentBoxVisible"
      :importInfo="importInfo"
    />
    <ImportCustomrtVehicleFileBox
      :visible.sync="importCustomrtVehicleFileBoxVisible"
      :importInfo="importInfo"
    />
    <ImportMaintenanceProjectsBox
      :visible.sync="importMaintenanceProjectsBoxVisible"
      :importInfo="importInfo"
    />
  </section>
</template>

<script>
import ImportPartsBox from "@/components/importBox/ImportPartsBox";
import ImportCooperatorBox from "@/components/importBox/ImportCooperatorBox";
import ImportPurchaseBillHistBox from "@/components/importBox/ImportPurchaseBillHistBox";
import ImportPurchaseRetHistBox from "@/components/importBox/ImportPurchaseRetHistBox";
import ImportSalesBillHistBox from "@/components/importBox/ImportSalesBillHistBox";
import ImportSalesRetHistBox from "@/components/importBox/ImportSalesRetHistBox";
import ImportStockBox from "@/components/importBox/ImportStockBox";
import ImportReceptionBox from "@/components/importBox/ImportReceptionBox";
import ImportPaymentBox from "@/components/importBox/ImportPaymentBox";
import ImportCustomrtVehicleFileBox from "@/components/importBox/ImportCustomerVehicleFileBox";
import ImportMaintenanceProjectsBox from "@/components/importBox/ImportMaintenanceProjectsBox";
import { userMsg } from "@/utils/store";
import {
  partOptions,
  cooperatorOptions,
  purchaseBillHistOptions,
  purchaseRetHistOptions,
  salesBillHistOptions,
  salesRetHistOptions,
  stockOptions,
  receptionOptions,
  paymentOptions,
  customerVehicleFileOptions,
  maintenanceProjectsOptions
} from "@/components/importBox/options";
import {
  PART_COUNT,
  PAYMENT_COUNT,
  RECEPTION_COUNT,
  STOCK_COUNT,
  UNIT_COUNT
} from "@/constants";

const COLLECT_LIST = [
  {
    name: "配件资料",
    id: "part",
    perm: "part",
    hasSetting: true,
    options: partOptions,
    offset: PART_COUNT,
    isAllFileImport: false,
    className: "icon-img-workbench-base-white"
  },
  {
    name: "往来单位",
    id: "cooperator",
    perm: "cooperator",
    hasSetting: true,
    options: cooperatorOptions,
    offset: UNIT_COUNT,
    isAllFileImport: false,
    className: "icon-img-workbench-base-white"
  },
  {
    name: "历史采购单",
    id: "purchaseBillHist",
    perm: "purchase",
    hasSetting: true,
    options: purchaseBillHistOptions,
    offset: UNIT_COUNT,
    isAllFileImport: false,
    className: "icon-img-workbench-base-white"
  },
  {
    name: "历史采购退货单",
    id: "purchaseRetHist",
    perm: "purchaseReturn",
    hasSetting: true,
    options: purchaseRetHistOptions,
    offset: UNIT_COUNT,
    isAllFileImport: false,
    className: "icon-img-workbench-base-white"
  },
  {
    name: "历史销售单",
    id: "salesBillHist",
    perm: "sale",
    hasSetting: true,
    options: salesBillHistOptions,
    offset: UNIT_COUNT,
    isAllFileImport: false,
    className: "icon-img-workbench-base-white"
  },
  {
    name: "历史销售退货单",
    id: "salesRetHist",
    perm: "saleReturn",
    hasSetting: true,
    options: salesRetHistOptions,
    offset: UNIT_COUNT,
    isAllFileImport: false,
    className: "icon-img-workbench-base-white"
  },
  {
    name: "期初库存",
    id: "stock",
    perm: "stock",
    hasSetting: true,
    options: stockOptions,
    offset: STOCK_COUNT,
    isAllFileImport: false,
    className: "icon-img-workbench-store-white"
  },
  {
    name: "应收历史",
    id: "reception",
    perm: "receivablePayable",
    hasSetting: true,
    options: receptionOptions,
    offset: RECEPTION_COUNT,
    isAllFileImport: true,
    className: "icon-img-workbench-cashier-white"
  },
  {
    name: "应付历史",
    id: "payment",
    perm: "receivablePayable",
    hasSetting: true,
    options: paymentOptions,
    offset: PAYMENT_COUNT,
    isAllFileImport: true,
    className: "icon-img-workbench-cashier-white"
  }
];

const COLLECT_LIST_YX = [
  {
    name: "客户车辆档案",
    id: "customerVehicleFile",
    perm: "customerVehicleFile",
    hasSetting: true,
    options: customerVehicleFileOptions,
    offset: UNIT_COUNT,
    isAllFileImport: false,
    className: "icon-img-workbench-base-white"
  },
  {
    name: "维修项目",
    id: "maintenanceProjects",
    perm: "maintenanceProjects",
    hasSetting: true,
    options: maintenanceProjectsOptions,
    offset: UNIT_COUNT,
    isAllFileImport: false,
    className: "icon-img-workbench-base-white"
  }
];

export default {
  name: "DataImport",
  components: {
    ImportPartsBox,
    ImportCooperatorBox,
    ImportPurchaseBillHistBox,
    ImportPurchaseRetHistBox,
    ImportSalesBillHistBox,
    ImportSalesRetHistBox,
    ImportStockBox,
    ImportReceptionBox,
    ImportPaymentBox,
    ImportCustomrtVehicleFileBox,
    ImportMaintenanceProjectsBox
  },
  data() {
    return {
      collectList: userMsg().hasYx
        ? [...COLLECT_LIST, ...COLLECT_LIST_YX]
        : [...COLLECT_LIST],
      importInfo: {},
      importPartsBoxVisible: false,
      importCooperatorBoxVisible: false,
      importPurchaseBillHistBoxVisible: false,
      importPurchaseRetHistBoxVisible: false,
      importSalesBillHistBoxVisible: false,
      importSalesRetHistBoxVisible: false,
      importStockBoxVisible: false,
      importReceptionBoxVisible: false,
      importPaymentBoxVisible: false,
      importCustomrtVehicleFileBoxVisible: false,
      importMaintenanceProjectsBoxVisible: false,
      isYunXiu: userMsg().hasYx
    };
  },
  methods: {
    importData(item) {
      if (!this.hasImportPerm(item.perm)) {
        return false;
      }
      this.importInfo = { ...item };
      switch (this.importInfo.id) {
        case "part":
          this.importPartsBoxVisible = true;
          break;
        case "cooperator":
          this.importCooperatorBoxVisible = true;
          break;
        case "purchaseBillHist":
          this.importPurchaseBillHistBoxVisible = true;
          break;
        case "purchaseRetHist":
          this.importPurchaseRetHistBoxVisible = true;
          break;
        case "salesBillHist":
          this.importSalesBillHistBoxVisible = true;
          break;
        case "salesRetHist":
          this.importSalesRetHistBoxVisible = true;
          break;
        case "stock":
          this.importStockBoxVisible = true;
          break;
        case "reception":
          this.importReceptionBoxVisible = true;
          break;
        case "payment":
          this.importPaymentBoxVisible = true;
          break;
        case "customerVehicleFile":
          this.importCustomrtVehicleFileBoxVisible = true;
          break;
        case "maintenanceProjects":
          this.importMaintenanceProjectsBoxVisible = true;
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.collect-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 0 10px 0;
  margin: 0px;

  li {
    color: #fff;
    cursor: pointer;

    & + li {
      margin-left: 4px;
    }

    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .collect-name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }
  }
  .disabled {
    cursor: not-allowed;
  }
}
</style>
