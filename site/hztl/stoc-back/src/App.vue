<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
      flag: false
    }
  },
  created() {
    console.log(this.$route.query);
  },
};
</script>
