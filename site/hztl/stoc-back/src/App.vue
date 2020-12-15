<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    if (sessionStorage.token || this.$route.query.token) {
      this.$store.dispatch("base/loadBase");
    }
  }
};
</script>
