<template>
  <div class="container-box">
    <ht-tabs
      v-model="activeTab"
      :tabs="tabList"
      class="tabs-primary tabs-large"
      style="margin-top: 5px;"
    />
    <keep-alive>
      <component :is="activeTab" />
    </keep-alive>
  </div>
</template>

<script>
import customersAppointment from "./components/customers-appointment/index"; //预约列表
import appointmentCalendar from "./components/appointment-calendar/index"; // 预约看板
import appointmentSeting from "./components/appointment-seting/index"; // 预约设置
import { tabChangeMixin, hotkeyMixin } from "@/mixins";

export default {
  name: "customersBooking",
  components: {
    customersAppointment,
    appointmentCalendar,
    appointmentSeting
  },
  mixins: [tabChangeMixin, hotkeyMixin],
  data() {
    return {
      defaultTab: "customersAppointment",
      tabList: [
        // { id: "customersAppointment", name: "客户预约" },
        // { id: "appointmentCalendar", name: "预约看板" },
        // { id: "appointmentSeting", name: "预约设置" }
      ]
    };
  },
  mounted() {
    this.tabList = [];
    if (this.hasBelongsPermWithoutRoute("read", "repairs.booking.bill")) {
      this.tabList.push({ id: "customersAppointment", name: "客户预约" });
      this.tabList.push({ id: "appointmentCalendar", name: "预约看板" });
    }
    if (this.hasBelongsPermWithoutRoute("read", "repairs.booking.setting")) {
      this.tabList.push({ id: "appointmentSeting", name: "预约设置" });
    }
    if (this.tabList.length > 0) {
      this.defaultTab = this.tabList[0].id;
    }
  },
  activated() {
    this.tabList = [];
    if (this.hasBelongsPermWithoutRoute("read", "repairs.booking.bill")) {
      this.tabList.push({ id: "customersAppointment", name: "客户预约" });
      this.tabList.push({ id: "appointmentCalendar", name: "预约看板" });
    }
    if (this.hasBelongsPermWithoutRoute("read", "repairs.booking.setting")) {
      this.tabList.push({ id: "appointmentSeting", name: "预约设置" });
    }
    if (this.tabList.length > 0) {
      this.defaultTab = this.tabList[0].id;
    }
  }
};
</script>
