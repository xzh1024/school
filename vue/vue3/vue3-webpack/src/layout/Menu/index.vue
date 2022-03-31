<template>
  <el-menu
    :active-text-color="variables.primary"
    background-color="#545c64"
    class="el-menu-main"
    :collapse="!$store.getters.siderType"
    :default-active="defaultActive"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <!-- <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group title="Group One">
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item one</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title>item four</template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <span>Navigator Four</span>
    </el-menu-item> -->

    <el-sub-menu
      v-for="(item, index) in menuList"
      :index="item.id"
      :key="item.id"
    >
      <template #title>
        <el-icon :size="iconSize">
          <!-- <location /> -->
          <component :is="iconList[index]"></component>
        </el-icon>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        v-for="it in item.children"
        :key="it.id"
        :index="'/' + it.path"
        @click="savePath(it.path)"
      >
        <!-- {{ it.authName }} -->
        <template #title>
          <el-icon :size="iconSize">
            <component :is="iconMenu"></component>
          </el-icon>
          <span>{{ it.authName }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
    <!-- <el-menu-item v-else :index="index + 1" :key="item.id">
        <el-icon><setting /></el-icon>
        <span>{{ item.authName }}</span>
      </el-menu-item> -->
  </el-menu>
</template>

<script setup>
import { ref } from 'vue';
import variables from '@/assets/css/variables.scss';

const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart']);
const iconMenu = ref('menu');
const iconSize = ref(20);

const defaultActive = ref(sessionStorage.getItem('path') || '/users');
const savePath = (path) => {
  sessionStorage.setItem('path', `/${path}`);
};
import { getMenuList } from '@/api/menu';
const initMenuList = async () => {
  await getMenuList();
};
initMenuList();
const menuList = ref([
  {
    id: 125,
    authName: '用户管理',
    path: 'users',
    icon: 'user',
    children: [
      {
        id: 12501,
        authName: '用户列表',
        path: 'users',
        children: [],
        order: null
      },
      {
        id: 12502,
        authName: '用户分组',
        path: 'userGroup',
        order: null
      }
    ],
    order: 1
  },
  {
    id: 103,
    authName: '权限管理',
    path: 'rights',
    icon: 'setting',
    children: [
      {
        id: 10301,
        authName: '权限管理',
        path: 'rights',
        children: [],
        order: null
      }
    ],
    order: 2
  },
  {
    id: 101,
    authName: '商品管理',
    path: 'goods',
    icon: 'shop',
    children: [
      {
        id: 10101,
        authName: '商品管理',
        path: 'goods',
        children: [],
        order: null
      }
    ],
    order: 3
  },
  {
    id: 102,
    authName: '订单管理',
    path: 'orders',
    icon: 'ticktes',
    children: [
      {
        id: 10201,
        authName: '订单管理',
        path: 'orders',
        children: [],
        order: null
      }
    ],
    order: 4
  },
  {
    id: 145,
    authName: '数据统计',
    path: 'reports',
    icon: 'pie-chart',
    children: [
      {
        id: 14501,
        authName: '数据统计',
        path: 'reports',
        children: [],
        order: null
      }
    ],
    order: 5
  }
]);

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
.el-menu-main {
  height: 100%;
  .svg-icon {
    font-size: 14px;
  }
}
</style>
