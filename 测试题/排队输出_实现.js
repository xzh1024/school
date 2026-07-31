class Scheduler {
  limit = 2
  list = []
  add(promiseCreator) {
    const list = this.list
    list.push(promiseCreator)
  }

  async deep(data) {
    const list = this.list
    await data()
    if (list.length) {
      this.deep(list.shift())
    }
  }

  start() {
    const list = this.list
    for (let index = 0; index < this.limit; index++) {
      if (list.length) {
        this.deep(list.shift())
      }
    }
  }
}
const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })
const scheduler = new Scheduler()

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')

scheduler.start()

// - 0ms    -> run 1 & 2
// - 500ms  -> output 2，run 3
// - 800ms  -> output 3，run 4
// - 1000ms -> output 1，run 4
// - 1200ms -> output 4
