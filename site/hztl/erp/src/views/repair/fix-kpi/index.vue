<template>
  <div style="height:100%;background:#f6f6f6;">
    <ht-tabs v-model="activeTab" :tabs="tabs" class="tabs-primary" />
    <div style="height:96%;padding:10px;">
      <component :is="activeTab" />
    </div>
  </div>
</template>

<script>
import Consultant from "./consultant/index";
import Technician from "./technician/index";
import Washboy from "./washboy/index";
export default {
  data() {
    return {
      tabs: [
        { name: "接待顾问", id: "consultant" },
        { name: "维修技师", id: "technician" },
        { name: "洗车人员", id: "washboy" }
      ],
      activeTab: ""
    };
  },
  components: {
    Consultant,
    Technician,
    Washboy
  }
};
</script>

<style></style>
