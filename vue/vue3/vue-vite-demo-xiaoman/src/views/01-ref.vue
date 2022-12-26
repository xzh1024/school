<script setup lang="ts">
import { ref, isRef, shallowRef, triggerRef, customRef, reactive, onMounted } from 'vue'
import type { Ref } from 'vue'

const refDom = ref();
console.dir(refDom);
const clickRefDom = () => {
  console.dir(refDom.value?.innerHTML);
  refDom.value.innerHTML = '666';
}

onMounted(() => {
  console.log(refDom.value.innerHTML)
})

/*
  ref和shallowRef是不能一块写的 不然 会影响shallowRef 造成视图的更新
*/
type M = {
  name: string
}
const Man: Ref<M> = ref({ name: '小满' })
console.log(isRef(Man))

const Man2 = shallowRef({ name: '大满', obj: {age: 12} })
console.log(isRef(Man2))

const changeMan = () => {
  // Man.value.name = '小满222';
  Man2.value.name = "大满333";
  Man2.value.obj.age = 18;
  triggerRef(Man2)

  console.log(Man2.value)
}


function MyRef<T>(value:string, delay = 2000) {
  let timeout: any
  let count = 0;
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return `第${count}次修改姓名:${value}`
      },
      set(newVal) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          count++
          value = newVal
          trigger()
        }, delay)
      }
    }
  })
}
const obj = MyRef<string>('123');



// import HelloWorld from './components/HelloWorld.vue'
const message: string = '学习vue3'
const num = ref(0)
const add = () => {
  console.log('son click')
  num.value++
}
const parentClick = () => {
  console.log('parent click')
}

type Person = {
  name: string,
  age: number
}
const person: Person = reactive({
  name: '小明',
  age: 12
})
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
  <div>
    <h1>{{ message }}</h1>
    <div>姓名：{{ person.name }}</div>
    <div>年龄：{{ person.age }}</div>
    <div v-on:click="parentClick">
      <button @click.stop="add">add</button>
      <div>{{ num }}</div>
    </div>

    <div>ref:</div>
    <div>{{ Man.name }}</div>
    <div>shallowRef:</div>
    <div>{{ Man2.name }}</div>
    <div>{{ Man2.obj.age }}</div>
    <button @click="changeMan">改变</button>

    <div>customRef:</div>
    <div>{{ obj }}</div>
    <button
      @click="
        () => {
          obj = '456'
        }
      "
    >
      改变
    </button>
    <div ref="refDom">我是refDom</div>
    <button
      @click="clickRefDom">
      改变
    </button>
  </div>
</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
