<script lang="tsx">
  import { defineComponent, ref, h, compile, computed, toRaw } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAppStore, useUserStore } from '@/store';
  import { useUserStore as usePlatformUserStore } from '@/store/platform/user';
  import { useUserStore as useSvcUserStore } from '@/store/svc/user';
  import { useUserStore as usePcsUserStore } from '@/store/pcs/user';
  import { useUserStore as useVmsUserStore } from '@/store/vms/user';
  import type { CbdApiProjectGetRoutersGetResponse } from '@/api';
  import { listenerRouteChange } from '@/utils/route-listener';
  import { getPlatformFlag } from '@/utils';
  import { StoreGeneric } from 'pinia';

  export default defineComponent({
    emit: ['collapse'],
    setup() {
      const appStore = useAppStore();
      const userStore = useUserStore();
      const userPlatformStore = usePlatformUserStore();
      const userSvcStore = useSvcUserStore();
      const userPcsStore = usePcsUserStore();
      const userVmsStore = useVmsUserStore();
      // const permission = usePermission();
      const router = useRouter();
      const collapsed = computed({
        get() {
          if (appStore.device === 'desktop') return appStore.menuCollapse;
          return false;
        },
        set(value: boolean) {
          appStore.updateSettings({ menuCollapse: value });
        }
      });

      const platFormStore = computed<StoreGeneric>(() => {
        const p = getPlatformFlag();
        if (p === 'platform') return userPlatformStore;
        if (p === 'svc') return userSvcStore;
        if (p === 'pcs') return userPcsStore;
        if (p == 'vms') return userVmsStore;
        return userStore;
      });

      const menuTree = computed(() => {
        return toRaw(platFormStore.value.routers);
      });

      const selectedKey = ref<string[]>([]);
      const goto = (item: CbdApiProjectGetRoutersGetResponse[0]) => {
        router.push({
          path: item.path as string
        });
      };
      listenerRouteChange((newRoute) => {
        if (newRoute.meta.requiresAuth && !newRoute.meta.hideInMenu) {
          // const key = newRoute.matched[2]?.name as string;
          selectedKey.value = [newRoute.path];
        }
      }, true);
      const setCollapse = (val: boolean) => {
        if (appStore.device === 'desktop')
          appStore.updateSettings({ menuCollapse: val });
      };

      const renderSubMenu = () => {
        function travel(
          _route: CbdApiProjectGetRoutersGetResponse,
          nodes = []
        ) {
          if (_route) {
            _route.forEach((element: any) => {
              // This is demo, modify nodes as needed
              const icon = element?.meta?.icon
                ? `<${element?.meta?.icon}/>`
                : ``;
              const r =
                element.children && element.children.length ? (
                  <a-sub-menu
                    key={element?.name}
                    v-slots={{
                      icon: () => h(compile(icon)),
                      title: () => h(compile(element?.meta?.title || ''))
                    }}
                  >
                    {element?.children?.map((elem: any) => {
                      return (
                        <a-menu-item key={elem.path} onClick={() => goto(elem)}>
                          {elem?.meta?.title || ''}
                          {travel(elem.children ?? [])}
                        </a-menu-item>
                      );
                    })}
                  </a-sub-menu>
                ) : (
                  <a-menu-item
                    key={element.path}
                    onClick={() => goto(element)}
                    v-slots={{
                      icon: () => h(compile(icon))
                    }}
                  >
                    {element?.meta?.title || ''}
                  </a-menu-item>
                );
              nodes.push(r as never);
            });
          }
          return nodes;
        }
        return travel(menuTree.value);
      };
      return () => (
        <a-menu
          v-model:collapsed={collapsed.value}
          show-collapse-button={appStore.device !== 'mobile'}
          auto-open={false}
          selected-keys={selectedKey.value}
          auto-open-selected={true}
          level-indent={34}
          style="height: 100%"
          onCollapse={setCollapse}
        >
          {renderSubMenu()}
        </a-menu>
      );
    }
  });
</script>

<style lang="less" scoped>
  :deep(.arco-menu-inner) {
    .arco-menu-inline-header {
      display: flex;
      align-items: center;
    }

    .arco-icon {
      &:not(.arco-icon-down) {
        font-size: 18px;
      }
    }
  }

  :deep(.arco-tabs-nav-tab-list) {
    display: flex;
    flex: 1;
  }

  :deep(.arco-tabs-tab) {
    flex: 1;
    justify-content: center;
  }
</style>
