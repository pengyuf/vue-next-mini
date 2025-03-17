import { track, trigger } from "./effect"

const get = createGetter()

export function createGetter() {
    return function get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver)
        // 依赖收集
        track(target, key)
        return res
    }
}

const set = createSetter()

export function createSetter() {
    return function set(target, key, value, receiver) {
        const result = Reflect.set(target, key, value, receiver)

        // 触发依赖
        trigger(target, key, value)

        return result
    }
}

export const mutableHandlers = {
    get,
    set
}