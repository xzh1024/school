<template>
  <div>
    <div class="list">
      <div class="item" v-for="(item, index) in newsList" :key="index" @click="goDetail(item)">
        {{ item.title }}
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, onUnmounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  // console.log('onMounted-组件挂载后')
  getInfo()
})
// onBeforeUnmount(() => {
//   console.log('onBeforeUnmount-组件销毁前')
// })
// onUnmounted(() => {
//   console.log('onUnmounted-组件销毁后')
// })

const infoData = ref({})

const getInfo = () => {
  infoData.value = {
    title: '新闻标题',
    content: '新闻内容',
    time: new Date().toLocaleString(),
  }
}

const updatePage = () => {
  const { fullPath } = route
  console.log('route--data')
  console.log(route)
  router.replace({
    path: '/redirect' + fullPath,
    query: {
      detailId: 1,
    },
  })
}

const newsList = reactive([
  {
    id: 1,
    title: '新闻1',
    content: '新闻1的内容',
  },
  {
    id: 2,
    title: '新闻2',
    content: '新闻2的内容',
  },

  {
    id: 3,
    title: '新闻3',
  },
])

const goDetail = (item) => {
  // router.push({
  //   path: '/news/detail',
  //   query: { id },
  // })
  router.push({
    name: 'NewsDetail',
    query: {
      id: item.id,
      title: item.title,
      content: item.content || '',
    },
    // params: {
    //   id: item.id,
    //   title: item.title,
    //   content: item.content || '',
    // },
  })
}
</script>

<style scoped></style>
