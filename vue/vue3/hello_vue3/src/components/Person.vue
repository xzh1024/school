<template>
  <div>{{ name }}</div>
  <div>{{ person.name }}</div>
  <div>{{ person.age }}</div>
  <div>{{ person.aa.bb.cc }}</div>
  <div><button @click="onChangeAge">add</button></div>
  <div><button @click="onChangeName">修改name</button></div>
  <div><button @click="onChangeA">修改aa</button></div>
  <div><button @click="onChangePerson">change</button></div>
  <div><button @click="onUpdateTitle">修改title</button></div>
</template>

<script lang="ts" setup>
import { get } from 'http'
import {
  ref,
  reactive,
  onMounted,
  computed,
  watch,
  watchEffect,
  defineProps,
  defineEmits,
} from 'vue'
import { type Persons } from '../types'

const props = defineProps({
  color: {
    type: String,
    default: '',
  },
  height: {
    type: Number,
    default: 0,
  },
})

// const emit = defineEmits<{
//   (e: 'change', id: number): void
//   (e: 'update', value: string): void
// }>()
const emits = defineEmits(['updateTitle'])

onMounted(() => {
  console.log(name)
  console.log(name.value)
  console.log(person)
  console.log(person.name)
  console.log(person.age)
  console.log(list.value)
  console.log(list.value[0])
  console.log('showPerson--')
  console.log(showPerson)
  console.log(showPerson.value)
  console.log(showPersonA)
  console.log(showPersonA.value)
  console.log(showPersonA.value)
  console.log('color--')
  console.log(props.color)
  console.log(props.height)
})
const name = ref('张三')
let person = reactive({
  name: '李四',
  age: 18,
  aa: {
    bb: {
      cc: 11,
    },
  },
})
let person2 = ref({
  name: '赵六',
  age: 20,
  aa: {
    bb: {
      cc: 22,
    },
  },
})
let personList = reactive<Array<Persons>>([
  { id: 1, name: '张三', age: 18 },
  { id: 2, name2: '李四', age: 19 },
  { id: 3, name: '王五', age: 20 },
])
const showPerson = computed(() => {
  return person.name + ' ' + person.age
})
const showPersonA = computed({
  get: () => person.aa,
  set: () => {
    throw new Error('Cannot modify computed value')
  },
})

watch(
  [() => person.name, () => person.aa],
  (newVal, oldVal) => {
    console.log('newVal--')
    console.log(newVal)
    console.log(oldVal)
  },
  { deep: true },
)
watch(
  [() => person2.value.name, () => person2.value.age, () => person2.value.aa],
  (newVal, oldVal) => {
    console.log('newVal--22')
    console.log(newVal)
    console.log(oldVal)
  },
  { deep: true },
)

watchEffect(() => {
  if (person.age >= 20) {
    console.log('person.age >= 20')
    console.log(person.age)
  }
})

const list = ref([
  { name: '张三', age: 18 },
  { name: '李四', age: 19 },
])
const onChangePerson = () => {
  // reactive变量重新分配，会丢失响应式
  // person = {
  //   name: '王五',
  //   age: 20,
  // }

  // person.name = '王五'
  // person.age = 20
  Object.assign(person, {
    name: '王五',
    age: 20,
  })
}

const onChangeAge = () => {
  person.age++
  person2.value.age++
}
const onChangeName = () => {
  person.name += '~'
  person2.value.name += '~'
}
const onChangeA = () => {
  person.aa.bb.cc += 2
  person2.value.aa.bb.cc += 3
}
const onUpdateTitle = () => {
  emits('updateTitle', 'new title')
}
</script>

<style scoped></style>
