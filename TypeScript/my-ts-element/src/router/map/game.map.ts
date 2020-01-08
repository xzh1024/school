import {RouterNameEnum} from '@/router/enum/RouterNameEnum';
import {IRouterConfig} from '@/router/interface/router.type';

const Game: IRouterConfig = {
    moduleName: '测试Game',
    name: RouterNameEnum.Game,
    path: '/' + RouterNameEnum.Game,
    component: () => import('@/views/game/index.vue'),
};

const GameList: IRouterConfig = {
    moduleName: 'GameList',
    name: RouterNameEnum.GameList,
    path: '/' + RouterNameEnum.GameList,
    component: () => import('@/views/game/game-list.vue'),
    isLocal: true,
    icon: 'icon-cluster',
};
const GameInfo: IRouterConfig = {
    moduleName: 'GameInfo',
    name: RouterNameEnum.GameInfo,
    path: '/' + RouterNameEnum.GameInfo,
    component: () => import('@/views/game/game-info.vue'),
    isLocal: true,
    icon: 'icon-cluster',
};

export const GameMap = [
    Game,
    GameList,
    GameInfo
];
