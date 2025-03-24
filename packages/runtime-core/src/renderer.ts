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
    const {
        insert: hostInsert,
        patchProp: hostPatchProp,
        createElement: hostCreateElement,
        setElementText: hostSetElementText
    } = options

    const processElement = (oldVNode, newVNode, container, anchor) => {
        if (oldVNode == null) {
            mountElement(newVNode, container, anchor)
        } else {

        }
    }

    const mountElement = (vnode, container, anchor) => {
        const { type, props, shapeFlag } = vnode
        const el = (vnode.el = hostCreateElement(type))
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            hostSetElementText(el, vnode.children)
        } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {

        }
        if (props) {
            for (const key in props) {
                hostPatchProp(el, key, null, props[key])
            }
        }
        hostInsert(el, container, anchor)
    }

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
                    processElement(oldVNode, newVNode, container, anchor)
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