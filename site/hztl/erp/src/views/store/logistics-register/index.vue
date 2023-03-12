<template>
  <div class="container-box">
    <ht-tabs
      v-model="activeTab"
      :tabs="tabs"
      class="tabs-primary tabs-large"
      style="margin-top: 5px;"
      @change="changeTab"
    />
    <HandleTab
      v-show="activeTab === 'DeliverTab'"
      :my-company-info="myCompnayInfoData"
    />
    <HandleTab
      v-show="activeTab === 'ReceiveTab'"
      :my-company-info="myCompnayInfoData"
      is-receive
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import HandleTab from "./handleTab";
import { hotkeyMixin, searchMixin, tabChangeMixin } from "@/mixins";

export default {
  name: "LogisticsRegister",
  components: {
    HandleTab
  },
  mixins: [tabChangeMixin, hotkeyMixin, searchMixin],
  data() {
    return {
      defaultTab: "DeliverTab",
      tabs: [
        { id: "DeliverTab", name: "发货处理" },
        { id: "ReceiveTab", name: "收货处理" }
      ]
    };
  },
  computed: {
    ...mapState("admin/myCompnayInfo", ["myCompnayInfoData"])
  },
  mounted() {
    if (!this.myCompnayInfoData) {
      this.$store.dispatch("admin/myCompnayInfo/loadAll");
    }
    if (this.hasAutoPerm("send.read") && !this.hasAutoPerm("receive.read")) {
      this.tabs = [{ id: "DeliverTab", name: "发货处理" }];
      this.defaultTab = "DeliverTab";
      this.activeTab = "DeliverTab";
      this.changeTab();
    } else if (
      !this.hasAutoPerm("send.read") &&
      this.hasAutoPerm("receive.read")
    ) {
      this.tabs = [{ id: "ReceiveTab", name: "收货处理" }];
      this.defaultTab = "ReceiveTab";
      this.activeTab = "ReceiveTab";
      this.changeTab();
    }
  }
};
</script>
