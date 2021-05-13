<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>{{ count }}</p>
    <button @click="myFn">按钮</button>
    <ul>
      <li
        style="list-style: none"
        v-for="(item, index) in state.stus"
        :key="index"
        @click="deleteStu(item.id)"
      >
        {{ item.name }} - {{ item.age }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue";
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const count = ref(0);

    function myFn() {
      // this.count++;
      count.value++;
    }

    const { state, deleteStu } = useRemoveStudent();

    return { count, myFn, state, deleteStu };
  }
});

function useRemoveStudent() {
  let state = reactive({
    stus: [
      {
        id: 1,
        name: "张三",
        age: 10
      },
      {
        id: 2,
        name: "李四",
        age: 20
      },
      {
        id: 3,
        name: "王五",
        age: 30
      }
    ]
  });

  function deleteStu(id) {
    state.stus = state.stus.filter(stu => stu.id !== id);
  }

  return { state, deleteStu };
}
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
