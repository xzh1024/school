import VueRouter, {Route} from 'vue-router'

declare module "vue/types/vue" {
  interface Vue {
    $confirm: any;
    $router: VueRouter;
    $route: Route;
  }
}
