import {RouteConfig} from 'vue-router';

/** 后台返回功能权限model */
export interface IBackRouterConfig {
    // 页面上的唯一标识
    FullNameSpacePath: string;
    // 是否可用
    IsEnabled?: boolean;
    ParentName?: string;
    Name?: string;
}

/**
 * 自定义路由属性
 * 真实路由配置name作为路由唯一标识，
 * 与router-config路由配置的name对应
 */
export interface IRouterConfig extends RouteConfig {
    // 模块名，界面展示用
    moduleName?: string;
    // 各模块对应的图标class名
    icon?: string;
    // 是否是本地模块, 即不受后台权限控制, 用于代码分层中设置的路由
    isLocal?: boolean;
    // 子路由集合
    children?: IRouterConfig[];
}

/** 路由配置router-config.js */
export interface IRouterModuleConfig {
    // 路由的key
    name: string;
    // 是否为分组节点-将子节点展示为子菜单
    isGroup?: boolean;
    // 是否需要重定向到它的第一个子路由-默认重定向
    isRedirect?: boolean;
    // 子路由或分组路由集合
    children?: IRouterModuleConfig[];
}

/** 路由配置router-config.js-扁平化后每项 */
export interface IFlatRouterModuleConfig {
    // 路由的key
    name: string;
    // 父路由的key
    parentName: string;
    // 是否为分组节点-将子节点展示为子菜单
    isGroup?: boolean;
    // 是否需要重定向到它的第一个子路由-默认重定向
    isRedirect?: boolean;
}

/** 路由合并后信息，最终路由配置 */
export type IMergeRouterConfig = IRouterConfig & IFlatRouterModuleConfig & { children?: IMergeRouterConfig[] };

/** 路由分组 */
export interface IRouterGroup {
    // 路由组标识
    name: string;
    // 模块名，界面展示用
    moduleName?: string;
    // 分组路由集合
    children?: IMergeRouterConfig[];
}
