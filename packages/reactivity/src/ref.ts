import { hasChanged } from "@vue/shared"
import { trackRefValue, triggerRefValue } from "./effect"
import { toReactive } from "./reactive"

export function ref(value) {
    return createRef(value, false)
}

export function isRef(r) {
    return !!(r && r.__v_isRef === true)
}

function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
        return rawValue
    }
    return new RefImpl(rawValue, shallow)
}

class RefImpl {
    private _value
    private _rawValue
    private dep

    public readonly __v_isRef = true

    constructor(value, public readonly _v_shallow) {
        this._rawValue = value
        this._value = _v_shallow ? value : toReactive(value)
    }

    get value() {
        trackRefValue(this)
        return this._value
    }

    set value(newVal) {
        if (hasChanged(newVal, this._rawValue)) {
            this._rawValue = newVal
            triggerRefValue(this)
        }
    }
}