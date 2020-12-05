function render(vnode, container) {
    console.log(vnode);
    // step 1：vnode -> node
    const node = createNode(vnode);

    container.appendChild(node);
}

function createNode(vnode) {
    const {type, props} = vnode;

    let node;

    if(type === "TEXT") {
        node = document.createTextNode("");
    } else if (typeof type === "string") {
        // 原生标签节点
        node = document.createElement(type);
    } else if (typeof type === "function") {
        // 原生标签节点
        node = updateFunctionComponent(vnode);
    }

    // 遍历children
    reconcileChildren(node, props.children);
    // 更新
    updateNode(node, props);
    // 遍历
    return node;
}

function updateNode(node, nextVal) {
    Object.keys(nextVal)
        .filter(k => k !== "children")
        .forEach(k => {
            node[k] = nextVal[k];
        })
}

// 函数组件处理
function updateFunctionComponent(vnode) {
    const {type, props} = vnode;
    const vvnode = type(props); // 执行函数，得到子节点
    const node = createNode(vvnode);
    return node;
}

function reconcileChildren(node, children) {
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        // child是vnode，vnode->dom节点，插入到父dom节点中就可以了
        render(child, node);
    }
}

export default {render};