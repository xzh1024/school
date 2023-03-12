<template>
  <div class="container-box">
    <div style="flex:none">
      <ht-tabs
        v-model="activeTab"
        :tabs="tabList"
        class="tabs-primary tabs-large ht-tabs"
        style="margin-top: 5px"
        @change="changeTab"
      />
    </div>
    <div style="flex:auto">
      <keep-alive>
        <components :is="activeTab" @get-jump-id="setJumpId" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { tabChangeMixin, hotkeyMixin } from "@/mixins";
import ConfirmList from "./confirmList";
import PendingList from "./pendingList";
import Settlement from "./settlement";
import eventBus from "@/event";

const TAB_LIST = [
  { name: "急件确认", id: "ConfirmList" },
  { name: "急件处理", id: "PendingList" },
  { name: "急件结算", id: "Settlement" }
];
export default {
  name: "PurchaseDispatch",
  // eslint-disable-next-line vue/no-unused-components
  components: { ConfirmList, PendingList, Settlement },
  mixins: [tabChangeMixin, hotkeyMixin],
  data() {
    return {
      tabList: TAB_LIST,
      jumpId: ""
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      hasConfirmFlow: state => !!state.flows.urgent
    })
  },
  mounted() {
    const query = this.$route.query;
    if (!(query && query.from)) {
      if (
        this.hasBelongsPermWithoutRoute(
          "read",
          "purchases.urgents.confirmAndCreate"
        )
      ) {
        if (
          !this.hasBelongsPermWithoutRoute("read", "purchases.urgents.settle")
        ) {
          this.tabList = TAB_LIST.filter(item =>
            ["ConfirmList", "PendingList"].includes(item.id)
          );
        }
        if (!this.hasConfirmFlow) {
          this.tabList = TAB_LIST.filter(item => item.id !== "ConfirmList");
        }
        if (
          this.jumpId === "submitOrReceivePurchaseDispatch" &&
          this.tabList.map(item => item.id).includes("Settlement")
        ) {
          this.activeTab = "Settlement";
          this.changeTab();
        } else if (
          this.jumpId === "handlePurchaseDispatch" &&
          this.tabList.map(item => item.id).includes("PendingList")
        ) {
          this.activeTab = "PendingList";
          this.changeTab();
        } else if (this.tabList.map(item => item.id).includes("ConfirmList")) {
          this.activeTab = "ConfirmList";
          this.changeTab();
        }
        this.clearJumpId();
      } else if (
        this.hasBelongsPermWithoutRoute("read", "purchases.urgents.settle")
      ) {
        this.tabList = TAB_LIST.filter(item => item.id === "Settlement");
        this.activeTab = "Settlement";
        this.changeTab();
        this.clearJumpId();
      }
    }
    this.$store.dispatch("admin/purchaseMan/loadAll");
  },
  activated() {
    const query = this.$route.query;
    if (!(query && query.from)) {
      if (
        this.hasBelongsPermWithoutRoute(
          "read",
          "purchases.urgents.confirmAndCreate"
        )
      ) {
        if (
          !this.hasBelongsPermWithoutRoute("read", "purchases.urgents.settle")
        ) {
          this.tabList = TAB_LIST.filter(item =>
            ["ConfirmList", "PendingList"].includes(item.id)
          );
        }
        if (!this.hasConfirmFlow) {
          this.tabList = TAB_LIST.filter(item => item.id !== "ConfirmList");
        }
        if (
          this.jumpId === "submitOrReceivePurchaseDispatch" &&
          this.tabList.map(item => item.id).includes("Settlement")
        ) {
          this.activeTab = "Settlement";
          this.changeTab();
        } else if (
          this.jumpId === "handlePurchaseDispatch" &&
          this.tabList.map(item => item.id).includes("PendingList")
        ) {
          this.activeTab = "PendingList";
          this.changeTab();
        } else if (
          this.jumpId === "confirmPurchaseDispatch" &&
          this.tabList.map(item => item.id).includes("ConfirmList")
        ) {
          this.activeTab = "ConfirmList";
          this.changeTab();
        }
        this.clearJumpId();
      } else if (
        this.hasBelongsPermWithoutRoute("read", "purchases.urgents.settle")
      ) {
        this.tabList = TAB_LIST.filter(item => item.id === "Settlement");
        this.activeTab = "Settlement";
        this.changeTab();
        this.clearJumpId();
      }
    }
  },
  methods: {
    openManualDialog() {
      eventBus.$emit("open-manual-dialog", 29);
    },
    setJumpId(jumpId) {
      this.jumpId = jumpId;
    },
    clearJumpId() {
      this.jumpId = "";
    }
  }
};
</script>
