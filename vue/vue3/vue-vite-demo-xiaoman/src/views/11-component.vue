<template>
  <div class="tabs">
    <div
      class="tab-item"
      v-for="tab in tabs"
      :key="tab.name"
      :class="{ 'is-active': tab.active }"
      @click="changeActive(tab)"
    >
      {{ tab.name }}
    </div>
  </div>
  <component :is="activeCom"></component>
</template>

<script setup lang="ts">
import { ref, reactive, markRaw, computed } from 'vue'
import AVue from '../components/A.vue'
import BVue from '../components/B.vue'
import CVue from '../components/C.vue'

const tabs = reactive([
  {
    name: 'A组件',
    active: true,
    com: markRaw(AVue)
  },
  {
    name: 'B组件',
    active: false,
    com: markRaw(BVue)
  },
  {
    name: 'C组件',
    active: false,
    com: markRaw(CVue)
  }
])

const activeCom = computed(() => {
  return tabs.find((item) => item.active)?.com
})

const changeActive = (tab: any) => {
  if (tab.active) return
  tabs.forEach((item) => {
    if (item.name === tab.name) {
      item.active = true
      // comId.value = item.com
    } else {
      item.active = false
    }
  })
  // console.log(comId.value)
}
</script>

<style scoped>
.tabs {
  display: flex;
  align-items: center;
}
.tab-item {
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin-right: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 4px;
}
.tab-item.is-active {
  color: #1890ff;
  border-color: #1890ff;
}
</style>
