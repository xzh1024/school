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
class Dep {
    constructor() {
        // 这里存放若干依赖(watcher)
        this.deps = [];
    }

    addDep(dep) {
        this.deps.push(dep);
        // console.log(this.deps);
    }

    notify() {
        this.deps.forEach(dep => dep.update());
    }
}

// Watcher(观察者：用来调用更新的对象)
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
        // 将当然watcher实例指定到Dep静态属性target
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