import { hasChanged } from "@vue/shared"
import { activeEffect, tarckEffects, triggerEffects } from "./effect"
import { toReactive } from "./reactive"
import { createDep } from "./dep"

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
    private dep = undefined

    public readonly __v_isRef = true

    constructor(value, public readonly __v_shallow) {
        this._rawValue = value
        this._value = __v_shallow ? value : toReactive(value)
    }

    get value() {
        trackRefValue(this)
        return this._value
    }

    set value(newVal) {
        if (hasChanged(newVal, this._rawValue)) {
            this._rawValue = newVal
            this._value = toReactive(newVal)
            triggerRefValue(this)
        }
    }
}

export function trackRefValue(ref) {
    if (activeEffect) {
        tarckEffects(ref.dep || (ref.dep = createDep()))
    }
}

export function triggerRefValue(ref) {
   if(ref.dep){
      triggerEffects(ref.dep)
   }
}