import { defineStore } from 'pinia';
import { removeRouteListener } from '@/utils/route-listener';
import { Message } from '@arco-design/web-vue';
import {
  cbdApiProjectCommonProjectSelectListGet,
  cbdApiProjectGetInfoGet,
  cbdApiProjectGetRoutersGet,
  cbdApiProjectLoginPost
} from '@/api';
import type {
  CbdApiProjectGetInfoGetResponse,
  CbdApiProjectLoginPostRequest,
  CbdApiProjectGetRoutersGetResponse,
  CbdApiProjectCommonProjectSelectListGetResponse
} from '@/api';
import { routeFlat } from '@/utils';
import lsStore from '@/utils/ls-store';
import useToken from '@/composables/useToken';
type Route = Omit<CbdApiProjectGetRoutersGetResponse[0], 'children'>;
type ProjectItem = CbdApiProjectCommonProjectSelectListGetResponse[0];
interface UserState extends CbdApiProjectGetInfoGetResponse {
  routers: CbdApiProjectGetRoutersGetResponse;
  flatRoutes: Route[];
  shopRouters: CbdApiProjectGetRoutersGetResponse;
  propertyRouters: CbdApiProjectGetRoutersGetResponse;
  projectId: number | undefined;
  projects: ProjectItem[];
  currentProject: ProjectItem;
}

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: {} as CbdApiProjectGetInfoGetResponse['user'],
    roles: [],
    projects: [],
    currentProject: {} as ProjectItem,
    projectId: undefined,
    permissions: [],
    routers: [],
    flatRoutes: [],
    shopRouters: [],
    propertyRouters: []
  }),

  actions: {
    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await cbdApiProjectGetInfoGet();
      this.user = res?.user || {};
      this.roles = res?.roles || [];
      this.permissions = res?.permissions || [];
    },

    async getRouter() {
      const res = await cbdApiProjectGetRoutersGet();
      this.routers = res;
      this.flatRoutes =
        routeFlat<CbdApiProjectGetRoutersGetResponse[number]>(res||[]);
    },
    async getProjects() {
      this.projects = await cbdApiProjectCommonProjectSelectListGet({});
      const id = lsStore.getItem('projectId');
      const setDefaultProject = () => {
        this.currentProject = this.projects[0];
        lsStore.setItem('projectId', String(this.projects[0].value));
      };
      if (this.projects.length) {
        // 有cookie就去找对应店铺
        if (id) {
          this.currentProject =
            this.projects.find((el: ProjectItem) => el.value === Number(id)) ||
            ({} as ProjectItem);
          // 没找到就默认为第一个,cookie也改成第一个
          if (!this.currentProject.value) {
            setDefaultProject();
          }
        } else {
          setDefaultProject();
        }
      } else {
        Message.error('未查询到项目信息');
      }
    },
    async setProjectId(id: number) {
      lsStore.setItem('projectId', String(id));
      this.currentProject = this.projects.find(
        (el: ProjectItem) => el.value === id
      )!;
    },
    // Login
    async login(loginForm: CbdApiProjectLoginPostRequest) {
      const res = await cbdApiProjectLoginPost(loginForm);
      const t = useToken();
      t.setToken(res.token || '');
    },

    // Logout
    async logout() {
      this.resetInfo();
      const t = useToken();
      t.setToken('');
      removeRouteListener();
    }
  }
});

export default useUserStore;
