<template>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <div>
    <SetupComponent></SetupComponent>
    <ReactiveComponent></ReactiveComponent>
  </div>
</template>

<script lang="ts">
/*
  1.setup执行时机
  beforeCreate：表示组件刚刚被创建出来，组件的data和methods还没有初始化好
  setup
  created：表示组件刚刚被创建出来，并且组件的打他和methods已经初始化好

  2.setup注意点
  - 由于在执行setup函数的时候，还没有执行created生命周期方法
    所以在setup函数中，是无法使用data和methods
  - 由于我们不能在setup函数中使用data和methods，
    所以Vue为了避免我们错误的使用，它直接将setup函数中this修改成了undefined
  - setup只能是同步的不能是异步的
*/
import { defineComponent, ref } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";
import SetupComponent from "./components/01-setup.vue";
import ReactiveComponent from "./components/02-reactive.vue";

export default defineComponent({
  name: "App",
  components: {
    // HelloWorld,
    SetupComponent,
    ReactiveComponent
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
