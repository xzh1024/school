<template>
  <ht-card no-padding class="auto-card">
    <ht-tabs v-model="activeTab" :tabs="tabs" class="tabs-regular" />
    <component :is="activeTab" />
  </ht-card>
</template>

<script>
import Unified from "./unified/index";
import Program from "./program/index";
import Step from "./step/index";
export default {
  data() {
    return {
      tabs: [
        { name: "统一比例提成（启用）", id: "unified" },
        { name: "阶梯提成（未启用）", id: "program" },
        { name: "项目/配件提成（未启用）", id: "step" }
      ],
      activeTab: ""
    };
  },
  components: {
    Unified,
    Program,
    Step
  }
};
</script>

<style></style>
