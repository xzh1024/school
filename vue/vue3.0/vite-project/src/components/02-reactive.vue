<template>
  <div>
    <p>{{ state }}</p>
  </div>
</template>

<script lang="ts">
/*
  1.什么是reactive?
    - reactive是Vue3中提供的实现响应式数据的方法
    - 在Vue2中响应式数据是通过defineProperty来实现的
      而在vue3中响应式数据是通过ES6的Proxy来实现的
  2.reactive注意点：
    - reactive参数必须是对象（json/arr）
    - 如果给reactive传递了其他对象
      + 默认情况下修改对象，界面不会自动更新
      + 如果想更新，可以通过重新赋值的方式
*/
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ReactiveComponent",
  setup() {
    const state = ref("Hello");
    
    return { state };
  }
});
</script>