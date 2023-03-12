<template>
  <div class="container-box" style="height:100%">
    <ht-tabs
      v-model="defaultTab"
      :tabs="tabList"
      class="tabs-primary tabs-large"
      style="margin-top: 5px;"
    />
    <keep-alive>
      <component :is="defaultTab" />
    </keep-alive>
  </div>
</template>

<script>
import receptionConsultant from "./components/reception-consultant/index";
import maintenanceTechnician from "./components/maintenance-technician/index";
import washCar from "./components/wash-car/index";
import { tabChangeMixin, hotkeyMixin } from "@/mixins";

export default {
  name: "Performance",
  components: { receptionConsultant, maintenanceTechnician, washCar },
  mixins: [tabChangeMixin, hotkeyMixin],
  data() {
    return {
      defaultTab: "receptionConsultant",
      tabList: [
        { id: "receptionConsultant", name: "接待顾问" },
        { id: "maintenanceTechnician", name: "维修技师" },
        { id: "washCar", name: "洗车人员" }
      ]
    };
  }
};
</script>
