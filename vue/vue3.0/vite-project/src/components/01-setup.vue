<template>
  <div>
    <p>{{ name }}</p>
    <button @click="fn1">按钮</button>
    <p>{{ age }}</p>
    <button @click="fn2">按钮</button>
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
  - setup函数只能是同步的不能是异步的
*/
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SetupComponent",
  data() {
    return {
      name: "小明"
    };
  },
  methods: {
    fn1() {
      alert("姓名：" + this.name);
    }
  },
  beforeCreate() {
    console.log(111);
    console.log(this);
  },
  setup() {
    console.log(222);
    const age = ref(12);

    function fn2() {
      console.log(this);
      alert("年龄：" + age.value);
    }
    return { age, fn2 };
  }
});
</script>