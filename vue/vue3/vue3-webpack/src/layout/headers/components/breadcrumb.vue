<template>
  <el-breadcrumb separator="/">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item
      ><a href="/">promotion management</a></el-breadcrumb-item
    >
    <el-breadcrumb-item>promotion list</el-breadcrumb-item> -->
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <span class="no-redirect" v-if="index === breadcrumbList.length - 1">
        {{ item.name }}
      </span>
      <span class="redirect" v-else @click="handleRedirect(item.path)">
        {{ item.name }}
      </span>
      <span></span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default { name: 'breadcrumbContainer' };
</script>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const breadcrumbList = ref([]);

const initBreadcrumbList = () => {
  breadcrumbList.value = route.matched;
  console.log(route.matched);
};

const handleRedirect = (path) => {
  router.push(path);
};

watch(
  route,
  () => {
    initBreadcrumbList();
  },
  {
    deep: true,
    immediate: true
  }
);
</script>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}
.redirect {
  font-weight: 600;
  color: #666;
  cursor: text;
}
</style>
