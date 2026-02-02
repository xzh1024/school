<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'root-view',
  props: {
    loading: Boolean,
    content: String
  }
}
</script>
