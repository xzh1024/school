import {IRouterConfig} from '@/router/interface/router.type';
import {HomeMap} from '@/router/map/home.map';
import {GameMap} from '@/router/map/game.map';
import {MovieMap} from '@/router/map/movie.map';

const defaultArr = [] as IRouterConfig[];
export const ROUTERS = defaultArr.concat(
    HomeMap,
    GameMap,
    MovieMap
);

