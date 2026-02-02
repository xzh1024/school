import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', {
  state: () => {
    return {
      sum: 0,
    }
  },
  getters: {
    bigSum: (state) => state.sum * 10,
  },
  actions: {
    increment() {
      this.sum++
    },
    decrement() {
      this.sum--
    },
    add(num: number) {
      this.sum += num
    },
    minus(num: number) {
      this.sum -= num
    },
  },
})
