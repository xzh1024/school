/*
    具体的使用方法，用代码表现是这样：
    const promise = new Promise(function(resolve, reject) {
        // ... some code
        if ('异步操作成功'){
            resolve(value);
        } else {
            reject(error);
        }
    });
    
    promise.then(function(value) {
        // success
    }, function(error) {
        // failure
    });
*/

// class CutePromise {
//     // executor是我们实例化CutePromise时传入的参数函数，它接受两个参数，分别是resolve和reject。
//     // resolve和reject我们将会定义在constructor当中，供executor在执行的时候调用
//     constructor(executor) {
//         const resolve = () => { }
//         const reject = () => { }
//         executor(resolve, reject)
//     }

//     // 为实例提供一个then的方法，接收两个参数函数，
//     // 第一个参数函数必传，它会在promise已成功(fulfilled)以后被调用
//     // 第二个参数非必传，它会在promise已失败(rejected)以后被调用
//     then(onFulfilled, onRejected) { }
// }

class CutePromise {
    constructor(executor) {
        if (typeof executor !== 'function') {
            throw new Error('Executor must be a function');
        }

        this.state = 'PENDING';

        // chained用来储存promise执行完成以后，需要被依次调用的一系列函数
        this.chained = [];

        const resolve = (res) => {
            if (this.state !== 'PENDING') {
                return;
            }

            this.state = 'FULFILLED';
            this.internalValue = res;

            //promise已经执行成功了，可以依次调用.then()函数里的onFulfilled函数了
            for (const { onFulfilled } of this.chained) {
                onFulfilled(res);
            }
        };

        const reject = err => {
            if (this.state !== 'PENDING') {
                return;
            }
            this.state = 'REJECTED';
            this.internalValue = err;
            for (const { onRejected } of this.chained) {
                onRejected(err);
            }
        };

        // executor(resolve, reject);
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        if (this.state === 'FULFILLED') {
            onFulfilled(this.internalValue);
        } else if (this.state === 'REJECTED') {
            onRejected(this.internalValue);
        } else {
            this.chained.push({ onFulfilled, onRejected });
        }
        // console.log(this.then);
        // return this.then;
    }
}