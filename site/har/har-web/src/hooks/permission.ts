import { RouteLocationNormalizedLoaded } from 'vue-router';

export default function usePermission() {
  return {
    accessRouter(route: RouteLocationNormalizedLoaded) {
      const { meta = {} } = route;
      const { requiresAuth, roles = [] } = meta as any;
      // @ts-ignore
      return !requiresAuth || roles?.includes('*');
    }
    /*  findFirstPermissionRoute(_routers: any, role = []) {
      const cloneRouters = [..._routers];
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift();
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role);
          })
        )
          return { name: firstElement.name };
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children);
        }
      }
      return null;
    } */
    // You can add any rules you want
  };
}
