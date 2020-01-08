import {IRouterModuleConfig} from '@/router/interface/router.type';

/** 配置主界面-路由父子关系和路由摆放顺序顺序 */
export const RouterConfig: IRouterModuleConfig[] = [
    {
        name: 'Home',
    },
    {
        name: 'Game',
        children: [
            {name: 'GameList'},
            {name: 'GameInfo'}
        ]
    },
    {
        name: 'Movie',
        children: [
            {name: 'MoviePlaying'},
            {name: 'MovieTicketing'}
        ]
    },
];

