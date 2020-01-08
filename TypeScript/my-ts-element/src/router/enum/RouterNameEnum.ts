/**
 * 前端路由配置文件
 * @note router-config.js中的key与此处的value一一对应, 这边只能比router-config.js中多不能少
 * @note 每次增加前端路由配置项, 都需要在此处声明key value
 */
export const RouterNameEnum = {
    Home: 'Home',
    Game: 'Game',
    GameList: 'GameList',
    GameInfo: 'GameInfo',
    Movie: 'Movie',
    MoviePlaying: 'MoviePlaying',
    MovieTicketing: 'MovieTicketing',
};

/**
 * 系统所有模块的模块名
 * 此数据与后台auth中的模块名必须一致，切此枚举只能新增，不能修改和删除
 */
export const SystemModuleEnum = {
    Home: 'Home',
    Game: 'Game',
    GameList: 'GameList',
    GameInfo: 'GameInfo',
    Movie: 'Movie',
    MoviePlaying: 'MoviePlaying',
    MovieTicketing: 'MovieTicketing',
};

/**
 * 系统后台模块名和界面路由模块名的 映射
 * 界面路由配置与后台模块名是有交集的关系
 * 即可能出现RouterKeyEnum有的, SystemModeulEnum没有
 * SystemModeulEnum有的, RouterKeyEnum没有
 *
 * 此处配置是为了将后台传过来的模块权限映射到界面的路由上来
 * @note 这里面左侧包含SystemModuleEnum
 *       右侧包含RouteKeyEnum 和 RouterKeyGroupEnum
 * 每次后台权限配置文件添加模块配置时, 都需要在此处声明对应关系
 */
const FullNameSpacePathLinkToRouterKey = {
    [SystemModuleEnum.Home]: RouterNameEnum.Home,
    [SystemModuleEnum.Game]: RouterNameEnum.Game,
    [SystemModuleEnum.GameList]: RouterNameEnum.GameList,
    [SystemModuleEnum.GameInfo]: RouterNameEnum.GameInfo,
    [SystemModuleEnum.Movie]: RouterNameEnum.Movie,
    [SystemModuleEnum.MoviePlaying]: RouterNameEnum.MoviePlaying,
    [SystemModuleEnum.MovieTicketing]: RouterNameEnum.MovieTicketing,
};

/**
 * 当前界面路由到系统后台模块名 映射
 * 界面路由配置与后台模块名是有交集的关系
 * 即可能出现RouterKeyEnum有的, SystemModeulEnum没有
 * SystemModeulEnum有的, RouterKeyEnum没有
 *
 * 此处配置是为了在记录操作日志时, 通过当前界面路由名找到对应的后台模块名
 * @note 这里面左侧包含RouteKeyEnum和RouterKeyGroupEnum
 *       右侧包含SystemModuleEnum
 * @note 每次前端增加路由配置时, 如果需要和后台模块权限对应的， 需要在此处声明对应关系
 * @type {{}}
 */
export const LogFullNameSpacePathEnum = {
    [RouterNameEnum.Home]: SystemModuleEnum.Home,
    [RouterNameEnum.Game]: SystemModuleEnum.Game,
    [RouterNameEnum.GameList]: SystemModuleEnum.GameList,
    [RouterNameEnum.GameInfo]: SystemModuleEnum.GameInfo,
    [RouterNameEnum.Movie]: SystemModuleEnum.Movie,
    [RouterNameEnum.MoviePlaying]: SystemModuleEnum.MoviePlaying,
    [RouterNameEnum.MovieTicketing]: SystemModuleEnum.MovieTicketing,
};

/**
 * 传入后台模块的全名称，获得前端配置的模块名
 * @type {(type:string)=>string}
 */
export const ConvertBackNameToRouterName = (backName: string): string => {
    const temp = FullNameSpacePathLinkToRouterKey as { [key: string]: string };
    return temp[backName];
};

/**
 * 传入 前端配置的模块名，获得后台模块的名称
 * @type {(type:string)=>string}
 */
export const ConvertRouterNameToBackName = (routerName: string): string => {
    const temp = LogFullNameSpacePathEnum as { [key: string]: string };
    return temp[routerName];
};
