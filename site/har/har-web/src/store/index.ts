import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useProgressStore from '@/store/modules/progress';
import useEstateManageStore from '@/store/modules/estateManage';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useProgressStore, useEstateManageStore };
export default pinia;
