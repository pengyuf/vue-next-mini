export const isArray = Array.isArray

export const isObject = (value) => {
    return value !== null && typeof value === 'object'
}

export const hasChanged = (newVal, val) => {
    return !Object.is(newVal, val)
}