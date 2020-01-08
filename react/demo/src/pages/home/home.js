/**
 * Created by Admin on 2019/2/11.
 */
// import React, { Component } from 'react';
// import Tabbar from '../../components/tabbar';
// import Header from '../../components/header';
//
// import './style.scss'
//
// class Home extends Component {
//     render(){
//         return(
//             <div className="home">
//                 <Header title="首页" />
//                 <div className="main">home</div>
//             </div>
//         )
//     }
// }
//
// export default Tabbar(Home);


import React, { Component } from 'react';
import Tabbar from '../../components/tabbar';
import Header from '../../components/header';
import TodoItem from './todoItem';

import './style.scss'

class TodoList extends Component {
    //构造函数，是一个默认方法，通过 new 命令创建对象实例时，自动调用该方法
    constructor(props){
        /*
         *   ES6 要求，子类的构造函数必须执行一次 super 函数，否则会报错。
         *
         *   在 constructor 中必须调用 super 方法，因为子类没有自己的 this 对象，而是继承父类的 this 对象，
         *   然后对其进行加工,而 super 就代表了父类的构造函数。
         *   super 虽然代表了父类 A 的构造函数，但是返回的是子类 B 的实例，即 super 内部的 this 指的是 B，
         *   因此 super() 在这里相当于 ```A.prototype.constructor.call(this, props)``。
         *
         *   通过 super 调用父类的方法时，super 会绑定子类的 this。
         *
         *   调用super的原因：在ES6中，在子类的constructor中必须先调用super才能引用this
         *   super(props)的目的：在constructor中可以使用this.props
         *
         * */
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            inputValue: '',
            list: [
                'learn react',
                'learn english',
                'learn vue'
            ]
        };
    }

    handleBtnClick = () => {
        // alert('click');
        // let list = this.state.list;
        // list.push(this.state.value);

        // ... 展开运算符
        this.setState({
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        });
    }

    handleInputChange(e){
        // console.log(e.target.value);
        this.setState({
            inputValue: e.target.value
        });
    }

    handleInputKeyUp = (e) => {
        // console.log(e.keyCode);
        const keyCode = e.keyCode;
        if(keyCode === 13 || keyCode === 108){
            this.handleBtnClick();
        }
    }

    handleItemClick(index){
        const list = [...this.state.list];
        list.splice(index, 1);
        // this.setState({
        //     list: list
        // });
        this.setState({list});
    }

    handleDelete(index){
        const list = [...this.state.list];
        list.splice(index, 1);
        this.setState({list});
    }

    getTodoItems(){
        return this.state.list.map((item, index) => {
            return (
                <TodoItem
                    delete={this.handleDelete}
                    key={index}
                    content={item}
                    index={index}
                />
            )
            {/*return <li key={index} onClick={this.handleItemClick.bind(this, index)}>{index}:{item}</li>*/}
        })
    }

    // 父组件通过属性的形式向子组件传递参数
    // 子组件通过props接受父组件传递过来的参数

    render() {
        return (
            <React.Fragment>
                <Header title="首页" />
                <div className="main">
                    <div className="memo">
                        <input className="memo-input" type="text" value={this.state.inputValue} onChange={this.handleInputChange} onKeyUp={this.handleInputKeyUp}/>
                        <button className="memo-button" onClick={this.handleBtnClick}>add</button>
                    </div>
                    <div>
                        { this.getTodoItems() }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

// export default TodoList;
export default Tabbar(TodoList);