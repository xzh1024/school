<template>
  <div class="hamburger-container">
    <el-icon
      :size="20"
      @click="changeSiderType"
      v-show="$store.getters.siderType"
    >
      <fold />
    </el-icon>
    <el-icon
      :size="20"
      @click="changeSiderType"
      v-show="!$store.getters.siderType"
    >
      <expand />
    </el-icon>
  </div>
</template>

<script setup>
import { Expand, Fold } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
const store = useStore();

const changeSiderType = () => {
  store.commit('app/changeSiderType');
};
</script>

<style lang="scss" scoped>
.hamburger-container {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
