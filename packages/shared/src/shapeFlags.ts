export const enum ShapeFlags {
    // 普通的 HTML 元素节点
    ELEMENT = 1,
    // 函数式组件
    FUNCTIONAL_COMPONENT = 1 << 1,
    // 有状态的组件
    STATEFUL_COMPONENT = 1 << 2,
    // 子节点是文本
    TEXT_CHILDREN = 1 << 3,
    // 子节点是数组
    ARRAY_CHILDREN = 1 << 4,
    // 子节点是插槽
    SLOTS_CHILDREN = 1 << 5,
    // Teleport 组件
    TELEPORT = 1 << 6,
    // Suspense 组件
    SUSPENSE = 1 << 7,
    // 需要被缓存的组件
    COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
    // 已经被缓存的组件
    COMPONENT_KEPT_ALIVE = 1 << 9,
    
    COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}
