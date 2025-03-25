export const isArray = Array.isArray

export const isObject = (val: unknown) => {
    return val !== null && typeof val === 'object'
}

export const isFunction = (val: unknown): val is Function => {
    return typeof val === 'function'
}

export const hasChanged = (newVal, val) => {
    return !Object.is(newVal, val)
}

export const isString = (val: unknown): val is string => typeof val === 'string'

const onRE = /^on[^a-z]/
export const isOn = (key: string) => onRE.test(key)

export const extend = Object.assign