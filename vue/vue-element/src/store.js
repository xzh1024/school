import Vue from 'vue'
import Vuex from 'vuex'
import Seller from './modules/seller'

Vue.use(Vuex)

export default new Vuex.Store({
  // 驱动应用的数据源(唯一数据源)
  state: {
    count: 0,
    todos: [
      { id: 1, text: '测试数据1', done: true },
      { id: 2, text: '测试数据2', done: false }
    ],
    user: {
      uid: 0,
      username: 'bluebird'
    }
  },
  modules: {
    Seller
  },
  // “getter”可以认为是 store 的计算属性
  // getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算
  // Getter 会暴露为 store.getters 对象
  getters: {
    doneTodos: state => {
      return state.count
    },
    userData: state => {
      return state.user
    },
    // 通过让 getter 返回一个函数，来实现给 getter 传参
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id);
    }
  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
  mutations: {
    //this.$store.commit('increment')
    increment (state) {
      state.count++
    }
  },
  // Action 提交的是 mutation，而不是直接变更状态。
  // Action 可以包含任意异步操作。
  actions: {
    // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
    // 因此你可以调用 context.commit 提交一个 mutation

    //context与store实例具有相同方法与属性
    increment (context) {
      console.log(context);
      context.commit('increment');
    }
    // increment ({ commit }) {
    //   commit('increment')
    // }
  }
})
