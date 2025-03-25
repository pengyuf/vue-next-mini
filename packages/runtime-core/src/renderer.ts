import { Comment, Fragment, Text } from "./vnode"
import { ShapeFlags } from "../../shared/src/shapeFlags"
import { EMPTY_OBJ } from "@vue/shared"

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
            // 挂载节点
            mountElement(newVNode, container, anchor)
        } else {
            // 更新节点
            patchElement(oldVNode, newVNode)
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

    const patchElement = (oldVNode, newVNode) => {
        const el = (newVNode.el = oldVNode.el)

        const oldProps = oldVNode.props || EMPTY_OBJ
        const newProps = newVNode.props || EMPTY_OBJ

        patchChildren(oldVNode, newVNode, el, null)

        patchProps(el, newVNode, oldProps, newProps)
    }

    const patchChildren = (oldVNode, newVNode, container, anchor) => {
        const c1 = oldVNode && oldVNode.children
        const prevShapeFlag = oldVNode ? oldVNode.shapeFlag : 0
        const c2 = newVNode && newVNode.children
        const { shapeFlag } = newVNode

        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                // 卸载旧子节点
            }
            if (c2 !== c1) {
                // 挂载新子节点的文本
                hostSetElementText(container, c2)
            }
        } else {
            if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                    // diff
                } else {
                    // 卸载
                }
            } else {
                if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
                    // 删除旧节点的text
                    hostSetElementText(container, '')
                }
                if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
                    // 单独新子节点的挂载
                }
            }
        }
    }

    const patchProps = (el: Element, vnode, oldProps, newProps) => {
        if (oldProps !== newProps) {
            for (const key in newProps) {
                const next = newProps[key]
                const prev = oldProps[key]
                if (next !== prev) {
                    hostPatchProp(el, key, prev, next)
                }
            }

            if (oldProps !== EMPTY_OBJ) {
                for (const key in oldProps) {
                    if (!(key in newProps)) {
                        hostPatchProp(el, key, oldProps[key], null)
                    }
                }
            }
        }
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