<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view v-if="isRouterAlive" />
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (sessionStorage.token || this.$route.query.token) {
        this.$store.dispatch("base/loadBase");
      }
      this.$store.commit("city/setActiveAreaCity");
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
