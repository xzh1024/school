<template>
  <div>
    <!-- <PageRef /> -->
    <!-- <PageReactive /> -->
    <!-- <PageToRef /> -->
    <!-- <PageComputed /> -->
    <PageWatch />
    <!-- <PageWatchEffect /> -->
    <!-- <PageCallBack /> -->
    <!-- <PageRender /> -->
    <!-- <PageDefineProps /> -->
    <!-- <PageTree /> -->
    <!-- <PageComponent /> -->
    <!-- <PageSlot /> -->
    <!-- <PageAjax /> -->
    <!-- <Suspense>
      <template #default>
        <PageAjax />
      </template>
      <template #fallback> 加载中 </template>
    </Suspense> -->
    <!-- <PageTeleport /> -->
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// import PageRef from './views/01-ref.vue'
// import PageReactive from './views/02-reactive.vue'
// import PageToRef from './views/03-toRef.vue'
// import PageComputed from './views/04-computed.vue'
import PageWatch from './views/05-watch.vue'
import PageWatchEffect from './views/06-watchEffect.vue'
import PageCallBack from './views/07-生命周期钩子.vue'
import PageRender from './views/08-render.vue'
import PageDefineProps from './views/09-defineProps.vue'
import PageTree from './views/10-tree.vue'
import PageComponent from './views/11-component.vue'
import PageSlot from './views/12-slot.vue'
// import PageAjax from './views/13-ajax.vue'
const PageAjax = defineAsyncComponent(() => import('./views/13-ajax.vue'))
// const PageAjax = defineAsyncComponent({
//   loadingComponent: () => import('./views/13-ajax.vue'),
//   errorComponent: ,
//   timeout: 
// })
import PageTeleport from './views/14-teleport.vue'
</script>

<style scoped></style>
