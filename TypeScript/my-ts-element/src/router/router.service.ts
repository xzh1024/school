import Vue from 'vue';
import VueRouter, {Route} from 'vue-router';
import {
    IBackRouterConfig,
    IFlatRouterModuleConfig,
    IMergeRouterConfig,
    IRouterConfig,
    IRouterModuleConfig,
} from './interface/router.type';
import {ConvertBackNameToRouterName, ConvertRouterNameToBackName} from './enum/RouterNameEnum';
import {ROUTERS} from './map';
import {RouterConfig} from './router-config';

// 路由-相关操作
class RouterService implements IRouterService {
    public static getInstance() {
        return new RouterService();
    }

    // 最终路由扁平化结果-方便查询
    private flatRouterModels: IMergeRouterConfig[] = [];
    // 最终路由树
    private routerModels: IMergeRouterConfig[] = [];
    // 当前活动模块标识
    private currentModuleName: string = '';
    // vue路由实例
    private vueRouter: VueRouter | null = null;

    public constructor() {
        this.createVueRouter(RouterConfig);
    }

    /**
     * 获取路由实例
     */
    public getVueRouter() {
        return this.vueRouter as VueRouter;
    }

    /**
     * 根据路由父name获取子路由配置
     * @param name
     * @return {IRouterConfig[]}
     */
    public getModuleItems(name?: string) {
        const models = this.routerModels;
        let ret: IMergeRouterConfig[] = [];
        if (name == null) {
            ret = this.routerModels;
        } else {
            const filterModels = models.filter(router => router.name === name);
            if (filterModels[0] && filterModels[0].children) {
                ret = filterModels[0].children;
            }
        }
        return ret;
    }

    /**
     * 获取当前所在模块对应的后台模块
     */
    public getCurrentBackModuleName() {
        return ConvertRouterNameToBackName(this.currentModuleName);
    }

    /**
     * 跳转路由
     */
    public jumpRouterByName(name: string, query?: any) {
        const target = this.flatRouterModels.filter(item => item.name === name);
        if (this.vueRouter && target.length > 0) {
            this.vueRouter.push({
                path: target[0].path,
                query,
            });
        }
    }

    // router-config.js 树形结构 扁平化
    private convert2Arr = (routerConfigs: IRouterModuleConfig[] = [], parentName: string) => {
        let tempFlat: IFlatRouterModuleConfig[] = [];
        routerConfigs.forEach(val => {
            const isRedirect = val.isRedirect === false ? false : true;
            tempFlat.push({
                name: val.name,
                parentName,
                isGroup: val.isGroup || false,
                isRedirect,
            });
            const flat = this.convert2Arr(val.children, val.name);
            tempFlat = tempFlat.concat(flat);
        });
        return tempFlat;
    }

    // 按照路由配置顺序合并路由信息 router-config中的key对应真实路由中的name
    private mergeRouterConfig = (flatConfigs: IFlatRouterModuleConfig[] = []) => {
        const mergeRouters: IMergeRouterConfig[] = [];
        const realRouterMap: { [key: string]: IRouterConfig } = {};
        // 真实路由集合
        const realRouter = ROUTERS || [];
        realRouter.forEach(router => {
            realRouterMap[router.name || ''] = router;
        });
        // 按照路由配置顺序合并路由信息
        flatConfigs.forEach(config => {
            const targetRouter = realRouterMap[config.name];
            if (targetRouter) {
                const ret = {...config, ...targetRouter} as IMergeRouterConfig;
                mergeRouters.push(ret);
            }
        });
        return mergeRouters;
    }

    // 获取后台权限配置
    private getBackRouterConfig = (): IBackRouterConfig[] => {
        // todo 后台权限
        const backModules = [
            {
                FullNameSpacePath: 'Home',
                ParentName: '',
                // Name: '测试Home',
            },
            {
                FullNameSpacePath: 'Game',
                ParentName: '',
                // Name: '测试Game',
            },
            {
                FullNameSpacePath: 'Movie',
                ParentName: '',
                // Name: '电影123'
            },
        ] as IBackRouterConfig[];
        return backModules;
    }

