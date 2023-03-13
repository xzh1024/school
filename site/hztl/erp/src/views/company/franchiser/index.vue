<template>
  <div class="container-box">
    <div style="flex: none">
      <ht-tabs
        v-model="activeTab"
        :tabs="tabList"
        class="tabs-primary tabs-large ht-tabs"
        style="margin-top: 5px;"
        @change="changeTab"
      />
    </div>
    <div style="flex: auto;">
      <keep-alive>
        <components :is="activeTab" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { tabChangeMixin } from "@/mixins";
import MainStore from "./mainStore";
import FranchisedStore from "./franchisedStore";
import HotkeyMixin from "@/mixins/hotkeyMixin";

export default {
  name: "Franchiser",
  // eslint-disable-next-line vue/no-unused-components
  components: { MainStore, FranchisedStore },
  mixins: [tabChangeMixin, HotkeyMixin],
  data() {
    return {
      defaultTab: "MainStore",
      tabList: [
        { id: "MainStore", name: "我是总店" },
        { id: "FranchisedStore", name: "我是加盟店" }
      ]
    };
  }
};
</script>
