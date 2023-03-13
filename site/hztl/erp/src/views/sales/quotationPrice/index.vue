<template>
  <div class="container-box">
    <div class="header">
      <el-button type="primary" size="mini" @click="showSearchBox">
        查询（Ins）
      </el-button>
      <el-button
        :disabled="!canShowPartDetailBox"
        type="primary"
        size="mini"
        @click="showPartDetailBox"
      >
        配件详情（F10）
      </el-button>
      <el-button
        :disabled="!selectedTableRows.length"
        type="primary"
        size="mini"
        @click="showStocksLockedBox"
      >
        锁定数明细
      </el-button>
      <el-checkbox
        v-loading="loading"
        :disabled="loading"
        v-model="filterZero"
        style="margin-left: 10px;"
      >
        过滤零库存（Alt+O）
      </el-checkbox>
      <el-popover placement="top" width="500" trigger="click">
        <p>
          当客户向您询价时，可在此选择对应配件进行，报价结果将加入报价篮中。点击F5也可以查询该配件及对客户历史报价等信息，方便您精确报价。
        </p>
        <span
          slot="reference"
          class="text-danger"
          style="cursor:pointer;float:right"
          ><i class="el-icon-question"></i>什么是客户报价</span
        >
      </el-popover>
    </div>
    <ht-card class="auto-card" no-padding>
      <parts-table
        ref="refPartsTable"
        :key-scope="keyScopes.localTable"
        :canAdd="canAddBasket"
        :type="TYPE"
        :isKB="true"
        @handleKeyCode="handleTableKeyCode"
        @rowOperation="handleAddData"
        @on-add-data="handleAddData"
        @handleSelectRow="handlePartsTableSelectRow"
        @part-swap="showPartSwapBox"
        @part-detail-change="showPartDetailBox"
        @click.native.stop="setKeyScope(keyScopes.localTable)"
      />
    </ht-card>

    <search-parts
      :visible.sync="searchBoxVisible"
      :type="TYPE"
      :companyId="myCompanyId"
      @searchParamsChange="searchParamsChange"
    />
    <EditBasketDetailBox
      ref="editBasketDetail"
      :visible.sync="showEditSalesBox"
      :partData="curAddData"
      @sure="addPartsHandle"
      :searchParams="searchParams"
    />
    <PartSwapBox
      :visible.sync="partSwapBoxVisible"
      :canAdd="canAddBasket"
      :partData="partSwapData"
      isObtainPrice
      :type="TYPE"
      @on-add-data="handleAddData"
    />
    <parts-detail-box :visible.sync="partDetailBoxVisible" :value="partId" />
    <storage-stocks-locked-dialog
      :visible="storageStocksLockedVisible"
      :stockFilter="stockFilter"
      @close="storageStocksLockedVisible = false"
    />
  </div>
</template>

<script>
import { addSalesBasket } from "@/api/sales/salesBasket";
import { mapActions } from "vuex";
import PartsInfoSearch from "@/components/partsInfoSearch";
import {
  EditBasketDetailBox,
  PartSwapBox,
  PartsTable,
  SearchParts
} from "../components";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog";
import hotkeys from "hotkeys-js";
import { mapState } from "vuex";
import {
  getStaffSystemParamsDetail,
  updateStaffSystemParamsPartDetail
} from "@/api/base/base";

const TYPE = "KB";

