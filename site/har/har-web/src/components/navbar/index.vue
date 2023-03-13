<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <!--        <img-->
        <!--          alt="logo"-->
        <!--          src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"-->
        <!--        />-->
        <img class="logo" src="@images/nav-logo.png" alt="logo" />
        <a-typography-title
          :style="{ margin: 0, fontSize: '18px' }"
          :heading="5"
        >
          {{ navTitle }}
        </a-typography-title>
        <icon-menu-fold
          v-if="appStore.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
    </div>
    <ul class="right-side">
      <li>
        <a-dropdown trigger="click">
          <div>
            <a-avatar
              :size="32"
              :style="{ marginRight: '8px', cursor: 'pointer' }"
            >
              <img v-if="avatar" alt="avatar" :src="avatar" />
              <template v-else>{{ userName }}</template>
            </a-avatar>
            <span class="user-name-text">{{ userName }}</span>
          </div>
          <template #content>
            <!--            <a-doption>
              <a-space @click="switchRoles">
                <icon-tag />
                <span> 切换角色 </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="$router.push({ name: 'info' })">
                <icon-user />
                <span> 用户中心 </span>
              </a-space>
            </a-doption>-->
            <template v-if="hasSign">
              <a-doption>
                <a-space @click="handleSignature">
                  <icon-settings />
                  <span> 用户签名 </span>
                </a-space>
              </a-doption>
            </template>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span> 退出登录 </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
      <li v-if="!getPlatformFlag()">
        <a-dropdown trigger="click" @select="onSelect">
          <div class="toggle-shop">
            <icon-list :style="{ marginRight: '3px' }" />
            <span>{{
              userStore.currentProject && userStore.currentProject.label
            }}</span>
          </div>
          <template #content>
            <a-doption
              v-for="item in projects"
              :key="item.value"
              :value="item.value"
            >
              <span> {{ item.label }} </span>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
      <li class="back_home" @click="backClick"
        ><img src="@/assets/images/home/back_home.png"
      /></li>
    </ul>
    <i-drawer
      v-if="signVisible"
      v-model="signVisible"
      :options="{ footer: false }"
      title="签名"
    >
      <i-sign ref="signRef" :url="signUrl" :width="768"></i-sign>
      <div class="sign-btn-group">
        <a-button type="primary" class="btn" size="large" @click="saveCanvas"
          >保存</a-button
        >
        <a-button type="outline" class="btn" size="large" @click="clearCanvas"
          >清屏</a-button
        >
      </div>
    </i-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { computed, inject, onMounted, ref } from 'vue';
  import { useAppStore, useUserStore } from '@/store';
  import { useUserStore as usePlatformUserStore } from '@/store/platform/user';
  import { useUserStore as useSvcUserStore } from '@/store/svc/user';
  import { useUserStore as usePcsUserStore } from '@/store/pcs/user';
  import { useUserStore as useVmsUserStore } from '@/store/vms/user';
  import { useRouter } from 'vue-router';
  import { Message, Modal } from '@arco-design/web-vue';
  import IDrawer from '@/components/i-drawer/i-drawer.vue';
  import ISign from '@/components/ISign/index.vue';
  import { customOssRequest } from '@/utils/oss-upload';
  import { dataURLtoFile, getPlatformFlag } from '@/utils';
  import {
    cbdApiProjectSystemUserSignatureGet,
    cbdApiProjectSystemUserSignaturePut
  } from '@/api';

  type Fun = () => void;
  const signVisible = ref(false);
  const appStore = useAppStore();
  const userStore = useUserStore();
  const userPlatformStore = usePlatformUserStore();
  const userSvcStore = useSvcUserStore();
  const userPcsStore = usePcsUserStore();
  const userVmsStore = useVmsUserStore();
  const router = useRouter();
  const reload = inject<Fun>('reload')!;
  const signRef = ref<any>(null);
  const signUrl = ref<string>('');

  const avatar = computed(() => {
    return userStore?.user?.avatar;
  });
  const userName = computed(() => {
    return storeContent.value.user?.userName;
  });
  const onSelect = (e: string | number | Record<string, any> | undefined) => {
    userStore.setProjectId(e as number);
    reload();
  };
  const projects = computed(() => {
    return userStore.projects || [];
  });
  const storeContent = computed(() => {
    const p = getPlatformFlag();
    if (p === 'platform') return userPlatformStore;
    if (p === 'svc') return userSvcStore;
    if (p === 'pcs') return userPcsStore;
    if (p == 'vms') return userVmsStore;
    return userStore;
  });

  const navTitle = computed(() => {
    const p = getPlatformFlag();
    if (p === 'svc') return '储值卡系统';
    if (p === 'pcs') return '流程控制系统';
    if (p == 'vms') return '体育场馆系统';
    return '资产管理系统';
  });

  const handleLogout = () => {
    Modal.open({
      title: '警告',
      content: '确认退出系统?',
      onOk: () => {
        userStore.logout();
        router.replace('/platform/login');
      }
    });
  };
  const backClick = () => {
    router.push({ path: '/platform/home' });
  };
  const toggleDrawerMenu = inject<any>('toggleDrawerMenu');
  async function handleSignature() {
    signVisible.value = true;
  }
  function clearCanvas() {
    signRef.value?.clear();
  }
  async function saveCanvas() {
    const res = signRef.value?.submit();
    try {
      const file = dataURLtoFile(res, 'sign');
      const { key } = await customOssRequest(file);
      await cbdApiProjectSystemUserSignaturePut({
        attachmentId: key
      });
      Message.success('保存成功');
      signVisible.value = false;
      await getSignImage();
    } catch (e) {
      console.error(e);
    }
  }

  const hasSign = computed(() => {
    const res = getPlatformFlag();
    return res === '';
  });
  async function getSignImage() {
    try {
      const d = await cbdApiProjectSystemUserSignatureGet({});
      signUrl.value = d?.previewAddress || '';
    } catch (e) {
      console.error(e);
    }
  }
  onMounted(() => {
    hasSign.value && getSignImage?.();
  });
</script>

<style scoped lang="less">
  .sign-btn-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .btn {
      width: 100px;
      &:first-child {
        margin-right: 20px;
      }
    }
  }
  .logo {
    width: 40px;
    //height: 25px;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .right-side {
    display: flex;
    padding-right: 20px;
    list-style: none;

    :deep(.locale-select) {
      border-radius: 20px;
    }

    li {
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
    .back_home {
      cursor: pointer;
      img {
        width: 20px;
        height: 20px;
      }
    }

    a {
      color: var(--color-text-1);
      text-decoration: none;
    }

    .nav-btn {
      color: rgb(var(--gray-8));
      font-size: 16px;
      border-color: rgb(var(--gray-2));
    }

    .trigger-btn,
    .ref-btn {
      position: absolute;
      bottom: 14px;
    }

    .trigger-btn {
      margin-left: 14px;
    }
  }
</style>

<style lang="less">
  .message-popover {
    .arco-popover-content {
      margin-top: 0;
    }
  }

  .user-name-text {
    line-height: 32px;
    cursor: pointer;
  }
  .toggle-shop {
    cursor: pointer;
  }
</style>
