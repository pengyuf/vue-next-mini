import { createDep } from "./dep"
import { reactiveMap } from "./reactive"

let activeEffect: any = null

let targetMap = new WeakMap()

export function effect(fn) {
    const _effect = new ReactiveEffect(fn)

    _effect.run()
}

export class ReactiveEffect {
    constructor(public fn) { }
    run() {
        activeEffect = this
        return this.fn()
    }
}

export function track(target, key) {
    if (!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }

    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = createDep()))
    }

    tarckEffects(dep)
}

function tarckEffects(dep) {
    dep.add(activeEffect!)
}


export function trigger(target, key, value) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        return
    }
    const dep = depsMap.get(key)
    if (!dep) {
        return
    }
    triggerEffects(dep)
}

function triggerEffects(dep) {
    const effects = Array.isArray(dep) ? dep : [...dep]

    for (const effect of effects) {
        triggerEffect(effect)
    }
}

function triggerEffect(effect) {
    effect.run()
}