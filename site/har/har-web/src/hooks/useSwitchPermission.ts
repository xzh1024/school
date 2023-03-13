/**
 * 根据权限控制是否禁用 switch
 * */

import { useUserStore } from '@/store';

const userStore = useUserStore();
const { permissions = [] } = userStore;
const ALL_PERMISSIONS = '*:*:*';
export default function useSwitchPermission(auth: string) {
  return !permissions.includes(ALL_PERMISSIONS) && !permissions.includes(auth);
}
