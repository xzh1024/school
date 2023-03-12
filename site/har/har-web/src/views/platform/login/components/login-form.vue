<template>
  <div class="login-form-wrapper">
    <img
      v-if="formLogoShow"
      class="logo"
      src="@images/login/logo.png"
      alt="logo"
    />
    <div class="login-form-title">{{ formDesc }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      size="large"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="userName"
        :rules="[{ required: true, message: '用户名不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="userInfo.userName" placeholder="用户名：">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="passWord"
        :rules="[{ required: true, message: '密码不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.passWord"
          placeholder="密码："
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="code"
        :rules="[{ required: true, message: '请输入验证码' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <div class="flex align-center justify-between flex-1">
          <a-input v-model="userInfo.code" placeholder="验证码：">
            <template #prefix>
              <icon-safe />
            </template>
          </a-input>
          <div class="code-img" @click="getCodeImage">
            <img :src="'data:image/gif;base64,' + codeImg.img" alt="" />
          </div>
        </div>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <!--          <a-checkbox
            v-model="rememberPassword"
            :disabled="!userInfo.passWord"
            @change="setRememberPassword"
          >
            记住密码
          </a-checkbox>-->
          <!--          <a-link>忘记密码</a-link>-->
        </div>
        <a-button
          type="primary"
          :style="{ background: btnColor }"
          html-type="submit"
          long
          :loading="loading"
        >
          登录
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted, Ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { useUserStore } from '@/store/platform/user';
  import useLoading from '@/hooks/loading';
  import type { CbdApiProjectCaptchaImageGetResponse } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { encrypt } from '@/utils/jsencrypt';
  import { cbdApiPortalCaptchaImageGet } from '@/api/cbd-api-portal';
  import useToken from '@/composables/useToken';

  const router = useRouter();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();
  const codeImg: Ref<CbdApiProjectCaptchaImageGetResponse> = ref({});
  const userInfo: any = reactive({
    userName: '',
    passWord: ''
  });

  //重置token  处理图片问题
  const t = useToken();
  t.setToken('');
  const formDesc = computed(() => {
    return CONFIG?.loginFormDesc;
  });
  const [getCodeImage] = useFuncProxy(
    async () => {
      codeImg.value = await cbdApiPortalCaptchaImageGet();
    },
    () => {
      // getCodeImage();
    }
  );

  const formLogoShow = computed(() => {
    return CONFIG?.loginFormLogoShow;
  });
  const btnColor = computed(() => {
    return CONFIG?.loginFormBtnBgColor;
  });

  const handleSubmit = async ({
    errors,
    values
  }: {
    values: any;
    errors: any;
  }) => {
    if (!errors) {
      setLoading(true);
      try {
        await userStore.login({
          userName: values.userName?.trim() || '',
          code: values.code?.trim() || '',
          passWord: values.passWord ? encrypt(values.passWord?.trim()) : '',
          uuid: codeImg.value?.uuid || ''
        });
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        await router.replace({
          name: (redirect as string) || 'platform-home',
          query: {
            ...othersQuery
          }
        });
        Message.success('欢迎使用');
      } catch (err) {
        console.error(err);
        await getCodeImage();
      } finally {
        setLoading(false);
      }
    }
  };
  onMounted(() => {
    getCodeImage();
  });
</script>

<style lang="less" scoped>
  :deep(.arco-input-wrapper .arco-input-prefix > svg),
  :deep(.arco-input-wrapper .arco-input-suffix svg) {
    font-size: 20px;
  }
  .logo {
    display: block;
    width: 61px;
    height: 32px;
    margin-bottom: 8px;
  }

  .code-img {
    width: 120px;
    height: 34px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 24px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
