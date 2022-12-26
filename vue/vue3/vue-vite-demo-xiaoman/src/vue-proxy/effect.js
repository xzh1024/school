"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trigger = exports.track = exports.effect = void 0;
let activeEffect;
const effect = (fn) => {
    const _effect = function () {
        activeEffect = _effect;
        fn();
    };
    _effect();
};
exports.effect = effect;
const targetMap = new WeakMap();
const track = (target, key) => {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let deps = depsMap.get(key);
    if (!deps) {
        deps = new Set();
        targetMap.set(key, deps);
    }
    deps.add(activeEffect);
};
exports.track = track;
const trigger = (target, key) => {
    const depsMap = targetMap.get(target);
    const deps = depsMap.get(key);
    deps.forEach((effect) => effect());
};
exports.trigger = trigger;
