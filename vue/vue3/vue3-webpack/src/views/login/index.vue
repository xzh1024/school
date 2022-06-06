<template>
  <div class="login-container">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <h3>{{ $t('msg.title') }}</h3>
      <el-form-item label="用户名" prop="username">
        <el-icon :size="20">
          <user />
        </el-icon>
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-icon :size="20">
          <unlock />
        </el-icon>
        <el-input
          v-model="form.password"
          :type="passwordType"
          autocomplete="off"
        />
        <el-icon
          v-show="passwordType === 'text'"
          class="svg-password"
          :size="20"
          @click="changeType"
        >
          <sunny />
        </el-icon>
        <el-icon
          v-show="passwordType === 'password'"
          class="svg-password"
          :size="20"
          @click="changeType"
        >
          <watermelon />
        </el-icon>
      </el-form-item>

      <el-button type="primary" class="login-button" @click="submitLoginForm"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { User, Unlock, Sunny, Watermelon } from '@element-plus/icons-vue';
// import { login } from '@/api/login.js';
import { useStore } from 'vuex';

const store = useStore();

const form = ref({
  username: 'admin',
  password: '123456'
});

const rules = reactive({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 2, max: 10, message: 'Length should be 2 to 18', trigger: 'blur' }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    { min: 6, max: 15, message: '密码为6至15位', trigger: 'blur' }
  ]
});

const formRef = ref(null);
const submitLoginForm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(form);
      // console.log(form.value);

      store.dispatch('app/login', formRef.value);
      // try {
      //   const res = await login(form.value);
      //   console.log(res);
      // } catch (error) {
      //   console.log(error);
      // }
    } else {
      console.log('error submit!!');
      return false;
    }
  });
};

const passwordType = ref('password');
const changeType = () => {
  console.log(passwordType.value);
  if (passwordType.value === 'password') {
    passwordType.value = 'text';
  } else {
    passwordType.value = 'password';
  }
};
</script>

<style lang="scss" scoped>
// @import '~@css/index.scss';
::v-deep .el-form-item__label {
  color: $test;
}
.svg-password {
  cursor: pointer;
}
</style>
