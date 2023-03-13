import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    // state从何而来
    add(state, payload) {
      state.counter += payload
    }
  },
  // Action 提交的是 mutation，而不是直接变更状态。
  // Action 可以包含任意异步操作。
  actions: {
    // add({ commit, dispatch, state, rootState }) {
    add(ctx, payload) {
      setTimeout(() => {
        ctx.commit('add', payload)
      }, 1000)
    }
  },
  modules: {}
})
