<template>
  <div>
    新闻页面
    <div class="list">
      <div class="item" v-for="(item, index) in newsList" :key="index" @click="updatePage(item)">
        {{ item.title }}
      </div>
    </div>
    <!-- <div @click="updatePage">刷新页面</div> -->
    <!-- <div>标题：{{ title }}</div> -->
    <!-- <div>内容：{{ content }}</div> -->
    <!-- <div>时间：{{ infoData.time }}</div> -->
    <div>标题：{{ infoData.title }}</div>
    <div>内容：{{ infoData.content }}</div>
    <div>时间：{{ infoData.time }}</div>
  </div>
</template>

<script setup>
import {
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  ref,
  reactive,
  toRefs,
  computed,
  defineProps,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'

// onMounted(() => {
//   console.log('onMounted-组件挂载后')
// })
// onBeforeUnmount(() => {
//   console.log('onBeforeUnmount-组件销毁前')
// })
// onUnmounted(() => {
//   console.log('onUnmounted-组件销毁后')
// })
const route = useRoute()
const router = useRouter()
const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
})

// const id = ref(0)
const { query } = toRefs(route)
console.log('route--') // query params
console.log(route)
const infoData = ref({})

onMounted(() => {
  console.log('route--11')
  console.log(route)
  console.log(route.query)
  // id.value = query.id
  getInfo(query.value.id)
})

// const infoData = computed(() => {
//   return {
//     title: '新闻标题' + query.value.id,
//     content: '新闻内容',
//     time: new Date().toLocaleString(),
//   }
// })

const getInfo = (id) => {
  infoData.value = {
    title: '新闻标题' + id,
    content: '新闻内容',
    time: new Date().toLocaleString(),
  }
}

const updatePage = (item) => {
  const { fullPath } = route
  console.log('route--data')
  console.log(route)
  console.log(fullPath)
  router.replace({
    // path: '/redirect',
    name: 'Redirect',
    query: {
      id: item.id,
    },
    params: {
      path: fullPath,
    },
  })
  // router.replace({
  //   path: '/news/detail',
  //   query: {
  //     id: id,
  //   },
  // })
  // router.replace({
  //   name: 'NewsDetail',
  //   params: {
  //     id: item.id,
  //     title: item.title,
  //     content: item.content || '',
  //   },
  // })
}

const newsList = reactive([
  {
    id: 1,
    title: '新闻1',
  },
  {
    id: 2,
    title: '新闻2',
  },
  {
    id: 3,
    title: '新闻3',
  },
])
</script>

<style scoped></style>
