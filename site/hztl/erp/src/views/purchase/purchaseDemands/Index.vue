<template>
  <div class="container-box">
    <ht-card class="auto-card" no-padding>
      <LocalDemands
        ref="refLocalDemands"
        :selected-rows.sync="selectedRows"
        :key-scope="keyScopes.table"
        :table-data.sync="partsTableData"
        @hotkeysUp="handleLocalTableKeyCode"
        @on-add-data="handleAddData"
        @click.native.stop="setKeyScope(keyScopes.table)"
      />
    </ht-card>

    <EditBasketDetailBox
      :partData="curAddData"
      :visible.sync="showAddBox"
      @sure="handleAddSure"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import PartsInfoSearch from "@/components/partsInfoSearch";
import LocalDemands from "./LocalDemands";
import { EditBasketDetailBox } from "../components";
import { addPurchaseBasketFromDemand } from "@/api/purchase/purchaseBasket";
import hotkeys from "hotkeys-js";

export default {
  name: "PurchaseDemands",
  components: {
    LocalDemands,
    EditBasketDetailBox
  },
  data() {
    return {
      keyScopes: {
        table: Symbol("purchaseDemandsLocalTable")
      },
      partsTableData: [],
      selectedRows: [],
      isCanAddLocalTableRow: false,
      curAddData: {},
      showAddBox: false,
      saberVisible: false
    };
  },
  computed: {
    refLocalDemands() {
      if (this.$refs.refLocalDemands) {
        return this.$refs.refLocalDemands;
      } else {
        return null;
      }
    }
  },
  watch: {
    partsTableData(value) {
      if (value.length) {
        this.setKeyScope(this.keyScopes.table);
        this.selectedRows = [value[0]];
      }
    },
    selectedRows(value) {
      if (value.length) {
        this.partId = value[0].partId;
        this.isCanAddLocalTableRow = true;
      } else {
        this.isCanAddLocalTableRow = false;
      }
    },
    saberVisible(value) {
      if (!value) {
        this.setKeyScope(this.keyScopes.table);
      }
    }
  },
  activated() {
    this.setKeyScope(this.keyScopes.table);
    this.$sidebarBox.addSidebar({
      shortcutsKey: "Alt+P",
      title: "配件信息查询",
      width: "550px",
      height: "calc(100% - 140px)",
      contentRender: () => <PartsInfoSearch partId={this.partId} />
    });
  },
  deactivated() {
    this.$sidebarBox.removeSidebar("Alt+P");
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScopes.table);
  },
  methods: {
    ...mapActions("admin/purchaseInfo", ["loadPurchaseBasketInfo"]),
    bindKeyCode(e) {
      switch (e.code) {
        case "F5":
          this.refLocalDemands.searchHandle();
          break;
        case "F6":
          this.refLocalDemands.clearSearchForm();
          break;
        case "F10":
          this.refLocalDemands.showPartDetailBox();
          break;
        default:
          break;
      }
    },
    handleLocalTableKeyCode(e) {
      this.bindKeyCode(e, this.keyScopes.table);
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    },
    handleAddData(row) {
      this.curAddData = { ...row };
      this.showAddBox = true;
    },
    handleAddSure(data) {
      addPurchaseBasketFromDemand({
        supplierId: data.supplierId,
        property: data.property,
        partId: this.curAddData.partId,
        sourceId: this.curAddData.id,
        qty: data.qty,
        isTaxed: data.isTaxed,
        price: data.price,
        amount: data.amount,
        remark: data.remark
      }).then(() => {
        if (this.hasBelongsPermWithoutRoute("read", "purchases.carts")) {
          this.loadPurchaseBasketInfo();
        }
        this.refLocalDemands.pageChange();
        this.$message.success({
          message: "添加配件到采购篮成功！",
          showClose: true
        });
      });
    }
  }
};
</script>
