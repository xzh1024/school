<route>
{
  meta:{
    layout: false
  }
}
</route>
<template>
  <div class="home">
    <div class="banner">
      <div class="head flex justify-between align-center">
        <div class="flex align-center">
          <div class="logo" :class="logoTitle ? '' : 'logo-large'"
            ><img src="@images/logo.png" alt=""
          /></div>
          <div v-if="logoTitle" class="logo-title">{{ logoTitle }}</div>
        </div>
        <div class="flex align-center">
          <a-avatar :size="34">{{ userName }}</a-avatar>
          <a-dropdown @select="handleSelect">
            <div class="name">您好，{{ userName }}</div>
            <template #content>
              <a-doption value="logout">退出登录</a-doption>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
    <div class="menu-list">
      <div
        v-for="(item, index) in menuList"
        :key="index"
        class="menu-item"
        :class="item.available === 2 ? 'is_opacity' : ''"
        @click="toPath(item)"
      >
        <div class="menu-item-icon">
          <img :src="imgFilter(item?.meta?.icon)" alt="" />
        </div>
        <div class="menu-item-ename">{{ item.nameEn }}</div>
        <div class="menu-item-name">{{ item.name }}</div>

        <div class="menu-item-desc">
          <div v-if="item.available === 2" class="no_open"> ( 暂未开放 )</div>
          {{ item.remark }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import { useRequest } from '@har/use';
  import {
    cbdApiPortalGetRoutersGet,
    CbdApiPortalGetRoutersGetResponse,
    cbdApiPortalOauth2GenCredentialGet,
    CbdApiPortalOauth2GenCredentialGetResponse
  } from '@/api/cbd-api-portal';
  import { useUserStore } from '@/store/platform/user';
  import { useRouter } from 'vue-router';
  import { platformHomeImgList } from '@/utils/dic';
  import { modalConfirm } from '@/utils';

  const store = useUserStore();
  const router = useRouter();
  const menuList = ref<CbdApiPortalGetRoutersGetResponse>([]);

  onMounted(() => {
    getRouteList();
    store.getUserInfo();
  });
  const logoTitle = computed(() => {
    return CONFIG?.homeTile;
  });
  const userName = computed(() => {
    return store.user?.userName;
  });
  const { run: getRouteList } = useRequest(cbdApiPortalGetRoutersGet, {
    manual: true,
    onSuccess(res) {
      menuList.value = res;
    }
  });

  async function toPath(item: CbdApiPortalGetRoutersGetResponse[number]) {
    try {
      const { available = 1 } = item;
      if (available === 2) {
        return false;
        // return modalConfirm('当前系统正在开发中，请持续关注', () => {}, '', {
        //   hideCancel: true
        // });
      }
      const res: CbdApiPortalOauth2GenCredentialGetResponse =
        await cbdApiPortalOauth2GenCredentialGet({ link: item.path });
      console.log(item, res.certificate);
      location.href = `${item.path}?source=${res.certificate}`;
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSelect(
    v: string | number | Record<string, any> | undefined
  ) {
    if (v === 'logout') {
      try {
        await store.logout();
        await store.reset();
        await router.replace('/platform/login');
      } catch (e) {
        console.error(e);
      }
    }
  }

  function imgFilter(v = '') {
    return platformHomeImgList.find((i: { value: string }) => i.value === v)
      ?.imgUrl;
  }
  const hoverColor = computed(() => {
    return CONFIG.menuItemHoverColor || '#4c8af7';
  });
</script>

<style scoped lang="less">
  .home {
    background: #f7f7f7;
    width: 100%;
    height: 100vh;
    .banner {
      height: 260px;
      background: url('@images/home/home-banner.png') no-repeat center center;
      background-size: cover;
      .head {
        height: 60px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
      }
      .logo {
        margin-right: 10px;
        img {
          width: 38px;
          height: 20px;
        }
      }
      .logo-large {
        img {
          width: 96px;
          height: 32px;
        }
      }
      .logo-title {
        color: #333;
        font-size: 14px;
        font-weight: bold;
      }
      .name {
        margin-left: 8px;
        font-size: 14px;
        color: #333;
        line-height: 24px;
        font-weight: 500;
      }
    }
    .menu-item-icon {
      text-align: center;
      img {
        width: 110px;
        height: 70px;
      }
    }
    .menu-list {
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      padding: 36px 0;
      width: 1200px;
      margin: 0 auto;
    }

    .menu-item {
      margin-right: 20px;
      margin-bottom: 24px;
      background: #fff;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
      width: 224px;
      box-sizing: border-box;
      padding: 16px;
      border-radius: 8px;
      position: relative;
      cursor: pointer;
      &:nth-child(5n) {
        margin-right: 0;
      }
      &:hover {
        opacity: 1;
        .menu-item-ename,
        .menu-item-name {
          color: v-bind(hoverColor);
        }
        > .menu-item-desc {
          height: 180px;
          opacity: 1;
          z-index: 10;
          margin-top: 12px;
          > .no_open {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 12px;
          }
        }
      }
    }
    .is_opacity {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .menu-item-ename {
      margin-top: 16px;
      margin-bottom: 4px;
    }
    .menu-item-ename,
    .menu-item-name {
      font-size: 20px;
      color: #333333;
      line-height: 28px;
      text-align: center;
    }
    .menu-item-desc {
      position: absolute;
      top: 162px;
      left: 0;
      z-index: 0;
      padding: 16px;
      background: #fff;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
      height: 0;
      opacity: 0;
      font-size: 16px;
      color: #999;
      font-weight: 400;

      transition: all 0.4s;
    }
  }
</style>