    // 根据后台权限过滤没权限的路由配置
    private filterRouterModelsByBackAuth = (mergeRouters: IMergeRouterConfig[], backModules: IBackRouterConfig[]) => {
        const hasAuthKeyMap = {} as { [key: string]: boolean };
        backModules.forEach(module => {
            // 可能会存在没找到的情况, 如果没找到, 就不管
            const routerKey = ConvertBackNameToRouterName(module.FullNameSpacePath);
            if (routerKey != null) {
                hasAuthKeyMap[routerKey] = true;
            }
        });
        const topRouterMap: { [key: string]: boolean } = {};
        const hasAuthRouterMap: { [key: string]: boolean } = {};
        const hasAuthRouters: IMergeRouterConfig[] = [];
        mergeRouters.forEach(router => {
            // 获取本身就是顶级路由的
            if (!router.parentName) {
                topRouterMap[router.name] = true;
            }
            // 获取有权限模块路由
            if (hasAuthKeyMap[router.name] || router.isLocal) {
                hasAuthRouterMap[router.name] = true;
                hasAuthRouters.push(router);
            }
        });
        // 最后筛掉没有父路由的子路由
        // 因为有些路由是isLocal的, 但是父路由已经被权限给禁用掉了,
        // 所以此次循环就是为了去掉这些isLocal的路由
        return hasAuthRouters.filter(model => topRouterMap[model.name] || hasAuthRouterMap[model.parentName]);
    }

    // 利用对象同一个引用的特性，还原成树形结构路由，vue-router需要的结构
    private formatRouterTree = (filterRouter: IMergeRouterConfig[] = []) => {
        const ret: IMergeRouterConfig[] = [];
        const routerMap: { [key: string]: IMergeRouterConfig } = {};
        filterRouter.forEach(model => routerMap[model.name] = model);
        filterRouter.forEach(model => {
            if (routerMap[model.parentName] && model.name !== model.parentName) {
                const children = routerMap[model.parentName].children || [];
                // model.path = routerMap[model.parentName].path + model.path;
                children.push(model);
                // 重定向到第一项子路由
                if (routerMap[model.parentName].isRedirect && children.length > 0 &&
                    !routerMap[model.parentName].redirect) {
                    routerMap[model.parentName].redirect = children[0].path;
                }
                routerMap[model.parentName].children = children;
            } else {
                ret.push(model);
            }
        });
        return ret;
    }

    // 缓存当前路由的name
    private setCurrentModuleName(routerName: string) {
        this.currentModuleName = routerName;
    }

    // 注册vueRouter，设置默认路由，导航守卫
    private registerVueRouter = (routerTree: IMergeRouterConfig[]) => {
        const routes = [
            // {
            //     path: '*', redirect: '/login',
            // },
            // {
            //     path: '/login',
            //     name: 'login',
            //     component: () => import('@/views/Login/index.vue'),
            // },
            // {
            //     path: '/index',
            //     component: () => import('@/views/Index/index.vue'),
            //     redirect: routerTree[0].path,
            //     children: routerTree,
            // },
            {
                path: '*', redirect: '/index',
            },
            {
                path: '/index',
                component: () => import('@/views/Index/index.vue'),
                redirect: routerTree[0].path,
                children: routerTree,
            },
        ];
        Vue.use(VueRouter);
        const vueRouter = new VueRouter({
            mode: 'history',
            routes,
            linkActiveClass: 'active',
        });
        // 导航守卫
        vueRouter.beforeEach((to, from, next) => {
            next();
        });
        vueRouter.afterEach((to: Route, from: Route) => {
            const key = to.name || '';
            this.setCurrentModuleName(key);
        });
        return vueRouter;
    }

    // 生成路由实例-只应用初始化调用
    private createVueRouter(routerConfigs: IRouterModuleConfig[] = []) {
        // 路由配置扁平化处理
        const flatConfigs = this.convert2Arr(routerConfigs, '');
        // 合并路由信息，最终路由结果集合
        const mergeRouters = this.mergeRouterConfig(flatConfigs);
        // 获取后台权限
        const backModules = this.getBackRouterConfig();
        // 根据后台权限过滤没权限的路由配置
        const hasAuthRouter = this.filterRouterModelsByBackAuth(mergeRouters, backModules);
        // 还原成树形结构路由，vue-router需要的结构
        const routerTree = this.formatRouterTree(hasAuthRouter);
        // 注册vueRouter，设置默认路由，导航守卫
        const vueRouter = this.registerVueRouter(routerTree);
        this.flatRouterModels = hasAuthRouter;
        this.routerModels = routerTree;
        this.vueRouter = vueRouter;
    }
}

/** 路由接口 */
interface IRouterService {
    getVueRouter(): VueRouter;
    getModuleItems(key?: string): IMergeRouterConfig[];
    getCurrentBackModuleName(): string;
    jumpRouterByName(name: string, query?: any): void;
}

export default RouterService.getInstance();

