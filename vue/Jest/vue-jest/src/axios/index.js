/*
    1.Axios如何实现请求拦截

    2.Axios如何实现多种请求方式
*/

/*
    Axios.interceptors.requset.use((config) => {
        return config;
    })
*/

function Axios() {
    this.interceptors = {
        response: new interceptorsManner(),
        requset: new interceptorsManner()
    }
}

Axios.prototype.requset = function (params) {
    var chain = [dispatchRequset, undefined];
    var promise = Promise.resolve();
    this.interceptors.requset.hanlder.forEach((interceptor) => {
        chain.unshift(interceptor.fulfilled, interceptor.injected);
    });
    this.interceptors.response.hanlder.forEach((interceptor) => {
        chain.push(interceptor.fulfilled, interceptor.injected);
    });
    //链式调用
    while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
    }
}

function interceptorsManner() {
    this.hanlder = [];
}

interceptorsManner.prototype.use = function use(fulfilled, rejected) {
    this.hanlder.push({
        fulfilled,
        rejected
    })
}

//类似方法批量注册
//merge({a:1},{b:2})=>{a:1,b:2}
uint.forEach(['get', 'post', 'head', 'delete'], function (methods) {
    Axios.prototype[methods] = function (url, config) {
        return this.requset(util.merge(config || {}, {
            method: methods,
            url: url
        }))
    }
})