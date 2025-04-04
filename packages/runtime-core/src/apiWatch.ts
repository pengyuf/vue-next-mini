import { queuePreFlushCb } from "@vue/runtime-core"
import { EMPTY_OBJ, hasChanged, isObject } from "@vue/shared"
import { ReactiveEffect } from "packages/reactivity/src/effect"
import { isReactive } from "packages/reactivity/src/reactive"

export interface WatchOptions<immediate = boolean> {
    immedimate?: immediate
    deep?: boolean
}

export function watch(source, cb: Function, options?: WatchOptions) {
    return doWatch(source, cb, options)
}

function doWatch(source, cb: Function, { immedimate, deep }: WatchOptions = EMPTY_OBJ) {
    let getter: () => any
    if (isReactive(source)) {
        getter = () => source
        deep = true
    } else {
        getter = () => { }
    }
    if (cb && deep) {
        const baseGetter = getter
        getter = () => traverse(baseGetter())
    }
    let oldValue = {}
    const job = () => {
        if (cb) {
            const newValue = effect.run()
            if (deep || hasChanged(newValue, oldValue)) {
                cb(newValue, oldValue)
                oldValue = newValue
            }
        }
    }
    let scheduler = () => queuePreFlushCb(job)

    const effect = new ReactiveEffect(getter, scheduler)

    if (cb) {
        if (immedimate) {
            job()
        } else {
            oldValue = effect.run()
        }
    } else {
        effect.run()
    }

    return () => {
        effect.stop()
    }
}


export function traverse(value: unknown) {
    if (!isObject(value)) {
        return value
    }
    for (const key in value as object) {
        traverse((value as object)[key])
    }
    return value
}