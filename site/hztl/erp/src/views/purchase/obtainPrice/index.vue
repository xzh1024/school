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
        :disabled="!selectedLocalTableRows.length"
        type="primary"
        size="mini"
        @click="showStocksLockedBox"
      >
        锁定数明细
      </el-button>
      <el-popover placement="top" width="500" trigger="click">
        <p>
          当您向供应商询价后，可在此选择对应配件记录询价信息，询价结果将加入采购篮中。点击F5也可以查询该配件历史询价等信息，方便您准确寻找低价优品货源
        </p>
        <span
          slot="reference"
          class="text-danger"
          style="cursor:pointer;float:right"
          ><i class="el-icon-question"></i>什么是快速订货</span
        >
      </el-popover>
    </div>
    <ht-card class="auto-card" no-padding>
      <PartsList
        ref="refPartsList"
        :key-scope="keyScopes.localTable"
        :canAdd="canAddBasket"
        :table-data.sync="partsTableData"
        :selected-rows.sync="selectedLocalTableRows"
        :type="TYPE"
        @hotkeysUp="handleLocalTableKeyCode"
        @on-add-data="handleAddData"
        @handle-row="handleAddData"
        @part-swap="showPartSwapBox"
        @part-detail-change="showPartDetailBox"
        @click.native.stop="setKeyScope(keyScopes.localTable)"
      />
    </ht-card>
    <search-parts-box
      :visible.sync="searchBoxVisible"
      :type="TYPE"
      :companyId="myCompanyId"
      @searchParamsChange="searchParamsChange"
    />
    <EditBasketDetailBox
      :partData="curAddData"
      :visible.sync="showAddBox"
      @sure="handleAddSure"
    />
    <PartSwapBox
      :visible.sync="partSwapBoxVisible"
      :canAdd="canAddBasket"
      :partData="partSwapData"
      :type="TYPE"
      @add-part="handleAddData"
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
import { mapActions } from "vuex";
import { addPurchaseBasketFromEnquiry } from "@/api/purchase/purchaseBasket";
import PartsDetailBox from "@/components/parts/PartsDetailsBox";
import StorageStocksLockedDialog from "@/components/storage-detail/StorageStocksLockedDialog";
import PartsInfoSearch from "@/components/partsInfoSearch";
import {
  EditBasketDetailBox,
  PartSwapBox,
  PartsList,
  SearchPartsBox
} from "../components";
import hotkeys from "hotkeys-js";
import { mapState } from "vuex";

const TYPE = "KX";

export default {
  name: "PurchaseObtainPrice",
  components: {
    PartsList,
    SearchPartsBox,
    EditBasketDetailBox,
    PartSwapBox,
    PartsDetailBox,
    StorageStocksLockedDialog
  },
  data() {
    return {
      keyScopes: {
        localTable: Symbol("purchaseObtainPriceLocalTable")
      },
      partsTableData: [],
      selectedLocalTableRows: [],
      searchBoxVisible: false,
      partDetailBoxVisible: false,
      curAddData: {},
      showAddBox: false,
      saberVisible: false,
      partId: null,
      partSwapData: {},
      partSwapBoxVisible: false,
      storageStocksLockedVisible: false,
      stockFilter: {},
      TYPE,
      searchParams: {}
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
      return !!this.selectedLocalTableRows.length;
    }
  },
  watch: {
    partsTableData(value) {
      if (value.length) {
        this.setKeyScope(this.keyScopes.localTable);
        this.selectedLocalTableRows = [value[0]];
      }
    },
    selectedLocalTableRows(value) {
      if (value.length) {
        this.partId = value[0].partId;
      } else {
        this.partId = 0;
      }
    },
    saberVisible(value) {
      if (!value) {
        this.setKeyScope(this.keyScopes.localTable);
      }
    }
  },
  activated() {
    this.setKeyScope(this.keyScopes.localTable);
    this.$sidebarBox.addSidebar({
      shortcutsKey: "Alt+P",
      title: "配件信息查询",
      width: "690px",
      height: "calc(100% - 140px)",
      contentRender: () => (
        <PartsInfoSearch partId={this.partId} resetedActiveTab="Purchase" />
      )
    });
  },
  deactivated() {
    this.$sidebarBox.removeSidebar("Alt+P");
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScopes.localTable);
  },
  methods: {
    ...mapActions("admin/purchaseInfo", ["loadPurchaseBasketInfo"]),
    bindKeyCode(e) {
      switch (e.code) {
        case "Insert":
          this.showSearchBox();
          break;
        case "F10":
          this.showPartDetailBox();
          break;
        case "Numpad0":
          if (e.key == "Insert") this.showSearchBox();
          break;
        default:
          break;
      }
    },
    handleLocalTableKeyCode(e) {
      this.bindKeyCode(e, this.keyScopes.localTable);
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    handleLocalTableRowAdd(row) {
      this.handleAddData(row);
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
    searchParamsChange(params) {
      this.searchParams = params;
      this.$refs.refPartsList.handleLocalSearch(params);
    },
    handleAddData(row) {
      if (!this.canAddBasket) {
        this.$message.error({
          message: "您没有权限添加配件到采购篮！",
          showClose: true
        });
        return;
      }
      this.curAddData = { ...row };
      this.showAddBox = true;
    },
    handleAddSure(data) {
      addPurchaseBasketFromEnquiry({
        supplierId: data.supplierId,
        property: data.property,
        partId: this.curAddData.partId,
        qty: data.qty,
        isTaxed: data.isTaxed,
        price: data.price,
        amount: data.amount,
        remark: data.remark
      }).then(() => {
        if (this.hasBelongsPermWithoutRoute("read", "purchases.carts")) {
          this.loadPurchaseBasketInfo();
        }
        this.$message.success({
          message: "添加配件到采购篮成功！",
          showClose: true
        });
      });
    },
    showPartSwapBox(row) {
      this.partSwapData = row;
      this.partSwapBoxVisible = true;
    },
    showStocksLockedBox() {
      if (!this.selectedLocalTableRows.length) {
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