export default {
  name: "SalesQuotationPrice",
  components: {
    PartsTable,
    EditBasketDetailBox,
    SearchParts,
    PartSwapBox,
    PartsDetailBox,
    StorageStocksLockedDialog
  },
  data() {
    return {
      keyScopes: {
        localTable: Symbol("salesQuotationPriceLocalTable"),
        partsInfo: Symbol("salesQuotationPricePartsInfo")
      },
      selectedTableRows: [],
      partTableFocusFlag: false,
      searchBoxVisible: false,
      partDetailBoxVisible: false,
      curAddData: {},
      showEditSalesBox: false,
      saberVisible: false,
      partId: null,
      partSwapData: {},
      partSwapBoxVisible: false,
      storageStocksLockedVisible: false,
      stockFilter: {},
      searchParams: {},
      filterZero: true,
      TYPE,
      loading: false,
      firstLoad: true
    };
  },
  computed: {
    ...mapState("admin/user", {
      myCompanyId: state => state.userInfoMsg.companyId
    }),
    canAddBasket() {
      return this.hasAutoPerm("enquiry");
    },
    canShowPartDetailBox() {
      return !!this.selectedTableRows.length;
    },
    refPartsTable() {
      if (this.$refs.refPartsTable) {
        return this.$refs.refPartsTable;
      } else {
        return {};
      }
    }
  },
  watch: {
    saberVisible(value) {
      if (!value) {
        this.setKeyScope(this.keyScopes.localTable);
      }
    },
    filterZero() {
      if (this.firstLoad) return (this.firstLoad = false);
      this.searchParamsChange(this.searchParams);
      updateStaffSystemParamsPartDetail({
        module: "common",
        type: "filterZeroQty",
        value: {
          [TYPE]: this.filterZero
        }
      });
    }
  },
  mounted() {
    this.getFilterZero();
  },
  activated() {
    this.setKeyScope(this.keyScopes.localTable);
    this.$sidebarBox.addSidebar({
      shortcutsKey: "Alt+P",
      title: "配件信息查询",
      width: "690px",
      height: "calc(100% - 140px)",
      contentRender: () => (
        <PartsInfoSearch partId={this.partId} resetedActiveTab="Sales" />
      )
    });
  },
  deactivated() {
    this.$sidebarBox.removeSidebar("Alt+P");
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScopes.partsInfo);
    hotkeys.deleteScope(this.keyScopes.localTable);
  },
  methods: {
    ...mapActions("admin/saleInfo", ["loadSalesBasketInfo"]),
    getFilterZero() {
      this.loading = true;
      getStaffSystemParamsDetail({
        module: "common",
        type: "filterZeroQty"
      })
        .then(res => {
          if (res.value) {
            this.filterZero = res.value[TYPE] || false;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    searchParamsChange(params) {
      if (!params) {
        return;
      }
      this.searchParams = {
        ...params,
        condsAfterAgg: {
          ...params.condsAfterAgg,
          filterZero: this.filterZero
        }
      };
      this.refPartsTable.handleLocalSearch(this.searchParams);
    },
    bindKeyCode(e) {
      switch (e.code) {
        case "F10":
          this.showPartDetailBox();
          break;
        case "Insert":
          this.showSearchBox();
          break;
        case "Numpad0":
          if (e.key == "Insert") this.showSearchBox();
          break;
        case "KeyO":
          if (e.altKey) {
            if (!this.loading) {
              this.filterZero = !this.filterZero;
            }
          }
          break;
        default:
          break;
      }
    },
    handleTableKeyCode(e) {
      this.bindKeyCode(e, this.keyScopes.localTable);
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    handlePartsTableSelectRow(value) {
      this.selectedTableRows = [...value];
      if (value.length) {
        this.partId = value[0].partId || value[0].id;
      }
    },
    showSearchBox() {
      this.searchBoxVisible = true;
    },
    showPartDetailBox() {
      if (!this.canShowPartDetailBox) {
        return;
      }
      this.partDetailBoxVisible = true;
    },
    handleAddData(row) {
      if (!this.canAddBasket) {
        this.$message.error({
          message: "您没有权限添加配件到报价篮！",
          showClose: true
        });
        return;
      }
      this.curAddData = {
        ...row,
        sellerId: row.ownerCompanyId,
        sellerName: row.ownerCompanyName,
        skuId: row.id,
        bookQty: Number(row.demandQty) || 1,
        sourceType: 0
      };
      this.showEditSalesBox = true;
    },
    addPartsHandle(data) {
      addSalesBasket({
        rows: [
          {
            skuId: data.skuId,
            sellerId: data.sellerId,
            sellerName: data.sellerName,
            partId: data.sourceType ? undefined : data.partId || data.id,
            code: data.code,
            name: data.name,
            brand: data.brand,
            productionPlace: data.productionPlace,
            property: data.property,
            bookQty: data.bookQty,
            price: data.price,
            platformPurchasePrice: data.sourceType
              ? data.platformPurchasePrice
              : undefined,
            saleVehModel: data.saleVehModel,
            remark: data.remark
          }
        ],
        warehouseId: data.sourceType ? undefined : data.warehouseId,
        cooperatorId: data.cooperatorId,
        isTaxed: data.isTaxed,
        sourceType: data.sourceType
      })
        .then(() => {
          if (
            this.hasBelongsPermWithoutRoute("read", "sales.quotationBaskets")
          ) {
            this.loadSalesBasketInfo();
          }
          this.$message.success({
            message: "添加配件到报价篮成功！",
            showClose: true
          });
          this.$refs.editBasketDetail.cancelHandle();
        })
        .catch(() => {
          this.$refs.editBasketDetail.initData();
        });
    },
    showPartSwapBox(row) {
      this.partSwapData = row || {};
      this.partSwapBoxVisible = true;
    },
    showStocksLockedBox() {
      if (!this.selectedTableRows.length) {
        return;
      }
      this.stockFilter = {
        partId: this.partId,
        ownerCompanyId: this.myCompanyId
      };
      this.storageStocksLockedVisible = true;
    }
  }
};
</script>
