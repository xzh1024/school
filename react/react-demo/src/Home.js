import React from 'react';
var createReactClass = require('create-react-class');

var SetIntervalMixin = {
    componentWillMount: function () {
        this.intervals = [];
    },
    setInterval: function () {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function () {
        this.intervals.forEach(clearInterval);
    }
};

var Home = createReactClass({
    mixins: [SetIntervalMixin], // 使用 mixin
    //创建后
    componentDidMount: function () {
        this.setInterval(this.tick, 1000); // 调用 mixin 上的方法
    },
    //使用createReactClass()方法创建组件，组件中的方法会自动绑定至实例
    tick: function () {
        this.setState({ seconds: this.state.seconds + 1 });
    },
    //声明默认属性
    getDefaultProps: function () {
        return {
            name: 'World'
        };
    },
    //初始化 State
    getInitialState: function () {
        return { seconds: 0, message: 'work work' };
    },
    // handleClick: function () {
    //     alert(this.state.message);
    // },
    render: function () {
        return (
            <div>
                <h1>Hello, {this.props.name},{this.state.seconds}</h1>
            </div>
        );
    }
});

export default Home;