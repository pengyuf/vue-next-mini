import { Comment, Fragment, Text } from "./vnode"
import { ShapeFlags } from "../../shared/src/shapeFlags"

export interface RenderOptions {
    patchProp(el: Element, key: string, preValue: any, nextValue: any): void
    setElementText(node: Element, text: string): void
    insert(el, parent: Element, anchor?): void
    createElement(type: string)
}

export function createRenderer(options: RenderOptions) {
    return baseCreateRenderer(options)
}

function baseCreateRenderer(options: RenderOptions): any {
    const patch = (oldVNode, newVNode, container, anchor = null) => {
        if (oldVNode === newVNode) {
            return
        }

        const { type, shapeFlag } = newVNode

        switch (type) {
            case Text:

                break;
            case Comment:

                break;
            case Fragment:

                break;
            default:
                if (shapeFlag & ShapeFlags.ELEMENT) {

                } else if (shapeFlag & ShapeFlags.COMPONENT) {

                }
                break;
        }
    }

    const render = (vnode, container) => {
        if (vnode === null) {
            // TODO：卸载
        } else {
            patch(container._vnode || null, vnode, container)
        }
        container._vnode = vnode
    }

    return {
        render
    }
}