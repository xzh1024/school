import type { CbdApiProjectGetRoutersGetResponse } from '@/api';
export type TabBarRoute = CbdApiProjectGetRoutersGetResponse[0];
export interface TabBarState {
  tagList: TabBarRoute[];
  cacheTabList: Set<string>;
}
