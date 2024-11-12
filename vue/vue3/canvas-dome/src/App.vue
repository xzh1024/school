<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-link to="/about">about</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html,
body {
  /* 禁止用户缩放 */
  overflow: hidden;
  /* 禁止任何形式的缩放 */
  touch-action: none;
  /* 禁止缩放手势 */
  -ms-touch-action: none;
}
</style>
