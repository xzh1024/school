import {RouterNameEnum} from '@/router/enum/RouterNameEnum';
import {IRouterConfig} from '@/router/interface/router.type';

const Movie: IRouterConfig = {
    moduleName: '电影',
    name: RouterNameEnum.Movie,
    path: '/' + RouterNameEnum.Movie,
    component: () => import('@/views/movie/index.vue'),
};

const MoviePlaying: IRouterConfig = {
    moduleName: '正在热映',
    name: RouterNameEnum.MoviePlaying,
    path: '/' + RouterNameEnum.MoviePlaying,
    component: () => import('@/views/movie/movie-playing.vue'),
    isLocal: true,
    icon: 'el-icon-film',
};

const MovieTicketing: IRouterConfig = {
    moduleName: '正在售票',
    name: RouterNameEnum.MovieTicketing,
    path: '/' + RouterNameEnum.MovieTicketing,
    component: () => import('@/views/movie/movie-ticketing.vue'),
    isLocal: true,
    icon: 'el-icon-receiving',
};

export const MovieMap = [
    Movie,
    MoviePlaying,
    MovieTicketing
];
