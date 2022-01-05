// new KVue({data: {...}})

class KVue {
    constructor(options){
        this.$options = options;

        // 数据响应化
        this.$data = options.data;
        this.observe(this.$data);

        // 模拟watcher创建
        // console.log(Dep.target); // undefined
        // new Watcher();
        // console.log(Dep.target);
        // this.$data.test;
        // new Watcher();
        // this.$data.foo.bar;

        console.log('this-----------------------------------------------');
        console.log(this);
        new Compile(options.el, this);

        // created执行
        if (options.created) {
            options.created.call(this);
        }
    }

    /*
        1.实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。
    */
    observe(data){
        if(!data || typeof data !== 'object'){
            return;
        }

        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);

            // 代理data中的属性到vue实例上
            this.proxyData(key);
        })
    }

    // 数据响应化
    defineReactive(obj, key, val){
        // 实现深层监听(递归)
        this.observe(val);

        const dep = new Dep();

        Object.defineProperty(obj, key, {
            get() {
                // console.log(key);
                // console.log(Dep.target);
                Dep.target && dep.addDep(Dep.target);
                return val
            },
            set(newVal) {
                if(newVal === val){
                    return;
                }
                val = newVal;
                // console.log(`${key}属性更新了：${val}`);

                dep.notify();
            }
        });
    }

    // 简化对this.$data的操作
    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key];
            },
            set(newVal) {
                this.$data[key] = newVal;
            }
        })
    }
}


// Dep: 用来管理Watcher
/*
    4.实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。
    Dep和响应式的属性key之间有一一对应关系
    负责通知watchers更新
*/
class Dep {
    constructor() {
        // 这里存放若干依赖(watcher)
        this.deps = [];
    }

    addDep(dep) {
        console.log(dep);
        this.deps.push(dep);
        // console.log(this.deps);
    }

    notify() {
        this.deps.forEach(dep => dep.update());
    }
}

// Watcher(观察者：用来调用更新的对象)
/*
    3.实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。
    负责具体节点更新
*/
class Watcher {
    constructor(vm, key, callback) {
        /*
        * vm: k-vue实例
        * key: data属性名
        * callback: Updater函数，用于更新dom数据
        * */
        this.vm = vm;
        this.key = key;
        this.callback = callback;
        console.log(this);
        // 将当前watcher实例指定到Dep静态属性target
        Dep.target = this;
        this.vm[this.key]; // 触发getter，添加依赖  this.vm.$data[this.key]
        Dep.target = null;
    }

    update(){
        // console.log(this);
        // console.log('属性更新了');
        this.callback.call(this.vm, this.vm[this.key]);
    }
}