import { isObject } from "@vue/shared"
import { mutableHandlers } from "./baseHandlers"

export const reactiveMap = new WeakMap()

export function reactive(target: object) {
    return createReactiveObject(target, mutableHandlers, reactiveMap)
}

export function createReactiveObject(target, baseHandlers, proxyMap) {
    // 使用proxyMap，保存target和proxy的对应关系
    const exsitingProxy = proxyMap.get(target)
    if (exsitingProxy) {
        return exsitingProxy
    }

    const proxy = new Proxy(target, baseHandlers)
    proxyMap.set(target, proxy)

    return proxy
}

export const toReactive = (value) => {
    return isObject(value) ? reactive(value) : value
}