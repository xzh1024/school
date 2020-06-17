import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'
import axios from 'axios'
import sinon from 'sinon'

describe('HelloWorld.vue', () => {
    const Constructor = Vue.extend(HelloWorld);
    const vm = new Constructor().$mount();
    // it('should render correct contents', () => {
    //     const Constructor = Vue.extend(HelloWorld)
    //     const vm = new Constructor().$mount()
    //     expect(vm.$el.querySelector('.hello h1').textContent)
    //         .toEqual('Welcome to Your Vue.js App')
    // })
    it('m1 should add two arguments', () => {
        const m1 = vm.m1;
        expect(m1(2, 3)).toEqual(5);
    });
    //检测我们数据更新
    it('should change correct contenes', () => {
        vm.m2();
        Vue.nextTick(() => {
            expect(vm.$el.querySelector('.hello h1').textContent)
                .toEqual('hello');
        })
    });
    //异步方法
    it('async m3 should return 6', () => {
        vm.m3(2, 4, (num) => {
            expect(num).toEqual(6);
        })
    });
    //请求接口
    it('get http', () => {
        //屏蔽
        sinon.stub(axios, 'get');
        let callback = sinon.spy(() => 5);
        const res = vm.getmes(callback);
        expect(res).toEqual(4);
    });
})
