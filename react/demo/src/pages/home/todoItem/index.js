import React, { Component } from 'react';

import './style.scss'

class TodoItem extends Component {

    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    //生命周期
    /*
        1.Initialization：在这个阶段，组件准备设置初始化状态和默认属性。
    */

    /*
        2.Mounting：react 组件已经准备好挂载到浏览器 DOM 中。这个阶段包括
    */
    //在渲染之前执行，用于根组件中的 App 级配置。
    componentWillMount() {
        console.log('创建前');
    }

    //在第一次渲染之后执行，可以在这里做AJAX请求，DOM 的操作或状态更新以及设置事件监听器。
    componentDidMount() {
        //当组件输出到 DOM 后会执行 componentDidMount() 钩子
        console.log('创建后');
    }
    
    /*
        3.Updating：在这个阶段，组件以两种方式更新，发送新的 props 和 state 状态。此阶段包括
    */
    //在初始化render的时候不会执行，它会在组件接受到新的状态(Props)时被触发，一般用于父组件状态更新时子组件的重新渲染
    //setProps
    componentWillReceiveProps() {
        //拥有Props才会触发
        console.log('setProps');
    }
    //确定是否更新组件。默认情况下，它返回true。如果确定在 state 或 props 更新后组件不需要在重新渲染，则可以返回false，这是一个提高性能的方法。
    //setState
    shouldComponentUpdate() {
        console.log('setState');
        return true;
    }
    
    //在shouldComponentUpdate返回 true 确定要更新组件之前件之前执
    componentWillUpdate() {
        console.log('更新前');
    }

    //它主要用于更新DOM以响应props或state更改。
    componentDidUpdate() {
        console.log('更新后');
    }

    /*
        4.Unmounting：在这个阶段，组件已经不再被需要了，它从浏览器 DOM 中卸载下来。
        这个阶段包含 componentWillUnmount 生命周期方法.
    */
    //它用于取消任何的网络请求，或删除与组件关联的所有事件监听器。
    componentWillUnmount() {
        console.log('卸载');
    }
    //不论在渲染的过程中，还是在生命周期方法中或是在任何子组件的构造函数中发生错误，该组件都会被调用
    componentDidCatch() {
        console.log('componentDidCatch');
    }

    // 子组件如果想和父组件通信，子组件要调用父组件传递过来的方法
    handleDelete(){
        this.props.delete(this.props.index);
    }

    render() {
        console.log('render');
        const { content } = this.props;
        return (
            <div className="todo-item" onClick={this.handleDelete}>{ content }</div>
        );
    }
}

export default TodoItem;
