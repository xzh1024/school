<template>
  <SlotVue>
    <template #title="{ data }">
      姓名：{{ data.name }}<br />
      年龄：{{ data.age }}
    </template>
    <!-- <template #default>哈哈哈</template> -->
    <template v-slot:default>嘿嘿嘿</template>
  </SlotVue>
</template>

<script setup lang="ts">
import SlotVue from '../components/Slot.vue'
</script>
