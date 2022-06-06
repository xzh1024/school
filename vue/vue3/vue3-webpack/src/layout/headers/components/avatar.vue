<template>
  <!-- <el-avatar class="square" :size="40" :icon="UserFilled" @click="logout" /> -->
  <!-- <el-avatar class="square" :size="40" :icon="squareUrl" /> -->
  <el-dropdown>
    <el-avatar class="square" :size="40" :icon="UserFilled" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="language">
          <table>
            {{
              lang === 'zh' ? '中文' : '英文'
            }}
          </table>
        </el-dropdown-item>
        <el-dropdown-item @click="logout">
          <table>
            退出
          </table>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { UserFilled } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
const lang = ref(locale);
watch(
  () => locale.value,
  (newVal, oldVal) => {
    console.log(newVal);
    console.log(oldVal);
  }
);

const store = useStore();

const logout = () => {
  store.dispatch('app/logout');
};

const language = () => {
  locale.value = lang.value === 'zh' ? 'en' : 'zh';
};

// const squareUrl = ref(
//   'https://img1.baidu.com/it/u=1659441821,1293635445&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
// );
</script>

<style lang="scss" scoped>
.square {
  cursor: pointer;
}
</style>
