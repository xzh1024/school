<template>
  <div class="tab-bar-container">
    <a-affix ref="affixRef" :offset-top="offsetTop">
      <div class="tab-bar-box">
        <div class="tab-bar-scroll">
          <div class="tags-wrap">
            <span
              v-for="(tag, index) in tagList"
              :key="tag.path"
              class="arco-tag arco-tag-size-medium arco-tag-checked"
              :class="{
                'link-actived': tag.path === $route.path,
                'tag-card': appStore.tabBarType === 'tag-card'
              }"
              @click="goto(tag)"
            >
              <span class="tag-link">
                {{ tag.meta?.title || tag.name }}
              </span>
              <span
                class="arco-icon-hover arco-tag-icon-hover arco-icon-hover-size-medium arco-tag-close-btn"
                @click.stop="tagClose(tag, index)"
              >
                <icon-close />
              </span>
            </span>
          </div>
        </div>
        <div class="tag-bar-operation"></div>
      </div>
    </a-affix>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import type { RouteLocationNormalized } from 'vue-router';
  import { listenerRouteChange } from '@/utils/route-listener';
  import { useAppStore, useTabBarStore, useUserStore } from '@/store';
  import { TabBarRoute } from '@/store/modules/tab-bar/types';
  import { useUserStore as usePlatformUserStore } from '@/store/platform/user';
  import { useUserStore as useSvcUserStore } from '@/store/svc/user';
  import { useUserStore as usePcsUserStore } from '@/store/pcs/user';
  import { useUserStore as useVmsUserStore } from '@/store/vms/user';
  import { StoreGeneric } from 'pinia';
  import { getPlatformFlag } from '@/utils';

  const appStore = useAppStore();
  const tabBarStore = useTabBarStore();
  const userStore = useUserStore();
  const userPlatformStore = usePlatformUserStore();
  const userSvcStore = useSvcUserStore();
  const userPcsStore = usePcsUserStore();
  const userVmsStore = useVmsUserStore();
  const router = useRouter();
  const affixRef = ref();
  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });
  const offsetTop = computed(() => {
    return appStore.navbar ? 60 : 0;
  });

  watch(
    () => appStore.navbar,
    () => {
      affixRef.value.updatePosition();
    }
  );

  const platFormStore = computed<StoreGeneric>(() => {
    const p = getPlatformFlag();
    if (p === 'platform') return userPlatformStore;
    if (p === 'svc') return userSvcStore;
    if (p === 'pcs') return userPcsStore;
    if (p == 'vms') return userVmsStore;
    return userStore;
  });

  listenerRouteChange((route: RouteLocationNormalized) => {
    if (!route.meta.noAffix) {
      const item = platFormStore.value.flatRoutes.find(
        (i: any) => i.path === route.path
      );
      if (item) {
        tabBarStore.updateTabList({ ...item });
      }
    }
  }, true);
  const tagClose = (tag: TabBarRoute, idx: number) => {
    tabBarStore.deleteTag(idx, tag);
    if (idx === tagList.value.length) {
      const latest = tagList.value[tagList.value.length - 1];
      router.push({ path: latest.path! });
    }
  };
  const goto = (tag: TabBarRoute) => {
    router.push({ path: tag.path! });
  };
</script>

<style scoped lang="less">
  .tab-bar-container {
    position: relative;
    background-color: var(--color-bg-2);

    .tab-bar-box {
      display: flex;
      height: 48px;
      padding: 10px 0 10px 20px;
      background-color: var(--color-bg-2);
      border-bottom: 1px solid var(--color-border);

      .tab-bar-scroll {
        flex: 1;
        overflow: hidden;

        .tags-wrap {
          overflow-x: auto;
          //padding: 4px 0;
          font-size: 0;
          //height: 42px;
          white-space: nowrap;

          :deep(.arco-tag-size-medium) {
            //line-height: 28px;
            height: 28px;
          }

          :deep(.arco-tag) {
            margin-right: 6px;
            padding-top: 1px;
            cursor: pointer;

            &:first-child {
              .arco-tag-close-btn {
                display: none;
              }
            }
          }
        }
      }
    }

    .tag-bar-operation {
      width: 100px;
      height: 32px;
    }
  }

  .tag-link {
    color: var(--color-text-2);
    text-decoration: none;
  }

  .link-actived {
    //color: rgb(var(--link-6));
    .tag-link {
      color: rgb(var(--link-6));
    }

    & + .arco-tag-close-btn {
      color: rgb(var(--link-6));
    }

    &.tag-card {
      color: #fff;
      background-color: rgb(var(--primary-6));

      .tag-link {
        color: #fff;
      }
    }
  }

  :deep(.arco-affix) {
    z-index: 90;
    overflow-x: auto;
    background-color: var(--color-bg-2);
  }
</style>
