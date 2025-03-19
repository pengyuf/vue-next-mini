export const isArray = Array.isArray

export const isObject = (val: unknown) => {
    return val !== null && typeof val === 'object'
}

export const isFunction = (val: unknown): val is Function => {
    return typeof val === 'function'
}