<template>
  <div id="app">
    <router-view v-loading="!loaded" />
    <manual-dialog />
    <HtSidebarBox ref="sidebarBox" :visible.sync="sidebarBoxVisible" />
  </div>
</template>

<script>
import ManualDialog from "@/components/manualDialog";
import Vue from "vue";

export default {
  name: "App",
  components: { ManualDialog },
  data() {
    return {
      loaded: false,
      sidebarBoxVisible: false
    };
  },
  async mounted() {
    Vue.prototype.$sidebarBox = this.$refs.sidebarBox;
    this.loaded = false;
    await this.$store.dispatch("admin/user/loadDeviceKey");
    this.loaded = true;
  }
};
</script>
