<template>
  <div>
    <div v-for="item in props.data" :key="item.name">
      {{ item.name }}
      <MyTree v-if="item.children?.length" :data="item.children"></MyTree>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue'

interface Tree {
  name: string
  checked: boolean
  children?: Tree[]
}

const props = defineProps({
  data: {
    type: Array<Tree>,
    default: () => []
  }
})

// const data = reactive<Tree[]>([
//   {
//     name: '1',
//     checked: true,
//     children: [
//       {
//         name: '1-1',
//         checked: false
//       },
//       {
//         name: '1-2',
//         checked: false
//       }
//     ]
//   },
//   {
//     name: '1',
//     checked: false
//   },
//   {
//     name: '1',
//     checked: false,
//     children: [
//       {
//         name: '3-1',
//         checked: false
//       },
//       {
//         name: '3-2',
//         checked: false
//       },
//       {
//         name: '3-3',
//         checked: false,
//         children: [
//           {
//             name: '3-3-1',
//             checked: false
//           },
//           {
//             name: '3-3-2',
//             checked: false
//           },
//           {
//             name: '3-3-3',
//             checked: false
//           }
//         ]
//       }
//     ]
//   }
// ])
</script>

<script lang="ts">
export default {
  name: 'MyTree'
}
</script>
