<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    this.init();
  },
  methods: {
    init() {
      if (sessionStorage.token || this.$route.query.token) {
        this.$store.dispatch("base/loadBase");
      }
      this.$store.commit("city/setActiveAreaCity");
    }
  }
};
</script>
