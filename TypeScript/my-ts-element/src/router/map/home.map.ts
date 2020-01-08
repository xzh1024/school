import {RouterNameEnum} from '@/router/enum/RouterNameEnum';
import {IRouterConfig} from '@/router/interface/router.type';

const Home: IRouterConfig = {
    moduleName: '首页',
    name: RouterNameEnum.Home,
    path: '/' + RouterNameEnum.Home,
    component: () => import('@/views/home/index.vue'),
};

export const HomeMap = [
    Home,
];
