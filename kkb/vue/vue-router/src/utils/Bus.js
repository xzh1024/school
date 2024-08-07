// Bus：事件派发，监听和回调管理
class Bus {
  constructor() {
    this.callbacks = {}
  }
  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(fn)
  }
  $emit(name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach((cb) => cb(args))
    }
  }
}

// main.js
// Vue.prototype.$bus = new Bus();
