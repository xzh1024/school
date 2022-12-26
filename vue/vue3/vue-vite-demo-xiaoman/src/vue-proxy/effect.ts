let activeEffect: any

export const effect = (fn: Function) => {
  const _effect = function () {
    activeEffect = _effect
    fn()
  }

  _effect()
}

const targetMap = new WeakMap()
export const track = (target: object, key: any) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    targetMap.set(key, deps)
  }

  deps.add(activeEffect)
}

export const trigger = (target: any, key: any) => {
  const depsMap = targetMap.get(target)
  const deps = depsMap.get(key)
  deps.forEach((effect: any) => effect())
}
