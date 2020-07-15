// 用法 new Compile(el, vm)

/*
    2.实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
*/
class Compile {
    constructor(el, vm) {
        // 要遍历的宿主节点
        this.$el = document.querySelector(el);

        // k-vue实例
        this.$vm = vm;

        // 编译
        if(this.$el) {
            // 转换内部内容为片段Fragment
            this.$fragment = this.node2Fragment(this.$el);
            // 执行编译
            this.compile(this.$fragment);
            // 将编译完的html结果追加至$el
            this.$el.appendChild(this.$fragment);
        }
    }

    // 将宿主元素中代码片段拿出来遍历，这样做比较高效
    node2Fragment(el) {
        // 创建文档片段
        const fragment = document.createDocumentFragment();
        // 将el中所有子元素搬家至fragment中
        let child;
        while (child = el.firstChild) {
            // 将子元素插入到文档片段时不会引起页面回流
            fragment.appendChild(child);
        }
        return fragment;
    }

    // 编译过程
    compile(el) {
        // 获得元素的子节点集合，一个类数组对象
        const childNodes = el.childNodes;
        // console.log(Object.prototype.toString.call(childNodes));  // [object NodeList]
        Array.from(childNodes).forEach(node => {
            // 判断类型
            if (this.isElement(node)) {
                // 元素 node.nodeType === 1
                // console.log('编译元素：' + node.nodeName);
                // 查找k-，@，:
                const nodeAttrs = node.attributes; // 获取节点的属性集合
                Array.from(nodeAttrs).forEach(attr => {
                    // @click="changeName"    attrName->@click  exp->changeName
                    const attrName = attr.name; // 属性名
                    const exp = attr.value; // 属性值
                    if(this.isDirective(attrName)) {
                        // k-text
                        const dir = attrName.substring(2); // text
                        // 执行指令
                        this[dir] && this[dir](node, this.$vm, exp);
                    }
                    if(this.isEvent(attrName)) {
                        const dir = attrName.substring(1); // @click -> click
                        this.eventHandler(node, this.$vm, exp, dir)
                    }
                })
            } else if(this.isInterpolation(node)) {
                // 文本 node.nodeType === 3
                // console.log('编译文本：' + node.textContent);
                this.compileText(node);
            }

            // 递归子节点
            if(node.childNodes && node.childNodes.length > 0) {
                this.compile(node);
            }
        })
    }

    // 更新函数
    update(node, vm, exp, dir) {
        const updaterFn = this[dir + 'Updater'];
        // 初始化
        // updaterFn && updaterFn(node, vm.$data[exp]);
        updaterFn && updaterFn(node, vm[exp]);
        // 依赖收集
        new Watcher(vm, exp, function (value) {
            updaterFn && updaterFn(node, value);
        });
    }

    // 文本
    compileText(node) {
        // console.log(RegExp.$1); // 获取第一个代码片段    {{name}} -> name
        // node.textContent = this.$vm.$data[RegExp.$1];
        this.update(node, this.$vm, RegExp.$1, 'text');
    }

    // 元素
    text(node, vm, exp) {
        this.update(node, vm, exp, 'text');
    }

    textUpdater(node, value) {
        node.textContent = value;
    }

    // 数据双向绑定
    model(node, vm, exp) {
        // 指定input的value属性
        this.update(node, vm, exp, 'model');

        // 视图对模型响应
        node.addEventListener('input', e => {
            vm[exp] = e.target.value;
        })
    }
    modelUpdater(node, value) {
        node.value = value;
    }

    html(node, vm, exp) {
        this.update(node, vm, exp, 'html');
    }
    htmlUpdater(node, value) {
        node.innerHTML = value;
    }

    // 事件处理器
    eventHandler(node, vm, exp, dir) {
        const fn = vm.$options.methods && vm.$options.methods[exp];
        if (dir && fn) {
            node.addEventListener(dir, fn.bind(vm));
        }
    }

    isElement(node) {
        return node.nodeType === 1;
    }
    // 插值文本
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }

    isDirective(attr) {
        return attr.indexOf('k-') == 0;
    }
    isEvent(attr) {
        return attr.indexOf('@') == 0;
    }
}