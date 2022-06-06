import { login as loginApi } from '@/api/login';
import router from '@/router';
import { setTokenTime } from '@/utils/auth';

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
    siderType: true
  }),
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    changeSiderType(state) {
      state.siderType = !state.siderType;
      console.log(state.siderType);
    }
  },
  actions: {
    async login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            commit('setToken', 'ok');
            setTokenTime();
            router.replace('/');
          });
      });
    },
    logout({ commit }) {
      console.log(123);
      commit('setToken', '');
      localStorage.clear();
      router.replace('/login');
    }
  }
};
