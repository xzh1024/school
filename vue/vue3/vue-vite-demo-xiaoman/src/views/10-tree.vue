<template>
  <div>
    <Tree :data="data"></Tree>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Tree from '../components/Tree.vue'

interface Tree {
  name: string
  checked: boolean
  children?: Tree[]
}
const data = reactive<Tree[]>([
  {
    name: '1',
    checked: true,
    children: [
      {
        name: '1-1',
        checked: false
      },
      {
        name: '1-2',
        checked: false
      }
    ]
  },
  {
    name: '1',
    checked: false
  },
  {
    name: '1',
    checked: false,
    children: [
      {
        name: '3-1',
        checked: false,
        children: [
          {
            name: '3-1-1',
            checked: false
          },
        ]
      },
      {
        name: '3-2',
        checked: false
      },
      {
        name: '3-3',
        checked: false,
        children: [
          {
            name: '3-3-1',
            checked: false
          },
          {
            name: '3-3-2',
            checked: false
          },
          {
            name: '3-3-3',
            checked: false
          }
        ]
      }
    ]
  }
])
</script>
