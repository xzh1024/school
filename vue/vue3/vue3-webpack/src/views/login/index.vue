<template>
  <div class="login-container">
    <el-form :model="form" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="form.password" type="password" autocomplete="off" />
      </el-form-item>
    </el-form>
  </div>
  <div>222</div>
</template>

<script setup>
import { ref } from 'vue';
const form = ref({
  username: 'admin',
  password: '123456'
});
</script>

<style lang="scss" scoped>
// @import '~@css/index.scss';
::v-deep .el-form-item__label {
  color: $color-primary;
}
</style>
