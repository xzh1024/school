<template>
  <div style="height:100%;background:#f6f6f6;">
    <ht-tabs v-model="activeTab" :tabs="tabs" class="tabs-primary" />
    <div style="height:95%;padding:10px;">
      <component :is="activeTab" />
    </div>
  </div>
</template>

<script>
import SetMenu from "./setMenu/index";
import FixedInsurancePackage from "./fixedInsurancePackage/index";
import { hotkeyMixin } from "@/mixins";
export default {
  name: "FixSetMenu",
  data() {
    return {
      tabs: [
        { name: "套餐", id: "setMenu" },
        { name: "定保套餐", id: "fixedInsurancePackage" }
      ],
      activeTab: ""
    };
  },
  mixins: [hotkeyMixin],
  components: {
    SetMenu,
    FixedInsurancePackage
  }
};
</script>

<style></style>
