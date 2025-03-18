import { isArray } from "@vue/shared"
import { createDep, Dep } from "./dep"

type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<any, KeyToDepMap>()

export function effect<T = any>(fn: () => T) {
    const _effect = new ReactiveEffect(fn)

    // 完成第一次fn函数的执行
    _effect.run()
}

export let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect<T = any> {
    constructor(public fn: () => T) { }

    run() {
        activeEffect = this
        this.fn()
    }
}

// 收集依赖
export function track(target: object, key: unknown) {
    if (!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    // depsMap.set(key, activeEffect)
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = createDep()))
    }
    trackEffects(dep)
}

// 利用dep依次跟踪指定key的所有effect
export function trackEffects(dep: Dep) {
    dep.add(activeEffect!)
}

// 触发依赖
export function trigger(target: object, key: unknown, newValue: unknown) {
    const depsMap = targetMap.get(target)
    if (!depsMap) {
        return
    }

    // const effect = depsMap.get(key)

    // if (!effect) {
    //     return
    // }

    // effect.fn()

    const dep: Dep | undefined = depsMap.get(key)

    if (!dep) {
        return
    }

    triggerEffects(dep)
}

export function triggerEffects(dep: Dep) {
    const effects = isArray(dep) ? dep : [...dep]

    for (const effect of effects) {
        triggerEffect(effect)
    }
}

export function triggerEffect(effect: ReactiveEffect) {
    effect.run()
}