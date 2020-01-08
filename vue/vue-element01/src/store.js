import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //驱动应用的数据源
  state: {
    count: 0,
    user: {
      uid: 0,
      username: 'bluebird'
    }
  },
  getters: {
    doneTodos: state => {
      return state.count
    },
    user: state => {
      return state.user
    }
  },
  mutations: {
    //this.$store.commit('increment')
    increment (state) {
      state.count++
    }
  },
  //响应在 view 上的用户输入导致的状态变化
  actions: {

  }
})
