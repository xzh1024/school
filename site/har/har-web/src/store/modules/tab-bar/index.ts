import { defineStore } from 'pinia';
import type { TabBarState, TabBarRoute } from './types';
import { getPlatformFlag, transformPathName } from '@/utils';
const p = getPlatformFlag();
const useAppStore = defineStore('tabBar', {
  state: (): TabBarState => ({
    cacheTabList: new Set(),
    tagList: []
    // cacheTabList: new Set([transformPathName(`/${p}/home`)]),
    // tagList: [
    //   // Set the first element dynamically as needed
    //   {
    //     name: transformPathName(`/${p}/home`),
    //     path: p ? `/${p}/home` : '/home',
    //     meta: {
    //       title: '首页'
    //     }
    //   }
    // ]
  }),

  getters: {
    getTabList(): TabBarRoute[] {
      return this.tagList;
    },
    getCacheList(): string[] {
      return Array.from(this.cacheTabList);
    }
  },

  actions: {
    updateTabList(route: TabBarRoute) {
      if (!this.cacheTabList.has(transformPathName(route.name!))) {
        this.tagList.push(route);
      }
      this.cacheTabList.add(transformPathName(route.name!));
    },
    deleteTag(idx: number, tag: TabBarRoute) {
      this.tagList.splice(idx, 1);
      this.cacheTabList.delete(transformPathName(tag.name!));
    }
  }
});

export default useAppStore;
