<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <button @click="$store.commit('add', 2)">
        {{ $store.state.counter }}
      </button>
      <button @click="$store.dispatch('add', 10)">
        async:{{ $store.state.counter }}
      </button>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$store);
    this.$store.state = 1;
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
